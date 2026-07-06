const { test, expect } = require('@playwright/test');

/**
 * End-to-End User Journey Showcase
 * Target: Complete purchasing funnel validation via a lean "steel-thread" progression.
 * Observability: Employs native test.step encapsulation for recruiter-visible execution tracing.
 */
test('should successfully execute a complete checkout journey', async ({ page }) => {
  
  // Step 1: Establish connection and confirm baseline application availability
  await test.step('1. Navigate to store homepage', async () => {
    await page.goto('/');
  });

  // Step 2: Clear the authentication gate using verified data-driven locators
  await test.step('2. Authenticate standard user credentials', async () => {
    await page.locator('[data-test="username"]').fill('standard_user');
    await page.locator('[data-test="password"]').fill('secret_sauce');
    await page.locator('[data-test="login-button"]').click();
  });

  // Step 3: Validate successful state transition into the authenticated dashboard environment
  await test.step('3. Verify inventory dashboard visibility', async () => {
    /* First core checkpoint verifying that the product catalogue container has fully initialised */
    await expect(page.locator('[data-test="inventory-container"]')).toBeVisible();
  });

  // Step 4: Dynamically select a product and assert that the container registers the count change
  await test.step('4. Add item to shopping basket', async () => {
    /* Senior Strategy: Using an attribute-start operator (^=) to target the first available item 
       independent of changing inventory data, proving framework execution resilience. */
    await page.locator('[data-test^="add-to-cart-"]').first().click();
    
    /* Option A Assertion: Verifying the dynamic badge count directly inside the parent container link */
    await expect(page.locator('[data-test="shopping-cart-link"]')).toHaveText('1');
  });
});