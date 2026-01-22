export interface Project {
  slug: string;
  title: string;
  subtitle: string;
  category: string;
  year: string;
  description: string;
  longDescription: string;
  status: "completed" | "ongoing" | "upcoming";
  tags: string[];
  highlights: string[];
  role?: string;
  collaborators?: string[];
  publications?: {
    title: string;
    venue: string;
    year: string;
    link?: string;
  }[];
  links?: {
    label: string;
    url: string;
  }[];
}

export const projects: Project[] = [
  {
    slug: "unfinished-river",
    title: "The Unfinished River",
    subtitle: "A Political Ecology of the Namami Gange Program",
    category: "Dissertation Research",
    year: "2022-Present",
    description: "Investigating the political ecology of the Namami Gange program and its impact on aquatic biodiversity.",
    longDescription: `This dissertation investigates the political ecology of the Namami Gange program and its impact on aquatic biodiversity along India's Ganga River.

The research examines how massive state-led infrastructure projects reshape relationships between humans and aquatic biodiversity—and who (or what) is overlooked in the process.

Three papers are currently in various stages of preparation: two under review at Geoforum and Environment and Planning E, and one in preparation for Transactions of the Institute of British Geographers.`,
    status: "ongoing",
    tags: ["Political Ecology", "River Restoration", "Multispecies Ethnography", "India", "Namami Gange"],
    highlights: [
      "Multi-sited ethnographic fieldwork along the Ganga",
      "Policy analysis of the Namami Gange program",
      "Stakeholder mapping across government, science, and communities",
      "Two papers under review (Geoforum, Environment and Planning E)",
      "One paper in preparation for Transactions of IBG"
    ],
    role: "PhD Researcher",
    collaborators: ["Dr. Jared Margulies (Advisor)", "University of Alabama"],
    publications: [
      {
        title: "Paper 1 - Under Review",
        venue: "Geoforum",
        year: "2024"
      },
      {
        title: "Paper 2 - Under Review",
        venue: "Environment and Planning E",
        year: "2024"
      },
      {
        title: "Paper 3 - In Preparation",
        venue: "Transactions of the Institute of British Geographers",
        year: "2025"
      }
    ]
  },
  {
    slug: "project-disha",
    title: "Project Disha",
    subtitle: "UNDP & IKEA Foundation Partnership",
    category: "Policy & Strategy",
    year: "2020-2022",
    description: "Monitored and evaluated project implementation; developed communication plans and solicited strategic partnerships.",
    longDescription: `Project Disha was a collaboration between UNDP India and the IKEA Foundation focused on empowering communities and influencing state-level strategy.

As Policy & Strategy Associate and Program Coordinator, I monitored and evaluated (M&E) project implementation, developed communication plans, and solicited strategic partnerships to ensure field-level impact.

I co-authored two foundational concept notes that improved stakeholder engagement and aligned project goals with community needs.`,
    status: "completed",
    tags: ["International Development", "Policy", "M&E", "Stakeholder Engagement", "UNDP"],
    highlights: [
      "Monitored and evaluated project implementation",
      "Developed communication plans",
      "Solicited strategic partnerships",
      "Co-authored two foundational concept notes",
      "Improved stakeholder engagement and field-level impact"
    ],
    role: "Policy & Strategy Associate / Program Coordinator",
    collaborators: ["UNDP India", "IKEA Foundation"]
  },
  {
    slug: "seeing-animals-like-a-state",
    title: "Seeing Animals Like a State",
    subtitle: "Bureaucratic Gaze and Human-Wildlife Conflict",
    category: "Research Publication",
    year: "2024",
    description: "Led the Q-methodology analysis to study human subjectivity among forestry officials in South India.",
    longDescription: `This research examines how India's wildlife bureaucracy constructs and manages "problem animals" through the lens of human subjectivity.

I led the Q-methodology analysis to study perspectives among forestry officials in South India, revealing how bureaucratic legibility requirements transform complex human-animal relations into standardized categories.

The research was published in Geoforum and contributes to ongoing debates in political ecology about conservation governance and human-wildlife conflict.`,
    status: "completed",
    tags: ["Human-Wildlife Conflict", "Q Methodology", "Bureaucracy", "Conservation Governance", "South India"],
    highlights: [
      "Led the Q-methodology analysis",
      "Studied human subjectivity among forestry officials",
      "Published in Geoforum",
      "Contributed to political ecology of conservation"
    ],
    role: "Lead Analyst (Q Methodology)",
    publications: [
      {
        title: "Seeing Animals Like a State: Bureaucratic Gaze and Human-Wildlife Conflict",
        venue: "Geoforum",
        year: "2024",
        link: "#"
      }
    ]
  },
  {
    slug: "toasted",
    title: "Toasted",
    subtitle: "Climate Anxiety and Ecological Grief",
    category: "Digital Publication",
    year: "2023",
    description: "A digital publication exploring climate anxiety and ecological grief, bridging environmental science with mental health.",
    longDescription: `Toasted is a digital publication exploring climate anxiety and ecological grief, bridging environmental science with mental health discourse.

The project was awarded the Levitetz Innovation Seed Grant in recognition of its innovative approach to communicating complex environmental issues through accessible, personal narratives.

The publication explores how we process environmental loss and find meaning in an era of climate change.`,
    status: "ongoing",
    tags: ["Climate Communication", "Mental Health", "Digital Publishing", "Science Communication"],
    highlights: [
      "Awarded Levitetz Innovation Seed Grant",
      "Bridges environmental science with mental health",
      "Accessible narratives on climate anxiety",
      "Explores ecological grief and meaning-making"
    ],
    role: "Founder & Writer",
    links: [
      {
        label: "Read on Beehiiv",
        url: "https://toasted.beehiiv.com"
      }
    ]
  },
  {
    slug: "officer-review",
    title: "Officer Review",
    subtitle: "Governance Restructuring at Sussex Students' Union",
    category: "Governance Research",
    year: "2019-2020",
    description: "Evaluating and restructuring governance models for a body of 18,000+ students.",
    longDescription: `The Officer Review was a comprehensive governance evaluation project for Sussex Students' Union, representing over 18,000 students.

The project involved extensive qualitative research: 61 interviews, 10 focus groups, and 2 surveys to understand stakeholder perspectives on governance effectiveness.

The findings informed restructuring recommendations that improved student representation and institutional accountability.`,
    status: "completed",
    tags: ["Governance", "Qualitative Research", "Student Politics", "Institutional Analysis"],
    highlights: [
      "Conducted 61 interviews",
      "Facilitated 10 focus groups",
      "Administered 2 surveys",
      "Restructured governance for 18,000+ students",
      "Improved student representation"
    ],
    role: "Lead Researcher",
    collaborators: ["Sussex Students' Union"],
    links: [
      {
        label: "View Report",
        url: "https://sussexstudent.com/officer-review"
      }
    ]
  },
  {
    slug: "free-wednesdays",
    title: "Free Wednesdays",
    subtitle: "Period Poverty Social Initiative",
    category: "Social Initiative",
    year: "2019-2020",
    description: "Managed weekly distribution of free health products and coordinated with external charities for advice and support.",
    longDescription: `Free Wednesdays was a social initiative addressing period poverty on campus, providing free menstrual health products and support services.

As Program Manager and Women's Student Officer, I managed weekly distribution logistics and coordinated partnerships with external charities to provide advice and support services.

The initiative combined practical support with awareness-raising about menstrual health equity.`,
    status: "completed",
    tags: ["Social Initiative", "Period Poverty", "Health Equity", "Community Organizing"],
    highlights: [
      "Managed weekly distribution of health products",
      "Coordinated with external charities",
      "Provided advice and support services",
      "Raised awareness about period poverty"
    ],
    role: "Program Manager & Women's Student Officer",
    collaborators: ["Sussex Students' Union", "External health charities"]
  },
  {
    slug: "poverty-unpacked",
    title: "Poverty Unpacked",
    subtitle: "Podcast Research Assistant",
    category: "Knowledge Mobilization",
    year: "2019-2020",
    description: "Led initial digital communications and social media strategy to launch the podcast.",
    longDescription: `Poverty Unpacked is a podcast produced by the Institute of Development Studies that makes poverty research accessible to broader audiences.

As Research Assistant to Dr. Keetie Roelen, I led the initial digital communications and social media strategy to launch the podcast.

The work focused on translating complex development research into engaging, accessible content for non-academic audiences.`,
    status: "completed",
    tags: ["Knowledge Mobilization", "Podcast", "Development Studies", "Digital Communications"],
    highlights: [
      "Led digital communications strategy",
      "Developed social media launch plan",
      "Translated research for public audiences",
      "Supported podcast production"
    ],
    role: "Research Assistant",
    collaborators: ["Dr. Keetie Roelen", "Institute of Development Studies"],
    links: [
      {
        label: "Listen to Podcast",
        url: "https://poverty-unpacked.org"
      }
    ]
  },
  {
    slug: "gages",
    title: "GAGES",
    subtitle: "Graduate Association for Geography & Environment",
    category: "Student Leadership",
    year: "2023-Present",
    description: "Founded and designed the graduate student association to inculcate student voices within departmental decision-making.",
    longDescription: `GAGES (Graduate Association for Geography & Environment) is a student organization I founded at the University of Alabama to strengthen graduate student representation.

The association aims to inculcate student voices within departmental decision-making and improve communication among graduate students in the department.

As Founder and Designer, I developed the organizational structure, communication systems, and engagement strategies.`,
    status: "ongoing",
    tags: ["Student Leadership", "Institutional Design", "Community Building", "Graduate Education"],
    highlights: [
      "Founded the graduate student association",
      "Designed organizational structure",
      "Improved departmental communication",
      "Amplified student voices in decision-making"
    ],
    role: "Founder & Designer",
    collaborators: ["University of Alabama Department of Geography"]
  }
];

export function getProjectBySlug(slug: string): Project | undefined {
  return projects.find(p => p.slug === slug);
}

export function getAllProjectSlugs(): string[] {
  return projects.map(p => p.slug);
}
