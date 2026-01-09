import { HourlyWeatherType } from "@/shared/types/commonType"
import formatForecastHour from "@/shared/utils/formatTime"

const HourlyWeather = ({ data }: { data: HourlyWeatherType[] }) => {
    return (
        <section>
            <h3 className="text-sm font-semibold mb-2">시간대별 기온</h3>

            <div className="flex gap-3 overflow-x-auto pb-2 border border-3 overflow-x-scroll">
                {data.length > 0 && data.map((hourlyData: any, key: number) => (
                    <div
                        key={key}
                        className="min-w-[80px] flex flex-col items-center bg-white rounded-lg p-3 shadow-sm"
                    >
                        <span className="text-xs text-gray-500">{formatForecastHour(hourlyData.fcstTime)}</span>
                        <span className="text-lg font-bold">{hourlyData.fcstValue}°</span>
                    </div>
                ))}
            </div>
        </section>
    )
}

export default HourlyWeather