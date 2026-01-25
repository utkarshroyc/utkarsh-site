"use client";

import { motion } from "framer-motion";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import ProjectCard from "@/components/projects/ProjectCard";
import { projects } from "@/lib/projects";

export default function ProjectsPage() {
  const featuredProject = projects[0]; // The Unfinished River
  const otherProjects = projects.slice(1);

  return (
    <>
      <Navbar />
      <main className="pt-20">
        {/* Header */}
        <section className="py-16 md:py-24">
          <div className="max-w-6xl mx-auto px-6 lg:px-8">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
            >
              <h1 className="font-display font-bold text-4xl md:text-5xl lg:text-6xl tracking-tight mb-6">
                Projects
              </h1>
              <p className="text-text-secondary text-lg md:text-xl max-w-2xl">
                Work spanning research, policy, and community initiatives in environmental governance, conservation, and international development.
              </p>
            </motion.div>
          </div>
        </section>

        {/* Featured Project */}
        <section className="pb-12">
          <div className="max-w-6xl mx-auto px-6 lg:px-8">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="mb-8"
            >
              <h2 className="text-text-tertiary text-sm uppercase tracking-[0.15em] font-mono">
                Featured Research
              </h2>
            </motion.div>
            <ProjectCard project={featuredProject} index={0} featured />
          </div>
        </section>

        {/* All Projects Grid */}
        <section className="py-12 pb-24">
          <div className="max-w-6xl mx-auto px-6 lg:px-8">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="mb-8"
            >
              <h2 className="text-text-tertiary text-sm uppercase tracking-[0.15em] font-mono">
                All Projects
              </h2>
            </motion.div>

            <div className="grid md:grid-cols-2 gap-6">
              {otherProjects.map((project, index) => (
                <ProjectCard key={project.slug} project={project} index={index} />
              ))}
            </div>
          </div>
        </section>

        {/* Research Interests */}
        <section className="py-16 border-t border-border">
          <div className="max-w-6xl mx-auto px-6 lg:px-8">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="text-center"
            >
              <h2 className="font-display font-bold text-2xl mb-8">Research Themes</h2>
              <div className="flex flex-wrap justify-center gap-3">
                {[
                  "Political Ecology",
                  "River Restoration",
                  "Human-Wildlife Conflict",
                  "Environmental Governance",
                  "Multispecies Studies",
                  "Science & Technology Studies",
                  "Conservation Politics",
                  "South Asian Studies",
                ].map((theme) => (
                  <span
                    key={theme}
                    className="px-4 py-2 bg-bg-card border border-border rounded-full text-sm text-text-secondary hover:border-accent hover:text-accent transition-colors cursor-default"
                  >
                    {theme}
                  </span>
                ))}
              </div>
            </motion.div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
