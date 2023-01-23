export const randomColor = (min = 0, max = 255): string => {
  const random = () => min + Math.floor(Math.random() * (max - min + 1));

  const r = random();
  const g = random();
  const b = random();

  return `rgb(${r},${g},${b})`;
};
