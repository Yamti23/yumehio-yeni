import React, { useState } from 'react';
import { Activity, Check, RefreshCw, ArrowRight } from 'lucide-react';
import { PostureSimulator } from './PostureSimulator';
import { SectionHeader } from './SectionHeader';
import { SpineVertebraeInteractiveModel } from './SpineVertebraeInteractiveModel';

interface PelvisTheorySectionProps {
  onOpenBooking: (tab: 'therapy', prefillNote?: string) => void;
}

interface SymptomOption {
  id: string;
  label: string;
  category: string;
  biomechanicImpact: string;
}

const SYMPTOMS: SymptomOption[] = [
  {
    id: 'shoulder_asymmetry',
    label: 'Aynaya baktığımda bir omuzum diğerinden daha yüksekte duruyor',
    category: 'Üst Gövde Asimetrisi',
    biomechanicImpact: 'Pelvis rotasyonuna bağlı omurganın C veya S şeklinde kompansasyon eğriliği (Fonksiyonel Skolyoz).'
  },
  {
    id: 'leg_length',
    label: 'Pantolon paçalarım eşit durmuyor veya ayakkabımın tek tarafı daha çabuk aşınıyor',
    category: 'Pelvik Eğiklik',
    biomechanicImpact: 'Leğen kemiğinin tek taraflı anterior/posterior kayması sonucu fonksiyonel bacak boyu eşitsizliği.'
  },
  {
    id: 'lumbar_sciatica',
    label: 'Belimde kilitlenme, kalçadan bacağıma inen sızlama veya batma hissi var',
    category: 'Sakroiliak & Disk Basısı',
    biomechanicImpact: 'Sakroiliak eklem subluksasyonu ve piriformis kas spazmının siyatik sinirine yaptığı kompresyon.'
  },
  {
    id: 'neck_forward',
    label: 'Masa başında çalışırken boynum öne düşüyor, kürek kemiklerim yanıyor ve baş ağrısı yaşıyorum',
    category: 'Servikal Düzleşme',
    biomechanicImpact: 'Pelvis eğikliğinin omurga boyunca boyun ve omuz kuşağına yansıyan hiper-kifotik gerilim transferi.'
  },
  {
    id: 'weight_shift',
    label: 'Ayakta beklerken ağırlığımı sürekli tek bir bacağımın üzerine veriyorum',
    category: 'Ağırlık Merkezi Kayması',
    biomechanicImpact: 'Vücudun yerçekimi merkezinin (COG) bir tarafa kayması, diğer tarafta kompansatuar kas spazmları.'
  }
];

export const PelvisTheorySection: React.FC<PelvisTheorySectionProps> = ({ onOpenBooking }) => {
  const [selectedSymptoms, setSelectedSymptoms] = useState<string[]>(['shoulder_asymmetry', 'leg_length']);

  const toggleSymptom = (id: string) => {
    setSelectedSymptoms(prev =>
      prev.includes(id) ? prev.filter(item => item !== id) : [...prev, id]
    );
  };

  const getAnalysisSummary = () => {
    if (selectedSymptoms.length === 0) {
      return {
        level: 'Normal / Önleyici',
        description: 'Herhangi bir belirti işaretlenmedi. Yine de önleyici (profilaktik) olarak yılda birkaç kez Yumeiho seansı almak omurganın esnekliğini ve bağışıklığı destekler.',
        recommendedKatas: 'Kata #01-100 Genel Dengeleme Dizisi',
        urgency: 'Koruyucu Sağlık Seansı'
      };
    }
    if (selectedSymptoms.length <= 2) {
      return {
        level: 'Hafif - Orta Düzey Pelvik Asimetri',
        description: 'Leğen kemiğinizde (pelvis) başlangıç düzeyinde rotasyon veya fonksiyonel bacak boyu farkı gözleniyor. Bu durum omurganızın diğer bölgelerinde gerilim yaratmadan düzeltilmelidir.',
        recommendedKatas: 'Kata #01-08 Pelvis Düzeltme + #25-42 Alt Ekstremite Eşitleme',
        urgency: '3-6 Seanslık Dengeleme Programı'
      };
    }
    return {
      level: 'Belirgin Biyomekanik Dengesizlik & Kompansasyon',
      description: 'Pelvis tabanındaki kayma; hem bel, hem sakroiliak eklem hem de üst omurga kuşağını (boyun ve omuz) etkileyerek zincirleme bir gerginlik oluşturmuş. Yumeiho\'nun 100 temel katası ile tüm vücudun yeniden hizalanması gerekir.',
      recommendedKatas: 'Kata #01-100 Tam Biyomekanik Restorasyon Protokolü',
      urgency: 'Kapsamlı Yumeiho Terapi Kürü (8-12 Seans)'
    };
  };

  const analysis = getAnalysisSummary();

  const handleBookingWithAnalysis = () => {
    const selectedLabels = SYMPTOMS
      .filter(s => selectedSymptoms.includes(s.id))
      .map(s => s.label)
      .join('; ');
    const note = `Postür Ön Değerlendirme Sonucu: ${analysis.level}. Belirtiler: ${selectedLabels || 'Genel kontrol'}`;
    onOpenBooking('therapy', note);
  };

  return (
    <section id="pelvis-felsefesi" className="py-16 lg:py-24 bg-white dark:bg-[#121110] border-b border-stone-200 dark:border-[#2E2C29] transition-colors duration-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header with Framer Motion scroll entrance */}
        <SectionHeader
          kicker="01. Yumeiho Felsefesi ve Biyomekaniği"
          title={
            <>
              "Temeli Eğri Olan Evin Çatısı Düz Duramaz": <br className="hidden sm:inline" />
              Kotsuban (Pelvis) Dengesi Kuramı
            </>
          }
          description="Yumeiho Terapi'nin kurucusu Masayuki Saionji'ye göre, insan bedeninin tüm ağırlık merkezi leğen kemiği (pelvis) üzerinde konumlanır. Pelvisteki milimetrik bir asimetri, omurganın yukarısında skolyoz, bel fıtığı ve boyun düzleşmesine yol açar."
        />

        {/* 2-Column Split: Medical Theory vs Posture Assessment Interactive Tool */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-stretch">
          
          {/* Left Column: Theory & Anatomical Visualization */}
          <div className="lg:col-span-5 flex flex-col justify-between space-y-6">
            <div className="rounded-2xl border border-stone-200 dark:border-[#2E2C29] overflow-hidden bg-stone-50 dark:bg-[#1A1917]">
              <img
                src="/src/assets/images/posture_pelvis_anatomy_1793549688760.jpg"
                alt="İnsan Pelvis Dengesi ve Omurga Hizalaması Anatomisi"
                className="w-full aspect-[4/3] object-cover"
                referrerPolicy="no-referrer"
              />
              <div className="p-5">
                <h3 className="font-semibold text-stone-900 dark:text-[#F8F7F4] text-base">
                  Pelvisin 3 Temel Deformasyon Tipi
                </h3>
                <div className="space-y-3 mt-3 text-xs sm:text-sm text-stone-600 dark:text-[#A8A29E]">
                  <div className="p-2.5 rounded-lg bg-white dark:bg-[#22201D] border border-stone-200 dark:border-[#2E2C29]">
                    <strong className="text-stone-900 dark:text-[#F8F7F4] block mb-0.5">1. Sağ Pelvis Kayması:</strong>
                    Sağ bacak fonksiyonel olarak kısalır, karaciğer ve sindirim sistemi zorlanır, sempatik sinir sistemi baskılanır.
                  </div>
                  <div className="p-2.5 rounded-lg bg-white dark:bg-[#22201D] border border-stone-200 dark:border-[#2E2C29]">
                    <strong className="text-stone-900 dark:text-[#F8F7F4] block mb-0.5">2. Sol Pelvis Kayması:</strong>
                    Sol bacak fonksiyonel kısalır, kalp ve solunum yükü artar, parasempatik dengesizlik ve sol omuz düşüklüğü görülür.
                  </div>
                  <div className="p-2.5 rounded-lg bg-white dark:bg-[#22201D] border border-stone-200 dark:border-[#2E2C29]">
                    <strong className="text-stone-900 dark:text-[#F8F7F4] block mb-0.5">3. Kombine (Karışık) Kayma:</strong>
                    Hem rotasyonel hem dikey asimetri bulunur. Siyatalji, bel fıtığı ve şiddetli omurga ağrılarının temel kaynağıdır.
                  </div>
                </div>
              </div>
            </div>

            <div className="p-4 bg-stone-50 dark:bg-[#1A1917] rounded-xl border border-stone-200 dark:border-[#2E2C29] text-xs text-stone-600 dark:text-[#A8A29E] leading-relaxed">
              <p className="font-semibold text-stone-900 dark:text-[#F8F7F4] mb-1">
                Ali Gökmen Düzgün'ün Klinik Notu:
              </p>
              "Gelen hastalarımızın %90'ında bacak boyu eşitsizliği kemiksel değil, tamamen pelvis kemiğinin kilitlenmesinden kaynaklanan fonksiyonel bir kısalıktır. Yumeiho seansı sonrasında bacaklar hemen eşitlenir."
            </div>
          </div>

          {/* Right Column: Interactive Self-Assessment Simulator */}
          <div id="postur-testi" className="lg:col-span-7 bg-stone-50 dark:bg-[#1A1917] rounded-2xl border border-stone-200 dark:border-[#2E2C29] p-6 sm:p-8 flex flex-col justify-between">
            <div>
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-2">
                  <Activity className="w-5 h-5 text-amber-900 dark:text-[#C49B66]" />
                  <h3 className="font-display font-bold text-lg text-stone-900 dark:text-[#F8F7F4]">
                    Online Postür & Pelvis Ön Değerlendirme Aracı
                  </h3>
                </div>
                <span className="text-xs text-stone-500 dark:text-[#A8A29E]">Etkileşimli Biyomekanik Kontrol</span>
              </div>
              <p className="text-xs sm:text-sm text-stone-600 dark:text-[#A8A29E] mb-6">
                Günlük yaşamınızda fark ettiğiniz durumları işaretleyin. Sistem, Yumeiho pelvis prensipleri doğrultusunda olası kompansasyon haritanızı oluştursun.
              </p>

              {/* Symptoms Checklist */}
              <div className="space-y-2.5">
                {SYMPTOMS.map(symptom => {
                  const isChecked = selectedSymptoms.includes(symptom.id);
                  return (
                    <button
                      key={symptom.id}
                      type="button"
                      onClick={() => toggleSymptom(symptom.id)}
                      className={`w-full text-left p-3.5 rounded-xl border transition-all flex items-start gap-3.5 ${
                        isChecked
                          ? 'bg-white dark:bg-[#262422] border-amber-900/40 dark:border-[#C49B66]/50 shadow-sm'
                          : 'bg-white/60 dark:bg-[#22201D] border-stone-200 dark:border-[#2E2C29] hover:bg-white dark:hover:bg-[#262422]'
                      }`}
                    >
                      <div className={`w-5 h-5 rounded-md flex items-center justify-center shrink-0 mt-0.5 transition-colors ${
                        isChecked ? 'bg-amber-900 dark:bg-[#C49B66] text-white dark:text-[#171614]' : 'border border-stone-300 dark:border-[#3D3A35] bg-stone-50 dark:bg-[#1E1C1A]'
                      }`}>
                        {isChecked && <Check className="w-3.5 h-3.5" />}
                      </div>
                      <div className="flex-1">
                        <p className={`text-xs sm:text-sm font-medium ${isChecked ? 'text-stone-900 dark:text-[#F8F7F4]' : 'text-stone-700 dark:text-[#D6D3D1]'}`}>
                          {symptom.label}
                        </p>
                        {isChecked && (
                          <p className="text-xs text-amber-900/80 dark:text-[#C49B66] mt-1">
                            Biyomekanik Etki: {symptom.biomechanicImpact}
                          </p>
                        )}
                      </div>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Dynamic Results Box */}
            <div className="mt-6 pt-6 border-t border-stone-200 dark:border-[#2E2C29] bg-white dark:bg-[#22201D] p-5 rounded-xl border border-stone-200 dark:border-[#2E2C29]">
              <div className="flex items-center justify-between mb-2">
                <span className="text-xs font-semibold text-stone-500 dark:text-[#A8A29E] uppercase tracking-wider">
                  Analiz Özeti
                </span>
                <span className="text-xs font-bold text-amber-900 dark:text-[#C49B66]">
                  {analysis.level}
                </span>
              </div>
              <p className="text-xs sm:text-sm text-stone-700 dark:text-[#D6D3D1] leading-relaxed mb-3">
                {analysis.description}
              </p>
              
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs text-stone-600 dark:text-[#A8A29E] mb-4 bg-stone-50 dark:bg-[#1E1C1A] p-2.5 rounded-lg border border-stone-200 dark:border-[#2E2C29]">
                <div>
                  <span className="font-semibold text-stone-800 dark:text-[#F8F7F4]">Hedef Odak:</span> {analysis.recommendedKatas}
                </div>
                <div>
                  <span className="font-semibold text-stone-800 dark:text-[#F8F7F4]">Önerilen Süreç:</span> {analysis.urgency}
                </div>
              </div>

              <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3">
                <button
                  type="button"
                  onClick={() => setSelectedSymptoms([])}
                  className="inline-flex items-center justify-center gap-1.5 px-3 py-2 text-xs text-stone-500 dark:text-[#A8A29E] hover:text-stone-800 dark:hover:text-white transition-colors"
                >
                  <RefreshCw className="w-3.5 h-3.5" />
                  <span>Seçimleri Sıfırla</span>
                </button>

                <button
                  type="button"
                  onClick={handleBookingWithAnalysis}
                  className="inline-flex items-center justify-center gap-2 px-5 py-2.5 text-xs font-semibold text-white dark:text-[#171614] bg-stone-900 dark:bg-[#C49B66] rounded-lg hover:bg-stone-800 dark:hover:bg-[#D4AF37] transition-colors shadow-sm whitespace-nowrap"
                >
                  <span>Bu Ön Değerlendirme ile Seans Danışın</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>

          </div>

        </div>

        {/* Clinical Spine & Organ Reflex Interactive Model */}
        <div className="mt-16">
          <SpineVertebraeInteractiveModel />
        </div>

        {/* Awwwards-Level Interactive Posture Alignment Simulator */}
        <div className="mt-12">
          <PostureSimulator onOpenBooking={onOpenBooking} />
        </div>

      </div>
    </section>
  );
};
