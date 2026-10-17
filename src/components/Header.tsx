import React from 'react';

interface HeaderProps {
  onReset?: () => void;
}

export const Header: React.FC<HeaderProps> = ({ onReset }) => {
  return (
    <header className="fixed top-0 inset-x-0 z-50 bg-white/90 backdrop-blur-xl border-b border-slate-200/80 shadow-xs">
      <div className="h-16 px-4 md:px-6 flex items-center justify-between max-w-7xl mx-auto">
        <div className="flex items-center gap-2">
          <button
            type="button"
            aria-label="Back"
            onClick={onReset}
            className="w-10 h-10 -ml-1 flex items-center justify-center rounded-full hover:bg-slate-100 active:bg-slate-200 text-slate-800 transition-colors"
            title="Reset or back"
          >
            <span className="material-symbols-outlined text-[20px]">arrow_back_ios_new</span>
          </button>
          
          <div className="flex items-center gap-2 cursor-pointer select-none">
            <img
              src="https://lh3.googleusercontent.com/aida/AEtjO1WsVdQlcZK-mb8AwWTp_4RCNhNcUTk3ybebfTGLlgAp13xsvBv9QpGiYN6sy9W9lVVoO2B7JjpY5vyN2BgLvdL57hgALmFis9Jxlu3VM5Z6SKgBZ3CEk1dzYpN2H_BxjYnGaJ1ZGaGrS9HyKFxwHVTSXXdU3OVdgPzN9j6Xyp5C4cAJy2auT5val24nGGLSQQMyj_gNrWnl7J2yZzCjNaTMeRY60Mz2tdXRpVzA4doNvDodU4S5q6_OQQ"
              alt="LandingNest Logo"
              className="h-8 w-auto object-contain"
            />
            <h1 className="text-lg font-bold text-slate-900 tracking-tight truncate">
              Page Editor
            </h1>
          </div>
        </div>

        <div className="flex items-center gap-3">
          <span className="hidden sm:inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-slate-100 text-slate-600 text-xs font-medium">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse"></span>
            Cloud Synced
          </span>
          <img
            src="https://lh3.googleusercontent.com/aida-public/AB6AXuAR9ZjciWag1zzBV2iJrKcAlJmp5a1mYDIDsa6zsBIu3K7Gj4rbj8V27bPs3EX3iL7NmelQjYo5GP5SLtuqSSWcFgcFA6FZrljn_1ch-ari5mfYvL1EmSUIv1BYwLTqdVyu-q0tZ6m99R4edWVOTtfrK6qtdBbQiVyJF8eZYqpS_6jY-UJYZernZs8nN0sq93ylHASi0zvG4iLmtxOlnhfb_v8MGgqSM_6ZgCgSM36-YN6OEGWQ5VOY"
            alt="Profile Avatar"
            className="w-8 h-8 rounded-full object-cover ring-2 ring-slate-200 shadow-xs"
          />
        </div>
      </div>
    </header>
  );
};
