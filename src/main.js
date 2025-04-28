console.log("Funcion main"); // 🎯 Verifica el inicio del proceso principal

// 📰 Claves y URL para la API de NewsAPI
const API_KEY = "94391a6841094cbb9fd78fe78bfe1714"; // 🔑 Clave de la API
const BASE_URL = "https://newsapi.org/v2/everything"; // 🌐 URL base de la API

// 🔒 Inicialización de lista para favoritos
let favoriteCards = JSON.parse(localStorage.getItem("favoriteCards")) || []; // ⚡ Recuperar favoritos desde localStorage

// 🔄 Función genérica para obtener noticias según categoría
async function fetchNews(query) {
    const url = `${BASE_URL}?q=${query}&apiKey=${API_KEY}`; // 🌐 Construir la URL con parámetros

    try {
        const response = await fetch(url); // 🔄 Realizar solicitud a la API
        const data = await response.json(); // 📜 Parsear respuesta como JSON

        if (data.status === "ok") {
            return data; // 📰 Retornar artículos si la solicitud es exitosa
        } else {
            console.error("⚠️ Error en la API:", data.message); // ⚠️ Mostrar error en la consola
            return null;
        }
    } catch (error) {
        console.error("❌ Error al obtener las noticias:", error); // ❌ Capturar errores de solicitud
        return null;
    }
}

// 🔄 Función para actualizar las tarjetas en la interfaz
async function updateCards(category) {
    console.log(`🔄 Actualizando tarjetas para la categoría: ${category}`);

    try {
        const response = await fetchNews(category);
        const articles = response?.articles; // 📰 Extraer artículos de la respuesta

        if (!articles || articles.length === 0) {
            console.error("❌ No se encontraron noticias para esta categoría.");
            return;
        }

        const cardsContainer = document.querySelector(".card-container");
        cardsContainer.innerHTML = ""; // 🚿 Limpiar el contenedor antes de insertar tarjetas

        articles.slice(0, 5).forEach((article) => {
            const card = createCard(article); // 🃏 Crear tarjeta para cada artículo
            cardsContainer.appendChild(card); // 🖼️ Agregar tarjeta al contenedor
        });

        console.log("✅ Tarjetas actualizadas correctamente.");
    } catch (error) {
        console.error("❌ Error al actualizar las tarjetas:", error);
    }
}

// 🔧 Función para construir las tarjetas de noticias
function createCard(article) {
    // 📋 Asignar valores predeterminados si faltan datos
    const title = article.title || "Título no disponible";
    const description = article.description || "Descripción no disponible.";
    const url = article.url || "#";
    const image = article.urlToImage || "./assets/images/placeholder.jpg";

    const card = document.createElement("div");
    card.classList.add("card"); // 🃏 Asignar clase de estilo

    // 🔗 Estructura HTML de la tarjeta
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

    // ⭐ Agregar evento para alternar estado de favoritos
    favoriteIcon.addEventListener("click", () => toggleFavorite(card, { title, description, url, image }, favoriteIcon));

    return card; // 🖼️ Retornar la tarjeta construida
}

// ⭐ Función para alternar el estado de favoritos
function toggleFavorite(card, article, icon) {
    if (icon.src.includes("emptyFavoriteIcon.svg")) {
        icon.src = "./assets/icons/fillFavoriteIcon.svg"; // 🟡 Cambiar a favorito lleno
        favoriteCards.push(article); // 📋 Agregar a favoritos
        console.log("✅ Artículo marcado como favorito:", article.title);
    } else {
        icon.src = "./assets/icons/emptyFavoriteIcon.svg"; // ⚪ Cambiar a favorito vacío
        favoriteCards = favoriteCards.filter((fav) => fav.title !== article.title); // 🗑️ Remover de favoritos
        console.log("❌ Artículo eliminado de favoritos:", article.title);

        card.remove(); // 🚿 Eliminar tarjeta del DOM
    }

    // 💾 Actualizar favoritos en localStorage
    localStorage.setItem("favoriteCards", JSON.stringify(favoriteCards));
}

// 🛠️ Mostrar solo las tarjetas marcadas como favoritas
function showFavoriteCards() {
    console.log("✨ Mostrando solo las tarjetas favoritas...");
    const cardsContainer = document.querySelector(".card-container");
    cardsContainer.innerHTML = ""; // 🚿 Limpiar el contenedor

    favoriteCards.forEach((fav) => {
        const card = createCard({
            title: fav.title,
            description: fav.description,
            url: fav.url,
            urlToImage: fav.image || "./assets/images/placeholder.jpg", // 📸 Usar imagen predeterminada si falta
        });
        cardsContainer.appendChild(card); // 🖼️ Agregar tarjetas al contenedor
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
