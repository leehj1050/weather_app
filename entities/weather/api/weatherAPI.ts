import axios from 'axios'
import formatBaseDate from '@/shared/utils/formatDate'

export const fetchWeather = async (nx:number,ny:number) => {
  const baseDate = formatBaseDate()

  const res = await axios.post('/api/weather', {
    baseDate,
    locationX: nx,
    locationY: ny,
  })

  return res.data.response.body.items.item
}
