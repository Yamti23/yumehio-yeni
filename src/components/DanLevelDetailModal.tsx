import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { X, Award, CheckCircle2, ShieldCheck, GraduationCap, Clock, FileText, ArrowRight, BookOpen, Stethoscope } from 'lucide-react';
import { DanLevel } from '../data/yumeihoData';
import { useLanguage } from '../context/LanguageContext';

interface DanLevelDetailModalProps {
  danLevel: DanLevel | null;
  isOpen: boolean;
  onClose: () => void;
  onApply: (danTitle: string) => void;
}

export const DanLevelDetailModal: React.FC<DanLevelDetailModalProps> = ({
  danLevel,
  isOpen,
  onClose,
  onApply
}) => {
  const { language } = useLanguage();
  const [activeTab, setActiveTab] = useState<'curriculum' | 'clinical' | 'authorization'>('curriculum');

  if (!danLevel) return null;

  const getBeltBg = (level: number) => {
    switch (level) {
      case 1: return 'from-amber-400 to-yellow-500 text-stone-950';
      case 2: return 'from-emerald-500 to-emerald-700 text-white';
      case 3: return 'from-amber-800 to-amber-950 text-amber-100';
      case 4: return 'from-stone-800 to-stone-950 text-stone-100 border border-stone-700';
      case 5: return 'from-stone-950 via-amber-950 to-stone-950 text-amber-300 border border-amber-600/60';
      default: return 'from-stone-800 to-stone-900 text-white';
    }
  };

  const content = {
    tr: {
      modalBadge: 'ULUSLARARASI AKREDİTASYON HARİTASI',
      curriculumTab: 'Detaylı Müfredat',
      clinicalTab: 'Klinik Odak',
      authTab: 'Yetki & Lisans',
      prerequisites: 'Ön Koşullar',
      duration: 'Süre & Format',
      applyButton: 'Bu Seviye Seminerine Başvur',
      closeButton: 'Kapat',
      examTitle: 'Sınav & Yeterlilik Kriteri',
      examDesc: 'Uluslararası Yumeiho Merkezi standartlarında teorik sınav ve birebir uygulama değerlendirmesi.',
      keyOutcomes: 'Kazanımlar & Mesleki Yetkinlikler'
    },
    jp: {
      modalBadge: '国際公認段位マップ',
      curriculumTab: '詳細カリキュラム',
      clinicalTab: '臨床焦点',
      authTab: '権限・ライセンス',
      prerequisites: '受講資格',
      duration: '期間・フォーマット',
      applyButton: 'この段位のセミナーに応募する',
      closeButton: '閉じる',
      examTitle: '試験・認定基準',
      examDesc: '国際ユメイホセンターの基準に基づく理論試験および実技評価。',
      keyOutcomes: '修得スキルと職務能力'
    },
    en: {
      modalBadge: 'INTERNATIONAL ACCREDITATION MAP',
      curriculumTab: 'Detailed Curriculum',
      clinicalTab: 'Clinical Focus',
      authTab: 'Authorization & License',
      prerequisites: 'Prerequisites',
      duration: 'Duration & Format',
      applyButton: 'Apply for This Level',
      closeButton: 'Close',
      examTitle: 'Exam & Qualification Criteria',
      examDesc: 'Theoretical exam and hands-on assessment based on International Yumeiho Centre standards.',
      keyOutcomes: 'Key Outcomes & Professional Competencies'
    }
  };

  const t = content[language];

  // Detailed clinical focus data according to level
  const clinicalFocusData: Record<number, { title: string; points: string[]; targetCases: string[] }> = {
    1: {
      title: 'Sağlıklı Bireylerde Koruyucu Duruş Dengesi & Temel Kata',
      points: [
        '100 Kata teknik adımlarının anatomi üzerinde pürüzsüz uygulanması',
        'Pelvis eğikliğinin (pelvic tilt) elle palpasyon ve bacak boyu testiyle tespiti',
        'Yumuşak doku gevşetme ve kas tonusu dengeleme ritimleri'
      ],
      targetCases: [
        'Hafif duruş bozuklukları',
        'Günlük bel/boyun yorgunlukları',
        'Spor sonrası kas spazmları ve koruyucu beden bakımı'
      ]
    },
    2: {
      title: 'Spesifik Kas-İskelet Patolojileri & Yüksek Etkili Manuplanasyon',
      points: [
        'Skolyoz (S ve C tipi) eğriliklerinde özel simetri terapi protokolleri',
        'Siyatik sinir sıkışması ve sakroiliak eklem blokajlarının açılması',
        'Servikal ve lomber omurga çekme (traksiyon) güvenliği'
      ],
      targetCases: [
        'Kronik bel ve boyun fıtıkları',
        'Skolyoz ve kipotik duruş bozuklukları',
        'Piriformis sendromu ve kalça eklemi hareket kısıtlılıkları'
      ]
    },
    3: {
      title: 'Çok Katmanlı Biyomekanik Düzeltme & Hara (Karın) Refleks Terapisi',
      points: [
        'Organ-omurga refleks bağlantıları ve viseral (karın masajı) entegrasyonu',
        'Direniç gösteren kronik ağrı tablolarında ileri seviye kombine protokoller',
        '1. ve 2. Dan terapistlerine klinik süpervizyon ve mentorluk vermesi'
      ],
      targetCases: [
        'Kronik dirençli sırt ve leğen kemiği asimetrileri',
        'İç organ fasyal gerginlikleriyle ilişkili duruş problemleri',
        'Terapist eğitimi ve klinik staj koordinasyonu'
      ]
    },
    4: {
      title: 'Pedagojik Kata Eğitmenliği & Sınav Komisyonluğu',
      points: [
        '100 Kata tekniğinin öğretim metodolojisi ve biyomekanik ders anlatımı',
        'Öğrenci el temasının (palpasyon duyarlılığı) standartlaştırılması',
        'Resmi 1. ve 2. Dan seminerlerinin düzenlenmesi ve federasyon sınav yönetimi'
      ],
      targetCases: [
        'Yumeiho eğitmen yetiştirme programları',
        'Seminer katılım ve sınav değerlendirme süreçleri',
        'Uluslararası müfredat güncellemeleri ve standart kontrolü'
      ]
    },
    5: {
      title: 'Ülke Temsilciliği, Akademik Araştırma & Usta Düzeyi',
      points: [
        'Federasyon adına ülke genelinde akreditasyon ve temsil yetkisi',
        'Klinik makale, akademik araştırma ve vaka yayınları hazırlığı',
        '3. Dan dahil olmak üzere ileri düzey sınavları ve diplomaları onaylama'
      ],
      targetCases: [
        'Ulusal ve uluslararası Yumeiho kongreleri',
        'Sağlık profesyonelleri ve tıp camiası ile entegrasyon',
        'Master seviyede vakalar ve federasyon temsilciliği'
      ]
    }
  };

  const currentClinical = clinicalFocusData[danLevel.level] || clinicalFocusData[1];

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 overflow-y-auto">
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-stone-950/80 backdrop-blur-md transition-opacity"
          />

          {/* Modal Card */}
          <motion.div
            initial={{ opacity: 0, scale: 0.94, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.94, y: 20 }}
            transition={{ type: 'spring', damping: 25, stiffness: 300 }}
            className="relative w-full max-w-3xl bg-[#FAF8F5] dark:bg-[#121110] border border-stone-300 dark:border-stone-800 rounded-3xl shadow-2xl overflow-hidden z-10 text-stone-900 dark:text-stone-100 my-8"
          >
            {/* Top Belt Accent Banner */}
            <div className={`h-3 bg-gradient-to-r ${getBeltBg(danLevel.level)}`} />

            {/* Close Button */}
            <button
              onClick={onClose}
              className="absolute top-5 right-5 p-2 rounded-full text-stone-400 hover:text-stone-700 dark:hover:text-stone-200 hover:bg-stone-200/60 dark:hover:bg-stone-800/60 transition-colors z-20 cursor-pointer"
            >
              <X className="w-5 h-5" />
            </button>

            <div className="p-6 sm:p-8 max-h-[85vh] overflow-y-auto">
              {/* Header Badges */}
              <div className="flex flex-wrap items-center justify-between gap-2 mb-4">
                <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full bg-amber-500/10 border border-amber-500/20 text-amber-800 dark:text-amber-400 text-[11px] font-mono tracking-wider">
                  <Award className="w-3.5 h-3.5" />
                  <span>{t.modalBadge}</span>
                </div>
                <div className={`px-3 py-1 rounded-lg text-xs font-bold bg-gradient-to-r ${getBeltBg(danLevel.level)} shadow-sm`}>
                  {danLevel.beltColor}
                </div>
              </div>

              {/* Title Lockup */}
              <div className="mb-6">
                <div className="flex items-baseline space-x-3 flex-wrap">
                  <h3 className="font-serif text-2xl sm:text-3xl font-bold tracking-tight text-stone-900 dark:text-stone-100">
                    {danLevel.turkishTitle}
                  </h3>
                  <span className="font-serif text-amber-700 dark:text-amber-400 font-semibold text-lg">
                    {danLevel.japaneseTitle}
                  </span>
                </div>
                <p className="text-xs sm:text-sm text-stone-600 dark:text-stone-400 mt-2 leading-relaxed">
                  {danLevel.description}
                </p>
              </div>

              {/* Key Specs Card */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-6 p-4 rounded-2xl bg-white dark:bg-stone-950 border border-stone-200 dark:border-stone-800 text-xs">
                <div className="flex items-start space-x-3">
                  <Clock className="w-4 h-4 text-amber-600 dark:text-amber-400 shrink-0 mt-0.5" />
                  <div>
                    <span className="text-stone-500 dark:text-stone-400 block text-[11px]">{t.duration}</span>
                    <span className="font-semibold text-stone-800 dark:text-stone-200">{danLevel.duration}</span>
                  </div>
                </div>
                <div className="flex items-start space-x-3">
                  <GraduationCap className="w-4 h-4 text-amber-600 dark:text-amber-400 shrink-0 mt-0.5" />
                  <div>
                    <span className="text-stone-500 dark:text-stone-400 block text-[11px]">{t.prerequisites}</span>
                    <span className="font-semibold text-stone-800 dark:text-stone-200">{danLevel.prerequisites}</span>
                  </div>
                </div>
              </div>

              {/* Navigation Tabs */}
              <div className="flex items-center space-x-1 p-1 bg-stone-200/80 dark:bg-stone-900/80 rounded-xl mb-6 text-xs font-medium">
                <button
                  onClick={() => setActiveTab('curriculum')}
                  className={`flex-1 py-2 px-3 rounded-lg transition-all flex items-center justify-center space-x-1.5 ${
                    activeTab === 'curriculum'
                      ? 'bg-white dark:bg-stone-950 text-stone-900 dark:text-stone-100 shadow-sm font-bold'
                      : 'text-stone-600 dark:text-stone-400 hover:text-stone-900 dark:hover:text-stone-100'
                  }`}
                >
                  <BookOpen className="w-3.5 h-3.5" />
                  <span>{t.curriculumTab}</span>
                </button>
                <button
                  onClick={() => setActiveTab('clinical')}
                  className={`flex-1 py-2 px-3 rounded-lg transition-all flex items-center justify-center space-x-1.5 ${
                    activeTab === 'clinical'
                      ? 'bg-white dark:bg-stone-950 text-stone-900 dark:text-stone-100 shadow-sm font-bold'
                      : 'text-stone-600 dark:text-stone-400 hover:text-stone-900 dark:hover:text-stone-100'
                  }`}
                >
                  <Stethoscope className="w-3.5 h-3.5" />
                  <span>{t.clinicalTab}</span>
                </button>
                <button
                  onClick={() => setActiveTab('authorization')}
                  className={`flex-1 py-2 px-3 rounded-lg transition-all flex items-center justify-center space-x-1.5 ${
                    activeTab === 'authorization'
                      ? 'bg-white dark:bg-stone-950 text-stone-900 dark:text-stone-100 shadow-sm font-bold'
                      : 'text-stone-600 dark:text-stone-400 hover:text-stone-900 dark:hover:text-stone-100'
                  }`}
                >
                  <ShieldCheck className="w-3.5 h-3.5" />
                  <span>{t.authTab}</span>
                </button>
              </div>

              {/* Tab Content Panes */}
              <div className="space-y-4 mb-6">
                {activeTab === 'curriculum' && (
                  <motion.div
                    initial={{ opacity: 0, y: 5 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="space-y-4"
                  >
                    <div>
                      <h4 className="text-xs font-bold uppercase tracking-wider text-amber-800 dark:text-amber-400 mb-3 flex items-center gap-1.5">
                        <FileText className="w-4 h-4" />
                        <span>Müfredat Konu Başlıkları & Kata Kataloğu</span>
                      </h4>
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                        {danLevel.keyTopics.map((topic, i) => (
                          <div
                            key={i}
                            className="p-3 rounded-xl bg-white dark:bg-stone-950 border border-stone-200 dark:border-stone-800 flex items-start space-x-2.5 text-xs text-stone-800 dark:text-stone-200"
                          >
                            <CheckCircle2 className="w-4 h-4 text-emerald-600 dark:text-emerald-400 shrink-0 mt-0.5" />
                            <span className="font-medium">{topic}</span>
                          </div>
                        ))}
                      </div>
                    </div>

                    <div className="p-4 rounded-xl bg-amber-500/10 border border-amber-500/20 text-xs text-stone-700 dark:text-amber-200">
                      <strong className="block text-amber-900 dark:text-amber-300 font-bold mb-1">
                        {t.examTitle}
                      </strong>
                      <p className="leading-relaxed">{t.examDesc}</p>
                    </div>
                  </motion.div>
                )}

                {activeTab === 'clinical' && (
                  <motion.div
                    initial={{ opacity: 0, y: 5 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="space-y-4"
                  >
                    <div className="p-4 rounded-2xl bg-white dark:bg-stone-950 border border-stone-200 dark:border-stone-800 space-y-3">
                      <h4 className="text-sm font-bold text-stone-900 dark:text-stone-100 flex items-center gap-2">
                        <Stethoscope className="w-4 h-4 text-amber-600" />
                        <span>{currentClinical.title}</span>
                      </h4>

                      <div>
                        <span className="text-[11px] font-semibold text-stone-500 dark:text-stone-400 block mb-2">
                          Klinik Uygulama ve Teknik Nitelikler:
                        </span>
                        <ul className="space-y-1.5 text-xs text-stone-700 dark:text-stone-300">
                          {currentClinical.points.map((pt, i) => (
                            <li key={i} className="flex items-start gap-2">
                              <span className="w-1.5 h-1.5 rounded-full bg-amber-500 shrink-0 mt-1.5" />
                              <span>{pt}</span>
                            </li>
                          ))}
                        </ul>
                      </div>

                      <div className="pt-2 border-t border-stone-100 dark:border-stone-900">
                        <span className="text-[11px] font-semibold text-stone-500 dark:text-stone-400 block mb-2">
                          Hedef Vaka ve Terapi Alanları:
                        </span>
                        <div className="flex flex-wrap gap-1.5">
                          {currentClinical.targetCases.map((c, i) => (
                            <span
                              key={i}
                              className="px-2.5 py-1 rounded-md bg-stone-100 dark:bg-stone-900 text-stone-700 dark:text-stone-300 text-[11px] font-medium border border-stone-200 dark:border-stone-800"
                            >
                              {c}
                            </span>
                          ))}
                        </div>
                      </div>
                    </div>
                  </motion.div>
                )}

                {activeTab === 'authorization' && (
                  <motion.div
                    initial={{ opacity: 0, y: 5 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="p-5 rounded-2xl bg-white dark:bg-stone-950 border border-stone-200 dark:border-stone-800 space-y-3 text-xs"
                  >
                    <div className="flex items-center space-x-2 text-amber-700 dark:text-amber-400 font-bold text-sm">
                      <ShieldCheck className="w-5 h-5" />
                      <span>Uluslararası Federasyon Yetki Kapsamı</span>
                    </div>

                    <p className="text-stone-700 dark:text-stone-300 leading-relaxed text-xs sm:text-sm">
                      {danLevel.authorization}
                    </p>

                    <div className="p-3.5 rounded-xl bg-stone-100 dark:bg-stone-900 border border-stone-200 dark:border-stone-800 text-stone-600 dark:text-stone-400 text-[11px] space-y-1">
                      <p className="font-semibold text-stone-800 dark:text-stone-200">
                        Resmi Tescil Kurumu:
                      </p>
                      <p>International Yumeiho Centre (Tokyo, Japonya) & Avrupa Yumeiho Federasyonu</p>
                      <p className="text-stone-500 dark:text-stone-400 pt-1">
                        Türkiye Temsilcisi Ali Gökmen Düzgün tarafından ıslak imzalı ve güvenlik kodlu olarak düzenlenir.
                      </p>
                    </div>
                  </motion.div>
                )}
              </div>

              {/* Modal Actions Footer */}
              <div className="pt-4 border-t border-stone-200 dark:border-stone-800 flex flex-col sm:flex-row items-center justify-between gap-3">
                <button
                  type="button"
                  onClick={onClose}
                  className="w-full sm:w-auto px-5 py-2.5 rounded-xl border border-stone-300 dark:border-stone-800 text-stone-700 dark:text-stone-300 text-xs font-semibold hover:bg-stone-200/50 dark:hover:bg-stone-800/50 transition-colors cursor-pointer"
                >
                  {t.closeButton}
                </button>

                <button
                  type="button"
                  onClick={() => {
                    onApply(`${danLevel.japaneseTitle} - ${danLevel.turkishTitle}`);
                    onClose();
                  }}
                  className="w-full sm:w-auto px-6 py-2.5 rounded-xl bg-amber-600 hover:bg-amber-500 text-stone-950 font-bold text-xs transition-all shadow-md shadow-amber-600/20 flex items-center justify-center space-x-2 cursor-pointer"
                >
                  <span>{t.applyButton}</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
};
