import React from 'react';

export const ProductCardSkeleton: React.FC = () => (
  <div className="bg-[#191c1e] border border-[#323538] rounded-2xl p-4 animate-pulse">
    <div className="h-52 rounded-xl bg-[#101416] mb-4" />
    <div className="h-3 w-1/3 bg-[#101416] rounded mb-3" />
    <div className="h-4 w-3/4 bg-[#101416] rounded mb-2" />
    <div className="h-4 w-1/2 bg-[#101416] rounded mb-6" />
    <div className="h-10 w-full bg-[#101416] rounded-xl" />
  </div>
);
