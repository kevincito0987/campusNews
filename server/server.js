console.log("Funcion server"); // 🎯 Verifica el inicio del proceso principal

const express = require("express");
const cors = require("cors");
const app = express();
const PORT = process.env.PORT || 3000;
const { connectDB } = require("./data/mongoDb");

connectDB(); // 🔗 Conectar a la base de datos
app.use(cors()); // 🌍 Habilitar acceso CORS para evitar restricciones en el cliente

// 🔍 Ruta principal para verificar que el servidor está activo
app.get("/", (req, res) => {
    res.send("🚀 API de Clima, Circuitos, Pilotos, Equipos y Carros F1 funcionando en localhost! 🏎️📡");
});

// 🚀 Iniciar el servidor con manejo de errores y sincronización automática
app.listen(PORT, async () => {
    console.log(`✅ Servidor corriendo en puerto ${PORT} 🌍`);
});