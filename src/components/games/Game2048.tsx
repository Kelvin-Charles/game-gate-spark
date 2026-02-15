import { useCallback, useEffect, useState } from "react";

type Grid = number[][];

const SIZE = 4;

const empty = (): Grid => Array.from({ length: SIZE }, () => Array(SIZE).fill(0));

const addRandom = (grid: Grid): Grid => {
  const g = grid.map((r) => [...r]);
  const free: [number, number][] = [];
  g.forEach((row, r) => row.forEach((v, c) => { if (!v) free.push([r, c]); }));
  if (!free.length) return g;
  const [r, c] = free[Math.floor(Math.random() * free.length)];
  g[r][c] = Math.random() < 0.9 ? 2 : 4;
  return g;
};

const slide = (row: number[]): number[] => {
  const filtered = row.filter(Boolean);
  const merged: number[] = [];
  let i = 0;
  while (i < filtered.length) {
    if (i + 1 < filtered.length && filtered[i] === filtered[i + 1]) {
      merged.push(filtered[i] * 2);
      i += 2;
    } else {
      merged.push(filtered[i]);
      i++;
    }
  }
  while (merged.length < SIZE) merged.push(0);
  return merged;
};

const move = (grid: Grid, dir: string): { grid: Grid; moved: boolean; score: number } => {
  let g = grid.map((r) => [...r]);
  let score = 0;

  const process = (rows: number[][]): number[][] => {
    return rows.map((row) => {
      const result = slide(row);
      const old = row.reduce((a, b) => a + b, 0);
      const nw = result.reduce((a, b) => a + b, 0);
      score += nw - old;
      return result;
    });
  };

  if (dir === "LEFT") g = process(g);
  else if (dir === "RIGHT") g = process(g.map((r) => [...r].reverse())).map((r) => r.reverse());
  else if (dir === "UP") {
    let cols = Array.from({ length: SIZE }, (_, c) => g.map((r) => r[c]));
    cols = process(cols);
    g = Array.from({ length: SIZE }, (_, r) => cols.map((c) => c[r]));
  } else {
    let cols = Array.from({ length: SIZE }, (_, c) => g.map((r) => r[c]).reverse());
    cols = process(cols);
    g = Array.from({ length: SIZE }, (_, r) => cols.map((c) => c[SIZE - 1 - r]));
  }

  const moved = JSON.stringify(g) !== JSON.stringify(grid);
  return { grid: g, moved, score };
};

const canMove = (grid: Grid): boolean => {
  for (let r = 0; r < SIZE; r++)
    for (let c = 0; c < SIZE; c++) {
      if (!grid[r][c]) return true;
      if (c + 1 < SIZE && grid[r][c] === grid[r][c + 1]) return true;
      if (r + 1 < SIZE && grid[r][c] === grid[r + 1][c]) return true;
    }
  return false;
};

const tileColor = (v: number): string => {
  const colors: Record<number, string> = {
    2: "hsl(40,70%,40%)", 4: "hsl(35,70%,45%)", 8: "hsl(25,80%,50%)",
    16: "hsl(15,90%,50%)", 32: "hsl(5,85%,55%)", 64: "hsl(0,80%,50%)",
    128: "hsl(50,90%,50%)", 256: "hsl(45,95%,50%)", 512: "hsl(40,100%,50%)",
    1024: "hsl(35,100%,45%)", 2048: "hsl(120,100%,50%)",
  };
  return colors[v] || "hsl(120,100%,50%)";
};

const Game2048 = () => {
  const [grid, setGrid] = useState<Grid>(() => addRandom(addRandom(empty())));
  const [score, setScore] = useState(0);
  const [gameOver, setGameOver] = useState(false);

  const handleMove = useCallback((dir: string) => {
    if (gameOver) return;
    const result = move(grid, dir);
    if (!result.moved) return;
    const newGrid = addRandom(result.grid);
    setGrid(newGrid);
    setScore((s) => s + result.score);
    if (!canMove(newGrid)) setGameOver(true);
  }, [grid, gameOver]);

  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      const map: Record<string, string> = {
        ArrowUp: "UP", ArrowDown: "DOWN", ArrowLeft: "LEFT", ArrowRight: "RIGHT",
        w: "UP", s: "DOWN", a: "LEFT", d: "RIGHT",
      };
      if (map[e.key]) { e.preventDefault(); handleMove(map[e.key]); }
    };
    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, [handleMove]);

  const reset = () => {
    setGrid(addRandom(addRandom(empty())));
    setScore(0);
    setGameOver(false);
  };

  return (
    <div className="flex flex-col items-center gap-6">
      <div className="font-heading text-primary text-2xl">Score: {score}</div>
      <div className="bg-secondary p-3 rounded-lg">
        <div className="grid grid-cols-4 gap-2">
          {grid.flat().map((v, i) => (
            <div
              key={i}
              className="w-20 h-20 rounded-md flex items-center justify-center font-heading font-bold text-xl transition-all"
              style={{
                backgroundColor: v ? tileColor(v) : "hsl(240,10%,12%)",
                color: v > 4 ? "#fff" : v ? "#000" : "transparent",
              }}
            >
              {v || ""}
            </div>
          ))}
        </div>
      </div>
      {gameOver && <p className="text-destructive font-heading text-xl">GAME OVER!</p>}
      <button onClick={reset} className="bg-primary text-primary-foreground font-heading font-bold px-8 py-3 rounded-md hover:shadow-[0_0_20px_hsl(120_100%_50%/0.5)] transition-all tracking-wider text-sm">
        {gameOver ? "PLAY AGAIN" : "RESTART"}
      </button>
    </div>
  );
};

export default Game2048;
