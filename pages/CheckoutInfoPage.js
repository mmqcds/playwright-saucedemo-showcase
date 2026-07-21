class CheckoutInfoPage {
  constructor(page) {
    this.page = page;
    this.checkoutInfoContainer = page.locator('[data-test="checkout-info-container"]');
    this.firstNameInput = page.locator('[data-test="firstName"]');
    this.lastNameInput = page.locator('[data-test="lastName"]');
    this.postalCodeInput = page.locator('[data-test="postalCode"]');
    this.continueButton = page.locator('[data-test="continue"]');
  }

  getCheckoutInfoContainer() {
    return this.checkoutInfoContainer;
  }

  async populateInformationForm(firstName, lastName, postalCode) {
    await this.firstNameInput.fill(firstName);
    await this.lastNameInput.fill(lastName);
    await this.postalCodeInput.fill(postalCode);
    await this.continueButton.click();
  }
}

module.exports = { CheckoutInfoPage };