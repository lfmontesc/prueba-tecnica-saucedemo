import { faker } from "@faker-js/faker";
import { test } from "@fixtures/auth.fixture";
import { CartPage } from "@pages/CartPage";
import { CheckoutStepOnePage } from "@pages/CheckoutStepOnePage";
import { CheckoutStepTwo } from "@pages/CheckoutStepTwo";
test.describe("Pruebas Exploratorias", () => {
  test("001 - Tipo de dato incorrecto en proceso checkout", async ({ page, inventoryPage }) => {
    const postalCode = faker.location.zipCode();

    const product1 = "Sauce Labs Backpack";
    const product2 = "Sauce Labs Fleece Jacket";

    const cartPage = new CartPage(page);
    const checkoutStepOnePage = new CheckoutStepOnePage(page);
    const checkoutStepTwo = new CheckoutStepTwo(page);

    await inventoryPage.addProductToCart(product1);
    await inventoryPage.addProductToCart(product2);

    await inventoryPage.goToCart();

    await cartPage.goToCheckout();
    await checkoutStepOnePage.fillFormStepOne("145667", "6775567", postalCode);

    await checkoutStepTwo.clickToFinish();

    await checkoutStepOnePage.validateErrorMessage("Firsname and Lastname should be texts");
    
  });
  test("002 - Validar Carrito vacio al proceder checkout", async ({ page, inventoryPage }) => {
    const cartPage = new CartPage(page);
    await inventoryPage.goToCart();
    await cartPage.goToCheckout();

    await cartPage.validateErrorMessage("the cart cannot be empty");
  });
});