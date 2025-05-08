console.log("Funcion main");

// 📌 Importaciones
const { connectDB } = require("./data/mongoDb");
const News = require("./models/newsModel");

// 🔄 API NewsAPI
const API_KEY = "94391a6841094cbb9fd78fe78bfe1714";
const BASE_URL = "https://newsapi.org/v2/everything";

// 📥 Obtener noticias
async function fetchNews(query) {
    const url = `${BASE_URL}?q=${query}&apiKey=${API_KEY}`;

    try {
        const response = await fetch(url);
        const data = await response.json();

        if (data.status === "ok") {
            return data.articles;
        } else {
            console.error("⚠️ Error en la API:", data.message);
            return null;
        }
    } catch (error) {
        console.error("❌ Error al obtener las noticias:", error);
        return null;
    }
}

// 💾 Guardar noticias en la DB
async function saveNewsToDB(query) {
    try {
        await News.deleteMany({});
        console.log("🗑️ Noticias eliminadas de la base de datos.");

        const articles = await fetchNews(query);
    
        if (!articles) {
            console.log("⚠️ No se encontraron artículos para guardar.");
            return;
        }

        const formattedArticles = articles.map(article => ({
            source: {
                id: article.source?.id || "Sin ID",
                name: article.source?.name || "Sin Nombre",
            },
            author: article.author || "Desconocido",
            title: article.title,
            description: article.description,
            url: article.url,
            urlToImage: article.urlToImage || "Sin Imagen",
            publishedAt: article.publishedAt,
            content: article.content || "Sin contenido",
            category: query || "Sin categoría"
        }));

        await News.insertMany(formattedArticles);
        console.log("✅ Noticias guardadas en la base de datos.");
    } catch (error) {
        console.error("❌ Error al procesar las noticias:", error);
    }
}

// 🚀 Ejecutar
connectDB();
saveNewsToDB("school");
saveNewsToDB("technology");
saveNewsToDB("all");
saveNewsToDB("corporate");
