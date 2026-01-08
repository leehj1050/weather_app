const HourlyWeather = ({ data }: any) => {
    console.log('data > ', data)
    return (
        <section>
            <h3 className="text-sm font-semibold mb-2">시간대별 기온</h3>

            <div className="flex gap-3 overflow-x-auto pb-2 border border-3 overflow-x-scroll">
                {data.length > 0 && data.map((i, key) => (
                    <div
                        key={key}
                        className="min-w-[80px] flex flex-col items-center bg-white rounded-lg p-3 shadow-sm"
                    >
                        <span className="text-xs text-gray-500">15시</span>
                        <span className="text-lg font-bold">22°</span>
                    </div>
                ))}
            </div>
        </section>
    )
}

export default HourlyWeather