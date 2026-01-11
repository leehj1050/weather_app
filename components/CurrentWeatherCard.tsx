import { CurrentWeatherType } from '@/shared/types/commonType'
import { getSkyConfig } from '@/shared/utils/sky'
import Image from 'next/image'


const CurrentWeatherCard = ({ data }: { data: CurrentWeatherType }) => {
    const skyConfig = getSkyConfig(data.sky)

    return (
        <section className="flex flex-col items-center text-center">
            {/* 상태 라벨 */}
            <p className="text-lg font-semibold opacity-80 mb-1">
                {skyConfig.label}
            </p>

            {/* 메인 온도 */}
            <div className="flex items-center gap-3">
                <Image
                    src={skyConfig.icon}
                    alt="weather_icon"
                    width={72}
                    height={72}
                    priority
                />

                <span className="text-[88px] font-thin leading-none">
                    {data.tmp}°
                </span>
            </div>

            {/* 최저 / 최고 */}
            <p className="text-lg font-semibold opacity-80 mt-2">
                최저: {data.tmn}&nbsp;&nbsp;&nbsp;°최고: {data.tmx}°
            </p>
        </section>
    )
}

export default CurrentWeatherCard
