import { HourlyWeatherType } from "@/shared/types/commonType"
import formatForecastHour from "@/shared/utils/formatTime"
import { useRef } from "react"
import { MdOutlineKeyboardArrowLeft, MdOutlineKeyboardArrowRight } from "react-icons/md"

const HourlyWeather = ({ data }: { data: HourlyWeatherType[] }) => {
    const scrollRef = useRef<HTMLDivElement | null>(null)

    const scrollLeft = () => {
        scrollRef.current?.scrollBy({
            left: -200,
            behavior: 'smooth',
        })
    }

    const scrollRight = () => {
        scrollRef.current?.scrollBy({
            left: 200,
            behavior: 'smooth',
        })
    }
    return (
        <section className="backdrop-blur-md bg-white/15 rounded-2xl p-4 relative group">
            <h3 className="text-sm opacity-80 mb-3 font-bold">
                시간대별 기온
            </h3>

            <div ref={scrollRef} className="flex gap-4 overflow-x-auto no-scrollbar">
                {data.length > 0 &&
                    data.map((hourlyData, key) => (
                        <div
                            key={key}
                            className="min-w-[56px] flex flex-col items-center text-center"
                        >
                            <span className="text-xs opacity-70">
                                {formatForecastHour(hourlyData.time)}
                            </span>

                            {/* 아이콘 자리 */}
                            <span className="my-1 text-lg">
                                {hourlyData.sky === "1" ? "☀️" : hourlyData.sky === "3" ? "🌤️" : "☁️"}
                            </span>

                            <span className="text-sm">
                                {hourlyData.tmp}°
                            </span>
                        </div>
                    ))}
            </div>

            <button
                onClick={scrollLeft} className="text-4xl absolute left-[-30px] top-[50%] opacity-0 group-hover:opacity-100">
                <MdOutlineKeyboardArrowLeft />
            </button>
            <button
                onClick={scrollRight} className="text-4xl absolute right-[-30px] top-[50%] opacity-0 group-hover:opacity-100">
                <MdOutlineKeyboardArrowRight />
            </button>
        </section>
    )
}

export default HourlyWeather