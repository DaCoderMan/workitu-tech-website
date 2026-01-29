'use client';

import { motion } from 'framer-motion';
import { useLanguage } from '../../lib/useLanguage';

export default function ProcessSection() {
  const { t } = useLanguage();

  const steps = [
    { number: '01', title: t('home.process.step1.title'), desc: t('home.process.step1.desc') },
    { number: '02', title: t('home.process.step2.title'), desc: t('home.process.step2.desc') },
    { number: '03', title: t('home.process.step3.title'), desc: t('home.process.step3.desc') },
    { number: '04', title: t('home.process.step4.title'), desc: t('home.process.step4.desc') }
  ];

  return (
    <div className="text-center">
      <h2 className="text-2xl md:text-3xl font-bold text-gold-300 mb-8">
        {t('home.process.title')}
      </h2>
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6">
        {steps.map((step, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.1, duration: 0.5 }}
            className="glass rounded-xl p-4 md:p-6"
          >
            <div className="text-gold-500 text-2xl md:text-3xl font-bold mb-2">
              {step.number}
            </div>
            <div className="text-gold-300 font-medium text-sm md:text-base">
              {step.title}
            </div>
            <div className="text-gold-400/70 text-xs md:text-sm mt-1">
              {step.desc}
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
}
