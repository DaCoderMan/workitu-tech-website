'use client';

import { useState, useMemo } from 'react';
import Image from 'next/image';
import { useSafeT, useLanguage } from '../../lib/useLanguage';

export default function PortfolioClient({ initialProjects }) {
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');
  const t = useSafeT();
  const { language } = useLanguage();

  // Track page view on mount
  if (typeof window !== 'undefined') {
    if (!window.__portfolioTracked) {
      window.__portfolioTracked = true;
      fetch('/api/analytics/track', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          event: 'page_view',
          page: 'portfolio',
          timestamp: new Date().toISOString()
        })
      }).catch(() => {});
    }
  }

  const projects = initialProjects;

  const categories = useMemo(() => {
    const cats = new Set(projects.map(p => p.category).filter(Boolean));
    return ['all', ...Array.from(cats)];
  }, [projects]);

  const filteredProjects = useMemo(() => {
    return projects.filter(project => {
      const matchesCategory = selectedCategory === 'all' || project.category === selectedCategory;
      const matchesSearch = !searchQuery ||
        project.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        project.description.toLowerCase().includes(searchQuery.toLowerCase());
      return matchesCategory && matchesSearch;
    });
  }, [projects, selectedCategory, searchQuery]);

  const handleProjectClick = (projectId) => {
    fetch('/api/analytics/track', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        event: 'project_click',
        projectId,
        timestamp: new Date().toISOString()
      })
    }).catch(() => {});
  };

  const getButtonText = (project) => {
    if (project.isVideo) return t('portfolio.watchVideo');
    if (project.isWebsite) return t('portfolio.visitWebsite');
    return t('portfolio.viewProject');
  };

  return (
    <div className="relative min-h-screen bg-gradient-to-b from-[#fffcf5] via-[#fef9ee] to-[#fffcf5]">

      {/* Header Section */}
      <section className="relative z-10 pt-20 pb-8 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto text-center">
          <h1 className="text-4xl md:text-5xl font-bold mb-6 fade-in">
            <span className="gradient-text">{t('portfolio.title')}</span>
          </h1>
          <p className="text-lg md:text-xl text-stone-500 max-w-3xl mx-auto fade-in font-medium" style={{ animationDelay: '0.2s' }}>
            {t('portfolio.description')}
          </p>
        </div>
      </section>

      {/* Filters Section */}
      <section className="relative z-10 pb-8 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col md:flex-row gap-4 items-center justify-between">
            <div className="w-full md:w-64">
              <input
                type="text"
                placeholder="Search projects..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full px-4 py-2 bg-white border border-stone-200 rounded-lg text-stone-700 placeholder-stone-400 focus:outline-none focus:border-amber-400 focus:ring-1 focus:ring-amber-400/20"
              />
            </div>

            <div className="flex flex-wrap gap-2 justify-center">
              {categories.map((category) => (
                <button
                  key={category}
                  onClick={() => setSelectedCategory(category)}
                  className={`px-4 py-2 rounded-full text-sm font-semibold transition-all duration-300 ${
                    selectedCategory === category
                      ? 'bg-amber-500 text-white shadow-sm'
                      : 'bg-amber-50 text-amber-700 hover:bg-amber-100'
                  }`}
                >
                  {category === 'all' ? 'All Projects' : category}
                </button>
              ))}
            </div>
          </div>

          <p className="text-stone-400 text-sm mt-4 text-center">
            Showing {filteredProjects.length} of {projects.length} projects
          </p>
        </div>
      </section>

      {/* Projects Grid */}
      <section className="relative z-10 pb-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          {filteredProjects.length === 0 ? (
            <div className="text-center py-20">
              <p className="text-stone-400 text-lg">
                {searchQuery || selectedCategory !== 'all'
                  ? 'No projects match your filters'
                  : t('portfolio.noProjects')}
              </p>
              {(searchQuery || selectedCategory !== 'all') && (
                <button
                  onClick={() => { setSearchQuery(''); setSelectedCategory('all'); }}
                  className="mt-4 text-amber-600 underline hover:text-amber-700 font-medium"
                >
                  Clear filters
                </button>
              )}
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {filteredProjects.map((project, index) => (
                <div
                  key={project.id}
                  id={project.id}
                  className="card-hover bg-white rounded-xl overflow-hidden fade-in border border-stone-200/80 shadow-sm"
                  style={{ animationDelay: `${index * 0.1}s` }}
                >
                  <div className="aspect-video bg-stone-100 relative overflow-hidden">
                    {project.isVideo && project.videoId ? (
                      <div className="relative w-full h-full">
                        <iframe
                          src={`https://www.youtube.com/embed/${project.videoId}?rel=0&modestbranding=1`}
                          title={project.title}
                          className="w-full h-full"
                          frameBorder="0"
                          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                          allowFullScreen
                          loading="lazy"
                        ></iframe>
                      </div>
                    ) : project.image ? (
                      <div className="relative w-full h-full">
                        {project.image.startsWith('/') ? (
                          <Image
                            src={project.image}
                            alt={project.title}
                            fill
                            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                            className="object-cover"
                            loading="lazy"
                          />
                        ) : (
                          <img
                            src={project.image}
                            alt={project.title}
                            className="w-full h-full object-cover"
                            loading="lazy"
                            onError={(e) => {
                              e.target.src = `https://placehold.co/1024x768/f5f5f4/a8a29e?text=${encodeURIComponent(project.title)}`;
                            }}
                          />
                        )}
                      </div>
                    ) : (
                      <div className="w-full h-full flex items-center justify-center text-stone-300">
                        <svg className="w-16 h-16" fill="currentColor" viewBox="0 0 20 20">
                          <path fillRule="evenodd" d="M4 3a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V5a2 2 0 00-2-2H4zm12 12H4l4-8 3 6 2-4 3 6z" clipRule="evenodd" />
                        </svg>
                      </div>
                    )}
                  </div>

                  <div className="p-6">
                    <h3 className="text-xl font-bold text-stone-800 mb-2">
                      {language === 'he' ? (project.title_he || project.title) : project.title}
                    </h3>
                    <p className="text-stone-500 text-sm mb-4 line-clamp-3 leading-relaxed">
                      {language === 'he' ? (project.description_he || project.description) : project.description}
                    </p>
                    {project.category && (
                      <span className="inline-block px-3 py-1 bg-amber-50 text-amber-700 text-xs font-semibold rounded-full mb-4">
                        {project.category}
                      </span>
                    )}
                    <a
                      href={project.link}
                      target="_blank"
                      rel="noopener noreferrer"
                      onClick={() => handleProjectClick(project.id)}
                      className="btn-gold inline-block px-4 py-2 rounded-lg text-sm font-bold w-full text-center"
                    >
                      {getButtonText(project)}
                    </a>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </section>
    </div>
  );
}
