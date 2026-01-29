'use client';

import { useEffect, useState, useMemo } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import VideoBackground from '../../components/animations/VideoBackground';
import { useLanguage } from '../../lib/useLanguage';
import TechBadge from '../../components/ui/TechBadge';

export default function Portfolio() {
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [sortBy, setSortBy] = useState('newest');
  const { t } = useLanguage();

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

  // Filter and sort projects
  const filteredProjects = useMemo(() => {
    const filtered = projects.filter(project => {
      const matchesCategory = selectedCategory === 'all' || project.category === selectedCategory;
      const matchesSearch = !searchQuery ||
        project.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        project.description.toLowerCase().includes(searchQuery.toLowerCase());
      return matchesCategory && matchesSearch;
    });

    const sortByDate = (a, b) => {
      const dateA = new Date(a.dateAdded || 0).getTime();
      const dateB = new Date(b.dateAdded || 0).getTime();
      return dateB - dateA;
    };

    if (sortBy === 'featured') {
      return filtered.sort((a, b) => {
        if (a.featured === b.featured) return sortByDate(a, b);
        return b.featured ? 1 : -1;
      });
    }

    return filtered.sort(sortByDate);
  }, [projects, selectedCategory, searchQuery, sortBy]);

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

  // Get a primary result metric for display
  const getPrimaryMetric = (project) => {
    if (!project.results) return null;
    const entries = Object.entries(project.results);
    if (entries.length === 0) return null;
    // Prefer rating or users if available
    if (project.results.rating) return { label: 'Rating', value: project.results.rating };
    if (project.results.users) return { label: 'Users', value: project.results.users };
    if (project.results.languages) return { label: 'Languages', value: project.results.languages };
    // Return first entry
    return { label: entries[0][0], value: entries[0][1] };
  };

  return (
    <div className="relative min-h-screen">
      <VideoBackground />

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
                aria-label={t('portfolio.searchPlaceholder')}
                placeholder={t('portfolio.searchPlaceholder')}
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full px-4 py-2 bg-black/50 border border-gold-400/30 rounded-lg text-gold-300 placeholder-gold-400/50 focus:outline-none focus:border-gold-400"
              />
            </div>

            {/* Category Filter */}
            <div className="flex flex-wrap gap-2 justify-center items-center">
              {categories.map((category) => {
                const label = category === 'all' ? t('portfolio.allProjects') : category;
                const isActive = selectedCategory === category;
                return (
                  <button
                    key={category}
                    type="button"
                    aria-pressed={isActive}
                    onClick={() => setSelectedCategory(category)}
                    className={`px-4 py-2 rounded-full text-sm font-medium transition-all duration-300 focus:outline-none focus-visible:ring-2 focus-visible:ring-gold-400 focus-visible:ring-offset-2 focus-visible:ring-offset-black ${
                      isActive
                        ? 'bg-gold-400 text-black'
                        : 'bg-gold-400/10 text-gold-400 hover:bg-gold-400/20'
                    }`}
                  >
                    {label}
                  </button>
                );
              })}
              {(searchQuery || selectedCategory !== 'all') && (
                <button
                  type="button"
                  onClick={() => { setSearchQuery(''); setSelectedCategory('all'); }}
                  className="px-4 py-2 rounded-full text-sm font-medium text-gold-300 border border-gold-400/40 hover:border-gold-400 focus:outline-none focus-visible:ring-2 focus-visible:ring-gold-400 focus-visible:ring-offset-2 focus-visible:ring-offset-black"
                >
                  {t('portfolio.clearFilters')}
                </button>
              )}
            </div>

            {/* Sort */}
            <div className="flex items-center gap-2 w-full md:w-auto">
              <label htmlFor="sort" className="text-gold-300/80 text-sm">
                {t('portfolio.sortLabel')}
              </label>
              <select
                id="sort"
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                className="px-3 py-2 bg-black/50 border border-gold-400/30 rounded-lg text-gold-300 focus:outline-none focus:border-gold-400"
              >
                <option value="newest">{t('portfolio.sortNewest')}</option>
                <option value="featured">{t('portfolio.sortFeatured')}</option>
              </select>
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
                  className="card-hover glass rounded-xl overflow-hidden fade-in group"
                  style={{ animationDelay: `${index * 0.1}s` }}
                >
                  {/* Image/Video Container */}
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
                      <Link href={`/portfolio/${project.slug}`} className="block relative w-full h-full">
                        <Image
                          src={project.image}
                          alt={project.title}
                          fill
                          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                          className="object-cover transition-transform duration-300 group-hover:scale-105"
                          loading="lazy"
                          onError={(e) => {
                            const img = e?.currentTarget;
                            if (img && img.src.indexOf('placeholder.com') === -1) {
                              img.src = `https://via.placeholder.com/1024x768/1a1a1a/gold?text=${encodeURIComponent(project.title)}`;
                            }
                          }}
                        />
                      </Link>
                    ) : (
                      <div className="w-full h-full flex items-center justify-center text-gold-400/50">
                        <svg className="w-16 h-16" fill="currentColor" viewBox="0 0 20 20">
                          <path fillRule="evenodd" d="M4 3a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V5a2 2 0 00-2-2H4zm12 12H4l4-8 3 6 2-4 3 6z" clipRule="evenodd" />
                        </svg>
                      </div>
                    )}

                    {/* Featured Badge */}
                    {project.featured && (
                      <div className="absolute top-3 right-3 px-2 py-1 bg-gold-400 text-black text-xs font-bold rounded-full">
                        Featured
                      </div>
                    )}

                    {/* Metric Badge */}
                    {getPrimaryMetric(project) && (
                      <div className="absolute bottom-3 left-3 px-2 py-1 bg-black/70 backdrop-blur-sm text-gold-400 text-xs font-medium rounded-full border border-gold-400/20">
                        {getPrimaryMetric(project).value}
                      </div>
                    )}
                  </div>

                  <div className="p-6">
                    {/* Title - Clickable */}
                    <Link href={`/portfolio/${project.slug}`}>
                      <h3 className="text-xl font-semibold text-gold-300 mb-2 hover:text-gold-400 transition-colors">
                        {project.title}
                      </h3>
                    </Link>

                    {/* Description */}
                    <p className="text-gold-400/70 text-sm mb-4 line-clamp-2">
                      {project.description}
                    </p>

                    {/* Tech Stack Badges */}
                    {project.techStack && project.techStack.length > 0 && (
                      <div className="flex flex-wrap gap-1.5 mb-4">
                        {project.techStack.slice(0, 3).map((tech) => (
                          <TechBadge key={tech} name={tech} size="sm" />
                        ))}
                        {project.techStack.length > 3 && (
                          <span className="px-2 py-0.5 text-xs text-gold-400/60">
                            +{project.techStack.length - 3} more
                          </span>
                        )}
                      </div>
                    )}

                    {/* Category Badge */}
                    {project.category && (
                      <span className="inline-block px-3 py-1 bg-gold-400/10 text-gold-400 text-xs rounded-full mb-4">
                        {project.category}
                      </span>
                    )}

                    {/* Action Buttons */}
                    <div className="flex gap-2">
                      <a
                        href={project.link}
                        target="_blank"
                        rel="noopener noreferrer"
                        onClick={() => handleProjectClick(project.id)}
                        className="btn-gold flex-1 px-4 py-2 rounded-lg text-sm font-medium text-center"
                      >
                        {getButtonText(project)}
                      </a>
                      <Link
                        href={`/portfolio/${project.slug}`}
                        className="px-4 py-2 rounded-lg text-sm font-medium text-gold-400 border border-gold-400/30 hover:border-gold-400 hover:bg-gold-400/10 transition-colors"
                      >
                        Details
                      </Link>
                    </div>
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
