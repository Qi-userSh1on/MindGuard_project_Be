const express = require("express");
const router = express.Router();

const {
  createHistory,
  getHistories,
} = require("../controllers/historyController");

router.post("/", createHistory);

router.get("/", getHistories);

module.exports = router;
