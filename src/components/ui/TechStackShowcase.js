'use client';

import { motion } from 'framer-motion';
import TechBadge from './TechBadge';

const technologies = [
  { name: 'Next.js', category: 'Frontend' },
  { name: 'React', category: 'Frontend' },
  { name: 'Tailwind CSS', category: 'Frontend' },
  { name: 'Node.js', category: 'Backend' },
  { name: 'Python', category: 'AI/ML' },
  { name: 'OpenAI', category: 'AI/ML' },
  { name: 'PostgreSQL', category: 'Backend' },
  { name: 'Vercel', category: 'Deployment' },
];

export default function TechStackShowcase({ title }) {
  return (
    <div className="text-center">
      {title && (
        <h3 className="text-lg text-gold-300/70 mb-6 uppercase tracking-wider">
          {title}
        </h3>
      )}
      <div className="flex flex-wrap justify-center gap-3">
        {technologies.map((tech, index) => (
          <motion.div
            key={tech.name}
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: index * 0.1, duration: 0.3 }}
          >
            <TechBadge name={tech.name} size="md" />
          </motion.div>
        ))}
      </div>
    </div>
  );
}
