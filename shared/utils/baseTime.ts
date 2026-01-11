const BASE_TIMES = [2, 5, 8, 11, 14, 17, 20, 23]

/**
 * api 요청할때 파라미터로 아래 시간으로만 가능!! (api요청규칙)
 * Base_time : 0200, 0500, 0800, 1100, 1400, 1700, 2000, 2300 (1일 8회)
 * 
 * 현재 시각 기준으로 가장 최근의 과거 base_time 반환
 * @example 23:21 → "2300"
 * @example 12:00 → "1100"
 * @example 12:30 → "1100"
 * @example 01:10 → "2300"
 */
export const getPastBaseTime = (now: Date = new Date()): string => {
  const currentHour = now.getHours()

  // // ✅ 00:00 ~ 02:59 → 03:00 고정
  if (currentHour < 5) return '0300'

  // 현재 시각 이하인 base_time만 필터
  const candidates = BASE_TIMES.filter(
    (hour) => hour <= currentHour
  )

  // 없으면 (00~01시대) 전날 마지막 base_time
  const selectedHour =
    candidates.length > 0
      ? candidates[candidates.length - 1]
      : 23

  return `${selectedHour.toString().padStart(2, '0')}00`
}

export default getPastBaseTime