/*
  Design: Retro Modernism Header
  - Warm cream background with brand blue accent
  - Smooth scroll animation with backdrop blur
  - Brand logo + title with serif font
  - Tagline with warm color palette
*/

'use client';

import Image from 'next/image';
import { useEffect, useRef } from 'react';

function lerp(a: number, b: number, t: number) {
    return a + (b - a) * t;
}

const HERO_HEIGHT = 180;
const HEADER_HEIGHT = 64;
const SCROLL_RANGE = 140;

export function RestaurantListHeader() {
    const headerRef = useRef<HTMLElement>(null);
    const logoRef = useRef<HTMLDivElement>(null);
    const titleRef = useRef<HTMLHeadingElement>(null);
    const taglineRef = useRef<HTMLParagraphElement>(null);

    useEffect(() => {
        const titleNaturalWidth = titleRef.current?.offsetWidth ?? 44;
        const finalTitleVisual = titleNaturalWidth * 0.85;
        const logoFinalVisual = 36;
        const gap = 10;

        const logoCx = logoFinalVisual / 2;
        const titleCx = logoFinalVisual + gap + finalTitleVisual / 2;
        const groupCx = (logoFinalVisual + gap + finalTitleVisual) / 2;

        const logoCenteredPx = logoCx - groupCx;
        const titleCenteredPx = titleCx - groupCx;

        let ticking = false;

        const update = () => {
            const scrollY = window.scrollY;
            const progress = Math.min(Math.max(scrollY / SCROLL_RANGE, 0), 1);

            const phase1 = Math.min(progress / 0.4, 1);
            const phase2 = Math.min(Math.max((progress - 0.4) / 0.6, 0), 1);

            // Header Container with warm cream background
            if (headerRef.current) {
                const height = lerp(HERO_HEIGHT, HEADER_HEIGHT, progress);
                headerRef.current.style.height = `${height}px`;
                // Warm cream to slightly transparent
                const bgOpacity = lerp(1, 0.95, progress);
                headerRef.current.style.backgroundColor = `hsla(39, 100%, 96%, ${bgOpacity})`;
                headerRef.current.style.borderBottom = `1px solid hsla(30, 30%, 88%, ${progress})`;

                const blur = progress > 0.05 ? `blur(${lerp(0, 16, progress)}px)` : 'none';
                headerRef.current.style.backdropFilter = blur;
                (headerRef.current.style as any).webkitBackdropFilter = blur;
            }

            // Logo
            if (logoRef.current) {
                const scale = lerp(1, 0.56, phase1);
                const top = phase2 === 0
                    ? lerp(24 + 36, HEADER_HEIGHT / 2, phase1)
                    : HEADER_HEIGHT / 2;
                const leftPct = lerp(50, 0, phase2);
                const leftPx = phase2 === 0
                    ? lerp(0, logoCenteredPx, phase1)
                    : lerp(logoCenteredPx, logoCx, phase2);

                logoRef.current.style.left = `calc(${leftPct}% + ${leftPx}px)`;
                logoRef.current.style.top = `${top}px`;
                logoRef.current.style.transform = `translate(-50%, -50%) scale(${scale})`;
                logoRef.current.style.transformOrigin = 'center center';
                logoRef.current.style.borderRadius = `${lerp(12, 8, progress)}px`;
            }

            // Title with Playfair Display
            if (titleRef.current) {
                const scale = lerp(1, 0.85, phase1);
                const top = phase2 === 0
                    ? lerp(24 + 72 + 16, HEADER_HEIGHT / 2, phase1)
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

            // Tagline
            if (taglineRef.current) {
                const fadeProgress = Math.min(phase1 * 2.5, 1);
                taglineRef.current.style.opacity = `${1 - fadeProgress}`;
                taglineRef.current.style.transform = `translate(-50%, ${lerp(0, -10, fadeProgress)}px)`;
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
                className="sticky top-0 z-50 w-full overflow-hidden will-change-[height,background-color] shadow-retro"
                style={{ height: HERO_HEIGHT }}
            >
                <div className="relative max-w-7xl mx-auto px-4 md:px-6 lg:px-8 h-full">
                    {/* Logo with brand blue background */}
                    <div
                        ref={logoRef}
                        className="absolute will-change-transform bg-brand rounded-xl p-2 shadow-retro"
                        style={{
                            left: '50%',
                            top: '60px',
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

                    {/* Title with Playfair Display (serif) */}
                    <h1
                        ref={titleRef}
                        className="absolute font-bold tracking-tight text-foreground whitespace-nowrap text-[28px] will-change-transform"
                        style={{
                            fontFamily: 'Playfair Display, serif',
                            left: '50%',
                            top: `${24 + 72 + 16}px`,
                            transform: 'translate(-50%, -50%)',
                        }}
                    >
                        뭉치
                    </h1>

                    {/* Tagline with warm muted color */}
                    <p
                        ref={taglineRef}
                        className="absolute text-sm text-muted-foreground whitespace-nowrap left-1/2 will-change-[opacity,transform] font-medium"
                        style={{
                            top: `${24 + 72 + 16 + 32}px`,
                            transform: 'translateX(-50%)',
                        }}
                    >
                        단체주문이 가능한 식당을 확인해보세요!
                    </p>

                    {/* Brand accent line (subtle) */}
                    <div 
                        className="absolute bottom-0 left-1/2 -translate-x-1/2 h-0.5 bg-brand/20 transition-all duration-300"
                        style={{ width: '120px' }}
                    />
                </div>
            </header>

            {/* Spacer */}
            <div style={{ height: 20 }} />
        </>
    );
}
