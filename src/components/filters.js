console.log("Funcion filters"); // 🎯 Punto de partida para verificar la función

// 🌟 Crear un componente personalizado para los filtros
class FiltersComponent extends HTMLElement {
    constructor() {
        super();

        // 🛠️ Crear el Shadow DOM
        const shadow = this.attachShadow({ mode: "open" });

        // 🎨 Estilos aislados para el componente
        const styles = document.createElement("style");
        styles.textContent = `
            .filters {
                display: flex;
                flex-direction: row;
                align-items: center;
                justify-content: center;
                gap: 20px;
                margin-top: 50px;
                width: 90%;
                height: 80%;
                margin-bottom: 40px;
                padding: 30px;
            }

            .filters a {
                display: flex;
                flex-direction: row;
                align-items: center;
                justify-content: center;
                gap: 10px;
                padding: 10px;
                border-radius: 10px;
                text-decoration: none;
                color: var(--color-5);
                font-size: 16px;
                font-family: "Space_Grotesk-Medium", sans-serif;
                transition: background-color 0.3s ease, color 0.3s ease;
            }

            .filters a:hover {
                background-color: var(--color-5);
                color: var(--color-1);
            }

            .filters a img {
                width: 50px;
                transition: transform 0.3s ease;
            }

            .filters a img:hover {
                transform: scale(1.1);
            }
        `;

        // 🖼️ Estructura HTML para los filtros
        const container = document.createElement("div");
        container.classList.add("filters");
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

        // 🛠️ Adjuntar estilos y contenido al Shadow DOM
        shadow.appendChild(styles);
        shadow.appendChild(container);

        // 🔗 Agregar eventos para los enlaces
        container.querySelectorAll("a").forEach((link) => {
            link.addEventListener("click", (event) => {
                event.preventDefault(); // 🚫 Evitar comportamiento predeterminado del enlace

                // 📰 Obtener la categoría seleccionada
                const category = event.currentTarget.getAttribute("data-category");
                console.log(`📡 Categoría seleccionada: ${category}`);

                // 🚀 Disparar evento personalizado
                this.dispatchEvent(
                    new CustomEvent("campus:category-change", {
                        detail: { category }, // Detalle del evento con la categoría
                        bubbles: true, // 💨 Permitir que el evento burbujee
                        composed: true, // 🔗 Exponer el evento fuera del Shadow DOM
                    })
                );
            });
        });
    }
}

// 📦 Registrar el componente personalizado
customElements.define("filters-component", FiltersComponent);


document.addEventListener("campus:category-change", (event) => {
    console.log("🚀 Evento capturado:", event.detail.category);
    // 🎯 Lógica personalizada para la categoría seleccionada
});