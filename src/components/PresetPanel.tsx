import React, { useState } from "react";
import { CalculatorInputs } from "../types/calculator";
import { Bookmark, Save, Trash2, FolderOpen } from "lucide-react";
import { cn } from "../lib/utils";

interface Props {
  presets: Record<string, CalculatorInputs>;
  onSave: (name: string) => void;
  onLoad: (name: string) => void;
  onDelete: (name: string) => void;
}

export const PresetPanel: React.FC<Props> = ({ presets, onSave, onLoad, onDelete }) => {
  const [name, setName] = useState("");

  const handleSave = () => {
    if (name.trim()) {
      onSave(name.trim());
      setName("");
    }
  };

  const presetNames = Object.keys(presets);

  return (
    <div className="bg-slate-900 border border-slate-800 rounded-xl overflow-hidden mb-8 shadow-lg">
      <div className="bg-slate-800/50 px-6 py-4 border-b border-slate-800 flex justify-between items-center">
        <h3 className="text-white font-semibold flex items-center gap-2">
          <Bookmark className="w-5 h-5 text-amber-500" />
          Saved Presets
        </h3>
      </div>
      <div className="p-6">
        <div className="flex gap-3 mb-6">
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="flex-1 bg-slate-800 border border-slate-700 rounded-lg py-2 px-4 text-white text-sm outline-none focus:ring-1 focus:ring-amber-500"
            placeholder="Preset name (e.g. Scalp-M5-Aggressive)"
          />
          <button
            onClick={handleSave}
            disabled={!name.trim()}
            className="bg-amber-500 hover:bg-amber-400 disabled:opacity-50 text-slate-950 font-bold px-4 py-2 rounded-lg text-sm flex items-center gap-2 transition-all"
          >
            <Save className="w-4 h-4" />
            Save Current
          </button>
        </div>

        {presetNames.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
            {presetNames.map((p) => (
              <div key={p} className="bg-slate-800/50 border border-slate-800 rounded-lg p-3 flex items-center justify-between group hover:border-slate-600 transition-all">
                <span className="text-slate-300 text-sm font-medium truncate flex-1 mr-2">{p}</span>
                <div className="flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-all shrink-0">
                  <button
                    onClick={() => onLoad(p)}
                    className="p-1.5 hover:bg-emerald-500/20 text-emerald-500 rounded transition-all"
                    title="Load"
                  >
                    <FolderOpen className="w-4 h-4" />
                  </button>
                  <button
                    onClick={() => onDelete(p)}
                    className="p-1.5 hover:bg-rose-500/20 text-rose-500 rounded transition-all"
                    title="Delete"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <p className="text-slate-600 text-xs italic text-center py-4">No saved presets yet.</p>
        )}
      </div>
    </div>
  );
};
