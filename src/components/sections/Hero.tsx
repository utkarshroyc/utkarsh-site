"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { ArrowDown } from "lucide-react";

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0.2,
    },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.8,
      ease: "easeOut" as const,
    },
  },
};

export default function Hero() {
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Background Elements */}
      <div className="absolute inset-0 bg-bg-primary">
        {/* Gradient orbs */}
        <div className="absolute top-1/4 -left-32 w-96 h-96 bg-accent/10 rounded-full blur-[128px]" />
        <div className="absolute bottom-1/4 -right-32 w-96 h-96 bg-accent-alt/10 rounded-full blur-[128px]" />

        {/* Grid pattern */}
        <div
          className="absolute inset-0 opacity-[0.02]"
          style={{
            backgroundImage: `linear-gradient(var(--color-text-primary) 1px, transparent 1px),
                             linear-gradient(90deg, var(--color-text-primary) 1px, transparent 1px)`,
            backgroundSize: '60px 60px',
          }}
        />
      </div>

      {/* Content */}
      <div className="relative z-10 max-w-7xl mx-auto px-6 lg:px-8 py-32">
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="text-center"
        >
          {/* Tagline */}
          <motion.p
            variants={itemVariants}
            className="text-text-secondary text-sm md:text-base uppercase tracking-[0.2em] mb-6"
          >
            Geographer · Political Ecologist · Researcher
          </motion.p>

          {/* Name - Main Headline */}
          <motion.h1
            variants={itemVariants}
            className="font-display font-bold tracking-tight"
          >
            <span className="block text-[clamp(2.5rem,8vw,7rem)] leading-[0.9] text-text-primary">
              UTKARSH
            </span>
            <span className="block text-[clamp(2.5rem,8vw,7rem)] leading-[0.9] text-gradient">
              ROY CHOUDHURY
            </span>
          </motion.h1>

          {/* Description */}
          <motion.p
            variants={itemVariants}
            className="mt-8 text-text-secondary text-lg md:text-xl max-w-2xl mx-auto leading-relaxed"
          >
            PhD Candidate at the University of Alabama studying river governance,
            environmental politics, and human-wildlife relations.
          </motion.p>

          {/* CTAs */}
          <motion.div
            variants={itemVariants}
            className="mt-10 flex flex-wrap items-center justify-center gap-4"
          >
            <Link
              href="/about"
              className="px-8 py-4 bg-accent hover:bg-accent-hover text-bg-primary font-semibold rounded-lg transition-colors"
            >
              Learn More
            </Link>
            <Link
              href="/projects"
              className="px-8 py-4 border border-border hover:border-accent text-text-primary hover:text-accent font-semibold rounded-lg transition-colors"
            >
              View Projects
            </Link>
          </motion.div>
        </motion.div>
      </div>

      {/* Scroll Indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.5, duration: 1 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2"
      >
        <motion.div
          animate={{ y: [0, 8, 0] }}
          transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
          className="flex flex-col items-center gap-2 text-text-tertiary"
        >
          <span className="text-xs uppercase tracking-widest">Scroll</span>
          <ArrowDown size={20} />
        </motion.div>
      </motion.div>
    </section>
  );
}
