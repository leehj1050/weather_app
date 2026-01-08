import Image from 'next/image'

const CurrentWeatherCard = () => {
    return (
        <section className="bg-gradient-to-br from-blue-500 to-sky-400 text-white rounded-xl p-6 shadow">
            <h2 className="text-lg font-semibold mb-2">현재 날씨</h2>

            <div className="flex items-center gap-4">
                <Image
                    src="/weather/sunny.png"
                    alt="weather"
                    width={80}
                    height={80}
                />

                <div>
                    <p className="text-4xl font-bold">23°</p>
                    <p className="text-sm opacity-90">
                        최저 18° / 최고 26°
                    </p>
                </div>
            </div>
        </section>
    )
}

export default CurrentWeatherCard