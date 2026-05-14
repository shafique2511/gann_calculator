import { TimeframeMode } from "../types/calculator";

export interface TimeframeConfig {
  entryBuffer: number;
  slBuffer: number;
  atrEntryMultiplier: number;
  atrSlMultiplier: number;
  description: string;
}

export const TIMEFRAME_CONFIGS: Record<TimeframeMode, TimeframeConfig> = {
  M1: {
    entryBuffer: 1.0,
    slBuffer: 2.5,
    atrEntryMultiplier: 0.3,
    atrSlMultiplier: 0.8,
    description: "Scalping (1m TF)",
  },
  M5: {
    entryBuffer: 2.0,
    slBuffer: 5.0,
    atrEntryMultiplier: 0.5,
    atrSlMultiplier: 1.0,
    description: "Scalping (5m TF)",
  },
  M15: {
    entryBuffer: 4.0,
    slBuffer: 8.0,
    atrEntryMultiplier: 0.6,
    atrSlMultiplier: 1.2,
    description: "Intraday (15m TF)",
  },
  M30: {
    entryBuffer: 6.0,
    slBuffer: 12.0,
    atrEntryMultiplier: 0.7,
    atrSlMultiplier: 1.5,
    description: "Intraday (30m TF)",
  },
  H1: {
    entryBuffer: 10.0,
    slBuffer: 20.0,
    atrEntryMultiplier: 0.8,
    atrSlMultiplier: 1.8,
    description: "Swing (1h TF)",
  },
  H4: {
    entryBuffer: 20.0,
    slBuffer: 40.0,
    atrEntryMultiplier: 1.0,
    atrSlMultiplier: 2.0,
    description: "Major Levels (4h TF)",
  },
  Daily: {
    entryBuffer: 50.0,
    slBuffer: 100.0,
    atrEntryMultiplier: 1.2,
    atrSlMultiplier: 2.5,
    description: "Major Bias (Daily TF)",
  },
  Custom: {
    entryBuffer: 0,
    slBuffer: 0,
    atrEntryMultiplier: 0,
    atrSlMultiplier: 0,
    description: "Manual Settings",
  },
};
