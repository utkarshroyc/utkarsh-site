import currentlyJson from "./currently.json";

// All site copy lives here. Edit this file to update the site.

export const EMAIL = "utkarsh.roy15@gmail.com";

// "Currently" line under the intro. Edit currently.json; empty values are hidden and
// "writing" fills itself in from the latest newsletter post.
export const currently: { label: string; value: string; href?: string }[] = currentlyJson;

export const links = [
  { label: "Email", href: `mailto:${EMAIL}` },
  { label: "LinkedIn", href: "https://www.linkedin.com/in/utkarsh-roy-choudhury-phd-816162ba/" },
  { label: "Scholar", href: "https://scholar.google.com/citations?user=gWzksQwAAAAJ&hl=en" },
  { label: "ORCID", href: "https://orcid.org/0000-0001-6446-1138" },
];

// Logo strips. `h` is the rendered height in px, tuned per mark for optical balance.
export const logos = {
  worked: [
    { name: "Coral", src: "/logos/coral.svg", h: 18, tip: "Operations & Research · 2026—" },
    { name: "Work on Climate", src: "/logos/work-on-climate.svg", h: 16, tip: "Work on Climate" },
    { name: "Upcyclio", src: "/logos/upcyclio.png", h: 24, tip: "Co-founder · 2017–19" },
    { name: "UNDP", src: "/logos/undp.svg", h: 40, tip: "Policy & Program · 2017–18" },
    { name: "Institute of Development Studies", src: "/logos/ids.svg", h: 30, tip: "Knowledge Mobilization · 2020" },
    { name: "Sussex Students' Union", src: "/logos/sussex-su.svg", h: 26, tip: "Strategic Research · 2019–20" },
    { name: "AIESEC", src: "/logos/aiesec.svg", h: 18, tip: "Senior Manager · 2015–16" },
  ],
  studied: [
    { name: "The University of Alabama", src: "/logos/alabama.svg", h: 26, tip: "PhD, Geography · 2026" },
    { name: "University of Sussex", src: "/logos/sussex.svg", h: 40, tip: "MA, Development Studies · 2020" },
    { name: "Symbiosis International University", src: "/logos/symbiosis.png", h: 18, tip: "BBA · 2016–19" },
  ],
};

// Map. Places are joined in order by the route line.
// [longitude, latitude]
export type Place = { name: string; at: [number, number]; years: string; note: string; label?: "left" | "right" | "below" | "above" };

export const places: Place[] = [
  { name: "Lucknow", at: [80.95, 26.85], years: "Home · Upcyclio 2017–19", note: "Where it started", label: "right" },
  { name: "Pune", at: [73.86, 18.52], years: "2015–19", note: "BBA, AIESEC, UNDP", label: "left" },
  { name: "Brighton", at: [-0.14, 50.82], years: "2019–20", note: "MA, IDS, Students' Union", label: "above" },
  { name: "Tuscaloosa", at: [-87.57, 33.21], years: "2021–26", note: "PhD, teaching, GAGES", label: "below" },
  { name: "Brooklyn", at: [-73.94, 40.68], years: "2026—", note: "Coral", label: "right" },
];

export const CORAL_URL = "https://startcoral.com";
export const LINKEDIN = links[1].href;

// About me. Drafted from my essays on slightly* unfinished.
// TODO(utkarsh): edit freely; these are a first pass in my voice.
export type Note = { label: string; text: string; essay?: { title: string; href: string } };

const ESSAYS = "https://slightlyunfinished.substack.com/p";

export const about: Note[] = [
  {
    label: "Home",
    text: "Home, for me, has always been a person, never a city. I've lived in five of them, and the places I miss are really the people in them: the friend who left banana bread on my desk, the brother who slept on the floor of an empty apartment with me our first week in Alabama.",
    essay: { title: "Love Letters from the Finish Line", href: `${ESSAYS}/love-letters-from-the-finish-line` },
  },
  {
    label: "Rivers",
    text: "I spent five years thinking about one river, the Ganga, and I still go looking for water wherever I land. My favourite place in Tuscaloosa was a plain walkway along the Black Warrior River, where herons stood in the shallows and the evening light went copper.",
  },
  {
    label: "Birds",
    text: "I moved to America knowing none of its birds. Now I can't stop noticing them: the cardinal that never leaves its patch, the flicker drumming on a dead branch. Click the red one perched nearby; it sings.",
    essay: { title: "tuscaloosa, or something like it", href: `${ESSAYS}/tuscaloosa-or-something-like-it` },
  },
  {
    label: "Climbing",
    text: "I grew up with the Himalayas, so I was a mountain snob until sixty feet of Kentucky sandstone humbled me. Climbing was never about conquering anything. On the wall, the world goes quiet and all that exists is the next hold.",
    essay: { title: "vertical stillness", href: `${ESSAYS}/vertical-stillness` },
  },
  {
    label: "Learning",
    text: "Drop me into something I couldn't care less about and I'll figure it out. That's my trademark statement at this point. Ask me how a political ecologist ended up teaching atmospheric science to a hundred undergrads.",
    essay: { title: "good enough (?)", href: `${ESSAYS}/good-enough` },
  },
  {
    label: "Strong opinions",
    text: "Good coffee matters. Presentations should move with the argument. And resilience can be a trap: we've gotten very good at cleaning up our messes and much worse at not making them.",
    essay: { title: "beautiful, sinking things", href: `${ESSAYS}/beautiful-sinking-things` },
  },
];

// One line per chapter, matching the cities on the map. The full CV lives on LinkedIn.
export type Chapter = { years: string; place: string; line: string; href?: string };

export const chapters: Chapter[] = [
  { years: "2026—", place: "Brooklyn", line: "Operations & research at Coral", href: CORAL_URL },
  { years: "2021—26", place: "Tuscaloosa", line: "PhD in Geography on the politics of restoring the Ganga, while teaching about 100 undergrads a semester" },
  { years: "2019—20", place: "Brighton", line: "MA at the Institute of Development Studies, research at the Students' Union" },
  { years: "2017—19", place: "Lucknow", line: "Co-founded Upcyclio, an upcycling startup" },
  { years: "2015—19", place: "Pune", line: "BBA at Symbiosis, AIESEC, and my first policy work with UNDP" },
];

export type Paper = {
  year: string;
  title: string;
  venue: string;
  status?: "In preparation";
  href?: string;
};

export const papers: Paper[] = [
  {
    year: "2026",
    title:
      "Maintained disrepair: accumulation by rejuvenation, financialization, and the politics of restoration in India's Namami Gange program",
    venue: "Environment and Planning E",
    href: "https://doi.org/10.1177/25148486261455652",
  },
  {
    year: "2026",
    title:
      "The politics of invisibilization: environmental performativity and the erasure of nonhuman life in India's Namami Gange Program",
    venue: "Geoforum",
    href: "https://doi.org/10.1016/j.geoforum.2026.104632",
  },
  {
    year: "2026",
    title: "Four decades of Ganga rejuvenation: evidence, outcomes, and road ahead",
    venue: "WIREs Water",
    href: "https://doi.org/10.1002/wat2.70087",
  },
  {
    year: "2023",
    title:
      "Seeing animals like a state? Divergent forester subjectivities and the managing of human-wildlife conflicts in South India",
    venue: "Geoforum",
    href: "https://doi.org/10.1016/j.geoforum.2023.103892",
  },
  {
    year: "—",
    title:
      "“How will the turtles know?” Ecological substitution and the act of replacing a wildlife sanctuary on the Ganga",
    venue: "Transactions of the IBG",
    status: "In preparation",
  },
];

export const otherWriting = [
  {
    title: "Toasted",
    note: "A newsletter on climate anxiety I started with a friend. Levitetz Innovation Seed Grant.",
    href: "https://toasted.beehiiv.com",
  },
];
