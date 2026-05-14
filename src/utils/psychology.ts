import { PsychologicalLevel, SignalResult } from "../types/calculator";

export const checkPsychologicalLevels = (signal: SignalResult, tolerance: number): PsychologicalLevel[] => {
  const targets = [
    { label: "Entry High", price: signal.entryZoneHigh },
    { label: "Entry Low", price: signal.entryZoneLow },
    { label: "SL", price: signal.sl },
    { label: "TP1", price: signal.tp1 },
    { label: "TP2", price: signal.tp2 },
    { label: "TP3", price: signal.tp3 },
    { label: "TP4", price: signal.tp4 },
  ];

  const results: PsychologicalLevel[] = [];

  targets.forEach(target => {
    // Check every 10, 50, 100
    const checkValues = [10, 50, 100];
    checkValues.forEach(v => {
      const nearest = Math.round(target.price / v) * v;
      const distance = Math.abs(target.price - nearest);
      if (distance <= tolerance) {
        results.push({
          price: nearest,
          type: v.toString() as "10" | "50" | "100",
          target: target.label,
          distance
        });
      }
    });
  });

  // Unique results by price and target
  return results.filter((value, index, self) =>
    index === self.findIndex((t) => (
      t.price === value.price && t.target === value.target
    ))
  );
};
