import React, { useState } from 'react';
import { Menu, X, Volume2, VolumeX, Globe, Moon, Sun } from 'lucide-react';
import { zenAudio } from '../utils/audioZen';
import { useLanguage } from '../context/LanguageContext';
import { useTheme } from '../context/ThemeContext';

interface NavbarProps {
  onOpenBooking: (initialTab?: 'therapy' | 'seminar') => void;
}

export const Navbar: React.FC<NavbarProps> = ({ onOpenBooking }) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [isMuted, setIsMuted] = useState(zenAudio.isMuted);
  const { language, setLanguage, toggleLanguage, t } = useLanguage();
  const { theme, toggleTheme, isDark } = useTheme();

  const toggleSound = () => {
    const muted = zenAudio.toggleMute();
    setIsMuted(muted);
  };

  return (
    <header className="sticky top-0 z-40 bg-[#F8F7F4]/95 dark:bg-[#121110]/95 backdrop-blur-md border-b border-[#E6E4DC] dark:border-[#2E2C29] transition-colors duration-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between gap-6 sm:gap-8 h-20">
          
          {/* Zone 1: Single text element wordmark with Japanese inkan seal */}
          <a href="#" className="flex items-center gap-2.5 sm:gap-3 whitespace-nowrap shrink-0 group">
            <span className="inline-flex items-center justify-center border border-[#8B261E] dark:border-[#C49B66] text-[#8B261E] dark:text-[#C49B66] px-1.5 py-0.5 text-xs font-serif font-bold tracking-widest bg-[#8B261E]/5 dark:bg-[#C49B66]/10 rounded-sm">
              湧命法
            </span>
            <span className="font-serif-luxury font-bold text-xl sm:text-2xl tracking-tight text-[#171614] dark:text-[#F8F7F4] group-hover:text-[#8B261E] dark:group-hover:text-[#C49B66] transition-colors">
              {t('nav_brand')}
            </span>
          </a>

          {/* Zone 2: 5 clean nav links, single-line */}
          <nav className="hidden lg:flex items-center gap-6 xl:gap-7 text-xs uppercase tracking-widest font-semibold text-[#57534E] dark:text-[#A8A29E]">
            <a 
              href="#pelvis-felsefesi" 
              className="hover:text-[#171614] dark:hover:text-white hover:underline underline-offset-8 transition-colors whitespace-nowrap shrink-0"
            >
              {t('nav_about')}
            </a>
            <a 
              href="#terapotik-moduller" 
              className="hover:text-[#171614] dark:hover:text-white hover:underline underline-offset-8 transition-colors whitespace-nowrap shrink-0"
            >
              {t('nav_modules')}
            </a>
            <a 
              href="#egitim-platformu" 
              className="hover:text-[#171614] dark:hover:text-white hover:underline underline-offset-8 transition-colors whitespace-nowrap shrink-0"
            >
              {t('nav_academy')}
            </a>
            <a 
              href="#100-kata" 
              className="hover:text-[#171614] dark:hover:text-white hover:underline underline-offset-8 transition-colors whitespace-nowrap shrink-0"
            >
              {t('nav_kata')}
            </a>
            <a 
              href="#iletisim-etkinlikler" 
              className="hover:text-[#171614] dark:hover:text-white hover:underline underline-offset-8 transition-colors whitespace-nowrap shrink-0"
            >
              {t('nav_contact')}
            </a>
          </nav>

          {/* Zone 3: 1 primary action + Theme Switcher + Language Switcher + Sound Experience Toggle */}
          <div className="flex items-center gap-2 sm:gap-3 shrink-0">
            
            {/* Global Theme Switcher Button */}
            <button
              type="button"
              onClick={toggleTheme}
              className={`inline-flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg border transition-all text-xs font-mono font-bold tracking-wider whitespace-nowrap ${
                isDark
                  ? 'border-[#C49B66] bg-[#1E1C1A] text-[#C49B66] hover:bg-[#2E2C29]'
                  : 'border-[#D8D6D0] bg-white text-[#171614] hover:border-[#171614] hover:text-[#8B261E]'
              }`}
              title={isDark ? 'Switch to Washi Light Theme' : "Zen Gece Karanlık Temaya Geç"}
              aria-label="Tema değiştir / Toggle theme"
            >
              {isDark ? (
                <>
                  <Sun className="w-3.5 h-3.5 text-[#C49B66]" />
                  <span>WASHI</span>
                </>
              ) : (
                <>
                  <Moon className="w-3.5 h-3.5 text-[#171614]" />
                  <span>ZEN NIGHT</span>
                </>
              )}
            </button>

            {/* Language Switcher 3-Way Control */}
            <div className="inline-flex items-center p-0.5 rounded-lg border border-[#D8D6D0] dark:border-[#3D3A35] bg-white dark:bg-[#1E1C1A] shadow-2xs">
              {(['tr', 'jp', 'en'] as const).map((lang) => (
                <button
                  key={lang}
                  type="button"
                  onClick={() => setLanguage(lang)}
                  className={`px-2 py-1 text-[11px] font-mono font-bold tracking-wider rounded-md transition-all ${
                    language === lang
                      ? 'bg-[#171614] dark:bg-[#C49B66] text-white dark:text-[#171614] shadow-xs'
                      : 'text-[#78716C] dark:text-[#A8A29E] hover:text-[#171614] dark:hover:text-white'
                  }`}
                  title={lang === 'tr' ? 'Türkçe' : lang === 'jp' ? '日本語 (Japanese)' : 'English'}
                >
                  {lang === 'tr' ? 'TR' : lang === 'jp' ? 'JP' : 'EN'}
                </button>
              ))}
            </div>

            {/* Sound Toggle */}
            <button
              type="button"
              onClick={toggleSound}
              className={`p-2 rounded-full border transition-colors ${
                !isMuted 
                  ? 'border-[#8B261E] dark:border-[#C49B66] text-[#8B261E] dark:text-[#C49B66] bg-[#8B261E]/5 dark:bg-[#C49B66]/10' 
                  : 'border-[#D8D6D0] dark:border-[#3D3A35] text-[#78716C] dark:text-[#A8A29E] hover:text-[#171614] dark:hover:text-white'
              }`}
              title={!isMuted ? 'Zen Kase Sesi Açık (Kapatmak için tıklayın)' : 'Zen Ambiyansını Aç (432Hz Kase Çanı)'}
              aria-label="Zen sesini aç/kapat"
            >
              {!isMuted ? <Volume2 className="w-4 h-4" /> : <VolumeX className="w-4 h-4" />}
            </button>

            {/* Primary Action Button */}
            <button
              onClick={() => onOpenBooking('therapy')}
              className="hidden sm:inline-flex items-center justify-center px-4 sm:px-5 py-2.5 text-xs font-semibold tracking-wider uppercase text-white bg-[#171614] dark:bg-[#C49B66] dark:text-[#171614] rounded-lg hover:bg-[#8B261E] dark:hover:bg-[#D4AF37] transition-all shadow-xs whitespace-nowrap shrink-0"
            >
              {t('nav_book_btn')}
            </button>

            {/* Mobile menu toggle */}
            <button
              type="button"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="lg:hidden p-2 text-[#57534E] dark:text-[#A8A29E] hover:text-[#171614] dark:hover:text-white focus:outline-none"
              aria-label="Menüyü aç"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>

        </div>
      </div>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="lg:hidden bg-[#F8F7F4] dark:bg-[#171614] border-b border-[#E6E4DC] dark:border-[#2E2C29] px-4 pt-3 pb-6 space-y-3">
          <nav className="flex flex-col space-y-2 text-sm font-medium text-[#44403C] dark:text-[#D6D3D1]">
            <a
              href="#pelvis-felsefesi"
              onClick={() => setMobileMenuOpen(false)}
              className="px-3 py-2 rounded-md hover:bg-[#EAE8E1] dark:hover:bg-[#262422] transition-colors"
            >
              {language === 'jp' ? '湧命法と骨盤理論' : language === 'tr' ? 'Yumeiho Nedir & Pelvis Kuramı' : 'About Yumeiho & Pelvic Theory'}
            </a>
            <a
              href="#tarihce"
              onClick={() => setMobileMenuOpen(false)}
              className="px-3 py-2 rounded-md hover:bg-[#EAE8E1] dark:hover:bg-[#262422] transition-colors"
            >
              {language === 'jp' ? '歴史と連盟の歩み' : language === 'tr' ? 'Tarihçe & Federasyon Yolculuğu' : 'History & Federation Timeline'}
            </a>
            <a
              href="#terapotik-moduller"
              onClick={() => setMobileMenuOpen(false)}
              className="px-3 py-2 rounded-md hover:bg-[#EAE8E1] dark:hover:bg-[#262422] transition-colors"
            >
              {language === 'jp' ? '療法モジュール (不安・ストレス・姿勢)' : language === 'tr' ? 'Terapötik Modüller (Anksiyete, Stres, Özgüven)' : 'Therapeutic Modules (Anxiety, Stress, Posture)'}
            </a>
            <a
              href="#egitim-platformu"
              onClick={() => setMobileMenuOpen(false)}
              className="px-3 py-2 rounded-md hover:bg-[#EAE8E1] dark:hover:bg-[#262422] transition-colors"
            >
              {language === 'jp' ? 'アカデミー講座 (1-4レベル & 呼吸法ガイド)' : language === 'tr' ? 'Eğitim Platformu (1-4 Seviye & Canlı Nefes Rehberi)' : 'Academy (Levels 1-4 & Live Breathing)'}
            </a>
            <a
              href="#terapi-seanslari"
              onClick={() => setMobileMenuOpen(false)}
              className="px-3 py-2 rounded-md hover:bg-[#EAE8E1] dark:hover:bg-[#262422] transition-colors"
            >
              {language === 'jp' ? '臨床施術セッション' : language === 'tr' ? 'Klinik Terapi Seansları' : 'Clinical Therapy Sessions'}
            </a>
            <a
              href="#egitim-akademisi"
              onClick={() => setMobileMenuOpen(false)}
              className="px-3 py-2 rounded-md hover:bg-[#EAE8E1] dark:hover:bg-[#262422] transition-colors"
            >
              {language === 'jp' ? 'Dan段位 (初段〜五段) & 資格証明照会' : language === 'tr' ? 'Dan Dereceleri (1-5. Dan) & Sertifika Doğrulama' : 'Dan Degrees & Certificate Verification'}
            </a>
            <a
              href="#100-kata"
              onClick={() => setMobileMenuOpen(false)}
              className="px-3 py-2 rounded-md hover:bg-[#EAE8E1] dark:hover:bg-[#262422] transition-colors"
            >
              {language === 'jp' ? '100の基本手技 (百型) 探訪' : language === 'tr' ? '100 Kata Tekniği Rehberi' : '100 Kata Technique Explorer'}
            </a>
            <a
              href="#temsilcimiz"
              onClick={() => setMobileMenuOpen(false)}
              className="px-3 py-2 rounded-md hover:bg-[#EAE8E1] dark:hover:bg-[#262422] transition-colors"
            >
              {language === 'jp' ? 'Ali Gökmen Düzgün について' : language === 'tr' ? 'Ali Gökmen Düzgün Kimdir' : 'About Ali Gökmen Düzgün'}
            </a>
            <a
              href="#iletisim-etkinlikler"
              onClick={() => setMobileMenuOpen(false)}
              className="px-3 py-2 rounded-md hover:bg-[#EAE8E1] dark:hover:bg-[#262422] transition-colors"
            >
              {language === 'jp' ? '日程カレンダー & お問い合わせ' : language === 'tr' ? 'Etkinlik Takvimi & İletişim' : 'Events Calendar & Contact'}
            </a>
          </nav>

          <div className="pt-2 border-t border-[#E6E4DC] dark:border-[#2E2C29] flex flex-col gap-2">
            <div className="flex items-center justify-between py-1 px-3 bg-white dark:bg-[#1E1C1A] rounded-lg border border-[#E6E4DC] dark:border-[#2E2C29]">
              <span className="text-xs text-stone-600 dark:text-[#A8A29E] font-medium">Tema / Theme:</span>
              <button
                type="button"
                onClick={toggleTheme}
                className="px-3 py-1 text-xs font-mono font-bold bg-[#171614] dark:bg-[#C49B66] text-white dark:text-[#171614] rounded-md"
              >
                {isDark ? 'Washi Light' : 'Zen Night'}
              </button>
            </div>

            <div className="flex items-center justify-between py-1 px-3 bg-white dark:bg-[#1E1C1A] rounded-lg border border-[#E6E4DC] dark:border-[#2E2C29]">
              <span className="text-xs text-stone-600 dark:text-[#A8A29E] font-medium">Dil / 言語 / Language:</span>
              <div className="flex items-center gap-1">
                {(['tr', 'jp', 'en'] as const).map((lang) => (
                  <button
                    key={lang}
                    type="button"
                    onClick={() => setLanguage(lang)}
                    className={`px-2 py-1 text-xs font-mono font-bold rounded-md transition-colors ${
                      language === lang
                        ? 'bg-[#171614] dark:bg-[#C49B66] text-white dark:text-[#171614]'
                        : 'bg-[#EAE8E1] dark:bg-[#262422] text-[#57534E] dark:text-[#A8A29E]'
                    }`}
                  >
                    {lang === 'tr' ? 'TR' : lang === 'jp' ? 'JP' : 'EN'}
                  </button>
                ))}
              </div>
            </div>

            <button
              onClick={() => {
                setMobileMenuOpen(false);
                onOpenBooking('therapy');
              }}
              className="w-full py-2.5 px-4 text-center text-xs uppercase tracking-wider font-semibold text-white bg-[#171614] dark:bg-[#C49B66] dark:text-[#171614] rounded-lg hover:bg-[#8B261E] dark:hover:bg-[#D4AF37]"
            >
              {language === 'jp' ? '施術セッション予約' : language === 'tr' ? 'Terapi Seansı Randevusu' : 'Book Therapy Session'}
            </button>
          </div>
        </div>
      )}
    </header>
  );
};


