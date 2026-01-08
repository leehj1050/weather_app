import XLSX from 'xlsx'
import fs from 'fs'
import path from 'path'

const excelPath = path.join(
  process.cwd(),
  'shared/assets/excel/location_format.xlsx'
)

const outputPath = path.join(
  process.cwd(),
  'shared/model/grid/location_data.json'
)

const workbook = XLSX.readFile(excelPath)
const sheet = workbook.Sheets[workbook.SheetNames[0]]

// 엑셀 → JSON
const rawData = XLSX.utils.sheet_to_json(sheet)

// 필요 없는 컬럼 제거 & 정규화
const data = rawData.map((row) => ({
  city: row['1단계'],
  sigungu: row['2단계'],
  dong: row['3단계'],
  nx: Number(row['격자 X']),
  ny: Number(row['격자 Y']),
}))

fs.writeFileSync(outputPath, JSON.stringify(data, null, 2))

console.log('✅ grid json 생성 완료')
