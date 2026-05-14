import React from "react";
import { Copy, Send, FileText, Check, AlertCircle } from "lucide-react";
import { cn } from "../lib/utils";

interface Props {
  onCopySignal: () => void;
  onCopyReport: () => void;
  onSendSignal: () => void;
  sending: boolean;
  canSend: boolean;
  canCalculate: boolean;
}

export const CopyButtons: React.FC<Props> = ({ onCopySignal, onCopyReport, onSendSignal, sending, canSend, canCalculate }) => {
  return (
    <div className="fixed bottom-0 left-0 right-0 p-4 bg-slate-950/90 backdrop-blur-md border-t border-slate-800 z-50">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center gap-4">
        <div className="flex items-center gap-4 flex-wrap justify-center">
          <button
            onClick={onCopySignal}
            disabled={!canCalculate}
            className="bg-amber-500 hover:bg-amber-400 disabled:bg-slate-800 disabled:text-slate-600 text-slate-950 font-black px-6 py-2.5 rounded-xl text-xs uppercase tracking-widest shadow-xl shadow-amber-500/20 active:scale-95 transition-all flex items-center gap-2"
          >
            <Copy className="w-4 h-4" />
            Copy Signal
          </button>
          
          <button
            onClick={onCopyReport}
            disabled={!canCalculate}
            className="bg-slate-800 hover:bg-slate-700 disabled:opacity-50 text-white font-black px-6 py-2.5 rounded-xl text-xs uppercase tracking-widest border border-slate-700 active:scale-95 transition-all flex items-center gap-2"
          >
            <FileText className="w-4 h-4" />
            Copy Report
          </button>
        </div>

        <div className="h-10 w-px bg-slate-800 hidden md:block"></div>

        <div className="flex items-center gap-4 flex-wrap justify-center flex-1">
           {canSend ? (
               <button
                onClick={onSendSignal}
                disabled={sending || !canCalculate}
                className={cn(
                  "bg-indigo-600 hover:bg-indigo-500 disabled:bg-slate-800 text-white font-black px-8 py-3 rounded-xl text-xs uppercase tracking-[0.2em] shadow-xl shadow-indigo-600/20 active:scale-95 transition-all flex items-center gap-3",
                  sending && "animate-pulse"
                )}
               >
                {sending ? (
                  <>
                    <RefreshCw className="w-4 h-4 animate-spin" />
                    TRANSMITTING...
                  </>
                ) : (
                  <>
                    <Send className="w-4 h-4 italic" />
                    SEND SIGNAL TO CHANNEL
                  </>
                )}
               </button>
           ) : (
             <div className="flex items-center gap-3 bg-slate-900/50 px-4 py-2 rounded-xl border border-dashed border-slate-800 opacity-60">
                <AlertCircle className="w-4 h-4 text-slate-500" />
                <span className="text-[10px] text-slate-500 font-black uppercase tracking-widest">Telegram not configured</span>
             </div>
           )}
        </div>
      </div>
    </div>
  );
};

// Internal icon for transmission
const RefreshCw = ({ className }: { className?: string }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="24"
    height="24"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    className={className}
  >
    <path d="M3 12a9 9 0 0 1 9-9 9.75 9.75 0 0 1 6.74 2.74L21 8" />
    <path d="M21 3v5h-5" />
    <path d="M21 12a9 9 0 0 1-9 9 9.75 9.75 0 0 1-6.74-2.74L3 16" />
    <path d="M3 21v-5h5" />
  </svg>
);
