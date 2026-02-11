# Task #001-003: 식당 리스트 페이지 기본 구현

> **Gemini 개발자님께**: 이 명세서는 Epic 2의 첫 번째 개발 작업입니다. GEMINI_ONBOARDING.md의 작업 프로토콜을 따라주세요.

---

## 📍 작업 범위

### 생성할 파일
- `lib/data/mock-restaurants.ts` (Mock 데이터)
- `components/restaurant-card.tsx` (식당 카드 컴포넌트)
- `app/page.tsx` (메인 페이지 - **수정**)

### 수정할 파일
- `app/page.tsx` (기존 테스트 코드 → 실제 리스트 페이지로 교체)

---

## 🎯 요구사항

### Task #001: Mock 데이터 생성

**파일**: `lib/data/mock-restaurants.ts`

**요구사항**:
1. `Restaurant` 타입을 import하여 타입 안정성 보장
2. 10-20개의 Mock 데이터 생성
3. 고려대 인근 실제 또는 가상 식당명 사용
4. 다양한 카테고리 포함: 한식, 중식, 일식, 양식, 도시락 등
5. 다양한 태그 포함: #가성비, #룸완비, #주차가능, #단체석, #뒷풀이 등
6. `hasGroupEventExpr`를 true/false 섞어서 작성
7. 이미지 URL은 placeholder 사용 (예: `https://via.placeholder.com/400x300?text=식당명`)

**주의사항**:
- `latitude`, `longitude`는 선택사항 (Epic 5에서 사용 예정)
- `kakaoMapUrl`는 선택사항 (일단 `naverMapUrl`만 필수)

---

### Task #002: 식당 카드 컴포넌트 구현

**파일**: `components/restaurant-card.tsx`

**요구사항**:
1. shadcn/ui의 `Card` 컴포넌트 활용
2. Props로 `Restaurant` 타입 받기
3. 다음 정보 표시:
   - **이미지**: aspect-ratio 16/9 고정, fallback 처리
   - **식당 이름**: 굵은 글씨 (font-semibold)
   - **카테고리**: Badge 컴포넌트로 표시 (Primary 색상)
   - **태그**: 최대 3개까지 표시, 작은 글씨 (text-sm, text-muted-foreground)
   - **주소**: 1줄 말줄임 (truncate)
4. hover 효과: `hover:shadow-lg transition-shadow`
5. 전체 카드가 클릭 가능하도록 Link 적용 (`/restaurant/{id}`)

**디자인 가이드**:
```tsx
// 권장 구조
<Link href={`/restaurant/${restaurant.id}`}>
  <Card className="hover:shadow-lg transition-shadow cursor-pointer">
    <div className="aspect-[16/9] relative overflow-hidden">
      <img src={restaurant.image} alt={restaurant.name} className="object-cover w-full h-full" />
    </div>
    <CardHeader>
      <CardTitle>{restaurant.name}</CardTitle>
      <Badge variant="default">{restaurant.category}</Badge>
    </CardHeader>
    <CardContent>
      <div className="flex gap-2 mb-2">
        {restaurant.tags.slice(0, 3).map(tag => (
          <span key={tag} className="text-sm text-muted-foreground">{tag}</span>
        ))}
      </div>
      <p className="text-sm text-muted-foreground truncate">{restaurant.address}</p>
    </CardContent>
  </Card>
</Link>
```

---

### Task #003: 메인 페이지 레이아웃 구현

**파일**: `app/page.tsx`

**요구사항**:
1. 기존 테스트 코드 삭제
2. 상단 헤더 영역:
   - 로고 이미지 표시 (`/design/logo/logo-blue.png`, 크기: h-16 또는 w-32)
   - 서비스 제목: "뭉치 🍚"
   - 서비스 설명: "고려대 인근 단체 식사 주문 가능한 식당을 한 곳에서"
3. 식당 리스트 그리드:
   - 모바일 (기본): 1열
   - 태블릿 (md 이상): 2열
   - `gap-6` 적용
4. 최대 너비 제한: `max-w-4xl mx-auto`
5. 패딩: `p-4 md:p-8`

**레이아웃 구조**:
```tsx
<main className="min-h-screen p-4 md:p-8">
  <div className="max-w-4xl mx-auto">
    {/* 헤더 */}
    <header className="mb-8 text-center">
      <img src="/design/logo/logo-blue.png" alt="뭉치" className="h-16 mx-auto mb-4" />
      <h1 className="text-3xl font-bold text-primary mb-2">뭉치 🍚</h1>
      <p className="text-muted-foreground">
        고려대 인근 단체 식사 주문 가능한 식당을 한 곳에서
      </p>
    </header>

    {/* 리스트 그리드 */}
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
      {mockRestaurants.map(restaurant => (
        <RestaurantCard key={restaurant.id} restaurant={restaurant} />
      ))}
    </div>
  </div>
</main>
```

---

## 🏗️ 데이터 스키마

```typescript
// lib/types/restaurant.ts (이미 생성됨)
export interface Restaurant {
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

---

## 💻 코드 예시

### Mock 데이터 예시 (lib/data/mock-restaurants.ts)

```typescript
import { Restaurant } from "@/lib/types/restaurant";

export const mockRestaurants: Restaurant[] = [
  {
    id: 1,
    name: "형제집",
    image: "https://via.placeholder.com/400x300?text=형제집",
    address: "서울 성북구 안암로 145",
    category: "한식",
    businessHours: "10:00 - 22:00",
    hasGroupEventExpr: true,
    specialNotes: "고기 양이 많고 사장님이 서비스 잘 주심. 학생회 회식 장소로 추천.",
    tags: ["#가성비", "#단체석", "#뒷풀이"],
    phoneNumber: "02-123-4567",
    naverMapUrl: "https://map.naver.com/p/search/형제집",
  },
  {
    id: 2,
    name: "청년다방",
    image: "https://via.placeholder.com/400x300?text=청년다방",
    address: "서울 성북구 안암로 150",
    category: "카페",
    businessHours: "09:00 - 23:00",
    hasGroupEventExpr: true,
    specialNotes: "단체 간식 주문 가능. 케이크 주문도 가능.",
    tags: ["#간식행사", "#케이크", "#단체할인"],
    phoneNumber: "02-234-5678",
    naverMapUrl: "https://map.naver.com/p/search/청년다방",
  },
  // ... 최소 10개 이상 작성
];
```

---

## 🎨 디자인 시스템 준수

### 사용할 컴포넌트
- `Card`, `CardHeader`, `CardTitle`, `CardContent` (이미 설치됨)
- `Badge` (이미 설치됨)
- Next.js `Link` (built-in)

### 색상 클래스
- Primary: `text-primary`, `bg-primary`
- Muted: `text-muted-foreground`
- Border: `border-border`

### 간격 (Tailwind)
- `gap-6`: 카드 사이 간격
- `mb-4`, `mb-8`: 섹션 간 여백
- `p-4`, `p-6`: 패딩

---

## ✅ Definition of Done

- [ ] `lib/data/mock-restaurants.ts` 파일 생성, 10개 이상 데이터 포함
- [ ] `components/restaurant-card.tsx` 파일 생성, shadcn Card 사용
- [ ] `app/page.tsx` 수정, 식당 리스트 렌더링
- [ ] 모바일(320px) ~ 태블릿(768px) 반응형 확인
- [ ] 카드 hover 효과 작동
- [ ] 카드 클릭 시 `/restaurant/[id]` 페이지로 이동 (404 정상, 다음 Task에서 구현)
- [ ] TypeScript 컴파일 에러 없음
- [ ] `npm run build` 성공
- [ ] `npm run dev` 실행 시 정상 렌더링

---

## ⚠️ 주의사항

### 이미지 처리
- Next.js `<Image>` 컴포넌트 사용 시 `next.config.ts`에 이미 remote patterns 설정됨
- 하지만 placeholder URL이므로 일반 `<img>` 태그 사용해도 무방
- 추후 실제 이미지로 교체 예정

### 라우팅
- `/restaurant/[id]` 페이지는 이 Task에서 생성하지 **않습니다**
- 카드 클릭 시 404 발생하는 것이 정상입니다 (다음 Task에서 구현)

### Mock 데이터 작성 팁
- `id`는 1부터 순차적으로
- `phoneNumber`는 "02-XXX-XXXX" 형식
- `tags`는 앞에 # 붙여서 작성
- `specialNotes`는 구체적이고 생생하게 작성 (예: "지난번 행정실 행사 때 반응 좋았음")

---

## 🚀 개발 시작 전 체크리스트

- [ ] `docs/GEMINI_ONBOARDING.md` 숙지 완료
- [ ] 명세서 내용 이해 완료
- [ ] 질문 사항 없음 (있으면 지금 질문)
- [ ] 개발 환경 세팅 완료 (`npm run dev` 실행 확인)

---

## 📞 질문이 있다면?

명세서가 불명확하거나 더 나은 방법이 있다면 **개발 시작 전에** 알려주세요!

예시:
- "Mock 데이터에 실제 고려대 식당 이름을 사용해야 하나요?"
- "카드 레이아웃을 조금 다르게 하면 더 나을 것 같은데, 제안해도 될까요?"
- "Image 최적화를 위해 Next.js Image 컴포넌트를 쓰는 게 좋을까요?"

---

**PM Note**: 이 작업 완료 후 Task #004 (상세 페이지 라우팅)을 진행합니다.
