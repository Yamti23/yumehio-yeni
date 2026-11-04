import React, { useRef, useEffect, useState } from 'react';
import { motion } from 'motion/react';
import { Sparkles, RefreshCw, Volume2, Info, Compass } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';
import { zenAudio } from '../utils/audioZen';

interface ZenStone {
  x: number;
  y: number;
  r: number;
  type: number;
}

export const DigitalZenGarden: React.FC = () => {
  const { language } = useLanguage();
  const isTr = language === 'tr';
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const [stones, setStones] = useState<ZenStone[]>([
    { x: 180, y: 120, r: 24, type: 0 },
    { x: 480, y: 180, r: 32, type: 1 },
    { x: 720, y: 110, r: 20, type: 2 }
  ]);
  const isDrawing = useRef(false);
  const lastPoint = useRef<{ x: number; y: number } | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    // Set canvas dimensions
    const rect = canvas.parentElement?.getBoundingClientRect();
    if (rect) {
      canvas.width = rect.width;
      canvas.height = 320;
    }

    drawGarden(ctx, canvas.width, canvas.height, stones);
  }, [stones]);

  const drawGarden = (
    ctx: CanvasRenderingContext2D,
    width: number,
    height: number,
    currentStones: ZenStone[]
  ) => {
    // Fill base sand background
    const isDark = document.documentElement.classList.contains('dark');
    ctx.fillStyle = isDark ? '#1C1A18' : '#F5F3ED';
    ctx.fillRect(0, 0, width, height);

    // Draw background concentric rake lines
    ctx.strokeStyle = isDark ? 'rgba(255,255,255,0.04)' : 'rgba(23,22,20,0.05)';
    ctx.lineWidth = 1.5;

    for (let y = 15; y < height; y += 14) {
      ctx.beginPath();
      ctx.moveTo(0, y);
      ctx.lineTo(width, y);
      ctx.stroke();
    }

    // Draw zen stones with soft shadows
    currentStones.forEach((stone) => {
      // Sand ripple ring around stone
      for (let ring = stone.r + 8; ring <= stone.r + 28; ring += 8) {
        ctx.beginPath();
        ctx.arc(stone.x, stone.y, ring, 0, Math.PI * 2);
        ctx.strokeStyle = isDark ? 'rgba(196,155,102,0.12)' : 'rgba(139,38,30,0.1)';
        ctx.lineWidth = 1;
        ctx.stroke();
      }

      // Stone shadow
      ctx.beginPath();
      ctx.ellipse(stone.x + 4, stone.y + 6, stone.r * 1.1, stone.r * 0.7, Math.PI / 6, 0, Math.PI * 2);
      ctx.fillStyle = isDark ? 'rgba(0,0,0,0.5)' : 'rgba(0,0,0,0.15)';
      ctx.fill();

      // Stone body gradient
      const grad = ctx.createRadialGradient(
        stone.x - stone.r * 0.3,
        stone.y - stone.r * 0.3,
        stone.r * 0.2,
        stone.x,
        stone.y,
        stone.r
      );
      if (stone.type === 0) {
        grad.addColorStop(0, '#57534E');
        grad.addColorStop(1, '#292524');
      } else if (stone.type === 1) {
        grad.addColorStop(0, '#78716C');
        grad.addColorStop(1, '#44403C');
      } else {
        grad.addColorStop(0, '#A8A29E');
        grad.addColorStop(1, '#57534E');
      }

      ctx.beginPath();
      ctx.arc(stone.x, stone.y, stone.r, 0, Math.PI * 2);
      ctx.fillStyle = grad;
      ctx.fill();
      ctx.strokeStyle = isDark ? '#3D3A35' : '#D8D6D0';
      ctx.lineWidth = 1.5;
      ctx.stroke();
    });
  };

  const drawRakeLine = (x: number, y: number) => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    if (lastPoint.current) {
      const isDark = document.documentElement.classList.contains('dark');
      ctx.strokeStyle = isDark ? 'rgba(196,155,102,0.4)' : 'rgba(139,38,30,0.35)';
      ctx.lineWidth = 6;
      ctx.lineCap = 'round';
      ctx.lineJoin = 'round';

      ctx.beginPath();
      ctx.moveTo(lastPoint.current.x, lastPoint.current.y);
      ctx.lineTo(x, y);
      ctx.stroke();

      // Parallel rake lines
      for (const offset of [-8, 8]) {
        ctx.beginPath();
        ctx.moveTo(lastPoint.current.x + offset, lastPoint.current.y + offset);
        ctx.lineTo(x + offset, y + offset);
        ctx.strokeStyle = isDark ? 'rgba(255,255,255,0.08)' : 'rgba(23,22,20,0.08)';
        ctx.lineWidth = 2;
        ctx.stroke();
      }
    }
    lastPoint.current = { x, y };
  };

  const handleMouseDown = (e: React.MouseEvent<HTMLCanvasElement>) => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const rect = canvas.getBoundingClientRect();
    isDrawing.current = true;
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    lastPoint.current = { x, y };
    zenAudio.playZenBowl(528, 0.3);
  };

  const handleMouseMove = (e: React.MouseEvent<HTMLCanvasElement>) => {
    if (!isDrawing.current) return;
    const canvas = canvasRef.current;
    if (!canvas) return;
    const rect = canvas.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    drawRakeLine(x, y);
  };

  const handleMouseUp = () => {
    isDrawing.current = false;
    lastPoint.current = null;
  };

  const handleCanvasClick = (e: React.MouseEvent<HTMLCanvasElement>) => {
    // Double click to add a stone
    if (e.detail === 2) {
      const canvas = canvasRef.current;
      if (!canvas) return;
      const rect = canvas.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      setStones((prev) => [
        ...prev.slice(-4),
        { x, y, r: Math.floor(Math.random() * 14) + 18, type: Math.floor(Math.random() * 3) }
      ]);
      zenAudio.playZenBowl(432, 0.6);
    }
  };

  const handleReset = () => {
    setStones([
      { x: 180, y: 120, r: 24, type: 0 },
      { x: 480, y: 180, r: 32, type: 1 },
      { x: 720, y: 110, r: 20, type: 2 }
    ]);
    zenAudio.playZenBowl(396, 0.8);
  };

  return (
    <section className="py-16 bg-stone-100 dark:bg-[#121110] border-b border-stone-200 dark:border-[#2E2C29] transition-colors duration-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-6">
          <div>
            <div className="flex items-center gap-2 text-xs font-mono uppercase tracking-widest text-amber-900 dark:text-[#C49B66] mb-1">
              <Sparkles className="w-4 h-4" />
              <span>{isTr ? 'Dijital Somatik Meditasyon' : 'Digital Somatic Grounding'}</span>
            </div>
            <h3 className="font-serif-luxury text-2xl sm:text-3xl font-bold text-stone-900 dark:text-[#F8F7F4]">
              {isTr ? 'Dijital Zen Kum Bahçesi (枯山水 - Karesansui)' : 'Digital Zen Sand Garden (Karesansui)'}
            </h3>
            <p className="text-xs sm:text-sm text-stone-600 dark:text-[#A8A29E] mt-1 max-w-xl">
              {isTr
                ? 'Zihninizi dinlendirmek için fareyi veya parmağınızı kum üzerinde sürükleyerek tırmık izleri çizin. Çift tıklayarak yeni zen kayaları ekleyin.'
                : 'Drag across the sand canvas to rake tranquil zen patterns. Double-click to place stones.'}
            </p>
          </div>

          <div className="flex items-center gap-3">
            <button
              type="button"
              onClick={handleReset}
              className="inline-flex items-center gap-1.5 px-3.5 py-2 text-xs font-semibold rounded-xl border border-stone-300 dark:border-[#3D3A35] bg-white dark:bg-[#1E1C1A] text-stone-700 dark:text-[#D6D3D1] hover:text-stone-900 dark:hover:text-white transition-colors"
            >
              <RefreshCw className="w-3.5 h-3.5 text-amber-900 dark:text-[#C49B66]" />
              <span>{isTr ? 'Bahçeyi Sıfırla' : 'Reset Sand'}</span>
            </button>
          </div>
        </div>

        {/* Interactive Canvas Stage */}
        <div className="relative rounded-3xl overflow-hidden border border-stone-300 dark:border-[#2E2C29] shadow-xl bg-white dark:bg-[#1C1A18]">
          <canvas
            ref={canvasRef}
            onMouseDown={handleMouseDown}
            onMouseMove={handleMouseMove}
            onMouseUp={handleMouseUp}
            onMouseLeave={handleMouseUp}
            onClick={handleCanvasClick}
            className="w-full h-80 cursor-crosshair touch-none select-none block"
          />

          {/* Overlay Helper Bar */}
          <div className="absolute bottom-3 left-4 right-4 flex items-center justify-between text-[11px] text-stone-500 dark:text-[#A8A29E] bg-white/80 dark:bg-[#171614]/80 backdrop-blur-md px-3.5 py-1.5 rounded-xl border border-stone-200 dark:border-[#2E2C29]">
            <div className="flex items-center gap-2">
              <Compass className="w-3.5 h-3.5 text-amber-900 dark:text-[#C49B66]" />
              <span>{isTr ? 'Fare ile sürükle = Tırmık Çiz | Çift tık = Taş Ekle' : 'Drag = Rake Sand | Double Click = Place Stone'}</span>
            </div>
            <span className="font-mono text-amber-900 dark:text-[#C49B66] font-bold">528Hz Acoustic Feedback</span>
          </div>
        </div>

      </div>
    </section>
  );
};
