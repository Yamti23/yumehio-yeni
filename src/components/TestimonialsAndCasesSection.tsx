import React from 'react';
import { CASE_STUDIES } from '../data/yumeihoData';
import { TrendingUp, UserCheck } from 'lucide-react';
import { SectionHeader } from './SectionHeader';

export const TestimonialsAndCasesSection: React.FC = () => {
  return (
    <section className="py-16 lg:py-24 bg-stone-50 border-b border-stone-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header with Framer Motion scroll entrance */}
        <SectionHeader
          kicker="08. Klinik Vaka Analizleri ve Sonuçlar"
          title={
            <>
              Ölçülebilir Düzelme: <br className="hidden sm:inline" />
              Yumeiho Terapi Danışan Deneyimleri
            </>
          }
          description="Bedenin biyomekanik ağırlık merkezi olan leğen kemiği (pelvis) simetrisine kavuştuğunda omurgadaki fıtık baskısı, skolyoz eğriliği ve kronik ağrılar kalıcı şekilde hafifler."
        />

        {/* 3 Case Study Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
          {CASE_STUDIES.map(cs => (
            <div
              key={cs.id}
              className="bg-white rounded-xl border border-stone-200 p-6 flex flex-col justify-between shadow-sm"
            >
              <div>
                <div className="flex items-center justify-between text-xs text-stone-500 mb-2">
                  <span className="font-semibold text-amber-900">{cs.timeframe}</span>
                  <span className="text-stone-400">Vaka İncelemesi</span>
                </div>

                <h3 className="font-bold text-stone-900 text-base mb-3">
                  {cs.condition}
                </h3>

                <div className="space-y-3 text-xs sm:text-sm text-stone-600 mb-4">
                  <div className="p-2.5 rounded-lg bg-stone-50 border border-stone-100">
                    <strong className="text-stone-900 block mb-0.5 text-xs">Başlangıç Durumu:</strong>
                    {cs.initialState}
                  </div>
                  <div className="p-2.5 rounded-lg bg-stone-50 border border-stone-100">
                    <strong className="text-stone-900 block mb-0.5 text-xs">Uygulanan Terapi:</strong>
                    {cs.treatmentPlan}
                  </div>
                  <div className="p-2.5 rounded-lg bg-emerald-50 border border-emerald-200 text-emerald-950">
                    <strong className="text-emerald-900 block mb-0.5 text-xs">Elde Edilen Sonuç:</strong>
                    {cs.result}
                  </div>
                </div>
              </div>

              <div className="pt-3 border-t border-stone-100 flex items-center justify-between text-xs text-stone-500">
                <span className="font-medium text-stone-700">{cs.patient}</span>
                <span className="text-stone-400">Onaylı Vaka</span>
              </div>
            </div>
          ))}
        </div>

        {/* Quote Strip */}
        <div className="bg-white rounded-2xl border border-stone-200 p-6 sm:p-8 flex flex-col md:flex-row items-center gap-6">
          <div className="w-12 h-12 rounded-full bg-amber-900/10 flex items-center justify-center shrink-0 text-amber-900 font-bold text-lg font-serif">
            湧
          </div>
          <div className="flex-1">
            <p className="text-stone-800 text-sm sm:text-base italic leading-relaxed">
              "Ameliyat önerilen L5-S1 fıtığım ve yürürken aksamama sebep olan bacak kısalığım için Ali Gökmen Düzgün Bey'e başvurdum. İlk seansta pelvisimin açıldığını ve iki bacağımın yere eşit bastığını hissettim. 8 seans sonunda artık hiç ağrım kalmadı."
            </p>
            <p className="text-xs font-semibold text-stone-500 mt-2">
              — M. Çağlar Özkan, Bilgisayar Mühendisi (Kadıköy Kliniği Danışanı)
            </p>
          </div>
        </div>

      </div>
    </section>
  );
};
