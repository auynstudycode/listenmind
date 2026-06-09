/* ListenMind — shared components & icons */
const { useState, useEffect, useRef } = React;

/* ----------------------------- Icons (stroke) ----------------------------- */
const ICONS = {
  home:'M3 10.5 12 3l9 7.5M5 9.5V21h5v-6h4v6h5V9.5',
  headphones:'M4 14v-2a8 8 0 0 1 16 0v2M4 14a2 2 0 0 1 2 2v2a2 2 0 0 1-2 2 2 2 0 0 1-2-2v-2a2 2 0 0 1 2-2Zm16 0a2 2 0 0 0-2 2v2a2 2 0 0 0 2 2 2 2 0 0 0 2-2v-2a2 2 0 0 0-2-2Z',
  target:'M12 12m-9 0a9 9 0 1 0 18 0 9 9 0 1 0-18 0M12 12m-5 0a5 5 0 1 0 10 0 5 5 0 1 0-10 0M12 12m-1 0a1 1 0 1 0 2 0 1 1 0 1 0-2 0',
  book:'M4 4h11a3 3 0 0 1 3 3v13a2.5 2.5 0 0 0-2.5-2.5H4V4ZM4 17.5H15.5A2.5 2.5 0 0 1 18 20',
  history:'M3 12a9 9 0 1 0 3-6.7M3 4.5V8.5H7M12 7v5l3.5 2',
  user:'M12 12a4 4 0 1 0 0-8 4 4 0 0 0 0 8ZM5 20a7 7 0 0 1 14 0',
  settings:'M12 15a3 3 0 1 0 0-6 3 3 0 0 0 0 6ZM19.4 13a1.6 1.6 0 0 0 .3 1.8l.1.1a2 2 0 1 1-2.8 2.8l-.1-.1a1.6 1.6 0 0 0-2.7 1.1V21a2 2 0 1 1-4 0v-.2A1.6 1.6 0 0 0 6.8 19l-.1.1a2 2 0 1 1-2.8-2.8l.1-.1A1.6 1.6 0 0 0 3 13H3a2 2 0 1 1 0-4h.2A1.6 1.6 0 0 0 5 6.8l-.1-.1a2 2 0 1 1 2.8-2.8l.1.1A1.6 1.6 0 0 0 11 3V3a2 2 0 1 1 4 0v.2a1.6 1.6 0 0 0 2.7 1.1l.1-.1a2 2 0 1 1 2.8 2.8l-.1.1a1.6 1.6 0 0 0 1.1 2.7H21a2 2 0 1 1 0 4h-.2a1.6 1.6 0 0 0-1.4 1Z',
  logout:'M15 4h3a2 2 0 0 1 2 2v12a2 2 0 0 1-2 2h-3M10 16l-4-4 4-4M6 12h12',
  play:'M7 5.5v13l11-6.5-11-6.5Z',
  pause:'M8 5h3v14H8zM13 5h3v14h-3z',
  mic:'M12 14a3 3 0 0 0 3-3V6a3 3 0 0 0-6 0v5a3 3 0 0 0 3 3ZM6 11a6 6 0 0 0 12 0M12 17v4',
  chat:'M4 5h16v11H8l-4 4V5Z',
  globe:'M12 12m-9 0a9 9 0 1 0 18 0 9 9 0 1 0-18 0M3 12h18M12 3a14 14 0 0 1 0 18 14 14 0 0 1 0-18Z',
  check:'M5 12.5 10 17.5 19.5 7',
  x:'M6 6 18 18M18 6 6 18',
  chevDown:'M6 9.5 12 15.5 18 9.5',
  chevRight:'M9.5 6 15.5 12 9.5 18',
  chevLeft:'M14.5 6 8.5 12 14.5 18',
  search:'M11 11m-7 0a7 7 0 1 0 14 0 7 7 0 1 0-14 0M16.5 16.5 21 21',
  filter:'M3 5h18l-7 8v5l-4 2v-7L3 5Z',
  plus:'M12 5v14M5 12h14',
  note:'M5 4h10l4 4v12H5V4ZM14 4v5h5M8 13h8M8 16.5h5',
  star:'M12 3.5l2.6 5.3 5.9.9-4.3 4.1 1 5.8-5.2-2.7-5.2 2.7 1-5.8L3.5 9.7l5.9-.9L12 3.5Z',
  fire:'M12 22c4 0 6.5-2.6 6.5-6 0-3-2-5-3-7-1.4 1-1.8 2-2 3-.5-2-2-4.5-4-6 .5 3-1.5 5-2.5 7-.7 1.4-1.5 2.5-1.5 4 0 3.4 2.5 5 6.5 5Z',
  bell:'M6 9a6 6 0 0 1 12 0c0 5 2 6 2 6H4s2-1 2-6M10 21a2 2 0 0 0 4 0',
  sun:'M12 17a5 5 0 1 0 0-10 5 5 0 0 0 0 10ZM12 2v2M12 20v2M4.9 4.9l1.4 1.4M17.7 17.7l1.4 1.4M2 12h2M20 12h2M4.9 19.1l1.4-1.4M17.7 6.3l1.4-1.4',
  moon:'M20 14.5A8 8 0 0 1 9.5 4 8 8 0 1 0 20 14.5Z',
  calendar:'M4 6h16v15H4V6ZM4 10h16M8 3v4M16 3v4',
  sparkle:'M12 3l1.8 5.4L19 10l-5.2 1.6L12 17l-1.8-5.4L5 10l5.2-1.6L12 3ZM18 15l.8 2.2L21 18l-2.2.8L18 21l-.8-2.2L15 18l2.2-.8L18 15Z',
  chart:'M4 20V4M4 20h16M8 20v-6M12 20V9M16 20v-9M20 20v-4',
  lock:'M6 11h12v9H6v-9ZM8 11V8a4 4 0 0 1 8 0v3',
  volume:'M4 9v6h4l5 4V5L8 9H4ZM17 9.5a3 3 0 0 1 0 5M19.5 7a6.5 6.5 0 0 1 0 10',
  arrowR:'M5 12h14M13 6l6 6-6 6',
  arrowL:'M19 12H5M11 18l-6-6 6-6',
  edit:'M5 19h14M14 5l4 4-9 9H5v-4l9-9Z',
  trash:'M5 7h14M9 7V5h6v2M7 7l1 13h8l1-13',
  bookmark:'M7 4h10v16l-5-3.5L7 20V4Z',
  clock:'M12 12m-9 0a9 9 0 1 0 18 0 9 9 0 1 0-18 0M12 7v5l3.5 2',
  flag:'M5 21V4M5 4h11l-2 4 2 4H5',
  trophy:'M7 4h10v4a5 5 0 0 1-10 0V4ZM7 6H4v2a3 3 0 0 0 3 3M17 6h3v2a3 3 0 0 1-3 3M9 16h6M8 20h8M12 16v4',
  task:'M4 5h16v15H4V5ZM8 10l2 2 4-4M8 15h8',
  refresh:'M3 12a9 9 0 0 1 15-6.7L21 8M21 4v4h-4M21 12a9 9 0 0 1-15 6.7L3 16M3 20v-4h4',
  swap:'M7 4 3 8l4 4M3 8h13M17 20l4-4-4-4M21 16H8',
  zap:'M13 3 4 14h7l-1 7 9-11h-7l1-7Z',
  eye:'M2 12s3.5-7 10-7 10 7 10 7-3.5 7-10 7-10-7-10-7ZM12 15a3 3 0 1 0 0-6 3 3 0 0 0 0 6Z',
  doc:'M6 3h8l4 4v14H6V3ZM14 3v4h4M9 12h6M9 15.5h6M9 8.5h3',
  flash:'M3 12a9 9 0 1 0 18 0 9 9 0 1 0-18 0M9 12h6M12 9v6',
  more:'M12 5a1.4 1.4 0 1 0 0 2.8A1.4 1.4 0 0 0 12 5ZM12 10.6a1.4 1.4 0 1 0 0 2.8 1.4 1.4 0 0 0 0-2.8ZM12 16.2a1.4 1.4 0 1 0 0 2.8 1.4 1.4 0 0 0 0-2.8Z',
  grid:'M4 4h7v7H4zM13 4h7v7h-7zM4 13h7v7H4zM13 13h7v7h-7z',
  list:'M8 6h12M8 12h12M8 18h12M4 6h.01M4 12h.01M4 18h.01',
  share:'M6 12a3 3 0 1 0 0 .01M18 6a3 3 0 1 0 0 .01M18 18a3 3 0 1 0 0 .01M8.6 10.7l6.8-3.9M8.6 13.3l6.8 3.9',
  sort:'M7 4v16M7 20l-3-3M7 4l3 3M17 20V4M17 4l-3 3M17 20l3-3',
  mail:'M4 6h16v12H4zM4 7.5l8 5.5 8-5.5',
};
function Icon({ name, size = 22, sw = 1.8, fill = false, style }) {
  const d = ICONS[name] || '';
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill={fill ? 'currentColor' : 'none'}
      stroke={fill ? 'none' : 'currentColor'} strokeWidth={sw} strokeLinecap="round"
      strokeLinejoin="round" style={style} aria-hidden="true">
      <path d={d} />
    </svg>
  );
}

/* ----------------------------- Logo ----------------------------- */
function Logo({ size = 40, showWord = true }) {
  return (
    <div className="row gap-10" style={{ alignItems: 'center' }}>
      <img src="assets/logo.png" alt="ListenMind"
        style={{ width: size, height: size, borderRadius: '50%', objectFit: 'cover',
          boxShadow: '0 3px 10px rgba(42,172,172,.28)', border: '2px solid #fff' }} />
      {showWord && (
        <span className="font-display" style={{ fontSize: size * 0.5, color: 'var(--ink-900)', lineHeight: 1 }}>
          Listen<span style={{ color: 'var(--teal-600)' }}>Mind</span>
        </span>
      )}
    </div>
  );
}

/* ----------------------------- Avatar ----------------------------- */
function Avatar({ size = 36, ring = false }) {
  return (
    <img src="assets/logo.png" alt="avatar"
      style={{ width: size, height: size, borderRadius: '50%', objectFit: 'cover',
        border: ring ? '2.5px solid var(--teal-400)' : '2px solid #fff',
        boxShadow: 'var(--sh-xs)', flexShrink: 0 }} />
  );
}

/* ----------------------------- Status chip ----------------------------- */
const STATUS = {
  new:     { cls: 'st-new',    label: 'Chưa bắt đầu' },
  doing:   { cls: 'st-doing',  label: 'Đang học' },
  done:    { cls: 'st-done',   label: 'Hoàn thành' },
  retry:   { cls: 'st-retry',  label: 'Cần làm lại' },
  locked:  { cls: 'st-locked', label: 'Đã khóa' },
};
function StatusChip({ status }) {
  const s = STATUS[status] || STATUS.new;
  return <span className={`st ${s.cls}`}>{s.label}</span>;
}

/* ----------------------------- Progress bar ----------------------------- */
function Bar({ value, h = 9 }) {
  return <div className="bar" style={{ height: h }}><span style={{ width: `${Math.min(100, value)}%` }} /></div>;
}

/* ----------------------------- Countdown ----------------------------- */
function useCountdown(dateStr) {
  const [now, setNow] = useState(Date.now());
  useEffect(() => { const t = setInterval(() => setNow(Date.now()), 1000 * 30); return () => clearInterval(t); }, []);
  const target = new Date(dateStr + 'T13:00:00').getTime();
  let diff = Math.max(0, target - now);
  const months = Math.floor(diff / (1000 * 60 * 60 * 24 * 30)); diff -= months * 1000 * 60 * 60 * 24 * 30;
  const days = Math.floor(diff / (1000 * 60 * 60 * 24)); diff -= days * 1000 * 60 * 60 * 24;
  const hours = Math.floor(diff / (1000 * 60 * 60)); diff -= hours * 1000 * 60 * 60;
  const mins = Math.floor(diff / (1000 * 60));
  return { months, days, hours, mins };
}

window.LMC = { Icon, Logo, Avatar, StatusChip, Bar, useCountdown, ICONS, STATUS };
