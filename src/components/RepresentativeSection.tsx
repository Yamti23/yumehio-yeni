import React from 'react';
import { Award, Mail, Phone, MapPin, CheckCircle, MessageSquare, ArrowRight } from 'lucide-react';
import { REPRESENTATIVE_INFO } from '../data/yumeihoData';
import { SectionHeader } from './SectionHeader';

interface RepresentativeSectionProps {
  onOpenBooking: (tab?: 'therapy' | 'seminar') => void;
}

export const RepresentativeSection: React.FC<RepresentativeSectionProps> = ({ onOpenBooking }) => {
  return (
    <section id="temsilcimiz" className="py-16 lg:py-24 bg-white border-b border-stone-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header with Framer Motion scroll entrance */}
        <SectionHeader
          kicker="07. Federasyon Temsilciliği ve Liderlik"
          title={
            <>
              Türkiye Resmi Temsilcisi: <br className="hidden sm:inline" />
              Ali Gökmen Düzgün
            </>
          }
          description="Yumeiho Terapi'nin Türkiye'deki resmi temsilcisi olan Ali Gökmen Düzgün; Masayuki Saionji ekolünü uluslararası standartlarda yaşatmakta, hem klinik danışanlarına şifa sunmakta hem de yeni nesil Yumeiho terapistlerini yetiştirmektedir."
        />

        {/* Profile Card & Details Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
          
          {/* Portrait Column */}
          <div className="lg:col-span-5">
            <div className="relative rounded-2xl overflow-hidden border border-stone-200 shadow-md bg-stone-100 group">
              <img
                src="/src/assets/images/ali_gokmen_duzgun_profile_1793549688851.jpg"
                alt="Ali Gökmen Düzgün - Yumeiho Federasyonu Türkiye Temsilcisi"
                className="w-full aspect-[3/4] object-cover object-top group-hover:scale-[1.01] transition-transform duration-700"
                referrerPolicy="no-referrer"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-stone-950/85 via-stone-950/20 to-transparent pointer-events-none" />
              <div className="absolute bottom-0 left-0 right-0 p-6 text-white">
                <p className="text-xs font-serif text-amber-300 uppercase tracking-widest mb-1">
                  Resmi Federasyon Temsilcisi
                </p>
                <h3 className="text-xl font-bold text-white">
                  Ali Gökmen Düzgün
                </h3>
                <p className="text-xs text-stone-300 mt-1">
                  Uluslararası Yumeiho Merkezi Temsilcisi & Baş Eğitmen
                </p>
              </div>
            </div>
          </div>

          {/* Biography and Mission Column */}
          <div className="lg:col-span-7 space-y-6">
            
            <div className="space-y-4 text-stone-700 text-sm sm:text-base leading-relaxed">
              <p>
                {REPRESENTATIVE_INFO.bio}
              </p>
              <blockquote className="p-4 bg-stone-50 rounded-xl border border-stone-200 text-stone-800 italic text-sm">
                "{REPRESENTATIVE_INFO.mission}"
              </blockquote>
            </div>

            {/* Credentials List */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2 text-xs sm:text-sm text-stone-700">
              <div className="flex items-center gap-2">
                <CheckCircle className="w-4 h-4 text-amber-900 shrink-0" />
                <span>Uluslararası Yumeiho Federasyonu Yetkisi</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle className="w-4 h-4 text-amber-900 shrink-0" />
                <span>Resmi Dan Diploması Verme ve Sınav Yetkisi</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle className="w-4 h-4 text-amber-900 shrink-0" />
                <span>18+ Yıllık Klinik Manuel Terapi Deneyimi</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle className="w-4 h-4 text-amber-900 shrink-0" />
                <span>İstanbul, Ankara, İzmir Seminer Yönetimi</span>
              </div>
            </div>

            {/* Direct Contact Bar */}
            <div className="p-5 bg-stone-50 rounded-xl border border-stone-200 space-y-3">
              <p className="text-xs font-bold uppercase tracking-wider text-stone-500">
                Temsilcilik Doğrudan İletişim Kanalları
              </p>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs sm:text-sm text-stone-800">
                <div className="flex items-center gap-2">
                  <MapPin className="w-4 h-4 text-amber-900 shrink-0" />
                  <span>{REPRESENTATIVE_INFO.centerLocation}</span>
                </div>
                <div className="flex items-center gap-2">
                  <Mail className="w-4 h-4 text-amber-900 shrink-0" />
                  <a href={`mailto:${REPRESENTATIVE_INFO.email}`} className="hover:underline">
                    {REPRESENTATIVE_INFO.email}
                  </a>
                </div>
                <div className="flex items-center gap-2">
                  <Phone className="w-4 h-4 text-amber-900 shrink-0" />
                  <span>{REPRESENTATIVE_INFO.phone}</span>
                </div>
                <div className="flex items-center gap-2">
                  <MessageSquare className="w-4 h-4 text-emerald-700 shrink-0" />
                  <a
                    href={`https://wa.me/${REPRESENTATIVE_INFO.whatsapp}?text=Merhaba%20Ali%20Bey,%20Yumeiho%20hakk%C4%B1nda%20bilgi%20almak%20istiyorum.`}
                    target="_blank"
                    rel="noreferrer"
                    className="text-emerald-700 font-semibold hover:underline"
                  >
                    WhatsApp ile Doğrudan Yazın
                  </a>
                </div>
              </div>
            </div>

            {/* Actions */}
            <div className="flex flex-wrap items-center gap-3 pt-2">
              <button
                onClick={() => onOpenBooking('therapy')}
                className="px-6 py-3 text-xs sm:text-sm font-semibold text-white bg-stone-900 rounded-lg hover:bg-stone-800 transition-colors shadow-sm"
              >
                Ali Bey ile Seans Planla
              </button>
              <button
                onClick={() => onOpenBooking('seminar')}
                className="px-6 py-3 text-xs sm:text-sm font-semibold text-stone-800 bg-stone-200/80 rounded-lg hover:bg-stone-300 transition-colors"
              >
                Eğitmenlik Seminerine Başvur
              </button>
            </div>

          </div>

        </div>

      </div>
    </section>
  );
};
