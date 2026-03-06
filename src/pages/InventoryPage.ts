import { expect, Locator, Page } from "@playwright/test";
import { waitForVisibleAndEnabled } from "@utils/elementUtils";
import { logger } from "@utils/logger";
import { convertPriceToNumber } from "@utils/priceUtils";
import { createSlug } from "@utils/slugUtils";
import { Product } from "src/interfaces/product";

export class InventoryPage {
  readonly page: Page;
  readonly productsTitle: Locator;
  readonly products: Locator;
  readonly productSortDropdown: Locator;
  readonly btnCart: Locator;

  constructor(page: Page) {
    this.page = page;
    this.productsTitle = page.locator("[data-test='title']");
    this.productSortDropdown = page.locator(
      '[data-test="product-sort-container"]',
    );
    this.btnCart = page.locator("[data-test='shopping-cart-link']");
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
      const price = convertPriceToNumber(priceText);
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

  /**
   * Función para validar el orden de los productos y sus precios.
   *
   * @param products Listado de productos en la página.
   * @param expectedOrder El tipo de orden esperado: "ascendente" o "descendente".
   * @param page Página de Playwright.
   */
  async validateProductOrder(
    page: Page,
    expectedOrder: "ascendente" | "descendente" = "ascendente",
  ) {
    // Obtener el listado de los productos (nombre y precio)
    const productElements = await page.locator('[data-test="inventory-item"]');
    const productCount = await productElements.count();

    const products: Product[] = [];

    for (let i = 0; i < productCount; i++) {
      const name = await productElements
        .nth(i)
        .locator('[data-test="inventory-item-name"]')
        .innerText();
      const priceText = await productElements
        .nth(i)
        .locator('[data-test="inventory-item-price"]')
        .innerText();
      const price = convertPriceToNumber(priceText);

      products.push({ name, price });
    }

    // Ordenar los productos según el tipo de orden especificado
    const sortedProducts = [...products].sort((a, b) => {
      if (expectedOrder === "ascendente") {
        return a.price - b.price; // Orden ascendente por precio
      } else {
        return b.price - a.price; // Orden descendente por precio
      }
    });

    // Validar que los productos en la página estén ordenados correctamente
    for (let i = 0; i < productCount; i++) {
      const product = products[i];
      const sortedProduct = sortedProducts[i];

      // Validar que el nombre y el precio coinciden con el orden esperado
      if (
        product.name !== sortedProduct.name ||
        product.price !== sortedProduct.price
      ) {
        throw new Error(
          `Error en el orden de los productos. El producto "${sortedProduct.name}" no está en la posición correcta.`,
        );
      }
    }

    console.log(`Productos validados correctamente en orden ${expectedOrder}.`);
  }

  /**
   * Selecciona una opción en el dropdown de productos.
   * Puede seleccionar por el valor del atributo `value` o por el texto visible de la opción.
   *
   * @param option El texto o el valor de la opción que se quiere seleccionar.
   */
  async selectSortOption(option: string) {
    await this.productSortDropdown.waitFor({ state: "visible" });
    await this.productSortDropdown.selectOption({ label: option });
  }

  async addProductToCart(productName: string) {
    const productSlug = createSlug(productName);
    const addToCartButton = await this.products.locator(
      `[data-test="add-to-cart-${productSlug}"]`,
    );
    await addToCartButton.click();
    logger.info(`Producto "${productName}" agregado al carrito.`);
  }

  async goToCart() {
    await this.btnCart.click();
  }
}
