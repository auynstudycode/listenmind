/* ListenMind — Home / Landing (Trang chủ) */
const { Icon: IH, Logo: LogoH } = window.LMC;

function HomeScreen({ authed, go, switchLang, openAuth }) {
  const startCTA = () => authed ? go('learn') : openAuth('register');
  const why = [
    ['target', 'Luyện nghe thực chiến', 'Câu được tạo từ ngữ cảnh thực tế — bạn nghe như người bản ngữ thật sự nói, không phải câu sách giáo khoa.'],
    ['zap', 'Ghi nhớ sâu hơn 3 lần', 'Vừa nghe vừa xử lý và làm bài giúp não tạo thêm liên kết — từ vựng & ngữ pháp được khắc sâu tự nhiên.'],
    ['flash', 'Phản hồi tức thì', 'Biết ngay đúng/sai và tại sao. Không cần chờ chấm bài hay tra từ điển thủ công.'],
    ['book', 'Hiểu từ trong ngữ cảnh', 'Mỗi bài kèm script, nghĩa tiếng Việt và từ vựng quan trọng — học từ trong tình huống, không học vẹt.'],
    ['chart', 'Phù hợp mọi cấp độ', 'Từ N5 / HSK1 đến N1 / HSK6, tốc độ phát âm điều chỉnh được — luyện theo nhịp của riêng bạn.'],
    ['sparkle', 'Lộ trình cá nhân hoá', 'AI gợi ý mỗi ngày học bao nhiêu bài để kịp ngày thi, cảnh báo khi tiến độ chưa đủ.'],
  ];
  const steps = [
    ['globe', 'Chọn ngôn ngữ', 'Nhật hoặc Trung, theo JLPT / HSK / FreeStyle'],
    ['headphones', 'Nghe & luyện tập', 'Nghe audio, trả lời câu hỏi theo từng lesson'],
    ['doc', 'Thi thử như thật', 'Mô phỏng đề thi có giới hạn thời gian'],
    ['target', 'Theo dõi mục tiêu', 'Xem tiến độ, ôn câu sai & sổ từ vựng'],
  ];
  const testi = [
    ['Minh Anh', 'Học viên JLPT N3', 5, 'Sau 2 tuần luyện mỗi ngày, tai mình đã quen tốc độ nói của người Nhật. Trước đó nghe không kịp dù học 2 năm.'],
    ['Thu Hà', 'Học tiếng Trung HSK4', 5, 'Phần script + từ vựng sau mỗi bài cực hữu ích. Mình không cần tra thêm từ điển nữa.'],
    ['Quốc Bảo', 'Nhân viên văn phòng', 4, 'Chế độ thi thật giúp mình bớt run khi vào phòng thi. Câu sai được gom lại để ôn rất tiện.'],
  ];
  return (
    <div className="lm-home fade-up">
      {/* HERO */}
      <section className="lm-hero">
        <div className="lm-hero-pills">
          <button className="lm-hero-pill" onClick={() => switchLang('jp')}>🇯🇵 Tiếng Nhật</button>
          <button className="lm-hero-pill" onClick={() => switchLang('cn')}>🇨🇳 Tiếng Trung</button>
        </div>
        <h1 className="lm-hero-h font-display">Luyện nghe <span className="grad">Nhật &amp; Trung</span><br />theo lộ trình tới ngày thi</h1>
        <p className="lm-hero-sub">Nghe câu thật — luyện tập &amp; thi thử — theo dõi mục tiêu. ListenMind giúp bạn cải thiện kỹ năng nghe một cách nhanh nhất và tự nhiên nhất.</p>
        <div className="lm-hero-cta">
          <button className="btn btn-primary btn-lg" onClick={startCTA}><IH name="headphones" size={19} /> Bắt đầu học ngay</button>
          <button className="btn btn-ghost btn-lg" onClick={() => document.getElementById('lm-how').scrollIntoView({ behavior: 'smooth' })}>Tìm hiểu thêm</button>
        </div>
        <div className="lm-hero-stats">
          {[['1,200+', 'Người học'], ['24', 'Chủ đề'], ['AI', 'Tạo lộ trình'], ['JLPT·HSK', 'Theo chuẩn']].map(([n, l]) => (
            <div key={l} className="lm-hero-stat"><div className="lm-hero-stat-n font-display">{n}</div><div className="lm-hero-stat-l">{l}</div></div>
          ))}
        </div>
      </section>

      {/* WHY */}
      <section className="lm-sec">
        <div className="lm-sec-head">
          <span className="eyebrow">Tại sao hiệu quả</span>
          <h2 className="lm-sec-title font-display">Phương pháp luyện nghe được tối ưu cho người Việt</h2>
        </div>
        <div className="lm-why-grid">
          {why.map(([ic, t, d]) => (
            <div key={t} className="lm-why-card">
              <span className="lm-why-ic"><IH name={ic} size={22} /></span>
              <div className="lm-why-t">{t}</div>
              <div className="lm-why-d">{d}</div>
            </div>
          ))}
        </div>
      </section>

      {/* HOW */}
      <section className="lm-sec lm-how" id="lm-how">
        <div className="lm-sec-head">
          <span className="eyebrow">Cách hoạt động</span>
          <h2 className="lm-sec-title font-display">Chỉ 4 bước để bắt đầu</h2>
        </div>
        <div className="lm-how-grid">
          {steps.map(([ic, t, d], i) => (
            <div key={t} className="lm-how-step">
              <div className="lm-how-num">{i + 1}</div>
              <span className="lm-how-ic"><IH name={ic} size={24} /></span>
              <div className="lm-how-t">{t}</div>
              <div className="lm-how-d">{d}</div>
            </div>
          ))}
        </div>
      </section>

      {/* LANGUAGES */}
      <section className="lm-sec">
        <div className="lm-sec-head">
          <span className="eyebrow">Ngôn ngữ</span>
          <h2 className="lm-sec-title font-display">Chọn ngôn ngữ bạn muốn chinh phục</h2>
        </div>
        <div className="lm-home-langs">
          {[['jp', '🇯🇵', 'Tiếng Nhật', ['N5', 'N4', 'N3', 'N2', 'N1']], ['cn', '🇨🇳', 'Tiếng Trung', ['HSK1', 'HSK2', 'HSK3', 'HSK4', 'HSK5+']]].map(([id, flag, name, lv]) => (
            <button key={id} className="lm-home-lang" onClick={() => switchLang(id)}>
              <span className="lm-home-lang-flag">{flag}</span>
              <div style={{ flex: 1, textAlign: 'left' }}>
                <div className="lm-home-lang-name">{name}</div>
                <div className="row gap-6" style={{ flexWrap: 'wrap', marginTop: 6 }}>{lv.map(l => <span key={l} className="lm-lv-pill">{l}</span>)}</div>
              </div>
              <IH name="arrowR" size={20} />
            </button>
          ))}
        </div>
      </section>

      {/* TESTIMONIALS */}
      <section className="lm-sec lm-how">
        <div className="lm-sec-head">
          <span className="eyebrow">Người học nói gì</span>
          <h2 className="lm-sec-title font-display">Hàng nghìn người đã cải thiện kỹ năng nghe</h2>
        </div>
        <div className="lm-testi-grid">
          {testi.map(([name, role, stars, text]) => (
            <div key={name} className="lm-testi">
              <div className="lm-testi-stars">{'★'.repeat(stars)}<span className="off">{'★'.repeat(5 - stars)}</span></div>
              <p className="lm-testi-text">“{text}”</p>
              <div className="lm-testi-user">
                <span className="lm-testi-av">{name[0]}</span>
                <div><div className="lm-testi-name">{name}</div><div className="lm-testi-role">{role}</div></div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* CTA */}
      <section className="lm-home-cta">
        <h2 className="font-display">Bắt đầu luyện nghe hôm nay</h2>
        <p>Tạo tài khoản miễn phí và nhận lộ trình học cá nhân hoá tới ngày thi của bạn.</p>
        <div className="row gap-12" style={{ justifyContent: 'center', flexWrap: 'wrap' }}>
          <button className="btn btn-lg" style={{ background: '#fff', color: 'var(--teal-700)' }} onClick={startCTA}><IH name="headphones" size={18} /> Học ngay</button>
          {!authed && <button className="btn btn-lg btn-lav" onClick={() => openAuth('register')}><IH name="sparkle" size={18} /> Tạo tài khoản miễn phí</button>}
        </div>
      </section>

      {/* FOOTER */}
      <footer className="lm-home-foot">
        <LogoH size={30} />
        <div className="lm-foot-links"><a href="#">Về chúng tôi</a><a href="#">Điều khoản</a><a href="#">Bảo mật</a></div>
        <div className="lm-foot-copy">© 2026 ListenMind · Made with ♥ in Vietnam</div>
      </footer>
    </div>
  );
}
Object.assign(window, { HomeScreen });
