import React from "react";
import { PsychologicalLevel } from "../types/calculator";
import { Hash } from "lucide-react";
import { cn } from "../lib/utils";

interface Props {
  levels: PsychologicalLevel[];
  tolerance: number;
}

export const PsychologicalLevelsPanel: React.FC<Props> = ({ levels, tolerance }) => {
  return (
    <div className="bg-slate-900 border border-slate-800 rounded-xl overflow-hidden mb-8 shadow-lg">
      <div className="bg-slate-800/50 px-6 py-4 border-b border-slate-800">
        <h3 className="text-white font-semibold flex items-center gap-2">
          <Hash className="w-5 h-5 text-fuchsia-400" />
          Psychological Price Confluence
        </h3>
      </div>
      <div className="p-6">
        {levels.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            {levels.map((level, idx) => (
              <div key={idx} className="bg-slate-800/40 border border-slate-800 rounded-lg p-4 flex flex-col gap-2 hover:border-fuchsia-500/30 transition-all">
                <div className="flex justify-between items-center">
                  <span className="text-white font-mono font-bold text-lg">{level.price}</span>
                  <span className={cn(
                    "text-[10px] font-black uppercase px-2 py-0.5 rounded",
                    level.type === "100" ? "bg-fuchsia-500 text-white" :
                    level.type === "50" ? "bg-fuchsia-500/20 text-fuchsia-400" :
                    "bg-slate-800 text-slate-400"
                  )}>
                    Level {level.type}
                  </span>
                </div>
                <div className="flex flex-col">
                  <span className="text-[10px] text-slate-500 uppercase font-bold tracking-widest mb-1">Impacts Target</span>
                  <span className="text-slate-300 text-sm font-medium">{level.target}</span>
                  <span className="text-slate-600 text-[10px] font-mono mt-1">Offset: {level.distance.toFixed(2)} pts</span>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="bg-slate-950/50 rounded-xl p-8 border border-dashed border-slate-800 text-center">
            <p className="text-slate-500 font-medium">No psychological level confluence detected within {tolerance} points.</p>
          </div>
        )}
        <div className="mt-6 flex items-center gap-3 p-3 bg-fuchsia-500/5 border border-fuchsia-500/10 rounded-lg">
           <p className="text-[10px] text-fuchsia-400/70 font-bold uppercase tracking-wider leading-relaxed">
             Gold traders heavily respect "Even Numbers". 100-level prices like 2400.00 or 2500.00 often act as major reversal or breakout traps.
           </p>
        </div>
      </div>
    </div>
  );
};
