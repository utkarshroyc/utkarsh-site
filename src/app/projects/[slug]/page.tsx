"use client";

import { useParams } from "next/navigation";
import { motion } from "framer-motion";
import Link from "next/link";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import { getProjectBySlug, projects } from "@/lib/projects";
import { ArrowLeft, Calendar, Tag, Users, FileText, ExternalLink } from "lucide-react";

export default function ProjectPage() {
  const params = useParams();
  const slug = params.slug as string;
  const project = getProjectBySlug(slug);

  if (!project) {
    return (
      <>
        <Navbar />
        <main className="pt-20 min-h-screen flex items-center justify-center">
          <div className="text-center">
            <h1 className="font-display font-bold text-4xl mb-4">Project Not Found</h1>
            <p className="text-text-secondary mb-8">The project you're looking for doesn't exist.</p>
            <Link href="/projects" className="text-accent hover:text-accent-hover transition-colors">
              ← Back to Projects
            </Link>
          </div>
        </main>
        <Footer />
      </>
    );
  }

  const statusColors = {
    ongoing: "bg-accent/20 text-accent border-accent/30",
    completed: "bg-moss/20 text-moss border-moss/30",
    upcoming: "bg-accent-alt/20 text-accent-alt border-accent-alt/30",
  };

  // Find related projects (same category or shared tags)
  const relatedProjects = projects
    .filter(p => p.slug !== project.slug)
    .filter(p =>
      p.category === project.category ||
      p.tags.some(tag => project.tags.includes(tag))
    )
    .slice(0, 2);

  return (
    <>
      <Navbar />
      <main className="pt-20">
        {/* Header */}
        <section className="py-16 md:py-24 border-b border-border">
          <div className="max-w-4xl mx-auto px-6 lg:px-8">
            {/* Back link */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.4 }}
              className="mb-8"
            >
              <Link
                href="/projects"
                className="inline-flex items-center gap-2 text-text-tertiary hover:text-accent transition-colors text-sm"
              >
                <ArrowLeft size={16} />
                Back to Projects
              </Link>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
            >
              {/* Meta */}
              <div className="flex flex-wrap items-center gap-3 mb-6">
                <span className="px-3 py-1.5 text-xs font-medium uppercase tracking-wider bg-bg-card border border-border rounded">
                  {project.category}
                </span>
                <span
                  className={`px-3 py-1.5 text-xs font-medium uppercase tracking-wider border rounded ${
                    statusColors[project.status]
                  }`}
                >
                  {project.status}
                </span>
                <span className="text-text-tertiary text-sm font-mono flex items-center gap-1.5">
                  <Calendar size={14} />
                  {project.year}
                </span>
              </div>

              {/* Title */}
              <h1 className="font-display font-bold text-3xl md:text-4xl lg:text-5xl tracking-tight mb-4">
                {project.title}
              </h1>

              {/* Subtitle */}
              <p className="text-text-secondary text-lg md:text-xl mb-8">
                {project.subtitle}
              </p>

              {/* Tags */}
              <div className="flex flex-wrap gap-2">
                {project.tags.map((tag) => (
                  <span
                    key={tag}
                    className="px-3 py-1.5 text-sm text-text-tertiary bg-bg-card border border-border rounded-full flex items-center gap-1.5"
                  >
                    <Tag size={12} />
                    {tag}
                  </span>
                ))}
              </div>
            </motion.div>
          </div>
        </section>

        {/* Content */}
        <section className="py-16">
          <div className="max-w-4xl mx-auto px-6 lg:px-8">
            <div className="grid lg:grid-cols-3 gap-12">
              {/* Main content */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.2 }}
                className="lg:col-span-2"
              >
                <h2 className="font-display font-bold text-xl mb-6 pb-2 border-b border-border">
                  About This Project
                </h2>
                <div className="prose prose-invert max-w-none">
                  {project.longDescription.split('\n\n').map((paragraph, i) => (
                    <p key={i} className="text-text-secondary mb-4 leading-relaxed">
                      {paragraph}
                    </p>
                  ))}
                </div>

                {/* Highlights */}
                {project.highlights && project.highlights.length > 0 && (
                  <div className="mt-12">
                    <h2 className="font-display font-bold text-xl mb-6 pb-2 border-b border-border">
                      Key Activities
                    </h2>
                    <ul className="space-y-3">
                      {project.highlights.map((highlight, i) => (
                        <li key={i} className="flex items-start gap-3 text-text-secondary">
                          <span className="text-accent mt-1.5">•</span>
                          {highlight}
                        </li>
                      ))}
                    </ul>
                  </div>
                )}

                {/* Publications */}
                {project.publications && project.publications.length > 0 && (
                  <div className="mt-12">
                    <h2 className="font-display font-bold text-xl mb-6 pb-2 border-b border-border flex items-center gap-2">
                      <FileText size={20} />
                      Publications
                    </h2>
                    <div className="space-y-4">
                      {project.publications.map((pub, i) => (
                        <div key={i} className="p-4 bg-bg-card border border-border rounded-lg">
                          <p className="text-text-primary font-medium mb-1">{pub.title}</p>
                          <p className="text-text-tertiary text-sm">
                            {pub.venue} · {pub.year}
                          </p>
                          {pub.link && (
                            <a
                              href={pub.link}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="inline-flex items-center gap-1 text-accent text-sm mt-2 hover:text-accent-hover transition-colors"
                            >
                              View Publication
                              <ExternalLink size={12} />
                            </a>
                          )}
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </motion.div>

              {/* Sidebar */}
              <motion.aside
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.3 }}
              >
                {/* Collaborators */}
                {project.collaborators && project.collaborators.length > 0 && (
                  <div className="mb-8 p-6 bg-bg-card border border-border rounded-xl">
                    <h3 className="font-display font-bold text-lg mb-4 flex items-center gap-2">
                      <Users size={18} />
                      Collaborators
                    </h3>
                    <ul className="space-y-2">
                      {project.collaborators.map((collaborator, i) => (
                        <li key={i} className="text-text-secondary text-sm">
                          {collaborator}
                        </li>
                      ))}
                    </ul>
                  </div>
                )}

                {/* Links */}
                {project.links && project.links.length > 0 && (
                  <div className="mb-8 p-6 bg-bg-card border border-border rounded-xl">
                    <h3 className="font-display font-bold text-lg mb-4">Links</h3>
                    <div className="space-y-2">
                      {project.links.map((link, i) => (
                        <a
                          key={i}
                          href={link.url}
                          className="flex items-center gap-2 text-accent hover:text-accent-hover transition-colors text-sm"
                        >
                          <ExternalLink size={14} />
                          {link.label}
                        </a>
                      ))}
                    </div>
                  </div>
                )}

                {/* Quick Info */}
                <div className="p-6 bg-bg-card border border-border rounded-xl">
                  <h3 className="font-display font-bold text-lg mb-4">Project Info</h3>
                  <dl className="space-y-4 text-sm">
                    <div>
                      <dt className="text-text-tertiary mb-1">Category</dt>
                      <dd className="text-text-primary">{project.category}</dd>
                    </div>
                    <div>
                      <dt className="text-text-tertiary mb-1">Timeline</dt>
                      <dd className="text-text-primary">{project.year}</dd>
                    </div>
                    <div>
                      <dt className="text-text-tertiary mb-1">Status</dt>
                      <dd className="text-text-primary capitalize">{project.status}</dd>
                    </div>
                  </dl>
                </div>
              </motion.aside>
            </div>
          </div>
        </section>

        {/* Related Projects */}
        {relatedProjects.length > 0 && (
          <section className="py-16 border-t border-border">
            <div className="max-w-4xl mx-auto px-6 lg:px-8">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6 }}
              >
                <h2 className="font-display font-bold text-2xl mb-8">Related Projects</h2>
                <div className="grid md:grid-cols-2 gap-6">
                  {relatedProjects.map((relatedProject) => (
                    <Link
                      key={relatedProject.slug}
                      href={`/projects/${relatedProject.slug}`}
                      className="group p-6 bg-bg-card border border-border rounded-xl hover:border-accent/50 transition-colors"
                    >
                      <span className="text-text-tertiary text-xs uppercase tracking-wider font-mono">
                        {relatedProject.category}
                      </span>
                      <h3 className="font-display font-bold text-lg mt-2 mb-2 group-hover:text-accent transition-colors">
                        {relatedProject.title}
                      </h3>
                      <p className="text-text-secondary text-sm line-clamp-2">
                        {relatedProject.description}
                      </p>
                    </Link>
                  ))}
                </div>
              </motion.div>
            </div>
          </section>
        )}
      </main>
      <Footer />
    </>
  );
}
