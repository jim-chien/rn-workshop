export const colors = {
  white: "#FAF9F6",
  black: "#000000",
  red: "#C44D56",
  lightRed: "#FF7F7F",
  blue: "#C44D56",
} as const;

export const statsColors = {
  hp: { color: "#FF0000", backgroundColor: "#FF5959" },
  attack: { color: "#F08030", backgroundColor: "#F5AC78" },
  defense: { color: "#F8D030", backgroundColor: "#FAE078" },
  specialAttack: { color: "#6890F0", backgroundColor: "#9DB7F5" },
  specialDefense: { color: "#78C850", backgroundColor: "#A7DB8D" },
  speed: { color: "#F85888", backgroundColor: "#FA92B2" },
} as const;

export const spacing = {
  small: 8,
  medium: 16,
  large: 24,
  extraLarge: 32,
} as const;

export const fontSize = {
  small: 10,
  medium: 16,
  large: 24,
  extraLarge: 48,
} as const;
