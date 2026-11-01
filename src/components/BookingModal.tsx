import React, { useState, useEffect } from 'react';
import { X, CheckCircle, MessageSquare, Phone, Calendar, User, Mail } from 'lucide-react';
import { REPRESENTATIVE_INFO } from '../data/yumeihoData';

interface BookingModalProps {
  isOpen: boolean;
  onClose: () => void;
  initialTab?: 'therapy' | 'seminar';
  prefilledNotes?: string;
  prefilledSeminar?: string;
}

export const BookingModal: React.FC<BookingModalProps> = ({
  isOpen,
  onClose,
  initialTab = 'therapy',
  prefilledNotes = '',
  prefilledSeminar = ''
}) => {
  const [activeTab, setActiveTab] = useState<'therapy' | 'seminar'>(initialTab);
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [email, setEmail] = useState('');
  const [city, setCity] = useState('İstanbul');
  const [preferredDate, setPreferredDate] = useState('');
  const [complaintOrProfession, setComplaintOrProfession] = useState('');
  const [notes, setNotes] = useState(prefilledNotes);
  const [selectedSeminar, setSelectedSeminar] = useState(prefilledSeminar);
  const [submitted, setSubmitted] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  useEffect(() => {
    setActiveTab(initialTab);
  }, [initialTab]);

  useEffect(() => {
    if (prefilledNotes) {
      setNotes(prefilledNotes);
    }
  }, [prefilledNotes]);

  useEffect(() => {
    if (prefilledSeminar) {
      setSelectedSeminar(prefilledSeminar);
    }
  }, [prefilledSeminar]);

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim() || !phone.trim()) {
      setErrorMessage('Lütfen adınızı ve telefon numaranızı eksiksiz girin.');
      return;
    }
    setErrorMessage('');
    setSubmitted(true);
  };

  const resetForm = () => {
    setSubmitted(false);
    setName('');
    setPhone('');
    setEmail('');
    setNotes('');
    setErrorMessage('');
    onClose();
  };

  const getWhatsAppLink = () => {
    const text = activeTab === 'therapy'
      ? `Merhaba Ali Bey, Yumeiho terapi seansı randevusu almak istiyorum. Adım: ${name || 'Belirtilmedi'}, Telefonum: ${phone || 'Belirtilmedi'}, Şikayetim: ${complaintOrProfession || 'Genel kontrol'}, Not: ${notes || ''}`
      : `Merhaba Ali Bey, Yumeiho eğitim seminerine katılmak istiyorum. Adım: ${name || 'Belirtilmedi'}, Telefonum: ${phone || 'Belirtilmedi'}, İlgilendiğim Program: ${selectedSeminar || '1. Dan Eğitimi'}, Mesleğim: ${complaintOrProfession || 'Belirtilmedi'}`;
    return `https://wa.me/${REPRESENTATIVE_INFO.whatsapp}?text=${encodeURIComponent(text)}`;
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-stone-950/60 backdrop-blur-sm animate-in fade-in">
      <div className="relative w-full max-w-lg bg-white rounded-2xl shadow-xl border border-stone-200 overflow-hidden">
        
        {/* Header */}
        <div className="flex items-center justify-between p-5 border-b border-stone-100 bg-stone-50">
          <div>
            <h3 className="font-display font-bold text-lg text-stone-900">
              {activeTab === 'therapy' ? 'Terapi Seansı Randevu Talebi' : 'Eğitim Semineri Kayıt Başvurusu'}
            </h3>
            <p className="text-xs text-stone-500">
              Türkiye Temsilciliği Resmi Başvuru Masası
            </p>
          </div>
          <button
            type="button"
            onClick={resetForm}
            className="p-1.5 text-stone-400 hover:text-stone-700 rounded-lg hover:bg-stone-200/50 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Tab switchers if not yet submitted */}
        {!submitted && (
          <div className="flex border-b border-stone-200 bg-stone-100/70 p-1">
            <button
              type="button"
              onClick={() => setActiveTab('therapy')}
              className={`flex-1 py-2 text-xs font-semibold rounded-lg transition-colors ${
                activeTab === 'therapy'
                  ? 'bg-white text-stone-900 shadow-sm'
                  : 'text-stone-600 hover:text-stone-900'
              }`}
            >
              Terapi Seansı Al
            </button>
            <button
              type="button"
              onClick={() => setActiveTab('seminar')}
              className={`flex-1 py-2 text-xs font-semibold rounded-lg transition-colors ${
                activeTab === 'seminar'
                  ? 'bg-white text-stone-900 shadow-sm'
                  : 'text-stone-600 hover:text-stone-900'
              }`}
            >
              Eğitim Seminerine Katıl
            </button>
          </div>
        )}

        {/* Content Body */}
        <div className="p-6">
          {submitted ? (
            <div className="text-center py-6 space-y-4">
              <div className="w-12 h-12 bg-emerald-100 text-emerald-800 rounded-full flex items-center justify-center mx-auto">
                <CheckCircle className="w-6 h-6" />
              </div>
              <h4 className="font-bold text-lg text-stone-900">
                Talebiniz Başarıyla Alındı
              </h4>
              <p className="text-xs sm:text-sm text-stone-600 max-w-sm mx-auto leading-relaxed">
                Temsilcimiz <strong>{REPRESENTATIVE_INFO.name}</strong> veya koordinatörümüz en kısa sürede randevu/seminer detayları için sizinle iletişime geçecektir.
              </p>
              
              <div className="pt-2">
                <a
                  href={getWhatsAppLink()}
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex items-center justify-center gap-2 px-5 py-2.5 text-xs font-semibold text-white bg-emerald-700 hover:bg-emerald-800 rounded-lg transition-colors"
                >
                  <MessageSquare className="w-4 h-4" />
                  <span>WhatsApp ile Hemen Onay Alın</span>
                </a>
              </div>

              <div className="pt-3">
                <button
                  type="button"
                  onClick={resetForm}
                  className="text-xs text-stone-500 hover:text-stone-900 underline"
                >
                  Pencereyi Kapat
                </button>
              </div>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-4">
              {errorMessage && (
                <div className="p-3 bg-red-50 text-red-700 text-xs rounded-lg border border-red-200">
                  {errorMessage}
                </div>
              )}

              <div>
                <label className="block text-xs font-semibold text-stone-700 mb-1">
                  Adınız ve Soyadınız *
                </label>
                <input
                  type="text"
                  required
                  value={name}
                  onChange={e => setName(e.target.value)}
                  placeholder="Örn: Ayşe Yılmaz"
                  className="w-full px-3.5 py-2 text-xs sm:text-sm bg-white border border-stone-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-stone-900"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-semibold text-stone-700 mb-1">
                    Telefon Numaranız *
                  </label>
                  <input
                    type="tel"
                    required
                    value={phone}
                    onChange={e => setPhone(e.target.value)}
                    placeholder="05XX XXX XX XX"
                    className="w-full px-3.5 py-2 text-xs sm:text-sm bg-white border border-stone-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-stone-900"
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-stone-700 mb-1">
                    E-Posta Adresiniz
                  </label>
                  <input
                    type="email"
                    value={email}
                    onChange={e => setEmail(e.target.value)}
                    placeholder="ornek@mail.com"
                    className="w-full px-3.5 py-2 text-xs sm:text-sm bg-white border border-stone-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-stone-900"
                  />
                </div>
              </div>

              {activeTab === 'therapy' ? (
                <>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    <div>
                      <label className="block text-xs font-semibold text-stone-700 mb-1">
                        Şehir Tercihi
                      </label>
                      <select
                        value={city}
                        onChange={e => setCity(e.target.value)}
                        className="w-full px-3.5 py-2 text-xs sm:text-sm bg-white border border-stone-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-stone-900"
                      >
                        <option value="İstanbul">İstanbul (Kadıköy Kliniği)</option>
                        <option value="Ankara">Ankara (Periyodik Seans)</option>
                        <option value="İzmir">İzmir (Periyodik Seans)</option>
                      </select>
                    </div>
                    <div>
                      <label className="block text-xs font-semibold text-stone-700 mb-1">
                        Tercih Edilen Gün / Saat
                      </label>
                      <input
                        type="text"
                        value={preferredDate}
                        onChange={e => setPreferredDate(e.target.value)}
                        placeholder="Hafta içi öğleden sonra vb."
                        className="w-full px-3.5 py-2 text-xs sm:text-sm bg-white border border-stone-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-stone-900"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-stone-700 mb-1">
                      Rahatsızlığınız / Başvuru Nedeni
                    </label>
                    <input
                      type="text"
                      value={complaintOrProfession}
                      onChange={e => setComplaintOrProfession(e.target.value)}
                      placeholder="Örn: Skolyoz, bel fıtığı, bacak boyu eşitsizliği, duruş kontrolü..."
                      className="w-full px-3.5 py-2 text-xs sm:text-sm bg-white border border-stone-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-stone-900"
                    />
                  </div>
                </>
              ) : (
                <>
                  <div>
                    <label className="block text-xs font-semibold text-stone-700 mb-1">
                      İlgilendiğiniz Dan Seviyesi / Seminer
                    </label>
                    <input
                      type="text"
                      value={selectedSeminar}
                      onChange={e => setSelectedSeminar(e.target.value)}
                      placeholder="Örn: 1. Dan Temel Eğitimi (İstanbul)"
                      className="w-full px-3.5 py-2 text-xs sm:text-sm bg-white border border-stone-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-stone-900"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-stone-700 mb-1">
                      Mesleki Geçmişiniz
                    </label>
                    <input
                      type="text"
                      value={complaintOrProfession}
                      onChange={e => setComplaintOrProfession(e.target.value)}
                      placeholder="Fizyoterapist, Masör, Antrenör, Yeni Başlayan vb."
                      className="w-full px-3.5 py-2 text-xs sm:text-sm bg-white border border-stone-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-stone-900"
                    />
                  </div>
                </>
              )}

              <div>
                <label className="block text-xs font-semibold text-stone-700 mb-1">
                  Ek Notlar veya Sorularınız
                </label>
                <textarea
                  rows={2}
                  value={notes}
                  onChange={e => setNotes(e.target.value)}
                  placeholder="Eklemek istediğiniz özel bir durum var mı?"
                  className="w-full px-3.5 py-2 text-xs bg-white border border-stone-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-stone-900"
                />
              </div>

              <div className="pt-2 flex flex-col sm:flex-row gap-2">
                <button
                  type="submit"
                  className="flex-1 py-3 px-4 text-xs sm:text-sm font-semibold text-white bg-stone-900 hover:bg-stone-800 rounded-lg transition-colors shadow-sm"
                >
                  {activeTab === 'therapy' ? 'Randevu Talebini Gönder' : 'Kayıt Başvurusunu Gönder'}
                </button>
                <a
                  href={getWhatsAppLink()}
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex items-center justify-center gap-1.5 px-4 py-3 text-xs font-semibold text-emerald-800 bg-emerald-50 hover:bg-emerald-100 border border-emerald-200 rounded-lg transition-colors"
                >
                  <MessageSquare className="w-4 h-4" />
                  <span>WhatsApp</span>
                </a>
              </div>
            </form>
          )}
        </div>

      </div>
    </div>
  );
};
