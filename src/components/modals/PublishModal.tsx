import React, { useState } from 'react';

interface PublishModalProps {
  isOpen: boolean;
  onClose: () => void;
  domain: string;
  brandName: string;
}

export const PublishModal: React.FC<PublishModalProps> = ({
  isOpen,
  onClose,
  domain,
  brandName,
}) => {
  const [copied, setCopied] = useState(false);
  const [isDeploying, setIsDeploying] = useState(false);
  const [deployed, setDeployed] = useState(true);

  if (!isOpen) return null;

  const fullUrl = `https://${domain}`;

  const handleCopy = () => {
    navigator.clipboard.writeText(fullUrl);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleRedeploy = () => {
    setIsDeploying(true);
    setTimeout(() => {
      setIsDeploying(false);
      setDeployed(true);
    }, 1200);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm animate-fade-in">
      <div className="bg-white rounded-2xl max-w-md w-full p-6 shadow-2xl border border-slate-200 relative overflow-hidden">
        {/* Glow decoration */}
        <div className="absolute top-0 inset-x-0 h-1.5 bg-gradient-to-r from-indigo-600 via-purple-600 to-teal-400" />

        <div className="flex items-center justify-between pb-3 border-b border-slate-100">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center">
              <span className="material-symbols-outlined text-[18px]">verified</span>
            </div>
            <div>
              <h3 className="text-base font-bold text-slate-900">Publish & Launch</h3>
              <p className="text-xs text-slate-500">Live deployment status</p>
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
          {/* Status banner */}
          <div className="p-3 bg-emerald-50 border border-emerald-200 rounded-xl flex items-center justify-between">
            <div className="flex items-center gap-2">
              <span className="relative flex h-2.5 w-2.5">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-500 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-emerald-600"></span>
              </span>
              <div>
                <p className="text-xs font-bold text-emerald-900">
                  {isDeploying ? 'Deploying updates to Edge...' : 'Page is Live & Healthy'}
                </p>
                <p className="text-[10px] text-emerald-700">
                  Global CDN distribution active across 34 edge regions
                </p>
              </div>
            </div>
          </div>

          {/* URL Box */}
          <div>
            <label className="text-[11px] font-semibold text-slate-600 block mb-1">
              Live Custom URL
            </label>
            <div className="flex items-center gap-1.5 bg-slate-50 border border-slate-200 rounded-xl p-1.5 pl-3">
              <span className="material-symbols-outlined text-[16px] text-slate-400">
                link
              </span>
              <input
                type="text"
                readOnly
                value={fullUrl}
                className="w-full bg-transparent text-xs font-mono text-slate-800 outline-none select-all"
              />
              <button
                type="button"
                onClick={handleCopy}
                className="px-3 py-1.5 rounded-lg bg-white border border-slate-200 text-xs font-semibold text-slate-700 hover:text-indigo-600 shadow-2xs hover:bg-slate-50 transition-colors"
              >
                {copied ? 'Copied!' : 'Copy'}
              </button>
            </div>
          </div>

          {/* Telemetry checklist */}
          <div className="grid grid-cols-2 gap-2 text-[11px]">
            <div className="p-2.5 bg-slate-50 border border-slate-100 rounded-lg flex items-center gap-2">
              <span className="material-symbols-outlined text-emerald-600 text-[16px]">
                lock
              </span>
              <div>
                <p className="font-semibold text-slate-800">SSL Certificate</p>
                <p className="text-slate-400 text-[10px]">TLS 1.3 Active</p>
              </div>
            </div>
            <div className="p-2.5 bg-slate-50 border border-slate-100 rounded-lg flex items-center gap-2">
              <span className="material-symbols-outlined text-indigo-600 text-[16px]">
                speed
              </span>
              <div>
                <p className="font-semibold text-slate-800">PageSpeed</p>
                <p className="text-slate-400 text-[10px]">99/100 Core Vitals</p>
              </div>
            </div>
          </div>
        </div>

        <div className="flex items-center gap-2 pt-2 border-t border-slate-100">
          <button
            type="button"
            onClick={handleRedeploy}
            disabled={isDeploying}
            className="flex-1 py-2.5 px-3 rounded-xl border border-slate-200 text-xs font-semibold text-slate-700 hover:bg-slate-50 flex items-center justify-center gap-1.5 transition-colors"
          >
            <span className="material-symbols-outlined text-[16px]">refresh</span>
            <span>{isDeploying ? 'Deploying...' : 'Redeploy'}</span>
          </button>

          <a
            href={fullUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="flex-1 py-2.5 px-3 rounded-xl bg-gradient-to-r from-indigo-600 to-purple-600 text-white text-xs font-bold flex items-center justify-center gap-1.5 shadow-md shadow-indigo-500/20 hover:opacity-95 transition-opacity"
          >
            <span>Visit Live</span>
            <span className="material-symbols-outlined text-[16px]">open_in_new</span>
          </a>
        </div>
      </div>
    </div>
  );
};
