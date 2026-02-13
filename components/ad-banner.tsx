'use client';

import { useState, useEffect } from 'react';

const AD_MESSAGES = [
    '오늘은 날이 참 좋네요! 산책 어때요?',
    '서울 사는 김혜영 씨, 생일 축하합니다! 🎉',
    '부산 사는 박철수 님, 취업 성공 축하드려요!',
    '컴공과 3학년 이민지 님, 코딩하느라 고생 많으셨어요!',
    '18학번 선배님들, 졸업 축하드립니다!',
    '오늘 시험 보는 모든 분들 화이팅!',
    '비 오는 날엔 파전에 막걸리 생각나지 않으세요?',
    '월요병 극복엔 맛있는 점심이 최고!',
    '불금인데 오늘 저녁 뭐 드실지 정하셨나요?',
    '기분 전환이 필요할 땐 매운 게 딱이죠.',
    '지금 안 먹으면 후회할지도 몰라요.',
    '다이어트는 내일부터 하는 거 아시죠?',
    '오늘 학식 별로래요... 여기서 골라보세요.',
    '배고픈 소크라테스보단 배부른 돼지가 낫다.',
    '고기 안 먹은 지 얼마나 되셨나요?',
    '이 자리는 비어있습니다. (사장님들 연락주세요 📞)',
    '광고 아님, 그냥 빈 공간임.',
    '개발자가 졸면서 쓴 문구 (졸려요...)',
    '여기 뭐가 들어갈지 아직 못 정했어요.',
];

const SEPARATOR = '\u00A0\u00A0\u00A0\u00A0\u00A0\u00A0\u00A0\u00A0\u00A0\u00A0\u00A0\u00A0\u00A0\u00A0\u00A0\u00A0\u00A0\u00A0\u00A0\u00A0\u00A0\u00A0\u00A0\u00A0\u00A0\u00A0\u00A0\u00A0\u00A0\u00A0✦\u00A0\u00A0\u00A0\u00A0\u00A0\u00A0\u00A0\u00A0\u00A0\u00A0\u00A0\u00A0\u00A0\u00A0\u00A0\u00A0\u00A0\u00A0\u00A0\u00A0\u00A0\u00A0\u00A0\u00A0\u00A0\u00A0\u00A0\u00A0\u00A0\u00A0';

function pickRandom(count: number) {
    const shuffled = [...AD_MESSAGES].sort(() => Math.random() - 0.5);
    return shuffled.slice(0, count);
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
