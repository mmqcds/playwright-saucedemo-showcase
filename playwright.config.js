const { defineConfig, devices } = require('@playwright/test');

/**
 * @see https://playwright.dev/docs/test-configuration
 * This global configuration file defines the execution environment, parallelisation strategy,
 * and observability hooks for the entire automation suite.
 */
module.exports = defineConfig({
  testDir: './tests',
  /* Run tests in files in parallel to optimise execution velocity */
  fullyParallel: true,
  /* Fail the build on CI if you accidentally left test.only in the source code */
  forbidOnly: !!process.env.CI,
  /* Retry on CI only to catch intermittent infrastructure instability */
  retries: process.env.CI ? 2 : 0,
  /* Opt out of parallel tests on CI if resource constraints dictate it */
  workers: process.env.CI ? 1 : undefined,
  /* Centralised reporter setup for local and continuous integration views */
  reporter: 'html',
  
  /* Shared settings for all the projects below – lifting the bonnet on global hooks */
  use: {
    /* Base URL used in page.goto() paths across the test lifecycle */
    baseURL: 'https://www.saucedemo.com',

    /* Robust Debugging Hook: Capture full viewport snapshots immediately upon failure */
    screenshot: 'only-on-failure',

    /* Collect trace files on failure for deep post-mortem analysis in the Trace Viewer */
    trace: 'retain-on-failure',
  },

  /* Configure projects for major browser engines */
  projects: [
    {
      name: 'chromium',
      use: { ...devices['Desktop Chrome'] },
    },
  ],
});