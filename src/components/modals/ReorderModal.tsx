import React from 'react';

interface ReorderModalProps {
  isOpen: boolean;
  onClose: () => void;
  sectionOrder: string[];
  onUpdateOrder: (newOrder: string[]) => void;
}

export const ReorderModal: React.FC<ReorderModalProps> = ({
  isOpen,
  onClose,
  sectionOrder,
  onUpdateOrder,
}) => {
  if (!isOpen) return null;

  const sectionNames: Record<string, string> = {
    hero: 'Hero Section (Headline & Product)',
    flavor: 'Tasting Notes Matrix (Flavor Archetype)',
    testimonial: 'Social Proof (Customer Reviews)',
    pricing: 'Subscription Pricing Tiers',
    faq: 'Frequently Asked Questions',
  };

  const moveUp = (index: number) => {
    if (index === 0) return;
    const newOrder = [...sectionOrder];
    const temp = newOrder[index - 1];
    newOrder[index - 1] = newOrder[index];
    newOrder[index] = temp;
    onUpdateOrder(newOrder);
  };

  const moveDown = (index: number) => {
    if (index === sectionOrder.length - 1) return;
    const newOrder = [...sectionOrder];
    const temp = newOrder[index + 1];
    newOrder[index + 1] = newOrder[index];
    newOrder[index] = temp;
    onUpdateOrder(newOrder);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm animate-fade-in">
      <div className="bg-white rounded-2xl max-w-md w-full p-5 shadow-2xl border border-slate-200">
        <div className="flex items-center justify-between pb-3 border-b border-slate-100">
          <div className="flex items-center gap-2">
            <span className="material-symbols-outlined text-indigo-600 text-[20px]">
              swap_vert
            </span>
            <div>
              <h3 className="text-base font-bold text-slate-900">Reorder Sections</h3>
              <p className="text-xs text-slate-500">
                Adjust the page hierarchy & visual flow
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

        <div className="py-4 space-y-2">
          {sectionOrder.map((sectionId, idx) => (
            <div
              key={sectionId}
              className="p-3 rounded-xl border border-slate-200 bg-slate-50/70 flex items-center justify-between"
            >
              <div className="flex items-center gap-2.5">
                <span className="w-5 h-5 rounded-full bg-slate-200 text-slate-600 text-[10px] font-bold flex items-center justify-center">
                  {idx + 1}
                </span>
                <span className="text-xs font-semibold text-slate-800">
                  {sectionNames[sectionId] || sectionId}
                </span>
              </div>

              <div className="flex items-center gap-1">
                <button
                  type="button"
                  disabled={idx === 0}
                  onClick={() => moveUp(idx)}
                  className="w-7 h-7 rounded-lg hover:bg-white disabled:opacity-30 flex items-center justify-center text-slate-600 transition-colors"
                >
                  <span className="material-symbols-outlined text-[16px]">arrow_upward</span>
                </button>
                <button
                  type="button"
                  disabled={idx === sectionOrder.length - 1}
                  onClick={() => moveDown(idx)}
                  className="w-7 h-7 rounded-lg hover:bg-white disabled:opacity-30 flex items-center justify-center text-slate-600 transition-colors"
                >
                  <span className="material-symbols-outlined text-[16px]">arrow_downward</span>
                </button>
              </div>
            </div>
          ))}
        </div>

        <div className="flex justify-end pt-2 border-t border-slate-100">
          <button
            type="button"
            onClick={onClose}
            className="px-4 py-2 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white text-xs font-semibold"
          >
            Done
          </button>
        </div>
      </div>
    </div>
  );
};
