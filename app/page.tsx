'use client'

import axios from "axios";
import { useEffect, useState } from "react";
import formaLocation from "@/shared/model/grid/location_data.json"
import Header from "@/components/Header";
import CurrentWeatherCard from "@/components/CurrentWeatherCard";
import HourlyWeather from "@/components/HourlyWeather";
import FavoriteList from "@/components/FavoriteList";
import formatBaseDate from "@/shared/utils/formatDate";



export default function Home() {
  const [weatherData, setWeatherData] = useState([])
  const [currentWeather, setCurrentWeather] = useState({
    tmn: 0, // 일 최저기온
    tmx: 0, // 일 최고기온
  })
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
      const targetCategories = ['TMN', 'TMX', 'TMP']

      const filtered = item.filter((data: any) =>
        targetCategories.includes(data.category) &&
        data.fcstDate === data.baseDate
      )

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
        <CurrentWeatherCard />
        <HourlyWeather data={hourWeather} />
        <FavoriteList />
      </main>
    </div>
  );
}


