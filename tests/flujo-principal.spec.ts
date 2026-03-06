import { LoginPage } from "@pages/LoginPage";
import { InventoryPage } from "@pages/InventoryPage";
import { test } from "@playwright/test";
import expectedProducts from "src/data/products.json";

let loginPage: LoginPage;
let inventoryPage: InventoryPage;

test.beforeAll(async ({ page }) => {
  loginPage = new LoginPage(page);
  inventoryPage = new InventoryPage(page);

  // Obtener las variables de entorno
  const username = process.env.USER_NAME || "";
  const password = process.env.PASSWORD || "";

  // Realizar el login solo una vez
  await page.goto("/");
  await loginPage.loginToThePage(username, password);
  // Asegurarnos de que el login fue exitoso verificando el título de la página o algún elemento
  await inventoryPage.validateInventoryTitle("Products");
});

test.describe("Flujo Principal", () => {
  test.skip("001 - Ingresar a la pagina saucedemo con el usuario standard_user", async ({
    page,
  }) => {
    await page.goto("/");

    //Obtener las variables de entorno dentro del archivo de test
    const username = process.env.USER_NAME || "";
    const password = process.env.PASSWORD || "";

    const loginPage = new LoginPage(page);
    const inventoryPage = new InventoryPage(page);

    await loginPage.loginToThePage(username, password);
    // Expect a title "to contain" a substring.
    await inventoryPage.validateInventoryTitle("Products");
  });

  test("002 - Verificar visibilidad y orden de 6 productos", async ({
    page,
  }) => {
    const inventoryPage = new InventoryPage(page);
    await inventoryPage.validateProductsAgainstJson(
      page,
      expectedProducts.products,
    );
  });

  test.skip("003 - Filtrar productos por orden Ascendente", async ({
    page,
  }) => {});

  test.skip("004 - Filtrar productos por orden descendente)", async ({
    page,
  }) => {});
});
