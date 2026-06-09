// Generate the landing-page screenshots straight from a running HELIOS
// instance. Logs in once, captures each page in German and English, wraps every
// capture in a stylized macOS-Safari frame and writes the PNGs into
// src/assets/screenshots/<locale>/, where Screenshots.astro picks them up by
// their numeric filename prefix.
//
// Usage:
//   HELIOS_PASSWORD=... bun run screenshots
//   HELIOS_URL=http://other-host:3999 HELIOS_PASSWORD=... bun run screenshots
//   FRAME=0 HELIOS_PASSWORD=... bun run screenshots   # plain, no browser frame
//
// Requires Chromium for Playwright: bunx playwright install chromium

import { chromium } from 'playwright';
import sharp from 'sharp';
import { fileURLToPath } from 'node:url';
import path from 'node:path';

const BASE = (process.env.HELIOS_URL ?? 'http://raspi.fritz.box:3999').replace(
  /\/$/,
  '',
);
const PASSWORD = process.env.HELIOS_PASSWORD;
const FRAME = process.env.FRAME !== '0';

if (!PASSWORD) {
  console.error('Missing HELIOS_PASSWORD environment variable.');
  process.exit(1);
}

// Logical viewport; deviceScaleFactor renders it at 2x for crisp retina PNGs.
const VIEWPORT = { width: 1200, height: 860 };
const SCALE = 2;

// Host shown in the frame's address bar (without scheme).
const DISPLAY_HOST = BASE.replace(/^https?:\/\//, '');

const LOCALES = ['de', 'en'];

const PAGES = [
  { route: '/sensors', file: '1-configuration.webp' },
  { route: '/services', file: '2-services.webp' },
  { route: '/backups', file: '3-backup.webp' },
];

// Source masters are stored as WebP: Astro re-encodes them to AVIF/WebP/JPEG
// anyway, so a lossless PNG master only bloats the repo. q92 is visually
// indistinguishable for UI screenshots at ~1/4 the size.
const WEBP_QUALITY = 92;

const outDir = path.resolve(
  fileURLToPath(new URL('.', import.meta.url)),
  '../src/assets/screenshots',
);

// The app stores its UI preferences (including the locale) in a single
// JSON cookie named "preferences", URL-encoded the same way the client does.
const preferencesCookie = (locale) => ({
  name: 'preferences',
  value: encodeURIComponent(JSON.stringify({ locale })),
  url: BASE,
});

// Stylized macOS-Safari frame: light toolbar with traffic lights and a centered
// address pill, the captured page below, the whole window rounded with a drop
// shadow on a subtle dark backdrop that blends into the indigo landing page.
const frameHtml = (pngBuffer, displayUrl) => {
  const dataUrl = `data:image/png;base64,${pngBuffer.toString('base64')}`;
  return `<!doctype html><html><head><meta charset="utf-8"><style>
    * { margin: 0; padding: 0; box-sizing: border-box; }
    html, body { background: transparent; }
    .scene {
      width: fit-content;
      padding: 64px;
      background: radial-gradient(120% 100% at 50% 0%, #2b2674 0%, #1a1648 70%, #14112f 100%);
      font-family: -apple-system, BlinkMacSystemFont, "SF Pro Text", "Segoe UI", sans-serif;
    }
    .window {
      width: ${VIEWPORT.width}px;
      border-radius: 14px;
      overflow: hidden;
      background: #f4f4f6;
      box-shadow:
        0 50px 90px -25px rgba(0, 0, 0, 0.65),
        0 0 0 1px rgba(255, 255, 255, 0.05);
    }
    .toolbar {
      height: 50px;
      display: grid;
      grid-template-columns: 1fr auto 1fr;
      align-items: center;
      gap: 16px;
      padding: 0 18px;
      background: linear-gradient(#fcfcfe, #ececed);
      border-bottom: 1px solid rgba(0, 0, 0, 0.08);
    }
    .cluster { display: flex; align-items: center; gap: 16px; }
    .lights { display: flex; gap: 8px; }
    .light { width: 12px; height: 12px; border-radius: 50%; }
    .red { background: #ff5f57; }
    .yellow { background: #febc2e; }
    .green { background: #28c840; }
    .nav { display: flex; gap: 18px; color: #9b9ba1; }
    .right { justify-self: end; }
    .urlbar {
      justify-self: center;
      display: flex;
      align-items: center;
      justify-content: center;
      gap: 7px;
      width: 460px;
      height: 30px;
      padding: 0 14px;
      background: #e3e3e8;
      border-radius: 8px;
      color: #57575c;
      font-size: 13px;
      letter-spacing: 0.01em;
    }
    .urlbar svg { flex: none; opacity: 0.65; }
    .shot { display: block; width: ${VIEWPORT.width}px; height: auto; }
  </style></head><body>
    <div class="scene">
      <div class="window">
        <div class="toolbar">
          <div class="cluster">
            <div class="lights">
              <span class="light red"></span>
              <span class="light yellow"></span>
              <span class="light green"></span>
            </div>
            <div class="nav">
              <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round"><polyline points="15 18 9 12 15 6"/></svg>
              <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round"><polyline points="9 18 15 12 9 6"/></svg>
            </div>
          </div>
          <div class="urlbar">
            <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10"/><line x1="2" y1="12" x2="22" y2="12"/><path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10A15.3 15.3 0 0 1 12 2z"/></svg>
            <span>${displayUrl}</span>
          </div>
          <div class="cluster right nav">
            <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round"><path d="M4 12v8a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2v-8"/><polyline points="16 6 12 2 8 6"/><line x1="12" y1="2" x2="12" y2="15"/></svg>
            <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round"><rect x="3" y="3" width="18" height="18" rx="2"/><line x1="3" y1="9" x2="21" y2="9"/></svg>
          </div>
        </div>
        <img class="shot" src="${dataUrl}" />
      </div>
    </div>
  </body></html>`;
};

const browser = await chromium.launch();
const context = await browser.newContext({
  viewport: VIEWPORT,
  deviceScaleFactor: SCALE,
  reducedMotion: 'reduce',
});
const page = await context.newPage();
// Separate page used only to render the static frame around each capture.
const framePage = FRAME ? await context.newPage() : null;

// Log in once; the session cookie is reused for every capture.
console.log(`Logging in at ${BASE} …`);
await page.goto(`${BASE}/session/new`, { waitUntil: 'networkidle' });
await page.fill('input[name="password"]', PASSWORD);
await page.click('button[type="submit"]');

// The form is submitted via Turbo, so wait for the redirect away from /session
// rather than a full page load (which may fire before the visit completes).
try {
  await page.waitForURL((url) => !url.pathname.startsWith('/session'), {
    timeout: 15_000,
  });
} catch {
  console.error('Login failed – still on the login page. Wrong password?');
  await browser.close();
  process.exit(1);
}

for (const locale of LOCALES) {
  await context.clearCookies({ name: 'preferences' });
  await context.addCookies([preferencesCookie(locale)]);

  for (const { route, file } of PAGES) {
    await page.goto(`${BASE}${route}`, { waitUntil: 'networkidle' });
    // Give Hotwire frames, web fonts and live values a moment to settle.
    await page.evaluate(() => document.fonts.ready);
    await page.waitForTimeout(1000);

    const target = path.join(outDir, locale, file);

    let buffer;
    if (FRAME) {
      const shot = await page.screenshot();
      const displayUrl = `${DISPLAY_HOST}${route}`;
      await framePage.setContent(frameHtml(shot, displayUrl), {
        waitUntil: 'load',
      });
      buffer = await framePage.locator('.scene').screenshot();
    } else {
      buffer = await page.screenshot();
    }

    await sharp(buffer).webp({ quality: WEBP_QUALITY }).toFile(target);

    console.log(
      `✓ ${locale}  ${route}  →  ${path.relative(process.cwd(), target)}`,
    );
  }
}

await browser.close();
console.log('Done.');
