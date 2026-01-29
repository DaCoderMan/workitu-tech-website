import fs from 'fs';
import path from 'path';

const BASE_URL = process.env.NEXT_PUBLIC_SITE_URL || 'https://workitu.tech';

export default async function sitemap() {
  // Static pages
  const staticPages = [
    {
      url: BASE_URL,
      lastModified: new Date(),
      changeFrequency: 'weekly',
      priority: 1,
    },
    {
      url: `${BASE_URL}/portfolio`,
      lastModified: new Date(),
      changeFrequency: 'weekly',
      priority: 0.9,
    },
    {
      url: `${BASE_URL}/pricing`,
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 0.8,
    },
    {
      url: `${BASE_URL}/contact`,
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 0.7,
    },
    {
      url: `${BASE_URL}/about`,
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 0.8,
    },
    {
      url: `${BASE_URL}/services`,
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 0.8,
    },
  ];

  // Dynamic project pages (if individual project pages exist)
  let projectPages = [];
  try {
    const projectsFile = path.join(process.cwd(), 'src', 'data', 'projects.json');
    const projectsData = fs.readFileSync(projectsFile, 'utf8');
    const projects = JSON.parse(projectsData);

    projectPages = projects
      .filter((project) => project.slug)
      .map((project) => ({
        url: `${BASE_URL}/portfolio/${project.slug}`,
        lastModified: new Date(project.dateAdded),
        changeFrequency: 'monthly',
        priority: 0.7,
      }));
  } catch (error) {
    console.error('Error reading projects for sitemap:', error);
  }

  return [...staticPages, ...projectPages];
}
