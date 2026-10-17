import React from 'react';
import { DeviceView, PageData } from '../types/editor';
import { HeroSection } from './sections/HeroSection';
import { FlavorMatrixSection } from './sections/FlavorMatrixSection';
import { TestimonialSection } from './sections/TestimonialSection';
import { PricingSection } from './sections/PricingSection';
import { FaqSection } from './sections/FaqSection';

interface PreviewCanvasProps {
  pageData: PageData;
  activeSection: string;
  deviceView: DeviceView;
  onSelectSection: (sectionId: string) => void;
  onEditHero: () => void;
  onEditFlavorGraph: () => void;
  onEditTestimonial: () => void;
  onOpenAddSection: () => void;
  onOpenReorder: () => void;
  onRemoveSection: (sectionId: string) => void;
}

export const PreviewCanvas: React.FC<PreviewCanvasProps> = ({
  pageData,
  activeSection,
  deviceView,
  onSelectSection,
  onEditHero,
  onEditFlavorGraph,
  onEditTestimonial,
  onOpenAddSection,
  onOpenReorder,
  onRemoveSection,
}) => {
  const isDark = pageData.themeMode === 'dark';

  // Responsive frame width based on deviceView
  const getContainerWidth = () => {
    switch (deviceView) {
      case 'desktop':
        return 'w-full max-w-[920px]';
      case 'tablet':
        return 'w-full max-w-[640px]';
      case 'mobile':
      default:
        return 'w-full max-w-[420px]';
    }
  };

  const getActiveSectionLabel = () => {
    switch (activeSection) {
      case 'hero':
        return 'Hero Section active';
      case 'flavor':
        return 'Tasting Notes active';
      case 'testimonial':
        return 'Reviews active';
      case 'pricing':
        return 'Pricing Section active';
      case 'faq':
        return 'FAQ Accordion active';
      default:
        return 'Page Section active';
    }
  };

  return (
    <div className="px-4 md:px-5 mt-2 transition-all duration-300">
      {/* Device Bezel Simulator */}
      <div
        className={`mx-auto rounded-2xl border overflow-hidden shadow-xl transition-all duration-300 ${getContainerWidth()} ${
          isDark
            ? 'bg-slate-950 border-slate-800'
            : 'bg-white border-slate-200'
        }`}
      >
        {/* Canvas Screen Notch & URL Bar */}
        <div
          className={`w-full px-4 py-2 flex items-center justify-between border-b text-xs select-none ${
            isDark
              ? 'bg-slate-900 border-slate-800 text-slate-300'
              : 'bg-slate-50 border-slate-200 text-slate-600'
          }`}
        >
          <div className="flex items-center gap-1.5 font-medium truncate">
            <span className="material-symbols-outlined text-[13px] text-slate-400">
              lock
            </span>
            <span className="truncate">{pageData.domain}</span>
          </div>

          <div className="flex items-center gap-1.5 shrink-0">
            <span className="material-symbols-outlined text-[14px] text-indigo-600">
              bolt
            </span>
            <span className="w-2 h-2 rounded-full bg-emerald-500"></span>
          </div>
        </div>

        {/* Live Canvas Content Area */}
        <div
          className={`p-3.5 sm:p-4 flex flex-col gap-4 relative transition-colors ${
            isDark ? 'bg-slate-950 text-slate-100' : 'bg-white text-slate-900'
          }`}
        >
          {pageData.sectionOrder.map((sectionId) => {
            if (sectionId === 'hero') {
              return (
                <HeroSection
                  key="hero"
                  data={pageData.hero}
                  isSelected={activeSection === 'hero'}
                  themeMode={pageData.themeMode}
                  onSelect={() => onSelectSection('hero')}
                  onQuickEdit={onEditHero}
                />
              );
            }

            if (sectionId === 'flavor') {
              return (
                <FlavorMatrixSection
                  key="flavor"
                  metrics={pageData.flavorMatrix}
                  isSelected={activeSection === 'flavor'}
                  themeMode={pageData.themeMode}
                  onSelect={() => onSelectSection('flavor')}
                  onEditGraph={onEditFlavorGraph}
                />
              );
            }

            if (sectionId === 'testimonial') {
              return (
                <TestimonialSection
                  key="testimonial"
                  data={pageData.testimonial}
                  isSelected={activeSection === 'testimonial'}
                  themeMode={pageData.themeMode}
                  onSelect={() => onSelectSection('testimonial')}
                  onEdit={onEditTestimonial}
                />
              );
            }

            if (sectionId === 'pricing' && pageData.pricing) {
              return (
                <PricingSection
                  key="pricing"
                  title={pageData.pricing.title}
                  subtitle={pageData.pricing.subtitle}
                  plans={pageData.pricing.plans}
                  isSelected={activeSection === 'pricing'}
                  themeMode={pageData.themeMode}
                  onSelect={() => onSelectSection('pricing')}
                  onRemove={() => onRemoveSection('pricing')}
                />
              );
            }

            if (sectionId === 'faq' && pageData.faq) {
              return (
                <FaqSection
                  key="faq"
                  title={pageData.faq.title}
                  subtitle={pageData.faq.subtitle}
                  items={pageData.faq.items}
                  isSelected={activeSection === 'faq'}
                  themeMode={pageData.themeMode}
                  onSelect={() => onSelectSection('faq')}
                  onRemove={() => onRemoveSection('faq')}
                />
              );
            }

            return null;
          })}

          {/* Add New Section Button Slot */}
          <div className="pt-1">
            <button
              type="button"
              onClick={onOpenAddSection}
              className={`w-full py-3 rounded-xl text-xs font-semibold flex items-center justify-center gap-2 border border-dashed transition-all active:scale-[0.99] cursor-pointer ${
                isDark
                  ? 'bg-slate-900 hover:bg-slate-800 text-slate-300 border-slate-700'
                  : 'bg-slate-50 hover:bg-slate-100 text-slate-700 border-slate-300'
              }`}
            >
              <span className="material-symbols-outlined text-indigo-600 text-[18px]">
                add_circle
              </span>
              <span>Insert New Section Here</span>
            </button>
          </div>
        </div>
      </div>

      {/* Section Selector Info Strip Underneath */}
      <div
        className={`mx-auto mt-2 flex items-center justify-between text-xs px-2 ${getContainerWidth()} ${
          isDark ? 'text-slate-400' : 'text-slate-600'
        }`}
      >
        <div className="flex items-center gap-1.5 font-medium">
          <span className="w-2 h-2 rounded-full bg-indigo-600"></span>
          <span
            className={`font-semibold ${
              isDark ? 'text-white' : 'text-slate-900'
            }`}
          >
            {getActiveSectionLabel()}
          </span>
          <span className="hidden sm:inline">• Tap any block to customize</span>
        </div>

        <button
          type="button"
          onClick={onOpenReorder}
          className="text-indigo-600 hover:text-indigo-700 hover:underline flex items-center gap-0.5 font-semibold cursor-pointer"
        >
          <span>Reorder</span>
          <span className="material-symbols-outlined text-[14px]">swap_vert</span>
        </button>
      </div>
    </div>
  );
};
