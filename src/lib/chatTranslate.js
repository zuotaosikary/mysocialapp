const DEEPSEEK_KEY = import.meta.env.VITE_DEEPSEEK_API_KEY;
const DEEPSEEK_URL = "https://api.deepseek.com/chat/completions";

/**
 * @param {string} text
 * @param {"zh" | "ru"} targetLang
 * @returns {Promise<string>}
 */
export async function translateChatText(text, targetLang) {
  const trimmed = text.trim();
  if (!trimmed) return "";

  if (!DEEPSEEK_KEY) {
    throw new Error("Missing VITE_DEEPSEEK_API_KEY");
  }

  const langName = targetLang === "zh" ? "Simplified Chinese" : "Russian";
  const res = await fetch(DEEPSEEK_URL, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${DEEPSEEK_KEY}`,
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
  const data = await res.json().catch(() => ({}));
  if (!res.ok) {
    throw new Error(data?.error?.message || `DeepSeek ${res.status}`);
  }
  const out = data.choices?.[0]?.message?.content?.trim();
  if (!out) throw new Error("Empty translation");
  return out;
}
