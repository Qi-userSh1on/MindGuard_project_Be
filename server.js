const express = require("express");
const cors = require("cors");
const { Sequelize } = require("sequelize");

const app = express();

/* =========================
   MIDDLEWARE
========================= */

app.use(cors());
app.use(express.json());

/* =========================
   KONEKSI DATABASE
========================= */

const sequelize = new Sequelize("express_backend_mindguard", "root", "", {
  host: "localhost",
  dialect: "mysql",
  logging: false,
});

/* =========================
   TEST KONEKSI DATABASE
========================= */

async function connectDatabase() {
  try {
    await sequelize.authenticate();
    console.log("✅ Database connected");
  } catch (error) {
    console.error("❌ Connection error:", error);
  }
}

connectDatabase();

/* =========================
   ROUTE TEST
========================= */

app.get("/", (req, res) => {
  res.json({
    message: "Server is running",
  });
});

/* =========================
   CREATE HISTORY (PENTING)
   ini yang dipanggil dari React
========================= */

app.post("/history", async (req, res) => {
  try {
    console.log("DATA MASUK:", req.body);

    const {
      user_id,
      tidur_jam,
      minum_gelas,
      olahraga_jam,
      istirahat_jam,
      status,
      note,
    } = req.body;

    if (!user_id) {
      return res.status(400).json({
        message: "user_id is required",
      });
    }

    await sequelize.query(
      `
      INSERT INTO analysis_results
      (
        user_id,
        tidur_jam,
        minum_gelas,
        olahraga_jam,
        istirahat_jam,
        status,
        note,
        created_at
      )
      VALUES
      (
        :user_id,
        :tidur_jam,
        :minum_gelas,
        :olahraga_jam,
        :istirahat_jam,
        :status,
        :note,
        NOW()
      )
      `,
      {
        replacements: {
          user_id,
          tidur_jam,
          minum_gelas,
          olahraga_jam,
          istirahat_jam,
          status,
          note,
        },
      },
    );

    res.status(201).json({
      message: "Data berhasil disimpan",
    });
  } catch (error) {
    console.error(error);

    res.status(500).json({
      message: error.message,
    });
  }
});

/* =========================
   HISTORY 7 HARI TERAKHIR
========================= */

app.get("/history", async (req, res) => {
  try {
    const user_id = req.query.user_id;

    if (!user_id) {
      return res.status(400).json({
        message: "user_id is required",
      });
    }

    const [results] = await sequelize.query(
      `
      SELECT *
      FROM analysis_results
      WHERE user_id = :user_id
      AND created_at >= DATE_SUB(NOW(), INTERVAL 7 DAY)
      ORDER BY created_at DESC
      `,
      {
        replacements: {
          user_id,
        },
      },
    );

    res.json(results);
  } catch (error) {
    console.error(error);

    res.status(500).json({
      message: error.message,
    });
  }
});

/* =========================
   HISTORY PER HARI
========================= */

app.get("/history-by-day", async (req, res) => {
  try {
    const user_id = req.query.user_id;
    const day = req.query.day || 0;

    const [results] = await sequelize.query(
      `
      SELECT *
      FROM analysis_results
      WHERE user_id = :user_id
      AND DATE(created_at) = DATE_SUB(CURDATE(), INTERVAL :day DAY)
      ORDER BY created_at DESC
      `,
      {
        replacements: {
          user_id,
          day,
        },
      },
    );

    res.json(results);
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
});

/* =========================
   START SERVER
========================= */

const PORT = 3000;

app.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT}`);
});
