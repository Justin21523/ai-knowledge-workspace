import { chromium } from "playwright";
import { mkdir, rename } from "node:fs/promises";
import { existsSync } from "node:fs";
import path from "node:path";

const root = process.cwd();
const screenshotDir = path.join(root, "docs/demo/screenshots");
const videoDir = path.join(root, "docs/demo/video");
const baseUrl = process.env.DEMO_BASE_URL || "http://127.0.0.1:3000";

const shots = [
  ["home-light-desktop.png", 1440, 960, "light"],
  ["dashboard-dark-desktop.png", 1440, 960, "dark"],
  ["tablet.png", 900, 1100, "light"],
  ["mobile.png", 390, 1200, "light"],
];

await mkdir(screenshotDir, { recursive: true });
await mkdir(videoDir, { recursive: true });

const browser = await chromium.launch();

for (const [file, width, height, scheme] of shots) {
  const page = await browser.newPage({
    viewport: { width, height },
    colorScheme: scheme,
  });
  await page.goto(baseUrl, { waitUntil: "networkidle" });
  await page.screenshot({ path: path.join(screenshotDir, file), fullPage: true });
  await page.close();
}

const context = await browser.newContext({
  viewport: { width: 1280, height: 860 },
  colorScheme: "light",
  recordVideo: { dir: videoDir, size: { width: 1280, height: 860 } },
});
const page = await context.newPage();
await page.goto(baseUrl, { waitUntil: "networkidle" });
await page.mouse.wheel(0, 900);
await page.waitForTimeout(600);
await page.mouse.wheel(0, 900);
await page.waitForTimeout(600);
await page.keyboard.press("Home");
await page.waitForTimeout(600);
const video = page.video();
await context.close();
await browser.close();

if (video) {
  const webmPath = await video.path();
  const target = path.join(videoDir, "demo-walkthrough.webm");
  if (existsSync(webmPath)) {
    await rename(webmPath, target);
  }
}

console.log(`Captured demo assets in ${path.relative(root, "docs/demo")}`);
