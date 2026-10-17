import React, { useState, useEffect } from 'react';
import { HeroData, TestimonialData } from '../../types/editor';

interface QuickEditModalProps {
  isOpen: boolean;
  onClose: () => void;
  sectionType: 'hero' | 'testimonial';
  heroData?: HeroData;
  testimonialData?: TestimonialData;
  onSaveHero?: (updated: Partial<HeroData>) => void;
  onSaveTestimonial?: (updated: Partial<TestimonialData>) => void;
}

export const QuickEditModal: React.FC<QuickEditModalProps> = ({
  isOpen,
  onClose,
  sectionType,
  heroData,
  testimonialData,
  onSaveHero,
  onSaveTestimonial,
}) => {
  const [headlinePrimary, setHeadlinePrimary] = useState(heroData?.headlinePrimary || '');
  const [headlineGradient, setHeadlineGradient] = useState(heroData?.headlineGradient || '');
  const [subheadline, setSubheadline] = useState(heroData?.subheadline || '');
  const [ctaText, setCtaText] = useState(heroData?.ctaText || '');
  const [lotName, setLotName] = useState(heroData?.lotName || '');
  const [flavorNotes, setFlavorNotes] = useState(heroData?.flavorNotes || '');
  const [quote, setQuote] = useState(testimonialData?.quote || '');
  const [authorName, setAuthorName] = useState(testimonialData?.authorName || '');

  useEffect(() => {
    if (heroData) {
      setHeadlinePrimary(heroData.headlinePrimary);
      setHeadlineGradient(heroData.headlineGradient);
      setSubheadline(heroData.subheadline);
      setCtaText(heroData.ctaText);
      setLotName(heroData.lotName);
      setFlavorNotes(heroData.flavorNotes);
    }
    if (testimonialData) {
      setQuote(testimonialData.quote);
      setAuthorName(testimonialData.authorName);
    }
  }, [heroData, testimonialData, isOpen]);

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (sectionType === 'hero' && onSaveHero) {
      onSaveHero({
        headlinePrimary,
        headlineGradient,
        subheadline,
        ctaText,
        lotName,
        flavorNotes,
      });
    } else if (sectionType === 'testimonial' && onSaveTestimonial) {
      onSaveTestimonial({
        quote,
        authorName,
      });
    }
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm animate-fade-in">
      <div className="bg-white rounded-2xl max-w-lg w-full p-5 shadow-2xl border border-slate-200">
        <div className="flex items-center justify-between pb-3 border-b border-slate-100">
          <div className="flex items-center gap-2">
            <span className="material-symbols-outlined text-indigo-600 text-[20px]">
              edit
            </span>
            <div>
              <h3 className="text-base font-bold text-slate-900">
                {sectionType === 'hero' ? 'Edit Hero Banner' : 'Edit Customer Testimonial'}
              </h3>
              <p className="text-xs text-slate-500">Fine-tune copy & parameters</p>
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

        <form onSubmit={handleSubmit} className="py-4 space-y-3 max-h-[65vh] overflow-y-auto pr-1">
          {sectionType === 'hero' ? (
            <>
              <div>
                <label className="text-[11px] font-semibold text-slate-700 block mb-1">
                  Primary Headline
                </label>
                <input
                  type="text"
                  value={headlinePrimary}
                  onChange={(e) => setHeadlinePrimary(e.target.value)}
                  className="w-full text-xs px-3 py-2 border border-slate-200 rounded-xl outline-none focus:border-indigo-500"
                />
              </div>

              <div>
                <label className="text-[11px] font-semibold text-slate-700 block mb-1">
                  Gradient Accent Headline
                </label>
                <input
                  type="text"
                  value={headlineGradient}
                  onChange={(e) => setHeadlineGradient(e.target.value)}
                  className="w-full text-xs px-3 py-2 border border-slate-200 rounded-xl outline-none focus:border-indigo-500"
                />
              </div>

              <div>
                <label className="text-[11px] font-semibold text-slate-700 block mb-1">
                  Subheadline Description
                </label>
                <textarea
                  rows={2}
                  value={subheadline}
                  onChange={(e) => setSubheadline(e.target.value)}
                  className="w-full text-xs px-3 py-2 border border-slate-200 rounded-xl outline-none focus:border-indigo-500"
                />
              </div>

              <div className="grid grid-cols-2 gap-2">
                <div>
                  <label className="text-[11px] font-semibold text-slate-700 block mb-1">
                    Lot / Coffee Name
                  </label>
                  <input
                    type="text"
                    value={lotName}
                    onChange={(e) => setLotName(e.target.value)}
                    className="w-full text-xs px-3 py-2 border border-slate-200 rounded-xl outline-none focus:border-indigo-500"
                  />
                </div>
                <div>
                  <label className="text-[11px] font-semibold text-slate-700 block mb-1">
                    Flavor Notes Tagline
                  </label>
                  <input
                    type="text"
                    value={flavorNotes}
                    onChange={(e) => setFlavorNotes(e.target.value)}
                    className="w-full text-xs px-3 py-2 border border-slate-200 rounded-xl outline-none focus:border-indigo-500"
                  />
                </div>
              </div>

              <div>
                <label className="text-[11px] font-semibold text-slate-700 block mb-1">
                  Call To Action Button Text
                </label>
                <input
                  type="text"
                  value={ctaText}
                  onChange={(e) => setCtaText(e.target.value)}
                  className="w-full text-xs px-3 py-2 border border-slate-200 rounded-xl outline-none focus:border-indigo-500"
                />
              </div>
            </>
          ) : (
            <>
              <div>
                <label className="text-[11px] font-semibold text-slate-700 block mb-1">
                  Testimonial Quote
                </label>
                <textarea
                  rows={3}
                  value={quote}
                  onChange={(e) => setQuote(e.target.value)}
                  className="w-full text-xs px-3 py-2 border border-slate-200 rounded-xl outline-none focus:border-indigo-500"
                />
              </div>

              <div>
                <label className="text-[11px] font-semibold text-slate-700 block mb-1">
                  Reviewer Name
                </label>
                <input
                  type="text"
                  value={authorName}
                  onChange={(e) => setAuthorName(e.target.value)}
                  className="w-full text-xs px-3 py-2 border border-slate-200 rounded-xl outline-none focus:border-indigo-500"
                />
              </div>
            </>
          )}

          <div className="flex items-center justify-end gap-2 pt-3 border-t border-slate-100">
            <button
              type="button"
              onClick={onClose}
              className="px-3.5 py-2 rounded-xl text-xs font-semibold text-slate-600 hover:bg-slate-100"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-4 py-2 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white text-xs font-bold shadow-md shadow-indigo-500/20"
            >
              Save Changes
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
