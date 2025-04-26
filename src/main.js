console.log("Funcion main"); // 🎯 Verifica el inicio del proceso

// 📰 Importar la API de NewsAPI
const API_KEY = "46764596d04e4535a98f20d752e0735d"; // 🔑 Tu clave para la API
const BASE_URL = "https://newsapi.org/v2/everything"; // 🌐 URL base de la API

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
        const cards = document.querySelectorAll(".card");

        // Actualizar las tarjetas con las primeras 5 noticias
        articles.slice(0, 5).forEach((article, index) => {
            const card = cards[index];

            if (card) {
                // 🖼️ Actualizar imagen
                const image = card.querySelector(".card-image img");
                image.src = article.urlToImage || "./assets/images/placeholder.jpg"; // Imagen predeterminada si no hay imagen
                image.alt = article.title;

                // 🌟 Actualizar título
                const title = card.querySelector(".card-title");
                title.textContent = article.title;

                // 📝 Actualizar descripción
                const text = card.querySelector(".card-text");
                text.textContent = article.description || "Descripción no disponible.";

                // 🔗 Actualizar botón
                const button = card.querySelector(".card-button");
                button.href = article.url;
                const buttonText = button.querySelector("p");
                buttonText.textContent = "Leer más ...";

                // 🛠️ Restablecer el ícono de favoritos
                const favoriteIcon = card.querySelector(".iconimage1 img");
                favoriteIcon.src = "./assets/icons/emptyFavoriteIcon.svg"; // Ícono predeterminado
            }
        });

        console.log("✅ Las tarjetas se han actualizado correctamente.");
    } catch (error) {
        console.error("❌ Error al actualizar las tarjetas:", error);
    }
}

// 🎯 Escuchar cambios de categoría
document.addEventListener("campus:category-change", (event) => {
    const category = event.detail.category;
    console.log("🚀 Evento capturado, categoría seleccionada:", category);

    // Actualizar las tarjetas según la categoría seleccionada
    if (["all", "school", "technology", "corporate"].includes(category)) {
        updateCards(category);
    } else {
        console.log("⚠️ Categoría desconocida, no se actualizarán las tarjetas.");
    }
});

// 🛠️ Actualizar las tarjetas al cargar la página con el filtro "all"
document.addEventListener("DOMContentLoaded", () => {
    updateCards("all"); // Inicializar con "All News"
});
