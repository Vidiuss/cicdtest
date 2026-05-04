import { test, expect } from '@playwright/test';

test('test', async ({ page }) => {
  await page.goto('https://www.hepsiburada.com/');
  const page1Promise = page.waitForEvent('popup');
  await page.getByRole('link', { name: 'Listene ekle: By Nini Spf 50' }).click();
  const page1 = await page1Promise;
  await page.getByRole('link', { name: 'Listene ekle: By Nini Spf 50' }).hover();
  const page2Promise = page.waitForEvent('popup');
  await page.locator('.productCard-module_productCardRoot__Yf7qs').first().click();
  const page2 = await page2Promise;
});