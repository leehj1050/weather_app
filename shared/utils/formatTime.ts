/**
 * 기상청 시간 포맷 (HHmm → HH시)
 * @example "0200" → "02시"
 * @example "1500" → "15시"
 */
const formatForecastHour=(baseTime: string): string => {
  if (!baseTime || baseTime.length < 2) return ''

  const hour = baseTime.slice(0, 2)
  return `${hour}시`
}

export default formatForecastHour