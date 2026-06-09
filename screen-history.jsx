/* ListenMind — Lịch sử học tập (redesigned) */
const { Icon: IHst, StatusChip: StatusChipH } = window.LMC;
const { useState: hxS } = React;

const HTYPE = { practice: 'Luyện tập', exam: 'Thi thật' };
const HSTATUS = {
  done:  { l: 'Hoàn thành', cls: 'vs-known' },
  retry: { l: 'Cần làm lại', cls: 'vs-review' },
  doing: { l: 'Đang học',   cls: 'vs-learn' },
};

/* ---------------- action kebab ---------------- */
function HistoryActionMenu({ status, onResult, onRedo, onReviewWrong, onShare }) {
  const [open, setOpen] = hxS(false);
  return (
    <div className="lm-kebab-wrap">
      {open && <>
        <div className="lm-kebab-scrim" onClick={() => setOpen(false)} />
        <div className="lm-kebab-menu pop" style={{ right: 0 }}>
          {status !== 'doing' && <button onClick={() => { setOpen(false); onResult(); }}><IHst name="eye" size={16} /> Xem kết quả</button>}
          <button onClick={() => { setOpen(false); onRedo(); }}><IHst name="refresh" size={16} /> Học lại từ đầu</button>
          <button onClick={() => { setOpen(false); onReviewWrong(); }}><IHst name="flag" size={16} /> Ôn từ sai</button>
          <div className="lm-kebab-sep" />
          <button onClick={() => { setOpen(false); onShare(); }}><IHst name="share" size={16} /> Chia sẻ kết quả</button>
        </div>
      </>}
      <button className={`lm-kebab-btn ${open ? 'on' : ''}`} onClick={() => setOpen(o => !o)}><IHst name="more" size={18} /></button>
    </div>
  );
}

/* ---------------- history item ---------------- */
function StudyHistoryItem({ h, onPrimary, onResult, onRedo, onReviewWrong, onShare }) {
  const good = h.total > 0 && h.correct / h.total >= 0.8;
  const primary = h.status === 'doing'
    ? { label: 'Tiếp tục', icon: 'play', cls: 'btn-primary' }
    : h.status === 'retry'
      ? { label: 'Làm lại', icon: 'refresh', cls: 'btn-primary' }
      : { label: 'Xem kết quả', icon: 'eye', cls: 'btn-soft' };
  return (
    <div className={`lm-hitem ${h.status === 'retry' ? 'is-retry' : ''}`}>
      <div className={`lm-hitem-ic ${h.type}`}><IHst name={h.type === 'exam' ? 'doc' : 'headphones'} size={20} /></div>

      <div className="lm-hitem-main">
        <div className="lm-hitem-title">{h.lesson}</div>
        <div className="lm-hitem-meta">
          <span className="lm-meta-badge"><IHst name="flag" size={13} /> {h.level}</span>
          <span className="lm-meta-badge"><IHst name={h.type === 'exam' ? 'doc' : 'headphones'} size={13} /> {HTYPE[h.type]}</span>
          <span><IHst name="calendar" size={13} /> {h.date}</span>
          <span><IHst name="clock" size={13} /> {h.mins}′</span>
          {h.vocab > 0 && <span className="lm-meta-tag teal"><IHst name="book" size={12} /> {h.vocab} từ</span>}
          {h.note > 0 && <span className="lm-meta-tag lav"><IHst name="note" size={12} /> {h.note} note</span>}
        </div>
      </div>

      <div className="lm-hitem-right">
        {h.total > 0
          ? <div className={`lm-hscore ${good ? 'good' : 'warn'}`}><b>{`${h.correct}/${h.total}`}</b><span>câu đúng</span></div>
          : <div className="lm-hscore neutral"><b><IHst name="mic" size={16} /></b><span>luyện nói</span></div>}
        <span className={`lm-vbadge ${HSTATUS[h.status].cls} lm-hitem-status`}><span className="lm-vbadge-dot" />{HSTATUS[h.status].l}</span>
        <div className="lm-hitem-actions">
          <button className={`btn ${primary.cls} btn-sm`} onClick={onPrimary}><IHst name={primary.icon} size={15} /> {primary.label}</button>
          <HistoryActionMenu status={h.status} onResult={onResult} onRedo={onRedo} onReviewWrong={onReviewWrong} onShare={onShare} />
        </div>
      </div>
    </div>
  );
}

/* ---------------- toolbar ---------------- */
const HIST_SORTS = [{ v: 'recent', l: 'Gần đây nhất' }, { v: 'score', l: 'Điểm cao nhất' }, { v: 'retry', l: 'Cần làm lại trước' }];
function StudyHistoryToolbar({ type, setType, level, setLevel, levels, status, setStatus, sort, setSort }) {
  return (
    <div className="lm-htoolbar card">
      <div className="lm-htoolbar-row1">
        <div className="lm-htabs">
          {['all', 'practice', 'exam'].map(t => (
            <button key={t} className={`lm-htab ${type === t ? 'on' : ''}`} onClick={() => setType(t)}>{t === 'all' ? 'Tất cả' : HTYPE[t]}</button>
          ))}
        </div>
        <div className="grow" />
        <window.SortSelect value={sort} onChange={setSort} options={HIST_SORTS} />
      </div>
      <div className="lm-vtoolbar-filters">
        <div className="lm-filter-group">
          {levels.map(l => <button key={l} className={`lm-fchip ${level === l ? 'on' : ''}`} onClick={() => setLevel(l)}>{l === 'all' ? 'Tất cả cấp' : l}</button>)}
        </div>
        <span className="lm-filter-div" />
        <div className="lm-filter-group">
          {['all', 'done', 'doing', 'retry'].map(s => (
            <button key={s} className={`lm-fchip ${status === s ? 'on' : ''}`} onClick={() => setStatus(s)}>{s === 'all' ? 'Mọi trạng thái' : HSTATUS[s].l}</button>
          ))}
        </div>
      </div>
    </div>
  );
}

/* ---------------- screen ---------------- */
function HistoryScreen({ data, go, toast }) {
  const [type, setType] = hxS('all');
  const [level, setLevel] = hxS('all');
  const [status, setStatus] = hxS('all');
  const [sort, setSort] = hxS('recent');
  go = go || (window.__lmGo || (() => {}));
  toast = toast || (() => {});

  const levels = ['all', ...Array.from(new Set(data.history.map(h => h.level)))];
  let list = data.history
    .filter(h => type === 'all' || h.type === type)
    .filter(h => level === 'all' || h.level === level)
    .filter(h => status === 'all' || h.status === status);
  list = [...list].sort((a, b) => {
    if (sort === 'score') return (b.total ? b.correct / b.total : 0) - (a.total ? a.correct / a.total : 0);
    if (sort === 'retry') { const r = h => h.status === 'retry' ? 0 : 1; return r(a) - r(b); }
    return 0; // recent = original order
  });

  const ongoing = data.history.find(h => h.status === 'doing');
  function clearFilters() { setType('all'); setLevel('all'); setStatus('all'); }
  function primary(h) {
    if (h.status === 'doing') { toast('info', 'Tiếp tục buổi học', h.lesson); go('learn'); }
    else if (h.status === 'retry') { toast('info', 'Làm lại bài', h.lesson); go('learn'); }
    else { toast('info', 'Xem kết quả', h.lesson); go('learn'); }
  }

  return (
    <div className="fade-up">
      <StudyHistoryToolbar type={type} setType={setType} level={level} setLevel={setLevel} levels={levels}
        status={status} setStatus={setStatus} sort={sort} setSort={setSort} />

      {ongoing && (
        <div className="lm-resume" onClick={() => { toast('info', 'Tiếp tục buổi học', ongoing.lesson); go('learn'); }}>
          <span className="lm-resume-ic"><IHst name="play" size={20} fill /></span>
          <div className="lm-resume-body">
            <div className="lm-resume-lbl">Tiếp tục bài gần nhất</div>
            <div className="lm-resume-title">{ongoing.lesson}</div>
          </div>
          <span className="lm-resume-go"><IHst name="arrowR" size={20} /></span>
        </div>
      )}

      <div className="lm-vcount-row">
        <span className="lm-vcount"><b>{list.length}</b> buổi học</span>
        {(type !== 'all' || level !== 'all' || status !== 'all') && <button className="lm-link" onClick={clearFilters}><IHst name="x" size={13} /> Xóa bộ lọc</button>}
      </div>

      {data.history.length === 0 ? (
        <window.EmptyState icon="history" title="Bạn chưa có buổi học nào" desc="Bắt đầu luyện tập để theo dõi tiến độ tại đây." cta="Bắt đầu luyện tập" onCta={() => go('learn')} />
      ) : list.length === 0 ? (
        <window.EmptyState icon="search" title="Không có buổi học phù hợp" desc="Thử đổi tab hoặc bỏ bớt bộ lọc." cta="Xóa bộ lọc" onCta={clearFilters} />
      ) : (
        <div className="lm-hist-list2">
          {list.map(h => (
            <StudyHistoryItem key={h.id} h={h}
              onPrimary={() => primary(h)}
              onResult={() => { toast('info', 'Xem kết quả', h.lesson); go('learn'); }}
              onRedo={() => { toast('info', 'Học lại từ đầu', h.lesson); go('learn'); }}
              onReviewWrong={() => toast('info', 'Ôn từ sai', `${h.lesson} — mở danh sách câu sai`)}
              onShare={() => toast('success', 'Đã sao chép kết quả', `${h.lesson}${h.total ? ` · ${h.correct}/${h.total}` : ''}`)} />
          ))}
        </div>
      )}
    </div>
  );
}

Object.assign(window, { HistoryScreen });
