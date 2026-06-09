/* ListenMind — Lesson runner (Practice + Exam) and Results */
const { Icon: IL, Avatar: AvL } = window.LMC;
const { useState: uS, useEffect: uE, useRef: uR } = React;

/* ============================ Audio Player ============================ */
function AudioPlayer({ label, compact }) {
  const [playing, setPlaying] = uS(false);
  const [pos, setPos] = uS(0);
  const [spd, setSpd] = uS(1);
  uE(() => {
    if (!playing) return;
    const t = setInterval(() => setPos(p => { const n = p + (0.9 * spd); if (n >= 100) { setPlaying(false); return 0; } return n; }), 60);
    return () => clearInterval(t);
  }, [playing, spd]);
  const bars = 38;
  return (
    <div className={`lm-audio ${compact ? 'compact' : ''}`}>
      <button className="lm-audio-play" onClick={() => setPlaying(p => !p)}>
        <IL name={playing ? 'pause' : 'play'} size={compact ? 20 : 26} fill />
      </button>
      <div className="lm-audio-mid">
        <div className="lm-wave">
          {Array.from({ length: bars }).map((_, i) => {
            const active = (i / bars) * 100 <= pos;
            const h = 6 + Math.abs(Math.sin(i * 0.7)) * (compact ? 14 : 24);
            return <span key={i} className={`lm-wbar ${active ? 'on' : ''} ${playing && active ? 'live' : ''}`}
              style={{ height: h, animationDelay: `${(i % 6) * 80}ms` }} />;
          })}
        </div>
        {!compact && <div className="lm-audio-meta">{label} · <IL name="volume" size={13} style={{ verticalAlign: '-2px' }} /> {spd}x</div>}
      </div>
      <div className="lm-spd">
        {[0.75, 1, 1.25, 1.5].map(s => (
          <button key={s} className={`lm-spd-b ${spd === s ? 'on' : ''}`} onClick={() => setSpd(s)}>{s}x</button>
        ))}
      </div>
    </div>
  );
}

/* ============================ Vocab selection popover ============================ */
function VocabPopover({ x, y, word, onAct, onClose }) {
  const acts = [
    { k: 'save', icon: 'bookmark', label: 'Lưu vào sổ' },
    { k: 'note', icon: 'note', label: 'Thêm note' },
    { k: 'mean', icon: 'eye', label: 'Xem nghĩa' },
    { k: 'review', icon: 'flag', label: 'Cần ôn lại' },
  ];
  return (
    <>
      <div className="lm-vp-scrim" onMouseDown={onClose} />
      <div className="lm-vp pop" style={{ left: x, top: y }}>
        <div className="lm-vp-word jp">{word}</div>
        <div className="lm-vp-acts">
          {acts.map(a => (
            <button key={a.k} className="lm-vp-act" onClick={() => onAct(a.k, word)}>
              <IL name={a.icon} size={16} /> {a.label}
            </button>
          ))}
        </div>
      </div>
    </>
  );
}

/* ============================ Script view (selection + clickable vocab) ============================ */
function ScriptView({ script, highlights, onVocab, jumpTo }) {
  const ref = uR(null);
  const [pop, setPop] = uS(null);

  function handleMouseUp(e) {
    const sel = window.getSelection();
    const text = sel.toString().trim();
    if (!text || text.length > 24) { return; }
    const rect = ref.current.getBoundingClientRect();
    const r = sel.getRangeAt(0).getBoundingClientRect();
    setPop({ x: r.left - rect.left + r.width / 2 - 96, y: r.top - rect.top - 8, word: text });
  }

  return (
    <div className="lm-script" ref={ref} onMouseUp={handleMouseUp}>
      {script.map((s, i) => (
        <div key={i} className={`lm-script-line ${jumpTo === i ? 'jump' : ''}`} id={`sl-${i}`}>
          <div className="lm-script-sp">{s.sp}</div>
          <div className="lm-script-body">
            <div className="lm-script-jp jp">
              {s.line.split('').map((ch, ci) => ch)}
              {s.vocab && s.vocab.map(v => (
                <button key={v} className={`lm-vocab-tok jp ${highlights.includes(v) ? 'hl' : ''}`}
                  onClick={(e) => {
                    const rect = ref.current.getBoundingClientRect();
                    const r = e.currentTarget.getBoundingClientRect();
                    setPop({ x: r.left - rect.left + r.width / 2 - 96, y: r.top - rect.top - 8, word: v });
                  }}>{v}</button>
              ))}
            </div>
            <div className="lm-script-vi">{s.vi}</div>
          </div>
        </div>
      ))}
      {pop && <VocabPopover {...pop} onClose={() => setPop(null)}
        onAct={(k, w) => { onVocab(k, w); setPop(null); }} />}
      <div className="lm-script-hint"><IL name="zap" size={14} /> Bôi đen hoặc chạm vào từ trong script để lưu / ghi chú / xem nghĩa</div>
    </div>
  );
}

/* ============================ Practice-type picker ============================ */
function PracticeTypePicker({ lesson, sets, order, onPick, onExit }) {
  return (
    <div className="lm-run fade-up">
      <div className="lm-run-bar">
        <button className="lm-icon-btn" onClick={onExit}><IL name="arrowL" size={20} /></button>
        <div className="lm-run-info">
          <div className="lm-run-title">{lesson.title}</div>
          <div className="lm-run-mode"><span className="lm-mode-tag practice"><IL name="headphones" size={13} /> Luyện tập</span></div>
        </div>
      </div>
      <div className="lm-picker-intro">
        <h3 className="font-display">Chọn dạng bài luyện tập</h3>
        <p>Mỗi dạng có cấu trúc câu hỏi riêng. Sau khi làm, bạn sẽ xem được <b>transcript</b>, <b>từ vựng</b> và <b>answer key</b> đầy đủ.</p>
      </div>
      <div className="lm-picker-grid">
        {order.map((k, i) => {
          const s = sets[k];
          const count = s.key === 'form' ? s.rows.filter(r => r.gap).length : s.key === 'matching' ? s.items.length : s.questions.length;
          return (
            <button key={k} className="lm-picker-card" onClick={() => onPick(k)}>
              <div className="lm-picker-num">{i + 1}</div>
              <span className="lm-picker-ic"><IL name={s.icon} size={24} /></span>
              <div className="lm-picker-name">{s.name}</div>
              <div className="lm-picker-name-vi">{s.nameVi}</div>
              <div className="lm-picker-desc">{s.short}</div>
              <div className="lm-picker-foot"><span className="chip chip-teal">{count} câu</span><span className="lm-picker-go"><IL name="arrowR" size={16} /></span></div>
            </button>
          );
        })}
      </div>
    </div>
  );
}

/* ============================ Lesson Runner ============================ */
function LessonRunner({ lesson, mode, data, onExit, toast, addVocab }) {
  const exam = mode === 'exam';
  const sets = data.practiceSets;
  const [qtype, setQtype] = uS(exam ? 'mc' : null);   // exam → straight to a full test (mc)
  const [phase, setPhase] = uS('run');                 // run | result
  const [answers, setAnswers] = uS({});
  const [secs, setSecs] = uS(exam ? 600 : 0);

  uE(() => { if (!exam || phase !== 'run' || !qtype) return; const t = setInterval(() => setSecs(s => Math.max(0, s - 1)), 1000); return () => clearInterval(t); }, [exam, phase, qtype]);

  // Luyện tập with no type chosen yet → show the 4-type picker
  if (!qtype) {
    return <PracticeTypePicker lesson={lesson} sets={sets} order={data.practiceOrder}
      onPick={(k) => { setQtype(k); setAnswers({}); setPhase('run'); }} onExit={onExit} />;
  }

  const set = sets[qtype];
  const total = set.key === 'form' ? set.rows.filter(r => r.gap).length : set.key === 'matching' ? set.items.length : set.questions.length;
  const answered = Object.keys(answers).filter(k => answers[k] !== '' && answers[k] != null).length;

  function onChange(id, v) { setAnswers(a => ({ ...a, [id]: v })); }
  function changeType() { setQtype(null); setAnswers({}); setPhase('run'); setSecs(exam ? 600 : 0); window.scrollTo(0, 0); }
  function reset() { setAnswers({}); setPhase('run'); setSecs(exam ? 600 : 0); window.scrollTo(0, 0); }

  if (phase === 'result') {
    const result = window.LMP.gradePractice(set, answers);
    return <ResultsView lesson={lesson} mode={mode} set={set} result={result} answers={answers} data={data}
      onExit={onExit} onRetry={reset} onChangeType={!exam ? changeType : null} toast={toast} addVocab={addVocab} />;
  }

  const Task = { mc: window.LMP.McTask, sentence: window.LMP.SentenceTask, form: window.LMP.FormTask, matching: window.LMP.MatchingTask }[set.key];
  const mm = String(Math.floor(secs / 60)).padStart(2, '0'), ss = String(secs % 60).padStart(2, '0');

  return (
    <div className="lm-run fade-up">
      <div className="lm-run-bar">
        <button className="lm-icon-btn" onClick={onExit}><IL name="arrowL" size={20} /></button>
        <div className="lm-run-info">
          <div className="lm-run-title">{lesson.title}</div>
          <div className="lm-run-mode">
            <span className={`lm-mode-tag ${exam ? 'exam' : 'practice'}`}><IL name={set.icon} size={13} /> {exam ? 'Thi thật' : 'Luyện tập'} · {set.name}</span>
          </div>
        </div>
        <div className="grow" />
        {exam && <div className={`lm-timer ${secs < 60 ? 'danger' : ''}`}><IL name="clock" size={16} /> {mm}:{ss}</div>}
        {!exam && <button className="btn btn-ghost btn-sm" onClick={changeType}><IL name="swap" size={15} /> Đổi dạng</button>}
        <div className="lm-run-prog">
          <div className="lm-run-prog-bar"><span style={{ width: `${(answered / total) * 100}%` }} /></div>
          <span>{answered}/{total}</span>
        </div>
      </div>

      <div className="lm-instruction"><IL name="flag" size={16} /><div><b>{set.name}</b> — {set.instruction}</div></div>

      <div className="card card-pad" style={{ marginBottom: 16 }}>
        <div className="lm-panel-h"><IL name="headphones" size={18} /> {set.audio}</div>
        <AudioPlayer label={set.audio} />
      </div>

      <div className="lm-task-card"><Task set={set} answers={answers} onChange={onChange} /></div>

      <div className="lm-run-foot">
        <div className="muted" style={{ fontSize: 13, fontWeight: 600 }}>{answered < total ? `Còn ${total - answered} câu chưa trả lời` : 'Đã trả lời tất cả ✓'}</div>
        <div className="grow" />
        <button className="btn btn-primary btn-lg" onClick={() => { setPhase('result'); window.scrollTo(0, 0); }}><IL name="check" size={17} /> Nộp bài &amp; xem đáp án</button>
      </div>
    </div>
  );
}

/* ============================ Results (answer key + transcript + vocab) ============================ */
function ResultsView({ lesson, mode, set, result, answers, data, onExit, onRetry, onChangeType, toast, addVocab }) {
  const [highlights, setHighlights] = uS([]);
  const [reviewSet, setReviewSet] = uS([]);
  const [tab, setTab] = uS('key');   // mobile tabs: key | script
  const [savedV, setSavedV] = uS([]);
  const score = result.score;
  const wrong = result.items.filter(i => !i.ok);
  const explains = result.items.filter(i => i.explain && !i.ok);

  function onVocab(k, word) {
    if (k === 'save') { addVocab(word, lesson.title); setSavedV(s => [...new Set([...s, word])]); toast('success', 'Đã lưu từ vựng', `“${word}” thêm vào Sổ từ vựng`); }
    else if (k === 'note') toast('info', 'Thêm ghi chú', `Ghi chú cho “${word}”`);
    else if (k === 'mean') toast('info', word, 'Hiển thị nghĩa & cách đọc');
    else if (k === 'review') { setReviewSet(s => [...s, word]); toast('info', 'Đã đánh dấu ôn tập', `“${word}”`); }
    if (k === 'save' || k === 'mean') setHighlights(h => h.includes(word) ? h : [...h, word]);
  }
  function saveVocabItem(v) { addVocab(v.word, lesson.title); setSavedV(s => [...new Set([...s, v.word])]); toast('success', 'Đã lưu từ vựng', `“${v.word}” — ${v.meaning}`); }

  return (
    <div className="lm-result fade-up">
      {/* score header */}
      <div className="lm-result-head">
        <button className="lm-icon-btn" onClick={onExit}><IL name="arrowL" size={20} /></button>
        <div className={`lm-score-ring ${score >= 80 ? 'hi' : score >= 60 ? 'mid' : 'low'}`}>
          <span className="lm-score-n font-display">{score}<small>%</small></span>
        </div>
        <div className="lm-result-meta">
          <div className="lm-result-title font-display">{score >= 80 ? 'Làm tốt lắm! 🎉' : score >= 60 ? 'Khá ổn, cần luyện thêm' : 'Cùng làm lại nhé'}</div>
          <div className="lm-result-sub">{lesson.title} · <b>{set.name}</b> · {mode === 'exam' ? 'Thi thật' : 'Luyện tập'}</div>
          <div className="lm-result-stats">
            <span className="ok"><IL name="check" size={15} /> {result.correct} đúng</span>
            <span className="no"><IL name="x" size={15} /> {result.total - result.correct} sai</span>
            <span><IL name="book" size={15} /> {savedV.length} từ đã lưu</span>
          </div>
        </div>
        <div className="grow" />
        <div className="lm-result-actions">
          {onChangeType && <button className="btn btn-ghost" onClick={onChangeType}><IL name="swap" size={16} /> Đổi dạng</button>}
          <button className="btn btn-soft" onClick={onRetry}><IL name="refresh" size={16} /> Làm lại</button>
          <button className="btn btn-primary" onClick={onExit}>Xong</button>
        </div>
      </div>

      <div className="lm-result-tabs">
        <button className={tab === 'key' ? 'on' : ''} onClick={() => setTab('key')}>Answer key</button>
        <button className={tab === 'script' ? 'on' : ''} onClick={() => setTab('script')}>Transcript &amp; từ vựng</button>
      </div>

      <div className="lm-result-split">
        {/* LEFT: answer key + explanations */}
        <div className={`lm-result-left ${tab === 'key' ? 'show' : ''}`}>
          <div className="card card-pad">
            <div className="lm-panel-h"><IL name="task" size={18} /> Answer key · Bảng đáp án</div>
            <window.LMP.AnswerKey result={result} />
          </div>
          {explains.length > 0 && (
            <div className="card card-pad">
              <div className="lm-panel-h"><IL name="sparkle" size={18} /> Giải thích câu sai</div>
              {explains.map(it => (
                <div key={it.id} className="lm-wrong">
                  <div className="lm-wrong-q jp"><span className="lm-qn sm">{it.n}</span> {it.label}</div>
                  <div className="lm-wrong-rows">
                    <div className="lm-wrong-row no"><span>Bạn chọn</span><b className="jp">{it.your || '— bỏ trống —'}</b></div>
                    <div className="lm-wrong-row ok"><span>Đáp án đúng</span><b className="jp">{it.correct}</b></div>
                  </div>
                  <div className="lm-wrong-explain">{it.explain}</div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* RIGHT: transcript + vocab */}
        <div className={`lm-result-right ${tab === 'script' ? 'show' : ''}`}>
          <div className="card card-pad">
            <div className="lm-panel-h"><IL name="headphones" size={18} /> Audio &amp; Transcript</div>
            <AudioPlayer label={set.audio} />
            <div style={{ height: 14 }} />
            <ScriptView script={set.transcript} highlights={highlights} onVocab={onVocab} jumpTo={-1} />
          </div>
          <div className="card card-pad">
            <div className="lm-panel-h"><IL name="book" size={18} /> Từ vựng trọng tâm</div>
            <div className="lm-vlist">
              {set.vocab.map(v => (
                <div key={v.word} className="lm-vlist-row">
                  <div className="lm-vlist-main">
                    <span className="lm-vlist-word jp">{v.word}</span>
                    {v.reading && <span className="lm-vlist-read jp">{v.reading}</span>}
                    <span className="lm-vlist-mean">{v.meaning}</span>
                  </div>
                  <button className={`lm-vlist-save ${savedV.includes(v.word) ? 'done' : ''}`} onClick={() => saveVocabItem(v)}>
                    <IL name={savedV.includes(v.word) ? 'check' : 'plus'} size={15} /> {savedV.includes(v.word) ? 'Đã lưu' : 'Lưu'}
                  </button>
                </div>
              ))}
            </div>
          </div>
          {reviewSet.length > 0 && (
            <div className="card card-pad">
              <div className="lm-panel-h"><IL name="flag" size={18} /> Đánh dấu ôn lại</div>
              <div className="row gap-8" style={{ flexWrap: 'wrap' }}>{reviewSet.map(w => <span key={w} className="chip chip-lav jp">{w}</span>)}</div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

Object.assign(window, { LessonRunner });
