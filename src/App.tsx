/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect, useCallback } from 'react';
import { Header } from './components/Header';
import { TopStatusBar } from './components/TopStatusBar';
import { ViewportControls } from './components/ViewportControls';
import { PreviewCanvas } from './components/PreviewCanvas';
import { ToolingDock } from './components/ToolingDock';
import { PublishModal } from './components/modals/PublishModal';
import { PaletteModal } from './components/modals/PaletteModal';
import { CopyToneModal } from './components/modals/CopyToneModal';
import { MediaModal } from './components/modals/MediaModal';
import { GraphEditModal } from './components/modals/GraphEditModal';
import { ReorderModal } from './components/modals/ReorderModal';
import { AddSectionModal } from './components/modals/AddSectionModal';
import { QuickEditModal } from './components/modals/QuickEditModal';
import { INITIAL_PAGE_DATA } from './data/initialPageData';
import {
  DeviceView,
  FlavorMetric,
  HeroData,
  PageData,
  PageTheme,
  TestimonialData,
  ThemeMode,
} from './types/editor';

export default function App() {
  // Page Data & History State for Undo/Redo
  const [pageData, setPageData] = useState<PageData>(INITIAL_PAGE_DATA);
  const [history, setHistory] = useState<PageData[]>([INITIAL_PAGE_DATA]);
  const [historyIndex, setHistoryIndex] = useState<number>(0);

  // Editor UI State
  const [activeSection, setActiveSection] = useState<string>('hero');
  const [deviceView, setDeviceView] = useState<DeviceView>('mobile');
  const [isGenerating, setIsGenerating] = useState<boolean>(false);
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  // Modal States
  const [isPublishOpen, setIsPublishOpen] = useState(false);
  const [isPaletteOpen, setIsPaletteOpen] = useState(false);
  const [isCopyToneOpen, setIsCopyToneOpen] = useState(false);
  const [isSwapMediaOpen, setIsSwapMediaOpen] = useState(false);
  const [isGraphEditOpen, setIsGraphEditOpen] = useState(false);
  const [isReorderOpen, setIsReorderOpen] = useState(false);
  const [isAddSectionOpen, setIsAddSectionOpen] = useState(false);
  const [quickEditState, setQuickEditState] = useState<{
    isOpen: boolean;
    section: 'hero' | 'testimonial';
  }>({ isOpen: false, section: 'hero' });

  // Show transient toast
  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => {
      setToastMessage((prev) => (prev === msg ? null : prev));
    }, 3200);
  };

  // Push new state to history stack
  const updatePageDataWithHistory = useCallback((newData: PageData, message?: string) => {
    setPageData(newData);
    setHistory((prev) => {
      const nextHistory = prev.slice(0, historyIndex + 1);
      return [...nextHistory, newData];
    });
    setHistoryIndex((prev) => prev + 1);
    if (message) showToast(message);
  }, [historyIndex]);

  // Undo Handler
  const handleUndo = useCallback(() => {
    if (historyIndex > 0) {
      const targetIndex = historyIndex - 1;
      setHistoryIndex(targetIndex);
      setPageData(history[targetIndex]);
      showToast('Undid last change');
    }
  }, [historyIndex, history]);

  // Redo Handler
  const handleRedo = useCallback(() => {
    if (historyIndex < history.length - 1) {
      const targetIndex = historyIndex + 1;
      setHistoryIndex(targetIndex);
      setPageData(history[targetIndex]);
      showToast('Redid change');
    }
  }, [historyIndex, history]);

  // Keyboard shortcut listener for Cmd/Ctrl+Z and Shift+Z
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && !e.shiftKey && e.key === 'z') {
        e.preventDefault();
        handleUndo();
      } else if (
        (e.metaKey || e.ctrlKey) &&
        (e.shiftKey && e.key.toLowerCase() === 'z' || e.key === 'y')
      ) {
        e.preventDefault();
        handleRedo();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [handleUndo, handleRedo]);

  // AI Copilot Query Submission
  const handleSubmitCopilot = async (prompt: string) => {
    setIsGenerating(true);
    try {
      const res = await fetch('/api/copilot', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          prompt,
          currentData: pageData,
          activeSection,
        }),
      });

      if (!res.ok) {
        throw new Error(`Copilot request failed: ${res.statusText}`);
      }

      const data = await res.json();
      if (data.patch) {
        let updated: PageData = { ...pageData };

        if (data.patch.hero) {
          updated.hero = { ...updated.hero, ...data.patch.hero };
          setActiveSection('hero');
        }

        if (data.patch.flavorMatrix) {
          updated.flavorMatrix = data.patch.flavorMatrix;
          setActiveSection('flavor');
        }

        if (data.patch.testimonial) {
          updated.testimonial = { ...updated.testimonial, ...data.patch.testimonial };
          setActiveSection('testimonial');
        }

        if (data.patch.addSection) {
          const { type, title, subtitle, items } = data.patch.addSection;
          if (type === 'pricing') {
            updated.pricing = {
              title: title || 'Curated Subscriptions',
              subtitle: subtitle || 'Flexible delivery. Skip or cancel anytime.',
              plans: items.map((p: any, idx: number) => ({
                id: `tier-${idx + 1}`,
                name: p.name || 'Plan',
                price: p.price || '$25',
                interval: p.interval || '/mo',
                description: p.desc || p.description || '',
                popular: !!p.popular,
                features: ['Fresh weekly roast', 'Free nationwide shipping', 'Priority batching'],
              })),
            };
            if (!updated.sectionOrder.includes('pricing')) {
              updated.sectionOrder = [...updated.sectionOrder, 'pricing'];
            }
            setActiveSection('pricing');
          } else if (type === 'faq') {
            updated.faq = {
              title: title || 'Frequently Asked Questions',
              subtitle: subtitle || 'Everything you need to know about our beans',
              items: items.map((item: any, idx: number) => ({
                id: `faq-${idx + 1}`,
                question: item.q || item.question || 'Question',
                answer: item.a || item.answer || 'Answer',
              })),
            };
            if (!updated.sectionOrder.includes('faq')) {
              updated.sectionOrder = [...updated.sectionOrder, 'faq'];
            }
            setActiveSection('faq');
          }
        }

        updatePageDataWithHistory(updated, data.summary || 'Copilot updated page');
      }
    } catch (err) {
      console.error(err);
      // Fallback local instant rewrite if network/backend unavailable
      const query = prompt.toLowerCase();
      let updated = { ...pageData };
      if (query.includes('headline') || query.includes('bolder')) {
        updated.hero = {
          ...updated.hero,
          headlinePrimary: 'Pure Craft.',
          headlineGradient: 'Peak Taste, Redefined.',
          subheadline: 'Obsessively roasted single-origin Ethiopian microlots shipped straight from our micro-roastery to your cup in 48 hours.',
        };
      } else if (query.includes('pricing') || query.includes('table')) {
        if (!updated.sectionOrder.includes('pricing')) {
          updated.sectionOrder = [...updated.sectionOrder, 'pricing'];
        }
      }
      updatePageDataWithHistory(updated, 'Copilot applied smart edits');
    } finally {
      setIsGenerating(false);
    }
  };

  // Quick Action Handlers
  const handleApplyTheme = (theme: PageTheme) => {
    const updated: PageData = {
      ...pageData,
      themePreset: theme.id,
    };
    updatePageDataWithHistory(updated, `Color theme updated to ${theme.name}`);
  };

  const handleApplyTone = (preset: {
    headlinePrimary: string;
    headlineGradient: string;
    subheadline: string;
    cta: string;
    name: string;
  }) => {
    const updated: PageData = {
      ...pageData,
      hero: {
        ...pageData.hero,
        headlinePrimary: preset.headlinePrimary,
        headlineGradient: preset.headlineGradient,
        subheadline: preset.subheadline,
        ctaText: preset.cta,
      },
    };
    setActiveSection('hero');
    updatePageDataWithHistory(updated, `Tone updated to ${preset.name}`);
  };

  const handleSelectMedia = (item: {
    url: string;
    lot?: string;
    notes?: string;
    score?: string;
  }) => {
    const updated: PageData = {
      ...pageData,
      hero: {
        ...pageData.hero,
        imageUrl: item.url,
        ...(item.lot ? { lotName: item.lot } : {}),
        ...(item.notes ? { flavorNotes: item.notes } : {}),
        ...(item.score ? { scorePts: item.score } : {}),
      },
    };
    setActiveSection('hero');
    updatePageDataWithHistory(updated, 'Product visual and lot details updated');
  };

  const handleSaveMetrics = (metrics: FlavorMetric[]) => {
    const updated: PageData = {
      ...pageData,
      flavorMatrix: metrics,
    };
    updatePageDataWithHistory(updated, 'Flavor matrix scores updated');
  };

  const handleAddSection = (type: 'pricing' | 'faq') => {
    if (!pageData.sectionOrder.includes(type)) {
      const updated: PageData = {
        ...pageData,
        sectionOrder: [...pageData.sectionOrder, type],
      };
      setActiveSection(type);
      updatePageDataWithHistory(
        updated,
        `Added ${type === 'pricing' ? 'Subscription Pricing' : 'FAQ Accordion'} section`
      );
    }
  };

  const handleRemoveSection = (sectionId: string) => {
    const updated: PageData = {
      ...pageData,
      sectionOrder: pageData.sectionOrder.filter((id) => id !== sectionId),
    };
    updatePageDataWithHistory(updated, `Removed section`);
  };

  const handleReorder = (newOrder: string[]) => {
    const updated: PageData = {
      ...pageData,
      sectionOrder: newOrder,
    };
    updatePageDataWithHistory(updated, 'Page section hierarchy updated');
  };

  const handleReset = () => {
    if (window.confirm('Reset page to original demo state?')) {
      updatePageDataWithHistory(INITIAL_PAGE_DATA, 'Reset page to default');
    }
  };

  return (
    <div className="flex flex-col min-h-screen bg-slate-100 text-slate-900 selection:bg-indigo-600 selection:text-white pb-32">
      {/* Top Application Header */}
      <Header onReset={handleReset} />

      {/* Main Workspace Stage */}
      <main className="flex flex-col relative w-full pt-16 max-w-7xl mx-auto">
        {/* Editor Status Bar & Device Switcher */}
        <div className="flex flex-col gap-2 max-w-3xl mx-auto w-full">
          <TopStatusBar
            isGenerating={isGenerating}
            canUndo={historyIndex > 0}
            canRedo={historyIndex < history.length - 1}
            onUndo={handleUndo}
            onRedo={handleRedo}
            onPublish={() => setIsPublishOpen(true)}
          />

          <ViewportControls
            brandName={pageData.brandName}
            themeMode={pageData.themeMode}
            deviceView={deviceView}
            onBrandNameChange={(newName) => {
              updatePageDataWithHistory(
                { ...pageData, brandName: newName },
                `Brand name updated to "${newName}"`
              );
            }}
            onThemeModeChange={(newMode: ThemeMode) => {
              setPageData((prev) => ({ ...prev, themeMode: newMode }));
            }}
            onDeviceViewChange={setDeviceView}
          />
        </div>

        {/* Live Simulated Preview Canvas Area */}
        <PreviewCanvas
          pageData={pageData}
          activeSection={activeSection}
          deviceView={deviceView}
          onSelectSection={setActiveSection}
          onEditHero={() => setQuickEditState({ isOpen: true, section: 'hero' })}
          onEditFlavorGraph={() => setIsGraphEditOpen(true)}
          onEditTestimonial={() =>
            setQuickEditState({ isOpen: true, section: 'testimonial' })
          }
          onOpenAddSection={() => setIsAddSectionOpen(true)}
          onOpenReorder={() => setIsReorderOpen(true)}
          onRemoveSection={handleRemoveSection}
        />
      </main>

      {/* Floating Tooling & AI Copilot Prompt Dock */}
      <ToolingDock
        onOpenPalette={() => setIsPaletteOpen(true)}
        onOpenCopyTone={() => setIsCopyToneOpen(true)}
        onOpenSwapMedia={() => setIsSwapMediaOpen(true)}
        onOpenAddSection={() => setIsAddSectionOpen(true)}
        onSubmitCopilot={handleSubmitCopilot}
        isGenerating={isGenerating}
        activeSection={activeSection}
      />

      {/* Floating Feedback Toast Notification */}
      {toastMessage && (
        <div className="fixed top-20 inset-x-0 z-50 flex justify-center pointer-events-none px-4">
          <div className="bg-slate-900/90 text-white text-xs font-medium px-4 py-2 rounded-full shadow-lg backdrop-blur-md border border-slate-700/50 flex items-center gap-2 animate-bounce-subtle">
            <span className="material-symbols-outlined text-[16px] text-emerald-400">
              check_circle
            </span>
            <span>{toastMessage}</span>
          </div>
        </div>
      )}

      {/* Modals & Inspectors */}
      <PublishModal
        isOpen={isPublishOpen}
        onClose={() => setIsPublishOpen(false)}
        domain={pageData.domain}
        brandName={pageData.brandName}
      />

      <PaletteModal
        isOpen={isPaletteOpen}
        onClose={() => setIsPaletteOpen(false)}
        currentPresetId={pageData.themePreset}
        onSelectPreset={handleApplyTheme}
      />

      <CopyToneModal
        isOpen={isCopyToneOpen}
        onClose={() => setIsCopyToneOpen(false)}
        onApplyTone={handleApplyTone}
      />

      <MediaModal
        isOpen={isSwapMediaOpen}
        onClose={() => setIsSwapMediaOpen(false)}
        currentImageUrl={pageData.hero.imageUrl}
        onSelectMedia={handleSelectMedia}
      />

      <GraphEditModal
        isOpen={isGraphEditOpen}
        onClose={() => setIsGraphEditOpen(false)}
        metrics={pageData.flavorMatrix}
        onSaveMetrics={handleSaveMetrics}
      />

      <ReorderModal
        isOpen={isReorderOpen}
        onClose={() => setIsReorderOpen(false)}
        sectionOrder={pageData.sectionOrder}
        onUpdateOrder={handleReorder}
      />

      <AddSectionModal
        isOpen={isAddSectionOpen}
        onClose={() => setIsAddSectionOpen(false)}
        onAddSection={handleAddSection}
        hasPricing={pageData.sectionOrder.includes('pricing')}
        hasFaq={pageData.sectionOrder.includes('faq')}
      />

      <QuickEditModal
        isOpen={quickEditState.isOpen}
        onClose={() => setQuickEditState((prev) => ({ ...prev, isOpen: false }))}
        sectionType={quickEditState.section}
        heroData={pageData.hero}
        testimonialData={pageData.testimonial}
        onSaveHero={(patch: Partial<HeroData>) => {
          const updated: PageData = {
            ...pageData,
            hero: { ...pageData.hero, ...patch },
          };
          updatePageDataWithHistory(updated, 'Hero banner updated');
        }}
        onSaveTestimonial={(patch: Partial<TestimonialData>) => {
          const updated: PageData = {
            ...pageData,
            testimonial: { ...pageData.testimonial, ...patch },
          };
          updatePageDataWithHistory(updated, 'Testimonial updated');
        }}
      />
    </div>
  );
}
