import React, { useState } from 'react';
import { Award, GraduationCap, Calendar, MapPin, Users, CheckCircle2, ArrowRight } from 'lucide-react';
import { DAN_LEVELS, UPCOMING_SEMINARS, DanLevel } from '../data/yumeihoData';
import { SectionHeader } from './SectionHeader';
import { CertificateVerification } from './CertificateVerification';

interface TrainingAcademySectionProps {
  onOpenBooking: (tab: 'seminar', seminarTitle?: string) => void;
}

export const TrainingAcademySection: React.FC<TrainingAcademySectionProps> = ({ onOpenBooking }) => {
  const [selectedDan, setSelectedDan] = useState<DanLevel>(DAN_LEVELS[0]);

  return (
    <section id="egitim-akademisi" className="py-16 lg:py-24 bg-white border-b border-stone-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header with Framer Motion scroll entrance */}
        <SectionHeader
          kicker="05. Uluslararası Sertifikalı Yumeiho Akademisi"
          title={
            <>
              Uluslararası Akredite Dan Dereceleri & <br className="hidden sm:inline" />
              Mesleki Terapist Yetiştirme Programı
            </>
          }
          description="Yumeiho bir dünya mirasıdır. Ali Gökmen Düzgün'ün düzenlediği eğitimler, Japonya International Yumeiho Centre ve Avrupa Federasyonu tarafından onaylanan küresel Dan diplomaları sağlar."
        />

        {/* Visual Banner Card */}
        <div className="relative rounded-2xl overflow-hidden border border-stone-200 shadow-sm mb-12 group bg-stone-900">
          <img
            src="/src/assets/images/yumeiho_training_academy_1793549687389.jpg"
            alt="Yumeiho Terapi Semineri ve Dan Sertifika Eğitimi"
            className="w-full h-64 sm:h-80 md:h-96 object-cover opacity-90 group-hover:scale-[1.01] transition-transform duration-700"
            referrerPolicy="no-referrer"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-stone-950 via-stone-950/40 to-transparent pointer-events-none" />
          <div className="absolute bottom-0 left-0 right-0 p-6 sm:p-8 text-white max-w-2xl">
            <span className="text-xs font-serif tracking-widest text-amber-300 uppercase block mb-1">
              Doğrudan Temsilcilikten Resmi Müfredat
            </span>
            <h3 className="text-xl sm:text-2xl font-bold text-white mb-2">
              Teorik Biyomekanik ve Yüksek Yoğunluklu Kata Pratiği
            </h3>
            <p className="text-xs sm:text-sm text-stone-200 leading-relaxed">
              Katılımcılar yalnızca teknikleri ezberlemez; pelvisin mekaniğini, elle kemik ve kas dokusunu hissetmeyi (palpasyon) ve güvenli klinik uygulamayı usta gözetiminde birebir öğrenir.
            </p>
          </div>
        </div>

        {/* Dan Levels Interactive Tabs & Details */}
        <div className="mb-16">
          <div className="flex items-center justify-between mb-4 flex-wrap gap-2">
            <div>
              <h3 className="font-display font-bold text-xl text-stone-900">
                1. Dan'dan 5. Dan'a Uzmanlaşma Basamakları
              </h3>
              <p className="text-xs sm:text-sm text-stone-600">
                Her seviye, terapistin anatomi ve uygulama yetkinliğini uluslararası standartta derecelendirir.
              </p>
            </div>
          </div>

          {/* Dan Tabs */}
          <div className="flex items-center gap-2 overflow-x-auto pb-2 mb-6 border-b border-stone-200">
            {DAN_LEVELS.map(dan => {
              const isActive = selectedDan.level === dan.level;
              return (
                <button
                  key={dan.level}
                  onClick={() => setSelectedDan(dan)}
                  className={`px-4 py-2.5 text-xs sm:text-sm font-semibold rounded-lg whitespace-nowrap transition-colors flex items-center gap-2 ${
                    isActive
                      ? 'bg-stone-900 text-white shadow-sm'
                      : 'bg-stone-100 text-stone-700 hover:bg-stone-200'
                  }`}
                >
                  <Award className="w-4 h-4 text-amber-400" />
                  <span>{dan.japaneseTitle}</span>
                </button>
              );
            })}
          </div>

          {/* Selected Dan Card */}
          <div className="bg-stone-50 rounded-2xl border border-stone-200 p-6 sm:p-8">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
              
              <div className="lg:col-span-8 space-y-4">
                <div className="flex flex-wrap items-baseline gap-3">
                  <h4 className="text-xl sm:text-2xl font-bold text-stone-900">
                    {selectedDan.turkishTitle}
                  </h4>
                  <span className="text-xs font-semibold text-amber-900 bg-amber-100/70 px-2.5 py-1 rounded-md">
                    {selectedDan.beltColor}
                  </span>
                </div>

                <p className="text-stone-700 text-sm leading-relaxed">
                  {selectedDan.description}
                </p>

                <div className="space-y-2 pt-2">
                  <p className="text-xs font-bold uppercase tracking-wider text-stone-600">
                    Müfredatın Ana Başlıkları:
                  </p>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                    {selectedDan.keyTopics.map((topic, i) => (
                      <div key={i} className="flex items-start gap-2 text-xs sm:text-sm text-stone-700">
                        <CheckCircle2 className="w-4 h-4 text-amber-800 shrink-0 mt-0.5" />
                        <span>{topic}</span>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="p-4 bg-white rounded-xl border border-stone-200 text-xs sm:text-sm text-stone-700 mt-4">
                  <strong className="text-stone-900 block mb-1">Yetki ve Akreditasyon:</strong>
                  {selectedDan.authorization}
                </div>
              </div>

              {/* Right column sidebar */}
              <div className="lg:col-span-4 bg-white rounded-xl border border-stone-200 p-5 space-y-4">
                <div>
                  <span className="text-xs font-medium text-stone-500 block">Süre ve Format</span>
                  <p className="text-sm font-semibold text-stone-900">{selectedDan.duration}</p>
                </div>
                <div>
                  <span className="text-xs font-medium text-stone-500 block">Ön Koşul</span>
                  <p className="text-xs text-stone-700 leading-relaxed">{selectedDan.prerequisites}</p>
                </div>
                <div>
                  <span className="text-xs font-medium text-stone-500 block">Sertifika Türü</span>
                  <p className="text-xs text-stone-700">Uluslararası Federasyon Tescilli Dan Diploması</p>
                </div>
                <button
                  onClick={() => onOpenBooking('seminar', `${selectedDan.japaneseTitle} - ${selectedDan.turkishTitle}`)}
                  className="w-full py-3 px-4 text-xs font-semibold text-white bg-stone-900 hover:bg-stone-800 rounded-lg transition-colors flex items-center justify-center gap-2"
                >
                  <span>Bu Seviyeye Başvur</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </div>

            </div>
          </div>
        </div>

        {/* Upcoming Seminars Calendar */}
        <div className="mb-16">
          <div className="max-w-2xl mb-6">
            <h3 className="font-display font-bold text-xl text-stone-900">
              Yaklaşan Seminer & Sertifika Takvimi
            </h3>
            <p className="text-xs sm:text-sm text-stone-600 mt-1">
              Kontenjanlar eğitimin birebir niteliğini korumak adına sınırlı tutulmaktadır.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {UPCOMING_SEMINARS.map(seminar => (
              <div
                key={seminar.id}
                className="p-5 rounded-xl border border-stone-200 bg-stone-50 hover:bg-white transition-all flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-center justify-between text-xs font-semibold text-stone-500 mb-2">
                    <span className="text-amber-900 font-bold">{seminar.danLevel}</span>
                    <span className={`px-2 py-0.5 rounded text-xs ${
                      seminar.status === 'limited' ? 'bg-amber-100 text-amber-900' : 'bg-emerald-100 text-emerald-900'
                    }`}>
                      {seminar.seatsLeft} Koltuk Kaldı
                    </span>
                  </div>
                  <h4 className="text-base font-bold text-stone-900 mb-2">
                    {seminar.title}
                  </h4>
                  <div className="space-y-1 text-xs text-stone-600 mb-4">
                    <div className="flex items-center gap-2">
                      <Calendar className="w-4 h-4 text-stone-500" />
                      <span>{seminar.dates} · {seminar.hours}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <MapPin className="w-4 h-4 text-stone-500" />
                      <span>{seminar.city} — {seminar.venue}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <GraduationCap className="w-4 h-4 text-stone-500" />
                      <span>Eğitmen: {seminar.instructor}</span>
                    </div>
                  </div>
                </div>

                <div className="pt-3 border-t border-stone-200 flex items-center justify-between gap-3">
                  <span className="text-xs text-stone-500">Maks. {seminar.totalSeats} Katılımcı</span>
                  <button
                    onClick={() => onOpenBooking('seminar', `${seminar.title} (${seminar.city})`)}
                    className="px-4 py-2 text-xs font-semibold text-white bg-stone-900 rounded-lg hover:bg-stone-800 transition-colors"
                  >
                    Kayıt Talebi Gönder
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Certificate Verification System - Awwwards Aesthetic */}
        <div id="sertifika-dogrulama" className="mt-16">
          <CertificateVerification />
        </div>

      </div>
    </section>
  );
};
