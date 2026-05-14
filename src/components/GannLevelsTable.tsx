import React from "react";
import { GannLevel } from "../types/calculator";

interface Props {
  levels: GannLevel[];
  basePrice: number;
}

export const GannLevelsTable: React.FC<Props> = ({ levels, basePrice }) => {
  return (
    <div className="bg-slate-900 border border-slate-800 rounded-xl overflow-hidden mb-8">
      <div className="bg-slate-800/50 px-6 py-4 border-b border-slate-800">
        <h3 className="text-white font-semibold flex items-center gap-2">
          <span className="w-1.5 h-6 bg-cyan-500 rounded-full"></span>
          Enhanced Gann Square of Nine Levels
        </h3>
      </div>
      <div className="overflow-x-auto">
        <table className="w-full text-left">
          <thead>
            <tr className="bg-slate-950/30 text-slate-400 text-xs font-bold uppercase">
              <th className="px-6 py-3">Degree</th>
              <th className="px-6 py-3">Price Level</th>
              <th className="px-6 py-3">Distance</th>
              <th className="px-6 py-3">Tag</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-800/50">
            {levels.map((level) => {
              const distance = Math.abs(level.price - basePrice);
              const isTarget = level.label.includes("TP");
              
              return (
                <tr key={level.degree} className="hover:bg-slate-800/30 transition-colors group">
                  <td className="px-6 py-3 text-slate-300 font-mono group-hover:text-amber-500">
                    {level.degree}°
                  </td>
                  <td className="px-6 py-3 text-white font-mono font-bold">
                    {level.price.toFixed(2)}
                  </td>
                  <td className="px-6 py-3 text-slate-500 text-sm font-mono">
                    {distance.toFixed(2)}
                  </td>
                  <td className="px-6 py-3">
                    {isTarget ? (
                      <span className="bg-emerald-500/10 text-emerald-500 px-3 py-1 rounded-full text-[10px] font-bold border border-emerald-500/20">
                        {level.label.split(" (")[1].replace(")", "")}
                      </span>
                    ) : (
                      <span className="text-slate-600 text-[10px] font-bold uppercase tracking-widest">
                        Support / Resistance
                      </span>
                    )}
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
};
