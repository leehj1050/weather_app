'use client'

import formaLocation from "@/shared/model/grid/location_data.json"
import Header from "@/components/Header";
import CurrentWeatherCard from "@/components/CurrentWeatherCard";
import HourlyWeather from "@/components/HourlyWeather";
import FavoriteList from "@/components/FavoriteList";
import { useWeather } from "@/feature/weather/useWeather";
import PendingUI from "@/components/common/pending";
import ErrorUI from "@/components/common/errorUI";


export default function Home() {

  const { currentWeather, hourlyWeather, loading, error } = useWeather()

  //api요청 에러발생시
  if (error) return <ErrorUI />


  return (
    <div className="border border-red-700 border-3 h-[100vh] flex flex-col justify-center items-center">
      <Header />
      <main className="p-6 flex-1 max-w-[1000px]">
        {
          loading ? <PendingUI /> :
            <>
              {currentWeather ? <CurrentWeatherCard data={currentWeather} /> : <>날씨 정보를 불러올 수 없습니다.</>}
              <HourlyWeather data={hourlyWeather} />
              <FavoriteList />
            </>
        }
      </main>
    </div>
  );
}

