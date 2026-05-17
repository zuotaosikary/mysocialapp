import { Link } from "react-router-dom";
import { useI18n } from "../i18n/I18nContext.jsx";

const featureKeys = [
  ["feat_city_title", "feat_city_desc"],
  ["swipe_ai_interest", "swipe_ai_interest_desc"],
  ["swipe_culture", "swipe_culture_desc"],
];

export default function GamesPage() {
  const { t } = useI18n();

  return (
    <section className="relative z-10 px-6 md:px-16 py-16">
      <div className="max-w-6xl mx-auto space-y-8">
        <div className="rounded-[36px] border border-white/10 bg-white/5 p-8 backdrop-blur-3xl">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-purple-500/10 border border-purple-500/20 mb-5">
            <span className="w-2 h-2 rounded-full bg-purple-400 animate-pulse" />
            <span className="text-sm text-purple-200">{t("games_title")}</span>
          </div>
          <div className="grid gap-6 lg:grid-cols-[1fr,280px] lg:items-end">
            <div>
              <h2 className="text-4xl md:text-5xl font-black leading-tight">
                <span className="bg-gradient-to-r from-pink-400 to-blue-400 bg-clip-text text-transparent">
                  {t("games_title")}
                </span>
              </h2>
              <p className="mt-4 max-w-3xl text-gray-300 leading-relaxed">{t("games_intro_desc")}</p>
            </div>
            <div className="rounded-[28px] border border-white/10 bg-black/30 p-5">
              <div className="text-sm text-gray-400">{t("voice_trans_title")}</div>
              <div className="mt-3 text-sm text-gray-200">{t("demo_ai_zh")}</div>
              <div className="mt-2 text-sm text-gray-400">{t("demo_ai_ru")}</div>
            </div>
          </div>
        </div>

        <div className="grid gap-6 md:grid-cols-3">
          {featureKeys.map(([titleKey, bodyKey]) => (
            <div
              key={titleKey}
              className="rounded-[32px] border border-white/10 bg-white/5 p-6 backdrop-blur-3xl"
            >
              <h3 className="text-2xl font-bold mb-3">{t(titleKey)}</h3>
              <p className="text-gray-300 leading-relaxed">{t(bodyKey)}</p>
            </div>
          ))}
        </div>

        <div className="rounded-[36px] border border-white/10 bg-gradient-to-r from-pink-500/10 to-blue-500/10 p-8 backdrop-blur-3xl flex flex-col lg:flex-row lg:items-center lg:justify-between gap-6">
          <div>
            <h3 className="text-3xl font-black">{t("swipe_title_1")} {t("swipe_title_2")}</h3>
            <p className="mt-3 text-gray-300 max-w-2xl">{t("swipe_desc")}</p>
          </div>
          <div className="flex gap-3 flex-wrap">
            <Link to="/discover" className="px-6 py-3 rounded-2xl bg-white text-black font-semibold">
              {t("btn_start_match")}
            </Link>
            <Link to="/chat" className="px-6 py-3 rounded-2xl border border-white/15 bg-white/5 font-semibold">
              {t("btn_start_chat")}
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
