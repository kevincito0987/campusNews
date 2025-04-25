# 📚 Campus News – Portal Universitario con Web Components 📚

> **Duración estimada:** 2 horas
>  **Nivel:** Intermedio
>  **Tecnologías clave:** Web Components, Shadow DOM, Custom Events
>
> ------
>
> ## 🧠 Introducción
>
> **Campus News** es una aplicación web modular que simula un portal de noticias universitarias, construido completamente con **Web Components** y **Shadow DOM**. Cada parte de la interfaz está desacoplada y encapsulada, lo que facilita la mantenibilidad y escalabilidad del proyecto.
>  La app se comunica internamente mediante **eventos personalizados**, y está pensada como práctica ideal para reforzar conceptos de desarrollo frontend moderno.
>
> ------
>
> ## 🎯 Objetivos
>
> - Desarrollar una SPA modular basada en Web Components.
> - Aplicar buenas prácticas de arquitectura frontend moderna.
> - Comunicar componentes desacoplados mediante eventos personalizados.
> - Encapsular estilos usando Shadow DOM.
> - Construir una experiencia universitaria rica e interactiva.
>
> ------
>
> ## 🛠️ Tecnologías utilizadas
>
> - **HTML5**
> - **CSS3**
> - **JavaScript (ES6+)**
> - **Git & GitHub**
> - **GitHub Projects** (para gestión de tareas)
> - **GitHub Pages** (para despliegue)
> - **Figma** (para diseño base)
>
> ------
>
> ## 🎨 Diseño base (Figma)
>
> Este proyecto se basa en un diseño visual tomado como referencia en Figma:
>
> 🔗 [Diseño original en Figma](https://www.figma.com/design/ecNlAFrpeQwcQlMe7zzWTj/Positivus-Landing-Page-Design--Community-?node-id=25-145&p=f&t=vzuXFHmDJHOF43CY-0)
>
> ------
>
> ## 📑 Tabla de Contenidos
>
> - [Introducción](#🧠-introducción)
> - [Objetivos](#🎯-objetivos)
> - [Tecnologías utilizadas](#🛠️-tecnologías-utilizadas)
> - [Diseño base (Figma)](#🎨-diseño-base-figma)
> - [Estructura HTML esperada](#🧱-estructura-html-esperada)
> - [Datos de ejemplo](#🗂️-datos-de-ejemplo)
> - [Eventos personalizados](#🛰️-eventos-personalizados)
> - [Shadow DOM y estilos](#🧩-shadow-dom-y-estilos)
> - [Flujo de trabajo](#🔄-flujo-de-trabajo)
> - [Criterios de evaluación](#✅-criterios-de-evaluación)
> - [Contribuyentes](#👥-contribuyentes)
> - [Frase estelar](#🌟-frase-estelar)
>
> ------
>
> ## 🧱 Estructura HTML esperada
>
> ```
> htmlCopiarEditar<campus-news-app>
>   <campus-category-filters></campus-category-filters>
>   <campus-news-list></campus-news-list>
>   <campus-news-detail></campus-news-detail>
>   <campus-debug-panel></campus-debug-panel>
> </campus-news-app>
> ```
>
> ### Componentes
>
> - **`<campus-news-app>`**: Orquesta el estado global.
> - **`<campus-category-filters>`**: Botones de categorías.
> - **`<campus-news-list>`** / **`<campus-news-item>`**: Lista de titulares.
> - **`<campus-news-detail>`**: Detalles del artículo seleccionado.
> - **`<campus-debug-panel>`**: Panel de depuración (estado interno, toggle).
>
> ------
>
> ## 🗂️ Datos de ejemplo
>
> ```
> jsCopiarEditarconst campusArticles = [
>   {
>     id: 1,
>     title: "Jornada de puertas abiertas en Ingeniería",
>     summary: "Visitas guiadas y charlas con profesores y estudiantes.",
>     content: "<p>Este sábado 3 de mayo...</p>",
>     author: "Oficina de Admisiones",
>     date: "28 de abril, 2025",
>     category: "Eventos"
>   },
>   ...
> ];
> ```
>
> ------
>
> ## 🛰️ Eventos personalizados
>
> ### 📂 Cambio de categoría
>
> ```
> jsCopiarEditarthis.dispatchEvent(new CustomEvent("campus:category-change", {
>   detail: { category: "Investigación" },
>   bubbles: true,
>   composed: true
> }));
> ```
>
> ### 📰 Selección de artículo
>
> ```
> jsCopiarEditarthis.dispatchEvent(new CustomEvent("campus:article-select", {
>   detail: { id: this.articleId },
>   bubbles: true,
>   composed: true
> }));
> ```
>
> ### 🛠️ Actualización de depuración
>
> ```
> jsCopiarEditarthis.dispatchEvent(new CustomEvent("campus:debug-update", {
>   detail: {
>     category: currentCategory,
>     selectedId: currentArticleId,
>     total: campusArticles.length,
>     filtered: filteredList.length
>   },
>   bubbles: true,
>   composed: true
> }));
> ```
>
> ------
>
> ## 🧩 Shadow DOM y estilos
>
> Ejemplo en `<campus-news-item>`:
>
> ```
> jsCopiarEditarconst shadow = this.attachShadow({ mode: "open" });
> shadow.innerHTML = `
>   <style>
>     .item {
>       padding: 12px;
>       border-bottom: 1px solid #ddd;
>       cursor: pointer;
>     }
>     .item.active {
>       border-left: 4px solid #264653;
>       background: #f0f4f8;
>     }
>     h3 { margin: 0 0 6px; font-size: 16px; }
>     p { margin: 0; font-size: 14px; color: #555; }
>     .date { font-size: 12px; color: #999; margin-top: 4px; }
>   </style>
>   <div class="item">
>     <h3></h3>
>     <p></p>
>     <div class="date"></div>
>   </div>
> `;
> ```
>
> ------
>
> ## 🔄 Flujo de trabajo
>
> 1. Definir templates y registrar componentes con `customElements.define`.
> 2. Crear `<campus-category-filters>`: botones por categoría y evento `campus:category-change`.
> 3. Crear `<campus-news-list>`: renderiza ítems y escucha/se emiten selecciones.
> 4. Crear `<campus-news-detail>`: muestra el contenido del artículo seleccionado.
> 5. Crear `<campus-debug-panel>`: visualiza estado interno y toggle.
> 6. En `<campus-news-app>`: orquestar estado global y manejar todos los eventos.
>
> ------
>
> ## ✅ Criterios de evaluación
>
> 
>
> | Bloque                     | Criterio                                         | Puntos  |
> | -------------------------- | ------------------------------------------------ | ------- |
> | **Componentización**       | Web Components bien definidos y encapsulados     | 25      |
> | **Eventos personalizados** | Uso correcto de `CustomEvent`, naming y bubbling | 25      |
> | **Lógica y reactividad**   | Funcionalidad fluida sin recargas                | 30      |
> | **UX & accesibilidad**     | Responsivo, roles ARIA, interacción intuitiva    | 20      |
> | **Total**                  |                                                  | **100** |
>
> ------
>
> ## 👥 Contribuyentes
>
> 
>
> | Nombre de usuario | Perfil GitHub                                      |
> | ----------------- | -------------------------------------------------- |
> | kevincito0987     | [@kevincito0987](https://github.com/kevincito0987) |
>
> ------
>
> ## 🌟 Frase estelar
>
> > **“Componentiza tus ideas, encapsula tus miedos... ¡y que el DOM esté contigo!”** 🚀