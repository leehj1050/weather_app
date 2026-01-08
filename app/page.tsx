'use client'

import axios from "axios";
import { useEffect, useState } from "react";
import formaLocation from "@/shared/model/grid/location_data.json"
import Header from "@/components/Header";
import CurrentWeatherCard from "@/components/CurrentWeatherCard";
import HourlyWeather from "@/components/HourlyWeather";
import FavoriteList from "@/components/FavoriteList";
import formatBaseDate from "@/shared/utils/formatDate";
import getPastBaseTime from "@/shared/utils/baseTime";



export default function Home() {
  const [weatherData, setWeatherData] = useState([])
  const [currentWeather, setCurrentWeather] = useState({})
  const [hourWeather, setHourWeather] = useState([])

  useEffect(() => {
    const base_date = formatBaseDate()

    const getWeaterAPI = async () => {
      const res = await axios.post("/api/weather", {
        baseDate: base_date,
        locationX: 62,
        locationY: 125
      })
      const { item } = res.data.response.body.items

      //데이터 필터
      const targetCategories = ['TMN', 'TMX', 'TMP', "SKY"]

      const filtered = item.filter((data: any) =>
        targetCategories.includes(data.category) &&
        data.fcstDate === data.baseDate
      )

      // console.log('filtered >.> ', filtered)

      // 현재 시각에 가장 가까운 TMP
      const currentTmpItem = filtered.find(
        (data: any) =>
          data.category === 'TMP' &&
          data.fcstTime === getPastBaseTime()
      )

      // 현재시각 구름상태
      const currentSkyItem = filtered.find(
        (data: any) =>
          data.category === 'SKY' &&
          data.fcstTime === getPastBaseTime()
      )

      // 일 최고기온
      const dailyMaxItem = filtered.find(
        (data: any) => data.category === 'TMX'
      )

      // 일 최저기온
      const dailyMinItem = filtered.find(
        (data: any) => data.category === 'TMN'
      )

      setCurrentWeather({
        date: currentTmpItem.fcstDate, // 오늘날짜
        time: currentTmpItem.fcstTime, // 접속시간에 가까운 시간
        sky: currentSkyItem.fcstValue, // 맑음(1), 구름많음(3), 흐림(4)
        tmp: currentTmpItem.fcstValue, // 현재기온
        tmx: dailyMaxItem.fcstValue, //일 최고기온
        tmn: dailyMinItem.fcstValue // 일 최저기온
      })

      // 시간당 기온
      const hourlyWeather = filtered.filter(
        (data: any) => data.category === 'TMP'
      )

      setHourWeather(hourlyWeather)
    }
    getWeaterAPI()
  }, [])




  return (
    <div className="border border-red-700 border-3 h-[100vh] flex flex-col justify-center items-center">
      <Header />
      <main className="p-6 flex-1 max-w-[1000px]">
        <CurrentWeatherCard data={currentWeather} />
        <HourlyWeather data={hourWeather} />
        <FavoriteList />
      </main>
    </div>
  );
}

