import React, { useState } from "react";
import StartGame from "./components/StartGame";
import Board from "./components/Board";

export default function App() {
  const [playerID, setPlayerID] = useState("");

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-50 to-gray-100">
      <div className="w-full max-w-md bg-white shadow-lg rounded-2xl p-8 border border-gray-200">
        <h1 className="text-3xl font-bold text-gray-900 text-center mb-8 tracking-tight">
          LetterMaze 🎮
        </h1>

        {!playerID ? (
          <StartGame onStart={setPlayerID} />
        ) : (
          <Board playerID={playerID} onGameOver={() => setPlayerID("")} />
        )}
      </div>
    </div>
  );
}

