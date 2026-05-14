import { CalculatorInputs, FibonacciRatio } from "../types/calculator";

const STORAGE_KEY = "xauusd_gann_presets";
const FIBO_KEY = "xauusd_fibo_custom";
const TELEGRAM_KEY = "xauusd_telegram_settings";

export const savePreset = (name: string, inputs: CalculatorInputs) => {
  const presets = JSON.parse(localStorage.getItem(STORAGE_KEY) || "{}");
  presets[name] = inputs;
  localStorage.setItem(STORAGE_KEY, JSON.stringify(presets));
};

export const loadPresets = (): Record<string, CalculatorInputs> => {
  return JSON.parse(localStorage.getItem(STORAGE_KEY) || "{}");
};

export const saveCustomFibo = (ratios: FibonacciRatio[]) => {
  localStorage.setItem(FIBO_KEY, JSON.stringify(ratios));
};

export const loadCustomFibo = (): FibonacciRatio[] | null => {
  const data = localStorage.getItem(FIBO_KEY);
  return data ? JSON.parse(data) : null;
};

export const saveTelegramSettings = (settings: { botToken?: string; chatId?: string; appApiKey?: string; includeFooter?: boolean; includeGeneratedOn?: boolean }) => {
  localStorage.setItem(TELEGRAM_KEY, JSON.stringify(settings));
};

export const loadTelegramSettings = () => {
  const data = localStorage.getItem(TELEGRAM_KEY);
  return data ? JSON.parse(data) : {};
};
