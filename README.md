# Feliz cumpleaños, Anahí ♡

Web de regalo de cumpleaños, construida con **Astro 7 + HTML + CSS + JavaScript** y empaquetada con **Bun**. No requiere backend ni base de datos.

## 🌐 Demo en vivo (Cloudflare Pages)

El proyecto se encuentra publicado y accesible públicamente en:
**[https://cumpleanios-anahi.pages.dev/](https://cumpleanios-anahi.pages.dev/)**

## Abrir la sorpresa sin instalar nada

Entra en `vista-previa/` y haz doble clic en **`index.html`**. Esta versión ya incluye HTML, CSS y JavaScript listos para abrir en Chrome, Edge o Firefox. No necesitas instalar nada para verla o compartir esos archivos.

## Ejecutar el proyecto en tu computadora

El proyecto utiliza [Bun](https://bun.sh/) como entorno de ejecución y gestor de paquetes.

1. Instala Bun (o Node.js 22+).
2. En la terminal de la raíz del proyecto, ejecuta:

```bash
bun install
bun run dev
```

3. Abre la URL local que aparece en la terminal (habitualmente `http://localhost:4321`).

## Comandos disponibles

- **Instalar dependencias:** `bun install`
- **Servidor de desarrollo:** `bun run dev`
- **Compilar para producción:** `bun run build`
- **Previsualizar producción:** `bun run preview`
- **Verificar formato:** `bun run format:check`
- **Formatear código:** `bun run format`
- **Verificar linting:** `bun run lint`
- **Corregir linting:** `bun run lint:fix`

## Despliegue en Cloudflare Pages

El sitio se compila como salida estática en `dist/`:

```bash
bun run build
bun x wrangler pages deploy dist --project-name cumpleanios-anahi --branch main
```

## Arquitectura y Componentes Reutilizables

El proyecto sigue una arquitectura modular en `src/components/` respetando las directrices de `AGENTS.md`:

- **`src/components/ui/`**: Componentes base reutilizables (`Button.astro`, `SectionHeading.astro`, `SectionDescription.astro`).
- **`src/components/layout/`**: Estructura principal (`BaseLayout.astro`, `Navbar.astro`, `Footer.astro`).
- **`src/components/visual/`**: Componentes interactivos e ilustrados (`HeroVisual.astro`, `Cake.astro`, `Candle.astro`, `ReasonCard.astro`, `LetterEnvelope.astro`, `LetterPaper.astro`, `GiftBox.astro`).
- **`src/components/sections/`**: Secciones organizadas de la página (`WelcomeOverlay.astro`, `HeroSection.astro`, `Ticker.astro`, `WishSection.astro`, `ReasonsSection.astro`, `SkySection.astro`, `LetterSection.astro`, `GiftSection.astro`).

## Personalizar el regalo

- **Nombre, dedicatoria, carta y tarjetas:** `src/data/content.js`
- **Colores, tipografías y animaciones (CSS nativo):** `src/styles/global.css`
- **Lógica de sonido Web Audio, confeti y deseos:** `src/scripts/experience.js`
- **Estructura de la página principal:** `src/pages/index.astro`

## Interacciones incluidas

- Pantalla de bienvenida animada con botón de entrada.
- Música de cumpleaños sintetizada en el navegador (Web Audio API), con control de sonido y sin archivos externos.
- Barra de navegación _sticky_ con efecto cristal para control de música en todo momento.
- Pastel de cumpleaños interactivo con velas que se apagan, simulación de humo suave y botón para volver a encender.
- Seis tarjetas de amor giratorias en 3D (diseño responsive adaptado a móviles).
- Cielo de deseos interactivo con estrellas fugaces locales.
- Sobre ilustrado animado con carta romántica desplegable.
- Regalo sorpresa final con confeti y mensaje.
- Soporte para preferencias de movimiento reducido (`prefers-reduced-motion`).
