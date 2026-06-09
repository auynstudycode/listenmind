/* ListenMind — Target screen (fully functional: goal editor, exam editor,
   recomputing AI plan, interactive daily tasks, diligence + weekly stats) */
const { Icon: IT, Avatar: AvT } = window.LMC;
const { useState: tS, useEffect: tE } = React;

const SKILL_OPTS = ['Nghe', 'Từ vựng', 'Ngữ pháp', 'Phản xạ', 'Phát âm'];

function loadTarget(base) { try { const v = JSON.parse(localStorage.getItem('lm_target_user')); return v ? { ...base, ...v } : base; } catch { return base; } }

function Stat({ label, value, sub, tone }) {
  return (
    <div className={`lm-mini-stat tone-${tone || 'teal'}`}>
      <div className="lm-mini-val font-display">{value}</div>
      <div className="lm-mini-lbl">{label}</div>
      {sub && <div className="lm-mini-sub">{sub}</div>}
    </div>
  );
}
function DiligenceGrid({ data }) {
  return (
    <div className="lm-heat">
      {Array.from({ length: 7 }).map((_, row) => (
        <div key={row} className="lm-heat-row">
          {Array.from({ length: 12 }).map((_, col) => {
            const v = data[col * 7 + row] || 0;
            return <span key={col} className="lm-heat-cell" style={{ background: v === 0 ? 'var(--ink-100)' : `color-mix(in srgb, var(--teal-600) ${20 + v * 20}%, var(--paper))` }} title={`${v} bài`} />;
          })}
        </div>
      ))}
    </div>
  );
}

/* ---------- countdown from date+time ---------- */
function countdownTo(dateStr, timeStr) {
  const target = new Date(`${dateStr}T${(timeStr || '13:00')}:00`).getTime();
  let diff = Math.max(0, target - Date.now());
  const days = Math.floor(diff / 86400000); diff -= days * 86400000;
  const hours = Math.floor(diff / 3600000); diff -= hours * 3600000;
  const mins = Math.floor(diff / 60000);
  const months = Math.floor(days / 30), remDays = days % 30;
  return { totalDays: days, months, days: remDays, hours, mins };
}

/* ============================ Goal editor modal ============================ */
function GoalEditor({ goal, levels, onSave, onClose }) {
  const [cur, setCur] = tS(goal.currentLevel);
  const [target, setTarget] = tS(goal.goalLevel);
  const [skills, setSkills] = tS(goal.skills);
  const [days, setDays] = tS(goal.daysPerWeek);
  const [mins, setMins] = tS(goal.minsPerDay);
  function toggleSkill(s) { setSkills(sk => sk.includes(s) ? sk.filter(x => x !== s) : [...sk, s]); }
  return (
    <div className="lm-overlay" onMouseDown={e => { if (e.target === e.currentTarget) onClose(); }}>
      <div className="lm-modal pop" style={{ maxWidth: 480 }}>
        <button className="lm-modal-x" onClick={onClose}><IT name="x" size={20} /></button>
        <div className="lm-modal-pad">
          <h2 className="lm-modal-title font-display">Thiết lập mục tiêu</h2>
          <p className="lm-modal-sub">Đặt cấp độ hiện tại, mục tiêu và tần suất học để AI lập kế hoạch phù hợp.</p>

          <div className="lm-form-grid2">
            <div className="field"><label>Cấp độ hiện tại</label>
              <select className="input" value={cur} onChange={e => setCur(e.target.value)}>{levels.map(l => <option key={l}>{l}</option>)}</select></div>
            <div className="field"><label>Cấp độ mục tiêu</label>
              <select className="input" value={target} onChange={e => setTarget(e.target.value)}>{levels.map(l => <option key={l}>{l}</option>)}</select></div>
          </div>

          <div className="field" style={{ marginTop: 16 }}><label>Kỹ năng muốn cải thiện</label>
            <div className="lm-skill-toggles">
              {SKILL_OPTS.map(s => (
                <button key={s} className={`lm-skill-tog ${skills.includes(s) ? 'on' : ''}`} onClick={() => toggleSkill(s)}>
                  {skills.includes(s) && <IT name="check" size={13} />} {s}</button>
              ))}
            </div>
          </div>

          <div className="lm-slider-row" style={{ marginTop: 18 }}>
            <label>Số buổi mỗi tuần <b>{days} buổi</b></label>
            <input type="range" className="lm-range" min="1" max="7" value={days} onChange={e => setDays(+e.target.value)} />
          </div>
          <div className="lm-slider-row">
            <label>Thời lượng mỗi buổi <b>{mins} phút</b></label>
            <input type="range" className="lm-range" min="10" max="120" step="5" value={mins} onChange={e => setMins(+e.target.value)} />
          </div>

          <div className="row gap-10" style={{ marginTop: 22 }}>
            <button className="btn btn-ghost grow" onClick={onClose}>Huỷ</button>
            <button className="btn btn-primary grow" disabled={!skills.length} onClick={() => onSave({ currentLevel: cur, goalLevel: target, skills, daysPerWeek: days, minsPerDay: mins })}>
              <IT name="check" size={16} /> Lưu mục tiêu</button>
          </div>
        </div>
      </div>
    </div>
  );
}

/* ============================ Exam editor modal ============================ */
function ExamEditor({ exam, onSave, onClose }) {
  const [name, setName] = tS(exam.name);
  const [date, setDate] = tS(exam.date);
  const [time, setTime] = tS(exam.time);
  const [place, setPlace] = tS(exam.place);
  const [note, setNote] = tS(exam.note);
  const [err, setErr] = tS('');
  function save() {
    if (!name || !date) { setErr('Vui lòng nhập tên kỳ thi và ngày thi.'); return; }
    if (new Date(`${date}T${time || '13:00'}:00`).getTime() < Date.now()) { setErr('Ngày thi phải ở tương lai.'); return; }
    onSave({ name, date, time: time || '13:00', place, note });
  }
  return (
    <div className="lm-overlay" onMouseDown={e => { if (e.target === e.currentTarget) onClose(); }}>
      <div className="lm-modal pop" style={{ maxWidth: 480 }}>
        <button className="lm-modal-x" onClick={onClose}><IT name="x" size={20} /></button>
        <div className="lm-modal-pad">
          <h2 className="lm-modal-title font-display">Đặt lịch thi</h2>
          <p className="lm-modal-sub">Đếm ngược và kế hoạch học sẽ tự cập nhật theo ngày thi của bạn.</p>
          <div className="field"><label>Tên kỳ thi</label><input className="input" value={name} onChange={e => setName(e.target.value)} placeholder="VD: JLPT N3" /></div>
          <div className="lm-form-grid2" style={{ marginTop: 14 }}>
            <div className="field"><label>Ngày thi</label><input className="input" type="date" value={date} onChange={e => setDate(e.target.value)} /></div>
            <div className="field"><label>Giờ thi</label><input className="input" type="time" value={time} onChange={e => setTime(e.target.value)} /></div>
          </div>
          <div className="field" style={{ marginTop: 14 }}><label>Địa điểm</label><input className="input" value={place} onChange={e => setPlace(e.target.value)} placeholder="Nơi thi" /></div>
          <div className="field" style={{ marginTop: 14 }}><label>Ghi chú</label><input className="input" value={note} onChange={e => setNote(e.target.value)} placeholder="VD: mang CCCD + ảnh thẻ" /></div>
          {err && <div className="lm-auth-err" style={{ marginTop: 14 }}><IT name="x" size={15} /> {err}</div>}
          <div className="row gap-10" style={{ marginTop: 22 }}>
            <button className="btn btn-ghost grow" onClick={onClose}>Huỷ</button>
            <button className="btn btn-primary grow" onClick={save}><IT name="check" size={16} /> Lưu lịch thi</button>
          </div>
        </div>
      </div>
    </div>
  );
}

/* ============================ TARGET SCREEN ============================ */
function TargetScreen({ data, track, toast }) {
  const base = data.target;
  const levels = (track && track.levels) || ['N5', 'N4', 'N3', 'N2', 'N1'];
  const curLv = (track && track.level) || base.currentLevel;
  const defaultGoalLv = levels[Math.min(levels.length - 1, Math.max(0, levels.indexOf(curLv)) + 1)] || base.goalLevel;
  const [goal, setGoal] = tS(() => loadTarget({}).goalState
    || { currentLevel: curLv, goalLevel: defaultGoalLv, skills: base.skills, daysPerWeek: base.daysPerWeek, minsPerDay: base.minsPerDay });
  const [exam, setExam] = tS(() => loadTarget({}).examState || { ...base.exam });
  const [applied, setApplied] = tS(() => loadTarget({}).applied || false);
  const [tasks, setTasks] = tS(() => loadTarget({}).tasks || null);
  const [tick, setTick] = tS(0);
  const [editGoal, setEditGoal] = tS(false);
  const [editExam, setEditExam] = tS(false);

  // persist
  tE(() => { try { localStorage.setItem('lm_target_user', JSON.stringify({ goalState: goal, examState: exam, applied, tasks })); } catch {} }, [goal, exam, applied, tasks]);
  // live countdown
  tE(() => { const t = setInterval(() => setTick(x => x + 1), 30000); return () => clearInterval(t); }, []);

  const cd = countdownTo(exam.date, exam.time);

  /* ---- AI plan recompute from goal + remaining days ---- */
  const plan = (() => {
    const gap = Math.max(1, levels.indexOf(goal.goalLevel) - levels.indexOf(goal.currentLevel));
    const totalLessons = 36 + gap * 18;                 // lessons to reach goal
    const weeksLeft = Math.max(1, Math.round(cd.totalDays / 7));
    const neededPerWeek = Math.ceil(totalLessons / weeksLeft);
    const perDay = Math.max(1, Math.ceil(neededPerWeek / goal.daysPerWeek));
    const capacityPerWeek = goal.daysPerWeek * 2;        // comfortable pace
    const needSpeedUp = neededPerWeek > capacityPerWeek;
    const focus = goal.skills[0] || 'Nghe';
    return { totalLessons, weeksLeft, perWeek: neededPerWeek, perDay, needSpeedUp, focus };
  })();

  function genTasks() {
    return [
      { id: 'k1', label: `Nghe ${plan.perDay} bài theo chủ đề (${plan.focus})`, done: false },
      { id: 'k2', label: `Ôn ${goal.minsPerDay >= 30 ? 12 : 8} từ vựng trong Sổ từ vựng`, done: false },
      { id: 'k3', label: '1 bài kiểm tra ngữ pháp ngắn', done: false },
      { id: 'k4', label: `${goal.skills.includes('Phát âm') ? 'Shadowing' : 'Nghe lại'} 5 phút trước khi ngủ`, done: false },
    ];
  }
  function applyPlan() { setTasks(genTasks()); setApplied(true); toast('success', 'Đã áp dụng kế hoạch', `${plan.perDay} bài/ngày · ${plan.perWeek} bài/tuần`); }
  function toggleTask(id) { setTasks(ts => ts.map(t => t.id === id ? { ...t, done: !t.done } : t)); }
  function saveGoal(g) { setGoal(g); setEditGoal(false); if (applied) setTasks(genTasks()); toast('success', 'Đã lưu mục tiêu', `${g.currentLevel} → ${g.goalLevel}`); }
  function saveExam(e) { setExam(e); setEditExam(false); toast('success', 'Đã lưu lịch thi', e.name); }
  function resetTarget() { localStorage.removeItem('lm_target_user'); setGoal({ currentLevel: curLv, goalLevel: defaultGoalLv, skills: base.skills, daysPerWeek: base.daysPerWeek, minsPerDay: base.minsPerDay }); setExam({ ...base.exam }); setApplied(false); setTasks(null); toast('info', 'Đã đặt lại mục tiêu'); }

  const ws = data.weekStats;
  const doneTasks = tasks ? tasks.filter(t => t.done).length : 0;

  return (
    <div className="fade-up lm-target">
      {/* goal + exam */}
      <div className="lm-target-top">
        <div className="card card-pad">
          <div className="lm-panel-h"><IT name="target" size={18} /> Mục tiêu của bạn
            <button className="lm-edit-btn" onClick={() => setEditGoal(true)} title="Chỉnh sửa"><IT name="edit" size={15} /></button>
          </div>
          <div className="lm-goal-flow">
            <div className="lm-goal-node"><span>Hiện tại</span><b>{goal.currentLevel}</b></div>
            <div className="lm-goal-arrow"><IT name="arrowR" size={20} /></div>
            <div className="lm-goal-node goal"><span>Mục tiêu</span><b>{goal.goalLevel}</b></div>
          </div>
          <div className="lm-goal-rows">
            <div><span>Kỹ năng cải thiện</span><div className="row gap-6" style={{ flexWrap: 'wrap', justifyContent: 'flex-end' }}>{goal.skills.map(s => <span key={s} className="chip chip-teal">{s}</span>)}</div></div>
            <div><span>Tần suất</span><b>{goal.daysPerWeek} buổi / tuần · {goal.minsPerDay} phút / buổi</b></div>
          </div>
          <button className="btn btn-soft btn-block btn-sm" style={{ marginTop: 14 }} onClick={() => setEditGoal(true)}><IT name="edit" size={15} /> Điều chỉnh mục tiêu</button>
        </div>

        <div className="card card-pad lm-exam-sched">
          <div className="lm-panel-h"><IT name="calendar" size={18} /> Lịch thi
            <button className="lm-edit-btn" onClick={() => setEditExam(true)} title="Chỉnh sửa"><IT name="edit" size={15} /></button>
          </div>
          <div className="lm-exam-name-big font-display">{exam.name}</div>
          <div className="lm-exam-info">
            <div><IT name="calendar" size={15} /> {new Date(exam.date).toLocaleDateString('vi-VN', { day: '2-digit', month: 'long', year: 'numeric' })} · {exam.time}</div>
            {exam.place && <div><IT name="flag" size={15} /> {exam.place}</div>}
            {exam.note && <div className="muted"><IT name="note" size={15} /> {exam.note}</div>}
          </div>
          <div className="lm-cd-big">
            {[['tháng', cd.months], ['ngày', cd.days], ['giờ', cd.hours], ['phút', cd.mins]].map(([l, v]) => (
              <div key={l} className="lm-cd-unit"><b className="font-display">{String(v).padStart(2, '0')}</b><span>{l}</span></div>
            ))}
          </div>
          <button className="btn btn-soft btn-block btn-sm" style={{ marginTop: 14 }} onClick={() => setEditExam(true)}><IT name="calendar" size={15} /> Đổi lịch thi</button>
        </div>
      </div>

      {/* AI plan */}
      <div className="lm-ai-card">
        <div className="lm-ai-glow" />
        <div className="lm-ai-head">
          <span className="lm-ai-ic"><IT name="sparkle" size={20} fill /></span>
          <div><div className="lm-ai-title font-display">AI gợi ý kế hoạch học</div>
            <div className="lm-ai-sub">Còn {cd.totalDays} ngày · {plan.weeksLeft} tuần tới kỳ thi · tần suất {goal.daysPerWeek} buổi/tuần</div></div>
          {plan.needSpeedUp ? <span className="lm-ai-warn"><IT name="zap" size={14} /> Cần tăng tốc</span> : <span className="lm-ai-ok"><IT name="check" size={14} /> Đúng tiến độ</span>}
        </div>
        <div className="lm-ai-grid">
          <div className="lm-ai-cell"><b className="font-display">{plan.perDay}</b><span>bài / ngày</span></div>
          <div className="lm-ai-cell"><b className="font-display">{plan.perWeek}</b><span>bài / tuần</span></div>
          <div className="lm-ai-cell focus"><b>{plan.focus}</b><span>ưu tiên luyện</span></div>
        </div>
        <div className="lm-ai-note"><IT name="sparkle" size={15} /> {plan.needSpeedUp
          ? `Với ${cd.totalDays} ngày còn lại, để đạt ${goal.goalLevel} bạn nên tăng lên ~${plan.perWeek} bài/tuần (hiện ${goal.daysPerWeek} buổi/tuần). Cân nhắc thêm buổi học hoặc kéo dài mỗi buổi.`
          : `Với tần suất hiện tại, bạn hoàn toàn kịp đạt ${goal.goalLevel} trước kỳ thi. Giữ đều ${plan.perDay} bài/ngày là đủ.`}</div>
        {!applied ? (
          <button className="btn btn-lav" onClick={applyPlan}><IT name="check" size={16} /> Áp dụng kế hoạch này</button>
        ) : (
          <div className="lm-ai-applied"><IT name="check" size={16} /> Đã áp dụng — xem nhiệm vụ hôm nay bên dưới
            <button className="lm-ai-recompute" onClick={applyPlan}><IT name="refresh" size={14} /> Tạo lại</button></div>
        )}
      </div>

      {/* daily tasks (only after applied) */}
      {applied && tasks && (
        <div className="card card-pad lm-tasks">
          <div className="lm-panel-h"><IT name="task" size={18} /> Nhiệm vụ hôm nay
            <span className="lm-tasks-prog">{doneTasks}/{tasks.length} hoàn thành</span></div>
          <div className="lm-tasks-bar"><span style={{ width: `${(doneTasks / tasks.length) * 100}%` }} /></div>
          <div className="lm-tasks-list">
            {tasks.map(t => (
              <button key={t.id} className={`lm-task-item ${t.done ? 'done' : ''}`} onClick={() => toggleTask(t.id)}>
                <span className="lm-task-check">{t.done && <IT name="check" size={14} />}</span>
                <span className="lm-task-label">{t.label}</span>
              </button>
            ))}
          </div>
          {doneTasks === tasks.length && <div className="lm-tasks-win"><IT name="trophy" size={18} /> Tuyệt vời! Bạn đã hoàn thành nhiệm vụ hôm nay 🎉</div>}
        </div>
      )}

      {/* diligence + weekly */}
      <div className="lm-target-bottom">
        <div className="card card-pad">
          <div className="lm-panel-h"><IT name="fire" size={18} /> Biểu đồ chăm chỉ</div>
          <DiligenceGrid data={data.diligence} />
          <div className="lm-heat-legend"><span>12 tuần qua</span><div className="row gap-4">Ít {[0, 1, 2, 3, 4].map(v => <span key={v} className="lm-heat-cell sm" style={{ background: v === 0 ? 'var(--ink-100)' : `color-mix(in srgb, var(--teal-600) ${20 + v * 20}%, var(--paper))` }} />)} Nhiều</div></div>
          <div className="lm-heat-stats">
            <Stat label="Streak" value={`${data.user.streak}`} sub="ngày" tone="coral" />
            <Stat label="Tổng giờ học" value="34h" tone="teal" />
            <Stat label="Bài hoàn thành" value="58" tone="lav" />
          </div>
        </div>

        <div className="card card-pad">
          <div className="lm-panel-h"><IT name="chart" size={18} /> Thống kê tuần này</div>
          <div className="lm-week-bars">
            {ws.perDay.map((v, i) => (
              <div key={i} className="lm-week-bar">
                <div className="lm-week-bar-track"><span style={{ height: `${(v / 4) * 100}%` }} /></div>
                <span className="lm-week-bar-lbl">{['T2', 'T3', 'T4', 'T5', 'T6', 'T7', 'CN'][i]}</span>
              </div>
            ))}
          </div>
          <div className="lm-week-goal">
            <div className="row gap-8" style={{ justifyContent: 'space-between' }}><span className="muted">Tiến độ tuần</span><b>{ws.totalLessons}/{ws.goalLessons} bài</b></div>
            <window.LMC.Bar value={(ws.totalLessons / ws.goalLessons) * 100} />
          </div>
          <div className="lm-week-stats">
            <Stat label="Luyện tập" value={ws.practice} tone="teal" />
            <Stat label="Thi thật" value={ws.exam} tone="lav" />
            <Stat label="Câu đúng" value={ws.correct} tone="ok" />
            <Stat label="Độ chính xác" value={`${ws.accuracy}%`} tone="coral" />
          </div>
        </div>
      </div>

      <button className="lm-reset-link" onClick={resetTarget}><IT name="refresh" size={14} /> Đặt lại mục tiêu về mặc định</button>

      {editGoal && <GoalEditor goal={goal} levels={levels} onSave={saveGoal} onClose={() => setEditGoal(false)} />}
      {editExam && <ExamEditor exam={exam} onSave={saveExam} onClose={() => setEditExam(false)} />}
    </div>
  );
}

Object.assign(window, { TargetScreen });
