import "./styles.css";
import { useState } from "react";

const INLINE_CELLIDX = [
  [0, 1, 2],
  [3, 4, 5],
  [6, 7, 8],
  [0, 3, 6],
  [1, 4, 7],
  [2, 5, 8],
  [0, 4, 8],
  [2, 4, 6]
];

export default function App() {
  const [board, setBoard] = useState(Array(9).fill(null));
  const [xIsPlaying, setXIsPlaying] = useState(true);

  const resetBoard = () => {
    setBoard(Array(9).fill(null));
    setXIsPlaying(true);
  };

  const Cell = ({ key, disabled, mark, onClick }) => {
    return (
      <button key={key} disabled={disabled} onClick={onClick}>
        {mark}
      </button>
    );
  };

  function determineWinner(board) {
    for (let i = 0; i < INLINE_CELLIDX.length; i++) {
      let [x, y, z] = INLINE_CELLIDX[i];
      if (board[x] && board[x] === board[y] && board[y] === board[z])
        return board[x];
    }
    // no winner yet
    return null;
  }

  const winner = determineWinner(board);

  const getStatusMessage = () => {
    if (winner) return `Player ${winner} wins!`;
    if (!board.includes(null)) return `It's a draw!`;
    return `Player ${xIsPlaying ? "X" : "O"} turn`;
  };

  return (
    <div className="app">
      <div style={{ textAlign: "center" }}>{getStatusMessage()}</div>
      <div className="board">
        {Array(9)
          .fill(null)
          .map((_, index) => index)
          .map((index) => {
            const turn = xIsPlaying ? "X" : "O";
            return (
              <Cell
                key={index}
                index={index}
                mark={board[index]}
                disabled={board[index] != null || winner}
                onClick={() => {
                  const newBoard = board.slice();
                  newBoard[index] = turn;
                  setBoard(newBoard);
                  setXIsPlaying(!xIsPlaying);
                }}
              />
            );
          })}
      </div>
      <button onClick={resetBoard}>Reset</button>
    </div>
  );
}
