console.log("Funcion main"); // 🎯 Verifica el inicio del proceso

// 📰 Importar la API de NewsAPI
const API_KEY = "46764596d04e4535a98f20d752e0735d"; // 🔑 Tu clave para la API
const BASE_URL = "https://newsapi.org/v2/everything"; // 🌐 URL base de la API

// 🔒 Lista para almacenar las tarjetas marcadas como favoritas
let favoriteCards = JSON.parse(localStorage.getItem("favoriteCards")) || []; // Cargar favoritos desde localStorage

// 🔄 Función genérica para obtener noticias por categoría
async function fetchNews(query) {
    const url = `${BASE_URL}?q=${query}&apiKey=${API_KEY}`; // 🌐 Construir la URL con los parámetros

    try {
        const response = await fetch(url); // 🔄 Realizar solicitud a la API
        const data = await response.json(); // 📜 Parsear la respuesta a formato JSON

        if (data.status === "ok") {
            return data; // 📰 Retornar datos completos (artículos incluidos)
        } else {
            console.error("⚠️ Error en la API:", data.message); // ⚠️ Mostrar error si ocurre
            return null;
        }
    } catch (error) {
        console.error("❌ Error al obtener las noticias:", error); // ❌ Capturar errores de la solicitud
        return null;
    }
}

// 🔄 Función para actualizar las tarjetas con noticias recientes
async function updateCards(category) {
    console.log(`🔄 Actualizando tarjetas para la categoría: ${category}`);

    try {
        // Obtener los datos de noticias
        const response = await fetchNews(category);
        const articles = response.articles; // 📰 Extraer los artículos de la respuesta

        if (!articles || articles.length === 0) {
            console.error("❌ No se encontraron noticias para esta categoría.");
            return;
        }

        // Seleccionar las tarjetas existentes
        const cardsContainer = document.querySelector(".card-container");
        cardsContainer.innerHTML = ""; // Limpiar el contenedor SOLO para esta categoría

        articles.slice(0, 5).forEach((article) => {
            const card = createCard(article);
            cardsContainer.appendChild(card); // Agregar tarjeta al contenedor
        });

        console.log("✅ Las tarjetas se han actualizado correctamente.");
    } catch (error) {
        console.error("❌ Error al actualizar las tarjetas:", error);
    }
}

// 🔧 Función para crear una tarjeta
function createCard(article) {
    const card = document.createElement("div");
    card.classList.add("card");
    card.innerHTML = `
        <div class="card-image">
            <a href="${article.url}" target="_blank">
                <img src="${article.urlToImage || './assets/images/placeholder.jpg'}" alt="${article.title}">
            </a>
            <div class="iconimage1">
                <img src="./assets/icons/emptyFavoriteIcon.svg" alt="Favoritos vacíos">
            </div>
        </div>
        <div class="card-content">
            <h3 class="card-title">${article.title}</h3>
            <p class="card-text">${article.description || 'Descripción no disponible.'}</p>
            <a href="${article.url}" class="card-button" target="_blank">
                <p>Leer más ...</p>
            </a>
        </div>
    `;

    // Verificar si el artículo ya está en favoritos y actualizar el ícono
    const isFavorite = favoriteCards.some((fav) => fav.article.title === article.title);
    const favoriteIcon = card.querySelector(".iconimage1 img");
    favoriteIcon.src = isFavorite ? "./assets/icons/fillFavoriteIcon.svg" : "./assets/icons/emptyFavoriteIcon.svg";

    // 📌 Agregar evento de favoritos
    favoriteIcon.addEventListener("click", () => toggleFavorite(card, article, favoriteIcon));

    return card;
}

// ⭐ Función para alternar el estado de favoritos
function toggleFavorite(card, article, icon) {
    if (icon.src.includes("emptyFavoriteIcon.svg")) {
        icon.src = "./assets/icons/fillFavoriteIcon.svg"; // Cambiar a ícono lleno
        favoriteCards.push({ card, article }); // Guardar la tarjeta en favoritos
        console.log("✅ Artículo marcado como favorito:", article.title);
    } else {
        icon.src = "./assets/icons/emptyFavoriteIcon.svg"; // Cambiar a ícono vacío
        favoriteCards = favoriteCards.filter((fav) => fav.article.title !== article.title); // Remover de favoritos
        console.log("❌ Artículo eliminado de favoritos:", article.title);
    }

    // Guardar el estado actualizado en localStorage
    localStorage.setItem("favoriteCards", JSON.stringify(favoriteCards));

    // Actualizar dinámicamente la vista de favoritos si estamos en ese filtro
    const currentCategory = document.querySelector(".filters .active")?.getAttribute("data-category");
    if (currentCategory === "favorites") {
        showFavoriteCards();
    }
}

// 🛠️ Mostrar solo las tarjetas favoritas
function showFavoriteCards() {
    console.log("✨ Mostrando solo las tarjetas favoritas...");
    const cardsContainer = document.querySelector(".card-container");
    cardsContainer.innerHTML = ""; // Limpiar solo la vista de favoritos

    favoriteCards.forEach(({ article }) => {
        const clonedCard = createCard(article); // Crear tarjeta clonada
        cardsContainer.appendChild(clonedCard); // Agregar tarjeta clonada al contenedor
    });
}

// 🎯 Escuchar cambios de categoría
document.addEventListener("campus:category-change", (event) => {
    const category = event.detail.category;
    console.log("🚀 Evento capturado, categoría seleccionada:", category);

    if (category === "favorites") {
        showFavoriteCards(); // Mostrar solo las favoritas
    } else {
        updateCards(category); // Actualizar tarjetas según la categoría seleccionada
    }
});

// 🛠️ Actualizar las tarjetas al cargar la página con el filtro "all"
document.addEventListener("DOMContentLoaded", () => {
    updateCards("all"); // Inicializar con "All News"
});
