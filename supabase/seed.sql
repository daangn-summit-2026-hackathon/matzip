-- Matzip Map - Seed Data
-- 각 구역별 외국인 관광객에게 인기 있는 맛집 데이터
-- Run this in Supabase SQL Editor after 001_initial_schema.sql

-- ============================================================
-- RESTAURANTS
-- ============================================================

-- === 명동 (Myeongdong) ===
INSERT INTO restaurants (id, district_id, lat, lng, tags, rating, rating_count, phone_number, translations) VALUES
('r-myeongdong-001', '57c50c10-198d-48ec-8255-4c45b8f7bc9e', 37.5635, 126.9850, ARRAY['delicious','japanese-menu'], 4.5, 320, '02-776-5348', '{
  "name": {"en": "Gogung", "ja": "古宮", "zh": "古宫"},
  "address": {"en": "15 Myeongdong-gil, Jung-gu, Seoul", "ja": "ソウル市中区明洞キル15", "zh": "首尔市中区明洞路15号"},
  "operating_hours": {"en": "11:00 AM - 10:00 PM", "ja": "11:00 - 22:00", "zh": "11:00 - 22:00"},
  "cuisine_type": {"en": "Korean Traditional", "ja": "韓国伝統料理", "zh": "韩国传统料理"}
}'),
('r-myeongdong-002', '57c50c10-198d-48ec-8255-4c45b8f7bc9e', 37.5640, 126.9865, ARRAY['delicious','good-value','chinese-menu'], 4.3, 580, '02-318-2244', '{
  "name": {"en": "Myeongdong Kyoja", "ja": "明洞餃子", "zh": "明洞饺子"},
  "address": {"en": "29 Myeongdong 10-gil, Jung-gu, Seoul", "ja": "ソウル市中区明洞10キル29", "zh": "首尔市中区明洞10路29号"},
  "operating_hours": {"en": "10:30 AM - 9:30 PM", "ja": "10:30 - 21:30", "zh": "10:30 - 21:30"},
  "cuisine_type": {"en": "Noodles & Dumplings", "ja": "麺・餃子", "zh": "面条和饺子"}
}'),
('r-myeongdong-003', '57c50c10-198d-48ec-8255-4c45b8f7bc9e', 37.5628, 126.9875, ARRAY['delicious','great-atmosphere','japanese-menu'], 4.6, 210, '02-3789-8880', '{
  "name": {"en": "Hadongkwan", "ja": "河東館", "zh": "河东馆"},
  "address": {"en": "12 Myeongdong 9-gil, Jung-gu, Seoul", "ja": "ソウル市中区明洞9キル12", "zh": "首尔市中区明洞9路12号"},
  "operating_hours": {"en": "7:00 AM - 4:00 PM", "ja": "7:00 - 16:00", "zh": "7:00 - 16:00"},
  "cuisine_type": {"en": "Korean Beef Soup", "ja": "コムタン", "zh": "牛肉汤"}
}'),
('r-myeongdong-004', '57c50c10-198d-48ec-8255-4c45b8f7bc9e', 37.5645, 126.9842, ARRAY['good-value','japanese-menu','chinese-menu'], 4.2, 890, '02-777-2579', '{
  "name": {"en": "Myeongdong Dakhanmari", "ja": "明洞タッカンマリ", "zh": "明洞一只鸡"},
  "address": {"en": "1 Myeongdong-gil, Jung-gu, Seoul", "ja": "ソウル市中区明洞キル1", "zh": "首尔市中区明洞路1号"},
  "operating_hours": {"en": "10:00 AM - 11:00 PM", "ja": "10:00 - 23:00", "zh": "10:00 - 23:00"},
  "cuisine_type": {"en": "Chicken Hot Pot", "ja": "タッカンマリ", "zh": "一只鸡火锅"}
}'),
('r-myeongdong-005', '57c50c10-198d-48ec-8255-4c45b8f7bc9e', 37.5632, 126.9858, ARRAY['delicious','great-atmosphere'], 4.7, 150, '02-776-4090', '{
  "name": {"en": "Woo Lae Oak", "ja": "又来屋", "zh": "又来屋"},
  "address": {"en": "62-29 Changchung-dong 2-ga, Jung-gu", "ja": "ソウル市中区奨忠洞2街62-29", "zh": "首尔市中区奖忠洞2街62-29"},
  "operating_hours": {"en": "11:30 AM - 10:00 PM", "ja": "11:30 - 22:00", "zh": "11:30 - 22:00"},
  "cuisine_type": {"en": "Korean BBQ", "ja": "韓国焼肉", "zh": "韩国烤肉"}
}');

-- === 성수 (Seongsu) ===
INSERT INTO restaurants (id, district_id, lat, lng, tags, rating, rating_count, phone_number, translations) VALUES
('r-seongsu-001', '7331f511-c521-4382-a1e3-ffcc639d10b7', 37.5445, 127.0560, ARRAY['great-atmosphere','delicious'], 4.4, 275, '02-499-9937', '{
  "name": {"en": "Seongsu Yeonnam", "ja": "聖水ヨンナム", "zh": "圣水延南"},
  "address": {"en": "8 Seongsui-ro 14-gil, Seongdong-gu", "ja": "城東区聖水イロ14キル8", "zh": "城东区圣水路14路8号"},
  "operating_hours": {"en": "11:00 AM - 9:00 PM", "ja": "11:00 - 21:00", "zh": "11:00 - 21:00"},
  "cuisine_type": {"en": "Fusion Korean", "ja": "フュージョン韓国料理", "zh": "融合韩餐"}
}'),
('r-seongsu-002', '7331f511-c521-4382-a1e3-ffcc639d10b7', 37.5450, 127.0545, ARRAY['great-atmosphere','good-value'], 4.3, 190, '02-462-1123', '{
  "name": {"en": "Cafe Onion Seongsu", "ja": "カフェオニオン聖水", "zh": "Onion咖啡圣水"},
  "address": {"en": "8 Achasan-ro 11-gil, Seongdong-gu", "ja": "城東区峨嵯山路11キル8", "zh": "城东区峨嵯山路11路8号"},
  "operating_hours": {"en": "8:00 AM - 10:00 PM", "ja": "8:00 - 22:00", "zh": "8:00 - 22:00"},
  "cuisine_type": {"en": "Bakery & Cafe", "ja": "ベーカリー＆カフェ", "zh": "面包咖啡"}
}'),
('r-seongsu-003', '7331f511-c521-4382-a1e3-ffcc639d10b7', 37.5438, 127.0570, ARRAY['delicious','good-value','japanese-menu'], 4.5, 340, '02-499-5522', '{
  "name": {"en": "Tteuran", "ja": "トゥラン", "zh": "뜨란"},
  "address": {"en": "15 Yeonmujang-gil, Seongdong-gu", "ja": "城東区練武場キル15", "zh": "城东区练武场路15号"},
  "operating_hours": {"en": "11:30 AM - 9:00 PM", "ja": "11:30 - 21:00", "zh": "11:30 - 21:00"},
  "cuisine_type": {"en": "Korean Home Cooking", "ja": "韓国家庭料理", "zh": "韩国家常菜"}
}'),
('r-seongsu-004', '7331f511-c521-4382-a1e3-ffcc639d10b7', 37.5455, 127.0535, ARRAY['great-atmosphere'], 4.6, 420, '02-6449-1020', '{
  "name": {"en": "Daelim Changgo", "ja": "大林倉庫", "zh": "大林仓库"},
  "address": {"en": "78 Seongsui-ro, Seongdong-gu", "ja": "城東区聖水イロ78", "zh": "城东区圣水路78号"},
  "operating_hours": {"en": "11:00 AM - 10:00 PM", "ja": "11:00 - 22:00", "zh": "11:00 - 22:00"},
  "cuisine_type": {"en": "Italian Fusion", "ja": "イタリアンフュージョン", "zh": "意式融合"}
}'),
('r-seongsu-005', '7331f511-c521-4382-a1e3-ffcc639d10b7', 37.5442, 127.0580, ARRAY['delicious','great-atmosphere','chinese-menu'], 4.4, 165, '02-498-7788', '{
  "name": {"en": "Seongsu Galbi", "ja": "聖水カルビ", "zh": "圣水排骨"},
  "address": {"en": "22 Seongsui-ro 20-gil, Seongdong-gu", "ja": "城東区聖水イロ20キル22", "zh": "城东区圣水路20路22号"},
  "operating_hours": {"en": "5:00 PM - 12:00 AM", "ja": "17:00 - 24:00", "zh": "17:00 - 24:00"},
  "cuisine_type": {"en": "Korean BBQ", "ja": "韓国焼肉", "zh": "韩国烤肉"}
}');

-- === 강남 (Gangnam) ===
INSERT INTO restaurants (id, district_id, lat, lng, tags, rating, rating_count, phone_number, translations) VALUES
('r-gangnam-001', '32c525cc-da0f-4445-b93e-b7509e25334a', 37.4980, 127.0280, ARRAY['delicious','great-atmosphere'], 4.8, 95, '02-545-9845', '{
  "name": {"en": "Jungsik", "ja": "ジョンシク", "zh": "正食"},
  "address": {"en": "11 Seolleung-ro 158-gil, Gangnam-gu", "ja": "江南区宣陵路158キル11", "zh": "江南区宣陵路158路11号"},
  "operating_hours": {"en": "12:00 PM - 3:00 PM, 6:00 PM - 10:00 PM", "ja": "12:00-15:00, 18:00-22:00", "zh": "12:00-15:00, 18:00-22:00"},
  "cuisine_type": {"en": "Modern Korean Fine Dining", "ja": "モダン韓国ファインダイニング", "zh": "现代韩国精致料理"}
}'),
('r-gangnam-002', '32c525cc-da0f-4445-b93e-b7509e25334a', 37.4975, 127.0265, ARRAY['delicious','japanese-menu','chinese-menu'], 4.5, 410, '02-3443-4567', '{
  "name": {"en": "Samwon Garden", "ja": "三元ガーデン", "zh": "三元花园"},
  "address": {"en": "835 Eonju-ro, Gangnam-gu", "ja": "江南区彦州路835", "zh": "江南区彦州路835号"},
  "operating_hours": {"en": "11:30 AM - 10:00 PM", "ja": "11:30 - 22:00", "zh": "11:30 - 22:00"},
  "cuisine_type": {"en": "Korean BBQ Premium", "ja": "プレミアム韓国焼肉", "zh": "高级韩国烤肉"}
}'),
('r-gangnam-003', '32c525cc-da0f-4445-b93e-b7509e25334a', 37.4985, 127.0300, ARRAY['great-atmosphere','delicious'], 4.6, 180, '02-518-6262', '{
  "name": {"en": "Mingles", "ja": "ミングルス", "zh": "Mingles"},
  "address": {"en": "94 Dosan-daero, Gangnam-gu", "ja": "江南区島山大路94", "zh": "江南区岛山大路94号"},
  "operating_hours": {"en": "12:00 PM - 3:00 PM, 6:00 PM - 10:00 PM", "ja": "12:00-15:00, 18:00-22:00", "zh": "12:00-15:00, 18:00-22:00"},
  "cuisine_type": {"en": "Contemporary Korean", "ja": "コンテンポラリー韓国料理", "zh": "当代韩国料理"}
}'),
('r-gangnam-004', '32c525cc-da0f-4445-b93e-b7509e25334a', 37.4970, 127.0250, ARRAY['good-value','delicious','japanese-menu'], 4.3, 520, '02-555-7890', '{
  "name": {"en": "Tosokchon Samgyetang Gangnam", "ja": "土俗村参鶏湯江南", "zh": "土俗村参鸡汤江南"},
  "address": {"en": "5 Gangnam-daero 102-gil, Gangnam-gu", "ja": "江南区江南大路102キル5", "zh": "江南区江南大路102路5号"},
  "operating_hours": {"en": "10:00 AM - 10:00 PM", "ja": "10:00 - 22:00", "zh": "10:00 - 22:00"},
  "cuisine_type": {"en": "Samgyetang (Ginseng Chicken)", "ja": "参鶏湯", "zh": "参鸡汤"}
}'),
('r-gangnam-005', '32c525cc-da0f-4445-b93e-b7509e25334a', 37.4990, 127.0290, ARRAY['great-atmosphere','chinese-menu'], 4.4, 230, '02-547-3366', '{
  "name": {"en": "Born & Bred Gangnam", "ja": "ボーン＆ブレッド江南", "zh": "Born & Bred江南"},
  "address": {"en": "20 Teheran-ro 4-gil, Gangnam-gu", "ja": "江南区テヘラン路4キル20", "zh": "江南区德黑兰路4路20号"},
  "operating_hours": {"en": "11:30 AM - 11:00 PM", "ja": "11:30 - 23:00", "zh": "11:30 - 23:00"},
  "cuisine_type": {"en": "Korean Beef Specialist", "ja": "韓牛専門店", "zh": "韩牛专门店"}
}');

-- === 신사 (Sinsa / Garosu-gil) ===
INSERT INTO restaurants (id, district_id, lat, lng, tags, rating, rating_count, phone_number, translations) VALUES
('r-sinsa-001', '1b551ff6-517f-4c0e-8117-001468102ee4', 37.5168, 127.0210, ARRAY['great-atmosphere','delicious'], 4.5, 310, '02-545-0020', '{
  "name": {"en": "Passion 5", "ja": "パッション5", "zh": "Passion 5"},
  "address": {"en": "272 Itaewon-ro, Yongsan-gu", "ja": "龍山区梨泰院路272", "zh": "龙山区梨泰院路272号"},
  "operating_hours": {"en": "8:00 AM - 10:00 PM", "ja": "8:00 - 22:00", "zh": "8:00 - 22:00"},
  "cuisine_type": {"en": "Bakery & Patisserie", "ja": "ベーカリー＆パティスリー", "zh": "面包甜点"}
}'),
('r-sinsa-002', '1b551ff6-517f-4c0e-8117-001468102ee4', 37.5160, 127.0200, ARRAY['delicious','good-value','japanese-menu'], 4.4, 445, '02-541-5678', '{
  "name": {"en": "Garosu-gil Jokbal", "ja": "カロスキルチョッパル", "zh": "林荫路猪蹄"},
  "address": {"en": "18 Sinsa-dong, Gangnam-gu", "ja": "江南区新沙洞18", "zh": "江南区新沙洞18号"},
  "operating_hours": {"en": "11:00 AM - 11:00 PM", "ja": "11:00 - 23:00", "zh": "11:00 - 23:00"},
  "cuisine_type": {"en": "Jokbal (Pig Feet)", "ja": "チョッパル（豚足）", "zh": "猪蹄"}
}'),
('r-sinsa-003', '1b551ff6-517f-4c0e-8117-001468102ee4', 37.5172, 127.0215, ARRAY['great-atmosphere','chinese-menu'], 4.6, 185, '02-3445-1234', '{
  "name": {"en": "Suji''s", "ja": "スジズ", "zh": "Suji''s"},
  "address": {"en": "32 Dosan-daero 15-gil, Gangnam-gu", "ja": "江南区島山大路15キル32", "zh": "江南区岛山大路15路32号"},
  "operating_hours": {"en": "9:00 AM - 9:00 PM", "ja": "9:00 - 21:00", "zh": "9:00 - 21:00"},
  "cuisine_type": {"en": "Brunch & Western", "ja": "ブランチ＆洋食", "zh": "早午餐和西餐"}
}'),
('r-sinsa-004', '1b551ff6-517f-4c0e-8117-001468102ee4', 37.5155, 127.0195, ARRAY['delicious','great-atmosphere','japanese-menu'], 4.5, 260, '02-517-8900', '{
  "name": {"en": "Table Star", "ja": "テーブルスター", "zh": "Table Star"},
  "address": {"en": "45 Apgujeong-ro 10-gil, Gangnam-gu", "ja": "江南区狎鷗亭路10キル45", "zh": "江南区狎鸥亭路10路45号"},
  "operating_hours": {"en": "11:30 AM - 10:00 PM", "ja": "11:30 - 22:00", "zh": "11:30 - 22:00"},
  "cuisine_type": {"en": "Italian", "ja": "イタリアン", "zh": "意大利菜"}
}'),
('r-sinsa-005', '1b551ff6-517f-4c0e-8117-001468102ee4', 37.5175, 127.0220, ARRAY['good-value','delicious'], 4.2, 380, '02-549-7700', '{
  "name": {"en": "Sinsa Sundae Town", "ja": "新沙スンデタウン", "zh": "新沙米肠城"},
  "address": {"en": "7 Sinsa-dong 530, Gangnam-gu", "ja": "江南区新沙洞530-7", "zh": "江南区新沙洞530-7号"},
  "operating_hours": {"en": "10:00 AM - 10:00 PM", "ja": "10:00 - 22:00", "zh": "10:00 - 22:00"},
  "cuisine_type": {"en": "Sundae (Blood Sausage)", "ja": "スンデ（韓国式ソーセージ）", "zh": "米肠（韩式血肠）"}
}');

-- === 서울역 (Seoul Station) ===
INSERT INTO restaurants (id, district_id, lat, lng, tags, rating, rating_count, phone_number, translations) VALUES
('r-seoul-station-001', 'e20519ea-418d-4c8e-b4c4-2ecdd9c0b93a', 37.5550, 126.9710, ARRAY['good-value','delicious','japanese-menu'], 4.3, 620, '02-755-5507', '{
  "name": {"en": "Namdaemun Kalguksu Alley", "ja": "南大門カルグクスの路地", "zh": "南大门刀削面胡同"},
  "address": {"en": "42 Namdaemun-ro, Jung-gu", "ja": "ソウル市中区南大門路42", "zh": "首尔市中区南大门路42号"},
  "operating_hours": {"en": "7:00 AM - 9:00 PM", "ja": "7:00 - 21:00", "zh": "7:00 - 21:00"},
  "cuisine_type": {"en": "Kalguksu (Knife Noodles)", "ja": "カルグクス（手打ち麺）", "zh": "刀削面"}
}'),
('r-seoul-station-002', 'e20519ea-418d-4c8e-b4c4-2ecdd9c0b93a', 37.5545, 126.9700, ARRAY['good-value','chinese-menu'], 4.1, 450, '02-752-8833', '{
  "name": {"en": "Honam Jip", "ja": "湖南チプ", "zh": "湖南家"},
  "address": {"en": "15 Toegye-ro, Jung-gu", "ja": "ソウル市中区退渓路15", "zh": "首尔市中区退溪路15号"},
  "operating_hours": {"en": "6:00 AM - 9:00 PM", "ja": "6:00 - 21:00", "zh": "6:00 - 21:00"},
  "cuisine_type": {"en": "Korean Set Meal (Baekban)", "ja": "韓国定食（ペッパン）", "zh": "韩式套餐（白饭）"}
}'),
('r-seoul-station-003', 'e20519ea-418d-4c8e-b4c4-2ecdd9c0b93a', 37.5555, 126.9720, ARRAY['delicious','good-value','japanese-menu','chinese-menu'], 4.4, 380, '02-318-0608', '{
  "name": {"en": "Gamjatang Alley", "ja": "カムジャタン通り", "zh": "土豆汤胡同"},
  "address": {"en": "8 Cheongpa-ro 71-gil, Yongsan-gu", "ja": "龍山区青坡路71キル8", "zh": "龙山区青坡路71路8号"},
  "operating_hours": {"en": "24 hours", "ja": "24時間営業", "zh": "24小时营业"},
  "cuisine_type": {"en": "Gamjatang (Pork Bone Stew)", "ja": "カムジャタン（豚骨スープ）", "zh": "土豆排骨汤"}
}'),
('r-seoul-station-004', 'e20519ea-418d-4c8e-b4c4-2ecdd9c0b93a', 37.5540, 126.9695, ARRAY['good-value','delicious'], 4.2, 290, '02-777-4644', '{
  "name": {"en": "Bongjunmak", "ja": "峰峻幕", "zh": "峰峻幕"},
  "address": {"en": "3 Namdaemun-ro 5-gil, Jung-gu", "ja": "ソウル市中区南大門路5キル3", "zh": "首尔市中区南大门路5路3号"},
  "operating_hours": {"en": "11:00 AM - 10:00 PM", "ja": "11:00 - 22:00", "zh": "11:00 - 22:00"},
  "cuisine_type": {"en": "Makguksu (Buckwheat Noodles)", "ja": "マッククス（蕎麦冷麺）", "zh": "荞麦冷面"}
}'),
('r-seoul-station-005', 'e20519ea-418d-4c8e-b4c4-2ecdd9c0b93a', 37.5558, 126.9715, ARRAY['delicious','japanese-menu'], 4.5, 175, '02-319-2233', '{
  "name": {"en": "Yongsan Jjimdak", "ja": "龍山チムタク", "zh": "龙山蒸鸡"},
  "address": {"en": "12 Hangang-daero, Yongsan-gu", "ja": "龍山区漢江大路12", "zh": "龙山区汉江大路12号"},
  "operating_hours": {"en": "11:00 AM - 9:30 PM", "ja": "11:00 - 21:30", "zh": "11:00 - 21:30"},
  "cuisine_type": {"en": "Jjimdak (Braised Chicken)", "ja": "チムタク（蒸し鶏）", "zh": "蒸鸡"}
}');

-- === COEX/삼성역 (COEX/Samsung Station) ===
INSERT INTO restaurants (id, district_id, lat, lng, tags, rating, rating_count, phone_number, translations) VALUES
('r-coex-001', 'dc4fe1d1-ae06-4697-8abb-1c6bad668c69', 37.5120, 127.0590, ARRAY['great-atmosphere','delicious','japanese-menu'], 4.5, 350, '02-6002-1700', '{
  "name": {"en": "Intercontinental Lobby Lounge", "ja": "インターコンチネンタルロビーラウンジ", "zh": "洲际酒店大堂酒廊"},
  "address": {"en": "524 Bongeunsa-ro, Gangnam-gu", "ja": "江南区奉恩寺路524", "zh": "江南区奉恩寺路524号"},
  "operating_hours": {"en": "7:00 AM - 11:00 PM", "ja": "7:00 - 23:00", "zh": "7:00 - 23:00"},
  "cuisine_type": {"en": "International Buffet", "ja": "インターナショナルビュッフェ", "zh": "国际自助餐"}
}'),
('r-coex-002', 'dc4fe1d1-ae06-4697-8abb-1c6bad668c69', 37.5115, 127.0600, ARRAY['good-value','delicious','chinese-menu'], 4.3, 480, '02-6002-5252', '{
  "name": {"en": "COEX Food Court Bibimbap", "ja": "COEXフードコートビビンバ", "zh": "COEX美食广场拌饭"},
  "address": {"en": "COEX Mall B1, 513 Yeongdong-daero", "ja": "COEXモールB1、永東大路513", "zh": "COEX商场B1，永东大路513号"},
  "operating_hours": {"en": "10:30 AM - 10:00 PM", "ja": "10:30 - 22:00", "zh": "10:30 - 22:00"},
  "cuisine_type": {"en": "Bibimbap", "ja": "ビビンバ", "zh": "拌饭"}
}'),
('r-coex-003', 'dc4fe1d1-ae06-4697-8abb-1c6bad668c69', 37.5110, 127.0585, ARRAY['great-atmosphere','delicious'], 4.7, 120, '02-3452-0088', '{
  "name": {"en": "Gaon", "ja": "ガオン", "zh": "Gaon"},
  "address": {"en": "317 Dosan-daero, Gangnam-gu", "ja": "江南区島山大路317", "zh": "江南区岛山大路317号"},
  "operating_hours": {"en": "12:00 PM - 3:00 PM, 6:00 PM - 10:00 PM", "ja": "12:00-15:00, 18:00-22:00", "zh": "12:00-15:00, 18:00-22:00"},
  "cuisine_type": {"en": "Korean Fine Dining", "ja": "韓国ファインダイニング", "zh": "韩国精致料理"}
}'),
('r-coex-004', 'dc4fe1d1-ae06-4697-8abb-1c6bad668c69', 37.5125, 127.0605, ARRAY['good-value','japanese-menu','chinese-menu'], 4.2, 560, '02-6002-3456', '{
  "name": {"en": "Hansot Dosirak COEX", "ja": "ハンソッ弁当COEX", "zh": "韩食便当COEX"},
  "address": {"en": "COEX Mall B1, 513 Yeongdong-daero", "ja": "COEXモールB1、永東大路513", "zh": "COEX商场B1，永东大路513号"},
  "operating_hours": {"en": "8:00 AM - 9:00 PM", "ja": "8:00 - 21:00", "zh": "8:00 - 21:00"},
  "cuisine_type": {"en": "Korean Lunchbox", "ja": "韓国弁当", "zh": "韩式便当"}
}'),
('r-coex-005', 'dc4fe1d1-ae06-4697-8abb-1c6bad668c69', 37.5118, 127.0595, ARRAY['delicious','great-atmosphere','japanese-menu'], 4.6, 200, '02-531-2100', '{
  "name": {"en": "Bongsanok", "ja": "鳳山屋", "zh": "凤山屋"},
  "address": {"en": "159 Samseong-ro, Gangnam-gu", "ja": "江南区三成路159", "zh": "江南区三成路159号"},
  "operating_hours": {"en": "11:00 AM - 9:30 PM", "ja": "11:00 - 21:30", "zh": "11:00 - 21:30"},
  "cuisine_type": {"en": "Naengmyeon (Cold Noodles)", "ja": "冷麺", "zh": "冷面"}
}');

-- ============================================================
-- MENU ITEMS
-- ============================================================

-- 명동 고궁 메뉴
INSERT INTO menu_items (id, restaurant_id, price, display_order, translations) VALUES
('m-001', 'r-myeongdong-001', 15000, 1, '{"name": {"en": "Jeonju Bibimbap", "ja": "全州ビビンバ", "zh": "全州拌饭"}}'),
('m-002', 'r-myeongdong-001', 18000, 2, '{"name": {"en": "Bulgogi Jeongol", "ja": "プルコギ鍋", "zh": "烤肉火锅"}}'),
('m-003', 'r-myeongdong-001', 13000, 3, '{"name": {"en": "Haemul Pajeon", "ja": "海鮮チヂミ", "zh": "海鲜葱饼"}}');

-- 명동교자 메뉴
INSERT INTO menu_items (id, restaurant_id, price, display_order, translations) VALUES
('m-004', 'r-myeongdong-002', 11000, 1, '{"name": {"en": "Kalguksu", "ja": "カルグクス", "zh": "刀削面"}}'),
('m-005', 'r-myeongdong-002', 11000, 2, '{"name": {"en": "Mandu (Dumplings)", "ja": "マンドゥ（餃子）", "zh": "饺子"}}'),
('m-006', 'r-myeongdong-002', 13000, 3, '{"name": {"en": "Bibimbap", "ja": "ビビンバ", "zh": "拌饭"}}');

-- 하동관 메뉴
INSERT INTO menu_items (id, restaurant_id, price, display_order, translations) VALUES
('m-007', 'r-myeongdong-003', 16000, 1, '{"name": {"en": "Gomtang (Beef Bone Soup)", "ja": "コムタン（牛骨スープ）", "zh": "牛骨汤"}}'),
('m-008', 'r-myeongdong-003', 18000, 2, '{"name": {"en": "Special Gomtang", "ja": "特コムタン", "zh": "特级牛骨汤"}}');

-- 명동 닭한마리 메뉴
INSERT INTO menu_items (id, restaurant_id, price, display_order, translations) VALUES
('m-009', 'r-myeongdong-004', 25000, 1, '{"name": {"en": "Dakhanmari (Whole Chicken)", "ja": "タッカンマリ（丸鶏）", "zh": "一只鸡"}}'),
('m-010', 'r-myeongdong-004', 3000, 2, '{"name": {"en": "Kalguksu (Add-on)", "ja": "カルグクス（追加）", "zh": "刀削面（加点）"}}');

-- 우래옥 메뉴
INSERT INTO menu_items (id, restaurant_id, price, display_order, translations) VALUES
('m-011', 'r-myeongdong-005', 35000, 1, '{"name": {"en": "Bulgogi Set", "ja": "プルコギセット", "zh": "烤肉套餐"}}'),
('m-012', 'r-myeongdong-005', 16000, 2, '{"name": {"en": "Pyongyang Naengmyeon", "ja": "平壌冷麺", "zh": "平壤冷面"}}');

-- 성수 연남 메뉴
INSERT INTO menu_items (id, restaurant_id, price, display_order, translations) VALUES
('m-013', 'r-seongsu-001', 14000, 1, '{"name": {"en": "Truffle Bibimbap", "ja": "トリュフビビンバ", "zh": "松露拌饭"}}'),
('m-014', 'r-seongsu-001', 18000, 2, '{"name": {"en": "Galbi Steak", "ja": "カルビステーキ", "zh": "排骨牛排"}}');

-- 카페 어니언 메뉴
INSERT INTO menu_items (id, restaurant_id, price, display_order, translations) VALUES
('m-015', 'r-seongsu-002', 5500, 1, '{"name": {"en": "Pandoro", "ja": "パンドーロ", "zh": "潘多洛面包"}}'),
('m-016', 'r-seongsu-002', 6500, 2, '{"name": {"en": "Americano", "ja": "アメリカーノ", "zh": "美式咖啡"}}'),
('m-017', 'r-seongsu-002', 7000, 3, '{"name": {"en": "Croissant", "ja": "クロワッサン", "zh": "可颂"}}');

-- 뜨란 메뉴
INSERT INTO menu_items (id, restaurant_id, price, display_order, translations) VALUES
('m-018', 'r-seongsu-003', 12000, 1, '{"name": {"en": "Doenjang Jjigae Set", "ja": "テンジャンチゲ定食", "zh": "大酱汤套餐"}}'),
('m-019', 'r-seongsu-003', 13000, 2, '{"name": {"en": "Kimchi Jjigae Set", "ja": "キムチチゲ定食", "zh": "泡菜汤套餐"}}');

-- 대림창고 메뉴
INSERT INTO menu_items (id, restaurant_id, price, display_order, translations) VALUES
('m-020', 'r-seongsu-004', 22000, 1, '{"name": {"en": "Truffle Pasta", "ja": "トリュフパスタ", "zh": "松露意面"}}'),
('m-021', 'r-seongsu-004', 25000, 2, '{"name": {"en": "Margherita Pizza", "ja": "マルゲリータピザ", "zh": "玛格丽特披萨"}}');

-- 성수갈비 메뉴
INSERT INTO menu_items (id, restaurant_id, price, display_order, translations) VALUES
('m-022', 'r-seongsu-005', 28000, 1, '{"name": {"en": "Yangnyeom Galbi", "ja": "ヤンニョムカルビ", "zh": "调味排骨"}}'),
('m-023', 'r-seongsu-005', 32000, 2, '{"name": {"en": "Saeng Galbi", "ja": "生カルビ", "zh": "生排骨"}}');

-- 정식당 메뉴
INSERT INTO menu_items (id, restaurant_id, price, display_order, translations) VALUES
('m-024', 'r-gangnam-001', 95000, 1, '{"name": {"en": "Lunch Course", "ja": "ランチコース", "zh": "午餐套餐"}}'),
('m-025', 'r-gangnam-001', 180000, 2, '{"name": {"en": "Dinner Course", "ja": "ディナーコース", "zh": "晚餐套餐"}}');

-- 삼원가든 메뉴
INSERT INTO menu_items (id, restaurant_id, price, display_order, translations) VALUES
('m-026', 'r-gangnam-002', 58000, 1, '{"name": {"en": "Galbi (Beef Short Ribs)", "ja": "カルビ（牛バラ）", "zh": "牛排骨"}}'),
('m-027', 'r-gangnam-002', 52000, 2, '{"name": {"en": "Bulgogi", "ja": "プルコギ", "zh": "烤肉"}}'),
('m-028', 'r-gangnam-002', 16000, 3, '{"name": {"en": "Naengmyeon", "ja": "冷麺", "zh": "冷面"}}');

-- 밍글스 메뉴
INSERT INTO menu_items (id, restaurant_id, price, display_order, translations) VALUES
('m-029', 'r-gangnam-003', 85000, 1, '{"name": {"en": "Lunch Tasting Menu", "ja": "ランチテイスティングメニュー", "zh": "午餐品鉴菜单"}}'),
('m-030', 'r-gangnam-003', 165000, 2, '{"name": {"en": "Dinner Tasting Menu", "ja": "ディナーテイスティングメニュー", "zh": "晚餐品鉴菜单"}}');

-- 토속촌 삼계탕 강남 메뉴
INSERT INTO menu_items (id, restaurant_id, price, display_order, translations) VALUES
('m-031', 'r-gangnam-004', 18000, 1, '{"name": {"en": "Samgyetang", "ja": "参鶏湯", "zh": "参鸡汤"}}'),
('m-032', 'r-gangnam-004', 25000, 2, '{"name": {"en": "Ogol Samgyetang (Black Chicken)", "ja": "烏骨鶏参鶏湯", "zh": "乌骨鸡参鸡汤"}}');

-- 본앤브레드 강남 메뉴
INSERT INTO menu_items (id, restaurant_id, price, display_order, translations) VALUES
('m-033', 'r-gangnam-005', 45000, 1, '{"name": {"en": "Hanwoo Sirloin", "ja": "韓牛サーロイン", "zh": "韩牛西冷"}}'),
('m-034', 'r-gangnam-005', 55000, 2, '{"name": {"en": "Hanwoo Ribeye", "ja": "韓牛リブアイ", "zh": "韩牛肋眼"}}');

-- 패션5 메뉴
INSERT INTO menu_items (id, restaurant_id, price, display_order, translations) VALUES
('m-035', 'r-sinsa-001', 8500, 1, '{"name": {"en": "Chocolate Cake", "ja": "チョコレートケーキ", "zh": "巧克力蛋糕"}}'),
('m-036', 'r-sinsa-001', 12000, 2, '{"name": {"en": "Brunch Set", "ja": "ブランチセット", "zh": "早午餐套餐"}}');

-- 가로수길 족발 메뉴
INSERT INTO menu_items (id, restaurant_id, price, display_order, translations) VALUES
('m-037', 'r-sinsa-002', 35000, 1, '{"name": {"en": "Jokbal (Small)", "ja": "チョッパル（小）", "zh": "猪蹄（小）"}}'),
('m-038', 'r-sinsa-002', 45000, 2, '{"name": {"en": "Jokbal (Large)", "ja": "チョッパル（大）", "zh": "猪蹄（大）"}}'),
('m-039', 'r-sinsa-002', 8000, 3, '{"name": {"en": "Bossam", "ja": "ポッサム", "zh": "菜包肉"}}');

-- 수지스 메뉴
INSERT INTO menu_items (id, restaurant_id, price, display_order, translations) VALUES
('m-040', 'r-sinsa-003', 18000, 1, '{"name": {"en": "Eggs Benedict", "ja": "エッグベネディクト", "zh": "班尼迪克蛋"}}'),
('m-041', 'r-sinsa-003', 22000, 2, '{"name": {"en": "Avocado Toast", "ja": "アボカドトースト", "zh": "牛油果吐司"}}');

-- 테이블스타 메뉴
INSERT INTO menu_items (id, restaurant_id, price, display_order, translations) VALUES
('m-042', 'r-sinsa-004', 28000, 1, '{"name": {"en": "Truffle Risotto", "ja": "トリュフリゾット", "zh": "松露烩饭"}}'),
('m-043', 'r-sinsa-004', 32000, 2, '{"name": {"en": "Wagyu Steak", "ja": "和牛ステーキ", "zh": "和牛牛排"}}');

-- 신사 순대타운 메뉴
INSERT INTO menu_items (id, restaurant_id, price, display_order, translations) VALUES
('m-044', 'r-sinsa-005', 12000, 1, '{"name": {"en": "Sundae Gukbap", "ja": "スンデクッパ", "zh": "米肠汤饭"}}'),
('m-045', 'r-sinsa-005', 15000, 2, '{"name": {"en": "Sundae Platter", "ja": "スンデ盛り合わせ", "zh": "米肠拼盘"}}');

-- 남대문 칼국수 메뉴
INSERT INTO menu_items (id, restaurant_id, price, display_order, translations) VALUES
('m-046', 'r-seoul-station-001', 9000, 1, '{"name": {"en": "Kalguksu", "ja": "カルグクス", "zh": "刀削面"}}'),
('m-047', 'r-seoul-station-001', 10000, 2, '{"name": {"en": "Kongguksu (Soy Milk Noodles)", "ja": "コングクス（豆乳麺）", "zh": "豆浆面"}}');

-- 호남집 메뉴
INSERT INTO menu_items (id, restaurant_id, price, display_order, translations) VALUES
('m-048', 'r-seoul-station-002', 9000, 1, '{"name": {"en": "Baekban (Korean Set Meal)", "ja": "ペッパン（韓国定食）", "zh": "白饭（韩式套餐）"}}'),
('m-049', 'r-seoul-station-002', 12000, 2, '{"name": {"en": "Galchi Jorim (Braised Cutlassfish)", "ja": "カルチジョリム（太刀魚煮）", "zh": "红烧带鱼"}}');

-- 감자탕 골목 메뉴
INSERT INTO menu_items (id, restaurant_id, price, display_order, translations) VALUES
('m-050', 'r-seoul-station-003', 30000, 1, '{"name": {"en": "Gamjatang (Medium)", "ja": "カムジャタン（中）", "zh": "土豆排骨汤（中）"}}'),
('m-051', 'r-seoul-station-003', 40000, 2, '{"name": {"en": "Gamjatang (Large)", "ja": "カムジャタン（大）", "zh": "土豆排骨汤（大）"}}');

-- 봉준막 메뉴
INSERT INTO menu_items (id, restaurant_id, price, display_order, translations) VALUES
('m-052', 'r-seoul-station-004', 10000, 1, '{"name": {"en": "Makguksu", "ja": "マッククス", "zh": "荞麦冷面"}}'),
('m-053', 'r-seoul-station-004', 12000, 2, '{"name": {"en": "Bibim Makguksu", "ja": "ビビンマッククス", "zh": "拌荞麦面"}}');

-- 용산 찜닭 메뉴
INSERT INTO menu_items (id, restaurant_id, price, display_order, translations) VALUES
('m-054', 'r-seoul-station-005', 28000, 1, '{"name": {"en": "Jjimdak (Medium)", "ja": "チムタク（中）", "zh": "蒸鸡（中）"}}'),
('m-055', 'r-seoul-station-005', 35000, 2, '{"name": {"en": "Jjimdak (Large)", "ja": "チムタク（大）", "zh": "蒸鸡（大）"}}');

-- COEX 인터컨티넨탈 메뉴
INSERT INTO menu_items (id, restaurant_id, price, display_order, translations) VALUES
('m-056', 'r-coex-001', 75000, 1, '{"name": {"en": "Lunch Buffet", "ja": "ランチビュッフェ", "zh": "午餐自助"}}'),
('m-057', 'r-coex-001', 95000, 2, '{"name": {"en": "Dinner Buffet", "ja": "ディナービュッフェ", "zh": "晚餐自助"}}');

-- COEX 푸드코트 비빔밥 메뉴
INSERT INTO menu_items (id, restaurant_id, price, display_order, translations) VALUES
('m-058', 'r-coex-002', 11000, 1, '{"name": {"en": "Dolsot Bibimbap", "ja": "石焼ビビンバ", "zh": "石锅拌饭"}}'),
('m-059', 'r-coex-002', 13000, 2, '{"name": {"en": "Yukhoe Bibimbap", "ja": "ユッケビビンバ", "zh": "生牛肉拌饭"}}');

-- 가온 메뉴
INSERT INTO menu_items (id, restaurant_id, price, display_order, translations) VALUES
('m-060', 'r-coex-003', 120000, 1, '{"name": {"en": "Lunch Course", "ja": "ランチコース", "zh": "午餐套餐"}}'),
('m-061', 'r-coex-003', 250000, 2, '{"name": {"en": "Dinner Course", "ja": "ディナーコース", "zh": "晚餐套餐"}}');

-- 한솥 도시락 COEX 메뉴
INSERT INTO menu_items (id, restaurant_id, price, display_order, translations) VALUES
('m-062', 'r-coex-004', 6500, 1, '{"name": {"en": "Bulgogi Dosirak", "ja": "プルコギ弁当", "zh": "烤肉便当"}}'),
('m-063', 'r-coex-004', 7500, 2, '{"name": {"en": "Chicken Katsu Dosirak", "ja": "チキンカツ弁当", "zh": "炸鸡排便当"}}'),
('m-064', 'r-coex-004', 5500, 3, '{"name": {"en": "Kimchi Fried Rice", "ja": "キムチチャーハン", "zh": "泡菜炒饭"}}');

-- 봉산옥 메뉴
INSERT INTO menu_items (id, restaurant_id, price, display_order, translations) VALUES
('m-065', 'r-coex-005', 14000, 1, '{"name": {"en": "Mul Naengmyeon (Cold Broth Noodles)", "ja": "水冷麺", "zh": "水冷面"}}'),
('m-066', 'r-coex-005', 14000, 2, '{"name": {"en": "Bibim Naengmyeon (Spicy Cold Noodles)", "ja": "ビビン冷麺", "zh": "拌冷面"}}'),
('m-067', 'r-coex-005', 18000, 3, '{"name": {"en": "Mandu Jeongol (Dumpling Hot Pot)", "ja": "マンドゥ鍋", "zh": "饺子火锅"}}');

-- ============================================================
-- RESTAURANT PHOTOS (placeholder URLs - replace with actual Supabase Storage URLs)
-- ============================================================

INSERT INTO restaurant_photos (id, restaurant_id, url, display_order, translations) VALUES
-- 명동
('p-001', 'r-myeongdong-001', 'https://placehold.co/800x600/e2725b/white?text=Gogung', 1, '{"alt_text": {"en": "Gogung restaurant interior", "ja": "古宮の店内", "zh": "古宫餐厅内部"}}'),
('p-002', 'r-myeongdong-001', 'https://placehold.co/800x600/e2725b/white?text=Bibimbap', 2, '{"alt_text": {"en": "Jeonju Bibimbap", "ja": "全州ビビンバ", "zh": "全州拌饭"}}'),
('p-003', 'r-myeongdong-002', 'https://placehold.co/800x600/f5a623/white?text=Kyoja', 1, '{"alt_text": {"en": "Myeongdong Kyoja noodles", "ja": "明洞餃子のカルグクス", "zh": "明洞饺子刀削面"}}'),
('p-004', 'r-myeongdong-003', 'https://placehold.co/800x600/8b4513/white?text=Hadongkwan', 1, '{"alt_text": {"en": "Hadongkwan beef soup", "ja": "河東館のコムタン", "zh": "河东馆牛骨汤"}}'),
('p-005', 'r-myeongdong-004', 'https://placehold.co/800x600/ffd700/white?text=Dakhanmari', 1, '{"alt_text": {"en": "Dakhanmari chicken pot", "ja": "タッカンマリ", "zh": "一只鸡火锅"}}'),
('p-006', 'r-myeongdong-005', 'https://placehold.co/800x600/8b0000/white?text=WooLaeOak', 1, '{"alt_text": {"en": "Woo Lae Oak bulgogi", "ja": "又来屋のプルコギ", "zh": "又来屋烤肉"}}'),
-- 성수
('p-007', 'r-seongsu-001', 'https://placehold.co/800x600/4a90d9/white?text=Yeonnam', 1, '{"alt_text": {"en": "Seongsu Yeonnam interior", "ja": "聖水ヨンナムの店内", "zh": "圣水延南内部"}}'),
('p-008', 'r-seongsu-002', 'https://placehold.co/800x600/d4a574/white?text=CafeOnion', 1, '{"alt_text": {"en": "Cafe Onion building", "ja": "カフェオニオンの建物", "zh": "Onion咖啡建筑"}}'),
('p-009', 'r-seongsu-003', 'https://placehold.co/800x600/2e8b57/white?text=Tteuran', 1, '{"alt_text": {"en": "Tteuran home cooking", "ja": "トゥランの家庭料理", "zh": "뜨란家常菜"}}'),
('p-010', 'r-seongsu-004', 'https://placehold.co/800x600/696969/white?text=Daelim', 1, '{"alt_text": {"en": "Daelim Changgo warehouse", "ja": "大林倉庫の外観", "zh": "大林仓库外观"}}'),
('p-011', 'r-seongsu-005', 'https://placehold.co/800x600/b22222/white?text=SeongsuGalbi', 1, '{"alt_text": {"en": "Seongsu Galbi grilling", "ja": "聖水カルビの焼肉", "zh": "圣水排骨烤肉"}}'),
-- 강남
('p-012', 'r-gangnam-001', 'https://placehold.co/800x600/1a1a2e/white?text=Jungsik', 1, '{"alt_text": {"en": "Jungsik fine dining", "ja": "ジョンシクのファインダイニング", "zh": "正食精致料理"}}'),
('p-013', 'r-gangnam-002', 'https://placehold.co/800x600/228b22/white?text=Samwon', 1, '{"alt_text": {"en": "Samwon Garden galbi", "ja": "三元ガーデンのカルビ", "zh": "三元花园排骨"}}'),
('p-014', 'r-gangnam-003', 'https://placehold.co/800x600/4b0082/white?text=Mingles', 1, '{"alt_text": {"en": "Mingles course dish", "ja": "ミングルスのコース料理", "zh": "Mingles套餐菜品"}}'),
('p-015', 'r-gangnam-004', 'https://placehold.co/800x600/daa520/white?text=Samgyetang', 1, '{"alt_text": {"en": "Samgyetang ginseng chicken", "ja": "参鶏湯", "zh": "参鸡汤"}}'),
('p-016', 'r-gangnam-005', 'https://placehold.co/800x600/8b0000/white?text=BornBred', 1, '{"alt_text": {"en": "Born & Bred hanwoo", "ja": "ボーン＆ブレッドの韓牛", "zh": "Born&Bred韩牛"}}'),
-- 신사
('p-017', 'r-sinsa-001', 'https://placehold.co/800x600/ff69b4/white?text=Passion5', 1, '{"alt_text": {"en": "Passion 5 pastries", "ja": "パッション5のペストリー", "zh": "Passion5甜点"}}'),
('p-018', 'r-sinsa-002', 'https://placehold.co/800x600/cd853f/white?text=Jokbal', 1, '{"alt_text": {"en": "Garosu-gil Jokbal", "ja": "カロスキルチョッパル", "zh": "林荫路猪蹄"}}'),
('p-019', 'r-sinsa-003', 'https://placehold.co/800x600/87ceeb/white?text=Sujis', 1, '{"alt_text": {"en": "Suji''s brunch", "ja": "スジズのブランチ", "zh": "Suji''s早午餐"}}'),
('p-020', 'r-sinsa-004', 'https://placehold.co/800x600/deb887/white?text=TableStar', 1, '{"alt_text": {"en": "Table Star Italian", "ja": "テーブルスターのイタリアン", "zh": "Table Star意大利菜"}}'),
('p-021', 'r-sinsa-005', 'https://placehold.co/800x600/a0522d/white?text=Sundae', 1, '{"alt_text": {"en": "Sinsa Sundae Town", "ja": "新沙スンデタウン", "zh": "新沙米肠城"}}'),
-- 서울역
('p-022', 'r-seoul-station-001', 'https://placehold.co/800x600/f0e68c/white?text=Kalguksu', 1, '{"alt_text": {"en": "Namdaemun Kalguksu", "ja": "南大門カルグクス", "zh": "南大门刀削面"}}'),
('p-023', 'r-seoul-station-002', 'https://placehold.co/800x600/90ee90/white?text=Honam', 1, '{"alt_text": {"en": "Honam Jip set meal", "ja": "湖南チプの定食", "zh": "湖南家套餐"}}'),
('p-024', 'r-seoul-station-003', 'https://placehold.co/800x600/ff6347/white?text=Gamjatang', 1, '{"alt_text": {"en": "Gamjatang pork bone stew", "ja": "カムジャタン", "zh": "土豆排骨汤"}}'),
('p-025', 'r-seoul-station-004', 'https://placehold.co/800x600/98fb98/white?text=Makguksu', 1, '{"alt_text": {"en": "Bongjunmak makguksu", "ja": "峰峻幕のマッククス", "zh": "峰峻幕荞麦面"}}'),
('p-026', 'r-seoul-station-005', 'https://placehold.co/800x600/ffa500/white?text=Jjimdak', 1, '{"alt_text": {"en": "Yongsan Jjimdak", "ja": "龍山チムタク", "zh": "龙山蒸鸡"}}'),
-- COEX
('p-027', 'r-coex-001', 'https://placehold.co/800x600/191970/white?text=Intercontinental', 1, '{"alt_text": {"en": "Intercontinental buffet", "ja": "インターコンチネンタルビュッフェ", "zh": "洲际酒店自助餐"}}'),
('p-028', 'r-coex-002', 'https://placehold.co/800x600/ff4500/white?text=Bibimbap', 1, '{"alt_text": {"en": "COEX Bibimbap", "ja": "COEXビビンバ", "zh": "COEX拌饭"}}'),
('p-029', 'r-coex-003', 'https://placehold.co/800x600/2f4f4f/white?text=Gaon', 1, '{"alt_text": {"en": "Gaon fine dining course", "ja": "ガオンのコース料理", "zh": "Gaon精致套餐"}}'),
('p-030', 'r-coex-004', 'https://placehold.co/800x600/32cd32/white?text=Hansot', 1, '{"alt_text": {"en": "Hansot Dosirak lunchbox", "ja": "ハンソッ弁当", "zh": "韩食便当"}}'),
('p-031', 'r-coex-005', 'https://placehold.co/800x600/4169e1/white?text=Bongsanok', 1, '{"alt_text": {"en": "Bongsanok naengmyeon", "ja": "鳳山屋の冷麺", "zh": "凤山屋冷面"}}');
