export type TimeframeMode = 
  | "M1" 
  | "M5" 
  | "M15" 
  | "M30" 
  | "H1" 
  | "H4" 
  | "Daily" 
  | "Custom";

export type Direction = "BUY" | "SELL";

export interface FibonacciRatio {
  id: string;
  ratio: number;
  label: string;
  enabled: boolean;
}

export interface CalculatorInputs {
  basePrice: number;
  timeframe: TimeframeMode;
  direction: Direction;
  
  // Buffers
  entryBuffer: number;
  slBuffer: number;
  useAtrBuffer: boolean;
  atrValue: number;
  atrEntryMultiplier: number;
  atrSlMultiplier: number;
  
  // Risk & Lot Size
  accountBalance: number;
  riskPercent: number;
  customStopLossPoints: number | null;
  valuePerLot: number; // Default 100 for XAUUSD
  spread: number;
  commission: number;
  
  // Fibonacci
  enableFibo: boolean;
  swingHigh: number;
  swingLow: number;
  fiboDirection: "auto" | "lowToHigh" | "highToLow";
  fiboTolerance: number;
  fiboPreset: "standard" | "extension" | "scalping" | "full" | "custom";
  fiboRatios: FibonacciRatio[];
  
  // Psychological
  psyTolerance: number;
  
  // Partial TP
  tp1Percent: number;
  tp2Percent: number;
  tp3Percent: number;
  tp4Percent: number;
  
  // Break Even
  breakEvenRule: "none" | "afterTP1" | "afterTP2";

  // Telegram
  telegramBotToken?: string;
  telegramChatId?: string;
  appApiKey?: string;
  includeFooter: boolean;
  includeGeneratedOn: boolean;
}

export interface GannLevel {
  degree: number;
  price: number;
  label: string;
}

export interface SignalResult {
  direction: Direction;
  timeframe: TimeframeMode;
  entryZoneLow: number;
  entryZoneHigh: number;
  conservativeEntry: number;
  sl: number;
  tp1: number;
  tp2: number;
  tp3: number;
  tp4: number;
  slDistance: number;
  tp1Distance: number;
  tp2Distance: number;
  tp3Distance: number;
  tp4Distance: number;
}

export interface LotSizeResult {
  riskAmount: number;
  stopLossPointsUsed: number;
  rawLotSize: number;
  suggestedLotSize: number;
  estimatedLoss: number;
  profits: {
    tp1: { gross: number; net: number };
    tp2: { gross: number; net: number };
    tp3: { gross: number; net: number };
    tp4: { gross: number; net: number };
  };
  costs: {
    spread: number;
    commission: number;
  };
}

export interface FiboConfluence {
  ratio: number;
  label: string;
  price: number;
  target: string;
  targetPrice: number;
  strength: "Very Strong" | "Strong" | "Medium" | "None";
  distance: number;
}

export interface PsychologicalLevel {
  price: number;
  type: "10" | "50" | "100";
  target: string;
  distance: number;
}

export type HitTPStatus =
  | "tp1"
  | "tp2"
  | "tp3"
  | "tp4"
  | "alltp"
  | "sl"
  | "entry"
  | "be"
  | "manual";

export interface HitTPUpdateInputs {
  status: HitTPStatus;
  currentPrice: number | null;
  customNote: string;
  includeProfitEstimate: boolean;
  includeManagementInstruction: boolean;
  includeOriginalSignalSummary: boolean;
  includeTimestamp: boolean;
  includeFooter: boolean;
}

export interface HitTPUpdateResult {
  statusLabel: string;
  targetPrice: number | null;
  estimatedProfit: number | null;
  estimatedLoss: number | null;
  plainTextMessage: string;
  htmlMessage: string;
  warnings: string[];
}
