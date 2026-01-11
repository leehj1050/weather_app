import getPastBaseTime from '@/shared/utils/baseTime'
import { CurrentWeatherType, GetWeatherAPI, HourlyWeatherType } from '@/shared/types/commonType'
import { v4 as uuidv4 } from 'uuid';


/**
 * 날씨API 요청후 데이터 가공 로직
 * @param items 
 * @returns 
 */
export const buildWeatherData = (items: GetWeatherAPI[]): { currentWeather: CurrentWeatherType , hourlyWeather:HourlyWeatherType[]} => {
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

  //시간당 기온 데이터 만들기
  const filteredHourly = filtered.filter((d) => d.category === 'TMP') 
  const filteredHourSky = filtered.filter((d) => d.category === 'SKY') 
  //최종가공
  const hourlyWeather = filteredHourly.map((tmpItem) => {
    const skyItem = filteredHourSky.find(
    //시간이 같은 데이터끼리 뽑아내기
    (sky) => sky.fcstTime === tmpItem.fcstTime
  )

  return {
    time: tmpItem.fcstTime,
    tmp: tmpItem.fcstValue,
    sky: skyItem?.fcstValue 
  }
}) as HourlyWeatherType[]
  

return {
      // 현재시간에 해당하는 기온데이터 
  currentWeather: {
      id: uuidv4(),
      date: currentTmp?.fcstDate ?? '',
      time: currentTmp?.fcstTime ?? '',
      sky: currentSky?.fcstValue ?? "default",
      tmp: currentTmp?.fcstValue ?? '',
      tmx: maxTemp?.fcstValue ?? '',
      tmn: minTemp?.fcstValue ?? '',
    },

      // 시간당기온
    hourlyWeather: hourlyWeather || [], 
  }
}
