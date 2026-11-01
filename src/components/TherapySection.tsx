import React from 'react';
import { Sparkles, HeartPulse, Clock, Shirt, Smile, ShieldAlert, ArrowRight, Check } from 'lucide-react';
import { SectionHeader } from './SectionHeader';

interface TherapySectionProps {
  onOpenBooking: (tab: 'therapy') => void;
}

export const TherapySection: React.FC<TherapySectionProps> = ({ onOpenBooking }) => {
  const steps = [
    {
      num: '01',
      title: 'Biyomekanik Muayene & Bacak Boyu Ölçümü',
      description: 'Yüzüstü pozisyonda topuk hizası, leğen kemiği seviyesi ve omurga eğriliği milimetrik olarak değerlendirilir.'
    },
    {
      num: '02',
      title: 'Derin Kas Basısı & Shiatsu Masajı',
      description: 'Sırt, bel ve bacak kasları boyunca ritmik başparmak basılarıyla derin spazmlar çözülür, kan dolaşımı hızlandırılır.'
    },
    {
      num: '03',
      title: 'Pelvis ve Omurga Hizalama Manevraları',
      description: 'Kaslar gevşedikten sonra 100 temel kata arasından hastaya uygun olanlarla sakroiliak ve omurga eklemleri yerine oturtulur.'
    },
    {
      num: '04',
      title: 'Tüm Beden Entegrasyonu & Ev Önerileri',
      description: 'Danışan ayağa kaldırılarak postürdeki hafifleme teyit edilir, duruşun kalıcılığını sağlayan basit egzersizler gösterilir.'
    }
  ];

  const indications = [
    { name: 'Skolyoz & Kifoz', desc: 'Omurga eğriliklerinde pelvisi eşitleyerek eğrilik açısının gerilemesini destekler.' },
    { name: 'Bel & Boyun Fıtıkları', desc: 'Disklere binen anormal baskıyı kaldırarak fıtıklaşmış bölgedeki sinir sıkışmasını hafifletir.' },
    { name: 'Siyatalji & Bacak Ağrıları', desc: 'Piriformis spazmını ve siyatik sinir tuzaklanmasını serbest bırakır.' },
    { name: 'Bacak Boyu Eşitsizliği', desc: 'Fonksiyonel kısalıkları ilk seansta düzelterek kalça ve diz aşınmalarını önler.' },
    { name: 'Masa Başı Boyun Düzleşmesi', desc: 'Öne kaymış baş postürünü geriye çeker, kronik gerilim baş ağrılarını dindirir.' },
    { name: 'Sporcu Performansı & Toparlanma', desc: 'Aşırı yüklenen kas dengesizliklerini giderir, sakatlanma riskini minimize eder.' }
  ];

  return (
    <section id="terapi-seanslari" className="py-16 lg:py-24 bg-stone-50 border-b border-stone-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header with Framer Motion scroll entrance */}
        <SectionHeader
          kicker="04. Klinik Terapi Seansları"
          title={
            <>
              Doğal, Güvenli ve Bütüncül: <br className="hidden sm:inline" />
              Bir Yumeiho Seansı Nasıl Uygulanır?
            </>
          }
          description="Yumeiho seansı klasik masajlardan farklıdır; kasları gevşetirken aynı zamanda iskelet sistemini ve pelvisi doğrudan anatomik merkezine kavuşturan aktif bir manuel terapidir."
        />

        {/* 4 Steps Timeline Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
          {steps.map(step => (
            <div
              key={step.num}
              className="bg-white rounded-xl p-6 border border-stone-200 flex flex-col justify-between"
            >
              <div>
                <span className="font-serif text-2xl font-bold text-amber-900/70 block mb-3">
                  {step.num}
                </span>
                <h3 className="font-semibold text-stone-900 text-base mb-2">
                  {step.title}
                </h3>
                <p className="text-xs sm:text-sm text-stone-600 leading-relaxed">
                  {step.description}
                </p>
              </div>
            </div>
          ))}
        </div>

        {/* Essential Session Facts Strip */}
        <div className="bg-stone-900 text-white rounded-2xl p-6 sm:p-8 mb-16">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            <div className="flex items-start gap-3">
              <Clock className="w-5 h-5 text-amber-400 shrink-0 mt-0.5" />
              <div>
                <p className="text-sm font-semibold text-white">50 - 60 Dakika</p>
                <p className="text-xs text-stone-300 mt-0.5">Tüm vücudu kapsayan eksiksiz terapi süresi</p>
              </div>
            </div>

            <div className="flex items-start gap-3">
              <Shirt className="w-5 h-5 text-amber-400 shrink-0 mt-0.5" />
              <div>
                <p className="text-sm font-semibold text-white">Rahat Kıyafetle</p>
                <p className="text-xs text-stone-300 mt-0.5">Soyunma ya da masaj yağı gerekmez (eşofman/tişört)</p>
              </div>
            </div>

            <div className="flex items-start gap-3">
              <Smile className="w-5 h-5 text-amber-400 shrink-0 mt-0.5" />
              <div>
                <p className="text-sm font-semibold text-white">Tatami Mindirinde</p>
                <p className="text-xs text-stone-300 mt-0.5">Geleneksel Japon usulü, yerde tam vücut desteğiyle</p>
              </div>
            </div>

            <div className="flex items-start gap-3">
              <HeartPulse className="w-5 h-5 text-amber-400 shrink-0 mt-0.5" />
              <div>
                <p className="text-sm font-semibold text-white">Doğal & İlaçsız</p>
                <p className="text-xs text-stone-300 mt-0.5">Bedenin kendi öz iyileştirme gücünü harekete geçirir</p>
              </div>
            </div>
          </div>
        </div>

        {/* Indications Bento Layout */}
        <div className="bg-white rounded-2xl border border-stone-200 p-6 sm:p-8">
          <div className="max-w-2xl mb-6">
            <h3 className="font-display font-bold text-xl text-stone-900">
              Yumeiho Terapi Hangi Rahatsızlıklarda Etkilidir?
            </h3>
            <p className="text-xs sm:text-sm text-stone-600 mt-1">
              Klinik araştırmalar, pelvis hizalandığında sinir sıkışmalarının ve kronik kas gerilimlerinin %80'den fazla azaldığını ortaya koymaktadır.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {indications.map(ind => (
              <div
                key={ind.name}
                className="p-4 rounded-xl border border-stone-200 bg-stone-50/50 hover:bg-stone-50 transition-colors"
              >
                <p className="text-sm font-semibold text-stone-900 mb-1 flex items-center gap-1.5">
                  <Check className="w-4 h-4 text-amber-800" />
                  {ind.name}
                </p>
                <p className="text-xs text-stone-600 leading-relaxed">
                  {ind.desc}
                </p>
              </div>
            ))}
          </div>

          <div className="mt-8 pt-6 border-t border-stone-200 flex flex-col sm:flex-row items-center justify-between gap-4">
            <div className="text-xs text-stone-500">
              * Yumeiho tamamlayıcı ve koruyucu bir manuel terapi yöntemidir. Her seans Türkiye Temsilcisi Ali Gökmen Düzgün gözetiminde planlanır.
            </div>
            <button
              onClick={() => onOpenBooking('therapy')}
              className="inline-flex items-center justify-center gap-2 px-6 py-3 text-sm font-semibold text-white bg-stone-900 rounded-lg hover:bg-stone-800 transition-colors shadow-sm whitespace-nowrap"
            >
              <span>Terapi Seansı İçin Randevu Al</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>

      </div>
    </section>
  );
};
