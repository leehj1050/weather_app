'use client'

import { useSearchLocationStore } from "@/feature/search/store"
import { useEffect, useMemo } from "react"
import LOCATION_DATA from '@/shared/model/grid/location-data.json'
import { useLocationXY } from "@/feature/location/store"


/**
검색데이터 필터링 핵심 전략 요약
location-data.json은 정적 데이터 → 한 번만 로드
keyword 변경 시
city | sigungu | dong 중 하나라도 포함되면 매칭
빈 값("")은 자동으로 무시
자동완성은 최대 N개만 표시 (UX + 성능)
useMemo로 불필요한 재연산 방지
*/

const Header = () => {
    const { keyword, setKeyword, clearKeyword } = useSearchLocationStore()
    const { setLocationXY, city_label, setLabel } = useLocationXY()

    useEffect(() => {
        clearKeyword()
    }, [])

    // 검색필터
    const filteredLocations = useMemo(() => {
        if (!keyword.trim()) return []

        return LOCATION_DATA
            .filter(({ city, sigungu, dong }) =>
                [city, sigungu, dong].some(
                    (v) => v && v.includes(keyword)
                )
            )
            .slice(0, 10) // 자동완성 최대 10개 (ux + 성능 업)
    }, [keyword])

    return (
        <div className="max-w-5xl mx-auto px-4 py-3 flex flex-col gap-2">
            { /** 현재위치 */}
            <p className="text-sm font-bold">
                📍 현재위치 : {city_label}
            </p>

            {/* 검색 */}
            <div className="relative">
                <input
                    type="text"
                    placeholder="지역 검색 (예: 서울특별시, 종로구, 삼청동)"
                    className="w-full rounded-lg px-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 text-white backdrop-blur-md bg-white/15"
                    value={keyword}
                    onChange={(e) => setKeyword(e.target.value)}
                />

                {/* 자동완성 리스트 */}
                {
                    filteredLocations.length > 0 ? (
                        <ul
                            role="listbox"
                            className="absolute mt-1 w-full bg-white border rounded-lg shadow-sm max-h-56 overflow-auto z-10"
                        >
                            {filteredLocations.map((data, idx) => {
                                const { city, sigungu, dong, nx, ny } = data
                                const label = [city, sigungu, dong,]
                                    .filter(Boolean)
                                    .join(' ')

                                return (
                                    <li key={idx}>
                                        <button
                                            type="button"
                                            role="option"
                                            className="w-full text-left px-4 py-2 hover:bg-gray-100 cursor-pointer text-black"
                                            onClick={() => {
                                                setKeyword(label)
                                                setLocationXY(nx, ny)
                                                setLabel(label)
                                            }}
                                        >
                                            {label}
                                        </button>
                                    </li>
                                )
                            })}
                        </ul>
                    ) : <></>
                }
            </div>
        </div>
    )
}

export default Header