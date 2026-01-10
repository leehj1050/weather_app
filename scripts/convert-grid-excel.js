import XLSX from 'xlsx'
import fs from 'fs'
import path from 'path'

const excelPath = path.join(
  process.cwd(),
  'shared/assets/excel/location-data.xlsx'
)

const outputPath = path.join(
  process.cwd(),
  'shared/model/grid/location-data.json'
)

const workbook = XLSX.readFile(excelPath)
const sheet = workbook.Sheets[workbook.SheetNames[0]]

// 엑셀 → JSON
const rawData = XLSX.utils.sheet_to_json(sheet)

// 필요 없는 컬럼 제거 & 정규화
const data = rawData.map((row) => ({
  city: row['City'],
  sigungu: row['Sigungu'],
  dong: row['Dong'],
  nx: Number(row['X']),
  ny: Number(row['Y']),
  latitude: Number(row['Latitude']),
  longitude: Number(row['Longitude']),
}))

fs.writeFileSync(outputPath, JSON.stringify(data, null, 2))

console.log('✅ grid json 생성 완료')
