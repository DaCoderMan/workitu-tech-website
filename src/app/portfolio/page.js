import { getProjects } from '../../lib/firestore-data';
import PortfolioClient from './PortfolioClient';

export const metadata = {
  title: 'Portfolio | Workitu Tech',
  description: 'Explore our portfolio of web development, AI solutions, and digital projects.',
};

export default async function PortfolioPage() {
  let projects = [];
  try {
    projects = await getProjects();
  } catch (err) {
    console.error('[portfolio] Error fetching projects:', err.message);
  }

  return <PortfolioClient initialProjects={projects} />;
}
