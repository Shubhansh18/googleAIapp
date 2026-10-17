import React, { useState } from 'react';
import { FaqItem, ThemeMode } from '../../types/editor';

interface FaqSectionProps {
  title: string;
  subtitle: string;
  items: FaqItem[];
  isSelected: boolean;
  themeMode: ThemeMode;
  onSelect: () => void;
  onRemove?: () => void;
}

export const FaqSection: React.FC<FaqSectionProps> = ({
  title,
  subtitle,
  items,
  isSelected,
  themeMode,
  onSelect,
  onRemove,
}) => {
  const isDark = themeMode === 'dark';
  const [openIds, setOpenIds] = useState<string[]>([items[0]?.id || '']);

  const toggleItem = (id: string) => {
    setOpenIds((prev) =>
      prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id]
    );
  };

  return (
    <div
      onClick={onSelect}
      className={`rounded-xl p-4 transition-all duration-200 cursor-pointer shadow-xs flex flex-col gap-3 ${
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
        <div>
          <span className="text-[10px] text-teal-600 dark:text-teal-400 uppercase tracking-wider font-bold">
            Customer FAQ
          </span>
          <h3
            className={`text-lg font-bold ${
              isDark ? 'text-white' : 'text-slate-900'
            }`}
          >
            {title}
          </h3>
          <p
            className={`text-xs ${
              isDark ? 'text-slate-400' : 'text-slate-500'
            }`}
          >
            {subtitle}
          </p>
        </div>

        {onRemove && (
          <button
            type="button"
            onClick={(e) => {
              e.stopPropagation();
              onRemove();
            }}
            className="text-xs text-rose-500 hover:text-rose-600 p-1"
            title="Remove section"
          >
            <span className="material-symbols-outlined text-[16px]">delete</span>
          </button>
        )}
      </div>

      <div className="space-y-2 mt-1">
        {items.map((item) => {
          const isOpen = openIds.includes(item.id);
          return (
            <div
              key={item.id}
              className={`rounded-lg border transition-colors overflow-hidden ${
                isDark
                  ? 'bg-slate-800/40 border-slate-800'
                  : 'bg-slate-50/80 border-slate-200'
              }`}
            >
              <button
                type="button"
                onClick={(e) => {
                  e.stopPropagation();
                  toggleItem(item.id);
                }}
                className="w-full px-3 py-2.5 flex items-center justify-between text-left text-xs font-semibold"
              >
                <span className={isDark ? 'text-white' : 'text-slate-900'}>
                  {item.question}
                </span>
                <span
                  className={`material-symbols-outlined text-[16px] text-slate-400 transition-transform ${
                    isOpen ? 'rotate-180 text-indigo-500' : ''
                  }`}
                >
                  expand_more
                </span>
              </button>
              {isOpen && (
                <div
                  className={`px-3 pb-3 text-xs leading-relaxed border-t ${
                    isDark
                      ? 'text-slate-300 border-slate-800/60'
                      : 'text-slate-600 border-slate-200/60'
                  }`}
                >
                  {item.answer}
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
};
