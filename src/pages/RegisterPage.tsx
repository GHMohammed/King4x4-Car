import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { User, Mail, Phone, Lock, Info } from 'lucide-react';
import { useLanguage } from '../i18n/LanguageContext';

const inputCls =
  'w-full bg-[#101416] border border-[#323538] focus:border-[#fae500] text-sm text-white ps-10 pe-3.5 py-2.5 rounded-xl outline-none placeholder-[#908f9d] font-tajawal transition-colors';

export const RegisterPage: React.FC = () => {
  const { t } = useLanguage();
  const [form, setForm] = useState({
    name: '',
    email: '',
    phone: '',
    password: '',
    confirm: '',
  });
  const [error, setError] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (form.password && form.password !== form.confirm) {
      setError(t('auth.passwordMismatch'));
      return;
    }
    setError('');
  };

  const field = (
    icon: React.ReactNode,
    key: keyof typeof form,
    placeholder: string,
    type = 'text',
    inputMode?: React.InputHTMLAttributes<HTMLInputElement>['inputMode'],
  ) => (
    <div className="relative">
      <span className="absolute top-3.5 start-3.5 text-[#908f9d]">{icon}</span>
      <input
        type={type}
        inputMode={inputMode}
        className={inputCls}
        placeholder={placeholder}
        value={form[key]}
        onChange={(e) => setForm({ ...form, [key]: e.target.value })}
      />
    </div>
  );

  return (
    <div className="max-w-md mx-auto w-full px-4 py-14">
      <div className="text-center mb-8">
        <h1 className="text-2xl sm:text-3xl font-extrabold text-white font-tajawal mb-2">
          {t('auth.register.title')}
        </h1>
        <p className="text-sm text-[#908f9d] font-tajawal">{t('auth.register.subtitle')}</p>
      </div>

      <form
        onSubmit={handleSubmit}
        className="bg-[#191c1e] border border-[#323538] rounded-2xl p-6 space-y-4 shadow-xl"
      >
        {field(<User className="w-4 h-4" />, 'name', t('auth.fullName'))}
        {field(<Mail className="w-4 h-4" />, 'email', t('auth.email'), 'email')}
        {field(<Phone className="w-4 h-4" />, 'phone', t('auth.phone'), 'text', 'tel')}
        {field(<Lock className="w-4 h-4" />, 'password', t('auth.password'), 'password')}
        {field(<Lock className="w-4 h-4" />, 'confirm', t('auth.confirmPassword'), 'password')}

        {error && <p className="text-xs text-red-400 font-bold">{error}</p>}

        <button
          type="submit"
          className="w-full py-3 bg-[#fae500] hover:bg-[#dbc900] text-[#101416] font-extrabold text-sm rounded-xl font-tajawal shadow-lg transition-all active:scale-[.98]"
        >
          {t('auth.register.cta')}
        </button>
      </form>

      <p className="text-center text-sm text-[#bec6e0] mt-5 font-tajawal">
        {t('auth.haveAccount')}{' '}
        <Link to="/login" className="text-[#fae500] font-bold hover:underline">
          {t('auth.login.title')}
        </Link>
      </p>

      <p className="flex items-start gap-2 text-[11px] text-[#908f9d] mt-6 bg-[#101416] border border-[#323538] rounded-xl p-3">
        <Info className="w-3.5 h-3.5 text-[#fae500] mt-0.5 flex-shrink-0" />
        {t('auth.backendNote')}
      </p>
    </div>
  );
};
