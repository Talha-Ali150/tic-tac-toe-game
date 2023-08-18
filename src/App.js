import React, { useEffect, useState } from "react";
import "./App.css";

function App() {
  const myBoard = [];
  for (let i = 0; i <= 8; i++) {
    myBoard.push("");
  }

  const [board, setBoard] = useState(myBoard);
  const [isXNext, setIsXNext] = useState(true);

  const scoreX = +localStorage.getItem("xScore") || 0;
  const scoreO = +localStorage.getItem("oScore") || 0;

  const [xScore, setXScore] = useState(scoreX);
  const [oScore, setOScore] = useState(scoreO);

  const winner = calculateWinner(board);

  const handleClick = (index) => {
    if (board[index] || winner) return;

    const newBoard = board.slice();
    newBoard[index] = isXNext ? "X" : "O";
    setBoard(newBoard);
    setIsXNext(!isXNext);
  };

  const getStatus = () => {
    if (winner) {
      return `Winner: ${winner}`;
    } else if (board.every((cell) => cell)) {
      return "It's a draw!";
    } else {
      return `Next player: ${isXNext ? "X" : "O"}`;
    }
  };

  const resetGame = () => {
    setBoard(myBoard);
    setIsXNext(true);
  };

  const resetScores = () => {
    localStorage.removeItem("xScore");
    localStorage.removeItem("oScore");
    setXScore(0);
    setOScore(0);
  };

  useEffect(() => {
    if (winner) {
      if (winner === "X") {
        setXScore(xScore + 1);
        localStorage.setItem("xScore", xScore + 1);
      } else {
        setOScore(oScore + 1);
        localStorage.setItem("oScore", oScore + 1);
      }
    }
  }, [winner]);

  return (
    <div className="App">
      <h1>Tic Tac Toe</h1>

      <div className="board">
        {board.map((cellValue, index) => (
          <div className="cell" key={index} onClick={() => handleClick(index)}>
            {cellValue}
          </div>
        ))}
      </div>

      <div className="status">{getStatus()}</div>
      <p>Score of X: {xScore}</p>
      <p> Score of O: {oScore}</p>

      <button className="styled-button" onClick={resetGame}>
        Reset
      </button>
      <button className="styled-button" onClick={resetScores}>
        Reset Score
      </button>
    </div>
  );
}

function calculateWinner(board) {
  const winningLines = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6],
  ];

  for (const [a, b, c] of winningLines) {
    if (board[a] && board[a] === board[b] && board[a] === board[c]) {
      return board[a];
    }
  }

  return null;
}

export default App;
