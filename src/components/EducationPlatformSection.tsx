import React, { useState, useEffect } from 'react';
import { BookOpen, Wind, Compass, Sparkles, Play, Pause, RotateCcw, CheckCircle2, ArrowRight } from 'lucide-react';
import { EDUCATION_PLATFORM_DATA } from '../data/yumeihoData';
import { zenAudio } from '../utils/audioZen';
import { SectionHeader } from './SectionHeader';

interface EducationPlatformSectionProps {
  onOpenBooking: (tab: 'seminar', seminarTitle?: string) => void;
}

export const EducationPlatformSection: React.FC<EducationPlatformSectionProps> = ({ onOpenBooking }) => {
  const [activeLevelId, setActiveLevelId] = useState<string>('baslangic');
  const [activeTab, setActiveTab] = useState<'curriculum' | 'breathing' | 'principles' | 'meditation' | 'benefits'>('curriculum');

  // Interactive Breathing Guide State
  const [isBreathingActive, setIsBreathingActive] = useState(false);
  const [breathPhase, setBreathPhase] = useState<'inhale' | 'hold' | 'exhale'>('inhale');
  const [breathCounter, setBreathCounter] = useState(4);
  const [cycleCount, setCycleCount] = useState(0);

  useEffect(() => {
    let timer: any = null;
    if (isBreathingActive) {
      timer = setInterval(() => {
        setBreathCounter(prev => {
          if (prev > 1) {
            return prev - 1;
          }
          // Transition phase
          if (breathPhase === 'inhale') {
            setBreathPhase('hold');
            zenAudio.playZenBowl(432, 1.8);
            return 4; // 4s hold
          } else if (breathPhase === 'hold') {
            setBreathPhase('exhale');
            zenAudio.playExhaleSound();
            return 6; // 6s exhale
          } else {
            setBreathPhase('inhale');
            zenAudio.playInhaleSound();
            setCycleCount(c => c + 1);
            return 4; // 4s inhale
          }
        });
      }, 1000);
    }
    return () => clearInterval(timer);
  }, [isBreathingActive, breathPhase]);

  const resetBreathing = () => {
    setIsBreathingActive(false);
    setBreathPhase('inhale');
    setBreathCounter(4);
    setCycleCount(0);
  };

  const currentLevel = EDUCATION_PLATFORM_DATA.levelsCurriculum.find(l => l.levelId === activeLevelId) || EDUCATION_PLATFORM_DATA.levelsCurriculum[0];

  return (
    <section id="egitim-platformu" className="py-16 lg:py-24 bg-stone-50 border-b border-stone-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header with Framer Motion scroll entrance */}
        <SectionHeader
          kicker="03. Yumeiho Dijital Öğrenme & Uygulayıcı Platformu"
          title={
            <>
              Başlangıçtan İleri Düzeye: <br className="hidden sm:inline" />
              Yumeiho Öğrenme Modülleri & Zihin-Beden Pratikleri
            </>
          }
          description="Türkiye Temsilcisi Ali Gökmen Düzgün'ün rehberliğinde yapılandırılan bu eğitim platformu taslağı; teorik temellerden nefes tekniklerine, meditasyon uygulamalarından 100 kata ustalığına kadar eksiksiz bir öğrenme yolculuğu sunar."
        />

        {/* Visual Banner */}
        <div className="relative rounded-2xl overflow-hidden border border-stone-200 shadow-sm mb-12 bg-stone-900 group">
          <img
            src="/src/assets/images/yumeiho_breathing_meditation_1793550394639.jpg"
            alt="Yumeiho Nefes ve Meditasyon Egzersizleri"
            className="w-full h-64 sm:h-80 md:h-96 object-cover opacity-90 group-hover:scale-[1.01] transition-transform duration-700"
            referrerPolicy="no-referrer"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-stone-950 via-stone-950/40 to-transparent pointer-events-none" />
          <div className="absolute bottom-0 left-0 right-0 p-6 sm:p-8 text-white max-w-2xl">
            <span className="text-xs font-serif tracking-widest text-amber-300 uppercase block mb-1">
              Doğu Biyomekaniği ve Kadim Zihin Disiplini
            </span>
            <h3 className="text-xl sm:text-2xl font-bold text-white mb-2">
              Nefes, Beden Dengeleme ve Meditatif Odak
            </h3>
            <p className="text-xs sm:text-sm text-stone-200 leading-relaxed">
              Yumeiho yalnızca ellere dayalı bir teknik değildir. Uygulayıcının nefesi ve zihinsel sakinliği, danışanın omurgasındaki savunma duvarını çözen anahtar güçtür.
            </p>
          </div>
        </div>

        {/* Content Navigation Tabs (Segmented Buttons) */}
        <div className="flex items-center gap-1.5 overflow-x-auto pb-2 mb-8 border-b border-stone-200">
          <button
            type="button"
            onClick={() => setActiveTab('curriculum')}
            className={`px-4 py-2.5 text-xs sm:text-sm font-semibold rounded-lg transition-colors whitespace-nowrap flex items-center gap-2 ${
              activeTab === 'curriculum'
                ? 'bg-stone-900 text-white shadow-sm'
                : 'bg-white text-stone-700 hover:bg-stone-100 border border-stone-200'
            }`}
          >
            <BookOpen className="w-4 h-4 text-amber-400" />
            <span>Seviye Müfredatı (1-4 Seviye)</span>
          </button>

          <button
            type="button"
            onClick={() => setActiveTab('breathing')}
            className={`px-4 py-2.5 text-xs sm:text-sm font-semibold rounded-lg transition-colors whitespace-nowrap flex items-center gap-2 ${
              activeTab === 'breathing'
                ? 'bg-stone-900 text-white shadow-sm'
                : 'bg-white text-stone-700 hover:bg-stone-100 border border-stone-200'
            }`}
          >
            <Wind className="w-4 h-4 text-amber-400" />
            <span>Nefes Teknikleri & İnteraktif Rehber</span>
          </button>

          <button
            type="button"
            onClick={() => setActiveTab('principles')}
            className={`px-4 py-2.5 text-xs sm:text-sm font-semibold rounded-lg transition-colors whitespace-nowrap flex items-center gap-2 ${
              activeTab === 'principles'
                ? 'bg-stone-900 text-white shadow-sm'
                : 'bg-white text-stone-700 hover:bg-stone-100 border border-stone-200'
            }`}
          >
            <Compass className="w-4 h-4 text-amber-400" />
            <span>Temel Prensipler</span>
          </button>

          <button
            type="button"
            onClick={() => setActiveTab('meditation')}
            className={`px-4 py-2.5 text-xs sm:text-sm font-semibold rounded-lg transition-colors whitespace-nowrap flex items-center gap-2 ${
              activeTab === 'meditation'
                ? 'bg-stone-900 text-white shadow-sm'
                : 'bg-white text-stone-700 hover:bg-stone-100 border border-stone-200'
            }`}
          >
            <Sparkles className="w-4 h-4 text-amber-400" />
            <span>Meditasyon Egzersizleri</span>
          </button>

          <button
            type="button"
            onClick={() => setActiveTab('benefits')}
            className={`px-4 py-2.5 text-xs sm:text-sm font-semibold rounded-lg transition-colors whitespace-nowrap flex items-center gap-2 ${
              activeTab === 'benefits'
                ? 'bg-stone-900 text-white shadow-sm'
                : 'bg-white text-stone-700 hover:bg-stone-100 border border-stone-200'
            }`}
          >
            <CheckCircle2 className="w-4 h-4 text-amber-400" />
            <span>Bütünsel Faydalar</span>
          </button>
        </div>

        {/* Tab 1: Curriculum Levels */}
        {activeTab === 'curriculum' && (
          <div className="space-y-6">
            {/* Level switch buttons */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
              {EDUCATION_PLATFORM_DATA.levelsCurriculum.map(lvl => {
                const isSelected = activeLevelId === lvl.levelId;
                return (
                  <button
                    key={lvl.levelId}
                    type="button"
                    onClick={() => setActiveLevelId(lvl.levelId)}
                    className={`p-4 rounded-xl text-left border transition-all ${
                      isSelected
                        ? 'bg-white border-amber-900/60 shadow-md ring-1 ring-amber-900/40'
                        : 'bg-white/80 border-stone-200 hover:bg-white'
                    }`}
                  >
                    <span className="text-[11px] font-bold text-amber-900 uppercase tracking-wider block mb-1">
                      {lvl.levelName.split(':')[0]}
                    </span>
                    <h4 className="font-bold text-stone-900 text-sm">
                      {lvl.levelName.split(':')[1]}
                    </h4>
                  </button>
                );
              })}
            </div>

            {/* Current Level Topics Card */}
            <div className="bg-white rounded-2xl border border-stone-200 p-6 sm:p-8">
              <div className="max-w-2xl mb-6">
                <span className="text-xs font-semibold text-stone-500 uppercase tracking-wider block mb-1">
                  Hedef Kitle: {currentLevel.targetAudience}
                </span>
                <h3 className="text-xl sm:text-2xl font-bold text-stone-900">
                  {currentLevel.levelName}
                </h3>
                <p className="text-stone-600 text-sm mt-2 leading-relaxed">
                  {currentLevel.summary}
                </p>
              </div>

              {/* Topics Grid */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-8">
                {currentLevel.topics.map((tpc, idx) => (
                  <div
                    key={idx}
                    className="p-4 rounded-xl border border-stone-200 bg-stone-50/60 hover:bg-stone-50 transition-colors flex flex-col justify-between"
                  >
                    <div>
                      <div className="flex items-center justify-between text-xs text-stone-500 mb-2">
                        <span className="px-2 py-0.5 rounded text-[11px] font-semibold bg-stone-200 text-stone-800">
                          {tpc.type}
                        </span>
                        <span className="font-mono text-stone-500">{tpc.duration}</span>
                      </div>
                      <h4 className="font-bold text-stone-900 text-sm sm:text-base mb-1">
                        {tpc.title}
                      </h4>
                      <p className="text-xs sm:text-sm text-stone-600 leading-relaxed">
                        {tpc.description}
                      </p>
                    </div>
                  </div>
                ))}
              </div>

              {/* CTA */}
              <div className="pt-4 border-t border-stone-100 flex flex-col sm:flex-row items-center justify-between gap-4">
                <p className="text-xs text-stone-500">
                  * Bu eğitim modülü Türkiye Temsilciliği onaylı Dan sertifikasyon programının parçasıdır.
                </p>
                <button
                  type="button"
                  onClick={() => onOpenBooking('seminar', currentLevel.levelName)}
                  className="px-6 py-2.5 text-xs sm:text-sm font-semibold text-white bg-stone-900 hover:bg-stone-800 rounded-lg transition-colors flex items-center gap-2 shadow-sm"
                >
                  <span>Bu Seviyeye Ön Kayıt Ol</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Tab 2: Breathing Techniques & Live Interactive Guide */}
        {activeTab === 'breathing' && (
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
            
            {/* Left Column: Interactive Breathing Exercise Widget */}
            <div className="lg:col-span-6 bg-white rounded-2xl border border-stone-200 p-6 sm:p-8 flex flex-col justify-between">
              <div>
                <div className="flex items-center justify-between mb-2">
                  <span className="text-xs font-bold text-amber-900 uppercase tracking-wider">
                    İnteraktif Uygulama
                  </span>
                  <span className="text-xs text-stone-500">
                    Tamamlanan Döngü: {cycleCount}
                  </span>
                </div>
                <h3 className="text-xl font-bold text-stone-900 mb-2">
                  Tanden Kokyuu-ho (Canlı Nefes Rehberi)
                </h3>
                <p className="text-xs sm:text-sm text-stone-600 mb-6">
                  Ekrandaki genişleyen halkayı takip ederek alt karnınızdan nefes alıp verin. Vagus sinirini uyararak anında sakinleşin.
                </p>

                {/* Animated Breathing Circle */}
                <div className="py-8 flex flex-col items-center justify-center">
                  <div
                    className={`relative w-44 h-44 sm:w-52 sm:h-52 rounded-full flex flex-col items-center justify-center transition-all duration-1000 ${
                      breathPhase === 'inhale'
                        ? 'scale-110 bg-amber-100/90 border-4 border-amber-800'
                        : breathPhase === 'hold'
                        ? 'scale-110 bg-stone-200/90 border-4 border-stone-600'
                        : 'scale-90 bg-stone-100 border-4 border-stone-300'
                    }`}
                  >
                    <span className="font-serif text-sm font-bold text-amber-900/80 mb-1">
                      {breathPhase === 'inhale' && 'NEFES AL (Burundan)'}
                      {breathPhase === 'hold' && 'NEFESİ TUT (Tanden)'}
                      {breathPhase === 'exhale' && 'YAVAŞÇA VER (Ağızdan)'}
                    </span>
                    <span className="text-4xl sm:text-5xl font-mono font-bold text-stone-900">
                      {breathCounter}
                    </span>
                    <span className="text-[11px] text-stone-500 mt-1">saniye</span>
                  </div>
                </div>
              </div>

              {/* Controls */}
              <div className="pt-6 border-t border-stone-100 flex items-center justify-center gap-3">
                {!isBreathingActive ? (
                  <button
                    type="button"
                    onClick={() => {
                      setIsBreathingActive(true);
                      zenAudio.playInhaleSound();
                    }}
                    className="inline-flex items-center gap-2 px-6 py-3 text-xs sm:text-sm font-semibold uppercase tracking-wider text-white bg-[#171614] hover:bg-[#8B261E] rounded-xl transition-colors shadow-sm"
                  >
                    <Play className="w-4 h-4" />
                    <span>Nefes Egzersizini Başlat</span>
                  </button>
                ) : (
                  <button
                    type="button"
                    onClick={() => setIsBreathingActive(false)}
                    className="inline-flex items-center gap-2 px-6 py-3 text-xs sm:text-sm font-semibold text-stone-900 bg-stone-200 hover:bg-stone-300 rounded-lg transition-colors"
                  >
                    <Pause className="w-4 h-4" />
                    <span>Durdur</span>
                  </button>
                )}
                <button
                  type="button"
                  onClick={resetBreathing}
                  className="p-3 text-stone-500 hover:text-stone-900 rounded-lg border border-stone-200 hover:bg-stone-50 transition-colors"
                  title="Sıfırla"
                >
                  <RotateCcw className="w-4 h-4" />
                </button>
              </div>
            </div>

            {/* Right Column: Breathing Techniques Overview */}
            <div className="lg:col-span-6 space-y-4">
              {EDUCATION_PLATFORM_DATA.breathingTechniques.map((bt, idx) => (
                <div key={idx} className="bg-white rounded-xl border border-stone-200 p-6 space-y-3">
                  <div className="flex items-center justify-between">
                    <h4 className="font-bold text-stone-900 text-base">
                      {bt.name}
                    </h4>
                    <span className="text-xs font-mono font-semibold text-amber-900 bg-amber-50 px-2.5 py-1 rounded">
                      {bt.rhythm}
                    </span>
                  </div>
                  <p className="text-xs sm:text-sm text-stone-700 leading-relaxed">
                    <strong>Uygulama:</strong> {bt.instruction}
                  </p>
                  <div className="p-3 bg-stone-50 rounded-lg text-xs text-stone-600">
                    <strong className="text-stone-800 block mb-0.5">Terapötik Fayda:</strong>
                    {bt.benefit}
                  </div>
                </div>
              ))}

              <div className="p-5 bg-stone-900 text-white rounded-xl">
                <h4 className="text-sm font-bold text-amber-400 mb-1">
                  Ali Gökmen Düzgün'ün Nefes İlkesi:
                </h4>
                <p className="text-xs text-stone-300 leading-relaxed">
                  "Nefes vermeyen bir kas esneyemez; nefes tutan bir eklem açılamaz. Yumeiho terapistinin ustalığı, danışanın nefes ritmiyle tamamen rezonansa girmesinde yatar."
                </p>
              </div>
            </div>

          </div>
        )}

        {/* Tab 3: Core Principles */}
        {activeTab === 'principles' && (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {EDUCATION_PLATFORM_DATA.corePrinciples.map((prin, i) => (
              <div key={i} className="bg-white rounded-xl border border-stone-200 p-6 flex flex-col justify-between shadow-sm">
                <div>
                  <h4 className="font-bold text-stone-900 text-lg mb-2">
                    {prin.title}
                  </h4>
                  <p className="text-stone-600 text-sm leading-relaxed">
                    {prin.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Tab 4: Meditation Exercises */}
        {activeTab === 'meditation' && (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {EDUCATION_PLATFORM_DATA.meditationExercises.map((med, idx) => (
              <div key={idx} className="bg-white rounded-2xl border border-stone-200 p-6 sm:p-8 space-y-4 shadow-sm">
                <div className="flex items-center justify-between text-xs text-stone-500">
                  <span className="font-bold text-amber-900 bg-amber-50 px-2 py-0.5 rounded">
                    {med.stage}
                  </span>
                  <span className="font-mono text-stone-600">{med.duration}</span>
                </div>
                <h4 className="text-xl font-bold text-stone-900">
                  {med.title}
                </h4>
                <p className="text-stone-700 text-sm leading-relaxed">
                  {med.practice}
                </p>
                <div className="pt-2 border-t border-stone-100 text-xs text-stone-500">
                  Terapistin ve danışanın parasempatik zihinsel frekansa geçişini destekler.
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Tab 5: Holistic Benefits */}
        {activeTab === 'benefits' && (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {EDUCATION_PLATFORM_DATA.holisticBenefits.map((ben, idx) => (
              <div key={idx} className="bg-white rounded-xl border border-stone-200 p-6 shadow-sm flex flex-col justify-between">
                <div>
                  <h4 className="font-bold text-stone-900 text-base mb-3 pb-2 border-b border-stone-100">
                    {ben.category}
                  </h4>
                  <ul className="space-y-2">
                    {ben.items.map((item, i) => (
                      <li key={i} className="flex items-start gap-2 text-xs text-stone-700">
                        <CheckCircle2 className="w-4 h-4 text-emerald-700 shrink-0 mt-0.5" />
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            ))}
          </div>
        )}

      </div>
    </section>
  );
};
