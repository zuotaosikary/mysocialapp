import { startTransition, useEffect, useMemo, useRef, useState } from "react";
import { supabase } from "../lib/supabaseClient";
import { translateChatText } from "../lib/chatTranslate.js";

export function useAppState({ t, locale }) {
  const [authMode, setAuthMode] = useState("login");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [country, setCountry] = useState("中国 China");
  const [session, setSession] = useState(null);
  const [authLoading, setAuthLoading] = useState(false);
  const [authMessage, setAuthMessage] = useState("");
  const [user, setUser] = useState(null);
  const [profile, setProfile] = useState(null);
  const [nickname, setNickname] = useState("");
  const [city, setCity] = useState("");
  const [age, setAge] = useState("");
  const [bio, setBio] = useState("");
  const [avatarUrl, setAvatarUrl] = useState("");
  const [uploadingAvatar, setUploadingAvatar] = useState(false);
  const [interestsText, setInterestsText] = useState("");
  const [discoverProfiles, setDiscoverProfiles] = useState([]);
  const [loadingDiscover, setLoadingDiscover] = useState(false);
  const [currentCardIndex, setCurrentCardIndex] = useState(0);
  const [matches, setMatches] = useState([]);
  const [selectedMatch, setSelectedMatch] = useState(null);
  const [messages, setMessages] = useState([]);
  const [messageText, setMessageText] = useState("");
  const [messageTranslations, setMessageTranslations] = useState({});
  const authDeferredNonce = useRef(0);

  const currentProfileCountry = profile?.country || country;
  const translationTargetLang = useMemo(() => {
    if (currentProfileCountry.includes("中国")) return "zh";
    if (currentProfileCountry.includes("Россия")) return "ru";
    return locale === "zh" ? "zh" : "ru";
  }, [currentProfileCountry, locale]);

  const profiles = useMemo(
    () => discoverProfiles.slice(currentCardIndex),
    [discoverProfiles, currentCardIndex]
  );

  const shouldTranslateMessage = (content) => {
    const trimmed = content?.trim();
    if (!trimmed) return false;
    if (translationTargetLang === "zh") {
      return /[Ѐ-ӿ]/.test(trimmed) && !/[一-鿿]/.test(trimmed);
    }
    return /[一-鿿]/.test(trimmed) && !/[Ѐ-ӿ]/.test(trimmed);
  };

  useEffect(() => {
    let cancelled = false;

    async function autoTranslateMessages() {
      const pendingMessages = messages.filter(
        (msg) => !messageTranslations[msg.id] && shouldTranslateMessage(msg.content)
      );

      if (!pendingMessages.length) return;

      try {
        const translatedEntries = await Promise.all(
          pendingMessages.map(async (msg) => [
            msg.id,
            await translateChatText(msg.content, translationTargetLang),
          ])
        );

        if (cancelled) return;

        setMessageTranslations((prev) => {
          const next = { ...prev };
          for (const [id, translated] of translatedEntries) {
            next[id] = translated;
          }
          return next;
        });
      } catch (err) {
        if (!cancelled) {
          alert(t("chat_translate_fail") + (err?.message || String(err)));
        }
      }
    }

    void autoTranslateMessages();

    return () => {
      cancelled = true;
    };
  }, [messages, messageTranslations, t, translationTargetLang]);

  useEffect(() => {
    let cancelled = false;

    const { data: listener } = supabase.auth.onAuthStateChange(
      (_event, authSession) => {
        if (cancelled) return;
        setSession(authSession ?? null);
        const currentUser = authSession?.user ?? null;
        setUser(currentUser);

        if (currentUser) {
          const accessToken = authSession?.access_token;
          const nonce = ++authDeferredNonce.current;
          setTimeout(() => {
            void (async () => {
              if (cancelled || nonce !== authDeferredNonce.current) return;
              await fetchProfile(currentUser);
              if (cancelled || nonce !== authDeferredNonce.current) return;
              await fetchDiscoverProfiles(currentUser, accessToken);
              if (cancelled || nonce !== authDeferredNonce.current) return;
              await fetchMatches(currentUser, accessToken);
            })();
          }, 0);
        } else {
          authDeferredNonce.current += 1;
          setProfile(null);
          setDiscoverProfiles([]);
          setMatches([]);
          setSelectedMatch(null);
          setMessages([]);
        }
      }
    );

    return () => {
      cancelled = true;
      listener.subscription.unsubscribe();
    };
  }, []);

  async function fetchProfile(currentUser) {
    const { data, error } = await supabase
      .from("profiles")
      .select("*")
      .eq("id", currentUser.id)
      .maybeSingle();

    if (error) {
      alert(error.message);
    }

    if (data) {
      setProfile(data);
      setCountry(data.country || country);
      setNickname(data.nickname || "");
      setCity(data.city || "");
      setAge(data.age || "");
      setBio(data.bio || "");
      setAvatarUrl(data.avatar_url || "");
      setInterestsText((data.interests || []).join(", "));
    }
  }

  async function handleAuthSubmit(event) {
    event.preventDefault();
    setAuthMessage("");

    if (!email || !password) {
      setAuthMessage(t("auth_fill_email_password"));
      return;
    }

    if (password.length < 6) {
      setAuthMessage(t("auth_password_min"));
      return;
    }

    setAuthLoading(true);

    try {
      if (authMode === "register") {
        const { error } = await supabase.auth.signUp({
          email,
          password,
          options: {
            data: {
              country,
              display_name: email.split("@")[0],
            },
          },
        });

        if (error) throw error;
        setAuthMessage(t("auth_register_ok"));
      } else {
        const { error } = await supabase.auth.signInWithPassword({
          email,
          password,
        });

        if (error) throw error;
        setAuthMessage(t("auth_login_ok"));
      }
    } catch (error) {
      setAuthMessage(error.message || t("auth_op_fail"));
    } finally {
      setAuthLoading(false);
    }
  }

  async function uploadAvatar(event) {
    const file = event.target.files?.[0];
    if (!file) return;
    if (!user) {
      alert(t("alert_login_first"));
      return;
    }

    setUploadingAvatar(true);

    try {
      const fileExt = file.name.split(".").pop();
      const filePath = `${user.id}/${Date.now()}.${fileExt}`;
      const apiKey = supabase.supabaseKey;
      const projectUrl = supabase.supabaseUrl;
      const accessToken = session?.access_token;

      if (!accessToken) {
        throw new Error(t("alert_no_token"));
      }

      const uploadUrl = `${projectUrl}/storage/v1/object/avatars/${filePath}`;
      const response = await fetch(uploadUrl, {
        method: "POST",
        headers: {
          apikey: apiKey,
          Authorization: `Bearer ${accessToken}`,
          "Content-Type": file.type,
          "x-upsert": "true",
        },
        body: file,
      });

      const text = await response.text();
      if (!response.ok) {
        throw new Error(text);
      }

      const publicUrl = `${projectUrl}/storage/v1/object/public/avatars/${filePath}`;
      setAvatarUrl(publicUrl);
      alert(t("alert_avatar_ok"));
    } catch (error) {
      alert(t("alert_avatar_fail") + error.message);
    } finally {
      setUploadingAvatar(false);
    }
  }

  async function saveProfile() {
    if (!user || !session) {
      alert(t("alert_login_first"));
      return;
    }

    const payload = {
      id: user.id,
      email: user.email,
      nickname,
      country,
      city,
      age: age ? Number(age) : null,
      bio,
      avatar_url: avatarUrl,
      interests: interestsText
        .split(",")
        .map((item) => item.trim())
        .filter(Boolean),
      updated_at: new Date().toISOString(),
    };

    const apiKey = supabase.supabaseKey;
    const projectUrl = supabase.supabaseUrl;
    const accessToken = session.access_token;
    const url = `${projectUrl}/rest/v1/profiles`;

    try {
      const response = await fetch(url, {
        method: "POST",
        headers: {
          apikey: apiKey,
          Authorization: `Bearer ${accessToken}`,
          "Content-Type": "application/json",
          Prefer: "resolution=merge-duplicates,return=representation",
        },
        body: JSON.stringify(payload),
      });

      const text = await response.text();
      if (!response.ok) {
        alert(t("alert_save_fail") + text);
        return;
      }

      const data = text ? JSON.parse(text) : [];
      setProfile(data[0] || payload);
      await fetchDiscoverProfiles(user);
      alert(t("alert_save_ok"));
    } catch (error) {
      alert(t("alert_save_error") + error.message);
    }
  }

  async function fetchDiscoverProfiles(currentUser, accessTokenOverride) {
    setLoadingDiscover(true);

    try {
      const apiKey = supabase.supabaseKey;
      const projectUrl = supabase.supabaseUrl;
      const accessToken = accessTokenOverride ?? session?.access_token;
      const url = `${projectUrl}/rest/v1/profiles?select=*&order=updated_at.desc`;
      const response = await fetch(url, {
        method: "GET",
        headers: {
          apikey: apiKey,
          Authorization: `Bearer ${accessToken}`,
        },
      });

      const text = await response.text();
      if (!response.ok) {
        throw new Error(text);
      }

      const data = text ? JSON.parse(text) : [];
      setDiscoverProfiles(data || []);
      setCurrentCardIndex(0);
    } catch (error) {
      alert(t("alert_profiles_fail") + error.message);
    } finally {
      setLoadingDiscover(false);
    }
  }

  async function fetchMatches(explicitUser, explicitAccessToken) {
    const activeUser = explicitUser?.id ? explicitUser : user;
    const accessToken = explicitAccessToken ?? session?.access_token;
    if (!activeUser?.id || !accessToken) return;

    const apiKey = supabase.supabaseKey;
    const projectUrl = supabase.supabaseUrl;
    const url = `${projectUrl}/rest/v1/matches?select=*&or=(user1_id.eq.${activeUser.id},user2_id.eq.${activeUser.id})&order=created_at.desc`;
    const response = await fetch(url, {
      headers: {
        apikey: apiKey,
        Authorization: `Bearer ${accessToken}`,
      },
    });

    const text = await response.text();
    if (!response.ok) {
      alert(t("alert_matches_fail") + text);
      return;
    }

    const list = text ? JSON.parse(text) : [];
    const selfId = activeUser.id;
    const peerIds = [
      ...new Set(
        list.map((m) => (m.user1_id === selfId ? m.user2_id : m.user1_id)).filter(Boolean)
      ),
    ];

    let profileById = new Map();
    if (peerIds.length > 0) {
      const inList = peerIds.join(",");
      const profilesUrl = `${projectUrl}/rest/v1/profiles?select=id,nickname,avatar_url&id=in.(${inList})`;
      const pRes = await fetch(profilesUrl, {
        headers: {
          apikey: apiKey,
          Authorization: `Bearer ${accessToken}`,
        },
      });
      const pText = await pRes.text();
      if (pRes.ok && pText) {
        try {
          const rows = JSON.parse(pText);
          profileById = new Map(rows.map((r) => [r.id, r]));
        } catch {
          // ignore profile parse errors
        }
      }
    }

    const enriched = list.map((m) => {
      const peerId = m.user1_id === selfId ? m.user2_id : m.user1_id;
      return { ...m, peer_profile: profileById.get(peerId) ?? null };
    });

    setMatches(enriched);
  }

  async function handleLike(targetProfile) {
    if (!user || !session) {
      alert(t("alert_login_first"));
      return;
    }

    if (!targetProfile?.id) {
      alert(t("alert_no_profile"));
      return;
    }

    const payload = {
      from_user_id: user.id,
      to_user_id: targetProfile.id,
    };

    try {
      const apiKey = supabase.supabaseKey;
      const projectUrl = supabase.supabaseUrl;
      const accessToken = session.access_token;
      const likeUrl = `${projectUrl}/rest/v1/likes?on_conflict=from_user_id,to_user_id`;

      const likeResponse = await fetch(likeUrl, {
        method: "POST",
        headers: {
          apikey: apiKey,
          Authorization: `Bearer ${accessToken}`,
          "Content-Type": "application/json",
          Prefer: "resolution=merge-duplicates,return=representation",
        },
        body: JSON.stringify(payload),
      });

      const likeText = await likeResponse.text();
      if (!likeResponse.ok) {
        alert(t("alert_like_fail") + likeText);
        return;
      }

      const checkUrl = `${projectUrl}/rest/v1/likes?select=*&from_user_id=eq.${targetProfile.id}&to_user_id=eq.${user.id}`;
      const checkResponse = await fetch(checkUrl, {
        method: "GET",
        headers: {
          apikey: apiKey,
          Authorization: `Bearer ${accessToken}`,
        },
      });

      const checkText = await checkResponse.text();
      const reverseLikes = checkText ? JSON.parse(checkText) : [];

      if (reverseLikes.length > 0) {
        const user1_id = user.id < targetProfile.id ? user.id : targetProfile.id;
        const user2_id = user.id < targetProfile.id ? targetProfile.id : user.id;
        const matchPayload = { user1_id, user2_id };
        const matchUrl = `${projectUrl}/rest/v1/matches?on_conflict=user1_id,user2_id`;

        const matchResponse = await fetch(matchUrl, {
          method: "POST",
          headers: {
            apikey: apiKey,
            Authorization: `Bearer ${accessToken}`,
            "Content-Type": "application/json",
            Prefer: "resolution=merge-duplicates,return=representation",
          },
          body: JSON.stringify(matchPayload),
        });

        const matchText = await matchResponse.text();
        if (!matchResponse.ok) {
          alert(t("alert_match_create_fail") + matchText);
          return;
        }

        alert(
          t("alert_match_success", {
            name: targetProfile.nickname || t("common_this_user"),
          })
        );
        await fetchMatches();
      }

      setCurrentCardIndex((prev) => prev + 1);
    } catch (error) {
      alert(t("alert_like_error") + error.message);
    }
  }

  async function handleSignOut() {
    setAuthMessage("");
    authDeferredNonce.current += 1;
    try {
      const { error } = await supabase.auth.signOut({ scope: "local" });
      if (error) throw error;
    } catch (err) {
      const msg = err?.message || String(err);
      setAuthMessage(msg);
      alert(t("auth_signout_fail") + msg);
      return;
    }

    setSession(null);
    setUser(null);
    setProfile(null);
    setDiscoverProfiles([]);
    setMatches([]);
    setSelectedMatch(null);
    setMessages([]);
    setEmail("");
    setPassword("");
    setAuthMessage(t("auth_signed_out"));
  }

  async function fetchMessages(match) {
    if (!session) return;

    setSelectedMatch(match);
    startTransition(() => {
      setMessages([]);
      setMessageTranslations({});
    });

    const apiKey = supabase.supabaseKey;
    const projectUrl = supabase.supabaseUrl;
    const accessToken = session.access_token;
    const url = `${projectUrl}/rest/v1/messages?select=*&match_id=eq.${match.id}&order=created_at.asc`;
    const response = await fetch(url, {
      headers: {
        apikey: apiKey,
        Authorization: `Bearer ${accessToken}`,
      },
    });

    const text = await response.text();
    if (!response.ok) {
      alert(t("alert_messages_fail") + text);
      return;
    }

    setMessages(text ? JSON.parse(text) : []);
  }

  async function sendMessage() {
    if (!user || !session || !selectedMatch) {
      alert(t("alert_pick_match"));
      return;
    }

    if (!messageText.trim()) return;

    const payload = {
      match_id: selectedMatch.id,
      sender_id: user.id,
      content: messageText.trim(),
    };

    const apiKey = supabase.supabaseKey;
    const projectUrl = supabase.supabaseUrl;
    const accessToken = session.access_token;

    const response = await fetch(`${projectUrl}/rest/v1/messages`, {
      method: "POST",
      headers: {
        apikey: apiKey,
        Authorization: `Bearer ${accessToken}`,
        "Content-Type": "application/json",
        Prefer: "return=representation",
      },
      body: JSON.stringify(payload),
    });

    const text = await response.text();
    if (!response.ok) {
      alert(t("alert_send_fail") + text);
      return;
    }

    setMessageText("");
    await fetchMessages(selectedMatch);
  }

  return {
    authMode,
    setAuthMode,
    email,
    setEmail,
    password,
    setPassword,
    country,
    setCountry,
    session,
    authLoading,
    authMessage,
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
    avatarUrl,
    uploadingAvatar,
    interestsText,
    setInterestsText,
    discoverProfiles,
    loadingDiscover,
    currentCardIndex,
    setCurrentCardIndex,
    matches,
    selectedMatch,
    messages,
    messageText,
    setMessageText,
    messageTranslations,
    profiles,
    translationTargetLang,
    handleAuthSubmit,
    uploadAvatar,
    saveProfile,
    fetchDiscoverProfiles,
    fetchMatches,
    handleLike,
    handleSignOut,
    fetchMessages,
    sendMessage,
  };
}
