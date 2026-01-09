'use client'

const Header = () => {
    return (
        <div className="max-w-5xl mx-auto px-4 py-3 flex flex-col gap-2">
            {/* 현재 위치 */}
            <p className="text-sm text-gray-500">
                📍 현재 위치: <span className="font-medium">서울특별시 종로구</span>
            </p>

            {/* 검색 */}
            <div className="relative">
                <input
                    type="text"
                    placeholder="지역 검색 (예: 서울특별시, 종로구, 청운동)"
                    className="w-full rounded-lg px-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 text-white backdrop-blur-md bg-white/15"
                />

                {/* 자동완성 리스트 */}
                {/* <ul className="absolute mt-1 w-full bg-white border rounded-lg shadow-sm max-h-56 overflow-auto">
                        <li className="px-4 py-2 hover:bg-gray-100 cursor-pointer text-black">
                            서울특별시 종로구 청운동
                        </li>
                        <li className="px-4 py-2 hover:bg-gray-100 cursor-pointer text-black">
                            서울특별시 종로구
                        </li>
                    </ul> */}
            </div>
        </div>
    )
}

export default Header