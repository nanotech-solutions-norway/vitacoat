import { chromium, firefox, webkit } from "playwright";

const baseUrl = process.env.BASE_URL || "http://127.0.0.1:4173";
const routes = [
  "/",
  "/en/",
  "/contact/",
  "/en/contact/",
  "/proof/testing-and-standards/",
  "/en/proof/testing-and-standards/"
];
const viewports = [
  { name: "compact-mobile", width: 320, height: 900 },
  { name: "desktop", width: 1440, height: 1000 }
];
const browsers = { chromium, firefox, webkit };
const failures = [];

function fail(message) {
  failures.push(message);
}

async function waitForServer() {
  for (let attempt = 0; attempt < 30; attempt += 1) {
    try {
      const response = await fetch(baseUrl + "/", { redirect: "manual" });
      if (response.status < 500) return;
    } catch {}
    await new Promise(resolve => setTimeout(resolve, 500));
  }
  throw new Error("Static test server did not become ready");
}

await waitForServer();

for (const [browserName, browserType] of Object.entries(browsers)) {
  const browser = await browserType.launch({ headless: true });
  try {
    for (const viewport of viewports) {
      const context = await browser.newContext({ viewport: { width: viewport.width, height: viewport.height } });
      try {
        for (const route of routes) {
          const page = await context.newPage();
          const pageErrors = [];
          page.on("pageerror", error => pageErrors.push(error.message));
          const response = await page.goto(baseUrl + route, { waitUntil: "networkidle", timeout: 30000 });
          const tag = `${browserName} ${viewport.name} ${route}`;

          if (!response || response.status() >= 400) {
            fail(`${tag}: navigation returned ${response?.status() ?? "no response"}`);
            await page.close();
            continue;
          }

          const state = await page.evaluate(() => ({
            h1Count: document.querySelectorAll("h1").length,
            mainCount: document.querySelectorAll("main#main-content").length,
            overflow: document.documentElement.scrollWidth - document.documentElement.clientWidth
          }));
          if (state.h1Count !== 1) fail(`${tag}: expected one H1, found ${state.h1Count}`);
          if (state.mainCount !== 1) fail(`${tag}: expected one #main-content landmark`);
          if (state.overflow > 1) fail(`${tag}: horizontal overflow ${state.overflow}px`);
          if (pageErrors.length) fail(`${tag}: page errors: ${pageErrors.join(" | ")}`);

          const mobile = viewport.width <= 860;
          const menuToggle = page.locator(".menu-toggle");
          const desktopNav = page.locator(".nav");

          if (mobile) {
            if (!(await menuToggle.isVisible())) fail(`${tag}: mobile menu toggle not visible`);
            if ((await menuToggle.getAttribute("aria-expanded")) !== "false") fail(`${tag}: mobile menu must load collapsed`);
            await menuToggle.click();
            if ((await menuToggle.getAttribute("aria-expanded")) !== "true") fail(`${tag}: mobile menu did not open`);
            const firstSub = page.locator(".mobile-subnav-toggle").first();
            await firstSub.click();
            if ((await firstSub.getAttribute("aria-expanded")) !== "true") fail(`${tag}: mobile submenu did not expand`);
            await page.keyboard.press("Escape");
            if ((await menuToggle.getAttribute("aria-expanded")) !== "false") fail(`${tag}: Escape did not close mobile menu`);
            const focused = await page.evaluate(() => document.activeElement?.classList.contains("menu-toggle") || false);
            if (!focused) fail(`${tag}: focus did not return to menu toggle after Escape`);
          } else {
            if (!(await desktopNav.isVisible())) fail(`${tag}: desktop navigation not visible`);
            if (await menuToggle.isVisible()) fail(`${tag}: mobile menu toggle visible on desktop`);
            const dropdown = page.locator(".nav-dropdown").first();
            const dropdownMenu = dropdown.locator(".dropdown-menu");
            if (await dropdownMenu.isVisible()) fail(`${tag}: desktop dropdown is visible on load`);
            await dropdown.locator(".nav-top-link").hover();
            if (!(await dropdownMenu.isVisible())) fail(`${tag}: desktop dropdown did not open on hover`);
            await dropdownMenu.hover();
            if (!(await dropdownMenu.isVisible())) fail(`${tag}: desktop dropdown did not remain selectable while hovered`);
          }

          if (route.includes("testing-and-standards")) {
            if (mobile) {
              const labels = page.locator(".bar-mobile-label");
              if ((await labels.count()) !== 4) fail(`${tag}: expected four mobile bar labels`);
              for (let i = 0; i < await labels.count(); i += 1) {
                if (!(await labels.nth(i).isVisible())) fail(`${tag}: mobile bar label ${i + 1} is not visible`);
              }
            } else {
              const labels = page.locator(".bar-label");
              if ((await labels.count()) !== 4) fail(`${tag}: expected four desktop bar labels`);
              for (let i = 0; i < await labels.count(); i += 1) {
                if (!(await labels.nth(i).isVisible())) fail(`${tag}: desktop bar label ${i + 1} is not visible`);
              }
            }
          }

          if (route.endsWith("/contact/")) {
            const formState = await page.evaluate(() => {
              const form = document.querySelector(".contact-form");
              if (!form) return { exists: false };
              const controls = [...form.querySelectorAll("input:not([type=hidden]):not([style*='display:none']), select, textarea")];
              return {
                exists: true,
                unlabeled: controls.filter(control => !control.closest("label") && !control.getAttribute("aria-label") && !control.getAttribute("aria-labelledby")).length
              };
            });
            if (!formState.exists) fail(`${tag}: contact form missing`);
            if (formState.unlabeled) fail(`${tag}: contact form has ${formState.unlabeled} unlabeled controls`);
          }

          await page.close();
        }
      } finally {
        await context.close();
      }
    }
  } finally {
    await browser.close();
  }
}

if (failures.length) {
  console.error("VitaCoat browser acceptance FAILED");
  failures.forEach(item => console.error("- " + item));
  process.exit(1);
}

console.log(`VitaCoat browser acceptance passed: ${Object.keys(browsers).length} engines × ${viewports.length} viewports × ${routes.length} representative routes.`);
