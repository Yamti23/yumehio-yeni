import React from 'react';
import { REPRESENTATIVE_INFO } from '../data/yumeihoData';

interface FooterProps {
  onOpenNewsletter?: () => void;
}

export const Footer: React.FC<FooterProps> = ({ onOpenNewsletter }) => {
  return (
    <footer className="bg-stone-900 text-stone-300 py-12 border-t border-stone-800 text-xs">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="grid grid-cols-1 md:grid-cols-12 gap-8 pb-12 border-b border-stone-800">
          
          {/* Brand & Lineage */}
          <div className="md:col-span-5 space-y-3">
            <div className="flex items-center gap-2">
              <span className="font-serif text-amber-500 font-bold text-xl select-none">湧命法</span>
              <span className="font-display font-bold text-lg text-white">Yumeiho Türkiye</span>
            </div>
            <p className="text-stone-400 text-xs leading-relaxed max-w-sm">
              Uluslararası Yumeiho Federasyonu Resmi Türkiye Temsilciliği. Masayuki Saionji ekolü pelvis ve omurga dengeleme terapileri ile 1-5. Dan sertifikalı eğitmen yetiştirme programları.
            </p>
            <p className="text-stone-400 font-medium">
              Türkiye Temsilcisi: <span className="text-white font-semibold">{REPRESENTATIVE_INFO.name}</span>
            </p>
          </div>

          {/* Quick Nav */}
          <div className="md:col-span-3 space-y-2">
            <p className="font-semibold text-white uppercase tracking-wider text-[11px]">
              Hızlı Erişim
            </p>
            <ul className="space-y-1.5 text-stone-400">
              <li><a href="#pelvis-felsefesi" className="hover:text-white transition-colors">Pelvis Dengesi Kuramı</a></li>
              <li><a href="#tarihce" className="hover:text-white transition-colors">Yumeiho Tarihçesi</a></li>
              <li><a href="#terapotik-moduller" className="hover:text-white transition-colors">Terapötik Modüller</a></li>
              <li><a href="#egitim-akademisi" className="hover:text-white transition-colors">Dan Seviyeleri & Seminerler</a></li>
              <li><a href="#100-kata" className="hover:text-white transition-colors">100 Temel Kata Rehberi</a></li>
              <li><a href="#temsilcimiz" className="hover:text-white transition-colors">Ali Gökmen Düzgün</a></li>
              {onOpenNewsletter && (
                <li>
                  <button
                    onClick={onOpenNewsletter}
                    className="text-amber-400 hover:text-amber-300 font-medium transition-colors cursor-pointer flex items-center gap-1 mt-1"
                  >
                    <span>Klinik Bülten (学術報)</span>
                  </button>
                </li>
              )}
            </ul>
          </div>

          {/* Contact Details */}
          <div className="md:col-span-4 space-y-2">
            <p className="font-semibold text-white uppercase tracking-wider text-[11px]">
              Temsilcilik & Randevu Merkezi
            </p>
            <div className="space-y-1 text-stone-400">
              <p>{REPRESENTATIVE_INFO.centerLocation}</p>
              <p>Telefon: <span className="text-white">{REPRESENTATIVE_INFO.phone}</span></p>
              <p>E-Posta: <a href={`mailto:${REPRESENTATIVE_INFO.email}`} className="text-white hover:underline">{REPRESENTATIVE_INFO.email}</a></p>
              <p className="pt-2 text-stone-500 text-[11px]">
                Çalışma Saatleri: Pazartesi - Cumartesi (09:30 - 19:00, Randevu ile)
              </p>
            </div>
          </div>

        </div>

        {/* Disclaimer & Copyright */}
        <div className="pt-8 flex flex-col md:flex-row items-start md:items-center justify-between gap-4 text-stone-500 text-[11px]">
          <p>
            © {new Date().getFullYear()} Yumeiho Türkiye Federasyon Temsilciliği. Tüm hakları saklıdır.
          </p>
          <p className="max-w-xl text-stone-500 text-[10px] leading-relaxed">
            Yasal Uyarı: Yumeiho; Japon menşeili bir tamamlayıcı ve koruyucu manuel terapi ile beden eğitimi metodudur. Teşhis, ameliyat veya tıbbi tedavinin yerine geçmez; hekim tedavisine destekleyici olarak uygulanır.
          </p>
        </div>

      </div>
    </footer>
  );
};
