import React from 'react';
import { TestimonialData, ThemeMode } from '../../types/editor';

interface TestimonialSectionProps {
  data: TestimonialData;
  isSelected: boolean;
  themeMode: ThemeMode;
  onSelect: () => void;
  onEdit?: () => void;
}

export const TestimonialSection: React.FC<TestimonialSectionProps> = ({
  data,
  isSelected,
  themeMode,
  onSelect,
  onEdit,
}) => {
  const isDark = themeMode === 'dark';

  return (
    <div
      onClick={onSelect}
      className={`rounded-xl p-4 transition-all duration-200 cursor-pointer shadow-xs flex flex-col gap-2.5 ${
        isDark
          ? isSelected
            ? 'bg-slate-800/90 ring-2 ring-indigo-500 border border-slate-700'
            : 'bg-slate-900 border border-slate-800 hover:border-slate-700'
          : isSelected
          ? 'bg-white ring-2 ring-indigo-600 border border-indigo-200'
          : 'bg-white border border-slate-200 hover:border-indigo-300'
      }`}
    >
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-1.5 flex-wrap">
          <span
            className={`text-base font-bold ${
              isDark ? 'text-white' : 'text-slate-900'
            }`}
          >
            {data.rating.toFixed(1)}
          </span>
          <div className="flex items-center text-amber-500">
            {[1, 2, 3, 4, 5].map((star) => (
              <span
                key={star}
                className="material-symbols-outlined text-[16px] fill-1 text-amber-500"
              >
                star
              </span>
            ))}
          </div>
          <span
            className={`text-xs font-medium ml-1 ${
              isDark ? 'text-slate-400' : 'text-slate-600'
            }`}
          >
            {data.ratingCountText}
          </span>
        </div>

        {onEdit && (
          <button
            type="button"
            onClick={(e) => {
              e.stopPropagation();
              onEdit();
            }}
            className="text-xs text-indigo-500 hover:text-indigo-600 font-medium"
          >
            Edit
          </button>
        )}
      </div>

      <p
        className={`text-xs sm:text-sm italic leading-relaxed ${
          isDark ? 'text-slate-300' : 'text-slate-600'
        }`}
      >
        {data.quote}
      </p>

      <div
        className={`flex items-center gap-2 pt-2 border-t ${
          isDark ? 'border-slate-800' : 'border-slate-100'
        }`}
      >
        <img
          src={data.authorAvatar}
          alt={data.authorName}
          className="w-6 h-6 rounded-full object-cover ring-1 ring-slate-200"
        />
        <span
          className={`text-xs font-semibold ${
            isDark ? 'text-white' : 'text-slate-900'
          }`}
        >
          {data.authorName}
        </span>
        <span className="text-slate-400 text-xs">•</span>
        <span className="text-slate-400 text-xs font-medium">
          {data.authorRole}
        </span>
      </div>
    </div>
  );
};
