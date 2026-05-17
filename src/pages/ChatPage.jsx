import { useMemo } from "react";
import { Link, useOutletContext } from "react-router-dom";
import { useI18n } from "../i18n/I18nContext.jsx";

export default function ChatPage() {
  const { t, locale } = useI18n();
  const {
    user,
    authReady,
    matches,
    selectedMatch,
    fetchMessages,
    messages,
    messageText,
    setMessageText,
    messageTranslations,
    sendMessage,
    sendingMessage,
  } = useOutletContext();

  const activeMatch = useMemo(
    () => matches.find((match) => match.id === selectedMatch?.id) ?? selectedMatch ?? null,
    [matches, selectedMatch]
  );

  const draftHint = useMemo(
    () => (locale === "zh" ? t("chat_draft_to_ru") : t("chat_draft_to_zh")),
    [locale, t]
  );

  return (
    <section className="relative z-10 px-6 md:px-16 py-16">
      <div className="max-w-7xl mx-auto rounded-[36px] border border-white/10 bg-white/5 p-6 md:p-8 backdrop-blur-3xl">
        <div className="mb-8 flex flex-col gap-4 lg:flex-row lg:items-end lg:justify-between">
          <div>
            <h2 className="text-4xl font-black">{t("match_section_title")}</h2>
            <p className="mt-2 text-gray-300">{t("chat_demo_desc")}</p>
          </div>
          <div className="rounded-[24px] border border-white/10 bg-black/30 px-5 py-4 text-sm text-gray-300">
            <div className="text-gray-400">{t("chat_ai_label")}</div>
            <div className="mt-1">{draftHint}</div>
          </div>
        </div>

        {!authReady ? (
          <div className="grid gap-6 lg:grid-cols-[320px,1fr] animate-pulse">
            <div className="rounded-[28px] border border-white/10 bg-black/30 p-4 h-[520px]" />
            <div className="rounded-[28px] border border-white/10 bg-black/30 p-4 h-[520px]" />
          </div>
        ) : !user ? (
          <div className="rounded-[28px] border border-white/10 bg-black/30 p-6 text-gray-300">
            <div className="text-2xl font-bold text-white">{t("btn_login")}</div>
            <p className="mt-3">{t("alert_login_first")}</p>
            <Link
              to="/auth"
              className="inline-flex mt-6 px-6 py-3 rounded-2xl bg-white text-black font-semibold"
            >
              {t("btn_login")}
            </Link>
          </div>
        ) : (
          <div className="grid gap-6 lg:grid-cols-[320px,1fr]">
            <aside className="rounded-[28px] border border-white/10 bg-black/30 p-4 space-y-3">
              {matches.length === 0 ? (
                <div className="p-4 text-gray-400">{t("match_empty")}</div>
              ) : (
                matches.map((match) => {
                  const peer = match.peer_profile;
                  const isActive = selectedMatch?.id === match.id;
                  return (
                    <button
                      key={match.id}
                      type="button"
                      onClick={() => void fetchMessages(match)}
                      className={`w-full rounded-2xl border p-4 text-left transition ${
                        isActive
                          ? "border-white/30 bg-white/10"
                          : "border-white/10 bg-white/5 hover:bg-white/10"
                      }`}
                    >
                      <div className="flex items-center gap-3">
                        {peer?.avatar_url ? (
                          <img
                            src={peer.avatar_url}
                            alt={peer.nickname || t("common_anonymous")}
                            className="w-12 h-12 rounded-full object-cover border border-white/10"
                          />
                        ) : (
                          <div className="w-12 h-12 rounded-full bg-white/10 border border-white/10" />
                        )}
                        <div className="min-w-0">
                          <div className="font-semibold truncate">
                            {peer?.nickname || t("common_anonymous")}
                          </div>
                          <div className="text-sm text-gray-400 truncate">{t("match_tap_chat")}</div>
                        </div>
                      </div>
                    </button>
                  );
                })
              )}
            </aside>

            <div className="rounded-[28px] border border-white/10 bg-black/30 p-4 md:p-6 flex flex-col min-h-[520px]">
              {!activeMatch ? (
                <div className="flex-1 flex items-center justify-center text-gray-400 text-center px-6">
                  {t("chat_pick_match")}
                </div>
              ) : (
                <>
                  <div className="pb-4 border-b border-white/10 flex items-center justify-between gap-4 flex-wrap">
                    <div>
                      <div className="text-sm text-gray-400">{t("chat_ai_label")}</div>
                      <div className="text-2xl font-bold mt-1">
                        {t("chat_with_prefix")} {activeMatch.peer_profile?.nickname || t("common_anonymous")}
                      </div>
                    </div>
                    <div className="text-sm text-gray-400">{t("demo_online")}</div>
                  </div>

                  <div className="flex-1 overflow-y-auto py-6 space-y-4">
                    {messages.length === 0 ? (
                      <div className="text-gray-400">{t("match_tap_chat")}</div>
                    ) : (
                      messages.map((message) => {
                        const translated = messageTranslations[message.id];
                        const isOwn = message.sender_id === user.id;
                        return (
                          <div
                            key={message.id}
                            className={`flex ${isOwn ? "justify-end" : "justify-start"}`}
                          >
                            <div
                              className={`max-w-[80%] rounded-3xl px-5 py-4 border ${
                                isOwn
                                  ? "bg-white text-black border-white"
                                  : "bg-white/5 text-white border-white/10"
                              }`}
                            >
                              <div className="leading-relaxed whitespace-pre-wrap">{message.content}</div>
                              {translated ? (
                                <div className={`mt-3 text-sm ${isOwn ? "text-black/70" : "text-gray-300"}`}>
                                  {t("chat_ai_label")}: {translated}
                                </div>
                              ) : null}
                            </div>
                          </div>
                        );
                      })
                    )}
                  </div>

                  <div className="pt-4 border-t border-white/10 flex gap-3 items-end">
                    <div className="flex-1">
                      <div className="mb-2 text-xs text-gray-400">{draftHint}</div>
                      <textarea
                        value={messageText}
                        onChange={(event) => setMessageText(event.target.value)}
                        placeholder={t("ph_message")}
                        className="w-full min-h-[96px] rounded-2xl bg-white/5 border border-white/10 px-4 py-3 outline-none resize-none"
                      />
                    </div>
                    <button
                      type="button"
                      disabled={sendingMessage || !messageText.trim()}
                      onClick={() => void sendMessage()}
                      className="px-6 py-3 rounded-2xl bg-gradient-to-r from-pink-500 to-blue-500 font-semibold hover:scale-105 transition disabled:opacity-60 disabled:hover:scale-100"
                    >
                      {sendingMessage ? t("auth_processing") : t("btn_send")}
                    </button>
                  </div>
                </>
              )}
            </div>
          </div>
        )}
      </div>
    </section>
  );
}
