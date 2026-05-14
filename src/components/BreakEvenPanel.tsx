import React from "react";
import { CalculatorInputs } from "../types/calculator";
import { Zap, ShieldCheck, CornerDownRight } from "lucide-react";
import { cn } from "../lib/utils";

interface Props {
  rule: CalculatorInputs["breakEvenRule"];
  onChange: (rule: CalculatorInputs["breakEvenRule"]) => void;
}

export const BreakEvenPanel: React.FC<Props> = ({ rule, onChange }) => {
  const options = [
    { value: "none", label: "No Automatic BE", icon: Zap, color: "text-slate-400" },
    { value: "afterTP1", label: "SL to BE after TP1", icon: ShieldCheck, color: "text-indigo-400" },
    { value: "afterTP2", label: "SL to BE after TP2", icon: ShieldCheck, color: "text-emerald-400" },
  ];

  return (
    <div className="bg-slate-900 border border-slate-800 rounded-xl overflow-hidden mb-8 shadow-xl">
      <div className="bg-slate-800/50 px-6 py-4 border-b border-slate-800">
        <h3 className="text-white font-semibold flex items-center gap-2">
          <Zap className="w-5 h-5 text-amber-400" />
          Trade Management: Break-Even Rule
        </h3>
      </div>
      <div className="p-6">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {options.map((opt) => (
            <button
              key={opt.value}
              onClick={() => onChange(opt.value as any)}
              className={cn(
                "p-4 rounded-xl border flex flex-col items-center gap-3 transition-all text-center group",
                rule === opt.value
                  ? "bg-slate-800 border-amber-500 shadow-lg"
                  : "bg-slate-800/30 border-slate-800 hover:border-slate-600"
              )}
            >
              <div className={cn(
                "p-3 rounded-full bg-slate-900 shadow-inner group-hover:scale-110 transition-transform",
                rule === opt.value ? opt.color : "text-slate-600"
              )}>
                <opt.icon className="w-6 h-6" />
              </div>
              <div>
                <span className={cn(
                  "block text-sm font-bold uppercase tracking-widest",
                  rule === opt.value ? "text-white" : "text-slate-500"
                )}>
                  {opt.label}
                </span>
                {rule === opt.value && (
                   <div className="mt-2 flex items-center justify-center gap-1.5">
                     <CornerDownRight className="w-3 h-3 text-amber-500" />
                     <span className="text-[10px] text-amber-500 font-black uppercase">Active Strategy</span>
                   </div>
                )}
              </div>
            </button>
          ))}
        </div>
        <p className="mt-6 text-[11px] text-slate-500 font-bold uppercase tracking-loose text-center leading-relaxed">
          The "Break-Even" rule significantly increases capital survivability. Moving risk to zero ($0.00) allows for a "Free Trade" environment to ride higher Gann targets.
        </p>
      </div>
    </div>
  );
};
