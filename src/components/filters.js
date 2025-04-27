console.log("Funcion filters"); // 🎯 Verificar el inicio de la función

// 🌟 Clase para crear un componente personalizado de filtros
class FiltersComponent extends HTMLElement {
    constructor() {
        super();

        // 🛠️ Crear el Shadow DOM para encapsular estilos
        const shadow = this.attachShadow({ mode: "open" });

        // 🎨 Estilos específicos y aislados para el componente
        const styles = document.createElement("style");
        styles.textContent = `
            .filters {
                display: flex; /* 📐 Activar flexbox */
                flex-direction: row; /* ➡️ Organizar los filtros en fila */
                align-items: center; /* 🎯 Centrar los filtros verticalmente */
                justify-content: center; /* 🎯 Centrar los filtros horizontalmente */
                gap: 20px; /* ✨ Espaciado entre filtros */
                margin-top: 50px; /* 🖼️ Espaciado superior */
                width: 90%; /* 📏 Ajustar el ancho del contenedor */
                height: 80%; /* 📏 Ajustar la altura dinámica */
                margin-bottom: 40px; /* 🖼️ Espaciado inferior */
                padding: 30px; /* ✨ Espaciado interno */
            }

            .filters a {
                display: flex; /* 📐 Flexbox para organizar elementos del enlace */
                flex-direction: row; /* ➡️ Organizar contenido en fila */
                align-items: center; /* 🎯 Centrar verticalmente */
                justify-content: center; /* 🎯 Centrar horizontalmente */
                gap: 10px; /* ✨ Espaciado interno entre ícono y texto */
                padding: 10px; /* ✨ Espaciado interno cómodo */
                border-radius: 10px; /* 🎨 Bordes redondeados para diseño suave */
                text-decoration: none; /* 🚫 Eliminar subrayado de los enlaces */
                color: var(--color-5); /* 🎨 Color del texto */
                font-size: 16px; /* 📏 Tamaño del texto */
                font-family: "Space_Grotesk-Medium", sans-serif; /* 🖋️ Fuente moderna */
                transition: background-color 0.3s ease, color 0.3s ease; /* ✨ Efectos suaves al pasar el ratón */
            }

            .filters a:hover {
                background-color: var(--color-5); /* 🎨 Fondo al pasar el ratón */
                color: var(--color-1); /* 🎨 Cambiar el color del texto */
            }

            .filters a img {
                width: 50px; /* 📏 Tamaño de los íconos */
                transition: transform 0.3s ease; /* ✨ Transición suave al pasar el ratón */
            }

            .filters a img:hover {
                transform: scale(1.1); /* 🔍 Efecto de zoom al pasar el ratón */
            }
        `;

        // 🖼️ Contenedor principal para los filtros
        const container = document.createElement("div");
        container.classList.add("filters"); // 📦 Asignar clase al contenedor

        // 🔗 Estructura HTML de los filtros
        container.innerHTML = `
            <a href="#" data-category="all">
                <img src="./assets/icons/AllNewsIcon.svg" alt="All News">
                <p>All News</p>
            </a>
            <a href="#" data-category="favorites">
                <img src="./assets/icons/favoritesNewsIcon.svg" alt="Favorite News">
                <p>Favorite News</p>
            </a>
            <a href="#" data-category="school">
                <img src="./assets/icons/schoolNewsIcon.svg" alt="School News">
                <p>School News</p>
            </a>
            <a href="#" data-category="technology">
                <img src="./assets/icons/technologyNewsIcon.svg" alt="Technology News">
                <p>Technology News</p>
            </a>
            <a href="#" data-category="corporate">
                <img src="./assets/icons/compañiaNewsIcon.svg" alt="Corporate News">
                <p>Corporate News</p>
            </a>
        `;

        // 🛠️ Agregar estilos y estructura al Shadow DOM
        shadow.appendChild(styles); // 📜 Insertar estilos aislados
        shadow.appendChild(container); // 🖼️ Insertar estructura HTML

        // 📡 Agregar eventos para interacción con los filtros
        container.querySelectorAll("a").forEach((link) => {
            link.addEventListener("click", (event) => {
                event.preventDefault(); // 🚫 Evitar la acción predeterminada del enlace

                // 📰 Obtener la categoría seleccionada
                const category = event.currentTarget.getAttribute("data-category");
                console.log(`📡 Categoría seleccionada: ${category}`);

                // 🚀 Emitir un evento personalizado
                this.dispatchEvent(
                    new CustomEvent("campus:category-change", {
                        detail: { category }, // 💡 Detalle del evento: categoría seleccionada
                        bubbles: true, // 💨 Permitir propagación del evento
                        composed: true, // 🔗 Exponer fuera del Shadow DOM
                    })
                );
            });
        });
    }
}

// 📦 Registrar el componente personalizado para filtros
customElements.define("filters-component", FiltersComponent);

// 📡 Capturar el evento de cambio de categoría
document.addEventListener("campus:category-change", (event) => {
    console.log("🚀 Evento capturado:", event.detail.category);
    // 🎯 Implementar lógica específica según la categoría seleccionada
});
