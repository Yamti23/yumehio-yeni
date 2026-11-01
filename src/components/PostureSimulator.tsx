import React, { useState } from 'react';
import { Sliders, RotateCcw, Info, ArrowRight, ShieldCheck, Check } from 'lucide-react';
import { zenAudio } from '../utils/audioZen';

interface PostureSimulatorProps {
  onOpenBooking: (tab: 'therapy', prefillNote?: string) => void;
}

export const PostureSimulator: React.FC<PostureSimulatorProps> = ({ onOpenBooking }) => {
  // Alignment progress from 0 (Deformed / Before) to 100 (Fully aligned / After Yumeiho)
  const [alignment, setAlignment] = useState<number>(30);
  const [activeHotspot, setActiveHotspot] = useState<'pelvis' | 'lumbar' | 'cervical' | 'legs'>('pelvis');

  // Interpolated metrics
  const pelvicTiltDeg = ((1 - alignment / 100) * 14).toFixed(1);
  const legDiffMm = Math.round((1 - alignment / 100) * 18);
  const cobbAngle = Math.round(6 + (1 - alignment / 100) * 16);
  const weightLeft = Math.round(50 + (1 - alignment / 100) * 18);
  const weightRight = 100 - weightLeft;

  const handleSliderChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const val = Number(e.target.value);
    setAlignment(val);
    if (val === 100 || val === 0) {
      zenAudio.playZenBowl(528, 1.8);
    }
  };

  const setPreset = (val: number) => {
    setAlignment(val);
    zenAudio.playZenBowl(val > 50 ? 528 : 396, 2.0);
  };

  const hotspots = {
    pelvis: {
      title: 'Pelvis & Sakroiliak Eklem (Kotsuban)',
      status: alignment > 70 ? 'Dengeli ve Kilitlenmiş' : 'Sol Pelvis 14° Yukarı ve Öne Kaymış',
      kata: 'Kata #01-08: Kotsuban Chosei',
      action: 'Leğen kemiği rotasyonunu sıfırlayarak tüm omurganın zeminini eşitler.'
    },
    lumbar: {
      title: 'L4-L5 Lomber ve Disk Basısı',
      status: alignment > 70 ? 'Dekomprese, Faset Eklemler Açık' : 'Tek Taraflı Kompresyon ve Siyatik Baskısı',
      kata: 'Kata #09-24: Seikotsu Shiatsu',
      action: 'Omurga boyunca dikey ritmik basınç ile disklere binen anormal yükü kaldırır.'
    },
    cervical: {
      title: 'Servikal Aks & Atlas (Boyun Hizası)',
      status: alignment > 70 ? 'Doğal Lordoz, Baş Ağırlığı Sıfırlandı' : 'Öne Çıkmış Baş, Trapezius Spazmı',
      kata: 'Kata #43-68: Keitsui Mobilizasyonu',
      action: 'Boyun omurlarını nazikçe esneterek omuz asimetrisini ve gerilim baş ağrısını dindirir.'
    },
    legs: {
      title: 'Bacak Boyu ve Femur Hizalaması',
      status: alignment > 70 ? 'Milimetrik Eşitlik (0 mm Fark)' : 'Sol Bacak 18 mm Fonksiyonel Kısa',
      kata: 'Kata #25-42: Kashi Chosei',
      action: 'Kalça ve diz eklemlerini traksiyonla yerine oturtarak kalıcı bacak boyu eşitliği sağlar.'
    }
  };

  return (
    <div className="bg-[#171614] text-[#F8F7F4] rounded-3xl p-6 sm:p-10 lg:p-12 border border-[#2E2C29] shadow-2xl overflow-hidden my-12">
      
      {/* Top Banner */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 pb-8 border-b border-[#2E2C29]">
        <div>
          <div className="flex items-center gap-2 text-xs uppercase tracking-widest text-[#C49B66] font-semibold mb-2">
            <Sliders className="w-4 h-4" />
            <span>İnteraktif Biyomekanik Simülatör</span>
          </div>
          <h3 className="font-serif-luxury text-2xl sm:text-4xl font-bold tracking-tight text-white">
            Pelvis & Omurga Hizalama Deneyimi
          </h3>
          <p className="text-xs sm:text-sm text-[#A8A29E] mt-2 max-w-xl leading-relaxed">
            Kaydırıcıyı hareket ettirerek leğen kemiğindeki milimetrik bir düzelmenin omurga, bacak boyu ve yerçekimi dağılımında nasıl radikal bir denge sağladığını izleyin.
          </p>
        </div>

        {/* Quick Presets */}
        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={() => setPreset(10)}
            className={`px-3.5 py-1.5 text-xs font-semibold rounded-md border transition-all ${
              alignment < 40 
                ? 'bg-[#8B261E] border-[#8B261E] text-white shadow-xs' 
                : 'border-[#3D3A35] text-[#A8A29E] hover:text-white hover:border-[#57534E]'
            }`}
          >
            Öncesi (Asimetrik)
          </button>
          <button
            type="button"
            onClick={() => setPreset(100)}
            className={`px-3.5 py-1.5 text-xs font-semibold rounded-md border transition-all ${
              alignment > 80 
                ? 'bg-[#C49B66] border-[#C49B66] text-[#171614] shadow-xs' 
                : 'border-[#3D3A35] text-[#A8A29E] hover:text-white hover:border-[#57534E]'
            }`}
          >
            Sonrası (Yumeiho)
          </button>
        </div>
      </div>

      {/* Main Grid: Interactive Canvas + Live Metrics */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 pt-8 items-center">
        
        {/* Left Column: Visual Biomechanical Anatomical Stage */}
        <div className="lg:col-span-7 bg-[#1E1C1A] rounded-2xl border border-[#2E2C29] p-6 relative flex flex-col items-center justify-center min-h-[360px]">
          
          {/* Alignment Status Kicker */}
          <div className="w-full flex items-center justify-between text-xs text-[#A8A29E] mb-4">
            <span className="font-mono uppercase tracking-wider">
              {alignment >= 80 ? 'Hizalama Durumu: Kusursuz Simetri' : 'Hizalama Durumu: Pelvik Subluksasyon'}
            </span>
            <span className="font-mono text-[#C49B66] font-bold">
              %{alignment} Denge
            </span>
          </div>

          {/* SVG Skeleton Simulation with dynamic tilt */}
          <div className="relative w-64 h-72 sm:w-72 sm:h-80 flex items-center justify-center select-none">
            
            {/* Center Reference Plumb Line */}
            <div className="absolute top-2 bottom-2 left-1/2 -translate-x-1/2 w-[1px] bg-red-600/30 border-dashed border-l border-red-500/40 z-0" />
            
            {/* SVG Visual Model */}
            <svg viewBox="0 0 200 240" className="w-full h-full z-10 overflow-visible">
              {/* Head / Cervical */}
              <circle
                cx={100 + (1 - alignment / 100) * 8}
                cy="28"
                r="16"
                fill="none"
                stroke={activeHotspot === 'cervical' ? '#C49B66' : '#E6E4DC'}
                strokeWidth="2.5"
                className="cursor-pointer transition-all duration-300"
                onClick={() => setActiveHotspot('cervical')}
              />
              
              {/* Spine Curved or Straight */}
              <path
                d={`M ${100 + (1 - alignment / 100) * 8} 44 Q ${100 + (1 - alignment / 100) * 20} 95, 100 135`}
                fill="none"
                stroke={activeHotspot === 'lumbar' ? '#C49B66' : '#D4D0C5'}
                strokeWidth="3.5"
                strokeDasharray="4 2"
                className="cursor-pointer transition-all duration-300"
                onClick={() => setActiveHotspot('lumbar')}
              />

              {/* Pelvis Plate with Dynamic Tilt */}
              <g
                transform={`translate(100, 135) rotate(${((1 - alignment / 100) * -12)})`}
                className="cursor-pointer transition-transform duration-300"
                onClick={() => setActiveHotspot('pelvis')}
              >
                {/* Sacrum & Iliac Wings */}
                <ellipse cx="0" cy="0" rx="46" ry="14" fill="#8B261E" fillOpacity="0.25" stroke="#C49B66" strokeWidth="2.5" />
                <circle cx="-32" cy="0" r="4" fill="#C49B66" />
                <circle cx="32" cy="0" r="4" fill="#C49B66" />
                <line x1="-48" y1="0" x2="48" y2="0" stroke="#C49B66" strokeWidth="1.5" />
              </g>

              {/* Legs (Femurs) showing leg length discrepancy */}
              {/* Left Leg */}
              <line
                x1="68"
                y1={135 + (1 - alignment / 100) * -6}
                x2="68"
                y2={220 + (1 - alignment / 100) * -14}
                stroke={activeHotspot === 'legs' ? '#C49B66' : '#A8A29E'}
                strokeWidth="3"
                strokeLinecap="round"
                className="cursor-pointer transition-all duration-300"
                onClick={() => setActiveHotspot('legs')}
              />
              {/* Right Leg */}
              <line
                x1="132"
                y1={135 + (1 - alignment / 100) * 6}
                x2="132"
                y2="220"
                stroke={activeHotspot === 'legs' ? '#C49B66' : '#A8A29E'}
                strokeWidth="3"
                strokeLinecap="round"
                className="cursor-pointer transition-all duration-300"
                onClick={() => setActiveHotspot('legs')}
              />
              
              {/* Floor Balance Level Indicator */}
              <line x1="30" y1="222" x2="170" y2="222" stroke="rgba(255,255,255,0.2)" strokeWidth="1" strokeDasharray="3 3" />
            </svg>
          </div>

          {/* Interactive Range Slider */}
          <div className="w-full mt-4 space-y-2">
            <div className="flex items-center justify-between text-xs font-semibold text-[#A8A29E]">
              <span>Asimetrik Pelvis (Önce)</span>
              <span className="text-[#C49B66]">Yumeiho 100 Kata (Sonra)</span>
            </div>
            <input
              type="range"
              min="0"
              max="100"
              value={alignment}
              onChange={handleSliderChange}
              className="w-full h-2 bg-[#2E2C29] rounded-lg appearance-none cursor-pointer accent-[#C49B66]"
            />
          </div>

        </div>

        {/* Right Column: Real-Time Biomechanical Telemetry & Hotspot Detail */}
        <div className="lg:col-span-5 space-y-6">
          
          {/* 4 Quantitative Telemetry Boxes */}
          <div className="grid grid-cols-2 gap-3">
            <div className="p-4 bg-[#1E1C1A] rounded-xl border border-[#2E2C29]">
              <span className="text-[11px] font-mono text-[#A8A29E] block">Pelvik Eğiklik Açısı</span>
              <span className="text-2xl font-serif-luxury font-bold text-white tabular-nums">
                {pelvicTiltDeg}°
              </span>
              <span className="text-[10px] text-[#A8A29E] block mt-0.5">
                {Number(pelvicTiltDeg) <= 1 ? 'Kusursuz Yatay' : 'Kilitlenmiş Rotasyon'}
              </span>
            </div>

            <div className="p-4 bg-[#1E1C1A] rounded-xl border border-[#2E2C29]">
              <span className="text-[11px] font-mono text-[#A8A29E] block">Bacak Boyu Farkı</span>
              <span className="text-2xl font-serif-luxury font-bold text-white tabular-nums">
                {legDiffMm} mm
              </span>
              <span className="text-[10px] text-[#A8A29E] block mt-0.5">
                {legDiffMm === 0 ? 'Tam Eşitlik' : 'Fonksiyonel Kısalık'}
              </span>
            </div>

            <div className="p-4 bg-[#1E1C1A] rounded-xl border border-[#2E2C29]">
              <span className="text-[11px] font-mono text-[#A8A29E] block">Omurga Cobb Açısı</span>
              <span className="text-2xl font-serif-luxury font-bold text-white tabular-nums">
                {cobbAngle}°
              </span>
              <span className="text-[10px] text-[#A8A29E] block mt-0.5">
                {cobbAngle <= 10 ? 'Normal Fizyolojik Kavis' : 'Skolyozik Kompansasyon'}
              </span>
            </div>

            <div className="p-4 bg-[#1E1C1A] rounded-xl border border-[#2E2C29]">
              <span className="text-[11px] font-mono text-[#A8A29E] block">Yük Dağılımı</span>
              <span className="text-2xl font-serif-luxury font-bold text-white tabular-nums">
                %{weightLeft} / %{weightRight}
              </span>
              <span className="text-[10px] text-[#A8A29E] block mt-0.5">Sol / Sağ Bacak Yükü</span>
            </div>
          </div>

          {/* Active Hotspot Educational Card */}
          <div className="p-5 bg-[#1E1C1A] rounded-2xl border border-[#3D3A35] space-y-3">
            <div className="flex items-center justify-between">
              <span className="text-xs font-mono font-bold text-[#C49B66] uppercase">
                {hotspots[activeHotspot].kata}
              </span>
              <span className="text-xs text-[#A8A29E]">Seçili Bölge</span>
            </div>

            <h4 className="font-serif-luxury font-bold text-lg text-white">
              {hotspots[activeHotspot].title}
            </h4>

            <p className="text-xs text-[#D6D3D1] leading-relaxed">
              <strong>Durum:</strong> {hotspots[activeHotspot].status}
            </p>

            <p className="text-xs text-[#A8A29E] leading-relaxed">
              <strong>Yumeiho Çözümü:</strong> {hotspots[activeHotspot].action}
            </p>
          </div>

          {/* Direct Consultation Action */}
          <div className="pt-2">
            <button
              type="button"
              onClick={() => onOpenBooking('therapy', `Simülatör Analiz Talebi: Bacak Farkı ${legDiffMm}mm, Pelvik Eğiklik ${pelvicTiltDeg}°`)}
              className="w-full py-3.5 px-5 text-xs sm:text-sm font-semibold uppercase tracking-wider text-white bg-[#8B261E] hover:bg-[#A82E25] rounded-xl transition-colors shadow-lg flex items-center justify-center gap-2"
            >
              <span>Ali Bey ile Pelvis Dengeleme Seansı Planla</span>
              <ArrowRight className="w-4 h-4" />
            </button>
            <p className="text-[11px] text-[#A8A29E] text-center mt-2">
              * Klinik seanslarımızda bacak boyu ve pelvis ölçümü manuel palpasyonla birebir teyit edilir.
            </p>
          </div>

        </div>

      </div>

    </div>
  );
};
