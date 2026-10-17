import React from 'react';

interface AddSectionModalProps {
  isOpen: boolean;
  onClose: () => void;
  onAddSection: (type: 'pricing' | 'faq') => void;
  hasPricing: boolean;
  hasFaq: boolean;
}

export const AddSectionModal: React.FC<AddSectionModalProps> = ({
  isOpen,
  onClose,
  onAddSection,
  hasPricing,
  hasFaq,
}) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm animate-fade-in">
      <div className="bg-white rounded-2xl max-w-md w-full p-5 shadow-2xl border border-slate-200">
        <div className="flex items-center justify-between pb-3 border-b border-slate-100">
          <div className="flex items-center gap-2">
            <span className="material-symbols-outlined text-indigo-600 text-[20px]">
              add_circle
            </span>
            <div>
              <h3 className="text-base font-bold text-slate-900">Add Page Section</h3>
              <p className="text-xs text-slate-500">
                Choose a pre-designed conversion module
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

        <div className="py-4 space-y-2.5">
          {/* Pricing Section Card */}
          <div
            onClick={() => {
              onAddSection('pricing');
              onClose();
            }}
            className={`p-3.5 rounded-xl border flex items-center justify-between cursor-pointer transition-all ${
              hasPricing
                ? 'border-slate-200 bg-slate-50/70 opacity-60 cursor-not-allowed'
                : 'border-slate-200 hover:border-indigo-400 hover:bg-indigo-50/30'
            }`}
          >
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-indigo-50 text-indigo-600 flex items-center justify-center">
                <span className="material-symbols-outlined text-[22px]">payments</span>
              </div>
              <div>
                <p className="text-xs font-bold text-slate-900">Subscription Pricing Table</p>
                <p className="text-[11px] text-slate-500">
                  3 Tiered cards with popular badges & feature checklists
                </p>
              </div>
            </div>
            <span className="text-xs font-semibold text-indigo-600">
              {hasPricing ? 'Added' : '+ Add'}
            </span>
          </div>

          {/* FAQ Accordion Card */}
          <div
            onClick={() => {
              onAddSection('faq');
              onClose();
            }}
            className={`p-3.5 rounded-xl border flex items-center justify-between cursor-pointer transition-all ${
              hasFaq
                ? 'border-slate-200 bg-slate-50/70 opacity-60 cursor-not-allowed'
                : 'border-slate-200 hover:border-teal-400 hover:bg-teal-50/30'
            }`}
          >
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-teal-50 text-teal-600 flex items-center justify-center">
                <span className="material-symbols-outlined text-[22px]">quiz</span>
              </div>
              <div>
                <p className="text-xs font-bold text-slate-900">Interactive FAQ Accordion</p>
                <p className="text-[11px] text-slate-500">
                  Expandable answers addressing customer roast, grind, & delivery
                </p>
              </div>
            </div>
            <span className="text-xs font-semibold text-teal-600">
              {hasFaq ? 'Added' : '+ Add'}
            </span>
          </div>
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
