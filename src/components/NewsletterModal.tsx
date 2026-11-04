import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Mail, Sparkles, X, CheckCircle2, ShieldCheck, ArrowRight } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';
import { zenAudio } from '../utils/audioZen';

interface NewsletterModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const NewsletterModal: React.FC<NewsletterModalProps> = ({ isOpen, onClose }) => {
  const { language } = useLanguage();
  const [email, setEmail] = useState('');
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const content = {
    tr: {
      badge: 'YUMEIHO KLİNİK BÜLTENİ',
      kanji: '幽命法 学術報',
      title: 'Duruş Sağlığı ve Pelvik Biyomekanik Araştırmaları',
      subtitle: 'Pelvik hipotez, omurga hizalanması ve klinik Yumeiho vakalarından ilk siz haberdar olun.',
      benefits: [
        'Aylık Klinik Vaka Analizleri & Biyomekanik Raporlar',
        'Kişiselleştirilmiş Duruş ve Somatik Nefes Rehberi',
        'Seminer ve Workshop Randevularında Öncelikli Erişim'
      ],
      placeholder: 'E-posta adresinizi giriniz...',
      button: 'Abone Ol & Eriş',
      submitting: 'Kaydediliyor...',
      disclaimer: 'Gizliliğinize saygı duyuyoruz. İstediğiniz zaman ayrılabilirsiniz.',
      successTitle: 'Bültene Hoş Geldiniz',
      successMessage: 'E-posta adresiniz başarıyla kaydedildi. İlk biyomekanik klinik bülteniniz yakında iletilecektir.',
      closeText: 'Kapat',
      notNow: 'Şimdilik Atla',
      invalidEmail: 'Lütfen geçerli bir e-posta adresi giriniz.'
    },
    jp: {
      badge: 'YUMEIHO 臨床ニュースレター',
      kanji: '幽命法 骨盤医学',
      title: '骨盤生体力学と姿勢改善の最新臨床研究',
      subtitle: '骨盤変位 hypothesis、脊椎バランス、Yumeiho療法の専門症例論文をお届けします。',
      benefits: [
        '月次 骨盤・脊椎臨床症例レポート',
        '日常生活の姿勢矯正・呼吸法ガイド',
        '施術・講習会の優先予約案内'
      ],
      placeholder: 'メールアドレスを入力...',
      button: '購読する（無料）',
      submitting: '送信中...',
      disclaimer: 'スパムは送信しません。いつでも解除可能です。',
      successTitle: 'ご登録ありがとうございます',
      successMessage: 'メールアドレスの登録が完了しました。最新の臨床情報をお送りいたします。',
      closeText: '閉じる',
      notNow: '後で検討する',
      invalidEmail: '有効なメールアドレスを入力してください。'
    },
    en: {
      badge: 'YUMEIHO CLINICAL JOURNAL',
      kanji: 'YUMEIHO ACADEMIA',
      title: 'Pelvic Biomechanics & Postural Health Research',
      subtitle: 'Get peer-reviewed case studies, spinal alignment insights, and clinical Yumeiho updates.',
      benefits: [
        'Monthly Biomechanical & Pelvic Case Analysis',
        'Personalized Postural Care & Somatic Breathing Guides',
        'Priority Access to Clinical Appointments & Workshops'
      ],
      placeholder: 'Enter your email address...',
      button: 'Subscribe for Updates',
      submitting: 'Registering...',
      disclaimer: 'We respect your privacy. Unsubscribe at any time with one click.',
      successTitle: 'Welcome to the Clinical Circle',
      successMessage: 'Your subscription is confirmed. Our next biomechanical update will reach your inbox shortly.',
      closeText: 'Close Window',
      notNow: 'Maybe Later',
      invalidEmail: 'Please provide a valid email address.'
    }
  };

  const t = content[language];

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMessage('');

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email.trim())) {
      setErrorMessage(t.invalidEmail);
      return;
    }

    setIsLoading(true);

    setTimeout(() => {
      setIsLoading(false);
      setIsSubmitted(true);
      zenAudio.playZenBowl(528, 2.0);
      if (typeof window !== 'undefined') {
        sessionStorage.setItem('yumeiho_newsletter_dismissed', 'true');
      }
    }, 800);
  };

  const handleClose = () => {
    onClose();
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 overflow-y-auto">
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={handleClose}
            className="fixed inset-0 bg-stone-950/80 backdrop-blur-md transition-opacity"
          />

          {/* Modal Card */}
          <motion.div
            initial={{ opacity: 0, scale: 0.92, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.92, y: 20 }}
            transition={{ type: 'spring', damping: 25, stiffness: 300 }}
            className="relative w-full max-w-lg bg-[#FAF8F5] dark:bg-[#121110] border border-stone-300 dark:border-stone-800 rounded-3xl shadow-2xl overflow-hidden z-10 text-stone-900 dark:text-stone-100 my-8"
          >
            {/* Top Decorative Zen Pattern Banner */}
            <div className="h-2 bg-gradient-to-r from-amber-600 via-stone-400 to-amber-700" />

            {/* Close Button */}
            <button
              onClick={handleClose}
              className="absolute top-4 right-4 p-2 rounded-full text-stone-400 hover:text-stone-700 dark:hover:text-stone-200 hover:bg-stone-200/50 dark:hover:bg-stone-800/50 transition-colors z-20"
              aria-label="Close"
            >
              <X className="w-5 h-5" />
            </button>

            <div className="p-6 sm:p-8">
              {!isSubmitted ? (
                <div>
                  {/* Header Badges */}
                  <div className="flex items-center justify-between mb-3">
                    <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full bg-amber-500/10 border border-amber-500/20 text-amber-700 dark:text-amber-400 text-[11px] font-mono tracking-wider">
                      <Sparkles className="w-3 h-3" />
                      <span>{t.badge}</span>
                    </div>
                    <span className="font-serif font-bold text-amber-600/80 dark:text-amber-500/80 text-sm tracking-widest">
                      {t.kanji}
                    </span>
                  </div>

                  {/* Title & Description */}
                  <h3 className="font-serif text-2xl sm:text-3xl font-bold tracking-tight text-stone-900 dark:text-stone-100 mb-2 leading-snug">
                    {t.title}
                  </h3>
                  <p className="text-xs sm:text-sm text-stone-600 dark:text-stone-400 leading-relaxed mb-6">
                    {t.subtitle}
                  </p>

                  {/* Benefits Checklist */}
                  <div className="space-y-2.5 mb-6 p-4 rounded-2xl bg-stone-100/80 dark:bg-stone-900/60 border border-stone-200 dark:border-stone-800">
                    {t.benefits.map((benefit, index) => (
                      <div key={index} className="flex items-start space-x-2.5 text-xs text-stone-700 dark:text-stone-300">
                        <CheckCircle2 className="w-4 h-4 text-amber-600 dark:text-amber-500 shrink-0 mt-0.5" />
                        <span>{benefit}</span>
                      </div>
                    ))}
                  </div>

                  {/* Form */}
                  <form onSubmit={handleSubmit} className="space-y-3">
                    <div>
                      <div className="relative">
                        <Mail className="w-4 h-4 text-stone-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
                        <input
                          type="email"
                          value={email}
                          onChange={(e) => setEmail(e.target.value)}
                          placeholder={t.placeholder}
                          className="w-full pl-10 pr-4 py-3 bg-white dark:bg-stone-950 border border-stone-300 dark:border-stone-800 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-amber-500/50 focus:border-amber-500 transition-all text-stone-900 dark:text-stone-100"
                        />
                      </div>
                      {errorMessage && (
                        <p className="mt-1.5 text-xs text-rose-500 dark:text-rose-400 font-medium ml-1">
                          {errorMessage}
                        </p>
                      )}
                    </div>

                    <button
                      type="submit"
                      disabled={isLoading}
                      className="w-full py-3 px-6 rounded-xl bg-amber-600 hover:bg-amber-500 text-stone-950 font-medium text-sm transition-all shadow-lg shadow-amber-600/20 flex items-center justify-center space-x-2 cursor-pointer disabled:opacity-50"
                    >
                      {isLoading ? (
                        <span>{t.submitting}</span>
                      ) : (
                        <>
                          <span>{t.button}</span>
                          <ArrowRight className="w-4 h-4" />
                        </>
                      )}
                    </button>
                  </form>

                  {/* Footer Disclaimer & Dismiss Button */}
                  <div className="mt-4 pt-4 border-t border-stone-200 dark:border-stone-800 flex items-center justify-between text-[11px] text-stone-500 dark:text-stone-400">
                    <div className="flex items-center space-x-1.5">
                      <ShieldCheck className="w-3.5 h-3.5 text-stone-400" />
                      <span>{t.disclaimer}</span>
                    </div>
                    <button
                      type="button"
                      onClick={handleClose}
                      className="hover:text-stone-800 dark:hover:text-stone-200 underline underline-offset-2 transition-colors cursor-pointer"
                    >
                      {t.notNow}
                    </button>
                  </div>
                </div>
              ) : (
                /* Success View */
                <div className="text-center py-6 space-y-4">
                  <div className="w-16 h-16 rounded-full bg-amber-500/10 border border-amber-500/20 flex items-center justify-center mx-auto text-amber-600 dark:text-amber-400">
                    <Sparkles className="w-8 h-8 animate-pulse" />
                  </div>

                  <h3 className="font-serif text-2xl font-bold text-stone-900 dark:text-stone-100">
                    {t.successTitle}
                  </h3>

                  <p className="text-sm text-stone-600 dark:text-stone-400 max-w-sm mx-auto leading-relaxed">
                    {t.successMessage}
                  </p>

                  <button
                    onClick={handleClose}
                    className="mt-4 px-8 py-2.5 rounded-xl bg-stone-900 dark:bg-stone-100 text-stone-100 dark:text-stone-900 text-sm font-medium hover:bg-stone-800 dark:hover:bg-white transition-colors cursor-pointer"
                  >
                    {t.closeText}
                  </button>
                </div>
              )}
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
};
