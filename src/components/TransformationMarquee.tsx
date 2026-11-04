import React from 'react';
import { Award, CheckCircle2, TrendingUp, Sparkles, Activity } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';

interface CaseOutcome {
  id: string;
  tag: { tr: string; jp: string; en: string };
  title: { tr: string; jp: string; en: string };
  metric: string;
  sessions: { tr: string; jp: string; en: string };
  kanji: string;
}

const OUTCOMES: CaseOutcome[] = [
  {
    id: 'case-1',
    tag: { tr: 'Kronik Bel & Sakroiliyak', jp: '慢性腰痛・仙腸関節障害', en: 'Chronic Lumbar & Sacroiliac' },
    title: { tr: 'Kronik Bel Ağrısı & L4-L5 Sıkışması', jp: '慢性腰痛・L4-L5椎間板圧迫', en: 'Chronic Lower Back Pain & L4-L5 Compression' },
    metric: '%85 İyileşme / 85% 改善',
    sessions: { tr: '4 Seans Sonrası', jp: '4回の施術後', en: 'After 4 Sessions' },
    kanji: '腰'
  },
  {
    id: 'case-2',
    tag: { tr: 'Bacak Boyu Eşitsizliği', jp: '脚長差（脚の不均衡）', en: 'Leg Length Discrepancy' },
    title: { tr: 'Pelvik Eğiklik & Bacak Boyu Farkı', jp: '骨盤変位・脚長差の不均衡', en: 'Pelvic Subluxation & Leg Variance' },
    metric: '12mm → 2mm 補正',
    sessions: { tr: '6 Seans Sonrası', jp: '6回の施術後', en: 'After 6 Sessions' },
    kanji: '脚'
  },
  {
    id: 'case-3',
    tag: { tr: 'İdiyopatik Skolyoz', jp: '特発性側弯症 (Skolyoz)', en: 'Idiopathic Scoliosis' },
    title: { tr: 'Torakal & Lumbal Omurga Eğriliği', jp: '胸椎・腰椎の彎曲（歪み）', en: 'Thoracic & Lumbar Spinal Deviation' },
    metric: 'COBB角 -6° 減少',
    sessions: { tr: '8 Seans Sonrası', jp: '8回の施術後', en: 'After 8 Sessions' },
    kanji: '脊'
  },
  {
    id: 'case-4',
    tag: { tr: 'Somatik Anksiyete', jp: '身体的不安・自律神経緊張', en: 'Somatic Anxiety' },
    title: { tr: 'Otonom Gerilim & Psoas Hipertonusu', jp: '自律神経緊張・大腰筋攣縮', en: 'Autonomic Tension & Psoas Spasm' },
    metric: '90% ストレス軽減',
    sessions: { tr: '3 Seans Sonrası', jp: '3回の施術後', en: 'After 3 Sessions' },
    kanji: '和'
  },
  {
    id: 'case-5',
    tag: { tr: 'Servikal Düzleşme', jp: '頸椎ストレートネック', en: 'Cervical Flatness' },
    title: { tr: 'Boyun Fıtığı & C1-C7 Rotasyonu', jp: '頸椎ヘルニア・C1-C7回旋障害', en: 'Cervical Disc Herniation & C1-C7 Rotation' },
    metric: '+88% 可動域拡大',
    sessions: { tr: '5 Seans Sonrası', jp: '5回の施術後', en: 'After 5 Sessions' },
    kanji: '頸'
  },
  {
    id: 'case-6',
    tag: { tr: 'Yalancı Siyatik', jp: '偽性坐骨神経痛', en: 'Pseudo Sciatica' },
    title: { tr: 'Piriformis Sıkışması & Kalça Ağrısı', jp: '梨状筋圧迫・臀部神経痛', en: 'Piriformis Entrapment & Gluteal Pain' },
    metric: '92% 疼痛軽減',
    sessions: { tr: '4 Seans Sonrası', jp: '4回の施術後', en: 'After 4 Sessions' },
    kanji: '座'
  }
];

export const TransformationMarquee: React.FC = () => {
  const { language } = useLanguage();

  // Duplicate list to achieve a seamless endless marquee loop
  const marqueeItems = [...OUTCOMES, ...OUTCOMES];

  return (
    <section className="py-12 bg-stone-900 dark:bg-stone-950 text-stone-100 border-t border-b border-stone-800/80 overflow-hidden relative select-none">
      {/* Background Subtle Ambient Lighting */}
      <div className="absolute inset-0 bg-radial from-amber-950/20 via-transparent to-transparent pointer-events-none" />

      {/* Edge Blur Gradients for Seamless Fade Effect */}
      <div className="absolute top-0 left-0 bottom-0 w-20 sm:w-32 bg-gradient-to-r from-stone-900 dark:from-stone-950 to-transparent z-10 pointer-events-none" />
      <div className="absolute top-0 right-0 bottom-0 w-20 sm:w-32 bg-gradient-to-l from-stone-900 dark:from-stone-950 to-transparent z-10 pointer-events-none" />

      {/* Marquee Header Banner */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-6 flex flex-col sm:flex-row items-center justify-between gap-3 relative z-20">
        <div className="flex items-center space-x-2">
          <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
          <span className="text-xs font-mono uppercase tracking-widest text-amber-400 font-semibold">
            {language === 'jp' ? '湧命法 施術臨床効果' : language === 'tr' ? 'Canlı Dönüşüm Sonuçları' : 'Live Transformation Outcomes'}
          </span>
        </div>
        <p className="text-xs text-stone-400 italic font-serif text-center sm:text-right">
          {language === 'jp'
            ? '臨床経過記録から集計された湧命法施術の成功症例データ。'
            : language === 'tr'
            ? 'Klinik takip kayıtlarından derlenmiş onaylı Yumeiho seans başarı göstergeleri.'
            : 'Verified Yumeiho session success indicators compiled from clinical progress records.'}
        </p>
      </div>

      {/* Marquee Track Container */}
      <div className="w-full overflow-hidden py-2">
        <div className="animate-marquee hover:[animation-play-state:paused]">
          {marqueeItems.map((item, index) => (
            <div
              key={`${item.id}-${index}`}
              className="mx-3 px-5 py-4 rounded-2xl bg-stone-950/90 border border-stone-800/90 hover:border-amber-500/60 shadow-lg transition-all duration-300 flex items-center space-x-4 min-w-[320px] sm:min-w-[360px] group cursor-default"
            >
              {/* Kanji Seal Circle */}
              <div className="w-11 h-11 rounded-xl bg-amber-950/60 border border-amber-800/50 flex items-center justify-center flex-shrink-0 group-hover:bg-amber-900/80 group-hover:border-amber-500 transition-colors">
                <span className="font-serif text-lg text-amber-300 font-semibold">{item.kanji}</span>
              </div>

              {/* Case Content */}
              <div className="flex-1 min-w-0">
                <div className="flex items-center justify-between gap-2 mb-1">
                  <span className="text-[10px] font-mono uppercase tracking-wider text-stone-400 truncate">
                    {item.tag[language]}
                  </span>
                  <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-amber-900/40 text-amber-300 border border-amber-800/40 flex-shrink-0">
                    {item.sessions[language]}
                  </span>
                </div>

                <h4 className="text-xs font-semibold text-stone-200 group-hover:text-amber-100 transition-colors truncate">
                  {item.title[language]}
                </h4>

                <div className="mt-1.5 flex items-center space-x-1.5">
                  <TrendingUp className="w-3.5 h-3.5 text-emerald-400 flex-shrink-0" />
                  <span className="text-sm font-bold font-mono text-emerald-400 tracking-tight">
                    {item.metric}
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
