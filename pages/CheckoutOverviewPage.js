class CheckoutOverviewPage {
  constructor(page) {
    this.page = page;
    this.finishButton = page.locator('[data-test="finish"]');
    this.completeHeader = page.locator('[data-test="complete-header"]');
    this.firstItemQuantity = page.locator('[data-test="item-quantity"]').first();
    this.paymentInfoValue = page.locator('[data-test="payment-info-value"]');
  }

  async finaliseOrder() {
    await this.finishButton.click();
  }

  getCompleteHeader() {
    return this.completeHeader;
  }

  getFirstItemQuantity() {
    return this.firstItemQuantity;
  }

  getPaymentInfoValue() {
    return this.paymentInfoValue;
  }
}

module.exports = { CheckoutOverviewPage };