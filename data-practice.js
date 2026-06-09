/* ListenMind — practice question types (IELTS-style listening tasks)
   Attached to window.LM.practiceSets. Each set is self-contained:
   instruction + questions + transcript + vocab (+ derived answer key). */
(function () {
  const S = {};

  /* ───────────── 1 · MULTIPLE CHOICE ───────────── */
  S.mc = {
    key: 'mc', name: 'Multiple Choice', nameVi: 'Trắc nghiệm', icon: 'task',
    short: 'Chọn đáp án đúng A · B · C · D',
    instruction: 'Nghe đoạn hội thoại và chọn đáp án đúng nhất (A, B, C hoặc D) cho mỗi câu hỏi.',
    audio: 'Hội thoại tại quán cà phê · 2:08',
    questions: [
      { id: 'mc1', prompt: '女の人は何を注文しましたか。', promptVi: 'Người phụ nữ đã gọi món gì?',
        choices: ['コーヒーとケーキ', '紅茶とサンドイッチ', 'コーヒーだけ', 'ケーキだけ'], correct: 0,
        explain: 'Người phụ nữ nói「ホットコーヒーと、チーズケーキをお願いします」— gọi cà phê nóng và bánh phô mai.' },
      { id: 'mc2', prompt: '二人はいつ会いますか。', promptVi: 'Hai người gặp nhau khi nào?',
        choices: ['土曜日の朝', '土曜日の午後', '日曜日の朝', '日曜日の午後'], correct: 3,
        explain: 'Cuối hội thoại chốt「日曜日の午後3時」— 3 giờ chiều Chủ nhật.' },
      { id: 'mc3', prompt: '店は何時に閉まりますか。', promptVi: 'Cửa hàng đóng cửa lúc mấy giờ?',
        choices: ['8時', '9時', '9時半', '10時'], correct: 2,
        explain: '「閉店は午後9時半でございます」— đóng cửa lúc 9 giờ 30 tối.' },
    ],
    transcript: [
      { sp: '店員', line: 'いらっしゃいませ。ご注文はお決まりですか。', vi: 'Xin mời quý khách. Quý khách đã chọn món chưa ạ?' },
      { sp: '客', line: 'はい、ホットコーヒーと、チーズケーキをお願いします。', vi: 'Vâng, cho tôi một cà phê nóng và một bánh phô mai.', vocab: ['注文', 'チーズケーキ'] },
      { sp: '店員', line: 'かしこまりました。ところで、閉店は午後9時半でございます。', vi: 'Vâng ạ. Tiện thể, cửa hàng đóng cửa lúc 9 giờ 30 tối ạ.', vocab: ['閉店'] },
      { sp: '客', line: 'では、日曜日の午後3時にまた来ますね。', vi: 'Vậy 3 giờ chiều Chủ nhật tôi sẽ quay lại nhé.' },
    ],
    vocab: [
      { word: '注文', reading: 'ちゅうもん', meaning: 'gọi món, đặt hàng' },
      { word: '閉店', reading: 'へいてん', meaning: 'đóng cửa (tiệm)' },
      { word: 'かしこまりました', reading: '', meaning: 'vâng ạ (kính ngữ)' },
    ],
  };

  /* ───────────── 2 · SENTENCE COMPLETION ───────────── */
  S.sentence = {
    key: 'sentence', name: 'Sentence Completion', nameVi: 'Hoàn thành câu', icon: 'edit',
    short: 'Điền từ còn thiếu vào câu',
    instruction: 'Điền NHIỀU NHẤT 2 TỪ và/hoặc 1 SỐ vào mỗi chỗ trống, dựa trên thông tin nghe được.',
    audio: 'Thông báo tại thư viện thành phố · 1:46',
    questions: [
      { id: 'sc1', before: '中央図書館は平日の朝', after: 'から開いています。', answer: '9時', alt: ['９時', '九時'],
        beforeVi: 'Thư viện trung tâm mở cửa từ', afterVi: 'vào các ngày trong tuần.' },
      { id: 'sc2', before: '本は一度に', after: 'まで借りられます。', answer: '10冊', alt: ['１０冊', '十冊'],
        beforeVi: 'Mỗi lần được mượn tối đa', afterVi: 'cuốn sách.' },
      { id: 'sc3', before: '貸出期間は', after: '間です。', answer: '2週間', alt: ['２週間', '二週間'],
        beforeVi: 'Thời hạn mượn là', afterVi: '.' },
      { id: 'sc4', before: '三階には静かに勉強できる', after: 'があります。', answer: '自習室', alt: ['学習室'],
        beforeVi: 'Tầng 3 có', afterVi: 'để học yên tĩnh.' },
    ],
    transcript: [
      { sp: '館内放送', line: '中央図書館へようこそ。当館は平日の朝9時から夜8時まで開いています。', vi: 'Chào mừng đến Thư viện Trung tâm. Thư viện mở cửa các ngày thường từ 9 giờ sáng đến 8 giờ tối.', vocab: ['図書館'] },
      { sp: '館内放送', line: '本は一度に10冊まで借りられ、貸出期間は2週間です。', vi: 'Sách được mượn tối đa 10 cuốn mỗi lần, thời hạn mượn là 2 tuần.', vocab: ['貸出'] },
      { sp: '館内放送', line: '三階には静かに勉強できる自習室がございます。ご利用ください。', vi: 'Tầng 3 có phòng tự học yên tĩnh. Mời quý khách sử dụng.', vocab: ['自習室'] },
    ],
    vocab: [
      { word: '図書館', reading: 'としょかん', meaning: 'thư viện' },
      { word: '貸出', reading: 'かしだし', meaning: 'việc cho mượn' },
      { word: '期間', reading: 'きかん', meaning: 'thời hạn, kỳ hạn' },
      { word: '自習室', reading: 'じしゅうしつ', meaning: 'phòng tự học' },
    ],
  };

  /* ───────────── 3 · FORM / TABLE COMPLETION ───────────── */
  S.form = {
    key: 'form', name: 'Form / Table Completion', nameVi: 'Điền form / bảng', icon: 'doc',
    short: 'Điền thông tin vào biểu mẫu',
    instruction: 'Điền NHIỀU NHẤT 2 TỪ và/hoặc 1 SỐ vào mỗi chỗ trống trong biểu mẫu đăng ký.',
    audio: 'Đăng ký hội viên trung tâm thể thao · 2:20',
    formTitle: 'スポーツセンター 会員登録フォーム',
    formTitleVi: 'Phiếu đăng ký hội viên Trung tâm thể thao',
    rows: [
      { label: '氏名', labelVi: 'Họ tên', value: '田中 さくら' },
      { id: 'fc1', label: '電話番号', labelVi: 'Số điện thoại', gap: true, answer: '080-1234-5678', alt: ['08012345678'] },
      { id: 'fc2', label: 'コース', labelVi: 'Khóa tập', gap: true, answer: 'ヨガ', alt: ['ヨガコース', 'yoga'] },
      { id: 'fc3', label: '利用曜日', labelVi: 'Ngày tập', gap: true, answer: '火曜日', alt: ['火', '火曜'] },
      { label: '時間', labelVi: 'Giờ', value: '午後7時〜8時' },
      { id: 'fc4', label: '月会費', labelVi: 'Phí tháng', gap: true, answer: '6000円', alt: ['6,000円', '6000'] },
    ],
    transcript: [
      { sp: '受付', line: '会員登録ですね。お名前と電話番号をお願いします。', vi: 'Anh/chị đăng ký hội viên phải không. Cho tôi xin tên và số điện thoại ạ.', vocab: ['登録'] },
      { sp: '客', line: '田中さくらです。電話は080-1234-5678です。', vi: 'Tôi là Tanaka Sakura. Số điện thoại là 080-1234-5678.' },
      { sp: '受付', line: 'コースはいかがなさいますか。', vi: 'Anh/chị chọn khóa nào ạ?' },
      { sp: '客', line: 'ヨガコースを、火曜日の夜にお願いします。', vi: 'Cho tôi khóa Yoga, vào tối thứ Ba ạ.', vocab: ['火曜日'] },
      { sp: '受付', line: 'かしこまりました。月会費は6000円になります。', vi: 'Vâng ạ. Phí hàng tháng là 6000 yên.', vocab: ['会費'] },
    ],
    vocab: [
      { word: '登録', reading: 'とうろく', meaning: 'đăng ký' },
      { word: '会員', reading: 'かいいん', meaning: 'hội viên' },
      { word: '会費', reading: 'かいひ', meaning: 'phí hội viên' },
      { word: '曜日', reading: 'ようび', meaning: 'thứ (trong tuần)' },
    ],
  };

  /* ───────────── 4 · MATCHING INFORMATION ───────────── */
  S.matching = {
    key: 'matching', name: 'Matching Information', nameVi: 'Nối thông tin', icon: 'swap',
    short: 'Nối mỗi người với hoạt động đúng',
    instruction: 'Nối mỗi người (1–5) với hoạt động cuối tuần mà họ sẽ làm (A–E). Mỗi lựa chọn chỉ dùng một lần.',
    audio: 'Kế hoạch cuối tuần của nhóm bạn · 2:32',
    options: [
      { key: 'A', text: '映画を見る', textVi: 'xem phim' },
      { key: 'B', text: '山に登る', textVi: 'leo núi' },
      { key: 'C', text: '料理を習う', textVi: 'học nấu ăn' },
      { key: 'D', text: '家で休む', textVi: 'nghỉ ở nhà' },
      { key: 'E', text: '友達に会う', textVi: 'gặp bạn bè' },
    ],
    items: [
      { id: 'mt1', text: 'けんさん', textVi: 'Anh Ken', answer: 'B' },
      { id: 'mt2', text: 'ゆきさん', textVi: 'Chị Yuki', answer: 'C' },
      { id: 'mt3', text: 'たろうさん', textVi: 'Anh Taro', answer: 'A' },
      { id: 'mt4', text: 'はなさん', textVi: 'Chị Hana', answer: 'E' },
      { id: 'mt5', text: 'みなみさん', textVi: 'Chị Minami', answer: 'D' },
    ],
    transcript: [
      { sp: 'けん', line: '今週末は天気がいいから、山に登るつもりだよ。', vi: 'Cuối tuần này trời đẹp nên tôi định leo núi.', vocab: ['登る'] },
      { sp: 'ゆき', line: '私はイタリア料理を習いに行くの。', vi: 'Tôi thì đi học nấu món Ý.', vocab: ['料理'] },
      { sp: 'たろう', line: '僕は新しい映画を見に行こうかな。', vi: 'Tôi chắc đi xem bộ phim mới.' },
      { sp: 'はな', line: '久しぶりに高校の友達に会う約束があるんだ。', vi: 'Tôi có hẹn gặp lại bạn cấp ba sau một thời gian dài.', vocab: ['約束'] },
      { sp: 'みなみ', line: '最近疲れたから、今週は家でゆっくり休むわ。', vi: 'Dạo này mệt nên tuần này tôi nghỉ ngơi ở nhà thôi.', vocab: ['疲れる'] },
    ],
    vocab: [
      { word: '登る', reading: 'のぼる', meaning: 'leo, trèo' },
      { word: '料理', reading: 'りょうり', meaning: 'nấu ăn, món ăn' },
      { word: '約束', reading: 'やくそく', meaning: 'lời hẹn, hứa hẹn' },
      { word: '疲れる', reading: 'つかれる', meaning: 'mệt mỏi' },
    ],
  };

  window.LM.practiceSets = S;
  window.LM.practiceOrder = ['mc', 'sentence', 'form', 'matching'];
})();
