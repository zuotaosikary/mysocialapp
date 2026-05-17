const DEEPSEEK_URL = "https://api.deepseek.com/chat/completions";

export default async function handler(req, res) {
  if (req.method !== "POST") {
    res.setHeader("Allow", "POST");
    return res.status(405).json({ error: "Method not allowed" });
  }

  const apiKey = process.env.DEEPSEEK_API_KEY;
  if (!apiKey) {
    return res.status(500).json({ error: "Missing DEEPSEEK_API_KEY" });
  }

  const { text, targetLang } = req.body ?? {};
  const trimmed = typeof text === "string" ? text.trim() : "";

  if (!trimmed) {
    return res.status(400).json({ error: "Text is required" });
  }

  if (targetLang !== "zh" && targetLang !== "ru") {
    return res.status(400).json({ error: "Unsupported target language" });
  }

  const langName = targetLang === "zh" ? "Simplified Chinese" : "Russian";

  const upstream = await fetch(DEEPSEEK_URL, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${apiKey}`,
    },
    body: JSON.stringify({
      model: "deepseek-chat",
      messages: [
        {
          role: "system",
          content: `You are a translator for a dating/social app. Translate the user's message into ${langName}. Output only the translation, no quotes or notes.`,
        },
        { role: "user", content: trimmed },
      ],
      temperature: 0.2,
      max_tokens: 1024,
    }),
  });

  const data = await upstream.json().catch(() => ({}));

  if (!upstream.ok) {
    return res.status(upstream.status).json({
      error: data?.error?.message || `DeepSeek ${upstream.status}`,
    });
  }

  const translation = data?.choices?.[0]?.message?.content?.trim();

  if (!translation) {
    return res.status(502).json({ error: "Empty translation" });
  }

  return res.status(200).json({ translation });
}
