# Manifiesto de Implementación — Landing EXPO LOGÍSTICA 2026 · CLN

> Manifiesto completo de la landing de la Comunidad Logística Nicaragüense (CLN): contexto,
> stack, arquitectura, sistema de diseño, páginas, contenidos, componentes, datos, backend,
> configuración y pendientes. Documento vivo de referencia para mantenimiento y evolución.

Última actualización: septiembre 2026

---

## 1. Contexto del proyecto

**EXPO LOGÍSTICA 2026 · CLN** es la landing oficial del evento de cierre anual de la Comunidad
Logística Nicaragüense. El proyecto se construyó como una reimplementación moderna de un concepto
inspirado en el evento hermano de El Salvador (referencia: `docs/registro.html`,
`docs/analisis-tecnico-expologistica-v4.md`), adaptado a CLN y Managua.

### Datos clave del evento (fuente: `web/src/lib/event.ts`)

| Campo | Valor |
|---|---|
| Nombre | EXPO LOGÍSTICA 2026 · CLN |
| Slogan | El gran encuentro anual de la Comunidad Logística Nicaragüense |
| Tagline | La Logística de alto nivel de Nicaragua y C.A se encuentra aquí |
| Leema | APRENDER · CONECTAR · COMPARTIR |
| Hashtag | #SoyCLN |
| Slogan CLN | Conectando Profesionales, Potenciando la Logística. |
| Fecha | Viernes 20 de noviembre 2026 (hora 8:00 a.m. – 6:00 p.m.) |
| Lugar | DoubleTree by Hilton · Managua, Nicaragua |
| Contacto | Mayerling Cervantes (Líder Organizadora) — cln@nilogistic.com · +505 8493 6257 |

### Tarifas oficiales (Consolidadas en `/registro` y el correo)

| Pase | Asociado CLN | No Asociado | IVA |
|---|---|---|---|
| Piso de exhibición | Sin costo | Sin costo | — |
| Congreso | $100 | $150 | + 15% IVA, por persona |
| VIP & Networking | $180 | $210 | + 15% IVA, por persona |

Cupo limitado: 300 accesos entre Congreso + VIP.

---

## 2. Stack tecnológico

- **Framework:** Next.js 16 (App Router, build con Turbopack) — `web/package.json`
- **UI:** React (compatible 19), TypeScript 5
- **Estilos:** Tailwind CSS v4 (configuración inline vía `@theme` en `globals.css`, sin `tailwind.config`)
- **Fuentes:** Google Fonts `Inter` (sans) y `Manrope` (headings) autohospedadas con `next/font/google`
- **Base de datos:** @vercel/postgres (sql tag paramétrico)
- **Emails transaccionales:** Resend + @react-email (`RegistrationEmail`)
- **Observabilidad:** @vercel/analytics (Web Analytics) + @vercel/speed-insights
- **Proxy/edge:** Next.js middleware sin runtime de Edge (`proxy.ts` con auth básica)
- **Despliegue:** Vercel (previsto) — Vercel Postgres + variables de entorno `POSTGRES_URL`,
  `RESEND_API_KEY`, `ADMIN_PASSWORD`

---

## 3. Arquitectura

- **App Router** en `web/src/app/`: layouts server, páginas por carpeta, `"use client"` solo donde hay
  interacción (Navbar, galería, registro, página de ponentes, SponsorMap).
- **Shell global** (`web/src/app/layout.tsx`): `<html lang="es">` con fuentes (variables
  `--font-inter`, `--font-manrope`), `scroll-smooth`, body flex-col con `Navbar` + `<main>` +
  `Footer` + `SpeedInsights` + `Analytics`. Metadata raíz global.
- **Server Actions:** `web/src/app/actions/register.ts` (`submitRegistration`) — flujo completo
  registro → tabla `registrations` → email → revalidación.
- **Middlewares/proxy:** `web/src/proxy.ts` implementa **Basic Auth** sobre `/admin/:path*`
  (usuario `admin`, contraseña `ADMIN_PASSWORD`); se ejecuta también en "middleware file" del nuevo
  Next — verificado por el build.
- **Datos en módulos TS** (`src/lib/*`): constantes del evento (`event.ts`), galería (`gallery.ts`).
- **Componentes externos al app router:** `components/`, `emails/`, `lib/`, `actions/`.

### Flujo de registro (backend)

1. Cliente (`registro/page.tsx`) arma `FormData` (incluye `ticketType` e `isMember` desde estado local).
2. Server Action `submitRegistration` valida campos requeridos, crea la tabla `registrations` si no
   existe y hace `INSERT`.
3. Si `RESEND_API_KEY` está configurada, envía el correo `RegistrationEmail` al inscrito; si no,
   solo lo avisa en consola.
4. `revalidatePath('/registro')` y devuelve `{ success }`.
5. UI muestra estado "Registro Exitoso" con botón de retorno a inicio.

### Panel admin (protegido por Basic Auth)

- `web/src/app/admin/registros/page.tsx` (`force-dynamic`): tarjetas de resumen (Total, VIP, Congreso,
  Piso) + tabla con fecha, nombre, contacto, empresa/cargo, pase y condición de socio.
- `web/src/app/admin/export/route.ts` (`force-dynamic`): devuelve CSV descargable
  `EXPO_LOGISTICA_CLN_YYYY-MM-DD.csv` con cabeceras ID, Fecha, Nombre, Email, Empresa, Cargo,
  Tipo de Pase, Socio CLN (escapado correcto de comillas).

---

## 4. Estructura de archivos

```
expologistico/
├─ docs/                      → análisis de referencia + manifiesto
│  ├─ registro.html / analisis-tecnico-expologistica-v4.md   (referencia El Salvador)
│  └─ manifiesto-landing-expologistica-2026.md               (este documento)
└─ web/                       → aplicación Next.js
   ├─ next.config.ts          → images.remotePatterns (nilogistic.com/wp-content/uploads/**)
   ├─ middleware.ts (proxy)   → src/proxy.ts
   ├─ public/                 → logo-horizontal.jpg, logo-vertical.png, hero_logistics.png
   │                            (poster del hero), videoheroinicio.mp4
   └─ src/
      ├─ app/
      │  ├─ layout.tsx        → shell global (fuentes, Navbar, Footer, analytics)
      │  ├─ page.tsx          → / (home)
      │  ├─ globals.css       → tema Tailwind v4 + keyframes media-in/media-out
      │  ├─ icon.png          → favicon
      │  ├─ agenda/page.tsx   → agenda (server)
      │  ├─ ponentes/page.tsx → ponentes + agenda interactiva (client)
      │  ├─ patrocinadores/page.tsx → patrocinadores (server, usa SponsorMap)
      │  ├─ registro/page.tsx → registro (client)
      │  ├─ actions/register.ts          → Server Action de inscripción
      │  └─ admin/{registros,export}/    → panel + export CSV
      ├─ components/
      │  ├─ Navbar.tsx        → navegación + countdown + info bar (client)
      │  ├─ Footer.tsx        → footer global
      │  ├─ HeroVideo.tsx     → video del hero del home
      │  ├─ SponsorMap.tsx    → plano SVG interactivo de stands (client)
      │  └─ NetworkingGallery.tsx → slideshow + modal (client)
      ├─ emails/RegistrationEmail.tsx   → correo de confirmación (@react-email)
      ├─ lib/event.ts         → constantes del evento + EVENT_HIGHLIGHTS
      ├─ lib/gallery.ts       → catálogo de la galería (53 items, 4 videos)
      └─ proxy.ts             → Basic Auth para /admin
```

---

## 5. Sistema de diseño y tema

### Paleta corporativa CLN (Tailwind v4, `@theme inline` on `globals.css`)

| Token | Valor | Uso |
|---|---|---|
| `cln-50` | #f0f7ff | fondos muy claros / avatares |
| `cln-100` | #e0effe | acentos claros, tags, bullet bg |
| `cln-200` | #bae0fd | texto claro sobre fondo azul |
| `cln-300` | #7dc5fb | textos secundarios sobre oscuro |
| `cln-400` | #38a5f8 | detalles |
| `cln-500` | #0f8be7 | primario; botones, bordes, selección |
| `cln-600` | #026cc6 | links, botones secundarios |
| `cln-700` | #0356a1 | texto acento |
| `cln-800` | #074985 | detalles |
| `cln-900` | #00345b | info bar, bandas oscuras |
| `cln-950` | #06213a | heroes, CTA finales, footer |

**Acento naranja:** `orange-400/500/600` (CTAs, kickers, tags destacados).
Escala completa de Tailwind para neutros (gray), amber, emerald, slate accesible.

### Tipografía

- `--font-sans: Inter` — cuerpo general.
- `--font-heading: Manrope` — títulos y highlights (`font-heading`), usualmente `font-extrabold`/`font-black`.

### Formatos y estilos recurrentes (patrones verificados en todas las páginas)

- Contenedores: `max-w-7xl mx-auto px-4 sm:px-6 lg:px-8`.
- **Hero de página interna:** `section.relative.bg-cln-950.min-h-[600px] md:min-h-[700px] flex items-center`
  con patrón de puntos via estilo inline
  `radial-gradient(circle, #fff 1px, transparent 1px); background-size: 36px 36px; opacity: .045`.
  Cenit alineado, badge pill `bg-cln-500/20 text-cln-300 border-cln-500/30 backdrop-blur`,
  h1 con palabra en degrade `from-cln-300 to-cln-500 bg-clip-text text-transparent`,
  párrafo `text-cln-200 font-light`, CTAs: primario `bg-orange-500 rounded-lg` +
  secundario `border-white/30 backdrop-blur-sm rounded-lg`.
- **Encabezado de sección (patrón):** `grid grid-cols-1 lg:grid-cols-2 gap-6 lg:gap-16 items-end mb-12`
  → izquierda: kicker `text-sm font-bold uppercase tracking-widest text-orange-500`,
  h2 `font-heading font-extrabold text-3xl md:text-5xl text-cln-950 leading-tight`;
  derecha: párrafo `text-xl font-medium text-gray-600 lg:text-right`.
- Tarjetas: `rounded-xl bg-white border border-gray-100 shadow-md hover:shadow-xl hover:border-cln-300`.
- **CTA final:** `bg-cln-950 py-16 md:py-20 text-center`, h2 blanco `font-heading`,
  texto `text-cln-200 font-light`, botón `rounded-full bg-orange-500`.
- Timeline (agenda): columna de horas `w-20 md:w-24` + línea vertical + tarjetas `border-l-4` por tipo.
- Modales: fondo `bg-cln-950/80 backdrop-blur-sm`, tarjeta `bg-white rounded-2xl shadow-2xl`,
  animación `modalIn .22s cubic-bezier(.16,1,.3,1)`, cierre por clave (Esc), foco inicial y
  bloqueo de scroll del body.
- Chevrons/íconos: SVGs inline (Heroicons estilo outline).

### Animaciones globales (`globals.css`)

- `media-in` (opacity 0→1 + scale 1.04→1, 0.9s ease-out) y `media-out` (fade-out, 0.9s):
  usados por `animate-media-in` / `animate-media-out` en `NetworkingGallery`.

---

## 6. Páginas y contenidos

### 6.1 `/` — Inicio (server, `page.tsx`)

| Sección | Contenido |
|---|---|
| Hero | `HeroVideo` a pantalla completa + overlay `bg-cln-950/70 mix-blend-multiply` y gradiente inferior; badge CLN·#SoyCLN; H1 "EXPO LOGÍSTICA 2026"; slogan + tagline; fecha·hora·lugar; lema; CTAs "Reservar mi acceso" / "Ver Programa" |
| Info cards | 3 tarjetas con borde superior `cln-500`, icono circular `bg-cln-50`, sobrepuestas (`-mt-24`): Fecha, Lugar, Prioridad a Miembros CLN |
| Motto band | `bg-cln-900`, lema grande + subtítulo + hashtag |
| Qué viviremos | Kicker "¿Qué viviremos?" + grid de `EVENT_HIGHLIGHTS` (6 items) con cover (foto o gradiente + ícono), tag en pill naranja, subtitle, descripción y CTA de link |
| Networking Preview | Dos columnas: `NetworkingGallery` (izq, 50%) + texto/derecha con bullets de check y CTAs "Ver ponentes" / "Conoce a los patrocinadores" |
| CTA final | Fondo `cln-950`, "Asegura tu lugar…" + CTAs redondos |

Highlight icons mapeados por índice: magistral, chain, sponsors, networking, premios, coctel.

### 6.2 `/agenda` — Agenda (server)

- **Hero:** "Programa oficial — Viernes 20 de noviembre" + botón "Reservar acceso" y
  "Descargar agenda" (`/docs/agenda-cln-2026.pdf`, ancla de descarga).
- **Programa:** cabecera de día (número "01", título, badge con `{SCHEDULE.length} sesiones`),
  timeline con 14 sesiones. Por sesión: hora, punto (color por tipo), tipo (tag) y acceso
  (libre/congreso/vip), título, descripción, ponente (con punto naranja), highlight cuando aplica.
  `TYPE_META` (registro/institucional/conferencia/magistral/panel/networking/sponsors/cierre) define
  colores de punto, tag y borde izquierdo de tarjeta; `ACCESS_META` (libre/congreso/vip) define tags.
- Nota de pie: "* Este programa es preliminar y puede experimentar ajustes menores".
- **CTA final:** elegir acceso Congreso (todo incluido) vs acceso libre.

### 6.3 `/ponentes` — Ponentes y agenda interactiva (client)

- **Hero:** "Conocimiento que fortalece la operación logística" + CTAs "Reservar acceso al congreso" / "Ver agenda".
- **Ponentes:** `SPEAKERS` (5): Mayerling Cervantes (CLN, apertura), Jorge Mauricio Pocasangre
  (Supply Chain Latam), Carlos Boshell (Logistics Group, Colombia), Karla Klaus (TechLog),
  Eduardo García Grande (Global Trade, El Salvador). Cards (`SpeakerCard`) con avatar de iniciales
  (o foto si existiera) → abren `SpeakerModal` con bio, badges "Participación Confirmada",
  datos de participación/horario/rol, y link "Ver en la agenda" (scroll a la fila `agenda-row-N`).
- **Agenda:** 13 filas (`AGENDA`) hora por hora con tipos (networking/apertura/conferencia/panel/
  magistral/clausura); filas break con opacidad reducida; `AgendaRow` reutiliza `TYPE_META`.
- **Acceso/precios:** bloque `bg-cln-950` "Congreso — Acceso con costo" con dos tarjetas de precio
  Miembro CLN $75 / Tarifa General $120 (ver pendientes §12: están desalineadas con `/registro`),
  incluye beneficios (congreso, piso, almuerzo, 2 coffee breaks) y CTA "Solicitar acceso".

### 6.4 `/patrocinadores` — Patrocinadores (server)

- **Hero:** "Aliados estratégicos que impulsan la logística" + CTAs "Ser patrocinador" (mailto
  cln@nilogistic.com) y "Ver plano del piso" (#plano).
- **Plano del piso:** `SponsorMap` (SVG interactivo, ver §7) con encabezado y descripción.
- **Marcas confirmadas:** sección `bg-gray-50` con 10 placeholders "Logo Sponsor N"
  (grid 2–4 col, `aspect-[3/2]`, hover naranja/azul); texto "Próximamente estaremos revelando…".
- **CTA final:** "¿Desea ser patrocinador?" → mailto.

### 6.5 `/registro` — Registro (client)

- **Hero:** "Reserva tu lugar en la cita logística del año" + fecha/hora/lugar + CTAs.
- **Banda de tarifas** (`bg-cln-900`, "Tarifas vigentes" con punto pulsante naranja): Congreso desde
  $100, VIP desde $180, "Cupo limitado 300 accesos Congreso + VIP".
- **Acceso y tarifas:** 3 tarjetas seleccionables (Piso sin costo / Congreso $100/$150 con badge
  RECOMENDADO / VIP $180/$210) — cada una con features (✓/✕) y botón de selección. Nota de precios
  (IVA por persona), validación de condición Asociado CLN.
- **Acordeón `<details>`** "Ver tarifas completas e inclusiones": tabla de tarifas vigentes
  (Congreso/VIP × Asociado/No Asociado) + tabla comparativa de alcance por acceso
  (`COMPARE_ROWS`: piso/congreso/vip con Check/Dash).
- **Formulario** (card blanca): bullets de contexto; campos Nombre*, Email*, Empresa+/Cargo+ (obligatorios
  en Piso); toggle "¿Es tu empresa asociada a CLN?" (solo Congreso/VIP); total a pagar en vivo
  (`getPrice` backend `prices`); botón con estados (sin selección → gguidance; spinner → éxito).
- **"Qué pasa después de enviar":** pasos diferenciados (Piso: datos → QR → ingreso; Congreso/VIP:
  solicitud → validación cupo/tarifa → pago+factura) + nota "Pago pendiente".
- Pantalla de éxito (check verde, "¡Registro Exitoso!", botón Volver al Inicio).
- **CTA final:** "Asegura tu acceso hoy".

### 6.6 `/admin` — Panel (Basic Auth)

- `/admin/registros`: KPIs + tabla (ver §3).
- `/admin/export`: descarga CSV.

---

## 7. Componentes reutilizables

- **Navbar (`"use client"`):** barra blanca sticky (logo `logo-horizontal.jpg`, menú desktop con
  subrayado naranja animado según `pathname`, botón Registrarse, menú hamburguesa móvil) + **info bar
  `bg-cln-900`** con cuenta regresiva en vivo hacia `2026-11-20T08:00:00` (d/h/min, intervalo 1s),
  "EXPO LOGÍSTICA 2026" y "20 de nov · DoubleTree by Hilton Managua".
- **Footer (server):** `bg-cln-950`, logo `logo-vertical.png`, slogan CLN + #SoyCLN; columnas
  Enlaces Rápidos (agenda/ponentes/patrocinadores/registro) y Contacto (Mayerling Cervantes,
  mailto, tel); copyright dinámico.
- **HeroVideo:** video del hero con poster y fade-in al `onLoadedData` (mejora de LCP evitando flash).
- **SponsorMap (`"use client"`):** plano SVG 720×430 del salón (Mombacho 222×290, Télica 142×192,
  Masaya 110×84, Momotombo 180×290, pasillo 692×72). 10 stands: 3 ELITE (dorado #B8860B),
  4 ORO (azul marino #1B3A6B), 3 PLATA (acero #2E6B8F). Leyenda, tooltip flotante que sigue el cursor
  (`TipCallout` con animación `tipIn`), CTA "Solicitar Cotización" por tier, contadores de
  disponibles por tier; estados libro/reservado; scroll horizontal si no cabe.
- **NetworkingGallery (`"use client"`):** slideshow de la sección Networking del home (ver §8);
  5s autoplay con crossfade (`media-in`/`media-out`), pausa en hover, precarga de la siguiente imagen,
  overlay inferior con contador `NN / 53`, badge "Ver galería ⤢"; modal fullscreen (imágenes
  `object-contain` con `quality=100` en `next/image`, videos `.mov` con `<video controls>`),
  barra de control inferior con counter, dots navegables (accesibles por teclado), botones prev/next,
  cierre Esc/click/✕, flechas ←/→, bloqueo de scroll.
- **RegistrationEmail (`@react-email`):** plantilla del correo — cabecera con logo remoto,
  badge "Confirmación de acceso", H1 según acceso (confirmado libre vs validación de pago),
  resumen de reserva, bloque de pago (precio + IVA 15% + total), cuentas bancarias
  (BAC 123-456789-0 / LAFISE 0987654321 — pendientes de confirmar, ver §12), instrucciones de
  comprobante, bloque de QR, footer del evento.

---

## 8. Datos y fuentes de contenido

### `src/lib/event.ts`
- Constantes de identidad del evento y `EVENT_HIGHLIGHTS` (6 tarjetas del home).

### `src/lib/gallery.ts`
- `GALLERY`: **53 items** (49 imágenes + 4 videos `.mov`) apuntando a la nube pública
  `https://nilogistic.com/wp-content/uploads/2025/12|2025/11/*.{jpeg,jpg,webp,mov}`.
- Videos: IMG_5260.mov, IMG_5252.mov, IMG_5251.mov, IMG_4956.mov.
- Habilitado `images.remotePatterns` en `next.config.ts` para ese host/ruta.

### `src/app/ponentes/page.tsx` / `agenda/page.tsx`
- `SPEAKERS` (5), `AGENDA` (13 filas) y `SCHEDULE` (14 sesiones) — fuentes de verdad del programa;
  hoy están duplicadas manualmente entre ambas páginas (ver pendientes §12).

### Base de datos (Vercel Postgres)
- Tabla `registrations`: id SERIAL PK, ticket_type, is_member, nombre, email, empresa, cargo,
  created_at (timestamptz default now). Se auto-crea con `CREATE TABLE IF NOT EXISTS`.

---

## 9. Configuración y variables de entorno

| Variable | Uso |
|---|---|
| `POSTGRES_URL` | conexión @vercel/postgres (registro + admin) |
| `RESEND_API_KEY` | envío del correo de confirmación (si falta, solo warning en consola) |
| `ADMIN_PASSWORD` | contraseña del Basic Auth para `/admin/*` (usuario fijo `admin`) |

No se deben exponer secretos vía commit; gestionar en el panel de Vercel.

---

## 10. Assets y rendimiento

- Logos: `public/logo-horizontal.jpg` (1024×481, navbar), `public/logo-vertical.png` (217×256, footer).
- Covers del home: las 6 cards de "Qué Viviremos" usan imágenes remotas
  (`https://nilogistic.com/wp-content/uploads/2026/09/cardN-scaled.jpeg`, proporción 16:9
  vía `aspect-video`); `hero_logistics.png` se usa como poster del hero. La tarjeta sin foto
  usa gradiente `cln-900→cln-500` + ícono.
- Hero: video del home con poster y lazy fade-in; overlay oscuro para contraste.
- Galería: imágenes remotas optimizadas por `next/image` (sizes responsive), videos `.mov` pesados
  en modal con lazy mount (solo se montan al abrir).
- `import.meta.env` no usado; `SpeedInsights` y `Analytics` montados en el root layout.

---

## 11. Verificación y comandos

```powershell
# Instalar dependencias de la app
cd web
npm install

# Lint (sin errores)
npx eslint

# Build de producción (verificado OK)
npm run build

# Dev / Prod local
npm run dev        # http://localhost:3000
npm run start      # tras build

# Reinicio del servidor local tras cambios (Windows)
# 1) matar el proceso del puerto 3000
# 2) Start-Process npm.cmd run start (logs: web/server.log, web/server.err.log)
```

Acceso admin local: `http://localhost:3000/admin/registros` (Basic Auth).

---

## 12. Estado consolidado y pendientes conocidos

Implementado y verificado (lint + build OK):

- Landing completa con 5 páginas públicas + panel admin + export CSV + email de registro.
- Sistema de diseño CLN (paleta, tipografía, heroes, secciones, CTA, timeline, modales).
- Registro con banda de tarifas, tarjetas seleccionables, acordeón comparativo, formulario
  con total en vivo y pasos post-envío.
- Networking Preview con slideshow automático y modal de galería (imágenes y videos remotos).
- Countdown en Navbar, hero video, mapa de patrocinadores interactivo.

Pendientes / a revisar (NO bloqueantes, no verificados con el cliente):

1. **Precios de ponentes** en `/ponentes` (Miembro $75 / General $120) no coinciden con la tarifa
   oficial de `/registro` ($100/$150, +IVA). Unificar el copy.
2. **Correo**: precios del `RegistrationEmail` están fijos (VIP $210 / Congreso $150) y las cuentas
   bancarias (BAC 123-456789-0, LAFISE 0987654321) y el logo remoto
   (`https://expologistic-cln2026.nilogistic.com/logo-horizontal.jpg`) son placeholders que el
   cliente debe confirmar.
3. **Descarga de agenda**: el botón apunta a `/public/docs/agenda-cln-2026.pdf` que aún no existe.
4. **Marcas confirmadas** en `/patrocinadores` son placeholders "Logo Sponsor N" a reemplazar por
   logos reales.
5. **`public/fotos/`** contiene decenas de JPG locales grandes (≈20MB) que ya no se utilizan;
   conviene eliminarla o comprimirla antes del deploy (no afecta el build, es espacio en repo).
6. **Agenda duplicada**: `AGENDA` (ponentes) y `SCHEDULE` (agenda) se mantienen a mano; evaluar
   centralizar en un solo módulo para evitar desfases.
7. **Charlas/ponentes** de la agenda de `/agenda` con "Conferencia 2" sin nombre definido.
8. La tarjeta "Viernes 20 de Noviembre" del home está hardcodeada (podría usar `EVENT_DAY_LABEL`).