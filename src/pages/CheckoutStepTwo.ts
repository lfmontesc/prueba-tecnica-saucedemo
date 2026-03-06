import { Locator, Page } from "@playwright/test";

export class CheckoutStepTwo {
  readonly btnFinish: Locator;

  constructor(page: Page) {
    this.btnFinish = page.locator("[data-test='finish']");
  }

  async clickToFinish() {
    await this.btnFinish.click();
  }
}
