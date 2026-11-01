import React, { useState, useRef } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { ChevronLeft, ChevronRight, Compass, Calendar, Award, Globe, History, ArrowRight } from 'lucide-react';
import { SectionHeader } from './SectionHeader';
import { zenAudio } from '../utils/audioZen';

interface TimelineMilestone {
  year: string;
  era: string;
  kanji: string;
  location: string;
  title: string;
  summary: string;
  details: string;
  impact: string;
  badge: string;
}

const MILESTONES: TimelineMilestone[] = [
  {
    year: '1978',
    era: 'Doğuş Dönemi',
    kanji: '創始',
    location: 'Tokyo, Japonya',
    title: 'Kotsuban Yumeiho Jutsu Metodunun Temelleri',
    summary: 'Masayuki Saionji (Koji Taguchi), Shaolin Zheng-Ti-Fa ve geleneksel Japon manuplatif ekollerini harmanlayarak pelvis ağırlık merkezi kuramını geliştirdi.',
    details: 'Vücudun tüm yükünü taşıyan leğen kemiğinin milimetrik asimetrilerinin omurgayı nasıl eğdiğini bilimsel olarak kanıtlayan Saionji, ilk klinik seanslarını Tokyo’da yürütmeye başladı.',
    impact: 'İnsan omurgasının temeli olarak leğen kemiğini alan Kotsuban Yumeiho kuramı literatüre girdi.',
    badge: 'Japonya Kurucu Ekol'
  },
  {
    year: '1982',
    era: 'Standartlaşma',
    kanji: '確立',
    location: 'Tokyo Genel Merkez',
    title: '100 Temel Kata Koreografisi & Uluslararası Merkez',
    summary: 'Baştan ayağa tüm eklemleri, bağları ve kas zincirlerini sistematik olarak hizalayan 100 Kata standardı tescillendi.',
    details: 'Yumeiho seansının rastgele müdahalelerden arındırılıp kusursuz bir matematiksel sıralamayla uygulanması için 100 Kata adımı protokollere bağlandı. Tokyo’da ilk uluslararası eğitmen seminerleri açıldı.',
    impact: 'Terapistlerin dünyanın her yerinde aynı hassasiyetle uygulayabileceği evrensel kata dili oluşturuldu.',
    badge: '100 Kata Tescili'
  },
  {
    year: '1989',
    era: 'Küresel Açılım',
    kanji: '世界',
    location: 'Avrupa & Dünya Geneli',
    title: 'International Yumeiho Centre & Avrupa Tıp Çevreleri',
    summary: 'Yumeiho Terapi, Polonya, Romanya ve Batı Avrupa’daki tıp fakülteleri ve rehabilitasyon kliniklerinde kabul gördü.',
    details: 'Skolyoz ve omurga deformitelerinde ameliyatsız düzelme sağlayan klinik vakaların yayınlanmasıyla birlikte Avrupa Yumeiho Federasyonu kuruldu ve Dan sertifikasyon sistemi küreselleşti.',
    impact: 'Avrupa genelinde 30’dan fazla ülkede hastanelerde tamamlayıcı manuel terapi olarak lisanslandı.',
    badge: 'Uluslararası Tanınırlık'
  },
  {
    year: '2008',
    era: 'Türkiye Yolculuğu',
    kanji: '伝承',
    location: 'İstanbul & Tokyo',
    title: 'Ali Gökmen Düzgün ve Türkiye’deki İlk Klinik Adımlar',
    summary: 'Ali Gökmen Düzgün, Japon ve Avrupalı Yumeiho ustalarıyla birebir stajlarını tamamlayarak Türkiye’de ilk klinik seansları başlattı.',
    details: 'Beden biyomekaniği ve Doğu tıbbına adanmış yılların ardından Türkiye’deki duruş bozuklukları, bel-boyun fıtıkları ve skolyoz vakalarında Yumeiho’nun ilk kapsamlı klinik sonuçları alındı.',
    impact: 'Yüzlerce danışanda ameliyat kararlarını geri çeviren başarılı vaka serileri oluşturuldu.',
    badge: 'İlk Klinik Vaka Serisi'
  },
  {
    year: '2016',
    era: 'Resmi Temsilcilik',
    kanji: '公式',
    location: 'Kadıköy / İstanbul',
    title: 'Uluslararası Federasyon Türkiye Resmi Temsilciliği',
    summary: 'International Yumeiho Centre tarafından Ali Gökmen Düzgün resmi Türkiye Temsilcisi ve Baş Eğitmeni ilan edildi.',
    details: 'Uluslararası kütükte tescillenen Türkiye Temsilciliği ile 1. ve 2. Dan seviyelerinde resmi akreditasyon ve uluslararası diploma düzenleme yetkisi Ali Gökmen Düzgün’e devredildi.',
    impact: 'Türkiye, Yumeiho dünya haritasında resmi akredite merkez statüsüne yükseldi.',
    badge: 'Resmi Federasyon Beratı'
  },
  {
    year: '2021',
    era: 'Akademi Hamlesi',
    kanji: '発展',
    location: 'İstanbul, Ankara, İzmir',
    title: 'Yüzlerce Sertifikalı Terapist ve Dan Kampları',
    summary: 'Fizyoterapistler, hekimler ve masaj uzmanları için düzenlenen yoğun Dan seminerleriyle milli bir uygulayıcı ağı kuruldu.',
    details: 'Düzenlenen 32 saatlik yoğun uygulamalı seminerler ve klinik süpervizyonlarla Türkiye genelinde 500’den fazla profesyonel uygulayıcı uluslararası Dan diplomasına kavuştu.',
    impact: 'Türkiye genelinde etik ve yetkili Yumeiho uygulayıcı kütüğü oluşturuldu.',
    badge: '500+ Mezun Terapist'
  },
  {
    year: '2026',
    era: 'Dijital Gelecek',
    kanji: '未来',
    location: 'Yumeiho Türkiye Platformu',
    title: 'Bütünsel Zihin-Beden Platformu & 1.000+ Terapist',
    summary: 'Psikosomatik terapi modülleri (anksiyete, stres, özgüven) ve dijital öğrenme akademisiyle çağdaş dönüşüm.',
    details: 'Ali Gökmen Düzgün liderliğinde kurulan interaktif eğitim platformu, postür simülatörü ve online sertifika doğrulama altyapısı ile Yumeiho Türkiye, dünya federasyonunun en dinamik merkezlerinden biri oldu.',
    impact: 'Geleneksel Japon kadim bilgeliği modern dijital etkileşim ve klinik disiplinle buluştu.',
    badge: 'Dijital Akademi Dönemi'
  }
];

export const HistoryTimeline: React.FC = () => {
  const [activeIndex, setActiveIndex] = useState<number>(0);
  const scrollContainerRef = useRef<HTMLDivElement>(null);

  const activeMilestone = MILESTONES[activeIndex];

  const handleSelect = (idx: number) => {
    setActiveIndex(idx);
    zenAudio.playZenBowl(432 + idx * 24, 1.8);
  };

  const handlePrev = () => {
    if (activeIndex > 0) {
      handleSelect(activeIndex - 1);
    }
  };

  const handleNext = () => {
    if (activeIndex < MILESTONES.length - 1) {
      handleSelect(activeIndex + 1);
    }
  };

  return (
    <section id="tarihce" className="py-16 lg:py-24 bg-[#F8F7F4] border-b border-[#E6E4DC] overflow-hidden washi-pattern">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header with Framer Motion scroll reveal */}
        <SectionHeader
          kicker="Tarihçe ve Temsilcilik Yolculuğu"
          title={
            <>
              Tokyo'dan İstanbul'a: <br className="hidden sm:inline" />
              Yumeiho'nun Doğuşu ve Türkiye Temsilciliği
            </>
          }
          description="1978 yılında Tokyo'da Masayuki Saionji tarafından temelleri atılan bu kadim pelvis hizalama metodunun, Ali Gökmen Düzgün öncülüğünde Türkiye'nin en saygın manuel terapi ve eğitim ekolüne dönüşme serüveni."
        />

        {/* Interactive Horizontal Timeline Navigation Track */}
        <div className="relative mt-8 mb-12">
          
          {/* Subtle Progress Rail */}
          <div className="absolute top-1/2 left-0 right-0 h-[2px] bg-[#E6E4DC] -translate-y-1/2 z-0" />
          
          {/* Active Progress Fill */}
          <div
            className="absolute top-1/2 left-0 h-[2px] bg-[#8B261E] -translate-y-1/2 z-0 transition-all duration-500 ease-out"
            style={{ width: `${(activeIndex / (MILESTONES.length - 1)) * 100}%` }}
          />

          {/* Interactive Year Node Points */}
          <div
            ref={scrollContainerRef}
            className="relative z-10 flex items-center justify-between gap-4 overflow-x-auto py-4 px-2 no-scrollbar"
          >
            {MILESTONES.map((m, idx) => {
              const isActive = activeIndex === idx;
              const isPast = activeIndex >= idx;

              return (
                <button
                  key={m.year}
                  type="button"
                  onClick={() => handleSelect(idx)}
                  className="flex flex-col items-center group focus:outline-none shrink-0"
                >
                  {/* Kanji Micro Tag */}
                  <span className={`text-[10px] font-serif mb-1 transition-colors ${
                    isActive ? 'text-[#8B261E] font-bold scale-110' : 'text-[#A8A29E] group-hover:text-[#171614]'
                  }`}>
                    {m.kanji}
                  </span>

                  {/* Circle Node */}
                  <div
                    className={`w-9 h-9 sm:w-11 sm:h-11 rounded-full flex items-center justify-center font-mono text-xs font-bold transition-all duration-300 ${
                      isActive
                        ? 'bg-[#171614] text-white ring-4 ring-[#8B261E]/30 scale-110 shadow-md'
                        : isPast
                        ? 'bg-[#8B261E] text-white hover:scale-105'
                        : 'bg-white border-2 border-[#D8D6D0] text-[#78716C] hover:border-[#171614] hover:text-[#171614]'
                    }`}
                  >
                    {m.year.slice(2)}'
                  </div>

                  {/* Year Label */}
                  <span className={`text-xs font-semibold mt-2 tracking-wider transition-colors ${
                    isActive ? 'text-[#171614] font-bold' : 'text-[#78716C] group-hover:text-[#171614]'
                  }`}>
                    {m.year}
                  </span>
                </button>
              );
            })}
          </div>

        </div>

        {/* Dynamic Milestone Spotlight Display (Awwwards Card Layout) */}
        <div className="relative min-h-[380px]">
          <AnimatePresence mode="wait">
            <motion.div
              key={activeMilestone.year}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
              className="bg-white rounded-3xl border border-[#E6E4DC] p-6 sm:p-10 lg:p-12 shadow-xl relative overflow-hidden"
            >
              {/* Giant Watermark Year in Background */}
              <div
                className="absolute -right-6 -bottom-8 font-serif-luxury font-bold text-8xl sm:text-9xl text-[#171614]/5 select-none pointer-events-none tracking-tighter"
                aria-hidden="true"
              >
                {activeMilestone.year}
              </div>

              {/* Top Meta Strip */}
              <div className="flex flex-wrap items-center justify-between gap-4 pb-6 border-b border-[#F0EFEA] mb-6 relative z-10">
                <div className="flex items-center gap-3">
                  <span className="inline-flex items-center justify-center border border-[#8B261E] text-[#8B261E] px-2 py-0.5 text-xs font-serif font-bold tracking-widest bg-[#8B261E]/5 rounded-sm">
                    {activeMilestone.kanji} {activeMilestone.era}
                  </span>
                  <span aria-hidden="true" className="text-[#D8D6D0]">·</span>
                  <span className="text-xs text-[#78716C] font-semibold flex items-center gap-1.5">
                    <Globe className="w-3.5 h-3.5 text-[#8B261E]" />
                    {activeMilestone.location}
                  </span>
                </div>

                <div className="flex items-center gap-2">
                  <span className="text-xs font-semibold text-[#8B261E] bg-[#8B261E]/5 px-3 py-1 rounded-full border border-[#8B261E]/20">
                    {activeMilestone.badge}
                  </span>
                </div>
              </div>

              {/* Title & Body Layout */}
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start relative z-10">
                
                <div className="lg:col-span-8 space-y-4">
                  <h3 className="font-serif-luxury text-2xl sm:text-3xl lg:text-4xl font-bold tracking-tight text-[#171614]">
                    {activeMilestone.title}
                  </h3>

                  <p className="text-[#44403C] text-base sm:text-lg leading-relaxed font-light">
                    {activeMilestone.summary}
                  </p>

                  <p className="text-xs sm:text-sm text-[#78716C] leading-relaxed pt-2">
                    {activeMilestone.details}
                  </p>
                </div>

                {/* Right Column: Historical Impact Highlight */}
                <div className="lg:col-span-4 bg-[#F8F7F4] rounded-2xl border border-[#E6E4DC] p-5 space-y-3">
                  <span className="text-[11px] font-bold uppercase tracking-widest text-[#8B261E] block">
                    Tarihsel Miras & Etki
                  </span>
                  <p className="text-xs sm:text-sm text-[#171614] leading-relaxed font-medium">
                    "{activeMilestone.impact}"
                  </p>

                  <div className="pt-3 border-t border-[#E6E4DC] flex items-center justify-between text-xs text-[#78716C]">
                    <span>Aşama {activeIndex + 1} / {MILESTONES.length}</span>
                    <span className="font-serif text-[#8B261E] font-bold">{activeMilestone.year}</span>
                  </div>
                </div>

              </div>

              {/* Navigation Controls Footer */}
              <div className="pt-8 mt-8 border-t border-[#F0EFEA] flex items-center justify-between relative z-10">
                <button
                  type="button"
                  onClick={handlePrev}
                  disabled={activeIndex === 0}
                  className={`inline-flex items-center gap-2 px-4 py-2 text-xs font-semibold rounded-lg border transition-all ${
                    activeIndex === 0
                      ? 'border-[#E6E4DC] text-[#D8D6D0] cursor-not-allowed'
                      : 'border-[#D8D6D0] text-[#171614] hover:bg-[#F8F7F4]'
                  }`}
                >
                  <ChevronLeft className="w-4 h-4" />
                  <span>Önceki Dönem</span>
                </button>

                <div className="flex items-center gap-1.5">
                  {MILESTONES.map((_, dotIdx) => (
                    <button
                      key={dotIdx}
                      type="button"
                      onClick={() => handleSelect(dotIdx)}
                      className={`h-1.5 rounded-full transition-all duration-300 ${
                        activeIndex === dotIdx
                          ? 'w-6 bg-[#8B261E]'
                          : 'w-2 bg-[#D8D6D0] hover:bg-[#A8A29E]'
                      }`}
                      aria-label={`Dönem ${dotIdx + 1}`}
                    />
                  ))}
                </div>

                <button
                  type="button"
                  onClick={handleNext}
                  disabled={activeIndex === MILESTONES.length - 1}
                  className={`inline-flex items-center gap-2 px-4 py-2 text-xs font-semibold rounded-lg border transition-all ${
                    activeIndex === MILESTONES.length - 1
                      ? 'border-[#E6E4DC] text-[#D8D6D0] cursor-not-allowed'
                      : 'border-[#171614] bg-[#171614] text-white hover:bg-[#8B261E] hover:border-[#8B261E]'
                  }`}
                >
                  <span>Sonraki Dönem</span>
                  <ChevronRight className="w-4 h-4" />
                </button>
              </div>

            </motion.div>
          </AnimatePresence>
        </div>

      </div>
    </section>
  );
};
