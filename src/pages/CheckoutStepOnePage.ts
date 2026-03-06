import { expect, Locator, Page } from "@playwright/test";
import { waitForVisibleAndEnabled } from "@utils/elementUtils";

export class CheckoutStepOnePage {
  readonly inputFirstName: Locator;
  readonly inputLastName: Locator;
  readonly inputPostalCode: Locator;
  readonly btnContinue: Locator;
  readonly labelErrorMessage: Locator;

  constructor(page: Page) {
    this.inputFirstName = page.locator("[data-test='firstName']");
    this.inputLastName = page.locator("[data-test='lastName']");
    this.inputPostalCode = page.locator("[data-test='postalCode']");
    this.btnContinue = page.locator("[data-test='continue']");
    this.labelErrorMessage = page.locator("[data-test='error']");
  }

  async fillFormStepOne(
    firstName: string,
    lastName: string,
    postalCode: string,
  ) {
    await waitForVisibleAndEnabled(this.inputFirstName);
    await this.inputFirstName.fill(firstName);
    await waitForVisibleAndEnabled(this.inputLastName);
    await this.inputLastName.fill(lastName);
    await waitForVisibleAndEnabled(this.inputPostalCode);
    await this.inputPostalCode.fill(postalCode);
    await this.btnContinue.click();
  }

  async validateErrorMessage(message: string) {
    await expect(this.labelErrorMessage).toContainText(message);
  }
}
