// 날씨 API응답 raw 데이터 타입
export interface GetWeatherAPI {
    baseDate: string
    baseTime: string
    category: string
    fcstDate: string
    fcstTime: string
    fcstValue: string
    nx: number
    ny: number
}

// 가공된 currentWeather 데이터 타입
export interface CurrentWeatherType{
    date: string
    time: string
    sky: string
    tmp: string
    tmx: string
    tmn: string
}