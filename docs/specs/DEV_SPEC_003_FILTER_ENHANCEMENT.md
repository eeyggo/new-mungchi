# Task #003: 필터 기능 강화 및 UI 개선

> **Gemini 개발자님께**: 이 명세서는 Epic 2의 필터 기능 강화 및 UI 트렌디화 작업입니다. 카테고리, 태그, 위치 기반 필터를 구현하고, 전체적인 UI를 더 현대적으로 개선합니다. GEMINI_ONBOARDING.md의 작업 프로토콜을 따라주세요.

---

## 📍 작업 범위

### 수정할 파일
- `components/restaurant-list-header.tsx` - 로고 추가, 링크 복사 버튼 제거
- `components/category-filter.tsx` - 필터 UI 개선 및 태그/위치 필터 추가
- `app/page.tsx` - 필터링 로직 확장 (카테고리 + 태그 + 위치)
- `lib/utils/location.ts` - 새 파일: 위치 기반 거리 계산 유틸

### 새로 생성할 파일
- `components/filter-section.tsx` - 통합 필터 컴포넌트 (카테고리 + 태그 + 위치)
- `components/tag-filter.tsx` - 태그 멀티 선택 필터
- `components/location-filter.tsx` - 위치 기반 필터 토글
- `lib/utils/location.ts` - 거리 계산 및 정렬 로직

---

## 🎯 요구사항

### 1. 헤더 수정 (components/restaurant-list-header.tsx)

**현재 문제**:
- "뭉치" 텍스트만 있음
- 링크 복사 버튼이 있음 (제거 필요)

**개선 요구사항**:
- "뭉치" 텍스트 **왼쪽에 로고 이미지 추가**
  - 로고: `design/logo/logo-blue.png` 사용
  - 크기: `w-8 h-8` (32x32px)
  - 로고와 텍스트 간격: `gap-2`
- **링크 복사 버튼 제거**
- Toast 관련 코드 제거

**디자인**:
```tsx
<header className="bg-white border-b sticky top-0 z-10">
  <div className="max-w-7xl mx-auto px-4 md:px-6 lg:px-8 py-4">
    <div className="flex items-center gap-2">
      <Image src={logoBlue} alt="뭉치" width={32} height={32} />
      <h1 className="font-bold text-lg">뭉치</h1>
    </div>
  </div>
</header>
```

---

### 2. 통합 필터 섹션 구현 (새 컴포넌트)

**구조**:
```
┌─────────────────────────────────────┐
│ [헤더: 뭉치 + 로고]                 │
├─────────────────────────────────────┤
│ [카테고리 필터]                     │
│ ○ 전체  ● 한식  ○ 양식  ○ 카페     │
├─────────────────────────────────────┤
│ [태그 필터]                         │
│ #가성비 #룸완비 #뒷풀이 #주차가능   │
├─────────────────────────────────────┤
│ [위치 필터]                         │
│ 📍 내 위치에서 가까운 순  [ON/OFF] │
└─────────────────────────────────────┘
```

#### A. 카테고리 필터 (기존 유지 + UI 개선)

**기존 기능 유지**:
- 단일 선택 (Single Select)
- 카테고리: '전체', '한식', '양식', '카페', '기타'

**UI 개선**:
- 선택된 카테고리: `bg-primary text-white` (검은색 대신 브랜드 컬러)
- hover 효과: `hover:bg-primary/10`
- 부드러운 transition: `transition-all duration-200`
- 그림자 효과: 선택된 것만 `shadow-sm`

#### B. 태그 필터 (새 기능)

**기능**:
- **멀티 선택** (Multiple Select)
- 태그 목록 (Mock 데이터에서 자동 추출):
  - `#가성비`, `#룸완비`, `#단체석`, `#뒷풀이`, `#주차가능`, `#배달`, `#야식`, `#치맥` 등
- 선택된 태그 모두 만족하는 식당만 표시 (AND 조건)

**UI 디자인**:
- 칩 형태: `rounded-full px-3 py-1.5 text-sm`
- 선택 전: `bg-gray-100 text-gray-700`
- 선택 후: `bg-primary/10 text-primary border border-primary`
- 아이콘: 선택 시 체크마크 (`Check` 아이콘 from lucide-react)
- 가로 스크롤: `overflow-x-auto scrollbar-hide`

**컴포넌트 생성**: `components/tag-filter.tsx`

```tsx
'use client';

interface TagFilterProps {
  selectedTags: string[];
  onTagsChange: (tags: string[]) => void;
}

export function TagFilter({ selectedTags, onTagsChange }: TagFilterProps) {
  // Mock 데이터에서 모든 태그 추출
  const allTags = ['#가성비', '#룸완비', '#단체석', '#뒷풀이', '#주차가능',
                   '#배달', '#야식', '#치맥', '#노트북', '#회의'];

  const toggleTag = (tag: string) => {
    if (selectedTags.includes(tag)) {
      onTagsChange(selectedTags.filter(t => t !== tag));
    } else {
      onTagsChange([...selectedTags, tag]);
    }
  };

  return (
    <div className="bg-white border-b py-3">
      <div className="max-w-7xl mx-auto px-4 md:px-6 lg:px-8">
        <h3 className="text-xs font-semibold text-gray-500 mb-2 uppercase tracking-wide">
          태그 필터
        </h3>
        <div className="flex gap-2 overflow-x-auto scrollbar-hide">
          {allTags.map(tag => {
            const isSelected = selectedTags.includes(tag);
            return (
              <button
                key={tag}
                onClick={() => toggleTag(tag)}
                className={`flex items-center gap-1.5 px-3 py-1.5 rounded-full text-sm whitespace-nowrap transition-all duration-200 ${
                  isSelected
                    ? 'bg-primary/10 text-primary border border-primary'
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                }`}
              >
                {isSelected && <Check className="size-3" />}
                {tag}
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
}
```

#### C. 위치 기반 필터 (새 기능)

**기능**:
- **토글 스위치** (ON/OFF)
- ON: 사용자 현재 위치에서 가까운 순으로 정렬
- OFF: 기본 순서 (ID 순)
- Geolocation API 사용

**권한 처리**:
1. 처음 ON 클릭 시: 브라우저 위치 권한 요청
2. 허용 시: 거리 계산 후 정렬
3. 거부 시: Toast 메시지 ("위치 권한이 필요합니다") + 다시 OFF

**거리 계산**:
- Haversine Formula 사용 (지구 곡률 고려)
- Mock 데이터에 `lat`, `lng` 좌표 추가 필요
- 거리 표시: 1km 미만 "XXXm", 1km 이상 "X.Xkm"

**UI 디자인**:
- 토글 스위치 + 텍스트
- 위치 정보 로딩 중: 스피너 표시
- 거리 뱃지: 각 카드에 표시 (선택사항)

**컴포넌트 생성**: `components/location-filter.tsx`

```tsx
'use client';

import { MapPin, Loader2 } from 'lucide-react';
import { useState } from 'react';

interface LocationFilterProps {
  isEnabled: boolean;
  onToggle: (enabled: boolean, userLocation?: { lat: number; lng: number }) => void;
}

export function LocationFilter({ isEnabled, onToggle }: LocationFilterProps) {
  const [isLoading, setIsLoading] = useState(false);

  const handleToggle = async () => {
    if (!isEnabled) {
      // 위치 권한 요청
      setIsLoading(true);
      try {
        const position = await new Promise<GeolocationPosition>((resolve, reject) => {
          navigator.geolocation.getCurrentPosition(resolve, reject);
        });
        const userLocation = {
          lat: position.coords.latitude,
          lng: position.coords.longitude,
        };
        onToggle(true, userLocation);
      } catch (error) {
        alert('위치 권한이 필요합니다. 브라우저 설정에서 위치 권한을 허용해주세요.');
        onToggle(false);
      } finally {
        setIsLoading(false);
      }
    } else {
      onToggle(false);
    }
  };

  return (
    <div className="bg-white border-b py-3">
      <div className="max-w-7xl mx-auto px-4 md:px-6 lg:px-8">
        <button
          onClick={handleToggle}
          disabled={isLoading}
          className="flex items-center justify-between w-full py-2 px-3 rounded-lg hover:bg-gray-50 transition-colors"
        >
          <div className="flex items-center gap-2">
            <MapPin className="size-4 text-gray-600" />
            <span className="text-sm font-medium text-gray-700">
              내 위치에서 가까운 순
            </span>
          </div>
          <div className="flex items-center gap-2">
            {isLoading && <Loader2 className="size-4 animate-spin text-primary" />}
            <div
              className={`relative w-11 h-6 rounded-full transition-colors ${
                isEnabled ? 'bg-primary' : 'bg-gray-300'
              }`}
            >
              <div
                className={`absolute top-0.5 w-5 h-5 bg-white rounded-full transition-transform ${
                  isEnabled ? 'translate-x-5.5' : 'translate-x-0.5'
                }`}
              />
            </div>
          </div>
        </button>
      </div>
    </div>
  );
}
```

---

### 3. 통합 필터 컴포넌트 (filter-section.tsx)

**목적**: 카테고리, 태그, 위치 필터를 하나로 묶음

```tsx
'use client';

import { CategoryFilter } from './category-filter';
import { TagFilter } from './tag-filter';
import { LocationFilter } from './location-filter';
import { Category } from '@/lib/types/restaurant';

interface FilterSectionProps {
  selectedCategory: Category;
  onCategoryChange: (category: Category) => void;
  selectedTags: string[];
  onTagsChange: (tags: string[]) => void;
  locationEnabled: boolean;
  onLocationToggle: (enabled: boolean, userLocation?: { lat: number; lng: number }) => void;
}

export function FilterSection({
  selectedCategory,
  onCategoryChange,
  selectedTags,
  onTagsChange,
  locationEnabled,
  onLocationToggle,
}: FilterSectionProps) {
  return (
    <div className="sticky top-[57px] z-10">
      <CategoryFilter
        selectedCategory={selectedCategory}
        onCategoryChange={onCategoryChange}
      />
      <TagFilter
        selectedTags={selectedTags}
        onTagsChange={onTagsChange}
      />
      <LocationFilter
        isEnabled={locationEnabled}
        onToggle={onLocationToggle}
      />
    </div>
  );
}
```

---

### 4. 거리 계산 유틸 (lib/utils/location.ts)

```typescript
// Haversine Formula: 두 좌표 간 거리 계산 (km)
export function calculateDistance(
  lat1: number,
  lng1: number,
  lat2: number,
  lng2: number
): number {
  const R = 6371; // 지구 반지름 (km)
  const dLat = toRad(lat2 - lat1);
  const dLng = toRad(lng2 - lng1);

  const a =
    Math.sin(dLat / 2) * Math.sin(dLat / 2) +
    Math.cos(toRad(lat1)) * Math.cos(toRad(lat2)) *
    Math.sin(dLng / 2) * Math.sin(dLng / 2);

  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  const distance = R * c;

  return distance;
}

function toRad(degrees: number): number {
  return degrees * (Math.PI / 180);
}

// 거리 포맷팅 (1km 미만: XXXm, 1km 이상: X.Xkm)
export function formatDistance(km: number): string {
  if (km < 1) {
    return `${Math.round(km * 1000)}m`;
  }
  return `${km.toFixed(1)}km`;
}
```

---

### 5. 메인 페이지 필터링 로직 (app/page.tsx)

**확장된 상태 관리**:
```tsx
const [selectedCategory, setSelectedCategory] = useState<Category>('전체');
const [selectedTags, setSelectedTags] = useState<string[]>([]);
const [locationEnabled, setLocationEnabled] = useState(false);
const [userLocation, setUserLocation] = useState<{ lat: number; lng: number } | null>(null);
```

**필터링 로직** (3단계):
```tsx
let filteredRestaurants = mockRestaurants;

// 1. 카테고리 필터
if (selectedCategory !== '전체') {
  filteredRestaurants = filteredRestaurants.filter(r => r.category === selectedCategory);
}

// 2. 태그 필터 (AND 조건: 선택된 모든 태그 포함)
if (selectedTags.length > 0) {
  filteredRestaurants = filteredRestaurants.filter(restaurant =>
    selectedTags.every(tag => restaurant.tags.includes(tag))
  );
}

// 3. 위치 기반 정렬
if (locationEnabled && userLocation) {
  filteredRestaurants = filteredRestaurants
    .map(restaurant => ({
      ...restaurant,
      distance: calculateDistance(
        userLocation.lat,
        userLocation.lng,
        restaurant.lat,
        restaurant.lng
      ),
    }))
    .sort((a, b) => a.distance - b.distance);
}
```

---

### 6. Mock 데이터에 좌표 추가 (lib/data/mock-restaurants.ts)

**추가 필드**:
```typescript
export interface Restaurant {
  // ... 기존 필드
  lat: number; // 위도
  lng: number; // 경도
}
```

**고려대 인근 좌표 예시**:
```typescript
{
  id: "1",
  name: "형제집",
  // ... 기존 필드
  lat: 37.5855, // 고려대 근처
  lng: 127.0283,
}
```

**참고**: 실제 식당 좌표는 네이버 지도에서 확인 후 입력 (또는 대략적 좌표 사용)

---

### 7. UI 트렌디화 개선 사항

#### A. 카드 hover 효과 강화
```tsx
// restaurant-card.tsx
className="... hover:shadow-xl hover:-translate-y-1 transition-all duration-300"
```

#### B. 필터 칩 애니메이션
```tsx
// 선택 시 scale 효과
className="... active:scale-95 transition-transform"
```

#### C. 스켈레톤 로딩 (선택사항)
- 위치 정보 로딩 중 스켈레톤 UI 표시
- 카드 리스트 로딩 중 스켈레톤 카드 표시

#### D. 빈 상태 (Empty State)
```tsx
{filteredRestaurants.length === 0 && (
  <div className="col-span-full py-16 text-center">
    <p className="text-gray-500 text-lg mb-2">조건에 맞는 식당이 없습니다</p>
    <p className="text-gray-400 text-sm">필터를 조정해보세요</p>
  </div>
)}
```

#### E. 필터 초기화 버튼 (선택사항)
```tsx
<button
  onClick={() => {
    setSelectedCategory('전체');
    setSelectedTags([]);
    setLocationEnabled(false);
  }}
  className="text-sm text-primary hover:underline"
>
  필터 초기화
</button>
```

---

## 🏗️ 데이터 스키마 변경

### Restaurant 타입 (lib/types/restaurant.ts)

**추가 필드**:
```typescript
export interface Restaurant {
  // ... 기존 필드
  lat: number; // 위도 (필수)
  lng: number; // 경도 (필수)
  distance?: number; // 사용자로부터의 거리 (km, 계산된 값)
}
```

---

## 💻 전체 app/page.tsx 예시

```tsx
'use client';

import { useState } from 'react';
import { mockRestaurants } from "@/lib/data/mock-restaurants";
import { RestaurantCard } from "@/components/restaurant-card";
import { RestaurantListHeader } from "@/components/restaurant-list-header";
import { FilterSection } from "@/components/filter-section";
import { AdBanner } from "@/components/ad-banner";
import { Category } from "@/lib/types/restaurant";
import { calculateDistance } from "@/lib/utils/location";

export default function Home() {
  const [selectedCategory, setSelectedCategory] = useState<Category>('전체');
  const [selectedTags, setSelectedTags] = useState<string[]>([]);
  const [locationEnabled, setLocationEnabled] = useState(false);
  const [userLocation, setUserLocation] = useState<{ lat: number; lng: number } | null>(null);

  const handleLocationToggle = (enabled: boolean, location?: { lat: number; lng: number }) => {
    setLocationEnabled(enabled);
    if (enabled && location) {
      setUserLocation(location);
    } else {
      setUserLocation(null);
    }
  };

  // 필터링 로직
  let filteredRestaurants = mockRestaurants;

  // 1. 카테고리 필터
  if (selectedCategory !== '전체') {
    filteredRestaurants = filteredRestaurants.filter(r => r.category === selectedCategory);
  }

  // 2. 태그 필터 (AND)
  if (selectedTags.length > 0) {
    filteredRestaurants = filteredRestaurants.filter(restaurant =>
      selectedTags.every(tag => restaurant.tags.includes(tag))
    );
  }

  // 3. 위치 기반 정렬
  if (locationEnabled && userLocation) {
    filteredRestaurants = filteredRestaurants
      .map(restaurant => ({
        ...restaurant,
        distance: calculateDistance(
          userLocation.lat,
          userLocation.lng,
          restaurant.lat,
          restaurant.lng
        ),
      }))
      .sort((a, b) => (a.distance || 0) - (b.distance || 0));
  }

  const handleSelectRestaurant = (id: string) => {
    // TODO: Epic 3에서 상세 페이지 라우팅 구현
    console.log('Selected:', id);
  };

  return (
    <div className="min-h-screen bg-gray-50 pb-24 md:pb-0">
      <RestaurantListHeader />
      <FilterSection
        selectedCategory={selectedCategory}
        onCategoryChange={setSelectedCategory}
        selectedTags={selectedTags}
        onTagsChange={setSelectedTags}
        locationEnabled={locationEnabled}
        onLocationToggle={handleLocationToggle}
      />

      <main className="max-w-7xl mx-auto p-4 md:p-6 lg:p-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {filteredRestaurants.length === 0 ? (
            <div className="col-span-full py-16 text-center">
              <p className="text-gray-500 text-lg mb-2">조건에 맞는 식당이 없습니다</p>
              <p className="text-gray-400 text-sm">필터를 조정해보세요</p>
            </div>
          ) : (
            filteredRestaurants.map(restaurant => (
              <RestaurantCard
                key={restaurant.id}
                restaurant={restaurant}
                onSelectRestaurant={handleSelectRestaurant}
              />
            ))
          )}
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
- Primary: `bg-primary` (브랜드 블루 #4D77FF)
- 선택된 태그: `bg-primary/10 text-primary border-primary`
- 위치 토글 ON: `bg-primary`

### 애니메이션
- 카드 hover: `hover:-translate-y-1 transition-all duration-300`
- 필터 클릭: `active:scale-95 transition-transform`
- 토글 스위치: `transition-transform duration-200`

### 간격
- 필터 섹션 간격: `py-3`
- 필터 칩 간격: `gap-2`

---

## ✅ Definition of Done

### 필수 (P0)
- [ ] 헤더에 로고 이미지 표시 (텍스트 왼쪽)
- [ ] 링크 복사 버튼 제거됨
- [ ] 카테고리 필터 UI 개선 (브랜드 컬러 적용)
- [ ] 태그 필터 구현 (멀티 선택, AND 조건)
- [ ] 위치 기반 필터 토글 구현 (Geolocation API)
- [ ] 위치 권한 요청 및 거부 처리
- [ ] 거리 계산 정확함 (Haversine Formula)
- [ ] 3단계 필터링 로직 동작 (카테고리 → 태그 → 위치)
- [ ] Mock 데이터에 lat, lng 좌표 추가
- [ ] 필터링 결과 0개일 때 Empty State 표시
- [ ] TypeScript 컴파일 에러 없음
- [ ] `npm run build` 성공

### UI/UX (P1)
- [ ] 카드 hover 효과 강화 (translate + shadow)
- [ ] 필터 칩 애니메이션 (scale)
- [ ] 위치 로딩 중 스피너 표시
- [ ] 토글 스위치 부드러운 transition

### 선택사항 (P2)
- [ ] 거리 뱃지 각 카드에 표시
- [ ] 필터 초기화 버튼
- [ ] 스켈레톤 로딩 UI

---

## ⚠️ 주의사항

### 1. 위치 권한 처리
- **HTTPS 필수**: Geolocation API는 HTTPS에서만 동작 (localhost는 예외)
- 권한 거부 시 적절한 메시지 표시
- 위치 정보 로딩 중 UI 블록 방지 (스피너만 표시)

### 2. 좌표 데이터
- Mock 데이터에 실제 좌표 필요 (고려대 인근)
- 네이버 지도 또는 카카오맵에서 좌표 확인 가능
- 대략적 좌표도 괜찮음 (테스트용)

### 3. 필터링 성능
- 태그 필터: `Array.prototype.every()` 사용 (효율적)
- 위치 정렬: 거리 계산 후 캐싱 권장 (재계산 방지)

### 4. 태그 추출
- Mock 데이터에서 자동으로 모든 태그 추출
- 중복 제거: `Array.from(new Set(...))`
- 또는 하드코딩된 태그 리스트 사용

### 5. sticky 헤더 고려
- 헤더: `top-0`
- 필터 섹션: `top-[57px]` (헤더 높이만큼 아래)
- z-index 관리: 헤더 z-10, 필터 z-10

### 6. 모바일 최적화
- 필터 칩 가로 스크롤: `overflow-x-auto scrollbar-hide`
- 토글 스위치 터치 영역 충분히 확보 (최소 44x44px)

### 7. 클라이언트 컴포넌트
- 모든 필터 컴포넌트: `'use client'` 필수 (useState, 이벤트 핸들러)
- Geolocation API는 클라이언트 사이드만 가능

---

## 🚀 개발 시작 전 체크리스트

- [ ] Geolocation API 사용법 숙지
- [ ] Haversine Formula 이해 (거리 계산)
- [ ] 고려대 인근 좌표 확인 (lat: 37.58~, lng: 127.02~)
- [ ] 명세서 내용 이해 완료
- [ ] 질문 사항 없음

---

## 📝 참고 자료

- [Geolocation API - MDN](https://developer.mozilla.org/en-US/docs/Web/API/Geolocation_API)
- [Haversine Formula](https://en.wikipedia.org/wiki/Haversine_formula)
- [고려대학교 좌표](https://map.naver.com/p/entry/place/11591630) (네이버 지도)
- [Lucide Icons - Check, MapPin, Loader2](https://lucide.dev/)

---

**다음 Epic**: Epic 3 - 식당 상세 페이지 (전화하기, 지도 보기 버튼)
