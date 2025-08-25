import { useState } from "react";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
function Board({ playerID, onGameOver }) {
  const [guess, setGuess] = useState("");
  const [tries, setTries] = useState(0);
  const [results, setResults] = useState([]);
  const makeGuess = async () => {
    try {
      const res = await axios.post("http://localhost:4000/game/guess", {
        playerID,
        guess
      });
      if (res.data.success === true) {
        toast.success("🎉 Congrats!! You Have Guessed The Word", {
          position: "top-center",
          autoClose: 2000,
        });
        setTimeout(() => onGameOver(), 2000);

      }
      setTries((prev) => prev + 1);
      setResults((prev) => [...prev, res.data.result]); // add row
      // setTries(res.data.tries);

      setGuess("");
    } catch (err) {
      console.error(err);

      


      toast.error(err.response?.data?.message || "Something went wrong!", {
        position: "top-center",
        autoClose: 2000,
      });
    }
  };
  if(tries === 6)
      {
        toast.error("you are out of tries ",{
          position: "top-center",
          autoClose: 2000
        });
        setTimeout(() => onGameOver(), 2000);
      }

  return (
    <div className="p-4 flex flex-col items-center mr-14">
      <h2 className="text-lg font-bold mb-4">Player: {playerID}</h2>

      {/* Grid for guesses */}
      <div className="grid gap-2 mb-4">
        {results.map((row, i) => (
          <div key={i} className="flex gap-2">
            {row.map((cell, j) => (
              <span
                key={j}
                className={`w-12 h-12 flex items-center justify-center border rounded text-xl font-bold
                  ${cell.color === "green"
                    ? "bg-green-500 text-white"
                    : cell.color === "yellow"
                      ? "bg-yellow-400 text-white"
                      : "bg-gray-500 text-white"}`}>
                {cell.letter}
              </span>
            ))}
          </div>
        ))}
      </div>

      <div className="flex">
        <input
          type="text"
          value={guess}
          onChange={(e) => setGuess(e.target.value.toLowerCase())} // ✅ force lowercase
          className="border p-2 rounded text-center lowercase tracking-widest w-64 ml-20"
          maxLength={5}
        />
        <button
          onClick={makeGuess}
          className="bg-green-500 text-white px-3 py-2 ml-2 rounded-lg hover:bg-green-600"
        >
          Guess
        </button>
      </div>

      {/* Toast Container */}
      <ToastContainer />
    </div>
  );
}

export default Board;
