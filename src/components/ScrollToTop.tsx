import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { ArrowUp } from 'lucide-react';
import { zenAudio } from '../utils/audioZen';
import { useLanguage } from '../context/LanguageContext';

export const ScrollToTop: React.FC = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [scrollProgress, setScrollProgress] = useState(0);
  const { language } = useLanguage();

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      
      // Show button only after 500px scroll depth
      if (currentScrollY > 500) {
        setIsVisible(true);
      } else {
        setIsVisible(false);
      }

      // Calculate total page scroll percentage for circular indicator
      const totalHeight = document.documentElement.scrollHeight - window.innerHeight;
      if (totalHeight > 0) {
        const progress = Math.min(100, Math.max(0, (currentScrollY / totalHeight) * 100));
        setScrollProgress(progress);
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    // Initial check
    handleScroll();

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  const scrollToTop = () => {
    zenAudio.playZenBowl(528, 1.5);
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  };

  // SVG circular progress calculation
  const radius = 20;
  const circumference = 2 * Math.PI * radius;
  const strokeDashoffset = circumference - (scrollProgress / 100) * circumference;

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.button
          type="button"
          onClick={scrollToTop}
          initial={{ opacity: 0, y: 20, scale: 0.85 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: 16, scale: 0.85 }}
          transition={{ duration: 0.28, ease: [0.16, 1, 0.3, 1] }}
          whileHover={{ y: -3 }}
          whileTap={{ scale: 0.94 }}
          className="fixed bottom-6 right-6 sm:bottom-8 sm:right-8 z-40 flex items-center justify-center w-12 h-12 rounded-full bg-[#F8F7F4]/90 backdrop-blur-md border border-[#D8D6D0] hover:border-[#8B261E] text-[#171614] hover:text-[#8B261E] shadow-sm hover:shadow-lg hover:shadow-[#8B261E]/10 transition-colors duration-300 group cursor-pointer focus:outline-none focus-visible:ring-2 focus-visible:ring-[#8B261E]"
          aria-label={language === 'tr' ? 'Sayfa Başına Dön' : 'Scroll to top'}
          title={language === 'tr' ? 'Sayfa Başına Dön' : 'Scroll to top'}
        >
          {/* Subtle circular SVG progress ring */}
          <svg
            className="absolute inset-0 w-full h-full -rotate-90 pointer-events-none p-0.5"
            viewBox="0 0 44 44"
            aria-hidden="true"
          >
            {/* Background track */}
            <circle
              cx="22"
              cy="22"
              r={radius}
              stroke="currentColor"
              strokeWidth="1.5"
              fill="none"
              className="text-[#E6E4DC] opacity-40"
            />
            {/* Active progress */}
            <circle
              cx="22"
              cy="22"
              r={radius}
              stroke="#8B261E"
              strokeWidth="1.5"
              fill="none"
              strokeDasharray={circumference}
              strokeDashoffset={strokeDashoffset}
              strokeLinecap="round"
              className="transition-[stroke-dashoffset] duration-150 ease-out"
            />
          </svg>

          {/* Icon with refined vertical micro-interaction */}
          <div className="relative flex flex-col items-center justify-center">
            <ArrowUp className="w-4 h-4 text-[#171614] group-hover:text-[#8B261E] group-hover:-translate-y-0.5 transition-all duration-300 stroke-[2]" />
            <span className="text-[9px] font-serif font-bold tracking-tighter text-[#8B261E] opacity-75 group-hover:opacity-100 transition-opacity -mt-0.5 leading-none">
              頂
            </span>
          </div>
        </motion.button>
      )}
    </AnimatePresence>
  );
};
