import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "뭉치 - 대학 상권 단체 식사 큐레이션",
  description: "고려대 인근 단체 식사 주문 가능한 식당을 한 곳에서",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ko">
      <body className="antialiased">
        {children}
      </body>
    </html>
  );
}
