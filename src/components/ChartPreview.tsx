import React from "react";
import { SignalResult } from "../types/calculator";
import { ComposedChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ReferenceLine, ResponsiveContainer, Area } from "recharts";

interface Props {
  signal: SignalResult;
}

export const ChartPreview: React.FC<Props> = ({ signal }) => {
  const isBuy = signal.direction === "BUY";
  
  // Create mock data points to visualize levels
  const data = [
    { name: "SL", price: signal.sl, color: "#f43f5e" },
    { name: "Entry", price: signal.conservativeEntry, color: "#f59e0b" },
    { name: "Target 1", price: signal.tp1, color: "#10b981" },
    { name: "Target 2", price: signal.tp2, color: "#10b981" },
    { name: "Target 3", price: signal.tp3, color: "#10b981" },
    { name: "Target 4", price: signal.tp4, color: "#10b981" },
  ].sort((a, b) => a.price - b.price);

  const domain = [
    Math.min(signal.sl, signal.tp4, signal.tp1) * 0.999,
    Math.max(signal.sl, signal.tp4, signal.tp1) * 1.001
  ];

  return (
    <div className="bg-slate-900 border border-slate-800 rounded-xl overflow-hidden mb-8 shadow-xl">
       <div className="bg-slate-800/50 px-6 py-4 border-b border-slate-800 flex justify-between items-center">
        <h3 className="text-white font-semibold flex items-center gap-2">
          Gann Target Visualization
        </h3>
        <span className="text-[10px] bg-slate-800 text-slate-500 px-2 py-0.5 rounded font-bold uppercase">Dynamic Preview</span>
      </div>
      <div className="p-6 h-[400px] w-full">
        <ResponsiveContainer width="100%" height="100%">
          <ComposedChart data={data} margin={{ top: 20, right: 30, left: 20, bottom: 20 }}>
            <CartesianGrid strokeDasharray="3 3" stroke="#1e293b" vertical={false} />
            <XAxis dataKey="name" stroke="#64748b" fontSize={11} tickLine={false} axisLine={false} />
            <YAxis 
              domain={domain} 
              stroke="#64748b" 
              fontSize={11} 
              tickLine={false} 
              axisLine={false} 
              tickFormatter={(val) => val.toFixed(2)}
              orientation="right"
            />
            <Tooltip 
              contentStyle={{ backgroundColor: "#0f172a", border: "1px solid #1e293b", borderRadius: "8px", color: "#fff" }}
              itemStyle={{ color: "#amber-500" }}
              formatter={(val: number) => [val.toFixed(2), "Price"]}
            />
            
            {/* Range visualization */}
            <ReferenceLine y={signal.sl} stroke="#f43f5e" strokeDasharray="3 3" label={{ position: 'left', value: 'SL', fill: '#f43f5e', fontSize: 10 }} />
            <ReferenceLine y={signal.entryZoneLow} stroke="#f59e0b" strokeWidth={1} label={{ position: 'left', value: 'Zone Low', fill: '#f59e0b', fontSize: 10 }} />
            <ReferenceLine y={signal.entryZoneHigh} stroke="#f59e0b" strokeWidth={1} label={{ position: 'left', value: 'Zone High', fill: '#f59e0b', fontSize: 10 }} />
            
            <ReferenceLine y={signal.tp1} stroke="#10b981" strokeDasharray="3 3" label={{ position: 'left', value: 'TP1', fill: '#10b981', fontSize: 10 }} />
            <ReferenceLine y={signal.tp2} stroke="#10b981" strokeDasharray="3 3" label={{ position: 'left', value: 'TP2', fill: '#10b981', fontSize: 10 }} />
            <ReferenceLine y={signal.tp3} stroke="#10b981" strokeDasharray="3 3" label={{ position: 'left', value: 'TP3', fill: '#10b981', fontSize: 10 }} />
            <ReferenceLine y={signal.tp4} stroke="#10b981" strokeDasharray="3 3" label={{ position: 'left', value: 'TP4', fill: '#10b981', fontSize: 10 }} />

            <Area 
               type="monotone" 
               dataKey="price" 
               stroke="transparent" 
               fill={isBuy ? "url(#colorBuy)" : "url(#colorSell)"} 
               baseValue={signal.sl}
            />
            
            <defs>
              <linearGradient id="colorBuy" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#10b981" stopOpacity={0.1}/>
                <stop offset="95%" stopColor="#10b981" stopOpacity={0}/>
              </linearGradient>
              <linearGradient id="colorSell" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#f43f5e" stopOpacity={0.1}/>
                <stop offset="95%" stopColor="#f43f5e" stopOpacity={0}/>
              </linearGradient>
            </defs>
          </ComposedChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};
