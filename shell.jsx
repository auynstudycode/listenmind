/* ListenMind — app shell: Sidebar, TopBar, AvatarMenu, LanguageModal, Toasts */
const { Icon, Logo, Avatar, useCountdown } = window.LMC;

const NAV = [
  { id: 'learn',   label: 'Học',              icon: 'headphones' },
  { id: 'target',  label: 'Mục tiêu',         icon: 'target' },
  { id: 'vocab',   label: 'Sổ từ vựng',       icon: 'book' },
  { id: 'history', label: 'Lịch sử học tập',  icon: 'history' },
  { id: 'profile', label: 'Hồ sơ',            icon: 'user' },
];

/* ============================ Sidebar ============================ */
function Sidebar({ screen, go, user, track, levels, level, onPickLevel, mobileOpen, closeMobile }) {
  const [openLearn, setOpenLearn] = useState(true);
  return (
    <>
      {mobileOpen && <div className="sb-scrim" onClick={closeMobile} />}
      <aside className={`lm-sidebar ${mobileOpen ? 'open' : ''}`}>
        <nav className="lm-nav">
          {NAV.map(n => (
            n.id === 'learn' ? (
              <div key={n.id} className="lm-nav-group">
                <div className={`lm-nav-item ${screen === 'learn' ? 'active' : ''}`}
                  onClick={() => { go('learn'); setOpenLearn(true); closeMobile && closeMobile(); }}>
                  <Icon name={n.icon} size={21} />
                  <span>{n.label}</span>
                  <button className="lm-nav-caret" onClick={(e) => { e.stopPropagation(); setOpenLearn(o => !o); }}>
                    <Icon name="chevDown" size={15} style={{ transform: openLearn ? 'none' : 'rotate(-90deg)', transition: '.2s' }} /></button>
                </div>
                {openLearn && (
                  <div className="lm-nav-sub">
                    <div className="lm-nav-sub-lbl">Cấp độ {track.examName}</div>
                    {levels.map(lv => (
                      <button key={lv} className={`lm-nav-sub-item ${screen === 'learn' && lv === level ? 'on' : ''}`}
                        onClick={() => { onPickLevel(lv); go('learn'); closeMobile && closeMobile(); }}>
                        <span className="lm-nav-sub-dot" />{lv}
                        {lv === level && <Icon name="check" size={14} style={{ marginLeft: 'auto' }} />}
                      </button>
                    ))}
                  </div>
                )}
              </div>
            ) : (
              <button key={n.id} className={`lm-nav-item ${screen === n.id ? 'active' : ''}`}
                onClick={() => { go(n.id); closeMobile && closeMobile(); }}>
                <Icon name={n.icon} size={21} />
                <span>{n.label}</span>
              </button>
            )
          ))}
          <div className="lm-nav-sep" />
          <button className={`lm-nav-item ${screen === 'flow' ? 'active' : ''}`}
            onClick={() => { go('flow'); closeMobile && closeMobile(); }}>
            <Icon name="swap" size={21} />
            <span>Sơ đồ luồng</span>
          </button>
        </nav>

        <div className="lm-sb-bottom">
          <div className="lm-streak">
            <span className="lm-streak-fire"><Icon name="fire" size={18} fill /></span>
            <div>
              <div className="lm-streak-n">{user.streak} ngày</div>
              <div className="lm-streak-l">streak liên tiếp</div>
            </div>
          </div>

          <button className="lm-acct-btn" onClick={() => { go('profile'); closeMobile && closeMobile(); }}>
            <Avatar size={36} />
            <div style={{ minWidth: 0, textAlign: 'left' }}>
              <div className="lm-acct-name">{user.name}</div>
              <div className="lm-acct-role">{track.flag} {track.examName} {track.level}</div>
            </div>
            <Icon name="chevRight" size={16} style={{ marginLeft: 'auto', opacity: .5 }} />
          </button>
        </div>
      </aside>
    </>
  );
}

/* ============================ Account dropdown (shared) ============================ */
function AccountMenu({ user, go, openLang, theme, toggleTheme, logout, onClose }) {
  return (
    <>
      <div className="lm-acct-scrim" onClick={onClose} />
      <div className="lm-acct-menu pop">
        <div className="lm-acct-head">
          <Avatar size={42} ring />
          <div style={{ minWidth: 0 }}>
            <div className="lm-acct-name">{user.name}</div>
            <div className="lm-acct-mail">{user.email}</div>
          </div>
        </div>
        <div className="lm-acct-sep" />
        <button className="lm-acct-it" onClick={() => { onClose(); go('profile'); }}><Icon name="user" size={18} /> Hồ sơ cá nhân</button>
        <button className="lm-acct-it" onClick={() => { onClose(); go('history'); }}><Icon name="history" size={18} /> Lịch sử học tập</button>
        <button className="lm-acct-it" onClick={() => { onClose(); go('settings'); }}><Icon name="settings" size={18} /> Cài đặt</button>
        <button className="lm-acct-it" onClick={() => { onClose(); openLang(); }}><Icon name="swap" size={18} /> Đổi ngôn ngữ học</button>
        <button className="lm-acct-it" onClick={() => { onClose(); toggleTheme(); }}><Icon name={theme === 'dark' ? 'sun' : 'moon'} size={18} /> {theme === 'dark' ? 'Chế độ sáng' : 'Chế độ tối'}</button>
        <div className="lm-acct-sep" />
        <button className="lm-acct-it danger" onClick={() => { onClose(); logout(); }}><Icon name="logout" size={18} /> Đăng xuất</button>
      </div>
    </>
  );
}

/* ============================ Top Header (global, original-style) ============================ */
function TopHeader({ authed, user, track, theme, toggleTheme, screen, go, switchLang, openAuth, openLang, logout, uiLang, setUiLang, onMenu, showBurger }) {
  const [acct, setAcct] = useState(false);
  const [langDD, setLangDD] = useState(false);
  const pills = [
    { id: 'home', label: 'Trang chủ' },
    { id: 'learn', label: 'Học' },
  ];
  function pillActive(id) {
    if (id === 'home') return screen === 'home';
    return screen === 'learn';
  }
  return (
    <header className="lm-header">
      {showBurger && <button className="lm-h-burger" onClick={onMenu}><Icon name="task" size={22} /></button>}
      <button className="lm-h-logo" onClick={() => go('home')}><Logo size={36} /></button>
      <nav className="lm-h-mid">
        {pills.map(p => (
          <button key={p.id} className={`lm-h-pill ${pillActive(p.id) ? 'on' : ''}`}
            onClick={() => { if (p.id === 'home') go('home'); else if (!authed) openAuth('register'); else go('learn'); }}>{p.label}</button>
        ))}
      </nav>
      <div className="lm-h-right">
        <div className="lm-h-lang" onMouseLeave={() => setLangDD(false)}>
          <button className="lm-h-langbtn" onClick={() => setLangDD(v => !v)}>
            <Icon name="globe" size={16} /> {uiLang.toUpperCase()} <Icon name="chevDown" size={14} /></button>
          {langDD && (
            <div className="lm-h-langdd pop">
              {['vi', 'en'].map(l => (
                <button key={l} className={`lm-h-langopt ${uiLang === l ? 'on' : ''}`} onClick={() => { setUiLang(l); setLangDD(false); }}>
                  {l === 'vi' ? '🇻🇳 Tiếng Việt' : '🇬🇧 English'}</button>
              ))}
            </div>
          )}
        </div>
        <button className="lm-h-icon" onClick={toggleTheme} title="Chế độ sáng/tối">
          <Icon name={theme === 'dark' ? 'sun' : 'moon'} size={18} /></button>
        {authed ? (
          <div className="lm-h-acct">
            <button className={`lm-h-avatar ${acct ? 'on' : ''}`} onClick={() => setAcct(v => !v)}>
              <Avatar size={34} />
              <span className="lm-h-uname">{user.name}</span>
              <Icon name="chevDown" size={15} style={{ opacity: .6, transform: acct ? 'rotate(180deg)' : 'none', transition: '.2s' }} />
            </button>
            {acct && <AccountMenu user={user} go={go} openLang={openLang} theme={theme} toggleTheme={toggleTheme} logout={logout} onClose={() => setAcct(false)} />}
          </div>
        ) : (
          <div className="row gap-8">
            <button className="btn btn-ghost btn-sm" onClick={() => openAuth('login')}>Đăng nhập</button>
            <button className="btn btn-primary btn-sm" onClick={() => openAuth('register')}>Đăng ký</button>
          </div>
        )}
      </div>
    </header>
  );
}

/* ============================ TopBar ============================ */
function TopBar({ title, sub, track, exam, onMenu, right }) {
  const cd = useCountdown(exam.date);
  return (
    <header className="lm-topbar">
      <button className="lm-burger" onClick={onMenu}><Icon name="task" size={22} /></button>
      <div style={{ minWidth: 0 }}>
        <div className="lm-tb-title font-display">{title}</div>
        {sub && <div className="lm-tb-sub">{sub}</div>}
      </div>
      <div className="grow" />
      {right || (
        <div className="lm-cd" title={`Đếm ngược tới ${exam.name}`}>
          <Icon name="clock" size={18} />
          <div className="lm-cd-body">
            <div className="lm-cd-top">{exam.name}</div>
            <div className="lm-cd-time">
              còn <b>{cd.months}</b> tháng <b>{cd.days}</b> ngày <b>{cd.hours}</b>:{String(cd.mins).padStart(2, '0')}
            </div>
          </div>
        </div>
      )}
    </header>
  );
}

/* ============================ Language Modal ============================ */
function LanguageModal({ tracks, onPick, onClose, canClose }) {
  const [lang, setLang] = useState(null);   // 'jp' | 'cn'
  const t = lang ? tracks[lang] : null;

  return (
    <div className="lm-overlay" onMouseDown={e => { if (e.target === e.currentTarget && canClose) onClose(); }}>
      <div className="lm-modal pop" style={{ maxWidth: 560 }}>
        {canClose && <button className="lm-modal-x" onClick={onClose}><Icon name="x" size={20} /></button>}
        <div className="lm-modal-pad">
          <div className="lm-step-dots">
            <span className={`d ${!lang ? 'on' : 'done'}`} />
            <span className={`d ${lang ? 'on' : ''}`} />
          </div>

          {!lang && (
            <div className="fade-up">
              <h2 className="lm-modal-title font-display">Bạn muốn học ngôn ngữ nào?</h2>
              <p className="lm-modal-sub">Chọn ngôn ngữ để ListenMind cá nhân hoá lộ trình nghe cho bạn. Bạn có thể đổi lại bất cứ lúc nào.</p>
              <div className="lm-lang-grid">
                {Object.values(tracks).map(tk => (
                  <button key={tk.id} className="lm-lang-card" onClick={() => setLang(tk.id)}>
                    <span className="lm-lang-flag">{tk.flag}</span>
                    <div className="lm-lang-name">{tk.name}</div>
                    <div className="lm-lang-meta">{tk.exams.map(e => e.name).join(' · ')}</div>
                    <span className="lm-lang-go"><Icon name="arrowR" size={18} /></span>
                  </button>
                ))}
              </div>
            </div>
          )}

          {lang && (
            <div className="fade-up">
              <button className="lm-back-link" onClick={() => setLang(null)}>
                <Icon name="chevLeft" size={16} /> Chọn lại ngôn ngữ</button>
              <h2 className="lm-modal-title font-display">{t.flag} Chọn lộ trình {t.name}</h2>
              <p className="lm-modal-sub">Theo chuẩn kỳ thi để có lộ trình rõ ràng, hoặc FreeStyle để học tự do theo chủ đề.</p>
              <div className="lm-exam-list">
                {t.exams.map(ex => (
                  <button key={ex.id} className="lm-exam-card" onClick={() => onPick(lang, ex)}>
                    <div className="lm-exam-badge">{ex.name === 'FreeStyle' ? <Icon name="sparkle" size={20} /> : ex.name}</div>
                    <div style={{ flex: 1 }}>
                      <div className="lm-exam-name">{ex.name === 'FreeStyle' ? 'FreeStyle · Tự do' : ex.name}</div>
                      <div className="lm-exam-desc">{ex.desc}</div>
                      <div className="lm-exam-levels">{ex.levels.map(l => <span key={l} className="lm-lv-pill">{l}</span>)}</div>
                    </div>
                    <span className="lm-exam-go"><Icon name="arrowR" size={18} /></span>
                  </button>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

/* ============================ Toast ============================ */
function Toasts({ items }) {
  return (
    <div className="lm-toast-wrap">
      {items.map(t => (
        <div key={t.id} className={`lm-toast ${t.kind} pop`}>
          <span className="lm-toast-ic"><Icon name={t.kind === 'error' ? 'x' : t.kind === 'info' ? 'sparkle' : 'check'} size={18} /></span>
          <div><div className="lm-toast-t">{t.title}</div>{t.sub && <div className="lm-toast-s">{t.sub}</div>}</div>
        </div>
      ))}
    </div>
  );
}

Object.assign(window, { Sidebar, TopHeader, AccountMenu, TopBar, LanguageModal, Toasts, NAV });
