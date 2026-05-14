import React from "react";
import { Info, HelpCircle, CheckCircle } from "lucide-react";

export const InstructionSection: React.FC = () => {
  return (
    <div className="bg-slate-900 border border-slate-800 rounded-xl overflow-hidden mb-24 shadow-lg">
      <div className="bg-slate-800/50 px-6 py-4 border-b border-slate-800 flex items-center gap-2">
        <HelpCircle className="w-5 h-5 text-sky-400" />
        <h3 className="text-white font-semibold">User Guide & Implementation Notes</h3>
      </div>
      <div className="p-8">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div className="space-y-6">
            <h4 className="text-amber-500 text-sm font-black uppercase tracking-widest flex items-center gap-2">
              <div className="w-1.5 h-1.5 bg-amber-500 rounded-full"></div>
              How to use the calculator
            </h4>
            <ul className="space-y-4">
              <li className="flex gap-3">
                <CheckCircle className="w-5 h-5 text-emerald-500 shrink-0" />
                <p className="text-slate-400 text-sm">Select your trading <b>Timeframe</b>. This will automatically adjust the volatility buffers for Gold.</p>
              </li>
              <li className="flex gap-3">
                <CheckCircle className="w-5 h-5 text-emerald-500 shrink-0" />
                <p className="text-slate-400 text-sm">Input the <b>Base Price</b>. This should be a significant swing high/low or the current market price.</p>
              </li>
              <li className="flex gap-3">
                <CheckCircle className="w-5 h-5 text-emerald-500 shrink-0" />
                <p className="text-slate-400 text-sm">Review the <b>Gann Levels</b>. These are mathematically derived support and resistance zones based on number geometry.</p>
              </li>
              <li className="flex gap-3">
                <CheckCircle className="w-5 h-5 text-emerald-500 shrink-0" />
                <p className="text-slate-400 text-sm">Check <b>Confluences</b>. If a Fibonacci level or psychological number (e.g. 2400.00) matches the Gann level, the signal is much stronger.</p>
              </li>
            </ul>
          </div>
          
          <div className="space-y-6">
             <h4 className="text-sky-400 text-sm font-black uppercase tracking-widest flex items-center gap-2">
              <div className="w-1.5 h-1.5 bg-sky-400 rounded-full"></div>
              Technical Definitions
            </h4>
            <div className="space-y-4">
               <div className="bg-slate-800/30 p-4 rounded-xl border border-slate-800">
                  <span className="block text-white text-xs font-bold mb-1 italic">Gann Square of Nine</span>
                  <p className="text-slate-500 text-xs leading-relaxed">
                    A unique method of squaring numbers that relates price and time. W.D. Gann used this tool to predict major market turns with high precision.
                  </p>
               </div>
               <div className="bg-slate-800/30 p-4 rounded-xl border border-slate-800">
                  <span className="block text-white text-xs font-bold mb-1 italic">Entry Zone Buffer</span>
                  <p className="text-slate-500 text-xs leading-relaxed">
                    Since XAUUSD has high volatility, entering at an exact single price is often impossible. The buffer creates an area where execution is valid.
                  </p>
               </div>
            </div>
          </div>
        </div>
        
        <div className="mt-12 pt-8 border-t border-slate-800/50">
           <div className="bg-rose-500/5 border border-rose-500/10 p-4 rounded-xl flex gap-3">
              <Info className="w-5 h-5 text-rose-500 shrink-0 mt-0.5" />
              <div>
                 <span className="block text-rose-500 text-xs font-black uppercase tracking-widest mb-1 italic">Disclaimer</span>
                 <p className="text-slate-500 text-xs leading-relaxed">
                   Trading Gold involves high risk. This calculator is a purely mathematical tool and does not constitute financial advice. Past performance does not guarantee future results. Always use proper risk management.
                 </p>
              </div>
           </div>
        </div>
      </div>
    </div>
  );
};
