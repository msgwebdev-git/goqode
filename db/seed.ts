import { config } from "dotenv";
config({ path: ".env.local" });

import { neon } from "@neondatabase/serverless";
import { drizzle } from "drizzle-orm/neon-http";
import {
  projectTypes,
  designLevels,
  featureCategories,
  features,
  scopeModifiers,
  scopeModifierOptions,
} from "./schema";

const sql = neon(process.env.DATABASE_URL!);
const db = drizzle(sql);

/* ─── Data from current calculator constants ─── */

const PROJECT_TYPES = [
  { key: "0", basePriceMin: 500, basePriceMax: 1500, isMonthly: false, skipDesign: false },
  { key: "1", basePriceMin: 3000, basePriceMax: 8000, isMonthly: false, skipDesign: false },
  { key: "2", basePriceMin: 1500, basePriceMax: 4000, isMonthly: false, skipDesign: false },
  { key: "3", basePriceMin: 5000, basePriceMax: 15000, isMonthly: false, skipDesign: false },
  { key: "4", basePriceMin: 8000, basePriceMax: 20000, isMonthly: false, skipDesign: false },
  { key: "5", basePriceMin: 1000, basePriceMax: 3000, isMonthly: false, skipDesign: true },
  { key: "6", basePriceMin: 800, basePriceMax: 2500, isMonthly: true, skipDesign: true },
];

const DESIGN_LEVELS = [
  { key: "0", multiplier: 1.0 },
  { key: "1", multiplier: 1.4 },
  { key: "2", multiplier: 1.8 },
];

type F = { key: string; price: [number, number]; recommended?: boolean };
type Cat = { categoryKey: string; features: F[] };

const CATEGORIZED_FEATURES: Record<string, Cat[]> = {
  "0": [
    { categoryKey: "designUx", features: [
      { key: "animations", price: [200, 600] },
      { key: "parallaxScrolling", price: [150, 400] },
      { key: "videoBackground", price: [200, 500] },
      { key: "darkLightTheme", price: [150, 400] },
    ]},
    { categoryKey: "leadCapture", features: [
      { key: "contactForm", price: [100, 300], recommended: true },
      { key: "emailCapture", price: [150, 400] },
      { key: "chatWidget", price: [100, 250] },
      { key: "phoneCallback", price: [100, 250] },
      { key: "quizFunnel", price: [300, 800] },
    ]},
    { categoryKey: "conversionTrust", features: [
      { key: "socialProof", price: [100, 300], recommended: true },
      { key: "faqSection", price: [80, 200] },
      { key: "pricingTable", price: [150, 400] },
      { key: "countdown", price: [100, 250] },
      { key: "abTesting", price: [300, 800] },
    ]},
    { categoryKey: "technical", features: [
      { key: "analytics", price: [200, 500], recommended: true },
      { key: "seo", price: [200, 500], recommended: true },
      { key: "speedOptimization", price: [150, 400] },
      { key: "cookieConsent", price: [100, 250] },
    ]},
  ],
  "1": [
    { categoryKey: "storefront", features: [
      { key: "productCatalog", price: [300, 800], recommended: true },
      { key: "filtersSearch", price: [200, 600], recommended: true },
      { key: "productVariants", price: [200, 500] },
      { key: "productComparison", price: [150, 400] },
      { key: "quickView", price: [100, 300] },
      { key: "wishlist", price: [150, 400] },
    ]},
    { categoryKey: "paymentsOrders", features: [
      { key: "cartCheckout", price: [400, 1200], recommended: true },
      { key: "paymentGateway", price: [500, 1500], recommended: true },
      { key: "localPayments", price: [300, 800] },
      { key: "orderTracking", price: [200, 500] },
      { key: "invoiceGeneration", price: [200, 500] },
    ]},
    { categoryKey: "management", features: [
      { key: "inventory", price: [300, 900] },
      { key: "shipping", price: [250, 700] },
      { key: "promoSystem", price: [200, 600] },
      { key: "reviews", price: [150, 400] },
      { key: "multiCurrency", price: [200, 500] },
    ]},
    { categoryKey: "growth", features: [
      { key: "emailIntegration", price: [200, 500] },
      { key: "abandonedCart", price: [250, 600] },
      { key: "seo", price: [200, 500], recommended: true },
      { key: "analytics", price: [200, 500], recommended: true },
    ]},
  ],
  "2": [
    { categoryKey: "contentManagement", features: [
      { key: "cms", price: [200, 600], recommended: true },
      { key: "blog", price: [150, 400] },
      { key: "mediaGallery", price: [150, 400] },
      { key: "documentLibrary", price: [150, 350] },
    ]},
    { categoryKey: "companyPages", features: [
      { key: "teamDirectory", price: [150, 400] },
      { key: "portfolio", price: [200, 600] },
      { key: "companyTimeline", price: [100, 250] },
      { key: "careers", price: [200, 500] },
      { key: "clientLogos", price: [80, 200] },
    ]},
    { categoryKey: "communication", features: [
      { key: "contactForms", price: [100, 300], recommended: true },
      { key: "mapIntegration", price: [80, 200] },
      { key: "chatWidget", price: [100, 250] },
      { key: "newsletter", price: [100, 250] },
    ]},
    { categoryKey: "technical", features: [
      { key: "multilingual", price: [300, 800] },
      { key: "seo", price: [200, 500], recommended: true },
      { key: "accessibility", price: [200, 500] },
      { key: "cookieConsent", price: [100, 250] },
    ]},
  ],
  "3": [
    { categoryKey: "authUsers", features: [
      { key: "auth", price: [300, 800], recommended: true },
      { key: "socialAuth", price: [200, 500] },
      { key: "twoFactorAuth", price: [200, 500] },
      { key: "rbac", price: [300, 800] },
      { key: "userProfiles", price: [200, 500] },
    ]},
    { categoryKey: "coreFeatures", features: [
      { key: "adminDashboard", price: [500, 1500], recommended: true },
      { key: "dataVisualization", price: [300, 800] },
      { key: "searchAndFilters", price: [200, 600] },
      { key: "notifications", price: [300, 900] },
      { key: "realTimeUpdates", price: [400, 1000] },
    ]},
    { categoryKey: "dataIntegration", features: [
      { key: "apiIntegration", price: [400, 1200], recommended: true },
      { key: "dataExport", price: [200, 600] },
      { key: "fileStorage", price: [200, 600] },
      { key: "crmIntegration", price: [300, 800] },
      { key: "paymentIntegration", price: [400, 1200] },
    ]},
    { categoryKey: "infrastructure", features: [
      { key: "emailSystem", price: [200, 500] },
      { key: "auditLog", price: [200, 500] },
      { key: "backupRecovery", price: [200, 500] },
      { key: "cicdPipeline", price: [300, 800] },
    ]},
  ],
  "4": [
    { categoryKey: "platformBase", features: [
      { key: "tablet", price: [200, 600] },
      { key: "appStoreAssets", price: [150, 400] },
    ]},
    { categoryKey: "coreFeatures", features: [
      { key: "pushNotifications", price: [200, 600], recommended: true },
      { key: "socialAuth", price: [200, 600] },
      { key: "userProfiles", price: [200, 500] },
      { key: "onboarding", price: [150, 400] },
      { key: "deepLinking", price: [150, 400] },
    ]},
    { categoryKey: "advanced", features: [
      { key: "geolocation", price: [200, 600] },
      { key: "camera", price: [200, 600] },
      { key: "offlineMode", price: [300, 800] },
      { key: "inAppPayments", price: [400, 1200] },
      { key: "biometricAuth", price: [150, 400] },
      { key: "qrBarcode", price: [150, 400] },
    ]},
    { categoryKey: "backendAnalytics", features: [
      { key: "adminPanel", price: [400, 1000] },
      { key: "analytics", price: [200, 500], recommended: true },
      { key: "chatMessaging", price: [400, 1000] },
      { key: "contentFeed", price: [300, 800] },
      { key: "videoStreaming", price: [300, 800] },
    ]},
  ],
  "5": [
    { categoryKey: "coreIdentity", features: [
      { key: "logoSystem", price: [300, 800], recommended: true },
      { key: "colorPalette", price: [100, 300], recommended: true },
      { key: "typography", price: [150, 400] },
      { key: "iconography", price: [200, 500] },
      { key: "illustrations", price: [300, 800] },
    ]},
    { categoryKey: "documentation", features: [
      { key: "brandbook", price: [400, 1200], recommended: true },
      { key: "brandGuidelines", price: [150, 400] },
      { key: "brandStrategy", price: [400, 1000] },
      { key: "namingTagline", price: [300, 800] },
    ]},
    { categoryKey: "digitalAssets", features: [
      { key: "socialKit", price: [150, 400] },
      { key: "emailSignature", price: [80, 200] },
      { key: "presentations", price: [200, 600] },
      { key: "websiteMockups", price: [300, 800] },
    ]},
    { categoryKey: "print", features: [
      { key: "stationery", price: [150, 400] },
      { key: "packaging", price: [300, 800] },
      { key: "signage", price: [200, 600] },
    ]},
  ],
  "6": [
    { categoryKey: "socialMedia", features: [
      { key: "smm", price: [300, 800], recommended: true },
      { key: "contentCreation", price: [200, 500] },
      { key: "communityManagement", price: [200, 500] },
      { key: "influencerOutreach", price: [300, 800] },
    ]},
    { categoryKey: "paidAds", features: [
      { key: "targetedAds", price: [400, 1000], recommended: true },
      { key: "googleAds", price: [400, 1200] },
      { key: "youtubeAds", price: [300, 800] },
      { key: "tiktokAds", price: [300, 800] },
      { key: "retargeting", price: [200, 500] },
    ]},
    { categoryKey: "organicGrowth", features: [
      { key: "seoPromotion", price: [300, 800], recommended: true },
      { key: "contentMarketing", price: [200, 600] },
      { key: "emailMarketing", price: [200, 600] },
      { key: "localSeo", price: [150, 400] },
    ]},
    { categoryKey: "strategyAnalytics", features: [
      { key: "brandStrategy", price: [300, 800] },
      { key: "analyticsReporting", price: [200, 500] },
      { key: "competitorMonitoring", price: [200, 500] },
      { key: "conversionOptimization", price: [300, 700] },
      { key: "marketResearch", price: [300, 700] },
    ]},
  ],
};

type ScopeOpt = { value: string; multiplier: number };
type ScopeMod = { key: string; options: ScopeOpt[] };

const SCOPE_MODIFIERS: Record<string, ScopeMod[]> = {
  "0": [
    { key: "sections", options: [
      { value: "standard", multiplier: 1.0 },
      { value: "extended", multiplier: 1.2 },
      { value: "complex", multiplier: 1.4 },
    ]},
    { key: "timeline", options: [
      { value: "standard", multiplier: 1.0 },
      { value: "rush", multiplier: 1.3 },
    ]},
  ],
  "1": [
    { key: "products", options: [
      { value: "small", multiplier: 1.0 },
      { value: "medium", multiplier: 1.2 },
      { value: "large", multiplier: 1.4 },
      { value: "enterprise", multiplier: 1.6 },
    ]},
    { key: "timeline", options: [
      { value: "standard", multiplier: 1.0 },
      { value: "rush", multiplier: 1.3 },
    ]},
  ],
  "2": [
    { key: "pages", options: [
      { value: "small", multiplier: 1.0 },
      { value: "medium", multiplier: 1.2 },
      { value: "large", multiplier: 1.4 },
      { value: "enterprise", multiplier: 1.6 },
    ]},
    { key: "timeline", options: [
      { value: "standard", multiplier: 1.0 },
      { value: "rush", multiplier: 1.3 },
    ]},
  ],
  "3": [
    { key: "users", options: [
      { value: "startup", multiplier: 1.0 },
      { value: "growing", multiplier: 1.2 },
      { value: "scale", multiplier: 1.5 },
      { value: "enterprise", multiplier: 1.8 },
    ]},
    { key: "timeline", options: [
      { value: "standard", multiplier: 1.0 },
      { value: "rush", multiplier: 1.3 },
    ]},
  ],
  "4": [
    { key: "screens", options: [
      { value: "simple", multiplier: 1.0 },
      { value: "moderate", multiplier: 1.2 },
      { value: "complex", multiplier: 1.4 },
      { value: "enterprise", multiplier: 1.7 },
    ]},
  ],
  "5": [
    { key: "scope", options: [
      { value: "startup", multiplier: 1.0 },
      { value: "rebrand", multiplier: 1.2 },
      { value: "multibrand", multiplier: 1.5 },
    ]},
    { key: "timeline", options: [
      { value: "standard", multiplier: 1.0 },
      { value: "rush", multiplier: 1.3 },
    ]},
  ],
  "6": [
    { key: "contract", options: [
      { value: "short", multiplier: 1.0 },
      { value: "medium", multiplier: 0.9 },
      { value: "long", multiplier: 0.8 },
    ]},
  ],
};

/* ─── Seed ─── */

async function seed() {
  console.log("Seeding database...");

  // 1. Project types
  for (let i = 0; i < PROJECT_TYPES.length; i++) {
    const pt = PROJECT_TYPES[i];
    await db.insert(projectTypes).values({ ...pt, sortOrder: i });
  }
  console.log(`  ✓ ${PROJECT_TYPES.length} project types`);

  // 2. Design levels
  for (let i = 0; i < DESIGN_LEVELS.length; i++) {
    const dl = DESIGN_LEVELS[i];
    await db.insert(designLevels).values({ ...dl, sortOrder: i });
  }
  console.log(`  ✓ ${DESIGN_LEVELS.length} design levels`);

  // 3. Feature categories + features
  let totalFeatures = 0;
  let totalCategories = 0;
  for (const [ptKey, categories] of Object.entries(CATEGORIZED_FEATURES)) {
    for (let ci = 0; ci < categories.length; ci++) {
      const cat = categories[ci];
      const [inserted] = await db
        .insert(featureCategories)
        .values({ projectTypeKey: ptKey, categoryKey: cat.categoryKey, sortOrder: ci })
        .returning({ id: featureCategories.id });
      totalCategories++;

      for (let fi = 0; fi < cat.features.length; fi++) {
        const f = cat.features[fi];
        await db.insert(features).values({
          categoryId: inserted.id,
          key: f.key,
          priceMin: f.price[0],
          priceMax: f.price[1],
          recommended: f.recommended || false,
          sortOrder: fi,
        });
        totalFeatures++;
      }
    }
  }
  console.log(`  ✓ ${totalCategories} categories, ${totalFeatures} features`);

  // 4. Scope modifiers + options
  let totalModifiers = 0;
  let totalOptions = 0;
  for (const [ptKey, mods] of Object.entries(SCOPE_MODIFIERS)) {
    for (let mi = 0; mi < mods.length; mi++) {
      const mod = mods[mi];
      const [inserted] = await db
        .insert(scopeModifiers)
        .values({ projectTypeKey: ptKey, key: mod.key, sortOrder: mi })
        .returning({ id: scopeModifiers.id });
      totalModifiers++;

      for (let oi = 0; oi < mod.options.length; oi++) {
        const opt = mod.options[oi];
        await db.insert(scopeModifierOptions).values({
          scopeModifierId: inserted.id,
          value: opt.value,
          multiplier: opt.multiplier,
          sortOrder: oi,
        });
        totalOptions++;
      }
    }
  }
  console.log(`  ✓ ${totalModifiers} scope modifiers, ${totalOptions} options`);

  console.log("Done!");
}

seed().catch((err) => {
  console.error("Seed failed:", err);
  process.exit(1);
});
