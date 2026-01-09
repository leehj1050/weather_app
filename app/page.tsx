'use client'

import formaLocation from "@/shared/model/grid/location_data.json"
import Header from "@/components/Header";
import CurrentWeatherCard from "@/components/CurrentWeatherCard";
import HourlyWeather from "@/components/HourlyWeather";
import FavoriteList from "@/components/FavoriteList";
import { useWeather } from "@/feature/weather/useWeather";
import PendingUI from "@/components/pending";



export default function Home() {

  const { currentWeather, hourlyWeather, loading } = useWeather()



  return (
    <div className="border border-red-700 border-3 h-[100vh] flex flex-col justify-center items-center">
      <Header />
      <main className="p-6 flex-1 max-w-[1000px]">
        {
          loading ? <PendingUI /> :
            <>
              <CurrentWeatherCard data={currentWeather} />
              <HourlyWeather data={hourlyWeather} />
              <FavoriteList />
            </>
        }
      </main>
    </div>
  );
}

