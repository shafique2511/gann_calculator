import express from "express";
import path from "path";
import cors from "cors";
import axios from "axios";
import { createServer as createViteServer } from "vite";
import dotenv from "dotenv";

dotenv.config();

async function startServer() {
  const app = express();
  const PORT = 3000;

  app.use(cors());
  app.use(express.json({ limit: "100kb" }));

  // API Routes
  app.get("/api/health", (req, res) => {
    res.json({ status: "ok", service: "XAUUSD Gann Pro Backend" });
  });

  // Secure Telegram Proxy
  app.post("/api/send-telegram-signal", async (req, res) => {
    const { botToken, chatId, apiKey, message } = req.body;

    // Validate request
    if (!botToken || !chatId || !apiKey || !message) {
      return res.status(400).json({ error: "Missing required parameters." });
    }

    // Security check: validate against backend key if provided in env
    if (process.env.APP_API_KEY && apiKey !== process.env.APP_API_KEY) {
      return res.status(401).json({ error: "Unauthorized: Invalid API Key." });
    }

    try {
      const url = `https://api.telegram.org/bot${botToken}/sendMessage`;
      await axios.post(url, {
        chat_id: chatId,
        text: message,
        parse_mode: "HTML",
        disable_web_page_preview: true
      });
      res.json({ success: true, message: "Signal sent to Telegram channel." });
    } catch (error: any) {
      console.error("Telegram API Error:", error.response?.data || error.message);
      res.status(500).json({ 
        error: "Failed to send message via Telegram.",
        details: error.response?.data?.description || error.message
      });
    }
  });

  app.post("/api/test-telegram", async (req, res) => {
    const { botToken, chatId, apiKey } = req.body;
    
    if (process.env.APP_API_KEY && apiKey !== process.env.APP_API_KEY) {
        return res.status(401).json({ error: "Unauthorized: Invalid API Key." });
    }

    try {
      const url = `https://api.telegram.org/bot${botToken}/getMe`;
      const response = await axios.get(url);
      res.json({ success: true, bot: response.data.result });
    } catch (error: any) {
       res.status(500).json({ error: "Connection failed.", details: error.response?.data?.description || error.message });
    }
  });

  // Vite middleware for development
  if (process.env.NODE_ENV !== "production") {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "spa",
    });
    app.use(vite.middlewares);
  } else {
    // Serve production static files
    const distPath = path.join(process.cwd(), "dist");
    app.use(express.static(distPath));
    app.get("*", (req, res) => {
      res.sendFile(path.join(distPath, "index.html"));
    });
  }

  app.listen(PORT, "0.0.0.0", () => {
    console.log(`🚀 XAUUSD Calculator running on http://localhost:${PORT}`);
  });
}

startServer().catch((err) => {
  console.error("Failed to start server:", err);
  process.exit(1);
});
