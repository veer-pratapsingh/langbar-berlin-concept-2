import puppeteer from "puppeteer-core";
import fs from "node:fs";
import path from "node:path";

const executablePath = "C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe";
const outDir = "C:\\Users\\chaud\\.gemini\\antigravity\\brain\\65297fe4-c714-4f07-8015-adc366c842f5\\scratch\\qa";
fs.mkdirSync(outDir, { recursive: true });

async function run() {
  console.log("Launching browser for QA...");
  const browser = await puppeteer.launch({
    executablePath,
    headless: true,
    args: ["--no-sandbox", "--disable-setuid-sandbox", "--disable-gpu"],
  });

  const page = await browser.newPage();

  const consoleLogs = [];
  page.on("console", (msg) => consoleLogs.push(`[${msg.type()}] ${msg.text()}`));
  page.on("pageerror", (err) => consoleLogs.push(`[PAGE ERROR] ${err.toString()}`));

  const viewports = [
    { name: "mobile-390", width: 390, height: 844 },
    { name: "tablet-768", width: 768, height: 1024 },
    { name: "desktop-1440", width: 1440, height: 900 },
    { name: "desktop-1920", width: 1920, height: 1080 },
  ];

  for (const vp of viewports) {
    console.log(`Testing viewport ${vp.name} (${vp.width}x${vp.height})...`);
    await page.setViewport({ width: vp.width, height: vp.height, deviceScaleFactor: 1 });
    await page.goto("http://localhost:3008/?preloader=off", { waitUntil: "networkidle2" });
    await page.evaluate(() => new Promise((resolve) => setTimeout(resolve, 800)));

    // Hero screenshot
    await page.screenshot({
      path: path.join(outDir, `${vp.name}-hero.jpg`),
      quality: 85,
      type: "jpeg",
    });

    // Scroll through all sections
    const sections = ["story", "cocktails", "gallery", "dj-nights", "private-events", "visit"];
    for (const sec of sections) {
      await page.evaluate((id) => {
        const el = document.getElementById(id);
        if (el) el.scrollIntoView({ behavior: "instant" });
      }, sec);
      await page.evaluate(() => new Promise((resolve) => setTimeout(resolve, 500)));
      await page.screenshot({
        path: path.join(outDir, `${vp.name}-${sec}.jpg`),
        quality: 85,
        type: "jpeg",
      });
    }

    console.log(`Finished ${vp.name}`);
  }

  // Preloader visual test on desktop 1440
  console.log("Testing Preloader on 1440x900...");
  await page.setViewport({ width: 1440, height: 900 });
  await page.goto("http://localhost:3008/", { waitUntil: "domcontentloaded" });
  await page.evaluate(() => new Promise((resolve) => setTimeout(resolve, 350)));
  await page.screenshot({
    path: path.join(outDir, "desktop-1440-preloader.jpg"),
    quality: 85,
    type: "jpeg",
  });

  fs.writeFileSync(path.join(outDir, "console-logs.txt"), consoleLogs.join("\n"));
  console.log(`Console logs count: ${consoleLogs.length}`);
  if (consoleLogs.length > 0) {
    console.log("Console logs sample:\n" + consoleLogs.slice(0, 10).join("\n"));
  }

  await browser.close();
  console.log("QA finished successfully!");
}

run().catch((err) => {
  console.error(err);
  process.exit(1);
});
