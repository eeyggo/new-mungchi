# 뭉치 디자인 시스템 - 레트로 모더니즘

## 디자인 철학

**레트로 모더니즘 for 뭉치**
- 따뜻한 파스텔/크림 배경 위에 #4D77FF가 주인공으로 등장
- 넉넉한 여백, 둥근 모서리 (20-28px), 패널 기반 섹션
- 에디토리얼 e-commerce 레이아웃과 소프트 섀도우
- 키컬러 #4D77FF가 모든 CTA, 링크, 활성 상태를 지배

---

## 컬러 토큰

### Primary (브랜드 키컬러)
| 토큰 | 값 | 용도 |
|------|-----|------|
| `--primary` | `#4D77FF` (HSL: 221 100% 65%) | 메인 CTA, 링크, 활성 상태 |
| `--primary-hover` | `#3B63F5` (HSL: 221 100% 60%) | 호버 상태 |
| `--primary-soft` | `rgba(77,119,255,0.12)` | 배지, 칩 배경 |
| `--primary-foreground` | `#FFFFFF` | 프라이머리 위의 텍스트 |

### Background (배경)
| 토큰 | 값 | 용도 |
|------|-----|------|
| `--background` | `#FFF6E8` (HSL: 39 100% 96%) | 메인 배경 (따뜻한 크림) |
| `--background-alt` | `#FAF1E3` (HSL: 39 71% 95%) | 보조 배경 (아이보리) |
| `--foreground` | `#3D2F1F` (HSL: 25 20% 20%) | 본문 텍스트 (딥 브라운) |

### Surface (카드/패널)
| 토큰 | 값 | 용도 |
|------|-----|------|
| `--card` | `#FFFFFF` | 카드 배경 |
| `--card-foreground` | `#3D2F1F` | 카드 내 텍스트 |

### Border
| 토큰 | 값 | 용도 |
|------|-----|------|
| `--border` | `#E8D7C7` (HSL: 30 30% 88%) | 따뜻한 베이지 보더 |
| `--input` | `#E8D7C7` | 인풋 보더 |

### Muted (보조)
| 토큰 | 값 | 용도 |
|------|-----|------|
| `--muted` | `#F5EFE8` (HSL: 39 40% 92%) | 비활성 배경 |
| `--muted-foreground` | `#7A6F5F` (HSL: 25 10% 50%) | 보조 텍스트 |

### Accent (강조)
| 토큰 | 값 | 용도 |
|------|-----|------|
| `--accent` | `#F9F3EC` (HSL: 39 60% 94%) | 약한 강조 배경 |
| `--accent-foreground` | `#3D2F1F` | 강조 영역 텍스트 |

---

## 타이포그래피 토큰

### 폰트 패밀리
| 토큰 | 값 | 용도 |
|------|-----|------|
| Heading | `'Playfair Display', serif` | 제목, 헤딩 (h1-h6) |
| Body | `'Pretendard', sans-serif` | 본문, UI 텍스트 |

### 폰트 크기
| 레벨 | 데스크톱 | 모바일 | 용도 |
|------|----------|--------|------|
| h1 | 3rem (48px) | 2.5rem (40px) | 페이지 메인 타이틀 |
| h2 | 1.875rem (30px) | 1.5rem (24px) | 섹션 헤딩 |
| h3 | 1.5rem (24px) | 1.25rem (20px) | 서브 헤딩 |
| Body | 1rem (16px) | 1rem (16px) | 본문 텍스트 |
| Small | 0.875rem (14px) | 0.875rem (14px) | 캡션, 보조 텍스트 |

### 폰트 웨이트
| 레벨 | 값 | 용도 |
|------|-----|------|
| Regular | 400 | 본문 |
| Medium | 500 | 강조 텍스트 |
| Semibold | 600 | 버튼, 라벨 |
| Bold | 700 | 헤딩 |

---

## 반경(Radius) 토큰

| 토큰 | 값 | 용도 |
|------|-----|------|
| `--radius` | 1.25rem (20px) | 기본 라운드 |
| `--radius-lg` | 1.75rem (28px) | 큰 패널 |
| `--radius-md` | 1rem (16px) | 중간 요소 |
| `--radius-sm` | 0.75rem (12px) | 작은 요소 |
| Pill | `9999px` | 필터, 배지 (완전 라운드) |

---

## 섀도우 토큰

| 토큰 | 값 | 용도 |
|------|-----|------|
| `--shadow-soft` | `0 2px 8px rgba(77,119,255,0.08)` | 기본 카드 |
| `--shadow-medium` | `0 4px 16px rgba(77,119,255,0.12)` | 호버 카드 |
| `--shadow-strong` | `0 8px 24px rgba(77,119,255,0.16)` | 모달, 드로어 |

---

## 간격(Spacing) 시스템

Tailwind 기본 스페이싱 사용:
- `4px` (1) - 최소 간격
- `8px` (2) - 작은 간격
- `12px` (3) - 기본 내부 간격
- `16px` (4) - 기본 간격
- `24px` (6) - 섹션 간격
- `32px` (8) - 큰 섹션 간격
- `48px` (12) - 메이저 섹션 간격

---

## 컴포넌트 스펙

### Button
```css
.pill {
  border-radius: 9999px;
  padding: 0.5rem 1rem; /* 8px 16px */
  font-weight: 500;
  transition: all 300ms;
}

.pill-sm {
  border-radius: 9999px;
  padding: 0.375rem 0.75rem; /* 6px 12px */
  font-size: 0.875rem;
  font-weight: 500;
}
```

**States:**
- Default: `bg-card`, `border-border`, `text-foreground`
- Primary: `bg-brand`, `text-primary-foreground`
- Hover: `shadow-retro-md`, `scale-105`

### Card
```css
.card {
  background: var(--card);
  border-radius: 20px;
  border: 1px solid var(--border);
  box-shadow: var(--shadow-soft);
  transition: all 300ms;
}

.card:hover {
  box-shadow: var(--shadow-medium);
  transform: translateY(-4px);
}
```

### Chip (Badge)
```css
.chip {
  border-radius: 9999px;
  padding: 0.375rem 0.75rem;
  font-size: 0.75rem;
  font-weight: 600;
}

.chip-primary {
  background: var(--primary-soft);
  color: var(--primary);
  border: 1px solid rgba(77,119,255,0.2);
}

.chip-neutral {
  background: var(--accent);
  color: var(--accent-foreground);
  border: 1px solid var(--border);
}
```

### Panel
```css
.panel {
  background: var(--card);
  border-radius: var(--radius-lg); /* 28px */
  padding: 2rem; /* 32px */
  box-shadow: var(--shadow-soft);
  border: 1px solid var(--border);
}

.panel-soft {
  background: rgba(var(--accent), 0.5);
  border-radius: var(--radius-lg);
  padding: 2rem;
  border: 1px solid rgba(var(--border), 0.5);
}
```

### Filter Bar
- Horizontal scroll container
- Pill-shaped buttons
- Active state: `bg-brand`, `text-primary-foreground`
- Inactive state: `bg-card`, `border-border`

---

## 애니메이션

### Hover Lift
```css
.hover-lift {
  transition: all 300ms cubic-bezier(0.23, 0.88, 0.26, 0.92);
}

.hover-lift:hover {
  transform: translateY(-4px);
  box-shadow: var(--shadow-medium);
}
```

### Ticker (광고 배너)
```css
@keyframes ticker {
  0% { transform: translateX(0); }
  100% { transform: translateX(-50%); }
}

.animate-ticker {
  animation: ticker 18s linear infinite;
}
```

---

## 반응형 브레이크포인트

| 브레이크포인트 | 값 | 용도 |
|----------------|-----|------|
| Mobile | < 768px | 모바일 |
| Tablet | 768px - 1024px | 태블릿 |
| Desktop | > 1024px | 데스크톱 |

---

## 사용 가이드라인

### 키컬러 사용 규칙
1. **모든 CTA 버튼**은 반드시 `bg-brand` 사용
2. **선택/활성 상태**는 `bg-brand` + `text-primary-foreground`
3. **링크**는 `text-brand` + `hover:underline`
4. **배지/칩 (카테고리)**는 `bg-brand-soft` + `text-brand`

### 금지 사항
- 레드/코랄을 메인 CTA로 사용 금지 (키컬러와 경쟁)
- 과한 장식 (네온, 글래스모피즘, 복잡한 그라데이션) 금지
- 본문 대비를 약하게 만들지 말 것 (가독성 우선)
- 센터 정렬 과다 사용 금지 (비대칭 레이아웃 선호)

---

## 구현 파일

- `app/globals.css` - 전역 디자인 토큰 및 유틸리티
- `components/restaurant-card.tsx` - 카드 컴포넌트
- `components/category-chips.tsx` - 필터 칩
- `components/restaurant-list-header.tsx` - 헤더
- `components/ad-banner.tsx` - 광고 배너
