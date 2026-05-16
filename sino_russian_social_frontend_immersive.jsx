export default function SinoRussianDatingApp() {
  const authModes = ["登录", "注册"];
  const currentMode = "登录";
  const profiles = [
    {
      name: "Anastasia",
      city: "Moscow",
      age: 24,
      bio: "喜欢中国文化、奶茶和旅行。",
      image: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?q=80&w=1200&auto=format&fit=crop"
    },
    {
      name: "Dmitry",
      city: "Saint Petersburg",
      age: 28,
      bio: "正在学习中文，希望认识有趣的人。",
      image: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?q=80&w=1200&auto=format&fit=crop"
    },
    {
      name: "Elena",
      city: "Novosibirsk",
      age: 22,
      bio: "摄影、音乐、冬天的雪。",
      image: "https://images.unsplash.com/photo-1488426862026-3ee34a7d66df?q=80&w=1200&auto=format&fit=crop"
    }
  ];

  return (
    <div className="min-h-screen bg-black text-white overflow-hidden relative">
      {/* Background */}
      <div className="absolute inset-0">
        <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1519608487953-e999c86e7455?q=80&w=1600&auto=format&fit=crop')] bg-cover bg-center opacity-30" />
        <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-black/80 to-black" />
      </div>

      {/* Floating Blur Effects */}
      <div className="absolute top-10 left-10 w-72 h-72 bg-pink-500/20 rounded-full blur-3xl animate-pulse" />
      <div className="absolute bottom-20 right-10 w-96 h-96 bg-blue-500/20 rounded-full blur-3xl animate-pulse" />

      {/* Navbar */}
      <header className="relative z-10 flex items-center justify-between px-8 py-6 border-b border-white/10 backdrop-blur-xl bg-white/5">
        <div>
          <h1 className="text-3xl font-bold tracking-widest">TAO LINK</h1>
          <p className="text-sm text-gray-300">中国 × 俄罗斯 沉浸式社交平台</p>
        </div>

        <nav className="hidden md:flex gap-8 text-sm text-gray-300">
          <a href="#" className="hover:text-white transition">发现</a>
          <a href="#" className="hover:text-white transition">动态</a>
          <a href="#" className="hover:text-white transition">直播</a>
          <a href="#" className="hover:text-white transition">AI翻译聊天</a>
        </nav>

        <button className="px-5 py-2 rounded-full bg-white text-black font-semibold hover:scale-105 transition">
          登录
        </button>
      </header>

      {/* Hero Section */}
      {/* Auth Section */}
      <section className="relative z-10 px-6 md:px-16 pt-12">
        <div className="max-w-7xl mx-auto grid lg:grid-cols-2 gap-12 items-center">
          <div>
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-pink-500/10 border border-pink-500/20 backdrop-blur-xl mb-6">
              <span className="w-2 h-2 bg-pink-400 rounded-full animate-pulse" />
              <span className="text-sm text-pink-200">全球年轻人正在加入</span>
            </div>

            <h2 className="text-5xl md:text-6xl font-black leading-tight tracking-tight">
              不只是社交，
              <span className="bg-gradient-to-r from-pink-400 to-blue-400 bg-clip-text text-transparent">
                而是进入另一个世界
              </span>
            </h2>

            <p className="mt-6 text-lg text-gray-300 max-w-xl leading-relaxed">
              创建你的国际身份卡，开启中俄年轻人的沉浸式互动体验。
            </p>
          </div>

          <div className="relative">
            <div className="rounded-[36px] border border-white/10 bg-white/5 backdrop-blur-3xl p-8 shadow-2xl overflow-hidden relative">
              <div className="absolute inset-0 bg-gradient-to-br from-pink-500/10 to-blue-500/10" />

              <div className="relative z-10">
                <div className="flex gap-3 mb-8">
                  {authModes.map((mode) => (
                    <button
                      key={mode}
                      className={`px-6 py-3 rounded-2xl transition font-semibold ${
                        currentMode === mode
                          ? "bg-white text-black"
                          : "bg-white/5 text-gray-300 border border-white/10"
                      }`}
                    >
                      {mode}
                    </button>
                  ))}
                </div>

                <div className="space-y-5">
                  <div>
                    <label className="text-sm text-gray-400 block mb-2">
                      邮箱 / Email
                    </label>
                    <input
                      type="email"
                      placeholder="your@email.com"
                      className="w-full px-5 py-4 rounded-2xl bg-black/40 border border-white/10 focus:outline-none focus:border-pink-400 transition"
                    />
                  </div>

                  <div>
                    <label className="text-sm text-gray-400 block mb-2">
                      密码 / Password
                    </label>
                    <input
                      type="password"
                      placeholder="••••••••"
                      className="w-full px-5 py-4 rounded-2xl bg-black/40 border border-white/10 focus:outline-none focus:border-pink-400 transition"
                    />
                  </div>

                  <div>
                    <label className="text-sm text-gray-400 block mb-2">
                      国家 / Country
                    </label>
                    <select className="w-full px-5 py-4 rounded-2xl bg-black/40 border border-white/10 focus:outline-none focus:border-pink-400 transition text-gray-300">
                      <option>中国 China</option>
                      <option>Россия Russia</option>
                    </select>
                  </div>

                  <button className="w-full py-4 rounded-2xl bg-gradient-to-r from-pink-500 to-blue-500 font-bold text-lg hover:scale-[1.02] transition shadow-2xl">
                    开始匹配世界
                  </button>
                </div>

                <div className="mt-8">
                  <div className="flex items-center gap-3 text-gray-500 text-sm mb-5">
                    <div className="h-px flex-1 bg-white/10" />
                    或使用
                    <div className="h-px flex-1 bg-white/10" />
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <button className="py-4 rounded-2xl bg-white/5 border border-white/10 hover:bg-white/10 transition">
                      微信登录
                    </button>

                    <button className="py-4 rounded-2xl bg-white/5 border border-white/10 hover:bg-white/10 transition">
                      Telegram
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="relative z-10 px-8 md:px-16 pt-20 pb-16 grid lg:grid-cols-2 gap-12 items-center">
        <div>
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/10 border border-white/10 backdrop-blur-xl mb-6">
            <span className="w-2 h-2 bg-green-400 rounded-full animate-ping" />
            <span className="text-sm text-gray-200">全球实时在线匹配</span>
          </div>

          <h2 className="text-5xl md:text-7xl font-black leading-tight tracking-tight">
            遇见
            <span className="bg-gradient-to-r from-pink-400 to-blue-400 bg-clip-text text-transparent">
              跨越国界
            </span>
            的心动
          </h2>

          <p className="mt-8 text-lg text-gray-300 max-w-xl leading-relaxed">
            一个专为中国与俄罗斯年轻人打造的沉浸式交友社区。
            AI实时翻译、视频互动、虚拟城市漫游，让距离感彻底消失。
          </p>

          <div className="mt-10 flex flex-wrap gap-4">
            <button className="px-8 py-4 rounded-2xl bg-gradient-to-r from-pink-500 to-red-500 font-semibold shadow-2xl hover:scale-105 transition">
              开始匹配
            </button>

            <button className="px-8 py-4 rounded-2xl border border-white/20 backdrop-blur-xl bg-white/5 hover:bg-white/10 transition">
              观看演示
            </button>
          </div>

          {/* Stats */}
          <div className="mt-14 grid grid-cols-3 gap-6 max-w-lg">
            <div>
              <div className="text-3xl font-bold">120K+</div>
              <div className="text-sm text-gray-400 mt-1">全球用户</div>
            </div>

            <div>
              <div className="text-3xl font-bold">24h</div>
              <div className="text-sm text-gray-400 mt-1">实时互动</div>
            </div>

            <div>
              <div className="text-3xl font-bold">AI</div>
              <div className="text-sm text-gray-400 mt-1">双语翻译</div>
            </div>
          </div>
        </div>

        {/* Floating Cards */}
        <div className="relative flex justify-center">
          <div className="relative w-[360px] h-[600px]">
            {profiles.map((profile, index) => (
              <div
                key={profile.name}
                className="absolute inset-0 rounded-[32px] overflow-hidden border border-white/10 shadow-2xl backdrop-blur-2xl"
                style={{
                  transform: `translateY(${index * 18}px) rotate(${index % 2 === 0 ? -4 : 4}deg)`,
                  zIndex: profiles.length - index
                }}
              >
                <img
                  src={profile.image}
                  alt={profile.name}
                  className="w-full h-full object-cover"
                />

                <div className="absolute inset-0 bg-gradient-to-t from-black via-black/30 to-transparent" />

                <div className="absolute bottom-0 left-0 right-0 p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <h3 className="text-3xl font-bold">
                        {profile.name}, {profile.age}
                      </h3>
                      <p className="text-gray-300 mt-1">📍 {profile.city}</p>
                    </div>

                    <button className="w-14 h-14 rounded-full bg-pink-500/90 backdrop-blur-xl text-2xl hover:scale-110 transition">
                      ❤
                    </button>
                  </div>

                  <p className="mt-4 text-gray-200 leading-relaxed">
                    {profile.bio}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Features */}
      <section className="relative z-10 px-8 md:px-16 py-20">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h3 className="text-5xl font-black">沉浸式体验</h3>
            <p className="mt-4 text-gray-400 text-lg">
              不只是聊天，而是真正的跨国互动社区。
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            <div className="p-8 rounded-[32px] bg-white/5 border border-white/10 backdrop-blur-2xl hover:translate-y-[-6px] transition">
              <div className="text-5xl mb-6">🌍</div>
              <h4 className="text-2xl font-bold mb-4">AI实时翻译</h4>
              <p className="text-gray-400 leading-relaxed">
                无障碍中俄交流，实时语音翻译和字幕同步，让聊天自然流畅。
              </p>
            </div>

            <div className="p-8 rounded-[32px] bg-white/5 border border-white/10 backdrop-blur-2xl hover:translate-y-[-6px] transition">
              <div className="text-5xl mb-6">🎥</div>
              <h4 className="text-2xl font-bold mb-4">虚拟城市漫游</h4>
              <p className="text-gray-400 leading-relaxed">
                在数字化莫斯科与深圳街景中互动，像游戏一样认识新朋友。
              </p>
            </div>

            <div className="p-8 rounded-[32px] bg-white/5 border border-white/10 backdrop-blur-2xl hover:translate-y-[-6px] transition">
              <div className="text-5xl mb-6">💫</div>
              <h4 className="text-2xl font-bold mb-4">AI匹配系统</h4>
              <p className="text-gray-400 leading-relaxed">
                基于兴趣、性格与文化偏好进行深度推荐，提升真实连接感。
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Tinder Match System */}
      <section className="relative z-10 px-8 md:px-16 py-24 overflow-hidden">
        <div className="max-w-7xl mx-auto grid lg:grid-cols-2 gap-16 items-center">
          <div>
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-pink-500/10 border border-pink-500/20 backdrop-blur-xl mb-6">
              <span className="w-2 h-2 bg-pink-400 rounded-full animate-pulse" />
              <span className="text-sm text-pink-200">AI智能匹配系统</span>
            </div>

            <h3 className="text-5xl md:text-6xl font-black leading-tight">
              下一次滑动，
              <span className="bg-gradient-to-r from-pink-400 to-blue-400 bg-clip-text text-transparent">
                可能改变人生
              </span>
            </h3>

            <p className="mt-8 text-lg text-gray-300 max-w-xl leading-relaxed">
              通过兴趣、性格、文化偏好与AI分析，匹配真正适合你的跨国连接。
            </p>

            <div className="mt-10 grid gap-5">
              <div className="p-5 rounded-3xl bg-white/5 border border-white/10 backdrop-blur-xl">
                <div className="text-xl font-bold">🎯 AI兴趣匹配</div>
                <p className="text-gray-400 mt-2">分析音乐、旅行、电影与生活方式偏好。</p>
              </div>

              <div className="p-5 rounded-3xl bg-white/5 border border-white/10 backdrop-blur-xl">
                <div className="text-xl font-bold">🌍 中俄文化标签</div>
                <p className="text-gray-400 mt-2">自动推荐文化兴趣接近的人群。</p>
              </div>
            </div>
          </div>

          <div className="relative flex justify-center">
            <div className="relative w-[360px] h-[640px]">
              <div className="absolute inset-0 rounded-[40px] bg-gradient-to-br from-blue-500/20 to-pink-500/20 blur-3xl" />

              <div className="absolute inset-0 rounded-[40px] overflow-hidden border border-white/10 bg-black/30 backdrop-blur-3xl shadow-2xl rotate-[-6deg] translate-x-[-20px] translate-y-[20px] opacity-40">
                <img
                  src="https://images.unsplash.com/photo-1524504388940-b1c1722653e1?q=80&w=1200&auto=format&fit=crop"
                  className="w-full h-full object-cover"
                />
              </div>

              <div className="absolute inset-0 rounded-[40px] overflow-hidden border border-white/10 bg-black/30 backdrop-blur-3xl shadow-2xl rotate-[5deg] translate-x-[20px] translate-y-[10px] opacity-50">
                <img
                  src="https://images.unsplash.com/photo-1517841905240-472988babdf9?q=80&w=1200&auto=format&fit=crop"
                  className="w-full h-full object-cover"
                />
              </div>

              <div className="absolute inset-0 rounded-[40px] overflow-hidden border border-white/10 shadow-2xl bg-black">
                <img
                  src="https://images.unsplash.com/photo-1494790108377-be9c29b29330?q=80&w=1200&auto=format&fit=crop"
                  className="w-full h-full object-cover"
                />

                <div className="absolute inset-0 bg-gradient-to-t from-black via-black/20 to-transparent" />

                <div className="absolute top-6 left-6 right-6 flex items-center justify-between">
                  <div className="px-4 py-2 rounded-full bg-black/40 border border-white/10 backdrop-blur-xl text-sm">
                    🇷🇺 Moscow
                  </div>

                  <div className="px-4 py-2 rounded-full bg-pink-500/80 backdrop-blur-xl text-sm font-semibold">
                    98% Match
                  </div>
                </div>

                <div className="absolute bottom-28 left-6 right-6">
                  <h4 className="text-4xl font-black">Anastasia, 24</h4>
                  <p className="mt-3 text-gray-300 leading-relaxed">
                    喜欢中国文化、摄影、电子音乐和深夜散步。
                  </p>

                  <div className="mt-5 flex flex-wrap gap-3">
                    <span className="px-4 py-2 rounded-full bg-white/10 border border-white/10 text-sm">摄影</span>
                    <span className="px-4 py-2 rounded-full bg-white/10 border border-white/10 text-sm">旅行</span>
                    <span className="px-4 py-2 rounded-full bg-white/10 border border-white/10 text-sm">中文学习</span>
                  </div>
                </div>

                <div className="absolute bottom-6 left-0 right-0 flex justify-center gap-6">
                  <button className="w-20 h-20 rounded-full bg-white/10 border border-white/10 backdrop-blur-xl text-4xl hover:scale-110 transition">
                    ❌
                  </button>

                  <button className="w-24 h-24 rounded-full bg-gradient-to-r from-pink-500 to-red-500 shadow-2xl text-5xl hover:scale-110 transition">
                    ❤
                  </button>

                  <button className="w-20 h-20 rounded-full bg-white/10 border border-white/10 backdrop-blur-xl text-4xl hover:scale-110 transition">
                    ⭐
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Personal Profile */}
      <section className="relative z-10 px-8 md:px-16 py-24">
        <div className="max-w-6xl mx-auto rounded-[40px] overflow-hidden border border-white/10 bg-white/5 backdrop-blur-3xl">
          <div className="relative h-[320px] overflow-hidden">
            <img
              src="https://images.unsplash.com/photo-1519608487953-e999c86e7455?q=80&w=1600&auto=format&fit=crop"
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black via-black/20 to-transparent" />
          </div>

          <div className="relative px-8 md:px-12 pb-12">
            <div className="flex flex-col lg:flex-row lg:items-end lg:justify-between gap-8 -mt-24 relative z-10">
              <div className="flex flex-col lg:flex-row items-start lg:items-end gap-6">
                <img
                  src="https://images.unsplash.com/photo-1494790108377-be9c29b29330?q=80&w=600&auto=format&fit=crop"
                  className="w-40 h-40 rounded-[32px] object-cover border-4 border-black shadow-2xl"
                />

                <div>
                  <h3 className="text-5xl font-black">Anastasia</h3>
                  <div className="mt-3 flex flex-wrap gap-3 text-sm text-gray-300">
                    <span>📍 Moscow</span>
                    <span>🌍 学习中文</span>
                    <span>🎧 Techno Music</span>
                  </div>
                </div>
              </div>

              <div className="flex gap-4">
                <button className="px-8 py-4 rounded-2xl bg-gradient-to-r from-pink-500 to-blue-500 font-bold hover:scale-105 transition">
                  开始聊天
                </button>

                <button className="px-8 py-4 rounded-2xl bg-white/5 border border-white/10 backdrop-blur-xl hover:bg-white/10 transition">
                  关注
                </button>
              </div>
            </div>

            <div className="grid lg:grid-cols-3 gap-8 mt-12">
              <div className="lg:col-span-2 space-y-8">
                <div>
                  <h4 className="text-2xl font-bold mb-4">关于我</h4>
                  <p className="text-gray-300 leading-relaxed text-lg">
                    我喜欢旅行、摄影和探索不同国家的年轻人文化。
                    希望未来能去中国长期生活，也想认识更多真实有趣的人。
                  </p>
                </div>

                <div>
                  <h4 className="text-2xl font-bold mb-4">兴趣标签</h4>
                  <div className="flex flex-wrap gap-4">
                    <span className="px-5 py-3 rounded-2xl bg-white/5 border border-white/10">📸 Photography</span>
                    <span className="px-5 py-3 rounded-2xl bg-white/5 border border-white/10">🎶 Electronic Music</span>
                    <span className="px-5 py-3 rounded-2xl bg-white/5 border border-white/10">☕ Coffee</span>
                    <span className="px-5 py-3 rounded-2xl bg-white/5 border border-white/10">🌃 Night Walk</span>
                  </div>
                </div>
              </div>

              <div className="space-y-6">
                <div className="p-6 rounded-3xl bg-white/5 border border-white/10 backdrop-blur-xl">
                  <div className="text-gray-400 text-sm">匹配度</div>
                  <div className="text-5xl font-black mt-2 bg-gradient-to-r from-pink-400 to-blue-400 bg-clip-text text-transparent">
                    98%
                  </div>
                </div>

                <div className="p-6 rounded-3xl bg-white/5 border border-white/10 backdrop-blur-xl">
                  <div className="text-gray-400 text-sm mb-3">最近动态</div>
                  <div className="space-y-3 text-gray-300">
                    <div>🔥 刚学会用筷子</div>
                    <div>🌃 深圳夜景太震撼</div>
                    <div>☕ 喜欢中国奶茶</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Dynamic Social Feed */}
      <section className="relative z-10 px-8 md:px-16 py-24 overflow-hidden">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col lg:flex-row lg:items-end lg:justify-between gap-8 mb-16">
            <div>
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-pink-500/10 border border-pink-500/20 backdrop-blur-xl mb-6">
                <span className="w-2 h-2 bg-pink-400 rounded-full animate-pulse" />
                <span className="text-sm text-pink-200">全球动态广场</span>
              </div>

              <h3 className="text-5xl md:text-6xl font-black leading-tight">
                看见真实的
                <span className="bg-gradient-to-r from-pink-400 to-blue-400 bg-clip-text text-transparent">
                  中俄年轻人生活
                </span>
              </h3>

              <p className="mt-6 text-lg text-gray-300 max-w-2xl leading-relaxed">
                不只是匹配，而是进入真实的文化交流社区。
                分享旅行、音乐、美食、夜生活与日常瞬间。
              </p>
            </div>

            <div className="flex gap-4 flex-wrap">
              <button className="px-6 py-3 rounded-2xl bg-white text-black font-semibold hover:scale-105 transition">
                推荐
              </button>

              <button className="px-6 py-3 rounded-2xl bg-white/5 border border-white/10 backdrop-blur-xl hover:bg-white/10 transition">
                深圳
              </button>

              <button className="px-6 py-3 rounded-2xl bg-white/5 border border-white/10 backdrop-blur-xl hover:bg-white/10 transition">
                莫斯科
              </button>

              <button className="px-6 py-3 rounded-2xl bg-white/5 border border-white/10 backdrop-blur-xl hover:bg-white/10 transition">
                夜生活
              </button>
            </div>
          </div>

          <div className="grid md:grid-cols-2 xl:grid-cols-3 gap-8">
            <div className="group rounded-[32px] overflow-hidden border border-white/10 bg-white/5 backdrop-blur-2xl hover:translate-y-[-8px] transition duration-500">
              <div className="relative h-[420px] overflow-hidden">
                <img
                  src="https://images.unsplash.com/photo-1524504388940-b1c1722653e1?q=80&w=1200&auto=format&fit=crop"
                  className="w-full h-full object-cover group-hover:scale-110 transition duration-700"
                />

                <div className="absolute inset-0 bg-gradient-to-t from-black via-black/20 to-transparent" />

                <div className="absolute top-5 left-5 flex items-center gap-3 px-4 py-2 rounded-full bg-black/40 backdrop-blur-xl border border-white/10">
                  <img
                    src="https://images.unsplash.com/photo-1494790108377-be9c29b29330?q=80&w=600&auto=format&fit=crop"
                    className="w-10 h-10 rounded-full object-cover"
                  />
                  <div>
                    <div className="font-semibold">Anastasia</div>
                    <div className="text-xs text-gray-300">📍 Moscow</div>
                  </div>
                </div>

                <div className="absolute bottom-5 left-5 right-5">
                  <div className="text-2xl font-bold leading-snug">
                    第一次体验中国火锅🔥
                  </div>

                  <p className="mt-3 text-gray-300 leading-relaxed text-sm">
                    中国朋友带我体验了重庆火锅，真的太辣了，但很上瘾！
                  </p>

                  <div className="mt-5 flex items-center justify-between text-sm text-gray-300">
                    <div className="flex gap-5">
                      <span>❤ 12.8K</span>
                      <span>💬 932</span>
                    </div>

                    <button className="px-4 py-2 rounded-xl bg-white/10 border border-white/10 backdrop-blur-xl hover:bg-white/20 transition">
                      翻译
                    </button>
                  </div>
                </div>
              </div>
            </div>

            <div className="group rounded-[32px] overflow-hidden border border-white/10 bg-white/5 backdrop-blur-2xl hover:translate-y-[-8px] transition duration-500">
              <div className="relative h-[420px] overflow-hidden">
                <img
                  src="https://images.unsplash.com/photo-1517841905240-472988babdf9?q=80&w=1200&auto=format&fit=crop"
                  className="w-full h-full object-cover group-hover:scale-110 transition duration-700"
                />

                <div className="absolute inset-0 bg-gradient-to-t from-black via-black/20 to-transparent" />

                <div className="absolute top-5 left-5 flex items-center gap-3 px-4 py-2 rounded-full bg-black/40 backdrop-blur-xl border border-white/10">
                  <img
                    src="https://images.unsplash.com/photo-1500648767791-00dcc994a43e?q=80&w=600&auto=format&fit=crop"
                    className="w-10 h-10 rounded-full object-cover"
                  />
                  <div>
                    <div className="font-semibold">Dmitry</div>
                    <div className="text-xs text-gray-300">📍 Saint Petersburg</div>
                  </div>
                </div>

                <div className="absolute bottom-5 left-5 right-5">
                  <div className="text-2xl font-bold leading-snug">
                    深圳夜景像赛博朋克城市🌃
                  </div>

                  <p className="mt-3 text-gray-300 leading-relaxed text-sm">
                    第一次来到深圳，感觉像进入未来世界。
                  </p>

                  <div className="mt-5 flex items-center justify-between text-sm text-gray-300">
                    <div className="flex gap-5">
                      <span>❤ 9.3K</span>
                      <span>💬 712</span>
                    </div>

                    <button className="px-4 py-2 rounded-xl bg-white/10 border border-white/10 backdrop-blur-xl hover:bg-white/20 transition">
                      评论
                    </button>
                  </div>
                </div>
              </div>
            </div>

            <div className="group rounded-[32px] overflow-hidden border border-white/10 bg-white/5 backdrop-blur-2xl hover:translate-y-[-8px] transition duration-500">
              <div className="relative h-[420px] overflow-hidden">
                <img
                  src="https://images.unsplash.com/photo-1521572267360-ee0c2909d518?q=80&w=1200&auto=format&fit=crop"
                  className="w-full h-full object-cover group-hover:scale-110 transition duration-700"
                />

                <div className="absolute inset-0 bg-gradient-to-t from-black via-black/20 to-transparent" />

                <div className="absolute top-5 left-5 flex items-center gap-3 px-4 py-2 rounded-full bg-black/40 backdrop-blur-xl border border-white/10">
                  <img
                    src="https://images.unsplash.com/photo-1488426862026-3ee34a7d66df?q=80&w=600&auto=format&fit=crop"
                    className="w-10 h-10 rounded-full object-cover"
                  />
                  <div>
                    <div className="font-semibold">Elena</div>
                    <div className="text-xs text-gray-300">📍 Novosibirsk</div>
                  </div>
                </div>

                <div className="absolute bottom-5 left-5 right-5">
                  <div className="text-2xl font-bold leading-snug">
                    中国年轻人的周末也太热闹了✨
                  </div>

                  <p className="mt-3 text-gray-300 leading-relaxed text-sm">
                    音乐节、咖啡店、Livehouse，完全改变了我对中国的印象。
                  </p>

                  <div className="mt-5 flex items-center justify-between text-sm text-gray-300">
                    <div className="flex gap-5">
                      <span>❤ 18.2K</span>
                      <span>💬 1.2K</span>
                    </div>

                    <button className="px-4 py-2 rounded-xl bg-white/10 border border-white/10 backdrop-blur-xl hover:bg-white/20 transition">
                      关注
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Chat Experience */}
      <section className="relative z-10 px-8 md:px-16 py-24">
        <div className="max-w-7xl mx-auto grid lg:grid-cols-2 gap-12 items-center">
          <div>
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-blue-500/10 border border-blue-500/20 backdrop-blur-xl mb-6">
              <span className="w-2 h-2 bg-blue-400 rounded-full animate-pulse" />
              <span className="text-sm text-blue-200">AI实时双语聊天</span>
            </div>

            <h3 className="text-5xl md:text-6xl font-black leading-tight">
              像在
              <span className="bg-gradient-to-r from-pink-400 to-blue-400 bg-clip-text text-transparent">
                未来世界
              </span>
              里聊天
            </h3>

            <p className="mt-8 text-lg text-gray-300 leading-relaxed max-w-xl">
              自动翻译、语音识别、实时字幕与情绪氛围UI，让跨语言交流不再生硬。
            </p>

            <div className="mt-10 space-y-5">
              <div className="flex items-center gap-4 p-5 rounded-2xl bg-white/5 border border-white/10 backdrop-blur-xl">
                <div className="w-14 h-14 rounded-2xl bg-pink-500/20 flex items-center justify-center text-2xl">🎙</div>
                <div>
                  <div className="font-semibold text-lg">实时语音翻译</div>
                  <div className="text-gray-400 text-sm mt-1">支持中俄双向实时翻译与字幕同步。</div>
                </div>
              </div>
            </div>
          </div>

          <div className="relative flex justify-center">
            <div className="w-full max-w-[420px] rounded-[36px] overflow-hidden border border-white/10 bg-black/40 backdrop-blur-3xl shadow-2xl">
              <div className="flex items-center justify-between px-6 py-5 border-b border-white/10 bg-white/5 backdrop-blur-xl">
                <div className="flex items-center gap-4">
                  <img src="https://images.unsplash.com/photo-1494790108377-be9c29b29330?q=80&w=600&auto=format&fit=crop" className="w-14 h-14 rounded-2xl object-cover" />
                  <div>
                    <div className="font-bold text-lg">Anastasia</div>
                    <div className="text-green-400 text-sm">Online now</div>
                  </div>
                </div>

                <button className="w-12 h-12 rounded-2xl bg-white/5 border border-white/10 text-xl">📹</button>
              </div>

              <div className="p-6 space-y-5 h-[520px] relative bg-gradient-to-b from-transparent to-black/20">
                <div className="flex justify-start">
                  <div className="max-w-[80%] rounded-3xl rounded-bl-md px-5 py-4 bg-white/10 border border-white/10">
                    <p>Привет ✨ 你今天过得怎么样？</p>
                    <div className="mt-2 text-xs text-gray-400">AI翻译：你好，今天过得怎么样？</div>
                  </div>
                </div>

                <div className="flex justify-end">
                  <div className="max-w-[80%] rounded-3xl rounded-br-md px-5 py-4 bg-gradient-to-r from-pink-500 to-blue-500">
                    <p>今天刚到莫斯科，雪景真的很漂亮。</p>
                    <div className="mt-2 text-xs text-white/70">AI翻译：Сегодня я приехал в Москву, снег очень красивый.</div>
                  </div>
                </div>

                <div className="absolute bottom-4 left-4 right-4">
                  <div className="rounded-3xl bg-white/5 border border-white/10 backdrop-blur-2xl p-3 flex items-center gap-3">
                    <button className="w-12 h-12 rounded-2xl bg-white/5 border border-white/10 text-xl">🎤</button>
                    <input placeholder="输入消息..." className="flex-1 bg-transparent outline-none text-white placeholder:text-gray-500" />
                    <button className="px-5 py-3 rounded-2xl bg-gradient-to-r from-pink-500 to-blue-500 font-semibold">发送</button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Footer CTA */}
      <section className="relative z-10 px-8 md:px-16 pb-24">
        <div className="max-w-6xl mx-auto rounded-[40px] overflow-hidden border border-white/10 bg-gradient-to-r from-pink-500/10 to-blue-500/10 backdrop-blur-3xl p-12 text-center">
          <h3 className="text-5xl font-black leading-tight">
            开始你的
            <span className="bg-gradient-to-r from-pink-400 to-blue-400 bg-clip-text text-transparent">
              中俄浪漫冒险
            </span>
          </h3>

          <p className="mt-6 text-gray-300 text-lg max-w-2xl mx-auto">
            未来的跨国社交，不再只是冰冷的聊天框，而是一个有温度、有场景、有沉浸感的数字世界。
          </p>

          <div className="mt-10 flex justify-center gap-4 flex-wrap">
            <button className="px-10 py-4 rounded-2xl bg-white text-black font-bold hover:scale-105 transition">
              免费注册
            </button>

            <button className="px-10 py-4 rounded-2xl border border-white/20 bg-white/5 backdrop-blur-xl hover:bg-white/10 transition">
              加入社区
            </button>
          </div>
        </div>
      </section>
    </div>
  );
}
