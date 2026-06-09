/* ListenMind — IELTS-style practice question types + grading
   Exposes: window.LMP = { gradePractice, McTask, SentenceTask, FormTask, MatchingTask, AnswerKey } */
const { Icon: IP } = window.LMC;

/* ---------- text matching ---------- */
function lmNorm(s) { return (s || '').toString().trim().toLowerCase().replace(/\s+/g, '').replace(/[。、．，.,]/g, ''); }
function lmMatch(val, ans, alt) {
  const n = lmNorm(val); if (!n) return false;
  if (n === lmNorm(ans)) return true;
  return (alt || []).some(a => lmNorm(a) === n);
}

/* ---------- unified grader ---------- */
function gradePractice(set, answers) {
  const items = [];
  if (set.key === 'mc') {
    set.questions.forEach((q, i) => {
      const a = answers[q.id];
      items.push({ id: q.id, n: i + 1, label: q.prompt, labelVi: q.promptVi,
        your: a != null ? q.choices[a] : null, correct: q.choices[q.correct], ok: a === q.correct, explain: q.explain });
    });
  } else if (set.key === 'sentence') {
    set.questions.forEach((q, i) => {
      const a = answers[q.id];
      items.push({ id: q.id, n: i + 1, label: `${q.before} ___ ${q.after}`, labelVi: `${q.beforeVi || ''} ___ ${q.afterVi || ''}`,
        your: a || null, correct: q.answer, ok: lmMatch(a, q.answer, q.alt) });
    });
  } else if (set.key === 'form') {
    set.rows.filter(r => r.gap).forEach((r, i) => {
      const a = answers[r.id];
      items.push({ id: r.id, n: i + 1, label: `${r.label} / ${r.labelVi}`, your: a || null, correct: r.answer, ok: lmMatch(a, r.answer, r.alt) });
    });
  } else if (set.key === 'matching') {
    const opt = k => set.options.find(o => o.key === k);
    set.items.forEach((it, i) => {
      const a = answers[it.id];
      items.push({ id: it.id, n: i + 1, label: `${it.text}${it.textVi ? ` (${it.textVi})` : ''}`,
        your: a ? `${a}. ${opt(a)?.text || ''}` : null, correct: `${it.answer}. ${opt(it.answer)?.text || ''}`, ok: a === it.answer });
    });
  }
  const correct = items.filter(x => x.ok).length;
  return { items, correct, total: items.length, score: items.length ? Math.round(correct / items.length * 100) : 0 };
}

/* ============================ 1 · MULTIPLE CHOICE ============================ */
function McTask({ set, answers, onChange }) {
  return (
    <div className="lm-task-list">
      {set.questions.map((q, i) => (
        <div key={q.id} className="lm-task-q">
          <div className="lm-task-qhead"><span className="lm-qn">{i + 1}</span>
            <div><div className="lm-task-prompt jp">{q.prompt}</div><div className="lm-task-prompt-vi">{q.promptVi}</div></div>
          </div>
          <div className="lm-mc-choices">
            {q.choices.map((c, ci) => (
              <button key={ci} className={`lm-mc-opt ${answers[q.id] === ci ? 'on' : ''}`} onClick={() => onChange(q.id, ci)}>
                <span className="lm-mc-k">{String.fromCharCode(65 + ci)}</span><span className="jp">{c}</span>
              </button>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
}

/* ============================ 2 · SENTENCE COMPLETION ============================ */
function SentenceTask({ set, answers, onChange }) {
  return (
    <div className="lm-task-list">
      {set.questions.map((q, i) => (
        <div key={q.id} className="lm-sc-row">
          <span className="lm-qn">{i + 1}</span>
          <div className="lm-sc-body">
            <div className="lm-sc-line jp">
              {q.before}{' '}
              <input className="lm-gap-input" value={answers[q.id] || ''} placeholder="..."
                onChange={e => onChange(q.id, e.target.value)} />{' '}
              {q.after}
            </div>
            <div className="lm-sc-vi">{q.beforeVi} <b>____</b> {q.afterVi}</div>
          </div>
        </div>
      ))}
    </div>
  );
}

/* ============================ 3 · FORM / TABLE COMPLETION ============================ */
function FormTask({ set, answers, onChange }) {
  let gi = 0;
  return (
    <div className="lm-form-task">
      <div className="lm-form-title">
        <span className="jp">{set.formTitle}</span>
        <span className="lm-form-title-vi">{set.formTitleVi}</span>
      </div>
      <div className="lm-form-rows">
        {set.rows.map((r, i) => {
          const isGap = r.gap; if (isGap) gi++;
          return (
            <div key={i} className={`lm-form-row ${isGap ? 'gap' : ''}`}>
              <div className="lm-form-label"><span className="jp">{r.label}</span><span className="lm-form-label-vi">{r.labelVi}</span></div>
              <div className="lm-form-value">
                {isGap ? (
                  <div className="lm-form-gapwrap"><span className="lm-qn sm">{gi}</span>
                    <input className="lm-gap-input wide" value={answers[r.id] || ''} placeholder="Điền đáp án..."
                      onChange={e => onChange(r.id, e.target.value)} /></div>
                ) : <span className="lm-form-fixed jp">{r.value}</span>}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

/* ============================ 4 · MATCHING INFORMATION ============================ */
function MatchingTask({ set, answers, onChange }) {
  const used = Object.values(answers);
  return (
    <div className="lm-match-task">
      <div className="lm-match-legend">
        <div className="lm-match-legend-h">Lựa chọn</div>
        {set.options.map(o => (
          <div key={o.key} className="lm-match-opt"><span className="lm-match-k">{o.key}</span>
            <span className="jp">{o.text}</span><span className="lm-match-opt-vi">{o.textVi}</span></div>
        ))}
      </div>
      <div className="lm-match-items">
        {set.items.map((it, i) => (
          <div key={it.id} className="lm-match-row">
            <span className="lm-qn">{i + 1}</span>
            <div className="lm-match-person"><span className="jp">{it.text}</span><span className="lm-match-person-vi">{it.textVi}</span></div>
            <div className="lm-match-selwrap">
              <select className="lm-match-sel" value={answers[it.id] || ''} onChange={e => onChange(it.id, e.target.value)}>
                <option value="">— chọn —</option>
                {set.options.map(o => <option key={o.key} value={o.key}>{o.key}. {o.text}</option>)}
              </select>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

/* ============================ ANSWER KEY (results) ============================ */
function AnswerKey({ result }) {
  return (
    <div className="lm-ak">
      <div className="lm-ak-head">
        <span>#</span><span>Câu hỏi</span><span>Bạn trả lời</span><span>Đáp án đúng</span>
      </div>
      {result.items.map(it => (
        <div key={it.id} className={`lm-ak-row ${it.ok ? 'ok' : 'no'}`}>
          <span className="lm-ak-n">{it.ok ? <IP name="check" size={14} /> : <IP name="x" size={14} />}{it.n}</span>
          <span className="lm-ak-q jp">{it.label}</span>
          <span className={`lm-ak-your ${it.ok ? '' : 'wrong'}`}>{it.your || <i>— bỏ trống —</i>}</span>
          <span className="lm-ak-correct jp">{it.correct}</span>
        </div>
      ))}
    </div>
  );
}

window.LMP = { gradePractice, McTask, SentenceTask, FormTask, MatchingTask, AnswerKey, lmMatch };
