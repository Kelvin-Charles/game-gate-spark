export interface GameInfo {
  title: string;
  description: string;
  icon: string;
  slug: string;
  color: string;
  instructions: string;
}

export const games: GameInfo[] = [
  {
    title: "Snake",
    description: "Classic snake game. Eat food, grow longer, don't hit the walls or yourself!",
    icon: "🐍",
    slug: "snake",
    color: "120 100% 50%",
    instructions: "Use arrow keys or WASD to move. Eat the green food to grow!",
  },
  {
    title: "Tic Tac Toe",
    description: "Challenge the AI in this classic strategy game. Can you win?",
    icon: "⭕",
    slug: "tic-tac-toe",
    color: "200 100% 50%",
    instructions: "Click a cell to place your mark. Get 3 in a row to win!",
  },
  {
    title: "Memory Match",
    description: "Test your memory by matching pairs of cards. How fast can you clear the board?",
    icon: "🧠",
    slug: "memory",
    color: "280 100% 60%",
    instructions: "Click cards to flip them. Match all pairs to win!",
  },
  {
    title: "2048",
    description: "Slide tiles to combine numbers. Reach 2048 to win this addictive puzzle!",
    icon: "🔢",
    slug: "2048",
    color: "30 100% 50%",
    instructions: "Use arrow keys to slide tiles. Combine matching numbers!",
  },
];
