import { defineConfig, devices } from "@playwright/test";
import dotenv from "dotenv";

// ENV=qa npx playwright test
const ENV = process.env.ENV || "qa";
dotenv.config({ path: `config/.env.${ENV}` });
console.log("Running the tests on Environment: ", ENV);
export default defineConfig({
  testDir: "./tests",

  fullyParallel: true,

  forbidOnly: !!process.env.CI,

  retries: process.env.CI ? 2 : 0,

  workers: process.env.CI ? 1 : undefined,

  reporter: [
    ["list"],
    ["html", { outputFolder: "reports/html-report", open: "never" }],
    ["allure-playwright", { outputFolder: "allure-results", suiteTitle: true }],
  ],

  use: {
    baseURL: process.env.BASE_URL,
    screenshot: "on-first-failure",
    video: "retain-on-failure",
    trace: "on-first-retry",
    headless: false,
  },

  /* Configure projects for major browsers */
  projects: [
    {
      name: "chromium",
      use: { ...devices["Desktop Chrome"] },
    },

    // {
    //   name: "firefox",
    //   use: { ...devices["Desktop Firefox"] },
    // },

    // {
    //   name: "webkit",
    //   use: { ...devices["Desktop Safari"] },
    // },

    /* Test against mobile viewports. */
    // {
    //   name: 'Mobile Chrome',
    //   use: { ...devices['Pixel 5'] },
    // },
    // {
    //   name: 'Mobile Safari',
    //   use: { ...devices['iPhone 12'] },
    // },

    /* Test against branded browsers. */
    // {
    //   name: 'Microsoft Edge',
    //   use: { ...devices['Desktop Edge'], channel: 'msedge' },
    // },
    // {
    //   name: 'Google Chrome',
    //   use: { ...devices['Desktop Chrome'], channel: 'chrome' },
    // },
  ],
});
