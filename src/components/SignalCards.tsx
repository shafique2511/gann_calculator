import React from "react";
import { SignalResult } from "../types/calculator";
import { MoveRight, ShieldCheck, Target, ArrowDown, ArrowUp } from "lucide-react";
import { cn } from "../lib/utils";

interface Props {
  signal: SignalResult;
}

export const SignalCards: React.FC<Props> = ({ signal }) => {
  const isBuy = signal.direction === "BUY";

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6 mb-8">
      {/* Direction & Timeframe */}
      <div className={cn(
        "rounded-xl p-6 border shadow-lg relative overflow-hidden",
        isBuy ? "bg-emerald-950/20 border-emerald-500/30" : "bg-rose-950/20 border-rose-500/30"
      )}>
        <div className={cn(
          "absolute top-0 right-0 p-4 opacity-10",
          isBuy ? "text-emerald-500" : "text-rose-500"
        )}>
          {isBuy ? <ArrowUp className="w-16 h-16" /> : <ArrowDown className="w-16 h-16" />}
        </div>
        <h4 className="text-slate-400 text-xs font-bold uppercase tracking-widest mb-1">Signal Direction</h4>
        <div className={cn(
          "text-3xl font-black mb-2",
          isBuy ? "text-emerald-400" : "text-rose-400"
        )}>
          {signal.direction}
        </div>
        <div className="text-white/60 text-sm font-medium">Valid for {signal.timeframe} timeframe</div>
      </div>

      {/* Entry Zone */}
      <div className="bg-slate-900 border border-slate-800 rounded-xl p-6 shadow-lg">
        <h4 className="text-slate-400 text-xs font-bold uppercase tracking-widest mb-3 flex items-center gap-2">
          <MoveRight className="w-3 h-3 text-amber-500" />
          Entry Zone
        </h4>
        <div className="text-2xl font-mono font-bold text-white mb-2">
          {signal.entryZoneLow.toFixed(2)} - {signal.entryZoneHigh.toFixed(2)}
        </div>
        <div className="flex items-center gap-2 text-xs font-medium text-slate-500">
           <span>Cons. Entry:</span>
           <span className="text-sky-400 font-mono">{signal.conservativeEntry.toFixed(2)}</span>
        </div>
      </div>

      {/* Stop Loss */}
      <div className="bg-slate-900 border border-slate-800 rounded-xl p-6 shadow-lg">
        <h4 className="text-slate-400 text-xs font-bold uppercase tracking-widest mb-3 flex items-center gap-2">
          <ShieldCheck className="w-3 h-3 text-rose-500" />
          Stop Loss
        </h4>
        <div className="text-2xl font-mono font-bold text-rose-400 mb-2">
          {signal.sl.toFixed(2)}
        </div>
        <div className="text-xs font-medium text-slate-500">
          Distance: <span className="text-slate-300">{signal.slDistance.toFixed(2)} points</span>
        </div>
      </div>

      {/* Primary Target */}
      <div className="bg-slate-900 border border-slate-800 rounded-xl p-6 shadow-lg">
        <h4 className="text-slate-400 text-xs font-bold uppercase tracking-widest mb-3 flex items-center gap-2">
          <Target className="w-3 h-3 text-emerald-500" />
          Primary Target (TP1)
        </h4>
        <div className="text-2xl font-mono font-bold text-emerald-400 mb-2">
          {signal.tp1.toFixed(2)}
        </div>
        <div className="text-xs font-medium text-slate-500">
          Potential: <span className="text-slate-300">{signal.tp1Distance.toFixed(2)} points</span>
        </div>
      </div>
    </div>
  );
};
