class CartPage {
  /**
   * @param {import('@playwright/test').Page} page
   */
  constructor(page) {
    this.page = page;
    this.cartListContainer = page.locator('[data-test="cart-list"]');
    this.itemQuantityLabel = page.locator('[data-test="item-quantity"]');
    this.checkoutButton = page.locator('[data-test="checkout"]');
  }

  /**
   * Gets the locator for the main cart list container
   * @returns {import('@playwright/test').Locator}
   */
  getCartListContainer() {
    return this.cartListContainer;
  }

  /**
   * Gets the locator for the first item quantity label
   * @returns {import('@playwright/test').Locator}
   */
  getFirstItemQuantity() {
    return this.itemQuantityLabel.first();
  }

  /**
   * Initiates the checkout process by clicking the checkout button
   */
  async proceedToCheckout() {
    await this.checkoutButton.click();
  }
}

module.exports = { CartPage };