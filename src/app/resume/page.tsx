"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import { Download, Mail, Linkedin, BookOpen } from "lucide-react";

type ResumeType = "academic" | "industry";

const academicCV = {
  education: [
    {
      degree: "Ph.D., Geography",
      institution: "University of Alabama",
      year: "Expected May 2026",
      details: "Advisor: Dr. Jared Margulies\nDissertation: \"The Unfinished River: A Political Ecology of Restoration and Nonhuman Erasure on the Ganga River\"",
    },
    {
      degree: "M.A., Development Studies (Distinction)",
      institution: "Institute of Development Studies, University of Sussex",
      year: "September 2020",
      details: "Advisor: Dr. Amber Huff",
    },
    {
      degree: "B.B.A., Environment Management and Marketing",
      institution: "Symbiosis International University",
      year: "May 2019",
      details: "",
    },
  ],
  publications: [
    {
      title: "Seeing Animals Like a State: Bureaucratic Gaze and Human-Wildlife Conflict",
      venue: "Under Review",
      year: "2024",
    },
  ],
  researchInterests: [
    "Political Ecology",
    "Environmental Governance",
    "Human-Wildlife Conflict",
    "Aquatic Biodiversity Conservation",
    "River Restoration Politics",
    "Science-Policy Interfaces",
  ],
  awards: [
    { title: "Graduate Research Fellowship", org: "University of Alabama", year: "2022-Present" },
  ],
};

const industryResume = {
  experience: [
    {
      title: "Research Consultant",
      company: "United Nations Development Programme (UNDP)",
      location: "India",
      period: "2020 - 2022",
      highlights: [
        "Conducted policy research on environmental governance",
        "Collaborated with government stakeholders on sustainability initiatives",
      ],
    },
    {
      title: "Research Associate",
      company: "Institute of Development Studies",
      location: "UK",
      period: "2019 - 2020",
      highlights: [
        "Supported research on climate adaptation strategies",
        "Contributed to policy briefs and publications",
      ],
    },
  ],
  skills: [
    "Qualitative Research Methods",
    "GIS & Spatial Analysis",
    "Policy Analysis",
    "Stakeholder Engagement",
    "Data Visualization",
    "Science Communication",
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
                    <p className="text-text-secondary">Tuscaloosa, AL, USA</p>
                    <div className="flex flex-wrap gap-4 mt-4">
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
                            <span className="text-accent text-sm">{edu.year}</span>
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
                    <div className="space-y-4">
                      {academicCV.publications.map((pub) => (
                        <div key={pub.title}>
                          <p className="text-text-primary">{pub.title}</p>
                          <p className="text-text-tertiary text-sm">{pub.venue} · {pub.year}</p>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Awards */}
                  <div>
                    <h3 className="font-display font-bold text-xl mb-6 pb-2 border-b border-border">Awards & Fellowships</h3>
                    <div className="space-y-4">
                      {academicCV.awards.map((award) => (
                        <div key={award.title} className="flex flex-wrap justify-between items-start gap-2">
                          <div>
                            <p className="text-text-primary">{award.title}</p>
                            <p className="text-text-tertiary text-sm">{award.org}</p>
                          </div>
                          <span className="text-accent text-sm">{award.year}</span>
                        </div>
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
                  {/* Experience */}
                  <div className="mb-12">
                    <h3 className="font-display font-bold text-xl mb-6 pb-2 border-b border-border">Experience</h3>
                    <div className="space-y-8">
                      {industryResume.experience.map((exp) => (
                        <div key={exp.title}>
                          <div className="flex flex-wrap justify-between items-start gap-2">
                            <h4 className="font-semibold text-text-primary">{exp.title}</h4>
                            <span className="text-accent text-sm">{exp.period}</span>
                          </div>
                          <p className="text-text-secondary">{exp.company} · {exp.location}</p>
                          <ul className="mt-3 space-y-2">
                            {exp.highlights.map((highlight, i) => (
                              <li key={i} className="text-text-tertiary text-sm flex items-start gap-2">
                                <span className="text-accent mt-1.5">•</span>
                                {highlight}
                              </li>
                            ))}
                          </ul>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Skills */}
                  <div>
                    <h3 className="font-display font-bold text-xl mb-6 pb-2 border-b border-border">Skills</h3>
                    <div className="flex flex-wrap gap-2">
                      {industryResume.skills.map((skill) => (
                        <span
                          key={skill}
                          className="px-3 py-1.5 bg-bg-hover border border-border rounded-full text-sm text-text-secondary"
                        >
                          {skill}
                        </span>
                      ))}
                    </div>
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
