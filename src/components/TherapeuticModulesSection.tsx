import React, { useState } from 'react';
import { Brain, Heart, Sparkles, Moon, Check, ArrowRight, ShieldCheck, Activity } from 'lucide-react';
import { THERAPEUTIC_MODULES, TherapeuticModule } from '../data/yumeihoData';
import { SectionHeader } from './SectionHeader';

interface TherapeuticModulesSectionProps {
  onOpenBooking: (tab: 'therapy', prefillNote?: string) => void;
}

export const TherapeuticModulesSection: React.FC<TherapeuticModulesSectionProps> = ({ onOpenBooking }) => {
  const [selectedModule, setSelectedModule] = useState<TherapeuticModule>(THERAPEUTIC_MODULES[0]);

  const getModuleIcon = (category: string) => {
    switch (category) {
      case 'anxiety':
        return <Brain className="w-5 h-5 text-amber-900" />;
      case 'stress':
        return <Activity className="w-5 h-5 text-amber-900" />;
      case 'confidence':
        return <Sparkles className="w-5 h-5 text-amber-900" />;
      case 'sleep':
        return <Moon className="w-5 h-5 text-amber-900" />;
      default:
        return <Heart className="w-5 h-5 text-amber-900" />;
    }
  };

  return (
    <section id="terapotik-moduller" className="py-16 lg:py-24 bg-white border-b border-stone-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header with Framer Motion scroll entrance */}
        <SectionHeader
          kicker="02. Psikosomatik ve Zihin-Beden Dengesi"
          title={
            <>
              Yumeiho'nun Terapötik Gücü: <br className="hidden sm:inline" />
              Anksiyete, Kronik Stres ve Özgüven Modülleri
            </>
          }
          description="Yumeiho yalnızca eklemleri hizalayan mekanik bir uygulama değildir; otonom sinir sistemindeki aşırı yükü boşaltan, vagus sinirini aktive eden ve bedensel duruş üzerinden psikolojik gücü uyandıran derin bir terapötik sanattır."
        />

        {/* Visual Showcase Card with Somatic Therapy photo */}
        <div className="relative rounded-2xl overflow-hidden border border-stone-200 shadow-sm mb-12 bg-stone-900 group">
          <img
            src="/src/assets/images/yumeiho_stress_therapy_1793550395104.jpg"
            alt="Yumeiho Terapötik Stres ve Anksiyete Seansı"
            className="w-full h-64 sm:h-80 md:h-96 object-cover opacity-90 group-hover:scale-[1.01] transition-transform duration-700"
            referrerPolicy="no-referrer"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-stone-950 via-stone-950/40 to-transparent pointer-events-none" />
          <div className="absolute bottom-0 left-0 right-0 p-6 sm:p-8 text-white max-w-2xl">
            <span className="text-xs font-serif tracking-widest text-amber-300 uppercase block mb-1">
              Somatik Sinir Sistemi Restorasyonu
            </span>
            <h3 className="text-xl sm:text-2xl font-bold text-white mb-2">
              Beden Kasıldığında Zihin Rahatlayamaz
            </h3>
            <p className="text-xs sm:text-sm text-stone-200 leading-relaxed">
              Ali Gökmen Düzgün'ün geliştirdiği özel terapötik protokoller; leğen kemiği ve sakroiliak eklemdeki stres kilitlerini açarak kronik kaygı ve tükenmişliği bedensel kökünden çözer.
            </p>
          </div>
        </div>

        {/* Module Selection Tabs (Segmented Buttons) */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 mb-8">
          {THERAPEUTIC_MODULES.map(mod => {
            const isSelected = selectedModule.id === mod.id;
            return (
              <button
                key={mod.id}
                type="button"
                onClick={() => setSelectedModule(mod)}
                className={`p-4 rounded-xl text-left border transition-all flex flex-col justify-between ${
                  isSelected
                    ? 'bg-stone-900 text-white border-stone-900 shadow-sm'
                    : 'bg-stone-50 text-stone-800 border-stone-200 hover:bg-stone-100'
                }`}
              >
                <div>
                  <div className="flex items-center justify-between mb-2">
                    <span className={isSelected ? 'text-amber-400' : 'text-amber-900'}>
                      {getModuleIcon(mod.category)}
                    </span>
                    <span className={`text-[11px] font-semibold uppercase tracking-wider ${isSelected ? 'text-stone-300' : 'text-stone-500'}`}>
                      Özel Modül
                    </span>
                  </div>
                  <h4 className="font-bold text-sm sm:text-base leading-snug">
                    {mod.title}
                  </h4>
                </div>
                <p className={`text-xs mt-3 line-clamp-2 ${isSelected ? 'text-stone-300' : 'text-stone-600'}`}>
                  {mod.tagline}
                </p>
              </button>
            );
          })}
        </div>

        {/* Selected Module Detail Canvas */}
        <div className="bg-stone-50 rounded-2xl border border-stone-200 p-6 sm:p-8 lg:p-10">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
            
            {/* Left Column: Description & Mechanism */}
            <div className="lg:col-span-7 space-y-6">
              <div>
                <span className="text-xs font-bold text-amber-900 uppercase tracking-widest block mb-1">
                  {selectedModule.subtitle}
                </span>
                <h3 className="text-2xl sm:text-3xl font-bold text-stone-900">
                  {selectedModule.title}
                </h3>
                <p className="text-stone-700 text-sm sm:text-base leading-relaxed mt-4">
                  {selectedModule.description}
                </p>
              </div>

              {/* Anatomical Mechanism Box */}
              <div className="p-4 bg-white rounded-xl border border-stone-200 text-xs sm:text-sm text-stone-700">
                <strong className="text-stone-900 block mb-1 font-semibold flex items-center gap-1.5">
                  <Activity className="w-4 h-4 text-amber-900" />
                  Biyomekanik & Nörolojik Etki Mekanizması:
                </strong>
                {selectedModule.anatomicalMechanism}
              </div>

              {/* Targets List */}
              <div className="space-y-3">
                <p className="text-xs font-bold uppercase tracking-wider text-stone-600">
                  Bu Terapi Modülünün Somut Hedefleri:
                </p>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                  {selectedModule.targets.map((tgt, i) => (
                    <div key={i} className="flex items-start gap-2 text-xs sm:text-sm text-stone-800">
                      <Check className="w-4 h-4 text-emerald-700 shrink-0 mt-0.5" />
                      <span>{tgt}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Right Column: Protocol Steps & Booking Action */}
            <div className="lg:col-span-5 bg-white rounded-xl border border-stone-200 p-6 space-y-5">
              <div>
                <h4 className="text-sm font-bold uppercase tracking-wider text-stone-900 mb-3">
                  Seans İçi Terapi Protokolü
                </h4>
                <div className="space-y-2.5">
                  {selectedModule.protocolSteps.map((step, idx) => (
                    <div key={idx} className="p-2.5 rounded-lg bg-stone-50 border border-stone-100 text-xs text-stone-700">
                      {step}
                    </div>
                  ))}
                </div>
              </div>

              <div className="p-3.5 bg-amber-50/70 rounded-xl border border-amber-200/60 text-xs text-amber-950">
                <strong className="block mb-1 font-semibold text-amber-900">Danışana Özel Ev Pratiği:</strong>
                {selectedModule.homePractice}
              </div>

              <div className="pt-2">
                <button
                  type="button"
                  onClick={() => onOpenBooking('therapy', `Talep Edilen Terapi Modülü: ${selectedModule.title}`)}
                  className="w-full py-3.5 px-4 text-xs sm:text-sm font-semibold text-white bg-stone-900 hover:bg-stone-800 rounded-lg transition-colors flex items-center justify-center gap-2 shadow-sm"
                >
                  <span>Bu Modül İçin Seans Randevusu Al</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
                <p className="text-[11px] text-stone-500 text-center mt-2">
                  * Seanslar Türkiye Temsilcisi Ali Gökmen Düzgün tarafından birebir yürütülür.
                </p>
              </div>

            </div>

          </div>
        </div>

      </div>
    </section>
  );
};
