import { defineConfig, devices } from '@playwright/test';

export default defineConfig({
  testDir: './',
  timeout: 60000,
  fullyParallel: true,
  forbidOnly: !!process.env.CI,
  retries: process.env.CI ? 2 : 0,
  workers: process.env.CI ? 1 : undefined,
  reporter: 'html',
  use: {
    // baseURL kaldırıldı
    trace: 'on-first-retry',
    navigationTimeout: 60000,  // 30000 → 60000
    actionTimeout: 15000,      // eklendi
    headless: false,           // eklendi
    launchOptions: {
      args: ['--disable-blink-features=AutomationControlled']  // bot tespitini engelle
    }
  },
  projects: [
    {
      name: 'chromium',
      use: { ...devices['Desktop Chrome'] },
    },
  ],
});