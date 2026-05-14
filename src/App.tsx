import React, { useState, useEffect, useMemo } from "react";
import { Header } from "./components/Header";
import { TimeframeSelector } from "./components/TimeframeSelector";
import { CalculatorInputsPanel } from "./components/CalculatorInputs";
import { SignalCards } from "./components/SignalCards";
import { GannLevelsTable } from "./components/GannLevelsTable";
import { LotSizeResultPanel } from "./components/LotSizeResult";
import { FibonacciPanel } from "./components/FibonacciPanel";
import { PsychologicalLevelsPanel } from "./components/PsychologicalLevelsPanel";
import { PartialTPPanel } from "./components/PartialTPPanel";
import { BreakEvenPanel } from "./components/BreakEvenPanel";
import { TradeQualityScore } from "./components/TradeQualityScore";
import { ChartPreview } from "./components/ChartPreview";
import { HitTPPanel } from "./components/HitTPPanel";
import { TelegramSettings } from "./components/TelegramSettings";
import { CopyButtons } from "./components/CopyButtons";
import { InstructionSection } from "./components/InstructionSection";
import { PresetPanel } from "./components/PresetPanel";
import { WarningPanel } from "./components/WarningPanel";

import { 
  CalculatorInputs, 
  TimeframeMode, 
  Direction, 
  FibonacciRatio,
  HitTPUpdateInputs,
  HitTPUpdateResult,
  HitTPStatus
} from "./types/calculator";
import { TIMEFRAME_CONFIGS } from "./utils/timeframe";
import { calculateGannLevels } from "./utils/gann";
import { calculateSignal, calculateLotSize } from "./utils/risk";
import { FIBO_PRESETS, calculateFiboLevels, checkFiboConfluence } from "./utils/fibo";
import { checkPsychologicalLevels } from "./utils/psychology";
import { calculateTradeQualityScore } from "./utils/tradeScore";
import { generatePlainTextSignal, generateTelegramSignalHtml } from "./utils/telegram";
import { generateHitTPPlainTextUpdate, generateHitTPHtmlUpdate, getHitTPStatusLabel } from "./utils/hitTP";
import { savePreset, loadPresets, saveCustomFibo, loadCustomFibo, saveTelegramSettings, loadTelegramSettings } from "./utils/storage";

import axios from "axios";

const DEFAULT_INPUTS: CalculatorInputs = {
  basePrice: 0,
  timeframe: "M5",
  direction: "BUY",
  entryBuffer: TIMEFRAME_CONFIGS["M5"].entryBuffer,
  slBuffer: TIMEFRAME_CONFIGS["M5"].slBuffer,
  useAtrBuffer: false,
  atrValue: 0.5,
  atrEntryMultiplier: TIMEFRAME_CONFIGS["M5"].atrEntryMultiplier,
  atrSlMultiplier: TIMEFRAME_CONFIGS["M5"].atrSlMultiplier,
  accountBalance: 1000,
  riskPercent: 1.0,
  spread: 0.5,
  commission: 7.0,
  customStopLossPoints: null,
  valuePerLot: 100,
  enableFibo: true,
  swingHigh: 2350.00,
  swingLow: 2320.00,
  fiboDirection: "auto",
  fiboTolerance: 3.0,
  fiboPreset: "standard",
  fiboRatios: FIBO_PRESETS.standard,
  psyTolerance: 0.5,
  tp1Percent: 25,
  tp2Percent: 25,
  tp3Percent: 25,
  tp4Percent: 25,
  breakEvenRule: "afterTP1",
  telegramBotToken: "",
  telegramChatId: "",
  appApiKey: "",
  includeFooter: true,
  includeGeneratedOn: true,
};

const DEFAULT_HIT_TP_INPUTS: HitTPUpdateInputs = {
  status: "tp1",
  currentPrice: null,
  customNote: "",
  includeProfitEstimate: true,
  includeManagementInstruction: true,
  includeOriginalSignalSummary: false,
  includeTimestamp: true,
  includeFooter: true,
};

export default function App() {
  const [inputs, setInputs] = useState<CalculatorInputs>(DEFAULT_INPUTS);
  const [hitTPInputs, setHitTPInputs] = useState<HitTPUpdateInputs>(DEFAULT_HIT_TP_INPUTS);
  const [presets, setPresets] = useState<Record<string, CalculatorInputs>>({});
  const [sending, setSending] = useState(false);
  const [testing, setTesting] = useState(false);

  // Initialize
  useEffect(() => {
    setPresets(loadPresets());
    const customFibo = loadCustomFibo();
    const tele = loadTelegramSettings();
    if (customFibo) setInputs(prev => ({ ...prev, fiboRatios: customFibo, ...tele }));
    else setInputs(prev => ({ ...prev, ...tele }));
  }, []);

  // Update timeframe defaults
  const handleTimeframeChange = (mode: TimeframeMode) => {
    if (mode === "Custom") {
      setInputs(prev => ({ ...prev, timeframe: mode }));
    } else {
      const config = TIMEFRAME_CONFIGS[mode];
      setInputs(prev => ({ 
        ...prev, 
        timeframe: mode,
        entryBuffer: config.entryBuffer,
        slBuffer: config.slBuffer,
        atrEntryMultiplier: config.atrEntryMultiplier,
        atrSlMultiplier: config.atrSlMultiplier
      }));
    }
  };

  const handleInputChange = (updates: Partial<CalculatorInputs>) => {
    setInputs(prev => {
      const newInputs = { ...prev, ...updates };
      if (updates.fiboRatios) saveCustomFibo(updates.fiboRatios);
      if (updates.telegramBotToken !== undefined || updates.telegramChatId !== undefined || updates.appApiKey !== undefined || updates.includeFooter !== undefined || updates.includeGeneratedOn !== undefined) {
        saveTelegramSettings({
          botToken: newInputs.telegramBotToken,
          chatId: newInputs.telegramChatId,
          appApiKey: newInputs.appApiKey,
          includeFooter: newInputs.includeFooter,
          includeGeneratedOn: newInputs.includeGeneratedOn
        });
      }
      return newInputs;
    });
  };

  // Calculations
  const gannLevels = useMemo(() => calculateGannLevels(inputs.basePrice, inputs.direction), [inputs.basePrice, inputs.direction]);
  const signal = useMemo(() => calculateSignal(inputs), [inputs]);
  const lotSize = useMemo(() => calculateLotSize(inputs, signal), [inputs, signal]);
  const fiboLevels = useMemo(() => calculateFiboLevels(inputs), [inputs]);
  const confluences = useMemo(() => checkFiboConfluence(fiboLevels, signal, inputs.fiboTolerance), [fiboLevels, signal, inputs.fiboTolerance]);
  const psyLevels = useMemo(() => checkPsychologicalLevels(signal, inputs.psyTolerance), [signal, inputs.psyTolerance]);
  const scoreResult = useMemo(() => calculateTradeQualityScore(inputs, signal, lotSize, confluences, psyLevels), [inputs, signal, lotSize, confluences, psyLevels]);

  const hitTPResult: HitTPUpdateResult = useMemo(() => {
    const plain = generateHitTPPlainTextUpdate(hitTPInputs, signal, lotSize, scoreResult.score, scoreResult.grade);
    const html = generateHitTPHtmlUpdate(hitTPInputs, signal, lotSize, scoreResult.score, scoreResult.grade);
    
    const warns: string[] = [];
    if (hitTPInputs.status === "manual" && !hitTPInputs.customNote) warns.push("Custom note recommended for manual update.");
    if (hitTPInputs.status !== "sl" && hitTPInputs.status !== "entry" && hitTPInputs.status !== "be" && !hitTPInputs.currentPrice) {
      warns.push("Setting current price adds professional detail to status update.");
    }

    return {
      statusLabel: getHitTPStatusLabel(hitTPInputs.status),
      targetPrice: null,
      estimatedProfit: null,
      estimatedLoss: null,
      plainTextMessage: plain,
      htmlMessage: html,
      warnings: warns
    };
  }, [hitTPInputs, signal, lotSize, scoreResult]);

  // Actions
  const handleCopySignal = async () => {
    const config = { 
      includeFooter: inputs.includeFooter, 
      includeGeneratedOn: inputs.includeGeneratedOn,
      confluences: inputs.enableFibo ? confluences : []
    };
    const msg = generatePlainTextSignal(signal, lotSize, scoreResult, "", config);
    await navigator.clipboard.writeText(msg);
    alert("Signal copied to clipboard!");
  };

  const handleCopyReport = async () => {
    const config = { 
      includeFooter: inputs.includeFooter, 
      includeGeneratedOn: inputs.includeGeneratedOn,
      confluences: inputs.enableFibo ? confluences : []
    };
    const msg = `FULL TRADE REPORT - XAUUSD\n` + generatePlainTextSignal(signal, lotSize, scoreResult, "", config);
    await navigator.clipboard.writeText(msg);
    alert("Report copied to clipboard!");
  };

  const handleSendTelegram = async (isHitTP: boolean = false) => {
    if (!inputs.telegramBotToken || !inputs.telegramChatId || !inputs.appApiKey) {
      alert("Please configure Telegram Settings first.");
      return;
    }

    setSending(true);
    try {
      const config = { 
        includeFooter: inputs.includeFooter, 
        includeGeneratedOn: inputs.includeGeneratedOn,
        confluences: inputs.enableFibo ? confluences : []
      };
      const message = isHitTP ? hitTPResult.htmlMessage : generateTelegramSignalHtml(signal, lotSize, scoreResult, "", config);
      await axios.post("/api/send-telegram-signal", {
        botToken: inputs.telegramBotToken,
        chatId: inputs.telegramChatId,
        apiKey: inputs.appApiKey,
        message
      });
      alert(isHitTP ? "Hit TP update sent!" : "Signal sent to Telegram!");
    } catch (error: any) {
      alert("Failed to send: " + (error.response?.data?.error || error.message));
    } finally {
      setSending(false);
    }
  };

  const handleTestTelegram = async () => {
    if (!inputs.telegramBotToken || !inputs.telegramChatId || !inputs.appApiKey) {
       alert("Input credentials first.");
       return;
    }
    setTesting(true);
    try {
      await axios.post("/api/test-telegram", {
        botToken: inputs.telegramBotToken,
        chatId: inputs.telegramChatId,
        apiKey: inputs.appApiKey
      });
      alert("Connection successful!");
    } catch (error: any) {
      alert("Test failed: " + (error.response?.data?.error || error.message));
    } finally {
      setTesting(false);
    }
  };

  const handleSavePreset = (name: string) => {
    savePreset(name, inputs);
    setPresets(loadPresets());
  };

  const handleLoadPreset = (name: string) => {
    const p = presets[name];
    if (p) {
      setInputs(p);
      alert(`Loaded preset: ${name}`);
    }
  };

  const handleDeletePreset = (name: string) => {
    const newPresets = { ...presets };
    delete newPresets[name];
    localStorage.setItem("xauusd_gann_presets", JSON.stringify(newPresets));
    setPresets(newPresets);
  };

  // Validation
  const canCalculate = inputs.basePrice > 0;
  const canSend = !!(inputs.telegramBotToken && inputs.telegramChatId && inputs.appApiKey);

  const warnings = useMemo(() => {
    const list = [];
    if (inputs.basePrice === 0) list.push({ id: "1", type: "info", message: "Enter a Base Price to begin calculations." });
    if (lotSize.suggestedLotSize <= 0 && canCalculate) list.push({ id: "2", type: "warning", message: "Suggested lot size is 0. Increase risk or account balance." });
    if (scoreResult.score < 45 && canCalculate) list.push({ id: "3", type: "error", message: "Low Trade Quality Score detected. High risk setup." });
    return list;
  }, [inputs.basePrice, lotSize.suggestedLotSize, scoreResult.score, canCalculate]);

  return (
    <div className="min-h-screen bg-slate-950 text-slate-200 font-sans pb-32">
      <Header onReset={() => setInputs(DEFAULT_INPUTS)} />
      
      <main className="max-w-7xl mx-auto px-4">
        <TimeframeSelector 
          selected={inputs.timeframe} 
          onChange={handleTimeframeChange} 
        />
        
        <CalculatorInputsPanel 
          inputs={inputs} 
          onChange={handleInputChange} 
        />

        {canCalculate && (
          <div className="animate-in fade-in duration-700">
            <SignalCards signal={signal} />
            
            <TradeQualityScore result={scoreResult} />

            <div className="grid grid-cols-1 xl:grid-cols-2 gap-8 mb-8">
               <div className="space-y-8">
                  <LotSizeResultPanel lotSize={lotSize} signal={signal} />
                  <BreakEvenPanel rule={inputs.breakEvenRule} onChange={(rule) => handleInputChange({ breakEvenRule: rule })} />
                  <PartialTPPanel inputs={inputs} lotSize={lotSize} onChange={handleInputChange} />
               </div>
               <div className="space-y-8">
                  <ChartPreview signal={signal} />
                  <GannLevelsTable levels={gannLevels} basePrice={inputs.basePrice} />
               </div>
            </div>

            <FibonacciPanel 
              inputs={inputs} 
              confluences={confluences} 
              onChange={handleInputChange} 
            />

            <PsychologicalLevelsPanel 
              levels={psyLevels} 
              tolerance={inputs.psyTolerance} 
            />

            <HitTPPanel
              inputs={hitTPInputs}
              result={hitTPResult}
              onChange={(upd) => setHitTPInputs(prev => ({ ...prev, ...upd }))}
              onCopy={async () => {
                await navigator.clipboard.writeText(hitTPResult.plainTextMessage);
                alert("Update message copied!");
              }}
              onSend={() => handleSendTelegram(true)}
              sending={sending}
              canSend={canSend}
            />
          </div>
        )}

        <PresetPanel 
          presets={presets} 
          onSave={handleSavePreset}
          onLoad={handleLoadPreset}
          onDelete={handleDeletePreset}
        />

        <TelegramSettings 
          inputs={inputs} 
          onChange={handleInputChange}
          onTest={handleTestTelegram}
          testing={testing}
        />

        <WarningPanel warnings={warnings as any} />

        <InstructionSection />
      </main>

      <CopyButtons 
        onCopySignal={handleCopySignal}
        onCopyReport={handleCopyReport}
        onSendSignal={() => handleSendTelegram(false)}
        sending={sending}
        canSend={canSend}
        canCalculate={canCalculate}
      />
    </div>
  );
}
