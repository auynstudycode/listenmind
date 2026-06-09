/* ListenMind — main app: state, routing, persistence */
const { useState: mS, useEffect: mE } = React;
const LM = window.LM;

const TITLES = {
  learn:   { t: 'Học', s: 'Lộ trình luyện nghe cá nhân hoá' },
  target:  { t: 'Mục tiêu', s: 'Theo dõi tiến độ & kế hoạch tới ngày thi' },
  vocab:   { t: 'Sổ từ vựng', s: 'Toàn bộ từ bạn đã lưu' },
  history: { t: 'Lịch sử học tập', s: 'Tất cả buổi học của bạn' },
  profile: { t: 'Hồ sơ', s: 'Thông tin & thành tích' },
  settings:{ t: 'Cài đặt', s: 'Tài khoản, ngôn ngữ, thông báo' },
  flow:    { t: 'Sơ đồ luồng', s: 'Toàn bộ hành trình người dùng' },
};

function makeTrack(lang, exam) {
  const tk = LM.tracks[lang];
  const levels = exam.levels;
  const level = (lang === 'jp' && exam.id === 'jlpt') ? 'N3'
    : (lang === 'cn' && exam.id === 'hsk') ? 'HSK 3' : levels[0];
  return { lang, flag: tk.flag, name: tk.name, examId: exam.id, examName: exam.name, levels, level };
}

function load(k, d) { try { const v = localStorage.getItem(k); return v ? JSON.parse(v) : d; } catch { return d; } }
function save(k, v) { try { localStorage.setItem(k, JSON.stringify(v)); } catch {} }

function App() {
  const [authed, setAuthed] = mS(() => load('lm_authed', false));
  const [track, setTrack] = mS(() => load('lm_track', null));
  const [screen, setScreen] = mS(() => load('lm_screen', 'home'));
  const [theme, setTheme] = mS(() => load('lm_theme', 'light'));
  const [vocabExtra, setVocabExtra] = mS(() => load('lm_vocab', []));
  const [mobileOpen, setMobileOpen] = mS(false);
  const [lang, setLang] = mS({ open: false, force: false });
  const [active, setActive] = mS(null);   // { lesson, mode } — list-view practice
  const [hub, setHub] = mS(null);          // { lessonId, idx } — lesson hub
  const [checkpoint, setCheckpoint] = mS(null); // synthetic test module
  const [pathProg, setPathProg] = mS(() => load('lm_path_progress', {}));
  const [toasts, setToasts] = mS([]);
  const [authModal, setAuthModal] = mS({ open: false, tab: 'login' });
  const [uiLang, setUiLang] = mS('vi');

  const TWEAK_DEFAULTS = /*EDITMODE-BEGIN*/{ "font": "Nunito", "accent": "#2AACAC", "accent2": "#9379DC", "radius": "Tròn" }/*EDITMODE-END*/;
  const [tw, setTweak] = useTweaks(TWEAK_DEFAULTS);
  mE(() => {
    const r = document.documentElement;
    r.style.setProperty('--font-ui', `"${tw.font}", system-ui, sans-serif`);
    r.style.setProperty('--font-display', `"${tw.font}", system-ui, sans-serif`);
    r.style.setProperty('--teal-600', tw.accent);
    r.style.setProperty('--lav-500', tw.accent2);
    r.style.setProperty('--lav-600', tw.accent2);
    const rad = tw.radius === 'Mềm' ? ['16px', '20px', '26px', '34px']
      : tw.radius === 'Vuông' ? ['7px', '9px', '12px', '16px'] : ['12px', '16px', '22px', '28px'];
    ['--r-sm', '--r-md', '--r-lg', '--r-xl'].forEach((k, i) => r.style.setProperty(k, rad[i]));
  }, [tw]);

  const tweaksUI = (
    <TweaksPanel title="Tweaks">
      <TweakSection label="Kiểu chữ" />
      <TweakSelect label="Font" value={tw.font} options={['Nunito', 'Quicksand', 'Be Vietnam Pro']} onChange={v => setTweak('font', v)} />
      <TweakSection label="Màu sắc" />
      <TweakColor label="Màu chính" value={tw.accent} options={['#2AACAC', '#1F8C8C', '#2E9AC8', '#149A8E']} onChange={v => setTweak('accent', v)} />
      <TweakColor label="Màu phụ" value={tw.accent2} options={['#9379DC', '#F0895C', '#3B93D6', '#E0699A']} onChange={v => setTweak('accent2', v)} />
      <TweakSection label="Hình khối" />
      <TweakRadio label="Bo góc" value={tw.radius} options={['Vuông', 'Tròn', 'Mềm']} onChange={v => setTweak('radius', v)} />
    </TweaksPanel>
  );

  mE(() => save('lm_authed', authed), [authed]);
  mE(() => save('lm_track', track), [track]);
  mE(() => save('lm_screen', screen), [screen]);
  mE(() => { save('lm_theme', theme); document.documentElement.setAttribute('data-theme', theme); }, [theme]);
  mE(() => save('lm_path_progress', pathProg), [pathProg]);
  mE(() => save('lm_vocab', vocabExtra), [vocabExtra]);

  // new user after auth with no track => force language modal
  mE(() => { if (authed && !track) setLang({ open: true, force: true }); }, [authed, track]);

  function toast(kind, title, sub) {
    const id = Math.random().toString(36).slice(2);
    setToasts(t => [...t, { id, kind, title, sub }]);
    setTimeout(() => setToasts(t => t.filter(x => x.id !== id)), 3200);
  }
  function go(s) { setActive(null); setHub(null); setCheckpoint(null); setScreen(s); window.scrollTo(0, 0); }
  window.__lmGo = go;
  function toggleTheme() { setTheme(t => t === 'dark' ? 'light' : 'dark'); }
  function logout() { setAuthed(false); setActive(null); toast('info', 'Đã đăng xuất'); }
  function addVocab(word, lesson) {
    setVocabExtra(v => v.find(x => x.word === word) ? v
      : [{ id: 'vx' + Date.now(), word, reading: '', meaning: '(bạn vừa lưu — bấm để thêm nghĩa)', lang: track?.lang || 'jp', level: track?.level || 'N3', lesson, ex: '', added: 'Hôm nay', state: 'new', note: '' }, ...v]);
  }
  function pickLang(l, exam) {
    const wasNew = !track;
    setTrack(makeTrack(l, exam));
    setLang({ open: false, force: false });
    setScreen('learn');
    toast('success', `Đã chọn ${LM.tracks[l].name}`, `Lộ trình ${exam.name}`);
    if (wasNew) setTimeout(() => toast('info', 'Gợi ý: thiết lập Mục tiêu', 'Để AI lập kế hoạch học tới ngày thi'), 1400);
  }
  function openAuth(tab) { setAuthModal({ open: true, tab }); }
  function switchLang(langId) {
    if (!authed) { openAuth('register'); return; }
    const tk = LM.tracks[langId];
    setTrack(makeTrack(langId, tk.exams[0]));
    setActive(null); setHub(null); setCheckpoint(null); setScreen('learn'); window.scrollTo(0, 0);
    toast('success', `Đang học ${tk.name}`);
  }

  const tk = track || makeTrack('jp', LM.tracks.jp.exams[0]);
  const exam = { name: `${tk.examName} ${tk.level}`, date: LM.target.exam.date };
  const pathKey = `${tk.lang}-${tk.level}`;
  const progressN = pathProg[pathKey] != null ? pathProg[pathKey] : 1;

  function setLevel(lv) { setTrack(t => ({ ...t, level: lv })); setHub(null); setCheckpoint(null); setActive(null); }
  function pathTotal() { const p = LM.pathFor(tk.lang, tk.level); let n = 0; p.sections.forEach(s => n += s.nodes.length); return n; }
  function advanceFrom(idx) {
    if (idx === progressN) {
      const total = pathTotal();
      setPathProg(pp => ({ ...pp, [pathKey]: Math.min(total, (pp[pathKey] != null ? pp[pathKey] : 1) + 1) }));
      toast('success', 'Mở khoá bài tiếp theo!', '+1 bước trên lộ trình');
    }
  }
  function openLesson(lessonId, idx) { setHub({ lessonId, idx }); window.scrollTo(0, 0); }
  function openCheckpoint(node, section) {
    const qs = [];
    section.nodes.forEach(n => { const m = n.lessonId && LM.lessonModules[n.lessonId]; if (m) m.test.forEach((q, k) => qs.push({ ...q, id: `${n.id}-${q.id}-${k}` })); });
    setCheckpoint({ titleVi: node.title, test: qs.slice(0, 8) });
    window.scrollTo(0, 0);
  }

  function content() {
    if (active) return <LessonRunner lesson={active.lesson} mode={active.mode} data={LM}
      onExit={() => { setActive(null); window.scrollTo(0, 0); }} toast={toast} addVocab={addVocab} />;
    if (hub) { const mod = LM.lessonModules[hub.lessonId]; if (mod) return <LessonHub lessonId={hub.lessonId} mod={mod} data={LM}
      onExit={() => { setHub(null); window.scrollTo(0, 0); }} onComplete={() => advanceFrom(hub.idx)} toast={toast} addVocab={addVocab} />; }
    if (checkpoint) return <div className="lm-run"><SmallTest mod={checkpoint} onBack={() => { setCheckpoint(null); window.scrollTo(0, 0); }} onDone={() => {}} toast={toast} /></div>;
    switch (screen) {
      case 'learn': return <PathScreen data={LM} track={tk} levels={tk.levels} level={tk.level} exam={exam} progressN={progressN}
        setLevel={setLevel}
        onOpenLesson={openLesson} onCheckpoint={openCheckpoint}
        onStart={(lesson, mode) => { setActive({ lesson, mode }); window.scrollTo(0, 0); }}
        onResults={(lesson) => { setActive({ lesson, mode: 'practice' }); }} toast={toast} />;
      case 'target': return <TargetScreen data={LM} track={tk} toast={toast} />;
      case 'vocab': return <VocabScreen data={LM} vocabExtra={vocabExtra} toast={toast} />;
      case 'history': return <HistoryScreen data={LM} go={go} toast={toast} />;
      case 'profile': return <ProfileScreen data={LM} vocabExtra={vocabExtra} go={go} toast={toast} />;
      case 'settings': return <SettingsScreen theme={theme} toggleTheme={toggleTheme} openLang={() => setLang({ open: true, force: false })} toast={toast} logout={logout} />;
      case 'flow': return <FlowMap go={go} />;
      default: return null;
    }
  }
  const inOverlay = active || hub || checkpoint;

  const onHome = screen === 'home';
  const header = (
    <TopHeader authed={authed} user={LM.user} track={tk} theme={theme} toggleTheme={toggleTheme}
      screen={inOverlay ? 'learn' : screen} go={go} switchLang={switchLang}
      openAuth={openAuth} openLang={() => setLang({ open: true, force: false })} logout={logout}
      uiLang={uiLang} setUiLang={(l) => { setUiLang(l); toast('info', l === 'vi' ? 'Ngôn ngữ giao diện: Tiếng Việt' : 'Interface language: English'); }}
      onMenu={() => setMobileOpen(true)} showBurger={authed && !onHome} />
  );
  const overlays = (<>
    {authModal.open && <AuthModal initialTab={authModal.tab}
      onAuthed={(isNew) => { setAuthModal({ open: false, tab: 'login' }); setAuthed(true); if (isNew) setTrack(null); else setScreen('learn'); }}
      onClose={() => setAuthModal({ open: false, tab: 'login' })} toast={toast} />}
    {lang.open && <LanguageModal tracks={LM.tracks} onPick={pickLang} canClose={!lang.force} onClose={() => setLang({ open: false, force: false })} />}
    <Toasts items={toasts} />
    {tweaksUI}
  </>);

  if (!authed || onHome) {
    return (
      <div className="lm-shell">
        {header}
        <main className="lm-home-wrap"><HomeScreen authed={authed} go={go} switchLang={switchLang} openAuth={openAuth} /></main>
        {overlays}
      </div>
    );
  }

  return (
    <div className="lm-shell">
      {header}
      <div className="lm-app">
        <Sidebar screen={inOverlay ? 'learn' : screen} go={go} user={LM.user} track={{ ...tk, examName: tk.examName }}
          levels={tk.levels} level={tk.level} onPickLevel={setLevel}
          mobileOpen={mobileOpen} closeMobile={() => setMobileOpen(false)} />
        <div className="lm-main"><div className="lm-content">{content()}</div></div>
      </div>
      {overlays}
    </div>
  );
}

ReactDOM.createRoot(document.getElementById('root')).render(<App />);
