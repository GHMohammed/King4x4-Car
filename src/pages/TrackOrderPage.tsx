import React, { useState } from 'react';
import { PackageSearch, Info, CheckCircle2, Truck, Clock } from 'lucide-react';
import { useLanguage } from '../i18n/LanguageContext';

export const TrackOrderPage: React.FC = () => {
  const { t } = useLanguage();
  const [orderNo, setOrderNo] = useState('');
  const [tracked, setTracked] = useState<string | null>(null);
  const [error, setError] = useState('');

  const handleTrack = (e: React.FormEvent) => {
    e.preventDefault();
    if (!orderNo.trim()) {
      setError(t('track.empty'));
      setTracked(null);
      return;
    }
    setError('');
    setTracked(orderNo.trim());
  };

  return (
    <div className="max-w-xl mx-auto w-full px-4 py-14">
      <div className="text-center mb-8">
        <div className="w-14 h-14 rounded-2xl bg-[#191c1e] border border-[#323538] flex items-center justify-center mx-auto mb-4">
          <PackageSearch className="w-7 h-7 text-[#fae500]" />
        </div>
        <h1 className="text-2xl sm:text-3xl font-extrabold text-white font-tajawal mb-2">
          {t('track.title')}
        </h1>
        <p className="text-sm text-[#908f9d] font-tajawal">{t('track.subtitle')}</p>
      </div>

      <form
        onSubmit={handleTrack}
        className="bg-[#191c1e] border border-[#323538] rounded-2xl p-5 flex flex-col sm:flex-row gap-3"
      >
        <input
          className="flex-1 bg-[#101416] border border-[#323538] focus:border-[#fae500] text-sm text-white px-3.5 py-3 rounded-xl outline-none placeholder-[#908f9d] font-montserrat transition-colors"
          placeholder={t('track.placeholder')}
          value={orderNo}
          onChange={(e) => setOrderNo(e.target.value)}
        />
        <button
          type="submit"
          className="py-3 px-6 bg-[#fae500] hover:bg-[#dbc900] text-[#101416] font-extrabold text-sm rounded-xl font-tajawal shadow-lg transition-all active:scale-[.98]"
        >
          {t('track.cta')}
        </button>
      </form>

      {error && <p className="text-xs text-red-400 font-bold mt-3">{error}</p>}

      {tracked && (
        <div className="mt-6 bg-[#191c1e] border border-[#323538] rounded-2xl p-5">
          <div className="flex items-center justify-between border-b border-[#323538] pb-3 mb-4">
            <span className="text-sm font-bold text-white font-tajawal">{t('track.demoStatus')}</span>
            <span className="text-sm font-black text-[#fae500] font-montserrat">{tracked}</span>
          </div>
          <ol className="space-y-4">
            {[
              { icon: <CheckCircle2 className="w-4 h-4" />, label: t('track.step.confirmed'), done: true },
              { icon: <Clock className="w-4 h-4" />, label: t('track.step.preparing'), done: true },
              { icon: <Truck className="w-4 h-4" />, label: t('track.step.shipping'), done: false },
            ].map((step, i) => (
              <li key={i} className="flex items-center gap-3">
                <span
                  className={`w-8 h-8 rounded-full flex items-center justify-center ${
                    step.done
                      ? 'bg-[#fae500]/15 text-[#fae500]'
                      : 'bg-[#101416] text-[#908f9d] border border-[#323538]'
                  }`}
                >
                  {step.icon}
                </span>
                <span className={`text-sm font-tajawal ${step.done ? 'text-white' : 'text-[#908f9d]'}`}>
                  {step.label}
                </span>
              </li>
            ))}
          </ol>
        </div>
      )}

      <p className="flex items-start gap-2 text-[11px] text-[#908f9d] mt-6 bg-[#101416] border border-[#323538] rounded-xl p-3">
        <Info className="w-3.5 h-3.5 text-[#fae500] mt-0.5 flex-shrink-0" />
        {t('track.note')}
      </p>
    </div>
  );
};
