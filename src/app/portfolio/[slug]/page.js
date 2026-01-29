import { notFound } from 'next/navigation';
import Image from 'next/image';
import Link from 'next/link';
import projects from '../../../data/projects.json';
import TechBadge from '../../../components/ui/TechBadge';
import VideoBackground from '../../../components/animations/VideoBackground';

// Generate static params for all projects
export async function generateStaticParams() {
  return projects.map((project) => ({
    slug: project.slug,
  }));
}

// Generate metadata for each project
export async function generateMetadata({ params }) {
  const project = projects.find((p) => p.slug === params.slug);

  if (!project) {
    return {
      title: 'Project Not Found',
    };
  }

  return {
    title: `${project.title} - Portfolio`,
    description: project.description,
    openGraph: {
      title: `${project.title} | Workitu Tech Portfolio`,
      description: project.description,
      images: [project.image],
      type: 'article',
    },
    twitter: {
      card: 'summary_large_image',
      title: project.title,
      description: project.description,
      images: [project.image],
    },
  };
}

export default function ProjectPage({ params }) {
  const project = projects.find((p) => p.slug === params.slug);

  if (!project) {
    notFound();
  }

  // Find related projects (same category, excluding current)
  const relatedProjects = projects
    .filter((p) => p.category === project.category && p.id !== project.id)
    .slice(0, 3);

  const getButtonText = () => {
    if (project.isVideo) return 'Watch Video';
    if (project.isWebsite) return 'Visit Website';
    return 'View Project';
  };

  return (
    <div className="relative min-h-screen">
      <VideoBackground />

      {/* Hero Section */}
      <section className="relative z-10 pt-20 pb-8 px-4 sm:px-6 lg:px-8">
        <div className="max-w-6xl mx-auto">
          {/* Back Link */}
          <Link
            href="/portfolio"
            className="inline-flex items-center gap-2 text-gold-400 hover:text-gold-300 transition-colors mb-8"
          >
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
            Back to Portfolio
          </Link>

          {/* Project Header */}
          <div className="glass rounded-2xl overflow-hidden">
            {/* Project Image/Video */}
            <div className="aspect-video relative bg-gold-400/10">
              {project.isVideo && project.videoId ? (
                <iframe
                  src={`https://www.youtube.com/embed/${project.videoId}?rel=0&modestbranding=1`}
                  title={project.title}
                  className="w-full h-full"
                  frameBorder="0"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                />
              ) : project.image ? (
                <Image
                  src={project.image}
                  alt={project.title}
                  fill
                  sizes="(max-width: 1200px) 100vw, 1200px"
                  className="object-cover"
                  priority
                />
              ) : (
                <div className="w-full h-full flex items-center justify-center text-gold-400/50">
                  <svg className="w-24 h-24" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M4 3a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V5a2 2 0 00-2-2H4zm12 12H4l4-8 3 6 2-4 3 6z" clipRule="evenodd" />
                  </svg>
                </div>
              )}

              {/* Featured Badge */}
              {project.featured && (
                <div className="absolute top-4 right-4 px-3 py-1 bg-gold-400 text-black text-sm font-bold rounded-full">
                  Featured
                </div>
              )}
            </div>

            {/* Project Info */}
            <div className="p-8 md:p-12">
              {/* Category Badge */}
              {project.category && (
                <span className="inline-block px-3 py-1 bg-gold-400/10 text-gold-400 text-sm rounded-full mb-4">
                  {project.category}
                </span>
              )}

              {/* Title */}
              <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-6">
                <span className="gradient-text">{project.title}</span>
              </h1>

              {/* Description */}
              <p className="text-lg md:text-xl text-gold-300/80 mb-8 leading-relaxed">
                {project.longDescription || project.description}
              </p>

              {/* Tech Stack */}
              {project.techStack && project.techStack.length > 0 && (
                <div className="mb-8">
                  <h3 className="text-sm text-gold-400/60 uppercase tracking-wider mb-3">Technologies Used</h3>
                  <div className="flex flex-wrap gap-2">
                    {project.techStack.map((tech) => (
                      <TechBadge key={tech} name={tech} size="md" />
                    ))}
                  </div>
                </div>
              )}

              {/* Results/Metrics */}
              {project.results && Object.keys(project.results).length > 0 && (
                <div className="mb-8">
                  <h3 className="text-sm text-gold-400/60 uppercase tracking-wider mb-3">Project Highlights</h3>
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                    {Object.entries(project.results).map(([key, value]) => (
                      <div key={key} className="bg-gold-400/5 rounded-lg p-4 border border-gold-400/10">
                        <div className="text-xl font-bold text-gold-400">{value}</div>
                        <div className="text-sm text-gold-300/60 capitalize">{key.replace(/([A-Z])/g, ' $1').trim()}</div>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* CTA Button */}
              <div className="flex flex-col sm:flex-row gap-4">
                <a
                  href={project.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn-gold px-8 py-4 rounded-full text-lg font-semibold inline-flex items-center justify-center gap-2"
                >
                  {getButtonText()}
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                  </svg>
                </a>
                <Link
                  href="/contact"
                  className="btn-outline-gold px-8 py-4 rounded-full text-lg font-semibold inline-flex items-center justify-center"
                >
                  Want something similar?
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Related Projects Section */}
      {relatedProjects.length > 0 && (
        <section className="relative z-10 py-16 px-4 sm:px-6 lg:px-8">
          <div className="max-w-6xl mx-auto">
            <h2 className="text-2xl md:text-3xl font-bold mb-8">
              <span className="gradient-text">Related Projects</span>
            </h2>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {relatedProjects.map((relatedProject) => (
                <Link
                  key={relatedProject.id}
                  href={`/portfolio/${relatedProject.slug}`}
                  className="card-hover glass rounded-xl overflow-hidden group"
                >
                  <div className="aspect-video bg-gold-400/10 relative overflow-hidden">
                    {relatedProject.image && (
                      <Image
                        src={relatedProject.image}
                        alt={relatedProject.title}
                        fill
                        sizes="(max-width: 768px) 100vw, 33vw"
                        className="object-cover transition-transform duration-300 group-hover:scale-105"
                        loading="lazy"
                      />
                    )}
                  </div>
                  <div className="p-5">
                    <h3 className="text-lg font-semibold text-gold-300 mb-2 line-clamp-1">
                      {relatedProject.title}
                    </h3>
                    <p className="text-gold-400/70 text-sm line-clamp-2">
                      {relatedProject.description}
                    </p>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* CTA Section */}
      <section className="relative z-10 py-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-2xl mx-auto text-center">
          <div className="glass rounded-2xl p-8">
            <h2 className="text-2xl md:text-3xl font-bold text-gold-300 mb-4">
              Ready to build your project?
            </h2>
            <p className="text-gold-400/80 mb-6">
              Let&apos;s discuss your idea and create something amazing together.
            </p>
            <Link
              href="/contact"
              className="btn-gold inline-block px-8 py-4 rounded-full text-lg font-semibold"
            >
              Start Your Project
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
