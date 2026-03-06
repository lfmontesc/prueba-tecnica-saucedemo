import { Locator, Page } from "@playwright/test";
import { waitForVisibleAndEnabled } from "@utils/elementUtils";
import { logger } from "@utils/logger";
import { convertPriceToNumber } from "@utils/priceUtils";
import { Product } from "src/interfaces/product";

export class InventoryPage {
  readonly page: Page;
  readonly productsTitle: Locator;
  readonly products: Locator;

  constructor(page: Page) {
    this.page = page;
    this.productsTitle = page.locator("[data-test='title']");

    // Obtener los elementos de los productos
    this.products = page.locator("[data-test='inventory-item']");
  }

  async validateInventoryTitle(expectedTitle: string) {
    logger.info("Verificando que el título del inventory esté presente.");
    const titleText = await this.productsTitle.innerText();
    if (titleText !== expectedTitle) {
      logger.error(
        `El título del inventory page no coincide. Esperado: "${expectedTitle}", pero se obtuvo: "${titleText}"`,
      );
      throw new Error(`El título del inventory Page no coincide: ${titleText}`);
    }
    logger.info(`Título del Inventory Page validado: "${titleText}"`);
  }

  /**
   * Función para validar los productos de la página contra el JSON esperado sin importar el orden.
   *
   * @param page Página de Playwright.
   * @param expectedProducts JSON de productos esperados.
   */
  async validateProductsAgainstJson(page: Page, expectedProducts: Product[]) {
    // Obtener los elementos de los productos
    const productElements = await page.locator('[data-test="inventory-item"]');
    const productCount = await productElements.count();

    const productsFromPage: Product[] = [];

    // Extraer el nombre y el precio de los productos de la página
    for (let i = 0; i < productCount; i++) {
      const productName = await productElements
        .nth(i)
        .locator('[data-test="inventory-item-name"]')
        .innerText();
      const priceText = await productElements
        .nth(i)
        .locator('[data-test="inventory-item-price"]')
        .innerText();
      const price = convertPriceToNumber(priceText); // Usar la función para convertir el precio a número

      await logger.info("ProductName", productName);
      await logger.info("price", price);
      productsFromPage.push({ name: productName, price });
    }

    // Comparar los productos de la página con los del JSON esperado
    expectedProducts.forEach((expectedProduct) => {
      const matchedProduct = productsFromPage.find(
        (product) => product.name === expectedProduct.name,
      );

      if (!matchedProduct) {
        throw new Error(`Producto no encontrado: ${expectedProduct.name}`);
      }

      if (matchedProduct.price !== expectedProduct.price) {
        throw new Error(
          `El precio del producto "${expectedProduct.name}" no coincide. Esperado: $${expectedProduct.price}, pero se obtuvo: $${matchedProduct.price}`,
        );
      }
    });

    logger.info("Todos los productos coinciden con los del JSON");
  }
}
