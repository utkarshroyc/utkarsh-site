import Cardinal from "@/components/Cardinal";
import Coords from "@/components/Coords";
import LocalConditions from "@/components/LocalConditions";
import { MapProvider, PlaceRow } from "@/components/MapContext";
import Topo from "@/components/Topo";
import Turtle from "@/components/Turtle";
import WorldMap from "@/components/WorldMap";
import {
  EMAIL,
  currently,
  education,
  links,
  logos,
  now,
  otherWriting,
  papers,
  work,
  type Entry,
} from "@/lib/content";
import { getReading } from "@/lib/fable";
import { getPosts, SUBSTACK_URL } from "@/lib/substack";

export const revalidate = 3600;

const fmt = new Intl.DateTimeFormat("en-US", {
  month: "short",
  year: "numeric",
});

function Ext({ href, children }: { href: string; children: React.ReactNode }) {
  const external = href.startsWith("http");
  return (
    <a
      href={href}
      {...(external && { target: "_blank", rel: "noopener noreferrer" })}
    >
      {children}
      {external && <span className="arrow">↗</span>}
    </a>
  );
}

function Section({
  id,
  n,
  title,
  children,
}: {
  id: string;
  n: string;
  title: string;
  children: React.ReactNode;
}) {
  return (
    <section id={id} aria-labelledby={`${id}-h`}>
      <h2 id={`${id}-h`} className="label">
        <span className="n">{n}</span> {title}
      </h2>
      {children}
    </section>
  );
}

function Row({ e }: { e: Entry }) {
  return (
    <PlaceRow place={e.place} years={e.years}>
      <span className="meta">{e.years}</span>
      <div>
        <p className="title">
          {e.href ? <Ext href={e.href}>{e.org}</Ext> : e.org}
        </p>
        <p className="role">{e.role}</p>
        {e.summary && <p className="note">{e.summary}</p>}
        {e.points && (
          <ul className="points">
            {e.points.map((p) => (
              <li key={p}>{p}</li>
            ))}
          </ul>
        )}
      </div>
    </PlaceRow>
  );
}

function Currently({
  latest,
  reading,
}: {
  latest?: { title: string; href: string };
  reading: { value: string; href: string } | null;
}) {
  const items = [
    ...currently
      .map((c) => (c.label === "reading" && reading ? { ...c, ...reading } : c))
      .filter((c) => c.value),
    ...(latest ? [{ label: "writing", value: latest.title, href: latest.href }] : []),
  ];
  if (!items.length) return null;
  return (
    <p className="currently">
      <span className="now-dot" aria-hidden="true" />
      Currently{" "}
      {items.map((c, i) => (
        <span key={c.label}>
          {i > 0 && " · "}
          {c.label}{" "}
          {c.href ? <Ext href={c.href}>{c.value}</Ext> : <em>{c.value}</em>}
        </span>
      ))}
    </p>
  );
}

export default async function Home() {
  const [posts, reading] = await Promise.all([getPosts(), getReading()]);

  return (
    <MapProvider>
      <main className="page">
        <Coords />
        <Cardinal />
        <header className="masthead">
          <Topo />
          <p className="meta">
            <span>
              40.68° N, 73.94° W · Brooklyn
              <LocalConditions />
            </span>
          </p>
          <h1>Utkarsh Roy Choudhury</h1>
          <p className="lede">
            Geographer turned climate operator. I spent five years studying how
            big environmental programs play out on the ground, along
            India&apos;s Ganga. Now I work on the other end of the problem at{" "}
            <Ext href={now.href!}>Coral</Ext>, making home electrification less
            painful.
          </p>
          <p className="lede">
            Before that: policy and program work with UNDP, research
            communication at IDS, and a running habit of{" "}
            <a href="#writing">writing things down</a>.
          </p>
          <Currently latest={posts[0]} reading={reading} />
          <nav className="jump" aria-label="Sections">
            <a href="#work">Work</a>
            <a href="#writing">Writing</a>
            <a href="#research">Research</a>
            <a href="#contact">Contact</a>
          </nav>
        </header>

        {(
          [
            ["Worked with", logos.worked],
            ["Studied at", logos.studied],
          ] as const
        ).map(([label, list]) => (
          <section key={label} className="logos" aria-label={label}>
            <p className="meta">{label}</p>
            <ul>
              {list.map((l) => (
                <li key={l.name} data-tip={l.tip}>
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img src={l.src} alt={l.name} style={{ height: l.h }} />
                </li>
              ))}
            </ul>
          </section>
        ))}

        <WorldMap />

        <Section id="work" n="01" title="Work">
          <ul className="list">
            {work.map((e) => (
              <Row key={e.org + e.role} e={e} />
            ))}
          </ul>
        </Section>

        <Section id="writing" n="02" title="Writing">
          <p className="intro">
            <Ext href={SUBSTACK_URL}>slightly* unfinished</Ext> is my newsletter
            on culture, climate and the spaces in between.
          </p>
          <ul className="list">
            {posts.map((p) => (
              <li key={p.href} className="row">
                <span className="meta">{fmt.format(p.date)}</span>
                <div>
                  <p className="title">
                    <Ext href={p.href}>{p.title}</Ext>
                  </p>
                  {p.blurb && <p className="note">{p.blurb}</p>}
                </div>
              </li>
            ))}
            {otherWriting.map((w) => (
              <li key={w.href} className="row">
                <span className="meta">Also</span>
                <div>
                  <p className="title">
                    <Ext href={w.href}>{w.title}</Ext>
                  </p>
                  <p className="note">{w.note}</p>
                </div>
              </li>
            ))}
          </ul>
        </Section>

        <Section id="research" n="03" title="Research">
          <p className="intro">
            Political ecology, river restoration and conservation governance.
          </p>
          <ul className="list">
            {papers.map((p) => (
              <li key={p.title} className="row">
                <span className="meta">{p.year}</span>
                <div>
                  <p className="title">
                    {p.href ? <Ext href={p.href}>{p.title}</Ext> : p.title}
                  </p>
                  <p className="note">
                    <em>{p.venue}</em>
                    {p.status && <span className="tag">{p.status}</span>}
                  </p>
                </div>
              </li>
            ))}
          </ul>

          <h3 className="label sub">Education</h3>
          <ul className="list">
            {education.map((e) => (
              <Row key={e.org + e.role} e={e} />
            ))}
          </ul>
        </Section>

        <Section id="contact" n="04" title="Contact">
          <p className="intro">
            Happy to talk about climate, electrification, conservation policy,
            or anything I&apos;ve written. The fastest way to reach me is{" "}
            <a href={`mailto:${EMAIL}`}>email</a>.
          </p>
          <ul className="elsewhere">
            {links.map((l) => (
              <li key={l.label}>
                <Ext href={l.href}>{l.label}</Ext>
              </li>
            ))}
          </ul>
        </Section>

        <footer className="foot meta">
          <Turtle />
          <svg viewBox="0 0 120 10" className="scale" aria-hidden="true">
            <path d="M1 8V2M1 5H119M119 8V2M30 5V3M60 7V2M90 5V3" />
            <rect x="1" y="4" width="29" height="2" />
            <rect x="60" y="4" width="30" height="2" />
          </svg>
          <span>© {new Date().getFullYear()} Utkarsh Roy Choudhury</span>
        </footer>
      </main>
    </MapProvider>
  );
}
