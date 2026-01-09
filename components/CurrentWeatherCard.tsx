import { CurrentWeatherType } from '@/shared/types/commonType'
import { getSkyConfig } from '@/shared/utils/sky'
import Image from 'next/image'


const CurrentWeatherCard = ({ data }: { data: CurrentWeatherType }) => {
    const skyConfig = getSkyConfig(data.sky)

    return (
        <section className={`rounded-xl p-6 shadow ${skyConfig.bgClass}`}>
            <h2 className="text-lg font-semibold mb-2">{`현재 날씨 (${skyConfig.label})`}</h2>

            <div className="flex items-center gap-4">
                <Image
                    src={skyConfig.icon}
                    alt="weather_icon"
                    width={80}
                    height={80}
                />

                <div>
                    <p className="text-4xl font-bold">{data.tmp}°</p>
                    <p className="text-sm opacity-90">
                        최저 {data.tmn}° / 최고 {data.tmx}°
                    </p>
                </div>
            </div>
        </section>
    )
}

export default CurrentWeatherCard
