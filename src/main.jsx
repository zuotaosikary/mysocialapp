import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import "./index.css";
import App from "./App.jsx";
import { I18nProvider } from "./i18n/I18nContext.jsx";
import AuthPage from "./pages/AuthPage.jsx";
import ChatPage from "./pages/ChatPage.jsx";
import DiscoverPage from "./pages/DiscoverPage.jsx";
import FeedPage from "./pages/FeedPage.jsx";
import GamesPage from "./pages/GamesPage.jsx";
import LandingPage from "./pages/LandingPage.jsx";
import ProfilePage from "./pages/ProfilePage.jsx";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <I18nProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<App />}>
            <Route index element={<LandingPage />} />
            <Route path="auth" element={<AuthPage />} />
            <Route path="profile" element={<ProfilePage />} />
            <Route path="discover" element={<DiscoverPage />} />
            <Route path="feed" element={<FeedPage />} />
            <Route path="games" element={<GamesPage />} />
            <Route path="chat" element={<ChatPage />} />
            <Route path="*" element={<Navigate to="/" replace />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </I18nProvider>
  </StrictMode>
);
