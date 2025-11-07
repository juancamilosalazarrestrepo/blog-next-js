# Guía de Uso del Componente SEO

## 📘 Descripción
El componente `SEO` centraliza todos los metadatos necesarios para optimizar tu sitio en motores de búsqueda y redes sociales.

---

## 🚀 Instalación

El componente ya está creado en `src/components/SEO.jsx`. Solo necesitas importarlo en tus páginas.

---

## 📋 Ejemplos de Uso

### 1. Página Principal (Home)

```jsx
// src/pages/index.jsx
import SEO from '../components/SEO';
import Layout from '../components/Layout';

export default function Home() {
  return (
    <Layout>
      <SEO
        title="Inicio"
        description="Portafolio de Juan Camilo Salazar. Desarrollador Full Stack especializado en Next.js, React, .NET y desarrollo web moderno."
        image="/images/og-home.jpg"
        keywords={['desarrollador full stack', 'nextjs', 'react', '.net', 'portfolio', 'colombia']}
      />
      
      {/* Tu contenido aquí */}
    </Layout>
  );
}
```

---

### 2. Página de Blog (Listado)

```jsx
// src/pages/blog/index.jsx
import SEO from '../../components/SEO';

export default function Blog({ posts }) {
  return (
    <>
      <SEO
        title="Blog de Desarrollo Web"
        description="Artículos sobre Next.js, React, .NET, Clean Architecture y las mejores prácticas en desarrollo web moderno."
        image="/images/og-blog.jpg"
        keywords={['blog desarrollo web', 'tutoriales nextjs', 'react tips', 'clean code']}
      />
      
      {/* Listado de posts */}
    </>
  );
}
```

---

### 3. Artículo Individual del Blog (IMPORTANTE)

```jsx
// src/pages/blog/[slug].tsx
import SEO from '../../components/SEO';

export default function BlogPost({ post }) {
  return (
    <>
      <SEO
        title={post.title}
        description={post.description || post.subtitle}
        image={post.imageOG || post.image}
        imageAlt={`Portada del artículo: ${post.title}`}
        type="article"
        date={post.date}
        author={post.author || 'Juan Camilo Salazar'}
        keywords={post.keywords || []}
        category={post.category}
      />
      
      <article>
        <h1>{post.title}</h1>
        {/* Contenido del artículo */}
      </article>
    </>
  );
}
```

---

### 4. Página de Proyecto Individual

```jsx
// src/pages/proyectos/sistema_gestion_inmobiliaria.jsx
import SEO from '../../components/SEO';

export default function ProyectoInmobiliaria() {
  return (
    <>
      <SEO
        title="Sistema de Gestión Inmobiliaria - Proyecto"
        description="Plataforma completa de gestión inmobiliaria con backend .NET (Clean Architecture) y frontend Next.js. Incluye panel administrativo, gestión de propiedades y usuarios."
        image="/images/realEstateApp.webp"
        imageAlt="Dashboard del sistema de gestión inmobiliaria"
        keywords={['gestión inmobiliaria', 'clean architecture', '.net', 'nextjs', 'crud propiedades']}
        category="Proyectos"
      />
      
      {/* Contenido del proyecto */}
    </>
  );
}
```

---

### 5. Página de Proyectos (Listado)

```jsx
// src/pages/proyectos/index.jsx
import SEO from '../../components/SEO';

export default function Proyectos() {
  return (
    <>
      <SEO
        title="Proyectos - Portafolio"
        description="Explora mis proyectos de desarrollo web: sistemas de gestión, e-commerce, aplicaciones móviles y más. Tecnologías: Next.js, React Native, .NET, Clean Architecture."
        image="/images/og-proyectos.jpg"
        keywords={['proyectos web', 'portafolio desarrollador', 'react projects', '.net projects']}
      />
      
      {/* Grid de proyectos */}
    </>
  );
}
```

---

### 6. Página de Contacto

```jsx
// src/pages/contact/index.jsx
import SEO from '../../components/SEO';

export default function Contact() {
  return (
    <>
      <SEO
        title="Contacto"
        description="¿Tienes un proyecto en mente? Contáctame para desarrollar tu aplicación web. Disponible para proyectos freelance y colaboraciones."
        image="/images/og-contact.jpg"
        keywords={['contacto desarrollador', 'freelance nextjs', 'contratar desarrollador full stack']}
      />
      
      {/* Formulario de contacto */}
    </>
  );
}
```

---

### 7. Página 404 (Sin indexar)

```jsx
// src/pages/404.jsx
import SEO from '../components/SEO';

export default function Custom404() {
  return (
    <>
      <SEO
        title="Página no encontrada - 404"
        description="Lo sentimos, la página que buscas no existe."
        noindex={true} // Importante: evita indexar páginas de error
      />
      
      <div>
        <h1>404 - Página no encontrada</h1>
      </div>
    </>
  );
}
```

---

### 8. Con Schema.org Personalizado (Avanzado)

```jsx
import SEO from '../components/SEO';

export default function About() {
  const personSchema = {
    "@context": "https://schema.org",
    "@type": "Person",
    "name": "Juan Camilo Salazar",
    "jobTitle": "Desarrollador Full Stack",
    "url": "https://tudominio.com",
    "image": "https://tudominio.com/images/profile.jpg",
    "sameAs": [
      "https://github.com/juancamilosalazarrestrepo",
      "https://linkedin.com/in/tuperfil"
    ],
    "knowsAbout": ["Next.js", "React", ".NET", "Clean Architecture"],
    "worksFor": {
      "@type": "Organization",
      "name": "Freelance"
    }
  };

  return (
    <>
      <SEO
        title="Sobre mí"
        description="Desarrollador Full Stack con experiencia en Next.js, React y .NET. Apasionado por crear aplicaciones web escalables y eficientes."
        schema={personSchema}
      />
      
      {/* Contenido sobre ti */}
    </>
  );
}
```

---

## ⚙️ Configuración Inicial

### 1. Configura la variable de entorno

Crea o actualiza `.env.local`:

```env
NEXT_PUBLIC_SITE_URL=https://tudominio.com
```

### 2. Actualiza el usuario de Twitter

En `src/components/SEO.jsx`, línea 29, cambia:
```js
const twitterHandle = '@tuusuario'; // Por tu usuario real
```

### 3. Crea imágenes Open Graph

Las imágenes para redes sociales deben ser:
- **Tamaño**: 1200x630 px
- **Formato**: JPG o PNG (preferiblemente WebP optimizado)
- **Peso**: < 1MB

Ubícalas en `public/images/`:
- `og-default.jpg` - Imagen por defecto
- `og-home.jpg` - Para la home
- `og-blog.jpg` - Para el blog
- `og-proyectos.jpg` - Para proyectos
- Y una por cada artículo importante

---

## 📊 Props del Componente

| Prop | Tipo | Default | Descripción |
|------|------|---------|-------------|
| `title` | string | "Desarrollador Full Stack..." | Título de la página |
| `description` | string | "Portafolio de..." | Meta descripción |
| `image` | string | "/images/og-default.jpg" | Imagen OG (relativa o absoluta) |
| `imageAlt` | string | "Juan Camilo..." | Alt text de la imagen |
| `type` | string | "website" | Tipo: "website" o "article" |
| `date` | string | undefined | Fecha ISO (para artículos) |
| `author` | string | "Juan Camilo..." | Autor del contenido |
| `keywords` | array | [...] | Array de palabras clave |
| `category` | string | undefined | Categoría del contenido |
| `noindex` | boolean | false | Evitar indexación |
| `canonical` | string | URL actual | URL canónica |
| `schema` | object | Auto | Schema.org personalizado |

---

## ✅ Checklist de Implementación

- [ ] Crear `.env.local` con `NEXT_PUBLIC_SITE_URL`
- [ ] Actualizar `twitterHandle` en SEO.jsx
- [ ] Crear imágenes OG (1200x630) en `public/images/`
- [ ] Importar SEO en todas las páginas principales
- [ ] Actualizar todos los artículos MDX con metadata completa
- [ ] Verificar con Google Rich Results Test
- [ ] Probar compartiendo en redes sociales

---

## 🔍 Verificación

### 1. Google Rich Results Test
https://search.google.com/test/rich-results

### 2. Facebook Debugger
https://developers.facebook.com/tools/debug/

### 3. Twitter Card Validator
https://cards-dev.twitter.com/validator

### 4. Lighthouse (Chrome DevTools)
- Audita SEO
- Verifica metadatos
- Revisa performance

---

## 💡 Tips Adicionales

1. **Título**: Max 60 caracteres para evitar cortes en Google
2. **Descripción**: Entre 150-160 caracteres óptimo
3. **Keywords**: 5-10 palabras clave relevantes
4. **Imágenes**: Siempre incluye alt text descriptivo
5. **URLs**: Usa slugs descriptivos (kebab-case)

---

## 🚨 Errores Comunes

❌ **No usar el componente**
```jsx
// Mal
<div>Mi contenido</div>
```

✅ **Usar el componente**
```jsx
// Bien
<>
  <SEO title="Mi Página" description="..." />
  <div>Mi contenido</div>
</>
```

❌ **Imágenes sin ruta correcta**
```jsx
<SEO image="og-image.jpg" /> // Falta la barra inicial
```

✅ **Ruta correcta**
```jsx
<SEO image="/images/og-image.jpg" />
```

---

¿Dudas? Revisa los ejemplos o contacta al equipo de desarrollo.
