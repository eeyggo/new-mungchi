# Epic 2: 식당 리스트 페이지 구현

## 📋 Epic 개요

**목표**: 사용자가 메인 페이지에서 단체 식사 가능한 식당 목록을 카드 형태로 확인할 수 있는 기본 UI 구현

**우선순위**: P0 (MVP 필수)

**예상 소요 시간**: 2-3일

---

## 🎯 Epic 완료 기준 (Definition of Done)

- [ ] 메인 페이지에 식당 리스트가 카드 형태로 렌더링됨
- [ ] Mock 데이터 10-20개가 정상적으로 표시됨
- [ ] Mobile First 반응형 디자인 적용 (320px ~ 768px)
- [ ] 각 카드 클릭 시 식당 상세 페이지로 이동 (준비만, 상세 페이지는 Epic 3)
- [ ] 브랜드 컬러 시스템 적용
- [ ] TypeScript 타입 에러 없음
- [ ] 빌드 성공 (`npm run build`)

---

## 📦 Task 목록 및 우선순위

### Task #001: Mock 데이터 생성 ⭐⭐⭐
**우선순위**: P0 (가장 먼저)
**소요 시간**: 30분
**담당**: Gemini

**작업 내용**:
- `lib/data/mock-restaurants.ts` 파일 생성
- PRD 기반 Restaurant 타입에 맞는 Mock 데이터 10-20개 작성
- 고려대 인근 실제 식당명 사용 (또는 가상)
- 다양한 카테고리/태그 포함

**의존성**: 없음

---

### Task #002: 식당 카드 컴포넌트 구현 ⭐⭐⭐
**우선순위**: P0
**소요 시간**: 1-2시간
**담당**: Gemini

**작업 내용**:
- `components/restaurant-card.tsx` 파일 생성
- shadcn/ui Card 컴포넌트 활용
- 다음 정보 표시:
  - 썸네일 이미지 (fallback 이미지 처리)
  - 식당 이름
  - 카테고리 (뱃지)
  - 태그 (#가성비, #룸완비 등)
  - 주소 (1줄 말줄임)
- hover 효과 적용
- Mobile First 반응형

**의존성**: Task #001 (Mock 데이터)

---

### Task #003: 메인 페이지 레이아웃 구현 ⭐⭐⭐
**우선순위**: P0
**소요 시간**: 1-2시간
**담당**: Gemini

**작업 내용**:
- `app/page.tsx` 수정
- 상단 헤더 영역:
  - 로고 (`/design/logo/logo-blue.png`)
  - 서비스 설명 (1줄)
- 식당 리스트 그리드:
  - 모바일: 1열
  - 태블릿: 2열 (md 이상)
- 최대 너비 제한 (`max-w-4xl`)

**의존성**: Task #002 (식당 카드)

---

### Task #004: 식당 상세 페이지 라우팅 연결 (준비) ⭐⭐
**우선순위**: P1
**소요 시간**: 30분
**담당**: Gemini

**작업 내용**:
- 카드 클릭 시 `/restaurant/[id]` 페이지로 이동
- `app/restaurant/[id]/page.tsx` 생성 (간단한 "준비 중" 메시지)
- Next.js Link 컴포넌트 사용

**의존성**: Task #003 (메인 페이지)

---

### Task #005: 로딩 및 에러 상태 처리 ⭐
**우선순위**: P2 (선택)
**소요 시간**: 30분
**담당**: Gemini

**작업 내용**:
- 데이터 없을 때 Empty State 표시
- 로딩 스켈레톤 UI (선택사항)

**의존성**: Task #003

---

## 🗂️ 생성될 파일 목록

```
new-mungchi/
├── app/
│   ├── page.tsx                       # ✏️ 수정
│   └── restaurant/[id]/
│       └── page.tsx                   # 🆕 생성
├── components/
│   └── restaurant-card.tsx            # 🆕 생성
└── lib/
    └── data/
        └── mock-restaurants.ts        # 🆕 생성
```

---

## 🎨 디자인 가이드

### 식당 카드 레이아웃
```
┌─────────────────────────┐
│   [썸네일 이미지]        │ <- aspect-ratio: 16/9
├─────────────────────────┤
│ 식당 이름 (bold)        │
│ [카테고리 뱃지]         │
│ #태그1 #태그2 #태그3   │
│ 주소... (1줄 말줄임)    │
└─────────────────────────┘
```

### 색상 적용
- 카드 배경: `bg-card`
- 카드 테두리: `border border-border`
- hover: `hover:shadow-lg transition-shadow`
- 카테고리 뱃지: `bg-primary text-primary-foreground`
- 태그: `text-muted-foreground text-sm`

---

## 🔗 참고 자료

- [PRD.md](./PRD.md) - 데이터 스키마 및 UI 요구사항
- [shadcn/ui Card](https://ui.shadcn.com/docs/components/card)
- [Next.js Image](https://nextjs.org/docs/app/api-reference/components/image)
- [Tailwind Grid](https://tailwindcss.com/docs/grid-template-columns)

---

## 📝 개발 순서 (권장)

1. **Task #001** 먼저 완료 → Mock 데이터 준비
2. **Task #002** 카드 컴포넌트 구현 → 스토리북처럼 독립적으로 테스트
3. **Task #003** 메인 페이지에서 카드 렌더링
4. **Task #004** 라우팅 연결
5. **Task #005** 선택사항

---

**다음 Epic**: Epic 3 - 식당 상세 페이지 (전화/지도 버튼)
