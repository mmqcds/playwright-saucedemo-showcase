class ProductsPage {
  constructor(page) {
    this.page = page;
    this.addToCartButtons = page.locator('[data-test^="add-to-cart-"]');
    this.shoppingCartLink = page.locator('[data-test="shopping-cart-link"]');
  }

  async addFirstItemToCart() {
    await this.addToCartButtons.first().click();
  }

  getCartLink() {
    return this.shoppingCartLink;
  }
}

module.exports = { ProductsPage };