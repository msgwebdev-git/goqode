# Lighthouse Analysis — Mobile (goqode-one.vercel.app/ru)

**Date:** 2026-02-27
**Device:** Moto G Power (simulated slow 4G)
**Performance Score: 46/100**

---

## Overall Scores

| Category | Score |
|----------|-------|
| Performance | **46** |
| Accessibility | 96 |
| Best Practices | 100 |
| SEO | 92 |

---

## Core Web Vitals

| Metric | Value | Verdict |
|--------|-------|---------|
| **FCP** | 1.4s | GOOD |
| **LCP** | **7.3s** | CRITICAL (порог 2.5s) |
| **TBT** | **2,410ms** | CRITICAL (порог 200ms) |
| **CLS** | 0 | PERFECT |
| **Speed Index** | 3.7s | OK |
| **TTI** | 8.4s | POOR |
| **TTFB** | 60ms | GOOD |

---

## Главные проблемы

### 1. LCP 7.3s — Hero текст скрыт анимацией

**LCP элемент:** `<p>` с hero описанием (subtitle)
**Селектор:** `section.w-full > div.flex > div.flex > p.clamp-[text,0.875rem,1.125rem]`
**Стиль:** `style="opacity: 1; transform: none;"` — Framer Motion контролирует видимость

| LCP subpart | Время |
|-------------|-------|
| TTFB | 59ms |
| Element render delay | **1,862ms** |

**Причина:** Framer Motion начинает с `opacity: 0`, браузер не может отрисовать текст до выполнения JS. На мобильном с throttled CPU это катастрофа.

**Затронутые компоненты:**
- `HeroSection.tsx` — `motion.div` с `initial="hidden"` (opacity:0) оборачивает весь hero
- `SplitText.tsx` — GSAP SplitText + ScrollTrigger, тоже начинает с `opacity: 0, y: 40`
- `TrueFocus.tsx` — blur-эффект через `filter: blur(Xpx)` на неактивных словах

### 2. TBT 2,410ms — тяжёлый JavaScript

**20 long tasks**, суммарно 3,599ms long task time.

**Top JS чанки:**

| Чанк | Время | Scripting |
|------|-------|-----------|
| `252194e1e1a943af.js` | 842ms | 214ms |
| `f8c0db758fb27563.js` | 664ms | 478ms |
| `652920411641b5d4.js` | 239ms | 205ms |

**Main thread breakdown (5,938ms total):**

| Категория | Время |
|-----------|-------|
| Other (animation callbacks) | 4,347ms |
| Script evaluation | 1,015ms |
| Style & Layout | 338ms |
| Paint/Composite/Render | 116ms |

**Forced reflows:**
- `f8c0db758fb27563.js` — 31.7ms
- `252194e1e1a943af.js` — 25.2ms + 2.8ms + 3.1ms

### 3. Изображения — 1.5MB raw JPG

**75% всего трафика** — необработанные JPG из `/public`.

| Изображение | Размер | Потенциальная экономия |
|-------------|--------|----------------------|
| voievodmob.jpg | 397 KiB | 393 KiB |
| standupmob.jpg | 317 KiB | 313 KiB |
| povesteamob.jpg | 286 KiB | 282 KiB |
| linemob.jpg | 195 KiB | 191 KiB |
| egotaxmob.jpg | 287 KiB | — |

**Итого экономия при WebP/AVIF: ~1,179 KiB**

---

## Render-blocking ресурсы

| Ресурс | Потеря |
|--------|--------|
| CSS chunk `e60ac519...` | блокирует render |
| CSS chunk `af42a1d3...` | 300ms |

**Потенциальная экономия: 280ms**

---

## Unused JavaScript

| Чанк | Размер | Не используется |
|------|--------|----------------|
| `f8c0db75...` | 69.9 KiB | 23.6 KiB |
| `252194e1...` | 49.2 KiB | 20.4 KiB |
| `65292041...` | 40.2 KiB | 20.2 KiB |

**Потенциальная экономия: 64 KiB**

---

## Network Summary

**37 запросов, 1,980 KiB total**

| Тип | Запросов | Размер |
|-----|----------|--------|
| Images | 6 | 1,489 KiB (75%) |
| Scripts | 18 | 327 KiB (17%) |
| Document | 1 | 69 KiB |
| Fonts | 3 | 54 KiB |
| CSS | 2 | 26 KiB |

---

## Другие проблемы

- **SEO:** Отсутствует `rel=canonical` (score 0)
- **A11y:** Контраст `text-muted-foreground` (#737373) на #f8f8f5 = 4.45:1 (нужно 4.5:1)
- **BF-Cache:** `Cache-Control: no-store` блокирует bfcache
- **Legacy JS:** 14 KiB можно сэкономить

---

## План оптимизации

### CRITICAL — LCP fix

1. **Hero description** (`motion.p`) — убрать Framer Motion анимацию с LCP элемента или сделать `initial={{ opacity: 1 }}` чтобы текст был виден сразу
2. **SplitText** — GSAP начинает с opacity:0. Рассмотреть CSS-only анимацию или показывать текст сразу, анимировать потом
3. **TrueFocus** — blur-эффект на неактивных словах может задерживать paint

### HIGH — TBT fix

4. **Lazy load анимаций** — GSAP + Framer Motion грузятся сразу. Использовать `dynamic import` для компонентов ниже fold
5. **Reduce Framer Motion** — заменить простые анимации (fade-in) на CSS `@keyframes`
6. **Code splitting** — проверить что GSAP не попадает в critical bundle

### MEDIUM — Images

7. **Next/Image для кейсов** — заменить raw JPG на `<Image>` с автоматическим WebP/AVIF
8. **Lazy loading** — убедиться что изображения ниже fold имеют `loading="lazy"`

### LOW

9. **Critical CSS inline** — рассмотреть inline critical CSS для first paint
10. **BF-Cache** — убрать `no-store` если возможно
11. **Color contrast** — поднять контраст muted-foreground до 4.5:1
