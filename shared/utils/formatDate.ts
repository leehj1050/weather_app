/**
 * API요청을 위한 날짜포맷
 * @return "Thu Jan 08 2026 20:11:30 GMT+0900 (한국 표준시)" -> "20260108" 로 포맷
 */
const formatBaseDate = () => {
    const TODAY_DATE = new Date()

    // 1. Date 객체 or ISO 문자열 → Date로 변환
    const date = new Date(TODAY_DATE)

    // 2. YYYYMMDD 포맷으로 변환
    return date.toISOString().slice(0, 10).replace(/-/g, '')
}

export default formatBaseDate