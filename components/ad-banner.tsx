/*
  Design: 1970s Retro Ad Banner
  - Bold geometric frame
  - Ticker tape animation
  - Checkered border accent
  - Flat colors and thick borders
*/

'use client';

import { useState, useEffect } from 'react';

const AD_MESSAGES = [
    '오늘은 날이 참 좋네요! 산책 어때요?',
    '서울 사는 김혜영 씨, 생일 축하합니다! 🎉',
    '부산 사는 박철수 님, 취업 성공 축하드려요!',
    '나, 코딩하느라 고생 많으셨어요!',
    '박예은 화이팅',
    '윤진혁도 화이팅',
    '비 오는 날엔 파전에 막걸리 생각나지 않으세요?',
    '월요병 극복엔 맛있는 점심이 최고!',
    '지금 안 먹으면 후회할지도 몰라요.',
    '배고픈 소크라테스보단 배부른 돼지가 낫다.',
    '이 자리는 비어있습니다. (사장님들 연락주세요 📞)',
    '광고 아님, 그냥 빈 공간임.',
    '졸리고.. 배고프고..',
    '여기 뭐가 들어갈지 아직 못 정했어요.',
];

const SEPARATOR = '\u00A0\u00A0\u00A0\u00A0\u00A0\u00A0\u00A0\u00A0\u00A0\u00A0\u00A0\u00A0\u00A0\u00A0\u00A0\u00A0\u00A0\u00A0\u00A0\u00A0\u00A0\u00A0\u00A0\u00A0\u00A0\u00A0\u00A0\u00A0\u00A0\u00A0✦\u00A0\u00A0\u00A0\u00A0\u00A0\u00A0\u00A0\u00A0\u00A0\u00A0\u00A0\u00A0\u00A0\u00A0\u00A0\u00A0\u00A0\u00A0\u00A0\u00A0\u00A0\u00A0\u00A0\u00A0\u00A0\u00A0\u00A0\u00A0\u00A0\u00A0';

const STORAGE_KEY = 'ad-banner-shown';

function pickRandom(count: number) {
    let shown: number[] = [];
    try {
        const stored = localStorage.getItem(STORAGE_KEY);
        if (stored) shown = JSON.parse(stored);
    } catch {}

    let remaining = AD_MESSAGES.map((_, i) => i).filter((i) => !shown.includes(i));

    if (remaining.length < count) {
        shown = [];
        remaining = AD_MESSAGES.map((_, i) => i);
    }

    const shuffled = remaining.sort(() => Math.random() - 0.5);
    const picked = shuffled.slice(0, count);

    try {
        localStorage.setItem(STORAGE_KEY, JSON.stringify([...shown, ...picked]));
    } catch {}

    return picked.map((i) => AD_MESSAGES[i]);
}

function TickerTape({ messages, className }: { messages: string[]; className?: string }) {
    const tape = messages.join(SEPARATOR) + SEPARATOR;

    return (
        <div className="overflow-hidden whitespace-nowrap">
            <div className={`inline-block animate-ticker ${className ?? ''}`}>
                <span>{tape}</span>
                <span>{tape}</span>
            </div>
        </div>
    );
}

export function AdBanner() {
    const [messages, setMessages] = useState<string[]>([]);

    useEffect(() => {
        const count = 3;
        setMessages(pickRandom(count));
    }, []);

    if (messages.length === 0) return null;

    return (
        <>
            {/* Ticker animation */}
            <style jsx global>{`
                @keyframes ticker {
                    0% { transform: translateX(0); }
                    100% { transform: translateX(-50%); }
                }
                .animate-ticker {
                    animation: ticker 18s linear infinite;
                }
            `}</style>

            {/* Mobile Ad Banner - 70s Retro Style */}
            <div className="fixed bottom-0 left-0 right-0 md:hidden z-10 bg-retro-yellow border-t-4 border-[hsl(var(--border))]">
                <div className="h-16 flex flex-col justify-center px-4">
                    <TickerTape messages={messages} className="text-sm font-bold text-retro-brown" />
                    <p className="text-[10px] text-primary mt-0.5 text-center font-bold">광고 환영합니다 ✨</p>
                </div>
            </div>

            {/* Desktop Ad Banner - Bold Frame */}
            <div className="hidden md:block max-w-7xl mx-auto px-6 lg:px-8 pb-8 mt-8">
                <div className="bg-retro-yellow rounded-[var(--radius-lg)] p-6 border-thick-brown shadow-flat-lg relative overflow-hidden">
                    {/* Decorative corner shapes */}
                    <div className="absolute top-0 left-0 w-16 h-16 bg-primary rounded-br-full opacity-20" />
                    <div className="absolute bottom-0 right-0 w-16 h-16 bg-retro-orange rounded-tl-full opacity-20" />
                    
                    <div className="h-20 flex flex-col justify-center relative z-10">
                        <TickerTape messages={messages} className="text-xl font-bold text-retro-brown" />
                        <p className="text-sm text-primary mt-2 text-center font-bold">광고 환영합니다 ✨</p>
                    </div>
                </div>
            </div>
        </>
    );
}
