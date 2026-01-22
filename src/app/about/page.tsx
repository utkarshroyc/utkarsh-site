"use client";

import { motion } from "framer-motion";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";

const skills = [
  "Political Ecology",
  "Environmental Governance",
  "Human-Wildlife Conflict",
  "River Restoration",
  "GIS & Mapping",
  "Qualitative Research",
  "Policy Analysis",
  "Science Communication",
];

const timeline = [
  {
    year: "2022 - Present",
    title: "PhD in Geography",
    institution: "University of Alabama",
    description: "Researching river restoration and aquatic biodiversity conservation along India's Ganga River",
  },
  {
    year: "2019 - 2020",
    title: "M.A. Development Studies",
    institution: "University of Sussex (IDS)",
    description: "Graduated with Distinction",
  },
  {
    year: "2015 - 2019",
    title: "B.B.A. Environment Management",
    institution: "Symbiosis International University",
    description: "Foundation in environmental management and marketing",
  },
];

export default function AboutPage() {
  return (
    <>
      <Navbar />
      <main className="pt-20">
        {/* Hero Section */}
        <section className="py-20 md:py-32">
          <div className="max-w-7xl mx-auto px-6 lg:px-8">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
              {/* Text Content */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
              >
                <p className="text-accent text-sm font-medium uppercase tracking-wider mb-4">
                  About Me
                </p>
                <h1 className="font-display font-bold text-4xl md:text-5xl lg:text-6xl tracking-tight mb-8">
                  Mapping Human-Environment Relations
                </h1>
                <div className="space-y-6 text-text-secondary text-lg leading-relaxed">
                  <p>
                    I am a political ecologist and environmental geographer exploring the
                    intersections of conservation, governance, and more-than-human life.
                    My work examines how states, institutions, and communities negotiate
                    the politics of environmental restoration — and who (or what) gets
                    erased in the process.
                  </p>
                  <p>
                    Currently, I'm completing my PhD in Geography at the University of
                    Alabama, where my dissertation investigates the political ecology of
                    river restoration and aquatic biodiversity conservation along India's
                    Ganga River.
                  </p>
                </div>
              </motion.div>

              {/* Photo Placeholder */}
              <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.6, delay: 0.2 }}
                className="relative"
              >
                <div className="aspect-[4/5] rounded-2xl bg-gradient-to-br from-accent/20 via-bg-card to-accent-alt/20 border border-border flex items-center justify-center">
                  <span className="text-text-tertiary">Photo</span>
                </div>
                {/* Decorative elements */}
                <div className="absolute -top-4 -right-4 w-24 h-24 border border-accent/30 rounded-xl -z-10" />
                <div className="absolute -bottom-4 -left-4 w-32 h-32 bg-accent/5 rounded-xl -z-10" />
              </motion.div>
            </div>
          </div>
        </section>

        {/* Extended Bio */}
        <section className="py-20 bg-bg-secondary">
          <div className="max-w-4xl mx-auto px-6 lg:px-8">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="space-y-8 text-text-secondary text-lg leading-relaxed"
            >
              <p>
                I ask questions like: What happens when "saving" a river means overlooking
                the nonhuman lives within it? How do massive infrastructural projects
                reshape relationships between people, water, and wildlife?
              </p>
              <blockquote className="border-l-2 border-accent pl-6 py-2 text-text-primary text-xl font-display italic">
                "My work examines how states, institutions, and communities negotiate
                the politics of environmental restoration."
              </blockquote>
              <p>
                Before academia, I worked at the intersection of policy and practice — with
                the United Nations Development Programme in India, at the Institute of
                Development Studies in the UK, and with grassroots organizations tackling
                issues from period poverty to housing rights.
              </p>
              <p>
                When I'm not researching rivers and wildlife, I write about climate anxiety
                in my newsletter <em>Toasted</em>, make maps, and think about how we might
                build more just and multispecies futures.
              </p>
            </motion.div>
          </div>
        </section>

        {/* Skills */}
        <section className="py-20">
          <div className="max-w-7xl mx-auto px-6 lg:px-8">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              <p className="text-accent text-sm font-medium uppercase tracking-wider mb-4">
                Research Interests
              </p>
              <h2 className="font-display font-bold text-3xl md:text-4xl tracking-tight mb-12">
                Areas of Focus
              </h2>
              <div className="flex flex-wrap gap-3">
                {skills.map((skill, index) => (
                  <motion.span
                    key={skill}
                    initial={{ opacity: 0, scale: 0.9 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.3, delay: index * 0.05 }}
                    className="px-5 py-2.5 bg-bg-card border border-border rounded-full text-text-primary hover:border-accent transition-colors"
                  >
                    {skill}
                  </motion.span>
                ))}
              </div>
            </motion.div>
          </div>
        </section>

        {/* Timeline */}
        <section className="py-20 bg-bg-secondary">
          <div className="max-w-4xl mx-auto px-6 lg:px-8">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              <p className="text-accent text-sm font-medium uppercase tracking-wider mb-4">
                Education
              </p>
              <h2 className="font-display font-bold text-3xl md:text-4xl tracking-tight mb-12">
                Academic Journey
              </h2>
              <div className="space-y-8">
                {timeline.map((item, index) => (
                  <motion.div
                    key={item.title}
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5, delay: index * 0.1 }}
                    className="relative pl-8 border-l border-border"
                  >
                    <div className="absolute left-0 top-0 w-2 h-2 -translate-x-[5px] rounded-full bg-accent" />
                    <span className="text-accent text-sm font-medium">{item.year}</span>
                    <h3 className="font-display font-semibold text-xl mt-1">{item.title}</h3>
                    <p className="text-text-secondary mt-1">{item.institution}</p>
                    <p className="text-text-tertiary text-sm mt-2">{item.description}</p>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          </div>
        </section>

        {/* CTA */}
        <section className="py-20">
          <div className="max-w-4xl mx-auto px-6 lg:px-8 text-center">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              <h2 className="font-display font-bold text-3xl md:text-4xl tracking-tight mb-6">
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
