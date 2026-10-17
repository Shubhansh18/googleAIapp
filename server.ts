import express from 'express';
import path from 'path';
import { fileURLToPath } from 'url';
import dotenv from 'dotenv';
import { GoogleGenAI } from '@google/genai';

dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const port = process.env.PORT || 3000;

app.use(express.json());

// Initialize Gemini SDK if API key is provided
let aiClient: GoogleGenAI | null = null;
if (process.env.GEMINI_API_KEY) {
  try {
    aiClient = new GoogleGenAI({
      apiKey: process.env.GEMINI_API_KEY,
      httpOptions: {
        headers: {
          'User-Agent': 'aistudio-build',
        },
      },
    });
  } catch (err) {
    console.error('Error initializing Gemini AI client:', err);
  }
}

// AI Copilot endpoint for smart page modifications
app.post('/api/copilot', async (req, res) => {
  const { prompt, currentData, activeSection } = req.body;

  if (!prompt || typeof prompt !== 'string') {
    return res.status(400).json({ error: 'Prompt is required' });
  }

  const query = prompt.trim().toLowerCase();

  // If Gemini API is available, use gemini-3.8-flash for contextual modifications
  if (aiClient && process.env.GEMINI_API_KEY) {
    try {
      const systemInstruction = `
You are the AI design copilot for the LandingNest Page Editor.
The user is editing a high-end artisanal brand landing page (currently "Aura Coffee Roasters").
Current page state: ${JSON.stringify(currentData)}
Active section: ${activeSection || 'hero'}

Analyze the user's request: "${prompt}".
Respond ONLY with a valid JSON object matching this schema:
{
  "summary": "Brief 1-sentence description of the change made",
  "patch": {
    // any changed fields in currentData, for example:
    // hero: { headlinePrimary: string, headlineGradient: string, subheadline: string, ctaText: string, productBadge: { name: string, notes: string, score: string } }
    // flavorMatrix: [ { label: string, score: number, color: string } ]
    // testimonial: { rating: number, countText: string, quote: string, author: string, role: string }
    // addSection?: { type: "pricing" | "faq" | "steps" | "features", title: string, items: any[] }
    // themePreset?: "indigo" | "amber" | "emerald" | "violet" | "rose"
  }
}
Do not include any markdown or code fence block. Output raw JSON only.
`;

      const response = await aiClient.models.generateContent({
        model: 'gemini-3.8-flash',
        contents: prompt,
        config: {
          systemInstruction,
          responseMimeType: 'application/json',
        },
      });

      const responseText = response.text || '';
      try {
        const parsed = JSON.parse(responseText.trim());
        return res.json({
          success: true,
          source: 'gemini-3.8-flash',
          ...parsed,
        });
      } catch (parseErr) {
        console.warn('Could not parse Gemini JSON, falling back to rule-based engine:', parseErr);
      }
    } catch (apiErr) {
      console.warn('Gemini API call failed, falling back to smart local assistant:', apiErr);
    }
  }

  // Smart local engine fallback for instant tactile preview
  let summary = 'Updated page according to your request';
  const patch: Record<string, any> = {};

  if (query.includes('headline') || query.includes('bolder') || query.includes('punchier') || query.includes('hook')) {
    patch.hero = {
      ...currentData?.hero,
      headlinePrimary: 'Pure Craft.',
      headlineGradient: 'Peak Taste, Redefined.',
      subheadline: 'Obsessively roasted single-origin Ethiopian microlots shipped straight from our micro-roastery to your cup in 48 hours.',
    };
    summary = 'Refined hero headline with higher punchiness and bold contrast';
  } else if (query.includes('pricing') || query.includes('tier') || query.includes('cost')) {
    patch.addSection = {
      type: 'pricing',
      title: 'Curated Subscriptions',
      subtitle: 'Flexible delivery. Skip or cancel anytime.',
      items: [
        { name: 'Explorer', price: '$22', interval: '/bag', desc: '1 bag per month (12oz). Fresh seasonal single-origin.', popular: false },
        { name: 'Reserve Collector', price: '$38', interval: '/2 bags', desc: 'Bi-weekly roasted lots + exclusive cupping notes.', popular: true },
        { name: 'Atelier Crew', price: '$68', interval: '/4 bags', desc: 'Weekly delivery for serious enthusiasts and studios.', popular: false },
      ],
    };
    summary = 'Added interactive Curated Subscription pricing tiers';
  } else if (query.includes('faq') || query.includes('question')) {
    patch.addSection = {
      type: 'faq',
      title: 'Frequently Asked Questions',
      subtitle: 'Everything you need to know about our sourcing & shipping',
      items: [
        { q: 'How fresh is the roast when it arrives?', a: 'Every bag is roasted to order on Tuesdays and dispatched within 24 to 48 hours.' },
        { q: 'Can I choose between whole bean and ground?', a: 'Yes! Select whole bean or fine espresso, pour-over, or cold-brew coarse grind during checkout.' },
        { q: 'Where do you source your beans?', a: 'Direct trade relationships with smallholder farmers across Guji, Yirgacheffe, Huila, and Tarrazú.' },
      ],
    };
    summary = 'Inserted comprehensive FAQ accordion section';
  } else if (query.includes('flavor') || query.includes('taste') || query.includes('notes') || query.includes('matrix')) {
    patch.flavorMatrix = [
      { label: 'Acidity', score: 9.2, color: 'cyan' },
      { label: 'Sweetness', score: 9.7, color: 'indigo' },
      { label: 'Body / Mouthfeel', score: 8.5, color: 'violet' },
      { label: 'Floral Aromatics', score: 9.8, color: 'teal' },
    ];
    summary = 'Enhanced tasting archetype to highlight exceptional sweetness and floral intensity';
  } else if (query.includes('discount') || query.includes('cta') || query.includes('offer') || query.includes('button')) {
    patch.hero = {
      ...currentData?.hero,
      ctaText: 'Claim Your First Batch — 25% Off',
    };
    summary = 'Updated primary CTA trigger to 25% off introductory offer';
  } else if (query.includes('luxury') || query.includes('minimal') || query.includes('clean')) {
    patch.hero = {
      ...currentData?.hero,
      headlinePrimary: 'Ritual of Origin.',
      headlineGradient: 'Sip Exceptional Silence.',
      subheadline: 'Single estate highland cherries, slow roasted to illuminate subtle terroir and natural florals.',
    };
    summary = 'Shifted brand copy to minimalist luxury aesthetic';
  } else {
    patch.hero = {
      ...currentData?.hero,
      headlinePrimary: 'Pure Craft.',
      headlineGradient: 'Brewed for the Discerning.',
      subheadline: `Ethically sourced single-origin beans roasted weekly in small batches in Portland and shipped direct within 48 hours. (${prompt})`,
    };
    summary = `Applied generative prompt: "${prompt}"`;
  }

  return res.json({
    success: true,
    source: 'assistant-engine',
    summary,
    patch,
  });
});

// Vite middleware in dev or static files in production
async function startServer() {
  const isProd = process.env.NODE_ENV === 'production';

  if (!isProd) {
    const { createServer: createViteServer } = await import('vite');
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: 'spa',
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.resolve(__dirname, 'dist');
    app.use(express.static(distPath));
    app.get('*', (req, res) => {
      res.sendFile(path.resolve(distPath, 'index.html'));
    });
  }

  app.listen(port, () => {
    console.log(`Server listening on http://localhost:${port}`);
  });
}

startServer();
