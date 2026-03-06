import { LoginPage } from "@pages/LoginPage";
import test from "@playwright/test";

test.describe("Edge Cases", () => {
  test("001 - Login con campos vacíos", async ({ page }) => {
    await page.goto("/");
    const loginPage = new LoginPage(page);
    await loginPage.clickOnLogin();
    await loginPage.validateErrorMessage("Username is required");
  });
  test("002 - Login con usuario inválido involuntariamente", async ({ page }) => {
    await page.goto("/");
    const loginPage = new LoginPage(page);
    await loginPage.fillForm("std_user", "secret_sau");
    await loginPage.validateErrorMessage("Username and password do not match any user in this service");
  });
});
