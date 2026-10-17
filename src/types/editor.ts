export type DeviceView = 'mobile' | 'tablet' | 'desktop';
export type ThemeMode = 'light' | 'dark';

export interface FlavorMetric {
  id: string;
  label: string;
  score: number; // e.g. 8.8
  max: number; // e.g. 10
  color: string; // 'cyan' | 'primary' | 'secondary' | 'teal'
}

export interface HeroData {
  badgeText: string;
  headlinePrimary: string;
  headlineGradient: string;
  subheadline: string;
  imageUrl: string;
  imageAlt: string;
  lotName: string;
  flavorNotes: string;
  scorePts: string;
  ctaText: string;
  trustTag1: string;
  trustTag2: string;
}

export interface TestimonialData {
  rating: number;
  ratingCountText: string;
  quote: string;
  authorName: string;
  authorRole: string;
  authorAvatar: string;
}

export interface PricingPlan {
  id: string;
  name: string;
  price: string;
  interval: string;
  description: string;
  popular?: boolean;
  features: string[];
}

export interface FaqItem {
  id: string;
  question: string;
  answer: string;
}

export interface PageSection {
  id: string;
  type: 'hero' | 'flavor' | 'testimonial' | 'pricing' | 'faq';
  title?: string;
  visible: boolean;
}

export interface PageTheme {
  id: string;
  name: string;
  primary: string;
  primaryGradient: string;
  accent: string;
  fontHeading: string;
  badgeBg: string;
  badgeText: string;
}

export interface PageData {
  brandName: string;
  domain: string;
  themePreset: string;
  themeMode: ThemeMode;
  hero: HeroData;
  flavorMatrix: FlavorMetric[];
  testimonial: TestimonialData;
  pricing?: {
    title: string;
    subtitle: string;
    plans: PricingPlan[];
  };
  faq?: {
    title: string;
    subtitle: string;
    items: FaqItem[];
  };
  sectionOrder: string[]; // section ids
}
