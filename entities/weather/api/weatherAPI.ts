import axios from 'axios'
import formatBaseDate from '@/shared/utils/formatDate'

export const fetchWeather = async () => {
  const baseDate = formatBaseDate()

  const res = await axios.post('/api/weather', {
    baseDate,
    locationX: 62,
    locationY: 125,
  })

  return res.data.response.body.items.item
}
