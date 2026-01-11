'use client'
import ErrorUI from '@/components/common/errorUI'
import HourlyWeather from '@/components/HourlyWeather'
import { FavoriteItem, useFavoriteList } from '@/feature/favorite/store'
import { useWeather } from '@/feature/weather/useWeather'
import Image from 'next/image'
import { useParams } from 'next/navigation'
import { useEffect, useState } from 'react'



const WeatherDetailPage = () => {
    const { id } = useParams()
    const { favoriteList } = useFavoriteList()
    const [detailInfo, setDetailInfo] = useState<FavoriteItem | null>(null)
    const [locationXY, setLocationXY] = useState<{ nx: number, ny: number } | null>(null)
    const { hourlyWeather, error } = useWeather(locationXY)


    useEffect(() => {
        const filterDetail = favoriteList.find(item => item.id === id) ?? null
        setDetailInfo(filterDetail)
    }, [favoriteList, id])



    useEffect(() => {
        if (!detailInfo) return

        setLocationXY({
            nx: detailInfo.nx,
            ny: detailInfo.ny,
        })
    }, [detailInfo])


    if (error) return <ErrorUI />



    return (
        <div className='min-h-screen flex justify-center '>
            <main className="w-full max-w-[1000px] p-6">
                <header className="flex justify-between items-center">
                    <h1 className="text-xl font-bold">{detailInfo?.locationName}</h1>
                </header>

                <section className="bg-white rounded-xl p-6 shadow">
                    <div className="flex items-center gap-4">
                        <Image src={detailInfo?.iconSrc ?? "/weatherIcon/1.png"} alt="weather" width={80} height={80} />
                        <div>
                            <p className="text-4xl font-bold">{detailInfo?.tmp}°</p>
                            <p className="text-sm text-gray-500">
                                최저 {detailInfo?.tmn}° / 최고 {detailInfo?.tmx}°
                            </p>
                        </div>
                    </div>
                </section>

                <HourlyWeather data={hourlyWeather} />
            </main>
        </div>
    )
}

export default WeatherDetailPage