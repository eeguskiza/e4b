## Agenda de contactos (Vue 3 + Firestore)

SPA para guardar nombres, correos y teléfonos. Persiste en Cloud Firestore vía Vuefire, incluye datos estructurados (Microdata, RDFa, JSON-LD) y metadatos sociales (OG/Twitter). Desplegada en Netlify.

### Estructura
- `src/`: App Vue (`App.vue`, estilos en `style.css`, bootstrap Firebase en `firebase.js`).
- `public/`: `social-card.png` (imagen para OG/Twitter) y assets estáticos.
- `.env.local`: claves `VITE_FIREBASE_*` (no versionar).
- `dist/`: build listo para Netlify.

### Flujo
Firebase (Firestore) → App Vue (Vite) → Netlify (deploy).

### Requisitos
- Node.js 18+ y npm.
- Proyecto Firebase con Firestore.

### Configuración
```bash
cp .env.example .env.local   # rellena las claves VITE_FIREBASE_*
npm install
```

### Ejecutar en local
```bash
npm run dev
```
Abrir http://localhost:5173 y probar altas/borrados (colección `contacts` en Firestore).

### Build de producción
```bash
npm run build
```
Genera `dist/`.

### Despliegue Netlify
- Build: `npm run build`
- Publish dir: `dist`
- Variables: `VITE_FIREBASE_*` (mismas que `.env.local`).
- Metadatos sociales apuntan a `https://e4b-agendavue.netlify.app/social-card.png`.

### Validaciones W3C (logs)
Tras `npm run build`:
```bash
npx html-validator --file dist/index.html --format text > html-validation.log
npx css-validator --profile css3 --warning 0 dist/assets/*.css > css-validation.log
```
- HTML: Page is valid.
- CSS: solo avisos de que las CSS variables no se pueden comprobar estáticamente (sin errores bloqueantes).

### Reglas Firestore
Durante desarrollo puedes abrirlas, pero antes de producción restringe lectura/escritura según tu política (auth o validación de campos).

### Seguridad
No subas `.env.local`. Ajusta reglas de Firestore antes de producción.
