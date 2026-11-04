import React, { createContext, useContext, useState, ReactNode } from 'react';

export type Language = 'tr' | 'jp' | 'en';

interface Translations {
  [key: string]: {
    tr: string;
    jp: string;
    en: string;
  };
}

export const TRANSLATIONS: Translations = {
  // Navigation
  nav_about: { tr: 'Yumeiho Nedir', jp: '湧命法について', en: 'About Yumeiho' },
  nav_modules: { tr: 'Terapötik Modüller', jp: '療法モジュール', en: 'Therapy Modules' },
  nav_academy: { tr: 'Eğitim Platformu', jp: 'アカデミー講座', en: 'Academy' },
  nav_kata: { tr: '100 Kata', jp: '100の基本手技 (百型)', en: '100 Kata' },
  nav_contact: { tr: 'Takvim & İletişim', jp: '日程・お問い合わせ', en: 'Events & Contact' },
  nav_book_btn: { tr: 'Randevu & Kayıt', jp: '施術予約・受講申込', en: 'Book & Apply' },
  nav_brand: { tr: 'Yumeiho Türkiye', jp: '湧命法 トルコ支部', en: 'Yumeiho Turkey' },

  // Hero
  hero_tagline: { tr: 'Japon Manuel Terapi Ekolü', jp: '日本伝統骨盤矯正圧圧整体法', en: 'Japanese Manual Therapy Lineage' },
  hero_rep_title: { tr: 'Türkiye Resmi Temsilciliği', jp: 'トルco (トルコ) 公式代表部', en: 'Official Turkey Representation' },
  hero_h1_main: { tr: 'Bedenin Ağırlık Merkezi,', jp: '身体の重心と、', en: 'Center of Gravity, Source of' },
  hero_h1_italic: { tr: 'Yaşamın ve Dinginliğin Kaynağı:', jp: '生命と静寂の源泉：', en: 'Vitality & Equilibrium:' },
  hero_h1_sub: { tr: 'Japon Yumeiho Terapisi & Akademisi', jp: '日本伝統 湧命法療法＆国際アカデミー', en: 'Japanese Yumeiho Therapy & Academy' },
  hero_p: {
    tr: 'Türkiye Temsilcisi Ali Gökmen Düzgün rehberliğinde; pelvis düzeltici derin biyomekanik seanslar, anksiyete-stres somatik çözümleri ve uluslararası akredite 1-5. Dan sertifika müfredatı.',
    jp: 'トルコ公式代表 Ali Gökmen Düzgün の指導のもと、骨盤変位矯正（骨盤矯正圧圧整体法）、自律神経・心身調整、および国際認定初段〜五段ライセンス取得講座を提供しています。',
    en: 'Led by Turkey Representative Ali Gökmen Düzgün: Pelvic alignment biomechanical therapy, somatic stress & anxiety relief protocols, and internationally accredited 1st to 5th Dan certification courses.'
  },
  hero_point_1: { tr: 'Pelvis (leğen kemiği) simetrisi & bacak boyu eşitleme', jp: '骨盤変位矯正＆脚長差（脚の長さの不均衡）の根本的調整', en: 'Pelvic symmetry & functional leg length equalization' },
  hero_point_2: { tr: '100 Temel Kata ile omurga fıtık ve skolyoz dekompresyonu', jp: '100の基本手技（百型）による椎間板減圧・Skolyoz姿勢矯正', en: '100 Basic Katas for disc decompression & scoliosis correction' },
  hero_point_3: { tr: 'Anksiyete yönetimi ve otonom sinir sistemi regülasyonu', jp: '自律神経（迷走神経）調整と不安・ストレスの somatik 体感解放', en: 'Anxiety regulation & autonomic nervous system balance' },
  hero_point_4: { tr: 'Uluslararası Federasyon onaylı Dan diplomalandırma', jp: '国際湧命法センター（Yumeiho Centre）公認 Dan 段位資格発行', en: 'International Yumeiho Centre certified Dan degrees' },
  hero_cta_therapy: { tr: 'Terapi Seansı Randevusu Al', jp: '施術セッションを予約', en: 'Book Therapy Session' },
  hero_cta_seminar: { tr: 'Eğitim Seminerine Katıl', jp: '認定セミナーに参加', en: 'Join Training Seminar' },
  hero_cta_test: { tr: 'Postür Simülatörünü İncele', jp: '姿勢シミュレーターを体験', en: 'Explore Posture Simulator' },

  // Trust Strip
  trust_years: { tr: '18+ Yıllık Klinik Tecrübe', jp: '18年以上の臨床実績', en: '18+ Years Clinical Experience' },
  trust_accreditation: { tr: 'Uluslararası Merkez Akreditasyonu', jp: '国際本部（日本）正式認可', en: 'International Centre Accreditation' },
  trust_graduates: { tr: '1.000+ Mezun Terapist', jp: '1,000名以上の認定セラピスト', en: '1,000+ Certified Graduates' },

  // Quick card labels
  qc_sessions_title: { tr: 'Klinik Seanslar', jp: '臨床施術セッション', en: 'Clinical Sessions' },
  qc_sessions_desc: { tr: 'Kişiye özel 50-60 dk Yumeiho seansı', jp: 'オーダーメイド 50〜60分 湧命法施術', en: 'Tailored 50-60 min Yumeiho session' },
  qc_seminars_title: { tr: '1-5. Dan Seminerleri', jp: '初段〜五段 認定講習', en: '1st-5th Dan Seminars' },
  qc_seminars_desc: { tr: 'Uluslararası kütükte kayıtlı uygulayıcı ol', jp: '国際公認セラピスト資格の取得', en: 'Become an accredited certified practitioner' }
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
    setLanguage(prev => (prev === 'tr' ? 'jp' : prev === 'jp' ? 'en' : 'tr'));
  };

  const t = (key: string): string => {
    if (TRANSLATIONS[key]) {
      return TRANSLATIONS[key][language] || TRANSLATIONS[key]['en'];
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

