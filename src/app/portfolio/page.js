'use client';

import { useEffect, useState } from 'react';
import VideoBackground from '../../components/animations/VideoBackground';

export default function Portfolio() {
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);

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

    // Fetch projects
    fetch('/api/admin/projects')
      .then(res => res.json())
      .then(data => {
        setProjects(data);
        setLoading(false);
      })
      .catch(err => {
        console.error('Error fetching projects:', err);
        setLoading(false);
      });
  }, []);

  const handleProjectClick = (projectId) => {
    // Track project click
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

  return (
    <div className="relative min-h-screen">
      <VideoBackground />
      
      {/* Header Section */}
      <section className="relative z-10 pt-20 pb-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto text-center">
          <h1 className="text-4xl md:text-5xl font-bold mb-6 fade-in">
            <span className="gradient-text">Our Portfolio</span>
          </h1>
          <p className="text-lg md:text-xl text-gold-300/80 max-w-3xl mx-auto fade-in" style={{ animationDelay: '0.2s' }}>
            Discover the digital experiences we've crafted. Each project represents our commitment to innovation, creativity, and excellence.
          </p>
        </div>
      </section>

      {/* Projects Grid */}
      <section className="relative z-10 pb-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          {loading ? (
            <div className="flex justify-center items-center py-20">
              <div className="loading-spinner"></div>
              <span className="ml-3 text-gold-400">Loading projects...</span>
            </div>
          ) : projects.length === 0 ? (
            <div className="text-center py-20">
              <p className="text-gold-300/60 text-lg">No projects available yet. Check back soon!</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {projects.map((project, index) => (
                <div
                  key={project.id}
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
                        ></iframe>
                        <div className="absolute inset-0 bg-black/20 hover:bg-black/10 transition-colors duration-300 flex items-center justify-center">
                          <div className="bg-gold-400/90 rounded-full p-3 hover:bg-gold-400 transition-colors duration-300">
                            <svg className="w-6 h-6 text-black" fill="currentColor" viewBox="0 0 20 20">
                              <path d="M8 5v10l8-5-8-5z" />
                            </svg>
                          </div>
                        </div>
                      </div>
                    ) : project.image ? (
                      <img
                        src={project.image}
                        alt={project.title}
                        className="w-full h-full object-cover"
                        onError={(e) => {
                          e.target.style.display = 'none';
                          e.target.nextSibling.style.display = 'flex';
                        }}
                      />
                    ) : null}
                    <div 
                      className="w-full h-full flex items-center justify-center text-gold-400/50"
                      style={{ display: (project.image || project.isVideo) ? 'none' : 'flex' }}
                    >
                      <svg className="w-16 h-16" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M4 3a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V5a2 2 0 00-2-2H4zm12 12H4l4-8 3 6 2-4 3 6z" clipRule="evenodd" />
                      </svg>
                    </div>
                  </div>
                  
                  <div className="p-6">
                    <h3 className="text-xl font-semibold text-gold-300 mb-2">
                      {project.title}
                    </h3>
                    <p className="text-gold-400/70 text-sm mb-4 line-clamp-3">
                      {project.description}
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
                      {project.isVideo ? 'Watch Video' : 'View Project'}
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
