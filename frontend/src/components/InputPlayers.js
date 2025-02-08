import React, { useState } from "react";

function InputPlayers({ setPlayers }) {
  const [playerNames, setPlayerNames] = useState(["", "", "", ""]);

  const handleChange = (index, value) => {
    const updatedNames = [...playerNames];
    updatedNames[index] = value;
    setPlayerNames(updatedNames);
  };

  const handleSubmit = () => {
    if (playerNames.some((name) => name === "")) {
      alert("Please enter all player names.");
    } else {
      setPlayers(playerNames); // Ensure players is an array of strings
    }
  };

  return (
    <div className="InputPlayers">
      <h2>Enter Player Names</h2>
      {playerNames.map((name, index) => (
        <input
          key={index}
          type="text"
          placeholder={`Player ${index + 1}`}
          value={name}
          onChange={(e) => handleChange(index, e.target.value)}
        />
      ))}
      <button onClick={handleSubmit}>Start Game</button>
    </div>
  );
}

export default InputPlayers;
