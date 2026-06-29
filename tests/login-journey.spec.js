const { test, expect } = require('@playwright/test');

test('should successfully load the login page and verify the page title', async ({ page }) => {
  // Navigate to the target web application
  await page.goto('https://www.saucedemo.com/');

  // Assert that the page title matches the official branding string exactly
  await expect(page).toHaveTitle('Swag Labs');
});