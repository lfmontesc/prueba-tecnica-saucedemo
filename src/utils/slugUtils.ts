/**
 * Convierte un nombre de producto a un formato slug, reemplazando espacios por guiones y convirtiendo a minúsculas.
 *
 * @param productName Nombre del producto (ej. "Sauce Labs Backpack")
 * @returns El nombre del producto convertido a slug (ej. "sauce-labs-backpack")
 */
export function createSlug(productName: string): string {
  return productName
    .toLowerCase()  // Convierte todo a minúsculas
    .replace(/\s+/g, '-')  // Reemplaza todos los espacios por guiones
    .replace(/[^\w\-]+/g, '');  // Elimina caracteres no alfanuméricos o guiones
}