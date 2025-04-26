# 📚 Campus News – Portal Universitario con Web Components 📚

**Duración estimada:** 2 horas
**Nivel:** Intermedio
**Tecnologías clave:** Web Components, Shadow DOM, Custom Events

------

  ## 🧠 Introducción

  **Campus News** es una aplicación web modular que simula un portal de noticias universitarias, construido completamente con **Web Components** y **Shadow DOM**. Cada parte de la interfaz está desacoplada y encapsulada, lo que facilita la mantenibilidad y escalabilidad del proyecto.
  La app se comunica internamente mediante **eventos personalizados**, y está pensada como práctica ideal para reforzar conceptos de desarrollo frontend moderno.

------

  ## 🎯 Objetivos

 - Desarrollar una SPA modular basada en Web Components.
 - Aplicar buenas prácticas de arquitectura frontend moderna.
 - Comunicar componentes desacoplados mediante eventos personalizados.
 - Encapsular estilos usando Shadow DOM.
 - Construir una experiencia universitaria rica e interactiva.

------

 ## 🛠️ Tecnologías utilizadas

 - **HTML5**
 - **CSS3**
 - **JavaScript (ES6+)**
 - **Git & GitHub**
 - **GitHub Pages** (para despliegue)
 - **Figma** (para diseño base)

------

 ## 🎨 Diseño base (Figma)

 Este proyecto se basa en un diseño visual tomado como referencia en Figma:

 🔗 [Diseño original en Figma](https://www.figma.com/design/ecNlAFrpeQwcQlMe7zzWTj/Positivus-Landing-Page-Design--Community-?node-id=25-145&p=f&t=vzuXFHmDJHOF43CY-0)

------

 ## 📑 Tabla de Contenidos

 - [Introducción](#🧠-introducción)
 - [Objetivos](#🎯-objetivos)
 - [Tecnologías utilizadas](#🛠️-tecnologías-utilizadas)
 - [Diseño base (Figma)](#🎨-diseño-base-figma)
 - [Estructura HTML esperada](#🧱-estructura-html-esperada)
 - [Datos de ejemplo](#🗂️-datos-de-ejemplo)
 - [Eventos personalizados](#🛰️-eventos-personalizados)
 - [Shadow DOM y estilos](#🧩-shadow-dom-y-estilos)
 - [Flujo de trabajo](#🔄-flujo-de-trabajo)
 - [Criterios de evaluación](#✅-criterios-de-evaluación)
 - [Contribuyentes](#👥-contribuyentes)
 - [Frase estelar](#🌟-frase-estelar)

------

 ## 🧱 Estructura HTML esperada

 ```
 htmlCopiarEditar<campus-news-app>
   <campus-category-filters></campus-category-filters>
   <campus-news-list></campus-news-list>
   <campus-news-detail></campus-news-detail>
   <campus-debug-panel></campus-debug-panel>
 </campus-news-app>
 ```

 ## 🧩Componentes

 - **`<campus-news-app>`**: Orquesta el estado global.
 - **`<campus-category-filters>`**: Botones de categorías.
 - **`<campus-news-list>`** / **`<campus-news-item>`**: Lista de titulares.
 - **`<campus-news-detail>`**: Detalles del artículo seleccionado.
 - **`<campus-debug-panel>`**: Panel de depuración (estado interno, toggle).

------

 ## 🗂️ Datos de ejemplo

 ```
 jsCopiarEditarconst campusArticles = [
   {
     id: 1,
     title: "Jornada de puertas abiertas en Ingeniería",
     summary: "Visitas guiadas y charlas con profesores y estudiantes.",
     content: "<p>Este sábado 3 de mayo...</p>",
     author: "Oficina de Admisiones",
     date: "28 de abril, 2025",
     category: "Eventos"
   },
   ...
 ];
 ```

------
 ## 🛰️ Eventos personalizados

 ### 📂 Cambio de categoría

 ```
 jsCopiarEditarthis.dispatchEvent(new CustomEvent("campus:category-change", {
   detail: { category: "Investigación" },
   bubbles: true,
   composed: true
 }));
 ```

 ### 📰 Selección de artículo

 ```
 jsCopiarEditarthis.dispatchEvent(new CustomEvent("campus:article-select", {
   detail: { id: this.articleId },
   bubbles: true,
   composed: true
 }));
 ```

 ### 🛠️ Actualización de depuración

 ```
 jsCopiarEditarthis.dispatchEvent(new CustomEvent("campus:debug-update", {
   detail: {
     category: currentCategory,
     selectedId: currentArticleId,
     total: campusArticles.length,
     filtered: filteredList.length
   },
   bubbles: true,
   composed: true
 }));
 ```

------

 ## 🧩 Shadow DOM y estilos

 Ejemplo en `<campus-news-item>`:

 ```
 jsCopiarEditarconst shadow = this.attachShadow({ mode: "open" });
 shadow.innerHTML = `
   <style>
     .item {
       padding: 12px;
       border-bottom: 1px solid #ddd;
       cursor: pointer;
     }
     .item.active {
       border-left: 4px solid #264653;
       background: #f0f4f8;
     }
     h3 { margin: 0 0 6px; font-size: 16px; }
     p { margin: 0; font-size: 14px; color: #555; }
     .date { font-size: 12px; color: #999; margin-top: 4px; }
   </style>
   <div class="item">
     <h3></h3>
     <p></p>
     <div class="date"></div>
   </div>
 `;
 ```

------

 ## 🔄 Flujo de trabajo

 1. Definir templates y registrar componentes con `customElements.define`.
 2. Crear `<campus-category-filters>`: botones por categoría y evento `campus:category-change`.
 3. Crear `<campus-news-list>`: renderiza ítems y escucha/se emiten selecciones.
 4. Crear `<campus-news-detail>`: muestra el contenido del artículo seleccionado.
 5. Crear `<campus-debug-panel>`: visualiza estado interno y toggle.
 6. En `<campus-news-app>`: orquestar estado global y manejar todos los eventos.

------

 ### 🎭 **Patrón de Diseño Pub/Sub Aplicado al Proyecto**

 #### 📂 **Estructura de Carpetas Final Optimizada**

 ```
 campus-news/
 ├── assets/
 │   ├── icons/          # Todos los iconos en SVG
 │   ├── images/         # Imágenes optimizadas
 │   └── fonts/          # Fuentes personalizadas
 ├── src/
 │   ├── components/     # Componentes autocontenidos
 │   │   ├── campus-news-app/    # Broker central
 │   │   │   ├── campus-news-app.js
 │   │   │   └── campus-news-app.css
 │   │   ├── campus-category-filters/  # Publicador
 │   │   └── ...otros
 │   ├── data/          # articles.js
 │   ├── events/        # constants.js
 │   ├── utils/         # helpers.js
 │   └── index.js       # Registro WC
 ├── styles/
 │   ├── global.css     # :root vars
 │   └── components/    # Estilos compartidos
 ├── index.html         # Entry point
 └── README.md
 ```

 ### 🛠 **Tips de Implementación Esenciales**

 1. **Custom Events Robustos**:

 ```
 // En constants.js
 export const EVENT_CONFIG = {
   bubbles: true,
   composed: true,  // Cruza Shadow DOM
   cancelable: true // Permite preventDefault()
 };
 
 // Al emitir
 this.dispatchEvent(new CustomEvent(
   EVENTS.FILTER_CHANGE, 
   {
     ...EVENT_CONFIG,
     detail: { category: 'noticias' }
   }
 ));
 ```

 2. **Shadow DOM Eficiente**:

 ```
 class CampusNewsItem extends HTMLElement {
   constructor() {
     super();
     this.attachShadow({ mode: 'open' });
     this.shadowRoot.innerHTML = `
       <style>
         :host {
           display: block;
           contain: content;  /* Optimización */
         }
         h3 { color: var(--text-dark) }
       </style>
       <article>
         <h3></h3>
       </article>
     `;
   }
 }
 ```

 3. **Gestión de Estado Sencilla**:

 ```
 // En campus-news-app.js
 this.state = {
   currentFilter: 'all',
   articles: [],
   get filteredArticles() {
     return this.articles.filter(a => 
       this.currentFilter === 'all' || 
       a.category === this.currentFilter
     );
   }
 };
 ```

 4. **Patrón Observer para Performance**:

 ```
 // Broker principal
 this.debounceTimer = null;
 
 this.updateComponents = () => {
   clearTimeout(this.debounceTimer);
   this.debounceTimer = setTimeout(() => {
     this.dispatchStateUpdate();
   }, 50);  // Debounce para múltiples updates
 };
 ```

 5. **Sistema de Errores**:

 ```
 try {
   this.dispatchEvent(/*...*/);
 } catch (error) {
   console.error(`Error en Pub/Sub: ${error.message}`);
   this.dispatchEvent(new CustomEvent(
     'campus:error', 
     { detail: { error } }
   ));
 }
 ```

 ### 🔥 **Flujo de Eventos.**

[](./assets/images/factory.png)

------

##  📰 Consumo de API - NewsAPI.org

La aplicación **Campus News** puede enriquecerse con noticias reales integrando [**NewsAPI.org**](https://newsapi.org/), una API pública que ofrece titulares en tiempo real de múltiples fuentes reconocidas a nivel mundial.

### 🔧 Configuración Básica

1. Crea una cuenta en newsapi.org.
2. Copia tu **API Key** desde el panel de usuario.
3. Usa tu clave dentro del proyecto de forma segura:

```
js


CopiarEditar
const NEWS_API_KEY = 'TU_API_KEY_AQUÍ';
```

### 🔄 Ejemplo de Fetch

```
jsCopiarEditarconst url = `https://newsapi.org/v2/top-headlines?country=mx&category=technology&pageSize=5&apiKey=${NEWS_API_KEY}`;

fetch(url)
  .then(res => res.json())
  .then(data => {
    const articles = data.articles.map((item, index) => ({
      id: index + 1,
      title: item.title,
      summary: item.description,
      content: `<p>${item.content}</p>`,
      author: item.author || 'Desconocido',
      date: new Date(item.publishedAt).toLocaleDateString(),
      category: item.source.name
    }));
    // Aquí puedes pasar los artículos a tu estado global
    console.log(articles);
  })
  .catch(err => console.error('Error al consumir NewsAPI:', err));
```

### 🧠 Mejores usos

#### 📌 1. Reemplazo de datos mock

Sustituye los datos estáticos (`campusArticles`) con artículos reales para un entorno más realista:

```
js


CopiarEditar
this.state.articles = articlesFromAPI;
```

#### 🎯 2. Categorías dinámicas

Relaciona las categorías locales con categorías disponibles en la API (`technology`, `science`, `sports`, etc.) para que el filtro sea más relevante:

```
js


CopiarEditar
const url = `https://newsapi.org/v2/top-headlines?category=science&country=mx&apiKey=${NEWS_API_KEY}`;
```

#### 🔁 3. Actualización automática

Integra un refresco periódico para mostrar noticias recientes cada cierto tiempo:

```
jsCopiarEditarsetInterval(() => {
  fetchLatestNews(); // función que hace el fetch y actualiza el estado
}, 60000); // cada minuto
```

#### 🧩 4. Modo híbrido

Muestra datos locales por defecto y recurre a la API solo si hay conexión a internet o cuando el usuario hace clic en "Noticias externas":

```
jsCopiarEditarif (navigator.onLine) {
  fetchExternalNews();
} else {
  this.state.articles = campusArticles;
}
```

#### 🧪 5. Panel de depuración en tiempo real

Muestra en el `<campus-debug-panel>` si los artículos vienen del mock o desde la API, útil para testing y evaluación:

```
jsCopiarEditarthis.dispatchEvent(new CustomEvent("campus:debug-update", {
  detail: {
    source: 'NewsAPI',
    total: articles.length
  },
  bubbles: true,
  composed: true
}));
```

------

 ## ✅ Criterios de evaluación

 

 | Bloque                     | Criterio                                         | Puntos  |
 | -------------------------- | ------------------------------------------------ | ------- |
 | **Componentización**       | Web Components bien definidos y encapsulados     | 25      |
 | **Eventos personalizados** | Uso correcto de `CustomEvent`, naming y bubbling | 25      |
 | **Lógica y reactividad**   | Funcionalidad fluida sin recargas                | 30      |
 | **UX & accesibilidad**     | Responsivo, roles ARIA, interacción intuitiva    | 20      |
 | **Total**                  |                                                  | **100** |

------

 ## 👥 Contribuyentes

 

 | Nombre de usuario | Perfil GitHub                                      |
 | ----------------- | -------------------------------------------------- |
 | kevincito0987     | [@kevincito0987](https://github.com/kevincito0987) |

------

 ## 🌟 Frase estelar

 > **“Componentiza tus ideas, encapsula tus miedos... ¡y que el DOM esté contigo!”** 🚀