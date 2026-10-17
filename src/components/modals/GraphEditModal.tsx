import React, { useState } from 'react';
import { FlavorMetric } from '../../types/editor';

interface GraphEditModalProps {
  isOpen: boolean;
  onClose: () => void;
  metrics: FlavorMetric[];
  onSaveMetrics: (metrics: FlavorMetric[]) => void;
}

export const GraphEditModal: React.FC<GraphEditModalProps> = ({
  isOpen,
  onClose,
  metrics,
  onSaveMetrics,
}) => {
  const [localMetrics, setLocalMetrics] = useState<FlavorMetric[]>(metrics);

  if (!isOpen) return null;

  const handleScoreChange = (id: string, newScore: number) => {
    setLocalMetrics((prev) =>
      prev.map((m) => (m.id === id ? { ...m, score: Math.round(newScore * 10) / 10 } : m))
    );
  };

  const handleSave = () => {
    onSaveMetrics(localMetrics);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm animate-fade-in">
      <div className="bg-white rounded-2xl max-w-md w-full p-5 shadow-2xl border border-slate-200">
        <div className="flex items-center justify-between pb-3 border-b border-slate-100">
          <div className="flex items-center gap-2">
            <span className="material-symbols-outlined text-purple-600 text-[20px]">
              tune
            </span>
            <div>
              <h3 className="text-base font-bold text-slate-900">Edit Flavor Archetype</h3>
              <p className="text-xs text-slate-500">
                Adjust cupping scores & sensory notes matrix
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

        <div className="py-4 space-y-4">
          {localMetrics.map((item) => (
            <div key={item.id} className="space-y-1">
              <div className="flex justify-between items-center text-xs">
                <span className="font-semibold text-slate-800">{item.label}</span>
                <span className="font-bold text-indigo-600">{item.score.toFixed(1)} / 10</span>
              </div>
              <input
                type="range"
                min="0"
                max="10"
                step="0.1"
                value={item.score}
                onChange={(e) => handleScoreChange(item.id, parseFloat(e.target.value))}
                className="w-full accent-indigo-600 cursor-pointer h-2 bg-slate-100 rounded-lg"
              />
            </div>
          ))}
        </div>

        <div className="flex items-center justify-end gap-2 pt-3 border-t border-slate-100">
          <button
            type="button"
            onClick={onClose}
            className="px-3.5 py-2 rounded-xl text-xs font-semibold text-slate-600 hover:bg-slate-100"
          >
            Cancel
          </button>
          <button
            type="button"
            onClick={handleSave}
            className="px-4 py-2 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white text-xs font-bold shadow-md shadow-indigo-500/20"
          >
            Update Matrix
          </button>
        </div>
      </div>
    </div>
  );
};
