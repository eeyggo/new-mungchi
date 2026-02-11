# 뭉치 (Mungchi) 🍚

대학 상권 내 단체 식사 주문 가능한 식당 큐레이션 모바일 웹 서비스

---

## 📋 프로젝트 개요

**뭉치**는 고려대학교 인근에서 5인 이상 단체 식사를 계획하는 학생회, 동아리, 행정실, 회사 등을 위한 식당 큐레이션 플랫폼입니다.

**핵심 가치**:
- 검증된 단체 주문 가능 식당만 엄선
- 빠른 탐색 (태그, 카테고리, 위치 기반 필터)
- 원클릭 전화/지도 연결로 즉시 예약

---

## 🚀 빠른 시작

### 요구사항
- Node.js 18+
- npm 또는 yarn

### 설치 및 실행
```bash
# 의존성 설치
npm install

# 환경 변수 설정
cp .env.example .env.local
# .env.local 파일을 열어 API 키 입력 (SETUP_GUIDE.md 참고)

# 개발 서버 실행
npm run dev
```

브라우저에서 [http://localhost:3000](http://localhost:3000) 접속

---

## 🛠️ 기술 스택

- **Framework**: Next.js 15+ (App Router)
- **Language**: TypeScript
- **Styling**: Tailwind CSS
- **UI Components**: shadcn/ui
- **Database**: Supabase (PostgreSQL)
- **Maps**: Kakao Maps API
- **Analytics**: Google Analytics 4
- **Deployment**: Vercel

---

## 📁 주요 문서

### 프로젝트 문서
- [PRD.md](docs/PRD.md) - 제품 요구사항 정의서
- [ARCHITECTURE.md](docs/ARCHITECTURE.md) - 프로젝트 아키텍처
- [SETUP_GUIDE.md](docs/SETUP_GUIDE.md) - 환경 설정 가이드 (Supabase, Kakao Maps, GA4)

### 팀 온보딩
- [CLAUDE_PM_GUIDE.md](CLAUDE_PM_GUIDE.md) - Claude PM 가이드 (PM 역할 수행)
- [GEMINI_ONBOARDING.md](docs/GEMINI_ONBOARDING.md) - Gemini 개발자 온보딩

### Epic & Task
- [EPIC_02_TASK_BREAKDOWN.md](docs/EPIC_02_TASK_BREAKDOWN.md) - Epic 2 Task 분해
- [DEV_SPEC_001_RESTAURANT_LIST.md](docs/DEV_SPEC_001_RESTAURANT_LIST.md) - 첫 번째 개발 명세서

---

## 🎨 디자인 시스템

### 브랜드 컬러
- Primary: `#4D77FF` (뭉치 블루)

### 로고
- [design/logo/logo-blue.png](design/logo/logo-blue.png)

---

## 📦 주요 기능 (MVP)

### ✅ Phase 1: 초기 세팅
- [x] Next.js + TypeScript + Tailwind CSS
- [x] shadcn/ui 컴포넌트 시스템
- [x] Supabase 클라이언트 설정
- [x] 브랜드 컬러 시스템 적용

### 🚧 Phase 2: 식당 리스트
- [ ] 식당 카드 리스트 렌더링
- [ ] 태그 필터
- [ ] 카테고리 필터
- [ ] 검색 기능

### 🚧 Phase 3: 식당 상세
- [ ] 상세 페이지 UI
- [ ] 전화하기 버튼
- [ ] 지도 보기 버튼

### 🚧 Phase 4: 위치 기반 필터
- [ ] 내 위치 감지
- [ ] 주소 입력
- [ ] 거리 계산 및 정렬

---

## 🧑‍💻 개발 워크플로우

### PM (Claude Code)
- 아키텍처 설계
- Task 분해 및 명세서 작성
- 코드 리뷰 및 통합

### 개발자 (Gemini)
- 명세서 기반 코드 구현
- UI/UX 개발
- API 통합

자세한 내용은 [GEMINI_ONBOARDING.md](GEMINI_ONBOARDING.md) 참고

---

## 📜 스크립트

```bash
npm run dev      # 개발 서버 실행
npm run build    # 프로덕션 빌드
npm run start    # 프로덕션 서버 실행
npm run lint     # ESLint 실행
```

---

## 🌐 배포

### Vercel (권장)
```bash
npm i -g vercel
vercel login
vercel
```

자세한 내용은 [SETUP_GUIDE.md](SETUP_GUIDE.md) 참고

---

## 📄 라이선스

ISC

---

## 🙏 기여

이 프로젝트는 MVP 단계입니다. 피드백은 [Issues](https://github.com/eeyggo/new-mungchi/issues)에 남겨주세요.

---

**Made with ❤️ for 고려대학교 단체 식사 문화**
