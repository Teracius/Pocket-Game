-- init.sql
CREATE TABLE IF NOT EXISTS games (
  id INT AUTO_INCREMENT PRIMARY KEY,
  player1 VARCHAR(255),
  player2 VARCHAR(255),
  player3 VARCHAR(255),
  player4 VARCHAR(255),
  hand1 JSON,
  hand2 JSON,
  hand3 JSON,
  hand4 JSON,
  winner VARCHAR(255),
  winning_hand JSON,
  timestamp DATETIME
);
