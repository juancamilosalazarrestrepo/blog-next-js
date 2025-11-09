# 📊 Guía de Configuración de Google Analytics

## ✅ Implementación Completa

Google Analytics ya está implementado en tu proyecto. Solo necesitas configurar tu ID de medición.

---

## 🔑 Paso 1: Obtener tu ID de Google Analytics

### Opción A: Si NO tienes cuenta de Google Analytics

1. Ve a [Google Analytics](https://analytics.google.com)
2. Inicia sesión con tu cuenta de Google
3. Click en **"Empezar a medir"** o **"Crear cuenta"**
4. Completa el formulario:
   - **Nombre de la cuenta**: "Mi Portafolio" (o el nombre que prefieras)
   - **Nombre de la propiedad**: "blog-next-js"
   - **Zona horaria**: Tu país/región
   - **Moneda**: Tu moneda local
5. Click en **"Siguiente"**
6. Selecciona **"Web"** como plataforma
7. Configura el flujo de datos:
   - **URL del sitio web**: `https://tudominio.com`
   - **Nombre del flujo**: "Producción"
8. Click en **"Crear flujo"**
9. ¡Copia tu **ID de medición**! Se ve así: **`G-XXXXXXXXXX`**

### Opción B: Si YA tienes cuenta de Google Analytics

1. Ve a [Google Analytics](https://analytics.google.com)
2. Click en **"Admin"** (ícono de engranaje abajo a la izquierda)
3. En la columna **"Propiedad"**, selecciona tu propiedad o crea una nueva
4. Click en **"Flujos de datos"**
5. Selecciona tu flujo web o crea uno nuevo
6. Copia el **ID de medición** (formato: `G-XXXXXXXXXX`)

---

## ⚙️ Paso 2: Configurar el Proyecto

### 1. Crea o actualiza `.env.local` en la raíz del proyecto:

```env
NEXT_PUBLIC_SITE_URL=https://tudominio.com
NEXT_PUBLIC_GA_MEASUREMENT_ID=G-XXXXXXXXXX
```

**⚠️ IMPORTANTE:**
- Reemplaza `G-XXXXXXXXXX` con tu ID real de Google Analytics
- Este archivo NO debe subirse a Git (ya está en `.gitignore`)

### 2. Reinicia el servidor de desarrollo:

```bash
# Detén el servidor (Ctrl + C)
# Vuelve a iniciarlo
npm run dev
```

---

## 📈 Paso 3: Verificar que Funciona

### Método 1: En tiempo real (recomendado)

1. Con tu sitio abierto en el navegador (modo desarrollo o producción)
2. Ve a [Google Analytics](https://analytics.google.com)
3. Click en **"Informes"** → **"Tiempo real"** → **"Vista general"**
4. Deberías ver **1 usuario activo** (tú)
5. Navega por tu sitio y verás las páginas en tiempo real

### Método 2: Chrome DevTools

1. Abre tu sitio en Chrome
2. Abre DevTools (F12)
3. Ve a la pestaña **"Network"**
4. Filtra por `gtag` o `analytics`
5. Recarga la página
6. Deberías ver requests a `google-analytics.com`

### Método 3: Extensión de Chrome

1. Instala [Google Analytics Debugger](https://chrome.google.com/webstore/detail/google-analytics-debugger/jnkmfdileelhofjcijamephohjechhna)
2. Actívala (ícono se pone verde)
3. Abre la consola de Chrome (F12)
4. Recarga tu sitio
5. Verás logs de Google Analytics

---

## 🎯 Paso 4: Usar Eventos Personalizados (Opcional)

Ya tienes funciones helper creadas en `lib/analytics.js`. Úsalas así:

### Ejemplo 1: Trackear click en proyecto

```jsx
// En tu componente de proyectos
import { trackProjectClick } from '../../lib/analytics';

function ProyectoCard({ proyecto }) {
  const handleClick = () => {
    trackProjectClick(proyecto.titulo);
  };

  return (
    <Link href={proyecto.url} onClick={handleClick}>
      {/* Contenido de la card */}
    </Link>
  );
}
```

### Ejemplo 2: Trackear lectura de artículo

```jsx
// En la página del artículo
import { trackArticleRead } from '../../../lib/analytics';
import { useEffect } from 'react';

export default function BlogPost({ post }) {
  useEffect(() => {
    // Trackear cuando alguien lee el artículo
    trackArticleRead(post.title, post.readTime);
  }, [post.title, post.readTime]);

  return <article>{/* ... */}</article>;
}
```

### Ejemplo 3: Trackear búsqueda en el blog

```jsx
// En tu componente de búsqueda
import { trackSearch } from '../../lib/analytics';

function SearchBar() {
  const handleSearch = (searchTerm) => {
    if (searchTerm) {
      trackSearch(searchTerm);
    }
  };

  return (
    <input
      onChange={(e) => handleSearch(e.target.value)}
      placeholder="Buscar..."
    />
  );
}
```

### Ejemplo 4: Trackear click en botón de contacto

```jsx
// En tu página de contacto
import { trackContactClick } from '../../lib/analytics';

function ContactButton() {
  return (
    <button onClick={() => trackContactClick('header')}>
      Contáctame
    </button>
  );
}
```

### Ejemplo 5: Trackear descarga de CV

```jsx
// En tu botón de descarga
import { trackCVDownload } from '../../lib/analytics';

function DownloadCV() {
  return (
    <a
      href="/cv.pdf"
      download
      onClick={trackCVDownload}
    >
      Descargar CV
    </a>
  );
}
```

---

## 📊 Métricas que se Trackean Automáticamente

✅ **Páginas vistas** - Cada vez que alguien visita una página
✅ **Sesiones** - Número de visitas únicas
✅ **Usuarios** - Visitantes únicos
✅ **Tiempo en el sitio** - Cuánto tiempo permanecen
✅ **Tasa de rebote** - % que salen sin interactuar
✅ **Dispositivos** - Desktop, móvil, tablet
✅ **Ubicación** - De dónde vienen tus visitantes
✅ **Fuentes de tráfico** - Google, redes sociales, directo, etc.

---

## 🔍 Eventos Personalizados Disponibles

| Función | Uso | Ejemplo |
|---------|-----|---------|
| `trackProjectClick(name)` | Click en proyecto | "Sistema Inmobiliario" |
| `trackArticleRead(title, time)` | Lectura de artículo | "Next.js 16", 15 |
| `trackContactClick(source)` | Click en contacto | "header", "footer" |
| `trackCVDownload()` | Descarga de CV | - |
| `trackSocialClick(platform, url)` | Click en red social | "github", "..." |
| `trackSearch(term)` | Búsqueda | "nextjs" |
| `trackExternalLink(url)` | Link externo | "https://..." |
| `trackTimeOnPage(page, sec)` | Tiempo en página | "home", 120 |

---

## 🚨 Solución de Problemas

### ❌ No veo datos en Google Analytics

**Posibles causas:**

1. **El ID está mal configurado**
   - Verifica en `.env.local` que el ID sea correcto
   - Debe empezar con `G-` (Google Analytics 4)
   - Reinicia el servidor después de cambiar `.env.local`

2. **Estás en modo desarrollo**
   - Google Analytics solo funciona en producción por defecto
   - Para habilitar en desarrollo, edita `GoogleAnalytics.jsx`:
     ```jsx
     // Cambiar esta línea:
     if (process.env.NODE_ENV !== 'production' || !measurementId) {
     
     // Por esta (solo para desarrollo):
     if (!measurementId) {
     ```

3. **Bloqueadores de ads**
   - Desactiva extensiones como AdBlock
   - Prueba en modo incógnito

4. **El sitio no está en producción**
   - Deploy tu sitio a Vercel/Netlify
   - Google Analytics funciona mejor en producción

### ❌ Los eventos personalizados no se registran

1. Verifica que `window.gtag` exista:
   ```jsx
   console.log('gtag exists:', typeof window.gtag !== 'undefined');
   ```

2. Abre la consola y busca errores de GA

3. Verifica que estés llamando las funciones correctamente

---

## 📱 Datos que Necesitas Proporcionarme

Para completar la configuración, solo necesito que me des:

### ✅ **Tu ID de Google Analytics**
Formato: `G-XXXXXXXXXX`

Ejemplo real: `G-ABC123XYZ789`

**¿Dónde lo encuentro?**
1. Ve a [Google Analytics](https://analytics.google.com)
2. Admin → Flujos de datos → Tu flujo web
3. Copia el "ID de medición"

---

## 🎉 ¡Listo!

Una vez que configures tu ID de medición en `.env.local`, Google Analytics estará completamente funcional.

### Próximos pasos opcionales:

1. **Configurar objetivos** - En Google Analytics, crea objetivos personalizados
2. **Enlazar Google Search Console** - Para ver qué búsquedas traen tráfico
3. **Configurar alertas** - Recibe notificaciones de picos de tráfico
4. **Crear dashboards personalizados** - Métricas específicas de tu portfolio

---

## 📞 ¿Necesitas ayuda?

Si tienes problemas para obtener tu ID de Google Analytics o configurarlo, avísame y te ayudo paso a paso con capturas de pantalla.

**Para empezar, solo necesito que me proporciones:**

```
NEXT_PUBLIC_GA_MEASUREMENT_ID=G-TU_ID_AQUI
```

Y lo configuramos juntos.
