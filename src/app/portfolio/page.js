import { getProjects } from '../../lib/firestore-data';
import PortfolioClient from './PortfolioClient';

export const metadata = {
  title: 'Portfolio | Workitu Tech',
  description: 'AI automation systems, SaaS products, and web applications built by Workitu Tech. See Conex\u00e3o Israel Brasil, Bee AI Chief of Staff, and more.',
};

const FEATURED_PROJECTS = [
  {
    id: 'cib',
    title: 'Conex\u00e3o Israel Brasil',
    description: 'AI assistant for the 15,000+ Brazilians living in Israel. Includes AI chat powered by Claude and GPT, financial simulators (income tax, Bituach Leumi), a rights calculator, 10 step-by-step guides, and a verified directory of Brazilian professionals in Israel. Freemium SaaS with $9.99/month premium plan.',
    category: 'SaaS Product',
    image: '/images/portfolio/cib.png',
    link: 'https://conexaoisraelbrasil.org',
    isWebsite: true,
    featured: true,
    tags: ['Next.js', 'React', 'Node.js', 'PostgreSQL', 'Claude API', 'OpenAI', 'Lemon Squeezy', 'Vercel'],
  },
  {
    id: 'bee',
    title: 'Bee \u2014 AI Chief of Staff System',
    description: 'Proprietary AI Chief of Staff system that manages tasks, memory, health data, finances, and business operations. Running on a Hetzner VPS with 38+ modular skills, a custom Vault API, and integrations with Google Calendar, Gmail, and ClickUp. Demonstrates ability to architect complex multi-service AI systems.',
    category: 'AI Infrastructure',
    image: '/images/portfolio/bee.png',
    link: '/contact',
    isWebsite: false,
    featured: true,
    tags: ['Python', 'FastAPI', 'PostgreSQL', 'ChromaDB', 'n8n', 'Claude API', 'Hetzner VPS'],
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
