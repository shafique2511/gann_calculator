import React from "react";
import { CalculatorInputs, Direction } from "../types/calculator";
import { Settings, ArrowUpCircle, ArrowDownCircle } from "lucide-react";
import { cn } from "../lib/utils";

interface Props {
  inputs: CalculatorInputs;
  onChange: (inputs: Partial<CalculatorInputs>) => void;
}

export const CalculatorInputsPanel: React.FC<Props> = ({ inputs, onChange }) => {
  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
      {/* Core Settings */}
      <div className="bg-slate-900 border border-slate-800 rounded-xl p-6 shadow-xl overflow-hidden relative">
        <div className="absolute top-0 right-0 p-4 opacity-5">
           <Settings className="w-24 h-24" />
        </div>
        <h3 className="text-white font-semibold mb-6 flex items-center gap-2 text-lg">
          <Settings className="w-5 h-5 text-amber-500" />
          Primary Parameters
        </h3>
        
        <div className="space-y-4">
          <div>
            <label className="block text-slate-400 text-sm mb-1.5 font-medium">Direction</label>
            <div className="grid grid-cols-2 gap-3">
              <button
                onClick={() => onChange({ direction: "BUY" })}
                className={cn(
                  "py-2.5 rounded-lg text-sm font-bold flex items-center justify-center gap-2 border transition-all",
                  inputs.direction === "BUY"
                    ? "bg-emerald-500 border-emerald-500 text-slate-950 shadow-lg shadow-emerald-500/20"
                    : "bg-slate-800 border-slate-700 text-slate-400 hover:text-white"
                )}
              >
                <ArrowUpCircle className="w-4 h-4" />
                BUY / LONG
              </button>
              <button
                onClick={() => onChange({ direction: "SELL" })}
                className={cn(
                  "py-2.5 rounded-lg text-sm font-bold flex items-center justify-center gap-2 border transition-all",
                  inputs.direction === "SELL"
                    ? "bg-rose-500 border-rose-500 text-slate-950 shadow-lg shadow-rose-500/20"
                    : "bg-slate-800 border-slate-700 text-slate-400 hover:text-white"
                )}
              >
                <ArrowDownCircle className="w-4 h-4" />
                SELL / SHORT
              </button>
            </div>
          </div>

          <div>
            <label className="block text-slate-400 text-sm mb-1.5 font-medium">Base Price (Current/Key Level)</label>
            <input
              type="number"
              step="0.01"
              value={inputs.basePrice || ""}
              onChange={(e) => onChange({ basePrice: parseFloat(e.target.value) || 0 })}
              className="w-full bg-slate-800 border border-slate-700 rounded-lg py-2.5 px-4 text-white font-mono focus:ring-2 focus:ring-amber-500 outline-none transition-all placeholder:text-slate-600"
              placeholder="e.g. 2400.00"
            />
          </div>
          
          <div className="grid grid-cols-2 gap-4">
            <div className={cn(inputs.useAtrBuffer && "opacity-50 pointer-events-none")}>
              <label className="block text-slate-400 text-sm mb-1.5 font-medium">Entry Zone Buffer</label>
              <input
                type="number"
                step="0.1"
                value={inputs.entryBuffer}
                disabled={inputs.useAtrBuffer}
                onChange={(e) => onChange({ entryBuffer: parseFloat(e.target.value) || 0 })}
                className="w-full bg-slate-800 border border-slate-700 rounded-lg py-2 px-4 text-white font-mono focus:ring-2 focus:ring-amber-500 outline-none"
              />
            </div>
            <div className={cn(inputs.useAtrBuffer && "opacity-50 pointer-events-none")}>
              <label className="block text-slate-400 text-sm mb-1.5 font-medium">SL Buffer</label>
              <input
                type="number"
                step="0.1"
                value={inputs.slBuffer}
                disabled={inputs.useAtrBuffer}
                onChange={(e) => onChange({ slBuffer: parseFloat(e.target.value) || 0 })}
                className="w-full bg-slate-800 border border-slate-700 rounded-lg py-2 px-4 text-white font-mono focus:ring-2 focus:ring-amber-500 outline-none"
              />
            </div>
          </div>

          <div className="pt-4 border-t border-slate-800/50">
            <div className="flex items-center justify-between mb-3">
              <div className="flex flex-col">
                <span className="text-slate-300 text-sm font-semibold">ATR Buffer Mode</span>
                <span className="text-[10px] text-slate-500 font-bold uppercase tracking-widest">Automatic Adaptation</span>
              </div>
              <button
                onClick={() => onChange({ useAtrBuffer: !inputs.useAtrBuffer })}
                className={cn(
                  "w-11 h-6 rounded-full transition-colors relative",
                  inputs.useAtrBuffer ? "bg-amber-500" : "bg-slate-700"
                )}
              >
                <div className={cn(
                  "absolute top-1 w-4 h-4 bg-white rounded-full transition-all shadow-sm",
                  inputs.useAtrBuffer ? "right-1" : "left-1"
                )} />
              </button>
            </div>
            {inputs.useAtrBuffer && (
              <div className="space-y-4 animate-in fade-in slide-in-from-top-1">
                <div>
                  <label className="block text-slate-500 text-[10px] mb-1 font-bold uppercase tracking-widest">Current ATR Value (Points)</label>
                  <input
                    type="number"
                    step="0.01"
                    value={inputs.atrValue}
                    onChange={(e) => onChange({ atrValue: parseFloat(e.target.value) || 0 })}
                    className="w-full bg-slate-800 border border-amber-500/30 rounded-lg py-2 px-4 text-white font-mono focus:ring-2 focus:ring-amber-500 outline-none"
                  />
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-slate-500 text-[10px] mb-1 font-bold uppercase tracking-widest">Entry Multiplier</label>
                    <input
                      type="number"
                      step="0.1"
                      value={inputs.atrEntryMultiplier}
                      onChange={(e) => onChange({ atrEntryMultiplier: parseFloat(e.target.value) || 0 })}
                      className="w-full bg-slate-800 border border-slate-700 rounded-lg py-2 px-4 text-white font-mono focus:ring-2 focus:ring-amber-500 outline-none"
                    />
                  </div>
                  <div>
                    <label className="block text-slate-500 text-[10px] mb-1 font-bold uppercase tracking-widest">SL Multiplier</label>
                    <input
                      type="number"
                      step="0.1"
                      value={inputs.atrSlMultiplier}
                      onChange={(e) => onChange({ atrSlMultiplier: parseFloat(e.target.value) || 0 })}
                      className="w-full bg-slate-800 border border-slate-700 rounded-lg py-2 px-4 text-white font-mono focus:ring-2 focus:ring-amber-500 outline-none"
                    />
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Account Settings */}
      <div className="bg-slate-900 border border-slate-800 rounded-xl p-6 shadow-xl">
        <h3 className="text-white font-semibold mb-6 flex items-center gap-2 text-lg">
          <span className="w-1.5 h-6 bg-slate-700 rounded-full"></span>
          Account & Risk
        </h3>
        
        <div className="space-y-4">
          <div>
            <label className="block text-slate-400 text-sm mb-1.5 font-medium">Account Balance ($)</label>
            <input
              type="number"
              value={inputs.accountBalance || ""}
              onChange={(e) => onChange({ accountBalance: parseFloat(e.target.value) || 0 })}
              className="w-full bg-slate-800 border border-slate-700 rounded-lg py-2.5 px-4 text-white font-mono focus:ring-2 focus:ring-amber-500 outline-none"
              placeholder="10000"
            />
          </div>

          <div>
            <label className="block text-slate-400 text-sm mb-1.5 font-medium">Risk per Trade (%)</label>
            <input
              type="number"
              step="0.1"
              value={inputs.riskPercent}
              onChange={(e) => onChange({ riskPercent: parseFloat(e.target.value) || 0 })}
              className="w-full bg-slate-800 border border-slate-700 rounded-lg py-2.5 px-4 text-white font-mono focus:ring-2 focus:ring-amber-500 outline-none"
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-slate-400 text-[10px] mb-1 font-bold uppercase tracking-widest">Spread (Pts)</label>
              <input
                type="number"
                step="0.1"
                value={inputs.spread}
                onChange={(e) => onChange({ spread: parseFloat(e.target.value) || 0 })}
                className="w-full bg-slate-800 border border-slate-700 rounded-lg py-2 px-3 text-white font-mono text-xs outline-none"
              />
            </div>
            <div>
              <label className="block text-slate-400 text-[10px] mb-1 font-bold uppercase tracking-widest">Comm. ($/Lot)</label>
              <input
                type="number"
                step="0.1"
                value={inputs.commission}
                onChange={(e) => onChange({ commission: parseFloat(e.target.value) || 0 })}
                className="w-full bg-slate-800 border border-slate-700 rounded-lg py-2 px-3 text-white font-mono text-xs outline-none"
              />
            </div>
          </div>

          <div>
             <label className="block text-slate-400 text-sm mb-1.5 font-medium">Psy. Tolerance (Pts)</label>
             <input
                type="number"
                step="0.1"
                value={inputs.psyTolerance}
                onChange={(e) => onChange({ psyTolerance: parseFloat(e.target.value) || 0 })}
                className="w-full bg-slate-800 border border-slate-700 rounded-lg py-2.5 px-4 text-white font-mono focus:ring-2 focus:ring-amber-500 outline-none"
             />
          </div>

          <div>
            <label className="block text-slate-400 text-sm mb-1.5 font-medium">Custom SL Points (Optional)</label>
            <input
              type="number"
              step="0.1"
              value={inputs.customStopLossPoints || ""}
              onChange={(e) => onChange({ customStopLossPoints: parseFloat(e.target.value) || null })}
              className="w-full bg-slate-800 border border-slate-700 rounded-lg py-2.5 px-4 text-white font-mono focus:ring-2 focus:ring-amber-500 outline-none"
              placeholder="Standard used by default"
            />
          </div>
        </div>
      </div>

      {/* Contract Specs */}
      <div className="bg-slate-900 border border-slate-800 rounded-xl p-6 shadow-xl">
        <h3 className="text-white font-semibold mb-6 flex items-center gap-2 text-lg">
          <span className="w-1.5 h-6 bg-slate-700 rounded-full"></span>
          Contract Specifications
        </h3>
        
        <div className="space-y-4">
           <div>
            <label className="block text-slate-400 text-sm mb-1.5 font-medium">Value Per Lot (per 1.00 move)</label>
            <input
              type="number"
              value={inputs.valuePerLot}
              onChange={(e) => onChange({ valuePerLot: parseFloat(e.target.value) || 0 })}
              className="w-full bg-slate-800 border border-slate-700 rounded-lg py-2.5 px-4 text-white font-mono focus:ring-2 focus:ring-amber-500 outline-none"
            />
            <p className="mt-2 text-[11px] text-slate-500 leading-relaxed uppercase font-bold tracking-wider">
              Standard XAUUSD is usually 100 which means 1.00 move = $100 per 1.00 lot.
            </p>
          </div>

          <div className="pt-4 border-t border-slate-800">
             <div className="flex justify-between items-center bg-slate-800/50 p-3 rounded-lg border border-slate-700/50">
                <span className="text-slate-400 text-sm">Asset</span>
                <span className="text-amber-500 font-bold">GOLD / XAUUSD</span>
             </div>
          </div>
        </div>
      </div>
    </div>
  );
};
