import React from 'react';
import { THEME_PRESETS } from '../../data/initialPageData';
import { PageTheme } from '../../types/editor';

interface PaletteModalProps {
  isOpen: boolean;
  onClose: () => void;
  currentPresetId: string;
  onSelectPreset: (theme: PageTheme) => void;
}

export const PaletteModal: React.FC<PaletteModalProps> = ({
  isOpen,
  onClose,
  currentPresetId,
  onSelectPreset,
}) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm animate-fade-in">
      <div className="bg-white rounded-2xl max-w-md w-full p-5 shadow-2xl border border-slate-200">
        <div className="flex items-center justify-between pb-3 border-b border-slate-100">
          <div className="flex items-center gap-2">
            <span className="material-symbols-outlined text-indigo-600 text-[20px]">
              palette
            </span>
            <div>
              <h3 className="text-base font-bold text-slate-900">Color Palette & Mood</h3>
              <p className="text-xs text-slate-500">Pick an artisanal color harmony</p>
            </div>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="w-8 h-8 rounded-full hover:bg-slate-100 flex items-center justify-center text-slate-400 hover:text-slate-700"
          >
            <span className="material-symbols-outlined text-[20px]">close</span>
          </button>
        </div>

        <div className="py-4 space-y-2.5">
          {THEME_PRESETS.map((theme) => {
            const isSelected = theme.id === currentPresetId;
            return (
              <div
                key={theme.id}
                onClick={() => {
                  onSelectPreset(theme);
                  onClose();
                }}
                className={`p-3 rounded-xl border flex items-center justify-between cursor-pointer transition-all ${
                  isSelected
                    ? 'border-indigo-600 bg-indigo-50/50 ring-2 ring-indigo-500/20'
                    : 'border-slate-200 hover:border-slate-300 hover:bg-slate-50'
                }`}
              >
                <div className="flex items-center gap-3">
                  <div
                    className="w-7 h-7 rounded-full shadow-xs flex items-center justify-center text-white text-[12px] font-bold"
                    style={{ backgroundColor: theme.primary }}
                  >
                    {isSelected && (
                      <span className="material-symbols-outlined text-[16px]">check</span>
                    )}
                  </div>
                  <div>
                    <p className="text-xs font-bold text-slate-900">{theme.name}</p>
                    <p className="text-[11px] text-slate-500">{theme.fontHeading}</p>
                  </div>
                </div>

                <div className="flex items-center gap-1">
                  <span
                    className="w-4 h-4 rounded-full border border-white shadow-xs"
                    style={{ backgroundColor: theme.primary }}
                  />
                  <span
                    className="w-4 h-4 rounded-full border border-white shadow-xs"
                    style={{ backgroundColor: theme.accent }}
                  />
                </div>
              </div>
            );
          })}
        </div>

        <div className="flex justify-end pt-2 border-t border-slate-100">
          <button
            type="button"
            onClick={onClose}
            className="px-4 py-2 rounded-xl bg-slate-900 hover:bg-slate-800 text-white text-xs font-semibold"
          >
            Done
          </button>
        </div>
      </div>
    </div>
  );
};
