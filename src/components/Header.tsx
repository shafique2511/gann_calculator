import React from "react";
import { TrendingUp, Calculator, RefreshCcw } from "lucide-react";

interface HeaderProps {
  onReset: () => void;
}

export const Header: React.FC<HeaderProps> = ({ onReset }) => {
  return (
    <header className="bg-slate-900 border-b border-slate-800 py-6 px-4 mb-8">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center gap-4">
        <div className="flex items-center gap-3">
          <div className="bg-amber-500 p-2 rounded-lg shadow-lg shadow-amber-500/20">
            <Calculator className="w-8 h-8 text-slate-950" />
          </div>
          <div>
            <h1 className="text-2xl font-bold text-white tracking-tight">
              XAUUSD Gann Square of Nine <span className="text-amber-500">Pro</span>
            </h1>
            <p className="text-slate-400 text-sm font-medium">Advanced Gold Trading Calculator</p>
          </div>
        </div>
        <div className="flex items-center gap-3">
          <button
            onClick={onReset}
            className="flex items-center gap-2 px-4 py-2 bg-slate-800 hover:bg-slate-700 text-slate-300 rounded-lg text-sm font-semibold transition-colors border border-slate-700 active:scale-95"
          >
            <RefreshCcw className="w-4 h-4" />
            Reset Defaults
          </button>
          <div className="flex items-center gap-2">
            <span className="bg-amber-500/10 text-amber-500 px-3 py-1 rounded-full text-xs font-bold border border-amber-500/20 flex items-center gap-1">
              <TrendingUp className="w-3 h-3" />
              SPOT GOLD (XAUUSD)
            </span>
          </div>
        </div>
      </div>
    </header>
  );
};
