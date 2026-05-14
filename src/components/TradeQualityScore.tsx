import React from "react";
import { TradeScoreResult } from "../utils/tradeScore";
import { Award, CheckCircle2, AlertTriangle, XCircle } from "lucide-react";
import { cn } from "../lib/utils";

interface Props {
  result: TradeScoreResult;
}

export const TradeQualityScore: React.FC<Props> = ({ result }) => {
  const { score, grade } = result;

  const getTheme = () => {
    if (grade === "A+") return { color: "text-emerald-400", bg: "bg-emerald-500/10", border: "border-emerald-500/30", icon: Award };
    if (grade === "A") return { color: "text-emerald-400", bg: "bg-emerald-500/10", border: "border-emerald-500/30", icon: CheckCircle2 };
    if (grade === "B") return { color: "text-amber-400", bg: "bg-amber-500/10", border: "border-amber-500/30", icon: CheckCircle2 };
    if (grade === "C") return { color: "text-orange-400", bg: "bg-orange-500/10", border: "border-orange-500/30", icon: AlertTriangle };
    return { color: "text-rose-400", bg: "bg-rose-500/10", border: "border-rose-500/30", icon: XCircle };
  };

  const theme = getTheme();

  return (
    <div className={cn(
      "border rounded-xl p-6 shadow-xl mb-8 flex flex-col md:flex-row items-center gap-8 relative overflow-hidden transition-all",
      theme.bg, theme.border
    )}>
       {/* Background decoration */}
       <div className={cn("absolute -bottom-6 -right-6 opacity-5 rotate-12", theme.color)}>
          <theme.icon className="w-48 h-48" />
       </div>

       <div className="flex flex-col items-center gap-2 z-10 shrink-0">
          <div className="text-slate-400 text-xs font-black uppercase tracking-[0.2em] mb-2 text-center md:text-left">Confidence Score</div>
          <div className="relative flex items-center justify-center w-32 h-32">
             <svg className="w-full h-full -rotate-90">
               <circle
                 className="text-slate-800/10"
                 strokeWidth="8"
                 stroke="currentColor"
                 fill="transparent"
                 r="58"
                 cx="64"
                 cy="64"
               />
               <circle
                 className={theme.color}
                 strokeWidth="8"
                 strokeDasharray={364.4}
                 strokeDashoffset={364.4 - (364.4 * score) / 100}
                 strokeLinecap="round"
                 stroke="currentColor"
                 fill="transparent"
                 r="58"
                 cx="64"
                 cy="64"
               />
             </svg>
             <div className="absolute inset-0 flex flex-col items-center justify-center">
                <span className="text-4xl font-black text-white">{score}</span>
                <span className="text-[10px] font-bold text-slate-400 uppercase tracking-tighter">Points</span>
             </div>
          </div>
       </div>

       <div className="flex-1 space-y-4 z-10">
          <div className="flex flex-col md:flex-row md:items-end gap-3 md:gap-6">
             <div className="flex flex-col">
                <span className="text-slate-400 text-[10px] font-black uppercase tracking-[0.2em]">Signal Grade</span>
                <span className={cn("text-6xl font-black italic tracking-tighter", theme.color)}>{grade}</span>
             </div>
             <div className="flex-1 pb-2">
                <div className="text-white text-lg font-bold mb-1">
                   {grade === "A+" ? "Superior Trading Environment" :
                    grade === "A" ? "High Probability Setup" :
                    grade === "B" ? "Reasonable Risk/Reward" :
                    grade === "C" ? "Marginal Setup - Use Caution" :
                    "High Risk - Suggested Avoidance"}
                </div>
                <p className="text-slate-300 text-xs leading-relaxed max-w-xl">
                   {grade === "A+" ? "The algorithm identifies extreme confluence between Gann levels, Fibonacci harmonics, and risk parameters. Execution is highly recommended with standard sizing." :
                    grade === "A" ? "Solid trade setup with healthy R:R and multi-layer confluence. Valid according to standard Gann Square of Nine protocols." :
                    grade === "B" ? "Market structure is acceptable but some confluences are missing. Manage position actively and secure partials quickly." :
                    grade === "C" ? "Weak confluence detected. Only trade if other manual analysis supports this direction. Consider reducing lot size by 50%." :
                    "The current parameters do not align with professional risk standards. Execution carries extremely high variance."}
                </p>
             </div>
          </div>
       </div>
    </div>
  );
};
