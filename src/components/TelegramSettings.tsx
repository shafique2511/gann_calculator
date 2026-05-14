import React from "react";
import { CalculatorInputs } from "../types/calculator";
import { Send, Shield, ExternalLink, RefreshCw } from "lucide-react";
import { cn } from "../lib/utils";

interface Props {
  inputs: CalculatorInputs;
  onChange: (inputs: Partial<CalculatorInputs>) => void;
  onTest: () => void;
  testing: boolean;
}

export const TelegramSettings: React.FC<Props> = ({ inputs, onChange, onTest, testing }) => {
  return (
    <div className="bg-slate-900 border border-slate-800 rounded-xl overflow-hidden mb-8 shadow-xl">
      <div className="bg-indigo-600 px-6 py-4 border-b border-indigo-700/50 flex justify-between items-center shadow-lg">
        <h3 className="text-white font-bold flex items-center gap-2 tracking-tight">
          <Send className="w-5 h-5 text-white italic" />
          Secure Telegram Integration
        </h3>
        <div className="flex items-center gap-1 text-indigo-200 text-[10px] font-black tracking-widest uppercase">
           <Shield className="w-3 h-3" /> Encrypted Endpoint
        </div>
      </div>
      
      <div className="p-6">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-6">
          <div className="lg:col-span-1">
             <label className="block text-slate-400 text-xs font-bold uppercase tracking-widest mb-2">Bot Token</label>
             <input
                type="password"
                value={inputs.telegramBotToken || ""}
                onChange={(e) => onChange({ telegramBotToken: e.target.value })}
                className="w-full bg-slate-800 border border-slate-700 rounded-lg py-2.5 px-4 text-white text-sm outline-none focus:ring-2 focus:ring-indigo-500 transition-all font-mono"
                placeholder="Required for transmission"
             />
          </div>
          <div className="lg:col-span-1">
             <label className="block text-slate-400 text-xs font-bold uppercase tracking-widest mb-2">Channel / Chat ID</label>
             <input
                type="text"
                value={inputs.telegramChatId || ""}
                onChange={(e) => onChange({ telegramChatId: e.target.value })}
                className="w-full bg-slate-800 border border-slate-700 rounded-lg py-2.5 px-4 text-white text-sm outline-none focus:ring-2 focus:ring-indigo-500 transition-all font-mono"
                placeholder="@mychannel"
             />
          </div>
          <div className="lg:col-span-1 flex flex-col gap-4">
             <div className="flex items-center justify-between bg-slate-800/50 p-2 rounded-lg border border-slate-800">
               <span className="text-[10px] text-slate-400 font-bold uppercase">Show Footer</span>
               <button
                  onClick={() => onChange({ includeFooter: !inputs.includeFooter })}
                  className={cn(
                    "w-8 h-4 rounded-full transition-colors relative",
                    inputs.includeFooter ? "bg-amber-500" : "bg-slate-700"
                  )}
                >
                  <div className={cn(
                    "absolute top-0.5 w-3 h-3 bg-white rounded-full transition-all",
                    inputs.includeFooter ? "right-0.5" : "left-0.5"
                  )} />
                </button>
             </div>
             <div className="flex items-center justify-between bg-slate-800/50 p-2 rounded-lg border border-slate-800">
               <span className="text-[10px] text-slate-400 font-bold uppercase">Show Date/Time</span>
               <button
                  onClick={() => onChange({ includeGeneratedOn: !inputs.includeGeneratedOn })}
                  className={cn(
                    "w-8 h-4 rounded-full transition-colors relative",
                    inputs.includeGeneratedOn ? "bg-amber-500" : "bg-slate-700"
                  )}
                >
                  <div className={cn(
                    "absolute top-0.5 w-3 h-3 bg-white rounded-full transition-all",
                    inputs.includeGeneratedOn ? "right-0.5" : "left-0.5"
                  )} />
                </button>
             </div>
          </div>
          <div className="flex flex-col gap-3">
             <button
               onClick={onTest}
               disabled={testing || !inputs.telegramBotToken || !inputs.telegramChatId}
               className="w-full bg-slate-800 hover:bg-slate-700 border border-slate-700 text-indigo-400 font-bold py-2.5 rounded-lg flex items-center justify-center gap-2 transition-all disabled:opacity-50"
             >
                {testing ? <RefreshCw className="w-4 h-4 animate-spin" /> : <RefreshCw className="w-4 h-4" />}
                Test Connection
             </button>
             <div className="relative">
                <input
                    type="password"
                    value={inputs.appApiKey || ""}
                    onChange={(e) => onChange({ appApiKey: e.target.value })}
                    className="w-full bg-slate-800/50 border border-slate-800 rounded-lg py-1.5 px-3 text-white text-[10px] outline-none focus:ring-1 focus:ring-indigo-500 transition-all font-mono"
                    placeholder="Secret App Key"
                />
             </div>
          </div>
        </div>

        <div className="p-4 bg-indigo-500/5 rounded-xl border border-indigo-500/10 space-y-4">
           <div className="flex gap-3">
              <div className="p-2 bg-indigo-500/10 rounded-lg h-fit">
                 <Shield className="w-4 h-4 text-indigo-400" />
              </div>
              <div>
                 <h4 className="text-white text-sm font-bold mb-1 uppercase tracking-tight">Enterprise Level Security</h4>
                 <p className="text-slate-400 text-xs leading-relaxed">
                   Your Telegram Bot Token stays local in your browser and is only sent to your private backend node once per request. It is never logged or shared with third parties. Authentication via App API Key ensures only authorized users can trigger the bot.
                 </p>
              </div>
           </div>
           
           <div className="pt-2 flex items-center gap-4">
              <a href="#" className="text-indigo-400 hover:text-indigo-300 text-[10px] font-black uppercase tracking-widest flex items-center gap-1 transition-colors">
                 <ExternalLink className="w-3 h-3" /> Setup Instructions
              </a>
              <span className="text-slate-700">•</span>
              <a href="#" className="text-indigo-400 hover:text-indigo-300 text-[10px] font-black uppercase tracking-widest flex items-center gap-1 transition-colors">
                 <ExternalLink className="w-3 h-3" /> Security Deep-Dive
              </a>
           </div>
        </div>
      </div>
    </div>
  );
};
