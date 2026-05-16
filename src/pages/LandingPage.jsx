import { Link, useOutletContext } from "react-router-dom";
import { useI18n } from "../i18n/I18nContext.jsx";

export default function LandingPage() {
  const { t } = useI18n();
  const { session } = useOutletContext();
  const primaryHref = session ? "/discover" : "/auth";
  const secondaryHref = session ? "/feed" : "/games";

  return (
    <>
      <section className="relative z-10 px-6 md:px-16 pt-12">
        <div className="max-w-7xl mx-auto grid lg:grid-cols-2 gap-12 items-center">
          <div>
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-pink-500/10 border border-pink-500/20 backdrop-blur-xl mb-6">
              <span className="w-2 h-2 bg-pink-400 rounded-full animate-pulse" />
              <span className="text-sm text-pink-200">{t("hero_badge")}</span>
            </div>

            <h2 className="text-5xl md:text-6xl font-black leading-tight tracking-tight">
              {t("hero_title_1")}
              <span className="bg-gradient-to-r from-pink-400 to-blue-400 bg-clip-text text-transparent">
                {t("hero_title_2")}
              </span>
            </h2>

            <p className="mt-6 text-lg text-gray-300 max-w-xl leading-relaxed">
              {t("hero_desc")}
            </p>

            <div className="mt-10 flex flex-wrap gap-4">
              <Link
                to={primaryHref}
                className="px-8 py-4 rounded-2xl bg-gradient-to-r from-pink-500 to-red-500 font-semibold shadow-2xl hover:scale-105 transition"
              >
                {session ? t("btn_start_match") : t("btn_login")}
              </Link>

              <Link
                to={secondaryHref}
                className="px-8 py-4 rounded-2xl border border-white/20 backdrop-blur-xl bg-white/5 hover:bg-white/10 transition"
              >
                {session ? t("nav_feed") : t("btn_watch_demo")}
              </Link>
            </div>

            <div className="mt-14 grid grid-cols-3 gap-6 max-w-lg">
              <div>
                <div className="text-3xl font-bold">120K+</div>
                <div className="text-sm text-gray-400 mt-1">{t("stat_users")}</div>
              </div>
              <div>
                <div className="text-3xl font-bold">24h</div>
                <div className="text-sm text-gray-400 mt-1">{t("stat_live")}</div>
              </div>
              <div>
                <div className="text-3xl font-bold">AI</div>
                <div className="text-sm text-gray-400 mt-1">{t("stat_translate")}</div>
              </div>
            </div>
          </div>

          <div className="grid gap-6">
            <div className="rounded-[36px] border border-white/10 bg-white/5 backdrop-blur-3xl p-8 shadow-2xl">
              <h3 className="text-2xl font-bold">{t("landing_highlight_title")}</h3>
              <p className="mt-4 text-gray-300 leading-relaxed whitespace-pre-line">
                {t("discover_desc")}
              </p>
            </div>

            <div className="grid md:grid-cols-3 gap-4">
              <div className="rounded-[28px] border border-white/10 bg-white/5 p-6 backdrop-blur-2xl">
                <div className="text-4xl mb-4">🌍</div>
                <h4 className="text-xl font-bold mb-2">{t("feat_ai_title")}</h4>
                <p className="text-gray-400 text-sm leading-relaxed">{t("feat_ai_desc")}</p>
              </div>
              <div className="rounded-[28px] border border-white/10 bg-white/5 p-6 backdrop-blur-2xl">
                <div className="text-4xl mb-4">🎮</div>
                <h4 className="text-xl font-bold mb-2">{t("games_title")}</h4>
                <p className="text-gray-400 text-sm leading-relaxed">{t("games_intro_desc")}</p>
              </div>
              <div className="rounded-[28px] border border-white/10 bg-white/5 p-6 backdrop-blur-2xl">
                <div className="text-4xl mb-4">💬</div>
                <h4 className="text-xl font-bold mb-2">{t("nav_ai_chat")}</h4>
                <p className="text-gray-400 text-sm leading-relaxed">{t("chat_demo_desc")}</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="relative z-10 px-8 md:px-16 py-24">
        <div className="max-w-6xl mx-auto rounded-[40px] overflow-hidden border border-white/10 bg-gradient-to-r from-pink-500/10 to-blue-500/10 backdrop-blur-3xl p-12 text-center">
          <h3 className="text-5xl font-black leading-tight">
            {t("cta_title_1")}
            <span className="bg-gradient-to-r from-pink-400 to-blue-400 bg-clip-text text-transparent">
              {t("cta_title_2")}
            </span>
          </h3>

          <p className="mt-6 text-gray-300 text-lg max-w-2xl mx-auto">
            {t("cta_desc")}
          </p>

          <div className="mt-10 flex justify-center gap-4 flex-wrap">
            <Link to={primaryHref} className="px-10 py-4 rounded-2xl bg-white text-black font-bold hover:scale-105 transition">
              {session ? t("btn_start_match") : t("cta_register")}
            </Link>
            <Link to={secondaryHref} className="px-10 py-4 rounded-2xl border border-white/20 bg-white/5 backdrop-blur-xl hover:bg-white/10 transition">
              {session ? t("nav_feed") : t("cta_join")}
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
