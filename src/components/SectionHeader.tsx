import React from 'react';
import { motion } from 'motion/react';

interface SectionHeaderProps {
  kicker?: string;
  title: React.ReactNode;
  description?: React.ReactNode;
  centered?: boolean;
  className?: string;
}

export const SectionHeader: React.FC<SectionHeaderProps> = ({
  kicker,
  title,
  description,
  centered = false,
  className = ''
}) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 32 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-80px' }}
      transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
      className={`max-w-3xl mb-12 ${centered ? 'mx-auto text-center' : ''} ${className}`}
    >
      {kicker && (
        <motion.p
          initial={{ opacity: 0, x: -16 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.1, ease: 'easeOut' }}
          className="text-xs font-semibold uppercase tracking-widest text-[#8B261E] mb-2 flex items-center gap-2"
        >
          {kicker}
        </motion.p>
      )}

      <motion.h2
        initial={{ opacity: 0, y: 18 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8, delay: 0.15, ease: [0.16, 1, 0.3, 1] }}
        className="font-serif-luxury text-2xl sm:text-3xl lg:text-4xl font-bold tracking-tight text-[#171614] [text-wrap:balance]"
      >
        {title}
      </motion.h2>

      {description && (
        <motion.div
          initial={{ opacity: 0, y: 14 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7, delay: 0.25, ease: 'easeOut' }}
          className="text-[#57534E] mt-4 text-base sm:text-lg leading-relaxed font-light"
        >
          {description}
        </motion.div>
      )}
    </motion.div>
  );
};
