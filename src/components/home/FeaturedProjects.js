'use client';

import { useEffect, useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { motion } from 'framer-motion';

export default function FeaturedProjects({ title, viewAllText, viewAllLink = '/portfolio' }) {
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch('/api/projects')
      .then((res) => res.json())
      .then((data) => {
        const featured = (Array.isArray(data) ? data : [])
          .filter((p) => p.featured)
          .slice(0, 3);
        setProjects(featured);
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, []);

  if (loading) {
    return (
      <div className="flex justify-center py-12">
        <div className="loading-spinner"></div>
      </div>
    );
  }

  if (projects.length === 0) return null;

  return (
    <div>
      {title && (
        <h2 className="text-2xl md:text-3xl font-bold text-center mb-8">
          <span className="gradient-text">{title}</span>
        </h2>
      )}

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {projects.map((project, index) => (
          <motion.div
            key={project.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.15, duration: 0.5 }}
            className="card-hover glass rounded-xl overflow-hidden group"
          >
            <div className="aspect-video bg-gold-400/10 relative overflow-hidden">
              {project.image ? (
                <Image
                  src={project.image}
                  alt={project.title}
                  fill
                  sizes="(max-width: 768px) 100vw, 33vw"
                  className="object-cover transition-transform duration-300 group-hover:scale-105"
                  loading="lazy"
                />
              ) : (
                <div className="w-full h-full flex items-center justify-center text-gold-400/50">
                  <svg className="w-12 h-12" fill="currentColor" viewBox="0 0 20 20">
                    <path
                      fillRule="evenodd"
                      d="M4 3a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V5a2 2 0 00-2-2H4zm12 12H4l4-8 3 6 2-4 3 6z"
                      clipRule="evenodd"
                    />
                  </svg>
                </div>
              )}
              {/* Featured badge */}
              <div className="absolute top-3 right-3 px-2 py-1 bg-gold-400 text-black text-xs font-bold rounded-full">
                Featured
              </div>
            </div>

            <div className="p-5">
              <h3 className="text-lg font-semibold text-gold-300 mb-2 line-clamp-1">
                {project.title}
              </h3>
              <p className="text-gold-400/70 text-sm mb-3 line-clamp-2">
                {project.description}
              </p>
              {project.category && (
                <span className="inline-block px-2 py-0.5 bg-gold-400/10 text-gold-400 text-xs rounded-full">
                  {project.category}
                </span>
              )}
            </div>
          </motion.div>
        ))}
      </div>

      {viewAllText && (
        <div className="text-center mt-8">
          <Link
            href={viewAllLink}
            className="inline-flex items-center gap-2 text-gold-400 hover:text-gold-300 transition-colors font-medium"
          >
            {viewAllText}
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
            </svg>
          </Link>
        </div>
      )}
    </div>
  );
}
