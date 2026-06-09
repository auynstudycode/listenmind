/* ListenMind — Journey map (Lộ trình) + list-view toggle for the Học screen */
const { Icon: IPath, useCountdown: useCDp } = window.LMC;
const { useState: pathS, useEffect: pathE, useRef: pathR } = React;

const NODE_TYPE = {
  listen: { color: 'teal', icon: 'headphones', label: 'Bài nghe' },
  shadow: { color: 'lav', icon: 'mic', label: 'Shadowing' },
  kaiwa: { color: 'coral', icon: 'chat', label: 'Kaiwa' },
  ted: { color: 'amber', icon: 'globe', label: 'Ted Talk' },
  checkpoint: { color: 'gold', icon: 'trophy', label: 'Checkpoint' },
};
const OFFSETS = [0, 96, 18, -96, -18, 96];   // winding horizontal offsets

function PathNode({ node, mod, idx, state, onClick }) {
  const t = node.type === 'checkpoint' ? NODE_TYPE.checkpoint : NODE_TYPE[mod.type] || NODE_TYPE.listen;
  const dx = OFFSETS[idx % OFFSETS.length];
  const title = node.type === 'checkpoint' ? node.title : mod.titleVi;
  const sub = node.type === 'checkpoint' ? 'Tổng hợp cả phần' : (NODE_TYPE[mod.type] || {}).label;
  return (
    <div className="lm-pnode-row" style={{ transform: `translateX(${dx}px)` }}>
      <button className={`lm-pnode node-${t.color} st-${state} ${node.type === 'checkpoint' ? 'is-cp' : ''}`} onClick={onClick}>
        {state === 'current' && <span className="lm-pnode-flag">Bắt đầu</span>}
        <span className="lm-pnode-ic"><IPath name={state === 'locked' ? 'lock' : t.icon} size={node.type === 'checkpoint' ? 30 : 28} fill={state === 'done'} /></span>
        {state === 'done' && <span className="lm-pnode-badge"><IPath name="check" size={14} /></span>}
      </button>
      <div className="lm-pnode-cap">
        <div className="lm-pnode-title">{title}</div>
        <div className="lm-pnode-sub"><span className={`lm-dot dot-${t.color}`} />{sub}{node.type !== 'checkpoint' && ` · ${mod.mins}`}</div>
      </div>
    </div>
  );
}

function PathMap({ data, track, progressN, onOpenLesson, onCheckpoint, toast }) {
  const path = data.pathFor(track.lang, track.level);
  let flat = []; path.sections.forEach(s => s.nodes.forEach(n => flat.push({ ...n, section: s })));
  const totalNodes = flat.length;
  const nodeState = (i) => i < progressN ? 'done' : i === progressN ? 'current' : 'locked';

  let gi = -1;
  return (
    <div className="lm-pathmap">
      {path.demo && <div className="lm-path-demo"><IPath name="sparkle" size={14} /> Nội dung minh hoạ — dùng chung với lộ trình mẫu của cấp này.</div>}
      <div className="lm-path-start"><span className="lm-path-start-flag">{track.flag}</span> {track.examName} {track.level} · Bắt đầu hành trình</div>
      {path.sections.map((s) => (
        <section key={s.id} className="lm-path-sec">
          <div className="lm-path-sec-head"><span className="lm-path-sec-line" /><span className="lm-path-sec-title">{s.title}</span><span className="lm-path-sec-line" /></div>
          {s.nodes.map((n) => {
            gi++; const i = gi; const mod = n.lessonId ? data.lessonModules[n.lessonId] : null;
            const st = nodeState(i);
            return <PathNode key={n.id} node={n} mod={mod} idx={i} state={st}
              onClick={() => {
                if (st === 'locked') { toast('info', 'Bài học đã khoá', 'Hoàn thành bài trước để mở khoá'); return; }
                if (n.type === 'checkpoint') onCheckpoint(n, s); else onOpenLesson(n.lessonId, i);
              }} />;
          })}
        </section>
      ))}
      <div className="lm-path-end"><IPath name="flag" size={20} /> Hoàn thành {track.level} — sẵn sàng lên cấp tiếp theo!</div>
    </div>
  );
}

function ContinueCard({ data, track, progressN, onOpenLesson }) {
  const path = data.pathFor(track.lang, track.level);
  let flat = []; path.sections.forEach(s => s.nodes.forEach(n => flat.push(n)));
  const cur = flat[Math.min(progressN, flat.length - 1)];
  const mod = cur && cur.lessonId ? data.lessonModules[cur.lessonId] : null;
  const total = flat.length, done = Math.min(progressN, total);
  if (!mod) return null;
  const t = NODE_TYPE[mod.type] || NODE_TYPE.listen;
  return (
    <div className="lm-continue">
      <span className={`lm-continue-ic node-${t.color}`}><IPath name={t.icon} size={22} /></span>
      <div className="lm-continue-body">
        <div className="lm-continue-lbl">Tiếp tục học · {done}/{total} bài</div>
        <div className="lm-continue-title">{mod.titleVi}</div>
        <div className="lm-continue-bar"><span style={{ width: `${(done / total) * 100}%` }} /></div>
      </div>
      <button className="lm-continue-go" onClick={() => onOpenLesson(cur.lessonId, progressN)}><IPath name="play" size={22} fill /></button>
    </div>
  );
}

/* ============================ Path screen (map + list toggle) ============================ */
function PathScreen({ data, track, levels, level, setLevel, exam, progressN, onOpenLesson, onCheckpoint, onStart, onResults, toast }) {
  const [view, setView] = pathS(() => { try { return localStorage.getItem('lm_learnview') || 'map'; } catch { return 'map'; } });
  pathE(() => { try { localStorage.setItem('lm_learnview', view); } catch {} }, [view]);
  const cd = useCDp(exam.date);

  return (
    <div className="fade-up">
      <div className="lm-learn-top">
        <div>
          <div className="eyebrow">Lộ trình của bạn</div>
          <h2 className="lm-learn-title font-display">{track.flag} {track.examName} · Cấp độ {level}</h2>
        </div>
        <div className="lm-learn-top-right">
          <div className="lm-goal-mini">
            <div className="lm-goal-mini-ic"><IPath name="target" size={20} /></div>
            <div><div className="lm-goal-mini-top">Mục tiêu · {exam.name}</div>
              <div className="lm-goal-mini-cd">còn <b>{cd.months}</b> tháng <b>{cd.days}</b> ngày</div></div>
          </div>
        </div>
      </div>

      <div className="lm-viewtoggle">
        <button className={view === 'map' ? 'on' : ''} onClick={() => setView('map')}><IPath name="globe" size={16} /> Lộ trình</button>
        <button className={view === 'list' ? 'on' : ''} onClick={() => setView('list')}><IPath name="task" size={16} /> Danh sách</button>
      </div>

      {view === 'map' ? (
        <div className="lm-path-wrap">
          <PathMap data={data} track={track} progressN={progressN} onOpenLesson={onOpenLesson} onCheckpoint={onCheckpoint} toast={toast} />
          <div className="lm-continue-dock"><ContinueCard data={data} track={track} progressN={progressN} onOpenLesson={onOpenLesson} /></div>
        </div>
      ) : (
        <LessonListView data={data} levels={levels} level={level} setLevel={setLevel} onStart={onStart} onResults={onResults} />
      )}
    </div>
  );
}

Object.assign(window, { PathScreen, NODE_TYPE });
