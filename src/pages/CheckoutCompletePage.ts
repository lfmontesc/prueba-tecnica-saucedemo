import { expect, Locator, Page } from "@playwright/test";

export class CheckoutCompletePage {
  readonly labelCheckoutComplete: Locator;

  constructor(page: Page) {
    this.labelCheckoutComplete = page.locator("[data-test='complete-header']");
  }

  async validateCheckoutComplete() {
    await this.labelCheckoutComplete.isVisible();
    await expect(this.labelCheckoutComplete).toHaveText('Thank you for your order!');
  }
}