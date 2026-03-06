import { Locator } from "@playwright/test";

/**
 * Función para esperar que el elemento sea visible y habilitado antes de interactuar con él.
 *
 * @param {Locator} element - El elemento de Playwright al cual se le realizará la espera.
 * @throws {Error} Lanza un error si el elemento no está habilitado después de ser visible.
 *
 */
export async function waitForVisibleAndEnabled(element: Locator) {
  await element.waitFor({ state: "visible" });
  const isEnabled = await element.isEnabled();
  if (!isEnabled) {
    throw new Error("El elemento no está habilitado");
  }
}