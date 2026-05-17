import { Link, useOutletContext } from "react-router-dom";
import { useI18n } from "../i18n/I18nContext.jsx";

const fallbackInterests = ["tag_photo", "tag_travel", "tag_chinese"];

export default function DiscoverPage() {
  const { t } = useI18n();
  const {
    user,
    authReady,
    loadingDiscover,
    profiles,
    handleLike,
    fetchDiscoverProfiles,
    setCurrentCardIndex,
  } = useOutletContext();

  const profile = profiles[0] ?? null;
  const interests = Array.isArray(profile?.interests) ? profile.interests : [];

  return (
    <section className="relative z-10 px-6 md:px-16 py-16">
      <div className="max-w-6xl mx-auto space-y-8">
        <div className="rounded-[36px] border border-white/10 bg-white/5 p-8 backdrop-blur-3xl">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-pink-500/10 border border-pink-500/20 mb-5">
            <span className="w-2 h-2 rounded-full bg-pink-400 animate-pulse" />
            <span className="text-sm text-pink-200">{t("discover_badge")}</span>
          </div>
          <div className="grid gap-6 lg:grid-cols-[1fr,280px] lg:items-end">
            <div>
              <h2 className="text-4xl md:text-5xl font-black leading-tight">
                {t("discover_title_1")}
                <span className="bg-gradient-to-r from-pink-400 to-blue-400 bg-clip-text text-transparent">
                  {t("discover_title_2")}
                </span>
                {t("discover_title_3")}
              </h2>
              <p className="mt-4 max-w-3xl text-gray-300 whitespace-pre-line leading-relaxed">
                {t("discover_desc")}
              </p>
            </div>
            <div className="grid grid-cols-3 gap-3 text-center">
              <div className="rounded-3xl border border-white/10 bg-black/30 px-4 py-5">
                <div className="text-2xl font-bold">120K+</div>
                <div className="mt-1 text-xs text-gray-400">{t("stat_users")}</div>
              </div>
              <div className="rounded-3xl border border-white/10 bg-black/30 px-4 py-5">
                <div className="text-2xl font-bold">24h</div>
                <div className="mt-1 text-xs text-gray-400">{t("stat_live")}</div>
              </div>
              <div className="rounded-3xl border border-white/10 bg-black/30 px-4 py-5">
                <div className="text-2xl font-bold">AI</div>
                <div className="mt-1 text-xs text-gray-400">{t("stat_translate")}</div>
              </div>
            </div>
          </div>
        </div>

        {!authReady ? (
          <div className="grid gap-8 lg:grid-cols-[1.3fr,0.7fr] animate-pulse">
            <div className="rounded-[36px] border border-white/10 bg-white/5 p-8 backdrop-blur-3xl h-[540px]" />
            <div className="space-y-6">
              <div className="rounded-[32px] border border-white/10 bg-white/5 p-6 backdrop-blur-3xl h-40" />
              <div className="rounded-[32px] border border-white/10 bg-white/5 p-6 backdrop-blur-3xl h-40" />
            </div>
          </div>
        ) : !user ? (
          <div className="rounded-[32px] border border-white/10 bg-black/30 p-8 text-gray-300">
            <div className="text-2xl font-bold text-white">{t("btn_login")}</div>
            <p className="mt-3">{t("alert_login_first")}</p>
            <Link
              to="/auth"
              className="inline-flex mt-6 px-6 py-3 rounded-2xl bg-white text-black font-semibold"
            >
              {t("btn_login")}
            </Link>
          </div>
        ) : loadingDiscover ? (
          <div className="grid gap-8 lg:grid-cols-[1.3fr,0.7fr] animate-pulse">
            <div className="rounded-[36px] border border-white/10 bg-white/5 p-8 backdrop-blur-3xl h-[540px]" />
            <div className="space-y-6">
              <div className="rounded-[32px] border border-white/10 bg-white/5 p-6 backdrop-blur-3xl h-40" />
              <div className="rounded-[32px] border border-white/10 bg-white/5 p-6 backdrop-blur-3xl h-40" />
            </div>
          </div>
        ) : !profile ? (
          <div className="rounded-[32px] border border-white/10 bg-black/30 p-8 text-gray-300">
            <div className="text-2xl font-bold text-white">{t("discover_no_profiles")}</div>
            <button
              type="button"
              onClick={() => void fetchDiscoverProfiles(user)}
              className="inline-flex mt-6 px-6 py-3 rounded-2xl bg-white text-black font-semibold"
            >
              {t("btn_refresh_matches")}
            </button>
          </div>
        ) : (
          <div className="grid gap-8 lg:grid-cols-[1.3fr,0.7fr]">
            <div className="rounded-[36px] border border-white/10 bg-white/5 p-8 backdrop-blur-3xl">
              <div className="flex items-start justify-between gap-6 flex-wrap">
                <div>
                  <div className="text-sm text-pink-200">{t("match_score_label")}</div>
                  <div className="mt-2 text-5xl font-black">{t("match_percent")}</div>
                </div>
                <div className="flex gap-3 flex-wrap">
                  <button
                    type="button"
                    onClick={() => setCurrentCardIndex((prev) => prev + 1)}
                    className="px-6 py-3 rounded-2xl border border-white/15 bg-white/5 font-semibold hover:bg-white/10 transition"
                  >
                    {t("btn_watch_demo")}
                  </button>
                  <Link
                    to="/chat"
                    className="px-6 py-3 rounded-2xl border border-white/15 bg-white/5 font-semibold hover:bg-white/10 transition"
                  >
                    {t("btn_start_chat")}
                  </Link>
                  <button
                    type="button"
                    onClick={() => void handleLike(profile)}
                    className="px-6 py-3 rounded-2xl bg-gradient-to-r from-pink-500 to-blue-500 font-semibold hover:scale-105 transition"
                  >
                    {t("btn_follow")}
                  </button>
                </div>
              </div>

              <div className="mt-8 grid gap-8 md:grid-cols-[220px,1fr] items-start">
                <div className="rounded-[28px] border border-white/10 bg-black/30 p-4">
                  {profile.avatar_url ? (
                    <img
                      src={profile.avatar_url}
                      alt={profile.nickname || t("common_anonymous")}
                      className="w-full aspect-square rounded-[24px] object-cover border border-white/10"
                    />
                  ) : (
                    <div className="w-full aspect-square rounded-[24px] bg-white/5 border border-white/10 flex items-center justify-center text-gray-500">
                      {t("avatar_alt")}
                    </div>
                  )}
                </div>

                <div>
                  <div className="flex items-end justify-between gap-4 flex-wrap">
                    <div>
                      <h3 className="text-3xl font-bold">
                        {profile.nickname || t("common_anonymous")}
                      </h3>
                      <p className="mt-2 text-gray-400">
                        {[profile.city, profile.country].filter(Boolean).join(" · ")}
                      </p>
                    </div>
                    {profile.age ? <div className="text-lg text-gray-300">{profile.age}</div> : null}
                  </div>

                  <div className="mt-8">
                    <h4 className="text-xl font-bold mb-3">{t("about_title")}</h4>
                    <p className="text-gray-300 leading-relaxed whitespace-pre-line">
                      {profile.bio || t("swipe_card_bio")}
                    </p>
                  </div>

                  <div className="mt-8">
                    <h4 className="text-xl font-bold mb-3">{t("interests_title")}</h4>
                    <div className="flex flex-wrap gap-3">
                      {(interests.length ? interests : fallbackInterests.map((key) => t(key))).map((interest) => (
                        <span
                          key={interest}
                          className="px-4 py-2 rounded-full border border-white/10 bg-white/5 text-sm text-gray-200"
                        >
                          {interest}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="space-y-6">
              <div className="rounded-[32px] border border-white/10 bg-white/5 p-6 backdrop-blur-3xl">
                <h4 className="text-2xl font-bold mb-3">{t("swipe_badge")}</h4>
                <p className="text-gray-300 leading-relaxed">{t("swipe_desc")}</p>
              </div>
              <div className="rounded-[32px] border border-white/10 bg-white/5 p-6 backdrop-blur-3xl">
                <h4 className="text-2xl font-bold mb-3">{t("feat_match_title")}</h4>
                <p className="text-gray-300 leading-relaxed">{t("feat_match_desc")}</p>
              </div>
              <div className="rounded-[32px] border border-white/10 bg-white/5 p-6 backdrop-blur-3xl">
                <h4 className="text-2xl font-bold mb-3">{t("voice_trans_title")}</h4>
                <p className="text-gray-300 leading-relaxed">{t("feat_ai_desc")}</p>
              </div>
            </div>
          </div>
        )}
      </div>
    </section>
  );
}
