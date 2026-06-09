/* ListenMind — mock data (plain JS, attached to window.LM) */
window.LM = (function () {

  const user = {
    name: "Minh Anh",
    email: "minhanh@gmail.com",
    avatar: "assets/logo.png",
    streak: 7,
    joined: "Tháng 3, 2026",
    plan: "Free",
  };

  /* language tracks */
  const tracks = {
    jp: {
      id: "jp", flag: "🇯🇵", code: "JP", name: "Tiếng Nhật",
      exams: [
        { id: "jlpt", name: "JLPT", desc: "Luyện thi theo chuẩn N5 → N1", levels: ["N5","N4","N3","N2","N1"] },
        { id: "free", name: "FreeStyle", desc: "Học tự do theo chủ đề, không theo cấp", levels: ["Cơ bản","Trung cấp","Nâng cao"] },
      ],
    },
    cn: {
      id: "cn", flag: "🇨🇳", code: "CN", name: "Tiếng Trung",
      exams: [
        { id: "hsk", name: "HSK", desc: "Luyện thi theo chuẩn HSK 1 → 6", levels: ["HSK 1","HSK 2","HSK 3","HSK 4","HSK 5","HSK 6"] },
        { id: "free", name: "FreeStyle", desc: "Học tự do theo chủ đề, không theo cấp", levels: ["Cơ bản","Trung cấp","Nâng cao"] },
      ],
    },
  };

  /* lesson groups for the Learn screen (JLPT N3 sample) */
  const lessonGroups = [
    {
      id: "g-listen", name: "Bài nghe theo chủ đề", icon: "headphones",
      lessons: [
        { id: "l1", title: "Hội thoại tại quán cà phê", topic: "Đời sống", mins: 6, q: 8, status: "done", score: 88, vocab: 5, note: true },
        { id: "l2", title: "Đặt lịch hẹn với bác sĩ", topic: "Đời sống", mins: 7, q: 10, status: "doing", progress: 60, vocab: 3, note: false },
        { id: "l3", title: "Phỏng vấn xin việc", topic: "Công việc", mins: 9, q: 12, status: "retry", score: 64, vocab: 8, note: true },
        { id: "l4", title: "Thông báo tại nhà ga", topic: "Đời sống", mins: 5, q: 6, status: "new", vocab: 0, note: false },
      ],
    },
    {
      id: "g-shadow", name: "Luyện Shadowing", icon: "mic",
      lessons: [
        { id: "l5", title: "Shadowing — Tốc độ tự nhiên #1", topic: "Shadowing", mins: 8, q: 0, status: "done", score: 92, vocab: 4, note: false },
        { id: "l6", title: "Shadowing — Hội thoại công sở", topic: "Công việc", mins: 8, q: 0, status: "new", vocab: 0, note: false },
      ],
    },
    {
      id: "g-kaiwa", name: "Kaiwa / Hội thoại thực tế", icon: "chat",
      lessons: [
        { id: "l7", title: "Kaiwa — Hỏi đường", topic: "Đời sống", mins: 6, q: 7, status: "new", vocab: 0, note: false },
        { id: "l8", title: "Kaiwa — Chủ đề IT", topic: "IT", mins: 10, q: 9, status: "new", locked: true, vocab: 0, note: false },
        { id: "l9", title: "Kaiwa — Phỏng vấn BJT", topic: "BJT", mins: 12, q: 11, status: "new", locked: true, vocab: 0, note: false },
      ],
    },
    {
      id: "g-ted", name: "Ted Talk / Bài nghe thực tế", icon: "globe",
      lessons: [
        { id: "l10", title: "Ted — Thói quen buổi sáng", topic: "Đời sống", mins: 11, q: 10, status: "new", locked: true, vocab: 0, note: false },
      ],
    },
    {
      id: "g-trans", name: "Luyện phiên dịch", icon: "swap", kind: "translate",
      lessons: [
        { id: "t1",  title: "Phiên dịch hội thoại đời sống", topic: "Đời sống",   mins: 8,  q: 4, status: "done", score: 86, kind: "translate", vocab: 6, note: true },
        { id: "t2",  title: "Phiên dịch thương mại — đàm phán", topic: "Kinh doanh", mins: 10, q: 4, status: "doing", progress: 50, kind: "translate", vocab: 4, note: false },
        { id: "t3",  title: "Phiên dịch du lịch & đặt phòng", topic: "Du lịch",     mins: 7,  q: 4, status: "retry", score: 62, kind: "translate", vocab: 8, note: true },
        { id: "t4",  title: "Phiên dịch y tế — khám bệnh", topic: "Y tế",           mins: 9,  q: 4, status: "new", kind: "translate", vocab: 0, note: false },
        { id: "t5",  title: "Phiên dịch pháp lý — hợp đồng", topic: "Pháp lý",      mins: 12, q: 4, status: "new", kind: "translate", vocab: 0, note: false },
        { id: "t6",  title: "Phiên dịch IT & kỹ thuật", topic: "IT",                mins: 10, q: 4, status: "new", kind: "translate", vocab: 0, note: false },
        { id: "t7",  title: "Phiên dịch nhà hàng & ẩm thực", topic: "Ẩm thực",      mins: 6,  q: 4, status: "new", kind: "translate", vocab: 0, note: false },
        { id: "t8",  title: "Phiên dịch phỏng vấn tuyển dụng", topic: "Công việc",  mins: 9,  q: 4, status: "new", kind: "translate", vocab: 0, note: false },
        { id: "t9",  title: "Phiên dịch bản tin thời sự", topic: "Tin tức",         mins: 11, q: 4, status: "new", locked: true, kind: "translate", vocab: 0, note: false },
        { id: "t10", title: "Phiên dịch hội thảo học thuật", topic: "Học thuật",    mins: 13, q: 4, status: "new", locked: true, kind: "translate", vocab: 0, note: false },
        { id: "t11", title: "Phiên dịch tài chính — ngân hàng", topic: "Tài chính", mins: 11, q: 4, status: "new", locked: true, kind: "translate", vocab: 0, note: false },
        { id: "t12", title: "Phiên dịch môi trường & khí hậu", topic: "Môi trường", mins: 10, q: 4, status: "new", locked: true, kind: "translate", vocab: 0, note: false },
        { id: "t13", title: "Phiên dịch văn hóa & lễ hội", topic: "Văn hóa",        mins: 8,  q: 4, status: "new", locked: true, kind: "translate", vocab: 0, note: false },
        { id: "t14", title: "Phiên dịch hành chính & thủ tục", topic: "Hành chính", mins: 9,  q: 4, status: "new", locked: true, kind: "translate", vocab: 0, note: false },
      ],
    },
  ];

  /* a sample listening question set for the Practice / Exam screens */
  const questionSet = [
    {
      id: "q1",
      audioLabel: "Đoạn 1 · 0:42",
      prompt: "女の人は何を注文しましたか。",
      promptVi: "Người phụ nữ đã gọi món gì?",
      choices: ["コーヒーとケーキ", "紅茶とサンドイッチ", "コーヒーだけ", "ケーキだけ"],
      correct: 0,
      explain: "Trong hội thoại, người phụ nữ nói「ホットコーヒーと、チーズケーキをお願いします」— gọi cà phê nóng và bánh phô mai.",
    },
    {
      id: "q2",
      audioLabel: "Đoạn 2 · 0:31",
      prompt: "二人はいつ会いますか。",
      promptVi: "Hai người sẽ gặp nhau khi nào?",
      choices: ["土曜日の朝", "土曜日の午後", "日曜日の朝", "日曜日の午後"],
      correct: 3,
      explain: "Người nam đề nghị thứ Bảy nhưng người nữ bận, cuối cùng chốt「日曜日の午後3時」— 3 giờ chiều Chủ nhật.",
    },
    {
      id: "q3",
      audioLabel: "Đoạn 3 · 0:55",
      prompt: "店は何時に閉まりますか。",
      promptVi: "Cửa hàng đóng cửa lúc mấy giờ?",
      choices: ["8時", "9時", "9時半", "10時"],
      correct: 2,
      explain: "Thông báo cuối đoạn:「閉店は午後9時半でございます」— đóng cửa lúc 9 giờ 30 tối.",
    },
  ];

  /* script segments with highlightable vocab */
  const script = [
    { sp: "店員", line: "いらっしゃいませ。ご注文はお決まりですか。", vi: "Xin mời quý khách. Quý khách đã chọn món chưa ạ?" },
    { sp: "客", line: "はい、ホットコーヒーと、チーズケーキをお願いします。", vi: "Vâng, cho tôi một cà phê nóng và một bánh phô mai.", vocab: ["注文","チーズケーキ"] },
    { sp: "店員", line: "かしこまりました。お席までお持ちします。", vi: "Vâng ạ. Tôi sẽ mang ra tận bàn cho quý khách.", vocab: ["かしこまりました"] },
  ];

  /* vocabulary notebook */
  const vocab = [
    { id:"v1", word:"注文", reading:"ちゅうもん", meaning:"gọi món, đặt hàng", lang:"jp", level:"N3", lesson:"Hội thoại tại quán cà phê", ex:"コーヒーを注文する。", added:"02/06", state:"learning", note:"hay nhầm với 予約" },
    { id:"v2", word:"予約", reading:"よやく", meaning:"đặt chỗ, hẹn trước", lang:"jp", level:"N3", lesson:"Đặt lịch hẹn với bác sĩ", ex:"病院を予約する。", added:"01/06", state:"known", note:"" },
    { id:"v3", word:"面接", reading:"めんせつ", meaning:"phỏng vấn", lang:"jp", level:"N3", lesson:"Phỏng vấn xin việc", ex:"明日面接があります。", added:"31/05", state:"new", note:"ôn trước buổi thi" },
    { id:"v4", word:"閉店", reading:"へいてん", meaning:"đóng cửa (tiệm)", lang:"jp", level:"N3", lesson:"Hội thoại tại quán cà phê", ex:"閉店は9時半です。", added:"02/06", state:"learning", note:"" },
    { id:"v5", word:"かしこまりました", reading:"", meaning:"vâng ạ (kính ngữ)", lang:"jp", level:"N3", lesson:"Hội thoại tại quán cà phê", ex:"かしこまりました。", added:"02/06", state:"new", note:"dùng trong dịch vụ" },
    { id:"v6", word:"出張", reading:"しゅっちょう", meaning:"công tác", lang:"jp", level:"N3", lesson:"Phỏng vấn xin việc", ex:"来週大阪へ出張します。", added:"29/05", state:"known", note:"" },
  ];

  /* learning history */
  const history = [
    { id:"h1", lesson:"Hội thoại tại quán cà phê", lang:"jp", level:"N3", type:"practice", date:"02/06/2026", mins:7, correct:7, total:8, status:"done", vocab:5, note:2 },
    { id:"h2", lesson:"Shadowing — Tốc độ tự nhiên #1", lang:"jp", level:"N3", type:"practice", date:"01/06/2026", mins:8, correct:0, total:0, status:"done", vocab:4, note:0 },
    { id:"h3", lesson:"Phỏng vấn xin việc", lang:"jp", level:"N3", type:"exam", date:"31/05/2026", mins:14, correct:8, total:12, status:"retry", vocab:8, note:1 },
    { id:"h4", lesson:"Đặt lịch hẹn với bác sĩ", lang:"jp", level:"N3", type:"practice", date:"30/05/2026", mins:5, correct:6, total:10, status:"doing", vocab:3, note:0 },
  ];

  /* target / goal */
  const target = {
    lang:"jp", currentLevel:"N4", goalLevel:"N3",
    skills:["Nghe","Từ vựng"],
    daysPerWeek:5, minsPerDay:30,
    exam:{ name:"JLPT N3", date:"2026-08-17", time:"13:00", place:"ĐH KHXH&NV TP.HCM", note:"Mang theo CCCD + ảnh thẻ" },
    ai:{ perDay:3, perWeek:18, focus:"Nghe hội thoại tốc độ nhanh", needSpeedUp:true,
         note:"Với 76 ngày còn lại và tần suất hiện tại (4 buổi/tuần), bạn cần tăng lên 5 buổi/tuần để kịp mục tiêu N3." },
  };

  /* diligence — last 12 weeks activity (0-4 intensity), and weekly bars */
  const diligence = Array.from({length:84}, (_,i)=>{
    const r = Math.sin(i*1.3)*0.5+0.5; return Math.max(0, Math.round(r*4 - (i%9===0?2:0)));
  });
  const weekStats = {
    totalLessons:14, practice:11, exam:3, correct:96, wrong:21, accuracy:82, goalLessons:18,
    perDay:[3,2,4,1,2,0,2],
  };

  /* translation/interpretation practice segments (JP source → VN model) */
  const translateSet = [
    { id:"ts1", audioLabel:"Đoạn 1 · 0:12", dir:"🇯🇵 → 🇻🇳",
      src:"すみません、この近くに駅はありますか。歩いて行けますか。",
      ref:"Xin lỗi, gần đây có nhà ga không ạ? Tôi đi bộ tới đó được không?",
      terms:[{w:"近く",reading:"ちかく",mean:"gần đây"},{w:"歩いて",reading:"あるいて",mean:"đi bộ"}] },
    { id:"ts2", audioLabel:"Đoạn 2 · 0:15", dir:"🇯🇵 → 🇻🇳",
      src:"はい、まっすぐ行って、二つ目の信号を右に曲がってください。",
      ref:"Vâng, anh/chị đi thẳng, đến đèn giao thông thứ hai thì rẽ phải ạ.",
      terms:[{w:"まっすぐ",reading:"",mean:"thẳng"},{w:"信号",reading:"しんごう",mean:"đèn giao thông"},{w:"曲がる",reading:"まがる",mean:"rẽ, quẹo"}] },
    { id:"ts3", audioLabel:"Đoạn 3 · 0:18", dir:"🇯🇵 → 🇻🇳",
      src:"駅まで五分ぐらいです。切符は自動販売機で買えますよ。",
      ref:"Tới ga khoảng năm phút thôi. Vé thì anh/chị có thể mua ở máy bán vé tự động ạ.",
      terms:[{w:"切符",reading:"きっぷ",mean:"vé"},{w:"自動販売機",reading:"じどうはんばいき",mean:"máy bán hàng tự động"}] },
    { id:"ts4", audioLabel:"Đoạn 4 · 0:14", dir:"🇯🇵 → 🇻🇳",
      src:"どうもありがとうございます。とても助かりました。",
      ref:"Cảm ơn anh/chị rất nhiều. Anh/chị đã giúp tôi rất nhiều ạ.",
      terms:[{w:"助かる",reading:"たすかる",mean:"được giúp đỡ, đỡ vất vả"}] },
  ];

  return { user, tracks, lessonGroups, questionSet, script, translateSet, vocab, history, target, diligence, weekStats };
})();
