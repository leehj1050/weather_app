'use client'

import Header from "@/components/Header";
import CurrentWeatherCard from "@/components/CurrentWeatherCard";
import HourlyWeather from "@/components/HourlyWeather";
import FavoriteList from "@/components/FavoriteList";
import { useWeather } from "@/feature/weather/useWeather";
import PendingUI from "@/components/common/pending";
import ErrorUI from "@/components/common/errorUI";
import { getSkyConfig } from "@/shared/utils/sky";
import { useGeoLocation } from "@/shared/utils/useGeoLocation";
import { useLocationXY } from "@/feature/location/store";
import { useEffect } from "react";


export default function Home() {
  //사용자 위치확인 로직 실행
  const { errorMsg, setErrorMsg } = useGeoLocation()

  const { locationXY } = useLocationXY()
  const { currentWeather, hourlyWeather, loading, error } = useWeather(locationXY)
  const skyBG = getSkyConfig(currentWeather?.sky ?? "default")

  //api요청 에러발생시
  if (error) return <ErrorUI />

  useEffect(() => {
    if (!errorMsg) return;

    alert(errorMsg);
    setErrorMsg(''); // ✅ alert 확인 후 상태 제거
  }, [errorMsg]);


  return (
    <div className={`min-h-screen  text-white flex justify-center ${skyBG.bgClass}`}>

      <div className="w-full max-w-[1000px] flex flex-col">
        {/* Header */}
        <header className="px-6 pt-8 pb-4">
          <Header currentWeather={currentWeather ?? null} />
        </header>

        {/* Main */}
        <main className="flex-1 px-6 pb-8 flex flex-col gap-6">
          {loading ? (
            <PendingUI />
          ) : (
            <>
              {currentWeather ? <CurrentWeatherCard data={currentWeather} /> : (
                <p className="text-center opacity-80">
                  날씨 정보를 불러올 수 없습니다.
                </p>
              )}

              <HourlyWeather data={hourlyWeather} />
              <FavoriteList />
            </>
          )}
        </main>
      </div>
    </div>
  );
}

