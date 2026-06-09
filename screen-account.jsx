/* ListenMind — Profile, Settings, Auth, Flow map */
const { Icon: IA, Logo: LogoA, Avatar: AvA } = window.LMC;
const { useState: aS } = React;

/* ============================ PROFILE ============================ */
function loadProfile() { try { return JSON.parse(localStorage.getItem('lm_profile') || 'null'); } catch { return null; } }
function loadVStateP() { try { return JSON.parse(localStorage.getItem('lm_vstate') || '{}'); } catch { return {}; } }
function loadVHiddenP() { try { return JSON.parse(localStorage.getItem('lm_vhidden') || '[]'); } catch { return []; } }
function loadGoalLevel() { try { const t = JSON.parse(localStorage.getItem('lm_target_user') || 'null'); return t && t.goalState && t.goalState.goalLevel; } catch { return null; } }

const PV_STATE = { known: { c: 'pv-known', l: 'Đã thuộc' }, learning: { c: 'pv-learn', l: 'Đang học' }, review: { c: 'pv-review', l: 'Cần ôn' }, new: { c: 'pv-new', l: 'Chưa học' } };

function ProfileEdit({ name, onSave, onClose }) {
  const [n, setN] = aS(name);
  return (
    <div className="lm-overlay" onMouseDown={e => { if (e.target === e.currentTarget) onClose(); }}>
      <div className="lm-modal pop" style={{ maxWidth: 420 }}>
        <button className="lm-modal-x" onClick={onClose}><IA name="x" size={20} /></button>
        <div className="lm-modal-pad">
          <h2 className="lm-modal-title font-display">Chỉnh sửa hồ sơ</h2>
          <p className="lm-modal-sub">Cập nhật thông tin hiển thị của bạn.</p>
          <div className="lm-pf-edit-av"><AvA size={84} ring /><button className="btn btn-soft btn-sm"><IA name="edit" size={14} /> Đổi ảnh</button></div>
          <div className="field" style={{ marginTop: 16 }}><label>Tên hiển thị</label><input className="input" value={n} onChange={e => setN(e.target.value)} /></div>
          <div className="field" style={{ marginTop: 14 }}><label>Email</label><input className="input" value="minhanh@gmail.com" disabled style={{ opacity: .6 }} /></div>
          <div className="row gap-10" style={{ marginTop: 22 }}>
            <button className="btn btn-ghost grow" onClick={onClose}>Huỷ</button>
            <button className="btn btn-primary grow" disabled={!n.trim()} onClick={() => onSave(n.trim())}><IA name="check" size={16} /> Lưu</button>
          </div>
        </div>
      </div>
    </div>
  );
}

function ProfileScreen({ data, vocabExtra, go, toast }) {
  const [override, setOverride] = aS(loadProfile);
  const [edit, setEdit] = aS(false);
  const u = { ...data.user, ...(override || {}) };
  const allVocab = [...vocabExtra, ...data.vocab];
  const vstate = loadVStateP(); const vhidden = loadVHiddenP();
  const visibleVocab = allVocab.filter(v => !vhidden.includes(v.id));
  const savedCount = visibleVocab.length;
  const goalLevel = loadGoalLevel() || 'N2';
  const lessonsDone = 58, lessonsTotal = 120;
  const pct = Math.round(lessonsDone / lessonsTotal * 100);

  function saveProfile(name) { const o = { ...(override || {}), name }; setOverride(o); localStorage.setItem('lm_profile', JSON.stringify(o)); setEdit(false); toast && toast('success', 'Đã lưu hồ sơ', name); }

  const stats = [
    { l: 'Bài hoàn thành', v: 58, ic: 'check', micro: '+3 tuần này', tone: 'teal' },
    { l: 'Streak', v: u.streak, ic: 'fire', micro: 'ngày liên tiếp', tone: 'coral', fill: true },
    { l: 'Từ đã lưu', v: savedCount, ic: 'book', micro: 'trong sổ từ vựng', tone: 'lav' },
    { l: 'Giờ học', v: '34h', ic: 'clock', micro: 'tổng thời gian', tone: 'ok' },
  ];
  const quick = [
    { k: 'learn', ic: 'play', l: 'Tiếp tục học', sub: 'JLPT N3', primary: true },
    { k: 'vocab', ic: 'book', l: 'Ôn từ vựng', sub: `${savedCount} từ` },
    { k: 'history', ic: 'history', l: 'Xem lịch sử', sub: 'buổi học gần đây' },
    { k: 'target', ic: 'target', l: 'Đặt mục tiêu', sub: `Mục tiêu ${goalLevel}` },
  ];

  return (
    <div className="fade-up lm-pf">
      {/* ---- header ---- */}
      <div className="lm-pf-card card">
        <div className="lm-pf-cover" />
        <div className="lm-pf-body">
          <div className="lm-pf-avatar"><AvA size={104} ring /></div>
          <div className="lm-pf-idblock">
            <div className="lm-pf-name font-display">{u.name}</div>
            <div className="lm-pf-email"><IA name="mail" size={15} /> {u.email}</div>
            <div className="lm-pf-badges">
              <span className="lm-pfbadge teal"><IA name="star" size={13} fill /> Gói {u.plan}</span>
              <span className="lm-pfbadge gray"><IA name="calendar" size={13} /> Tham gia {u.joined}</span>
              <span className="lm-pfbadge lav">🇯🇵 JLPT N3</span>
              <span className="lm-pfbadge amber"><IA name="target" size={13} /> Mục tiêu: {goalLevel}</span>
            </div>
          </div>
          <div className="lm-pf-actions">
            <button className="btn btn-primary" onClick={() => setEdit(true)}><IA name="edit" size={16} /> Chỉnh sửa hồ sơ</button>
            <button className="btn btn-ghost lm-pf-set" onClick={() => go('settings')}><IA name="settings" size={16} /> Cài đặt</button>
          </div>
        </div>
      </div>

      {/* ---- stats ---- */}
      <div className="lm-pf-stats">
        {stats.map(s => (
          <div key={s.l} className={`card lm-pfstat tone-${s.tone}`}>
            <span className="lm-pfstat-ic"><IA name={s.ic} size={20} fill={s.fill} /></span>
            <div className="lm-pfstat-body">
              <div className="lm-pfstat-v font-display">{s.v}</div>
              <div className="lm-pfstat-l">{s.l}</div>
              <div className="lm-pfstat-micro">{s.micro}</div>
            </div>
          </div>
        ))}
      </div>

      {/* ---- progress + quick actions ---- */}
      <div className="lm-pf-row1">
        <div className="card card-pad lm-pf-progress">
          <div className="lm-panel-h"><IA name="target" size={18} /> Tiến độ mục tiêu JLPT N3</div>
          <div className="lm-pfprog-top">
            <div><div className="lm-pfprog-big font-display">{lessonsDone}<span>/{lessonsTotal} bài</span></div>
              <div className="lm-pfprog-sub">Hoàn thành {pct}% lộ trình N3</div></div>
            <div className="lm-pfprog-ring" style={{ background: `conic-gradient(var(--teal-500) ${pct * 3.6}deg, var(--ink-200) 0)` }}>
              <span>{pct}%</span></div>
          </div>
          <div className="bar" style={{ marginTop: 14 }}><span style={{ width: `${pct}%` }} /></div>
          <div className="lm-pfprog-foot">
            <span><b className="font-display">{lessonsDone}</b> đã học</span>
            <span><b className="font-display">{lessonsTotal - lessonsDone}</b> còn lại</span>
            <button className="lm-link" onClick={() => go('learn')}>Tiếp tục lộ trình →</button>
          </div>
        </div>

        <div className="card card-pad lm-pf-quick">
          <div className="lm-panel-h"><IA name="zap" size={18} /> Hành động nhanh</div>
          <div className="lm-quick-grid">
            {quick.map(q => (
              <button key={q.k} className={`lm-quick-btn ${q.primary ? 'primary' : ''}`} onClick={() => go(q.k)}>
                <span className="lm-quick-ic"><IA name={q.ic} size={19} fill={q.primary} /></span>
                <div><div className="lm-quick-l">{q.l}</div><div className="lm-quick-sub">{q.sub}</div></div>
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* ---- history + vocab ---- */}
      <div className="lm-pf-row2">
        <div className="card card-pad">
          <div className="lm-panel-h"><IA name="history" size={18} /> Lịch sử học tập gần đây
            <button className="lm-link" style={{ marginLeft: 'auto' }} onClick={() => go('history')}>Xem tất cả →</button></div>
          <div className="lm-pfhist-list">
            {data.history.slice(0, 4).map(h => {
              const good = h.total > 0 && h.correct / h.total >= 0.8;
              return (
                <button key={h.id} className="lm-pfhist" onClick={() => go('history')}>
                  <span className={`lm-pfhist-ic ${h.type}`}><IA name={h.type === 'exam' ? 'doc' : 'headphones'} size={16} /></span>
                  <div className="lm-pfhist-main">
                    <div className="lm-pfhist-t">{h.lesson}</div>
                    <div className="lm-pfhist-meta">{h.date} · {h.level}</div>
                  </div>
                  {h.total > 0
                    ? <span className={`lm-pfhist-score ${good ? 'good' : 'warn'}`}>{`${h.correct}/${h.total}`}</span>
                    : <span className="lm-pfhist-score neutral"><IA name="mic" size={13} /></span>}
                  <span className="lm-pfhist-go"><IA name="chevRight" size={16} /></span>
                </button>
              );
            })}
          </div>
        </div>

        <div className="card card-pad">
          <div className="lm-panel-h"><IA name="book" size={18} /> Từ vựng đã lưu
            <button className="lm-link" style={{ marginLeft: 'auto' }} onClick={() => go('vocab')}>Sổ từ vựng →</button></div>
          <div className="lm-pfvocab-wrap">
            {visibleVocab.slice(0, 10).map(v => {
              const st = PV_STATE[vstate[v.id] || v.state || 'new'] || PV_STATE.new;
              return (
                <button key={v.id} className={`lm-pfvocab ${st.c}`} title={`${v.meaning} · ${st.l}`} onClick={() => go('vocab')}>
                  <span className="lm-pfvocab-w jp">{v.word}</span>
                  {v.reading && <span className="lm-pfvocab-r jp">{v.reading}</span>}
                </button>
              );
            })}
            {visibleVocab.length > 10 && <span className="lm-pfvocab-more">+{visibleVocab.length - 10} từ nữa</span>}
            {visibleVocab.length === 0 && <div className="muted" style={{ fontSize: 13.5, padding: '8px 0' }}>Chưa có từ nào được lưu.</div>}
          </div>
          <div className="lm-pfvocab-legend">
            <span><i className="pv-dot pv-known" /> Đã thuộc</span>
            <span><i className="pv-dot pv-learn" /> Đang học</span>
            <span><i className="pv-dot pv-review" /> Cần ôn</span>
          </div>
          <button className="btn btn-primary btn-block" style={{ marginTop: 14 }} disabled={!savedCount} onClick={() => go('vocab')}>
            <IA name="zap" size={16} /> Ôn {Math.min(savedCount, 12)} từ vựng</button>
        </div>
      </div>

      {edit && <ProfileEdit name={u.name} onSave={saveProfile} onClose={() => setEdit(false)} />}
    </div>
  );
}

/* ============================ SETTINGS ============================ */
function Toggle({ on, onChange }) {
  return <button className={`lm-toggle ${on ? 'on' : ''}`} onClick={() => onChange(!on)}><span /></button>;
}
function SettingsScreen({ theme, toggleTheme, openLang, toast, logout }) {
  const [notif, setNotif] = aS(true);
  const [sound, setSound] = aS(true);
  const rows = (title, icon, children) => (
    <div className="card card-pad lm-set-block">
      <div className="lm-panel-h"><IA name={icon} size={18} /> {title}</div>
      {children}
    </div>
  );
  const line = (label, control) => <div className="lm-set-row"><span>{label}</span>{control}</div>;
  return (
    <div className="fade-up lm-set">
      {rows('Tài khoản', 'user', <>
        {line('Họ tên', <b>Minh Anh</b>)}
        {line('Email', <b>minhanh@gmail.com</b>)}
        {line('Gói', <span className="chip chip-teal">Free</span>)}
      </>)}
      {rows('Ngôn ngữ', 'globe', <>
        {line('Ngôn ngữ giao diện', <select className="lm-select" defaultValue="vi"><option value="vi">Tiếng Việt</option><option value="en">English</option></select>)}
        {line('Ngôn ngữ đang học', <button className="btn btn-soft btn-sm" onClick={openLang}><IA name="swap" size={15} /> 🇯🇵 JLPT N3 · Đổi</button>)}
      </>)}
      {rows('Giao diện & thông báo', 'bell', <>
        {line('Chế độ tối', <Toggle on={theme === 'dark'} onChange={toggleTheme} />)}
        {line('Thông báo học tập (nhắc ôn tập)', <Toggle on={notif} onChange={v => { setNotif(v); toast('info', v ? 'Đã bật thông báo' : 'Đã tắt thông báo'); }} />)}
        {line('Âm thanh phản hồi', <Toggle on={sound} onChange={setSound} />)}
      </>)}
      {rows('Tài khoản liên kết', 'check', <>
        {line(<span className="row gap-8"><span className="lm-soc-dot g">G</span> Google</span>, <span className="chip chip-teal">Đã liên kết</span>)}
        {line(<span className="row gap-8"><span className="lm-soc-dot f">f</span> Facebook</span>, <button className="btn btn-ghost btn-sm" onClick={() => toast('success', 'Đã liên kết Facebook')}>Liên kết</button>)}
      </>)}
      <button className="btn btn-ghost" style={{ color: 'var(--err-500)', borderColor: 'var(--err-100)', alignSelf: 'flex-start' }} onClick={logout}>
        <IA name="logout" size={16} /> Đăng xuất</button>
    </div>
  );
}

/* ============================ AUTH ============================ */
function AuthScreen({ onAuthed, toast }) {
  const [tab, setTab] = aS('login');
  const [email, setEmail] = aS('');
  const [pw, setPw] = aS('');
  const [name, setName] = aS('');
  const [err, setErr] = aS('');
  const [loading, setLoading] = aS('');

  function social(p) {
    setLoading(p);
    setTimeout(() => { setLoading(''); toast('success', `Đăng nhập bằng ${p} thành công`); onAuthed(true); }, 1100);
  }
  function submit() {
    setErr('');
    if (!email || !pw || (tab === 'register' && !name)) { setErr('Vui lòng điền đầy đủ thông tin.'); return; }
    if (!/^\S+@\S+\.\S+$/.test(email)) { setErr('Email không hợp lệ.'); return; }
    if (tab === 'login' && pw === 'wrong') { setErr('Email hoặc mật khẩu không đúng.'); return; }
    if (tab === 'register' && email === 'minhanh@gmail.com') { setErr('Tài khoản này đã tồn tại. Hãy đăng nhập.'); return; }
    setLoading('email');
    setTimeout(() => { setLoading(''); toast('success', tab === 'login' ? 'Chào mừng trở lại!' : 'Tạo tài khoản thành công'); onAuthed(tab === 'register'); }, 900);
  }

  return (
    <div className="lm-auth">
      {loading && <div className="lm-auth-load"><div className="lm-spinner" /><div>Đang xử lý {loading === 'email' ? '' : 'với ' + loading}…</div></div>}
      <div className="lm-auth-brand">
        <div className="lm-auth-brand-in">
          <LogoA size={52} />
          <h1 className="lm-auth-h font-display">Luyện nghe Nhật &amp; Trung,<br />theo lộ trình của riêng bạn.</h1>
          <p className="lm-auth-p">Nghe câu thật — luyện tập & thi thử — theo dõi mục tiêu. ListenMind đồng hành cùng bạn tới ngày thi.</p>
          <div className="lm-auth-feats">
            {[['headphones', 'Luyện tập & Thi thật theo JLPT / HSK'], ['target', 'Mục tiêu & đếm ngược ngày thi'], ['book', 'Sổ từ vựng cá nhân hoá']].map(([ic, t]) => (
              <div key={t} className="lm-auth-feat"><span><IA name={ic} size={17} /></span>{t}</div>
            ))}
          </div>
        </div>
      </div>

      <div className="lm-auth-form-wrap">
        <div className="lm-auth-card">
          <AvA size={64} ring />
          <div className="lm-auth-tabs">
            <button className={tab === 'login' ? 'on' : ''} onClick={() => { setTab('login'); setErr(''); }}>Đăng nhập</button>
            <button className={tab === 'register' ? 'on' : ''} onClick={() => { setTab('register'); setErr(''); }}>Đăng ký</button>
          </div>

          <button className="lm-soc-btn" onClick={() => social('Google')}>
            <span className="lm-soc-dot g">G</span> Tiếp tục với Google</button>
          <button className="lm-soc-btn" onClick={() => social('Facebook')}>
            <span className="lm-soc-dot f">f</span> Tiếp tục với Facebook</button>
          <div className="lm-auth-or">hoặc dùng email</div>

          {tab === 'register' && (
            <div className="field"><label>Họ tên</label>
              <input className="input" placeholder="Nguyễn Văn A" value={name} onChange={e => setName(e.target.value)} /></div>
          )}
          <div className="field"><label>Email</label>
            <input className={`input ${err && !/^\S+@\S+\.\S+$/.test(email) ? 'err' : ''}`} placeholder="ban@email.com" value={email} onChange={e => setEmail(e.target.value)} /></div>
          <div className="field"><label>Mật khẩu</label>
            <input className="input" type="password" placeholder="••••••••" value={pw} onChange={e => setPw(e.target.value)} /></div>

          {err && <div className="lm-auth-err"><IA name="x" size={15} /> {err}</div>}
          {tab === 'login' && <div className="lm-auth-forgot">Quên mật khẩu?</div>}

          <button className="btn btn-primary btn-block btn-lg" onClick={submit}>
            {tab === 'login' ? 'Đăng nhập' : 'Tạo tài khoản'}</button>
          <div className="lm-auth-swap">
            {tab === 'login' ? 'Chưa có tài khoản? ' : 'Đã có tài khoản? '}
            <b onClick={() => { setTab(tab === 'login' ? 'register' : 'login'); setErr(''); }}>{tab === 'login' ? 'Đăng ký' : 'Đăng nhập'}</b>
          </div>
          <div className="lm-auth-hint">Demo: mật khẩu <code>wrong</code> để xem lỗi đăng nhập</div>
        </div>
      </div>
    </div>
  );
}

/* ============================ FLOW MAP ============================ */
function FlowMap({ go }) {
  const steps = [
    { n: 1, t: 'Truy cập ListenMind', d: 'Landing page', ic: 'home', screen: null },
    { n: 2, t: 'Đăng nhập / Đăng ký', d: 'Email hoặc Google / Facebook', ic: 'user', screen: 'auth' },
    { n: 3, t: 'Chọn ngôn ngữ học', d: 'Modal hiện nếu chưa chọn', ic: 'globe', screen: 'lang' },
    { n: 4, t: 'Chọn Nhật / Trung', d: 'Tiếng Nhật hoặc Tiếng Trung', ic: 'flag', screen: 'lang' },
    { n: 5, t: 'Chọn JLPT / HSK / Free', d: 'Lộ trình theo cấp độ', ic: 'target', screen: 'lang' },
    { n: 6, t: 'Màn hình Học', d: 'Chọn level & lesson', ic: 'headphones', screen: 'learn' },
    { n: 7, t: 'Luyện tập / Thi thật', d: '2 chế độ cho mỗi lesson', ic: 'doc', screen: 'learn' },
    { n: 8, t: 'Làm bài → Kết quả', d: 'Chấm điểm tự động', ic: 'check', screen: 'learn' },
    { n: 9, t: 'Script · Audio · Câu sai', d: 'Màn hình kết quả chia cột', ic: 'refresh', screen: 'learn' },
    { n: 10, t: 'Highlight & lưu từ', d: 'Note, sổ từ vựng', ic: 'book', screen: 'vocab' },
    { n: 11, t: 'Theo dõi mục tiêu', d: 'Màn hình Target', ic: 'chart', screen: 'target' },
    { n: 12, t: 'Ôn lại từ vựng & lịch sử', d: 'Sổ từ vựng / Hồ sơ', ic: 'history', screen: 'history' },
  ];
  return (
    <div className="fade-up">
      <div className="lm-flow-intro card card-pad">
        <div className="lm-panel-h"><IA name="swap" size={18} /> Luồng màn hình tổng thể (sau khi chỉnh sửa)</div>
        <p className="muted" style={{ fontSize: 14 }}>12 bước từ lúc truy cập đến khi ôn tập. Nhấn vào từng bước có biểu tượng để mở màn hình tương ứng trong bản mockup.</p>
      </div>
      <div className="lm-flow-grid">
        {steps.map((s, i) => (
          <React.Fragment key={s.n}>
            <button className={`lm-flow-node ${s.screen ? 'clickable' : ''}`} onClick={() => s.screen && s.screen !== 'auth' && s.screen !== 'lang' && go(s.screen)} disabled={!s.screen}>
              <div className="lm-flow-num">{s.n}</div>
              <span className="lm-flow-ic"><IA name={s.ic} size={20} /></span>
              <div className="lm-flow-t">{s.t}</div>
              <div className="lm-flow-d">{s.d}</div>
            </button>
            {i < steps.length - 1 && <div className="lm-flow-arr"><IA name="chevRight" size={18} /></div>}
          </React.Fragment>
        ))}
      </div>
    </div>
  );
}

Object.assign(window, { ProfileScreen, SettingsScreen, AuthScreen, FlowMap });

/* ============================ AUTH MODAL (overlay) ============================ */
function AuthModal({ initialTab, onAuthed, onClose, toast }) {
  const [tab, setTab] = aS(initialTab || 'login');
  const [email, setEmail] = aS('');
  const [pw, setPw] = aS('');
  const [name, setName] = aS('');
  const [err, setErr] = aS('');
  const [loading, setLoading] = aS('');

  function social(p) { setLoading(p); setTimeout(() => { setLoading(''); toast('success', `Đăng nhập bằng ${p} thành công`); onAuthed(true); }, 1100); }
  function submit() {
    setErr('');
    if (!email || !pw || (tab === 'register' && !name)) return setErr('Vui lòng điền đầy đủ thông tin.');
    if (!/^\S+@\S+\.\S+$/.test(email)) return setErr('Email không hợp lệ.');
    if (tab === 'login' && pw === 'wrong') return setErr('Email hoặc mật khẩu không đúng.');
    if (tab === 'register' && email === 'minhanh@gmail.com') return setErr('Tài khoản này đã tồn tại. Hãy đăng nhập.');
    setLoading('email');
    setTimeout(() => { setLoading(''); toast('success', tab === 'login' ? 'Chào mừng trở lại!' : 'Tạo tài khoản thành công'); onAuthed(tab === 'register'); }, 900);
  }

  return (
    <div className="lm-overlay" onMouseDown={e => { if (e.target === e.currentTarget) onClose(); }}>
      {loading && <div className="lm-auth-load"><div className="lm-spinner" /><div>Đang xử lý {loading === 'email' ? '' : 'với ' + loading}…</div></div>}
      <div className="lm-modal pop" style={{ maxWidth: 410 }}>
        <button className="lm-modal-x" onClick={onClose}><IA name="x" size={20} /></button>
        <div className="lm-auth-card" style={{ boxShadow: 'none', borderRadius: 0, padding: '30px 30px 28px' }}>
          <AvA size={60} ring />
          <div className="lm-auth-tabs">
            <button className={tab === 'login' ? 'on' : ''} onClick={() => { setTab('login'); setErr(''); }}>Đăng nhập</button>
            <button className={tab === 'register' ? 'on' : ''} onClick={() => { setTab('register'); setErr(''); }}>Đăng ký</button>
          </div>
          <button className="lm-soc-btn" onClick={() => social('Google')}><span className="lm-soc-dot g">G</span> Tiếp tục với Google</button>
          <button className="lm-soc-btn" onClick={() => social('Facebook')}><span className="lm-soc-dot f">f</span> Tiếp tục với Facebook</button>
          <div className="lm-auth-or">hoặc dùng email</div>
          {tab === 'register' && <div className="field"><label>Họ tên</label><input className="input" placeholder="Nguyễn Văn A" value={name} onChange={e => setName(e.target.value)} /></div>}
          <div className="field"><label>Email</label><input className={`input ${err && !/^\S+@\S+\.\S+$/.test(email) ? 'err' : ''}`} placeholder="ban@email.com" value={email} onChange={e => setEmail(e.target.value)} /></div>
          <div className="field"><label>Mật khẩu</label><input className="input" type="password" placeholder="••••••••" value={pw} onChange={e => setPw(e.target.value)} /></div>
          {err && <div className="lm-auth-err"><IA name="x" size={15} /> {err}</div>}
          {tab === 'login' && <div className="lm-auth-forgot">Quên mật khẩu?</div>}
          <button className="btn btn-primary btn-block btn-lg" onClick={submit}>{tab === 'login' ? 'Đăng nhập' : 'Tạo tài khoản'}</button>
          <div className="lm-auth-swap">{tab === 'login' ? 'Chưa có tài khoản? ' : 'Đã có tài khoản? '}<b onClick={() => { setTab(tab === 'login' ? 'register' : 'login'); setErr(''); }}>{tab === 'login' ? 'Đăng ký' : 'Đăng nhập'}</b></div>
          <div className="lm-auth-hint">Demo: mật khẩu <code>wrong</code> để xem lỗi đăng nhập</div>
        </div>
      </div>
    </div>
  );
}
Object.assign(window, { AuthModal });
