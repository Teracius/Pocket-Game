import React, { useState } from "react";
import InputPlayers from "./components/InputPlayers";
import WinnerModal from "./components/WinnerModal";
import "./App.css";

function App() {
  const [players, setPlayers] = useState([]); // Array of player names
  const [gameData, setGameData] = useState(null); // Data returned from the backend
  const [showModal, setShowModal] = useState(false); // Controls modal visibility

  const startGame = async () => {
    try {
      if (!Array.isArray(players) || players.length !== 4) {
        throw new Error("Exactly 4 players are required");
      }

      const response = await fetch(
        "http://localhost:8000/api/games/start-game",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ players }),
        }
      );

      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }

      const result = await response.json();
      setGameData(result);
      setShowModal(true); // Show modal with game results
    } catch (error) {
      console.error("Failed to start the game:", error);
    }
  };

  return (
    <div className="App">
      <h1>Pocket Game</h1>
      {players.length === 0 ? (
        <InputPlayers setPlayers={setPlayers} />
      ) : (
        <>
          <button onClick={startGame}>Start Game</button>
          {gameData && (
            <WinnerModal
              gameData={gameData}
              onClose={() => setShowModal(false)}
              isVisible={showModal}
            />
          )}
        </>
      )}
    </div>
  );
}

export default App;
