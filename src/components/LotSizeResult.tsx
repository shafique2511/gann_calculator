import React from "react";
import { LotSizeResult, SignalResult } from "../types/calculator";
import { formatCurrency, formatPrice } from "../utils/format";
import { Coins, Info } from "lucide-react";

interface Props {
  lotSize: LotSizeResult;
  signal: SignalResult;
}

export const LotSizeResultPanel: React.FC<Props> = ({ lotSize, signal }) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
      {/* Lot Size & Risk */}
      <div className="bg-slate-900 border border-slate-800 rounded-xl p-6 shadow-xl relative overflow-hidden">
        <div className="absolute top-0 right-0 p-4 opacity-10">
          <Coins className="w-24 h-24 text-amber-500" />
        </div>
        <h3 className="text-white font-semibold mb-6 flex items-center gap-2 text-lg">
          <Coins className="w-5 h-5 text-amber-500" />
          Lot Size / Position Sizing
        </h3>

        <div className="grid grid-cols-2 gap-4 mb-6">
          <div className="bg-slate-800/40 p-4 rounded-xl border border-slate-700/50">
            <span className="block text-slate-500 text-xs font-bold uppercase tracking-widest mb-1">Raw Lot Size</span>
            <span className="text-xl font-mono text-white font-bold">{lotSize.rawLotSize.toFixed(4)}</span>
          </div>
          <div className="bg-amber-500/10 p-4 rounded-xl border border-amber-500/30 ring-1 ring-amber-500/20">
            <span className="block text-amber-500/70 text-xs font-bold uppercase tracking-widest mb-1">Suggested Lot</span>
            <span className="text-2xl font-mono text-amber-500 font-black">{lotSize.suggestedLotSize.toFixed(2)}</span>
          </div>
        </div>

        <div className="space-y-3">
          <div className="flex justify-between items-center text-sm p-2 hover:bg-slate-800/50 rounded-lg transition-colors">
            <span className="text-slate-400">Risk Amount ($)</span>
            <span className="text-slate-200 font-mono">{formatCurrency(lotSize.riskAmount)}</span>
          </div>
          <div className="flex justify-between items-center text-sm p-2 hover:bg-slate-800/50 rounded-lg transition-colors">
            <span className="text-slate-400">Estimated Loss</span>
            <span className="text-rose-400 font-mono font-bold">-{formatCurrency(lotSize.estimatedLoss)}</span>
          </div>
          <div className="flex justify-between items-center text-sm p-2 hover:bg-slate-800/50 rounded-lg transition-colors">
            <span className="text-slate-400">Stop Loss Distance</span>
            <span className="text-slate-200 font-mono">{formatPrice(lotSize.stopLossPointsUsed)} pts</span>
          </div>
          <div className="grid grid-cols-2 gap-2 mt-2 pt-2 border-t border-slate-800">
             <div className="text-[10px] text-slate-500 uppercase font-bold">Spread: {formatCurrency(lotSize.costs.spread)}</div>
             <div className="text-[10px] text-slate-500 uppercase font-bold text-right">Comm: {formatCurrency(lotSize.costs.commission)}</div>
          </div>
        </div>
      </div>

      {/* Target Profits */}
      <div className="bg-slate-900 border border-slate-800 rounded-xl p-6 shadow-xl">
        <h3 className="text-white font-semibold mb-6 flex items-center gap-2 text-lg">
          <span className="w-1.5 h-6 bg-emerald-500 rounded-full"></span>
          Potential Profits
        </h3>

        <div className="grid grid-cols-2 gap-4">
          {[1, 2, 3, 4].map((num) => {
            const key = `tp${num}` as keyof typeof lotSize.profits;
            const priceKey = `tp${num}` as keyof typeof signal;
            const distKey = `tp${num}Distance` as keyof typeof signal;
            
            return (
              <div key={num} className="bg-slate-800/30 p-4 rounded-xl border border-slate-800 hover:border-emerald-500/30 hover:bg-emerald-500/5 transition-all">
                <div className="flex justify-between items-center mb-1">
                  <span className="text-emerald-500 text-[10px] font-black uppercase tracking-tighter">Target {num}</span>
                  <span className="text-slate-600 font-mono text-[10px]">{(signal[distKey] as number).toFixed(2)} pts</span>
                </div>
                <div className="text-lg font-mono text-white font-bold mb-1">
                  {(signal[priceKey] as number).toFixed(2)}
                </div>
                <div className="text-emerald-400 font-mono font-bold text-sm">
                  +{formatCurrency(lotSize.profits[key].net)}
                </div>
              </div>
            );
          })}
        </div>
        
        <div className="mt-4 flex items-center gap-2 p-3 bg-slate-950/50 rounded-lg border border-slate-800/50">
           <Info className="w-4 h-4 text-slate-500" />
           <p className="text-[10px] text-slate-500 uppercase font-bold tracking-tight">
             Calculated based on suggested {lotSize.suggestedLotSize.toFixed(2)} lot size.
           </p>
        </div>
      </div>
    </div>
  );
};
