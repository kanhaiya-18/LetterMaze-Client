import axios from "axios";
import { useState } from "react";

function StartGame({ onStart }) {
    const [playerID, setPlayerID] = useState("");
    const startGameHandler = async() => {
        try{
            const res = await axios.post("https://lettermaze-server.onrender.com/new",{ playerID : playerID});
            console.log(res.data);
            onStart(playerID); //send playerID back to parent
        }
        catch(error)
        {
            console.log("couldn't start the game");
        }
    }
    return (
        <div className="flex flex-col items-center space-y-6">
            <h2 className="text-2xl font-semibold text-gray-800">Start New Game</h2>
            <input
                type="text"
                value={playerID}
                placeholder="Enter player name"
                onChange={(e) => setPlayerID(e.target.value)}
                className="w-full max-w-sm border border-gray-300 rounded-lg px-4 py-2 focus:outline-none 
                focus:ring-2 focus:ring-blue-400 transition"
            />
            <button
                onClick={startGameHandler}
                className="w-full max-w-sm bg-blue-500 hover:bg-blue-600 active:scale-95 transition text-white
                font-medium px-4 py-2 rounded-lg shadow">
                Start
            </button>
        </div>
    )
}
export default StartGame;