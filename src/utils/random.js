export const pickRandom = (items, count) => {
  return [...items].sort(() => Math.random() - 0.5).slice(0, count);
};
