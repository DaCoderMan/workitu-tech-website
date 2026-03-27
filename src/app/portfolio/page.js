import { getProjects } from '../../lib/firestore-data';
import PortfolioClient from './PortfolioClient';

export const metadata = {
  title: 'Portfolio | Workitu Tech',
  description: 'AI automation systems, SaaS products, and web applications built by Workitu Tech. See Conex\u00e3o Israel Brasil and more.',
};

const FEATURED_PROJECTS = [
  {
    id: 'cib',
    title: 'Conex\u00e3o Israel Brasil',
    description: 'AI assistant for the 15,000+ Brazilians living in Israel. Includes AI chat powered by Claude and GPT, financial simulators (income tax, Bituach Leumi), a rights calculator, 10 step-by-step guides, and a verified directory of Brazilian professionals in Israel. Freemium SaaS with $9.99/month premium plan.',
    category: 'SaaS Product',
    image: '/images/portfolio/cib.jpg',
    link: 'https://conexaoisraelbrasil.org',
    isWebsite: true,
    featured: true,
    tags: ['Next.js', 'React', 'Node.js', 'PostgreSQL', 'Claude API', 'OpenAI', 'Lemon Squeezy', 'Vercel'],
  },
];

export default async function PortfolioPage() {
  let projects = [];
  try {
    projects = await getProjects();
  } catch (err) {
    console.error('[portfolio] Error fetching projects:', err.message);
  }

  // Merge featured projects (at the top) with Firestore projects, avoiding duplicates
  const firestoreIds = new Set(projects.map(p => p.id));
  const featuredToAdd = FEATURED_PROJECTS.filter(fp => !firestoreIds.has(fp.id));
  const allProjects = [...featuredToAdd, ...projects];

  return <PortfolioClient initialProjects={allProjects} />;
}
