import { NextResponse } from 'next/server'
import axios from 'axios'

const API_URL = process.env.WEATHER_API!
const API_KEY = process.env.API_KEY!

export const POST = async (req: Request) => {
  try {
    const { baseDate, locationX, locationY } = await req.json()
    
    const { data } = await axios.get(
      `${API_URL}/getVilageFcst?pageNo=1&numOfRows=1000&dataType=JSON&base_date=${baseDate}&base_time=0200&nx=62&ny=125&authKey=${API_KEY}`,
    )
    return NextResponse.json(data)
  } catch (error) {
    return NextResponse.json(
      { message: '기상청 API 호출 실패' },
      { status: 500 }
    )
  }
}

