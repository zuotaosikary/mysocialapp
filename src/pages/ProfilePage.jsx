import { useOutletContext } from "react-router-dom";
import { useI18n } from "../i18n/I18nContext.jsx";

export default function ProfilePage() {
  const { t } = useI18n();
  const {
    user,
    profile,
    nickname,
    setNickname,
    city,
    setCity,
    age,
    setAge,
    bio,
    setBio,
    interestsText,
    setInterestsText,
    avatarUrl,
    uploadingAvatar,
    uploadAvatar,
    saveProfile,
  } = useOutletContext();

  return (
    <section className="relative z-10 px-8 md:px-16 py-16">
      <div className="max-w-4xl mx-auto rounded-[36px] border border-white/10 bg-white/5 p-8 backdrop-blur-3xl">
        <div className="flex items-center justify-between gap-4 mb-8 flex-wrap">
          <div>
            <h2 className="text-4xl font-black">{t("profile_page_title")}</h2>
            <p className="mt-2 text-gray-300">{t("profile_page_desc")}</p>
          </div>
          {profile && (
            <div className="text-sm text-green-300">
              {t("profile_current")}
              {profile.nickname || t("profile_no_nickname")}
            </div>
          )}
        </div>

        {!user ? (
          <div className="rounded-3xl border border-white/10 bg-black/30 p-6 text-gray-300">
            {t("profile_login_hint")}
          </div>
        ) : (
          <div className="grid lg:grid-cols-[240px,1fr] gap-8">
            <div className="space-y-4">
              <div className="rounded-[28px] border border-white/10 bg-black/30 p-4">
                {avatarUrl ? (
                  <img
                    src={avatarUrl}
                    alt={t("avatar_alt")}
                    className="w-full aspect-square rounded-[24px] object-cover border border-white/20"
                  />
                ) : (
                  <div className="w-full aspect-square rounded-[24px] bg-white/5 border border-white/10 flex items-center justify-center text-gray-500">
                    {t("avatar_alt")}
                  </div>
                )}
              </div>

              <input
                type="file"
                accept="image/*"
                onChange={uploadAvatar}
                className="w-full px-5 py-4 rounded-2xl bg-black/40 border border-white/10 outline-none"
              />

              {uploadingAvatar && <p className="text-sm text-gray-400">{t("avatar_uploading")}</p>}
            </div>

            <div className="space-y-4">
              <input
                value={nickname}
                onChange={(e) => setNickname(e.target.value)}
                placeholder={t("ph_nickname")}
                className="w-full px-5 py-4 rounded-2xl bg-black/40 border border-white/10 outline-none"
              />

              <input
                value={city}
                onChange={(e) => setCity(e.target.value)}
                placeholder={t("ph_city")}
                className="w-full px-5 py-4 rounded-2xl bg-black/40 border border-white/10 outline-none"
              />

              <input
                value={age}
                onChange={(e) => setAge(e.target.value)}
                placeholder={t("ph_age")}
                type="number"
                className="w-full px-5 py-4 rounded-2xl bg-black/40 border border-white/10 outline-none"
              />

              <textarea
                value={bio}
                onChange={(e) => setBio(e.target.value)}
                placeholder={t("ph_bio")}
                className="w-full px-5 py-4 rounded-2xl bg-black/40 border border-white/10 outline-none min-h-[140px]"
              />

              <input
                value={interestsText}
                onChange={(e) => setInterestsText(e.target.value)}
                placeholder={t("ph_interests")}
                className="w-full px-5 py-4 rounded-2xl bg-black/40 border border-white/10 outline-none"
              />

              <button
                type="button"
                onClick={saveProfile}
                className="w-full py-4 rounded-2xl bg-gradient-to-r from-pink-500 to-blue-500 font-bold text-lg hover:scale-[1.02] transition"
              >
                {t("btn_save_profile")}
              </button>
            </div>
          </div>
        )}
      </div>
    </section>
  );
}
