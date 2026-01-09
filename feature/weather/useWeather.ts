import { useEffect, useState } from 'react'
import axios from 'axios'
import formatBaseDate from '@/shared/utils/formatDate'
import { buildWeatherData } from '@/entities/weather/model/mapper'
import { GetWeatherAPI } from '@/entities/weather/model/type'

export const useWeather = () => {
  const [currentWeather, setCurrentWeather] = useState({})
  const [hourlyWeather, setHourlyWeather] = useState<GetWeatherAPI[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchWeather = async () => {
      try {
        const baseDate = formatBaseDate()

        const res = await axios.post('/api/weather', {
          baseDate,
          locationX: 62,
          locationY: 125,
        })

        const items = res.data.response.body.items.item

        const { currentWeather, hourlyWeather } = buildWeatherData(items)

        setCurrentWeather(currentWeather)
        setHourlyWeather(hourlyWeather)
      } finally {
        setLoading(false)
      }
    }

    fetchWeather()
  }, [])

  return {
    currentWeather,
    hourlyWeather,
    loading,
  }
}
