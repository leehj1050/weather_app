# 🌤 Weather App (기상청 공공 API 기반 날씨 서비스)

기상청 공공 API를 활용하여 **동네(격자) 단위 날씨 정보를 제공하는 웹 애플리케이션**입니다.  
즐겨찾기한 지역의 현재 날씨와 시간대별 예보를 확인할 수 있으며,  
React Query와 Zustand를 활용해 상태 관리와 데이터 요청을 효율적으로 처리했습니다.

---

## 📌 프로젝트 실행 방법

### 1. 레포지토리 클론
```bash
git clone https://github.com/your-repo/weather-app.git
cd weather-app
```
### 2. 패키지 설치
```bash
npm install
```

### 3. 환경 변수 설정
```bash
# .env.local
NEXT_PUBLIC_WEATHER_API_KEY=YOUR_API_KEY
```

### 4. 개발 서버 실행
```bash
npm run dev
```

## ✨ 구현한 기능

### 1️⃣ 즐겨찾기 지역 관리
- 지역(nx, ny 좌표 기준)을 즐겨찾기로 등록
- 즐겨찾기 이름 수정 기능 제공
- **고유 id 기반으로 즐겨찾기 여부 판단**
- 즐겨찾기 중복 등록 방지

### 2️⃣ 날씨 디테일 페이지
- 즐겨찾기 목록에서 선택한 지역의 상세 날씨 페이지 제공
- 현재 기온, 최저/최고 기온 표시
- 시간대별 날씨 예보(Hourly Forecast) 제공

### 3️⃣ 기상청 공공 API 연동
- 기상청 단기예보 API를 활용하여 격자(nx, ny) 기준 날씨 데이터 조회
- API 응답 데이터를 UI에 필요한 형태로 가공하여 사용

### 4️⃣ 로딩 / 에러 처리
- 데이터 요청 중 로딩 UI 표시
- API 호출 실패 시 에러 UI 제공

## 🧠 기술적 의사결정 및 이유

### ✅ Next.js App Router 사용
- 페이지 단위 라우팅 구조를 명확히 분리
- `/weather/[id]` 형태의 Dynamic Route를 사용하여 디테일 페이지 구현

### ✅ React Query 도입
- 날씨 데이터는 서버 상태이므로 React Query로 관리
- `staleTime` 설정을 통해 불필요한 API 호출 최소화
- 좌표 정보가 준비된 이후에만 API 요청을 보내기 위해 `enabled` 옵션 활용

```ts
enabled: !!location
```
### ✅ Zustand를 통한 전역 상태 관리
- 즐겨찾기 목록과 같은 UI 전역 상태 관리
- props drilling 없이 여러 페이지에서 동일한 상태 접근 가능

### ✅ 데이터 가공 책임 분리
- API 응답 데이터를 그대로 사용하지 않고 별도의 유틸 함수에서 가공
- UI 컴포넌트는 표현 역할에만 집중하도록 설계








