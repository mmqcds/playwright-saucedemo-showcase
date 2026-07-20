const { test, expect } = require('@playwright/test');
const { LoginPage } = require('../pages/LoginPage');
const { ProductsPage } = require('../pages/ProductsPage');
const { CartPage } = require('../pages/CartPage');
const { CheckoutInfoPage } = require('../pages/CheckoutInfoPage');
const { CheckoutOverviewPage } = require('../pages/CheckoutOverviewPage');

/**
 * End-to-End User Journey Showcase
 * Target: Complete purchasing funnel validation via a lean "steel-thread" progression.
 * Observability: Employs native test.step encapsulation for recruiter-visible execution tracing.
 */
test('should successfully execute a complete checkout journey', async ({ page }) => {
  const loginPage = new LoginPage(page);
  
  // Step 1: Establish connection and confirm baseline application availability
  await test.step('1. Navigate to store homepage', async () => {
    await page.goto('/');
    await expect(page.locator('[data-test="login-container"]')).toBeVisible();
  });

  // Step 2: Clear the authentication gate using verified data-driven locators
  await test.step('2. Authenticate standard user credentials', async () => {
    await loginPage.login('standard_user', 'secret_sauce');
  });

  // Step 3: Validate successful state transition into the authenticated dashboard environment
  await test.step('3. Verify inventory dashboard visibility', async () => {
    /* First core checkpoint verifying that the product catalogue container has fully initialised */
    await expect(page.locator('[data-test="inventory-container"]')).toBeVisible();
  });

  // Step 4: Dynamically select a product and assert that the container registers the count change
  await test.step('4. Add item to shopping basket', async () => {
    const productsPage = new ProductsPage(page);
    await productsPage.addFirstItemToCart();
    
    /* Option A Assertion: Verifying the dynamic badge count directly inside the parent container link */
    await expect(productsPage.getCartLink()).toHaveText('1');
  });

  // Step 5: Route into the cart page and verify line-item inventory state matches our selection
  await test.step('5. Validate cart inventory state', async () => {
    const productsPage = new ProductsPage(page);
    const cartPage = new CartPage(page);

    // Navigate to the shopping cart page view using the ProductsPage component
    await productsPage.getCartLink().click();

    // Verify the cart list container renders successfully
    await expect(cartPage.getCartListContainer()).toBeVisible();

    // Assert the first row item quantity matches our expected baseline count of 1
    await expect(cartPage.getFirstItemQuantity()).toHaveText('1');
  });

  // Step 6: Transition from the validated cart screen to the checkout information form
  await test.step('6. Click the checkout button', async () => {
    const cartPage = new CartPage(page);

    // Trigger the page transition boundary via our uniform page object method
    await cartPage.proceedToCheckout();

    /* Structural Gateway Assertion: Verify successful transition by confirming 
       the information form container is fully visible before concluding the step */
    await expect(page.locator('[data-test="checkout-info-container"]')).toBeVisible();
  });

  // Step 7: Populate required information fields and assert successful transition to the overview screen
  await test.step('7. Populate checkout information form', async () => {
    const checkoutInfoPage = new CheckoutInfoPage(page);

    // Populate form data using the encapsulated page object model method
    await checkoutInfoPage.populateInformationForm('John', 'Doe', 'AB12 3CD');

    /* Structural Gateway Assertions: Verify successful transition by confirming 
       the overview data and line items are present using our defensive strategies */
    await expect(page.locator('[data-test="item-quantity"]').first()).toHaveText('1');
    await expect(page.locator('[data-test="payment-info-value"]')).toHaveText(/SauceCard #\d+/);
  });

  // Step 8: Finalise the transaction and verify successful order completion
  await test.step('8. Click the finish button', async () => {
    const checkoutOverviewPage = new CheckoutOverviewPage(page);

    // Trigger the final checkout completion action via our page object method
    await checkoutOverviewPage.finaliseOrder();

    /* Final Gateway Assertion: Verify successful order placement by confirming 
       the explicit completion header text is visible on the success screen using a defensive regex matcher */
    await expect(checkoutOverviewPage.getCompleteHeader()).toHaveText(/Thank you for your order!/i);
  });
});