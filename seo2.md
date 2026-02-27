# SEO Optimization Plan v2 — GoQode

## Status Legend
- [ ] To Do
- [x] Done

---

## CRITICAL

### 1. Fix `og:locale` per language
- **Problem:** All pages serve `og:locale = ro_RO` regardless of locale. English pages should have `en_US`, Russian — `ru_RU`.
- **Fix:** Add locale mapping in `lib/metadata-helpers.ts` and include `openGraph.locale` in every `generateMetadata`.
- [x] Create `getOgLocale()` helper (ro → ro_RO, en → en_US, ru → ru_RU)
- [x] Add `openGraph.locale` to all 14 main pages
- [x] Add `openGraph.locale` to all 6 service pages
- [x] Add `openGraph.locale` to `cases/[slug]`

### 2. Verification tokens
- **Status:** Placeholder in `app/layout.tsx`. Needs manual registration.
- [ ] Register in Google Search Console and add token
- [ ] Register in Yandex Webmaster and add token
- [ ] Register in Bing Webmaster Tools and add token

---

## HIGH

### 3. Add `og:site_name` to all pages
- **Problem:** Only homepage has `siteName: "GoQode"` in openGraph. All other pages missing it.
- **Fix:** Add `siteName: "GoQode"` to `openGraph` in every `generateMetadata`.
- [x] Add to all 14 main pages
- [x] Add to all 6 service pages
- [x] Add to `cases/[slug]`

### 4. Add FAQ to Digital Marketing page
- **Problem:** 5 of 6 service pages have FAQPage schema. Digital Marketing is missing — no `ServiceMarketing` namespace with FAQ.
- **Fix:** Add `ServiceMarketing` FAQ translations (ro/en/ru) and `FaqJsonLd` + `ServiceFAQ` to the page.
- [x] Add full `ServiceMarketing` namespace to en.json (was missing entirely)
- [x] Add `faq` to `ServiceMarketing` namespace in en.json
- [x] Add `faq` to `ServiceMarketing` namespace in ro.json
- [x] Add `faq` to `ServiceMarketing` namespace in ru.json
- [x] Add `FaqJsonLd` to `services/digital-marketing/page.tsx`
- [x] Add `ServiceFAQ` to `services/digital-marketing/content.tsx`

### 5. Localize `not-found.tsx`
- **Problem:** 404 page shows "Page not found" / "Go Home" in English for all locales.
- **Fix:** Use `useTranslations` with a `NotFound` namespace.
- [x] Add `NotFound` namespace to en.json, ro.json, ru.json
- [x] Refactor `not-found.tsx` to use translations

---

## MEDIUM

### 6. Add `keywords` to `cases/[slug]`
- **Problem:** All pages have keywords except case detail pages.
- **Fix:** Add `keywords` to `generateMetadata` using case tags + general terms.
- [x] Add keywords to `cases/[slug]/page.tsx`

### 7. Add `noindex` to admin layout
- **Problem:** Admin pages rely only on `robots.ts` disallow. Belt-and-suspenders approach.
- **Fix:** Export `metadata` with `robots: { index: false, follow: false }` from `app/admin/layout.tsx`.
- [x] Add noindex metadata to admin layout

### 8. Add `LocalBusiness` schema to homepage
- **Problem:** No local business structured data. For Moldova/Romania agency this strengthens local SEO.
- **Fix:** Add `LocalBusiness` (or `ProfessionalService`) JSON-LD with address, phone, geo, openingHours.
- [x] Add ProfessionalService JSON-LD to `app/[locale]/page.tsx`

---

## LOW

### 9. Add `ContactPage` JSON-LD
- **Problem:** Contact page has no `ContactPage` schema with `contactPoint`.
- **Fix:** Add JSON-LD with `@type: ContactPage` and `contactPoint` data.
- [x] Add ContactPage JSON-LD to `app/[locale]/contact/page.tsx`

### 10. Create `/services` index page
- **Problem:** `/servicii`, `/services`, `/uslugi` return 404. No index page for services.
- **Fix:** Create a services landing page or redirect to homepage services section.
- [ ] Consider creating services index page or redirect

---

## Summary

| Priority | Total | Done | Remaining |
|----------|-------|------|-----------|
| CRITICAL | 2 | 1 | 1 (tokens — manual) |
| HIGH | 3 | 3 | 0 |
| MEDIUM | 3 | 3 | 0 |
| LOW | 2 | 1 | 1 (services index — low priority) |

**Total: 10 items — 8 done, 2 remaining (1 manual, 1 low priority)**
