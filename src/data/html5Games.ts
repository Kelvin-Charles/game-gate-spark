export interface Html5Game {
  id: string;
  title: string;
  description: string;
  category: "action" | "puzzle" | "racing" | "arcade" | "strategy";
  thumbnail: string;
  embedUrl: string;
  isPopular?: boolean;
  isNew?: boolean;
  rating: number;
}

export const html5Games: Html5Game[] = [
  {
    id: "slope",
    title: "Slope",
    description: "Race a ball down a never-ending slope. Dodge obstacles and keep your speed!",
    category: "action",
    thumbnail: "https://images.unsplash.com/photo-1614294149010-950b698f72c0?w=400&h=300&fit=crop",
    embedUrl: "https://slope-game.github.io/",
    isPopular: true,
    rating: 4.5,
  },
  {
    id: "2048",
    title: "2048",
    description: "Slide numbered tiles to combine them and reach the 2048 tile.",
    category: "puzzle",
    thumbnail: "https://images.unsplash.com/photo-1509228468518-180dd4864904?w=400&h=300&fit=crop",
    embedUrl: "https://play2048.co/",
    isPopular: true,
    rating: 4.7,
  },
  {
    id: "hextris",
    title: "Hextris",
    description: "A fast-paced puzzle game inspired by Tetris with a hexagonal twist.",
    category: "puzzle",
    thumbnail: "https://images.unsplash.com/photo-1550745165-9bc0b252726f?w=400&h=300&fit=crop",
    embedUrl: "https://hextris.io/",
    isNew: true,
    rating: 4.3,
  },
  {
    id: "radius-raid",
    title: "Radius Raid",
    description: "Survive waves of enemies in this intense space shooter arcade game.",
    category: "arcade",
    thumbnail: "https://images.unsplash.com/photo-1446776811953-b23d57bd21aa?w=400&h=300&fit=crop",
    embedUrl: "https://jackrugile.com/radius-raid/",
    isPopular: true,
    rating: 4.1,
  },
  {
    id: "pacman",
    title: "Pac-Man",
    description: "The legendary arcade classic. Eat all the dots and avoid the ghosts!",
    category: "arcade",
    thumbnail: "https://images.unsplash.com/photo-1579309401389-a2476dddf3d4?w=400&h=300&fit=crop",
    embedUrl: "https://www.google.com/logos/2010/pacman10-i.html",
    isPopular: true,
    rating: 4.8,
  },
  {
    id: "tower-game",
    title: "Tower Building",
    description: "Stack blocks as high as you can in this addictive tower building game.",
    category: "arcade",
    thumbnail: "https://images.unsplash.com/photo-1493476523860-a6de6ce1b0c3?w=400&h=300&fit=crop",
    embedUrl: "https://nicef.github.io/tower-game/",
    isNew: true,
    rating: 4.0,
  },
  {
    id: "chess",
    title: "Chess",
    description: "Classic chess game. Challenge yourself against the computer AI.",
    category: "strategy",
    thumbnail: "https://images.unsplash.com/photo-1529699211952-734e80c4d42b?w=400&h=300&fit=crop",
    embedUrl: "https://www.chess.com/play/computer",
    rating: 4.6,
  },
  {
    id: "breakout",
    title: "Breakout",
    description: "Classic brick breaker game. Destroy all the bricks with the bouncing ball!",
    category: "action",
    thumbnail: "https://images.unsplash.com/photo-1511512578047-dfb367046420?w=400&h=300&fit=crop",
    embedUrl: "https://nicef.github.io/breakout/",
    isNew: true,
    rating: 4.2,
  },
];

export const categories = [
  { value: "all", label: "All Games" },
  { value: "action", label: "Action" },
  { value: "puzzle", label: "Puzzle" },
  { value: "racing", label: "Racing" },
  { value: "arcade", label: "Arcade" },
  { value: "strategy", label: "Strategy" },
] as const;
