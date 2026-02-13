# 뭉치 70년대 레트로 그래픽 디자인 시스템

## 디자인 철학

1970년대 레트로 그래픽 디자인을 현대적으로 재해석하여 뭉치 브랜드 키컬러 #4D77FF와 조화롭게 결합했습니다.

### 핵심 원칙
- **대담한 타이포그래피**: 버블 레터, 두꺼운 아웃라인
- **플랫 컬러**: 그라데이션 최소화, 순수한 색상 블록
- **기하학적 요소**: 원, 사각형, 삼각형, 체크무늬 패턴
- **두꺼운 테두리**: 4px 이상의 굵은 보더
- **플랫 섀도우**: 3D 효과 대신 오프셋 섀도우
- **카탈로그 스타일**: 번호 매김, 정돈된 레이아웃

---

## 색상 시스템 (Color Tokens)

### Primary Colors

| Token | Value | HSL | 용도 |
|-------|-------|-----|------|
| `--primary` | #4D77FF | `221 100% 65%` | 브랜드 메인 컬러, 로고, CTA 버튼, 활성 상태 |
| `--primary-dark` | #3B63F5 | `221 100% 55%` | 버튼 호버, 두꺼운 테두리 |
| `--primary-foreground` | #FFFFFF | `0 0% 100%` | Primary 배경 위 텍스트 |

### Retro Palette

| Token | Value | HSL | 용도 |
|-------|-------|-----|------|
| `--retro-orange` | #D96846 | `14 85% 55%` | 테라코타/번트 오렌지, 액센트, 배지 |
| `--retro-yellow` | #F2C94C | `45 95% 60%` | 머스타드 옐로우, CTA 패널, 강조 |
| `--retro-red` | #C54632 | `8 75% 50%` | 레트로 레드, 장식 요소 |
| `--retro-brown` | #4A3829 | `25 35% 30%` | 딥 브라운, 본문 텍스트, 테두리 |

### Background & Surface

| Token | Value | HSL | 용도 |
|-------|-------|-----|------|
| `--background` | #DCC9B0 | `39 45% 85%` | 따뜻한 베이지/탄 배경 |
| `--background-light` | #F0E6D8 | `39 50% 92%` | 밝은 베이지, 카드 배경 |
| `--card` | #F5F0E8 | `39 40% 95%` | 라이트 크림, 카드 서피스 |
| `--foreground` | #3D2F23 | `25 35% 20%` | 딥 브라운, 메인 텍스트 |

### Borders

| Token | Value | 용도 |
|-------|-------|------|
| `--border` | `hsl(25 35% 30%)` | 딥 브라운 테두리 |
| `--border-thick` | `4px` | 두꺼운 테두리 너비 |

---

## 타이포그래피 (Typography Tokens)

### Font Families

```css
/* Headings - Bold Bubble Typography */
font-family: 'Fredoka', sans-serif;

/* Body - Clean Sans-serif */
font-family: 'Pretendard', -apple-system, BlinkMacSystemFont, system-ui, sans-serif;
```

### Font Sizes & Weights

| Element | Size (Desktop) | Size (Mobile) | Weight | Line Height |
|---------|---------------|---------------|--------|-------------|
| H1 (Hero) | 96px (7xl) | 80px (5xl) | 700 (Bold) | 1.0 |
| H2 (Section) | 80px (5xl) | 48px (3xl) | 700 (Bold) | 1.1 |
| H3 (Card Title) | 48px (3xl) | 32px (2xl) | 700 (Bold) | 1.2 |
| Body Large | 24px (xl) | 18px (lg) | 500 (Medium) | 1.6 |
| Body | 16px (base) | 14px (sm) | 400 (Regular) | 1.6 |
| Caption | 14px (sm) | 12px (xs) | 600 (Semibold) | 1.4 |

### Typography Utilities

```css
/* Bubble text effect (outlined letters) */
.bubble-text {
  text-shadow: 
    3px 3px 0px hsl(var(--border)),
    -1px -1px 0px hsl(var(--border)),
    1px -1px 0px hsl(var(--border)),
    -1px 1px 0px hsl(var(--border)),
    1px 1px 0px hsl(var(--border));
}

/* Uppercase for emphasis */
text-transform: uppercase;
letter-spacing: 0.05em;
```

---

## Border Radius (Radius Tokens)

| Token | Value | 용도 |
|-------|-------|------|
| `--radius-sm` | 12px | 작은 요소 (배지, 칩) |
| `--radius-md` | 16px | 중간 요소 (버튼) |
| `--radius` | 24px | 기본 (카드) |
| `--radius-lg` | 32px | 큰 패널 (CTA 섹션) |
| `--radius-full` | 9999px | Pill 버튼, 원형 아이콘 |

---

## Shadows (Shadow Tokens)

70년대 스타일의 **플랫 섀도우** (오프셋 섀도우) 사용

```css
/* Flat shadow - 기본 */
--shadow-flat: 4px 4px 0px hsl(var(--border));

/* Flat shadow - 강조 */
--shadow-flat-lg: 6px 6px 0px hsl(var(--border));
```

### Shadow Utilities

```css
.shadow-flat {
  box-shadow: var(--shadow-flat);
}

.shadow-flat-lg {
  box-shadow: var(--shadow-flat-lg);
}
```

---

## Spacing System

| Token | Value | 용도 |
|-------|-------|------|
| `spacing-xs` | 8px | 최소 간격 |
| `spacing-sm` | 12px | 작은 간격 |
| `spacing-md` | 16px | 중간 간격 |
| `spacing-lg` | 24px | 큰 간격 |
| `spacing-xl` | 32px | 섹션 간격 |
| `spacing-2xl` | 48px | 메이저 섹션 |
| `spacing-3xl` | 64px | 히어로 섹션 |

---

## 컴포넌트 스펙 (Component Specs)

### Button (Pill Style)

**Primary Button**
```css
.pill-retro {
  background: hsl(var(--primary));
  color: hsl(var(--primary-foreground));
  border: 4px solid hsl(var(--border));
  border-radius: 9999px;
  padding: 12px 24px;
  font-weight: 700;
  text-transform: uppercase;
  letter-spacing: 0.05em;
  box-shadow: 4px 4px 0px hsl(var(--border));
}

.pill-retro:hover {
  transform: translate(-2px, -2px);
  box-shadow: 6px 6px 0px hsl(var(--border));
}
```

**Small Pill Button**
```css
.pill-retro-sm {
  padding: 8px 16px;
  font-size: 14px;
  border: 2px solid hsl(var(--border));
}
```

---

### Card (Restaurant Card)

**구조**
- 두꺼운 브라운 테두리 (4px)
- 플랫 섀도우
- 왼쪽: 원형 아이콘 (128px)
- 오른쪽: 정보 (이름, 주소, 칩, 배지)
- 우측 하단: 카탈로그 번호 배지

```css
.card-retro {
  background: hsl(var(--card));
  border: 4px solid hsl(var(--border));
  border-radius: 24px;
  padding: 24px;
  box-shadow: 4px 4px 0px hsl(var(--border));
}

.icon-circle {
  width: 128px;
  height: 128px;
  border-radius: 50%;
  background: hsl(var(--primary));
  border: 4px solid hsl(var(--border));
  box-shadow: 4px 4px 0px hsl(var(--border));
}

.badge-number {
  width: 32px;
  height: 32px;
  border-radius: 50%;
  background: hsl(var(--foreground));
  color: hsl(var(--background));
  border: 2px solid hsl(var(--foreground));
  font-weight: 700;
}
```

---

### Chip (Category/Tag)

```css
.pill-retro-sm {
  background: hsl(var(--primary));
  color: hsl(var(--primary-foreground));
  border: 2px solid hsl(var(--border));
  border-radius: 9999px;
  padding: 8px 16px;
  font-size: 14px;
  font-weight: 700;
  text-transform: uppercase;
  letter-spacing: 0.05em;
}
```

---

### Filter Bar

- Pill 버튼 스타일
- 선택 상태: Primary 배경
- 미선택 상태: Card 배경 + 브라운 테두리
- 활성 필터 개수: 번호 배지

---

### CTA Panel

**구조**
- 배경: Retro Yellow (#F2C94C)
- 두꺼운 브라운 테두리 (4px)
- 큰 플랫 섀도우 (6px)
- 장식: 기하학적 도형 (원, 사각형)

```css
.cta-panel {
  background: hsl(var(--retro-yellow));
  border: 4px solid hsl(var(--border));
  border-radius: 32px;
  padding: 48px;
  box-shadow: 6px 6px 0px hsl(var(--border));
  position: relative;
  overflow: hidden;
}
```

---

### Header

**구조**
- 고정 헤더 (sticky)
- 하단 두꺼운 테두리 (4px)
- 중앙 정렬: 로고 + 타이틀
- 장식: 좌우 기하학적 도형 (원, 삼각형)
- 하단: 장식 라인 (원 + 라인 조합)

```css
header {
  border-bottom: 4px solid hsl(var(--border));
  box-shadow: 4px 4px 0px hsl(var(--border));
}

/* Logo */
.logo {
  width: 64px;
  height: 64px;
  background: hsl(var(--primary));
  border: 4px solid hsl(var(--border));
  border-radius: 16px;
  box-shadow: 4px 4px 0px hsl(var(--border));
}

/* Title - Bubble Typography */
h1 {
  font-size: 64px;
  font-weight: 700;
  color: hsl(var(--primary));
  text-shadow: 3px 3px 0px hsl(var(--border));
}
```

---

### Footer / Ad Banner

**모바일**
- 하단 고정 (fixed bottom)
- 배경: Retro Yellow
- 상단 두꺼운 테두리 (4px)
- 티커 애니메이션

**데스크톱**
- 큰 패널 스타일
- 배경: Retro Yellow
- 두꺼운 테두리 + 큰 플랫 섀도우
- 장식: 코너 기하학적 도형

```css
/* Mobile */
.ad-banner-mobile {
  background: hsl(var(--retro-yellow));
  border-top: 4px solid hsl(var(--border));
}

/* Desktop */
.ad-banner-desktop {
  background: hsl(var(--retro-yellow));
  border: 4px solid hsl(var(--border));
  border-radius: 32px;
  box-shadow: 6px 6px 0px hsl(var(--border));
}
```

---

## 패턴 & 텍스처 (Patterns & Textures)

### Checkered Border

```css
.checkered-border {
  background-image: 
    repeating-linear-gradient(
      0deg,
      hsl(var(--primary)) 0px,
      hsl(var(--primary)) 20px,
      hsl(var(--retro-yellow)) 20px,
      hsl(var(--retro-yellow)) 40px
    );
  height: 16px;
}
```

### Diagonal Stripes

```css
.diagonal-stripes {
  background-image: repeating-linear-gradient(
    45deg,
    transparent,
    transparent 10px,
    rgba(0,0,0,0.05) 10px,
    rgba(0,0,0,0.05) 20px
  );
}
```

### Halftone Dots

```css
.halftone-dots {
  background-image: radial-gradient(
    circle, 
    rgba(0,0,0,0.08) 1px, 
    transparent 1px
  );
  background-size: 8px 8px;
}
```

---

## 애니메이션 (Animations)

### Hover Effect (Retro Lift)

```css
.hover-retro {
  transition: all 0.2s ease;
}

.hover-retro:hover {
  transform: translate(-2px, -2px);
  box-shadow: 6px 6px 0px hsl(var(--border));
}
```

### Ticker Animation

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

## 사용 예시 (Usage Examples)

### Primary CTA Button

```jsx
<button className="pill-retro bg-primary text-primary-foreground hover-retro">
  파트너 등록하기
</button>
```

### Category Chip

```jsx
<span className="pill-retro-sm bg-primary text-primary-foreground">
  한식
</span>
```

### Restaurant Card

```jsx
<div className="card-retro hover-retro">
  <div className="icon-circle">
    {/* Icon content */}
  </div>
  <div>
    <h3 className="text-2xl font-bold text-retro-brown">
      본죽&비빔밥
    </h3>
    {/* Other content */}
  </div>
  <div className="badge-number">1</div>
</div>
```

---

## 접근성 (Accessibility)

### 색상 대비

- Primary Blue (#4D77FF) on White: **AAA** (11.2:1)
- Retro Brown (#4A3829) on Beige (#DCC9B0): **AA** (4.8:1)
- Primary Blue (#4D77FF) on Yellow (#F2C94C): **AA** (4.2:1)

### 포커스 상태

```css
button:focus-visible {
  outline: 3px solid hsl(var(--primary));
  outline-offset: 2px;
}
```

---

## 반응형 (Responsive)

### Breakpoints

- Mobile: < 768px
- Tablet: 768px - 1024px
- Desktop: > 1024px

### 주요 조정사항

- **타이포그래피**: 모바일에서 폰트 크기 축소
- **카드 레이아웃**: 모바일에서 세로 스택, 데스크톱에서 가로 배치
- **아이콘 크기**: 모바일 96px, 데스크톱 128px
- **패딩/마진**: 모바일에서 간격 축소

---

## 브랜드 가이드라인

### Do's ✅

- 키컬러 #4D77FF를 모든 CTA와 활성 상태에 사용
- 두꺼운 테두리 (4px)와 플랫 섀도우 유지
- 대담한 타이포그래피와 대문자 사용
- 기하학적 장식 요소 활용
- 번호 매김과 카탈로그 스타일 유지

### Don'ts ❌

- 그라데이션 과다 사용 금지
- 3D 효과나 드롭 섀도우 사용 금지
- 얇은 테두리 (< 2px) 사용 금지
- 복잡한 패턴이나 텍스처 과다 사용 금지
- 키컬러와 경쟁하는 강렬한 색상 사용 금지

---

**마지막 업데이트**: 2026-02-14
**디자인 시스템 버전**: 2.0 (70s Retro)
