import { create } from 'zustand'

interface LocationType {    
    // 검색된 지역 x,y 저장
    locationXY: {
        nx: number,
        ny: number,
    },
    setLocationXY: (locationX: number, locationY: number) => void
    
    // 도시,시군구,동
    city_label: string,
    setLabel:(label:string)=>void
}

export const useLocationXY = create<LocationType>((set) => ({
    locationXY: {
        nx: 60,
        ny: 127,
    },
    setLocationXY: (locationX, locationY) => set({ locationXY: { nx: locationX, ny: locationY } }),
    
    city_label: "",
    setLabel: (label)=>set({ city_label: label })
}))