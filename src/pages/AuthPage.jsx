import { useEffect } from "react";
import { useLocation, useNavigate, useOutletContext } from "react-router-dom";
import { useI18n } from "../i18n/I18nContext.jsx";

export default function AuthPage() {
  const { t } = useI18n();
  const navigate = useNavigate();
  const location = useLocation();
  const {
    authMode,
    setAuthMode,
    email,
    setEmail,
    password,
    setPassword,
    country,
    setCountry,
    authLoading,
    authMessage,
    session,
    handleAuthSubmit,
  } = useOutletContext();

  useEffect(() => {
    if (session) {
      navigate(location.state?.from || "/discover", { replace: true });
    }
  }, [location.state, navigate, session]);

  return (
    <section className="relative z-10 px-6 md:px-16 py-16">
      <div className="max-w-2xl mx-auto rounded-[36px] border border-white/10 bg-white/5 backdrop-blur-3xl p-8 shadow-2xl overflow-hidden relative">
        <div className="absolute inset-0 bg-gradient-to-br from-pink-500/10 to-blue-500/10" />
        <div className="relative z-10">
          <div className="mb-8">
            <h2 className="text-4xl font-black">{t("auth_page_title")}</h2>
            <p className="mt-3 text-gray-300">{t("auth_page_desc")}</p>
          </div>

          <div className="flex gap-3 mb-8">
            {[
              { id: "login", labelKey: "auth_tab_login" },
              { id: "register", labelKey: "auth_tab_register" },
            ].map(({ id, labelKey }) => (
              <button
                key={id}
                type="button"
                onClick={() => setAuthMode(id)}
                className={`px-6 py-3 rounded-2xl transition font-semibold ${
                  authMode === id
                    ? "bg-white text-black"
                    : "bg-white/5 text-gray-300 border border-white/10"
                }`}
              >
                {t(labelKey)}
              </button>
            ))}
          </div>

          <form onSubmit={handleAuthSubmit} className="space-y-5">
            <div>
              <label className="text-sm text-gray-400 block mb-2">{t("label_email")}</label>
              <input
                type="email"
                placeholder="your@email.com"
                value={email}
                onChange={(event) => setEmail(event.target.value)}
                className="w-full px-5 py-4 rounded-2xl bg-black/40 border border-white/10 focus:outline-none focus:border-pink-400 transition"
              />
            </div>

            <div>
              <label className="text-sm text-gray-400 block mb-2">{t("label_password")}</label>
              <input
                type="password"
                placeholder="••••••••"
                value={password}
                onChange={(event) => setPassword(event.target.value)}
                className="w-full px-5 py-4 rounded-2xl bg-black/40 border border-white/10 focus:outline-none focus:border-pink-400 transition"
              />
            </div>

            <div>
              <label className="text-sm text-gray-400 block mb-2">{t("label_country")}</label>
              <select
                value={country}
                onChange={(event) => setCountry(event.target.value)}
                className="w-full px-5 py-4 rounded-2xl bg-black/40 border border-white/10 focus:outline-none focus:border-pink-400 transition text-gray-300"
              >
                <option value="中国 China">{t("country_cn")}</option>
                <option value="Россия Russia">{t("country_ru")}</option>
              </select>
            </div>

            <button
              type="submit"
              disabled={authLoading}
              className="w-full py-4 rounded-2xl bg-gradient-to-r from-pink-500 to-blue-500 font-bold text-lg hover:scale-[1.02] transition shadow-2xl disabled:opacity-60 disabled:cursor-not-allowed"
            >
              {authLoading
                ? t("auth_processing")
                : authMode === "register"
                  ? t("auth_submit_register")
                  : t("auth_submit_login")}
            </button>

            {authMessage && (
              <div className="rounded-2xl border border-white/10 bg-white/5 px-5 py-4 text-sm text-gray-200">
                {authMessage}
              </div>
            )}
          </form>
        </div>
      </div>
    </section>
  );
}
