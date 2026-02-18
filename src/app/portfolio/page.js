'use client';

import { useEffect, useState, useMemo } from 'react';
import Image from 'next/image';
import VideoBackground from '../../components/animations/VideoBackground';
import { useSafeT, useLanguage } from '../../lib/useLanguage';

export default function Portfolio() {
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');
  const t = useSafeT();
  const { language } = useLanguage();

  useEffect(() => {
    // Track page view
    fetch('/api/analytics/track', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        event: 'page_view',
        page: 'portfolio',
        timestamp: new Date().toISOString()
      })
    });

    // Fetch projects from public endpoint
    fetch('/api/projects')
      .then(res => res.json())
      .then(data => {
        // Ensure data is an array
        setProjects(Array.isArray(data) ? data : []);
        setLoading(false);
      })
      .catch(err => {
        console.error('Error fetching projects:', err);
        setLoading(false);
      });
  }, []);

  // Get unique categories
  const categories = useMemo(() => {
    const cats = new Set(projects.map(p => p.category).filter(Boolean));
    return ['all', ...Array.from(cats)];
  }, [projects]);

  // Filter projects
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
    });
  };

  const getButtonText = (project) => {
    if (project.isVideo) return t('portfolio.watchVideo');
    if (project.isWebsite) return t('portfolio.visitWebsite');
    return t('portfolio.viewProject');
  };

  return (
    <div className="relative min-h-screen">
      <VideoBackground imageSrc="/images/bg-portfolio.svg" />

      {/* Header Section */}
      <section className="relative z-10 pt-20 pb-8 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto text-center">
          <h1 className="text-4xl md:text-5xl font-bold mb-6 fade-in">
            <span className="gradient-text">{t('portfolio.title')}</span>
          </h1>
          <p className="text-lg md:text-xl text-gold-300/80 max-w-3xl mx-auto fade-in" style={{ animationDelay: '0.2s' }}>
            {t('portfolio.description')}
          </p>
        </div>
      </section>

      {/* Filters Section */}
      <section className="relative z-10 pb-8 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col md:flex-row gap-4 items-center justify-between">
            {/* Search */}
            <div className="w-full md:w-64">
              <input
                type="text"
                placeholder="Search projects..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full px-4 py-2 bg-black/80 border border-gold-400/30 rounded-lg text-gold-300 placeholder-gold-400/50 focus:outline-none focus:border-gold-400"
              />
            </div>

            {/* Category Filter */}
            <div className="flex flex-wrap gap-2 justify-center">
              {categories.map((category) => (
                <button
                  key={category}
                  onClick={() => setSelectedCategory(category)}
                  className={`px-4 py-2 rounded-full text-sm font-medium transition-all duration-300 ${
                    selectedCategory === category
                      ? 'bg-gold-400 text-black'
                      : 'bg-gold-400/10 text-gold-400 hover:bg-gold-400/20'
                  }`}
                >
                  {category === 'all' ? 'All Projects' : category}
                </button>
              ))}
            </div>
          </div>

          {/* Results count */}
          <p className="text-gold-400/60 text-sm mt-4 text-center">
            Showing {filteredProjects.length} of {projects.length} projects
          </p>
        </div>
      </section>

      {/* Projects Grid */}
      <section className="relative z-10 pb-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          {loading ? (
            <div className="flex justify-center items-center py-20">
              <div className="loading-spinner"></div>
              <span className="ml-3 rtl:mr-3 rtl:ml-0 text-gold-400">{t('portfolio.loading')}</span>
            </div>
          ) : filteredProjects.length === 0 ? (
            <div className="text-center py-20">
              <p className="text-gold-300/60 text-lg">
                {searchQuery || selectedCategory !== 'all'
                  ? 'No projects match your filters'
                  : t('portfolio.noProjects')}
              </p>
              {(searchQuery || selectedCategory !== 'all') && (
                <button
                  onClick={() => { setSearchQuery(''); setSelectedCategory('all'); }}
                  className="mt-4 text-gold-400 underline hover:text-gold-300"
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
                  className="card-hover glass rounded-xl overflow-hidden fade-in"
                  style={{ animationDelay: `${index * 0.1}s` }}
                >
                  <div className="aspect-video bg-gold-400/10 relative overflow-hidden">
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
                              e.target.src = `https://via.placeholder.com/1024x768/1a1a1a/gold?text=${encodeURIComponent(project.title)}`;
                            }}
                          />
                        )}
                      </div>
                    ) : (
                      <div className="w-full h-full flex items-center justify-center text-gold-400/50">
                        <svg className="w-16 h-16" fill="currentColor" viewBox="0 0 20 20">
                          <path fillRule="evenodd" d="M4 3a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V5a2 2 0 00-2-2H4zm12 12H4l4-8 3 6 2-4 3 6z" clipRule="evenodd" />
                        </svg>
                      </div>
                    )}
                  </div>

                  <div className="p-6">
                    <h3 className="text-xl font-semibold text-gold-300 mb-2">
                      {language === 'he' ? (project.title_he || project.title) : project.title}
                    </h3>
                    <p className="text-gold-400/70 text-sm mb-4 line-clamp-3">
                      {language === 'he' ? (project.description_he || project.description) : project.description}
                    </p>
                    {project.category && (
                      <span className="inline-block px-3 py-1 bg-gold-400/10 text-gold-400 text-xs rounded-full mb-4">
                        {project.category}
                      </span>
                    )}
                    <a
                      href={project.link}
                      target="_blank"
                      rel="noopener noreferrer"
                      onClick={() => handleProjectClick(project.id)}
                      className="btn-gold inline-block px-4 py-2 rounded-lg text-sm font-medium w-full text-center"
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
