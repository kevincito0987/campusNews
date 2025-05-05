require("dotenv").config(); // 🔗 Cargar variables de entorno antes de cualquier otra importación
const mongoose = require("mongoose");

async function connectDB() {
    try {
        console.log("🔗 Conectando a:", process.env.MONGO_URI || "❌ No se encontró MONGO_URI"); // 📌 Mensaje de depuración
        if (!process.env.MONGO_URI) throw new Error("MONGO_URI no está definida");

        await mongoose.connect(process.env.MONGO_URI, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
            serverSelectionTimeoutMS: 30000, // ⏳ Mayor tiempo de espera
        });

        console.log("✅ ¡Conexión exitosa a MongoDB!");
    } catch (error) {
        console.error("❌ Error al conectar con MongoDB:", error.message);
        process.exit(1);
    }
}

module.exports = { connectDB };
