import React, { useEffect, useRef, useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Flame, Pause, Play, Sparkles, X, Settings2 } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';
import { zenAudio } from '../utils/audioZen';

interface IncenseAroma {
  id: string;
  name: { tr: string; jp: string; en: string };
  kanji: string;
  colorHex: string;
}

const AROMAS: IncenseAroma[] = [
  { id: 'sandalwood', name: { tr: 'Sandal Ağacı (Byakudan)', jp: '白檀 (Byakudan)', en: 'Sandalwood (Byakudan)' }, kanji: '白檀', colorHex: '210, 180, 140' },
  { id: 'agarwood', name: { tr: 'Öd Ağacı (Kyara)', jp: '沈香・伽羅 (Kyara)', en: 'Agarwood (Kyara)' }, kanji: '沈香', colorHex: '196, 155, 102' },
  { id: 'sakura', name: { tr: 'Kiraz Çiçeği (Sakura)', jp: '桜 (Sakura)', en: 'Cherry Blossom (Sakura)' }, kanji: '桜', colorHex: '235, 180, 195' }
];

interface Particle {
  x: number;
  y: number;
  vx: number;
  vy: number;
  radius: number;
  alpha: number;
  life: number;
  maxLife: number;
  swirlOffset: number;
}

export const DigitalIncense: React.FC = () => {
  const { language } = useLanguage();
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  
  // State from localStorage or defaults
  const [isPaused, setIsPaused] = useState<boolean>(() => {
    if (typeof window !== 'undefined') {
      return localStorage.getItem('yumeiho_incense_paused') === 'true';
    }
    return false;
  });

  const [selectedAroma, setSelectedAroma] = useState<IncenseAroma>(AROMAS[0]);
  const [isOpenMenu, setIsOpenMenu] = useState(false);

  const animationFrameIdRef = useRef<number | null>(null);
  const particlesRef = useRef<Particle[]>([]);

  // Save toggle state
  const handleTogglePause = () => {
    const nextState = !isPaused;
    setIsPaused(nextState);
    if (typeof window !== 'undefined') {
      localStorage.setItem('yumeiho_incense_paused', String(nextState));
    }
    if (!nextState) {
      zenAudio.playZenBowl(528, 1.5);
    }
  };

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    // Fixed canvas internal dimensions for crisp rendering
    const width = 80;
    const height = 160;
    canvas.width = width;
    canvas.height = height;

    let time = 0;

    const render = () => {
      ctx.clearRect(0, 0, width, height);

      // Incense stick tip origin coordinates
      const originX = width / 2;
      const originY = height - 18;

      if (!isPaused) {
        time += 0.03;

        // Spawn new smoke particles
        if (Math.random() < 0.6) {
          particlesRef.current.push({
            x: originX + (Math.random() - 0.5) * 2,
            y: originY,
            vx: (Math.random() - 0.5) * 0.3,
            vy: -0.6 - Math.random() * 0.4,
            radius: 2 + Math.random() * 3,
            alpha: 0.35 + Math.random() * 0.2,
            life: 0,
            maxLife: 100 + Math.random() * 60,
            swirlOffset: Math.random() * 100
          });
        }

        // Update and draw smoke particles
        const rgb = selectedAroma.colorHex;

        particlesRef.current.forEach((p, idx) => {
          p.life++;
          p.y += p.vy;
          
          // Organic sine wave sway (delicate smoke drift)
          p.x += Math.sin(time + p.swirlOffset + p.y * 0.03) * 0.35;
          p.radius += 0.08; // Expand gracefully as it rises
          
          // Soft opacity fade out as life nears maxLife
          const lifeProgress = p.life / p.maxLife;
          const currentAlpha = Math.max(0, p.alpha * (1 - lifeProgress));

          ctx.beginPath();
          ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2);
          ctx.fillStyle = `rgba(${rgb}, ${currentAlpha})`;
          ctx.fill();
        });

        // Filter out dead particles
        particlesRef.current = particlesRef.current.filter(p => p.life < p.maxLife && p.y > 0);
      }

      // Draw Incense Ember Glow Tip
      ctx.beginPath();
      ctx.arc(originX, originY, isPaused ? 1.5 : 2.5, 0, Math.PI * 2);
      ctx.fillStyle = isPaused ? 'rgba(180, 80, 40, 0.4)' : 'rgba(245, 120, 30, 0.95)';
      ctx.shadowColor = 'rgba(255, 140, 40, 0.8)';
      ctx.shadowBlur = isPaused ? 2 : 8;
      ctx.fill();
      ctx.shadowBlur = 0; // Reset

      // Draw Incense Brass Holder & Stick Base
      ctx.beginPath();
      ctx.moveTo(originX, originY + 2);
      ctx.lineTo(originX, height - 4);
      ctx.strokeStyle = '#8C6A3C';
      ctx.lineWidth = 1.5;
      ctx.stroke();

      // Holder Stand Base
      ctx.beginPath();
      ctx.ellipse(originX, height - 4, 10, 3, 0, 0, Math.PI * 2);
      ctx.fillStyle = '#4A3B2C';
      ctx.fill();

      animationFrameIdRef.current = requestAnimationFrame(render);
    };

    render();

    return () => {
      if (animationFrameIdRef.current) {
        cancelAnimationFrame(animationFrameIdRef.current);
      }
    };
  }, [isPaused, selectedAroma]);

  return (
    <div className="fixed top-24 right-4 sm:right-6 z-40 select-none">
      {/* Incense Floating Micro-Interaction Canvas */}
      <div className="relative flex flex-col items-center group">
        <button
          onClick={() => setIsOpenMenu(!isOpenMenu)}
          className="relative p-2 rounded-2xl bg-[#F8F7F4]/90 dark:bg-[#121110]/90 backdrop-blur-md border border-stone-300 dark:border-stone-800 shadow-xl hover:border-amber-600/60 transition-all cursor-pointer flex flex-col items-center group"
          title={language === 'tr' ? 'Dijital Tütsü (線香)' : 'Digital Incense (Senko)'}
        >
          {/* Canvas */}
          <canvas
            ref={canvasRef}
            className="w-12 h-24 pointer-events-none"
          />

          {/* Ember Pulse Tag */}
          <div className="flex items-center space-x-1 mt-1 px-2 py-0.5 rounded-full bg-stone-200/80 dark:bg-stone-800/80 text-[10px] font-mono text-stone-700 dark:text-amber-300">
            <span className={`w-1.5 h-1.5 rounded-full ${isPaused ? 'bg-stone-400' : 'bg-amber-500 animate-ping'}`} />
            <span>{selectedAroma.kanji}</span>
          </div>
        </button>

        {/* Popover Settings Drawer */}
        <AnimatePresence>
          {isOpenMenu && (
            <motion.div
              initial={{ opacity: 0, scale: 0.9, y: 10 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9, y: 10 }}
              className="absolute top-0 right-16 sm:right-20 w-64 p-4 rounded-2xl bg-stone-900 text-stone-100 border border-stone-800 shadow-2xl z-50 text-xs space-y-4"
            >
              <div className="flex items-center justify-between pb-2 border-b border-stone-800">
                <div className="flex items-center space-x-2">
                  <Flame className="w-4 h-4 text-amber-500" />
                  <span className="font-serif font-bold text-sm text-amber-100">
                    {language === 'tr' ? 'Dijital Tütsü (線香)' : 'Digital Incense (Senko)'}
                  </span>
                </div>
                <button
                  onClick={() => setIsOpenMenu(false)}
                  className="p-1 rounded-full hover:bg-stone-800 text-stone-400 hover:text-stone-200"
                >
                  <X className="w-3.5 h-3.5" />
                </button>
              </div>

              {/* Pause Smoke Toggle */}
              <div className="p-3 rounded-xl bg-stone-950/80 border border-stone-800/80 flex items-center justify-between">
                <div>
                  <span className="font-medium text-stone-200 block">
                    {language === 'tr' ? 'Dumanı Durdur' : 'Pause Smoke'}
                  </span>
                  <span className="text-[10px] text-stone-400 block">
                    {isPaused
                      ? (language === 'tr' ? 'Duman duraklatıldı' : 'Smoke is paused')
                      : (language === 'tr' ? 'Akışkan duman aktif' : 'Ethereal smoke active')}
                  </span>
                </div>

                <button
                  onClick={handleTogglePause}
                  className={`p-2 rounded-lg font-mono font-bold text-xs flex items-center space-x-1 transition-colors ${
                    isPaused
                      ? 'bg-amber-600 text-stone-950 hover:bg-amber-500'
                      : 'bg-stone-800 text-stone-300 hover:bg-stone-700'
                  }`}
                >
                  {isPaused ? (
                    <>
                      <Play className="w-3.5 h-3.5 fill-current" />
                      <span>{language === 'tr' ? 'Başlat' : 'Resume'}</span>
                    </>
                  ) : (
                    <>
                      <Pause className="w-3.5 h-3.5 fill-current" />
                      <span>{language === 'tr' ? 'Durdur' : 'Pause'}</span>
                    </>
                  )}
                </button>
              </div>

              {/* Aroma Selector */}
              <div>
                <span className="text-[11px] font-mono text-amber-400 uppercase tracking-wider block mb-2">
                  {language === 'tr' ? 'Aroma Notaları (香)' : 'Aroma Blend (Kō)'}
                </span>
                <div className="space-y-1.5">
                  {AROMAS.map(aroma => {
                    const isSelected = selectedAroma.id === aroma.id;
                    return (
                      <button
                        key={aroma.id}
                        onClick={() => setSelectedAroma(aroma)}
                        className={`w-full p-2 rounded-lg text-left flex items-center justify-between transition-colors ${
                          isSelected
                            ? 'bg-amber-950/60 border border-amber-600/50 text-amber-200'
                            : 'bg-stone-950/40 border border-stone-800 text-stone-400 hover:text-stone-200'
                        }`}
                      >
                        <span className="text-xs">{aroma.name[language]}</span>
                        <span className="font-serif text-amber-400 text-xs font-semibold">{aroma.kanji}</span>
                      </button>
                    );
                  })}
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
};
