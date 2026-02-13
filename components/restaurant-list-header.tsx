'use client';

import Image from 'next/image';
import { useEffect, useRef } from 'react';

function lerp(a: number, b: number, t: number) {
    return a + (b - a) * t;
}

const HERO_HEIGHT = 164;
const HEADER_HEIGHT = 56;
const SCROLL_RANGE = 130;

export function RestaurantListHeader() {
    const headerRef = useRef<HTMLElement>(null);
    const logoRef = useRef<HTMLDivElement>(null);
    const titleRef = useRef<HTMLHeadingElement>(null);
    const taglineRef = useRef<HTMLParagraphElement>(null);

    useEffect(() => {
        // 타이틀 너비를 마운트 시 한 번만 측정 (매 프레임 layout trigger 방지)
        const titleNaturalWidth = titleRef.current?.offsetWidth ?? 44;
        const finalTitleVisual = titleNaturalWidth * 0.82;
        const logoFinalVisual = 32; // 64 * 0.5
        const gap = 8;

        // 최종 좌측 정렬 상태의 시각적 중심 (px, padding box 기준)
        const logoCx = logoFinalVisual / 2; // 16
        const titleCx = logoFinalVisual + gap + finalTitleVisual / 2;

        // 그룹 중심 (좌측 정렬 기준)
        const groupCx = (logoFinalVisual + gap + finalTitleVisual) / 2;

        // 중앙 배치 시 50%로부터의 오프셋
        const logoCenteredPx = logoCx - groupCx;   // 음수: 로고는 그룹 중심 왼쪽
        const titleCenteredPx = titleCx - groupCx;  // 양수: 타이틀은 그룹 중심 오른쪽

        let ticking = false;

        const update = () => {
            const scrollY = window.scrollY;
            const progress = Math.min(Math.max(scrollY / SCROLL_RANGE, 0), 1);

            // 2단계 모션 분리
            // Phase 1 (0~0.4): 로고+타이틀이 최종 크기·배치로 중앙에 모임 + 문구 페이드아웃
            // Phase 2 (0.4~1): 중앙에 모인 그룹이 통째로 좌측으로 슬라이드
            const phase1 = Math.min(progress / 0.4, 1);
            const phase2 = Math.min(Math.max((progress - 0.4) / 0.6, 0), 1);

            // 1. Header Container
            if (headerRef.current) {
                const height = lerp(HERO_HEIGHT, HEADER_HEIGHT, progress);
                headerRef.current.style.height = `${height}px`;
                headerRef.current.style.backgroundColor = `rgba(255, 255, 255, ${lerp(1, 0.85, progress)})`;
                headerRef.current.style.borderBottom = `1px solid rgba(229, 231, 235, ${progress})`;

                const blur = progress > 0.05 ? `blur(${lerp(0, 12, progress)}px)` : 'none';
                headerRef.current.style.backdropFilter = blur;
                (headerRef.current.style as any).webkitBackdropFilter = blur;
            }

            // 2. Logo (left, top = 시각적 중심)
            // Phase 1: 초기 위치 → 최종 크기로 축소 + 중앙 그룹 배치로 이동
            // Phase 2: 중앙 그룹 → 좌측 최종 위치로 수평 슬라이드
            if (logoRef.current) {
                const scale = lerp(1, 0.5, phase1); // Phase 1에서 최종 크기 도달
                const top = phase2 === 0
                    ? lerp(20 + 32, HEADER_HEIGHT / 2, phase1)
                    : HEADER_HEIGHT / 2;
                const leftPct = lerp(50, 0, phase2);
                const leftPx = phase2 === 0
                    ? lerp(0, logoCenteredPx, phase1)
                    : lerp(logoCenteredPx, logoCx, phase2);

                logoRef.current.style.left = `calc(${leftPct}% + ${leftPx}px)`;
                logoRef.current.style.top = `${top}px`;
                logoRef.current.style.transform = `translate(-50%, -50%) scale(${scale})`;
                logoRef.current.style.transformOrigin = 'center center';
                logoRef.current.style.borderRadius = `${lerp(10, 6, progress)}px`;
            }

            // 3. Title (left, top = 시각적 중심)
            // Phase 1: 로고 아래 → 최종 스케일로 축소 + 로고 옆 중앙 그룹 배치로 이동
            // Phase 2: 중앙 그룹 → 좌측 최종 위치로 수평 슬라이드
            if (titleRef.current) {
                const scale = lerp(1, 0.82, phase1); // Phase 1에서 최종 크기 도달
                const top = phase2 === 0
                    ? lerp(20 + 64 + 12, HEADER_HEIGHT / 2, phase1)
                    : HEADER_HEIGHT / 2;
                const leftPct = lerp(50, 0, phase2);
                const leftPx = phase2 === 0
                    ? lerp(0, titleCenteredPx, phase1)
                    : lerp(titleCenteredPx, titleCx, phase2);

                titleRef.current.style.left = `calc(${leftPct}% + ${leftPx}px)`;
                titleRef.current.style.top = `${top}px`;
                titleRef.current.style.transform = `translate(-50%, -50%) scale(${scale})`;
                titleRef.current.style.transformOrigin = 'center center';
            }

            // 4. Tagline - Phase 1 초반에 빠르게 사라짐
            if (taglineRef.current) {
                const fadeProgress = Math.min(phase1 * 2, 1);
                taglineRef.current.style.opacity = `${1 - fadeProgress}`;
                taglineRef.current.style.transform = `translate(-50%, ${lerp(0, -8, fadeProgress)}px)`;
                taglineRef.current.style.pointerEvents = fadeProgress > 0.9 ? 'none' : 'auto';
            }

            ticking = false;
        };

        const onScroll = () => {
            if (!ticking) {
                window.requestAnimationFrame(update);
                ticking = true;
            }
        };

        window.addEventListener('scroll', onScroll, { passive: true });
        update();

        return () => window.removeEventListener('scroll', onScroll);
    }, []);

    return (
        <>
            <header
                ref={headerRef}
                className="sticky top-0 z-50 w-full overflow-hidden will-change-[height,background-color]"
                style={{ height: HERO_HEIGHT }}
            >
                <div className="relative max-w-7xl mx-auto px-4 md:px-6 lg:px-8 h-full">
                    {/* Logo */}
                    <div
                        ref={logoRef}
                        className="absolute will-change-transform"
                        style={{
                            left: '50%',
                            top: '52px',
                            width: '64px',
                            height: '64px',
                            transform: 'translate(-50%, -50%)',
                        }}
                    >
                        <Image
                            src="/images/logo-blue.png"
                            alt="뭉치"
                            width={64}
                            height={64}
                            className="object-contain w-full h-full"
                            priority
                        />
                    </div>

                    {/* Title */}
                    <h1
                        ref={titleRef}
                        className="absolute font-extrabold tracking-tight text-gray-900 whitespace-nowrap text-[22px] will-change-transform"
                        style={{
                            left: '50%',
                            top: `${20 + 64 + 12}px`,
                            transform: 'translate(-50%, -50%)',
                        }}
                    >
                        뭉치
                    </h1>

                    {/* Tagline */}
                    <p
                        ref={taglineRef}
                        className="absolute text-sm text-gray-500 whitespace-nowrap left-1/2 will-change-[opacity,transform]"
                        style={{
                            top: `${20 + 64 + 12 + 26}px`,
                            transform: 'translateX(-50%)',
                        }}
                    >
                        단체주문이 가능한 식당을 확인해보세요!
                    </p>
                </div>
            </header>

            {/* Spacer */}
            <div style={{ height: 16 }} />
        </>
    );
}
