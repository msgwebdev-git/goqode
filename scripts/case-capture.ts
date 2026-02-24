#!/usr/bin/env npx tsx

/**
 * case-capture.ts — Professional case study content generator
 *
 * Usage:
 *   npx tsx scripts/case-capture.ts <url> <slug> [options]
 *
 * Options:
 *   --pages /path1 /path2   Only capture specific pages (default: auto-discover)
 *   --depth 1               Crawl depth from homepage (default: 1)
 *   --no-video              Skip video recording
 *   --no-mockups            Skip device mockup generation
 *
 * Output:
 *   public/cases/<slug>/
 *     meta.json
 *     pages/<page-name>/sections/*.webp
 *     mockups/*.webp
 *     video/*.webm
 */

import { chromium, type Browser, type Page, type BrowserContext } from "playwright";
import sharp from "sharp";
import * as fs from "fs";
import * as path from "path";

/* ─── Config ──────────────────────────────────────────── */

const VIEWPORTS = {
  desktop: { width: 1440, height: 900, scale: 2 },
  tablet: { width: 768, height: 1024, scale: 2 },
  mobile: { width: 375, height: 812, scale: 2 },
} as const;

const WEBP_QUALITY = 90;
const SCROLL_STEP = 4; // pixels per frame for video
const SCROLL_DELAY = 16; // ms between scroll steps (~60fps)
const SECTION_PADDING = 0; // extra pixels around section screenshots

/* ─── Types ───────────────────────────────────────────── */

interface SectionInfo {
  tag: string;
  index: number;
  name: string;
  top: number;
  left: number;
  width: number;
  height: number;
}

interface PageMeta {
  url: string;
  path: string;
  title: string;
  description: string;
  ogImage: string | null;
  sections: SectionInfo[];
}

interface SiteMeta {
  url: string;
  slug: string;
  title: string;
  description: string;
  favicon: string | null;
  ogImage: string | null;
  colors: string[];
  pages: PageMeta[];
  capturedAt: string;
}

/* ─── CLI Args ────────────────────────────────────────── */

function parseArgs() {
  const args = process.argv.slice(2);
  if (args.length < 2) {
    console.error("Usage: npx tsx scripts/case-capture.ts <url> <slug> [options]");
    console.error("Example: npx tsx scripts/case-capture.ts https://lineproduction.md lineproduction");
    process.exit(1);
  }

  const url = args[0].replace(/\/$/, "");
  const slug = args[1];
  const options = {
    url,
    slug,
    pages: [] as string[],
    depth: 1,
    video: true,
    mockups: true,
  };

  for (let i = 2; i < args.length; i++) {
    switch (args[i]) {
      case "--pages":
        while (i + 1 < args.length && !args[i + 1].startsWith("--")) {
          options.pages.push(args[++i]);
        }
        break;
      case "--depth":
        options.depth = parseInt(args[++i]) || 1;
        break;
      case "--no-video":
        options.video = false;
        break;
      case "--no-mockups":
        options.mockups = false;
        break;
    }
  }

  return options;
}

/* ─── Helpers ─────────────────────────────────────────── */

function sanitizeName(str: string): string {
  return str
    .replace(/^\//, "")
    .replace(/\//g, "-")
    .replace(/[^a-z0-9-]/gi, "")
    || "home";
}

function ensureDir(dir: string) {
  fs.mkdirSync(dir, { recursive: true });
}

async function sleep(ms: number) {
  return new Promise((r) => setTimeout(r, ms));
}

/* ─── Page Analysis ───────────────────────────────────── */

async function analyzePage(page: Page): Promise<{
  title: string;
  description: string;
  ogImage: string | null;
  sections: SectionInfo[];
  colors: string[];
  links: string[];
}> {
  return page.evaluate(() => {
    // Title & meta
    const title = document.title || "";
    const descEl = document.querySelector('meta[name="description"]') as HTMLMetaElement | null;
    const description = descEl?.content || "";
    const ogEl = document.querySelector('meta[property="og:image"]') as HTMLMetaElement | null;
    const ogImage = ogEl?.content || null;

    // Find sections
    const sectionEls = document.querySelectorAll(
      "section, header, footer, main > div, [role='banner'], [role='main'], [role='contentinfo']"
    );
    const seen = new Set<Element>();
    const sections: SectionInfo[] = [];
    let index = 0;

    sectionEls.forEach((el) => {
      if (seen.has(el)) return;
      const rect = el.getBoundingClientRect();
      // Skip tiny or invisible elements
      if (rect.height < 50 || rect.width < 100) return;
      // Skip nested sections
      let parent: Element | null = el.parentElement;
      while (parent) {
        if (seen.has(parent)) return;
        parent = parent.parentElement;
      }
      seen.add(el);

      const tag = el.tagName.toLowerCase();
      const id = el.id || "";
      const cls = el.className?.toString().split(" ").find((c: string) => c.length > 2 && c.length < 30) || "";
      const name = id || cls || `${tag}-${index}`;

      sections.push({
        tag,
        index,
        name: name.replace(/[^a-z0-9-_]/gi, "").toLowerCase(),
        top: rect.top + window.scrollY,
        left: rect.left,
        width: rect.width,
        height: rect.height,
      });
      index++;
    });

    // Extract colors from computed styles
    const colorSet = new Set<string>();
    const els = document.querySelectorAll("*");
    const sampleSize = Math.min(els.length, 200);
    for (let i = 0; i < sampleSize; i++) {
      const el = els[Math.floor((i / sampleSize) * els.length)];
      const style = getComputedStyle(el);
      [style.backgroundColor, style.color].forEach((c) => {
        if (c && c !== "rgba(0, 0, 0, 0)" && c !== "transparent" && c !== "rgb(0, 0, 0)" && c !== "rgb(255, 255, 255)") {
          colorSet.add(c);
        }
      });
    }

    // Discover internal links
    const links: string[] = [];
    const origin = window.location.origin;
    document.querySelectorAll("a[href]").forEach((a) => {
      const href = (a as HTMLAnchorElement).href;
      if (href.startsWith(origin) && !href.includes("#") && !href.match(/\.(pdf|jpg|png|svg|zip)$/i)) {
        const pathname = new URL(href).pathname;
        if (!links.includes(pathname)) links.push(pathname);
      }
    });

    return { title, description, ogImage, sections, colors: [...colorSet].slice(0, 20), links };
  });
}

/* ─── Screenshot Sections ─────────────────────────────── */

async function screenshotSections(
  page: Page,
  sections: SectionInfo[],
  viewport: keyof typeof VIEWPORTS,
  outDir: string,
  pageName: string,
) {
  const vp = VIEWPORTS[viewport];
  await page.setViewportSize({ width: vp.width, height: vp.height });

  // Scroll through entire page to trigger lazy loading
  await page.evaluate(async () => {
    const totalHeight = document.body.scrollHeight;
    const step = window.innerHeight;
    for (let y = 0; y < totalHeight; y += step) {
      window.scrollTo(0, y);
      await new Promise((r) => setTimeout(r, 300));
    }
    window.scrollTo(0, 0);
    await new Promise((r) => setTimeout(r, 500));
  });

  // Wait for content to settle
  await sleep(1500);

  // Re-measure sections after viewport change
  const updatedSections: SectionInfo[] = await page.evaluate((sectionCount: number) => {
    const els = document.querySelectorAll(
      "section, header, footer, main > div, [role='banner'], [role='main'], [role='contentinfo']"
    );
    const seen = new Set<Element>();
    const results: SectionInfo[] = [];
    let index = 0;

    els.forEach((el) => {
      if (seen.has(el) || index >= sectionCount) return;
      const rect = el.getBoundingClientRect();
      if (rect.height < 50 || rect.width < 100) return;
      let parent: Element | null = el.parentElement;
      while (parent) {
        if (seen.has(parent)) return;
        parent = parent.parentElement;
      }
      seen.add(el);

      const tag = el.tagName.toLowerCase();
      const id = el.id || "";
      const cls = el.className?.toString().split(" ").find((c: string) => c.length > 2 && c.length < 30) || "";
      const name = id || cls || `${tag}-${index}`;

      results.push({
        tag,
        index,
        name: name.replace(/[^a-z0-9-_]/gi, "").toLowerCase(),
        top: rect.top + window.scrollY,
        left: 0,
        width: rect.width,
        height: rect.height,
      });
      index++;
    });
    return results;
  }, sections.length);

  const dir = path.join(outDir, "pages", pageName, "sections");
  ensureDir(dir);

  for (const section of updatedSections) {
    const filename = `${String(section.index).padStart(2, "0")}-${section.name}-${viewport}.png`;
    const filepath = path.join(dir, filename);

    try {
      await page.screenshot({
        path: filepath,
        fullPage: true,
        clip: {
          x: 0,
          y: Math.max(0, section.top - SECTION_PADDING),
          width: vp.width,
          height: Math.min(section.height + SECTION_PADDING * 2, 4000), // Cap at 4000px
        },
      });

      // Convert to WebP
      const webpPath = filepath.replace(".png", ".webp");
      await sharp(filepath)
        .webp({ quality: WEBP_QUALITY })
        .toFile(webpPath);
      fs.unlinkSync(filepath);

      console.log(`  📸 ${viewport}: ${section.name} (${section.height}px)`);
    } catch (e: any) {
      console.log(`  ⚠️ Skip ${section.name}: ${e.message}`);
    }
  }

  // Also take a viewport screenshot (above-the-fold)
  const heroPath = path.join(dir, `viewport-${viewport}.png`);
  await page.screenshot({ path: heroPath });
  const heroWebp = heroPath.replace(".png", ".webp");
  await sharp(heroPath).webp({ quality: WEBP_QUALITY }).toFile(heroWebp);
  fs.unlinkSync(heroPath);
  console.log(`  📸 ${viewport}: viewport (above-the-fold)`);

  return updatedSections;
}

/* ─── Video Recording ─────────────────────────────────── */

async function recordScroll(
  browser: Browser,
  url: string,
  viewport: keyof typeof VIEWPORTS,
  outDir: string,
  pageName: string,
) {
  const vp = VIEWPORTS[viewport];
  const videoDir = path.join(outDir, "pages", pageName, "video");
  ensureDir(videoDir);

  const context = await browser.newContext({
    viewport: { width: vp.width, height: vp.height },
    deviceScaleFactor: 1, // lower scale for video to keep file size reasonable
    recordVideo: {
      dir: videoDir,
      size: { width: vp.width, height: vp.height },
    },
  });

  const page = await context.newPage();
  await page.goto(url, { waitUntil: "networkidle", timeout: 30000 });
  await sleep(2000);

  // Smooth scroll
  const totalHeight = await page.evaluate(() => document.body.scrollHeight);
  const viewportHeight = vp.height;
  let scrolled = 0;

  while (scrolled < totalHeight - viewportHeight) {
    await page.mouse.wheel(0, SCROLL_STEP);
    scrolled += SCROLL_STEP;
    await sleep(SCROLL_DELAY);
  }

  // Pause at bottom
  await sleep(1000);

  // Get video path before closing
  const video = page.video();
  await context.close();

  if (video) {
    const videoPath = await video.path();
    const finalName = path.join(videoDir, `scroll-${viewport}.webm`);
    if (videoPath && fs.existsSync(videoPath)) {
      fs.renameSync(videoPath, finalName);
      console.log(`  🎬 ${viewport}: scroll video recorded`);
    }
  }
}

/* ─── Device Mockups ──────────────────────────────────── */

async function generateMockups(outDir: string, pageName: string) {
  const sectionsDir = path.join(outDir, "pages", pageName, "sections");
  const mockupsDir = path.join(outDir, "pages", pageName, "mockups");
  ensureDir(mockupsDir);

  // Find viewport screenshots
  const desktopFile = path.join(sectionsDir, "viewport-desktop.webp");
  const mobileFile = path.join(sectionsDir, "viewport-mobile.webp");

  // ─── MacBook Mockup ───
  if (fs.existsSync(desktopFile)) {
    const screenW = 1440;
    const screenH = 900;
    const bezelTop = 40;
    const bezelBottom = 28;
    const bezelSide = 0;
    const totalW = screenW + bezelSide * 2;
    const totalH = screenH + bezelTop + bezelBottom;
    const radius = 16;

    // Create frame SVG
    const macFrameSvg = Buffer.from(`
      <svg xmlns="http://www.w3.org/2000/svg" width="${totalW}" height="${totalH}">
        <defs>
          <clipPath id="screen-clip">
            <rect x="${bezelSide}" y="${bezelTop}" width="${screenW}" height="${screenH}"/>
          </clipPath>
        </defs>
        <!-- Outer shell -->
        <rect x="0" y="0" width="${totalW}" height="${totalH - bezelBottom}" rx="${radius}" fill="#2d2d2d"/>
        <!-- Bottom bar -->
        <rect x="0" y="${totalH - bezelBottom}" width="${totalW}" height="${bezelBottom}" rx="4" fill="#1f1f1f"/>
        <rect x="${totalW / 2 - 220}" y="${totalH - bezelBottom}" width="440" height="${bezelBottom}" rx="4" fill="#161616"/>
        <!-- Traffic lights -->
        <circle cx="20" cy="20" r="6" fill="#FF5F57"/>
        <circle cx="40" cy="20" r="6" fill="#FEBC2E"/>
        <circle cx="60" cy="20" r="6" fill="#28C840"/>
        <!-- Camera -->
        <circle cx="${totalW / 2}" cy="16" r="4" fill="#1a1a1a" stroke="#3a3a3a" stroke-width="1"/>
      </svg>
    `);

    // Resize screenshot to fit screen area
    const screenshot = await sharp(desktopFile)
      .resize(screenW, screenH, { fit: "cover", position: "top" })
      .toBuffer();

    await sharp(macFrameSvg)
      .composite([{ input: screenshot, top: bezelTop, left: bezelSide }])
      .webp({ quality: WEBP_QUALITY })
      .toFile(path.join(mockupsDir, "macbook.webp"));

    console.log("  🖥️  MacBook mockup created");
  }

  // ─── iPhone Mockup ───
  if (fs.existsSync(mobileFile)) {
    const phoneW = 430;
    const phoneH = 882;
    const bezel = 14;
    const screenW = phoneW - bezel * 2;
    const screenH = phoneH - bezel * 2;
    const cornerRadius = 52;
    const innerRadius = 40;

    // Frame SVG
    const iphoneFrameSvg = Buffer.from(`
      <svg xmlns="http://www.w3.org/2000/svg" width="${phoneW}" height="${phoneH}">
        <!-- Outer shell -->
        <rect x="0" y="0" width="${phoneW}" height="${phoneH}" rx="${cornerRadius}" fill="#1a1a1a"/>
        <!-- Screen cutout (will be filled by screenshot) -->
        <rect x="${bezel}" y="${bezel}" width="${screenW}" height="${screenH}" rx="${innerRadius}" fill="#000000"/>
        <!-- Dynamic Island -->
        <rect x="${phoneW / 2 - 62}" y="22" width="124" height="30" rx="15" fill="#1a1a1a"/>
      </svg>
    `);

    // Create rounded mask for screen
    const maskSvg = Buffer.from(`
      <svg xmlns="http://www.w3.org/2000/svg" width="${screenW}" height="${screenH}">
        <rect x="0" y="0" width="${screenW}" height="${screenH}" rx="${innerRadius}" fill="white"/>
      </svg>
    `);

    const screenshot = await sharp(mobileFile)
      .resize(screenW, screenH, { fit: "cover", position: "top" })
      .composite([{ input: maskSvg, blend: "dest-in" }])
      .toBuffer();

    await sharp(iphoneFrameSvg)
      .composite([{ input: screenshot, top: bezel, left: bezel }])
      .webp({ quality: WEBP_QUALITY })
      .toFile(path.join(mockupsDir, "iphone.webp"));

    console.log("  📱 iPhone mockup created");
  }

  // ─── Multi-device composite ───
  const macPath = path.join(mockupsDir, "macbook.webp");
  const iphonePath = path.join(mockupsDir, "iphone.webp");

  if (fs.existsSync(macPath) && fs.existsSync(iphonePath)) {
    const canvasW = 1800;
    const canvasH = 1100;

    // Scale MacBook to ~70% of canvas width
    const macScale = 0.78;
    const macW = Math.round(1440 * macScale);
    const macH = Math.round(968 * macScale);

    // Scale iPhone to ~15% of canvas width
    const phoneScale = 0.33;
    const phoneW = Math.round(430 * phoneScale);
    const phoneH = Math.round(882 * phoneScale);

    const macResized = await sharp(macPath)
      .resize(macW, macH, { fit: "inside" })
      .toBuffer();

    const phoneResized = await sharp(iphonePath)
      .resize(phoneW, phoneH, { fit: "inside" })
      .toBuffer();

    // Shadow for depth
    const shadowSvg = Buffer.from(`
      <svg xmlns="http://www.w3.org/2000/svg" width="${canvasW}" height="${canvasH}">
        <defs>
          <filter id="shadow" x="-10%" y="-10%" width="130%" height="130%">
            <feDropShadow dx="0" dy="20" stdDeviation="40" flood-color="#000000" flood-opacity="0.25"/>
          </filter>
        </defs>
        <rect x="${(canvasW - macW) / 2 - 20}" y="${(canvasH - macH) / 2 - 60}" width="${macW + 40}" height="${macH + 40}" rx="20" fill="transparent" filter="url(#shadow)"/>
      </svg>
    `);

    // Background
    const bgSvg = Buffer.from(`
      <svg xmlns="http://www.w3.org/2000/svg" width="${canvasW}" height="${canvasH}">
        <rect width="${canvasW}" height="${canvasH}" fill="#f4f4f5"/>
      </svg>
    `);

    await sharp(bgSvg)
      .composite([
        { input: shadowSvg, top: 0, left: 0 },
        {
          input: macResized,
          top: Math.round((canvasH - macH) / 2 - 40),
          left: Math.round((canvasW - macW) / 2 - 60),
        },
        {
          input: phoneResized,
          top: Math.round(canvasH - phoneH - 60),
          left: Math.round(canvasW - phoneW - 120),
        },
      ])
      .webp({ quality: WEBP_QUALITY })
      .toFile(path.join(mockupsDir, "multi-device.webp"));

    console.log("  🖼️  Multi-device composite created");
  }
}

/* ─── Crawl & Capture ─────────────────────────────────── */

async function capturePage(
  browser: Browser,
  url: string,
  pageName: string,
  outDir: string,
  options: ReturnType<typeof parseArgs>,
): Promise<PageMeta> {
  console.log(`\n📄 Page: ${pageName} (${url})`);

  const page = await browser.newPage();
  await page.setViewportSize({ width: VIEWPORTS.desktop.width, height: VIEWPORTS.desktop.height });
  await page.goto(url, { waitUntil: "networkidle", timeout: 30000 });
  await sleep(2000); // Wait for animations

  // Close cookie banners / popups
  try {
    const cookieBtn = page.locator('button:has-text("Accept"), button:has-text("OK"), button:has-text("Got it"), [class*="cookie"] button, [id*="cookie"] button');
    if (await cookieBtn.first().isVisible({ timeout: 2000 })) {
      await cookieBtn.first().click();
      await sleep(500);
    }
  } catch { /* no cookie banner */ }

  // Analyze
  console.log("  🔍 Analyzing page...");
  const analysis = await analyzePage(page);
  await page.close();

  // Screenshot sections at each viewport
  for (const viewport of ["desktop", "mobile"] as const) {
    console.log(`  📐 Capturing ${viewport} sections...`);
    const vp = VIEWPORTS[viewport];
    const sPage = await browser.newPage();
    await sPage.setViewportSize({ width: vp.width, height: vp.height });
    await sPage.goto(url, { waitUntil: "networkidle", timeout: 30000 });
    await sleep(2000);

    // Close popups again
    try {
      const cookieBtn = sPage.locator('button:has-text("Accept"), button:has-text("OK"), button:has-text("Got it"), [class*="cookie"] button');
      if (await cookieBtn.first().isVisible({ timeout: 1000 })) {
        await cookieBtn.first().click();
        await sleep(500);
      }
    } catch { /* ignore */ }

    await screenshotSections(sPage, analysis.sections, viewport, outDir, pageName);
    await sPage.close();
  }

  // Video
  if (options.video) {
    console.log("  🎬 Recording scroll videos...");
    for (const viewport of ["desktop", "mobile"] as const) {
      try {
        await recordScroll(browser, url, viewport, outDir, pageName);
      } catch (e: any) {
        console.log(`  ⚠️ Video ${viewport} failed: ${e.message}`);
      }
    }
  }

  // Mockups
  if (options.mockups) {
    console.log("  🖥️  Generating device mockups...");
    try {
      await generateMockups(outDir, pageName);
    } catch (e: any) {
      console.log(`  ⚠️ Mockup failed: ${e.message}`);
    }
  }

  return {
    url,
    path: new URL(url).pathname,
    title: analysis.title,
    description: analysis.description,
    ogImage: analysis.ogImage,
    sections: analysis.sections,
  };
}

/* ─── Main ────────────────────────────────────────────── */

async function main() {
  const options = parseArgs();
  const outDir = path.join(process.cwd(), "public", "cases", options.slug);
  ensureDir(outDir);

  console.log(`\n🚀 Case Capture: ${options.url}`);
  console.log(`   Output: ${outDir}\n`);

  const browser = await chromium.launch({ headless: true });

  // Step 1: Discover pages
  let pagePaths: string[] = [];

  if (options.pages.length > 0) {
    pagePaths = options.pages;
  } else {
    console.log("🔎 Discovering pages...");
    const discoveryPage = await browser.newPage();
    await discoveryPage.goto(options.url, { waitUntil: "networkidle", timeout: 30000 });
    const analysis = await analyzePage(discoveryPage);
    await discoveryPage.close();

    // Filter internal links, limit by depth
    const baseUrl = new URL(options.url);
    pagePaths = ["/", ...analysis.links.filter((link) => {
      const segments = link.split("/").filter(Boolean);
      return segments.length <= options.depth;
    })];

    // Deduplicate
    pagePaths = [...new Set(pagePaths)];
    console.log(`   Found ${pagePaths.length} pages: ${pagePaths.join(", ")}`);
  }

  // Step 2: Capture each page
  const pagesMeta: PageMeta[] = [];
  let allColors: string[] = [];

  for (const pagePath of pagePaths) {
    const fullUrl = pagePath === "/" ? options.url : `${options.url}${pagePath}`;
    const pageName = sanitizeName(pagePath);

    try {
      const meta = await capturePage(browser, fullUrl, pageName, outDir, options);
      pagesMeta.push(meta);
    } catch (e: any) {
      console.error(`  ❌ Failed to capture ${pagePath}: ${e.message}`);
    }
  }

  // Step 3: Get site-level metadata
  const homeMeta = pagesMeta.find((p) => p.path === "/") || pagesMeta[0];

  // Collect colors from home page analysis
  const colorPage = await browser.newPage();
  await colorPage.goto(options.url, { waitUntil: "networkidle", timeout: 30000 });
  const homeAnalysis = await analyzePage(colorPage);
  await colorPage.close();
  allColors = homeAnalysis.colors;

  const siteMeta: SiteMeta = {
    url: options.url,
    slug: options.slug,
    title: homeMeta?.title || "",
    description: homeMeta?.description || "",
    favicon: null,
    ogImage: homeMeta?.ogImage || null,
    colors: allColors,
    pages: pagesMeta,
    capturedAt: new Date().toISOString(),
  };

  // Save meta
  fs.writeFileSync(
    path.join(outDir, "meta.json"),
    JSON.stringify(siteMeta, null, 2),
  );

  await browser.close();

  // Summary
  console.log("\n✅ Done!");
  console.log(`   📁 ${outDir}`);
  console.log(`   📄 ${pagesMeta.length} pages captured`);

  const totalFiles = countFiles(outDir);
  console.log(`   🖼️  ${totalFiles} files generated`);
  console.log(`   📋 meta.json saved\n`);
}

function countFiles(dir: string): number {
  let count = 0;
  for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
    if (entry.isDirectory()) {
      count += countFiles(path.join(dir, entry.name));
    } else {
      count++;
    }
  }
  return count;
}

main().catch((e) => {
  console.error("Fatal error:", e);
  process.exit(1);
});
