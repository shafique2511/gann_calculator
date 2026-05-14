import { FibonacciRatio, FiboConfluence, CalculatorInputs, SignalResult } from "../types/calculator";

export const FIBO_PRESETS: Record<string, FibonacciRatio[]> = {
  standard: [
    { id: "s1", ratio: 0.236, label: "23.6", enabled: true },
    { id: "s2", ratio: 0.382, label: "38.2", enabled: true },
    { id: "s3", ratio: 0.5, label: "50.0", enabled: true },
    { id: "s4", ratio: 0.618, label: "Golden Zone", enabled: true },
    { id: "s5", ratio: 0.786, label: "78.6", enabled: true },
    { id: "s6", ratio: 1.0, label: "Full Range", enabled: true },
  ],
  extension: [
    { id: "e1", ratio: 1.0, label: "Full Range", enabled: true },
    { id: "e2", ratio: 1.272, label: "127.2 Extension", enabled: true },
    { id: "e3", ratio: 1.414, label: "141.4 Extension", enabled: true },
    { id: "e4", ratio: 1.618, label: "Golden Extension", enabled: true },
    { id: "e5", ratio: 2.0, label: "200.0 Extension", enabled: true },
    { id: "e6", ratio: 2.618, label: "261.8 Extension", enabled: true },
  ],
  scalping: [
    { id: "sc1", ratio: 0.125, label: "Micro", enabled: true },
    { id: "sc2", ratio: 0.236, label: "23.6", enabled: true },
    { id: "sc3", ratio: 0.382, label: "38.2", enabled: true },
    { id: "sc4", ratio: 0.5, label: "50.0", enabled: true },
    { id: "sc5", ratio: 0.618, label: "Golden Zone", enabled: true },
    { id: "sc6", ratio: 0.786, label: "78.6", enabled: true },
    { id: "sc7", ratio: 0.886, label: "Deep Retracement", enabled: true },
    { id: "sc8", ratio: 1.0, label: "Full Range", enabled: true },
  ],
  full: [
    { id: "f0", ratio: 0.000, label: "Start", enabled: true },
    { id: "f1", ratio: 0.125, label: "Micro", enabled: true },
    { id: "f2", ratio: 0.236, label: "23.6", enabled: true },
    { id: "f3", ratio: 0.382, label: "38.2", enabled: true },
    { id: "f4", ratio: 0.500, label: "50%", enabled: true },
    { id: "f5", ratio: 0.618, label: "Golden Zone", enabled: true },
    { id: "f6", ratio: 0.707, label: "70.7%", enabled: true },
    { id: "f7", ratio: 0.786, label: "78.6%", enabled: true },
    { id: "f8", ratio: 0.886, label: "Deep Retrace", enabled: true },
    { id: "f9", ratio: 1.000, label: "Full Range", enabled: true },
    { id: "f10", ratio: 1.130, label: "113%", enabled: true },
    { id: "f11", ratio: 1.272, label: "127.2 Ext", enabled: true },
    { id: "f12", ratio: 1.414, label: "141.4 Ext", enabled: true },
    { id: "f13", ratio: 1.618, label: "Golden Ext", enabled: true },
    { id: "f14", ratio: 2.000, label: "200% Ext", enabled: true },
    { id: "f15", ratio: 2.618, label: "261.8 Ext", enabled: true },
    { id: "f16", ratio: 3.618, label: "361.8 Ext", enabled: true },
    { id: "f17", ratio: 4.236, label: "423.6 Ext", enabled: true },
  ]
};

export const DEFAULT_FIBO_FULL_SET: FibonacciRatio[] = FIBO_PRESETS.full;

export const getRatiosByPreset = (preset: string): FibonacciRatio[] => {
  return FIBO_PRESETS[preset] || FIBO_PRESETS.full;
};

export const calculateFiboLevels = (inputs: CalculatorInputs): FiboConfluence[] => {
  const { swingHigh, swingLow, fiboDirection, direction, fiboRatios, fiboTolerance } = inputs;
  const range = Math.abs(swingHigh - swingLow);
  const effectiveDirection = fiboDirection === "auto" ? (direction === "BUY" ? "lowToHigh" : "highToLow") : fiboDirection;

  const activeRatios = fiboRatios.filter(r => r.enabled);
  const levels: { ratio: number; label: string; price: number }[] = activeRatios.map(r => {
    let price: number;
    if (effectiveDirection === "lowToHigh") {
      price = swingLow + range * r.ratio;
    } else {
      price = swingHigh - range * r.ratio;
    }
    return { ratio: r.ratio, label: r.label, price };
  });

  return levels.map(l => ({
    ...l,
    target: "",
    targetPrice: 0,
    strength: "None",
    distance: 0
  }));
};

export const checkFiboConfluence = (fiboLevels: FiboConfluence[], signal: SignalResult, tolerance: number): FiboConfluence[] => {
  const targets = [
    { label: "Entry High", price: signal.entryZoneHigh },
    { label: "Entry Low", price: signal.entryZoneLow },
    { label: "SL", price: signal.sl },
    { label: "TP1", price: signal.tp1 },
    { label: "TP2", price: signal.tp2 },
    { label: "TP3", price: signal.tp3 },
    { label: "TP4", price: signal.tp4 },
  ];

  const results: FiboConfluence[] = [];

  fiboLevels.forEach(level => {
    targets.forEach(target => {
      const distance = Math.abs(level.price - target.price);
      if (distance <= tolerance) {
        let strength: "Very Strong" | "Strong" | "Medium" | "None" = "None";
        if (distance <= tolerance * 0.33) strength = "Very Strong";
        else if (distance <= tolerance * 0.66) strength = "Strong";
        else strength = "Medium";

        results.push({
          ...level,
          target: target.label,
          targetPrice: target.price,
          strength,
          distance
        });
      }
    });
  });

  return results;
};
