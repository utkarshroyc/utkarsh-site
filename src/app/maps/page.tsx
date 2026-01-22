"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import { maps } from "@/lib/maps";
import { X, ZoomIn, MapPin, Calendar, Layers } from "lucide-react";

export default function MapsPage() {
  const [selectedMap, setSelectedMap] = useState<string | null>(null);
  const [filter, setFilter] = useState<string>("all");

  const categories = ["all", ...new Set(maps.map(m => m.category))];
  const filteredMaps = filter === "all" ? maps : maps.filter(m => m.category === filter);

  const currentMap = selectedMap ? maps.find(m => m.id === selectedMap) : null;

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
              <p className="text-accent text-sm uppercase tracking-[0.2em] mb-4 font-mono">
                Cartographic Work
              </p>
              <h1 className="font-display font-bold text-4xl md:text-5xl lg:text-6xl tracking-tight mb-6">
                Maps & Spatial Analysis
              </h1>
              <p className="text-text-secondary text-lg md:text-xl max-w-2xl">
                GIS mapping and spatial analysis from research projects on river governance, conservation, and environmental change.
              </p>
            </motion.div>
          </div>
        </section>

        {/* Filter */}
        <section className="pb-8">
          <div className="max-w-6xl mx-auto px-6 lg:px-8">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="flex flex-wrap gap-2"
            >
              {categories.map((category) => (
                <button
                  key={category}
                  onClick={() => setFilter(category)}
                  className={`px-4 py-2 rounded-full text-sm font-medium transition-all ${
                    filter === category
                      ? "bg-accent text-bg-primary"
                      : "bg-bg-card border border-border text-text-secondary hover:border-accent hover:text-accent"
                  }`}
                >
                  {category === "all" ? "All Maps" : category}
                </button>
              ))}
            </motion.div>
          </div>
        </section>

        {/* Maps Grid */}
        <section className="py-8 pb-24">
          <div className="max-w-6xl mx-auto px-6 lg:px-8">
            <motion.div
              layout
              className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
            >
              <AnimatePresence mode="popLayout">
                {filteredMaps.map((map, index) => (
                  <motion.div
                    key={map.id}
                    layout
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.9 }}
                    transition={{ duration: 0.3, delay: index * 0.05 }}
                    className={`${
                      map.aspectRatio === "portrait" ? "row-span-2" : ""
                    }`}
                  >
                    <button
                      onClick={() => setSelectedMap(map.id)}
                      className="group relative w-full h-full min-h-[280px] bg-bg-card border border-border rounded-xl overflow-hidden hover:border-accent/50 transition-all text-left"
                    >
                      {/* Placeholder pattern for map */}
                      <div className="absolute inset-0 bg-gradient-to-br from-bg-hover to-bg-card">
                        <svg
                          className="absolute inset-0 w-full h-full opacity-20"
                          viewBox="0 0 100 100"
                          preserveAspectRatio="none"
                        >
                          {/* Contour-like pattern */}
                          <defs>
                            <pattern id={`map-pattern-${map.id}`} width="20" height="20" patternUnits="userSpaceOnUse">
                              <ellipse cx="10" cy="10" rx="8" ry="4" fill="none" stroke="var(--color-accent)" strokeWidth="0.3" opacity="0.5" />
                              <ellipse cx="10" cy="10" rx="5" ry="2.5" fill="none" stroke="var(--color-accent)" strokeWidth="0.3" opacity="0.3" />
                            </pattern>
                          </defs>
                          <rect width="100" height="100" fill={`url(#map-pattern-${map.id})`} />
                        </svg>

                        {/* Map icon */}
                        <div className="absolute inset-0 flex items-center justify-center">
                          <MapPin size={48} className="text-accent/30" />
                        </div>
                      </div>

                      {/* Overlay with info */}
                      <div className="absolute inset-0 bg-gradient-to-t from-bg-primary via-bg-primary/80 to-transparent p-6 flex flex-col justify-end">
                        <span className="text-accent text-xs uppercase tracking-wider font-mono mb-2">
                          {map.category}
                        </span>
                        <h3 className="font-display font-bold text-lg text-text-primary group-hover:text-accent transition-colors mb-2">
                          {map.title}
                        </h3>
                        <p className="text-text-tertiary text-sm line-clamp-2">
                          {map.description}
                        </p>
                      </div>

                      {/* Zoom icon on hover */}
                      <div className="absolute top-4 right-4 p-2 bg-bg-primary/80 rounded-full opacity-0 group-hover:opacity-100 transition-opacity">
                        <ZoomIn size={18} className="text-accent" />
                      </div>
                    </button>
                  </motion.div>
                ))}
              </AnimatePresence>
            </motion.div>
          </div>
        </section>

        {/* Tools Section */}
        <section className="py-16 border-t border-border">
          <div className="max-w-6xl mx-auto px-6 lg:px-8">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="text-center"
            >
              <h2 className="font-display font-bold text-2xl mb-8">Tools & Technologies</h2>
              <div className="flex flex-wrap justify-center gap-3">
                {[
                  "QGIS",
                  "ArcGIS Pro",
                  "Google Earth Engine",
                  "R Spatial",
                  "Python (GeoPandas)",
                  "PostGIS",
                  "Mapbox",
                  "Remote Sensing",
                ].map((tool) => (
                  <span
                    key={tool}
                    className="px-4 py-2 bg-bg-card border border-border rounded-full text-sm text-text-secondary"
                  >
                    {tool}
                  </span>
                ))}
              </div>
            </motion.div>
          </div>
        </section>
      </main>

      {/* Lightbox Modal */}
      <AnimatePresence>
        {selectedMap && currentMap && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center p-4 md:p-8"
            onClick={() => setSelectedMap(null)}
          >
            {/* Backdrop */}
            <div className="absolute inset-0 bg-bg-primary/95 backdrop-blur-sm" />

            {/* Content */}
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              transition={{ type: "spring", damping: 25 }}
              className="relative z-10 w-full max-w-5xl bg-bg-card border border-border rounded-2xl overflow-hidden"
              onClick={(e) => e.stopPropagation()}
            >
              {/* Close button */}
              <button
                onClick={() => setSelectedMap(null)}
                className="absolute top-4 right-4 z-20 p-2 bg-bg-primary/80 rounded-full hover:bg-bg-hover transition-colors"
              >
                <X size={20} />
              </button>

              <div className="grid md:grid-cols-2">
                {/* Map placeholder */}
                <div className="relative aspect-[4/3] md:aspect-auto bg-bg-hover">
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div className="text-center">
                      <MapPin size={64} className="text-accent/40 mx-auto mb-4" />
                      <p className="text-text-tertiary text-sm">Map visualization</p>
                      <p className="text-text-tertiary text-xs mt-1">(Image placeholder)</p>
                    </div>
                  </div>

                  {/* Decorative contours */}
                  <svg
                    className="absolute inset-0 w-full h-full opacity-10"
                    viewBox="0 0 400 300"
                    preserveAspectRatio="xMidYMid slice"
                  >
                    <ellipse cx="200" cy="150" rx="150" ry="80" fill="none" stroke="var(--color-accent)" strokeWidth="1" />
                    <ellipse cx="200" cy="150" rx="120" ry="60" fill="none" stroke="var(--color-accent)" strokeWidth="1" />
                    <ellipse cx="200" cy="150" rx="90" ry="40" fill="none" stroke="var(--color-accent)" strokeWidth="1" />
                    <ellipse cx="200" cy="150" rx="60" ry="25" fill="none" stroke="var(--color-accent)" strokeWidth="1" />
                  </svg>
                </div>

                {/* Info panel */}
                <div className="p-6 md:p-8">
                  <span className="text-accent text-xs uppercase tracking-wider font-mono">
                    {currentMap.category}
                  </span>
                  <h2 className="font-display font-bold text-2xl mt-2 mb-4">
                    {currentMap.title}
                  </h2>
                  <p className="text-text-secondary mb-6">
                    {currentMap.description}
                  </p>

                  <div className="space-y-4">
                    <div className="flex items-center gap-3 text-sm">
                      <Calendar size={16} className="text-text-tertiary" />
                      <span className="text-text-tertiary">Year:</span>
                      <span className="text-text-primary">{currentMap.year}</span>
                    </div>

                    {currentMap.project && (
                      <div className="flex items-center gap-3 text-sm">
                        <Layers size={16} className="text-text-tertiary" />
                        <span className="text-text-tertiary">Project:</span>
                        <span className="text-text-primary">{currentMap.project}</span>
                      </div>
                    )}

                    <div>
                      <p className="text-text-tertiary text-sm mb-2">Techniques:</p>
                      <div className="flex flex-wrap gap-2">
                        {currentMap.techniques.map((tech) => (
                          <span
                            key={tech}
                            className="px-2 py-1 text-xs bg-bg-hover border border-border rounded"
                          >
                            {tech}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      <Footer />
    </>
  );
}
