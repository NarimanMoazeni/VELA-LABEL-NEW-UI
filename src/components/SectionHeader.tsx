import React from 'react';
import { ArrowLeft } from 'lucide-react';

interface SectionHeaderProps {
  title: string;
  subtitle?: string;
  englishLabel?: string;
  actionText?: string;
  onAction?: () => void;
  centered?: boolean;
  className?: string;
  hasTopDivider?: boolean;
  hasBottomDivider?: boolean;
}

export const SectionHeader: React.FC<SectionHeaderProps> = ({
  title,
  subtitle,
  englishLabel,
  actionText,
  onAction,
  centered = true,
  className = '',
}) => {
  return (
    <div className={`w-full select-none ${className}`}>
      {/* Decorative Line with Centered Title (Inspired by top boutique references) */}
      <div className="flex items-center justify-center gap-4 sm:gap-6 my-2">
        <div className="h-px bg-gradient-to-l from-[#A08875]/60 via-[#E8DFD5] to-transparent dark:from-[#8a6f52]/70 dark:via-[#3b322a] flex-1"></div>
        
        <div className="text-center px-2 space-y-1">
          {englishLabel && (
            <span
              className="font-latin text-[10px] sm:text-[11px] text-[#8A715D] dark:text-[#E5CCA8] uppercase font-bold tracking-[0.2em] block"
              dir="ltr"
            >
              {englishLabel}
            </span>
          )}
          <h2 className="font-display text-xl sm:text-3xl font-bold text-[#1C1917] tracking-tight leading-snug">
            {title}
          </h2>
        </div>

        <div className="h-px bg-gradient-to-r from-[#A08875]/60 via-[#E8DFD5] to-transparent dark:from-[#8a6f52]/70 dark:via-[#3b322a] flex-1"></div>
      </div>

      {/* Subtitle & Optional Action Link */}
      {(subtitle || (actionText && onAction)) && (
        <div className="flex flex-col sm:flex-row items-center justify-center gap-2 pt-1 text-center">
          {subtitle && (
            <p className="text-sm sm:text-[15px] text-[#786C65] font-normal leading-relaxed">
              {subtitle}
            </p>
          )}

          {actionText && onAction && (
            <button
              onClick={onAction}
              className="inline-flex items-center gap-1.5 text-xs font-semibold text-[#2A2421] hover:text-[#A08875] transition-colors cursor-pointer skip-delay group sm:mr-3"
            >
              <span>{actionText}</span>
              <ArrowLeft className="w-3.5 h-3.5 text-[#A08875] group-hover:-translate-x-1 transition-transform" />
            </button>
          )}
        </div>
      )}
    </div>
  );
};
