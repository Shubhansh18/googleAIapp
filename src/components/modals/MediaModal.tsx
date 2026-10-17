import React, { useState } from 'react';
import { MEDIA_PRESETS } from '../../data/initialPageData';

interface MediaModalProps {
  isOpen: boolean;
  onClose: () => void;
  currentImageUrl: string;
  onSelectMedia: (item: {
    url: string;
    lot?: string;
    notes?: string;
    score?: string;
  }) => void;
}

export const MediaModal: React.FC<MediaModalProps> = ({
  isOpen,
  onClose,
  currentImageUrl,
  onSelectMedia,
}) => {
  const [customUrl, setCustomUrl] = useState('');

  if (!isOpen) return null;

  const handleCustomSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (customUrl.trim()) {
      onSelectMedia({ url: customUrl.trim() });
      onClose();
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm animate-fade-in">
      <div className="bg-white rounded-2xl max-w-lg w-full p-5 shadow-2xl border border-slate-200">
        <div className="flex items-center justify-between pb-3 border-b border-slate-100">
          <div className="flex items-center gap-2">
            <span className="material-symbols-outlined text-cyan-600 text-[20px]">
              image
            </span>
            <div>
              <h3 className="text-base font-bold text-slate-900">Product Media & Focus</h3>
              <p className="text-xs text-slate-500">
                Choose an artisanal product visual or custom image
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

        <div className="py-4 space-y-3">
          <label className="text-xs font-semibold text-slate-700 block">
            Curated High-Res Beverage Presets
          </label>
          <div className="grid grid-cols-2 gap-2.5 max-h-[48vh] overflow-y-auto pr-1">
            {MEDIA_PRESETS.map((preset) => {
              const isSelected = preset.url === currentImageUrl;
              return (
                <div
                  key={preset.id}
                  onClick={() => {
                    onSelectMedia({
                      url: preset.url,
                      lot: preset.lot,
                      notes: preset.notes,
                      score: preset.score,
                    });
                    onClose();
                  }}
                  className={`group relative rounded-xl overflow-hidden border cursor-pointer transition-all ${
                    isSelected
                      ? 'border-indigo-600 ring-2 ring-indigo-500/30'
                      : 'border-slate-200 hover:border-slate-300'
                  }`}
                >
                  <img
                    src={preset.url}
                    alt={preset.name}
                    className="w-full h-28 object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                  <div className="p-2 bg-white">
                    <p className="text-[11px] font-bold text-slate-900 truncate">
                      {preset.name}
                    </p>
                    <p className="text-[10px] text-slate-500 truncate">{preset.lot}</p>
                    <div className="flex items-center justify-between mt-1 text-[9px]">
                      <span className="text-teal-700 font-bold bg-teal-50 px-1 py-0.5 rounded border border-teal-200">
                        {preset.score}
                      </span>
                      {isSelected && (
                        <span className="text-indigo-600 font-bold">Active</span>
                      )}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Custom image URL input */}
          <form onSubmit={handleCustomSubmit} className="pt-2">
            <label className="text-[11px] font-semibold text-slate-600 block mb-1">
              Or Paste Custom Image URL
            </label>
            <div className="flex gap-2">
              <input
                type="url"
                value={customUrl}
                onChange={(e) => setCustomUrl(e.target.value)}
                placeholder="https://example.com/photo.jpg"
                className="flex-1 text-xs px-3 py-2 border border-slate-200 rounded-xl outline-none focus:border-indigo-500"
              />
              <button
                type="submit"
                disabled={!customUrl.trim()}
                className="px-3.5 py-2 rounded-xl bg-slate-900 hover:bg-slate-800 disabled:opacity-50 text-white text-xs font-semibold"
              >
                Use
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};
