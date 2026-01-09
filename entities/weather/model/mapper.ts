import getPastBaseTime from '@/shared/utils/baseTime'
import { CurrentWeatherType, GetWeatherAPI } from './type'

/**
 * 날씨API 요청후 데이터 가공 로직
 * @param items 
 * @returns 
 */
export const buildWeatherData = (items: GetWeatherAPI[]): { currentWeather: CurrentWeatherType ,hourlyWeather:GetWeatherAPI[]} => {
  const targetCategories = ['TMN', 'TMX', 'TMP', 'SKY']

  const filtered = items.filter(
    (d) =>
      targetCategories.includes(d.category) &&
      d.fcstDate === d.baseDate
  )

  const baseTime = getPastBaseTime()

  // 현재 시각에 가장 가까운 TMP
  const currentTmp = filtered.find(
    (d) => d.category === 'TMP' && d.fcstTime === baseTime
  )

  // 현재시각 구름상태
  const currentSky = filtered.find(
    (d) => d.category === 'SKY' && d.fcstTime === baseTime
  )

  // 일 최고기온 & 일 최저기온
  const maxTemp = filtered.find((d) => d.category === 'TMX')
  const minTemp = filtered.find((d) => d.category === 'TMN')

    return {
      // 현재시간에 해당하는 기온데이터 
    currentWeather: {
      date: currentTmp?.fcstDate ?? '',
      time: currentTmp?.fcstTime ?? '',
      sky: currentSky?.fcstValue ?? '1',
      tmp: currentTmp?.fcstValue ?? '',
      tmx: maxTemp?.fcstValue ?? '',
      tmn: minTemp?.fcstValue ?? '',
    },
    hourlyWeather: filtered.filter((d) => d.category === 'TMP') , // 시간당기온
  }
}
