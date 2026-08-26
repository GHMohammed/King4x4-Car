import React from 'react';
import { Product } from '../../types';
import { useLanguage } from '../../i18n/LanguageContext';

const STYLES: Record<NonNullable<Product['badge']>, { key: string; className: string }> = {
  bestseller: {
    key: 'badge.bestseller',
    className: 'bg-[#2E3192] text-[#fae500] border border-[#fae500]/30',
  },
  new: { key: 'badge.new', className: 'bg-[#fae500] text-[#101416]' },
  sale: { key: 'badge.sale', className: 'bg-red-600 text-white' },
  featured: { key: 'badge.featured', className: 'bg-emerald-600 text-white' },
};

export const ProductBadge: React.FC<{ badge?: Product['badge'] }> = ({ badge }) => {
  const { t } = useLanguage();
  if (!badge) return null;
  const { key, className } = STYLES[badge];
  return (
    <span
      className={`font-black text-[10px] px-2.5 py-1 rounded-md shadow font-tajawal ${className}`}
    >
      {t(key)}
    </span>
  );
};
