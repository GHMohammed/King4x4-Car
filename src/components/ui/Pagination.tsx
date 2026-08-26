import React from 'react';
import { ChevronRight, ChevronLeft } from 'lucide-react';

interface PaginationProps {
  page: number; // 1-based current page
  totalPages: number;
  onChange: (page: number) => void;
}

/** نافذة أرقام الصفحات مع نقاط (…) عند القفز */
function pageWindow(current: number, total: number): (number | 'gap')[] {
  const wanted = new Set<number>([1, total, current, current - 1, current + 1]);
  const sorted = [...wanted].filter((p) => p >= 1 && p <= total).sort((a, b) => a - b);
  const out: (number | 'gap')[] = [];
  let prev = 0;
  for (const p of sorted) {
    if (p - prev > 1) out.push('gap');
    out.push(p);
    prev = p;
  }
  return out;
}

export const Pagination: React.FC<PaginationProps> = ({ page, totalPages, onChange }) => {
  if (totalPages <= 1) return null;

  const go = (p: number) => onChange(Math.min(totalPages, Math.max(1, p)));
  const btn =
    'min-w-9 h-9 px-2 rounded-lg text-sm font-bold font-montserrat flex items-center justify-center transition-colors';

  return (
    <nav className="flex items-center justify-center gap-1.5 flex-wrap mt-10" aria-label="Pagination">
      <button
        onClick={() => go(page - 1)}
        disabled={page <= 1}
        className={`${btn} bg-[#191c1e] text-[#e0e3e6] border border-[#323538] hover:border-[#fae500] disabled:opacity-40 disabled:cursor-not-allowed disabled:hover:border-[#323538]`}
        aria-label="Previous page"
      >
        <ChevronRight className="w-4 h-4" />
      </button>

      {pageWindow(page, totalPages).map((p, i) =>
        p === 'gap' ? (
          <span key={`gap-${i}`} className="px-1 text-[#908f9d]">
            …
          </span>
        ) : (
          <button
            key={p}
            onClick={() => go(p)}
            aria-current={p === page ? 'page' : undefined}
            className={`${btn} ${
              p === page
                ? 'bg-[#fae500] text-[#101416] border border-[#fae500]'
                : 'bg-[#191c1e] text-[#e0e3e6] border border-[#323538] hover:border-[#fae500]'
            }`}
          >
            {p}
          </button>
        ),
      )}

      <button
        onClick={() => go(page + 1)}
        disabled={page >= totalPages}
        className={`${btn} bg-[#191c1e] text-[#e0e3e6] border border-[#323538] hover:border-[#fae500] disabled:opacity-40 disabled:cursor-not-allowed disabled:hover:border-[#323538]`}
        aria-label="Next page"
      >
        <ChevronLeft className="w-4 h-4" />
      </button>
    </nav>
  );
};
