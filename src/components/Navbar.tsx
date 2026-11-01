import React, { useState } from 'react';
import { Menu, X, Volume2, VolumeX, Globe } from 'lucide-react';
import { zenAudio } from '../utils/audioZen';
import { useLanguage } from '../context/LanguageContext';

interface NavbarProps {
  onOpenBooking: (initialTab?: 'therapy' | 'seminar') => void;
}

export const Navbar: React.FC<NavbarProps> = ({ onOpenBooking }) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [isMuted, setIsMuted] = useState(zenAudio.isMuted);
  const { language, toggleLanguage, t } = useLanguage();

  const toggleSound = () => {
    const muted = zenAudio.toggleMute();
    setIsMuted(muted);
  };

  return (
    <header className="sticky top-0 z-40 bg-[#F8F7F4]/95 backdrop-blur-md border-b border-[#E6E4DC]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between gap-6 sm:gap-8 h-20">
          
          {/* Zone 1: Single text element wordmark with Japanese inkan seal */}
          <a href="#" className="flex items-center gap-2.5 sm:gap-3 whitespace-nowrap shrink-0 group">
            <span className="inline-flex items-center justify-center border border-[#8B261E] text-[#8B261E] px-1.5 py-0.5 text-xs font-serif font-bold tracking-widest bg-[#8B261E]/5 rounded-sm">
              湧命法
            </span>
            <span className="font-serif-luxury font-bold text-xl sm:text-2xl tracking-tight text-[#171614] group-hover:text-[#8B261E] transition-colors">
              {t('nav_brand')}
            </span>
          </a>

          {/* Zone 2: 5 clean nav links, single-line */}
          <nav className="hidden lg:flex items-center gap-6 xl:gap-7 text-xs uppercase tracking-widest font-semibold text-[#57534E]">
            <a 
              href="#pelvis-felsefesi" 
              className="hover:text-[#171614] hover:underline underline-offset-8 transition-colors whitespace-nowrap shrink-0"
            >
              {t('nav_about')}
            </a>
            <a 
              href="#terapotik-moduller" 
              className="hover:text-[#171614] hover:underline underline-offset-8 transition-colors whitespace-nowrap shrink-0"
            >
              {t('nav_modules')}
            </a>
            <a 
              href="#egitim-platformu" 
              className="hover:text-[#171614] hover:underline underline-offset-8 transition-colors whitespace-nowrap shrink-0"
            >
              {t('nav_academy')}
            </a>
            <a 
              href="#100-kata" 
              className="hover:text-[#171614] hover:underline underline-offset-8 transition-colors whitespace-nowrap shrink-0"
            >
              {t('nav_kata')}
            </a>
            <a 
              href="#iletisim-etkinlikler" 
              className="hover:text-[#171614] hover:underline underline-offset-8 transition-colors whitespace-nowrap shrink-0"
            >
              {t('nav_contact')}
            </a>
          </nav>

          {/* Zone 3: 1 primary action + Language Switcher + Sound Experience Toggle */}
          <div className="flex items-center gap-2 sm:gap-3 shrink-0">
            
            {/* Language Switcher Button */}
            <button
              type="button"
              onClick={toggleLanguage}
              className="inline-flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg border border-[#D8D6D0] hover:border-[#171614] bg-white text-xs font-mono font-bold tracking-wider text-[#171614] hover:text-[#8B261E] transition-colors shadow-2xs whitespace-nowrap"
              title={language === 'tr' ? "Switch to English" : "Türkçe diline geç"}
              aria-label="Dili değiştir / Switch language"
            >
              <Globe className="w-3.5 h-3.5 text-[#8B261E]" />
              <span>{language === 'tr' ? 'EN' : 'TR'}</span>
            </button>

            {/* Sound Toggle */}
            <button
              type="button"
              onClick={toggleSound}
              className={`p-2 rounded-full border transition-colors ${
                !isMuted 
                  ? 'border-[#8B261E] text-[#8B261E] bg-[#8B261E]/5' 
                  : 'border-[#D8D6D0] text-[#78716C] hover:text-[#171614]'
              }`}
              title={!isMuted ? 'Zen Kase Sesi Açık (Kapatmak için tıklayın)' : 'Zen Ambiyansını Aç (432Hz Kase Çanı)'}
              aria-label="Zen sesini aç/kapat"
            >
              {!isMuted ? <Volume2 className="w-4 h-4" /> : <VolumeX className="w-4 h-4" />}
            </button>

            {/* Primary Action Button */}
            <button
              onClick={() => onOpenBooking('therapy')}
              className="hidden sm:inline-flex items-center justify-center px-4 sm:px-5 py-2.5 text-xs font-semibold tracking-wider uppercase text-white bg-[#171614] rounded-lg hover:bg-[#8B261E] transition-all shadow-xs whitespace-nowrap shrink-0"
            >
              {t('nav_book_btn')}
            </button>

            {/* Mobile menu toggle */}
            <button
              type="button"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="lg:hidden p-2 text-[#57534E] hover:text-[#171614] focus:outline-none"
              aria-label="Menüyü aç"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>

        </div>
      </div>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="lg:hidden bg-[#F8F7F4] border-b border-[#E6E4DC] px-4 pt-3 pb-6 space-y-3">
          <nav className="flex flex-col space-y-2 text-sm font-medium text-[#44403C]">
            <a
              href="#pelvis-felsefesi"
              onClick={() => setMobileMenuOpen(false)}
              className="px-3 py-2 rounded-md hover:bg-[#EAE8E1] transition-colors"
            >
              {language === 'tr' ? 'Yumeiho Nedir & Pelvis Kuramı' : 'About Yumeiho & Pelvic Theory'}
            </a>
            <a
              href="#tarihce"
              onClick={() => setMobileMenuOpen(false)}
              className="px-3 py-2 rounded-md hover:bg-[#EAE8E1] transition-colors"
            >
              {language === 'tr' ? 'Tarihçe & Federasyon Yolculuğu' : 'History & Federation Timeline'}
            </a>
            <a
              href="#terapotik-moduller"
              onClick={() => setMobileMenuOpen(false)}
              className="px-3 py-2 rounded-md hover:bg-[#EAE8E1] transition-colors"
            >
              {language === 'tr' ? 'Terapötik Modüller (Anksiyete, Stres, Özgüven)' : 'Therapeutic Modules (Anxiety, Stress, Posture)'}
            </a>
            <a
              href="#egitim-platformu"
              onClick={() => setMobileMenuOpen(false)}
              className="px-3 py-2 rounded-md hover:bg-[#EAE8E1] transition-colors"
            >
              {language === 'tr' ? 'Eğitim Platformu (1-4 Seviye & Canlı Nefes Rehberi)' : 'Academy (Levels 1-4 & Live Breathing)'}
            </a>
            <a
              href="#terapi-seanslari"
              onClick={() => setMobileMenuOpen(false)}
              className="px-3 py-2 rounded-md hover:bg-[#EAE8E1] transition-colors"
            >
              {language === 'tr' ? 'Klinik Terapi Seansları' : 'Clinical Therapy Sessions'}
            </a>
            <a
              href="#egitim-akademisi"
              onClick={() => setMobileMenuOpen(false)}
              className="px-3 py-2 rounded-md hover:bg-[#EAE8E1] transition-colors"
            >
              {language === 'tr' ? 'Dan Dereceleri (1-5. Dan) & Sertifika Doğrulama' : 'Dan Degrees & Certificate Verification'}
            </a>
            <a
              href="#100-kata"
              onClick={() => setMobileMenuOpen(false)}
              className="px-3 py-2 rounded-md hover:bg-[#EAE8E1] transition-colors"
            >
              {language === 'tr' ? '100 Kata Tekniği Rehberi' : '100 Kata Technique Explorer'}
            </a>
            <a
              href="#temsilcimiz"
              onClick={() => setMobileMenuOpen(false)}
              className="px-3 py-2 rounded-md hover:bg-[#EAE8E1] transition-colors"
            >
              {language === 'tr' ? 'Ali Gökmen Düzgün Kimdir' : 'About Ali Gökmen Düzgün'}
            </a>
            <a
              href="#iletisim-etkinlikler"
              onClick={() => setMobileMenuOpen(false)}
              className="px-3 py-2 rounded-md hover:bg-[#EAE8E1] transition-colors"
            >
              {language === 'tr' ? 'Etkinlik Takvimi & İletişim' : 'Events Calendar & Contact'}
            </a>
          </nav>

          <div className="pt-2 border-t border-[#E6E4DC] flex flex-col gap-2">
            <div className="flex items-center justify-between py-1 px-3 bg-white rounded-lg border border-[#E6E4DC]">
              <span className="text-xs text-stone-600 font-medium">Dil / Language:</span>
              <button
                type="button"
                onClick={toggleLanguage}
                className="px-3 py-1 text-xs font-mono font-bold bg-[#171614] text-white rounded-md"
              >
                {language === 'tr' ? 'Switch to English' : "Türkçe'ye Geç"}
              </button>
            </div>

            <button
              onClick={() => {
                setMobileMenuOpen(false);
                onOpenBooking('therapy');
              }}
              className="w-full py-2.5 px-4 text-center text-xs uppercase tracking-wider font-semibold text-white bg-[#171614] rounded-lg hover:bg-[#8B261E]"
            >
              {language === 'tr' ? 'Terapi Seansı Randevusu' : 'Book Therapy Session'}
            </button>
            <button
              onClick={() => {
                setMobileMenuOpen(false);
                onOpenBooking('seminar');
              }}
              className="w-full py-2.5 px-4 text-center text-xs uppercase tracking-wider font-semibold text-[#171614] bg-[#EAE8E1] rounded-lg hover:bg-[#DCD8CF]"
            >
              {language === 'tr' ? 'Eğitim Seminerine Başvur' : 'Apply for Training Course'}
            </button>
          </div>
        </div>
      )}
    </header>
  );
};
