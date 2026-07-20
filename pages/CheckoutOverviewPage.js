class CheckoutOverviewPage {
  /**
   * @param {import('@playwright/test').Page} page
   */
  constructor(page) {
    this.page = page;
    this.finishButton = page.locator('[data-test="finish"]');
    this.completeHeader = page.locator('[data-test="complete-header"]');
  }

  /**
   * Finalises the transaction by clicking the finish button
   */
  async finaliseOrder() {
    await this.finishButton.click();
  }

  /**
   * Gets the locator for the order completion success header
   * @returns {import('@playwright/test').Locator}
   */
  getCompleteHeader() {
    return this.completeHeader;
  }
}

module.exports = { CheckoutOverviewPage };