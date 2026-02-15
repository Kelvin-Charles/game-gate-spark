import { useState } from "react";

type Cell = "X" | "O" | null;

const winLines = [
  [0,1,2],[3,4,5],[6,7,8],
  [0,3,6],[1,4,7],[2,5,8],
  [0,4,8],[2,4,6],
];

const checkWin = (b: Cell[]): Cell => {
  for (const [a, bv, c] of winLines) {
    if (b[a] && b[a] === b[bv] && b[a] === b[c]) return b[a];
  }
  return null;
};

const aiMove = (board: Cell[]): number => {
  // Try to win
  for (let i = 0; i < 9; i++) {
    if (!board[i]) {
      const test = [...board];
      test[i] = "O";
      if (checkWin(test) === "O") return i;
    }
  }
  // Block
  for (let i = 0; i < 9; i++) {
    if (!board[i]) {
      const test = [...board];
      test[i] = "X";
      if (checkWin(test) === "X") return i;
    }
  }
  // Center, corners, edges
  if (!board[4]) return 4;
  const corners = [0,2,6,8].filter(i => !board[i]);
  if (corners.length) return corners[Math.floor(Math.random() * corners.length)];
  const edges = [1,3,5,7].filter(i => !board[i]);
  return edges[Math.floor(Math.random() * edges.length)];
};

const TicTacToeGame = () => {
  const [board, setBoard] = useState<Cell[]>(Array(9).fill(null));
  const [status, setStatus] = useState<string>("Your turn (X)");
  const [done, setDone] = useState(false);

  const handleClick = (i: number) => {
    if (board[i] || done) return;
    const newBoard = [...board];
    newBoard[i] = "X";

    const winner = checkWin(newBoard);
    if (winner) {
      setBoard(newBoard);
      setStatus("You win! 🎉");
      setDone(true);
      return;
    }
    if (newBoard.every(Boolean)) {
      setBoard(newBoard);
      setStatus("Draw!");
      setDone(true);
      return;
    }

    const ai = aiMove(newBoard);
    newBoard[ai] = "O";
    const aiWin = checkWin(newBoard);
    if (aiWin) {
      setBoard(newBoard);
      setStatus("AI wins! 🤖");
      setDone(true);
      return;
    }
    if (newBoard.every(Boolean)) {
      setBoard(newBoard);
      setStatus("Draw!");
      setDone(true);
      return;
    }

    setBoard(newBoard);
    setStatus("Your turn (X)");
  };

  const reset = () => {
    setBoard(Array(9).fill(null));
    setStatus("Your turn (X)");
    setDone(false);
  };

  return (
    <div className="flex flex-col items-center gap-6">
      <p className="font-heading text-primary text-xl">{status}</p>
      <div className="grid grid-cols-3 gap-2">
        {board.map((cell, i) => (
          <button
            key={i}
            onClick={() => handleClick(i)}
            className="w-24 h-24 bg-secondary border border-border rounded-lg flex items-center justify-center text-4xl font-heading font-bold hover:bg-surface-hover transition-colors"
            style={{ color: cell === "X" ? "hsl(120,100%,50%)" : cell === "O" ? "hsl(0,84%,60%)" : undefined }}
          >
            {cell}
          </button>
        ))}
      </div>
      <button onClick={reset} className="bg-primary text-primary-foreground font-heading font-bold px-8 py-3 rounded-md hover:shadow-[0_0_20px_hsl(120_100%_50%/0.5)] transition-all tracking-wider text-sm">
        RESET
      </button>
    </div>
  );
};

export default TicTacToeGame;
