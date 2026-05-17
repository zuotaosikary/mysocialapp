import { useState } from "react";
import { useOutletContext } from "react-router-dom";
import { useI18n } from "../i18n/I18nContext.jsx";

const feedCards = [
  { titleKey: "feed1_title", bodyKey: "feed1_body", accent: "from-pink-500/20 to-orange-500/20" },
  { titleKey: "feed2_title", bodyKey: "feed2_body", accent: "from-blue-500/20 to-cyan-500/20" },
  { titleKey: "feed3_title", bodyKey: "feed3_body", accent: "from-purple-500/20 to-pink-500/20" },
];

const tabKeys = ["feed_tab_rec", "feed_tab_sz", "feed_tab_msk", "feed_tab_night"];

export default function FeedPage() {
  const { t, locale } = useI18n();
  const { session } = useOutletContext();
  const [activeTab, setActiveTab] = useState(tabKeys[0]);
  const [translatedCards, setTranslatedCards] = useState({});

  const activeTabLabel = t(activeTab);
  const altLocale = locale === "zh" ? "ru" : "zh";

  return (
    <section className="relative z-10 px-6 md:px-16 py-16">
      <div className="max-w-6xl mx-auto space-y-8">
        <div className="rounded-[36px] border border-white/10 bg-white/5 p-8 backdrop-blur-3xl">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-blue-500/10 border border-blue-500/20 mb-5">
            <span className="w-2 h-2 rounded-full bg-blue-400 animate-pulse" />
            <span className="text-sm text-blue-200">{t("feed_badge")}</span>
          </div>
          <div className="grid gap-6 lg:grid-cols-[1fr,280px] lg:items-end">
            <div>
              <h2 className="text-4xl md:text-5xl font-black leading-tight">
                {t("feed_title_1")}
                <span className="bg-gradient-to-r from-pink-400 to-blue-400 bg-clip-text text-transparent">
                  {t("feed_title_2")}
                </span>
              </h2>
              <p className="mt-4 max-w-3xl text-gray-300 whitespace-pre-line leading-relaxed">
                {t("feed_desc")}
              </p>
            </div>
            <div className="rounded-[28px] border border-white/10 bg-black/30 p-5">
              <div className="text-sm text-gray-400">{t("hero_badge")}</div>
              <div className="mt-3 text-3xl font-bold">24h</div>
              <div className="mt-1 text-sm text-gray-400">{t("stat_live")}</div>
            </div>
          </div>
        </div>

        <div className="flex flex-wrap gap-3">
          {tabKeys.map((key) => {
            const isActive = activeTab === key;
            return (
              <button
                key={key}
                type="button"
                onClick={() => setActiveTab(key)}
                className={`px-4 py-2 rounded-full border text-sm transition ${
                  isActive
                    ? "border-white/30 bg-white text-black"
                    : "border-white/10 bg-white/5 text-gray-300 hover:bg-white/10"
                }`}
              >
                {t(key)}
              </button>
            );
          })}
        </div>

        <div className="grid gap-6 lg:grid-cols-3">
          {feedCards.map((card, index) => (
            <article
              key={card.titleKey}
              className="rounded-[32px] border border-white/10 bg-white/5 p-6 backdrop-blur-3xl"
            >
              <div className={`aspect-[4/3] rounded-[24px] bg-gradient-to-br ${card.accent} border border-white/10 p-5 flex flex-col justify-between`}>
                <div className="text-sm text-gray-300">{activeTabLabel}</div>
                <div className="text-lg font-semibold">{session ? t("demo_online") : t("cta_join")}</div>
              </div>
              <h3 className="mt-6 text-2xl font-bold">{t(card.titleKey)}</h3>
              <p className="mt-3 text-gray-300 leading-relaxed">
                {translatedCards[card.titleKey] ?? t(card.bodyKey)}
              </p>
              <div className="mt-6 flex items-center justify-between gap-3 flex-wrap">
                <button
                  type="button"
                  onClick={() =>
                    setTranslatedCards((prev) => ({
                      ...prev,
                      [card.titleKey]: prev[card.titleKey] ? undefined : t(card.bodyKey, { locale: altLocale }),
                    }))
                  }
                  className="px-4 py-2 rounded-full border border-white/10 bg-white/5 text-sm text-gray-200"
                >
                  {t("btn_translate")}
                </button>
                <button
                  type="button"
                  className="px-4 py-2 rounded-full bg-white text-black text-sm font-semibold"
                >
                  {t("btn_comment")}
                </button>
              </div>
              <div className="mt-4 text-xs text-gray-500">#{index + 1}</div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
