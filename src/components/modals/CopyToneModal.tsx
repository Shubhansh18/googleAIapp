import React from 'react';
import { TONE_PRESETS } from '../../data/initialPageData';

interface CopyToneModalProps {
  isOpen: boolean;
  onClose: () => void;
  onApplyTone: (preset: (typeof TONE_PRESETS)[0]) => void;
}

export const CopyToneModal: React.FC<CopyToneModalProps> = ({
  isOpen,
  onClose,
  onApplyTone,
}) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm animate-fade-in">
      <div className="bg-white rounded-2xl max-w-md w-full p-5 shadow-2xl border border-slate-200">
        <div className="flex items-center justify-between pb-3 border-b border-slate-100">
          <div className="flex items-center gap-2">
            <span className="material-symbols-outlined text-purple-600 text-[20px]">
              edit_note
            </span>
            <div>
              <h3 className="text-base font-bold text-slate-900">Brand Copy Tone</h3>
              <p className="text-xs text-slate-500">
                Rewrites hero headlines & narrative personality
              </p>
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

        <div className="py-4 space-y-2.5 max-h-[60vh] overflow-y-auto pr-1">
          {TONE_PRESETS.map((preset) => (
            <div
              key={preset.id}
              onClick={() => {
                onApplyTone(preset);
                onClose();
              }}
              className="p-3.5 rounded-xl border border-slate-200 hover:border-purple-400 hover:bg-purple-50/30 transition-all cursor-pointer group"
            >
              <div className="flex items-center justify-between mb-1">
                <span className="text-xs font-bold text-slate-900 group-hover:text-purple-700 transition-colors">
                  {preset.name}
                </span>
                <span className="text-[10px] text-purple-600 font-semibold group-hover:underline flex items-center gap-0.5">
                  Apply <span className="material-symbols-outlined text-[13px]">arrow_forward</span>
                </span>
              </div>
              <p className="text-[11px] text-slate-500 mb-2 leading-relaxed">
                {preset.desc}
              </p>
              <div className="bg-white p-2 rounded-lg border border-slate-100 text-[11px] text-slate-700">
                <span className="font-semibold">{preset.headlinePrimary}</span>{' '}
                <span className="text-indigo-600 font-semibold">{preset.headlineGradient}</span>
              </div>
            </div>
          ))}
        </div>

        <div className="flex justify-end pt-2 border-t border-slate-100">
          <button
            type="button"
            onClick={onClose}
            className="px-4 py-2 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-semibold"
          >
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
};
