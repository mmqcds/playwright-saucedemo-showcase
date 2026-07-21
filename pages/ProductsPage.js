class ProductsPage {
  constructor(page) {
    this.page = page;
    this.inventoryContainer = page.locator('[data-test="inventory-container"]');
    this.addToCartButtons = page.locator('[data-test^="add-to-cart-"]');
    this.shoppingCartLink = page.locator('[data-test="shopping-cart-link"]');
  }

  getInventoryContainer() {
    return this.inventoryContainer;
  }

  async addFirstItemToCart() {
    await this.addToCartButtons.first().click();
  }

  getCartLink() {
    return this.shoppingCartLink;
  }
}

module.exports = { ProductsPage };