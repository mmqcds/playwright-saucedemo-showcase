const { test, expect } = require('@playwright/test');

/**
 * Baseline Smoke Connectivity Validation
 * Target: Verify core domain responsiveness, SSL handshaking, and initial branding state.
 * Alignment: Utilises the global config-declared baseURL to eliminate string redundancy.
 */
test('should successfully load the login page and verify the page title', async ({ page }) => {
  // Senior Refactor: Utilising the config-defined baseURL single source of truth
  await page.goto('/');

  // Dual-Layered Smoke Assertions: Validate routing resolution and branding state simultaneously
  await expect(page).toHaveURL(/.*saucedemo\.com/);
  await expect(page).toHaveTitle('Swag Labs');
});