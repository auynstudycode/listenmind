/* ListenMind — Learn screen */
const { Icon: I1, StatusChip, Bar: Bar1, useCountdown: useCD1 } = window.LMC;

function GoalMini({ exam }) {
  const cd = useCD1(exam.date);
  return (
    <div className="lm-goal-mini">
      <div className="lm-goal-mini-ic"><I1 name="target" size={20} /></div>
      <div>
        <div className="lm-goal-mini-top">Mục tiêu · {exam.name}</div>
        <div className="lm-goal-mini-cd">
          còn <b>{cd.months}</b> tháng <b>{cd.days}</b> ngày <b>{cd.hours}</b> giờ <b>{cd.mins}</b> phút
        </div>
      </div>
    </div>
  );
}

function ProgressDashboard({ stats }) {
  const cells = [
    { k: 'done', label: 'Bài hoàn thành', val: `${stats.done}`, sub: `/ ${stats.total} bài`, icon: 'check', tone: 'ok' },
    { k: 'acc', label: 'Độ chính xác TB', val: `${stats.accuracy}%`, sub: 'tuần này', icon: 'target', tone: 'teal' },
    { k: 'streak', label: 'Streak', val: `${stats.streak}`, sub: 'ngày liên tiếp', icon: 'fire', tone: 'coral' },
    { k: 'weak', label: 'Kỹ năng cần cải thiện', val: stats.weak, sub: 'ưu tiên luyện', icon: 'zap', tone: 'lav', wide: true },
  ];
  return (
    <div className="lm-dash">
      {cells.map(c => (
        <div key={c.k} className={`lm-dash-cell tone-${c.tone} ${c.wide ? 'wide' : ''}`}>
          <span className="lm-dash-ic"><I1 name={c.icon} size={19} fill={c.icon === 'fire'} /></span>
          <div>
            <div className="lm-dash-val font-display">{c.val} <span className="lm-dash-sub">{c.sub}</span></div>
            <div className="lm-dash-lbl">{c.label}</div>
          </div>
        </div>
      ))}
    </div>
  );
}

function LessonCard({ lesson, onStart, onResults }) {
  const locked = lesson.locked;
  return (
    <div className={`lm-lesson ${locked ? 'locked' : ''}`}>
      <div className="lm-lesson-top">
        <span className="chip chip-teal">{lesson.topic}</span>
        {locked ? <span className="st st-locked"><I1 name="lock" size={12} /> Khóa</span> : <StatusChip status={lesson.status} />}
      </div>
      <div className="lm-lesson-title">{lesson.title}</div>

      <div className="lm-lesson-meta">
        <span><I1 name="clock" size={15} /> {lesson.mins} phút</span>
        {lesson.q > 0 && <span><I1 name="doc" size={15} /> {lesson.q} câu</span>}
        {lesson.vocab > 0 && <span><I1 name="book" size={15} /> {lesson.vocab} từ</span>}
        {lesson.note && <span className="has-note"><I1 name="note" size={15} /> note</span>}
      </div>

      {lesson.status === 'doing' && (
        <div className="lm-lesson-prog"><Bar1 value={lesson.progress} h={7} /><span>{lesson.progress}%</span></div>
      )}
      {(lesson.status === 'done' || lesson.status === 'retry') && (
        <div className="lm-lesson-score">
          <span className={lesson.status === 'retry' ? 'low' : 'hi'}>{lesson.score}%</span> điểm gần nhất
          {lesson.status === 'retry' && <button className="lm-retry-link" onClick={() => onResults(lesson)}>Xem câu sai →</button>}
        </div>
      )}

      {!locked ? (
        <div className="lm-lesson-cta">
          <button className="btn btn-soft btn-sm" onClick={() => onStart(lesson, 'practice')}>
            <I1 name="headphones" size={16} /> Luyện tập</button>
          <button className="btn btn-primary btn-sm" onClick={() => onStart(lesson, 'exam')}>
            <I1 name="doc" size={16} /> Thi thật</button>
        </div>
      ) : (
        <div className="lm-lesson-cta"><div className="lm-lesson-lockmsg"><I1 name="lock" size={14} /> Hoàn thành bài trước để mở khóa</div></div>
      )}
    </div>
  );
}

function LearnScreen({ data, track, levels, level, setLevel, onStart, onResults, exam }) {
  const groupIcon = { headphones: 'headphones', mic: 'mic', chat: 'chat', globe: 'globe' };
  const stats = { done: 6, total: 21, accuracy: 82, streak: data.user.streak, weak: 'Nghe nhanh' };

  return (
    <div className="fade-up">
      {/* screen header: route title + goal countdown top-right */}
      <div className="lm-learn-top">
        <div>
          <div className="eyebrow">Lộ trình của bạn</div>
          <h2 className="lm-learn-title font-display">{track.flag} {track.examName} · Cấp độ {level}</h2>
        </div>
        {exam && <GoalMini exam={exam} />}
      </div>

      {/* level rail */}
      <div className="lm-level-rail">
        <div className="lm-level-rail-lbl"><I1 name="flag" size={16} /> Cấp độ</div>
        <div className="lm-level-pills">
          {levels.map(lv => (
            <button key={lv} className={`lm-level-pill ${lv === level ? 'on' : ''}`} onClick={() => setLevel(lv)}>{lv}</button>
          ))}
        </div>
      </div>

      <ProgressDashboard stats={stats} />

      {/* groups */}
      {data.lessonGroups.map(g => (
        <section key={g.id} className="lm-group">
          <div className="lm-group-head">
            <span className="lm-group-ic"><I1 name={groupIcon[g.icon]} size={18} /></span>
            <h3 className="lm-group-name font-display">{g.name}</h3>
            <span className="lm-group-count">{g.lessons.length} bài</span>
          </div>
          <div className="lm-lesson-grid">
            {g.lessons.map(l => <LessonCard key={l.id} lesson={l} onStart={onStart} onResults={onResults} />)}
          </div>
        </section>
      ))}
    </div>
  );
}

function LessonListView({ data, levels, level, setLevel, onStart, onResults }) {
  const groupIcon = { headphones: 'headphones', mic: 'mic', chat: 'chat', globe: 'globe', swap: 'swap' };
  const stats = { done: 6, total: 21, accuracy: 82, streak: data.user.streak, weak: 'Nghe nhanh' };
  return (
    <div className="fade-up">
      <div className="lm-level-rail">
        <div className="lm-level-rail-lbl"><I1 name="flag" size={16} /> Cấp độ</div>
        <div className="lm-level-pills">
          {levels.map(lv => (
            <button key={lv} className={`lm-level-pill ${lv === level ? 'on' : ''}`} onClick={() => setLevel(lv)}>{lv}</button>
          ))}
        </div>
      </div>
      <ProgressDashboard stats={stats} />
      {data.lessonGroups.map(g => (
        <section key={g.id} className="lm-group">
          <div className="lm-group-head">
            <span className="lm-group-ic"><I1 name={groupIcon[g.icon] || 'headphones'} size={18} /></span>
            <h3 className="lm-group-name font-display">{g.name}</h3>
            <span className="lm-group-count">{g.lessons.length} bài</span>
          </div>
          <div className="lm-lesson-grid">
            {g.lessons.map(l => <LessonCard key={l.id} lesson={l} onStart={onStart} onResults={onResults} />)}
          </div>
        </section>
      ))}
    </div>
  );
}

Object.assign(window, { LearnScreen, LessonListView });
