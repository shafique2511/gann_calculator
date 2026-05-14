import React, { useMemo } from "react";
import { CalculatorInputs, FiboConfluence, FibonacciRatio, SignalResult } from "../types/calculator";
import { Layers, Plus, Trash2, RotateCcw, SortAsc, AlertCircle, TrendingUp, TrendingDown, Target, Info } from "lucide-react";
import { cn } from "../lib/utils";
import { FIBO_PRESETS, getRatiosByPreset } from "../utils/fibo";

interface Props {
  inputs: CalculatorInputs;
  signal: SignalResult;
  confluences: FiboConfluence[];
  onChange: (inputs: Partial<CalculatorInputs>) => void;
}

export const FibonacciPanel: React.FC<Props> = ({ inputs, signal, confluences, onChange }) => {
  const rangeError = inputs.swingHigh !== 0 && inputs.swingLow !== 0 && inputs.swingHigh <= inputs.swingLow;

  const addRatio = () => {
    const newRatio: FibonacciRatio = {
      id: Date.now().toString(),
      ratio: 0.5,
      label: "Custom",
      enabled: true
    };
    onChange({ fiboRatios: [...inputs.fiboRatios, newRatio], fiboPreset: "custom" });
  };

  const removeRatio = (id: string) => {
    onChange({ 
      fiboRatios: inputs.fiboRatios.filter(r => r.id !== id),
      fiboPreset: "custom"
    });
  };

  const updateRatio = (id: string, updates: Partial<FibonacciRatio>) => {
    onChange({
      fiboRatios: inputs.fiboRatios.map(r => r.id === id ? { ...r, ...updates } : r),
      fiboPreset: "custom"
    });
  };

  const handlePresetChange = (preset: CalculatorInputs["fiboPreset"]) => {
    if (preset === "custom") return;
    onChange({ 
      fiboPreset: preset,
      fiboRatios: FIBO_PRESETS[preset]
    });
  };

  const fiboLevels = useMemo(() => {
    if (!inputs.enableFibo || rangeError) return [];
    
    const range = inputs.swingHigh - inputs.swingLow;
    const effectiveDirection = inputs.fiboDirection === "auto" 
      ? (inputs.direction === "BUY" ? "lowToHigh" : "highToLow") 
      : inputs.fiboDirection;

    return inputs.fiboRatios
      .filter(r => r.enabled)
      .map(r => {
        let price: number;
        if (effectiveDirection === "lowToHigh") {
          price = inputs.swingLow + range * r.ratio;
        } else {
          price = inputs.swingHigh - range * r.ratio;
        }
        return { ...r, price };
      });
  }, [inputs.enableFibo, inputs.swingHigh, inputs.swingLow, inputs.fiboDirection, inputs.direction, inputs.fiboRatios, rangeError]);

  const summary = useMemo(() => {
    if (confluences.length === 0) return null;
    
    const sorted = [...confluences].sort((a, b) => a.distance - b.distance);
    const strongest = sorted[0];
    const tpConfluences = confluences.filter(c => c.target.startsWith("TP"));
    const bestTp = tpConfluences.length > 0 ? [...tpConfluences].sort((a, b) => a.distance - b.distance)[0] : null;
    const entryConfluence = confluences.some(c => c.target.startsWith("Entry"));

    return {
      total: confluences.length,
      strongest,
      bestTp,
      entryConfluence
    };
  }, [confluences]);

  return (
    <div className="bg-slate-900 border border-slate-800 rounded-xl overflow-hidden mb-8 shadow-2xl">
      {/* Header */}
      <div className="bg-slate-800/80 px-6 py-4 border-b border-slate-800 flex justify-between items-center bg-linear-to-r from-slate-800/80 to-slate-900/80">
        <div className="flex items-center gap-3">
          <div className="p-2 bg-indigo-500/10 rounded-lg">
            <Layers className="w-5 h-5 text-indigo-400" />
          </div>
          <div>
            <h3 className="text-white font-bold text-base tracking-tight">Fibonacci Confluence Matrix</h3>
            <p className="text-slate-500 text-[10px] font-black uppercase tracking-widest">Multi-Level Harmonic Sync</p>
          </div>
        </div>
        <div className="flex items-center gap-3 bg-slate-950/40 px-3 py-1.5 rounded-full border border-slate-800">
           <span className="text-slate-400 text-[10px] font-black uppercase tracking-widest">Confluence Engine</span>
           <button
            onClick={() => onChange({ enableFibo: !inputs.enableFibo })}
            className={cn(
              "w-10 h-5 rounded-full transition-all relative ring-2 ring-offset-2 ring-offset-slate-900",
              inputs.enableFibo ? "bg-amber-500 ring-amber-500/20" : "bg-slate-700 ring-slate-800"
            )}
           >
            <div className={cn(
              "absolute top-0.5 w-4 h-4 bg-white rounded-full transition-all shadow-md",
              inputs.enableFibo ? "right-0.5" : "left-0.5"
            )} />
           </button>
        </div>
      </div>

      <div className={cn("p-6 space-y-8", !inputs.enableFibo && "opacity-40 grayscale pointer-events-none")}>
        {/* Core Inputs */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          <div className="space-y-1.5">
            <label className="flex items-center gap-2 text-slate-400 text-[10px] font-black uppercase tracking-widest">
              <TrendingUp className="w-3 h-3" /> Swing High
            </label>
            <input
              type="number"
              step="0.01"
              value={inputs.swingHigh}
              onChange={(e) => onChange({ swingHigh: parseFloat(e.target.value) || 0 })}
              className={cn(
                "w-full bg-slate-800 border rounded-lg py-2.5 px-4 text-white font-mono text-sm outline-none transition-all",
                rangeError ? "border-rose-500/50 focus:ring-rose-500/20" : "border-slate-700 focus:ring-indigo-500/20"
              )}
            />
          </div>
          <div className="space-y-1.5">
            <label className="flex items-center gap-2 text-slate-400 text-[10px] font-black uppercase tracking-widest">
              <TrendingDown className="w-3 h-3" /> Swing Low
            </label>
            <input
              type="number"
              step="0.01"
              value={inputs.swingLow}
              onChange={(e) => onChange({ swingLow: parseFloat(e.target.value) || 0 })}
              className={cn(
                "w-full bg-slate-800 border rounded-lg py-2.5 px-4 text-white font-mono text-sm outline-none transition-all",
                rangeError ? "border-rose-500/50 focus:ring-rose-500/20" : "border-slate-700 focus:ring-indigo-500/20"
              )}
            />
          </div>
          <div className="space-y-1.5">
            <label className="flex items-center gap-2 text-slate-400 text-[10px] font-black uppercase tracking-widest">
              <RotateCcw className="w-3 h-3" /> Direction Mode
            </label>
            <select
              value={inputs.fiboDirection}
              onChange={(e) => onChange({ fiboDirection: e.target.value as any })}
              className="w-full bg-slate-800 border border-slate-700 rounded-lg py-2.5 px-4 text-white text-sm outline-none focus:ring-2 focus:ring-indigo-500/20"
            >
              <option value="auto">Auto by Signal</option>
              <option value="lowToHigh">Low to High (Bullish)</option>
              <option value="highToLow">High to Low (Bearish)</option>
            </select>
          </div>
          <div className="space-y-1.5">
            <label className="flex items-center gap-2 text-slate-400 text-[10px] font-black uppercase tracking-widest">
              <Target className="w-3 h-3" /> Tolerance (Pts)
            </label>
            <input
              type="number"
              step="0.1"
              min="0.1"
              value={inputs.fiboTolerance}
              onChange={(e) => onChange({ fiboTolerance: Math.max(0.1, parseFloat(e.target.value) || 0) })}
              className="w-full bg-slate-800 border border-slate-700 rounded-lg py-2.5 px-4 text-white font-mono text-sm outline-none focus:ring-2 focus:ring-indigo-500/20"
            />
          </div>
        </div>

        {rangeError && (
          <div className="flex items-center gap-2 bg-rose-500/10 border border-rose-500/20 rounded-lg p-3 text-rose-500 text-xs font-bold animate-in fade-in slide-in-from-top-1">
            <AlertCircle className="w-4 h-4" />
            Swing High must be higher than Swing Low.
          </div>
        )}

        {/* Ratio Configuration */}
        <div className="space-y-4">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
            <div className="flex items-center gap-2">
              <span className="text-slate-400 text-[10px] font-black uppercase tracking-widest">Ratio Preset</span>
              <div className="flex flex-wrap gap-2">
                {["standard", "extension", "scalping", "full", "custom"].map((p) => (
                  <button
                    key={p}
                    onClick={() => handlePresetChange(p as any)}
                    className={cn(
                      "px-3 py-1.5 rounded-lg text-[10px] font-bold uppercase transition-all tracking-wider border",
                      inputs.fiboPreset === p
                        ? "bg-indigo-500 text-white border-indigo-400"
                        : "bg-slate-800 text-slate-500 border-slate-700 hover:text-slate-300 hover:border-slate-600"
                    )}
                  >
                    {p}
                  </button>
                ))}
              </div>
            </div>
            
            {inputs.fiboPreset === "custom" && (
              <div className="flex items-center gap-3">
                <button 
                  onClick={() => onChange({ fiboRatios: [...inputs.fiboRatios].sort((a,b) => a.ratio - b.ratio) })}
                  className="p-2 hover:bg-slate-800 rounded-lg text-slate-400 hover:text-amber-500 transition-colors"
                  title="Sort Ascending"
                >
                  <SortAsc className="w-4 h-4" />
                </button>
                <button 
                   onClick={addRatio}
                   className="flex items-center gap-2 px-4 py-2 bg-slate-800 hover:bg-slate-700 border border-slate-700 rounded-lg text-[10px] text-white font-bold uppercase tracking-widest transition-all"
                >
                   <Plus className="w-3 h-3" /> Add Ratio
                </button>
              </div>
            )}
          </div>

          <div className="bg-slate-950/40 rounded-xl border border-slate-800 p-4">
             <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
               {inputs.fiboRatios.map((r, idx) => (
                 <div key={r.id || idx} className={cn(
                   "flex items-center gap-3 bg-slate-800/30 p-2.5 rounded-lg border transition-all group",
                   r.enabled ? "border-slate-700/50" : "border-transparent opacity-40"
                 )}>
                    <input 
                      type="checkbox" 
                      checked={r.enabled} 
                      onChange={(e) => updateRatio(r.id, { enabled: e.target.checked })}
                      className="w-4 h-4 rounded-sm bg-slate-700 border-slate-600 text-indigo-500 focus:ring-indigo-500"
                    />
                    <div className="flex-1 flex flex-col min-w-0">
                      <input 
                        type="number" 
                        step="0.001"
                        value={r.ratio}
                        onChange={(e) => updateRatio(r.id, { ratio: parseFloat(e.target.value) || 0 })}
                        className="bg-transparent border-none text-indigo-400 font-mono text-xs font-bold outline-none ring-0 w-full p-0"
                      />
                      <input 
                        type="text"
                        value={r.label}
                        onChange={(e) => updateRatio(r.id, { label: e.target.value })}
                        className="bg-transparent border-none text-[10px] text-slate-500 font-bold uppercase tracking-widest outline-none ring-0 w-full p-0"
                      />
                    </div>
                    {inputs.fiboPreset === "custom" && (
                      <button 
                        onClick={() => removeRatio(r.id)} 
                        className="text-slate-600 hover:text-rose-500 opacity-0 group-hover:opacity-100 transition-all p-1"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                    )}
                 </div>
               ))}
             </div>
          </div>
        </div>

        {/* Dynamic Matrix View */}
        {!rangeError && fiboLevels.length > 0 && (
          <div className="grid grid-cols-1 xl:grid-cols-2 gap-8 pt-4">
            {/* Level Price Table */}
            <div className="space-y-4">
               <div className="flex items-center gap-2 px-2">
                 <Target className="w-4 h-4 text-amber-500" />
                 <h4 className="text-slate-300 text-xs font-bold uppercase tracking-widest">Calculated Price Levels</h4>
               </div>
               <div className="bg-slate-950/20 border border-slate-800 rounded-xl overflow-hidden">
                 <table className="w-full text-left font-mono text-sm">
                   <thead>
                     <tr className="bg-slate-800/50">
                       <th className="px-4 py-3 text-[10px] text-slate-500 uppercase font-black tracking-widest">Ratio</th>
                       <th className="px-4 py-3 text-[10px] text-slate-500 uppercase font-black tracking-widest">Label</th>
                       <th className="px-4 py-3 text-[10px] text-slate-500 uppercase font-black tracking-widest">Price</th>
                     </tr>
                   </thead>
                   <tbody className="divide-y divide-slate-800">
                     {fiboLevels.map((lvl, idx) => (
                       <tr key={idx} className="hover:bg-slate-800/30 transition-colors">
                         <td className="px-4 py-2.5 text-indigo-400 font-bold">{lvl.ratio.toFixed(3)}</td>
                         <td className="px-4 py-2.5 text-slate-300 text-xs">{lvl.label}</td>
                         <td className="px-4 py-2.5 text-white font-bold">{lvl.price.toFixed(2)}</td>
                       </tr>
                     ))}
                   </tbody>
                 </table>
               </div>
            </div>

            {/* Confluence Engine Results */}
            <div className="space-y-4">
               <div className="flex items-center justify-between px-2">
                 <div className="flex items-center gap-2">
                    <Layers className="w-4 h-4 text-indigo-500" />
                    <h4 className="text-slate-300 text-xs font-bold uppercase tracking-widest">Harmonic Confluence Results</h4>
                 </div>
                 {summary && (
                   <span className="bg-indigo-500/10 text-indigo-400 text-[10px] font-black uppercase px-2 py-0.5 rounded-full border border-indigo-500/20">
                     {summary.total} Matches
                   </span>
                 )}
               </div>

               {confluences.length > 0 ? (
                 <div className="space-y-3 max-h-[350px] overflow-y-auto custom-scrollbar pr-2">
                    {confluences.sort((a,b) => a.distance - b.distance).map((c, idx) => (
                      <div key={idx} className={cn(
                        "relative bg-slate-950/40 border-l-4 rounded-r-xl rounded-l-md p-4 transition-all hover:bg-slate-800/50",
                        c.strength === "Very Strong" ? "border-rose-500 bg-rose-500/5" :
                        c.strength === "Strong" ? "border-amber-500 bg-amber-500/5" :
                        "border-slate-700"
                      )}>
                        <div className="flex justify-between items-start mb-2">
                           <div className="flex flex-col">
                             <span className="text-white font-mono text-sm font-black">{c.target} Match</span>
                             <span className="text-[10px] text-slate-500 font-bold uppercase tracking-widest">Target Price: {c.targetPrice?.toFixed(2) || "N/A"}</span>
                           </div>
                           <span className={cn(
                             "text-[9px] font-black uppercase px-2 py-1 rounded border",
                             c.strength === "Very Strong" ? "bg-rose-500/20 text-rose-500 border-rose-500/30" :
                             c.strength === "Strong" ? "bg-amber-500/20 text-amber-500 border-amber-500/30" :
                             "bg-slate-500/20 text-slate-400 border-slate-500/30"
                           )}>
                             {c.strength}
                           </span>
                        </div>
                        <div className="flex items-end justify-between">
                           <div className="flex flex-col">
                             <span className="text-indigo-400 text-xs font-mono font-bold">{c.label} ({c.ratio})</span>
                             <span className="text-[10px] text-slate-500 uppercase font-black tracking-widest">Fibo Level: {c.price.toFixed(2)}</span>
                           </div>
                           <div className="text-right">
                             <span className="text-white font-mono text-sm font-bold block">{c.distance.toFixed(4)}</span>
                             <span className="text-[9px] text-slate-600 uppercase font-black tracking-widest">Pt Variance</span>
                           </div>
                        </div>
                      </div>
                    ))}
                 </div>
               ) : (
                 <div className="bg-slate-950/40 border border-dashed border-slate-800 rounded-xl p-8 flex flex-col items-center justify-center text-center opacity-60">
                    <div className="w-12 h-12 bg-slate-800/50 rounded-full flex items-center justify-center mb-4">
                      <Target className="w-6 h-6 text-slate-600" />
                    </div>
                    <p className="text-slate-500 text-xs font-bold uppercase tracking-widest">No Harmonic Confluence Located</p>
                    <p className="text-slate-600 text-[10px] mt-1">Adjust tolerance or swing parameters to refine search.</p>
                 </div>
               )}
            </div>
          </div>
        )}

        {/* Technical Summary */}
        {summary && (
          <div className="bg-indigo-500/5 border border-indigo-500/20 rounded-xl p-6 relative overflow-hidden">
            <div className="absolute top-0 right-0 p-4 opacity-10">
              <Info className="w-12 h-12 text-indigo-400" />
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 relative z-10">
              <div className="space-y-2">
                <span className="text-slate-500 text-[10px] font-black uppercase tracking-widest block">Core Detection</span>
                <p className="text-indigo-400 text-2xl font-black">{summary.total} <span className="text-sm font-bold text-slate-400">Total Syncs</span></p>
                <div className="flex items-center gap-1.5">
                  <div className={cn("w-2 h-2 rounded-full", summary.entryConfluence ? "bg-emerald-500" : "bg-slate-700")} />
                  <span className="text-[10px] text-slate-400 font-bold uppercase tracking-widest">Entry Convergence</span>
                </div>
              </div>
              
              <div className="space-y-2">
                <span className="text-slate-500 text-[10px] font-black uppercase tracking-widest block">Primary Anchor</span>
                {summary.strongest ? (
                  <>
                    <p className="text-white text-lg font-black">{summary.strongest.target}</p>
                    <p className="text-indigo-400 text-xs font-mono font-bold leading-tight">Matched with {summary.strongest.label} Ratio<br/> Variance: {summary.strongest.distance.toFixed(4)} pts</p>
                  </>
                ) : <p className="text-slate-600 italic text-sm">None</p>}
              </div>

              <div className="space-y-2">
                <span className="text-slate-500 text-[10px] font-black uppercase tracking-widest block">Profitability Shield</span>
                {summary.bestTp ? (
                  <>
                    <p className="text-amber-500 text-lg font-black">{summary.bestTp.target} Confluence</p>
                    <p className="text-slate-400 text-xs leading-tight">Strong validation at profit target via {summary.bestTp.label} ratio.</p>
                  </>
                ) : <p className="text-slate-600 italic text-sm">No TP Confluence</p>}
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

