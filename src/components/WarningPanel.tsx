import React from "react";
import { AlertTriangle, AlertCircle, Info } from "lucide-react";
import { cn } from "../lib/utils";

interface Warning {
  id: string;
  type: "warning" | "error" | "info";
  message: string;
}

interface Props {
  warnings: Warning[];
}

export const WarningPanel: React.FC<Props> = ({ warnings }) => {
  if (warnings.length === 0) return null;

  return (
    <div className="space-y-3 mb-8">
      {/* Group validation notices at bottom */}
      {warnings.map((w) => {
        const Icon = w.type === "error" ? AlertCircle : w.type === "warning" ? AlertTriangle : Info;
        const colorClass = 
          w.type === "error" ? "bg-rose-500/10 border-rose-500/20 text-rose-500" : 
          w.type === "warning" ? "bg-amber-500/10 border-amber-500/20 text-amber-500" :
          "bg-sky-500/10 border-sky-500/20 text-sky-400";

        return (
          <div key={w.id} className={cn("flex gap-3 p-4 rounded-xl border animate-in fade-in slide-in-from-bottom-2", colorClass)}>
            <Icon className="w-5 h-5 shrink-0" />
            <p className="text-sm font-medium">{w.message}</p>
          </div>
        );
      })}
    </div>
  );
};
