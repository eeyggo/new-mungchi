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
