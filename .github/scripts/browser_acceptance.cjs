const { chromium } = require('playwright');

const baseUrl = process.env.BASE_URL || 'http://127.0.0.1:4173';
const baseOrigin = new URL(baseUrl).origin;
const results = [];

function check(condition, message) {
  if (!condition) throw new Error(message);
}

async function record(name, fn) {
  try {
    await fn();
    results.push({ name, status: 'pass' });
    console.log('PASS:', name);
  } catch (error) {
    results.push({ name, status: 'fail', error: error.message });
    console.error('FAIL:', name, '-', error.message);
  }
}

async function openStablePage(page, path) {
  const pageErrors = [];
  const onPageError = error => pageErrors.push(error.message);
  page.on('pageerror', onPageError);
  await page.goto(baseUrl + path, { waitUntil: 'domcontentloaded' });
  await page.waitForTimeout(250);
  page.off('pageerror', onPageError);
  check(pageErrors.length === 0, path + ': browser page errors: ' + pageErrors.join(' | '));
}

async function assertNoHorizontalOverflow(page, label) {
  const size = await page.evaluate(() => ({
    scrollWidth: document.documentElement.scrollWidth,
    clientWidth: document.documentElement.clientWidth
  }));
  check(size.scrollWidth <= size.clientWidth + 1,
    label + ': horizontal overflow (' + size.scrollWidth + ' > ' + size.clientWidth + ')');
}

async function assertLanguageNames(page, label) {
  const values = await page.locator('.language-link').evaluateAll(nodes =>
    nodes.map(node => ({
      label: node.getAttribute('aria-label'),
      lang: node.getAttribute('lang'),
      hreflang: node.getAttribute('hreflang')
    }))
  );
  check(values.length === 6, label + ': expected six language controls, found ' + values.length);
  for (const value of values) {
    check(['Norsk', 'English'].includes(value.label), label + ': language link missing accessible name');
    check(Boolean(value.lang && value.hreflang), label + ': language link missing lang/hreflang');
  }
}

(async () => {
  const browser = await chromium.launch({ channel: 'chrome', headless: true, args: ['--no-sandbox'] });

  await record('desktop dropdown hover gap and Escape behavior', async () => {
    const context = await browser.newContext({ viewport: { width: 1440, height: 900 }, reducedMotion: 'reduce' });
    await context.route('**/*', route => {
      const url = new URL(route.request().url());
      if (url.origin !== baseOrigin) return route.abort();
      return route.continue();
    });
    const page = await context.newPage();
    await openStablePage(page, '/');
    await assertNoHorizontalOverflow(page, 'desktop home');

    const firstDropdown = page.locator('.nav-dropdown').first();
    const topLink = firstDropdown.locator('.nav-top-link');
    const menu = firstDropdown.locator('.dropdown-menu');

    await topLink.hover();
    await page.waitForTimeout(100);
    check(await firstDropdown.evaluate(el => el.matches(':hover')), 'desktop dropdown parent did not enter CSS hover state');
    check(await menu.isVisible(), 'desktop dropdown did not open on hover');
    await menu.locator('a').first().hover();
    await page.waitForTimeout(260);
    check(await menu.isVisible(), 'desktop dropdown closed while pointer remained inside dropdown area');

    await topLink.focus();
    await page.waitForTimeout(50);
    check(await menu.isVisible(), 'desktop dropdown did not open for keyboard focus');
    await page.keyboard.press('Escape');
    await page.waitForTimeout(50);
    check(!(await menu.isVisible()), 'desktop dropdown remained visible after Escape');
    check(await topLink.evaluate(el => document.activeElement === el), 'focus did not return to dropdown top link after Escape');

    await assertLanguageNames(page, 'desktop home');
    await context.close();
  });

  for (const path of ['/', '/en/']) {
    await record('mobile navigation, skip link and chart semantics ' + path, async () => {
      const context = await browser.newContext({ viewport: { width: 390, height: 844 }, reducedMotion: 'reduce' });
      await context.route('**/*', route => {
        const url = new URL(route.request().url());
        if (url.origin !== baseOrigin) return route.abort();
        return route.continue();
      });
      const page = await context.newPage();
      await openStablePage(page, path);
      await assertNoHorizontalOverflow(page, 'mobile ' + path);

      const skip = page.locator('.skip-link');
      await skip.focus();
      check(await skip.evaluate(el => document.activeElement === el), path + ': skip link cannot receive focus');
      await page.keyboard.press('Enter');
      await page.waitForTimeout(50);
      check(await page.locator('#main-content').evaluate(el => document.activeElement === el), path + ': skip link did not move focus to main');

      const toggle = page.locator('.menu-toggle');
      await toggle.click();
      check((await toggle.getAttribute('aria-expanded')) === 'true', path + ': menu aria-expanded did not become true');
      check(await page.locator('#mobile-menu').isVisible(), path + ': mobile menu not visible after open');

      const subToggle = page.locator('.mobile-subnav-toggle').first();
      const targetId = await subToggle.getAttribute('aria-controls');
      await subToggle.click();
      check((await subToggle.getAttribute('aria-expanded')) === 'true', path + ': submenu aria-expanded did not become true');
      check(await page.locator('#' + targetId).isVisible(), path + ': controlled submenu not visible');

      await page.keyboard.press('Escape');
      await page.waitForTimeout(50);
      check((await toggle.getAttribute('aria-expanded')) === 'false', path + ': menu aria-expanded did not reset after Escape');
      check(!(await page.locator('#mobile-menu').isVisible()), path + ': mobile menu remained visible after Escape');
      check(await toggle.evaluate(el => document.activeElement === el), path + ': focus did not return to menu toggle after Escape');

      const rows = page.locator('.bar-row');
      if (await rows.count()) {
        const mobileLabels = page.locator('.bar-mobile-label');
        check((await mobileLabels.count()) === (await rows.count()), path + ': mobile bar label count mismatch');
        for (let i = 0; i < await mobileLabels.count(); i++) {
          check(await mobileLabels.nth(i).isVisible(), path + ': mobile bar label is not visible inside the bar');
        }
        for (let i = 0; i < await page.locator('.bar-label').count(); i++) {
          check(!(await page.locator('.bar-label').nth(i).isVisible()), path + ': desktop bar label remains visible on mobile');
        }
      }

      await assertLanguageNames(page, 'mobile ' + path);
      await context.close();
    });
  }

  await record('compact 320px reflow on evidence page', async () => {
    const context = await browser.newContext({ viewport: { width: 320, height: 800 }, reducedMotion: 'reduce' });
    await context.route('**/*', route => {
      const url = new URL(route.request().url());
      if (url.origin !== baseOrigin) return route.abort();
      return route.continue();
    });
    const page = await context.newPage();
    await openStablePage(page, '/proof/testing-and-standards/');
    await assertNoHorizontalOverflow(page, '320px testing page');
    const labels = page.locator('.bar-mobile-label');
    check((await labels.count()) === 4, '320px testing page: expected four mobile chart labels');
    for (let i = 0; i < 4; i++) check(await labels.nth(i).isVisible(), '320px testing page: hidden chart label ' + i);
    await context.close();
  });

  await record('contact form semantics without submission', async () => {
    const context = await browser.newContext({ viewport: { width: 1280, height: 900 } });
    await context.route('**/*', route => {
      const url = new URL(route.request().url());
      if (url.origin !== baseOrigin) return route.abort();
      return route.continue();
    });
    const page = await context.newPage();
    for (const path of ['/contact/', '/en/contact/']) {
      await openStablePage(page, path);
      const issues = await page.locator('form.contact-form').evaluate(form => {
        const controls = [...form.querySelectorAll('input:not([type="hidden"]), select, textarea')]
          .filter(el => el.name !== '_gotcha' && getComputedStyle(el).display !== 'none');
        return controls.filter(el => {
          const nested = el.closest('label');
          const explicit = el.id && form.querySelector('label[for="' + CSS.escape(el.id) + '"]');
          return !nested && !explicit;
        }).map(el => el.name || el.tagName);
      });
      check(issues.length === 0, path + ': unlabeled contact controls: ' + issues.join(', '));
      check(await page.locator('form.contact-form button[type="submit"]').isVisible(), path + ': submit button not visible');
    }
    await context.close();
  });

  await record('provider-neutral measurement event contract', async () => {
    const context = await browser.newContext({ viewport: { width: 1280, height: 800 } });
    await context.route('**/*', route => {
      const url = new URL(route.request().url());
      if (url.origin !== baseOrigin) return route.abort();
      return route.continue();
    });
    const page = await context.newPage();
    await openStablePage(page, '/');
    await page.evaluate(() => {
      window.__vitacoatTestEvents = [];
      window.addEventListener('vitacoat:measurement', event => window.__vitacoatTestEvents.push(event.detail));
      const link = document.querySelector('a[href="/documentation/"]');
      link.addEventListener('click', event => event.preventDefault(), { once: true });
    });
    await page.locator('a[href="/documentation/"]').first().click();
    const events = await page.evaluate(() => window.__vitacoatTestEvents);
    const event = events.find(item => item.event === 'cta_documentation');
    check(Boolean(event), 'documentation CTA did not emit measurement event');
    for (const forbidden of ['name', 'email', 'company', 'message']) {
      check(!(forbidden in event), 'measurement event exposed forbidden field: ' + forbidden);
    }
    await context.close();
  });

  await browser.close();

  const failed = results.filter(item => item.status === 'fail');
  console.log('\nBrowser acceptance:', results.length - failed.length + '/' + results.length, 'checks passed.');
  if (failed.length) process.exit(1);
})().catch(error => {
  console.error(error);
  process.exit(1);
});
