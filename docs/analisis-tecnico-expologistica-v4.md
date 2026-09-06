# Análisis Técnico v4 — expologistica.com.sv
### (HTML fuente real de `/registro` y `/congreso`)

**Fecha:** 04 de septiembre de 2026

> Esta versión trae una **corrección importante** a la v2/v3 sobre cómo se envía el formulario de registro, además de revelar la mecánica completa del modal de ponentes y del acordeón de tarifas.

---

## 0. Corrección importante: el formulario de registro NO usa Axios

En la v2 se asumió que los formularios de `/registro` y `/piso-de-exhibicion` probablemente usaban Axios (por descarte, ya que no cruzan dominio como la newsletter). **Eso era incorrecto.** El HTML real muestra:

```html
<form method="POST" action="https://expologistica.com.sv/registro" class="form" x-data="{ ... }">
  <input type="hidden" name="_token" value="GMZnqGtLkoyTLJj67CNIUm2OyiPXm7u7tcFjny0c" autocomplete="off">
  ...
</form>
```

Es un **formulario HTML tradicional con envío nativo (POST con recarga de página)**, protegido con el token CSRF de Laravel en un campo oculto (`_token`) — el patrón estándar de Laravel Blade, no una llamada API. Axios sí está en el bundle JS (confirmado en v2), pero **no se usa para este formulario en particular**; probablemente se reserva para otras interacciones (el buscador/filtro del directorio de patrocinadores, o el registro rápido de `/piso-de-exhibicion`, que no hemos visto aún).

Lo que Alpine.js maneja aquí es **únicamente la experiencia previa al envío**: selección visual de tipo de acceso, cálculo de precio en vivo, validación de que se eligió condición de tarifa antes de dejar enviar. El envío en sí es 100% servidor-side clásico.

### 0.1 Cálculo de precio 100% en el cliente, con datos embebidos
```js
prices: JSON.parse('{"regular":{"congress":{"member":100,"non_member":150},"vip":{"member":180,"non_member":210}}}')
```
Los 4 precios (Congreso/VIP × Asociado/No Asociado) viajan **incrustados directamente en el atributo `x-data`** del formulario, como JSON ya parseado. Alpine calcula y muestra el precio (`selectedPrice()`) y la etiqueta (`selectedLabel()`) sin ninguna petición al servidor — es puro cálculo en memoria del navegador a partir de esos 4 números fijos.

## 1. Página `/registro` — hallazgos nuevos

- **Hoja de estilos propia de la página:** `registro.css?v=20260713-deadline1` (cada página interna tiene su propio CSS además del shell compartido — confirma la arquitectura modular ya vista, ahora con un archivo más: uno por tipo de página).
- **Banda de "deadline"** (`.registration-deadline-band`) con el cupo restante ("300 accesos Congreso + VIP") — sección que no estaba documentada antes.
- **Acordeón de tarifas completas usando `<details>`/`<summary>` nativo del navegador**, no un componente Alpine:
  ```html
  <details class="compare-acc">
    <summary><span>Ver tarifas completas e inclusiones por tipo de acceso</span>...</summary>
    ...tabla...
  </details>
  ```
  Es decir, el "acordeón" que se veía en el análisis de contenido (v1) **no necesita JavaScript en absoluto** — es HTML semántico puro (`<details>`), con solo un ícono de flecha (`.acc-chev`) rotado vía CSS según el atributo `[open]`.
- **Tablas de comparación reales confirmadas**, con `colspan`/`rowspan` en el encabezado y `data-l="..."` en cada celda (probablemente usado por CSS para mostrar la etiqueta de columna en la versión móvil apilada de la tabla — técnica común de "tablas responsivas" con `content: attr(data-l)`).
- **Tres tarjetas de precio** (`.tier`, con `.tier.featured` para "Congreso" que lleva la etiqueta "Recomendado") — cada botón de tarjeta no envía el formulario directamente, sino que:
  ```js
  onclick="document.getElementById('reg-form').scrollIntoView({behavior:'smooth'}); pickTicket('floor');"
  ```
  Hace scroll suave al formulario y, 600 ms después (tiempo estimado del scroll), simula un clic en el botón de tipo de acceso correspondiente dentro del formulario — sincroniza la selección visual con la tarjeta que el usuario clickeó arriba.
- **Validación condicional de campos por tipo de acceso:** Empresa, Cargo, Sector y Tamaño de empresa son `required` **solo si `ticket === 'floor'`** (piso de exhibición); para Congreso/VIP esos campos existen pero no son obligatorios — confirma que el registro de piso pide más perfilamiento comercial que el de Congreso/VIP.
- **Parallax en el header con JS vanilla** (no Alpine): mueve la posición de fondo del `.asac-page-header` según el scroll, usando `requestAnimationFrame` y respetando `prefers-reduced-motion` — mismo patrón de cuidado de accesibilidad visto en la home.
- **Botón de envío con 3 estados de texto dinámico:**
  - Sin tarifa elegida (Congreso/VIP) → "Selecciona tu condición de tarifa" (deshabilitado)
  - Piso → "Obtener pase sin costo →"
  - Congreso/VIP con tarifa elegida → "Enviar solicitud de acceso →"
  - Enviando → spinner + "Enviando…"

## 2. Página `/congreso` — mecánica real del modal de ponentes

- **Hoja de estilos propia:** `expo-ponentes.css?v=20260904-utility-text` (nombre de archivo confirma que esta página se llama internamente "ponentes", no "congreso", en el código).
- **No hay un solo modal reutilizable** — hay **16 bloques `<div class="speaker-modal">` completos, uno por ponente**, todos presentes en el HTML desde el inicio, cada uno controlado por:
  ```html
  x-show="activeProfile === 'benjamin-mayorga'"
  ```
  El estado `activeProfile` vive en un único `x-data="{ activeProfile: null }"` en el contenedor `.congress-page-flow` que envuelve toda la sección de ponentes + agenda + modales.
- **Bloqueo de scroll del fondo al abrir un modal**, confirmado:
  ```html
  x-effect="document.body.style.overflow = activeProfile ? 'hidden' : ''"
  ```
- **Cierre por Escape a nivel de ventana:** `@keydown.escape.window="activeProfile = null"`.
- **Accesibilidad de modal correcta:** cada diálogo tiene `role="dialog"`, `aria-modal="true"`, `aria-labelledby` apuntando al `<h2>` con el nombre del ponente; el botón que lo abre tiene `aria-haspopup="dialog"` y `:aria-expanded` enlazado al estado.
- **Triple entrada al mismo modal:** un ponente puede abrirse desde (a) el riel de retratos (`.congress-portrait-nav`), (b) su propio bloque de conferencia en la agenda, o (c) como parte de un panel (los mini-botones `.agenda-session-people button` dentro de un Panel Fórum) — los tres apuntan al mismo `activeProfile = 'slug'`.
- **El modal también enlaza de vuelta a la agenda:** el botón "Ver en la agenda →" hace `activeProfile = null` y navega a un ancla tipo `#agenda-benjamin-mayorga` — cierra el modal y hace scroll al bloque exacto de la agenda en un solo clic.
- **Contenido variable por ponente:** algunos modales muestran solo "Participación confirmada" + los 3 datos (`Participación`/`Horario`/`Rol`), y otros (los que tienen biografía completa, como Carlos Boshell, Jorge Mauricio Pocasangre, José Javier Ayala Sastre, Karla Klaus, Eduardo García Grande, Salvador Ramírez) agregan 1 a 3 párrafos de perfil profesional antes de esos datos — confirma que el CMS/backend distingue entre "solo confirmado" y "con biografía".
- **Agenda como lista ordenada semántica real:**
  ```html
  <ol class="congress-agenda__list">
    <li class="congress-agenda__item--utility"><time>7:00 a.m.</time>...</li>
    <li class="congress-agenda__item--panel" id="agenda-benjamin-mayorga">...</li>
  ```
  Usa `<ol>`/`<li>` (no `<div>`) y la etiqueta `<time>` para cada horario — buena práctica semántica que no era visible antes. Cada bloque de conferencia/panel tiene su propio `id` que corresponde exactamente al ancla que usan los modales para "Ver en la agenda".
- **Imágenes con `width`/`height` explícitos en todos los tamaños** (320×320 en el riel de retratos, 900×900 dentro del modal, 64×64 en los mini-avatares de panelistas dentro de la agenda) — previene *layout shift* (CLS) al cargar, buena práctica de rendimiento que confirma atención al detalle técnico en todo el sitio, no solo en la home.

## 3. Confirmaciones cruzadas con v2/v3 (siguen igual en estas páginas)

- Mismo `csrf-token`, misma estructura de `<head>` (JSON-LD Event, gtag G-9PSD50CGDR con Consent Mode, preload/modulepreload del bundle Vite, Inter+Manrope+Oswald... aunque en `/registro` y `/congreso` **no se carga Oswald** — esa fuente parece exclusiva de `expo-home.css`, confirmando que es solo para la home).
- Mismo header/mega-menú/countdown/footer con el mismo código Alpine, línea por línea idéntico entre páginas — confirma que el shell (`expo-shell.css` + el bloque de nav/countdown/footer) es un **partial/componente Blade compartido**, no HTML copiado y pegado manualmente por página.
- El breakpoint 761px y el retardo de 220 ms del mega-menú se repiten exactos.

---

### Nota metodológica
Analizado línea por línea el HTML fuente real de `/registro` (verificado por su propio `csrf-token` y `canonical`) y `/congreso` (ídem). Ambos confirmados como legítimos del sitio por los mismos indicadores usados en v3. Quedan sin ver: `/piso-de-exhibicion` (para confirmar si su formulario sí usa Axios), `/patrocinadores` (para ver la mecánica real del filtro de categorías) y `/programa` (para ver si su sistema de tabs día/tipo usa Alpine o es también `<details>`/CSS puro).
