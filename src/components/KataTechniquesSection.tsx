import React, { useState } from 'react';
import { Layers, Search, Check, Sparkles } from 'lucide-react';
import { KATA_SAMPLE_LIST, KataTechnique } from '../data/yumeihoData';
import { SectionHeader } from './SectionHeader';

export const KataTechniquesSection: React.FC = () => {
  const [activeCategory, setActiveCategory] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState<string>('');

  const categories = [
    { id: 'all', label: 'Tüm Teknikler (100 Kata)' },
    { id: 'pelvis', label: 'Pelvis & Sakroiliak' },
    { id: 'spine', label: 'Omurga & Sırt Basıları' },
    { id: 'lower_extremity', label: 'Bacak & Kalça Traksiyonu' },
    { id: 'cervical', label: 'Boyun & Omuz Hizalama' },
    { id: 'visceral', label: 'İç Organ (Hara) Dolaşımı' }
  ];

  const filteredKatas = KATA_SAMPLE_LIST.filter(kata => {
    const matchesCategory = activeCategory === 'all' || kata.category === activeCategory;
    const matchesSearch =
      kata.japaneseName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      kata.turkishName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      kata.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
      kata.anatomicalTarget.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  return (
    <section id="100-kata" className="py-16 lg:py-24 bg-stone-50 border-b border-stone-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header with Framer Motion scroll entrance */}
        <SectionHeader
          kicker="06. Geleneksel Japon Metodolojisi"
          title={
            <>
              100 Temel Kata: Bedenin Bütünsel <br className="hidden sm:inline" />
              Hizalama ve Bası Koreografisi
            </>
          }
          description="Yumeiho seansı rastgele dokunuşlardan oluşmaz. Masayuki Saionji tarafından geliştirilen 100 temel kata dizisi; baştan ayağa tüm eklemleri, faset bağlarını ve kas zincirlerini matematiksel bir ahenkle yeniden düzenler."
        />

        {/* Filter Tabs and Search Bar */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8">
          
          {/* Category Tabs (Segmented Button Controls) */}
          <div className="flex items-center gap-1.5 overflow-x-auto pb-1 max-w-full">
            {categories.map(cat => (
              <button
                key={cat.id}
                onClick={() => setActiveCategory(cat.id)}
                className={`px-3.5 py-2 text-xs font-medium rounded-lg transition-colors whitespace-nowrap shrink-0 ${
                  activeCategory === cat.id
                    ? 'bg-stone-900 text-white shadow-sm'
                    : 'bg-white text-stone-600 hover:text-stone-900 border border-stone-200'
                }`}
              >
                {cat.label}
              </button>
            ))}
          </div>

          {/* Search Input */}
          <div className="relative w-full md:w-64">
            <Search className="w-4 h-4 text-stone-400 absolute left-3 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              value={searchQuery}
              onChange={e => setSearchQuery(e.target.value)}
              placeholder="Teknik veya kas ara..."
              className="w-full pl-9 pr-3 py-2 text-xs bg-white border border-stone-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-stone-900 focus:border-stone-900"
            />
          </div>

        </div>

        {/* Katas Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredKatas.map(kata => (
            <div
              key={kata.id}
              className="bg-white rounded-xl border border-stone-200 p-6 flex flex-col justify-between hover:border-stone-300 transition-colors shadow-sm"
            >
              <div>
                <div className="flex items-center justify-between text-xs text-stone-500 mb-2">
                  <span className="font-mono font-semibold text-amber-900 bg-amber-50 px-2 py-0.5 rounded">
                    {kata.kataNumber}
                  </span>
                  <span className="font-serif italic text-stone-600">{kata.japaneseName}</span>
                </div>

                <h3 className="font-bold text-stone-900 text-base mb-2">
                  {kata.turkishName}
                </h3>

                <p className="text-xs sm:text-sm text-stone-600 leading-relaxed mb-4">
                  {kata.description}
                </p>
              </div>

              <div className="pt-4 border-t border-stone-100 space-y-2 text-xs">
                <div>
                  <span className="font-semibold text-stone-700 block text-[11px] uppercase tracking-wide">
                    Anatomik Hedef:
                  </span>
                  <span className="text-stone-600">{kata.anatomicalTarget}</span>
                </div>
                <div>
                  <span className="font-semibold text-stone-700 block text-[11px] uppercase tracking-wide">
                    Terapötik Fayda:
                  </span>
                  <span className="text-stone-800 font-medium">{kata.benefit}</span>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Why 100 Katas Editorial Box */}
        <div className="mt-12 bg-white rounded-2xl border border-stone-200 p-6 sm:p-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            <div className="lg:col-span-8 space-y-3">
              <span className="text-xs font-serif font-bold text-amber-900 tracking-wider uppercase">
                Saionji'nin Terapötik Sıralama İlkesi
              </span>
              <h3 className="text-lg sm:text-xl font-bold text-stone-900">
                Teknikler Neden Belirli Bir Sırayla Uygulanır?
              </h3>
              <p className="text-xs sm:text-sm text-stone-600 leading-relaxed">
                Yumeiho'da önce yüzüstü basılarla omurga çevresi ısıtılır ve gevşetilir, ardından pelvis ve sakroiliak eklemler mobilize edilir. Sonrasında sırtüstü, yan yatış ve oturur pozisyondaki hareketlerle tüm beden simetrisi kilitlenir. Bu sıralama, kasların savunma refleksine girmesini engeller ve kalıcı hizalanma sağlar.
              </p>
            </div>
            <div className="lg:col-span-4 bg-stone-50 p-4 rounded-xl border border-stone-200 text-xs text-stone-700">
              <div className="font-bold text-stone-900 mb-1">Eğitimlerde 100 Kata:</div>
              1. Dan eğitimine katılan her öğrenci, 100 kata hareketinin sırasını, el açısını, vücut ağırlığı aktarımını ve nefes kontrolünü eksiksiz uygulayabilir hale gelene kadar birebir pratik yapar.
            </div>
          </div>
        </div>

      </div>
    </section>
  );
};
