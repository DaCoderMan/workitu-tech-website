import { getProjects } from '../lib/firestore-data';

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
    {
      url: `${BASE_URL}/legal`,
      lastModified: new Date(),
      changeFrequency: 'yearly',
      priority: 0.3,
    },
  ];

  // Dynamic project pages
  let projectPages = [];
  try {
    const projects = await getProjects();

    projectPages = projects.map((project) => ({
      url: `${BASE_URL}/portfolio#${project.id}`,
      lastModified: new Date(project.dateAdded),
      changeFrequency: 'monthly',
      priority: 0.6,
    }));
  } catch (error) {
    console.error('Error reading projects for sitemap:', error);
  }

  return [...staticPages, ...projectPages];
}
