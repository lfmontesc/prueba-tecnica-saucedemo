import { test as base } from "@playwright/test";
import { LoginPage } from "@pages/LoginPage";
import { InventoryPage } from "@pages/InventoryPage";

type AuthFixtures = {
  loginPage: LoginPage;
  inventoryPage: InventoryPage;
};

export const test = base.extend<AuthFixtures>({
  loginPage: async ({ page }, use) => {
    await use(new LoginPage(page));
  },

  inventoryPage: async ({ page, loginPage }, use) => {
    const username = process.env.USER_NAME || "";
    const password = process.env.PASSWORD || "";

    await page.goto("/");
    await loginPage.loginToThePage(username, password);

    const inventoryPage = new InventoryPage(page);
    await inventoryPage.validateInventoryTitle("Products");

    await use(inventoryPage);
  },
});

export { expect } from "@playwright/test";
