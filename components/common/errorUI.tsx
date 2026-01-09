type Props = {
    title?: string
    message?: string
    onRetry?: () => void
}

const ErrorUI = ({
    title = '문제가 발생했습니다',
    message = '잠시 후 다시 시도해주세요.',
    onRetry,
}: Props) => {
    return (
        <div className="flex flex-col items-center justify-center flex-1 py-20 text-center">
            {/* 아이콘 */}
            <div className="mb-4 text-4xl">⚠️</div>

            {/* 제목 */}
            <h2 className="text-lg font-semibold text-gray-800">
                {title}
            </h2>

            {/* 설명 */}
            <p className="mt-2 text-sm text-gray-500">
                {message}
            </p>

            {/* 재시도 버튼 */}
            {onRetry && (
                <button
                    onClick={onRetry}
                    className="mt-6 px-4 py-2 text-sm font-medium rounded-md
                     bg-blue-500 text-white hover:bg-blue-600 transition"
                >
                    다시 시도
                </button>
            )}
        </div>
    )
}

export default ErrorUI
