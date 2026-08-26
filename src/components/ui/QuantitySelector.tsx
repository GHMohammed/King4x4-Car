import React from 'react';
import { Plus, Minus } from 'lucide-react';

interface QuantitySelectorProps {
  value: number;
  onChange: (next: number) => void;
  min?: number;
  size?: 'sm' | 'md';
}

export const QuantitySelector: React.FC<QuantitySelectorProps> = ({
  value,
  onChange,
  min = 1,
  size = 'md',
}) => {
  const pad = size === 'sm' ? 'p-1' : 'p-2.5';
  const icon = size === 'sm' ? 'w-3 h-3' : 'w-4 h-4';
  const width = size === 'sm' ? 'w-6' : 'w-10';

  return (
    <div className="inline-flex items-center bg-[#101416] rounded-lg border border-[#323538] p-0.5">
      <button
        type="button"
        onClick={() => onChange(Math.max(min, value - 1))}
        className={`${pad} hover:text-[#fae500] transition-colors`}
        aria-label="إنقاص الكمية"
      >
        <Minus className={icon} />
      </button>
      <span className={`${width} text-center text-sm font-bold font-montserrat`}>{value}</span>
      <button
        type="button"
        onClick={() => onChange(value + 1)}
        className={`${pad} hover:text-[#fae500] transition-colors`}
        aria-label="زيادة الكمية"
      >
        <Plus className={icon} />
      </button>
    </div>
  );
};
