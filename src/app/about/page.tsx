"use client";

import { motion } from "framer-motion";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import Link from "next/link";
import { ArrowUpRight, Mail, Linkedin, BookOpen, ExternalLink } from "lucide-react";

export default function AboutPage() {
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
            >
              <p className="text-accent text-sm uppercase tracking-[0.2em] mb-4 font-mono">
                About
              </p>
              <h1 className="font-display font-bold text-4xl md:text-5xl tracking-tight mb-6">
                Bridging Policy, People, and Ecology
              </h1>
            </motion.div>
          </div>
        </section>

        {/* Main Content */}
        <section className="pb-16">
          <div className="max-w-4xl mx-auto px-6 lg:px-8">
            <div className="grid lg:grid-cols-3 gap-12">
              {/* Photo Placeholder */}
              <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.6, delay: 0.2 }}
                className="lg:col-span-1"
              >
                <div className="aspect-[3/4] bg-bg-card border border-border rounded-xl overflow-hidden relative">
                  <div className="absolute inset-0 bg-gradient-to-br from-accent/10 to-moss/10" />
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div className="text-center text-text-tertiary">
                      <div className="w-24 h-24 rounded-full bg-bg-hover mx-auto mb-4 flex items-center justify-center">
                        <span className="text-4xl font-display font-bold text-accent/50">U</span>
                      </div>
                      <p className="text-sm">Photo</p>
                    </div>
                  </div>
                  {/* Decorative contours */}
                  <svg className="absolute inset-0 w-full h-full opacity-10" viewBox="0 0 200 300" preserveAspectRatio="xMidYMid slice">
                    <ellipse cx="100" cy="150" rx="80" ry="60" fill="none" stroke="var(--color-accent)" strokeWidth="0.5" />
                    <ellipse cx="100" cy="150" rx="60" ry="45" fill="none" stroke="var(--color-accent)" strokeWidth="0.5" />
                    <ellipse cx="100" cy="150" rx="40" ry="30" fill="none" stroke="var(--color-accent)" strokeWidth="0.5" />
                  </svg>
                </div>

                {/* Contact Links */}
                <div className="mt-6 space-y-3">
                  <a
                    href="mailto:uchoudhury@crimson.ua.edu"
                    className="flex items-center gap-3 p-3 bg-bg-card border border-border rounded-lg hover:border-accent transition-colors group"
                  >
                    <Mail size={18} className="text-accent" />
                    <span className="text-text-secondary group-hover:text-text-primary transition-colors text-sm">
                      uchoudhury@crimson.ua.edu
                    </span>
                  </a>
                  <a
                    href="https://linkedin.com/in/utkarsh-roy-choudhury-816162ba/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-3 p-3 bg-bg-card border border-border rounded-lg hover:border-accent transition-colors group"
                  >
                    <Linkedin size={18} className="text-accent" />
                    <span className="text-text-secondary group-hover:text-text-primary transition-colors text-sm">
                      LinkedIn
                    </span>
                    <ExternalLink size={14} className="ml-auto text-text-tertiary" />
                  </a>
                  <a
                    href="#"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-3 p-3 bg-bg-card border border-border rounded-lg hover:border-accent transition-colors group"
                  >
                    <BookOpen size={18} className="text-accent" />
                    <span className="text-text-secondary group-hover:text-text-primary transition-colors text-sm">
                      Google Scholar
                    </span>
                    <ExternalLink size={14} className="ml-auto text-text-tertiary" />
                  </a>
                </div>

                {/* ORCID */}
                <div className="mt-4 p-3 bg-bg-card border border-border rounded-lg">
                  <p className="text-text-tertiary text-xs uppercase tracking-wider mb-1">ORCID</p>
                  <p className="text-text-secondary text-sm font-mono">0000-0001-6446-1138</p>
                </div>
              </motion.div>

              {/* Bio Content */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.3 }}
                className="lg:col-span-2"
              >
                {/* Main Question */}
                <div className="mb-8 p-6 bg-bg-card border-l-4 border-accent rounded-r-lg">
                  <p className="text-text-primary text-lg italic">
                    "How do we build just futures for both people and the wildlife we share the planet with?"
                  </p>
                </div>

                <div className="prose prose-invert max-w-none space-y-6">
                  <p className="text-text-secondary leading-relaxed">
                    I am a political ecologist and environmental geographer driven by a single question: How do we build just futures for both people and the wildlife we share the planet with? My work exists at the intersection of <span className="text-text-primary">conservation governance</span> and <span className="text-text-primary">environmental justice</span>.
                  </p>

                  <p className="text-text-secondary leading-relaxed">
                    Currently, I am a PhD Candidate in Geography at the University of Alabama, where my dissertation, <span className="text-accent">"The Unfinished River,"</span> investigates the political ecology of restoration along India's Ganga River. I examine how massive state-led infrastructure projects reshape relationships between humans and aquatic biodiversity—and who (or what) is overlooked in the process.
                  </p>

                  <h2 className="font-display font-bold text-xl text-text-primary mt-10 mb-4">
                    From Fieldwork to Frameworks
                  </h2>

                  <p className="text-text-secondary leading-relaxed">
                    Before entering the world of deep academic research, I spent years working at the sharp end of policy and practice. My background is rooted in international development and cross-sector coordination:
                  </p>

                  <ul className="space-y-3 text-text-secondary">
                    <li className="flex items-start gap-3">
                      <span className="text-accent mt-1">•</span>
                      <span><strong className="text-text-primary">International Development:</strong> I coordinated high-level policy initiatives with the United Nations Development Programme (UNDP) in India and the IKEA Foundation, managing programs designed to empower communities and influence state-level strategy.</span>
                    </li>
                    <li className="flex items-start gap-3">
                      <span className="text-accent mt-1">•</span>
                      <span><strong className="text-text-primary">Knowledge Mobilization:</strong> At the Institute of Development Studies (UK), I focused on translating complex research into accessible narratives for policymakers and the public.</span>
                    </li>
                    <li className="flex items-start gap-3">
                      <span className="text-accent mt-1">•</span>
                      <span><strong className="text-text-primary">Education:</strong> I hold an M.A. in Development Studies (Distinction) from the University of Sussex and a B.B.A. in Environment Management from Symbiosis International University.</span>
                    </li>
                  </ul>

                  <h2 className="font-display font-bold text-xl text-text-primary mt-10 mb-4">
                    More Than Research
                  </h2>

                  <p className="text-text-secondary leading-relaxed">
                    I believe that environmental work is inherently collaborative. Beyond my research, I am a <span className="text-text-primary">human job referrer and community builder</span>. I am passionate about connecting talented people with impactful opportunities in the conservation and climate space, fostering the networks necessary to tackle global ecological crises.
                  </p>

                  <p className="text-text-secondary leading-relaxed">
                    When I'm not analyzing river politics or mapping multispecies landscapes, you'll find me thinking about cultural shifts, mentoring students, and exploring how we can move from "saving" nature to truly living with it.
                  </p>
                </div>
              </motion.div>
            </div>
          </div>
        </section>

        {/* Expertise Areas */}
        <section className="py-16 border-t border-border">
          <div className="max-w-4xl mx-auto px-6 lg:px-8">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              <h2 className="font-display font-bold text-2xl mb-8 text-center">Key Expertise</h2>
              <div className="grid md:grid-cols-3 gap-6">
                {[
                  {
                    title: "Research & Dissertation",
                    description: "\"The Unfinished River\": A deep dive into the political ecology of the Ganga and the consequences of \"nonhuman erasure\" in infrastructure."
                  },
                  {
                    title: "Strategy & Policy",
                    description: "A dual-track record of impact—from peer-reviewed publications in Geoforum to policy initiatives with the UNDP and IKEA Foundation."
                  },
                  {
                    title: "Spatial Narratives",
                    description: "GIS-based mapping projects and data visualizations that translate environmental change into clear, spatial stories."
                  }
                ].map((item, index) => (
                  <motion.div
                    key={item.title}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.4, delay: index * 0.1 }}
                    className="p-6 bg-bg-card border border-border rounded-xl"
                  >
                    <h3 className="font-display font-bold text-lg mb-3 text-accent">{item.title}</h3>
                    <p className="text-text-secondary text-sm">{item.description}</p>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          </div>
        </section>

        {/* Target Sectors */}
        <section className="py-16 border-t border-border">
          <div className="max-w-4xl mx-auto px-6 lg:px-8">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="text-center"
            >
              <h2 className="font-display font-bold text-2xl mb-4">Target Sectors</h2>
              <p className="text-text-secondary mb-8">Currently seeking 2026 opportunities in:</p>
              <div className="flex flex-wrap justify-center gap-3">
                {[
                  "International Development Organizations",
                  "Conservation NGOs",
                  "Climate-Tech Startups",
                  "Environmental Policy",
                  "Program Management",
                  "Research Analysis"
                ].map((sector) => (
                  <span
                    key={sector}
                    className="px-4 py-2 bg-bg-card border border-border rounded-full text-sm text-text-secondary"
                  >
                    {sector}
                  </span>
                ))}
              </div>
            </motion.div>
          </div>
        </section>

        {/* CTA */}
        <section className="py-16 border-t border-border">
          <div className="max-w-4xl mx-auto px-6 lg:px-8 text-center">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              <h2 className="font-display font-bold text-3xl tracking-tight mb-6">
                Want to Know More?
              </h2>
              <p className="text-text-secondary text-lg mb-8">
                Check out my resume for a detailed overview of my experience and publications.
              </p>
              <Link
                href="/resume"
                className="inline-flex items-center gap-2 px-8 py-4 bg-accent hover:bg-accent-hover text-bg-primary font-semibold rounded-lg transition-colors group"
              >
                <span>View Resume</span>
                <ArrowUpRight
                  size={18}
                  className="group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform"
                />
              </Link>
            </motion.div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
