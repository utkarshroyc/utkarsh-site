"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import { Download, Mail, MapPin, Phone } from "lucide-react";

type ResumeType = "academic" | "industry";

const academicCV = {
  education: [
    {
      degree: "Ph.D., Geography (Environmental Governance & Political Ecology)",
      institution: "University of Alabama",
      year: "May 2026",
      details: "Advisor: Dr. Jared Margulies\nDissertation: \"The Unfinished River: A Political Ecology of Restoration and Nonhuman Erasure on the Ganga River\"",
    },
    {
      degree: "M.A., Development Studies (Distinction)",
      institution: "Institute of Development Studies, University of Sussex",
      year: "September 2020",
      details: "Advisor: Dr. Amber Huff",
    },
    {
      degree: "B.B.A., Environment Management & Marketing",
      institution: "Symbiosis International University",
      year: "May 2019",
      details: "",
    },
  ],
  publications: {
    peerReviewed: [
      {
        citation: "Choudhury, U.R., Margulies, J.D., Mariyam, D., Rajeev, B.R. & Karanth, K.K. (2023). \"Seeing Animals Like a State? Divergent forester subjectivities towards managing human-wildlife conflicts in South India.\"",
        venue: "Geoforum",
        status: "Published",
      },
      {
        citation: "Choudhury, U.R. (Under Review). \"Maintained disrepair: accumulation by rejuvenation, financialization, and the politics of restoration in India's Namami Gange Program.\"",
        venue: "Environment and Planning E",
        status: "Under Review",
      },
      {
        citation: "Choudhury, U.R. (Under Review). \"The Politics of Invisibilization: Environmental Performativity and the Erasure of Nonhuman Life in India's Namami Gange Program.\"",
        venue: "Geoforum",
        status: "Under Review",
      },
    ],
    policyReports: [
      {
        citation: "Siddiqui, A. & Choudhury, U.R. (2018). \"Moving from Wages to Livelihood in Rural India -- Creation of Micro-Entrepreneurs.\"",
        org: "UNDP Maharashtra",
      },
      {
        citation: "Siddiqui, A. & Choudhury, U.R. (2017). \"Developing rural entrepreneurship programs with FMCGs and Skill Sakhi's in Maharashtra.\"",
        org: "UNDP Maharashtra",
      },
    ],
  },
  researchInterests: [
    "Political Ecology",
    "Environmental Governance",
    "Human-Wildlife Conflict",
    "Aquatic Biodiversity Conservation",
    "River Restoration Politics",
    "Science-Policy Interfaces",
    "Multispecies Justice",
    "Infrastructure Studies",
  ],
  awards: [
    { title: "Dr. Bobby Wilson Award for Environmental Justice Scholarship", amount: "$1,000", org: "University of Alabama", year: "2024" },
    { title: "Levitetz Innovation Seed Grant", amount: "$1,000", org: "University of Alabama", year: "2023" },
    { title: "Research & Travel Funding", amount: "$10,850+", org: "University of Alabama Graduate School", year: "2023-26" },
  ],
  presentations: [
    { title: "Maintained disrepair: accumulation by rejuvenation...", venue: "SEDAAG, Lexington, KY", year: "2025" },
    { title: "Stuck in a temporal loop: The securitization, extraction, and conservation nexus in India", venue: "AAG, Detroit, MI", year: "2025" },
    { title: "Between Symbolic Mascots and Endangered Inhabitants...", venue: "DOPE+, Lexington, KY", year: "2024" },
    { title: "Against the Flow: Unpacking contemporary river and wildlife conservation politics in India", venue: "AAG, Denver, CO", year: "2023" },
  ],
  leadership: [
    { role: "Board Member", org: "AAG Animal Geography Specialty Group", year: "2025-26" },
    { role: "Forum Panel Reviewer", org: "IUCN World Conservation Congress", year: "2025" },
    { role: "Vice President", org: "Graduate Association for Geography and Environmental Studies, University of Alabama", year: "2025-26" },
    { role: "Reviewer", org: "Global Development Network -- Global Development Awards Competition", year: "2024" },
    { role: "Conference Organizer", org: "Dimensions of Political Ecology (DOPE+) 2024", year: "2023-24" },
  ],
  affiliations: [
    "American Association of Geographers (AAG)",
    "Southeast Division of AAG (SEDAAG)",
  ],
};

const industryResume = {
  summary: "Environmental researcher and program specialist with 7+ years of experience in policy analysis, stakeholder engagement, and mixed-methods research. Proven track record of managing multi-year research initiatives, coordinating cross-sector partnerships between government agencies, NGOs, and international organizations, and translating complex socio-ecological data into actionable policy recommendations. Expertise in environmental governance, biodiversity conservation, corporate social responsibility (CSR), and climate resilience programming.",
  competencies: {
    "Research & Analysis": ["Qualitative Interviewing", "Semi-Structured Interviews", "Surveys", "Focus Groups", "Mixed-Methods Research Design", "Q Methodology", "Ethnography", "Policy & Document Analysis", "Stakeholder Mapping"],
    "Technical Tools": ["NVivo", "SPSS", "Python (Data Analysis)", "GIS (ArcGIS, QGIS)", "ERDAS Imagine", "Remote Sensing", "Excel", "Google Workspace", "Microsoft Office Suite"],
    "Project Management": ["Budget Administration", "IRB Compliance", "M&E Framework Development", "Multi-Stakeholder Coordination", "Grant Writing", "Report Writing"],
    "Languages": ["English (Native)", "Hindi (Native)", "Bengali (Basic)", "Spanish (Basic)"],
  },
  experience: [
    {
      title: "Lead Researcher & Project Coordinator",
      company: "University of Alabama, Department of Geography and the Environment",
      location: "Tuscaloosa, AL",
      period: "August 2021 - Present",
      highlights: [
        "Designed and executed a multi-year research project on river governance and aquatic biodiversity conservation in India, conducting 40+ stakeholder interviews with government officials, NGO scientists, and conservation practitioners.",
        "Managed IRB-compliant data collection processes and administered a $10,000+ research budget, coordinating field logistics across multiple research sites.",
        "Synthesized complex policy and financial documents to produce actionable governance recommendations on environmental restoration programs worth $3+ billion.",
        "Authored peer-reviewed publications and policy briefs translating research findings for academic and practitioner audiences.",
        "Presented research at 10+ national and international conferences, building networks with researchers, policymakers, and conservation practitioners.",
      ],
    },
    {
      title: "Program Coordinator & Head Teaching Assistant",
      company: "University of Alabama, Department of Geography and the Environment",
      location: "Tuscaloosa, AL",
      period: "August 2021 - Present",
      highlights: [
        "Coordinating instructional operations for a large introductory science program serving 800+ students per semester.",
        "Supervised and trained a team of 10-15 graduate assistants, standardizing workflows, managing schedules, and ensuring consistent delivery across multiple lab sections.",
        "Developed onboarding materials and facilitated training sessions for new teaching staff, improving instructional quality and team cohesion.",
        "Served as primary liaison between faculty, graduate assistants, and students, resolving issues and maintaining clear communication across stakeholders.",
      ],
    },
    {
      title: "Graduate Research Assistant",
      company: "University of Alabama, Department of Geography and the Environment",
      location: "Tuscaloosa, AL",
      period: "May 2022 - August 2022",
      highlights: [
        "Supported faculty research on human-wildlife conflict and conservation governance in South India.",
        "Contributed to data analysis and manuscript preparation for a peer-reviewed publication on forester decision-making in wildlife management.",
        "Conducted literature reviews and synthesized findings on conservation policy and stakeholder dynamics.",
      ],
    },
    {
      title: "Knowledge Mobilization Associate",
      company: "Institute of Development Studies, University of Sussex",
      location: "Brighton, UK",
      period: "July 2020 - October 2020",
      highlights: [
        "Executed digital content strategy for the Poverty Unpacked podcast, translating complex academic research into accessible narratives for policymakers and general audiences.",
        "Facilitated collaboration between senior researchers and external partners to ensure timely dissemination of project insights.",
        "Drafted promotional materials and coordinated communications across multiple platforms.",
      ],
    },
    {
      title: "Strategic Research Coordinator",
      company: "University of Sussex Students' Union",
      location: "Brighton, UK",
      period: "September 2019 - June 2020",
      highlights: [
        "Designed and implemented a mixed-methods organizational review involving 2 surveys, 61 interviews, and 10 focus groups to evaluate governance structures and inform strategic restructuring.",
        "Launched and managed \"Free Wednesdays\" period poverty initiative, administering a £3,000 budget and coordinating a team of 10 volunteers for weekly resource distribution.",
        "Conducted rapid-response policy analysis on the educational impact of COVID-19, influencing institutional diversity, equity, and inclusion (DEI) strategies.",
        "Provided strategic administrative and operational support to elected student officials to deliver on campaign goals.",
      ],
    },
    {
      title: "Policy Research Associate",
      company: "UNDP Maharashtra",
      location: "Mumbai, India",
      period: "April 2018 - June 2018",
      highlights: [
        "Supported UNDP Maharashtra's initiatives on rural livelihoods and sustainable development.",
        "Drafted policy briefs and concept notes on rural entrepreneurship and livelihood programs, informing state government planning and CSR partnership strategies.",
        "Prepared action plans and communication materials to support pilot project implementation and monitoring.",
        "Coordinated with government agencies and corporate partners to align program objectives with state development mandates.",
      ],
    },
    {
      title: "Program & Strategy Associate -- Project Disha",
      company: "United Nations Development Programme (UNDP) & IKEA Foundation Partnership",
      location: "Pune, India",
      period: "January 2017 - July 2017",
      highlights: [
        "Co-authored strategic concept notes for Project Disha, a multi-state initiative partnering with IKEA Foundation to skill 1 million women across Maharashtra, Telangana, and Odisha.",
        "Facilitated high-level policy coordination between 5+ state government bodies, corporate CSR partners, and civil society organizations.",
        "Developed Monitoring & Evaluation (M&E) frameworks and tracking tools to monitor pilot project implementation, ensuring alignment with donor requirements and state mandates.",
        "Created communication materials and action plans for program rollout across Maharashtra.",
      ],
    },
    {
      title: "Data Analyst / Survey Analyst",
      company: "Maharashtra State Housing Action League (MSHAL)",
      location: "Pune, India",
      period: "November 2017 - January 2018",
      highlights: [
        "Streamlined data collection processes for the placemaking survey component of the Smart Cities Project.",
        "Coordinated field data collection with a team of 50 students across target urban areas.",
        "Analyzed qualitative and quantitative citizen feedback data, performed regression analysis, and provided recommendations to improve survey methodology.",
      ],
    },
    {
      title: "Senior Manager -- Sales & International Relations",
      company: "AIESEC in India",
      location: "Pune, India",
      period: "September 2015 - April 2016",
      highlights: [
        "Led a team of 6 members responsible for facilitating international volunteering projects for students.",
        "Managed sales and marketing for the student sector, achieving recruitment and partnership targets.",
        "Coordinated international relations with other AIESEC entities across Asia-Pacific.",
        "Served on the On-Site Core Committee for the National Leadership Conference 2016.",
      ],
    },
    {
      title: "Online Volunteer -- Communications",
      company: "United Nations Volunteers: Asia and the Pacific",
      location: "Bangkok, Thailand (Remote)",
      period: "September 2016 - November 2016",
      highlights: [
        "Developed communication materials to help the UNV Regional Office for Asia and the Pacific engage with stakeholders and communicate its mandate consistently.",
      ],
    },
    {
      title: "Design & Communications Volunteer",
      company: "United Nations System Staff College for Sustainable Development",
      location: "Bonn, Germany",
      period: "March 2016 - April 2016",
      highlights: [
        "Supported a newly established UN office with visual communications.",
        "Designed graphics for outreach materials including flyers and brochures, contributing to the office's initial stakeholder engagement efforts.",
      ],
    },
  ],
  certifications: [
    "Consultant Training, Force of Nature (2023)",
    "u.lab 0x: Leading Awareness-Based Systems Change -- How to Sense and Actualize the Future",
    "Introduction to Data Science in Python",
    "Intermediate Python",
  ],
};

export default function ResumePage() {
  const [activeTab, setActiveTab] = useState<ResumeType>("academic");

  return (
    <>
      <Navbar />
      <main className="pt-20">
        {/* Header */}
        <section className="py-16 md:py-24">
          <div className="max-w-4xl mx-auto px-6 lg:px-8">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="text-center"
            >
              <h1 className="font-display font-bold text-4xl md:text-5xl tracking-tight mb-4">
                Resume
              </h1>
              <p className="text-text-secondary text-lg mb-8">
                Academic CV and Industry Experience
              </p>

              {/* Toggle Switch */}
              <div className="inline-flex items-center p-1 bg-bg-card border border-border rounded-full">
                <button
                  onClick={() => setActiveTab("academic")}
                  className={`relative px-6 py-2.5 rounded-full text-sm font-medium transition-colors ${
                    activeTab === "academic"
                      ? "text-bg-primary"
                      : "text-text-secondary hover:text-text-primary"
                  }`}
                  role="tab"
                  aria-selected={activeTab === "academic"}
                >
                  {activeTab === "academic" && (
                    <motion.span
                      layoutId="resume-tab-bg"
                      className="absolute inset-0 bg-accent rounded-full"
                      transition={{ type: "spring", stiffness: 500, damping: 30 }}
                    />
                  )}
                  <span className="relative z-10">Academic CV</span>
                </button>
                <button
                  onClick={() => setActiveTab("industry")}
                  className={`relative px-6 py-2.5 rounded-full text-sm font-medium transition-colors ${
                    activeTab === "industry"
                      ? "text-bg-primary"
                      : "text-text-secondary hover:text-text-primary"
                  }`}
                  role="tab"
                  aria-selected={activeTab === "industry"}
                >
                  {activeTab === "industry" && (
                    <motion.span
                      layoutId="resume-tab-bg"
                      className="absolute inset-0 bg-accent rounded-full"
                      transition={{ type: "spring", stiffness: 500, damping: 30 }}
                    />
                  )}
                  <span className="relative z-10">Industry Resume</span>
                </button>
              </div>

              {/* Download & Contact */}
              <div className="flex items-center justify-center gap-4 mt-8">
                <button className="inline-flex items-center gap-2 px-4 py-2 border border-border rounded-lg text-sm text-text-secondary hover:text-accent hover:border-accent transition-colors">
                  <Download size={16} />
                  Download PDF
                </button>
                <a
                  href="mailto:uchoudhury@crimson.ua.edu"
                  className="inline-flex items-center gap-2 px-4 py-2 border border-border rounded-lg text-sm text-text-secondary hover:text-accent hover:border-accent transition-colors"
                >
                  <Mail size={16} />
                  Contact
                </a>
              </div>
            </motion.div>
          </div>
        </section>

        {/* Content */}
        <section className="pb-24">
          <div className="max-w-4xl mx-auto px-6 lg:px-8">
            <AnimatePresence mode="wait">
              {activeTab === "academic" ? (
                <motion.div
                  key="academic"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  transition={{ duration: 0.3 }}
                >
                  {/* Contact Info */}
                  <div className="mb-12 p-6 bg-bg-card border border-border rounded-xl">
                    <h2 className="font-display font-bold text-2xl mb-4">Utkarsh Roy Choudhury</h2>
                    <p className="text-text-secondary">University of Alabama · Department of Geography and the Environment</p>
                    <div className="flex flex-wrap gap-4 mt-4">
                      <span className="text-text-tertiary flex items-center gap-2">
                        <MapPin size={16} /> Tuscaloosa, AL, USA
                      </span>
                      <a href="mailto:uchoudhury@crimson.ua.edu" className="text-accent hover:text-accent-hover transition-colors flex items-center gap-2">
                        <Mail size={16} /> uchoudhury@crimson.ua.edu
                      </a>
                    </div>
                  </div>

                  {/* Education */}
                  <div className="mb-12">
                    <h3 className="font-display font-bold text-xl mb-6 pb-2 border-b border-border">Education</h3>
                    <div className="space-y-6">
                      {academicCV.education.map((edu) => (
                        <div key={edu.degree}>
                          <div className="flex flex-wrap justify-between items-start gap-2">
                            <h4 className="font-semibold text-text-primary">{edu.degree}</h4>
                            <span className="text-accent text-sm font-mono">{edu.year}</span>
                          </div>
                          <p className="text-text-secondary">{edu.institution}</p>
                          {edu.details && (
                            <p className="text-text-tertiary text-sm mt-2 whitespace-pre-line">{edu.details}</p>
                          )}
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Research Interests */}
                  <div className="mb-12">
                    <h3 className="font-display font-bold text-xl mb-6 pb-2 border-b border-border">Research Interests</h3>
                    <div className="flex flex-wrap gap-2">
                      {academicCV.researchInterests.map((interest) => (
                        <span
                          key={interest}
                          className="px-3 py-1.5 bg-bg-hover border border-border rounded-full text-sm text-text-secondary"
                        >
                          {interest}
                        </span>
                      ))}
                    </div>
                  </div>

                  {/* Publications */}
                  <div className="mb-12">
                    <h3 className="font-display font-bold text-xl mb-6 pb-2 border-b border-border">Publications</h3>

                    <h4 className="text-sm uppercase tracking-wider text-text-tertiary mb-4 font-medium">Peer-Reviewed Articles</h4>
                    <div className="space-y-4 mb-8">
                      {academicCV.publications.peerReviewed.map((pub, i) => (
                        <div key={i} className="p-4 bg-bg-hover/50 rounded-lg">
                          <div className="flex flex-wrap items-center gap-2 mb-2">
                            <span className={`px-2 py-0.5 text-xs font-medium uppercase tracking-wider rounded ${
                              pub.status === "Published"
                                ? "bg-moss/20 text-moss"
                                : "bg-accent-alt/20 text-accent-alt"
                            }`}>
                              {pub.status}
                            </span>
                            <span className="text-text-tertiary text-sm italic">{pub.venue}</span>
                          </div>
                          <p className="text-text-primary text-sm">{pub.citation}</p>
                        </div>
                      ))}
                    </div>

                    <h4 className="text-sm uppercase tracking-wider text-text-tertiary mb-4 font-medium">Policy Reports & Strategic Documents</h4>
                    <div className="space-y-4">
                      {academicCV.publications.policyReports.map((pub, i) => (
                        <div key={i} className="p-4 bg-bg-hover/50 rounded-lg">
                          <p className="text-text-primary text-sm">{pub.citation}</p>
                          <p className="text-text-tertiary text-sm mt-1">{pub.org}</p>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Awards & Grants */}
                  <div className="mb-12">
                    <h3 className="font-display font-bold text-xl mb-6 pb-2 border-b border-border">Grants & Awards</h3>
                    <div className="space-y-4">
                      {academicCV.awards.map((award) => (
                        <div key={award.title} className="flex flex-wrap justify-between items-start gap-2 p-4 bg-bg-hover/50 rounded-lg">
                          <div>
                            <p className="text-text-primary font-medium">{award.title}</p>
                            <p className="text-text-tertiary text-sm">{award.org}</p>
                          </div>
                          <div className="text-right">
                            <span className="text-accent font-mono">{award.amount}</span>
                            <p className="text-text-tertiary text-sm">{award.year}</p>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Presentations */}
                  <div className="mb-12">
                    <h3 className="font-display font-bold text-xl mb-6 pb-2 border-b border-border">Selected Presentations</h3>
                    <div className="space-y-3">
                      {academicCV.presentations.map((pres, i) => (
                        <div key={i} className="flex flex-wrap justify-between items-start gap-2">
                          <div>
                            <p className="text-text-primary">&ldquo;{pres.title}&rdquo;</p>
                            <p className="text-text-tertiary text-sm">{pres.venue}</p>
                          </div>
                          <span className="text-accent text-sm font-mono">{pres.year}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Leadership */}
                  <div className="mb-12">
                    <h3 className="font-display font-bold text-xl mb-6 pb-2 border-b border-border">Leadership & Professional Service</h3>
                    <div className="space-y-3">
                      {academicCV.leadership.map((item, i) => (
                        <div key={i} className="flex flex-wrap justify-between items-start gap-2">
                          <div>
                            <p className="text-text-primary">{item.role}</p>
                            <p className="text-text-tertiary text-sm">{item.org}</p>
                          </div>
                          <span className="text-accent text-sm font-mono">{item.year}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Affiliations */}
                  <div>
                    <h3 className="font-display font-bold text-xl mb-6 pb-2 border-b border-border">Professional Affiliations</h3>
                    <div className="flex flex-wrap gap-2">
                      {academicCV.affiliations.map((aff) => (
                        <span
                          key={aff}
                          className="px-3 py-1.5 bg-bg-hover border border-border rounded-full text-sm text-text-secondary"
                        >
                          {aff}
                        </span>
                      ))}
                    </div>
                  </div>
                </motion.div>
              ) : (
                <motion.div
                  key="industry"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  transition={{ duration: 0.3 }}
                >
                  {/* Contact Info */}
                  <div className="mb-12 p-6 bg-bg-card border border-border rounded-xl">
                    <h2 className="font-display font-bold text-2xl mb-2">Utkarsh Roy Choudhury</h2>
                    <div className="flex flex-wrap gap-4 text-text-secondary text-sm">
                      <span className="flex items-center gap-1"><MapPin size={14} /> Tuscaloosa, AL, USA</span>
                      <span className="flex items-center gap-1"><Phone size={14} /> +1 205-887-9619</span>
                      <a href="mailto:uchoudhury@crimson.ua.edu" className="text-accent hover:text-accent-hover flex items-center gap-1">
                        <Mail size={14} /> uchoudhury@crimson.ua.edu
                      </a>
                    </div>
                  </div>

                  {/* Professional Summary */}
                  <div className="mb-12">
                    <h3 className="font-display font-bold text-xl mb-6 pb-2 border-b border-border">Professional Summary</h3>
                    <p className="text-text-secondary leading-relaxed">{industryResume.summary}</p>
                  </div>

                  {/* Core Competencies */}
                  <div className="mb-12">
                    <h3 className="font-display font-bold text-xl mb-6 pb-2 border-b border-border">Core Competencies</h3>
                    <div className="space-y-4">
                      {Object.entries(industryResume.competencies).map(([category, skills]) => (
                        <div key={category}>
                          <h4 className="text-accent text-sm font-medium mb-2">{category}</h4>
                          <div className="flex flex-wrap gap-2">
                            {skills.map((skill) => (
                              <span
                                key={skill}
                                className="px-2 py-1 bg-bg-hover border border-border rounded text-xs text-text-secondary"
                              >
                                {skill}
                              </span>
                            ))}
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Experience */}
                  <div className="mb-12">
                    <h3 className="font-display font-bold text-xl mb-6 pb-2 border-b border-border">Professional Experience</h3>
                    <div className="space-y-8">
                      {industryResume.experience.map((exp, i) => (
                        <div key={i} className="relative pl-4 border-l-2 border-border">
                          <div className="absolute -left-1.5 top-0 w-3 h-3 rounded-full bg-accent" />
                          <div className="flex flex-wrap justify-between items-start gap-2 mb-2">
                            <h4 className="font-semibold text-text-primary">{exp.title}</h4>
                            <span className="text-accent text-sm font-mono">{exp.period}</span>
                          </div>
                          <p className="text-text-secondary text-sm mb-3">{exp.company} · {exp.location}</p>
                          <ul className="space-y-2">
                            {exp.highlights.map((highlight, j) => (
                              <li key={j} className="text-text-tertiary text-sm flex items-start gap-2">
                                <span className="text-accent mt-1.5 flex-shrink-0">•</span>
                                <span>{highlight}</span>
                              </li>
                            ))}
                          </ul>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Education (condensed) */}
                  <div className="mb-12">
                    <h3 className="font-display font-bold text-xl mb-6 pb-2 border-b border-border">Education</h3>
                    <div className="space-y-4">
                      {academicCV.education.map((edu) => (
                        <div key={edu.degree} className="flex flex-wrap justify-between items-start gap-2">
                          <div>
                            <p className="text-text-primary font-medium">{edu.degree}</p>
                            <p className="text-text-secondary text-sm">{edu.institution}</p>
                          </div>
                          <span className="text-accent text-sm font-mono">{edu.year}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Certifications */}
                  <div>
                    <h3 className="font-display font-bold text-xl mb-6 pb-2 border-b border-border">Certifications & Professional Development</h3>
                    <ul className="space-y-2">
                      {industryResume.certifications.map((cert, i) => (
                        <li key={i} className="text-text-secondary text-sm flex items-start gap-2">
                          <span className="text-accent mt-1">•</span>
                          {cert}
                        </li>
                      ))}
                    </ul>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
