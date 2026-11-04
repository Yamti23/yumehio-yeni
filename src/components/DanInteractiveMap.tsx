import React from 'react';
import { motion } from 'motion/react';
import { Award, ChevronRight, CheckCircle2, Clock, Sparkles, BookOpen, Layers } from 'lucide-react';
import { DAN_LEVELS, DanLevel } from '../data/yumeihoData';
import { useLanguage } from '../context/LanguageContext';

interface DanInteractiveMapProps {
  onSelectDan: (dan: DanLevel) => void;
}

export const DanInteractiveMap: React.FC<DanInteractiveMapProps> = ({ onSelectDan }) => {
  const { language } = useLanguage();

  const getBeltStyle = (level: number) => {
    switch (level) {
      case 1:
        return {
          badgeBg: 'bg-yellow-400 text-stone-950 font-bold',
          borderHover: 'hover:border-yellow-400/80',
          ringColor: 'ring-yellow-400/30',
          kanji: '初段',
          badgeText: language === 'tr' ? '1. Dan (Kihon)' : '1st Dan (Kihon)'
        };
      case 2:
        return {
          badgeBg: 'bg-emerald-600 text-white font-bold',
          borderHover: 'hover:border-emerald-500/80',
          ringColor: 'ring-emerald-500/30',
          kanji: '二段',
          badgeText: language === 'tr' ? '2. Dan (Chukyu)' : '2nd Dan (Chukyu)'
        };
      case 3:
        return {
          badgeBg: 'bg-amber-800 text-amber-100 font-bold',
          borderHover: 'hover:border-amber-700/80',
          ringColor: 'ring-amber-700/30',
          kanji: '三段',
          badgeText: language === 'tr' ? '3. Dan (Jokyu)' : '3rd Dan (Jokyu)'
        };
      case 4:
        return {
          badgeBg: 'bg-stone-900 text-stone-100 border border-stone-700 font-bold',
          borderHover: 'hover:border-amber-500/80',
          ringColor: 'ring-amber-500/30',
          kanji: '四段',
          badgeText: language === 'tr' ? '4. Dan (Shihan Dai)' : '4th Dan (Shihan Dai)'
        };
      case 5:
        return {
          badgeBg: 'bg-stone-950 text-amber-400 border border-amber-500/60 font-bold shadow-lg shadow-amber-500/10',
          borderHover: 'hover:border-amber-400',
          ringColor: 'ring-amber-400/40',
          kanji: '五段',
          badgeText: language === 'tr' ? '5. Dan (Shihan)' : '5th Dan (Shihan)'
        };
      default:
        return {
          badgeBg: 'bg-stone-800 text-white',
          borderHover: 'hover:border-stone-500',
          ringColor: 'ring-stone-500/20',
          kanji: '段',
          badgeText: 'Dan'
        };
    }
  };

  const headerText = {
    tr: {
      kicker: 'ETKİLEŞİMLİ AKREDİTASYON HARİTASI',
      title: '1. Dan\'dan 5. Dan\'a Yumeiho Yolculuk Haritası',
      subtitle: 'Her Dan seviyesinin gerekliliklerini, klinik yetkinliklerini ve müfredat detaylarını incelemek için basamaklara tıklayın.'
    },
    jp: {
      kicker: 'インタラクティブ段位マップ',
      title: '初段から五段へのユメイホ修道ロードマップ',
      subtitle: '各段位の受講要件、臨床修得スキル、詳細カリキュラムを確認するには各カードをクリックしてください。'
    },
    en: {
      kicker: 'INTERACTIVE ACCREDITATION MAP',
      title: 'Yumeiho Journey Roadmap: 1st to 5th Dan',
      subtitle: 'Click on any Dan level card to explore requirements, clinical competencies, and curriculum details.'
    }
  }[language];

  return (
    <div className="my-12 p-6 sm:p-8 rounded-3xl bg-stone-900 text-stone-100 border border-stone-800 shadow-2xl relative overflow-hidden">
      {/* Background Decorative Grid Accent */}
      <div className="absolute inset-0 bg-[radial-gradient(#C49B66_1px,transparent_1px)] [background-size:24px_24px] opacity-10 pointer-events-none" />

      {/* Header */}
      <div className="relative z-10 max-w-2xl mb-8">
        <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full bg-amber-500/10 border border-amber-500/20 text-amber-400 text-[11px] font-mono tracking-wider mb-2">
          <Sparkles className="w-3.5 h-3.5 text-amber-400" />
          <span>{headerText.kicker}</span>
        </div>
        <h3 className="font-serif text-2xl sm:text-3xl font-bold text-white tracking-tight leading-snug">
          {headerText.title}
        </h3>
        <p className="text-xs sm:text-sm text-stone-400 mt-2 leading-relaxed">
          {headerText.subtitle}
        </p>
      </div>

      {/* Connected Visual Roadmap Nodes */}
      <div className="relative z-10">
        {/* Connection Pathway Line (Desktop & Tablet) */}
        <div className="hidden lg:block absolute top-1/2 left-8 right-8 h-1 bg-gradient-to-r from-amber-500/20 via-amber-500/50 to-amber-500/20 -translate-y-12 z-0" />

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4 relative z-10">
          {DAN_LEVELS.map((dan, index) => {
            const style = getBeltStyle(dan.level);

            return (
              <motion.div
                key={dan.level}
                whileHover={{ y: -6, scale: 1.02 }}
                transition={{ duration: 0.2 }}
                onClick={() => onSelectDan(dan)}
                className={`group cursor-pointer p-5 rounded-2xl bg-stone-950/90 border border-stone-800/90 ${style.borderHover} transition-all duration-300 shadow-xl flex flex-col justify-between relative`}
              >
                {/* Level Node Header */}
                <div>
                  <div className="flex items-center justify-between mb-3">
                    <span className="font-mono text-xs text-amber-400 font-bold">
                      0{dan.level}
                    </span>
                    <span className="font-serif font-bold text-amber-500/80 text-lg">
                      {style.kanji}
                    </span>
                  </div>

                  {/* Belt Badge */}
                  <div className={`inline-block px-2.5 py-1 rounded-md text-[11px] mb-3 ${style.badgeBg}`}>
                    {style.badgeText}
                  </div>

                  {/* Title */}
                  <h4 className="font-serif font-bold text-sm text-stone-100 group-hover:text-amber-300 transition-colors mb-2 leading-snug">
                    {dan.turkishTitle}
                  </h4>

                  {/* Prerequisites Brief */}
                  <div className="text-[11px] text-stone-400 space-y-1 mb-4">
                    <div className="flex items-center gap-1.5 text-stone-300 font-medium">
                      <Clock className="w-3 h-3 text-amber-400 shrink-0" />
                      <span>{dan.duration}</span>
                    </div>
                    <p className="line-clamp-2 text-stone-400 text-[10px] leading-normal pt-1">
                      <strong className="text-stone-300">Gereklilik:</strong> {dan.prerequisites}
                    </p>
                  </div>
                </div>

                {/* Key Gain / Outcome summary */}
                <div className="pt-3 border-t border-stone-800/80">
                  <div className="flex items-center space-x-1 text-[10px] font-semibold text-emerald-400 mb-2">
                    <CheckCircle2 className="w-3 h-3 shrink-0" />
                    <span className="truncate">Kazanım: {dan.beltColor}</span>
                  </div>

                  {/* Trigger Detail Modal CTA */}
                  <div className="w-full py-2 px-3 rounded-lg bg-stone-900 group-hover:bg-amber-600 group-hover:text-stone-950 text-stone-300 text-[11px] font-semibold transition-all flex items-center justify-between">
                    <span className="flex items-center gap-1">
                      <BookOpen className="w-3 h-3" />
                      <span>Müfredat & Modal</span>
                    </span>
                    <ChevronRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 transition-transform" />
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </div>
  );
};
