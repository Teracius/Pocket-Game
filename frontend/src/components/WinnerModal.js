import React from "react";

function WinnerModal({ gameData, onClose, isVisible }) {
  if (!isVisible) return null;

  const { players, winner, remainingDeck } = gameData;

  const winnerData = players.find((player) => player.name === winner);

  return (
    <div className="modal">
      <div className="modal-content">
        <h2>Game Results</h2>

        {/* Winner Info */}
        <div className="winner-section">
          <h3>Winner: {winner}</h3>
          <p>Winning Hand:</p>
          <div className="hand">
            {winnerData.hand.map((card, index) => (
              <div key={index} className="card">
                {card.value} of {card.suit}
              </div>
            ))}
          </div>
        </div>

        {/* Player Hands */}
        <div className="player-hands">
          <h3>All Players' Hands:</h3>
          {players.map((player) => (
            <div key={player.name} className="player">
              <h4>{player.name}:</h4>
              <div className="hand">
                {player.hand.map((card, index) => (
                  <div key={index} className="card">
                    {card.value} of {card.suit}
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>

        {/* Remaining Deck */}
        <div className="remaining-deck">
          <h3>Remaining Deck:</h3>
          <div className="deck-scroll">
            {remainingDeck.map((card, index) => (
              <div key={index} className="card">
                {card.value} of {card.suit}
              </div>
            ))}
          </div>
        </div>

        <button onClick={onClose}>Close</button>
      </div>
    </div>
  );
}

export default WinnerModal;
