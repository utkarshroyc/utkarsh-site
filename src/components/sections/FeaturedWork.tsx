"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";

const projects = [
  {
    title: "The Unfinished River",
    category: "Dissertation Research",
    description: "Political ecology of river restoration on the Ganga",
    href: "/projects/unfinished-river",
  },
  {
    title: "Seeing Animals Like a State",
    category: "Research Publication",
    description: "Human-wildlife conflict and state governance",
    href: "/projects/seeing-animals-like-a-state",
  },
  {
    title: "Project Disha",
    category: "UNDP Partnership",
    description: "Multi-state initiative to skill 1 million women",
    href: "/projects/project-disha",
  },
];

export default function FeaturedWork() {
  return (
    <section className="py-24 md:py-32 bg-bg-secondary">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="flex items-end justify-between mb-16"
        >
          <div>
            <p className="text-accent text-sm font-medium uppercase tracking-wider mb-2">
              Featured Work
            </p>
            <h2 className="font-display font-bold text-4xl md:text-5xl tracking-tight">
              Selected Projects
            </h2>
          </div>
          <Link
            href="/projects"
            className="hidden md:flex items-center gap-2 text-text-secondary hover:text-accent transition-colors group"
          >
            <span>View all</span>
            <ArrowUpRight
              size={18}
              className="group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform"
            />
          </Link>
        </motion.div>

        {/* Projects Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {projects.map((project, index) => (
            <motion.div
              key={project.title}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
            >
              <Link href={project.href} className="group block">
                <article className="relative overflow-hidden rounded-xl border border-border bg-bg-card hover:border-border-hover transition-all duration-300 group-hover:-translate-y-1">
                  {/* Gradient Header with contour pattern */}
                  <div className="relative h-48 bg-gradient-to-br from-accent/20 via-moss/15 to-accent-alt/20 overflow-hidden">
                    {/* Contour pattern overlay */}
                    <svg className="absolute inset-0 w-full h-full opacity-30" viewBox="0 0 200 150" preserveAspectRatio="xMidYMid slice">
                      <ellipse cx="100" cy="75" rx="80" ry="40" fill="none" stroke="var(--color-accent)" strokeWidth="0.5" />
                      <ellipse cx="100" cy="75" rx="60" ry="30" fill="none" stroke="var(--color-accent)" strokeWidth="0.5" />
                      <ellipse cx="100" cy="75" rx="40" ry="20" fill="none" stroke="var(--color-accent)" strokeWidth="0.5" />
                      <ellipse cx="100" cy="75" rx="20" ry="10" fill="none" stroke="var(--color-accent)" strokeWidth="0.5" />
                    </svg>
                    {/* Project number indicator */}
                    <div className="absolute top-4 right-4 text-accent/40 font-mono text-xs">
                      {String(index + 1).padStart(2, '0')}
                    </div>
                  </div>

                  {/* Content */}
                  <div className="p-6">
                    <p className="text-accent text-xs font-medium uppercase tracking-wider mb-2">
                      {project.category}
                    </p>
                    <h3 className="font-display font-semibold text-xl mb-2 group-hover:text-accent transition-colors">
                      {project.title}
                    </h3>
                    <p className="text-text-secondary text-sm">
                      {project.description}
                    </p>

                    {/* Arrow */}
                    <div className="mt-4 flex items-center gap-2 text-text-tertiary group-hover:text-accent transition-colors">
                      <span className="text-sm">Read more</span>
                      <ArrowUpRight
                        size={16}
                        className="group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform"
                      />
                    </div>
                  </div>
                </article>
              </Link>
            </motion.div>
          ))}
        </div>

        {/* Mobile View All Link */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="mt-12 text-center md:hidden"
        >
          <Link
            href="/projects"
            className="inline-flex items-center gap-2 text-accent hover:text-accent-hover transition-colors"
          >
            <span>View all projects</span>
            <ArrowUpRight size={18} />
          </Link>
        </motion.div>
      </div>
    </section>
  );
}
