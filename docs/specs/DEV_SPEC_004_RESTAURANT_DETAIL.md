# Task #004: 식당 상세 페이지 구현

> **Gemini 개발자님께**: 이 명세서는 Epic 3의 식당 상세 페이지 작업입니다. 사용자가 식당 카드를 클릭하면 상세 정보를 보여주고, 전화하기/지도 보기 액션을 제공합니다. GEMINI_ONBOARDING.md의 작업 프로토콜을 따라주세요.

---

## 📍 작업 범위

### 생성할 파일
- `app/restaurant/[id]/page.tsx` - 동적 라우팅 상세 페이지 (Server Component)
- `components/restaurant-detail-header.tsx` - 상세 페이지 헤더 (뒤로가기 버튼)
- `components/restaurant-detail-info.tsx` - 식당 정보 섹션
- `components/restaurant-action-buttons.tsx` - 전화하기/지도 보기 버튼
- `app/restaurant/[id]/not-found.tsx` (선택) - 404 페이지

### 수정할 파일
- `app/page.tsx` - `handleSelectRestaurant` 함수에 라우팅 추가
- `components/restaurant-card.tsx` - 클릭 시 라우팅 동작 확인

---

## 🎯 요구사항

### 1. 동적 라우팅 설정 (app/restaurant/[id]/page.tsx)

**기능**:
- URL: `/restaurant/[id]` (예: `/restaurant/1`)
- Mock 데이터에서 ID로 식당 찾기
- 존재하지 않는 ID: 404 또는 "식당을 찾을 수 없습니다" 메시지

**데이터 가져오기**:
```tsx
import { mockRestaurants } from "@/lib/data/mock-restaurants";
import { notFound } from "next/navigation";

export default function RestaurantDetailPage({
  params,
}: {
  params: { id: string };
}) {
  const restaurant = mockRestaurants.find((r) => r.id === params.id);

  if (!restaurant) {
    notFound(); // 또는 커스텀 에러 UI
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <RestaurantDetailHeader />
      <RestaurantDetailInfo restaurant={restaurant} />
      <RestaurantActionButtons restaurant={restaurant} />
    </div>
  );
}
```

---

### 2. 상세 페이지 헤더 (components/restaurant-detail-header.tsx)

**기능**:
- 뒤로가기 버튼 (왼쪽 상단)
- 로고/타이틀 없음 (간결하게)
- Sticky 헤더

**디자인**:
```tsx
'use client';

import { ArrowLeft } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { Button } from '@/components/ui/button';

export function RestaurantDetailHeader() {
  const router = useRouter();

  return (
    <header className="bg-white/80 backdrop-blur-md border-b sticky top-0 z-50 w-full">
      <div className="max-w-7xl mx-auto px-4 md:px-6 lg:px-8 h-14 flex items-center">
        <Button
          variant="ghost"
          size="icon"
          onClick={() => router.back()}
          className="text-gray-600 hover:text-primary hover:bg-primary/5"
        >
          <ArrowLeft className="h-5 w-5" />
        </Button>
        <h1 className="ml-3 font-bold text-lg text-gray-900">식당 상세</h1>
      </div>
    </header>
  );
}
```

---

### 3. 식당 정보 섹션 (components/restaurant-detail-info.tsx)

**표시 정보** (PRD 기준):
1. **대표 이미지** (상단, 큰 사이즈)
2. **식당 이름** (h1, 큰 폰트)
3. **카테고리** (Badge)
4. **주소** (MapPin 아이콘)
5. **영업시간** (Clock 아이콘)
6. **전화번호** (Phone 아이콘, 클릭 방지 - 버튼에서만)
7. **단체 주문 경험** (CheckCircle2 뱃지)
8. **태그** (Chip 형태)
9. **추천사/특이사항** (comment 필드, 회색 박스)

**레이아웃**:
```
┌─────────────────────────────────┐
│ [대표 이미지 - 16:9 비율]        │
├─────────────────────────────────┤
│ 형제집               [한식]      │
│                                 │
│ 📍 서울 성북구 안암로 145        │
│ 🕐 10:00 - 22:00               │
│ 📞 02-123-4567                 │
│                                 │
│ ✅ 단체/간식 경험 있음           │
│                                 │
│ #가성비 #단체석 #뒷풀이          │
│                                 │
│ ┌─────────────────────────┐    │
│ │ 💡 추천사                │    │
│ │ 고기 양이 많고...        │    │
│ └─────────────────────────┘    │
└─────────────────────────────────┘
```

**컴포넌트 코드**:
```tsx
import Image from 'next/image';
import { MapPin, Clock, Phone, CheckCircle2 } from 'lucide-react';
import { Restaurant } from '@/lib/types/restaurant';
import { Badge } from '@/components/ui/badge';

interface RestaurantDetailInfoProps {
  restaurant: Restaurant;
}

export function RestaurantDetailInfo({ restaurant }: RestaurantDetailInfoProps) {
  return (
    <div className="max-w-3xl mx-auto bg-white">
      {/* 대표 이미지 */}
      <div className="relative w-full aspect-[16/9] bg-gray-100">
        <Image
          src={restaurant.imageUrl}
          alt={restaurant.name}
          fill
          className="object-cover"
          sizes="(max-width: 768px) 100vw, 768px"
          priority
        />
      </div>

      {/* 정보 섹션 */}
      <div className="p-6 space-y-6">
        {/* 이름 + 카테고리 */}
        <div className="flex items-start justify-between gap-4">
          <h1 className="text-3xl font-bold text-gray-900">{restaurant.name}</h1>
          <Badge variant="secondary" className="shrink-0 text-sm">
            {restaurant.category}
          </Badge>
        </div>

        {/* 기본 정보 */}
        <div className="space-y-3">
          <div className="flex items-start gap-3 text-gray-700">
            <MapPin className="size-5 shrink-0 mt-0.5 text-gray-500" />
            <span className="text-base">{restaurant.address}</span>
          </div>
          <div className="flex items-center gap-3 text-gray-700">
            <Clock className="size-5 shrink-0 text-gray-500" />
            <span className="text-base">{restaurant.hours}</span>
          </div>
          <div className="flex items-center gap-3 text-gray-700">
            <Phone className="size-5 shrink-0 text-gray-500" />
            <span className="text-base">{restaurant.phone}</span>
          </div>
        </div>

        {/* 단체 주문 경험 뱃지 */}
        {restaurant.hasGroupOrderExperience && (
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-green-50 text-green-700 rounded-lg border border-green-100">
            <CheckCircle2 className="size-5" />
            <span className="font-medium">단체/간식 주문 경험 있음</span>
          </div>
        )}

        {/* 태그 */}
        <div className="flex flex-wrap gap-2">
          {restaurant.tags.map((tag) => (
            <Badge
              key={tag}
              variant="outline"
              className="px-3 py-1.5 text-sm font-normal text-gray-700 border-gray-300"
            >
              {tag}
            </Badge>
          ))}
        </div>

        {/* 추천사 */}
        {restaurant.comment && (
          <div className="bg-gray-50 rounded-lg p-4 border border-gray-100">
            <div className="flex items-start gap-2">
              <span className="text-2xl">💡</span>
              <div>
                <h3 className="font-semibold text-gray-900 mb-1">추천사</h3>
                <p className="text-gray-700 leading-relaxed">{restaurant.comment}</p>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
```

---

### 4. 액션 버튼 (components/restaurant-action-buttons.tsx)

**기능**:
1. **전화하기 버튼**:
   - `tel:` 스키마로 전화 앱 실행
   - 아이콘: Phone
   - 색상: Primary (브랜드 블루)
   - 크기: 크고 명확하게 (h-14)

2. **지도 보기 버튼**:
   - 네이버 지도 URL로 외부 링크 (`target="_blank"`)
   - 아이콘: MapPin
   - 색상: Secondary (회색)
   - 새 탭에서 열기

**레이아웃**:
- 2개 버튼 나란히 (Grid 2 columns)
- 모바일: Fixed Bottom (화면 하단 고정)
- 데스크톱: Inline (컨텐츠 하단)

**컴포넌트 코드**:
```tsx
'use client';

import { Phone, MapPin, ExternalLink } from 'lucide-react';
import { Restaurant } from '@/lib/types/restaurant';
import { Button } from '@/components/ui/button';

interface RestaurantActionButtonsProps {
  restaurant: Restaurant;
}

export function RestaurantActionButtons({ restaurant }: RestaurantActionButtonsProps) {
  const handleCallClick = () => {
    window.location.href = `tel:${restaurant.phone}`;
  };

  const handleMapClick = () => {
    window.open(restaurant.naverPlaceUrl, '_blank', 'noopener,noreferrer');
  };

  return (
    <>
      {/* Mobile: Fixed Bottom */}
      <div className="fixed bottom-0 left-0 right-0 bg-white border-t p-4 md:hidden z-40">
        <div className="grid grid-cols-2 gap-3">
          <Button
            onClick={handleCallClick}
            size="lg"
            className="h-14 text-base font-semibold gap-2"
          >
            <Phone className="size-5" />
            전화하기
          </Button>
          <Button
            onClick={handleMapClick}
            size="lg"
            variant="outline"
            className="h-14 text-base font-semibold gap-2"
          >
            <MapPin className="size-5" />
            지도 보기
          </Button>
        </div>
      </div>

      {/* Desktop: Inline */}
      <div className="hidden md:block max-w-3xl mx-auto px-6 pb-8">
        <div className="grid grid-cols-2 gap-4">
          <Button
            onClick={handleCallClick}
            size="lg"
            className="h-14 text-lg font-semibold gap-2"
          >
            <Phone className="size-5" />
            전화하기
          </Button>
          <Button
            onClick={handleMapClick}
            size="lg"
            variant="outline"
            className="h-14 text-lg font-semibold gap-2"
          >
            <MapPin className="size-5" />
            지도 보기
            <ExternalLink className="size-4 ml-1" />
          </Button>
        </div>
      </div>
    </>
  );
}
```

---

### 5. 메인 페이지 라우팅 수정 (app/page.tsx)

**변경 전**:
```tsx
const handleSelectRestaurant = (id: string) => {
  // TODO: Epic 3에서 상세 페이지 라우팅 구현
};
```

**변경 후**:
```tsx
'use client';

import { useRouter } from 'next/navigation';

export default function Home() {
  const router = useRouter();

  const handleSelectRestaurant = (id: string) => {
    router.push(`/restaurant/${id}`);
  };

  // ... 나머지 코드
}
```

---

### 6. 404 처리 (app/restaurant/[id]/not-found.tsx) - 선택사항

```tsx
import Link from 'next/link';
import { Button } from '@/components/ui/button';

export default function NotFound() {
  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4">
      <div className="text-center">
        <h1 className="text-6xl font-bold text-gray-900 mb-4">404</h1>
        <p className="text-xl text-gray-600 mb-8">식당을 찾을 수 없습니다</p>
        <Button asChild>
          <Link href="/">메인으로 돌아가기</Link>
        </Button>
      </div>
    </div>
  );
}
```

---

## 🎨 디자인 시스템 준수

### 색상
- Primary 버튼: `bg-primary` (전화하기)
- Secondary 버튼: `variant="outline"` (지도 보기)
- 아이콘 색상: `text-gray-500` (정보 섹션)

### 간격
- 섹션 간격: `space-y-6`
- 정보 항목 간격: `space-y-3`
- 버튼 간격: `gap-3` (모바일), `gap-4` (데스크톱)

### 타이포그래피
- 식당 이름: `text-3xl font-bold`
- 정보 텍스트: `text-base`
- 버튼 텍스트: `text-base` (모바일), `text-lg` (데스크톱)

### 반응형
- 이미지: `aspect-[16/9]`
- 최대 너비: `max-w-3xl` (768px)
- 버튼: Fixed Bottom (모바일), Inline (데스크톱)

---

## 💻 전체 app/restaurant/[id]/page.tsx 예시

```tsx
import { mockRestaurants } from "@/lib/data/mock-restaurants";
import { notFound } from "next/navigation";
import { RestaurantDetailHeader } from "@/components/restaurant-detail-header";
import { RestaurantDetailInfo } from "@/components/restaurant-detail-info";
import { RestaurantActionButtons } from "@/components/restaurant-action-buttons";

export default function RestaurantDetailPage({
  params,
}: {
  params: { id: string };
}) {
  const restaurant = mockRestaurants.find((r) => r.id === params.id);

  if (!restaurant) {
    notFound();
  }

  return (
    <div className="min-h-screen bg-gray-50 pb-24 md:pb-0">
      <RestaurantDetailHeader />
      <RestaurantDetailInfo restaurant={restaurant} />
      <RestaurantActionButtons restaurant={restaurant} />
    </div>
  );
}

// Optional: Generate static params for all restaurants
export function generateStaticParams() {
  return mockRestaurants.map((restaurant) => ({
    id: restaurant.id,
  }));
}
```

---

## ✅ Definition of Done

### 필수 (P0)
- [ ] `/restaurant/[id]` 동적 라우팅 동작
- [ ] Mock 데이터에서 ID로 식당 찾기
- [ ] 존재하지 않는 ID → 404 처리
- [ ] 뒤로가기 버튼 동작 (`router.back()`)
- [ ] 대표 이미지 표시 (16:9 비율)
- [ ] 식당 이름, 카테고리, 주소, 영업시간, 전화번호 표시
- [ ] 단체 주문 경험 뱃지 표시 (해당 시)
- [ ] 태그 표시 (전체)
- [ ] 추천사 표시 (comment 필드)
- [ ] **전화하기 버튼**: `tel:` 스키마로 전화 앱 실행
- [ ] **지도 보기 버튼**: 네이버 지도 새 탭에서 열림
- [ ] 모바일: 액션 버튼 Fixed Bottom
- [ ] 데스크톱: 액션 버튼 Inline
- [ ] 메인 페이지에서 카드 클릭 → 상세 페이지 라우팅
- [ ] TypeScript 컴파일 에러 없음
- [ ] `npm run build` 성공

### UI/UX (P1)
- [ ] 이미지 로딩 최적화 (priority 속성)
- [ ] 뒤로가기 버튼 hover 효과
- [ ] 액션 버튼 크기 충분함 (h-14)
- [ ] 액션 버튼 아이콘 + 텍스트 명확
- [ ] 반응형 레이아웃 (모바일/데스크톱)

### 선택사항 (P2)
- [ ] not-found.tsx 커스텀 404 페이지
- [ ] generateStaticParams로 정적 생성
- [ ] 이미지 갤러리 (여러 이미지, 현재는 1개만)
- [ ] 공유하기 버튼 (클립보드 복사)

---

## ⚠️ 주의사항

### 1. tel: 스키마
- **iOS/Android**: 전화 앱 자동 실행
- **Desktop**: 기본 전화 앱이 없으면 동작 안 함 (Skype 등 설치 시 동작)
- 전화번호 형식: `tel:02-123-4567` 또는 `tel:+82-2-123-4567`

### 2. 외부 링크 (네이버 지도)
- `target="_blank"`: 새 탭에서 열기
- `rel="noopener noreferrer"`: 보안 강화 (필수)
- 모바일: 네이버 지도 앱 자동 실행 (앱 설치 시)

### 3. 동적 라우팅
- `params.id`는 **string 타입** (mockRestaurants의 id도 string)
- `find()` 결과가 `undefined`일 수 있으므로 `notFound()` 처리 필수

### 4. 뒤로가기
- `router.back()`: 브라우저 히스토리 뒤로 가기
- 히스토리 없으면 → 홈으로 가는 fallback 추가 권장:
```tsx
const handleBack = () => {
  if (window.history.length > 1) {
    router.back();
  } else {
    router.push('/');
  }
};
```

### 5. 모바일 Fixed Bottom 버튼
- `pb-24` (padding-bottom): Fixed 버튼이 컨텐츠를 가리지 않도록
- `z-40`: 다른 요소보다 위에 표시

### 6. Image 최적화
- `priority` 속성: LCP (Largest Contentful Paint) 개선
- `sizes` 속성: 반응형 이미지 최적화
- `fill` + `relative parent`: 비율 유지

### 7. Server Component vs Client Component
- `app/restaurant/[id]/page.tsx`: **Server Component** (기본)
  - Mock 데이터 가져오기는 서버에서
- Header, ActionButtons: **Client Component** (`'use client'`)
  - `useRouter`, `onClick` 등 클라이언트 기능 사용

---

## 🚀 개발 시작 전 체크리스트

- [ ] Next.js 동적 라우팅 ([id]) 개념 이해
- [ ] `tel:` 스키마 동작 방식 이해
- [ ] `router.back()` vs `router.push('/')` 차이 이해
- [ ] Server Component vs Client Component 구분 이해
- [ ] 명세서 내용 이해 완료
- [ ] 질문 사항 없음

---

## 📝 참고 자료

- [Next.js Dynamic Routes](https://nextjs.org/docs/app/building-your-application/routing/dynamic-routes)
- [next/navigation - useRouter](https://nextjs.org/docs/app/api-reference/functions/use-router)
- [tel: URI Scheme](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/a#tel)
- [Next.js Image Optimization](https://nextjs.org/docs/app/building-your-application/optimizing/images)

---

**다음 Epic**: Epic 4 - Supabase 연동 (실제 데이터베이스)

**완료 후 확인사항**:
- 메인 페이지 → 식당 카드 클릭 → 상세 페이지 이동
- 전화하기 버튼 → 전화 앱 실행
- 지도 보기 버튼 → 네이버 지도 새 탭 열림
- 뒤로가기 버튼 → 메인 페이지로 복귀
