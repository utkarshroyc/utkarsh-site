"use client";

import { motion } from "framer-motion";
import { Mail, ArrowUpRight } from "lucide-react";

export default function ContactCTA() {
  return (
    <section className="py-24 md:py-32">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="relative overflow-hidden rounded-2xl bg-gradient-to-br from-accent/20 via-bg-card to-accent-alt/20 border border-border"
        >
          {/* Background decoration */}
          <div className="absolute top-0 right-0 w-64 h-64 bg-accent/10 rounded-full blur-[100px]" />
          <div className="absolute bottom-0 left-0 w-64 h-64 bg-accent-alt/10 rounded-full blur-[100px]" />

          <div className="relative z-10 px-8 py-16 md:px-16 md:py-24 text-center">
            <motion.div
              initial={{ scale: 0.8, opacity: 0 }}
              whileInView={{ scale: 1, opacity: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="w-16 h-16 mx-auto mb-8 rounded-full bg-accent/10 flex items-center justify-center"
            >
              <Mail className="w-8 h-8 text-accent" />
            </motion.div>

            <h2 className="font-display font-bold text-3xl md:text-5xl tracking-tight mb-4">
              Let's Connect
            </h2>
            <p className="text-text-secondary text-lg max-w-xl mx-auto mb-8">
              Interested in collaboration, research discussions, or just want to
              say hello? I'd love to hear from you.
            </p>

            <a
              href="mailto:uchoudhury@crimson.ua.edu"
              className="inline-flex items-center gap-2 px-8 py-4 bg-accent hover:bg-accent-hover text-bg-primary font-semibold rounded-lg transition-colors group"
            >
              <span>Get in Touch</span>
              <ArrowUpRight
                size={18}
                className="group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform"
              />
            </a>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
