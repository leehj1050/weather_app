export type SkyCode = '1' | '3' | '4' | "default"

type SkyConfig = {
  label: string
  bgClass: string
  icon: string
}

const SKY_CONFIG: Record<SkyCode, SkyConfig> = {
  '1': {
    label: '맑음',
    bgClass: 'bg-gradient-to-br from-blue-500 to-sky-400 text-white',
    icon: '/weatherIcon/1.png',
  },
  '3': {
    label: '구름많음',
    bgClass: 'bg-gradient-to-br from-gray-300 to-gray-400 text-gray-900',
    icon: '/weatherIcon/3.png',
  },
  '4': {
    label: '흐림',
    bgClass: 'bg-gradient-to-br from-gray-600 to-gray-800 text-white',
    icon: '/weatherIcon/4.png',
    },
  "default": {
    label: '',
    bgClass: 'bg-gradient-to-br from-gray-600 to-gray-800 text-white',
    icon: '/weatherIcon/4.png',
  }
}

export const getSkyConfig = (sky: SkyCode): SkyConfig => {
  return SKY_CONFIG[sky] ?? SKY_CONFIG['default']
}
