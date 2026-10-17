import React from 'react';
import { HeroData, ThemeMode } from '../../types/editor';

interface HeroSectionProps {
  data: HeroData;
  isSelected: boolean;
  themeMode: ThemeMode;
  onSelect: () => void;
  onQuickEdit?: () => void;
  onCtaClick?: () => void;
}

export const HeroSection: React.FC<HeroSectionProps> = ({
  data,
  isSelected,
  themeMode,
  onSelect,
  onQuickEdit,
  onCtaClick,
}) => {
  const isDark = themeMode === 'dark';

  return (
    <div
      onClick={onSelect}
      className={`relative group cursor-pointer rounded-2xl p-4 transition-all duration-200 ${
        isDark
          ? isSelected
            ? 'bg-slate-800/90 ring-2 ring-indigo-500 shadow-md'
            : 'bg-slate-900/60 hover:bg-slate-800/40 border border-slate-800'
          : isSelected
          ? 'bg-indigo-50/70 ring-2 ring-indigo-600 shadow-sm border border-indigo-200'
          : 'bg-indigo-50/40 border border-indigo-200/50 hover:bg-indigo-50/70'
      }`}
    >
      {/* Element Edit Pill Trigger */}
      <div className="flex items-center justify-between mb-3">
        <span
          className={`inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-xs font-semibold ${
            isDark
              ? 'bg-indigo-500/20 text-indigo-400'
              : 'bg-indigo-600/10 text-indigo-600'
          }`}
        >
          <span className="material-symbols-outlined text-[13px]">auto_awesome</span>
          <span>{data.badgeText}</span>
        </span>

        <button
          type="button"
          onClick={(e) => {
            e.stopPropagation();
            onQuickEdit?.();
          }}
          className={`flex items-center gap-1 text-xs font-medium px-2 py-0.5 rounded transition-opacity ${
            isDark
              ? 'text-indigo-400 hover:bg-indigo-950/60'
              : 'text-indigo-600 hover:bg-indigo-100/60'
          } opacity-80 group-hover:opacity-100`}
        >
          <span className="material-symbols-outlined text-[15px]">edit</span>
          <span className="text-[11px]">Edit</span>
        </button>
      </div>

      {/* Hero Headline */}
      <div className="flex flex-col gap-1.5">
        <h2
          className={`text-2xl sm:text-3xl font-bold tracking-tight leading-tight ${
            isDark ? 'text-white' : 'text-slate-900'
          }`}
        >
          {data.headlinePrimary} <br />
          <span className="bg-gradient-to-r from-indigo-600 via-purple-600 to-indigo-400 bg-clip-text text-transparent">
            {data.headlineGradient}
          </span>
        </h2>
        <p
          className={`text-xs sm:text-sm leading-relaxed mt-1 ${
            isDark ? 'text-slate-300' : 'text-slate-600'
          }`}
        >
          {data.subheadline}
        </p>
      </div>

      {/* Artisanal Product Card & Visual Focal */}
      <div
        className={`relative mt-4 rounded-xl overflow-hidden shadow-md border ${
          isDark
            ? 'bg-slate-800 border-slate-700'
            : 'bg-slate-50 border-slate-200'
        }`}
      >
        <img
          src={data.imageUrl}
          alt={data.imageAlt}
          className="w-full h-56 object-cover object-center transition-transform duration-500 group-hover:scale-[1.02]"
        />

        {/* Floating Origin Badge Over Image */}
        <div
          className={`absolute bottom-3 left-3 right-3 p-2.5 rounded-lg flex items-center justify-between border shadow-lg backdrop-blur-md ${
            isDark
              ? 'bg-slate-900/95 border-slate-700 text-white'
              : 'bg-white/95 border-slate-200 text-slate-900'
          }`}
        >
          <div className="flex items-center gap-2">
            <div className="w-7 h-7 rounded-full bg-indigo-500/10 flex items-center justify-center text-indigo-600 shrink-0">
              <span className="material-symbols-outlined text-[16px]">eco</span>
            </div>
            <div className="min-w-0">
              <p className="text-xs font-semibold leading-tight truncate">
                {data.lotName}
              </p>
              <p
                className={`text-[10px] truncate ${
                  isDark ? 'text-slate-400' : 'text-slate-500'
                }`}
              >
                {data.flavorNotes}
              </p>
            </div>
          </div>
          <span className="px-2 py-0.5 rounded bg-teal-50 text-teal-700 border border-teal-200 text-[10px] font-bold tracking-tight shrink-0">
            {data.scorePts}
          </span>
        </div>
      </div>

      {/* Hero Action CTA */}
      <div className="mt-4 flex flex-col gap-2.5">
        <button
          type="button"
          onClick={(e) => {
            e.stopPropagation();
            onCtaClick?.();
          }}
          className="w-full py-3.5 px-4 rounded-xl bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 text-white text-sm font-bold flex items-center justify-center gap-2 shadow-lg shadow-indigo-500/25 active:scale-[0.98] transition-all"
        >
          <span>{data.ctaText}</span>
          <span className="material-symbols-outlined text-[18px]">arrow_forward</span>
        </button>

        <div
          className={`flex items-center justify-center gap-3 text-[11px] font-medium ${
            isDark ? 'text-slate-400' : 'text-slate-600'
          }`}
        >
          <span className="flex items-center gap-1">
            <span className="material-symbols-outlined text-[14px] text-teal-600">
              check_circle
            </span>{' '}
            {data.trustTag1}
          </span>
          <span className="flex items-center gap-1">
            <span className="material-symbols-outlined text-[14px] text-teal-600">
              local_shipping
            </span>{' '}
            {data.trustTag2}
          </span>
        </div>
      </div>
    </div>
  );
};
