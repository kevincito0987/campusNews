console.log("Funcion server"); // 🎯 Verifica el inicio del proceso principal

const express = require("express");
const cors = require("cors");
const app = express();
const PORT = process.env.PORT || 5000; // 📌 Puerto con fallback

const { connectDB } = require("./data/mongoDb");
const newsRoutes = require("./routes/newsRoutes"); // ✅ Importa las rutas específicas de noticias

connectDB(); // 🔗 Conectar a la base de datos
app.use(express.json()); // 🛠 Habilitar intercambio de datos en formato JSON
app.use(cors()); // 🌍 Evitar restricciones en el cliente

// 🔍 Ruta principal para verificar que el servidor está activo
app.get("/", (req, res) => {
    res.send("🚀 API Noticias acerca de tecnología e innovación! 🏎️📡");
});

// 📢 Definir las rutas de la API
app.use("/api/news", newsRoutes); // 📰 Noticias

// 🚀 Iniciar el servidor con manejo de errores y sincronización automática
app.listen(PORT, async () => {
    console.log(`✅ Servidor corriendo en puerto ${PORT} 🌍`);
});
