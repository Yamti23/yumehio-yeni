import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Activity, Info, Zap, ChevronRight, Volume2, ShieldAlert } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';
import { zenAudio } from '../utils/audioZen';

export interface VertebraNode {
  id: string;
  code: string;
  region: 'cervical' | 'thoracic' | 'lumbar' | 'sacrum';
  regionLabel: { tr: string; en: string };
  name: { tr: string; en: string };
  yumeihoImpact: { tr: string; en: string };
  organCorrelation: { tr: string; en: string };
  postureImpact: { tr: string; en: string };
  recommendedKata: { tr: string; en: string };
  cy: number; // SVG Y center
  color: string;
}

export const VERTEBRAE_DATA: VertebraNode[] = [
  {
    id: 'c1-c2',
    code: 'C1 - C2',
    region: 'cervical',
    regionLabel: { tr: 'Servikal Bölge (Boyun)', en: 'Cervical Spine (Neck)' },
    name: {
      tr: 'C1-C2 Atlas & Axis (Kafa Tabanı Omurları)',
      en: 'C1-C2 Atlas & Axis (Cranial Base)'
    },
    yumeihoImpact: {
      tr: 'Pelvik kayma ve sakroiliak kilitlenme sonucu kafatasının omurgaya oturduğu aksatör rotasyonu. Suboksipital kas spazmı.',
      en: 'Rotational asymmetry at cranial junction caused by pelvic tilt. Suboccipital muscle spasm.'
    },
    organCorrelation: {
      tr: 'Otonom Sinir Sistemi, Beyin Sapı Serbestliği, Trigeminal Sinir, Vagus Siniri Refleksi',
      en: 'Autonomic Nervous System, Brainstem Freedom, Trigeminal Nerve, Vagal Reflex'
    },
    postureImpact: {
      tr: 'Kronik migren, çene eklemi (TME) disfonksiyonu, vertigo, göz yorgunluğu ve kafa içi basınç hissi.',
      en: 'Chronic migraine, TMJ dysfunction, vertigo, eye strain, and intracranial pressure sensation.'
    },
    recommendedKata: {
      tr: 'Kata #43-52: Keitsui Mobilizasyonu & Suboksipital Dekompresyon',
      en: 'Kata #43-52: Cervical Mobilization & Suboccipital Decompression'
    },
    cy: 32,
    color: '#C49B66'
  },
  {
    id: 'c3-c7',
    code: 'C3 - C7',
    region: 'cervical',
    regionLabel: { tr: 'Servikal Bölge (Boyun)', en: 'Cervical Spine (Neck)' },
    name: {
      tr: 'C3-C7 Alt Servikal & Omuz Kuşağı',
      en: 'C3-C7 Lower Cervical & Shoulder Girdle'
    },
    yumeihoImpact: {
      tr: 'Pelvisteki eğikliğin üst omurgada yarattığı kompansatuar lordoz düzleşmesi ve boyun omur kayması.',
      en: 'Compensatory cervical straightening and vertebral slippage caused by pelvic tilt.'
    },
    organCorrelation: {
      tr: 'Tiroid Bezi, Ses Telleri, Brakial Pleksus Sinir Ağı, Diafragma Phrenic Siniri',
      en: 'Thyroid Gland, Vocal Cords, Brachial Plexus Nerve Network, Phrenic Nerve'
    },
    postureImpact: {
      tr: 'Boyun düzleşmesi, omuz asimetrisi, kollarda uyuşma, kürek kemiğinde kronik yakıcı ağrı.',
      en: 'Cervical lordosis loss, shoulder asymmetry, arm numbness, chronic interscapular burning pain.'
    },
    recommendedKata: {
      tr: 'Kata #53-68: Trapezius & Keitsui Shiatsu',
      en: 'Kata #53-68: Trapezius & Cervical Shiatsu'
    },
    cy: 58,
    color: '#D4AF37'
  },
  {
    id: 't1-t4',
    code: 'T1 - T4',
    region: 'thoracic',
    regionLabel: { tr: 'Torakal Bölge (Sırt)', en: 'Thoracic Spine (Mid Back)' },
    name: {
      tr: 'T1-T4 Üst Göğüs & Kalp Omurları',
      en: 'T1-T4 Upper Thoracic & Cardiac Segment'
    },
    yumeihoImpact: {
      tr: 'Gövde rotasyonuna bağlı torakal skolyotik kavis ve kaburga faset kilitlenmesi.',
      en: 'Thoracic scoliotic curve and rib facet locking secondary to trunk rotation.'
    },
    organCorrelation: {
      tr: 'Kalp Sempatik Gangliyonu, Koroner Damarlar, Akciğer Bronş Dalları',
      en: 'Cardiac Sympathetic Ganglia, Coronary Arteries, Bronchial Branches'
    },
    postureImpact: {
      tr: 'Sırt kamburluğu (hiper-kifoz), nefes darlığı, göğüste sıkışma hissi, kürek kemiği kanatlanması.',
      en: 'Hyper-kyphosis, shortness of breath, chest tightness, scapular winging.'
    },
    recommendedKata: {
      tr: 'Kata #69-80: Torakal Rotasyon & Seikotsu Dekompresyon',
      en: 'Kata #69-80: Thoracic Rotation & Seikotsu Decompression'
    },
    cy: 90,
    color: '#8B261E'
  },
  {
    id: 't5-t8',
    code: 'T5 - T8',
    region: 'thoracic',
    regionLabel: { tr: 'Torakal Bölge (Sırt)', en: 'Thoracic Spine (Mid Back)' },
    name: {
      tr: 'T5-T8 Orta Sırt & Mide/Karaciğer Omurları',
      en: 'T5-T8 Mid-Thoracic & Gastrointestinal Segment'
    },
    yumeihoImpact: {
      tr: 'Sol/Sağ pelvis kaymasına göre otonom sinir liflerinin spesifik kompresyonu ve torakal burkulma.',
      en: 'Specific autonomic nerve compression and thoracic torsion based on Left/Right pelvic tilt.'
    },
    organCorrelation: {
      tr: 'Mide, Karaciğer, Safra Kesesi, Pankreas, Splanchnic Sinir Ağı',
      en: 'Stomach, Liver, Gallbladder, Pancreas, Splanchnic Nerve Plexus'
    },
    postureImpact: {
      tr: 'Masa başı çökük postür, kronik hazımsızlık, reflü, mid-back kilitlenmesi.',
      en: 'Slouched desk posture, chronic indigestion, acid reflux, mid-back stiffness.'
    },
    recommendedKata: {
      tr: 'Kata #81-90: Seikotsu Shiatsu & Torakal Traksiyon',
      en: 'Kata #81-90: Seikotsu Shiatsu & Thoracic Traction'
    },
    cy: 122,
    color: '#A82E25'
  },
  {
    id: 't9-t12',
    code: 'T9 - T12',
    region: 'thoracic',
    regionLabel: { tr: 'Torakal Bölge (Sırt)', en: 'Thoracic Spine (Mid Back)' },
    name: {
      tr: 'T9-T12 Torakolomber Geçiş Omurları',
      en: 'T9-T12 Thoracolumbar Junction (TLJ)'
    },
    yumeihoImpact: {
      tr: 'Dönme ve eğilme hareketlerinin merkezindeki makaslanma gerilimi; pelvis dönüklüğünün dikey aksı.',
      en: 'Shear stress at torsional axis; vertical pivot of pelvic rotation.'
    },
    organCorrelation: {
      tr: 'Böbrekler, Adrenal (Böbrek Üstü) Bezler, Üreterler, Stres Hormon Dengesi',
      en: 'Kidneys, Adrenal Glands, Ureters, Stress Hormone Balance'
    },
    postureImpact: {
      tr: 'Bel-sırt bileşkesinde batıcı ağrı, kronik yorgunluk, adrenal overstimülasyon.',
      en: 'Stabbing pain at thoracolumbar junction, chronic fatigue, adrenal overstimulation.'
    },
    recommendedKata: {
      tr: 'Kata #15-24: Bel-Sırt Geçiş Mobilizasyonu',
      en: 'Kata #15-24: Thoracolumbar Mobilization'
    },
    cy: 154,
    color: '#B8860B'
  },
  {
    id: 'l1-l3',
    code: 'L1 - L3',
    region: 'lumbar',
    regionLabel: { tr: 'Lomber Bölge (Bel)', en: 'Lumbar Spine (Lower Back)' },
    name: {
      tr: 'L1-L3 Üst Bel & Psoas Kas Akstı',
      en: 'L1-L3 Upper Lumbar & Psoas Muscle Axis'
    },
    yumeihoImpact: {
      tr: 'Pelvisin öne/arkaya eğikliğinde (anterior/posterior tilt) Psoas Major kasının spastik kısalması.',
      en: 'Psoas Major spastic shortening in anterior/posterior pelvic tilt.'
    },
    organCorrelation: {
      tr: 'İnce Bağırsaklar, Kolon Motilitesi, Femoral Sinir Kökleri, Kasık Kanalı',
      en: 'Small Intestine, Colon Motility, Femoral Nerve Roots, Inguinal Canal'
    },
    postureImpact: {
      tr: 'Aşırı bel çukurluğu (hiper-lordoz) veya bel düzleşmesi, kasık ağrısı, sindirim yavaşlığı.',
      en: 'Hyper-lordosis or lumbar flattening, groin pain, sluggish intestinal motility.'
    },
    recommendedKata: {
      tr: 'Kata #09-14: Psoas Traksiyonu & Lomber Esnetme',
      en: 'Kata #09-14: Psoas Traction & Lumbar Stretch'
    },
    cy: 182,
    color: '#C49B66'
  },
  {
    id: 'l4-l5',
    code: 'L4 - L5',
    region: 'lumbar',
    regionLabel: { tr: 'Lomber Bölge (Bel)', en: 'Lumbar Spine (Lower Back)' },
    name: {
      tr: 'L4-L5 Alt Bel & L5-S1 Disk Alanı',
      en: 'L4-L5 Lower Lumbar & L5-S1 Disc Junction'
    },
    yumeihoImpact: {
      tr: 'Pelvik kaymanın tüm vücutta en çok hasar verdiği bölge. L4-L5 ve L5-S1 disklere binen asimetrik basınç.',
      en: 'Most vulnerable site of pelvic asymmetry. Asymmetric compression on L4-L5/L5-S1 discs.'
    },
    organCorrelation: {
      tr: 'Siyatik Sinir Kökleri (L4-S3), Bacak Duyu-Motor Ağı, Prostat / Uterus Dolaşımı',
      en: 'Sciatic Nerve Roots (L4-S3), Leg Sensorimotor Network, Prostate / Uterine Circulation'
    },
    postureImpact: {
      tr: 'Lomber fıtık, bacağa vuran siyatalji, faset eklem aşınması, sabahları belde kilitlenme.',
      en: 'Lumbar herniation, radiating sciatica, facet arthrosis, morning lumbar stiffness.'
    },
    recommendedKata: {
      tr: 'Kata #01-08: Kotsuban Chosei & L5-S1 Dekompresyonu',
      en: 'Kata #01-08: Kotsuban Chosei & L5-S1 Decompression'
    },
    cy: 210,
    color: '#8B261E'
  },
  {
    id: 'sacrum',
    code: 'Sakrum / Pelvis',
    region: 'sacrum',
    regionLabel: { tr: 'Sakrum & Pelvis (Kotsuban)', en: 'Sacrum & Pelvis (Kotsuban)' },
    name: {
      tr: 'Sakrum, Koksiks & Sakroiliak Eklem (Kotsuban)',
      en: 'Sacrum, Coccyx & Sacroiliac Joint (Kotsuban)'
    },
    yumeihoImpact: {
      tr: 'Yumeiho Terapi\'nin temeli: Sakroiliak eklemin kilitlenmesi (subluksasyonu). Bedenin temel terazi noktası.',
      en: 'Foundation of Yumeiho: Sacroiliac joint subluxation/locking. The central gravity scale of the body.'
    },
    organCorrelation: {
      tr: 'Pelvik Taban Kasları, Ürogenital Sistem, Sakral Parasempatik Sinir Ağı',
      en: 'Pelvic Floor Muscles, Urogenital System, Sacral Parasympathetic Plexus'
    },
    postureImpact: {
      tr: 'Bacak boyu eşitsizliği (0.5 - 2 cm), leğen kemiğinde dönüklük, kuyruk sokumu batması, pelvik taban zayıflığı.',
      en: 'Functional leg length discrepancy (0.5-2cm), pelvic rotation, coccyx discomfort, pelvic floor weakness.'
    },
    recommendedKata: {
      tr: 'Kata #01-08: Temel Kotsuban Düzeltme Kata Dizisi',
      en: 'Kata #01-08: Fundamental Kotsuban Alignment Series'
    },
    cy: 238,
    color: '#D4AF37'
  }
];

interface SpineVertebraeInteractiveModelProps {
  onSelectVertebra?: (vertebra: VertebraNode) => void;
}

export const SpineVertebraeInteractiveModel: React.FC<SpineVertebraeInteractiveModelProps> = ({
  onSelectVertebra
}) => {
  const { language } = useLanguage();
  const isTr = language === 'tr';
  const [activeId, setActiveId] = useState<string>('l4-l5');
  const [selectedRegionFilter, setSelectedRegionFilter] = useState<string>('all');

  const activeNode = VERTEBRAE_DATA.find(v => v.id === activeId) || VERTEBRAE_DATA[6];

  const handleHoverOrClick = (node: VertebraNode) => {
    if (activeId !== node.id) {
      setActiveId(node.id);
      zenAudio.playZenBowl(node.region === 'cervical' ? 528 : node.region === 'thoracic' ? 432 : 396, 0.5);
      if (onSelectVertebra) {
        onSelectVertebra(node);
      }
    }
  };

  const filteredVertebrae = selectedRegionFilter === 'all'
    ? VERTEBRAE_DATA
    : VERTEBRAE_DATA.filter(v => v.region === selectedRegionFilter);

  return (
    <div className="bg-[#171614] rounded-3xl border border-[#2E2C29] p-6 sm:p-8 text-[#F8F7F4] shadow-2xl relative overflow-hidden">
      
      {/* Background Zen Glow */}
      <div className="absolute -top-24 -right-24 w-96 h-96 bg-[#8B261E]/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute -bottom-24 -left-24 w-96 h-96 bg-[#C49B66]/10 rounded-full blur-3xl pointer-events-none" />

      {/* Header & Filter Controls */}
      <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-4 pb-6 border-b border-[#2E2C29]">
        <div>
          <div className="flex items-center gap-2 text-xs font-mono uppercase tracking-widest text-[#C49B66] mb-1">
            <Activity className="w-4 h-4" />
            <span>{isTr ? 'Klinik Omurga & Organ Yansıması' : 'Clinical Spine & Organ Reflex Map'}</span>
          </div>
          <h3 className="font-serif-luxury text-xl sm:text-2xl font-bold text-white">
            {isTr ? 'İnteraktif Omur & Organ Etkileşim Modeli' : 'Interactive Vertebrae & Organ Impact Model'}
          </h3>
          <p className="text-xs text-[#A8A29E] mt-1 max-w-xl">
            {isTr
              ? 'Omurga üzerindeki düğümlere dokunarak leğen kemiğindeki (pelvis) kaymanın ilgili organlara, otonom sinir sistemine ve postüre olan klinik etkilerini inceleyin.'
              : 'Tap or hover on spine vertebrae nodes to explore how pelvic misalignment impacts internal organs, autonomic nervous system, and posture.'}
          </p>
        </div>

        {/* Region Filter Pills */}
        <div className="flex flex-wrap items-center gap-1.5 bg-[#1E1C1A] p-1.5 rounded-xl border border-[#2E2C29]">
          <button
            type="button"
            onClick={() => setSelectedRegionFilter('all')}
            className={`px-3 py-1.5 text-[11px] font-semibold rounded-lg transition-all ${
              selectedRegionFilter === 'all'
                ? 'bg-[#C49B66] text-[#171614]'
                : 'text-[#A8A29E] hover:text-white'
            }`}
          >
            {isTr ? 'Tümü (24 Omur)' : 'All (24 Vertebrae)'}
          </button>
          <button
            type="button"
            onClick={() => setSelectedRegionFilter('cervical')}
            className={`px-3 py-1.5 text-[11px] font-semibold rounded-lg transition-all ${
              selectedRegionFilter === 'cervical'
                ? 'bg-[#C49B66] text-[#171614]'
                : 'text-[#A8A29E] hover:text-white'
            }`}
          >
            {isTr ? 'Servikal (C1-C7)' : 'Cervical (C1-C7)'}
          </button>
          <button
            type="button"
            onClick={() => setSelectedRegionFilter('thoracic')}
            className={`px-3 py-1.5 text-[11px] font-semibold rounded-lg transition-all ${
              selectedRegionFilter === 'thoracic'
                ? 'bg-[#8B261E] text-white'
                : 'text-[#A8A29E] hover:text-white'
            }`}
          >
            {isTr ? 'Torakal (T1-T12)' : 'Thoracic (T1-T12)'}
          </button>
          <button
            type="button"
            onClick={() => setSelectedRegionFilter('lumbar')}
            className={`px-3 py-1.5 text-[11px] font-semibold rounded-lg transition-all ${
              selectedRegionFilter === 'lumbar'
                ? 'bg-[#C49B66] text-[#171614]'
                : 'text-[#A8A29E] hover:text-white'
            }`}
          >
            {isTr ? 'Lomber (L1-L5)' : 'Lumbar (L1-L5)'}
          </button>
        </div>
      </div>

      {/* Main Interactive Stage: SVG Spine Diagram + Dynamic Tooltip Info Card */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 pt-6 items-start relative z-10">
        
        {/* Left Column: Anatomical Human Spine SVG with Interactive Hotspots */}
        <div className="lg:col-span-5 bg-[#1E1C1A] rounded-2xl border border-[#2E2C29] p-4 sm:p-6 flex flex-col items-center justify-center relative min-h-[420px]">
          
          <div className="w-full flex items-center justify-between text-[11px] font-mono text-[#A8A29E] mb-2">
            <span>{isTr ? 'İNSAN OMURGA AKSI' : 'HUMAN SPINE AXIS'}</span>
            <span className="text-[#C49B66]">{isTr ? 'Dokun / Üzerine Gel' : 'Tap / Hover Node'}</span>
          </div>

          <div className="relative w-full max-w-[280px] h-[380px] flex items-center justify-center select-none">
            
            {/* SVG Spine Backbone */}
            <svg viewBox="0 0 220 280" className="w-full h-full overflow-visible">
              <defs>
                <linearGradient id="spineGrad" x1="0%" y1="0%" x2="0%" y2="100%">
                  <stop offset="0%" stopColor="#C49B66" />
                  <stop offset="40%" stopColor="#8B261E" />
                  <stop offset="75%" stopColor="#C49B66" />
                  <stop offset="100%" stopColor="#D4AF37" />
                </linearGradient>
                <filter id="glow" x="-20%" y="-20%" width="140%" height="140%">
                  <feGaussianBlur stdDeviation="3" result="blur" />
                  <feComposite in="SourceGraphic" in2="blur" operator="over" />
                </filter>
              </defs>

              {/* Central Plumb Line Reference */}
              <line x1="110" y1="10" x2="110" y2="270" stroke="rgba(255,255,255,0.08)" strokeDasharray="3 3" />

              {/* Spine Curved Central Line */}
              <path
                d="M 110 20 Q 118 60, 110 100 Q 102 160, 110 210 L 110 260"
                fill="none"
                stroke="url(#spineGrad)"
                strokeWidth="4"
                strokeLinecap="round"
                opacity="0.85"
              />

              {/* Head Silhouette */}
              <ellipse cx="110" cy="18" rx="18" ry="12" fill="none" stroke="#57534E" strokeWidth="1.5" strokeDasharray="2 2" />

              {/* Pelvis Iliac Wings Silhouette */}
              <path
                d="M 65 220 Q 110 210, 155 220 Q 140 250, 110 260 Q 80 250, 65 220 Z"
                fill="none"
                stroke="#8B261E"
                strokeWidth="1.5"
                opacity="0.6"
              />

              {/* Region Label Lines */}
              <text x="10" y="45" fill="#C49B66" fontSize="9" fontFamily="monospace">Servikal (C1-C7)</text>
              <line x1="68" y1="42" x2="95" y2="42" stroke="#C49B66" strokeWidth="0.8" opacity="0.4" />

              <text x="10" y="120" fill="#A82E25" fontSize="9" fontFamily="monospace">Torakal (T1-T12)</text>
              <line x1="68" y1="117" x2="95" y2="117" stroke="#8B261E" strokeWidth="0.8" opacity="0.4" />

              <text x="10" y="195" fill="#C49B66" fontSize="9" fontFamily="monospace">Lomber (L1-L5)</text>
              <line x1="68" y1="192" x2="95" y2="192" stroke="#C49B66" strokeWidth="0.8" opacity="0.4" />

              <text x="10" y="248" fill="#D4AF37" fontSize="9" fontFamily="monospace">Sakrum/Pelvis</text>
              <line x1="68" y1="245" x2="95" y2="245" stroke="#D4AF37" strokeWidth="0.8" opacity="0.4" />

              {/* Interactive Vertebrae Hotspot Circles & Connector Lines */}
              {VERTEBRAE_DATA.map((node) => {
                const isActive = activeId === node.id;
                const isFilteredOut = selectedRegionFilter !== 'all' && node.region !== selectedRegionFilter;

                if (isFilteredOut) return null;

                return (
                  <g
                    key={node.id}
                    className="cursor-pointer transition-all duration-300"
                    onMouseEnter={() => handleHoverOrClick(node)}
                    onClick={() => handleHoverOrClick(node)}
                  >
                    {/* Horizontal Vertebra Body Box */}
                    <rect
                      x={110 - (isActive ? 22 : 16)}
                      y={node.cy - 7}
                      width={isActive ? 44 : 32}
                      height="14"
                      rx="3"
                      fill={isActive ? node.color : '#2E2C29'}
                      stroke={isActive ? '#FFFFFF' : node.color}
                      strokeWidth={isActive ? 2 : 1}
                      filter={isActive ? 'url(#glow)' : undefined}
                      className="transition-all duration-300"
                    />

                    {/* Vertebra Code Label on Node */}
                    <text
                      x="110"
                      y={node.cy + 3}
                      textAnchor="middle"
                      fill={isActive ? '#171614' : '#E6E4DC'}
                      fontSize={isActive ? '9' : '8'}
                      fontWeight="bold"
                      fontFamily="sans-serif"
                    >
                      {node.code.split(' ')[0]}
                    </text>

                    {/* Active Pulsing Ring */}
                    {isActive && (
                      <circle
                        cx="110"
                        cy={node.cy}
                        r="20"
                        fill="none"
                        stroke={node.color}
                        strokeWidth="1.5"
                        className="animate-ping opacity-40"
                      />
                    )}

                    {/* Right-Side Pointer Arrow */}
                    {isActive && (
                      <path
                        d={`M 136 ${node.cy} L 155 ${node.cy}`}
                        stroke={node.color}
                        strokeWidth="2"
                        strokeDasharray="2 2"
                      />
                    )}
                  </g>
                );
              })}
            </svg>

          </div>

          <p className="text-[10px] text-[#A8A29E] text-center mt-2">
            {isTr
              ? 'Omurga bölümlerine basarak Yumeiho klinik bulgularını inceleyin.'
              : 'Click on vertebrae segments to view Yumeiho clinical findings.'}
          </p>

        </div>

        {/* Right Column: Detailed Clinical Tooltip Inspection Card */}
        <div className="lg:col-span-7">
          <AnimatePresence mode="wait">
            <motion.div
              key={activeNode.id}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.2 }}
              className="bg-[#1E1C1A] rounded-2xl border border-[#3D3A35] p-6 sm:p-7 space-y-5 shadow-xl relative"
            >
              
              {/* Top Badge & Region Indicator */}
              <div className="flex flex-wrap items-center justify-between gap-2 border-b border-[#2E2C29] pb-4">
                <div className="flex items-center gap-2">
                  <span
                    className="w-3 h-3 rounded-full shrink-0"
                    style={{ backgroundColor: activeNode.color }}
                  />
                  <span className="text-xs font-mono font-bold text-[#C49B66] uppercase tracking-wider">
                    {activeNode.regionLabel[isTr ? 'tr' : 'en']}
                  </span>
                </div>
                <span className="px-2.5 py-1 bg-[#2E2C29] text-[#E6E4DC] text-xs font-mono font-bold rounded-md">
                  {activeNode.code}
                </span>
              </div>

              {/* Title */}
              <h4 className="font-serif-luxury text-xl sm:text-2xl font-bold text-white">
                {activeNode.name[isTr ? 'tr' : 'en']}
              </h4>

              {/* 3 Clinical Yumeiho Columns / Cards */}
              <div className="space-y-3">
                
                {/* 1. Pelvis & Biomechanical Impact */}
                <div className="p-3.5 bg-[#171614] rounded-xl border border-[#2E2C29] space-y-1">
                  <div className="flex items-center gap-1.5 text-xs font-semibold text-[#C49B66]">
                    <Zap className="w-3.5 h-3.5 text-[#C49B66]" />
                    <span>{isTr ? 'Pelvis Asimetrisi & Yumeiho Biyomekaniği' : 'Pelvic Asymmetry & Yumeiho Biomechanics'}</span>
                  </div>
                  <p className="text-xs text-[#E6E4DC] leading-relaxed">
                    {activeNode.yumeihoImpact[isTr ? 'tr' : 'en']}
                  </p>
                </div>

                {/* 2. Organ & Autonomic Nerve Correlation */}
                <div className="p-3.5 bg-[#171614] rounded-xl border border-[#2E2C29] space-y-1">
                  <div className="flex items-center gap-1.5 text-xs font-semibold text-[#8B261E]">
                    <ShieldAlert className="w-3.5 h-3.5 text-[#8B261E]" />
                    <span>{isTr ? 'Organ & Otonom Sinir Etkileşimi' : 'Organ & Autonomic Nerve Correlation'}</span>
                  </div>
                  <p className="text-xs text-[#E6E4DC] leading-relaxed font-medium">
                    {activeNode.organCorrelation[isTr ? 'tr' : 'en']}
                  </p>
                </div>

                {/* 3. Posture & Clinical Symptoms */}
                <div className="p-3.5 bg-[#171614] rounded-xl border border-[#2E2C29] space-y-1">
                  <div className="flex items-center gap-1.5 text-xs font-semibold text-[#D4AF37]">
                    <Info className="w-3.5 h-3.5 text-[#D4AF37]" />
                    <span>{isTr ? 'Postür Bozukluğu & Belirtiler' : 'Postural Dysfunction & Symptoms'}</span>
                  </div>
                  <p className="text-xs text-[#A8A29E] leading-relaxed">
                    {activeNode.postureImpact[isTr ? 'tr' : 'en']}
                  </p>
                </div>

              </div>

              {/* Recommended Yumeiho Kata Footer */}
              <div className="pt-2 border-t border-[#2E2C29] flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 bg-[#262422] p-3.5 rounded-xl">
                <div>
                  <span className="text-[10px] font-mono text-[#A8A29E] uppercase block">
                    {isTr ? 'Terapötik Müdahale Katası' : 'Therapeutic Kata Protocol'}
                  </span>
                  <span className="text-xs font-bold text-[#C49B66]">
                    {activeNode.recommendedKata[isTr ? 'tr' : 'en']}
                  </span>
                </div>

                <div className="flex items-center gap-2 text-xs text-[#A8A29E] shrink-0">
                  <Volume2 className="w-3.5 h-3.5 text-[#C49B66]" />
                  <span className="text-[11px] font-mono">{isTr ? '528Hz Ses Terapisi Teşviki' : '528Hz Acoustic Feedback'}</span>
                </div>
              </div>

            </motion.div>
          </AnimatePresence>
        </div>

      </div>

    </div>
  );
};
