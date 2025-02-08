const db = require("./db");

const createGame = async (players, cards, winner) => {
  const query = `
    INSERT INTO games (player1, player2, player3, player4, hand1, hand2, hand3, hand4, winner, winning_hand, timestamp)
    VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, NOW())
  `;

  const values = [
    players[0].name,
    players[1].name,
    players[2].name,
    players[3].name,
    JSON.stringify(players[0].hand),
    JSON.stringify(players[1].hand),
    JSON.stringify(players[2].hand),
    JSON.stringify(players[3].hand),
    winner.name,
    JSON.stringify(winner.hand),
  ];

  const [result] = await db.execute(query, values);
  return result.insertId;
};

const getAllGames = async () => {
  const [rows] = await db.execute(
    "SELECT * FROM games ORDER BY timestamp DESC"
  );
  return rows;
};

module.exports = { createGame, getAllGames };
