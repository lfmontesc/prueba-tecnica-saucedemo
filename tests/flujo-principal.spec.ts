import { test } from "@fixtures/auth.fixture";
import { CartPage } from "@pages/CartPage";
import expectedProducts from "src/data/products.json";
import { faker } from "@faker-js/faker";
import { CheckoutStepOnePage } from "../src/pages/CheckoutStepOnePage";
import { CheckoutStepTwo } from "../src/pages/CheckoutStepTwo";
import { CheckoutCompletePage } from "../src/pages/CheckoutCompletePage";

test.describe("Flujo Principal", () => {
  test("002 - Verificar visibilidad y orden de 6 productos", async ({
    page,
    inventoryPage,
  }) => {
    await inventoryPage.validateProductsAgainstJson(
      page,
      expectedProducts.products,
    );
  });

  test("003 - Filtrar productos por orden Ascendente", async ({
    page,
    inventoryPage,
  }) => {
    await inventoryPage.selectSortOption("Price (low to high)");
    await inventoryPage.validateProductOrder(page, "ascendente");
  });

  test("004 - Filtrar productos por orden descendente)", async ({
    page,
    inventoryPage,
  }) => {
    await inventoryPage.selectSortOption("Price (high to low)");
    await inventoryPage.validateProductOrder(page, "descendente");
  });

  test("005 - Seleccionar 2 productos y agregarlos al carrito", async ({
    page,
    inventoryPage,
  }) => {
    const cartPage = new CartPage(page);
    const product1 = "Sauce Labs Backpack";
    const product2 = "Sauce Labs Fleece Jacket";
    await inventoryPage.addProductToCart(product1);
    await inventoryPage.addProductToCart(product2);
    await inventoryPage.goToCart();
    await cartPage.validateProductIsVisible(product1);
    await cartPage.validateProductIsVisible(product2);
  });
  test("006 - Eliminar un producto del carrito y validar", async ({
    page,
    inventoryPage,
  }) => {
    const cartPage = new CartPage(page);
    const product1 = "Sauce Labs Backpack";
    const product2 = "Sauce Labs Fleece Jacket";
    await inventoryPage.addProductToCart(product1);
    await inventoryPage.addProductToCart(product2);
    await inventoryPage.goToCart();
    await cartPage.removeProductFromCart(product2);
    await cartPage.validateProductIsNotVisible(product2);
  });
  test("007 - Completar checkout con datos aleatorios", async ({
    page,
    inventoryPage,
  }) => {
    const randomName = faker.person.fullName();
    const [firstName, lastName] = randomName.split(" ");
    const postalCode = faker.location.zipCode();

    const product1 = "Sauce Labs Backpack";
    const product2 = "Sauce Labs Fleece Jacket";

    const cartPage = new CartPage(page);
    const checkoutStepOnePage = new CheckoutStepOnePage(page);
    const checkoutStepTwo = new CheckoutStepTwo(page);
    const checkoutCompletePage = new CheckoutCompletePage(page);

    await inventoryPage.addProductToCart(product1);
    await inventoryPage.addProductToCart(product2);

    await inventoryPage.goToCart();

    await cartPage.goToCheckout();
    await checkoutStepOnePage.fillFormStepOne(firstName, lastName, postalCode);
    await checkoutStepTwo.clickToFinish();
    await checkoutCompletePage.validateCheckoutComplete();
  });
});
