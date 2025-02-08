const express = require("express");
const { startGame, getGames } = require("../controllers/gameController");

const router = express.Router();

router.post("/games/start-game", startGame);
router.get("/games", getGames);

module.exports = router;
