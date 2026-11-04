import React, { useState, useRef } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Sparkles, ChevronLeft, ChevronRight, X, Scroll, Award, Compass, ShieldCheck } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';
import { zenAudio } from '../utils/audioZen';

interface HeritageChapter {
  id: string;
  year: string;
  kanji: string;
  title: { tr: string; en: string };
  subtitle: { tr: string; en: string };
  summary: { tr: string; en: string };
  fullStory: { tr: string; en: string };
  image: string;
  keyTakeaway: { tr: string; en: string };
  badge: { tr: string; en: string };
}

const HERITAGE_CHAPTERS: HeritageChapter[] = [
  {
    id: 'ancient-roots',
    year: 'M.Ö. 500 - 1900',
    kanji: '整骨伝統',
    title: {
      tr: 'Kadim Seikotsu & Shaolin Gelenekleri',
      en: 'Ancient Seikotsu & Shaolin Traditions'
    },
    subtitle: {
      tr: 'Dövüş Sanatlarından Klinik Restorasyona',
      en: 'From Martial Arts to Clinical Restoration'
    },
    summary: {
      tr: 'Yumeiho, yüzyıllar boyunca Çin Shaolin tapınaklarında ve Japonya’nın geleneksel Seikotsu (kemik düzeltme) loncalarında gizli tutulan derin biyomekanik manuel terapi yöntemlerinden filizlenmiştir.',
      en: 'Yumeiho stems from deep biomechanical manual therapy traditions preserved for centuries within Shaolin monasteries and traditional Japanese Seikotsu bone-setting guilds.'
    },
    fullStory: {
      tr: 'Eski samuraylar ve savaşçılar, muharebe sonrası eklem çıkıklarını, omurga burkulmalarını ve leğen kemiği kilitlenmelerini hızlıca düzeltmek için özel manuel manipülasyon teknikleri geliştirmiştir. Masayuki Saionji, bu teknikleri modern anatomi ve fizyoloji ile sentezleyerek sistemleştirmiştir.',
      en: 'Ancient warriors developed specialized manual manipulations to rapidly adjust subluxations, spinal sprains, and pelvic locks post-combat. Masayuki Saionji synthesized and systematized these secret traditions with modern human anatomy and biomechanics.'
    },
    image: '/src/assets/images/yumeiho_ancient_roots_1793562376463.jpg',
    keyTakeaway: {
      tr: 'Kas spastisitesini çözerken eklem fasetlerini nazikçe açan 2000 yıllık doku bilgisi.',
      en: '2,000-year-old somatic mastery releasing muscle spasticity while decompressing joint facets.'
    },
    badge: {
      tr: 'Tarihsel Kökler',
      en: 'Historical Roots'
    }
  },
  {
    id: 'founder-saionji',
    year: '1978 - Tokyo',
    kanji: '西園寺創始',
    title: {
      tr: 'Kurucu Masayuki Saionji Ekolü',
      en: 'Founder Masayuki Saionji Lineage'
    },
    subtitle: {
      tr: 'Kotsuban Yumeiho Metodunun Doğuşu',
      en: 'Genesis of the Kotsuban Yumeiho Method'
    },
    summary: {
      tr: '1978 yılında Master Masayuki Saionji, insan bedeninin tüm rahatsızlıklarının ana kaynağının pelvis kemiğindeki milimetrik rotasyon olduğunu keşfederek 100 Temel Kata dizisini kavramsallaştırdı.',
      en: 'In 1978, Master Masayuki Saionji conceptualized the 100 Fundamental Katas after identifying pelvic rotation as the root cause of systemic postural imbalances.'
    },
    fullStory: {
      tr: 'Saionji, Usta Shuichi Ohsuki ve diğer geleneksel ustaların yanında yıllarca süren çıraklık döneminin ardından, "Kotsuban Yumeiho" (Leğen Kemiği Düzeltici Yaşam Gücü Terapisi) adını verdiği ekolü kurdu. Bedenin ağırlık merkezini leğen kemiğinde eşitleyerek omurganın kendi kendini iyileştirme kapasitesini (Homeostaz) kanıtladı.',
      en: 'Following years of rigorous apprenticeship under Master Shuichi Ohsuki, Saionji established "Kotsuban Yumeiho" (Pelvis Aligning Vital Energy Therapy), demonstrating that restoring gravity equilibrium allows the body’s innate self-healing capacity to thrive.'
    },
    image: '/src/assets/images/saionji_founder_legacy_1793562376374.jpg',
    keyTakeaway: {
      tr: '100 Özel Kata ile kas, eklem ve kan dolaşımının eşzamanlı restorasyonu.',
      en: 'Simultaneous restoration of muscle, joint function, and micro-circulation via 100 Katas.'
    },
    badge: {
      tr: 'Ekolün Doğuşu',
      en: 'Foundational Era'
    }
  },
  {
    id: 'kotsuban-biomechanics',
    year: 'Kuram & Biyomekanik',
    kanji: '骨盤重力',
    title: {
      tr: 'Pelvis Dengesi & Yerçekimi Kuramı',
      en: 'Pelvic Balance & Gravity Equilibrium'
    },
    subtitle: {
      tr: 'Bedenin Terazi Noktası',
      en: 'The Master Center of Gravity'
    },
    summary: {
      tr: 'Pelvis tabanındaki minimal bir eğiklik; omurgada kompansatuar skolyoz, bacak boyu eşitsizliği ve otonom sinir sisteminde sempatik overstimülasyon yaratır.',
      en: 'A slight tilt in the pelvic floor initiates compensatory spinal scoliosis, functional leg length discrepancy, and sympathetic nervous system overstimulation.'
    },
    fullStory: {
      tr: 'Saionji\'nin "Temeli eğri olan evin çatısı düz duramaz" felsefesi; Yumeiho seanslarında bacak boyunun eşitlenmesini ve sakroiliak eklemin serbest bırakılmasını birincil hedef haline getirir. 100 kata dizisi, omurgaya binen dikey basıyı kaldırır.',
      en: 'Saionji\'s core aphorism — "A house built on an uneven foundation cannot hold a level roof" — establishes pelvic adjustment as the mandatory prerequisite for resolving spinal disc herniation and postural tension.'
    },
    image: '/src/assets/images/kotsuban_kata_lineage_1793562376701.jpg',
    keyTakeaway: {
      tr: 'Milimetrik pelvis düzeltmesi ile bacak boyunda anında fonksiyonel eşitlik.',
      en: 'Instant functional leg length equalization via precise millimetric pelvic alignment.'
    },
    badge: {
      tr: 'Klinik Kuram',
      en: 'Clinical Theory'
    }
  },
  {
    id: 'global-centre',
    year: 'Günümüz - Küresel',
    kanji: '国際免許',
    title: {
      tr: 'Uluslararası Yumeiho Merkezi & Dan Lisansı',
      en: 'International Yumeiho Centre & Dan Lineage'
    },
    subtitle: {
      tr: 'Tokyo\'dan Dünya Diplomasına',
      en: 'From Tokyo to International Dan Accreditation'
    },
    summary: {
      tr: 'Bugün Tokyo International Yumeiho Centre tarafından yönetilen standartlar ile dünya genelinde binlerce terapist uluslararası kütükte kayıtlı Dan diploması ile hizmet vermektedir.',
      en: 'Headquartered at the International Yumeiho Centre in Tokyo, standardized Dan degree certifications regulate accredited practitioners globally.'
    },
    fullStory: {
      tr: 'Türkiye Resmi Temsilcisi Ali Gökmen Düzgün rehberliğinde yürütülen seminerler ve seanslar, Tokyo merkez federasyonunun 1-5. Dan sertifika müfredatına tam uyumludur. Her mezun terapist uluslararası sicil numarası ve ıslak mühürlü diplomaya sahip olur.',
      en: 'Guided by Turkey Representative Ali Gökmen Düzgün, official training seminars adhere strictly to the Tokyo International Centre curriculum, granting accredited 1st-5th Dan degrees and official register listing.'
    },
    image: '/src/assets/images/yumeiho_global_centre_1793577091.jpg',
    keyTakeaway: {
      tr: '1-5. Dan uluslararası akreditasyon ve resmi federasyon kaydı.',
      en: 'Internationally accredited 1st-5th Dan degrees and official federation register.'
    },
    badge: {
      tr: 'Küresel Miras',
      en: 'Global Legacy'
    }
  }
];

export const YumeihoHeritage: React.FC = () => {
  const { language } = useLanguage();
  const isTr = language === 'tr';
  const scrollContainerRef = useRef<HTMLDivElement>(null);
  const [activeChapter, setActiveChapter] = useState<HeritageChapter | null>(null);

  const scroll = (direction: 'left' | 'right') => {
    if (scrollContainerRef.current) {
      const scrollAmount = direction === 'left' ? -420 : 420;
      scrollContainerRef.current.scrollBy({ left: scrollAmount, behavior: 'smooth' });
      zenAudio.playZenBowl(432, 0.4);
    }
  };

  const handleOpenModal = (chapter: HeritageChapter) => {
    setActiveChapter(chapter);
    zenAudio.playZenBowl(528, 1.2);
  };

  return (
    <section className="py-20 lg:py-28 bg-[#171614] text-[#F8F7F4] relative overflow-hidden border-b border-[#2E2C29]">
      
      {/* Background Zen Atmosphere Glow */}
      <div className="absolute top-0 right-1/4 w-96 h-96 bg-[#C49B66]/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 left-1/4 w-96 h-96 bg-[#8B261E]/10 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Editorial Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 pb-10 border-b border-[#2E2C29]">
          <div>
            <div className="flex items-center gap-2 text-xs font-mono uppercase tracking-widest text-[#C49B66] mb-2">
              <Scroll className="w-4 h-4" />
              <span>{isTr ? 'Geleneksel Japon Terapi Ekolü' : 'Traditional Japanese Therapy Lineage'}</span>
            </div>
            <h2 className="font-serif-luxury text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight text-white">
              {isTr ? 'Yumeiho Mirası & Tarihsel Kökleri' : 'Yumeiho Heritage & Historical Lineage'}
            </h2>
            <p className="text-xs sm:text-sm text-[#A8A29E] mt-3 max-w-2xl leading-relaxed">
              {isTr
                ? 'Çin Shaolin manastırlarının kadim kemik düzeltme (Seikotsu) tekniklerinden, Kurucu Masayuki Saionji’nin 1978’deki Tokyo devrimine: Pelvis biyomekaniğinin köklerini ve küresel mirasını keşfedin.'
                : 'From ancient Shaolin bone-setting techniques to Master Masayuki Saionji’s 1978 Tokyo revolution: Explore the rich historical heritage of pelvic biomechanics.'}
            </p>
          </div>

          {/* Gallery Navigation Controls */}
          <div className="flex items-center gap-3">
            <button
              type="button"
              onClick={() => scroll('left')}
              className="p-3 rounded-full border border-[#3D3A35] bg-[#1E1C1A] text-[#A8A29E] hover:text-white hover:border-[#C49B66] transition-all shadow-xs"
              aria-label="Scroll left"
            >
              <ChevronLeft className="w-5 h-5" />
            </button>
            <button
              type="button"
              onClick={() => scroll('right')}
              className="p-3 rounded-full border border-[#3D3A35] bg-[#1E1C1A] text-[#A8A29E] hover:text-white hover:border-[#C49B66] transition-all shadow-xs"
              aria-label="Scroll right"
            >
              <ChevronRight className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Horizontal Scrollable Editorial Gallery Container */}
        <div
          ref={scrollContainerRef}
          className="flex gap-6 overflow-x-auto snap-x snap-mandatory pt-8 pb-6 no-scrollbar scroll-smooth"
          style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
        >
          {HERITAGE_CHAPTERS.map((chapter) => (
            <motion.div
              key={chapter.id}
              whileHover={{ y: -6 }}
              transition={{ duration: 0.3 }}
              className="snap-start shrink-0 w-[300px] sm:w-[380px] lg:w-[420px] bg-[#1E1C1A] rounded-3xl border border-[#2E2C29] overflow-hidden flex flex-col justify-between group cursor-pointer shadow-xl"
              onClick={() => handleOpenModal(chapter)}
            >
              <div>
                {/* Artwork Canvas Container */}
                <div className="relative aspect-[16/9] overflow-hidden bg-[#171614]">
                  <img
                    src={chapter.image}
                    alt={chapter.title[isTr ? 'tr' : 'en']}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 opacity-90"
                    referrerPolicy="no-referrer"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#1E1C1A] via-transparent to-black/30 pointer-events-none" />

                  {/* Kanji Seal Watermark */}
                  <div className="absolute top-4 right-4 bg-[#171614]/80 backdrop-blur-md px-3 py-1 rounded-md border border-[#3D3A35] text-xs font-serif text-[#C49B66] font-bold tracking-widest">
                    {chapter.kanji}
                  </div>

                  {/* Badge */}
                  <div className="absolute bottom-4 left-4">
                    <span className="px-2.5 py-1 text-[10px] font-mono uppercase tracking-wider text-white bg-[#8B261E] rounded-md font-bold">
                      {chapter.badge[isTr ? 'tr' : 'en']}
                    </span>
                  </div>
                </div>

                {/* Card Editorial Content */}
                <div className="p-6 space-y-3">
                  <div className="flex items-center justify-between text-xs font-mono text-[#C49B66]">
                    <span>{chapter.year}</span>
                    <span className="text-[10px] text-[#A8A29E] uppercase tracking-widest">
                      {isTr ? 'Tarihçe Kataloğu' : 'Heritage Archive'}
                    </span>
                  </div>

                  <h3 className="font-serif-luxury text-xl sm:text-2xl font-bold text-white group-hover:text-[#C49B66] transition-colors leading-snug">
                    {chapter.title[isTr ? 'tr' : 'en']}
                  </h3>

                  <p className="text-xs text-[#C49B66]/90 font-medium">
                    {chapter.subtitle[isTr ? 'tr' : 'en']}
                  </p>

                  <p className="text-xs text-[#A8A29E] leading-relaxed line-clamp-3">
                    {chapter.summary[isTr ? 'tr' : 'en']}
                  </p>
                </div>
              </div>

              {/* Action Footer */}
              <div className="p-6 pt-0 border-t border-[#2E2C29]/60 mt-4 flex items-center justify-between text-xs">
                <span className="text-[#C49B66] font-semibold group-hover:underline flex items-center gap-1.5">
                  <Sparkles className="w-3.5 h-3.5" />
                  <span>{isTr ? 'Hikayeyi Oku & İncele' : 'Read Full Narrative'}</span>
                </span>
                <span className="text-[10px] font-mono text-[#A8A29E]">→</span>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Gallery Scroll Progress Hint */}
        <div className="flex items-center justify-between pt-4 text-xs text-[#A8A29E] border-t border-[#2E2C29]">
          <div className="flex items-center gap-2 font-mono text-[11px]">
            <span className="w-2 h-2 rounded-full bg-[#C49B66] animate-pulse" />
            <span>{isTr ? 'Sürükleyin veya ok butonları ile gezin' : 'Swipe or use navigation controls'}</span>
          </div>
          <span className="font-mono text-[11px] text-[#C49B66]">
            {isTr ? '4 Tarihsel Bölüm' : '4 Historical Chapters'}
          </span>
        </div>

      </div>

      {/* Expanded Modal View for Full Narrative */}
      <AnimatePresence>
        {activeChapter && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 lg:p-8 bg-black/80 backdrop-blur-md">
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              className="bg-[#1C1A18] rounded-3xl border border-[#3D3A35] max-w-3xl w-full overflow-hidden shadow-2xl relative text-[#F8F7F4] max-h-[90vh] flex flex-col"
            >
              {/* Close Button */}
              <button
                type="button"
                onClick={() => setActiveChapter(null)}
                className="absolute top-4 right-4 z-20 p-2.5 rounded-full bg-[#171614]/80 text-[#A8A29E] hover:text-white border border-[#3D3A35] transition-colors"
              >
                <X className="w-5 h-5" />
              </button>

              {/* Modal Artwork Header */}
              <div className="relative aspect-[21/9] sm:aspect-[16/7] overflow-hidden bg-[#171614] shrink-0">
                <img
                  src={activeChapter.image}
                  alt={activeChapter.title[isTr ? 'tr' : 'en']}
                  className="w-full h-full object-cover"
                  referrerPolicy="no-referrer"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#1C1A18] via-[#1C1A18]/40 to-transparent" />
                
                <div className="absolute bottom-4 left-6 right-6">
                  <div className="flex items-center gap-3 mb-1">
                    <span className="px-2.5 py-0.5 text-[10px] font-mono uppercase font-bold text-white bg-[#8B261E] rounded-md">
                      {activeChapter.badge[isTr ? 'tr' : 'en']}
                    </span>
                    <span className="text-xs font-mono text-[#C49B66]">{activeChapter.year}</span>
                  </div>
                  <h3 className="font-serif-luxury text-2xl sm:text-3xl font-bold text-white">
                    {activeChapter.title[isTr ? 'tr' : 'en']}
                  </h3>
                </div>
              </div>

              {/* Modal Body */}
              <div className="p-6 sm:p-8 space-y-6 overflow-y-auto custom-scrollbar">
                <div>
                  <h4 className="text-sm font-semibold text-[#C49B66] uppercase tracking-wider mb-2">
                    {activeChapter.subtitle[isTr ? 'tr' : 'en']}
                  </h4>
                  <p className="text-xs sm:text-sm text-[#D6D3D1] leading-relaxed font-light">
                    {activeChapter.fullStory[isTr ? 'tr' : 'en']}
                  </p>
                </div>

                {/* Key Takeaway Highlight Box */}
                <div className="p-4 rounded-2xl bg-[#171614] border border-[#2E2C29] flex items-start gap-3">
                  <Award className="w-5 h-5 text-[#C49B66] shrink-0 mt-0.5" />
                  <div>
                    <span className="text-xs font-mono font-bold text-[#C49B66] uppercase block mb-1">
                      {isTr ? 'Tarihsel Biyomekanik Vurgu' : 'Historical Biomechanical Insight'}
                    </span>
                    <p className="text-xs text-[#E6E4DC] leading-relaxed">
                      {activeChapter.keyTakeaway[isTr ? 'tr' : 'en']}
                    </p>
                  </div>
                </div>

                <div className="pt-4 border-t border-[#2E2C29] flex items-center justify-between text-xs text-[#A8A29E]">
                  <span className="font-serif text-[#C49B66] text-base">{activeChapter.kanji}</span>
                  <span>{isTr ? 'Yumeiho Türkiye Temsilciliği Arşivi' : 'Yumeiho Official Turkey Archive'}</span>
                </div>
              </div>

            </motion.div>
          </div>
        )}
      </AnimatePresence>

    </section>
  );
};
