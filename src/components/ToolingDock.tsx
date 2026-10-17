import React, { useState } from 'react';

interface ToolingDockProps {
  onOpenPalette: () => void;
  onOpenCopyTone: () => void;
  onOpenSwapMedia: () => void;
  onOpenAddSection: () => void;
  onSubmitCopilot: (prompt: string) => Promise<void>;
  isGenerating: boolean;
  activeSection: string;
}

export const ToolingDock: React.FC<ToolingDockProps> = ({
  onOpenPalette,
  onOpenCopyTone,
  onOpenSwapMedia,
  onOpenAddSection,
  onSubmitCopilot,
  isGenerating,
  activeSection,
}) => {
  const [promptText, setPromptText] = useState('');
  const [justApplied, setJustApplied] = useState(false);

  const handleSubmit = async (e?: React.FormEvent) => {
    e?.preventDefault();
    const query = promptText.trim();
    if (!query || isGenerating) return;

    try {
      await onSubmitCopilot(query);
      setPromptText('');
      setJustApplied(true);
      setTimeout(() => setJustApplied(false), 2000);
    } catch (err) {
      console.error(err);
    }
  };

  const getPlaceholder = () => {
    if (activeSection === 'flavor') {
      return "Ask AI: 'Make aromatics higher' or 'Add chocolate note'...";
    }
    if (activeSection === 'testimonial') {
      return "Ask AI: 'Add a quote from a barista' or 'Change reviewer name'...";
    }
    if (activeSection === 'pricing') {
      return "Ask AI: 'Add an annual discount' or 'Rename tiers'...";
    }
    return "Ask AI: 'Make headline bolder' or 'Add pricing table'...";
  };

  const quickPrompts = [
    'Make headline punchier',
    'Add subscription pricing',
    'Add FAQ section',
    'Switch to luxury tone',
  ];

  return (
    <div className="fixed bottom-3 inset-x-0 z-40 px-3 sm:px-6 pointer-events-none">
      <div className="max-w-xl mx-auto flex flex-col gap-2 pointer-events-auto">
        {/* Quick Action Tool Pills */}
        <div className="flex items-center gap-1.5 overflow-x-auto pb-1 no-scrollbar px-1">
          <button
            type="button"
            onClick={onOpenPalette}
            className="shrink-0 px-3 py-1.5 rounded-full bg-white/95 backdrop-blur-xl border border-slate-200 text-slate-800 text-xs font-semibold flex items-center gap-1.5 shadow-md active:scale-95 transition-all hover:bg-white cursor-pointer"
          >
            <span className="material-symbols-outlined text-indigo-600 text-[16px]">
              palette
            </span>
            <span>Palette</span>
          </button>

          <button
            type="button"
            onClick={onOpenCopyTone}
            className="shrink-0 px-3 py-1.5 rounded-full bg-white/95 backdrop-blur-xl border border-slate-200 text-slate-800 text-xs font-semibold flex items-center gap-1.5 shadow-md active:scale-95 transition-all hover:bg-white cursor-pointer"
          >
            <span className="material-symbols-outlined text-purple-600 text-[16px]">
              edit_note
            </span>
            <span>Copy Tone</span>
          </button>

          <button
            type="button"
            onClick={onOpenSwapMedia}
            className="shrink-0 px-3 py-1.5 rounded-full bg-white/95 backdrop-blur-xl border border-slate-200 text-slate-800 text-xs font-semibold flex items-center gap-1.5 shadow-md active:scale-95 transition-all hover:bg-white cursor-pointer"
          >
            <span className="material-symbols-outlined text-cyan-600 text-[16px]">
              image
            </span>
            <span>Swap Media</span>
          </button>

          <button
            type="button"
            onClick={onOpenAddSection}
            className="shrink-0 px-3 py-1.5 rounded-full bg-white/95 backdrop-blur-xl border border-slate-200 text-slate-800 text-xs font-semibold flex items-center gap-1.5 shadow-md active:scale-95 transition-all hover:bg-white cursor-pointer"
          >
            <span className="material-symbols-outlined text-indigo-600 text-[16px]">
              add_box
            </span>
            <span>Add FAQ / Pricing</span>
          </button>
        </div>

        {/* AI Copilot Prompt Input Dock Bar */}
        <form
          onSubmit={handleSubmit}
          className="w-full bg-white/95 backdrop-blur-2xl border border-slate-200/90 rounded-2xl p-2 pl-3 flex items-center gap-2 shadow-2xl ring-1 ring-black/5"
        >
          <div className="w-7 h-7 rounded-full bg-gradient-to-tr from-indigo-600 to-purple-600 flex items-center justify-center text-white shrink-0 shadow-xs">
            <span className="material-symbols-outlined text-[16px]">auto_fix_high</span>
          </div>

          <input
            type="text"
            value={promptText}
            onChange={(e) => setPromptText(e.target.value)}
            placeholder={getPlaceholder()}
            disabled={isGenerating}
            className="w-full bg-transparent border-0 outline-none text-slate-900 placeholder:text-slate-400 text-xs sm:text-sm py-1"
          />

          <button
            type="submit"
            disabled={isGenerating || !promptText.trim()}
            className={`h-9 px-3.5 rounded-xl text-white text-xs font-medium flex items-center justify-center shrink-0 shadow-md active:scale-95 transition-all cursor-pointer ${
              justApplied
                ? 'bg-emerald-600 text-white'
                : isGenerating
                ? 'bg-indigo-400 cursor-wait'
                : !promptText.trim()
                ? 'bg-indigo-300 text-white/80 cursor-not-allowed'
                : 'bg-indigo-600 hover:bg-indigo-700'
            }`}
          >
            {isGenerating ? (
              <span className="material-symbols-outlined text-[18px] animate-spin">
                progress_activity
              </span>
            ) : justApplied ? (
              <span className="material-symbols-outlined text-[18px]">done</span>
            ) : (
              <span className="material-symbols-outlined text-[18px]">send</span>
            )}
          </button>
        </form>

        {/* Quick prompt suggestions chip tray */}
        <div className="hidden sm:flex items-center gap-1.5 px-2">
          <span className="text-[10px] text-slate-500 font-medium">Try:</span>
          {quickPrompts.map((sample, idx) => (
            <button
              key={idx}
              type="button"
              onClick={() => {
                setPromptText(sample);
              }}
              className="text-[10px] text-slate-600 hover:text-indigo-600 bg-white/80 border border-slate-200/70 rounded-full px-2 py-0.5 shadow-2xs hover:bg-white transition-all cursor-pointer"
            >
              {sample}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};
