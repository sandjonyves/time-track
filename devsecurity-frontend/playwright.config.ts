import { defineConfig, devices } from '@playwright/test';

export default defineConfig({
  testDir: './tests',

  reporter: [['list'], ['html', { outputFolder: 'playwright-report' }]],

  use: {
    baseURL: 'http://localhost:5173', 
    headless: true, 
    viewport: { width: 1280, height: 720 },
    actionTimeout: 10000, 
    ignoreHTTPSErrors: true,
    screenshot: 'only-on-failure',
    video: 'retain-on-failure', 
  },

  projects: [
  
    {
      name: 'Firefox',
      use: { ...devices['Desktop Firefox'] },
    },

  ],
});
