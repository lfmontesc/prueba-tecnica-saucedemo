# Prueba Técnica - Automatización SauceDemo

## 1. Introducción

Este proyecto contiene una suite de pruebas automatizadas de extremo a extremo (E2E) para la aplicación web [SauceDemo](https://www.saucedemo.com), desarrollada como parte de una prueba técnica. La automatización está construida con **Playwright** y **TypeScript**, siguiendo el patrón **Page Object Model (POM)** para mantener el código organizado, reutilizable y fácil de mantener.

### Tecnologías utilizadas

| Herramienta | Versión | Propósito |
|---|---|---|
| [Playwright](https://playwright.dev/) | ^1.58.2 | Framework de automatización E2E |
| TypeScript | ^5.9.3 | Tipado estático |
| Allure Playwright | ^3.6.0 | Generación de reportes |
| Winston | ^3.19.0 | Logging |
| dotenv | ^17.3.1 | Gestión de variables de entorno |

---

## 2. Propósito

El objetivo de este proyecto es validar los flujos principales de la plataforma SauceDemo, incluyendo:

- Autenticación de usuarios
- Visualización y verificación de productos en el inventario
- Ordenamiento de productos por precio (ascendente y descendente)
- Agregar productos al carrito de compras

La suite está diseñada para ejecutarse en múltiples navegadores (Chromium, Firefox y WebKit) de forma paralela, garantizando compatibilidad cross-browser.

---

## 3. Instalación

### Requisitos previos

- [Node.js](https://nodejs.org/) v18 o superior
- npm v9 o superior

### Pasos

**1. Clonar el repositorio**

```bash
git clone <url-del-repositorio>
cd prueba-tecnica-saucedemo
```

**2. Instalar dependencias**

```bash
npm install
```

**3. Instalar los navegadores de Playwright**

```bash
npx playwright install
```

**4. Configurar las variables de entorno**

Crear un archivo `.env` en la raíz del proyecto con las siguientes variables:

```env
BASE_URL=https://www.saucedemo.com
USER_NAME=standard_user
PASSWORD=secret_sauce
```

---

## 4. Cómo ejecutar las pruebas

### Ejecutar todos los tests

```bash
npx playwright test
```

### Ejecutar en un navegador específico

```bash
# Solo Chromium
npx playwright test --project=chromium

# Solo Firefox
npx playwright test --project=firefox

# Solo WebKit (Safari)
npx playwright test --project=webkit
```

### Ejecutar un archivo de test específico

```bash
npx playwright test tests/flujo-principal.spec.ts
```

### Ejecutar en modo UI (interfaz visual)

```bash
npx playwright test --ui
```

### Ejecutar en modo debug

```bash
npx playwright test --debug
```

---

## 5. Cómo ver los reportes

El proyecto genera dos tipos de reportes tras cada ejecución.

### Reporte HTML de Playwright

Se genera automáticamente al finalizar la ejecución. Para abrirlo:

```bash
npx playwright show-report
```

El reporte se encuentra en la carpeta `playwright-report/`.

### Reporte Allure

**1. Ejecutar las pruebas** (los resultados se guardan en `allure-results/`)

```bash
npx playwright test
```

**2. Generar el reporte**

```bash
npx allure generate allure-results --clean -o allure-report
```

**3. Abrir el reporte en el navegador**

```bash
npx allure open allure-report
```

---

## Estructura del proyecto

```
prueba-tecnica-saucedemo/
├── src/
│   ├── data/           # Datos de prueba en JSON
│   ├── fixtures/       # Fixtures de Playwright (autenticación, etc.)
│   ├── interfaces/     # Tipos e interfaces TypeScript
│   ├── pages/          # Page Objects (POM)
│   └── utils/          # Utilidades y helpers
├── tests/              # Archivos de test (.spec.ts)
├── .env                # Variables de entorno (no subir al repo)
├── playwright.config.ts
└── tsconfig.json
```
