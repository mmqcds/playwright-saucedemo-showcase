const { test, expect } = require('@playwright/test');
const { LoginPage } = require('../pages/LoginPage');
const { ProductsPage } = require('../pages/ProductsPage');
const { CartPage } = require('../pages/CartPage');
const { CheckoutInfoPage } = require('../pages/CheckoutInfoPage');
const { CheckoutOverviewPage } = require('../pages/CheckoutOverviewPage');
const { TEST_DATA } = require('../utils/testData');

/**
 * End-to-End User Journey Showcase
 * Target: Complete purchasing funnel validation via a lean "steel-thread" progression.
 * Observability: Employs native test.step encapsulation for reviewer-visible execution tracing.
 */
test('should successfully execute a complete checkout journey', async ({ page }) => {
  const loginPage = new LoginPage(page);
  const productsPage = new ProductsPage(page);
  const cartPage = new CartPage(page);
  const checkoutInfoPage = new CheckoutInfoPage(page);
  const checkoutOverviewPage = new CheckoutOverviewPage(page);
  
  await test.step('1. Navigate to store homepage', async () => {
    await loginPage.navigate();
    await expect(loginPage.getLoginContainer()).toBeVisible();
  });

  await test.step('2. Authenticate standard user credentials', async () => {
    await loginPage.login(
      TEST_DATA.USERS.STANDARD.username,
      TEST_DATA.USERS.STANDARD.password
    );
  });

  await test.step('3. Verify inventory dashboard visibility', async () => {
    await expect(productsPage.getInventoryContainer()).toBeVisible();
  });

  await test.step('4. Add item to shopping basket', async () => {
    await productsPage.addFirstItemToCart();
    await expect(productsPage.getCartLink()).toHaveText('1');
  });

  await test.step('5. Validate cart inventory state', async () => {
    await productsPage.getCartLink().click();
    await expect(cartPage.getCartListContainer()).toBeVisible();
    await expect(cartPage.getFirstItemQuantity()).toHaveText('1');
  });

  await test.step('6. Click the checkout button', async () => {
    await cartPage.proceedToCheckout();
    await expect(checkoutInfoPage.getCheckoutInfoContainer()).toBeVisible();
  });

  await test.step('7. Populate checkout information form', async () => {
    await checkoutInfoPage.populateInformationForm(
      TEST_DATA.CUSTOMER_INFO.firstName,
      TEST_DATA.CUSTOMER_INFO.lastName,
      TEST_DATA.CUSTOMER_INFO.postalCode
    );
    await expect(checkoutOverviewPage.getFirstItemQuantity()).toHaveText('1');
    await expect(checkoutOverviewPage.getPaymentInfoValue()).toHaveText(/SauceCard #\d+/);
  });

  await test.step('8. Click the finish button', async () => {
    await checkoutOverviewPage.finaliseOrder();
    await expect(checkoutOverviewPage.getCompleteHeader()).toHaveText(/Thank you for your order!/i);
  });
});