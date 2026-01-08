import Image from 'next/image'
import Link from 'next/link'

const FavoriteList = () => {
    return (
        <section>
            <h3 className="text-sm font-semibold mb-2">즐겨찾기</h3>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                {Array.from({ length: 3 }).map((_, i) => (
                    <Link key={i} href="/weather/1">
                        <div className="bg-white rounded-xl p-4 shadow hover:shadow-md transition cursor-pointer">
                            <div className="flex justify-between items-center">
                                <p className="font-medium">우리집</p>
                                <button className="text-xs text-blue-500">✏️</button>
                            </div>

                            <div className="flex items-center gap-3 mt-3">
                                <Image
                                    src="/weather/cloudy.png"
                                    alt="weather"
                                    width={48}
                                    height={48}
                                />
                                <div>
                                    <p className="text-2xl font-bold">21°</p>
                                    <p className="text-xs text-gray-500">
                                        18° / 25°
                                    </p>
                                </div>
                            </div>
                        </div>
                    </Link>
                ))}
            </div>
        </section>
    )
}

export default FavoriteList