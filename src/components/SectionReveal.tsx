import React, { ReactNode } from 'react';
import { motion, Variants } from 'motion/react';

interface SectionRevealProps {
  children: ReactNode;
  id?: string;
  className?: string;
  delay?: number;
}

const sectionVariants: Variants = {
  hidden: {
    opacity: 0,
    y: 38,
  },
  visible: (customDelay: number = 0) => ({
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.75,
      delay: customDelay,
      ease: [0.22, 1, 0.36, 1],
    },
  }),
};

/**
 * SectionReveal: Framer Motion scroll-triggered entrance wrapper.
 * Fades and slides in gracefully as user scrolls down the page.
 */
export const SectionReveal: React.FC<SectionRevealProps> = ({
  children,
  id,
  className = '',
  delay = 0,
}) => {
  return (
    <motion.section
      id={id}
      className={className}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: '-60px' }}
      variants={sectionVariants}
      custom={delay}
    >
      {children}
    </motion.section>
  );
};

/**
 * StaggerContainer: Parent wrapper that orchestrates staggered entrance
 * for child items (cards, grid elements, icons) as they enter viewport.
 */
export const StaggerContainer: React.FC<{
  children: ReactNode;
  className?: string;
  staggerDelay?: number;
}> = ({ children, className = '', staggerDelay = 0.12 }) => {
  return (
    <motion.div
      className={className}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: '-40px' }}
      variants={{
        hidden: { opacity: 0 },
        visible: {
          opacity: 1,
          transition: {
            staggerChildren: staggerDelay,
            delayChildren: 0.05,
          },
        },
      }}
    >
      {children}
    </motion.div>
  );
};

/**
 * StaggerItem: Child element wrapper that fades in and slides up in sequence.
 */
export const StaggerItem: React.FC<{
  children: ReactNode;
  className?: string;
}> = ({ children, className = '' }) => {
  return (
    <motion.div
      className={className}
      variants={{
        hidden: { opacity: 0, y: 28, scale: 0.98 },
        visible: {
          opacity: 1,
          y: 0,
          scale: 1,
          transition: {
            duration: 0.6,
            ease: [0.22, 1, 0.36, 1],
          },
        },
      }}
    >
      {children}
    </motion.div>
  );
};
