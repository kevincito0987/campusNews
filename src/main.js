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
        const response = await fetchNews(category);
        const articles = response?.articles; // 📰 Extraer los artículos de la respuesta

        if (!articles || articles.length === 0) {
            console.error("❌ No se encontraron noticias para esta categoría.");
            return;
        }

        const cardsContainer = document.querySelector(".card-container");
        cardsContainer.innerHTML = ""; // Limpiar el contenedor antes de agregar tarjetas

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
        favoriteCards.push(article); // Guardar el artículo en favoritos
        console.log("✅ Artículo marcado como favorito:", article.title);
    } else {
        icon.src = "./assets/icons/emptyFavoriteIcon.svg";
        favoriteCards = favoriteCards.filter((fav) => fav.title !== article.title); // Remover de favoritos
        console.log("❌ Artículo eliminado de favoritos:", article.title);

        // Actualizar la vista de favoritos de inmediato
        const currentCategory = document.querySelector(".filters .active")?.getAttribute("data-category");
        if (currentCategory === "favorites") {
            showFavoriteCards();
        }
    }

    localStorage.setItem("favoriteCards", JSON.stringify(favoriteCards)); // Guardar en localStorage
}

// 🛠️ Mostrar solo las tarjetas favoritas
function showFavoriteCards() {
    console.log("✨ Mostrando solo las tarjetas favoritas...");
    const cardsContainer = document.querySelector(".card-container");
    cardsContainer.innerHTML = ""; // Limpiar el contenedor

    favoriteCards.forEach((fav) => {
        const card = createCard({
            title: fav.title,
            description: fav.description,
            url: fav.url,
            urlToImage: fav.image || "./assets/images/placeholder.jpg", // Asegurar imagen predeterminada
        });
        cardsContainer.appendChild(card);
    });
}

// 🎯 Escuchar cambios de categoría
document.addEventListener("campus:category-change", (event) => {
    const category = event.detail.category;
    console.log("🚀 Evento capturado, categoría seleccionada:", category);

    if (category === "favorites") {
        showFavoriteCards();
    } else {
        updateCards(category);
    }
});

// 🛠️ Actualizar las tarjetas al cargar la página con el filtro "all"
document.addEventListener("DOMContentLoaded", () => {
    updateCards("all");
});
