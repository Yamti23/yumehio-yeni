import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Compass, Check, ArrowRight, RotateCcw, Calendar, Activity, ShieldCheck, HeartPulse } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';

interface Step1Option {
  id: string;
  title: { tr: string; jp: string; en: string };
  desc: { tr: string; jp: string; en: string };
  iconName: string;
}

const STEP_1: Step1Option[] = [
  {
    id: 'lumbar',
    title: { tr: 'Bel Ağrısı & Fıtık Hassasiyeti', jp: '腰痛・椎間板ヘルニア感作', en: 'Lower Back & Disc Compression' },
    desc: { tr: 'Sakroiliyak kilitlenme, L4-L5 diskomforu, siyatik batmaları', jp: '仙腸関節ロック・L4-L5腰椎不快感・坐骨神経痛', en: 'Sacroiliac stiffness, L4-L5 discomfort, sciatica radiation' },
    iconName: 'Activity'
  },
  {
    id: 'scoliosis',
    title: { tr: 'Skolyoz & Bacak Boyu Farkı', jp: '側弯症・脚長差（左右の不均衡）', en: 'Scoliosis & Leg Length Variance' },
    desc: { tr: 'Omurga eğriliği, omuz seviye farkı, pelvik rotasyon', jp: '脊柱彎曲・左右肩高差・骨盤回旋ねじれ', en: 'Spinal curve, shoulder height discrepancy, pelvic rotation' },
    iconName: 'Compass'
  },
  {
    id: 'cervical',
    title: { tr: 'Boyun, Omuz & Sırt Sertliği', jp: '頸椎・肩こり・背部硬直', en: 'Cervical & Upper Back Rigidity' },
    desc: { tr: 'Masa başı duruşu, C1-C7 kulunçlar, gerilim baş ağrısı', jp: 'ストレートネック・C1-C7結節・緊張性頭痛', en: 'Forward head posture, C1-C7 tightness, tension headaches' },
    iconName: 'HeartPulse'
  },
  {
    id: 'ans_stress',
    title: { tr: 'Somatik Stres & Anksiyete', jp: '身体的不安・自律神経疲弊', en: 'Somatic Stress & ANS Exhaustion' },
    desc: { tr: 'Sürekli sempatik uyarım, psoas kasılması, uyku bozukluğu', jp: '交感神経過緊張・大腰筋の慢性攣縮・睡眠障害', en: 'Continuous sympathetic arousal, psoas tension, poor sleep' },
    iconName: 'ShieldCheck'
  }
];

const STEP_2 = [
  { id: 'recent', title: { tr: 'Son 1-3 Ay (Yeni Başlayan)', jp: '直近1〜3ヶ月（急性期）', en: 'Recent (1-3 Months)' } },
  { id: 'desk', title: { tr: 'Yoğun Masa Başı Çalışma (Yıllardır)', jp: '長年のデスクワーク作業（慢性期）', en: 'Prolonged Desk Work (Years)' } },
  { id: 'chronic', title: { tr: 'Kronik Düzensizlik (1+ Yıl)', jp: '慢性的な身体の歪み（1年以上）', en: 'Chronic Asymmetry (1+ Year)' } }
];

const STEP_3 = [
  { id: 'pain_relief', title: { tr: 'Ağrısız & Özgür Hareket Kabiliyeti', jp: '無痛で自由な身体可動性', en: 'Pain-Free Mobility' } },
  { id: 'symmetry', title: { tr: 'Tam Pelvis & Postür Simetrisi', jp: '完全な骨盤・姿勢の左右対称化', en: 'Full Pelvic & Postural Symmetry' } },
  { id: 'preventative', title: { tr: 'Uzun Vadeli Koruyucu Yumeiho Bakımı', jp: '長期的・予防的な湧命法メンテナンス', en: 'Long-Term Preventive Maintenance' } }
];

interface TherapyRecoveryWizardProps {
  onOpenBooking: (tab: 'therapy' | 'seminar', note?: string) => void;
}

export const TherapyRecoveryWizard: React.FC<TherapyRecoveryWizardProps> = ({ onOpenBooking }) => {
  const { language } = useLanguage();
  const [currentStep, setCurrentStep] = useState(1);
  const [selectedSymptom, setSelectedSymptom] = useState<string>('lumbar');
  const [selectedDuration, setSelectedDuration] = useState<string>('desk');
  const [selectedGoal, setSelectedGoal] = useState<string>('symmetry');

  const handleNext = () => {
    if (currentStep < 4) setCurrentStep(c => c + 1);
  };

  const handleReset = () => {
    setCurrentStep(1);
    setSelectedSymptom('lumbar');
    setSelectedDuration('desk');
    setSelectedGoal('symmetry');
  };

  const getPlanSummary = () => {
    const symptomObj = STEP_1.find(s => s.id === selectedSymptom);
    const durationObj = STEP_2.find(d => d.id === selectedDuration);
    const goalObj = STEP_3.find(g => g.id === selectedGoal);

    const symptomTitle = symptomObj?.title[language] || '';
    const durationTitle = durationObj?.title[language] || '';
    const goalTitle = goalObj?.title[language] || '';

    if (language === 'jp') {
      return `湧命法 施術評価サマリー:\n- 主訴: ${symptomTitle}\n- 期間: ${durationTitle}\n- 目標: ${goalTitle}\n- 推奨プラン: 6回のバイオメカニクス骨盤変位矯正＆椎間板減圧セッション。`;
    } else if (language === 'tr') {
      return `Kişisel Yumeiho Değerlendirme Özeti:\n- Şikayet: ${symptomTitle}\n- Süreç: ${durationTitle}\n- Hedef: ${goalTitle}\n- Önerilen Seans Protokolü: 6 Seanslık Biyomekanik Düzeltme & Pelvis Dekompresyonu.`;
    } else {
      return `Personal Yumeiho Assessment Summary:\n- Condition: ${symptomTitle}\n- Duration: ${durationTitle}\n- Target: ${goalTitle}\n- Recommended Plan: 6-Session Biomechanical Alignment & Pelvic Decompression.`;
    }
  };

  return (
    <section className="py-24 bg-stone-900 text-stone-100 border-t border-stone-800 transition-colors duration-300">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-12">
          <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full bg-amber-900/40 text-amber-300 border border-amber-700/40 text-xs tracking-wider uppercase mb-3">
            <Compass className="w-3.5 h-3.5" />
            <span>{language === 'tr' ? 'Biyomekanik Terapi Sihirbazı' : 'Biomechanical Recovery Wizard'}</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-serif text-amber-50 tracking-tight">
            {language === 'tr' ? 'Kişiselleştirilmiş Yumeiho İyileşme Planı' : 'Personalized Yumeiho Recovery Roadmap'}
          </h2>
          <p className="mt-3 text-stone-400 text-sm">
            {language === 'tr'
              ? 'Mevcut duruş hassasiyetlerinize uygun 4 adımlı analiz ve kişiye özel seans protokolü önerisi.'
              : 'A 4-step diagnostic wizard calculating your tailored pelvic alignment and session plan.'}
          </p>
        </div>

        {/* Wizard Box */}
        <div className="bg-stone-950 border border-stone-800 rounded-3xl p-6 sm:p-10 shadow-2xl relative overflow-hidden">
          {/* Progress Indicator */}
          <div className="flex items-center justify-between mb-8 pb-6 border-b border-stone-800/80">
            <span className="text-xs font-mono uppercase tracking-widest text-amber-400">
              {language === 'tr' ? `Adım ${currentStep} / 4` : `Step ${currentStep} of 4`}
            </span>
            <div className="flex items-center space-x-2">
              {[1, 2, 3, 4].map(s => (
                <div
                  key={s}
                  className={`h-2 rounded-full transition-all duration-300 ${
                    s === currentStep
                      ? 'w-8 bg-amber-500'
                      : s < currentStep
                      ? 'w-3 bg-amber-800'
                      : 'w-3 bg-stone-800'
                  }`}
                />
              ))}
            </div>
          </div>

          {/* Step 1: Primary Symptom */}
          {currentStep === 1 && (
            <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} className="space-y-6">
              <h3 className="text-xl font-serif text-stone-100">
                {language === 'tr' ? '1. Ana Postür veya Hassasiyet Bölgesi Seçin:' : '1. Select Primary Symptom or Postural Issue:'}
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {STEP_1.map(item => {
                  const isSel = selectedSymptom === item.id;
                  return (
                    <button
                      key={item.id}
                      onClick={() => setSelectedSymptom(item.id)}
                      className={`p-5 rounded-2xl text-left border transition-all ${
                        isSel
                          ? 'bg-amber-950/40 border-amber-500 text-white shadow-lg shadow-amber-950/30'
                          : 'bg-stone-900/60 border-stone-800 text-stone-400 hover:border-stone-700 hover:text-stone-200'
                      }`}
                    >
                      <div className="flex items-center justify-between mb-2">
                        <span className="font-semibold text-base text-amber-100">{item.title[language]}</span>
                        {isSel && <Check className="w-5 h-5 text-amber-400" />}
                      </div>
                      <p className="text-xs text-stone-400 leading-relaxed">{item.desc[language]}</p>
                    </button>
                  );
                })}
              </div>
            </motion.div>
          )}

          {/* Step 2: Duration */}
          {currentStep === 2 && (
            <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} className="space-y-6">
              <h3 className="text-xl font-serif text-stone-100">
                {language === 'tr' ? '2. Bu durum ne kadar süredir devam ediyor?' : '2. How long have you experienced this condition?'}
              </h3>
              <div className="space-y-3">
                {STEP_2.map(item => {
                  const isSel = selectedDuration === item.id;
                  return (
                    <button
                      key={item.id}
                      onClick={() => setSelectedDuration(item.id)}
                      className={`w-full p-4 rounded-xl text-left border transition-all flex items-center justify-between ${
                        isSel
                          ? 'bg-amber-950/40 border-amber-500 text-white'
                          : 'bg-stone-900/60 border-stone-800 text-stone-400 hover:border-stone-700'
                      }`}
                    >
                      <span className="font-medium text-sm text-stone-200">{item.title[language]}</span>
                      {isSel && <Check className="w-4 h-4 text-amber-400" />}
                    </button>
                  );
                })}
              </div>
            </motion.div>
          )}

          {/* Step 3: Goal */}
          {currentStep === 3 && (
            <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} className="space-y-6">
              <h3 className="text-xl font-serif text-stone-100">
                {language === 'tr' ? '3. Öncelikli Terapötik Hedefiniz:' : '3. What is your primary therapeutic goal?'}
              </h3>
              <div className="space-y-3">
                {STEP_3.map(item => {
                  const isSel = selectedGoal === item.id;
                  return (
                    <button
                      key={item.id}
                      onClick={() => setSelectedGoal(item.id)}
                      className={`w-full p-4 rounded-xl text-left border transition-all flex items-center justify-between ${
                        isSel
                          ? 'bg-amber-950/40 border-amber-500 text-white'
                          : 'bg-stone-900/60 border-stone-800 text-stone-400 hover:border-stone-700'
                      }`}
                    >
                      <span className="font-medium text-sm text-stone-200">{item.title[language]}</span>
                      {isSel && <Check className="w-4 h-4 text-amber-400" />}
                    </button>
                  );
                })}
              </div>
            </motion.div>
          )}

          {/* Step 4: Customized Results */}
          {currentStep === 4 && (
            <motion.div initial={{ opacity: 0, scale: 0.98 }} animate={{ opacity: 1, scale: 1 }} className="space-y-6">
              <div className="p-6 rounded-2xl bg-gradient-to-br from-amber-950/50 via-stone-900 to-stone-950 border border-amber-500/40 shadow-xl">
                <span className="text-xs uppercase tracking-widest text-amber-400 font-semibold">
                  {language === 'tr' ? 'Özel Hazırlanan Biyomekanik İyileşme Planı' : 'Tailored Biomechanical Plan Result'}
                </span>
                <h4 className="text-2xl font-serif text-amber-100 mt-2">
                  {language === 'tr' ? '4 Haftalık Pelvik Simetri & Dekompresyon Protokolü' : '4-Week Pelvic Symmetry & Decompression Protocol'}
                </h4>

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mt-6 pt-6 border-t border-amber-900/40">
                  <div className="p-3 bg-stone-900/80 rounded-xl border border-stone-800">
                    <span className="text-[11px] text-stone-400 block">{language === 'tr' ? 'Önerilen Seans Adedi' : 'Recommended Sessions'}</span>
                    <span className="text-xl font-bold font-mono text-amber-300">4 - 6 Seans</span>
                  </div>
                  <div className="p-3 bg-stone-900/80 rounded-xl border border-stone-800">
                    <span className="text-[11px] text-stone-400 block">{language === 'tr' ? 'Tahmini Duruş Düzeltimi' : 'Est. Symmetry Gain'}</span>
                    <span className="text-xl font-bold font-mono text-emerald-400">+85% Simetri</span>
                  </div>
                  <div className="p-3 bg-stone-900/80 rounded-xl border border-stone-800">
                    <span className="text-[11px] text-stone-400 block">{language === 'tr' ? 'Önerilen Kata Uygulaması' : 'Key Kata Focus'}</span>
                    <span className="text-sm font-semibold text-stone-200">K-12 ila K-48 Pelvis Mobilizasyonu</span>
                  </div>
                </div>

                <div className="mt-6 text-xs text-stone-300 leading-relaxed bg-stone-900/90 p-4 rounded-xl border border-stone-800">
                  <p className="whitespace-pre-line font-sans">{getPlanSummary()}</p>
                </div>
              </div>

              <div className="flex flex-col sm:flex-row items-center justify-between gap-4 pt-4">
                <button
                  onClick={handleReset}
                  className="px-4 py-2 text-xs text-stone-400 hover:text-stone-200 flex items-center space-x-1.5"
                >
                  <RotateCcw className="w-3.5 h-3.5" />
                  <span>{language === 'tr' ? 'Testi Yeniden Başlat' : 'Retake Wizard'}</span>
                </button>

                <button
                  onClick={() => onOpenBooking('therapy', getPlanSummary())}
                  className="w-full sm:w-auto px-8 py-3.5 rounded-full bg-amber-500 hover:bg-amber-400 text-stone-950 font-semibold text-sm shadow-lg shadow-amber-950/50 flex items-center justify-center space-x-2 transition-transform active:scale-95"
                >
                  <span>{language === 'tr' ? 'Bu Plan İle Randevu Al' : 'Book Session With This Plan'}</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            </motion.div>
          )}

          {/* Navigation Buttons for Step 1-3 */}
          {currentStep < 4 && (
            <div className="flex items-center justify-between mt-8 pt-6 border-t border-stone-800/80">
              <button
                disabled={currentStep === 1}
                onClick={() => setCurrentStep(c => Math.max(1, c - 1))}
                className="px-4 py-2 text-xs text-stone-400 hover:text-stone-200 disabled:opacity-30 disabled:pointer-events-none"
              >
                {language === 'tr' ? 'Geri' : 'Back'}
              </button>

              <button
                onClick={handleNext}
                className="px-6 py-2.5 rounded-full bg-amber-600 hover:bg-amber-500 text-stone-950 font-medium text-xs flex items-center space-x-2"
              >
                <span>{language === 'tr' ? 'Devam Et' : 'Continue'}</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>
          )}
        </div>
      </div>
    </section>
  );
};
