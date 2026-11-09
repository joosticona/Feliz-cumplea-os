# Feliz cumpleaños, Anahí ♡

Web de regalo de cumpleaños, construida con **Astro + HTML + CSS + JavaScript**. No requiere backend ni base de datos.

## Abrir la sorpresa sin instalar nada

Entra en `vista-previa/` y haz doble clic en **`index.html`**. Esta versión ya incluye HTML, CSS y JavaScript listos para abrir en Chrome, Edge o Firefox. No necesitas Node.js para verla o compartir esos archivos.

## Ejecutar el proyecto Astro en tu computadora

1. Instala [Node.js](https://nodejs.org/) versión 20.3 o superior.
2. Descomprime este ZIP y abre la carpeta del proyecto en VS Code.
3. En la terminal, ejecuta:

```bash
npm install
npm run dev
```

4. Abre la URL que aparece en la terminal (habitualmente `http://localhost:4321`).

## Generar archivos listos para subir a internet

```bash
npm run build
```

Astro crea la carpeta `dist/`. Puedes subirla a Cloudflare Pages o cualquier hosting de páginas estáticas.

### Cloudflare Pages

- Framework preset: **Astro**
- Build command: **`npm run build`**
- Build output directory: **`dist`**

## Personalizar el regalo

- **Nombre, textos, carta, dedicatoria y tarjetas:** `src/data/content.js` (al cambiar los textos del proyecto Astro, genera una nueva compilación para ver los cambios; la vista previa incluida es una copia lista para abrir).
- **Colores, tipografías y animaciones:** `src/styles/global.css`
- **Botones, velas, confeti, deseos, música:** `src/scripts/experience.js`
- **Estructura de secciones (Astro/HTML):** `src/pages/index.astro`

## Interacciones incluidas

- Pantalla de bienvenida animada con botón de entrada.
- Música de cumpleaños sintetizada en el navegador, con control de sonido y sin archivos de audio externos.
- Pastel de cumpleaños con velas que se apagan y se pueden volver a encender.
- Seis tarjetas de amor que se giran al tocarlas.
- Cielo de deseos: escribe uno y mira cómo aparece en la página (solo se conserva durante la visita; no se envía a un servidor).
- Sobre con carta romántica desplegable.
- Regalo sorpresa, confeti y mensaje final.
- Animaciones de desplazamiento y diseño responsivo con soporte de movimiento reducido.

**Nota:** La vista previa incluida es un export estático de esta misma experiencia. Los sonidos requieren interacción previa del usuario debido a las restricciones de reproducción automática en navegadores. Las fuentes Google Fonts requieren internet; hay tipografías alternativas locales.
