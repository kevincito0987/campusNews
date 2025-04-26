console.log("Funcion cardContainer"); // 🎯 Punto de partida para verificar la función

class CardComponent extends HTMLElement {
    constructor() {
        super();

        // 🛠️ Crear Shadow DOM
        const shadow = this.attachShadow({ mode: "open" });

        // 🎨 Estilos aislados
        const styles = document.createElement("style");
        styles.textContent = `
            .card {
                display: flex;
                flex-direction: row;
                align-items: center;
                justify-content: center;
                gap: 20px;
                width: 90%;
                height: auto;
                margin-bottom: 40px;
                padding: 30px;
                border-radius: 30px;
                box-shadow: 0px 4px 8px rgba(255, 255, 255, 0.5);
                animation: fadeIn 0.8s ease-in-out;
                transition: box-shadow 0.3s ease, background 0.3s ease;
            }

            .card:hover {
                box-shadow: 0px 8px 16px rgba(255, 255, 255, 0.5);
                background: #33475B; /* var(--color-14) */
            }

            .card-image {
                width: 100%;
                position: relative;
                padding: 10px;
            }

            .card-image img {
                width: 100%;
                height: 100%;
                object-fit: cover;
                border-radius: 16px;
                transition: filter 0.3s ease;
            }

            .card-image img:hover {
                filter: brightness(1.1);
            }

            .iconimage1 {
                width: 60px;
                height: 60px;
                position: absolute;
                top: 30px;
                right: 30px;
                border-radius: 50%;
                background: white; /* var(--color-5) */
                display: flex;
                justify-content: center;
                align-items: center;
                cursor: pointer;
            }

            .iconimage1 img {
                width: 30px;
                height: auto;
                object-fit: cover;
                transition: transform 0.2s ease;
            }

            .iconimage1:hover img {
                transform: scale(1.1);
            }

            .card-content {
                display: flex;
                flex-direction: column;
                align-items: center;
                text-align: center;
                gap: 20px;
            }

            .card-title {
                font-size: 1.5rem;
                font-family: "Space_Grotesk-Bold", sans-serif;
                color: white; /* var(--color-5) */
                margin-bottom: 20px;
            }

            .card-text {
                font-size: 1rem;
                font-family: "Space_Grotesk-Regular", sans-serif;
                color: white; /* var(--color-5) */
            }

            .card-button {
                display: flex;
                align-items: center;
                justify-content: center;
                gap: 10px;
                padding: 10px;
                border-radius: 10px;
                text-decoration: none;
                color: white; /* var(--color-5) */
                font-size: 16px;
                font-family: "Space_Grotesk-Medium", sans-serif;
                background-color: #33475B;
                cursor: pointer;
            }
        `;

        // 🖼️ Estructura HTML
        const container = document.createElement("div");
        container.classList.add("card");
        container.innerHTML = `
            <div class="card-image">
                <img src="./assets/images/noticia1.jpeg" alt="Noticia 1">
                <div class="iconimage1">
                    <img src="./assets/icons/emptyFavoriteIcon.svg" alt="Favoritos vacíos">
                </div>
            </div>
            <div class="card-content">
                <h3 class="card-title">La Inteligencia Artificial Redefine la Exploración de Rutas 🧠🛤️</h3>
                <p class="card-text">Nuevas plataformas basadas en IA están ayudando a los aventureros a descubrir rutas personalizadas, optimizando la seguridad, los paisajes y la sostenibilidad.</p>
                <a class="card-button">
                    <img src="./assets/icons/camperNew.svg" alt="Camper New logo">
                    <p>Learn More ...</p>
                </a>
            </div>
        `;

        // 🛠️ Adjuntar estilos y contenido al Shadow DOM
        shadow.appendChild(styles);
        shadow.appendChild(container);

        // 🌟 Configurar eventos
        const favoriteIcon = container.querySelector(".iconimage1 img");
        favoriteIcon.addEventListener("click", () => this.toggleFavorite(favoriteIcon));
    }

    // ⭐ Método para alternar el estado de favoritos
    toggleFavorite(icon) {
        if (icon.src.includes("emptyFavoriteIcon.svg")) {
            icon.src = "./assets/icons/fillFavoriteIcon.svg";
            console.log("✅ Marcado como favorito.");
            this.dispatchEvent(new CustomEvent("campus:category-change", {
                detail: { category: "Favoritos" },
                bubbles: true,
                composed: true
            }));
        } else {
            icon.src = "./assets/icons/emptyFavoriteIcon.svg";
            console.log("❌ Eliminado de favoritos.");
            this.dispatchEvent(new CustomEvent("campus:category-change", {
                detail: { category: "No Favoritos" },
                bubbles: true,
                composed: true
            }));
        }
    }
}

// 📦 Registrar el componente
customElements.define("card-component", CardComponent);
