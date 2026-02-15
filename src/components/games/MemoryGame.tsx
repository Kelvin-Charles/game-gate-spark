import { useEffect, useState } from "react";

const emojis = ["🎮", "🕹️", "👾", "🎯", "🏆", "⚡", "🔥", "💎"];

interface Card {
  id: number;
  emoji: string;
  flipped: boolean;
  matched: boolean;
}

const MemoryGame = () => {
  const [cards, setCards] = useState<Card[]>([]);
  const [selected, setSelected] = useState<number[]>([]);
  const [moves, setMoves] = useState(0);
  const [won, setWon] = useState(false);

  const init = () => {
    const pairs = [...emojis, ...emojis]
      .sort(() => Math.random() - 0.5)
      .map((emoji, i) => ({ id: i, emoji, flipped: false, matched: false }));
    setCards(pairs);
    setSelected([]);
    setMoves(0);
    setWon(false);
  };

  useEffect(() => { init(); }, []);

  const handleClick = (id: number) => {
    if (selected.length >= 2 || cards[id].flipped || cards[id].matched) return;
    const newCards = cards.map((c) => c.id === id ? { ...c, flipped: true } : c);
    const newSel = [...selected, id];
    setCards(newCards);
    setSelected(newSel);

    if (newSel.length === 2) {
      setMoves((m) => m + 1);
      const [a, b] = newSel;
      if (newCards[a].emoji === newCards[b].emoji) {
        setTimeout(() => {
          const matched = newCards.map((c) => c.id === a || c.id === b ? { ...c, matched: true } : c);
          setCards(matched);
          setSelected([]);
          if (matched.every((c) => c.matched)) setWon(true);
        }, 300);
      } else {
        setTimeout(() => {
          setCards(newCards.map((c) => c.id === a || c.id === b ? { ...c, flipped: false } : c));
          setSelected([]);
        }, 800);
      }
    }
  };

  return (
    <div className="flex flex-col items-center gap-6">
      <div className="flex gap-8 font-heading text-lg">
        <span className="text-primary">Moves: {moves}</span>
        {won && <span className="neon-text">🏆 YOU WIN!</span>}
      </div>
      <div className="grid grid-cols-4 gap-3">
        {cards.map((card) => (
          <button
            key={card.id}
            onClick={() => handleClick(card.id)}
            className={`w-20 h-20 rounded-lg text-3xl flex items-center justify-center transition-all duration-300 ${
              card.flipped || card.matched
                ? "bg-secondary border neon-border"
                : "bg-muted border border-border hover:bg-surface-hover"
            } ${card.matched ? "opacity-60" : ""}`}
          >
            {card.flipped || card.matched ? card.emoji : "?"}
          </button>
        ))}
      </div>
      <button onClick={init} className="bg-primary text-primary-foreground font-heading font-bold px-8 py-3 rounded-md hover:shadow-[0_0_20px_hsl(120_100%_50%/0.5)] transition-all tracking-wider text-sm">
        NEW GAME
      </button>
    </div>
  );
};

export default MemoryGame;
