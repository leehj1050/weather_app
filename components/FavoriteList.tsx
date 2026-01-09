import Image from 'next/image'

const FavoriteList = () => {
    return (
        <section className="backdrop-blur-md bg-white/15 rounded-2xl p-4">
            <h3 className="text-sm opacity-80 mb-3">즐겨찾기</h3>

            <ul className="flex flex-col divide-y divide-white/20">
                {Array.from({ length: 3 }).map((_, i) => (
                    <li key={i}>
                        <div className="block">
                            <div className="flex items-center justify-between py-3 px-1 active:scale-[0.98] transition">
                                {/* 왼쪽: 지역 */}
                                <div>
                                    <p className="text-base font-medium">우리집</p>
                                    <p className="text-xs opacity-70">
                                        최고 25° · 최저 18°
                                    </p>
                                </div>

                                {/* 오른쪽: 날씨 */}
                                <div className="flex items-center gap-3">
                                    <Image
                                        src="/weather/cloudy.png"
                                        alt="weather"
                                        width={36}
                                        height={36}
                                    />
                                    <span className="text-2xl font-light">
                                        21°
                                    </span>
                                </div>
                            </div>
                        </div>
                    </li>
                ))}
            </ul>
        </section>
    )
}

export default FavoriteList
