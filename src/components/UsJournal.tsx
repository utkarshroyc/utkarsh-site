"use client";

import { useMemo, useState, useSyncExternalStore } from "react";
import { useRouter } from "next/navigation";
import type { Entry, Flow, Mood, UsData, Who } from "@/lib/us";

// Utkarsh × Sophie Work Mood Tracker: one face a day each, Sophie's period days, and a month calendar that shows both.
// Dates are the logger's local calendar day ("YYYY-MM-DD"), so a late-night entry lands
// on the day it was lived, not the server's UTC day.

const PEOPLE: { id: Who; name: string }[] = [
  { id: "utkarsh", name: "Utkarsh" },
  { id: "sophie", name: "Sophie" },
];
const MOODS: { id: Mood; label: string }[] = [
  { id: "good", label: "Good" },
  { id: "okay", label: "Okay" },
  { id: "rough", label: "Rough" },
];
const FLOWS: Flow[] = ["spotting", "light", "medium", "heavy"];
const WEEKDAYS = ["S", "M", "T", "W", "T", "F", "S"];

/* ---------- Dates ---------- */

const pad = (n: number) => String(n).padStart(2, "0");
const toKey = (d: Date) => `${d.getFullYear()}-${pad(d.getMonth() + 1)}-${pad(d.getDate())}`;
const parse = (k: string) => {
  const [y, m, d] = k.split("-").map(Number);
  return new Date(y, m - 1, d);
};
const addDays = (k: string, n: number) => {
  const d = parse(k);
  d.setDate(d.getDate() + n);
  return toKey(d);
};
const diffDays = (a: string, b: string) => Math.round((+parse(b) - +parse(a)) / 86_400_000);
const fmtDay = (k: string) =>
  parse(k).toLocaleDateString("en-US", { weekday: "short", month: "short", day: "numeric" });
const fmtTime = (t: number) =>
  new Date(t).toLocaleTimeString("en-US", { hour: "numeric", minute: "2-digit" }).toLowerCase();
const avg = (xs: number[]) => xs.reduce((a, b) => a + b, 0) / xs.length;
// "HH:MM" <-> minutes since midnight, and "9:05 am" for display.
const toMins = (hm: string) => +hm.slice(0, 2) * 60 + +hm.slice(3);
const fmtClock = (mins: number) => fmtTime(new Date(2000, 0, 1, Math.floor(mins / 60), mins % 60).getTime());
const nowHM = () => {
  const d = new Date();
  return `${pad(d.getHours())}:${pad(d.getMinutes())}`;
};

// "Today" only exists in the browser; the server renders without it.
const noop = () => () => {};
const useToday = () => useSyncExternalStore(noop, () => toKey(new Date()), () => null);

// Who's holding the phone, remembered per device.
let whoMemo: Who | null = null;
const whoStore = {
  subscribe(cb: () => void) {
    addEventListener("us-who", cb);
    return () => removeEventListener("us-who", cb);
  },
  get(): Who | null {
    if (whoMemo) return whoMemo;
    try {
      return localStorage.getItem("us-who") as Who | null;
    } catch {
      return null;
    }
  },
  set(who: Who) {
    whoMemo = who;
    try {
      localStorage.setItem("us-who", who);
    } catch {}
    dispatchEvent(new Event("us-who"));
  },
};

/* ---------- Cycle ---------- */

// Period days within 2 days of each other count as one period. Cycle length is the
// average gap between recent starts (28 until there are two starts to compare).
function cycleFrom(period: Record<string, Flow>, today: string) {
  const days = Object.keys(period).sort();
  if (!days.length) return null;
  const starts: string[] = [];
  const lengths: number[] = [];
  let runStart = days[0];
  days.forEach((d, i) => {
    if (i === 0 || diffDays(days[i - 1], d) > 2) {
      if (i > 0) lengths.push(diffDays(runStart, days[i - 1]) + 1);
      starts.push(d);
      runStart = d;
    }
  });
  lengths.push(diffDays(runStart, days.at(-1)!) + 1);

  const gaps = starts
    .slice(1)
    .map((s, i) => diffDays(starts[i], s))
    .filter((g) => g >= 15 && g <= 60)
    .slice(-6);
  const cycleLen = gaps.length ? Math.round(avg(gaps)) : 28;
  const periodLen = Math.min(10, Math.round(avg(lengths.slice(-6))));
  const last = starts.at(-1)!;
  const next = addDays(last, cycleLen);
  const predicted = new Set(Array.from({ length: periodLen }, (_, i) => addDays(next, i)));
  return {
    day: diffDays(last, today) + 1,
    cycleLen,
    periodLen,
    next,
    until: diffDays(today, next),
    predicted,
    estimated: !gaps.length,
  };
}

/* ---------- Pieces ---------- */

function Face({ mood, size = 24 }: { mood?: Mood; size?: number }) {
  if (!mood) {
    return (
      <svg className="face is-empty" width={size} height={size} viewBox="0 0 24 24" aria-hidden>
        <circle cx="12" cy="12" r="10" />
      </svg>
    );
  }
  const mouth = {
    good: "M7.5 14 Q12 18.5 16.5 14",
    okay: "M8.5 15.5 H15.5",
    rough: "M7.5 17.2 Q12 13.2 16.5 17.2",
  }[mood];
  return (
    <svg className={`face is-${mood}`} width={size} height={size} viewBox="0 0 24 24" aria-hidden>
      <circle cx="12" cy="12" r="11" />
      <circle className="feature" cx="8.6" cy="9.8" r="1.35" />
      <circle className="feature" cx="15.4" cy="9.8" r="1.35" />
      <path className="mouth" d={mouth} />
    </svg>
  );
}

async function post(body: object) {
  const res = await fetch("/api/us", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(body),
  });
  if (!res.ok) throw new Error((await res.json().catch(() => null))?.error ?? "Couldn't save.");
  return res.json();
}

/* ---------- Passcode gate ---------- */

export function Gate() {
  const router = useRouter();
  const [code, setCode] = useState("");
  const [error, setError] = useState("");
  const [busy, setBusy] = useState(false);

  async function submit(e: React.FormEvent) {
    e.preventDefault();
    setBusy(true);
    setError("");
    const res = await fetch("/api/us/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ code }),
    });
    setBusy(false);
    if (res.ok) router.refresh();
    else setError((await res.json().catch(() => null))?.error ?? "Not quite.");
  }

  return (
    <form className="us-gate" onSubmit={submit}>
      <h1>
        Utkarsh × Sophie<span className="us-sub">Work Mood Tracker</span>
      </h1>
      <p className="intro">Just for the two of us.</p>
      <div className={`gate-row${error ? " is-wrong" : ""}`} key={error}>
        <input
          type="password"
          autoComplete="current-password"
          placeholder="passcode"
          value={code}
          onChange={(e) => setCode(e.target.value)}
          autoFocus
        />
        <button type="submit" disabled={busy || !code}>
          {busy ? "…" : "Open"}
        </button>
      </div>
      {error && <p className="meta gate-error">{error}</p>}
    </form>
  );
}

/* ---------- Journal ---------- */

export function UsJournal({ initial }: { initial: UsData }) {
  const today = useToday();
  const who = useSyncExternalStore(whoStore.subscribe, whoStore.get, () => null);
  const [data, setData] = useState(initial);
  const [picked, setPicked] = useState<string | null>(null);
  const [monthOffset, setMonthOffset] = useState(0);
  const [error, setError] = useState("");

  const cycle = useMemo(() => (today ? cycleFrom(data.period, today) : null), [data.period, today]);
  if (!today) return <div className="us-loading" />;
  const date = picked ?? today;

  async function saveMood(mood: Mood | null, note: string) {
    if (!who) return;
    const key = `${date}:${who}`;
    const before = data.moods[key];
    const optimistic = mood ? { mood, t: Date.now(), ...(note.trim() && { note: note.trim() }) } : null;
    setData((d) => ({ ...d, moods: withKey(d.moods, key, optimistic) }));
    setError("");
    try {
      const { entry } = await post({ kind: "mood", date, who, mood, note });
      setData((d) => ({ ...d, moods: withKey(d.moods, key, entry) }));
    } catch (e) {
      setData((d) => ({ ...d, moods: withKey(d.moods, key, before ?? null) }));
      setError((e as Error).message);
    }
  }

  async function saveWork(time: string | null) {
    if (!who) return;
    const key = `${date}:${who}`;
    const before = data.work[key];
    setData((d) => ({ ...d, work: withKey(d.work, key, time) }));
    setError("");
    try {
      await post({ kind: "work", date, who, time });
    } catch (e) {
      setData((d) => ({ ...d, work: withKey(d.work, key, before ?? null) }));
      setError((e as Error).message);
    }
  }

  async function savePeriod(flow: Flow | null) {
    const before = data.period[date];
    setData((d) => ({ ...d, period: withKey(d.period, date, flow) }));
    setError("");
    try {
      await post({ kind: "period", date, flow });
    } catch (e) {
      setData((d) => ({ ...d, period: withKey(d.period, date, before ?? null) }));
      setError((e as Error).message);
    }
  }

  return (
    <>
      <header className="masthead us-head">
        <div className="meta">
          <span>{fmtDay(today)}</span>
          <span>
            {PEOPLE.map((p) => (
              <span key={p.id} className={data.moods[`${today}:${p.id}`] ? "is-in" : ""}>
                {p.name} {data.moods[`${today}:${p.id}`] ? "✓" : "·"}
              </span>
            ))}
          </span>
        </div>
        <h1>
          Utkarsh × Sophie<span className="us-sub">Work Mood Tracker</span>
        </h1>
      </header>

      {!who ? (
        <section className="us-who-first">
          <p className="lede">Who&rsquo;s this?</p>
          <div className="who-big">
            {PEOPLE.map((p) => (
              <button key={p.id} onClick={() => whoStore.set(p.id)}>
                {p.name}
              </button>
            ))}
          </div>
          <p className="meta">Remembered on this device. You can switch any time.</p>
        </section>
      ) : (
        <>
          <section className="us-log">
            <div className="label log-label">
              <span>
                <span className="n">01</span>
                {date === today ? "Today" : fmtDay(date)}
                {date !== today && (
                  <button className="link-btn back" onClick={() => setPicked(null)}>
                    back to today
                  </button>
                )}
              </span>
              <span className="map-tabs who-tabs" role="tablist">
                {PEOPLE.map((p) => (
                  <button
                    key={p.id}
                    role="tab"
                    aria-selected={who === p.id}
                    onClick={() => whoStore.set(p.id)}
                  >
                    {p.name}
                  </button>
                ))}
              </span>
            </div>
            <LogPanel
              key={`${date}:${who}`}
              entry={data.moods[`${date}:${who}`]}
              onSave={saveMood}
            />
            <WorkRow time={data.work[`${date}:${who}`]} isToday={date === today} onSave={saveWork} />
            {who === "sophie" && <PeriodPanel flow={data.period[date]} onSave={savePeriod} />}
            {error && <p className="meta us-error">{error}</p>}
          </section>

          <section>
            <div className="label">
              <span className="n">02</span>Month
            </div>
            <Calendar
              today={today}
              selected={date}
              offset={monthOffset}
              setOffset={setMonthOffset}
              data={data}
              predicted={cycle?.predicted}
              onPick={(d) => setPicked(d === today ? null : d)}
            />
          </section>

          <section>
            <div className="label">
              <span className="n">03</span>Last 30 days
            </div>
            <Lanes today={today} data={data} />
            <div className="us-stats">
              {PEOPLE.map((p) => (
                <PersonStats key={p.id} who={p} today={today} moods={data.moods} work={data.work} />
              ))}
              <CycleStats cycle={cycle} />
            </div>
          </section>

          <section>
            <div className="label">
              <span className="n">04</span>Log
            </div>
            <Recent today={today} data={data} onPick={(d) => setPicked(d === today ? null : d)} />
          </section>

          <footer className="foot us-foot">
            <span className="meta">Saved to the site&rsquo;s database</span>
            <a className="meta" href="/api/us/export" download>
              Export CSV<span className="arrow">↓</span>
            </a>
          </footer>
        </>
      )}
    </>
  );
}

function withKey<T>(rec: Record<string, T>, key: string, value: T | null) {
  const next = { ...rec };
  if (value === null) delete next[key];
  else next[key] = value;
  return next;
}

function LogPanel({
  entry,
  onSave,
}: {
  entry?: Entry;
  onSave: (mood: Mood | null, note: string) => void;
}) {
  const [note, setNote] = useState(entry?.note ?? "");
  const noteChanged = (entry?.note ?? "") !== note.trim();

  return (
    <div className="log-panel">
      <div className="faces" role="radiogroup" aria-label="How was the day?">
        {MOODS.map((m) => (
          <button
            key={m.id}
            role="radio"
            aria-checked={entry?.mood === m.id}
            className={`face-btn${entry?.mood === m.id ? " is-on" : ""}`}
            onClick={() => onSave(m.id, note)}
          >
            <Face mood={m.id} size={56} />
            <span>{m.label}</span>
          </button>
        ))}
      </div>
      <form
        className="note-row"
        onSubmit={(e) => {
          e.preventDefault();
          if (entry) onSave(entry.mood, note);
        }}
      >
        <input
          value={note}
          onChange={(e) => setNote(e.target.value)}
          maxLength={280}
          placeholder={entry ? "a line about the day (optional)" : "pick a face, then add a line if you like"}
        />
        {entry && noteChanged && <button type="submit">Save</button>}
      </form>
      <p className="meta stamp">
        {entry ? (
          <>
            logged at {fmtTime(entry.t)}
            <button className="link-btn muted" onClick={() => onSave(null, "")}>
              clear
            </button>
          </>
        ) : (
          "not logged yet"
        )}
      </p>
    </div>
  );
}

function WorkRow({
  time,
  isToday,
  onSave,
}: {
  time?: string;
  isToday: boolean;
  onSave: (time: string | null) => void;
}) {
  return (
    <div className="work-row">
      <span className="meta">At work</span>
      {!time && isToday && (
        <button className="work-now" onClick={() => onSave(nowHM())}>
          I&rsquo;m at work
        </button>
      )}
      <input
        type="time"
        aria-label="Time you got to work"
        value={time ?? ""}
        onChange={(e) => e.target.value && onSave(e.target.value)}
      />
      {time && (
        <button className="link-btn muted" onClick={() => onSave(null)}>
          clear
        </button>
      )}
    </div>
  );
}

function PeriodPanel({ flow, onSave }: { flow?: Flow; onSave: (flow: Flow | null) => void }) {
  return (
    <div className="period-panel">
      <span className="meta">Sophie&rsquo;s period</span>
      <div className="chips">
        <button aria-pressed={!flow} onClick={() => onSave(null)}>
          none
        </button>
        {FLOWS.map((f) => (
          <button key={f} aria-pressed={flow === f} className={`flow-${f}`} onClick={() => onSave(f)}>
            {f}
          </button>
        ))}
      </div>
    </div>
  );
}

function Calendar({
  today,
  selected,
  offset,
  setOffset,
  data,
  predicted,
  onPick,
}: {
  today: string;
  selected: string;
  offset: number;
  setOffset: (n: number) => void;
  data: UsData;
  predicted?: Set<string>;
  onPick: (d: string) => void;
}) {
  const now = parse(today);
  const first = new Date(now.getFullYear(), now.getMonth() + offset, 1);
  const daysIn = new Date(first.getFullYear(), first.getMonth() + 1, 0).getDate();
  const cells = [
    ...Array.from({ length: first.getDay() }, () => null),
    ...Array.from({ length: daysIn }, (_, i) => toKey(new Date(first.getFullYear(), first.getMonth(), i + 1))),
  ];

  return (
    <div className="cal">
      <div className="cal-head">
        <button className="link-btn muted" onClick={() => setOffset(offset - 1)} aria-label="Previous month">
          ←
        </button>
        <span className="cal-title">
          {first.toLocaleDateString("en-US", { month: "long", year: "numeric" })}
        </span>
        <button
          className="link-btn muted"
          onClick={() => setOffset(offset + 1)}
          disabled={offset >= 1}
          aria-label="Next month"
        >
          →
        </button>
      </div>
      <div className="cal-grid">
        {WEEKDAYS.map((w, i) => (
          <span key={i} className="meta cal-wd">
            {w}
          </span>
        ))}
        {cells.map((d, i) => {
          if (!d) return <span key={`x${i}`} />;
          const future = d > today;
          const flow = data.period[d];
          const cls = [
            "cal-day",
            d === today && "is-today",
            d === selected && "is-selected",
            flow && `has-period flow-${flow}`,
            !flow && predicted?.has(d) && "is-predicted",
          ]
            .filter(Boolean)
            .join(" ");
          return (
            <button key={d} className={cls} disabled={future} onClick={() => onPick(d)} title={fmtDay(d)}>
              <span className="num">{parse(d).getDate()}</span>
              <span className="pair">
                {PEOPLE.map((p) => {
                  const m = data.moods[`${d}:${p.id}`]?.mood;
                  return <i key={p.id} className={m ? `is-${m}` : ""} />;
                })}
              </span>
            </button>
          );
        })}
      </div>
      <p className="meta cal-key">
        <span>left Utkarsh · right Sophie</span>
        {MOODS.map((m) => (
          <span key={m.id}>
            <i className={`key-mood is-${m.id}`} /> {m.label.toLowerCase()}
          </span>
        ))}
        <span>
          <i className="key-period" /> period
        </span>
        <span>
          <i className="key-predicted" /> predicted
        </span>
      </p>
    </div>
  );
}

// The last 30 days as aligned rows, one per person plus Sophie's period, so days line up.
function Lanes({ today, data }: { today: string; data: UsData }) {
  const days = Array.from({ length: 30 }, (_, i) => addDays(today, -29 + i));
  const both = days.filter((d) => PEOPLE.every((p) => data.moods[`${d}:${p.id}`]));
  const same = both.filter((d) => data.moods[`${d}:utkarsh`].mood === data.moods[`${d}:sophie`].mood).length;
  const rows = [
    ...PEOPLE.map((p) => ({
      name: p.name,
      cls: (d: string) => {
        const m = data.moods[`${d}:${p.id}`]?.mood;
        return m ? `is-${m}` : "";
      },
    })),
    { name: "Period", cls: (d: string) => (data.period[d] ? `is-period flow-${data.period[d]}` : "") },
  ];

  return (
    <div className="lanes">
      {rows.map((r) => (
        <div className="lane" key={r.name}>
          <span className="meta lane-name">{r.name}</span>
          <div className="lane-days">
            {days.map((d) => (
              <i key={d} className={r.cls(d)} title={fmtDay(d)} />
            ))}
          </div>
        </div>
      ))}
      <div className="lane">
        <span />
        <div className="lane-days lane-ticks meta">
          {days.map((d, i) => (
            <span key={d}>{i === 29 ? "today" : (29 - i) % 7 === 0 ? parse(d).getDate() : ""}</span>
          ))}
        </div>
      </div>
      {both.length > 0 && (
        <p className="meta lanes-sum">
          Same face on <strong>{same}</strong> of the {both.length} days you both logged
        </p>
      )}
    </div>
  );
}

function PersonStats({
  who,
  today,
  moods,
  work,
}: {
  who: { id: Who; name: string };
  today: string;
  moods: Record<string, Entry>;
  work: Record<string, string>;
}) {
  const arrivals = Array.from({ length: 30 }, (_, i) => work[`${addDays(today, -i)}:${who.id}`])
    .filter(Boolean)
    .map(toMins);
  const last30 = Array.from({ length: 30 }, (_, i) => moods[`${addDays(today, -29 + i)}:${who.id}`]?.mood);
  const counts = MOODS.map((m) => ({ ...m, n: last30.filter((x) => x === m.id).length }));
  const logged = counts.reduce((a, c) => a + c.n, 0);
  // Streak counts back from today, or from yesterday if today isn't logged yet.
  let streak = 0;
  let d = moods[`${today}:${who.id}`] ? today : addDays(today, -1);
  while (moods[`${d}:${who.id}`]) {
    streak++;
    d = addDays(d, -1);
  }

  return (
    <div className="stat-card">
      <div className="stat-name">{who.name}</div>
      <div className="stat-counts meta">
        {counts.map((c) => (
          <span key={c.id}>
            <Face mood={c.id} size={12} /> {c.n}
          </span>
        ))}
      </div>
      <div className="meta">
        {logged}/30 days · {streak > 0 ? `${streak}-day streak` : "no streak"}
      </div>
      {arrivals.length > 0 && (
        <div className="meta">
          at work ~{fmtClock(Math.round(avg(arrivals)))} on average ({arrivals.length} days)
        </div>
      )}
    </div>
  );
}

function CycleStats({ cycle }: { cycle: ReturnType<typeof cycleFrom> }) {
  if (!cycle) {
    return (
      <div className="stat-card cycle">
        <div className="stat-name">Cycle</div>
        <p className="note">Log period days and the next one gets predicted here.</p>
      </div>
    );
  }
  const when =
    cycle.until > 1
      ? `in ${cycle.until} days`
      : cycle.until === 1
        ? "tomorrow"
        : cycle.until === 0
          ? "today"
          : `${-cycle.until} day${cycle.until === -1 ? "" : "s"} late`;
  return (
    <div className="stat-card cycle">
      <div className="stat-name">Cycle</div>
      <div className="cycle-day">
        day <strong>{cycle.day}</strong>
        <span className="meta"> of ~{cycle.cycleLen}</span>
      </div>
      <div className="cycle-bar">
        <i style={{ width: `${Math.min(100, (cycle.day / cycle.cycleLen) * 100)}%` }} />
      </div>
      <div className="meta">
        next ~{parse(cycle.next).toLocaleDateString("en-US", { month: "short", day: "numeric" })} · {when}
      </div>
      <div className="meta">
        periods ~{cycle.periodLen} days{cycle.estimated && " · estimate improves after 2 cycles"}
      </div>
    </div>
  );
}

function Recent({ today, data, onPick }: { today: string; data: UsData; onPick: (d: string) => void }) {
  const days = Array.from({ length: 7 }, (_, i) => addDays(today, -i)).filter(
    (d) => data.period[d] || PEOPLE.some((p) => data.moods[`${d}:${p.id}`] || data.work[`${d}:${p.id}`])
  );
  if (!days.length) return <p className="intro">Nothing yet. Today&rsquo;s a good day to start.</p>;
  return (
    <div className="list recent">
      {days.map((d) => (
        <div className="row" key={d}>
          <button className="meta day-link" onClick={() => onPick(d)}>
            {d === today ? "Today" : fmtDay(d)}
          </button>
          <div>
            {PEOPLE.map((p) => {
              const e = data.moods[`${d}:${p.id}`];
              const atWork = data.work[`${d}:${p.id}`];
              return (
                <div className="recent-line" key={p.id}>
                  <Face mood={e?.mood} size={18} />
                  <span className="who">{p.name}</span>
                  {e ? (
                    <>
                      <span className="meta">{fmtTime(e.t)}</span>
                      {e.note && <span className="note">{e.note}</span>}
                    </>
                  ) : (
                    <span className="meta">—</span>
                  )}
                  {atWork && <span className="meta at-work">at work {fmtClock(toMins(atWork))}</span>}
                </div>
              );
            })}
            {data.period[d] && <span className="tag">period · {data.period[d]}</span>}
          </div>
        </div>
      ))}
    </div>
  );
}
