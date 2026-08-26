import React, { useState } from 'react';
import { MapPin, Phone, Mail, Clock, MessageCircle, Send, CheckCircle2 } from 'lucide-react';
import { useLanguage } from '../i18n/LanguageContext';
import { CONTACT, whatsappLink } from '../lib/contact';

const inputCls =
  'w-full bg-[#101416] border border-[#323538] focus:border-[#fae500] text-sm text-white px-3.5 py-2.5 rounded-xl outline-none placeholder-[#908f9d] font-tajawal transition-colors';

export const ContactPage: React.FC = () => {
  const { t } = useLanguage();
  const [form, setForm] = useState({ name: '', email: '', message: '' });
  const [sent, setSent] = useState(false);

  return (
    <div className="max-w-6xl mx-auto w-full px-4 sm:px-6 lg:px-8 py-12">
      <div className="mb-10">
        <h1 className="text-2xl sm:text-3xl font-extrabold text-white font-tajawal mb-2">
          {t('contact.title')}
        </h1>
        <p className="text-sm text-[#bec6e0] font-tajawal max-w-2xl">{t('contact.subtitle')}</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Contact info */}
        <div className="space-y-4">
          <h2 className="font-extrabold text-white font-tajawal border-b border-[#323538] pb-2">
            {t('contact.info')}
          </h2>

          {[
            { icon: <MapPin className="w-5 h-5" />, text: t('footer.location') },
            { icon: <Phone className="w-5 h-5" />, text: t('footer.phone') },
            { icon: <Mail className="w-5 h-5" />, text: CONTACT.email, mono: true },
            { icon: <Clock className="w-5 h-5" />, text: t('contact.hours') },
          ].map((row, i) => (
            <div
              key={i}
              className="flex items-center gap-3 bg-[#191c1e] border border-[#323538] rounded-xl p-4"
            >
              <span className="text-[#fae500]">{row.icon}</span>
              <span className={`text-sm text-[#e0e3e6] ${row.mono ? 'font-montserrat' : 'font-tajawal'}`}>
                {row.text}
              </span>
            </div>
          ))}

          <a
            href={whatsappLink()}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-2 justify-center py-3 px-5 rounded-xl border border-green-500/20 bg-green-500/[0.06] text-green-400 hover:bg-green-500/[0.12] hover:border-green-500/40 font-bold text-sm font-tajawal transition"
          >
            <MessageCircle className="w-5 h-5" />
            <span>{t('contact.whatsapp')}</span>
          </a>
        </div>

        {/* Message form */}
        <div className="bg-[#191c1e] border border-[#323538] rounded-2xl p-6">
          <h2 className="font-extrabold text-white font-tajawal border-b border-[#323538] pb-2 mb-4">
            {t('contact.formTitle')}
          </h2>

          {sent ? (
            <div className="text-center py-10">
              <div className="w-16 h-16 rounded-full bg-[#fae500]/15 text-[#fae500] flex items-center justify-center mx-auto mb-4">
                <CheckCircle2 className="w-10 h-10" />
              </div>
              <p className="text-sm text-[#bec6e0] font-tajawal max-w-sm mx-auto">
                {t('contact.sent')}
              </p>
            </div>
          ) : (
            <form
              onSubmit={(e) => {
                e.preventDefault();
                if (form.name && form.message) setSent(true);
              }}
              className="space-y-4"
            >
              <input
                className={inputCls}
                placeholder={t('contact.yourName')}
                value={form.name}
                onChange={(e) => setForm({ ...form, name: e.target.value })}
              />
              <input
                type="email"
                className={inputCls}
                placeholder={t('contact.yourEmail')}
                value={form.email}
                onChange={(e) => setForm({ ...form, email: e.target.value })}
              />
              <textarea
                rows={5}
                className={`${inputCls} resize-none`}
                placeholder={t('contact.message')}
                value={form.message}
                onChange={(e) => setForm({ ...form, message: e.target.value })}
              />
              <button
                type="submit"
                className="w-full py-3 bg-[#fae500] hover:bg-[#dbc900] text-[#101416] font-extrabold text-sm rounded-xl font-tajawal flex items-center justify-center gap-2 shadow-lg transition-all active:scale-[.98]"
              >
                <Send className="w-4 h-4" />
                <span>{t('contact.send')}</span>
              </button>
            </form>
          )}
        </div>
      </div>
    </div>
  );
};
