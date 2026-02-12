# 뭉치 (Mungchi) 프로젝트 아키텍처

## 📁 폴더 구조

```
new-mungchi/
├── app/                          # Next.js App Router
│   ├── restaurant/[id]/          # 식당 상세 페이지 (동적 라우트)
│   │   └── page.tsx
│   ├── globals.css               # 글로벌 스타일 (Tailwind + 브랜드 컬러)
│   ├── layout.tsx                # 루트 레이아웃
│   └── page.tsx                  # 메인 페이지 (식당 리스트)
├── components/                   # React 컴포넌트
│   └── ui/                       # shadcn/ui 컴포넌트
│       ├── button.tsx
│       ├── card.tsx
│       └── badge.tsx
├── lib/                          # 유틸리티 및 설정
│   ├── supabase/
│   │   └── client.ts             # Supabase 클라이언트
│   ├── types/
│   │   └── restaurant.ts         # TypeScript 타입 정의
│   └── utils.ts                  # shadcn/ui 유틸 (cn)
├── hooks/                        # Custom React Hooks
├── public/                       # 정적 파일
│   └── images/                   # 이미지 에셋
├── design/                       # 디자인 에셋
│   └── logo/                     # 로고 파일
├── docs/                         # 프로젝트 문서
│   ├── PRD.md                    # 제품 요구사항 정의서
│   ├── ARCHITECTURE.md           # 이 파일
│   ├── SETUP_GUIDE.md            # 환경 설정 가이드
│   └── GEMINI_ONBOARDING.md      # Gemini 개발자 온보딩 가이드
├── .env.example                  # 환경 변수 템플릿
├── components.json               # shadcn/ui 설정
├── tailwind.config.ts            # Tailwind 설정
├── tsconfig.json                 # TypeScript 설정
├── next.config.ts                # Next.js 설정
└── package.json                  # 의존성 관리
```

---

## 🎨 디자인 시스템

### 브랜드 컬러
- **Primary**: `#4D77FF` (뭉치 블루)
- **Logo**: `/design/logo/logo-blue.png`

### Tailwind CSS 변수
```css
--primary: 221 100% 65%;  /* #4D77FF */
```

### 사용 가능한 shadcn/ui 컴포넌트
- `Button` - 기본 버튼 컴포넌트
- `Card` - 식당 카드 등에 사용
- `Badge` - 태그 표시용

---

## 🗄️ 데이터베이스 (Supabase)

### Restaurant 테이블 스키마
```typescript
interface Restaurant {
  id: number;
  name: string;
  image: string;
  address: string;
  category: string;
  businessHours: string;
  hasGroupEventExpr: boolean;
  specialNotes: string;
  tags: string[];
  phoneNumber: string;
  naverMapUrl: string;
  kakaoMapUrl?: string;
  latitude?: number;
  longitude?: number;
}
```

### 관리 방법
- **Supabase Studio**를 통해 직접 관리
- Admin UI 별도 구현 없음 (MVP 단계)

---

## 🚀 주요 기능

### Phase 1: 식당 리스트 페이지
- **경로**: `/` (app/page.tsx)
- **기능**:
  - 식당 리스트 카드 렌더링
  - 태그 필터링
  - 카테고리 필터링
  - 검색 기능 (식당명/주소)
  - 위치 기반 필터링 (1km 반경)

### Phase 2: 식당 상세 페이지
- **경로**: `/restaurant/[id]` (app/restaurant/[id]/page.tsx)
- **기능**:
  - 식당 상세 정보 표시
  - 전화하기 버튼 (`tel:` 스키마)
  - 네이버/카카오 지도 보기 버튼

### Phase 3: 위치 기반 필터링
- **기능**:
  - 내 위치 버튼 (Geolocation API)
  - 주소 입력 (Kakao Geocoding API)
  - 거리 계산 및 정렬

---

## 🔌 외부 API 통합

### Kakao Maps API
- **용도**: Geocoding, 거리 계산
- **환경 변수**: `NEXT_PUBLIC_KAKAO_MAP_KEY`
- **무료 티어**: 일 300,000회

### Google Analytics 4
- **용도**: 사용자 행동 추적 (전화/지도 클릭)
- **환경 변수**: `NEXT_PUBLIC_GA_ID`

---

## 🎯 반응형 전략

### Mobile First
- 기본: 모바일 최적화 (max-width 제한)
- 데스크톱: 단순 확대 (별도 레이아웃 없음)

### Breakpoints (Tailwind 기본)
```
sm: 640px
md: 768px
lg: 1024px
xl: 1280px
2xl: 1400px (container)
```

---

## 📝 코드 컨벤션

### 파일명
- 컴포넌트: `kebab-case.tsx` (예: `restaurant-card.tsx`)
- 페이지: `page.tsx`
- 타입: `kebab-case.ts` (예: `restaurant.ts`)

### TypeScript
- 모든 Props에 타입 정의
- `any` 사용 금지
- Interface 우선 사용

### 스타일링
- Tailwind 유틸리티 클래스만 사용
- 인라인 스타일 금지
- shadcn/ui 컴포넌트 우선 활용

---

## 🚢 배포

### Vercel
- 자동 배포 (Git push 시)
- 환경 변수는 Vercel Dashboard에서 설정
- 도메인: TBD (추후 결정)

---

## 📊 개발 우선순위

### Epic 1: 프로젝트 초기 세팅 ✅
- Next.js + Tailwind + shadcn/ui
- Supabase 클라이언트
- 폴더 구조

### Epic 2: 식당 리스트 페이지 (다음 단계)
- 메인 페이지 UI
- 식당 카드 컴포넌트
- Mock 데이터 렌더링

### Epic 3: 식당 상세 페이지
- 동적 라우트
- 상세 정보 표시
- 액션 버튼 (전화/지도)

### Epic 4: 필터링 기능
- 태그 필터
- 카테고리 필터
- 검색 기능

### Epic 5: 위치 기반 필터링
- 위치 권한 요청
- Kakao Maps API 연동
- 거리 계산 로직

---

## 🔗 참고 문서

- [PRD.md](./PRD.md) - 제품 요구사항 정의서
- [SETUP_GUIDE.md](./SETUP_GUIDE.md) - 환경 설정 가이드
- [GEMINI_ONBOARDING.md](./GEMINI_ONBOARDING.md) - Gemini 개발자 가이드
- [Next.js App Router 문서](https://nextjs.org/docs/app)
- [shadcn/ui 문서](https://ui.shadcn.com)
- [Tailwind CSS 문서](https://tailwindcss.com)
- [Supabase 문서](https://supabase.com/docs)

---

**마지막 업데이트**: 2026-02-11
**현재 단계**: 초기 세팅 완료, Epic 2 준비 중
