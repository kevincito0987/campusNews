console.log("Funcion main"); // 🎯 Verifica el inicio del proceso

// 📰 Importar la API de NewsAPI
const API_KEY = "c3f93ce5881b4336a18ae0b9dfd80d55"; // 🔑 Tu clave para la API
const BASE_URL = "https://newsapi.org/v2/everything"; // 🌐 URL base de la API

// 🔄 Función genérica para obtener noticias por categoría
async function fetchNews(query) {
    const url = `${BASE_URL}?q=${query}&apiKey=${API_KEY}`; // 🌐 Construir la URL con los parámetros

    try {
        const response = await fetch(url); // 🔄 Realizar solicitud a la API
        const data = await response.json(); // 📜 Parsear la respuesta a formato JSON

        if (data.status === "ok") {
            console.log(`🔢 Total de noticias encontradas sobre "${query}": ${data.totalResults}`, data.articles); // 📊 Mostrar los resultados
            return data.totalResults; // 📊 Retornar el total de noticias encontradas
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
function fetchSchoolNews() {
    console.log("📚 Noticias sobre 'school'");
    return fetchNews("school"); // 🏫 Busca noticias relacionadas con escuelas
}

// 💻 Función específica para noticias tecnológicas
function fetchTechnologyNews() {
    console.log("💻 Noticias sobre 'technology'");
    return fetchNews("technology"); // 🔌 Busca noticias relacionadas con tecnología
}

// 🏢 Función específica para noticias corporativas
function fetchCorporateNews() {
    console.log("🏢 Noticias sobre 'corporate'");
    return fetchNews("corporate"); // 🏙️ Busca noticias relacionadas con negocios y empresas
}

// 🎯 Ejecutar las funciones independientes
// fetchSchoolNews();      // 🏫 Consulta de noticias escolares
// fetchTechnologyNews();  // 💻 Consulta de noticias tecnológicas
// fetchCorporateNews();   // 🏢 Consulta de noticias corporativas
