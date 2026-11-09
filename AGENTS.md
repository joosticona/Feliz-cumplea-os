# Instrucciones para el Proyecto

Guía de desarrollo y estándares de codificación para agentes y colaboradores que trabajan en este repositorio.

## Reglas de desarrollo y reutilización de componentes

- **Componentes independientes y reutilizables**:
  Cada elemento de la interfaz —botones, imágenes, textos, títulos, subtítulos y cualquier otro tipo de elemento visual o funcional— debe implementarse como un componente independiente, único y reutilizable cuando corresponda.

- **Reutilización obligatoria en páginas y secciones**:
  Cada página debe reutilizar los componentes existentes. Si necesita un componente que aún no existe, debe crearse de forma reutilizable para que pueda utilizarse en otras páginas o secciones.

- **Prioridad de CSS nativo para efectos y animaciones**:
  Para cualquier animación, transición, transformación o efecto visual, se debe priorizar CSS nativo (por ejemplo, `transition`, `animation`, `transform` y `@keyframes`) antes que JavaScript o librerías externas. Solo utilizar JavaScript o una librería de animación cuando CSS no permita implementar adecuadamente el comportamiento requerido. Respetar siempre la preferencia de movimiento reducido mediante `prefers-reduced-motion`.

## Herramientas y Comandos

El proyecto utiliza **Bun** como entorno de ejecución y gestor de paquetes, junto con **Astro**, **ESLint** y **Prettier**.

- **Instalar dependencias**: `bun install`
- **Servidor de desarrollo**: `bun run dev`
- **Compilación de producción**: `bun run build`
- **Previsualizar producción**: `bun run preview`
- **Verificación de linting**: `bun run lint`
- **Corrección automática de linting**: `bun run lint:fix`
- **Formatear código**: `bun run format`
- **Comprobar formato**: `bun run format:check`
