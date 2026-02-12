# 뭉치 (Mungchi) 환경 설정 가이드

이 문서는 프로젝트 실행 및 배포에 필요한 환경 변수 설정 방법을 안내합니다.

---

## 🚀 빠른 시작

### 1. 의존성 설치
```bash
npm install
```

### 2. 환경 변수 파일 생성
```.env.local 파일 생성
cp .env.example .env.local
```

### 3. 개발 서버 실행
```bash
npm run dev
```

브라우저에서 `http://localhost:3000` 접속

---

## 🔐 환경 변수 설정

### Supabase 설정

#### 1. Supabase 프로젝트 생성
1. [Supabase](https://supabase.com) 접속 및 로그인
2. "New Project" 클릭
3. 프로젝트 정보 입력
   - Name: `mungchi-mvp`
   - Database Password: (안전한 비밀번호 설정)
   - Region: `Northeast Asia (Seoul)`

#### 2. API 키 확인
1. 프로젝트 Dashboard → Settings → API
2. 다음 값 복사:
   - **Project URL**: `https://xxxxx.supabase.co`
   - **anon public** 키

#### 3. `.env.local`에 추가
```bash
NEXT_PUBLIC_SUPABASE_URL=https://xxxxx.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_anon_key_here
```

#### 4. Restaurant 테이블 생성
Supabase Studio → SQL Editor에서 다음 쿼리 실행:

```sql
CREATE TABLE restaurants (
  id BIGSERIAL PRIMARY KEY,
  name TEXT NOT NULL,
  image TEXT,
  address TEXT NOT NULL,
  category TEXT NOT NULL,
  business_hours TEXT,
  has_group_event_expr BOOLEAN DEFAULT false,
  special_notes TEXT,
  tags TEXT[],
  phone_number TEXT NOT NULL,
  naver_map_url TEXT,
  kakao_map_url TEXT,
  latitude DOUBLE PRECISION,
  longitude DOUBLE PRECISION,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- 검색 성능을 위한 인덱스
CREATE INDEX idx_restaurants_category ON restaurants(category);
CREATE INDEX idx_restaurants_tags ON restaurants USING GIN(tags);
CREATE INDEX idx_restaurants_location ON restaurants(latitude, longitude);
```

---

### Kakao Maps API 설정

#### 1. Kakao Developers 계정 생성
1. [Kakao Developers](https://developers.kakao.com) 접속
2. 로그인 또는 회원가입

#### 2. 애플리케이션 등록
1. 내 애플리케이션 → 애플리케이션 추가하기
2. 앱 정보 입력
   - 앱 이름: `뭉치`
   - 사업자명: (개인 또는 사업자)

#### 3. 플랫폼 추가
1. 앱 선택 → 플랫폼 → Web 플랫폼 등록
2. 사이트 도메인 입력:
   - 개발: `http://localhost:3000`
   - 배포: `https://yourdomain.com` (추후 추가)

#### 4. JavaScript 키 발급
1. 앱 설정 → 요약 정보
2. **JavaScript 키** 복사

#### 5. `.env.local`에 추가
```bash
NEXT_PUBLIC_KAKAO_MAP_KEY=your_javascript_key_here
```

#### 6. 사용 가능한 API (MVP에서 사용)
- **Geocoding API**: 주소 → 좌표 변환
- **Local API**: 주변 장소 검색
- **Coord2Address**: 좌표 → 주소 변환

**무료 티어**: 일 300,000회

---

### Google Analytics 4 설정

#### 1. Google Analytics 계정 생성
1. [Google Analytics](https://analytics.google.com) 접속
2. "시작하기" 또는 기존 계정 선택

#### 2. 속성 만들기
1. 관리 → 속성 만들기
2. 속성 정보 입력:
   - 속성 이름: `뭉치 MVP`
   - 시간대: `대한민국`
   - 통화: `대한민국 원(₩)`

#### 3. 데이터 스트림 만들기
1. 웹 스트림 추가
2. 웹사이트 URL 입력:
   - 개발: `http://localhost:3000`
   - 배포: `https://yourdomain.com`
3. 스트림 이름: `뭉치 웹`

#### 4. 측정 ID 확인
- **측정 ID** 복사 (형식: `G-XXXXXXXXXX`)

#### 5. `.env.local`에 추가
```bash
NEXT_PUBLIC_GA_ID=G-XXXXXXXXXX
```

#### 6. 추적할 이벤트 (MVP)
- `restaurant_view`: 식당 상세 페이지 조회
- `phone_click`: 전화하기 버튼 클릭
- `map_click`: 지도 보기 버튼 클릭
- `filter_use`: 필터 사용 (태그, 카테고리, 위치)

---

## 📋 최종 `.env.local` 파일 예시

```bash
# Supabase
NEXT_PUBLIC_SUPABASE_URL=https://xxxxx.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...

# Kakao Maps API
NEXT_PUBLIC_KAKAO_MAP_KEY=a1b2c3d4e5f6g7h8i9j0

# Google Analytics 4
NEXT_PUBLIC_GA_ID=G-XXXXXXXXXX
```

---

## 🧪 환경 변수 테스트

### Supabase 연결 테스트
`lib/supabase/client.ts`에서 클라이언트가 정상적으로 생성되는지 확인:
```typescript
import { supabase } from '@/lib/supabase/client'

const { data, error } = await supabase
  .from('restaurants')
  .select('*')
  .limit(1)

console.log(data) // 데이터 확인
```

### Kakao Maps API 테스트
브라우저 콘솔에서:
```javascript
fetch(`https://dapi.kakao.com/v2/local/search/address.json?query=고려대학교`, {
  headers: {
    Authorization: `KakaoAK ${process.env.NEXT_PUBLIC_KAKAO_MAP_KEY}`
  }
})
```

### Google Analytics 테스트
1. 개발 서버 실행
2. 페이지 이동 및 버튼 클릭
3. GA4 실시간 보고서에서 이벤트 확인 (약 30초 지연)

---

## 🚢 Vercel 배포 시 환경 변수 설정

### 1. Vercel 프로젝트 연결
```bash
npm i -g vercel
vercel login
vercel link
```

### 2. 환경 변수 추가
Vercel Dashboard → 프로젝트 → Settings → Environment Variables

**Production 환경에 추가:**
- `NEXT_PUBLIC_SUPABASE_URL`
- `NEXT_PUBLIC_SUPABASE_ANON_KEY`
- `NEXT_PUBLIC_KAKAO_MAP_KEY`
- `NEXT_PUBLIC_GA_ID`

### 3. 재배포
```bash
vercel --prod
```

---

## ⚠️ 주의사항

### 보안
- ❌ `.env.local` 파일을 Git에 커밋하지 마세요
- ✅ `.env.example`만 커밋하세요
- ✅ `NEXT_PUBLIC_*` 접두사는 클라이언트에 노출됩니다

### API 키 관리
- Supabase: RLS (Row Level Security) 설정 권장
- Kakao Maps: 도메인 제한 설정 필수
- Google Analytics: 데이터 보유 기간 설정

### 무료 티어 제한
- Supabase: 500MB DB, 월 50,000 요청
- Kakao Maps: 일 300,000회
- Google Analytics: 무제한 (표준 속성)

---

## 🆘 문제 해결

### "Supabase client not initialized"
→ `.env.local`에서 환경 변수 확인
→ 개발 서버 재시작 (`npm run dev`)

### "Kakao Maps API quota exceeded"
→ 일일 한도 초과, 다음 날 자동 리셋
→ 또는 Naver Maps API로 전환 고려

### "GA4 events not showing"
→ 측정 ID 확인
→ 30초~1분 지연 정상
→ 실시간 보고서에서 확인

---

**도움이 필요하면 [Issues](https://github.com/eeyggo/new-mungchi/issues)에 문의하세요.**
