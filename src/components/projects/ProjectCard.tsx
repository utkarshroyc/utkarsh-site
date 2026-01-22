"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import type { Project } from "@/lib/projects";

interface ProjectCardProps {
  project: Project;
  index: number;
  featured?: boolean;
}

export default function ProjectCard({ project, index, featured = false }: ProjectCardProps) {
  const statusColors = {
    ongoing: "bg-accent/20 text-accent border-accent/30",
    completed: "bg-moss/20 text-moss border-moss/30",
    upcoming: "bg-accent-alt/20 text-accent-alt border-accent-alt/30",
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
    >
      <Link href={`/projects/${project.slug}`} className="group block">
        <article
          className={`relative overflow-hidden rounded-xl border border-border bg-bg-card transition-all duration-300 hover:border-accent/50 hover:bg-bg-hover ${
            featured ? "p-8 md:p-10" : "p-6"
          }`}
        >
          {/* Background pattern */}
          <div className="absolute inset-0 opacity-[0.03]">
            <svg className="w-full h-full" viewBox="0 0 100 100" preserveAspectRatio="none">
              <defs>
                <pattern id={`grid-${project.slug}`} width="10" height="10" patternUnits="userSpaceOnUse">
                  <path d="M 10 0 L 0 0 0 10" fill="none" stroke="currentColor" strokeWidth="0.5" />
                </pattern>
              </defs>
              <rect width="100" height="100" fill={`url(#grid-${project.slug})`} />
            </svg>
          </div>

          {/* Content */}
          <div className="relative z-10">
            {/* Header */}
            <div className="flex flex-wrap items-start justify-between gap-4 mb-4">
              <div className="flex flex-wrap items-center gap-2">
                <span className="px-2.5 py-1 text-xs font-medium uppercase tracking-wider bg-bg-hover border border-border rounded">
                  {project.category}
                </span>
                <span
                  className={`px-2.5 py-1 text-xs font-medium uppercase tracking-wider border rounded ${
                    statusColors[project.status]
                  }`}
                >
                  {project.status}
                </span>
              </div>
              <span className="text-text-tertiary text-sm font-mono">{project.year}</span>
            </div>

            {/* Title */}
            <h3
              className={`font-display font-bold text-text-primary group-hover:text-accent transition-colors ${
                featured ? "text-2xl md:text-3xl mb-3" : "text-xl mb-2"
              }`}
            >
              {project.title}
            </h3>

            {/* Subtitle */}
            <p
              className={`text-text-secondary mb-4 ${
                featured ? "text-base" : "text-sm"
              }`}
            >
              {project.subtitle}
            </p>

            {/* Description */}
            <p className="text-text-tertiary text-sm mb-6 line-clamp-2">
              {project.description}
            </p>

            {/* Tags */}
            <div className="flex flex-wrap gap-2 mb-6">
              {project.tags.slice(0, featured ? 5 : 3).map((tag) => (
                <span
                  key={tag}
                  className="px-2 py-1 text-xs text-text-tertiary bg-bg-primary border border-border rounded"
                >
                  {tag}
                </span>
              ))}
              {project.tags.length > (featured ? 5 : 3) && (
                <span className="px-2 py-1 text-xs text-text-tertiary">
                  +{project.tags.length - (featured ? 5 : 3)}
                </span>
              )}
            </div>

            {/* View link */}
            <div className="flex items-center gap-2 text-accent font-medium text-sm group-hover:gap-3 transition-all">
              <span>View Project</span>
              <ArrowUpRight size={16} className="transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
            </div>
          </div>

          {/* Hover gradient */}
          <div className="absolute inset-0 bg-gradient-to-br from-accent/5 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
        </article>
      </Link>
    </motion.div>
  );
}
