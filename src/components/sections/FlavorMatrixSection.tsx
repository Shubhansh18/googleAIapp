import React from 'react';
import { FlavorMetric, ThemeMode } from '../../types/editor';

interface FlavorMatrixSectionProps {
  metrics: FlavorMetric[];
  isSelected: boolean;
  themeMode: ThemeMode;
  onSelect: () => void;
  onEditGraph: () => void;
}

export const FlavorMatrixSection: React.FC<FlavorMatrixSectionProps> = ({
  metrics,
  isSelected,
  themeMode,
  onSelect,
  onEditGraph,
}) => {
  const isDark = themeMode === 'dark';

  const getColorClass = (color: string) => {
    switch (color) {
      case 'cyan':
        return { text: 'text-cyan-600 dark:text-cyan-400', bar: 'bg-cyan-500' };
      case 'primary':
      case 'indigo':
        return { text: 'text-indigo-600 dark:text-indigo-400', bar: 'bg-indigo-600' };
      case 'secondary':
      case 'purple':
      case 'violet':
        return { text: 'text-purple-600 dark:text-purple-400', bar: 'bg-purple-600' };
      case 'teal':
      default:
        return { text: 'text-teal-600 dark:text-teal-400', bar: 'bg-teal-500' };
    }
  };

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
        <div>
          <span className="text-[10px] text-purple-600 dark:text-purple-400 uppercase tracking-wider font-bold">
            Tasting Notes Matrix
          </span>
          <h3
            className={`text-lg font-bold ${
              isDark ? 'text-white' : 'text-slate-900'
            }`}
          >
            Flavor Archetype
          </h3>
        </div>

        <button
          type="button"
          onClick={(e) => {
            e.stopPropagation();
            onEditGraph();
          }}
          className={`px-2.5 py-1 rounded-md text-xs font-medium flex items-center gap-1 border transition-colors ${
            isDark
              ? 'bg-slate-800 hover:bg-slate-700 text-slate-200 border-slate-700'
              : 'bg-slate-100 hover:bg-slate-200 text-slate-700 border-slate-200'
          }`}
        >
          <span className="material-symbols-outlined text-[14px]">tune</span>
          <span>Edit Graph</span>
        </button>
      </div>

      {/* Radar / Sensory Metric Inline Visual */}
      <div className="grid grid-cols-2 gap-2 mt-1">
        {metrics.map((item) => {
          const { text, bar } = getColorClass(item.color);
          const percent = Math.min(100, Math.max(0, (item.score / item.max) * 100));

          return (
            <div
              key={item.id}
              className={`p-2.5 rounded-lg flex flex-col gap-1 border transition-colors ${
                isDark
                  ? 'bg-slate-800/60 border-slate-800'
                  : 'bg-slate-50 border-slate-200'
              }`}
            >
              <div className="flex justify-between items-center text-xs">
                <span className={isDark ? 'text-slate-300' : 'text-slate-600'}>
                  {item.label}
                </span>
                <span className={`font-bold ${text}`}>
                  {item.score.toFixed(1)}/{item.max}
                </span>
              </div>
              <div
                className={`w-full h-1.5 rounded-full overflow-hidden ${
                  isDark ? 'bg-slate-700' : 'bg-slate-200'
                }`}
              >
                <div
                  className={`h-full rounded-full transition-all duration-500 ${bar}`}
                  style={{ width: `${percent}%` }}
                ></div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
