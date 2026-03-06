import { Locator, Page } from "@playwright/test";
import { waitForVisibleAndEnabled  } from "@utils/elementUtils";
import { logger } from "@utils/logger";

export class LoginPage {
  readonly page: Page;
  readonly inputUsername: Locator;
  readonly inputPassword: Locator;
  readonly btnLogin: Locator;

  constructor(page: Page) {
    this.page = page;
    this.inputUsername = page.locator("[data-test='username']");
    this.inputPassword = page.locator("[data-test='password']");
    this.btnLogin = page.locator("[data-test='login-button']");
  }

  async loginToThePage(username: string, password: string) {
    logger.info("Iniciando proceso de login...");
    await waitForVisibleAndEnabled(this.inputUsername);
    await this.inputUsername.fill(username);

    await waitForVisibleAndEnabled(this.inputPassword);
    await this.inputPassword.fill(password);

    await waitForVisibleAndEnabled(this.btnLogin);
    await this.btnLogin.click();
    logger.info("Login realizado con éxito");
  }
}
