/* ListenMind — Sổ từ vựng (redesigned) + shared library UI (badges, empty, sort) */
const { Icon: IV } = window.LMC;
const { useState: vS, useEffect: vE } = React;

/* ---------------- shared state map ---------------- */
const VSTATE = {
  new:      { l: 'Chưa học', cls: 'vs-new' },
  learning: { l: 'Đang học', cls: 'vs-learn' },
  known:    { l: 'Đã thuộc', cls: 'vs-known' },
  review:   { l: 'Cần ôn',   cls: 'vs-review' },
};
function loadVS() { try { return JSON.parse(localStorage.getItem('lm_vstate') || '{}'); } catch { return {}; } }
function loadVH() { try { return JSON.parse(localStorage.getItem('lm_vhidden') || '[]'); } catch { return []; } }

/* ---------------- shared mini components ---------------- */
function VStatusBadge({ state }) {
  const s = VSTATE[state] || VSTATE.new;
  return <span className={`lm-vbadge ${s.cls}`}><span className="lm-vbadge-dot" />{s.l}</span>;
}
function LevelBadge({ level }) { return <span className="lm-lvbadge">{level}</span>; }
function EmptyState({ icon, title, desc, cta, onCta }) {
  return (
    <div className="lm-empty2">
      <div className="lm-empty2-ic"><IV name={icon} size={32} /></div>
      <div className="lm-empty2-title">{title}</div>
      {desc && <div className="lm-empty2-desc">{desc}</div>}
      {cta && <button className="btn btn-primary" onClick={onCta}>{cta}</button>}
    </div>
  );
}
function SortSelect({ value, onChange, options }) {
  return (
    <div className="lm-sortsel">
      <IV name="sort" size={15} />
      <select value={value} onChange={e => onChange(e.target.value)}>
        {options.map(o => <option key={o.v} value={o.v}>{o.l}</option>)}
      </select>
      <IV name="chevDown" size={14} />
    </div>
  );
}

/* ---------------- action kebab ---------------- */
function VocabActionMenu({ onDetail, onPractice, onHide }) {
  const [open, setOpen] = vS(false);
  return (
    <div className="lm-kebab-wrap">
      {open && <>
        <div className="lm-kebab-scrim" onClick={() => setOpen(false)} />
        <div className="lm-kebab-menu pop">
          <button onClick={() => { setOpen(false); onDetail(); }}><IV name="eye" size={16} /> Xem chi tiết</button>
          <button onClick={() => { setOpen(false); onPractice(); }}><IV name="play" size={16} /> Luyện ngay với từ này</button>
          <div className="lm-kebab-sep" />
          <button className="danger" onClick={() => { setOpen(false); onHide(); }}><IV name="trash" size={16} /> Ẩn khỏi sổ</button>
        </div>
      </>}
      <button className={`lm-kebab-btn ${open ? 'on' : ''}`} onClick={() => setOpen(o => !o)}><IV name="more" size={18} /></button>
    </div>
  );
}

/* ---------------- vocabulary card ---------------- */
function VocabularyCard({ v, compact, onSpeak, onToggleKnown, onToggleReview, onDetail, onPractice, onHide }) {
  return (
    <div className={`lm-vcard2 ${v.state === 'review' ? 'is-review' : ''} ${compact ? 'compact' : ''}`}>
      <div className="lm-vcard2-head">
        <div className="lm-vcard2-words">
          <div className="lm-vcard2-word jp">{v.word}</div>
          {v.reading && <div className="lm-vcard2-read jp">{v.reading}</div>}
        </div>
        <div className="lm-vcard2-headright">
          <VStatusBadge state={v.state} />
          <VocabActionMenu onDetail={onDetail} onPractice={onPractice} onHide={onHide} />
        </div>
      </div>
      <div className="lm-vcard2-mean">{v.meaning}</div>
      {!compact && v.ex && <div className="lm-vcard2-ex jp">{v.ex}{v.exVi && <span className="lm-vcard2-exvi"> — {v.exVi}</span>}</div>}
      <div className="lm-vcard2-foot">
        <LevelBadge level={v.level} />
        <span className="lm-vcard2-lesson"><IV name="headphones" size={13} /> {v.lesson}</span>
      </div>
      {!compact && v.note && <div className="lm-vcard2-note"><IV name="note" size={13} /> {v.note}</div>}
      <div className="lm-vcard2-actions">
        <button className="lm-qa" onClick={onSpeak} title="Nghe phát âm"><IV name="volume" size={17} /></button>
        <button className={`lm-qa ${v.state === 'known' ? 'on-green' : ''}`} onClick={onToggleKnown} title="Đánh dấu đã thuộc"><IV name="check" size={17} /></button>
        <button className={`lm-qa ${v.state === 'review' ? 'on-orange' : ''}`} onClick={onToggleReview} title="Đưa vào cần ôn"><IV name="flag" size={17} /></button>
        <div className="grow" />
        <button className="lm-qa-text" onClick={onPractice}><IV name="play" size={14} /> Luyện</button>
      </div>
    </div>
  );
}

/* ---------------- detail modal ---------------- */
function VocabDetail({ v, onClose, onSpeak, onPractice }) {
  return (
    <div className="lm-overlay" onMouseDown={e => { if (e.target === e.currentTarget) onClose(); }}>
      <div className="lm-modal pop" style={{ maxWidth: 440 }}>
        <button className="lm-modal-x" onClick={onClose}><IV name="x" size={20} /></button>
        <div className="lm-modal-pad" style={{ textAlign: 'center' }}>
          <VStatusBadge state={v.state} />
          <div className="lm-vdetail-word jp">{v.word}</div>
          {v.reading && <div className="lm-vdetail-read jp">{v.reading}</div>}
          <button className="btn btn-soft btn-sm" style={{ margin: '6px auto 0' }} onClick={onSpeak}><IV name="volume" size={15} /> Nghe phát âm</button>
          <div className="lm-vdetail-mean">{v.meaning}</div>
          {v.ex && <div className="lm-vdetail-ex"><div className="jp">{v.ex}</div>{v.exVi && <div className="lm-vdetail-exvi">{v.exVi}</div>}</div>}
          <div className="lm-vdetail-rows">
            <div><span>Cấp độ</span><b>{v.level}</b></div>
            <div><span>Nguồn</span><b>{v.lesson}</b></div>
            {v.added && <div><span>Đã lưu</span><b>{v.added}</b></div>}
          </div>
          {v.note && <div className="lm-vcard2-note" style={{ marginTop: 4 }}><IV name="note" size={13} /> {v.note}</div>}
          <button className="btn btn-primary btn-block" style={{ marginTop: 18 }} onClick={onPractice}><IV name="play" size={16} /> Luyện ngay với từ này</button>
        </div>
      </div>
    </div>
  );
}

/* ---------------- mini flashcard review ---------------- */
function VocabReview({ words, startIdx, onClose, onMark }) {
  const [i, setI] = vS(startIdx || 0);
  const [flip, setFlip] = vS(false);
  const c = words[i];
  if (!c) return null;
  function go(d) { setFlip(false); setI(x => Math.max(0, Math.min(words.length - 1, x + d))); }
  return (
    <div className="lm-overlay" onMouseDown={e => { if (e.target === e.currentTarget) onClose(); }}>
      <div className="lm-modal pop" style={{ maxWidth: 460 }}>
        <button className="lm-modal-x" onClick={onClose}><IV name="x" size={20} /></button>
        <div className="lm-modal-pad">
          <div className="lm-review-top"><IV name="zap" size={15} /> Ôn nhanh · {i + 1}/{words.length}</div>
          <div className={`lm-flash ${flip ? 'flip' : ''}`} style={{ height: 240, marginBottom: 14 }} onClick={() => setFlip(f => !f)}>
            <div className="lm-flash-inner">
              <div className="lm-flash-front">
                <div className="lm-flash-word jp">{c.word}</div>
                {c.reading && <div className="lm-flash-read jp">{c.reading}</div>}
                <div className="lm-flash-hint"><IV name="eye" size={14} /> Chạm để xem nghĩa</div>
              </div>
              <div className="lm-flash-back">
                <div className="lm-flash-mean">{c.meaning}</div>
                {c.ex && <div className="lm-flash-ex jp">{c.ex}</div>}
              </div>
            </div>
          </div>
          <div className="lm-review-acts">
            <button className="btn btn-ghost btn-sm" disabled={i === 0} onClick={() => go(-1)}><IV name="chevLeft" size={16} /></button>
            <button className="btn btn-soft grow" onClick={() => { onMark(c.id, 'review'); }}><IV name="flag" size={15} /> Cần ôn</button>
            <button className="btn btn-primary grow" onClick={() => { onMark(c.id, 'known'); if (i < words.length - 1) go(1); }}><IV name="check" size={15} /> Đã thuộc</button>
            <button className="btn btn-ghost btn-sm" disabled={i === words.length - 1} onClick={() => go(1)}><IV name="chevRight" size={16} /></button>
          </div>
        </div>
      </div>
    </div>
  );
}

/* ---------------- toolbar ---------------- */
const VOCAB_SORTS = [
  { v: 'recent', l: 'Mới nhất' }, { v: 'old', l: 'Cũ nhất' }, { v: 'az', l: 'A–Z' },
  { v: 'review', l: 'Cần ôn trước' }, { v: 'level', l: 'Theo cấp độ' },
];
function VocabularyToolbar({ q, setQ, level, setLevel, levels, fState, setFState, sort, setSort, view, setView, count, total, onReview }) {
  return (
    <div className="lm-vtoolbar card">
      <div className="lm-vtoolbar-row1">
        <div className="lm-search">
          <IV name="search" size={18} />
          <input className="lm-search-inp" placeholder="Tìm từ vựng, cách đọc hoặc nghĩa…" value={q} onChange={e => setQ(e.target.value)} />
          {q && <button className="lm-search-clear" onClick={() => setQ('')}><IV name="x" size={15} /></button>}
        </div>
        <SortSelect value={sort} onChange={setSort} options={VOCAB_SORTS} />
        <div className="lm-view-toggle">
          <button className={view === 'grid' ? 'on' : ''} onClick={() => setView('grid')} title="Dạng lưới"><IV name="grid" size={17} /></button>
          <button className={view === 'list' ? 'on' : ''} onClick={() => setView('list')} title="Dạng gọn"><IV name="list" size={17} /></button>
        </div>
        <button className="btn btn-primary lm-review-cta" disabled={!count} onClick={onReview}><IV name="zap" size={16} /> Ôn {count} từ này</button>
      </div>
      <div className="lm-vtoolbar-filters">
        <div className="lm-filter-group">
          {levels.map(l => <button key={l} className={`lm-fchip ${level === l ? 'on' : ''}`} onClick={() => setLevel(l)}>{l === 'all' ? 'Tất cả cấp' : l}</button>)}
        </div>
        <span className="lm-filter-div" />
        <div className="lm-filter-group">
          {['all', 'new', 'learning', 'known', 'review'].map(s => (
            <button key={s} className={`lm-fchip ${fState === s ? 'on' : ''}`} onClick={() => setFState(s)}>{s === 'all' ? 'Mọi trạng thái' : VSTATE[s].l}</button>
          ))}
        </div>
      </div>
    </div>
  );
}

/* ---------------- screen ---------------- */
const LVRANK = { 'N5': 1, 'N4': 2, 'N3': 3, 'N2': 4, 'N1': 5, 'HSK 1': 1, 'HSK 2': 2, 'HSK 3': 3, 'HSK 4': 4, 'HSK 5': 5, 'HSK 6': 6 };
function VocabScreen({ data, vocabExtra, toast }) {
  const [vstate, setVstate] = vS(loadVS);
  const [hidden, setHidden] = vS(loadVH);
  const [q, setQ] = vS('');
  const [level, setLevel] = vS('all');
  const [fState, setFState] = vS('all');
  const [sort, setSort] = vS('recent');
  const [view, setView] = vS('grid');
  const [detail, setDetail] = vS(null);
  const [review, setReview] = vS(null);   // { startIdx }

  vE(() => { try { localStorage.setItem('lm_vstate', JSON.stringify(vstate)); } catch {} }, [vstate]);
  vE(() => { try { localStorage.setItem('lm_vhidden', JSON.stringify(hidden)); } catch {} }, [hidden]);

  const raw = [...vocabExtra, ...data.vocab].map((v, i) => ({ ...v, _order: i, state: vstate[v.id] || v.state || 'new' }));
  const levels = ['all', ...Array.from(new Set(raw.map(v => v.level)))];
  const isEmpty = raw.filter(v => !hidden.includes(v.id)).length === 0;

  let list = raw.filter(v => !hidden.includes(v.id))
    .filter(v => level === 'all' || v.level === level)
    .filter(v => fState === 'all' || v.state === fState)
    .filter(v => !q || v.word.includes(q) || (v.meaning || '').toLowerCase().includes(q.toLowerCase()) || (v.reading || '').includes(q));
  list = [...list].sort((a, b) => {
    if (sort === 'recent') return a._order - b._order;
    if (sort === 'old') return b._order - a._order;
    if (sort === 'az') return (a.reading || a.word).localeCompare(b.reading || b.word, 'ja');
    if (sort === 'review') { const r = (s) => s.state === 'review' ? 0 : 1; return r(a) - r(b) || a._order - b._order; }
    if (sort === 'level') return (LVRANK[a.level] || 9) - (LVRANK[b.level] || 9) || a._order - b._order;
    return 0;
  });

  function setState(id, s) { setVstate(m => ({ ...m, [id]: m[id] === s ? 'new' : s })); }
  function speak(v) { toast('info', `🔊 ${v.word}`, v.reading ? `Phát âm: ${v.reading}` : 'Phát âm (mô phỏng)'); }
  function hide(v) { setHidden(h => [...h, v.id]); toast('info', 'Đã ẩn khỏi sổ', `“${v.word}”`); }
  function clearFilters() { setQ(''); setLevel('all'); setFState('all'); }
  function markFromReview(id, s) { setVstate(m => ({ ...m, [id]: s })); toast(s === 'known' ? 'success' : 'info', s === 'known' ? 'Đã thuộc' : 'Đánh dấu cần ôn'); }

  return (
    <div className="fade-up">
      <VocabularyToolbar q={q} setQ={setQ} level={level} setLevel={setLevel} levels={levels}
        fState={fState} setFState={setFState} sort={sort} setSort={setSort} view={view} setView={setView}
        count={list.length} total={raw.length} onReview={() => list.length && setReview({ startIdx: 0 })} />

      <div className="lm-vcount-row">
        <span className="lm-vcount">Đang hiển thị <b>{list.length}</b> / {raw.filter(v => !hidden.includes(v.id)).length} từ</span>
        {(q || level !== 'all' || fState !== 'all') && <button className="lm-link" onClick={clearFilters}><IV name="x" size={13} /> Xóa bộ lọc</button>}
      </div>

      {isEmpty ? (
        <EmptyState icon="book" title="Bạn chưa lưu từ nào" desc="Lưu từ vựng trong khi học để ôn lại tại đây." cta="Bắt đầu học để thêm từ" onCta={() => (window.__lmGo && window.__lmGo('learn'))} />
      ) : list.length === 0 ? (
        <EmptyState icon="search" title="Không tìm thấy từ phù hợp" desc="Thử từ khóa khác hoặc bỏ bớt bộ lọc." cta="Xóa bộ lọc" onCta={clearFilters} />
      ) : (
        <div className={`lm-vgrid ${view === 'list' ? 'list' : ''}`}>
          {list.map(v => (
            <VocabularyCard key={v.id} v={v} compact={view === 'list'}
              onSpeak={() => speak(v)}
              onToggleKnown={() => setState(v.id, 'known')}
              onToggleReview={() => setState(v.id, 'review')}
              onDetail={() => setDetail(v)}
              onPractice={() => setReview({ startIdx: Math.max(0, list.findIndex(x => x.id === v.id)) })}
              onHide={() => hide(v)} />
          ))}
        </div>
      )}

      {detail && <VocabDetail v={detail} onClose={() => setDetail(null)} onSpeak={() => speak(detail)} onPractice={() => { const idx = Math.max(0, list.findIndex(x => x.id === detail.id)); setDetail(null); setReview({ startIdx: idx }); }} />}
      {review && <VocabReview words={list.length ? list : raw} startIdx={review.startIdx} onClose={() => setReview(null)} onMark={markFromReview} />}
    </div>
  );
}

Object.assign(window, { VocabScreen, VStatusBadge, LevelBadge, EmptyState, SortSelect, VSTATE });
