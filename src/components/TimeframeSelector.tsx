import React from "react";
import { TimeframeMode } from "../types/calculator";
import { TIMEFRAME_CONFIGS } from "../utils/timeframe";
import { cn } from "../lib/utils";

interface Props {
  selected: TimeframeMode;
  onChange: (mode: TimeframeMode) => void;
}

export const TimeframeSelector: React.FC<Props> = ({ selected, onChange }) => {
  const modes: TimeframeMode[] = ["M1", "M5", "M15", "M30", "H1", "H4", "Daily", "Custom"];

  return (
    <div className="bg-slate-900/50 border border-slate-800 rounded-xl p-6 mb-6">
      <h3 className="text-white font-semibold mb-4 flex items-center gap-2 text-lg">
        <span className="w-1.5 h-6 bg-amber-500 rounded-full"></span>
        Select Target Timeframe
      </h3>
      <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-8 gap-3">
        {modes.map((mode) => (
          <button
            key={mode}
            onClick={() => onChange(mode)}
            className={cn(
              "py-3 px-2 rounded-lg text-sm font-bold transition-all border flex flex-col items-center gap-1",
              selected === mode
                ? "bg-amber-500 border-amber-500 text-slate-950 shadow-lg shadow-amber-500/20"
                : "bg-slate-800 border-slate-700 text-slate-400 hover:border-slate-500 hover:text-white"
            )}
          >
            {mode}
            <span className={cn(
              "text-[10px] uppercase font-medium",
              selected === mode ? "text-slate-800" : "text-slate-500"
            )}>
              {mode === "Custom" ? "Manual" : mode.startsWith("M") ? "Scalp" : "Swing"}
            </span>
          </button>
        ))}
      </div>
      <p className="mt-4 text-slate-400 text-sm italic">
        Recommended strategy: {TIMEFRAME_CONFIGS[selected].description}
      </p>
    </div>
  );
};
