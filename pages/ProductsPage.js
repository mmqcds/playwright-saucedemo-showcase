class ProductsPage {
  /**
   * @param {import('@playwright/test').Page} page
   */
  constructor(page) {
    this.page = page;
    this.addToCartButtons = page.locator('[data-test^="add-to-cart-"]');
    this.shoppingCartLink = page.locator('[data-test="shopping-cart-link"]');
  }

  /**
   * Adds the first available item to the shopping basket
   */
  async addFirstItemToCart() {
    await this.addToCartButtons.first().click();
  }

  /**
   * Gets the locator for the shopping cart link for assertion purposes
   * @returns {import('@playwright/test').Locator}
   */
  getCartLink() {
    return this.shoppingCartLink;
  }
}

module.exports = { ProductsPage };