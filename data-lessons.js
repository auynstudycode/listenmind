/* ListenMind — lesson modules + journey-path layout.
   Each path node references a lesson module containing:
   vocabulary[], grammar[], test[] (+ which activities it offers).
   Authored for JP N3 and CN HSK3; other levels reuse this content (demo). */
(function () {
  const M = {};

  /* ───────────────────────── JAPANESE · N3 ───────────────────────── */
  M['jp-n3-1'] = {
    track: 'jp', title: 'カフェでの注文', titleVi: 'Gọi món tại quán cà phê',
    type: 'listen', icon: 'headphones', color: 'teal', mins: '8–12 phút', points: 120, learners: 312,
    summary: 'Hội thoại gọi đồ uống, thanh toán và hỏi giờ đóng cửa tại quán cà phê.',
    vocabulary: [
      { word: '注文', reading: 'ちゅうもん', pos: 'danh/động từ', meaning: 'gọi món, đặt hàng', ex: 'コーヒーを注文します。', exVi: 'Tôi gọi một cà phê.' },
      { word: '会計', reading: 'かいけい', pos: 'danh từ', meaning: 'thanh toán, tính tiền', ex: 'お会計をお願いします。', exVi: 'Cho tôi thanh toán ạ.' },
      { word: '持ち帰り', reading: 'もちかえり', pos: 'danh từ', meaning: 'mang đi (take-away)', ex: '持ち帰りでお願いします。', exVi: 'Cho tôi mang đi ạ.' },
      { word: '閉店', reading: 'へいてん', pos: 'danh từ', meaning: 'đóng cửa (tiệm)', ex: '閉店は9時半です。', exVi: 'Cửa hàng đóng cửa lúc 9 rưỡi.' },
      { word: 'おすすめ', reading: '', pos: 'danh từ', meaning: 'món/điều được gợi ý', ex: '今日のおすすめは何ですか。', exVi: 'Món gợi ý hôm nay là gì?' },
    ],
    grammar: [
      { pattern: '〜にします', meaning: 'Quyết định chọn ~', explain: 'Dùng khi chọn lựa một thứ gì đó, đặc biệt khi gọi món hoặc ra quyết định.',
        examples: [{ jp: '私はコーヒーにします。', vi: 'Tôi chọn cà phê.' }, { jp: 'デザートはケーキにします。', vi: 'Tráng miệng tôi chọn bánh ngọt.' }] },
      { pattern: '〜ていただけますか', meaning: 'Có thể … giúp tôi không ạ? (lịch sự)', explain: 'Cách nhờ vả rất lịch sự, khiêm nhường hơn 〜てください.',
        examples: [{ jp: 'もう一度言っていただけますか。', vi: 'Anh/chị nói lại giúp tôi một lần được không ạ?' }] },
    ],
    test: [
      { id: 't1', kind: 'mc', tag: 'vocab', ref: '会計', q: '「お会計」の意味は？', qVi: '“お会計” nghĩa là gì?', choices: ['thanh toán', 'thực đơn', 'mang đi', 'gợi ý'], correct: 0 },
      { id: 't2', kind: 'mc', tag: 'vocab', ref: '持ち帰り', q: '“mang đi (take-away)” tiếng Nhật là?', choices: ['注文', '持ち帰り', '閉店', '会計'], correct: 1 },
      { id: 't3', kind: 'mc', tag: 'grammar', ref: '〜にします', q: '私はコーヒー（　）します。', qVi: 'Chọn trợ từ đúng', choices: ['を', 'に', 'で', 'が'], correct: 1 },
      { id: 't4', kind: 'mc', tag: 'vocab', ref: 'おすすめ', q: '「今日のおすすめ」は？', qVi: '“今日のおすすめ” nghĩa là?', choices: ['giờ đóng cửa', 'món gợi ý hôm nay', 'hóa đơn hôm nay', 'khách hôm nay'], correct: 1 },
      { id: 't5', kind: 'mc', tag: 'grammar', ref: '〜ていただけますか', q: 'Cách nhờ LỊCH SỰ nhất là?', choices: ['言って。', '言ってください。', '言っていただけますか。', '言え。'], correct: 2 },
    ],
  };

  M['jp-n3-2'] = {
    track: 'jp', title: 'シャドーイング：自然な速度', titleVi: 'Shadowing — tốc độ tự nhiên',
    type: 'shadow', icon: 'mic', color: 'lav', mins: '6–8 phút', points: 80, learners: 188,
    summary: 'Nghe và nói nhại lại theo tốc độ người bản xứ, chú trọng ngữ điệu và phát âm.',
    vocabulary: [
      { word: '発音', reading: 'はつおん', pos: 'danh từ', meaning: 'phát âm', ex: '発音がきれいですね。', exVi: 'Phát âm đẹp nhỉ.' },
      { word: '抑揚', reading: 'よくよう', pos: 'danh từ', meaning: 'ngữ điệu, lên xuống giọng', ex: '抑揚をつけて話す。', exVi: 'Nói có ngữ điệu.' },
      { word: '真似る', reading: 'まねる', pos: 'động từ', meaning: 'bắt chước', ex: '先生の発音を真似る。', exVi: 'Bắt chước phát âm của thầy.' },
      { word: '滑らか', reading: 'なめらか', pos: 'tính từ', meaning: 'trôi chảy, mượt', ex: '滑らかに話せる。', exVi: 'Nói được trôi chảy.' },
    ],
    grammar: [
      { pattern: '〜たり〜たりする', meaning: 'Khi thì …, khi thì … / vừa … vừa …', explain: 'Liệt kê các hành động tiêu biểu (không theo thứ tự).',
        examples: [{ jp: '聞いたり、真似たりします。', vi: 'Vừa nghe vừa nhại lại.' }] },
    ],
    test: [
      { id: 't1', kind: 'mc', tag: 'vocab', ref: '発音', q: '「発音」の意味は？', qVi: '“発音” nghĩa là?', choices: ['ngữ điệu', 'phát âm', 'bắt chước', 'trôi chảy'], correct: 1 },
      { id: 't2', kind: 'mc', tag: 'vocab', ref: '真似る', q: '“bắt chước” tiếng Nhật là?', choices: ['真似る', '抑揚', '滑らか', '発音'], correct: 0 },
      { id: 't3', kind: 'mc', tag: 'grammar', ref: '〜たり〜たりする', q: '聞い（　）、真似（　）します。', qVi: 'Mẫu liệt kê hành động', choices: ['て / て', 'たり / たり', 'ながら / ながら', 'ば / ば'], correct: 1 },
      { id: 't4', kind: 'mc', tag: 'vocab', ref: '滑らか', q: '「滑らかに話す」は？', qVi: '“滑らかに話す” nghĩa là?', choices: ['nói to', 'nói trôi chảy', 'nói chậm', 'nói nhỏ'], correct: 1 },
    ],
  };

  M['jp-n3-3'] = {
    track: 'jp', title: '会話：道を尋ねる', titleVi: 'Kaiwa — Hỏi đường',
    type: 'kaiwa', icon: 'chat', color: 'coral', mins: '7–10 phút', points: 100, learners: 246,
    summary: 'Luyện hội thoại thực tế: hỏi và chỉ đường đến nhà ga, cửa hàng.',
    roleplay: [
      { you: 'すみません、駅はどこですか。', viYou: 'Xin lỗi, nhà ga ở đâu ạ?', reply: 'まっすぐ行って、信号を右に曲がってください。', viReply: 'Đi thẳng, đến đèn tín hiệu thì rẽ phải.' },
      { you: 'ありがとうございます。遠いですか。', viYou: 'Cảm ơn. Có xa không ạ?', reply: 'いいえ、歩いて5分ぐらいです。', viReply: 'Không, đi bộ khoảng 5 phút thôi.' },
    ],
    vocabulary: [
      { word: '信号', reading: 'しんごう', pos: 'danh từ', meaning: 'đèn tín hiệu giao thông', ex: '信号を渡る。', exVi: 'Băng qua đèn tín hiệu.' },
      { word: '曲がる', reading: 'まがる', pos: 'động từ', meaning: 'rẽ, quẹo', ex: '右に曲がる。', exVi: 'Rẽ phải.' },
      { word: 'まっすぐ', reading: '', pos: 'phó từ', meaning: 'thẳng', ex: 'まっすぐ行く。', exVi: 'Đi thẳng.' },
      { word: '突き当たり', reading: 'つきあたり', pos: 'danh từ', meaning: 'cuối đường (chỗ đâm vào)', ex: '突き当たりを左へ。', exVi: 'Cuối đường rẽ trái.' },
    ],
    grammar: [
      { pattern: '〜たら', meaning: 'Khi/Nếu … thì …', explain: 'Diễn tả điều kiện hoặc trình tự thời gian: làm xong A thì B.',
        examples: [{ jp: '信号を渡ったら、右に曲がってください。', vi: 'Qua đèn tín hiệu rồi thì rẽ phải.' }] },
    ],
    test: [
      { id: 't1', kind: 'mc', tag: 'vocab', ref: '曲がる', q: '「右に曲がる」は？', qVi: '“右に曲がる” nghĩa là?', choices: ['đi thẳng phải', 'rẽ phải', 'dừng bên phải', 'nhìn phải'], correct: 1 },
      { id: 't2', kind: 'mc', tag: 'vocab', ref: '信号', q: '“đèn tín hiệu” tiếng Nhật là?', choices: ['信号', '突き当たり', '駅', '道'], correct: 0 },
      { id: 't3', kind: 'mc', tag: 'grammar', ref: '〜たら', q: '渡っ（　）、右へ。', qVi: 'Mẫu điều kiện/trình tự', choices: ['たら', 'ても', 'ながら', 'のに'], correct: 0 },
      { id: 't4', kind: 'mc', tag: 'vocab', ref: 'まっすぐ', q: '「まっすぐ」は？', qVi: '“まっすぐ” nghĩa là?', choices: ['rẽ', 'thẳng', 'lùi', 'vòng'], correct: 1 },
    ],
  };

  M['jp-n3-4'] = {
    track: 'jp', title: '面接の会話', titleVi: 'Hội thoại phỏng vấn xin việc',
    type: 'listen', icon: 'headphones', color: 'teal', mins: '9–12 phút', points: 130, learners: 201,
    summary: 'Nghe buổi phỏng vấn: giới thiệu bản thân, điểm mạnh, nguyện vọng.',
    vocabulary: [
      { word: '面接', reading: 'めんせつ', pos: 'danh từ', meaning: 'phỏng vấn', ex: '明日面接があります。', exVi: 'Ngày mai có phỏng vấn.' },
      { word: '履歴書', reading: 'りれきしょ', pos: 'danh từ', meaning: 'sơ yếu lý lịch', ex: '履歴書を送る。', exVi: 'Gửi sơ yếu lý lịch.' },
      { word: '長所', reading: 'ちょうしょ', pos: 'danh từ', meaning: 'điểm mạnh', ex: '私の長所は責任感です。', exVi: 'Điểm mạnh của tôi là tinh thần trách nhiệm.' },
      { word: '志望', reading: 'しぼう', pos: 'danh từ', meaning: 'nguyện vọng (ứng tuyển)', ex: '志望理由を話す。', exVi: 'Nói lý do ứng tuyển.' },
      { word: '採用', reading: 'さいよう', pos: 'danh từ', meaning: 'việc tuyển dụng', ex: '採用されました。', exVi: 'Tôi đã được tuyển.' },
    ],
    grammar: [
      { pattern: '〜させていただきます', meaning: 'Xin phép được … (khiêm nhường)', explain: 'Thể khiêm nhường, xin phép làm việc gì một cách lịch sự trong môi trường trang trọng.',
        examples: [{ jp: '自己紹介させていただきます。', vi: 'Xin phép cho tôi tự giới thiệu.' }] },
    ],
    test: [
      { id: 't1', kind: 'mc', tag: 'vocab', ref: '長所', q: '「長所」の意味は？', qVi: '“長所” nghĩa là?', choices: ['điểm yếu', 'điểm mạnh', 'sở thích', 'kinh nghiệm'], correct: 1 },
      { id: 't2', kind: 'mc', tag: 'vocab', ref: '履歴書', q: '“sơ yếu lý lịch” là?', choices: ['面接', '履歴書', '志望', '採用'], correct: 1 },
      { id: 't3', kind: 'mc', tag: 'grammar', ref: '〜させていただきます', q: '自己紹介（　）。', qVi: 'Thể khiêm nhường xin phép', choices: ['します', 'させていただきます', 'してください', 'しろ'], correct: 1 },
      { id: 't4', kind: 'mc', tag: 'vocab', ref: '採用', q: '「採用されました」は？', qVi: '“採用されました” nghĩa là?', choices: ['Tôi bị loại', 'Tôi được tuyển', 'Tôi nộp đơn', 'Tôi phỏng vấn'], correct: 1 },
    ],
  };

  M['jp-n3-5'] = {
    track: 'jp', title: 'Ted：朝の習慣', titleVi: 'Ted Talk — Thói quen buổi sáng',
    type: 'ted', icon: 'globe', color: 'amber', mins: '10–14 phút', points: 110, learners: 159,
    summary: 'Bài nói thực tế về xây dựng thói quen buổi sáng hiệu quả.',
    vocabulary: [
      { word: '習慣', reading: 'しゅうかん', pos: 'danh từ', meaning: 'thói quen', ex: '良い習慣を作る。', exVi: 'Tạo thói quen tốt.' },
      { word: '早起き', reading: 'はやおき', pos: 'danh từ', meaning: 'dậy sớm', ex: '早起きは三文の徳。', exVi: 'Dậy sớm có lợi.' },
      { word: '続ける', reading: 'つづける', pos: 'động từ', meaning: 'duy trì, tiếp tục', ex: '毎日続ける。', exVi: 'Duy trì mỗi ngày.' },
      { word: '集中', reading: 'しゅうちゅう', pos: 'danh từ', meaning: 'tập trung', ex: '朝は集中できる。', exVi: 'Buổi sáng dễ tập trung.' },
    ],
    grammar: [
      { pattern: '〜ようにする', meaning: 'Cố gắng để …, tập cho thành thói quen', explain: 'Diễn tả nỗ lực có ý thức để duy trì một hành động.',
        examples: [{ jp: '毎朝6時に起きるようにしています。', vi: 'Tôi đang cố gắng dậy lúc 6 giờ mỗi sáng.' }] },
    ],
    test: [
      { id: 't1', kind: 'mc', tag: 'vocab', ref: '習慣', q: '「習慣」の意味は？', qVi: '“習慣” nghĩa là?', choices: ['kế hoạch', 'thói quen', 'mục tiêu', 'kết quả'], correct: 1 },
      { id: 't2', kind: 'mc', tag: 'vocab', ref: '続ける', q: '“duy trì/tiếp tục” là?', choices: ['続ける', '集中', '早起き', '習慣'], correct: 0 },
      { id: 't3', kind: 'mc', tag: 'grammar', ref: '〜ようにする', q: '早く寝る（　）しています。', qVi: 'Mẫu cố gắng tạo thói quen', choices: ['ように', 'ことに', 'そうに', 'みたいに'], correct: 0 },
      { id: 't4', kind: 'mc', tag: 'vocab', ref: '集中', q: '「集中できる」は？', qVi: '“集中できる” nghĩa là?', choices: ['có thể nghỉ', 'có thể tập trung', 'có thể ngủ', 'có thể nói'], correct: 1 },
    ],
  };

  M['jp-n3-6'] = {
    track: 'jp', title: '会話：オフィスで', titleVi: 'Kaiwa — Trao đổi nơi công sở',
    type: 'kaiwa', icon: 'chat', color: 'coral', mins: '8–11 phút', points: 120, learners: 173,
    summary: 'Hội thoại công sở: xác nhận cuộc họp, tài liệu và hạn chót.',
    roleplay: [
      { you: '会議は何時からですか。', viYou: 'Cuộc họp bắt đầu lúc mấy giờ ạ?', reply: '午後2時からです。資料を準備してください。', viReply: 'Từ 2 giờ chiều. Hãy chuẩn bị tài liệu nhé.' },
      { you: '締め切りはいつですか。', viYou: 'Hạn chót là khi nào ạ?', reply: '金曜日までになっています。', viReply: 'Theo quy định là đến thứ Sáu.' },
    ],
    vocabulary: [
      { word: '会議', reading: 'かいぎ', pos: 'danh từ', meaning: 'cuộc họp', ex: '会議に出る。', exVi: 'Dự họp.' },
      { word: '資料', reading: 'しりょう', pos: 'danh từ', meaning: 'tài liệu', ex: '資料を準備する。', exVi: 'Chuẩn bị tài liệu.' },
      { word: '締め切り', reading: 'しめきり', pos: 'danh từ', meaning: 'hạn chót', ex: '締め切りを守る。', exVi: 'Giữ đúng hạn chót.' },
      { word: '残業', reading: 'ざんぎょう', pos: 'danh từ', meaning: 'làm thêm giờ', ex: '今日は残業です。', exVi: 'Hôm nay làm thêm giờ.' },
    ],
    grammar: [
      { pattern: '〜ことになっている', meaning: 'Theo quy định/đã định là …', explain: 'Diễn tả quy tắc, lịch trình hoặc điều đã được quyết định sẵn.',
        examples: [{ jp: '会議は2時からということになっています。', vi: 'Cuộc họp được quy định bắt đầu từ 2 giờ.' }] },
    ],
    test: [
      { id: 't1', kind: 'mc', tag: 'vocab', ref: '締め切り', q: '「締め切り」の意味は？', qVi: '“締め切り” nghĩa là?', choices: ['cuộc họp', 'hạn chót', 'tài liệu', 'làm thêm'], correct: 1 },
      { id: 't2', kind: 'mc', tag: 'vocab', ref: '資料', q: '“tài liệu” là?', choices: ['会議', '資料', '残業', '締め切り'], correct: 1 },
      { id: 't3', kind: 'mc', tag: 'grammar', ref: '〜ことになっている', q: '2時から（　）。', qVi: 'Mẫu “theo quy định”', choices: ['ことにする', 'ことになっている', 'ようにする', 'つもりだ'], correct: 1 },
      { id: 't4', kind: 'mc', tag: 'vocab', ref: '残業', q: '「残業」は？', qVi: '“残業” nghĩa là?', choices: ['nghỉ phép', 'làm thêm giờ', 'họp', 'tăng lương'], correct: 1 },
    ],
  };

  /* ───────────────────────── CHINESE · HSK3 ───────────────────────── */
  M['cn-h3-1'] = {
    track: 'cn', title: '我想去旅行', titleVi: 'Tôi muốn đi du lịch', cn: true,
    type: 'listen', icon: 'headphones', color: 'teal', mins: '8–12 phút', points: 120, learners: 287,
    summary: 'Hội thoại bàn kế hoạch du lịch: mang gì, đi đâu, thời tiết.',
    vocabulary: [
      { word: '照相机', reading: 'zhàoxiàngjī', pos: 'danh từ', meaning: 'máy ảnh', ex: '别忘了带照相机。', exVi: 'Đừng quên mang máy ảnh.' },
      { word: '一定', reading: 'yídìng', pos: 'phó từ', meaning: 'nhất định, chắc chắn', ex: '我一定去。', exVi: 'Tôi nhất định sẽ đi.' },
      { word: '相信', reading: 'xiāngxìn', pos: 'động từ', meaning: 'tin tưởng', ex: '我相信你。', exVi: 'Tôi tin bạn.' },
      { word: '记得', reading: 'jìde', pos: 'động từ', meaning: 'nhớ', ex: '记得带护照。', exVi: 'Nhớ mang hộ chiếu.' },
      { word: '云', reading: 'yún', pos: 'danh từ', meaning: 'mây', ex: '天上有很多云。', exVi: 'Trên trời có nhiều mây.' },
    ],
    grammar: [
      { pattern: '不是 A，就是 B', meaning: 'Không phải A thì là B (chỉ một trong hai)', explain: 'Dùng để khẳng định kết quả nằm trong hai khả năng.',
        examples: [{ jp: '他不是在看书，就是在睡觉。', vi: 'Anh ấy không đọc sách thì là đang ngủ.' }] },
    ],
    test: [
      { id: 't1', kind: 'mc', tag: 'vocab', ref: '照相机', q: '“照相机” nghĩa là?', choices: ['hộ chiếu', 'máy ảnh', 'vali', 'vé'], correct: 1 },
      { id: 't2', kind: 'mc', tag: 'vocab', ref: '相信', q: '“tin tưởng” tiếng Trung là?', choices: ['相信', '一定', '记得', '云'], correct: 0 },
      { id: 't3', kind: 'mc', tag: 'grammar', ref: '不是 A，就是 B', q: '他不是看书，（　）睡觉。', qVi: 'Điền vào chỗ trống', choices: ['就是', '还是', '不是', '可是'], correct: 0 },
      { id: 't4', kind: 'mc', tag: 'vocab', ref: '记得', q: '“记得带护照” nghĩa là?', choices: ['Quên mang hộ chiếu', 'Nhớ mang hộ chiếu', 'Mua hộ chiếu', 'Tìm hộ chiếu'], correct: 1 },
    ],
  };

  M['cn-h3-2'] = {
    track: 'cn', title: '自我介绍', titleVi: 'Tự giới thiệu', cn: true,
    type: 'shadow', icon: 'mic', color: 'lav', mins: '6–8 phút', points: 80, learners: 165,
    summary: 'Shadowing đoạn tự giới thiệu: tên, quê quán, sở thích.',
    vocabulary: [
      { word: '介绍', reading: 'jièshào', pos: 'động từ', meaning: 'giới thiệu', ex: '我来介绍一下。', exVi: 'Để tôi giới thiệu một chút.' },
      { word: '爱好', reading: 'àihào', pos: 'danh từ', meaning: 'sở thích', ex: '我的爱好是运动。', exVi: 'Sở thích của tôi là thể thao.' },
      { word: '认识', reading: 'rènshi', pos: 'động từ', meaning: 'quen biết', ex: '认识你很高兴。', exVi: 'Rất vui được quen bạn.' },
    ],
    grammar: [
      { pattern: '一下', meaning: 'Làm … một chút (nhẹ nhàng hóa hành động)', explain: 'Thêm 一下 sau động từ để giảm sắc thái, lịch sự hơn.',
        examples: [{ jp: '介绍一下你自己。', vi: 'Giới thiệu một chút về bản thân bạn.' }] },
    ],
    test: [
      { id: 't1', kind: 'mc', tag: 'vocab', ref: '爱好', q: '“爱好” nghĩa là?', choices: ['công việc', 'sở thích', 'gia đình', 'quê quán'], correct: 1 },
      { id: 't2', kind: 'mc', tag: 'vocab', ref: '认识', q: '“quen biết” tiếng Trung là?', choices: ['介绍', '认识', '爱好', '高兴'], correct: 1 },
      { id: 't3', kind: 'mc', tag: 'grammar', ref: '一下', q: '介绍（　）你自己。', qVi: 'Điền vào chỗ trống', choices: ['一下', '一点', '一些', '一会'], correct: 0 },
    ],
  };

  M['cn-h3-3'] = {
    track: 'cn', title: '问路', titleVi: 'Hỏi đường', cn: true,
    type: 'kaiwa', icon: 'chat', color: 'coral', mins: '7–10 phút', points: 100, learners: 198,
    summary: 'Hội thoại hỏi và chỉ đường đến ngân hàng, siêu thị.',
    roleplay: [
      { you: '请问，银行在哪儿？', viYou: 'Xin hỏi, ngân hàng ở đâu?', reply: '一直走，到红绿灯往左拐。', viReply: 'Đi thẳng, đến đèn giao thông rẽ trái.' },
      { you: '远吗？', viYou: 'Có xa không?', reply: '不远，走五分钟就到。', viReply: 'Không xa, đi 5 phút là tới.' },
    ],
    vocabulary: [
      { word: '银行', reading: 'yínháng', pos: 'danh từ', meaning: 'ngân hàng', ex: '银行在那边。', exVi: 'Ngân hàng ở phía kia.' },
      { word: '一直', reading: 'yìzhí', pos: 'phó từ', meaning: 'thẳng, liên tục', ex: '一直走。', exVi: 'Đi thẳng.' },
      { word: '拐', reading: 'guǎi', pos: 'động từ', meaning: 'rẽ, quẹo', ex: '往左拐。', exVi: 'Rẽ trái.' },
      { word: '红绿灯', reading: 'hónglǜdēng', pos: 'danh từ', meaning: 'đèn giao thông', ex: '到红绿灯停。', exVi: 'Đến đèn giao thông thì dừng.' },
    ],
    grammar: [
      { pattern: '往 + 方向 + 拐', meaning: 'Rẽ về phía …', explain: 'Cấu trúc chỉ hướng rẽ: 往左拐 (rẽ trái), 往右拐 (rẽ phải).',
        examples: [{ jp: '到路口往右拐。', vi: 'Đến ngã tư rẽ phải.' }] },
    ],
    test: [
      { id: 't1', kind: 'mc', tag: 'vocab', ref: '银行', q: '“银行” nghĩa là?', choices: ['siêu thị', 'ngân hàng', 'bệnh viện', 'nhà ga'], correct: 1 },
      { id: 't2', kind: 'mc', tag: 'vocab', ref: '拐', q: '“rẽ/quẹo” tiếng Trung là?', choices: ['走', '拐', '停', '到'], correct: 1 },
      { id: 't3', kind: 'mc', tag: 'grammar', ref: '往 + 方向 + 拐', q: '往左（　）。', qVi: 'Điền động từ', choices: ['走', '拐', '停', '看'], correct: 1 },
      { id: 't4', kind: 'mc', tag: 'vocab', ref: '一直', q: '“一直走” nghĩa là?', choices: ['Đi chậm', 'Đi thẳng', 'Dừng lại', 'Quay lại'], correct: 1 },
    ],
  };

  /* ───────────────────────── PATH LAYOUTS ───────────────────────── */
  const PATHS = {
    'jp-N3': {
      intro: 'Lộ trình N3 · Nghe hiểu & giao tiếp',
      sections: [
        { id: 's1', title: 'Phần 1 · Đời sống & dịch vụ', nodes: [
          { id: 'p1', lessonId: 'jp-n3-1' },
          { id: 'p2', lessonId: 'jp-n3-2' },
          { id: 'p3', lessonId: 'jp-n3-3' },
          { id: 'cp1', type: 'checkpoint', title: 'Kiểm tra Phần 1', sectionRef: 's1' },
        ] },
        { id: 's2', title: 'Phần 2 · Công việc & xã hội', nodes: [
          { id: 'p4', lessonId: 'jp-n3-4' },
          { id: 'p5', lessonId: 'jp-n3-5' },
          { id: 'p6', lessonId: 'jp-n3-6' },
          { id: 'cp2', type: 'checkpoint', title: 'Kiểm tra Phần 2', sectionRef: 's2' },
        ] },
      ],
    },
    'cn-HSK 3': {
      intro: 'Lộ trình HSK 3 · Nghe hiểu & giao tiếp',
      sections: [
        { id: 's1', title: 'Phần 1 · Du lịch & làm quen', nodes: [
          { id: 'p1', lessonId: 'cn-h3-1' },
          { id: 'p2', lessonId: 'cn-h3-2' },
          { id: 'p3', lessonId: 'cn-h3-3' },
          { id: 'cp1', type: 'checkpoint', title: 'Kiểm tra Phần 1', sectionRef: 's1' },
        ] },
      ],
    },
  };

  /* fallback: build a generic path for any level by reusing modules of the track */
  function pathFor(lang, level) {
    const key = `${lang}-${level}`;
    if (PATHS[key]) return PATHS[key];
    // reuse the track's authored path content under this level's name (demo)
    const base = lang === 'cn' ? PATHS['cn-HSK 3'] : PATHS['jp-N3'];
    return { intro: `Lộ trình ${level} · Nghe hiểu & giao tiếp`, sections: base.sections, demo: true };
  }

  window.LM.lessonModules = M;
  window.LM.pathFor = pathFor;
})();
