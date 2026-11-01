import React, { createContext, useContext, useState, ReactNode } from 'react';

export type Language = 'tr' | 'en';

interface Translations {
  [key: string]: {
    tr: string;
    en: string;
  };
}

export const TRANSLATIONS: Translations = {
  // Navigation
  nav_about: { tr: 'Yumeiho Nedir', en: 'About Yumeiho' },
  nav_modules: { tr: 'Terapötik Modüller', en: 'Therapy Modules' },
  nav_academy: { tr: 'Eğitim Platformu', en: 'Academy' },
  nav_kata: { tr: '100 Kata', en: '100 Kata' },
  nav_contact: { tr: 'Takvim & İletişim', en: 'Events & Contact' },
  nav_book_btn: { tr: 'Randevu & Kayıt', en: 'Book & Apply' },
  nav_brand: { tr: 'Yumeiho Türkiye', en: 'Yumeiho Turkey' },

  // Hero
  hero_tagline: { tr: 'Japon Manuel Terapi Ekolü', en: 'Japanese Manual Therapy Lineage' },
  hero_rep_title: { tr: 'Türkiye Resmi Temsilciliği', en: 'Official Turkey Representation' },
  hero_h1_main: { tr: 'Bedenin Ağırlık Merkezi,', en: 'Center of Gravity, Source of' },
  hero_h1_italic: { tr: 'Yaşamın ve Dinginliğin Kaynağı:', en: 'Vitality & Equilibrium:' },
  hero_h1_sub: { tr: 'Japon Yumeiho Terapisi & Akademisi', en: 'Japanese Yumeiho Therapy & Academy' },
  hero_p: {
    tr: 'Türkiye Temsilcisi Ali Gökmen Düzgün rehberliğinde; pelvis düzeltici derin biyomekanik seanslar, anksiyete-stres somatik çözümleri ve uluslararası akredite 1-5. Dan sertifika müfredatı.',
    en: 'Led by Turkey Representative Ali Gökmen Düzgün: Pelvic alignment biomechanical therapy, somatic stress & anxiety relief protocols, and internationally accredited 1st to 5th Dan certification courses.'
  },
  hero_point_1: { tr: 'Pelvis (leğen kemiği) simetrisi & bacak boyu eşitleme', en: 'Pelvic symmetry & functional leg length equalization' },
  hero_point_2: { tr: '100 Temel Kata ile omurga fıtık ve skolyoz dekompresyonu', en: '100 Basic Katas for disc decompression & scoliosis correction' },
  hero_point_3: { tr: 'Anksiyete yönetimi ve otonom sinir sistemi regülasyonu', en: 'Anxiety regulation & autonomic nervous system balance' },
  hero_point_4: { tr: 'Uluslararası Federasyon onaylı Dan diplomalandırma', en: 'International Yumeiho Centre certified Dan degrees' },
  hero_cta_therapy: { tr: 'Terapi Seansı Randevusu Al', en: 'Book Therapy Session' },
  hero_cta_seminar: { tr: 'Eğitim Seminerine Katıl', en: 'Join Training Seminar' },
  hero_cta_test: { tr: 'Postür Simülatörünü İncele', en: 'Explore Posture Simulator' },

  // Trust Strip
  trust_years: { tr: '18+ Yıllık Klinik Tecrübe', en: '18+ Years Clinical Experience' },
  trust_accreditation: { tr: 'Uluslararası Merkez Akreditasyonu', en: 'International Centre Accreditation' },
  trust_graduates: { tr: '1.000+ Mezun Terapist', en: '1,000+ Certified Graduates' },

  // Quick card labels
  qc_sessions_title: { tr: 'Klinik Seanslar', en: 'Clinical Sessions' },
  qc_sessions_desc: { tr: 'Kişiye özel 50-60 dk Yumeiho seansı', en: 'Tailored 50-60 min Yumeiho session' },
  qc_seminars_title: { tr: '1-5. Dan Seminerleri', en: '1st-5th Dan Seminars' },
  qc_seminars_desc: { tr: 'Uluslararası kütükte kayıtlı uygulayıcı ol', en: 'Become an accredited certified practitioner' }
};

interface LanguageContextType {
  language: Language;
  setLanguage: (lang: Language) => void;
  toggleLanguage: () => void;
  t: (key: string) => string;
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export const LanguageProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [language, setLanguage] = useState<Language>('tr');

  const toggleLanguage = () => {
    setLanguage(prev => (prev === 'tr' ? 'en' : 'tr'));
  };

  const t = (key: string): string => {
    if (TRANSLATIONS[key]) {
      return TRANSLATIONS[key][language];
    }
    return key;
  };

  return (
    <LanguageContext.Provider value={{ language, setLanguage, toggleLanguage, t }}>
      {children}
    </LanguageContext.Provider>
  );
};

export const useLanguage = () => {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
};
