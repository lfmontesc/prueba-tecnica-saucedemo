/**
 * Convierte un precio en formato de texto con el signo '$' a un número.
 *
 * @param priceText El precio en formato texto (ej. "$29.99").
 * @returns El precio convertido a número (ej. 29.99).
 */
export function convertPriceToNumber(priceText: string): number {
  // Eliminar el signo '$' y los espacios adicionales, luego convertirlo a número
  const price = parseFloat(priceText.replace('$', '').trim());

  if (isNaN(price)) {
    throw new Error(`El precio no es válido: ${priceText}`);
  }

  return price;
}