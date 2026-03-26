const express = require("express");
const { Sequelize } = require("sequelize");

const app = express();
const port = 3000;

// Middleware agar Express bisa membaca data JSON
app.use(express.json());

// Inisialisasi Sequelize (Sesuaikan 'database', 'username', 'password')
const sequelize = new Sequelize("express_backend_mindguard", "root", "", {
  host: "localhost",
  dialect: "mysql",
});

const startServer = async () => {
  try {
    await sequelize.authenticate();
    console.log("✅ Koneksi database berhasil!");

    // Jalankan server
    app.listen(port, () => {
      console.log(`🚀 Server berjalan di http://localhost:5173/`);
    });
  } catch (error) {
    console.error("❌ Gagal koneksi database:", error);
  }
};

// Route percobaan
app.get("/", (req, res) => {
  res.send("Server Node.js + Sequelize siap digunakan!");
});

startServer();
