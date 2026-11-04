import { useEffect, useRef, useState } from 'react';
import { useLanguage } from '../context/LanguageContext';

export interface SeoMetaData {
  title: string;
  description: string;
  canonicalUrl?: string;
  keywords?: string[];
  ogType?: string;
}

export interface SectionSeoConfig {
  id: string;
  tr: SeoMetaData;
  jp: SeoMetaData;
  en: SeoMetaData;
}

export const SEO_SECTIONS: Record<string, SectionSeoConfig> = {
  hero: {
    id: 'hero',
    tr: {
      title: 'Yumeiho Türkiye | Resmi Japon Manuel Terapi & Pelvis Akademisi',
      description: 'Yumeiho Federasyonu Türkiye Temsilcisi Ali Gökmen Düzgün önderliğinde leğen kemiği düzeltici terapi seansları ve uluslararası akredite Dan eğitimleri.',
      keywords: ['Yumeiho Türkiye', 'Japon Terapi', 'Pelvis Düzeltme', 'Ali Gökmen Düzgün', 'Skolyoz Terapi', 'Manuel Terapi']
    },
    jp: {
      title: '湧命法 トルコ支部 | 日本伝統骨盤矯正圧圧整体法＆国際アカデミー',
      description: 'トルコ公式代表 Ali Gökmen Düzgün 指導のもと、骨盤変位矯正（骨盤矯正圧圧整体法）施術セッションおよび国際認定初段〜五段ライセンス取得講習を提供。',
      keywords: ['湧命法', 'Yumeiho', '骨盤変位矯正', '整体', ' Ali Gökmen Düzgün', 'トルコ', '100の基本手技']
    },
    en: {
      title: 'Yumeiho Turkey | Official Japanese Manual Therapy & Academy',
      description: 'Official Yumeiho pelvic alignment therapy sessions and internationally accredited Dan certification courses led by Turkey Representative Ali Gökmen Düzgün.',
      keywords: ['Yumeiho Turkey', 'Japanese Therapy', 'Pelvic Alignment', 'Ali Gokmen Duzgun', 'Scoliosis Therapy', 'Manual Therapy']
    }
  },
  'pelvis-felsefesi': {
    id: 'pelvis-felsefesi',
    tr: {
      title: 'Pelvis Teoremi & Omurga Biyomekaniği | Yumeiho Türkiye',
      description: 'İnsan vücudunun kütle merkezi ve sakroiliyak simetrisi. Omurga fıtığı, skolyoz ve bacak boyu farkı düzeltiminde Saionji Masayuki pelvis teorisi.',
      keywords: ['Pelvis Teoremi', 'Sakroiliyak Eklem', 'Bacak Boyu Farkı', 'Omurga Biyomekaniği', 'Saionji Masayuki']
    },
    jp: {
      title: '骨盤理論・脊柱バイオメカニクス | 湧命法 トルコ支部',
      description: '身体の重心と仙腸関節の左右対称性。椎間板ヘルニア・側弯症・脚長差を改善する西園寺雅幸先生の骨盤変位理論。',
      keywords: ['骨盤理論', '仙腸関節', '脚長差', '脊柱バイオメカニクス', '西園寺雅幸']
    },
    en: {
      title: 'Pelvic Theory & Spinal Biomechanics | Yumeiho Turkey',
      description: 'Human center of gravity & sacroiliac joint symmetry. Yumeiho pelvic theory by Saionji Masayuki for disc herniation and leg length discrepancy.',
      keywords: ['Pelvic Theory', 'Sacroiliac Joint', 'Leg Length Discrepancy', 'Spinal Biomechanics']
    }
  },
  'somatic-breathing': {
    id: 'somatic-breathing',
    tr: {
      title: '432Hz / 528Hz Somatik Zen Nefesi & Otonom Regülasyon | Yumeiho',
      description: 'Vagus siniri uyarımı, psoas kası gevşemesi ve sempatik stresi nötrlemek için tasarlanmış 432Hz/528Hz harmonik somatik nefes görselleştirici.',
      keywords: ['Somatik Nefes', '432Hz Ses', '528Hz Harmonik', 'Vagus Siniri', 'Otonom Sinir Regülasyonu']
    },
    jp: {
      title: '432Hz / 528Hz 禅 身体呼吸法・自律神経調整 | 湧命法',
      description: '迷走神経刺激・大腰筋緊張緩和・交感神経ストレス低減のために設計された432Hz/528Hzハーモニック音響視覚化ガイダンス。',
      keywords: ['禅呼吸法', '432Hz', '528Hz', '迷走神経', '自律神経調整']
    },
    en: {
      title: '432Hz / 528Hz Somatic Zen Breathing & Autonomic Balance | Yumeiho',
      description: 'Harmonic 432Hz/528Hz somatic breathing visualizer engineered for vagus nerve stimulation, psoas release, and sympathetic stress reduction.',
      keywords: ['Somatic Breathing', '432Hz Tuning', '528Hz Resonance', 'Vagus Nerve', 'Autonomic Balance']
    }
  },
  'recovery-wizard': {
    id: 'recovery-wizard',
    tr: {
      title: 'Biyomekanik Postür Analizi & Terapi Sihirbazı | Yumeiho Türkiye',
      description: 'Bel ağrısı, skolyoz ve duruş hassasiyetlerinize uygun 4 adımlı analiz ve kişiye özel Yumeiho 4 haftalık pelvik dekompresyon programı.',
      keywords: ['Postür Analizi', 'Terapi Sihirbazı', 'Bel Ağrısı Testi', 'Pelvik İyileşme Planı']
    },
    jp: {
      title: 'バイオメカニクス姿勢分析・施術診断ウィザード | 湧命法',
      description: '腰痛・側弯症・姿勢不調に対応する4ステップ診断。オーダーメイドの4週間湧命法骨盤減圧プロトコルを算出。',
      keywords: ['姿勢分析', '施術ウィザード', '腰痛診断', '骨盤回復ロードマップ']
    },
    en: {
      title: 'Biomechanical Posture Assessment & Recovery Wizard | Yumeiho',
      description: 'Calculate your personalized 4-week Yumeiho pelvic alignment and recovery roadmap for back pain, scoliosis, and posture correction.',
      keywords: ['Posture Assessment', 'Recovery Wizard', 'Back Pain Diagnostic', 'Pelvic Recovery Roadmap']
    }
  },
  '100-kata': {
    id: '100-kata',
    tr: {
      title: '100 Kata Kas & Anatomi Matrisi | Yumeiho Türkiye',
      description: 'Psoas Major, Piriformis ve Erector Spinae kas gruplarını hedefleyen 100 Yumeiho Katası ve omurga segment dekompresyon teknikleri.',
      keywords: ['100 Kata', 'Yumeiho Kataları', 'Psoas Gevşetme', 'Piriformis Manipülasyonu', 'Ashi-Atsu']
    },
    jp: {
      title: '100の基本手技（百型）筋群・解剖学マトリックス | 湧命法',
      description: '大腰筋・梨状筋・脊柱起立筋をターゲットとする100の湧命法手技（百型）と脊柱減圧技法の完全ガイド。',
      keywords: ['百型', '100の基本手技', '大腰筋弛緩', '梨状筋揉捏', '圧圧手技']
    },
    en: {
      title: '100 Kata Muscle & Spinal Anatomy Matrix | Yumeiho Turkey',
      description: 'Comprehensive guide to 100 Yumeiho Katas targeting Psoas, Piriformis, and paraspinal muscle decompression techniques.',
      keywords: ['100 Kata Matrix', 'Yumeiho Katas', 'Psoas Release', 'Piriformis Manipulation', 'Ashi-Atsu']
    }
  },
  'egitim-akademisi': {
    id: 'egitim-akademisi',
    tr: {
      title: '1-5. Dan Uluslararası Yumeiho Sertifika Eğitimleri | Türkiye',
      description: 'Uluslararası Yumeiho Federasyonu kütüğüne kayıtlı uygulayıcı ve eğitmen olma imkanı sağlayan akredite Dan kursları ve seminerleri.',
      keywords: ['Yumeiho Kursu', 'Dan Sertifikası', 'Terapi Eğitimi', 'Yumeiho Semineri', 'Uluslararası Akreditasyon']
    },
    jp: {
      title: '初段〜五段 国際湧命法公認ライセンス講習 | トルコ支部',
      description: '国際湧命法センター（日本本部）公認ディレクトリに登録されるセラピスト・指導者資格取得セミナー。',
      keywords: ['湧命法講習', 'Dan段位資格', '手技療法セミナー', '国際認可']
    },
    en: {
      title: '1st-5th Dan International Yumeiho Certification Courses | Turkey',
      description: 'Accredited 1st to 5th Dan courses providing official registration in the International Yumeiho Centre practitioner directory.',
      keywords: ['Yumeiho Course', 'Dan Certification', 'Manual Therapy Training', 'Yumeiho Seminar']
    }
  },
  'yumeiho-insights': {
    id: 'yumeiho-insights',
    tr: {
      title: 'Klinik Yumeiho Makaleleri & Skolyoz Araştırmaları | Insights',
      description: 'Pelvis sublüksasyonu, otonom sinir sistemi regülasyonu ve omurga ergonomisi üzerine yayınlanmış bilimsel klinik Yumeiho makaleleri.',
      keywords: ['Yumeiho Makaleleri', 'Klinik Biyomekanik', 'Skolyoz Araştırması', 'Vagus Siniri Çalışmaları']
    },
    jp: {
      title: '臨床湧命法 論文・側弯症バイオメカニクス研究 | 湧命法',
      description: '骨盤変位・自律神経調整・脊柱エルゴノミクスに関する公開臨床研究・学術考察論文。',
      keywords: ['湧命法論文', '臨床バイオメカニクス', '側弯症研究', '迷走神経考察']
    },
    en: {
      title: 'Clinical Yumeiho Research & Scoliosis Papers | Insights',
      description: 'Published clinical research on pelvic subluxation, autonomic nervous system modulation, and spinal ergonomics.',
      keywords: ['Yumeiho Research', 'Clinical Biomechanics', 'Scoliosis Research', 'Vagus Nerve Studies']
    }
  },
  'zen-garden': {
    id: 'zen-garden',
    tr: {
      title: 'Dijital Zen Bahçesi & Meditatif Tırmık Deneyimi | Yumeiho',
      description: 'Kum tırmıklama kalıpları, kaya yerleşimi ve 528Hz ses harmonikleri ile zihinsel dingilik sağlayan meditatif micro-interaction.',
      keywords: ['Dijital Zen Bahçesi', 'Kum Tırmıklama', '528Hz Meditasyon', 'Japon Zen Deneyimi']
    },
    jp: {
      title: 'デジタル枯山水・瞑想的砂紋体験 | 湧命法',
      description: '砂紋デザイン・景石配置および528Hz倍音チベットボウルによる精神清涼マイクロインタラクション。',
      keywords: ['枯山水', '砂紋体験', '528Hz瞑想', '日本庭園Zen']
    },
    en: {
      title: 'Digital Zen Garden & Raked Sand Micro-Interaction | Yumeiho',
      description: 'A meditative micro-interaction featuring procedural raked sand patterns, stone placement, and 528Hz bowl harmonics.',
      keywords: ['Digital Zen Garden', 'Raked Sand', '528Hz Meditation', 'Japanese Zen Experience']
    }
  }
};

/**
 * Dynamically updates document title, meta tags (description, og, twitter) and JSON-LD schema.
 */
export function setDocumentSeo(data: SeoMetaData) {
  if (typeof document === 'undefined') return;

  // 1. Title
  document.title = data.title;

  // 2. Meta Description
  let metaDesc = document.querySelector('meta[name="description"]');
  if (!metaDesc) {
    metaDesc = document.createElement('meta');
    metaDesc.setAttribute('name', 'description');
    document.head.appendChild(metaDesc);
  }
  metaDesc.setAttribute('content', data.description);

  // 3. OpenGraph Title
  let ogTitle = document.querySelector('meta[property="og:title"]');
  if (!ogTitle) {
    ogTitle = document.createElement('meta');
    ogTitle.setAttribute('property', 'og:title');
    document.head.appendChild(ogTitle);
  }
  ogTitle.setAttribute('content', data.title);

  // 4. OpenGraph Description
  let ogDesc = document.querySelector('meta[property="og:description"]');
  if (!ogDesc) {
    ogDesc = document.createElement('meta');
    ogDesc.setAttribute('property', 'og:description');
    document.head.appendChild(ogDesc);
  }
  ogDesc.setAttribute('content', data.description);

  // 5. Twitter Title & Description
  let twTitle = document.querySelector('meta[name="twitter:title"]');
  if (!twTitle) {
    twTitle = document.createElement('meta');
    twTitle.setAttribute('name', 'twitter:title');
    document.head.appendChild(twTitle);
  }
  twTitle.setAttribute('content', data.title);

  let twDesc = document.querySelector('meta[name="twitter:description"]');
  if (!twDesc) {
    twDesc = document.createElement('meta');
    twDesc.setAttribute('name', 'twitter:description');
    document.head.appendChild(twDesc);
  }
  twDesc.setAttribute('content', data.description);

  // 6. Keywords
  if (data.keywords && data.keywords.length > 0) {
    let metaKeywords = document.querySelector('meta[name="keywords"]');
    if (!metaKeywords) {
      metaKeywords = document.createElement('meta');
      metaKeywords.setAttribute('name', 'keywords');
      document.head.appendChild(metaKeywords);
    }
    metaKeywords.setAttribute('content', data.keywords.join(', '));
  }

  // 7. Schema.org JSON-LD Structured Data Update
  let jsonLdScript = document.getElementById('yumeiho-seo-jsonld') as HTMLScriptElement | null;
  if (!jsonLdScript) {
    jsonLdScript = document.createElement('script');
    jsonLdScript.id = 'yumeiho-seo-jsonld';
    jsonLdScript.type = 'application/ld+json';
    document.head.appendChild(jsonLdScript);
  }

  const structuredData = {
    '@context': 'https://schema.org',
    '@type': 'MedicalBusiness',
    'name': 'Yumeiho Türkiye',
    'alternateName': 'Yumeiho Centre Official Representative',
    'url': typeof window !== 'undefined' ? window.location.href : 'https://yumeiho.com.tr',
    'description': data.description,
    'medicalSpecialty': ['PhysicalTherapy', 'Musculoskeletal'],
    'availableService': {
      '@type': 'MedicalProcedure',
      'name': 'Yumeiho Pelvic Alignment & 100 Kata Therapy',
      'procedureType': 'NonInvasiveProcedure'
    }
  };

  jsonLdScript.textContent = JSON.stringify(structuredData);
}

/**
 * Custom hook that tracks active visible section on scroll or manual state
 * and automatically updates <title> and <meta name="description"> for search engine visibility.
 */
export function useDynamicSeo(customSectionId?: string) {
  const { language } = useLanguage();
  const [activeSection, setActiveSection] = useState<string>(customSectionId || 'hero');
  const observerRef = useRef<IntersectionObserver | null>(null);

  useEffect(() => {
    if (customSectionId) {
      setActiveSection(customSectionId);
      return;
    }

    if (typeof window === 'undefined' || !('IntersectionObserver' in window)) return;

    const sectionIds = Object.keys(SEO_SECTIONS);
    const elements = sectionIds
      .map(id => document.getElementById(id))
      .filter((el): el is HTMLElement => el !== null);

    if (elements.length === 0) return;

    observerRef.current = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting && entry.intersectionRatio >= 0.25) {
            setActiveSection(entry.target.id);
          }
        });
      },
      {
        rootMargin: '-10% 0px -40% 0px',
        threshold: [0.25, 0.5]
      }
    );

    elements.forEach(el => observerRef.current?.observe(el));

    return () => {
      observerRef.current?.disconnect();
    };
  }, [customSectionId]);

  useEffect(() => {
    const config = SEO_SECTIONS[activeSection] || SEO_SECTIONS['hero'];
    const seoData = config[language] || config['tr'];
    setDocumentSeo(seoData);
  }, [activeSection, language]);

  return {
    activeSection,
    setActiveSection,
    setDocumentSeo
  };
}
