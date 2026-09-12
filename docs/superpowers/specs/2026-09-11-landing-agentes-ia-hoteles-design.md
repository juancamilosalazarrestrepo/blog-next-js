# Landing: Agentes de IA para hoteles

**Fecha:** 2026-09-11
**Ruta:** `/agentes-ia-hoteles`
**Estado:** aprobado, pendiente de implementar

## Objetivo

Vender agentes autónomos de IA a hoteles: atención al huésped 24/7 y reservas
automáticas. Es la versión vertical hotelera de la familia de landings que ya
existe (`/agentes-ai` genérica, `/consultoria-ia` de diagnóstico).

El visitante objetivo es el dueño o gerente de un hotel pequeño o mediano que
pierde reservas fuera del horario de recepción y paga comisiones altas a las
OTAs. La conversión buscada es que deje sus datos en el formulario o escriba
por WhatsApp.

## Alcance

Tres archivos nuevos. No se refactoriza nada de lo existente.

| Archivo | Rol |
|---|---|
| `src/pages/agentes-ia-hoteles.jsx` | La landing completa |
| `src/components/HotelAgentDemo.jsx` | Chat simulado animado |
| `src/pages/api/hoteles.js` | Endpoint del formulario |

Más una línea en `src/pages/sitemap.xml.js`.

El chat vive en su propio componente porque es la única pieza con estado y
temporizadores. Así la landing queda declarativa y el demo se puede probar o
reutilizar por separado.

## Componente: HotelAgentDemo

**Qué hace:** reproduce una conversación de reserva, mensaje a mensaje, con
indicador de "escribiendo" entre turnos.

**Interfaz:** sin props obligatorias. Acepta `className` para el contenedor.

**Depende de:** solo React (`useState`, `useEffect`, `useRef`).

**Guion de la conversación:**

1. Huésped: pregunta si hay habitación doble para el fin de semana.
2. Agente: consulta disponibilidad — se muestra como paso de herramienta, no
   como mensaje de chat, para que se vea que el agente *actúa* y no solo responde.
3. Agente: ofrece dos opciones con tarifa.
4. Huésped: elige una y pregunta por el desayuno.
5. Agente: responde e incluye un upsell de late check-out.
6. Huésped: confirma.
7. Agente: crea la reserva (segundo paso de herramienta) y entrega el código
   de confirmación.

Los pasos de herramienta son la diferencia visual entre un chatbot y un agente
autónomo. Es el argumento central de la página, así que debe verse.

**Estado:** índice del mensaje visible, bandera de "escribiendo", y un botón
*Reiniciar* que vuelve a cero.

**Accesibilidad:** con `prefers-reduced-motion: reduce` se pinta la
conversación completa de una vez, sin animación ni temporizadores. El
contenedor lleva `aria-live="polite"`. Los timers se limpian al desmontar.

## Secciones de la página

1. **Hero** — titular "Tu recepción no duerme. Tu agente de IA tampoco.".
   Badge de vertical hotelera, el `HotelAgentDemo` a la derecha y dos CTAs:
   el primario hace scroll al formulario (`#demo-gratis`), el secundario abre
   WhatsApp.
2. **Dolor** — cuatro métricas del problema: reservas perdidas fuera de
   horario, tiempo de respuesta, comisiones de OTAs, recepción saturada.
   Redactadas como referencias del sector, nunca como resultados propios.
3. **Chatbot contra agente autónomo** — tabla comparativa de dos columnas que
   nombra la diferencia que el visitante acaba de ver en el hero: el chatbot
   responde con un guion, el agente consulta el PMS y ejecuta la reserva. Sin
   segundo widget de chat; el demo aparece una sola vez en la página.
4. **Qué hace el agente** — seis capacidades: reservas y disponibilidad,
   check-in y check-out, upselling, multiidioma, conserjería local, escalado
   a un humano.
5. **Integraciones** — WhatsApp, web, Instagram, PMS y channel manager.
   Chips de texto, sin logos de terceros, para no usar marcas ajenas.
6. **Cómo funciona** — cuatro pasos: diagnóstico, conexión al PMS,
   entrenamiento con las políticas del hotel, puesta en marcha en dos semanas.
7. **Precios** — tres planes, ver tabla abajo.
8. **FAQ** — seis objeciones: qué pasa si se equivoca, si reemplaza a la
   recepción, si se conecta con el PMS, datos de huéspedes, idiomas,
   permanencia.
9. **Formulario y CTA final** — con `id="demo-gratis"`, destino del CTA
   primario del hero y del botón de la tabla de precios.

## Precios

| Plan | Implementación | Mensual | Incluye |
|---|---|---|---|
| Recepción IA | USD 900 | USD 149 | FAQs, información del hotel, conserjería 24/7, un canal |
| Reservas IA | USD 1.900 | USD 299 | Lo anterior más disponibilidad y reservas conectadas al PMS, dos canales |
| Suite Hotel | a medida | desde USD 590 | Multi-propiedad, upselling, todos los canales, analítica |

El plan intermedio se marca como el más popular.

## Formulario y endpoint

**Campos:** hotel, nombre, email, WhatsApp, número de habitaciones (select),
PMS actual (opcional), reto principal (textarea).

Obligatorios: hotel, nombre, email. El resto es opcional para no subir la
fricción.

**Endpoint** `POST /api/hoteles`, calcado de `src/pages/api/consultoria-ia.js`:

- Rechaza todo método que no sea POST con 405.
- `checkRateLimit(req, 'hoteles')` antes de cualquier otra cosa; 429 si excede.
- Valida presencia de los obligatorios y formato del email.
- Límites de longitud por campo, para rechazar payloads abusivos.
- `escapeHtml` en todo lo que se interpola en el correo; `stripNewlines` en
  los campos que van al asunto o a cabeceras.
- Envía por nodemailer con `GMAIL_USER` / `GMAIL_APP_PASSWORD`. Si faltan las
  variables, responde 500 sin filtrar detalles al cliente.

El asunto del correo lleva el prefijo `[Hoteles]` para distinguirlo de los
leads de consultoría.

**Estados en el cliente:** `idle`, `loading`, `success`, `error`. Mismo
patrón que `consultoria-ia.jsx`: el botón se deshabilita mientras carga y el
mensaje de error se muestra bajo el formulario.

## Detalles técnicos

- **Estilos:** Tailwind inline, como `agentes-ai.jsx`. No se crea CSS module.
- **Dark mode:** variantes `dark:` en todas las secciones.
- **Imágenes:** ninguna nueva. Los visuales son CSS y SVG. Para Open Graph se
  reutiliza `/assets/ai/ai_hero.webp`.
- **i18n:** `getStaticProps` con `serverSideTranslations(locale || 'es',
  ['common'])`, igual que el resto de landings. El contenido va en español
  directo en el JSX, como las páginas hermanas.
- **SEO:** componente `SEO` con título, descripción, keywords hoteleras y un
  `schema` combinado de `Service` y `FAQPage`, para optar a rich results.
- **Sitemap:** entrada `/agentes-ia-hoteles` con prioridad 0.9 y changefreq
  mensual, junto a las otras landings.
- **WhatsApp:** `573042093951`, el mismo de las demás landings. Botón
  flotante con el patrón ya existente.

## Fuera de alcance

- Traducción al inglés del contenido (las landings hermanas tampoco la tienen).
- Integración real con ningún PMS. La página vende el servicio; la conexión se
  hace en cada proyecto.
- Casos de éxito con nombre de hotel: no existen todavía y no se inventan.
- Enlace desde el navbar. Se decide aparte, cuando la página esté publicada.

## Criterios de aceptación

- `npm run build` pasa sin errores ni warnings nuevos.
- `/agentes-ia-hoteles` renderiza las nueve secciones en claro y en oscuro.
- El chat se anima solo, llega al final y el botón *Reiniciar* funciona.
- Con `prefers-reduced-motion` activo, el chat aparece completo y estático.
- El formulario muestra error si faltan obligatorios y éxito tras un envío
  válido.
- `POST /api/hoteles` responde 405 a GET y 400 a un cuerpo inválido.
- La página aparece en `/sitemap.xml`.
- Sin errores en la consola del navegador.
