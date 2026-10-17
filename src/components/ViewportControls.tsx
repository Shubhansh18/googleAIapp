import React, { useState } from 'react';
import { DeviceView, ThemeMode } from '../types/editor';

interface ViewportControlsProps {
  brandName: string;
  themeMode: ThemeMode;
  deviceView: DeviceView;
  onBrandNameChange: (newName: string) => void;
  onThemeModeChange: (newMode: ThemeMode) => void;
  onDeviceViewChange: (newView: DeviceView) => void;
}

export const ViewportControls: React.FC<ViewportControlsProps> = ({
  brandName,
  themeMode,
  deviceView,
  onBrandNameChange,
  onThemeModeChange,
  onDeviceViewChange,
}) => {
  const [isEditingBrand, setIsEditingBrand] = useState(false);
  const [tempBrandName, setTempBrandName] = useState(brandName);

  const handleBrandSubmit = () => {
    setIsEditingBrand(false);
    if (tempBrandName.trim()) {
      onBrandNameChange(tempBrandName.trim());
    } else {
      setTempBrandName(brandName);
    }
  };

  return (
    <div className="px-4 md:px-5">
      <div className="flex items-center justify-between bg-white border border-slate-200 px-3.5 py-1.5 rounded-xl shadow-xs gap-2">
        {/* Brand Name / Storefront */}
        <div className="flex items-center gap-1.5 min-w-0">
          <span className="material-symbols-outlined text-indigo-600 text-[18px] shrink-0">
            storefront
          </span>
          {isEditingBrand ? (
            <input
              type="text"
              value={tempBrandName}
              onChange={(e) => setTempBrandName(e.target.value)}
              onBlur={handleBrandSubmit}
              onKeyDown={(e) => e.key === 'Enter' && handleBrandSubmit()}
              autoFocus
              className="text-xs font-semibold text-slate-900 border-b border-indigo-500 outline-none bg-indigo-50/50 px-1 py-0.5 rounded max-w-[130px]"
            />
          ) : (
            <button
              type="button"
              onClick={() => {
                setTempBrandName(brandName);
                setIsEditingBrand(true);
              }}
              title="Click to edit site brand name"
              className="text-xs font-semibold text-slate-800 truncate max-w-[130px] sm:max-w-[180px] hover:text-indigo-600 transition-colors text-left"
            >
              {brandName}
            </button>
          )}
        </div>

        {/* Theme Mode Toggle (Dark / Light) */}
        <div className="flex items-center bg-slate-100 p-0.5 rounded-lg border border-slate-200">
          <button
            type="button"
            onClick={() => onThemeModeChange('dark')}
            className={`px-2 py-0.5 rounded-md text-[11px] flex items-center gap-1 transition-all ${
              themeMode === 'dark'
                ? 'bg-slate-900 text-white shadow-xs font-bold'
                : 'text-slate-500 hover:text-slate-800 font-medium'
            }`}
          >
            <span className="material-symbols-outlined text-[13px]">dark_mode</span>
            <span>Dark</span>
          </button>
          <button
            type="button"
            onClick={() => onThemeModeChange('light')}
            className={`px-2 py-0.5 rounded-md text-[11px] flex items-center gap-1 transition-all ${
              themeMode === 'light'
                ? 'bg-white text-indigo-600 shadow-xs font-bold'
                : 'text-slate-500 hover:text-slate-800 font-medium'
            }`}
          >
            <span className="material-symbols-outlined text-[13px] text-amber-500">light_mode</span>
            <span>Light</span>
          </button>
        </div>

        {/* Device Switcher (Mobile / Tablet / Desktop) */}
        <div className="flex items-center bg-slate-100 p-0.5 rounded-lg shrink-0 border border-slate-200">
          <button
            type="button"
            onClick={() => onDeviceViewChange('mobile')}
            title="Mobile View"
            className={`px-2 py-1 rounded-md text-xs flex items-center gap-1 transition-all ${
              deviceView === 'mobile'
                ? 'bg-white text-indigo-600 shadow-xs font-semibold'
                : 'text-slate-500 hover:text-slate-800'
            }`}
          >
            <span className="material-symbols-outlined text-[14px]">smartphone</span>
            <span className="hidden sm:inline">Mobile</span>
          </button>
          <button
            type="button"
            onClick={() => onDeviceViewChange('tablet')}
            title="Tablet View"
            className={`px-2 py-1 rounded-md text-xs flex items-center gap-1 transition-all ${
              deviceView === 'tablet'
                ? 'bg-white text-indigo-600 shadow-xs font-semibold'
                : 'text-slate-500 hover:text-slate-800'
            }`}
          >
            <span className="material-symbols-outlined text-[14px]">tablet_mac</span>
            <span className="hidden sm:inline">Tablet</span>
          </button>
          <button
            type="button"
            onClick={() => onDeviceViewChange('desktop')}
            title="Desktop View"
            className={`px-2 py-1 rounded-md text-xs flex items-center gap-1 transition-all ${
              deviceView === 'desktop'
                ? 'bg-white text-indigo-600 shadow-xs font-semibold'
                : 'text-slate-500 hover:text-slate-800'
            }`}
          >
            <span className="material-symbols-outlined text-[14px]">laptop_mac</span>
            <span className="hidden sm:inline">Desktop</span>
          </button>
        </div>
      </div>
    </div>
  );
};
