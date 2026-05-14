import React from "react";
import { HitTPUpdateInputs, HitTPStatus, HitTPUpdateResult } from "../types/calculator";
import { Bell, Copy, Send, Check } from "lucide-react";
import { cn } from "../lib/utils";

interface Props {
  inputs: HitTPUpdateInputs;
  result: HitTPUpdateResult;
  onChange: (inputs: Partial<HitTPUpdateInputs>) => void;
  onCopy: () => void;
  onSend: () => void;
  sending: boolean;
  canSend: boolean;
}

export const HitTPPanel: React.FC<Props> = ({ inputs, result, onChange, onCopy, onSend, sending, canSend }) => {
  const statuses: { value: HitTPStatus; label: string }[] = [
    { value: "tp1", label: "TP1 Hit" },
    { value: "tp2", label: "TP2 Hit" },
    { value: "tp3", label: "TP3 Hit" },
    { value: "tp4", label: "TP4 Hit" },
    { value: "alltp", label: "All TP Hit" },
    { value: "sl", label: "SL Hit" },
    { value: "entry", label: "Entry Triggered" },
    { value: "be", label: "Break Even" },
    { value: "manual", label: "Manual Update" },
  ];

  return (
    <div className="bg-slate-900 border border-slate-800 rounded-xl overflow-hidden mb-8 shadow-2xl">
      <div className="bg-slate-800/50 px-6 py-4 border-b border-slate-800 flex justify-between items-center">
        <h3 className="text-white font-semibold flex items-center gap-2">
          <Bell className="w-5 h-5 text-amber-500" />
          Hit TP / Trade Update Panel
        </h3>
        <span className="text-[10px] bg-amber-500 text-slate-950 px-2 py-0.5 rounded font-bold uppercase tracking-tighter shadow-sm animate-pulse">Live Messenger</span>
      </div>

      <div className="p-6 grid grid-cols-1 lg:grid-cols-2 gap-8">
        <div className="space-y-6">
          <div>
            <label className="block text-slate-400 text-xs font-bold uppercase tracking-widest mb-2">Update Status</label>
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
              {statuses.map((s) => (
                <button
                  key={s.value}
                  onClick={() => onChange({ status: s.value })}
                  className={cn(
                    "py-2 px-1 rounded-lg text-[10px] font-bold border transition-all text-center",
                    inputs.status === s.value
                      ? "bg-amber-500 border-amber-500 text-slate-950"
                      : "bg-slate-800 border-slate-700 text-slate-400 hover:border-slate-500"
                  )}
                >
                  {s.label}
                </button>
              ))}
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-slate-400 text-xs font-bold uppercase tracking-widest mb-2">Current Price</label>
              <input
                type="number"
                step="0.01"
                value={inputs.currentPrice || ""}
                onChange={(e) => onChange({ currentPrice: parseFloat(e.target.value) || null })}
                className="w-full bg-slate-800 border border-slate-700 rounded-lg py-2 px-3 text-white font-mono text-sm outline-none"
                placeholder="Optional"
              />
            </div>
            <div>
              <label className="block text-slate-400 text-xs font-bold uppercase tracking-widest mb-2">Toggle Details</label>
              <div className="flex flex-wrap gap-2">
                <button 
                  onClick={() => onChange({ includeProfitEstimate: !inputs.includeProfitEstimate })}
                  className={cn("px-2 py-1 rounded text-[10px] font-bold border", inputs.includeProfitEstimate ? "bg-emerald-500/10 text-emerald-500 border-emerald-500/20" : "bg-slate-800 text-slate-600 border-slate-700")}
                >
                  Profit
                </button>
                <button 
                  onClick={() => onChange({ includeOriginalSignalSummary: !inputs.includeOriginalSignalSummary })}
                  className={cn("px-2 py-1 rounded text-[10px] font-bold border", inputs.includeOriginalSignalSummary ? "bg-amber-500/10 text-amber-500 border-amber-500/20" : "bg-slate-800 text-slate-600 border-slate-700")}
                >
                  Summary
                </button>
                <button 
                  onClick={() => onChange({ includeTimestamp: !inputs.includeTimestamp })}
                  className={cn("px-2 py-1 rounded text-[10px] font-bold border", inputs.includeTimestamp ? "bg-indigo-500/10 text-indigo-500 border-indigo-500/20" : "bg-slate-800 text-slate-600 border-slate-700")}
                >
                  Time
                </button>
                <button 
                  onClick={() => onChange({ includeFooter: !inputs.includeFooter })}
                  className={cn("px-2 py-1 rounded text-[10px] font-bold border", inputs.includeFooter ? "bg-slate-500/10 text-slate-400 border-slate-500/20" : "bg-slate-800 text-slate-600 border-slate-700")}
                >
                  Footer
                </button>
              </div>
            </div>
          </div>

          <div>
             <label className="block text-slate-400 text-xs font-bold uppercase tracking-widest mb-2">Custom Update Note</label>
             <textarea
                value={inputs.customNote}
                onChange={(e) => onChange({ customNote: e.target.value })}
                className="w-full bg-slate-800 border border-slate-700 rounded-lg py-3 px-4 text-white text-sm outline-none focus:ring-1 focus:ring-amber-500 h-24 resize-none"
                placeholder="e.g. Price rejected from TP1, moving SL to BE..."
             />
          </div>

          <div className="flex flex-col sm:flex-row gap-3">
            <button
              onClick={onCopy}
              className="flex-1 bg-slate-800 hover:bg-slate-700 border border-slate-700 text-white font-bold py-3 rounded-xl flex items-center justify-center gap-2 transition-all shadow-lg active:scale-95"
            >
              <Copy className="w-4 h-4" />
              Copy Message
            </button>
            <button
              onClick={onSend}
              disabled={sending || !canSend}
              className={cn(
                "flex-1 font-bold py-3 rounded-xl flex items-center justify-center gap-2 transition-all shadow-lg active:scale-95 disabled:opacity-50 disabled:grayscale",
                sending ? "bg-indigo-700 text-white" : "bg-indigo-600 hover:bg-indigo-500 text-white"
              )}
            >
              {sending ? (
                <>
                  <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                  Sending...
                </>
              ) : (
                <>
                  <Send className="w-4 h-4 italic" />
                  Send to Telegram
                </>
              )}
            </button>
          </div>
        </div>

        <div className="bg-slate-950 border border-slate-800 rounded-xl p-6 relative">
          <div className="absolute top-0 right-0 p-3">
             <div className="w-3 h-3 bg-emerald-500 rounded-full animate-pulse shadow-[0_0_10px_rgba(16,185,129,0.5)]"></div>
          </div>
          <h4 className="text-slate-500 text-[10px] font-black uppercase tracking-widest mb-4 border-b border-slate-900 pb-2">Generated Preview</h4>
          <pre className="text-slate-300 text-[13px] font-sans whitespace-pre-wrap leading-relaxed h-[300px] overflow-y-auto custom-scrollbar italic">
            {result.plainTextMessage}
          </pre>
          
          {result.warnings.length > 0 && (
            <div className="mt-4 space-y-1">
              {result.warnings.map((w, idx) => (
                <div key={idx} className="text-amber-500 text-[10px] font-bold uppercase flex items-center gap-1.5 bg-amber-500/5 px-2 py-1 rounded">
                  <span className="w-1 h-1 bg-amber-500 rounded-full"></span> {w}
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
