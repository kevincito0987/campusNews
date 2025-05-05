console.log("Funcion main"); // 🎯 Verifica el inicio del proceso principal

// 📰 Claves y URL para la API de NewsAPI
const API_KEY = "94391a6841094cbb9fd78fe78bfe1714"; // 🔑 Clave de la API de NewsAPI
const BASE_URL = "https://newsapi.org/v2/everything"; // 🌐 URL base de la API

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

fetchNews("all").then((response) => {
    console.log(response);
});