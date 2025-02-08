const request = require("supertest");
const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const dotenv = require("dotenv");
const gameRoutes = require("../routes/gameRoutes");

// Mock the database calls
jest.mock("../models/gameModel", () => ({
  createGame: jest.fn(),
  getAllGames: jest.fn(),
}));

const { createGame, getAllGames } = require("../models/gameModel");

dotenv.config();

const app = express();
app.use(bodyParser.json());
app.use(cors());
app.use("/api", gameRoutes);

describe("Game API", () => {
  beforeAll(() => {
    // Setup any necessary mock responses
    getAllGames.mockResolvedValue([
      {
        id: 1,
        player1: "Alice",
        player2: "Bob",
        player3: "Charlie",
        player4: "David",
        winner: "Alice",
        timestamp: "2025-02-07 12:00:00",
      },
    ]);
    createGame.mockResolvedValue(1); // Simulate successful game creation
  });

  afterEach(() => {
    jest.clearAllMocks(); // Clear mocks after each test
  });

  test("POST /api/games/start-game - should start a new game", async () => {
    const players = ["Alice", "Bob", "Charlie", "David"];

    const response = await request(app)
      .post("/api/games/start-game")
      .send({ players });

    expect(response.status).toBe(200);
    expect(response.body).toHaveProperty("players");
    expect(response.body).toHaveProperty("winner");
    expect(response.body).toHaveProperty("remainingDeck");
  });

  test("GET /api/games - should return all games", async () => {
    const response = await request(app).get("/api/games");

    expect(response.status).toBe(200);
    expect(response.body).toHaveLength(1); // Mocked game data
    expect(response.body[0]).toHaveProperty("player1");
    expect(response.body[0]).toHaveProperty("winner");
  });

  test("POST /api/games/start-game - should return 400 if invalid players", async () => {
    const response = await request(app)
      .post("/api/games/start-game")
      .send({ players: ["Alice", "Bob"] }); // Invalid number of players

    expect(response.status).toBe(400);
    expect(response.body.error).toBe("Exactly 4 players are required");
  });
});
