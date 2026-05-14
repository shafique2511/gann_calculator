import { CalculatorInputs, SignalResult, LotSizeResult } from "../types/calculator";
import { calculateGannLevels, getGannLevelByDegree } from "./gann";

export const calculateSignal = (inputs: CalculatorInputs): SignalResult => {
  const { basePrice, direction, entryBuffer, slBuffer, useAtrBuffer, atrValue, atrEntryMultiplier, atrSlMultiplier } = inputs;
  const gannLevels = calculateGannLevels(basePrice, direction);

  let actualEntryBuffer = entryBuffer;
  let actualSlBuffer = slBuffer;

  if (useAtrBuffer) {
    actualEntryBuffer = atrValue * atrEntryMultiplier;
    actualSlBuffer = atrValue * atrSlMultiplier;
  }

  let entryZoneLow: number;
  let entryZoneHigh: number;
  let conservativeEntry: number;
  let sl: number;

  if (direction === "BUY") {
    entryZoneLow = basePrice;
    entryZoneHigh = basePrice + actualEntryBuffer;
    conservativeEntry = entryZoneHigh;
    sl = basePrice - actualSlBuffer;
  } else {
    entryZoneHigh = basePrice;
    entryZoneLow = basePrice - actualEntryBuffer;
    conservativeEntry = entryZoneLow;
    sl = basePrice + actualSlBuffer;
  }

  const tp1 = getGannLevelByDegree(gannLevels, 45);
  const tp2 = getGannLevelByDegree(gannLevels, 90);
  const tp3 = getGannLevelByDegree(gannLevels, 180);
  const tp4 = getGannLevelByDegree(gannLevels, 270);

  return {
    direction,
    timeframe: inputs.timeframe,
    entryZoneLow,
    entryZoneHigh,
    conservativeEntry,
    sl,
    tp1,
    tp2,
    tp3,
    tp4,
    slDistance: Math.abs(conservativeEntry - sl),
    tp1Distance: Math.abs(tp1 - conservativeEntry),
    tp2Distance: Math.abs(tp2 - conservativeEntry),
    tp3Distance: Math.abs(tp3 - conservativeEntry),
    tp4Distance: Math.abs(tp4 - conservativeEntry),
  };
};

export const calculateLotSize = (inputs: CalculatorInputs, signal: SignalResult): LotSizeResult => {
  const { accountBalance, riskPercent, customStopLossPoints, valuePerLot, spread, commission } = inputs;
  
  const riskAmount = (accountBalance * riskPercent) / 100;
  const stopLossPointsUsed = (customStopLossPoints || signal.slDistance) + spread;
  
  const rawLotSize = riskAmount / (stopLossPointsUsed * valuePerLot);
  const suggestedLotSize = Math.max(0.01, Math.floor(rawLotSize * 100) / 100);

  const spreadCost = suggestedLotSize * spread * valuePerLot;
  const commissionCost = suggestedLotSize * commission;
  const totalCost = spreadCost + commissionCost;

  const estimatedLoss = (suggestedLotSize * (customStopLossPoints || signal.slDistance) * valuePerLot) + totalCost;
  
  const calculateProfit = (tpDistance: number) => {
    const gross = suggestedLotSize * tpDistance * valuePerLot;
    const net = gross - totalCost;
    return { gross, net };
  };

  return {
    riskAmount,
    stopLossPointsUsed,
    rawLotSize,
    suggestedLotSize,
    estimatedLoss,
    profits: {
      tp1: calculateProfit(signal.tp1Distance),
      tp2: calculateProfit(signal.tp2Distance),
      tp3: calculateProfit(signal.tp3Distance),
      tp4: calculateProfit(signal.tp4Distance),
    },
    costs: {
      spread: spreadCost,
      commission: commissionCost,
    }
  };
};
