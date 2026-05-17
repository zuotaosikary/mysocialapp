/**
 * @param {string} text
 * @param {"zh" | "ru"} targetLang
 * @returns {Promise<string>}
 */
export async function translateChatText(text, targetLang) {
  const trimmed = text.trim();
  if (!trimmed) return "";

  const res = await fetch("/api/translate", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      text: trimmed,
      targetLang,
    }),
  });

  const data = await res.json().catch(() => ({}));

  if (!res.ok) {
    throw new Error(data?.error || `Translate ${res.status}`);
  }

  const out = data?.translation?.trim();
  if (!out) throw new Error("Empty translation");
  return out;
}
