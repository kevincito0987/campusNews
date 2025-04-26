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
            // console.log(`🔢 Total de noticias encontradas sobre "${query}": ${data.totalResults}`, data.articles); // 📊 Mostrar los resultados
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

// 📚 Función específica para noticias escolares
async function fetchSchoolNews() {
    console.log("📚 Noticias sobre 'school'");
    return await fetchNews("school"); // 🏫 Busca noticias relacionadas con escuelas
}

// 💻 Función específica para noticias tecnológicas
async function fetchTechnologyNews() {
    console.log("💻 Noticias sobre 'technology'");
    return await fetchNews("technology"); // 🔌 Busca noticias relacionadas con tecnología
}

// 🏢 Función específica para noticias corporativas
async function fetchCorporateNews() {
    console.log("🏢 Noticias sobre 'corporate'");
    return await fetchNews("corporate"); // 🏙️ Busca noticias relacionadas con negocios y empresas
}

// 🔄 Función para actualizar las tarjetas con noticias recientes del filtro de tecnología
async function updateTechnologyCards() {
    console.log("🔄 Actualizando tarjetas con noticias de tecnología...");

    try {
        // Obtener los datos de las noticias de tecnología
        const response = await fetchTechnologyNews();
        const articles = response.articles; // 📰 Extraer los artículos de la respuesta

        if (!articles || articles.length === 0) {
            console.error("❌ No se encontraron noticias de tecnología.");
            return;
        }

        // Seleccionar las tarjetas existentes
        const cards = document.querySelectorAll(".card");

        // Actualizar las primeras 5 tarjetas
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
        console.error("❌ Error al actualizar las tarjetas con noticias de tecnología:", error);
    }
}

// 🎯 Alternar estado de íconos de favoritos
document.querySelectorAll(".iconimage1 img").forEach((icon) => {
    icon.addEventListener("click", () => {
        // 🌟 Alternar entre estados
        if (icon.src.includes("emptyFavoriteIcon.svg")) {
            icon.src = "../assets/icons/fillFavoriteIcon.svg"; // Cambiar a "favorito completo"
            console.log("✅ Artículo marcado como favorito.");
        } else {
            icon.src = "../assets/icons/emptyFavoriteIcon.svg"; // Cambiar a "favoritos vacíos"
            console.log("❌ Artículo eliminado de favoritos.");
        }
    });
});

// 🎯 Escuchar eventos personalizados para cambios de categoría
document.addEventListener("campus:category-change", (event) => {
    console.log("📡 Categoría cambiada:", event.detail.category);
    // 🎯 Agregar lógica personalizada para manejar el cambio
});

// 🛠️ Actualizar las tarjetas al cargar la página
document.addEventListener("DOMContentLoaded", () => {
    updateTechnologyCards(); // 🔄 Actualizar las tarjetas con noticias de tecnología
});

document.querySelectorAll(".card-button").forEach((button) => {
    button.addEventListener("click", () => {
        button.dispatchEvent(new CustomEvent("card:button-click", {
            detail: { action: "learn-more" },
            bubbles: true,
            composed: true
        }));
        console.log("🚀 Evento disparado:", button.textContent);
    });
});
