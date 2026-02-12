-- mock 데이터 시드
INSERT INTO restaurants (id, name, image_url, address, category, hours, has_group_order_experience, description, comment, tags, phone, naver_place_url, lat, lng) VALUES
(1, '형제집', 'https://via.placeholder.com/400x300?text=Brother+House', '서울 성북구 안암로 145', '한식', '10:00 - 22:00', true, '#가성비 #단체석 #뒷풀이', '고기 양이 많고 사장님이 서비스 잘 주심. 학생회 회식 장소로 추천.', ARRAY['#가성비', '#단체석', '#뒷풀이'], '02-123-4567', 'https://map.naver.com/p/search/형제집', 37.5855, 127.0283),
(2, '청년다방 고려대점', 'https://via.placeholder.com/400x300?text=Young+Dabang', '서울 성북구 안암로 150 2층', '기타', '11:00 - 22:00', true, '#간식행사 #떡볶이 #단체주문', '단체 간식 주문 가능. 떡볶이와 감자튀김 세트 인기.', ARRAY['#간식행사', '#떡볶이', '#단체주문'], '02-234-5678', 'https://map.naver.com/p/search/청년다방고려대점', 37.5860, 127.0290),
(3, '고대맛집', 'https://via.placeholder.com/400x300?text=KU+Tasty', '서울 성북구 고려대로 100', '한식', '10:30 - 21:00', false, '#점심 #혼밥 #가성비', '제육볶음이 맛있음. 점심 식사로 적합.', ARRAY['#점심', '#혼밥', '#가성비'], '02-345-6789', 'https://map.naver.com/p/search/고대맛집', 37.5840, 127.0270),
(4, '비나 레스토랑', 'https://via.placeholder.com/400x300?text=Bina+Restaurant', '서울 성북구 안암로 130', '양식', '11:00 - 22:00', true, '#이색맛집 #커리 #룸완비', '인도 커리 전문점. 색다른 회식 장소로 추천. 룸 있음.', ARRAY['#이색맛집', '#커리', '#룸완비'], '02-456-7890', 'https://map.naver.com/p/search/비나레스토랑', 37.5850, 127.0280),
(5, '삼성통닭', 'https://via.placeholder.com/400x300?text=Samsung+Chicken', '서울 성북구 참살이길 50', '기타', '14:00 - 02:00', true, '#치맥 #뒷풀이 #전통', '고대생들의 영원한 뒷풀이 장소. 마늘통닭 추천.', ARRAY['#치맥', '#뒷풀이', '#전통'], '02-567-8901', 'https://map.naver.com/p/search/삼성통닭', 37.5830, 127.0295),
(6, '한솥도시락 고대점', 'https://via.placeholder.com/400x300?text=Hansot', '서울 성북구 고려대로 80', '기타', '07:00 - 21:00', true, '#단체도시락 #행사 #배달', '행사 도시락 대량 주문 가능. 배달 빠름.', ARRAY['#단체도시락', '#행사', '#배달'], '02-678-9012', 'https://map.naver.com/p/search/한솥도시락고대점', 37.5820, 127.0260),
(7, '미스터피자 고려대점', 'https://via.placeholder.com/400x300?text=Mr+Pizza', '서울 성북구 안암로 160', '양식', '11:00 - 22:30', true, '#피자 #뷔페 #런치세트', '샐러드바 이용 가능. 런치 할인 있음.', ARRAY['#피자', '#뷔페', '#런치세트'], '02-789-0123', 'https://map.naver.com/p/search/미스터피자고려대점', 37.5870, 127.0292),
(8, '용초수', 'https://via.placeholder.com/400x300?text=Yongchosu', '서울 성북구 고려대로24길 30', '기타', '11:00 - 21:00', false, '#꿔바로우 #중식맛집 #데이트', '꿔바로우가 유명함. 웨이팅 있을 수 있음.', ARRAY['#꿔바로우', '#중식맛집', '#데이트'], '02-890-1234', 'https://map.naver.com/p/search/용초수', 37.5845, 127.0288),
(9, '스타벅스 안암역점', 'https://via.placeholder.com/400x300?text=Starbucks', '서울 성북구 고려대로 102', '카페', '07:00 - 22:00', true, '#단체커피 #회의 #노트북', '대량 커피 주문 가능(투고백).', ARRAY['#단체커피', '#회의', '#노트북'], '1522-3232', 'https://map.naver.com/p/search/스타벅스안암역점', 37.5865, 127.0298),
(10, '유자유김치떡볶이', 'https://via.placeholder.com/400x300?text=YuJaYu', '서울 성북구 고려대로24길 48', '기타', '11:00 - 02:00', true, '#야식 #술안주 #배달', '김치떡볶이와 소주의 조화. 야식 추천.', ARRAY['#야식', '#술안주', '#배달'], '02-901-2345', 'https://map.naver.com/p/search/유자유', 37.5835, 127.0293);

-- 시퀀스를 마지막 ID 이후로 설정
SELECT setval('restaurants_id_seq', 10);
