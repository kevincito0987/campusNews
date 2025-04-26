console.log("Funcion main");

/* 📰 Importar la API de NewsAPI */
const API_KEY = "c3f93ce5881b4336a18ae0b9dfd80d55"; // 🔑 Reemplaza con tu clave de NewsAPI
const BASE_URL = "https://newsapi.org/v2/everything"; // 🌐 URL base de la API

/* 🔄 Función para obtener la cantidad de noticias */
async function getNewsCount(query) {
    const url = `${BASE_URL}?q=${query}&apiKey=${API_KEY}`; // 🌐 URL con parámetros

    try {
        const response = await fetch(url); // 🔄 Hacer solicitud a la API
        const data = await response.json(); // 📜 Convertir la respuesta a JSON

        if (data.status === "ok") {
            console.log(`🔢 Total de noticias encontradas sobre "${query}": ${data.totalResults}`, data.articles); // 📊 Mostrar el total de noticias
            return data.totalResults; // 📊 Devolver el total de noticias
        } else {
            console.error("⚠️ Error en la API:", data.message);
            return null;
        }
    } catch (error) {
        console.error("❌ Error al obtener las noticias:", error);
        return null;
    }
}

/* 🎯 Ejecutar la función con una consulta */
getNewsCount("school"); // 📚 Consulta de noticias escolares
