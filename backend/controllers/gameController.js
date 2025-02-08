const { createGame, getAllGames } = require("../models/gameModel");

const suits = ["hearts", "diamonds", "clubs", "spades"];
const values = [
  "2",
  "3",
  "4",
  "5",
  "6",
  "7",
  "8",
  "9",
  "10",
  "J",
  "Q",
  "K",
  "A",
];

// Generate a deck of cards
const generateDeck = () => {
  const deck = [];
  for (const suit of suits) {
    for (const value of values) {
      deck.push({ suit, value });
    }
  }
  return deck;
};

// Shuffle the deck
const shuffleDeck = (deck) => {
  for (let i = deck.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [deck[i], deck[j]] = [deck[j], deck[i]];
  }
  return deck;
};

// Rank a poker hand (simple example; expand for full poker logic)
const rankHand = (hand) => {
  return hand.reduce((acc, card) => acc + values.indexOf(card.value) + 2, 0);
};

const startGame = async (req, res) => {
  try {
    console.log("Request body:", req.body); // Debug log

    const { players } = req.body;

    // Validate players array
    if (!Array.isArray(players) || players.length !== 4) {
      return res.status(400).json({ error: "Exactly 4 players are required" });
    }

    const deck = shuffleDeck(generateDeck());
    const playerHands = players.map((player) => ({
      name: player,
      hand: deck.splice(0, 5),
    }));

    const rankedHands = playerHands.map((player) => ({
      ...player,
      rank: rankHand(player.hand),
    }));

    const winner = rankedHands.reduce((prev, current) =>
      prev.rank > current.rank ? prev : current
    );

    // Save game to the database
    await createGame(rankedHands, deck, winner);

    res.json({
      players: rankedHands,
      winner: winner.name,
      remainingDeck: deck,
    });
  } catch (error) {
    console.error("Error in startGame:", error);
    res.status(500).json({ error: "Internal server error" });
  }
};

const getGames = async (req, res) => {
  const games = await getAllGames();
  res.json(games);
};

module.exports = { startGame, getGames };
