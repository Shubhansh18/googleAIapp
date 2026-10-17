import React from 'react';
import { PricingPlan, ThemeMode } from '../../types/editor';

interface PricingSectionProps {
  title: string;
  subtitle: string;
  plans: PricingPlan[];
  isSelected: boolean;
  themeMode: ThemeMode;
  onSelect: () => void;
  onRemove?: () => void;
}

export const PricingSection: React.FC<PricingSectionProps> = ({
  title,
  subtitle,
  plans,
  isSelected,
  themeMode,
  onSelect,
  onRemove,
}) => {
  const isDark = themeMode === 'dark';

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
          <span className="text-[10px] text-indigo-600 dark:text-indigo-400 uppercase tracking-wider font-bold">
            Subscription Plans
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

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-2.5 mt-1">
        {plans.map((plan) => (
          <div
            key={plan.id}
            className={`p-3 rounded-lg border relative flex flex-col justify-between ${
              plan.popular
                ? isDark
                  ? 'bg-indigo-950/40 border-indigo-500/60 shadow-sm'
                  : 'bg-indigo-50/60 border-indigo-300 shadow-sm'
                : isDark
                ? 'bg-slate-800/60 border-slate-700/80'
                : 'bg-slate-50 border-slate-200'
            }`}
          >
            {plan.popular && (
              <span className="absolute -top-2 right-2 px-2 py-0.5 rounded-full bg-gradient-to-r from-indigo-600 to-purple-600 text-white text-[9px] font-bold uppercase tracking-wider shadow-xs">
                Most Popular
              </span>
            )}
            <div>
              <p
                className={`text-xs font-bold ${
                  isDark ? 'text-white' : 'text-slate-900'
                }`}
              >
                {plan.name}
              </p>
              <div className="flex items-baseline gap-0.5 my-1">
                <span className="text-xl font-extrabold text-indigo-600 dark:text-indigo-400">
                  {plan.price}
                </span>
                <span
                  className={`text-[10px] ${
                    isDark ? 'text-slate-400' : 'text-slate-500'
                  }`}
                >
                  {plan.interval}
                </span>
              </div>
              <p
                className={`text-[11px] mb-2 leading-relaxed ${
                  isDark ? 'text-slate-300' : 'text-slate-600'
                }`}
              >
                {plan.description}
              </p>
            </div>

            <ul className="space-y-1 text-[10px] mb-3">
              {plan.features.map((feat, idx) => (
                <li key={idx} className="flex items-center gap-1 text-slate-500 dark:text-slate-400">
                  <span className="material-symbols-outlined text-[12px] text-emerald-500">
                    check
                  </span>
                  <span>{feat}</span>
                </li>
              ))}
            </ul>

            <button
              type="button"
              className={`w-full py-1.5 rounded-md text-xs font-semibold transition-all ${
                plan.popular
                  ? 'bg-indigo-600 hover:bg-indigo-700 text-white shadow-xs'
                  : isDark
                  ? 'bg-slate-700 hover:bg-slate-600 text-slate-200'
                  : 'bg-white hover:bg-slate-100 text-slate-800 border border-slate-200'
              }`}
            >
              Select Plan
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};
