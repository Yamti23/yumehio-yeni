import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Play, Pause, RotateCcw, Volume2, VolumeX, Sparkles, Wind, Activity } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';
import { zenAudio } from '../utils/audioZen';

type BreathPhase = 'inhale' | 'holdIn' | 'exhale' | 'holdOut';

interface Pattern {
  id: string;
  name: { tr: string; jp: string; en: string };
  desc: { tr: string; jp: string; en: string };
  freq: number; // 432Hz or 528Hz
  durations: {
    inhale: number; // seconds
    holdIn: number;
    exhale: number;
    holdOut: number;
  };
  benefits: { tr: string; jp: string; en: string };
}

const PATTERNS: Pattern[] = [
  {
    id: 'zen-432',
    name: { tr: '432Hz Zen Pelvik Uyum', jp: '432Hz 禅 骨盤・自律神経調和', en: '432Hz Zen Pelvic Alignment' },
    desc: { tr: 'Derin vagus siniri uyarımı ve pelvis kas tonusu gevşemesi', jp: '迷走神経の深部刺激と骨盤底筋群の緊張緩和', en: 'Deep vagus nerve stimulation & pelvic tone release' },
    freq: 432,
    durations: { inhale: 4, holdIn: 4, exhale: 6, holdOut: 2 },
    benefits: { tr: 'Sempatik sinir yükünü %35 azaltır, bel bölgesinde stresi nötrler.', jp: '交感神経の負荷を35%削減し、腰部のストレスを沈静化。', en: 'Reduces sympathetic load by 35% and neutralizes lumbar stress.' }
  },
  {
    id: 'somatic-528',
    name: { tr: '528Hz Somatik Hücresel Onarım', jp: '528Hz 身体・筋膜細胞更新呼吸', en: '528Hz Somatic Cellular Renewal' },
    desc: { tr: 'Diyafram dekompresyonu ve 528Hz harmonik rezonans', jp: '横隔膜の減圧と528Hzハーモニック共鳴効果', en: 'Diaphragmatic decompression & 528Hz harmonic resonance' },
    freq: 528,
    durations: { inhale: 5, holdIn: 2, exhale: 7, holdOut: 2 },
    benefits: { tr: 'Otonom dengeyi hızlandırır, omurga etrafı kas fasyasını esnetir.', jp: '自律神経の平衡を促進し、脊柱周囲の筋膜を活性化。', en: 'Accelerates autonomic balance and hydrates spinal fascia.' }
  },
  {
    id: 'box-parasympathetic',
    name: { tr: 'Kutu Nefesi (Box Breathing)', jp: 'ボックス呼吸（副交感神経呼吸）', en: 'Box Breathing (Parasympathetic)' },
    desc: { tr: 'Eşit zamanlı 4-4-4-4 ritim ile zihinsel berraklık ve odaklanma', jp: '4-4-4-4 規則的リズムによる精神清涼と姿勢意識の向上', en: 'Equal 4-4-4-4 rhythm for acute calm & high posture clarity' },
    freq: 432,
    durations: { inhale: 4, holdIn: 4, exhale: 4, holdOut: 4 },
    benefits: { tr: 'Anksiyete ve omurga kas sertliğini anında sakinleştirir.', jp: '不安感と脊柱周囲筋の硬直を即座に和らげる。', en: 'Instantly calms anxiety and alleviates spinal rigidity.' }
  }
];

export const SomaticBreathingPlayer: React.FC = () => {
  const { language } = useLanguage();
  const [selectedPattern, setSelectedPattern] = useState<Pattern>(PATTERNS[0]);
  const [isActive, setIsActive] = useState(false);
  const [phase, setPhase] = useState<BreathPhase>('inhale');
  const [phaseProgress, setPhaseProgress] = useState(0); // 0 to 100%
  const [isMuted, setIsMuted] = useState(false);
  const [completedCycles, setCompletedCycles] = useState(0);

  const timerRef = useRef<NodeJS.Timeout | null>(null);
  const startTimeRef = useRef<number>(0);

  const currentDurations = selectedPattern.durations;

  useEffect(() => {
    if (!isActive) {
      if (timerRef.current) clearInterval(timerRef.current);
      setPhase('inhale');
      setPhaseProgress(0);
      return;
    }

    startTimeRef.current = Date.now();
    let currentPhase: BreathPhase = 'inhale';
    setPhase('inhale');

    // Trigger initial sound if audio enabled
    if (!isMuted) {
      zenAudio.playZenBowl(selectedPattern.freq, 3.5);
    }

    const interval = setInterval(() => {
      const now = Date.now();
      const elapsedSec = (now - startTimeRef.current) / 1000;
      const targetDuration = currentDurations[currentPhase];

      if (elapsedSec >= targetDuration) {
        // Transition to next phase
        startTimeRef.current = Date.now();
        if (currentPhase === 'inhale') {
          currentPhase = 'holdIn';
        } else if (currentPhase === 'holdIn') {
          currentPhase = 'exhale';
          if (!isMuted) zenAudio.playExhaleSound();
        } else if (currentPhase === 'exhale') {
          currentPhase = 'holdOut';
        } else {
          currentPhase = 'inhale';
          setCompletedCycles(c => c + 1);
          if (!isMuted) zenAudio.playInhaleSound();
        }
        setPhase(currentPhase);
        setPhaseProgress(0);
      } else {
        setPhaseProgress((elapsedSec / targetDuration) * 100);
      }
    }, 50);

    timerRef.current = interval;

    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
    };
  }, [isActive, selectedPattern, isMuted, currentDurations]);

  const handleTogglePlay = () => {
    if (!isActive) {
      setIsActive(true);
    } else {
      setIsActive(false);
    }
  };

  const handleReset = () => {
    setIsActive(false);
    setPhase('inhale');
    setPhaseProgress(0);
    setCompletedCycles(0);
  };

  const getPhaseLabel = (p: BreathPhase) => {
    const labels = {
      inhale: { tr: 'Nefes Al (Yavaşça)', jp: '息を吸う（ゆっくり）', en: 'Inhale Slowly' },
      holdIn: { tr: 'Tut & Odaklan', jp: '息を止める・集中', en: 'Hold & Focus' },
      exhale: { tr: 'Nefes Ver (Serbest Bırak)', jp: '息を吐く（力を抜く）', en: 'Exhale & Release' },
      holdOut: { tr: 'Boşlukta Kal (Dinlen)', jp: '静寂（リラックス）', en: 'Pause & Rest' }
    };
    return labels[p][language];
  };

  // Dynamic scale calculation for animation
  let circleScale = 1;
  if (phase === 'inhale') {
    circleScale = 1 + (phaseProgress / 100) * 0.45; // 1.0 -> 1.45
  } else if (phase === 'holdIn') {
    circleScale = 1.45;
  } else if (phase === 'exhale') {
    circleScale = 1.45 - (phaseProgress / 100) * 0.45; // 1.45 -> 1.0
  } else {
    circleScale = 1.0;
  }

  return (
    <section className="py-24 bg-stone-950 text-stone-100 relative overflow-hidden dark:bg-stone-950">
      {/* Zen Background Kanji & Glow */}
      <div className="absolute inset-0 opacity-5 pointer-events-none flex items-center justify-center select-none">
        <span className="font-serif text-[28rem] text-amber-100">息</span>
      </div>

      <div className="absolute -top-32 left-1/2 -translate-x-1/2 w-96 h-96 bg-amber-900/20 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="text-center max-w-3xl mx-auto mb-14">
          <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full bg-amber-900/30 text-amber-300 border border-amber-800/40 text-xs tracking-wider uppercase mb-4">
            <Wind className="w-3.5 h-3.5" />
            <span>{language === 'tr' ? 'Somatik Zen Nefesi & Harmonik Ses' : 'Somatic Zen Breathing & Harmonics'}</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-serif tracking-tight text-amber-50">
            {language === 'tr' ? '432Hz / 528Hz Somatik Otonom Regülasyon' : '432Hz / 528Hz Somatic Autonomic Regulation'}
          </h2>
          <p className="mt-4 text-stone-400 text-sm sm:text-base">
            {language === 'tr'
              ? 'Yumeiho seansı öncesi veya sonrası pelvis fasyasını gevşetmek ve sempatik stresi nötrlemek için tasarlanmış kılavuzlu nefes visualizerı.'
              : 'A guided somatic breathing visualizer designed to loosen pelvic fascia and release sympathetic stress before or after a Yumeiho session.'}
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          {/* Pattern Selector Cards */}
          <div className="lg:col-span-5 space-y-4">
            <h3 className="text-xs uppercase tracking-widest text-amber-400 font-semibold mb-2">
              {language === 'tr' ? 'Nefes & Frekans Protokolü Seçin' : 'Select Breath & Frequency Protocol'}
            </h3>
            {PATTERNS.map(p => {
              const isSelected = selectedPattern.id === p.id;
              return (
                <button
                  key={p.id}
                  onClick={() => {
                    setSelectedPattern(p);
                    handleReset();
                  }}
                  className={`w-full text-left p-5 rounded-xl transition-all duration-300 border ${
                    isSelected
                      ? 'bg-amber-950/40 border-amber-500/60 shadow-lg shadow-amber-900/20 text-white'
                      : 'bg-stone-900/60 border-stone-800 text-stone-400 hover:border-stone-700 hover:text-stone-200'
                  }`}
                >
                  <div className="flex items-center justify-between">
                    <span className="font-medium text-base text-amber-100">{p.name[language]}</span>
                    <span className="px-2.5 py-0.5 rounded text-xs font-mono bg-amber-900/40 text-amber-300 border border-amber-700/50">
                      {p.freq}Hz
                    </span>
                  </div>
                  <p className="text-xs text-stone-400 mt-2 leading-relaxed">{p.desc[language]}</p>
                  <div className="mt-3 text-[11px] text-amber-400/90 flex items-center space-x-1.5">
                    <Sparkles className="w-3 h-3 flex-shrink-0" />
                    <span>{p.benefits[language]}</span>
                  </div>
                </button>
              );
            })}

            <div className="p-4 rounded-xl bg-stone-900/40 border border-stone-800/80 text-xs text-stone-400 flex items-center justify-between">
              <div className="flex items-center space-x-2">
                <Activity className="w-4 h-4 text-amber-400" />
                <span>{language === 'tr' ? 'Tamamlanan Somatik Döngü:' : 'Completed Somatic Cycles:'}</span>
              </div>
              <span className="font-mono text-base text-amber-300 font-bold">{completedCycles}</span>
            </div>
          </div>

          {/* Interactive Breath Ring & Visualizer */}
          <div className="lg:col-span-7 flex flex-col items-center justify-center bg-stone-900/50 p-8 sm:p-12 rounded-2xl border border-stone-800/80 relative">
            {/* Visualizer Circle */}
            <div className="relative w-64 h-64 sm:w-80 sm:h-80 flex items-center justify-center my-6">
              {/* Outer Pulsing Aura Ring */}
              <motion.div
                animate={{ scale: circleScale }}
                transition={{ ease: 'easeInOut', duration: 0.1 }}
                className="absolute inset-0 rounded-full border-2 border-amber-500/30 bg-gradient-to-br from-amber-500/10 via-amber-900/5 to-transparent blur-sm"
              />

              {/* Main Animated Circle */}
              <motion.div
                animate={{ scale: circleScale }}
                transition={{ ease: 'easeInOut', duration: 0.1 }}
                className="w-48 h-48 sm:w-60 sm:h-60 rounded-full bg-gradient-to-br from-amber-800/40 to-stone-900 border border-amber-500/50 shadow-2xl flex flex-col items-center justify-center text-center p-6 relative overflow-hidden"
              >
                {/* Subtle Ripple Overlay */}
                <div className="absolute inset-0 bg-radial from-amber-400/10 to-transparent pointer-events-none" />

                <span className="text-xs uppercase tracking-widest text-amber-400 font-semibold mb-1">
                  {selectedPattern.freq}Hz
                </span>
                <span className="text-lg sm:text-xl font-serif text-amber-100 font-medium tracking-wide">
                  {getPhaseLabel(phase)}
                </span>

                {isActive && (
                  <span className="mt-2 text-xs font-mono text-amber-300/80">
                    {Math.round(phaseProgress)}%
                  </span>
                )}
              </motion.div>
            </div>

            {/* Controls Bar */}
            <div className="flex items-center space-x-4 mt-6">
              <button
                onClick={handleTogglePlay}
                className="px-6 py-3 rounded-full bg-amber-600 hover:bg-amber-500 text-stone-950 font-medium text-sm flex items-center space-x-2 transition-transform active:scale-95 shadow-lg shadow-amber-900/40"
              >
                {isActive ? (
                  <>
                    <Pause className="w-4 h-4 fill-current" />
                    <span>{language === 'tr' ? 'Duraklat' : 'Pause'}</span>
                  </>
                ) : (
                  <>
                    <Play className="w-4 h-4 fill-current ml-0.5" />
                    <span>{language === 'tr' ? 'Nefes Egzersizini Başlat' : 'Start Somatic Session'}</span>
                  </>
                )}
              </button>

              <button
                onClick={handleReset}
                title={language === 'tr' ? 'Sıfırla' : 'Reset'}
                className="p-3 rounded-full bg-stone-800 hover:bg-stone-700 text-stone-300 transition-colors"
              >
                <RotateCcw className="w-4 h-4" />
              </button>

              <button
                onClick={() => setIsMuted(!isMuted)}
                title={isMuted ? 'Sesi Aç' : 'Sesi Kapat'}
                className="p-3 rounded-full bg-stone-800 hover:bg-stone-700 text-stone-300 transition-colors"
              >
                {isMuted ? <VolumeX className="w-4 h-4" /> : <Volume2 className="w-4 h-4 text-amber-400" />}
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
