export type SkyCode = "1" | "3" | "4" | "default" | string

type SkyConfig = {
  label: string
  bgClass: string
  icon: string
}

const SKY_CONFIG: Record<SkyCode, SkyConfig> = {
  '1': {
    label: '맑음',
    bgClass: 'bg-gradient-to-b from-[#5FA8FF] via-[#4F8FE8] to-[#2F5FA8] text-white',
    icon: '/weatherIcon/1.png',
  },
  '3': {
    label: '구름많음',
    bgClass: 'bg-gradient-to-b from-[#7A8DA6] via-[#66778F] to-[#4B5A6F] text-gray-900',
    icon: '/weatherIcon/3.png',
  },
  '4': {
    label: '흐림',
    bgClass: 'bg-gradient-to-b from-[#3E4C5E] via-[#2E3948] to-[#1F2933] text-white',
    icon: '/weatherIcon/4.png',
    },
  "default": {
    label: '',
    bgClass: 'bg-gradient-to-b from-[#1E293B] via-[#0F172A] to-[#020617]text-white',
    icon: '/weatherIcon/4.png',
  }
}

export const getSkyConfig = (sky: SkyCode): SkyConfig => {
  return SKY_CONFIG[sky] ?? SKY_CONFIG['default']
}
