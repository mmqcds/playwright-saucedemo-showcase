class CartPage {
  constructor(page) {
    this.page = page;
    this.cartListContainer = page.locator('[data-test="cart-list"]');
    this.itemQuantityLabel = page.locator('[data-test="item-quantity"]');
    this.checkoutButton = page.locator('[data-test="checkout"]');
  }

  getCartListContainer() {
    return this.cartListContainer;
  }

  getFirstItemQuantity() {
    return this.itemQuantityLabel.first();
  }

  async proceedToCheckout() {
    await this.checkoutButton.click();
  }
}

module.exports = { CartPage };