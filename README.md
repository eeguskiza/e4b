## Agenda Vue · E4b

SPA de agenda de contactos con Vue 3, Vuefire y Firestore. Incluye microdatos, RDFa, JSON-LD y metadatos sociales listos para validación W3C y despliegue en Netlify.

### Requisitos
- Node.js 18+ y npm.
- Un proyecto de Firebase con Firestore habilitado.

### Configuración
1. Copia las variables de entorno y rellena tus claves Firebase:
   ```bash
   cp .env.example .env.local
   # edita .env.local con los valores de tu consola Firebase
   ```
2. Instala dependencias:
   ```bash
   npm install
   ```

### Ejecutar en local
```bash
npm run dev
```
Abre la URL que indique Vite (por defecto http://localhost:5173).

### Build de producción
```bash
npm run build
```
La carpeta `dist/` queda lista para publicar en Netlify.

### Despliegue en Netlify
- Crea un sitio en Netlify apuntando a esta carpeta.
- Build command: `npm run build`
- Publish directory: `dist`
- Añade en “Environment variables” los valores de `.env.local` (`VITE_FIREBASE_*`).
- Sustituye en `index.html` la URL/imagen de ejemplo (`https://example.com/e4b-agenda` / `social-card.png`) por la URL real de Netlify para los metadatos sociales.

### Qué incluye (para la rúbrica)
- SPA con Vue 3: listar, crear y borrar contactos sin recargar.
- Persistencia: Firestore vía Vuefire (colección `contacts`).
- Datos estructurados: microdatos en formulario/listado, RDFa en `<body>`, JSON-LD en `index.html`.
- Metadatos sociales: Open Graph y Twitter card en `index.html`.
- Estilos: CSS propio sin dependencias externas, orientado a pasar el validador W3C.

### Nota de seguridad
No subas `.env.local` al repositorio. Configura reglas de seguridad en Firestore según tus necesidades.
