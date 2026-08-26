import React from 'react';
import { formatAmount } from '../../lib/currency';
import { useLanguage } from '../../i18n/LanguageContext';

interface PriceDisplayProps {
  price: number;
  oldPrice?: number;
  size?: 'sm' | 'md' | 'lg';
  className?: string;
}

const SIZES: Record<NonNullable<PriceDisplayProps['size']>, string> = {
  sm: 'text-lg',
  md: 'text-xl',
  lg: 'text-3xl',
};

export const PriceDisplay: React.FC<PriceDisplayProps> = ({
  price,
  oldPrice,
  size = 'md',
  className = '',
}) => {
  const { lang } = useLanguage();
  const symbol = lang === 'en' ? 'KWD' : 'د.ك';
  return (
    <div className={`flex items-baseline gap-2 ${className}`}>
      <span className={`${SIZES[size]} font-black text-[#fae500] font-montserrat`}>
        {formatAmount(price)}
      </span>
      <span className="text-xs text-white font-tajawal">{symbol}</span>
      {oldPrice !== undefined && oldPrice > price && (
        <span className="text-xs text-[#908f9d] line-through font-montserrat">
          {formatAmount(oldPrice)} {symbol}
        </span>
      )}
    </div>
  );
};
