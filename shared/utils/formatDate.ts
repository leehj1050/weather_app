const formatBaseDate = () => {
    const TODAY_DATE = new Date()

    // 1. Date 객체 or ISO 문자열 → Date로 변환
    const date = new Date(TODAY_DATE)

    // 2. YYYYMMDD 포맷으로 변환
    return date.toISOString().slice(0, 10).replace(/-/g, '')
}

export default formatBaseDate