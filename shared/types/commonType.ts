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
    sky: "1" | "3" | "4" | "default" | string
    tmp: string
    tmx: string
    tmn: string
}

// 시간당 기온 데이터 타입
export interface HourlyWeatherType {
    time: string;
    tmp: string;
    sky: "1" | "3" | "4" | "default" | string
}