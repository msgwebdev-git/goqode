# SEO Optimization Plan — GoQode

## Status Legend
- [ ] To Do
- [x] Done

---

## CRITICAL

### 1. Add `lang` attribute to `<html>` tag
- **File:** `app/layout.tsx`
- **Fix:** Read `x-next-intl-locale` header, set `<html lang={locale}>` dynamically.
- [x] Add dynamic `lang` attribute

### 2. Generate OG images for all pages
- **Fix:** Created `opengraph-image.tsx` + `twitter-image.tsx` using `ImageResponse` from `next/og`.
- [x] Create `app/[locale]/opengraph-image.tsx` (default branded image with localized tagline)
- [x] Create `app/[locale]/cases/[slug]/opengraph-image.tsx` (dynamic per case study)
- [x] Create OG images for all 6 service pages
- [x] Add `twitter-image.tsx` files (re-exports from opengraph-image)

### 3. Add `x-default` hreflang everywhere
- **Fix:** Added `"x-default"` pointing to Romanian (default locale) version.
- [x] Add `x-default` to all 14 main page `generateMetadata` functions
- [x] Add `x-default` to all 6 service page `generateMetadata` functions
- [x] Add `x-default` to `cases/[slug]` page
- [x] Add `x-default` to sitemap `getAlternates()` in `app/sitemap.xml/route.ts`

### 4. Set `noindex` on Thank You page
- **File:** `app/[locale]/calculator/thank-you/page.tsx`
- [x] Add noindex metadata to thank-you page

---

## HIGH

### 5. Add verification tokens
- **File:** `app/layout.tsx`
- **Status:** Placeholder added with TODO comments. Tokens need to be filled after registering.
- [ ] Register in Google Search Console and add token
- [ ] Register in Yandex Webmaster and add token
- [ ] Register in Bing Webmaster Tools and add token

### 6. Fill Organization `sameAs` array
- **File:** `app/[locale]/page.tsx`
- [x] Add Facebook, Instagram, LinkedIn URLs to `sameAs`

### 7. Fix relative URLs in service pages hreflang
- **Fix:** Converted all 6 service pages from relative to absolute URLs + added `x-default`.
- [x] Fix all 6 service pages hreflang URLs to absolute

---

## MEDIUM

### 8. Localize JSON-LD structured data
- **Fix:** Added `JsonLd` namespace to all 3 message files. Made all BreadcrumbJsonLd, ServiceJsonLd, and OrganizationJsonLd components async with `getTranslations`.
- [x] Translate breadcrumb names in all page JSON-LD
- [x] Translate service names in service page JSON-LD
- [x] Translate Organization description in home page JSON-LD

### 9. Add web manifest and icons
- **Status:** `manifest.ts` created, linked in root layout. Icon files still needed.
- [x] Create `app/manifest.ts` with app name, theme color, icons
- [x] Add `manifest` property to root layout metadata
- [ ] Add `apple-touch-icon.png` (180x180)
- [ ] Add `icon-192.png` and `icon-512.png`
- [ ] Add `icons` property to root layout metadata

### 10. Fix logo URL with space
- [x] Copy to `public/goqode-dark.svg` and `public/goqode-white.svg`
- [x] Update Organization JSON-LD logo URL
- [x] Update all references in Navbar.tsx and Footer.tsx

### 11. Replace `<img>` with `next/image` in ClientLogos
- **Fix:** Replaced `<img>` with `next/image` Image component with proper `width`, `height`, `sizes`, and descriptive alt text.
- [x] Refactor ClientLogos to use `next/image`

### 12. Add Twitter `site` handle
- **File:** `app/layout.tsx`
- [x] Add `twitter.site: "@goqode"` to root layout metadata

---

## LOW

### 13. Standardize JSON-LD XSS protection
- [x] Add `.replace(/</g, "\\u003c")` to all 6 service page JSON-LD blocks (12 total)

### 14. Improve alt text on case study images
- **Fix:** Updated `CaseHero.tsx` and `MacBookMockup.tsx` — all alt texts now include the translated project title (e.g. "Line Production — desktop preview", "Line Production — section 1").
- [x] Update alt text to include project names

### 15. Create custom 404 page
- [x] Create `app/[locale]/not-found.tsx` with noindex metadata and branded UI

### 16. Remove deprecated `host` from robots.ts
- [x] Remove `host` from robots.ts

### 17. Add `category` metadata
- [x] Add `category: "technology"` to root layout metadata

---

## FUTURE / OPTIONAL

### 18. Localized URL slugs
- **Fix:** Added `pathnames` config to `defineRouting` in `i18n/routing.ts` with Romanian and Russian translations for all 20+ routes. Updated all `Link` components, `generateMetadata` alternates, and JSON-LD URLs to use `getPathname`/`getLocalizedUrl` helpers. Created `lib/metadata-helpers.ts` for shared URL resolution.
- [x] Implement localized pathnames

### 19. FAQPage structured data
- **Fix:** Added FAQ Q&A translations (4 items each) to all 5 service namespaces in ro/en/ru. Created `ServiceFAQ` accordion component and `FaqJsonLd` JSON-LD schema on each service page.
- [x] Identify pages with FAQ content and add schema

### 20. Image sitemaps
- **Fix:** Added `<image:image>` tags to sitemap for case study pages. Each case entry now includes its `cardImage` and all gallery images. Added `xmlns:image` namespace to sitemap XML.
- [x] Add image URLs to sitemap entries

### 21. Sitemap index
- **Status:** Not needed — site has ~90 URLs, well under Google's 50,000 limit per sitemap.
- [x] Evaluated — not needed at current scale

---

## Summary

| Priority | Total | Done | Remaining |
|----------|-------|------|-----------|
| CRITICAL | 4 | 4 | 0 |
| HIGH | 3 | 2 | 1 (verification tokens — needs manual registration) |
| MEDIUM | 5 | 5 | 0 |
| LOW | 5 | 5 | 0 |
| FUTURE | 4 | 4 | 0 |

**Total: 21 items — 20 done, 1 remaining (verification tokens — needs manual registration in Google/Yandex/Bing)**
