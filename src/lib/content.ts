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

export type Entry = {
  years: string;
  org: string;
  role: string;
  place?: string; // links the row to a map marker
  href?: string;
  summary?: string;
  points?: string[];
};

export const now: Entry = {
  years: "2026—",
  org: "Coral",
  role: "Operations & Research",
  place: "Brooklyn",
  href: "https://startcoral.com",
  summary:
    "Helping households switch to heat pumps by untangling the rebate and incentive programs that make it affordable.",
};

export const work: Entry[] = [
  now,
  {
    years: "2021—26",
    org: "University of Alabama",
    role: "PhD Researcher, Geography",
    place: "Tuscaloosa",
    summary:
      "The Unfinished River: a dissertation on the political ecology of India's Namami Gange program, and how a multi-billion-dollar river restoration reshapes relations between people, the state and aquatic wildlife.",
    points: [
      "40+ interviews with officials, NGO scientists and practitioners across India",
      "Policy and financial analysis of a $3B+ restoration program",
      "Managed a $10k+ research budget and multi-site fieldwork",
    ],
  },
  {
    years: "2021—26",
    org: "University of Alabama",
    role: "Program Coordinator & Head Teaching Assistant",
    place: "Tuscaloosa",
    summary:
      "Ran instructional operations for an intro science program serving 800+ students a semester; supervised and trained 10–15 graduate assistants. Also co-founded GAGES, the department's graduate student association.",
  },
  {
    years: "2020",
    org: "Institute of Development Studies",
    role: "Knowledge Mobilization Associate",
    place: "Brighton",
    summary:
      "Led digital communications for the launch of Poverty Unpacked, a podcast translating poverty research for public audiences.",
  },
  {
    years: "2019—20",
    org: "University of Sussex Students' Union",
    role: "Strategic Research Coordinator",
    place: "Brighton",
    summary:
      "Ran the Officer Review, a mixed-methods governance review for a union of 18,000+ students: 61 interviews, 10 focus groups and 2 surveys, followed by a restructuring.",
  },
  {
    years: "2017—19",
    org: "Upcyclio",
    role: "Co-founder",
    place: "Lucknow",
    href: "https://www.linkedin.com/company/upcyclio/",
    summary:
      "Co-founded a greentech product company in Lucknow, designing upcycled lifestyle products for a more sustainable, eco-conscious way of living.",
  },
  {
    years: "2018",
    org: "UNDP Maharashtra",
    role: "Policy Research Associate",
    summary:
      "Policy briefs and concept notes on rural entrepreneurship and livelihoods, informing state planning and CSR partnerships.",
  },
  {
    years: "2017",
    org: "UNDP",
    role: "Program & Strategy Associate",
    place: "Pune",
    summary:
      "Concept notes, M&E frameworks and state-level coordination for Project Disha, an initiative to skill 1 million women across Maharashtra, Telangana and Odisha.",
  },
  {
    years: "2015—16",
    org: "AIESEC in India",
    role: "Senior Manager, Sales & International Relations",
    place: "Pune",
    summary:
      "Led a team of six running international volunteering exchanges for students, and coordinated with AIESEC entities across Asia-Pacific.",
  },
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
    venue: "Environment and Planning E: Nature and Space",
    href: "https://doi.org/10.1177/25148486261455652",
  },
  {
    year: "2026",
    title:
      "The politics of invisibilization: environmental performativity and the erasure of nonhuman life in India's Namami Gange Program",
    venue: "Geoforum 172",
    href: "https://doi.org/10.1016/j.geoforum.2026.104632",
  },
  {
    year: "2026",
    title: "Four decades of Ganga rejuvenation: evidence, outcomes, and road ahead",
    venue: "WIREs Water 13(5)",
    href: "https://doi.org/10.1002/wat2.70087",
  },
  {
    year: "2026",
    title:
      "The Unfinished River: a political ecology of restoration and nonhuman erasure on the Ganga River",
    venue: "PhD dissertation, University of Alabama",
  },
  {
    year: "2023",
    title:
      "Seeing animals like a state? Divergent forester subjectivities and the managing of human-wildlife conflicts in South India",
    venue: "Geoforum 147",
    href: "https://doi.org/10.1016/j.geoforum.2023.103892",
  },
  {
    year: "—",
    title:
      "“How will the turtles know?” Ecological substitution and the act of replacing a wildlife sanctuary on the Ganga",
    venue: "Transactions of the IBG",
    status: "In preparation",
  },
  {
    year: "2018",
    title: "Moving from wages to livelihood in rural India: creation of micro-entrepreneurs",
    venue: "UNDP Maharashtra",
  },
];

export const otherWriting = [
  {
    title: "Toasted",
    note: "A publication on climate anxiety and ecological grief. Levitetz Innovation Seed Grant.",
    href: "https://toasted.beehiiv.com",
  },
];

export const education: Entry[] = [
  { years: "2026", org: "University of Alabama", role: "PhD, Geography", place: "Tuscaloosa" },
  { years: "2020", org: "IDS, University of Sussex", role: "MA, Development Studies (Distinction)", place: "Brighton" },
  { years: "2016—19", org: "Symbiosis International University", role: "BBA, Environment Management", place: "Pune" },
];
