console.log("Funcion main"); // 🎯 Verifica el inicio del proceso principal

// 📰 URL de tu API en Railway
const BASE_URL = "https://campusnews-production.up.railway.app/api/news";

// 🔒 Inicialización de lista para favoritos desde localStorage
let favoriteCards = JSON.parse(localStorage.getItem("favoriteCards")) || []; // ⚡ Recuperar favoritos

// 🔄 Función para obtener y filtrar noticias según la categoría
async function fetchFilteredNews(category) {
    try {
        const response = await fetch(BASE_URL); // 🌐 Obtener todas las noticias desde la API
        if (!response.ok) throw new Error(`Error ${response.status}: ${response.statusText}`);

        const data = await response.json(); // 📜 Convertir respuesta a JSON
        if (!Array.isArray(data) || data.length === 0) {
            console.error("❌ No hay noticias disponibles.");
            return [];
        }

        // 🏆 Filtrado por categoría
        const filteredNews = data.filter(article => {
            const text = `${article.title} ${article.description} ${article.content}`.toLowerCase();
            
            switch (category) {
                case "school":
                    return text.includes("school") || text.includes("education") || text.includes("students") || 
                           text.includes("university") || text.includes("academic") || text.includes("research project") || 
                           text.includes("faculty") || text.includes("scholarship") || text.includes("campus") ||
                           text.includes("extracurricular") || text.includes("college sports") || text.includes("student") ||
                           text.includes("learning") || text.includes("professor") || text.includes("class") || 
                           text.includes("teacher") || text.includes("degree") || text.includes("exam") ||
                           text.includes("academy") || text.includes("scholars") || text.includes("internship") ||
                           text.includes("lecture") || text.includes("graduate") || text.includes("curriculum") ||
                           text.includes("tuition") || text.includes("faculty") || text.includes("high school") || 
                           text.includes("elementary") || text.includes("mentorship");
                case "technology":
                    return text.includes("technology") || text.includes("tech") || text.includes("AI") || 
                           text.includes("software") || text.includes("gadgets");
                case "corporate":
                    return text.includes("corporate") || text.includes("business") || text.includes("company") || 
                           text.includes("startup") || text.includes("finance");
                case "all":
                default:
                    return true; // 🔄 Trae todas las noticias recientes
            }
        });

        return filteredNews;
    } catch (error) {
        console.error("❌ Error al obtener y filtrar las noticias:", error.message);
        return [];
    }
}

// 🔄 Función para actualizar las tarjetas en la interfaz según la categoría
async function updateCards(category = "all") {
    console.log(`🔄 Actualizando tarjetas para la categoría: ${category}`);

    try {
        const articles = await fetchFilteredNews(category); // ✅ Aplicar filtro
        if (articles.length === 0) {
            console.error("❌ No se encontraron noticias para esta categoría.");
            return;
        }

        const cardsContainer = document.querySelector(".card-container");
        cardsContainer.innerHTML = ""; // 🚿 Limpiar el contenedor antes de insertar tarjetas

        articles.forEach((article) => { // 💡 Ahora no limitamos a 5 noticias
            const card = createCard(article); // 🃏 Crear tarjeta para cada artículo
            cardsContainer.appendChild(card); // 🖼️ Agregar tarjeta al contenedor
        });

        console.log(`✅ Se actualizaron ${articles.length} tarjetas correctamente.`);
    } catch (error) {
        console.error("❌ Error al actualizar las tarjetas:", error);
    }
}

// 🔧 Función para construir las tarjetas de noticias
function createCard(article) {
    const title = article.title || "Título no disponible";
    const description = article.description || "Descripción no disponible.";
    const url = article.url || "#";
    const image = article.urlToImage || "./assets/images/placeholder.jpg";

    const card = document.createElement("div");
    card.classList.add("card");

    card.innerHTML = `
        <div class="card-image">
            <a href="${url}" target="_blank">
                <img src="${image}" alt="${title}">
            </a>
            <div class="iconimage1">
                <img src="./assets/icons/emptyFavoriteIcon.svg" alt="Favoritos vacíos">
            </div>
        </div>
        <div class="card-content">
            <h3 class="card-title">${title}</h3>
            <p class="card-text">${description}</p>
            <a href="${url}" class="card-button" target="_blank">
                <img src="./assets/icons/camperNew.svg" alt="Camper New logo">
                <p>Leer más ...</p>
            </a>
        </div>
    `;

    const isFavorite = favoriteCards.some((fav) => fav.title === title);
    const favoriteIcon = card.querySelector(".iconimage1 img");
    favoriteIcon.src = isFavorite ? "./assets/icons/fillFavoriteIcon.svg" : "./assets/icons/emptyFavoriteIcon.svg";

    favoriteIcon.addEventListener("click", () => toggleFavorite(card, { title, description, url, image }, favoriteIcon));

    return card;
}

// ⭐ Función para alternar el estado de favoritos
function toggleFavorite(card, article, icon) {
    if (icon.src.includes("emptyFavoriteIcon.svg")) {
        icon.src = "./assets/icons/fillFavoriteIcon.svg";
        favoriteCards.push(article);
        console.log("✅ Artículo marcado como favorito:", article.title);
    } else {
        icon.src = "./assets/icons/emptyFavoriteIcon.svg";
        favoriteCards = favoriteCards.filter((fav) => fav.title !== article.title);
        console.log("❌ Artículo eliminado de favoritos:", article.title);
        card.remove();
    }

    localStorage.setItem("favoriteCards", JSON.stringify(favoriteCards));
}

// 🛠️ Mostrar solo las tarjetas marcadas como favoritas
function showFavoriteCards() {
    console.log("✨ Mostrando solo las tarjetas favoritas...");
    const cardsContainer = document.querySelector(".card-container");
    cardsContainer.innerHTML = "";

    favoriteCards.forEach((fav) => {
        const card = createCard({
            title: fav.title,
            description: fav.description,
            url: fav.url,
            urlToImage: fav.image || "./assets/images/placeholder.jpg",
        });
        cardsContainer.appendChild(card);
    });
}

// 🎯 Escuchar cambios de categoría
document.addEventListener("campus:category-change", (event) => {
    const category = event.detail.category;
    console.log("🚀 Evento capturado: categoría seleccionada:", category);

    if (category === "favorites") {
        showFavoriteCards(); // ⭐ Mostrar favoritos
    } else {
        updateCards(category); // 🔄 Actualizar tarjetas según la categoría
    }
});

// 🛠️ Cargar tarjetas iniciales al cargar la página
document.addEventListener("DOMContentLoaded", () => {
    updateCards("all"); // 🚀 Inicializar con "All News"
});
