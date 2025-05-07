console.log("Funcion main"); // 🎯 Verifica el inicio del proceso principal
const mongoose = require("mongoose");
const News = require("./models/newsModel");
const { connectDB } = require("./data/mongoDb");
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
connectDB();

async function saveNewsToDB(query) {
    const newsData = await fetchNews(query);
    
    if (!newsData || !newsData.articles) {
        console.log("⚠️ No se encontraron artículos para guardar.");
        return;
    }

    try {
        const formattedArticles = newsData.articles.map(article => ({
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
            category: query.category || "Sin categoría"
        }));

        await News.insertMany(formattedArticles);
        console.log("✅ Noticias guardadas en la base de datos.");

    } catch (error) {
        console.error("❌ Error al guardar noticias:", error);
    }
}

// 🔥 Llamar a la función para probar
saveNewsToDB("school");
saveNewsToDB("technology");
saveNewsToDB("all");
saveNewsToDB("corporate");