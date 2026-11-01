import React, { useState } from 'react';
import { Calendar, MapPin, Clock, Users, Send, CheckCircle2, MessageSquare, Phone, Mail, ChevronDown, Sparkles } from 'lucide-react';
import { PLANNED_EVENTS, EXPANDED_FAQS, REPRESENTATIVE_INFO, YumeihoEvent } from '../data/yumeihoData';
import { SectionHeader } from './SectionHeader';

interface ContactAndEventsSectionProps {
  onOpenBooking: (tab: 'therapy' | 'seminar', noteOrTitle?: string) => void;
}

export const ContactAndEventsSection: React.FC<ContactAndEventsSectionProps> = ({ onOpenBooking }) => {
  // Event Filter
  const [eventTypeFilter, setEventTypeFilter] = useState<string>('all');

  // Contact Form State
  const [formName, setFormName] = useState('');
  const [formEmail, setFormEmail] = useState('');
  const [formPhone, setFormPhone] = useState('');
  const [formTopic, setFormTopic] = useState('Terapi Seansı Danışmanlığı');
  const [formMessage, setFormMessage] = useState('');
  const [formSubmitted, setFormSubmitted] = useState(false);
  const [formError, setFormError] = useState('');

  // FAQ State
  const [faqCategory, setFaqCategory] = useState<string>('all');
  const [openFaqIndex, setOpenFaqIndex] = useState<number | null>(0);

  const eventTypes = [
    { id: 'all', label: 'Tüm Etkinlikler' },
    { id: 'Atölye', label: 'Uygulamalı Atölyeler' },
    { id: 'Dan Kampı', label: 'Dan Sertifika Kampları' },
    { id: 'Nefes & Meditasyon', label: 'Nefes & Zihin Atölyeleri' },
    { id: 'Seminer', label: 'Klinik Seminerler' }
  ];

  const filteredEvents = PLANNED_EVENTS.filter(evt =>
    eventTypeFilter === 'all' || evt.type === eventTypeFilter
  );

  const filteredFaqs = EXPANDED_FAQS.filter(faq =>
    faqCategory === 'all' || faq.category === faqCategory
  );

  const handleFormSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formName.trim() || !formEmail.trim() || !formMessage.trim()) {
      setFormError('Lütfen adınızı, e-posta adresinizi ve mesajınızı doldurun.');
      return;
    }
    setFormError('');
    setFormSubmitted(true);
  };

  const getWhatsAppMessageUrl = () => {
    const text = `Merhaba Ali Bey, Web sitenizden iletişim kuruyorum.\nAdım: ${formName || 'Belirtilmedi'}\nE-posta: ${formEmail || 'Belirtilmedi'}\nTelefon: ${formPhone || 'Belirtilmedi'}\nKonu: ${formTopic}\nMesajım: ${formMessage || 'Yumeiho hakkında detaylı bilgi almak istiyorum.'}`;
    return `https://wa.me/${REPRESENTATIVE_INFO.whatsapp}?text=${encodeURIComponent(text)}`;
  };

  return (
    <section id="iletisim-etkinlikler" className="py-16 lg:py-24 bg-stone-50 border-b border-stone-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section 1: Planned Events Calendar */}
        <div className="mb-20">
          {/* Calendar Section Header with Framer Motion entrance */}
          <SectionHeader
            kicker="09. Takvim ve Buluşmalar"
            title="Planlanan Yumeiho Etkinlikleri & Atölye Takvimi"
            description="Ali Gökmen Düzgün'ün bizzat yönettiği yüz yüze sertifika kampları, duruş analiz günleri ve zihin-beden nefes seminerleri."
            className="mb-8"
          />

          {/* Event Filter Tabs */}
          <div className="flex items-center gap-1.5 overflow-x-auto pb-2 mb-6">
            {eventTypes.map(t => (
              <button
                key={t.id}
                type="button"
                onClick={() => setEventTypeFilter(t.id)}
                className={`px-3.5 py-2 text-xs font-medium rounded-lg whitespace-nowrap transition-colors ${
                  eventTypeFilter === t.id
                    ? 'bg-stone-900 text-white shadow-sm'
                    : 'bg-white text-stone-600 hover:text-stone-900 border border-stone-200'
                }`}
              >
                {t.label}
              </button>
            ))}
          </div>

          {/* Events Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {filteredEvents.map(evt => (
              <div
                key={evt.id}
                className="bg-white rounded-xl border border-stone-200 p-6 flex flex-col justify-between hover:border-stone-300 transition-colors shadow-sm"
              >
                <div>
                  <div className="flex items-center justify-between text-xs mb-3">
                    <span className="font-semibold text-amber-900 bg-amber-50 px-2.5 py-1 rounded">
                      {evt.type}
                    </span>
                    <span className="font-semibold text-stone-600 bg-stone-100 px-2 py-0.5 rounded">
                      {evt.remainingSeats} Koltuk Kaldı
                    </span>
                  </div>

                  <h3 className="font-bold text-stone-900 text-base sm:text-lg mb-2">
                    {evt.title}
                  </h3>

                  <div className="space-y-1.5 text-xs text-stone-600 mb-4">
                    <div className="flex items-center gap-2">
                      <Calendar className="w-4 h-4 text-stone-500 shrink-0" />
                      <span className="font-semibold text-stone-800">{evt.date}</span>
                      <span>· {evt.time}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <MapPin className="w-4 h-4 text-stone-500 shrink-0" />
                      <span>{evt.city} — {evt.venue}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Users className="w-4 h-4 text-stone-500 shrink-0" />
                      <span>Hedef: {evt.target}</span>
                    </div>
                  </div>
                </div>

                <div className="pt-4 border-t border-stone-100 flex items-center justify-between gap-3">
                  <span className="text-xs text-stone-500">
                    Eğitmen: <strong>{evt.instructor}</strong>
                  </span>
                  <button
                    type="button"
                    onClick={() => onOpenBooking('seminar', `${evt.title} (${evt.city})`)}
                    className="px-4 py-2 text-xs font-semibold text-white bg-stone-900 hover:bg-stone-800 rounded-lg transition-colors whitespace-nowrap"
                  >
                    Atölyeye Kaydol
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Section 2: Contact Form & Clinic Channels */}
        <div className="mb-20">
          {/* Contact Section Header with Framer Motion entrance */}
          <SectionHeader
            kicker="10. Bize Ulaşın"
            title="Doğrudan İletişim & Danışmanlık Formu"
            description="Terapi seansları, Dan eğitim müfredatı veya kurumsal atölyeler için mesajınızı iletebilir, temsilcimiz Ali Gökmen Düzgün'den doğrudan geri dönüş alabilirsiniz."
            className="mb-8"
          />

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
            
            {/* Contact Form */}
            <div className="lg:col-span-7 bg-white rounded-2xl border border-stone-200 p-6 sm:p-8 shadow-sm">
              {formSubmitted ? (
                <div className="text-center py-10 space-y-4">
                  <div className="w-14 h-14 bg-emerald-100 text-emerald-800 rounded-full flex items-center justify-center mx-auto">
                    <CheckCircle2 className="w-8 h-8" />
                  </div>
                  <h3 className="font-bold text-xl text-stone-900">
                    Mesajınız Başarıyla İletildi
                  </h3>
                  <p className="text-sm text-stone-600 max-w-md mx-auto leading-relaxed">
                    Sayın <strong>{formName}</strong>, temsilcimiz Ali Gökmen Düzgün talebinizi inceleyerek en kısa sürede tarafınıza geri dönüş sağlayacaktır.
                  </p>
                  <div className="pt-4 flex flex-col sm:flex-row justify-center gap-3">
                    <a
                      href={getWhatsAppMessageUrl()}
                      target="_blank"
                      rel="noreferrer"
                      className="inline-flex items-center justify-center gap-2 px-5 py-2.5 text-xs font-semibold text-white bg-emerald-700 hover:bg-emerald-800 rounded-lg transition-colors"
                    >
                      <MessageSquare className="w-4 h-4" />
                      <span>WhatsApp'tan Hemen Yazın</span>
                    </a>
                    <button
                      type="button"
                      onClick={() => {
                        setFormSubmitted(false);
                        setFormName('');
                        setFormEmail('');
                        setFormPhone('');
                        setFormMessage('');
                      }}
                      className="px-4 py-2.5 text-xs text-stone-600 hover:text-stone-900 underline"
                    >
                      Yeni Mesaj Gönder
                    </button>
                  </div>
                </div>
              ) : (
                <form onSubmit={handleFormSubmit} className="space-y-4">
                  {formError && (
                    <div className="p-3 bg-red-50 text-red-700 text-xs rounded-lg border border-red-200">
                      {formError}
                    </div>
                  )}

                  <div>
                    <label className="block text-xs font-semibold text-stone-700 mb-1">
                      Adınız ve Soyadınız *
                    </label>
                    <input
                      type="text"
                      required
                      value={formName}
                      onChange={e => setFormName(e.target.value)}
                      placeholder="Adınız Soyadınız"
                      className="w-full px-3.5 py-2.5 text-xs sm:text-sm bg-stone-50 border border-stone-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-stone-900 focus:bg-white"
                    />
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-semibold text-stone-700 mb-1">
                        E-Posta Adresiniz *
                      </label>
                      <input
                        type="email"
                        required
                        value={formEmail}
                        onChange={e => setFormEmail(e.target.value)}
                        placeholder="ornek@mail.com"
                        className="w-full px-3.5 py-2.5 text-xs sm:text-sm bg-stone-50 border border-stone-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-stone-900 focus:bg-white"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-semibold text-stone-700 mb-1">
                        Telefon Numaranız
                      </label>
                      <input
                        type="tel"
                        value={formPhone}
                        onChange={e => setFormPhone(e.target.value)}
                        placeholder="05XX XXX XX XX"
                        className="w-full px-3.5 py-2.5 text-xs sm:text-sm bg-stone-50 border border-stone-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-stone-900 focus:bg-white"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-stone-700 mb-1">
                      İlgilendiğiniz Konu
                    </label>
                    <select
                      value={formTopic}
                      onChange={e => setFormTopic(e.target.value)}
                      className="w-full px-3.5 py-2.5 text-xs sm:text-sm bg-stone-50 border border-stone-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-stone-900 focus:bg-white"
                    >
                      <option value="Terapi Seansı Danışmanlığı">Klinik Terapi Seansı Danışmanlığı</option>
                      <option value="Anksiyete ve Stres Terapötik Modülü">Anksiyete & Stres Terapötik Modülü</option>
                      <option value="Postüral Özgüven Modülü">Postüral Özgüven & Duruş Modülü</option>
                      <option value="1-5. Dan Uluslararası Eğitimi">1 - 5. Dan Uluslararası Sertifika Eğitimi</option>
                      <option value="Atölye & Seminer Kaydı">Atölye & Seminer Kaydı</option>
                      <option value="Genel Sorular">Diğer / Genel Sorular</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-stone-700 mb-1">
                      Mesajınız *
                    </label>
                    <textarea
                      rows={4}
                      required
                      value={formMessage}
                      onChange={e => setFormMessage(e.target.value)}
                      placeholder="Şikayetinizi, öğrenmek istediğiniz konuları veya hedeflerinizi paylaşabilirsiniz..."
                      className="w-full px-3.5 py-2.5 text-xs sm:text-sm bg-stone-50 border border-stone-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-stone-900 focus:bg-white"
                    />
                  </div>

                  <div className="pt-2 flex flex-col sm:flex-row gap-3">
                    <button
                      type="submit"
                      className="flex-1 py-3 px-5 text-xs sm:text-sm font-semibold text-white bg-stone-900 hover:bg-stone-800 rounded-lg transition-colors flex items-center justify-center gap-2 shadow-sm"
                    >
                      <Send className="w-4 h-4" />
                      <span>Mesajı Gönder</span>
                    </button>
                    <a
                      href={getWhatsAppMessageUrl()}
                      target="_blank"
                      rel="noreferrer"
                      className="inline-flex items-center justify-center gap-2 px-5 py-3 text-xs sm:text-sm font-semibold text-emerald-800 bg-emerald-50 hover:bg-emerald-100 border border-emerald-200 rounded-lg transition-colors"
                    >
                      <MessageSquare className="w-4 h-4" />
                      <span>WhatsApp'tan İlet</span>
                    </a>
                  </div>
                </form>
              )}
            </div>

            {/* Direct Info & Clinic Details */}
            <div className="lg:col-span-5 space-y-6">
              <div className="bg-white rounded-2xl border border-stone-200 p-6 space-y-4">
                <h4 className="font-bold text-stone-900 text-base">
                  Türkiye Temsilciliği Ofisi & Kliniği
                </h4>
                
                <div className="space-y-3 text-xs sm:text-sm text-stone-600">
                  <div className="flex items-start gap-3">
                    <MapPin className="w-5 h-5 text-amber-900 shrink-0 mt-0.5" />
                    <div>
                      <strong className="text-stone-900 block font-semibold">Konum:</strong>
                      {REPRESENTATIVE_INFO.centerLocation}
                    </div>
                  </div>

                  <div className="flex items-start gap-3">
                    <Phone className="w-5 h-5 text-amber-900 shrink-0 mt-0.5" />
                    <div>
                      <strong className="text-stone-900 block font-semibold">Telefon:</strong>
                      <a href={`tel:${REPRESENTATIVE_INFO.phone}`} className="hover:underline">
                        {REPRESENTATIVE_INFO.phone}
                      </a>
                    </div>
                  </div>

                  <div className="flex items-start gap-3">
                    <Mail className="w-5 h-5 text-amber-900 shrink-0 mt-0.5" />
                    <div>
                      <strong className="text-stone-900 block font-semibold">E-Posta:</strong>
                      <a href={`mailto:${REPRESENTATIVE_INFO.email}`} className="hover:underline">
                        {REPRESENTATIVE_INFO.email}
                      </a>
                    </div>
                  </div>

                  <div className="flex items-start gap-3">
                    <Clock className="w-5 h-5 text-amber-900 shrink-0 mt-0.5" />
                    <div>
                      <strong className="text-stone-900 block font-semibold">Çalışma Saatleri:</strong>
                      Pazartesi – Cumartesi: 09:30 – 19:00 (Yalnızca Randevu İle)
                    </div>
                  </div>
                </div>
              </div>

              <div className="p-5 bg-stone-900 text-white rounded-2xl">
                <h4 className="font-bold text-amber-400 text-sm mb-1">
                  Uluslararası Temsilcilik Güvencesi:
                </h4>
                <p className="text-xs text-stone-300 leading-relaxed">
                  Web sitemiz üzerinden ilettiğiniz tüm mesajlar doğrudan Ali Gökmen Düzgün'ün çalışma masasına ulaşmaktadır. Danışan gizliliği ve etik manuel terapi ilkeleri eksiksiz korunur.
                </p>
              </div>
            </div>

          </div>
        </div>

        {/* Section 3: Categorized SSS (FAQ) */}
        <div>
          {/* FAQ Section Header with Framer Motion entrance */}
          <SectionHeader
            kicker="11. Sıkça Sorulan Sorular"
            title="Merak Edilen Tüm Detaylar"
            description="Klinik terapi seansları, terapötik modüller (stres/anksiyete), eğitim akademisi ve uluslararası federasyon sertifikası hakkında cevaplar."
            className="mb-8"
          />

          {/* FAQ Category Filters */}
          <div className="flex items-center gap-1.5 overflow-x-auto pb-2 mb-6">
            <button
              type="button"
              onClick={() => setFaqCategory('all')}
              className={`px-3 py-1.5 text-xs font-semibold rounded-lg transition-colors whitespace-nowrap ${
                faqCategory === 'all'
                  ? 'bg-stone-900 text-white'
                  : 'bg-white text-stone-600 hover:text-stone-900 border border-stone-200'
              }`}
            >
              Tüm Sorular
            </button>
            <button
              type="button"
              onClick={() => setFaqCategory('Terapötik Modüller & Sağlık')}
              className={`px-3 py-1.5 text-xs font-semibold rounded-lg transition-colors whitespace-nowrap ${
                faqCategory === 'Terapötik Modüller & Sağlık'
                  ? 'bg-stone-900 text-white'
                  : 'bg-white text-stone-600 hover:text-stone-900 border border-stone-200'
              }`}
            >
              Terapötik Modüller (Stres/Anksiyete)
            </button>
            <button
              type="button"
              onClick={() => setFaqCategory('Eğitim Platformu & Müfredat')}
              className={`px-3 py-1.5 text-xs font-semibold rounded-lg transition-colors whitespace-nowrap ${
                faqCategory === 'Eğitim Platformu & Müfredat'
                  ? 'bg-stone-900 text-white'
                  : 'bg-white text-stone-600 hover:text-stone-900 border border-stone-200'
              }`}
            >
              Eğitim Platformu & Müfredat
            </button>
            <button
              type="button"
              onClick={() => setFaqCategory('Klinik Seanslar')}
              className={`px-3 py-1.5 text-xs font-semibold rounded-lg transition-colors whitespace-nowrap ${
                faqCategory === 'Klinik Seanslar'
                  ? 'bg-stone-900 text-white'
                  : 'bg-white text-stone-600 hover:text-stone-900 border border-stone-200'
              }`}
            >
              Klinik Seanslar
            </button>
            <button
              type="button"
              onClick={() => setFaqCategory('Federasyon & Sertifika')}
              className={`px-3 py-1.5 text-xs font-semibold rounded-lg transition-colors whitespace-nowrap ${
                faqCategory === 'Federasyon & Sertifika'
                  ? 'bg-stone-900 text-white'
                  : 'bg-white text-stone-600 hover:text-stone-900 border border-stone-200'
              }`}
            >
              Federasyon & Sertifika
            </button>
          </div>

          {/* Accordion */}
          <div className="space-y-3">
            {filteredFaqs.map((faq, idx) => {
              const isOpen = openFaqIndex === idx;
              return (
                <div
                  key={idx}
                  className="rounded-xl border border-stone-200 overflow-hidden bg-white shadow-xs transition-colors"
                >
                  <button
                    type="button"
                    onClick={() => setOpenFaqIndex(isOpen ? null : idx)}
                    className="w-full text-left p-4 sm:p-5 flex items-center justify-between gap-4 font-semibold text-stone-900 text-sm sm:text-base focus:outline-none"
                  >
                    <span>{faq.question}</span>
                    <ChevronDown
                      className={`w-5 h-5 text-stone-500 shrink-0 transition-transform duration-200 ${
                        isOpen ? 'rotate-180 text-amber-900' : ''
                      }`}
                    />
                  </button>
                  {isOpen && (
                    <div className="px-4 pb-5 sm:px-5 sm:pb-6 text-xs sm:text-sm text-stone-600 leading-relaxed border-t border-stone-100 pt-3">
                      {faq.answer}
                    </div>
                  )}
                </div>
              );
            })}
          </div>

        </div>

      </div>
    </section>
  );
};
