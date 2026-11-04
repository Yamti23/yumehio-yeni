import React from 'react';
import { ShieldCheck, Compass, Award, ArrowRight, CheckCircle2 } from 'lucide-react';
import { REPRESENTATIVE_INFO } from '../data/yumeihoData';
import { zenAudio } from '../utils/audioZen';
import { useLanguage } from '../context/LanguageContext';

interface HeroProps {
  onOpenBooking: (tab?: 'therapy' | 'seminar') => void;
  onNavigateToTest: () => void;
}

export const Hero: React.FC<HeroProps> = ({ onOpenBooking, onNavigateToTest }) => {
  const { language, t } = useLanguage();

  return (
    <section className="relative overflow-hidden pt-10 pb-16 lg:pt-16 lg:pb-24 border-b border-[#E6E4DC] dark:border-[#2E2C29] washi-pattern transition-colors duration-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Top Trust Header Strip */}
        <div className="flex flex-wrap items-center gap-3 text-xs font-semibold text-[#78716C] dark:text-[#A8A29E] mb-8">
          <span className="inline-flex items-center gap-1.5 border border-[#8B261E] dark:border-[#C49B66] text-[#8B261E] dark:text-[#C49B66] px-2 py-0.5 text-[11px] font-serif font-bold tracking-widest bg-[#8B261E]/5 dark:bg-[#C49B66]/10 rounded-sm">
            湧命法 {language === 'tr' ? 'ULUSLARARASI AKREDİTASYON' : 'INTERNATIONAL ACCREDITATION'}
          </span>
          <span aria-hidden="true" className="text-[#D8D6D0] dark:text-[#3D3A35]">·</span>
          <span className="text-[#44403C] dark:text-[#D6D3D1] tracking-wide">{REPRESENTATIVE_INFO.federation}</span>
          <span aria-hidden="true" className="text-[#D8D6D0] dark:text-[#3D3A35]">·</span>
          <span className="text-[#171614] dark:text-[#F8F7F4] font-bold">{t('hero_rep_title')}</span>
        </div>

        {/* Hero Split Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-10 items-center">
          
          {/* Left Column: Editorial Proposition and Actions */}
          <div className="lg:col-span-7 space-y-7">
            <h1 className="font-serif-luxury text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight text-[#171614] dark:text-[#F8F7F4] [text-wrap:balance] leading-[1.08]">
              {t('hero_h1_main')} <br />
              <span className="italic font-normal text-[#8B261E] dark:text-[#C49B66]">{t('hero_h1_italic')}</span> <br className="hidden sm:inline" />
              {t('hero_h1_sub')}
            </h1>

            <p className="text-base sm:text-lg text-[#57534E] dark:text-[#A8A29E] leading-relaxed max-w-2xl font-light">
              {t('hero_p')}
            </p>

            {/* Key benefits list */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-1 text-xs sm:text-sm text-[#44403C] dark:text-[#D6D3D1]">
              <div className="flex items-start gap-2.5">
                <CheckCircle2 className="w-4 h-4 text-[#8B261E] dark:text-[#C49B66] shrink-0 mt-0.5" />
                <span>{t('hero_point_1')}</span>
              </div>
              <div className="flex items-start gap-2.5">
                <CheckCircle2 className="w-4 h-4 text-[#8B261E] dark:text-[#C49B66] shrink-0 mt-0.5" />
                <span>{t('hero_point_2')}</span>
              </div>
              <div className="flex items-start gap-2.5">
                <CheckCircle2 className="w-4 h-4 text-[#8B261E] dark:text-[#C49B66] shrink-0 mt-0.5" />
                <span>{t('hero_point_3')}</span>
              </div>
              <div className="flex items-start gap-2.5">
                <CheckCircle2 className="w-4 h-4 text-[#8B261E] dark:text-[#C49B66] shrink-0 mt-0.5" />
                <span>{t('hero_point_4')}</span>
              </div>
            </div>

            {/* CTAs */}
            <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 pt-2">
              <button
                onClick={() => {
                  zenAudio.playZenBowl(528, 2);
                  onOpenBooking('therapy');
                }}
                className="inline-flex items-center justify-center px-6 py-3.5 text-xs sm:text-sm font-semibold uppercase tracking-wider text-white dark:text-[#171614] bg-[#171614] dark:bg-[#C49B66] rounded-xl hover:bg-[#8B261E] dark:hover:bg-[#D4AF37] transition-all shadow-md group whitespace-nowrap"
              >
                <span>{t('hero_cta_therapy')}</span>
                <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-0.5 transition-transform" />
              </button>

              <button
                onClick={() => onOpenBooking('seminar')}
                className="inline-flex items-center justify-center px-6 py-3.5 text-xs sm:text-sm font-semibold uppercase tracking-wider text-[#171614] dark:text-[#F8F7F4] bg-[#EAE8E1] dark:bg-[#2E2C29] hover:bg-[#DCD8CF] dark:hover:bg-[#3D3A35] rounded-xl transition-all whitespace-nowrap"
              >
                <span>{t('hero_cta_seminar')}</span>
              </button>

              <button
                onClick={onNavigateToTest}
                className="inline-flex items-center justify-center px-4 py-3.5 text-xs font-semibold text-[#57534E] dark:text-[#A8A29E] hover:text-[#171614] dark:hover:text-white transition-colors whitespace-nowrap border border-[#D8D6D0] dark:border-[#3D3A35] rounded-xl hover:bg-white dark:hover:bg-[#1E1C1A]"
              >
                {t('hero_cta_test')}
              </button>
            </div>

            {/* Proof indicators unboxed */}
            <div className="pt-6 border-t border-[#E6E4DC] dark:border-[#2E2C29] flex flex-wrap items-center gap-6 text-xs text-[#78716C] dark:text-[#A8A29E]">
              <div className="flex items-center gap-2">
                <Award className="w-4 h-4 text-[#8B261E] dark:text-[#C49B66]" />
                <span>{t('trust_years')}</span>
              </div>
              <div className="flex items-center gap-2">
                <ShieldCheck className="w-4 h-4 text-[#8B261E] dark:text-[#C49B66]" />
                <span>{t('trust_accreditation')}</span>
              </div>
              <div className="flex items-center gap-2">
                <Compass className="w-4 h-4 text-[#8B261E] dark:text-[#C49B66]" />
                <span>{t('trust_graduates')}</span>
              </div>
            </div>

          </div>

          {/* Right Column: Hero Visual Showcase */}
          <div className="lg:col-span-5">
            <div className="relative rounded-3xl overflow-hidden border border-[#D8D6D0] dark:border-[#3D3A35] shadow-xl bg-[#171614] group">
              <img
                src="/src/assets/images/hero_yumeiho_therapy_1793549686664.jpg"
                alt="Yumeiho Terapi Seansı - Japon Manuel Terapi Seansı"
                className="w-full aspect-[4/3] object-cover group-hover:scale-[1.02] transition-transform duration-700 opacity-95"
                referrerPolicy="no-referrer"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#171614] via-[#171614]/30 to-transparent pointer-events-none" />
              
              <div className="absolute bottom-0 left-0 right-0 p-6 text-white">
                <div className="flex items-center justify-between text-xs font-medium text-[#D8D6D0] mb-1.5">
                  <span className="tracking-widest uppercase text-[11px]">Masayuki Saionji Ekolü</span>
                  <span className="font-serif text-[#C49B66] text-sm">湧命法</span>
                </div>
                <h3 className="font-serif-luxury text-xl sm:text-2xl font-bold tracking-tight text-white mb-1.5">
                  Kotsuban Yumeiho Pelvis Düzeltme Metodu
                </h3>
                <p className="text-xs text-[#D8D6D0] leading-relaxed line-clamp-2 font-light">
                  Vücudun ağırlık merkezi leğen kemiğindedir. Pelvis dengelendiğinde omurga doğal kavisini geri kazanır ve vücudun kendini iyileştirme gücü devreye girer.
                </p>
              </div>
            </div>

            {/* Quick cards strip */}
            <div className="grid grid-cols-2 gap-3 mt-3">
              <div className="p-4 bg-white/90 dark:bg-[#1E1C1A]/90 backdrop-blur-xs rounded-2xl border border-[#E6E4DC] dark:border-[#2E2C29] shadow-xs">
                <p className="text-xs font-bold uppercase tracking-wider text-[#171614] dark:text-[#F8F7F4]">{t('qc_sessions_title')}</p>
                <p className="text-xs text-[#78716C] dark:text-[#A8A29E] mt-1">{t('qc_sessions_desc')}</p>
              </div>
              <div className="p-4 bg-white/90 dark:bg-[#1E1C1A]/90 backdrop-blur-xs rounded-2xl border border-[#E6E4DC] dark:border-[#2E2C29] shadow-xs">
                <p className="text-xs font-bold uppercase tracking-wider text-[#171614] dark:text-[#F8F7F4]">{t('qc_seminars_title')}</p>
                <p className="text-xs text-[#78716C] dark:text-[#A8A29E] mt-1">{t('qc_seminars_desc')}</p>
              </div>
            </div>
          </div>

        </div>

      </div>
    </section>
  );
};
