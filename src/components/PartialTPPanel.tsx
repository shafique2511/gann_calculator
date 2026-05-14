import React from "react";
import { CalculatorInputs, LotSizeResult } from "../types/calculator";
import { PieChart, Info } from "lucide-react";
import { formatCurrency } from "../utils/format";

interface Props {
  inputs: CalculatorInputs;
  lotSize: LotSizeResult;
  onChange: (inputs: Partial<CalculatorInputs>) => void;
}

export const PartialTPPanel: React.FC<Props> = ({ inputs, lotSize, onChange }) => {
  const total = inputs.tp1Percent + inputs.tp2Percent + inputs.tp3Percent + inputs.tp4Percent;
  
  return (
    <div className="bg-slate-900 border border-slate-800 rounded-xl overflow-hidden mb-8 shadow-xl">
      <div className="bg-slate-800/50 px-6 py-4 border-b border-slate-800 flex justify-between items-center">
        <h3 className="text-white font-semibold flex items-center gap-2">
          <PieChart className="w-5 h-5 text-emerald-400" />
          Partial Take Profit Calculator
        </h3>
        <div className={`text-xs font-bold uppercase px-2 py-1 rounded ${total === 100 ? 'bg-emerald-500/10 text-emerald-500' : 'bg-rose-500/10 text-rose-500'}`}>
          Total: {total}%
        </div>
      </div>

      <div className="p-6">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {[1, 2, 3, 4].map((num) => {
            const key = `tp${num}Percent` as keyof CalculatorInputs;
            const profitKey = `tp${num}` as keyof typeof lotSize.profits;
            const val = inputs[key] as number;
            const partialLot = (lotSize.suggestedLotSize * val) / 100;
            const partialProfit = (lotSize.profits[profitKey].net * val) / 100;

            return (
              <div key={num} className="bg-slate-800/20 border border-slate-800 rounded-xl p-4 group hover:border-emerald-500/30 transition-all">
                <div className="flex justify-between items-center mb-3">
                   <div className="bg-slate-800 text-slate-400 text-[10px] px-2 py-0.5 rounded font-black uppercase tracking-tighter">TP{num} SCALE OUT</div>
                   {val > 0 && <span className="text-emerald-500 text-[10px] font-bold">ACTIVE</span>}
                </div>
                
                <div className="mb-4">
                  <div className="flex justify-between text-xs text-slate-500 mb-1 font-bold">
                    <span>Close Percentage</span>
                    <span className="text-white font-mono">{val}%</span>
                  </div>
                  <input
                    type="range"
                    min="0"
                    max="100"
                    step="5"
                    value={val}
                    onChange={(e) => onChange({ [key]: parseInt(e.target.value) || 0 })}
                    className="w-full h-1.5 bg-slate-700 rounded-lg appearance-none cursor-pointer accent-emerald-500"
                  />
                </div>

                <div className="space-y-2 pt-3 border-t border-slate-800/50">
                   <div className="flex justify-between text-[11px]">
                     <span className="text-slate-500">Partial Lot</span>
                     <span className="text-white font-mono font-bold">{partialLot.toFixed(2)}</span>
                   </div>
                   <div className="flex justify-between text-[11px]">
                     <span className="text-slate-500">Partial Profit</span>
                     <span className="text-emerald-400 font-mono font-bold">{formatCurrency(partialProfit)}</span>
                   </div>
                </div>
              </div>
            );
          })}
        </div>

        {total > 100 && (
          <div className="mt-4 flex items-center gap-2 p-3 bg-rose-500/5 border border-rose-500/20 rounded-lg animate-pulse">
            <Info className="w-4 h-4 text-rose-500" />
            <p className="text-xs text-rose-400 font-bold uppercase tracking-tight">Warning: Total allocation exceeds 100%</p>
          </div>
        )}
      </div>
    </div>
  );
};
