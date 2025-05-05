require("dotenv").config({ path: "../.env" }); // 📌 Asegura la ruta al archivo .env
console.log("🔗 Verificando MONGO_URI:", process.env.MONGO_URI || "❌ No se encontró MONGO_URI");

const mongoose = require("mongoose");

async function connectDB() {
    try {
        if (!process.env.MONGO_URI) {
            throw new Error("MONGO_URI no está definida, verifica tu entorno");
        }

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
