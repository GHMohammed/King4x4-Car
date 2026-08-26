import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { User, Lock, Info } from 'lucide-react';
import { useLanguage } from '../i18n/LanguageContext';

const inputCls =
  'w-full bg-[#101416] border border-[#323538] focus:border-[#fae500] text-sm text-white ps-10 pe-3.5 py-2.5 rounded-xl outline-none placeholder-[#908f9d] font-tajawal transition-colors';

export const LoginPage: React.FC = () => {
  const { t } = useLanguage();
  const [form, setForm] = useState({ identifier: '', password: '' });

  return (
    <div className="max-w-md mx-auto w-full px-4 py-14">
      <div className="text-center mb-8">
        <h1 className="text-2xl sm:text-3xl font-extrabold text-white font-tajawal mb-2">
          {t('auth.login.title')}
        </h1>
        <p className="text-sm text-[#908f9d] font-tajawal">{t('auth.login.subtitle')}</p>
      </div>

      <form
        onSubmit={(e) => e.preventDefault()}
        className="bg-[#191c1e] border border-[#323538] rounded-2xl p-6 space-y-4 shadow-xl"
      >
        <div className="relative">
          <User className="w-4 h-4 text-[#908f9d] absolute top-3.5 start-3.5" />
          <input
            className={inputCls}
            placeholder={t('auth.emailOrPhone')}
            value={form.identifier}
            onChange={(e) => setForm({ ...form, identifier: e.target.value })}
          />
        </div>

        <div className="relative">
          <Lock className="w-4 h-4 text-[#908f9d] absolute top-3.5 start-3.5" />
          <input
            type="password"
            className={inputCls}
            placeholder={t('auth.password')}
            value={form.password}
            onChange={(e) => setForm({ ...form, password: e.target.value })}
          />
        </div>

        <div className="flex justify-start">
          <button type="button" className="text-xs text-[#c0c1ff] hover:text-[#fae500] font-bold">
            {t('auth.forgot')}
          </button>
        </div>

        <button
          type="submit"
          className="w-full py-3 bg-[#fae500] hover:bg-[#dbc900] text-[#101416] font-extrabold text-sm rounded-xl font-tajawal shadow-lg transition-all active:scale-[.98]"
        >
          {t('auth.login.cta')}
        </button>
      </form>

      <p className="text-center text-sm text-[#bec6e0] mt-5 font-tajawal">
        {t('auth.noAccount')}{' '}
        <Link to="/register" className="text-[#fae500] font-bold hover:underline">
          {t('auth.createAccount')}
        </Link>
      </p>

      <p className="flex items-start gap-2 text-[11px] text-[#908f9d] mt-6 bg-[#101416] border border-[#323538] rounded-xl p-3">
        <Info className="w-3.5 h-3.5 text-[#fae500] mt-0.5 flex-shrink-0" />
        {t('auth.backendNote')}
      </p>
    </div>
  );
};
