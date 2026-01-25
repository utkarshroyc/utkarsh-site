"use client";

import { motion } from "framer-motion";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import { ArrowUpRight, BookOpen, PenLine, ExternalLink } from "lucide-react";

export default function WritingPage() {
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
              <h1 className="font-display font-bold text-4xl md:text-5xl lg:text-6xl tracking-tight mb-6">
                Writing
              </h1>
            </motion.div>
          </div>
        </section>

        {/* Substack Feature */}
        <section className="pb-16">
          <div className="max-w-4xl mx-auto px-6 lg:px-8">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="p-8 md:p-10 bg-gradient-to-br from-bg-card to-bg-secondary border border-border rounded-2xl"
            >
              <div className="flex flex-col md:flex-row md:items-start gap-6">
                <div className="flex-1">
                  <p className="text-accent text-xs uppercase tracking-wider font-mono mb-2">Newsletter</p>
                  <h2 className="font-display font-bold text-2xl md:text-3xl mb-2">
                    slightly* unfinished
                  </h2>
                  <p className="text-text-secondary text-sm italic mb-4">
                    our lives are always a work in progress.
                  </p>
                  <p className="text-text-secondary mb-6">
                    A corner of the internet for navigating life's beautiful mess. This is a living document—a collection of thoughts on culture, climate, and the spaces in between.
                  </p>

                  <div className="space-y-3 mb-6">
                    <p className="text-text-tertiary text-sm font-medium">What you'll find:</p>
                    <ul className="space-y-2 text-text-secondary text-sm">
                      <li className="flex items-start gap-2">
                        <span className="text-accent mt-1">•</span>
                        Cultural observations that question or celebrate the world around us
                      </li>
                      <li className="flex items-start gap-2">
                        <span className="text-accent mt-1">•</span>
                        Environmental musings about our changing planet and our place within it
                      </li>
                      <li className="flex items-start gap-2">
                        <span className="text-accent mt-1">•</span>
                        Personal essays that track growth and the small moments that shape us
                      </li>
                      <li className="flex items-start gap-2">
                        <span className="text-accent mt-1">•</span>
                        Honest reflections on existing in this particular moment in history
                      </li>
                    </ul>
                  </div>

                  <a
                    href="https://slightlyunfinished.substack.com/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 px-6 py-3 bg-accent hover:bg-accent-hover text-bg-primary font-semibold rounded-lg transition-colors"
                  >
                    Join the journey on Substack
                    <ArrowUpRight size={16} />
                  </a>
                </div>

                {/* Decorative */}
                <div className="hidden md:block w-48 h-48 relative">
                  <div className="absolute inset-0 bg-gradient-to-br from-accent/20 to-moss/20 rounded-xl" />
                  <svg className="absolute inset-0 w-full h-full opacity-30" viewBox="0 0 100 100">
                    <ellipse cx="50" cy="50" rx="40" ry="30" fill="none" stroke="var(--color-accent)" strokeWidth="0.5" />
                    <ellipse cx="50" cy="50" rx="30" ry="22" fill="none" stroke="var(--color-accent)" strokeWidth="0.5" />
                    <ellipse cx="50" cy="50" rx="20" ry="14" fill="none" stroke="var(--color-accent)" strokeWidth="0.5" />
                  </svg>
                  <div className="absolute inset-0 flex items-center justify-center">
                    <PenLine size={32} className="text-accent/50" />
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </section>

        {/* Toasted - Climate Publication */}
        <section className="py-12">
          <div className="max-w-4xl mx-auto px-6 lg:px-8">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              <div className="flex items-center gap-3 mb-8">
                <BookOpen size={20} className="text-accent" />
                <h2 className="font-display font-bold text-2xl">Other Publications</h2>
              </div>

              <div className="p-6 bg-bg-card border border-border rounded-xl">
                <div className="flex flex-wrap items-center gap-3 mb-3">
                  <span className="px-2.5 py-1 text-xs font-medium uppercase tracking-wider bg-accent/10 text-accent border border-accent/20 rounded">
                    Digital Publication
                  </span>
                  <span className="px-2.5 py-1 text-xs font-medium uppercase tracking-wider bg-moss/10 text-moss border border-moss/20 rounded">
                    Levitetz Grant Recipient
                  </span>
                </div>
                <h3 className="font-display font-bold text-xl mb-2">Toasted</h3>
                <p className="text-text-secondary mb-4">
                  A digital publication exploring climate anxiety and ecological grief, bridging environmental science with mental health. Awarded the Levitetz Innovation Seed Grant.
                </p>
                <a
                  href="https://toasted.beehiiv.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 text-accent hover:text-accent-hover transition-colors text-sm"
                >
                  Read on Beehiiv
                  <ExternalLink size={14} />
                </a>
              </div>
            </motion.div>
          </div>
        </section>

        {/* External Links */}
        <section className="py-16 border-t border-border">
          <div className="max-w-4xl mx-auto px-6 lg:px-8">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="text-center"
            >
              <h2 className="font-display font-bold text-2xl mb-8">Find Me Elsewhere</h2>
              <div className="flex flex-wrap justify-center gap-4">
                <a
                  href="https://linkedin.com/in/utkarsh-roy-choudhury-816162ba/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 px-6 py-3 bg-bg-card border border-border rounded-lg text-text-secondary hover:text-accent hover:border-accent transition-all"
                >
                  <svg className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M12 0c-6.627 0-12 5.373-12 12s5.373 12 12 12 12-5.373 12-12-5.373-12-12-12zm-2 16h-2v-6h2v6zm-1-6.891c-.607 0-1.1-.496-1.1-1.109 0-.612.492-1.109 1.1-1.109s1.1.497 1.1 1.109c0 .613-.493 1.109-1.1 1.109zm8 6.891h-1.998v-2.861c0-1.881-2.002-1.722-2.002 0v2.861h-2v-6h2v1.093c.872-1.616 4-1.736 4 1.548v3.359z"/>
                  </svg>
                  LinkedIn
                  <ArrowUpRight size={14} />
                </a>
                <a
                  href="https://scholar.google.com/citations?user=gWzksQwAAAAJ&hl=en"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 px-6 py-3 bg-bg-card border border-border rounded-lg text-text-secondary hover:text-accent hover:border-accent transition-all"
                >
                  <BookOpen size={18} />
                  Google Scholar
                  <ArrowUpRight size={14} />
                </a>
                <a
                  href="https://orcid.org/0000-0001-6446-1138"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 px-6 py-3 bg-bg-card border border-border rounded-lg text-text-secondary hover:text-accent hover:border-accent transition-all"
                >
                  <span className="text-xs font-mono">ORCID</span>
                  0000-0001-6446-1138
                  <ArrowUpRight size={14} />
                </a>
              </div>
            </motion.div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
