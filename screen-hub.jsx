/* ListenMind — Lesson hub (image-2 style) + Vocabulary / Grammar / Small test / Shadow / Kaiwa */
const { Icon: IHub, Avatar: AvHub } = window.LMC;
const { useState: hS, useEffect: hE } = React;

/* ---------- per-lesson progress persistence ---------- */
function loadProg() { try { return JSON.parse(localStorage.getItem('lm_lesson_prog') || '{}'); } catch { return {}; } }
function saveProgPart(lessonId, part, val) {
  const all = loadProg(); all[lessonId] = { ...(all[lessonId] || {}), [part]: val };
  try { localStorage.setItem('lm_lesson_prog', JSON.stringify(all)); } catch {}
  return all;
}
function loadMastery() { try { return JSON.parse(localStorage.getItem('lm_mastery') || '{}'); } catch { return {}; } }

/* ============================ Vocabulary study (flashcards, no audio) ============================ */
function VocabStudy({ mod, onBack, onDone, addVocab, toast }) {
  const cards = mod.vocabulary;
  const [i, setI] = hS(0);
  const [flip, setFlip] = hS(false);
  const [mastery, setMastery] = hS(loadMastery);
  const [view, setView] = hS('card');
  const [done, setDone] = hS(false);
  const known = cards.filter(c => mastery[c.word] === 'known').length;

  function mark(state) {
    const m = { ...mastery, [cards[i].word]: state };
    setMastery(m); try { localStorage.setItem('lm_mastery', JSON.stringify(m)); } catch {}
    if (state === 'known') addVocab(cards[i].word, mod.titleVi);
    setFlip(false);
    if (i < cards.length - 1) setI(i + 1); else { setDone(true); onDone && onDone(); }
  }

  if (done) {
    const learned = cards.filter(c => mastery[c.word] === 'known').length;
    return (
      <div className="lm-study-done fade-up">
        <div className="lm-study-done-ic"><IHub name="book" size={34} /></div>
        <h3 className="font-display">Hoàn thành từ vựng!</h3>
        <p>Bạn đã đánh dấu thuộc <b>{learned}/{cards.length}</b> từ. Tất cả đã lưu vào Sổ từ vựng.</p>
        <div className="row gap-10" style={{ justifyContent: 'center' }}>
          <button className="btn btn-soft" onClick={() => { setDone(false); setI(0); }}><IHub name="refresh" size={16} /> Ôn lại</button>
          <button className="btn btn-primary" onClick={onBack}>Về bài học</button>
        </div>
      </div>
    );
  }

  const c = cards[i];
  return (
    <div className="lm-study fade-up">
      <div className="lm-study-bar">
        <button className="lm-icon-btn" onClick={onBack}><IHub name="arrowL" size={20} /></button>
        <div className="lm-study-titlewrap"><div className="lm-study-title">Từ vựng · {mod.titleVi}</div>
          <div className="lm-study-sub">{cards.length} từ · đã thuộc {known}</div></div>
        <div className="grow" />
        <div className="lm-seg">
          <button className={view === 'card' ? 'on' : ''} onClick={() => setView('card')}>Flashcard</button>
          <button className={view === 'list' ? 'on' : ''} onClick={() => setView('list')}>Danh sách</button>
        </div>
      </div>

      {view === 'card' ? (<>
        <div className="lm-flash-prog"><div className="lm-run-prog-bar"><span style={{ width: `${(i / cards.length) * 100}%` }} /></div><span>{i + 1}/{cards.length}</span></div>
        <div className={`lm-flash ${flip ? 'flip' : ''}`} onClick={() => setFlip(f => !f)}>
          <div className="lm-flash-inner">
            <div className="lm-flash-front">
              {mastery[c.word] === 'known' && <span className="lm-flash-known"><IHub name="check" size={13} /> đã thuộc</span>}
              <div className="lm-flash-word jp">{c.word}</div>
              {c.reading && <div className="lm-flash-read jp">{c.reading}</div>}
              <div className="lm-flash-pos">{c.pos}</div>
              <div className="lm-flash-hint"><IHub name="eye" size={14} /> Chạm để xem nghĩa</div>
            </div>
            <div className="lm-flash-back">
              <div className="lm-flash-mean">{c.meaning}</div>
              <div className="lm-flash-ex jp">{c.ex}</div>
              <div className="lm-flash-exvi">{c.exVi}</div>
            </div>
          </div>
        </div>
        <div className="lm-flash-actions">
          <button className="btn btn-ghost" onClick={() => mark('learning')}><IHub name="refresh" size={16} /> Chưa thuộc</button>
          <button className="btn btn-primary" onClick={() => mark('known')}><IHub name="check" size={16} /> Đã thuộc</button>
        </div>
      </>) : (
        <div className="lm-vstudy-list">
          {cards.map(card => (
            <div key={card.word} className="lm-vstudy-row">
              <div><span className="lm-vstudy-word jp">{card.word}</span>{card.reading && <span className="lm-vstudy-read jp"> {card.reading}</span>}<span className="lm-vstudy-pos">{card.pos}</span></div>
              <div className="lm-vstudy-mean">{card.meaning}</div>
              <div className="lm-vstudy-ex jp">{card.ex} <span className="lm-vstudy-exvi">— {card.exVi}</span></div>
              <button className={`lm-vlist-save ${mastery[card.word] === 'known' ? 'done' : ''}`} onClick={() => { const m = { ...mastery, [card.word]: 'known' }; setMastery(m); localStorage.setItem('lm_mastery', JSON.stringify(m)); addVocab(card.word, mod.titleVi); toast('success', 'Đã lưu', card.word); }}>
                <IHub name={mastery[card.word] === 'known' ? 'check' : 'plus'} size={14} /> {mastery[card.word] === 'known' ? 'Đã thuộc' : 'Lưu'}</button>
            </div>
          ))}
          <button className="btn btn-primary btn-block" onClick={() => { setDone(true); onDone && onDone(); }}>Hoàn thành</button>
        </div>
      )}
    </div>
  );
}

/* ============================ Grammar study ============================ */
function GrammarStudy({ mod, onBack, onDone, toast }) {
  const [got, setGot] = hS({});
  const all = mod.grammar;
  function toggle(idx) { setGot(g => ({ ...g, [idx]: !g[idx] })); }
  const understood = Object.values(got).filter(Boolean).length;
  return (
    <div className="lm-study fade-up">
      <div className="lm-study-bar">
        <button className="lm-icon-btn" onClick={onBack}><IHub name="arrowL" size={20} /></button>
        <div className="lm-study-titlewrap"><div className="lm-study-title">Ngữ pháp · {mod.titleVi}</div>
          <div className="lm-study-sub">{all.length} mẫu ngữ pháp · đã hiểu {understood}</div></div>
      </div>
      <div className="lm-gram-list">
        {all.map((g, idx) => (
          <div key={idx} className="lm-gram-card">
            <div className="lm-gram-head">
              <div className="lm-gram-pattern jp">{g.pattern}</div>
              <button className={`lm-gram-got ${got[idx] ? 'on' : ''}`} onClick={() => toggle(idx)}><IHub name="check" size={14} /> {got[idx] ? 'Đã hiểu' : 'Đánh dấu hiểu'}</button>
            </div>
            <div className="lm-gram-mean">{g.meaning}</div>
            <div className="lm-gram-explain">{g.explain}</div>
            <div className="lm-gram-ex-h">Ví dụ</div>
            {g.examples.map((ex, k) => (
              <div key={k} className="lm-gram-ex"><div className="jp">{ex.jp}</div><div className="lm-gram-ex-vi">{ex.vi}</div></div>
            ))}
          </div>
        ))}
      </div>
      <button className="btn btn-primary btn-block" onClick={() => { onDone && onDone(); onBack(); toast('success', 'Đã học ngữ pháp', mod.titleVi); }}>Hoàn thành ngữ pháp</button>
    </div>
  );
}

/* ============================ Small test (vocab + grammar) ============================ */
function SmallTest({ mod, onBack, onDone, toast }) {
  const qs = mod.test;
  const [i, setI] = hS(0);
  const [answers, setAnswers] = hS({});
  const [reveal, setReveal] = hS(false);
  const [phase, setPhase] = hS('run');
  const q = qs[i];
  const picked = answers[q.id];

  function pick(idx) { if (reveal) return; setAnswers(a => ({ ...a, [q.id]: idx })); setReveal(true); }
  function next() {
    if (i < qs.length - 1) { setI(i + 1); setReveal(false); }
    else {
      const finalA = answers;
      const correct = qs.filter(x => finalA[x.id] === x.correct).length;
      const score = Math.round(correct / qs.length * 100);
      if (onDone) onDone(score);
      setPhase('result');
    }
  }

  if (phase === 'result') {
    const correct = qs.filter(x => answers[x.id] === x.correct).length;
    const score = Math.round(correct / qs.length * 100);
    return (
      <div className="lm-study-done fade-up">
        <div className={`lm-score-ring ${score >= 80 ? 'hi' : score >= 60 ? 'mid' : 'low'}`} style={{ margin: '0 auto 16px' }}><span className="lm-score-n font-display">{score}<small>%</small></span></div>
        <h3 className="font-display">{score >= 60 ? 'Đạt! 🎉' : 'Cần ôn lại'}</h3>
        <p>Đúng <b>{correct}/{qs.length}</b> câu kết hợp từ vựng &amp; ngữ pháp của bài.</p>
        <div className="row gap-10" style={{ justifyContent: 'center' }}>
          <button className="btn btn-soft" onClick={() => { setI(0); setAnswers({}); setReveal(false); setPhase('run'); }}><IHub name="refresh" size={16} /> Làm lại</button>
          <button className="btn btn-primary" onClick={onBack}>Về bài học</button>
        </div>
      </div>
    );
  }

  return (
    <div className="lm-study fade-up">
      <div className="lm-study-bar">
        <button className="lm-icon-btn" onClick={onBack}><IHub name="arrowL" size={20} /></button>
        <div className="lm-study-titlewrap"><div className="lm-study-title">Bài kiểm tra · {mod.titleVi}</div>
          <div className="lm-study-sub">Từ vựng + ngữ pháp đã học</div></div>
        <div className="grow" />
        <div className="lm-run-prog"><div className="lm-run-prog-bar"><span style={{ width: `${((i + (reveal ? 1 : 0)) / qs.length) * 100}%` }} /></div><span>{i + 1}/{qs.length}</span></div>
      </div>
      <div className="lm-q fade-up">
        <div className="lm-q-head"><span className="lm-q-no">Câu {i + 1}<span className="muted">/{qs.length}</span></span>
          <span className={`chip ${q.tag === 'grammar' ? 'chip-lav' : 'chip-teal'}`}>{q.tag === 'grammar' ? 'Ngữ pháp' : 'Từ vựng'} · {q.ref}</span></div>
        <div className="lm-q-prompt jp">{q.q}</div>
        {q.qVi && <div className="lm-q-prompt-vi">{q.qVi}</div>}
        <div className="lm-q-choices">
          {q.choices.map((c, ci) => {
            let cls = ''; if (reveal) { if (ci === q.correct) cls = 'correct'; else if (ci === picked) cls = 'wrong'; } else if (ci === picked) cls = 'picked';
            return (
              <button key={ci} className={`lm-choice ${cls}`} disabled={reveal} onClick={() => pick(ci)}>
                <span className="lm-choice-k">{String.fromCharCode(65 + ci)}</span><span className="jp">{c}</span>
                {reveal && ci === q.correct && <span className="lm-choice-mark ok"><IHub name="check" size={16} /></span>}
                {reveal && ci === picked && ci !== q.correct && <span className="lm-choice-mark no"><IHub name="x" size={16} /></span>}
              </button>
            );
          })}
        </div>
      </div>
      <div className="lm-run-foot"><div className="grow" />
        {reveal && <button className="btn btn-primary" onClick={next}>{i < qs.length - 1 ? 'Câu tiếp theo →' : 'Xem kết quả →'}</button>}
      </div>
    </div>
  );
}

/* ============================ Shadowing activity ============================ */
function ShadowActivity({ mod, onBack, onDone, toast }) {
  const lines = (mod.roleplay && mod.roleplay.map(r => ({ jp: r.reply, vi: r.viReply }))) || mod.vocabulary.map(v => ({ jp: v.ex, vi: v.exVi }));
  const [i, setI] = hS(0);
  const [rec, setRec] = hS(false);
  return (
    <div className="lm-study fade-up">
      <div className="lm-study-bar">
        <button className="lm-icon-btn" onClick={onBack}><IHub name="arrowL" size={20} /></button>
        <div className="lm-study-titlewrap"><div className="lm-study-title">Shadowing · {mod.titleVi}</div><div className="lm-study-sub">Nghe và nói nhại lại · {i + 1}/{lines.length}</div></div>
      </div>
      <div className="lm-shadow-card">
        <div className="lm-shadow-num">{i + 1}</div>
        <div className="lm-shadow-jp jp">{lines[i].jp}</div>
        <div className="lm-shadow-vi">{lines[i].vi}</div>
        <div className="lm-shadow-tools">
          <button className="lm-shadow-play" onClick={() => toast('info', 'Phát mẫu', 'Nghe câu mẫu (mô phỏng)')}><IHub name="volume" size={20} /></button>
          <button className={`lm-shadow-mic ${rec ? 'on' : ''}`} onClick={() => { setRec(r => !r); if (rec) toast('success', 'Đã ghi âm', 'So sánh với mẫu (mô phỏng)'); }}>
            <IHub name="mic" size={24} /> {rec ? 'Đang ghi… chạm để dừng' : 'Nhấn để nói theo'}</button>
        </div>
      </div>
      <div className="lm-run-foot">
        {i > 0 && <button className="btn btn-ghost" onClick={() => setI(i - 1)}>← Trước</button>}
        <div className="grow" />
        {i < lines.length - 1 ? <button className="btn btn-primary" onClick={() => { setRec(false); setI(i + 1); }}>Câu tiếp →</button>
          : <button className="btn btn-primary" onClick={() => { onDone && onDone(); onBack(); toast('success', 'Hoàn thành Shadowing', mod.titleVi); }}><IHub name="check" size={16} /> Hoàn thành</button>}
      </div>
    </div>
  );
}

/* ============================ Kaiwa activity ============================ */
function KaiwaActivity({ mod, onBack, onDone, toast }) {
  const turns = mod.roleplay || [];
  const [step, setStep] = hS(0);
  const [showReply, setShowReply] = hS(false);
  const cur = turns[step];
  if (!cur) return null;
  return (
    <div className="lm-study fade-up">
      <div className="lm-study-bar">
        <button className="lm-icon-btn" onClick={onBack}><IHub name="arrowL" size={20} /></button>
        <div className="lm-study-titlewrap"><div className="lm-study-title">Kaiwa · {mod.titleVi}</div><div className="lm-study-sub">Hội thoại thực tế · lượt {step + 1}/{turns.length}</div></div>
      </div>
      <div className="lm-kaiwa">
        <div className="lm-kaiwa-turn you">
          <div className="lm-kaiwa-who"><AvHub size={30} /> Bạn nói</div>
          <div className="lm-kaiwa-bubble you jp">{cur.you}</div>
          <div className="lm-kaiwa-vi">{cur.viYou}</div>
        </div>
        {showReply ? (
          <div className="lm-kaiwa-turn them fade-up">
            <div className="lm-kaiwa-who"><span className="lm-kaiwa-av"><IHub name="user" size={16} /></span> Đối phương</div>
            <div className="lm-kaiwa-bubble them jp">{cur.reply}</div>
            <div className="lm-kaiwa-vi">{cur.viReply}</div>
          </div>
        ) : (
          <button className="lm-kaiwa-reveal" onClick={() => setShowReply(true)}><IHub name="chat" size={18} /> Xem phản hồi của đối phương</button>
        )}
      </div>
      <div className="lm-run-foot"><div className="grow" />
        {showReply && (step < turns.length - 1
          ? <button className="btn btn-primary" onClick={() => { setShowReply(false); setStep(step + 1); }}>Lượt tiếp →</button>
          : <button className="btn btn-primary" onClick={() => { onDone && onDone(); onBack(); toast('success', 'Hoàn thành Kaiwa', mod.titleVi); }}><IHub name="check" size={16} /> Hoàn thành</button>)}
      </div>
    </div>
  );
}

/* ============================ Lesson Hub ============================ */
function LessonHub({ lessonId, mod, data, onExit, onComplete, toast, addVocab }) {
  const [view, setView] = hS('menu');
  const [prog, setProg] = hS(() => loadProg()[lessonId] || {});
  const t = window.NODE_TYPE[mod.type] || window.NODE_TYPE.listen;

  function markDone(part, val = true) { saveProgPart(lessonId, part, val); setProg(p => ({ ...p, [part]: val })); }
  function back() { setView('menu'); window.scrollTo(0, 0); }

  if (view === 'vocab') return <div className="lm-run"><VocabStudy mod={mod} onBack={back} onDone={() => markDone('vocab')} addVocab={addVocab} toast={toast} /></div>;
  if (view === 'grammar') return <div className="lm-run"><GrammarStudy mod={mod} onBack={back} onDone={() => markDone('grammar')} toast={toast} /></div>;
  if (view === 'test') return <div className="lm-run"><SmallTest mod={mod} onBack={back} onDone={(score) => { markDone('test', score); if (score >= 60) onComplete && onComplete(); }} toast={toast} /></div>;
  if (view === 'shadow') return <div className="lm-run"><ShadowActivity mod={mod} onBack={back} onDone={() => { markDone('activity'); onComplete && onComplete(); }} toast={toast} /></div>;
  if (view === 'kaiwa') return <div className="lm-run"><KaiwaActivity mod={mod} onBack={back} onDone={() => { markDone('activity'); onComplete && onComplete(); }} toast={toast} /></div>;
  if (view === 'listen') return <LessonRunner lesson={{ title: mod.titleVi }} mode="practice" data={data} onExit={back} toast={toast} addVocab={addVocab} />;
  if (view === 'exam') return <LessonRunner lesson={{ title: mod.titleVi }} mode="exam" data={data} onExit={back} toast={toast} addVocab={addVocab} />;

  const mastery = loadMastery();
  const knownN = mod.vocabulary.filter(v => mastery[v.word] === 'known').length;

  // function rows by type
  const rows = [];
  rows.push({ k: 'vocab', icon: 'book', tone: 'amber', name: 'Từ vựng', sub: `${mod.vocabulary.length} từ liên quan bài nghe`, preview: mod.vocabulary.slice(0, 5).map(v => v.word).join('、'), done: prog.vocab, badge: `${knownN}/${mod.vocabulary.length} thuộc` });
  rows.push({ k: 'grammar', icon: 'edit', tone: 'lav', name: 'Ngữ pháp', sub: `${mod.grammar.length} mẫu ngữ pháp`, preview: mod.grammar.map(g => g.pattern).join('  ·  '), done: prog.grammar });
  if (mod.type === 'shadow') rows.push({ k: 'shadow', icon: 'mic', tone: 'lav', name: 'Luyện Shadowing', sub: 'Nghe & nói nhại theo tốc độ tự nhiên', done: prog.activity });
  else if (mod.type === 'kaiwa') rows.push({ k: 'kaiwa', icon: 'chat', tone: 'coral', name: 'Kaiwa — Hội thoại', sub: 'Đóng vai hội thoại thực tế', done: prog.activity });
  else rows.push({ k: 'listen', icon: 'headphones', tone: 'teal', name: 'Nghe & Luyện tập', sub: '4 dạng bài: Trắc nghiệm · Điền câu · Form · Nối', done: prog.listen });
  rows.push({ k: 'test', icon: 'task', tone: 'info', name: 'Bài kiểm tra', sub: 'Tổng hợp từ vựng + ngữ pháp của bài', preview: 'Comprehensive training', done: prog.test != null, badge: prog.test != null ? `${prog.test}%` : null });

  return (
    <div className="lm-run fade-up">
      <div className="lm-run-bar">
        <button className="lm-icon-btn" onClick={onExit}><IHub name="arrowL" size={20} /></button>
        <div className="lm-run-info"><div className="lm-run-title">Bài học</div></div>
      </div>

      {/* hero */}
      <div className={`lm-hub-hero node-${t.color}`}>
        <div className="lm-hub-hero-art"><IHub name={t.icon} size={40} /></div>
        <div className="lm-hub-hero-body">
          <div className="lm-hub-hero-tag">{t.label}</div>
          <h2 className="lm-hub-title font-display jp">{mod.title}</h2>
          <div className="lm-hub-titlevi">{mod.titleVi}</div>
          <div className="lm-hub-meta">
            <span><IHub name="clock" size={15} /> {mod.mins}</span>
            <span><IHub name="zap" size={15} fill /> {mod.points} điểm</span>
            <span className="lm-hub-learners"><span className="lm-hub-avs"><i /><i /><i /></span> {mod.learners}+ đang học</span>
          </div>
        </div>
      </div>
      <p className="lm-hub-summary">{mod.summary}</p>

      {/* function rows */}
      <div className="lm-hub-rows">
        {rows.map(r => (
          <button key={r.k} className="lm-hub-row" onClick={() => { setView(r.k); window.scrollTo(0, 0); }}>
            <span className={`lm-hub-row-ic tone-${r.tone}`}><IHub name={r.icon} size={22} /></span>
            <div className="lm-hub-row-body">
              <div className="lm-hub-row-name">{r.name}{r.done && <span className="lm-hub-row-done"><IHub name="check" size={12} /> xong</span>}{r.badge && <span className="lm-hub-row-badge">{r.badge}</span>}</div>
              <div className="lm-hub-row-sub">{r.sub}</div>
              {r.preview && <div className="lm-hub-row-prev jp">{r.preview}</div>}
            </div>
            <IHub name="chevRight" size={20} style={{ color: 'var(--ink-300)', flexShrink: 0 }} />
          </button>
        ))}
      </div>

      {mod.type !== 'shadow' && mod.type !== 'kaiwa' && (
        <button className="btn btn-ghost btn-block" style={{ marginTop: 12 }} onClick={() => { setView('exam'); window.scrollTo(0, 0); }}>
          <IHub name="doc" size={16} /> Thi thật (có tính giờ)</button>
      )}
    </div>
  );
}

Object.assign(window, { LessonHub, VocabStudy, GrammarStudy, SmallTest });
