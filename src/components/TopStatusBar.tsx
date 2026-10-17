import React from 'react';

interface TopStatusBarProps {
  isGenerating: boolean;
  canUndo: boolean;
  canRedo: boolean;
  onUndo: () => void;
  onRedo: () => void;
  onPublish: () => void;
}

export const TopStatusBar: React.FC<TopStatusBarProps> = ({
  isGenerating,
  canUndo,
  canRedo,
  onUndo,
  onRedo,
  onPublish,
}) => {
  return (
    <div className="flex items-center justify-between gap-2 px-4 md:px-5 pt-3 pb-1">
      {/* AI Status Badge */}
      <div className="flex items-center gap-1.5 bg-white border border-slate-200 px-3 py-1 rounded-full shadow-xs">
        <span className="relative flex h-2 w-2">
          {isGenerating ? (
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-indigo-500 opacity-75"></span>
          ) : (
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-500 opacity-75"></span>
          )}
          <span
            className={`relative inline-flex rounded-full h-2 w-2 ${
              isGenerating ? 'bg-indigo-600' : 'bg-emerald-500'
            }`}
          ></span>
        </span>
        <span
          className={`text-[10px] uppercase tracking-wider font-bold ${
            isGenerating ? 'text-indigo-600' : 'text-emerald-600'
          }`}
        >
          AI GENERATED
        </span>
        <span className="text-slate-400 text-[10px] font-medium">
          {isGenerating ? '• Synthesizing...' : '• Ready'}
        </span>
      </div>

      {/* Action Controls: Undo, Redo, Publish */}
      <div className="flex items-center gap-1.5">
        <button
          type="button"
          aria-label="Undo"
          disabled={!canUndo}
          onClick={onUndo}
          className={`w-8 h-8 rounded-full bg-white border border-slate-200 flex items-center justify-center transition-all shadow-xs ${
            canUndo
              ? 'text-slate-700 hover:text-slate-900 active:scale-95 hover:bg-slate-50 cursor-pointer'
              : 'text-slate-300 cursor-not-allowed opacity-50'
          }`}
          title="Undo last change"
        >
          <span className="material-symbols-outlined text-[18px]">undo</span>
        </button>

        <button
          type="button"
          aria-label="Redo"
          disabled={!canRedo}
          onClick={onRedo}
          className={`w-8 h-8 rounded-full bg-white border border-slate-200 flex items-center justify-center transition-all shadow-xs ${
            canRedo
              ? 'text-slate-700 hover:text-slate-900 active:scale-95 hover:bg-slate-50 cursor-pointer'
              : 'text-slate-300 cursor-not-allowed opacity-50'
          }`}
          title="Redo change"
        >
          <span className="material-symbols-outlined text-[18px]">redo</span>
        </button>

        <button
          type="button"
          onClick={onPublish}
          className="flex items-center gap-1.5 px-3.5 py-1.5 rounded-full bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 text-white text-xs font-semibold shadow-md active:scale-95 transition-all cursor-pointer"
        >
          <span className="material-symbols-outlined text-[15px]">rocket_launch</span>
          <span>Publish</span>
        </button>
      </div>
    </div>
  );
};
