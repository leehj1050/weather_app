import { useQuery } from '@tanstack/react-query'
import { fetchWeather } from '@/entities/weather/api/weatherAPI'
import { buildWeatherData } from '@/entities/weather/model/mapper'
import { CurrentWeatherType, HourlyWeatherType } from '@/shared/types/commonType'

type WeatherQueryResult = {
  currentWeather: CurrentWeatherType | null
  hourlyWeather: HourlyWeatherType[] | []
}

export const useWeather = (location: { nx: number, ny: number }) => {
  const { data, isLoading, isError } = useQuery<WeatherQueryResult>({
    queryKey: ['weather',location.nx, location.ny],
    queryFn: async () => {
      const items = await fetchWeather(location.nx, location.ny)
      const { currentWeather, hourlyWeather } = buildWeatherData(items)

      // 하나라도 빈 문자열이면 null 처리
      const hasEmptyString = Object.values(currentWeather).some(
        (value) => value === ''
      )

      return {
        currentWeather: hasEmptyString ? null : currentWeather,
        hourlyWeather,
      }
    },
    staleTime: 1000 * 60 * 5, // 5분 캐시
  })

  return {
    currentWeather: data?.currentWeather ?? null,
    hourlyWeather: data?.hourlyWeather ?? [],
    loading: isLoading,
    error: isError,
  }
}
