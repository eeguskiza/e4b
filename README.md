## Agenda de contactos (Vue 3 + Firestore)

Aplicación de una sola página para guardar nombres, correos y teléfonos. Usa Vue 3 con Vuefire para persistir en Cloud Firestore y añade marcado semántico (Microdata, RDFa, JSON-LD) y metadatos sociales listos para validadores W3C y despliegue en Netlify.

### Stack
- Vue 3 + Vite
- Vuefire (Firestore)
- CSS plano, sin frameworks
- Datos estructurados (Microdata/RDFa/JSON-LD) y OG/Twitter cards

### Requisitos
- Node.js 18+ y npm
- Proyecto de Firebase con Firestore habilitado

### Configuración
1. Crea el archivo de entorno y rellena tus claves de Firebase:
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
Abre la URL que muestre Vite (por defecto http://localhost:5173) y prueba a crear/borrar contactos. Se guardan en la colección `contacts` de Firestore.

### Build de producción
```bash
npm run build
```
Genera `dist/`, lista para servir en Netlify.

### Despliegue en Netlify
- Build command: `npm run build`
- Publish directory: `dist`
- Variables de entorno: añade en Netlify todas las `VITE_FIREBASE_*` de tu `.env.local`.
- Ajusta en `index.html` la URL/imagen de metadatos (`https://example.com/e4b-agenda`) a tu dominio de Netlify.

### Reglas de Firestore
Durante desarrollo puedes abrir reglas para probar, pero antes de publicar restringe lectura/escritura (p. ej. a usuarios autenticados o validando campos).

### Rúbrica E4b (cubre ambos opcionales)
- SPA Vue: listado, alta y borrado sin recarga.
- Persistencia: Firestore vía Vuefire.
- Microdatos, RDFa y JSON-LD + metadatos sociales (OG/Twitter).
- CSS y HTML preparados para pasar validadores W3C.

### Seguridad
No subas `.env.local` al repositorio público. Configura reglas de Firestore acordes al entorno de producción.
