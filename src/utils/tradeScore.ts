import { CalculatorInputs, SignalResult, LotSizeResult, FiboConfluence, PsychologicalLevel } from "../types/calculator";

export interface TradeScoreResult {
  score: number;
  grade: "A+" | "A" | "B" | "C" | "Avoid";
}

export const calculateTradeQualityScore = (
  inputs: CalculatorInputs,
  signal: SignalResult,
  lotSize: LotSizeResult,
  fiboConfluences: FiboConfluence[],
  psyLevels: PsychologicalLevel[]
): TradeScoreResult => {
  let score = 0;

  // Valid Gann setup (if result exists it's mostly valid)
  score += 15;

  // RR TP2 >= 1:2
  const rrTP2 = signal.tp2Distance / signal.slDistance;
  if (rrTP2 >= 2) score += 15;

  // RR TP3 >= 1:3
  const rrTP3 = signal.tp3Distance / signal.slDistance;
  if (rrTP3 >= 3) score += 15;

  // Risk percentage <= 3%
  if (inputs.riskPercent <= 3) score += 15;

  // SL is valid (not zero or extreme)
  if (signal.slDistance > 0 && signal.slDistance < 500) score += 10;

  // Fibonacci confluence
  if (inputs.enableFibo) {
    if (fiboConfluences.length > 0) score += 10;
    if (fiboConfluences.some(c => c.strength === "Very Strong" || c.strength === "Strong")) score += 5;
  }

  // Psychological level
  if (psyLevels.length > 0) score += 10;

  // Multi-target partials
  const totalPartial = inputs.tp1Percent + inputs.tp2Percent + inputs.tp3Percent + inputs.tp4Percent;
  if (totalPartial === 100) score += 5;

  // ATR buffer mode
  if (inputs.useAtrBuffer) score += 5;

  let grade: "A+" | "A" | "B" | "C" | "Avoid";
  if (score >= 90) grade = "A+";
  else if (score >= 75) grade = "A";
  else if (score >= 60) grade = "B";
  else if (score >= 45) grade = "C";
  else grade = "Avoid";

  return { score: Math.min(score, 100), grade };
};
