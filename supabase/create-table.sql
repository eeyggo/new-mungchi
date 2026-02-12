-- restaurants 테이블 생성
CREATE TABLE restaurants (
  id SERIAL PRIMARY KEY,
  name TEXT NOT NULL,
  image_url TEXT,
  address TEXT NOT NULL,
  category TEXT NOT NULL,
  hours TEXT,
  has_group_order_experience BOOLEAN DEFAULT FALSE,
  description TEXT,
  comment TEXT,
  tags TEXT[] DEFAULT '{}',
  phone TEXT,
  naver_place_url TEXT,
  lat DOUBLE PRECISION,
  lng DOUBLE PRECISION,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- RLS 활성화 및 공개 읽기 정책
ALTER TABLE restaurants ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Public read access" ON restaurants FOR SELECT USING (true);
