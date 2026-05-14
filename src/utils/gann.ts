import { GannLevel, Direction } from "../types/calculator";

// For gold, we can use a scale factor to handle different price ranges.
// 1.0 is standard for prices like 2400.00
const SCALE_FACTOR = 1.0;

export const calculateGannLevels = (basePrice: number, direction: Direction): GannLevel[] => {
  const degrees = [22.5, 45, 90, 135, 180, 225, 270, 315, 360];
  const scaledPrice = basePrice / SCALE_FACTOR;
  const sqrtPrice = Math.sqrt(scaledPrice);

  return degrees.map((degree) => {
    const step = degree / 180;
    let scaledLevel: number;

    if (direction === "BUY") {
      scaledLevel = Math.pow(sqrtPrice + step, 2);
    } else {
      scaledLevel = Math.pow(sqrtPrice - step, 2);
    }

    const price = scaledLevel * SCALE_FACTOR;
    
    let label = `${degree}°`;
    if (degree === 45) label += " (TP1)";
    if (degree === 90) label += " (TP2)";
    if (degree === 180) label += " (TP3)";
    if (degree === 270) label += " (TP4)";

    return {
      degree,
      price,
      label,
    };
  });
};

export const getGannLevelByDegree = (levels: GannLevel[], degree: number): number => {
  const level = levels.find((l) => l.degree === degree);
  return level ? level.price : 0;
};
