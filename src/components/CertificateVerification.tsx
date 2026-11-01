import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  ShieldCheck, 
  Search, 
  CheckCircle2, 
  AlertCircle, 
  Copy, 
  Check, 
  ExternalLink, 
  Sparkles, 
  QrCode, 
  FileCheck2, 
  UserCheck, 
  Award, 
  Compass,
  MessageCircle
} from 'lucide-react';
import { VERIFIED_CERTIFICATES, VerifiedCertificate, REPRESENTATIVE_INFO } from '../data/yumeihoData';
import { zenAudio } from '../utils/audioZen';
import { useLanguage } from '../context/LanguageContext';

export const CertificateVerification: React.FC = () => {
  const { language } = useLanguage();
  const [query, setQuery] = useState('');
  const [activeFilter, setActiveFilter] = useState<'all' | 1 | 2 | 3 | 4>('all');
  const [selectedCert, setSelectedCert] = useState<VerifiedCertificate | null>(VERIFIED_CERTIFICATES[0]);
  const [searchStatus, setSearchStatus] = useState<'idle' | 'found' | 'not_found'>('found');
  const [copied, setCopied] = useState(false);
  const [isVerifying, setIsVerifying] = useState(false);

  const handleSearch = (searchQuery: string) => {
    const q = searchQuery.trim().toLowerCase();
    if (!q) {
      setSearchStatus('idle');
      return;
    }

    setIsVerifying(true);
    zenAudio.playZenBowl(528, 1.2);

    setTimeout(() => {
      const found = VERIFIED_CERTIFICATES.find(
        c => c.certNumber.toLowerCase() === q || 
             c.fullName.toLowerCase().includes(q) ||
             c.city.toLowerCase().includes(q)
      );

      if (found) {
        setSelectedCert(found);
        setSearchStatus('found');
      } else {
        setSelectedCert(null);
        setSearchStatus('not_found');
      }
      setIsVerifying(false);
    }, 350);
  };

  const handleChipClick = (certNumber: string) => {
    setQuery(certNumber);
    handleSearch(certNumber);
  };

  const handleCopyHash = () => {
    if (selectedCert) {
      navigator.clipboard.writeText(`${selectedCert.certNumber} - ${selectedCert.fullName} (${selectedCert.danLevel}) | Yumeiho Türkiye Federasyonu`);
      setCopied(true);
      setTimeout(() => setCopied(false), 2200);
    }
  };

  const filteredPractitioners = activeFilter === 'all'
    ? VERIFIED_CERTIFICATES
    : VERIFIED_CERTIFICATES.filter(c => c.danRank === activeFilter);

  return (
    <div className="bg-[#FAF9F5] rounded-3xl border border-[#E6E4DC] p-6 sm:p-10 shadow-sm relative overflow-hidden">
      {/* Subtle Japanese Washi Accent Lines */}
      <div className="absolute top-0 right-0 w-80 h-80 bg-gradient-to-bl from-[#C49B66]/10 via-[#8B261E]/5 to-transparent rounded-full blur-3xl pointer-events-none" />

      {/* Header */}
      <div className="max-w-3xl mb-8">
        <div className="flex items-center gap-2.5 text-[#8B261E] mb-2">
          <span className="inline-flex items-center justify-center border border-[#8B261E] px-2 py-0.5 text-[11px] font-serif font-bold tracking-widest bg-[#8B261E]/5 rounded-xs">
            国際湧命法総本部 · RESMİ KÜTÜK
          </span>
          <span className="text-xs font-semibold uppercase tracking-wider text-[#78716C]">
            {language === 'tr' ? 'Lisans Doğrulama Protokolü' : 'Practitioner Verification Protocol'}
          </span>
        </div>

        <h3 className="font-serif-luxury text-2xl sm:text-3xl font-bold text-[#171614] tracking-tight">
          {language === 'tr' 
            ? 'Yumeiho® Uygulayıcı Lisans & Dan Sertifika Doğrulama' 
            : 'Yumeiho® Practitioner License & Dan Certificate Verification'}
        </h3>
        
        <p className="text-sm text-[#57534E] mt-2 leading-relaxed font-light max-w-2xl">
          {language === 'tr'
            ? 'Türkiye Temsilciliği ve International Yumeiho Centre Tokyo kütüğünde kayıtlı yetkili uygulayıcı ve eğitmenlerin diplomasını sorgulayarak orijinalliğini teyit edin.'
            : 'Verify the authenticity and active accreditation status of certified practitioners and instructors registered with the International Yumeiho Centre.'}
        </p>
      </div>

      {/* Search Input Box */}
      <div className="max-w-2xl mb-6">
        <div className="relative flex items-center">
          <div className="absolute left-4 text-[#78716C] pointer-events-none">
            <Search className="w-5 h-5 text-[#8B261E]" />
          </div>
          <input
            type="text"
            value={query}
            onChange={(e) => {
              setQuery(e.target.value);
              handleSearch(e.target.value);
            }}
            placeholder={language === 'tr' 
              ? 'Sertifika No (örn: TR-YMH-2024-001) veya Terapist Adı...' 
              : 'Certificate ID (e.g., TR-YMH-2024-001) or Practitioner Name...'}
            className="w-full pl-12 pr-10 py-3.5 text-sm bg-white border border-[#D8D6D0] rounded-xl text-[#171614] placeholder-[#A8A29E] focus:outline-none focus:ring-2 focus:ring-[#8B261E] focus:border-transparent transition-all shadow-2xs font-mono"
          />
          {query && (
            <button
              onClick={() => {
                setQuery('');
                setSearchStatus('idle');
              }}
              className="absolute right-3.5 text-xs text-[#78716C] hover:text-[#171614] px-1.5 py-1 rounded-md"
            >
              Temizle
            </button>
          )}
        </div>

        {/* Quick Sample IDs */}
        <div className="flex flex-wrap items-center gap-2 mt-3 text-xs text-[#78716C]">
          <span className="text-[11px] font-medium text-[#A8A29E]">
            {language === 'tr' ? 'Örnek Numaralar:' : 'Quick Examples:'}
          </span>
          {VERIFIED_CERTIFICATES.slice(0, 4).map((c) => (
            <button
              key={c.certNumber}
              type="button"
              onClick={() => handleChipClick(c.certNumber)}
              className="inline-flex items-center gap-1 px-2.5 py-1 rounded-md bg-white hover:bg-[#F2EFE9] border border-[#E6E4DC] text-[11px] font-mono font-medium text-[#171614] hover:text-[#8B261E] transition-colors"
            >
              <span>{c.certNumber}</span>
              <span className="text-[#A8A29E]">({c.fullName.split(' ')[0]})</span>
            </button>
          ))}
        </div>
      </div>

      {/* Verification Result Display */}
      <AnimatePresence mode="wait">
        {isVerifying ? (
          <motion.div
            key="loading"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="p-8 text-center bg-white rounded-2xl border border-[#E6E4DC] my-6"
          >
            <div className="inline-block animate-spin w-6 h-6 border-2 border-[#8B261E] border-t-transparent rounded-full mb-3" />
            <p className="text-xs font-mono uppercase tracking-widest text-[#78716C]">
              {language === 'tr' ? 'Federasyon Kütüğü Taranıyor...' : 'Querying Federation Registry...'}
            </p>
          </motion.div>
        ) : searchStatus === 'found' && selectedCert ? (
          <motion.div
            key="certificate"
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -12 }}
            transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
            className="relative bg-white rounded-2xl border-2 border-[#C49B66]/60 p-6 sm:p-9 shadow-md overflow-hidden"
          >
            {/* Traditional Certificate Washi Watermark & Crest */}
            <div className="absolute top-4 right-4 sm:top-8 sm:right-8 flex flex-col items-end pointer-events-none">
              <div className="w-16 h-16 sm:w-20 sm:h-20 rounded-full border-2 border-[#8B261E] text-[#8B261E] flex flex-col items-center justify-center p-1 font-serif text-[10px] sm:text-xs font-bold leading-tight tracking-wider bg-[#8B261E]/5 rotate-12 shadow-2xs">
                <span>湧命法</span>
                <span className="text-[8px] sm:text-[9px] uppercase tracking-normal">公認済</span>
                <span className="text-[7px] text-[#8B261E]/80">VERIFIED</span>
              </div>
            </div>

            {/* Top Verification Status Badge */}
            <div className="flex flex-wrap items-center justify-between gap-4 border-b border-[#E6E4DC] pb-5 mb-6">
              <div className="flex items-center gap-2">
                <span className="w-3 h-3 rounded-full bg-emerald-500 animate-pulse" />
                <span className="text-xs font-bold uppercase tracking-widest text-emerald-800">
                  {language === 'tr' ? 'Resmi Onaylı Dan Diploması' : 'Verified Official Dan Diploma'}
                </span>
                <span className="text-xs text-[#A8A29E]">·</span>
                <span className="text-xs font-mono font-semibold text-[#8B261E]">
                  {selectedCert.certNumber}
                </span>
              </div>

              <div className="flex items-center gap-2">
                <button
                  type="button"
                  onClick={handleCopyHash}
                  className="inline-flex items-center gap-1.5 px-3 py-1 rounded-lg border border-[#D8D6D0] hover:border-[#171614] bg-[#FAF9F5] text-xs font-medium text-[#44403C] hover:text-[#171614] transition-colors"
                  title="Sertifika bilgilerini kopyala"
                >
                  {copied ? (
                    <>
                      <Check className="w-3.5 h-3.5 text-emerald-600" />
                      <span className="text-emerald-700">Kopyalandı</span>
                    </>
                  ) : (
                    <>
                      <Copy className="w-3.5 h-3.5 text-[#78716C]" />
                      <span>{language === 'tr' ? 'Kopyala' : 'Copy'}</span>
                    </>
                  )}
                </button>
              </div>
            </div>

            {/* Certificate Core Content - Traditional Japanese Menkyo Form */}
            <div className="space-y-6">
              <div className="text-center sm:text-left">
                <span className="text-[11px] font-serif uppercase tracking-widest text-[#C49B66] font-bold block mb-1">
                  INTERNATIONAL YUMEIHO CENTRE · TOKYO & TÜRKİYE
                </span>
                <h4 className="font-serif-luxury text-2xl sm:text-3xl font-bold text-[#171614]">
                  {selectedCert.fullName}
                </h4>
                <div className="flex flex-wrap items-center gap-2 mt-2">
                  <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-md bg-[#171614] text-white text-xs font-semibold tracking-wide">
                    <Award className="w-3.5 h-3.5 text-[#C49B66]" />
                    <span>{selectedCert.danLevel}</span>
                  </span>
                  <span className="inline-flex items-center px-2.5 py-1 rounded-md bg-[#F2EFE9] text-[#8B261E] text-xs font-serif font-bold">
                    {selectedCert.japaneseRank}
                  </span>
                  <span className="inline-flex items-center px-2.5 py-1 rounded-md bg-emerald-50 text-emerald-800 text-xs font-semibold border border-emerald-200">
                    <CheckCircle2 className="w-3 h-3 mr-1" />
                    {selectedCert.status}
                  </span>
                </div>
              </div>

              {/* Data Specifications Grid */}
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4 p-4 rounded-xl bg-[#FAF9F5] border border-[#E6E4DC] text-xs">
                <div>
                  <span className="text-[11px] uppercase tracking-wider text-[#A8A29E] block mb-0.5">
                    {language === 'tr' ? 'Yetkili Temsilci' : 'Authorizing Master'}
                  </span>
                  <span className="font-semibold text-[#171614] block">
                    {selectedCert.instructor}
                  </span>
                  <span className="text-[10px] text-[#78716C]">Türkiye Temsilcisi</span>
                </div>

                <div>
                  <span className="text-[11px] uppercase tracking-wider text-[#A8A29E] block mb-0.5">
                    {language === 'tr' ? 'Düzenlenme Tarihi' : 'Issued Date'}
                  </span>
                  <span className="font-semibold text-[#171614] block">
                    {selectedCert.issuedDate}
                  </span>
                  <span className="text-[10px] text-[#78716C]">{selectedCert.city}</span>
                </div>

                <div>
                  <span className="text-[11px] uppercase tracking-wider text-[#A8A29E] block mb-0.5">
                    {language === 'tr' ? 'Uzmanlık Alanı' : 'Specialization'}
                  </span>
                  <span className="font-semibold text-[#171614] block truncate" title={selectedCert.specialization}>
                    {selectedCert.specialization}
                  </span>
                  <span className="text-[10px] text-[#78716C]">{selectedCert.validUntil}</span>
                </div>

                <div>
                  <span className="text-[11px] uppercase tracking-wider text-[#A8A29E] block mb-0.5">
                    {language === 'tr' ? 'Kriptografik Doğrulama' : 'Security Hash'}
                  </span>
                  <span className="font-mono text-[10px] text-[#8B261E] block font-semibold">
                    {selectedCert.securityHash}
                  </span>
                  <span className="text-[10px] text-emerald-700 font-medium">Tam Eşleşme Sağlandı</span>
                </div>
              </div>

              {/* Bottom Official Sign-off and Inquiry link */}
              <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 pt-2 text-xs text-[#78716C]">
                <div className="flex items-center gap-2">
                  <ShieldCheck className="w-4 h-4 text-[#8B261E]" />
                  <span>Bu sertifika Uluslararası Yumeiho Federasyonu kütüğüyle anlık olarak doğrulanmıştır.</span>
                </div>

                <a
                  href={`https://wa.me/${REPRESENTATIVE_INFO.whatsapp.replace(/\D/g, '')}?text=${encodeURIComponent(
                    `Merhaba Ali Bey, ${selectedCert.certNumber} numaralı Yumeiho Dan sertifikası hakkında teyit almak istiyorum.`
                  )}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1.5 text-xs font-semibold text-[#8B261E] hover:underline"
                >
                  <MessageCircle className="w-3.5 h-3.5" />
                  <span>Temsilcilikten WhatsApp Teyidi Al</span>
                </a>
              </div>
            </div>
          </motion.div>
        ) : searchStatus === 'not_found' ? (
          <motion.div
            key="not_found"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            className="p-6 bg-amber-50/80 rounded-2xl border border-amber-200 text-xs text-[#8B261E] flex items-start gap-3.5 my-4"
          >
            <AlertCircle className="w-5 h-5 text-[#8B261E] shrink-0 mt-0.5" />
            <div className="space-y-1">
              <p className="font-semibold text-sm text-[#171614]">
                {language === 'tr' ? 'Sertifika Kaydı Bulunamadı' : 'No Certificate Record Found'}
              </p>
              <p className="text-[#78716C] leading-relaxed">
                {language === 'tr'
                  ? `"${query}" numarası dijital kütükte listelenmedi. 2020 öncesi basılı sertifikalar veya henüz dijital ortama aktarılmamış kayıtlar için lütfen doğrudan Türkiye Temsilcisi Ali Gökmen Düzgün ile iletişime geçiniz.`
                  : `No active practitioner match was found for "${query}". For historical paper diplomas or pending enrollments, please contact the representative directly.`}
              </p>
              <a
                href={`https://wa.me/${REPRESENTATIVE_INFO.whatsapp.replace(/\D/g, '')}?text=${encodeURIComponent(
                  `Merhaba Ali Bey, web sitenizde ${query} kodlu sertifikayı sorguladım ancak kayda ulaşamadım. Bilgi alabilir miyim?`
                )}`}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1 font-semibold text-[#8B261E] underline pt-1"
              >
                Temsilcilikle İletişime Geçin &rarr;
              </a>
            </div>
          </motion.div>
        ) : null}
      </AnimatePresence>

      {/* Certified Alumni Directory Browser */}
      <div className="mt-10 pt-8 border-t border-[#E6E4DC]">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-4">
          <div>
            <h4 className="font-serif-luxury text-lg font-bold text-[#171614]">
              {language === 'tr' ? 'Türkiye Akredite Terapistler Dizini' : 'Certified Practitioners Directory'}
            </h4>
            <p className="text-xs text-[#78716C] mt-0.5">
              {language === 'tr' 
                ? 'Dan seviyelerine göre yetkilendirilmiş mezun uygulayıcıları inceleyin'
                : 'Browse accredited graduates by Dan rank'}
            </p>
          </div>

          {/* Level Filter Tabs */}
          <div className="flex items-center gap-1.5 p-1 bg-white rounded-xl border border-[#E6E4DC] text-xs">
            <button
              onClick={() => setActiveFilter('all')}
              className={`px-2.5 py-1 rounded-lg transition-colors font-medium ${
                activeFilter === 'all' 
                  ? 'bg-[#171614] text-white' 
                  : 'text-[#78716C] hover:text-[#171614]'
              }`}
            >
              {language === 'tr' ? 'Tümü' : 'All'}
            </button>
            <button
              onClick={() => setActiveFilter(1)}
              className={`px-2.5 py-1 rounded-lg transition-colors font-medium ${
                activeFilter === 1 
                  ? 'bg-[#171614] text-white' 
                  : 'text-[#78716C] hover:text-[#171614]'
              }`}
            >
              1. Dan
            </button>
            <button
              onClick={() => setActiveFilter(2)}
              className={`px-2.5 py-1 rounded-lg transition-colors font-medium ${
                activeFilter === 2 
                  ? 'bg-[#171614] text-white' 
                  : 'text-[#78716C] hover:text-[#171614]'
              }`}
            >
              2. Dan
            </button>
            <button
              onClick={() => setActiveFilter(3)}
              className={`px-2.5 py-1 rounded-lg transition-colors font-medium ${
                activeFilter === 3 
                  ? 'bg-[#171614] text-white' 
                  : 'text-[#78716C] hover:text-[#171614]'
              }`}
            >
              3. Dan
            </button>
            <button
              onClick={() => setActiveFilter(4)}
              className={`px-2.5 py-1 rounded-lg transition-colors font-medium ${
                activeFilter === 4 
                  ? 'bg-[#171614] text-white' 
                  : 'text-[#78716C] hover:text-[#171614]'
              }`}
            >
              4. Dan
            </button>
          </div>
        </div>

        {/* Practitioner Mini Cards Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
          {filteredPractitioners.map((practitioner) => (
            <button
              key={practitioner.certNumber}
              type="button"
              onClick={() => handleChipClick(practitioner.certNumber)}
              className={`text-left p-3.5 rounded-xl border transition-all flex items-start justify-between gap-3 ${
                selectedCert?.certNumber === practitioner.certNumber
                  ? 'bg-white border-[#8B261E] shadow-sm ring-1 ring-[#8B261E]/20'
                  : 'bg-white/70 hover:bg-white border-[#E6E4DC] hover:border-[#C49B66]'
              }`}
            >
              <div className="space-y-1 min-w-0">
                <div className="flex items-center gap-2">
                  <span className="font-bold text-xs text-[#171614] truncate">
                    {practitioner.fullName}
                  </span>
                  <span className="text-[10px] font-mono text-[#8B261E] font-medium shrink-0">
                    {practitioner.danRank}. Dan
                  </span>
                </div>
                <p className="text-[11px] text-[#78716C] truncate">
                  {practitioner.city} · {practitioner.specialization}
                </p>
                <p className="text-[10px] font-mono text-[#A8A29E]">
                  {practitioner.certNumber}
                </p>
              </div>

              <div className="shrink-0 p-1 rounded-md text-[#78716C] hover:text-[#8B261E]">
                <FileCheck2 className="w-4 h-4 text-[#C49B66]" />
              </div>
            </button>
          ))}
        </div>
      </div>

    </div>
  );
};
