import Image from 'next/image'

const CurrentWeatherCard = ({ data }: any) => {
    console.log('current data >>> ', data)

    const getSkyBgClass = (sky: string): string => {
        switch (sky) {
            case "1": // 맑음
                return 'bg-gradient-to-br from-blue-500 to-sky-400 text-white'

            case "3": // 구름많음
                return 'bg-gradient-to-br from-gray-300 to-gray-400 text-gray-900'

            case "4": // 흐림
                return 'bg-gradient-to-br from-gray-600 to-gray-800 text-white'

            default:
                return 'bg-gradient-to-br from-blue-500 to-sky-400 text-white'
        }
    }

    return (
        <section className={`rounded-xl p-6 shadow ${getSkyBgClass(data.sky)}`}>
            <h2 className="text-lg font-semibold mb-2">현재 날씨</h2>

            <div className="flex items-center gap-4">
                <Image
                    src={`/weatherIcon/${data.sky}.png`}
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
