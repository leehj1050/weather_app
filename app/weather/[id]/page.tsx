import HourlyWeather from '@/components/HourlyWeather'
import Image from 'next/image'

const WeatherDetailPage = () => {
    return (
        <main className="max-w-3xl mx-auto px-4 py-6 space-y-6">
            <header className="flex justify-between items-center">
                <h1 className="text-xl font-bold">서울 종로구</h1>
                <button className="text-sm text-blue-500">⭐ 즐겨찾기</button>
            </header>

            <section className="bg-white rounded-xl p-6 shadow">
                <div className="flex items-center gap-4">
                    {/* <Image src="/weather/sunny.png" alt="weather" width={80} height={80} /> */}
                    <div>
                        <p className="text-4xl font-bold">24°</p>
                        <p className="text-sm text-gray-500">
                            최저 19° / 최고 27°
                        </p>
                    </div>
                </div>
            </section>

            {/* <HourlyWeather /> */}
        </main>
    )
}

export default WeatherDetailPage