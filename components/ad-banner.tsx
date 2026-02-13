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
    // localStorage에서 이미 나왔던 인덱스 가져오기
    let shown: number[] = [];
    try {
        const stored = localStorage.getItem(STORAGE_KEY);
        if (stored) shown = JSON.parse(stored);
    } catch {}

    // 아직 안 나온 문구들
    let remaining = AD_MESSAGES.map((_, i) => i).filter((i) => !shown.includes(i));

    // 남은 게 부족하면 리셋
    if (remaining.length < count) {
        shown = [];
        remaining = AD_MESSAGES.map((_, i) => i);
    }

    // 셔플 후 count개 뽑기
    const shuffled = remaining.sort(() => Math.random() - 0.5);
    const picked = shuffled.slice(0, count);

    // 사용한 인덱스 저장
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
                    animation: ticker 15s linear infinite;
                }
            `}</style>

            {/* Mobile Ad Banner */}
            <div className="fixed bottom-0 left-0 right-0 border-t md:hidden z-10 bg-gray-100">
                <div className="h-16 flex flex-col justify-center">
                    <TickerTape messages={messages} className="text-sm font-semibold text-gray-700" />
                    <p className="text-[10px] text-gray-400 mt-0.5 text-center">광고 환영합니다</p>
                </div>
            </div>

            {/* Desktop Ad Banner */}
            <div className="hidden md:block max-w-7xl mx-auto px-6 lg:px-8 pb-8 mt-6">
                <div className="h-24 rounded-lg flex flex-col justify-center bg-gray-100">
                    <TickerTape messages={messages} className="text-lg font-semibold text-gray-700" />
                    <p className="text-xs text-gray-400 mt-1 text-center">광고 환영합니다</p>
                </div>
            </div>
        </>
    );
}
