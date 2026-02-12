# Task #002: Figma UI 디자인 반영 (식당 리스트 페이지)

> **Gemini 개발자님께**: 이 명세서는 Epic 2의 UI 수정 작업입니다. `design/Mobile Web MVP UI Design/` 폴더의 Figma 디자인을 기준으로 현재 구현을 업데이트합니다. GEMINI_ONBOARDING.md의 작업 프로토콜을 따라주세요.

---

## 📍 작업 범위

### 수정할 파일
- `app/page.tsx` - 헤더, 필터, 레이아웃 변경
- `components/restaurant-card.tsx` - 모바일/데스크톱 분리 레이아웃, 단체 주문 뱃지
- `lib/types/restaurant.ts` - 데이터 타입 Figma 기준으로 통일
- `lib/data/mock-restaurants.ts` - 데이터 필드명 변경

### 새로 생성할 파일
- `components/restaurant-list-header.tsx` - 헤더 컴포넌트 (로고, 링크 복사 버튼)
- `components/category-filter.tsx` - 카테고리 필터 컴포넌트
- `components/ad-banner.tsx` - 광고 배너 컴포넌트

### 참고할 파일
- `design/Mobile Web MVP UI Design/src/components/RestaurantList.tsx` - Figma 디자인 구현
- `design/Mobile Web MVP UI Design/src/data/restaurants.ts` - Figma 데이터 구조

---

## 🎯 요구사항

### 1. 헤더 변경 (app/page.tsx + 새 컴포넌트)

**현재 문제**:
- 중앙 정렬된 큰 로고와 설명문구
- 링크 복사 버튼 없음
- sticky 헤더 아님

**Figma 디자인 요구사항**:
- `bg-white border-b sticky top-0 z-10` (상단 고정)
- 좌측: "뭉치" 텍스트 (font-bold, 로고 이미지 제거)
- 우측: "링크 복사하기" 버튼 (`Link2` 아이콘 + 텍스트)
- 링크 복사 시 Toast 메시지 표시 ("링크가 복사되었습니다")
- max-w-7xl 컨테이너, px-4 md:px-6 lg:px-8

**컴포넌트 생성**: `components/restaurant-list-header.tsx`

### 2. 카테고리 필터 추가 (새 컴포넌트)

**Figma 디자인 요구사항**:
- 헤더 하단에 카테고리 필터 바
- 카테고리: `'전체' | '한식' | '양식' | '카페' | '기타'`
- 선택된 카테고리: `bg-black text-white`
- 선택 안된 카테고리: `bg-gray-100 text-gray-700`
- hover/active: `hover:bg-gray-200 active:bg-gray-200`
- px-4 py-1.5, rounded-full, text-sm
- 가로 스크롤 가능 (`overflow-x-auto scrollbar-hide`)

**컴포넌트 생성**: `components/category-filter.tsx`

**기능**:
- 선택된 카테고리에 따라 식당 목록 필터링
- '전체' 선택 시 모든 식당 표시

### 3. 식당 카드 레이아웃 변경 (components/restaurant-card.tsx)

**현재 문제**:
- 모바일/데스크톱 동일한 세로 카드
- 태그가 카드에 표시됨 (Figma에는 없음)
- 단체 주문 경험 뱃지 없음

**Figma 디자인 요구사항**:

#### 모바일 레이아웃 (`md:hidden`)
- **가로 카드** (flex gap-3)
- 썸네일: `w-20 h-20 rounded-lg` (왼쪽)
- 정보 영역 (오른쪽):
  - 이름 + 카테고리 뱃지 (같은 줄, justify-between)
  - description (태그 아님! `#가성비 #단체석` 형식)
  - 주소 (truncate)
- 단체 주문 경험 뱃지: 썸네일 우상단 (`absolute top-1 right-1`)
  - `bg-green-500 rounded-full p-0.5`
  - `CheckCircle2` 아이콘 (size-3)

#### 데스크톱 레이아웃 (`hidden md:block`)
- **세로 카드**
- 이미지: `h-48` (위)
- 카테고리 뱃지: 이미지 위 좌상단 (`absolute top-3 left-3`)
  - `bg-white/95 backdrop-blur-sm text-xs rounded-full`
- 단체 주문 경험 뱃지: 이미지 위 우상단 (`absolute top-3 right-3`)
  - `bg-green-500 rounded-full p-1`
  - `CheckCircle2` 아이콘 (size-4)
- 정보 영역 (p-4):
  - 이름 (font-medium, mb-2)
  - description (text-sm text-gray-600, mb-2)
  - 주소 (text-xs text-gray-500, line-clamp-1)

**공통**:
- 카드: `bg-white rounded-lg shadow-sm hover:shadow-md transition-shadow`
- 카드는 `button` 태그 (클릭 가능)
- 태그 표시 제거 (Figma 리스트에는 태그 없음)

### 4. 광고 배너 추가 (새 컴포넌트)

**Figma 디자인 요구사항**:

#### 모바일 (`md:hidden`)
- `fixed bottom-0 left-0 right-0`
- `bg-gray-200 border-t h-16`
- 텍스트: "광고 영역" (text-sm text-gray-500)

#### 데스크톱 (`hidden md:block`)
- 리스트 하단에 배치
- `max-w-7xl mx-auto px-6 lg:px-8 pb-8`
- `bg-gray-200 border rounded-lg h-24`
- 텍스트: "광고 영역"

**컴포넌트 생성**: `components/ad-banner.tsx`

### 5. 메인 페이지 레이아웃 변경 (app/page.tsx)

**Figma 디자인 요구사항**:
- `min-h-screen bg-gray-50 pb-24 md:pb-0` (모바일 하단 광고 공간 확보)
- max-w-7xl 컨테이너 (기존 max-w-4xl에서 변경)
- 그리드: `grid-cols-1 md:grid-cols-2 lg:grid-cols-3`
- 카테고리 필터 상태 관리 (useState)

---

## 🏗️ 데이터 스키마 변경

### Restaurant 타입 (lib/types/restaurant.ts)

**변경 전**:
```typescript
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
}
```

**변경 후** (Figma 기준):
```typescript
export interface Restaurant {
  id: string; // number → string 변경
  name: string;
  category: '한식' | '양식' | '카페' | '기타'; // 타입 명시
  description: string; // specialNotes 대신 (태그 형식: "#가성비 #단체석")
  address: string;
  imageUrl: string; // image → imageUrl로 변경
  phone: string; // phoneNumber → phone으로 변경
  hours: string; // businessHours → hours로 변경
  hasGroupOrderExperience: boolean; // hasGroupEventExpr → hasGroupOrderExperience로 변경
  comment: string; // 리뷰/코멘트 (내부용, UI에 표시 안 함)
  tags: string[]; // 검색용 (UI 리스트에 표시 안 함)
  naverPlaceUrl: string; // naverMapUrl → naverPlaceUrl로 변경
}
```

### Mock 데이터 업데이트 (lib/data/mock-restaurants.ts)

- 위 타입 기준으로 모든 필드명 변경
- `id`를 string으로 변경 ('1', '2', ...)
- `description`을 태그 형식으로 변경 (예: "#가성비 #단체석 #뒷풀이")
- `comment` 필드 추가 (기존 specialNotes 내용 이동)

---

## 💻 코드 예시

### 1. restaurant-list-header.tsx

```tsx
'use client';

import { useState } from 'react';
import { Link2, CheckCircle2 } from 'lucide-react';

export function RestaurantListHeader() {
  const [showCopyToast, setShowCopyToast] = useState(false);

  const handleCopyLink = async () => {
    try {
      await navigator.clipboard.writeText(window.location.href);
      setShowCopyToast(true);
      setTimeout(() => setShowCopyToast(false), 2000);
    } catch (err) {
      console.error('Failed to copy:', err);
    }
  };

  return (
    <>
      <header className="bg-white border-b sticky top-0 z-10">
        <div className="max-w-7xl mx-auto px-4 md:px-6 lg:px-8 py-4 flex items-center justify-between">
          <h1 className="font-bold">뭉치</h1>
          <button
            onClick={handleCopyLink}
            className="flex items-center gap-2 px-3 py-1.5 text-sm bg-gray-100 rounded-full active:bg-gray-200 hover:bg-gray-200 transition-colors"
          >
            <Link2 className="size-4" />
            링크 복사하기
          </button>
        </div>
      </header>

      {/* Copy Toast */}
      {showCopyToast && (
        <div className="fixed top-20 left-1/2 -translate-x-1/2 bg-black text-white px-4 py-2 rounded-full text-sm shadow-lg z-50">
          링크가 복사되었습니다
        </div>
      )}
    </>
  );
}
```

### 2. category-filter.tsx

```tsx
'use client';

import { Dispatch, SetStateAction } from 'react';

type Category = '전체' | '한식' | '양식' | '카페' | '기타';

interface CategoryFilterProps {
  selectedCategory: Category;
  onCategoryChange: Dispatch<SetStateAction<Category>>;
}

export function CategoryFilter({ selectedCategory, onCategoryChange }: CategoryFilterProps) {
  const categories: Category[] = ['전체', '한식', '양식', '카페', '기타'];

  return (
    <div className="bg-white border-b sticky top-[57px] z-10">
      <div className="max-w-7xl mx-auto px-4 md:px-6 lg:px-8 pb-3 pt-0 flex gap-2 overflow-x-auto scrollbar-hide">
        {categories.map(category => (
          <button
            key={category}
            onClick={() => onCategoryChange(category)}
            className={`px-4 py-1.5 rounded-full text-sm whitespace-nowrap transition-colors ${
              selectedCategory === category
                ? 'bg-black text-white'
                : 'bg-gray-100 text-gray-700 active:bg-gray-200 hover:bg-gray-200'
            }`}
          >
            {category}
          </button>
        ))}
      </div>
    </div>
  );
}
```

### 3. restaurant-card.tsx (수정)

```tsx
import Image from "next/image";
import { Restaurant } from "@/lib/types/restaurant";
import { CheckCircle2 } from 'lucide-react';

interface RestaurantCardProps {
  restaurant: Restaurant;
  onSelectRestaurant: (id: string) => void;
}

export function RestaurantCard({ restaurant, onSelectRestaurant }: RestaurantCardProps) {
  return (
    <button
      onClick={() => onSelectRestaurant(restaurant.id)}
      className="bg-white rounded-lg overflow-hidden shadow-sm active:shadow-md hover:shadow-md transition-shadow text-left"
    >
      {/* Desktop: Vertical Card Layout */}
      <div className="hidden md:block">
        <div className="relative h-48 bg-gray-100">
          <Image
            src={restaurant.imageUrl}
            alt={restaurant.name}
            fill
            className="object-cover"
          />
          {restaurant.hasGroupOrderExperience && (
            <div className="absolute top-3 right-3 bg-green-500 rounded-full p-1">
              <CheckCircle2 className="size-4 text-white" />
            </div>
          )}
          <div className="absolute top-3 left-3 px-2.5 py-1 bg-white/95 backdrop-blur-sm text-xs font-medium rounded-full">
            {restaurant.category}
          </div>
        </div>
        <div className="p-4">
          <h3 className="font-medium text-gray-900 mb-2">{restaurant.name}</h3>
          <p className="text-sm text-gray-600 mb-2">{restaurant.description}</p>
          <p className="text-xs text-gray-500 line-clamp-1">{restaurant.address}</p>
        </div>
      </div>

      {/* Mobile: Horizontal Card Layout */}
      <div className="flex gap-3 p-3 md:hidden">
        <div className="relative flex-shrink-0 w-20 h-20 bg-gray-100 rounded-lg overflow-hidden">
          <Image
            src={restaurant.imageUrl}
            alt={restaurant.name}
            fill
            className="object-cover"
          />
          {restaurant.hasGroupOrderExperience && (
            <div className="absolute top-1 right-1 bg-green-500 rounded-full p-0.5">
              <CheckCircle2 className="size-3 text-white" />
            </div>
          )}
        </div>
        <div className="flex-1 min-w-0">
          <div className="flex items-start justify-between gap-2">
            <h3 className="font-medium text-gray-900">{restaurant.name}</h3>
            <span className="flex-shrink-0 px-2 py-0.5 text-xs bg-gray-100 text-gray-600 rounded">
              {restaurant.category}
            </span>
          </div>
          <p className="mt-1 text-sm text-gray-600">{restaurant.description}</p>
          <p className="mt-1.5 text-xs text-gray-500 truncate">{restaurant.address}</p>
        </div>
      </div>
    </button>
  );
}
```

### 4. ad-banner.tsx

```tsx
export function AdBanner() {
  return (
    <>
      {/* Mobile Ad Banner */}
      <div className="fixed bottom-0 left-0 right-0 bg-gray-200 border-t md:hidden z-10">
        <div className="h-16 flex items-center justify-center text-sm text-gray-500">
          광고 영역
        </div>
      </div>

      {/* Desktop Ad Banner */}
      <div className="hidden md:block max-w-7xl mx-auto px-6 lg:px-8 pb-8">
        <div className="bg-gray-200 border rounded-lg h-24 flex items-center justify-center text-sm text-gray-500">
          광고 영역
        </div>
      </div>
    </>
  );
}
```

### 5. app/page.tsx (수정)

```tsx
'use client';

import { useState } from 'react';
import { mockRestaurants } from "@/lib/data/mock-restaurants";
import { RestaurantCard } from "@/components/restaurant-card";
import { RestaurantListHeader } from "@/components/restaurant-list-header";
import { CategoryFilter } from "@/components/category-filter";
import { AdBanner } from "@/components/ad-banner";

type Category = '전체' | '한식' | '양식' | '카페' | '기타';

export default function Home() {
  const [selectedCategory, setSelectedCategory] = useState<Category>('전체');

  const filteredRestaurants = selectedCategory === '전체'
    ? mockRestaurants
    : mockRestaurants.filter(r => r.category === selectedCategory);

  const handleSelectRestaurant = (id: string) => {
    // TODO: Epic 3에서 상세 페이지 라우팅 구현
    console.log('Selected restaurant:', id);
  };

  return (
    <div className="min-h-screen bg-gray-50 pb-24 md:pb-0">
      <RestaurantListHeader />
      <CategoryFilter
        selectedCategory={selectedCategory}
        onCategoryChange={setSelectedCategory}
      />

      <main className="max-w-7xl mx-auto p-4 md:p-6 lg:p-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {filteredRestaurants.map(restaurant => (
            <RestaurantCard
              key={restaurant.id}
              restaurant={restaurant}
              onSelectRestaurant={handleSelectRestaurant}
            />
          ))}
        </div>
      </main>

      <AdBanner />
    </div>
  );
}
```

---

## 🎨 디자인 시스템 준수

### 색상
- 배경: `bg-gray-50` (메인), `bg-white` (카드, 헤더)
- 텍스트: `text-gray-900` (제목), `text-gray-600` (부제목), `text-gray-500` (보조)
- 선택된 카테고리: `bg-black text-white`
- 단체 주문 뱃지: `bg-green-500`
- 광고: `bg-gray-200`

### 간격
- 헤더 패딩: `py-4`
- 카드 패딩: 모바일 `p-3`, 데스크톱 `p-4`
- 그리드 gap: `gap-4`

### 반응형
- 모바일: 기본 (~ md)
- 태블릿: `md:` (768px ~)
- 데스크톱: `lg:` (1024px ~)

### 애니메이션
- 카드 hover: `hover:shadow-md transition-shadow`
- 버튼 active: `active:bg-gray-200 transition-colors`
- Toast: fade in/out (2초)

---

## ✅ Definition of Done

### 필수 (P0)
- [ ] 헤더가 상단 고정 (sticky)되고 "뭉치" + "링크 복사하기" 버튼 표시
- [ ] 링크 복사 버튼 클릭 시 URL 복사되고 Toast 표시
- [ ] 카테고리 필터 (전체, 한식, 양식, 카페, 기타) 동작
- [ ] 선택된 카테고리에 따라 식당 목록 필터링
- [ ] 모바일: 가로 카드 레이아웃 (썸네일 왼쪽, 정보 오른쪽)
- [ ] 데스크톱: 세로 카드 레이아웃 (이미지 위, 정보 아래)
- [ ] 단체 주문 경험 있는 식당에 녹색 체크마크 표시
- [ ] 광고 배너 (모바일: 하단 고정, 데스크톱: 리스트 하단)
- [ ] Restaurant 타입이 Figma 기준으로 변경됨 (id: string, imageUrl, phone, hours 등)
- [ ] TypeScript 컴파일 에러 없음
- [ ] `npm run build` 성공

### 제거 (P0)
- [ ] 메인 페이지 중앙 정렬된 큰 로고/설명 제거
- [ ] 카드에서 태그 표시 제거 (description만 표시)

### 반응형 (P0)
- [ ] 모바일 (320px ~ 768px) 테스트 완료
- [ ] 태블릿 (md) 레이아웃 테스트 완료
- [ ] 데스크톱 (lg) 3열 그리드 테스트 완료

### 접근성 (P1)
- [ ] 모든 이미지에 alt 속성
- [ ] 버튼에 명확한 텍스트/아이콘
- [ ] 키보드 네비게이션 가능

---

## ⚠️ 주의사항

### 1. Figma 디자인 파일 참고
- `design/Mobile Web MVP UI Design/src/components/RestaurantList.tsx` 파일을 직접 참고하세요
- 실제 스타일링, 클래스명, 구조를 그대로 따라가는 것이 중요합니다

### 2. 데이터 타입 일관성
- 모든 `id`를 string으로 변경 (라우팅 시 타입 일치)
- 필드명을 Figma 기준으로 통일 (`imageUrl`, `phone`, `hours`, `hasGroupOrderExperience`)

### 3. 클라이언트 컴포넌트
- `app/page.tsx`, `category-filter.tsx`, `restaurant-list-header.tsx`는 `'use client'` 필요 (useState 사용)
- `ad-banner.tsx`, `restaurant-card.tsx`는 서버 컴포넌트 가능

### 4. 이미지 처리
- Next.js Image 컴포넌트 사용
- Figma 예시는 Unsplash 사용하지만, 현재 placeholder 이미지 유지
- `fill` prop 사용 시 부모에 `relative` 필수

### 5. shadcn/ui 제거
- Figma 디자인은 Tailwind만 사용 (shadcn Card/Badge 사용 안 함)
- 기존 `Card`, `Badge` import 제거
- 모든 스타일을 Tailwind 유틸리티 클래스로 구현

### 6. 태그 vs description
- Figma에서 `description`은 "#가성비 #단체석" 형식의 **표시용**
- `tags`는 배열이지만 **리스트 UI에 표시 안 함** (검색용으로만 사용)

### 7. 광고 영역
- 현재는 placeholder ("광고 영역" 텍스트)
- 모바일 하단 고정으로 인해 `pb-24` 필요 (콘텐츠 가려지지 않도록)

### 8. 상세 페이지 라우팅
- 카드 클릭 시 `onSelectRestaurant(id)` 호출
- 실제 라우팅은 Epic 3에서 구현 예정
- 현재는 console.log만 출력

---

## 🚀 개발 시작 전 체크리스트

- [ ] `design/Mobile Web MVP UI Design/src/components/RestaurantList.tsx` 파일 확인
- [ ] `design/Mobile Web MVP UI Design/src/data/restaurants.ts` 데이터 구조 확인
- [ ] Figma 프로젝트 링크 확인 (선택): https://www.figma.com/design/i67EFxoqlzY9mzlc7ANXuJ/Mobile-Web-MVP-UI-Design
- [ ] 명세서 내용 이해 완료
- [ ] 질문 사항 없음

---

## 📝 참고 자료

- [Figma 디자인 코드 번들](../design/Mobile%20Web%20MVP%20UI%20Design/)
- [RestaurantList.tsx 원본](../design/Mobile%20Web%20MVP%20UI%20Design/src/components/RestaurantList.tsx)
- [restaurants.ts 데이터 구조](../design/Mobile%20Web%20MVP%20UI%20Design/src/data/restaurants.ts)
- [Lucide Icons - CheckCircle2, Link2](https://lucide.dev/)
- [Tailwind CSS Docs](https://tailwindcss.com/docs)

---

**다음 Epic**: Epic 3 - 식당 상세 페이지 (RestaurantDetail.tsx 기반)
