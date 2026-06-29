const { test, expect } = require('@playwright/test');

test('should successfully execute a complete checkout journey', async ({ page }) => {
  // 1. Navigate to the application base URL
  await page.goto('https://www.saucedemo.com/');

  // 2. Log in using standard user credentials
  await page.locator('[data-test="username"]').fill('standard_user');
  await page.locator('[data-test="password"]').fill('secret_sauce');
  await page.locator('[data-test="login-button"]').click();

  // 3. Verify successful login by ensuring the products inventory list is visible
  await expect(page.locator('[data-test="inventory-container"]')).toBeVisible();
});