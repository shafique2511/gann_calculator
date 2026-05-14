# XAUUSD Gann Square of Nine Pro Calculator

Professional advanced trading calculator for gold (XAUUSD) based on Gann Square of Nine geometry.

## Features
- Enhanced Gann Square of Nine calculator (Scaled for Gold)
- Multi-timeframe volatility buffers
- Fibonacci & Psychological level confluences
- Risk management & Lot size calculator
- Telegram signal bot integration
- Trade quality scoring system
- Local storage presets

## Setup Instructions

### 1. Requirements
- Node.js 18+
- Telegram Bot Token

### 2. Telegram Bot Setup
1. Message `@BotFather` on Telegram.
2. Create a new bot and copy the **API Token**.
3. Create a Telegram Channel and add your bot as an **Administrator** with permission to post messages.
4. Get your Channel ID (e.g. `@my_channel_name`).

### 3. Environment Configuration
Create a `.env` file (or use secrets panel) with:
```env
APP_API_KEY=your_secret_key
```

### 4. Installation & Running
```bash
npm install
npm run dev
```

The app will be available at `http://localhost:3000`.

## User Manual
1. **Settings**: Enter your Bot Token, Chat ID, and a chosen App API Key.
2. **Parameters**: Enter the Gold price and direction.
3. **Analyze**: Check the Signal Cards and Confluences.
4. **Send**: Use the "Send Signal" button to post directly to your channel.
5. **Update**: Use the Hit TP Panel to send updates when targets are reached.

## Security
This application uses a secure backend proxy pattern. Sensitive bot tokens are never handled by the public browser interface directly—they are transmitted over HTTPS to your private node server for execution.

---
*Disclaimer: Trading involves risk. Use this tool for analysis purposes only.*
