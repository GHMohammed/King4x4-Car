import React from 'react';

interface EmptyStateProps {
  icon?: React.ReactNode;
  title: string;
  description?: string;
  action?: React.ReactNode;
  className?: string;
}

export const EmptyState: React.FC<EmptyStateProps> = ({
  icon,
  title,
  description,
  action,
  className = '',
}) => (
  <div
    className={`bg-[#191c1e] border border-dashed border-[#323538] rounded-2xl p-12 text-center ${className}`}
  >
    {icon && <div className="flex justify-center text-[#908f9d] mb-3">{icon}</div>}
    <h3 className="text-lg font-bold text-white font-tajawal mb-1">{title}</h3>
    {description && <p className="text-xs text-[#908f9d] mb-4 font-tajawal">{description}</p>}
    {action}
  </div>
);
