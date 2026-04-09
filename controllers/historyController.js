const { History } = require("../models");

exports.createHistory = async (req, res) => {
  try {
    const {
      tidur_jam,
      minum_gelas,
      olahraga_jam,
      istirahat_jam,
      status,
      note,
    } = req.body;

    const newHistory = await History.create({
      date: new Date(),

      tidur_jam,
      minum_gelas,
      olahraga_jam,
      istirahat_jam,

      status,
      note,
    });

    res.status(201).json({
      message: "Data berhasil disimpan",
      data: newHistory,
    });
  } catch (error) {
    console.error(error);

    res.status(500).json({
      message: "Gagal menyimpan data",
    });
  }
};

exports.getHistories = async (req, res) => {
  try {
    const data = await History.findAll({
      order: [["date", "DESC"]],
    });

    res.json(data);
  } catch (error) {
    res.status(500).json({
      message: "Error mengambil data",
    });
  }
};
