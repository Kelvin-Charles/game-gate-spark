import { useCallback, useEffect, useRef, useState } from "react";

type Direction = "UP" | "DOWN" | "LEFT" | "RIGHT";
type Point = { x: number; y: number };

const GRID = 20;
const CELL = 20;

const SnakeGame = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [score, setScore] = useState(0);
  const [gameOver, setGameOver] = useState(false);
  const [started, setStarted] = useState(false);
  const dirRef = useRef<Direction>("RIGHT");
  const snakeRef = useRef<Point[]>([{ x: 5, y: 5 }]);
  const foodRef = useRef<Point>({ x: 10, y: 10 });
  const intervalRef = useRef<number | null>(null);

  const spawnFood = () => {
    let f: Point;
    do {
      f = { x: Math.floor(Math.random() * GRID), y: Math.floor(Math.random() * GRID) };
    } while (snakeRef.current.some((s) => s.x === f.x && s.y === f.y));
    foodRef.current = f;
  };

  const draw = useCallback(() => {
    const ctx = canvasRef.current?.getContext("2d");
    if (!ctx) return;
    ctx.fillStyle = "#0a0a12";
    ctx.fillRect(0, 0, GRID * CELL, GRID * CELL);

    // Grid lines
    ctx.strokeStyle = "rgba(0,255,0,0.05)";
    for (let i = 0; i <= GRID; i++) {
      ctx.beginPath();
      ctx.moveTo(i * CELL, 0);
      ctx.lineTo(i * CELL, GRID * CELL);
      ctx.stroke();
      ctx.beginPath();
      ctx.moveTo(0, i * CELL);
      ctx.lineTo(GRID * CELL, i * CELL);
      ctx.stroke();
    }

    // Food
    ctx.fillStyle = "#00ff00";
    ctx.shadowColor = "#00ff00";
    ctx.shadowBlur = 10;
    ctx.fillRect(foodRef.current.x * CELL + 2, foodRef.current.y * CELL + 2, CELL - 4, CELL - 4);
    ctx.shadowBlur = 0;

    // Snake
    snakeRef.current.forEach((s, i) => {
      ctx.fillStyle = i === 0 ? "#00ff00" : "#00cc00";
      ctx.fillRect(s.x * CELL + 1, s.y * CELL + 1, CELL - 2, CELL - 2);
    });
  }, []);

  const tick = useCallback(() => {
    const snake = [...snakeRef.current];
    const head = { ...snake[0] };
    const dir = dirRef.current;

    if (dir === "UP") head.y--;
    if (dir === "DOWN") head.y++;
    if (dir === "LEFT") head.x--;
    if (dir === "RIGHT") head.x++;

    if (head.x < 0 || head.x >= GRID || head.y < 0 || head.y >= GRID || snake.some((s) => s.x === head.x && s.y === head.y)) {
      setGameOver(true);
      if (intervalRef.current) clearInterval(intervalRef.current);
      return;
    }

    snake.unshift(head);
    if (head.x === foodRef.current.x && head.y === foodRef.current.y) {
      setScore((s) => s + 10);
      spawnFood();
    } else {
      snake.pop();
    }
    snakeRef.current = snake;
    draw();
  }, [draw]);

  const start = () => {
    snakeRef.current = [{ x: 5, y: 5 }];
    dirRef.current = "RIGHT";
    spawnFood();
    setScore(0);
    setGameOver(false);
    setStarted(true);
    if (intervalRef.current) clearInterval(intervalRef.current);
    intervalRef.current = window.setInterval(tick, 120);
    draw();
  };

  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      const map: Record<string, Direction> = {
        ArrowUp: "UP", ArrowDown: "DOWN", ArrowLeft: "LEFT", ArrowRight: "RIGHT",
        w: "UP", s: "DOWN", a: "LEFT", d: "RIGHT",
      };
      const d = map[e.key];
      if (!d) return;
      e.preventDefault();
      const opp: Record<Direction, Direction> = { UP: "DOWN", DOWN: "UP", LEFT: "RIGHT", RIGHT: "LEFT" };
      if (d !== opp[dirRef.current]) dirRef.current = d;
    };
    window.addEventListener("keydown", handler);
    return () => {
      window.removeEventListener("keydown", handler);
      if (intervalRef.current) clearInterval(intervalRef.current);
    };
  }, []);

  useEffect(() => { draw(); }, [draw]);

  return (
    <div className="flex flex-col items-center gap-4">
      <div className="font-heading text-primary text-2xl">Score: {score}</div>
      <div className="neon-border rounded-lg overflow-hidden">
        <canvas ref={canvasRef} width={GRID * CELL} height={GRID * CELL} />
      </div>
      {(!started || gameOver) && (
        <button onClick={start} className="bg-primary text-primary-foreground font-heading font-bold px-8 py-3 rounded-md hover:shadow-[0_0_20px_hsl(120_100%_50%/0.5)] transition-all tracking-wider">
          {gameOver ? "PLAY AGAIN" : "START GAME"}
        </button>
      )}
      {gameOver && <p className="text-destructive font-heading">GAME OVER!</p>}
    </div>
  );
};

export default SnakeGame;
