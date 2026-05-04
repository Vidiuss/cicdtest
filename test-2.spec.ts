import { test, expect } from '@playwright/test';

test('test', async ({ page }) => {
  await page.goto('https://www.hepsiburada.com/');
  const page1Promise = page.waitForEvent('popup');
  await page.locator('.productCard-module_productCardRoot__Yf7qs').first().click();
  const page1 = await page1Promise;
  await page1.locator('[data-test-id="title"]').dblclick();
  await page1.locator('[data-test-id="title"]').click();
  await page1.goto('https://www.hepsiburada.com/by-nini-spf-50-pa-yeni-nesil-filtreli-leke-karsiti-su-bazli-nemlendiricili-gunes-kremi-50-ml-p-HBCV000067OJSD');
});