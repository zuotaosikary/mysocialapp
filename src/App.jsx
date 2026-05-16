import { NavLink, Outlet, useLocation, useNavigate } from "react-router-dom";
import { useI18n } from "./i18n/I18nContext.jsx";
import { useAppState } from "./hooks/useAppState.jsx";

const navItems = [
  { to: "/discover", labelKey: "nav_discover" },
  { to: "/feed", labelKey: "nav_feed" },
  { to: "/games", labelKey: "nav_games" },
  { to: "/chat", labelKey: "nav_ai_chat" },
  { to: "/profile", labelKey: "nav_profile" },
];

function AppHeader({ appState, locale, setLocale, t }) {
  const navigate = useNavigate();
  const location = useLocation();

  return (
    <header className="sticky top-0 z-50 flex flex-wrap items-center gap-4 px-6 md:px-8 py-6 border-b border-white/10 backdrop-blur-xl bg-white/5">
      <button
        type="button"
        onClick={() => navigate("/")}
        className="min-w-0 shrink-0 text-left"
      >
        <h1 className="text-3xl font-bold tracking-widest">TAO LINK</h1>
        <p className="text-sm text-gray-300">{t("header_tagline")}</p>
      </button>

      <nav className="hidden md:flex flex-1 justify-center gap-8 text-sm text-gray-300">
        {navItems.map((item) => (
          <NavLink
            key={item.to}
            to={item.to}
            className={({ isActive }) =>
              `transition hover:text-white ${isActive ? "text-white" : "text-gray-300"}`
            }
          >
            {t(item.labelKey)}
          </NavLink>
        ))}
      </nav>

      <div className="flex items-center gap-2 sm:gap-3 ml-auto shrink-0">
        <div className="flex rounded-full border border-white/15 bg-black/30 p-0.5 text-xs font-semibold">
          <button
            type="button"
            onClick={() => setLocale("zh")}
            className={`px-3 py-1.5 rounded-full transition ${
              locale === "zh" ? "bg-white text-black" : "text-gray-300 hover:text-white"
            }`}
          >
            {t("lang_zh")}
          </button>
          <button
            type="button"
            onClick={() => setLocale("ru")}
            className={`px-3 py-1.5 rounded-full transition ${
              locale === "ru" ? "bg-white text-black" : "text-gray-300 hover:text-white"
            }`}
          >
            {t("lang_ru")}
          </button>
        </div>

        {appState.session ? (
          <button
            type="button"
            onClick={() => void appState.handleSignOut()}
            className="px-4 sm:px-5 py-2 rounded-full bg-white text-black font-semibold hover:scale-105 transition text-sm sm:text-base"
          >
            {t("btn_logout")}
          </button>
        ) : (
          <button
            type="button"
            onClick={() => navigate("/auth", { state: { from: location.pathname } })}
            className="px-4 sm:px-5 py-2 rounded-full bg-white text-black font-semibold hover:scale-105 transition text-sm sm:text-base"
          >
            {t("btn_login")}
          </button>
        )}
      </div>
    </header>
  );
}

export default function App() {
  const { t, locale, setLocale } = useI18n();
  const appState = useAppState({ t, locale });

  return (
    <div className="min-h-screen bg-black text-white overflow-hidden relative">
      <div className="absolute inset-0">
        <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1519608487953-e999c86e7455?q=80&w=1600&auto=format&fit=crop')] bg-cover bg-center opacity-30" />
        <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-black/80 to-black" />
      </div>

      <div className="absolute top-10 left-10 w-72 h-72 bg-pink-500/20 rounded-full blur-3xl animate-pulse" />
      <div className="absolute bottom-20 right-10 w-96 h-96 bg-blue-500/20 rounded-full blur-3xl animate-pulse" />

      <div className="relative z-10">
        <AppHeader appState={appState} locale={locale} setLocale={setLocale} t={t} />
        <main>
          <Outlet context={appState} />
        </main>
      </div>
    </div>
  );
}
