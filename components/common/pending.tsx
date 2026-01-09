const PendingUI = () => {
    return (
        <div className="flex flex-col items-center justify-center flex-1 py-20">
            {/* 스피너 */}
            <div className="w-12 h-12 border-4 border-gray-300 border-t-blue-500 rounded-full animate-spin" />

            {/* 텍스트 */}
            <p className="mt-4 text-sm text-gray-500">
                날씨 정보를 불러오는 중입니다...
            </p>
        </div>
    )
}

export default PendingUI
