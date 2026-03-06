import { expect, Locator, Page } from "@playwright/test";
import { logger } from "@utils/logger";
import { createSlug } from "@utils/slugUtils";

export class CartPage {
  readonly products: Locator;
  readonly productsItemName: Locator;
  readonly btnCheckout: Locator;
  readonly labelErrorMessage: Locator;

  constructor(page: Page) {
    this.products = page.locator("[data-test='inventory-item']");
    this.productsItemName = page.locator("[data-test='inventory-item-name']");
    this.btnCheckout = page.locator("[data-test='checkout']");
     this.labelErrorMessage = page.locator("[data-test='error']");
  }

  async removeProductFromCart(productName: string) {
    const productSlug = createSlug(productName);
    const removeCardButton = await this.products.locator(
      `[data-test="remove-${productSlug}"]`,
    );
    await removeCardButton.click();
    logger.info(`Producto "${productName}" removido del carrito.`);
  }

  async validateProductIsVisible(productName: string) {
    const productNames = await this.productsItemName.allTextContents();
    expect(productNames).toContain(productName);
  }

  async validateProductIsNotVisible(productName: string) {
    const productNames = await this.productsItemName.allTextContents();
    expect(productNames).not.toContain(productName);
  }

  async goToCheckout() {
    await this.btnCheckout.click();
  }

   async validateErrorMessage(message: string) {
    await expect(this.labelErrorMessage).toContainText(message);
  }
}
