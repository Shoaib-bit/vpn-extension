import { ServerLocation } from '@/types'
import { useEffect, useState } from 'react'

const staticServerData: ServerLocation[] = [
  {
    _id: '66f30c8026ef6288aa3600cd',
    serverName: 'United Kingdom',
    serverFlag: 'https://s3.eu-west-2.amazonaws.com/admin.vivge.adarasdwan.com/flags/London.png',
    url: 'https://vivpnel-275857707.adarasdwan.com',
    serverSubsLevel: 'Pro',
    serverType: ['Game', 'Stream'],
    UptoServers: 'Upto 50+ servers'
  },
  {
    _id: '676ae05b3518bb9f61b081a6',
    serverName: 'United States',
    serverFlag: 'https://s3.eu-west-2.amazonaws.com/admin.vivge.adarasdwan.com/flags/USAOregon.png',
    url: 'https://vivpneohifree-806555360.adarasdwan.com',
    serverSubsLevel: 'Pro',
    serverType: ['Game'],
    UptoServers: 'Upto 50+ servers'
  },
  {
    _id: '66f4ce2c26ef6288aa3600e2',
    serverName: 'United States',
    serverFlag: 'https://s3.eu-west-2.amazonaws.com/admin.vivge.adarasdwan.com/flags/USAOregon.png',
    url: 'https://vivpnencal-2110649815.adarasdwan.com',
    serverSubsLevel: 'Ad',
    serverType: ['Global', 'Telegram'],
    UptoServers: 'Upto 50+ servers'
  },
  {
    _id: '676ae05a3518bb9f61b081a5',
    serverName: 'Switzerland',
    serverFlag: 'https://s3.eu-west-2.amazonaws.com/admin.vivge.adarasdwan.com/flags/Switzerland.png',
    url: 'https://vivpnezurfree-571989433.adarasdwan.com',
    serverSubsLevel: 'Pro',
    serverType: ['Game', 'Stream'],
    UptoServers: null
  },
  {
    _id: '676adee33518bb9f61b0819e',
    serverName: 'Brazil',
    serverFlag: 'https://s3.eu-west-2.amazonaws.com/admin.vivge.adarasdwan.com/flags/SaoPaulo.jpeg',
    url: 'https://vivpnesao-1194005323.adarasdwan.com',
    serverSubsLevel: 'Pro',
    serverType: ['Stream'],
    UptoServers: null
  },
  {
    _id: '676ad56c3518bb9f61b0817b',
    serverName: 'Hong Kong',
    serverFlag: 'https://s3.eu-west-2.amazonaws.com/admin.vivge.adarasdwan.com/flags/HongKong.png',
    url: 'https://vivpnehk-223046218.adarasdwan.com',
    serverSubsLevel: 'Pro',
    serverType: ['Game', 'Stream'],
    UptoServers: null
  },
  {
    _id: '676ae0583518bb9f61b081a3',
    serverName: 'India',
    serverFlag: 'https://s3.eu-west-2.amazonaws.com/admin.vivge.adarasdwan.com/flags/Hyderabad.png',
    url: 'https://vivpnehyfree-1104027800.adarasdwan.com',
    serverSubsLevel: 'Ad',
    serverType: ['Global'],
    UptoServers: null
  },
  {
    _id: '676ad9cb3518bb9f61b08191',
    serverName: 'India',
    serverFlag: 'https://s3.eu-west-2.amazonaws.com/admin.vivge.adarasdwan.com/flags/Hyderabad.png',
    url: 'https://vivpnehy-1030294857.adarasdwan.com',
    serverSubsLevel: 'Pro',
    serverType: ['Stream', 'Game'],
    UptoServers: null
  },
  {
    _id: '676acc953518bb9f61b08176',
    serverName: 'Indonesia',
    serverFlag: 'https://s3.eu-west-2.amazonaws.com/admin.vivge.adarasdwan.com/flags/Jakarta.png',
    url: 'https://vivpneja-2126893421.adarasdwan.com',
    serverSubsLevel: 'Pro',
    serverType: ['Global', 'Stream'],
    UptoServers: null
  },
  {
    _id: '676adcf73518bb9f61b0819a',
    serverName: 'Japan',
    serverFlag: 'https://s3.eu-west-2.amazonaws.com/admin.vivge.adarasdwan.com/flags/Tokyo.jpeg',
    url: 'https://vivpnetok-78221422.adarasdwan.com',
    serverSubsLevel: 'Pro',
    serverType: ['Game', 'Stream'],
    UptoServers: null
  },
  {
    _id: '6762c66e3518bb9f61b08145',
    serverName: 'Pakistan',
    serverFlag: 'https://s3.eu-west-2.amazonaws.com/admin.vivge.adarasdwan.com/flags/Pakistan.png',
    url: 'https://vivpnepak.adarasdwan.com',
    serverSubsLevel: 'Pro',
    serverType: ['Game', 'Stream'],
    UptoServers: null
  },
  {
    _id: '676ae0593518bb9f61b081a4',
    serverName: 'Singapore',
    serverFlag: 'https://s3.eu-west-2.amazonaws.com/admin.vivge.adarasdwan.com/flags/Singapore.png',
    url: 'https://vivpnesifree-1200689959.adarasdwan.com',
    serverSubsLevel: 'Ad',
    serverType: ['Global', 'Telegram'],
    UptoServers: null
  },
  {
    _id: '672db3c43518bb9f61b0808a',
    serverName: 'Singapore',
    serverFlag: 'https://s3.eu-west-2.amazonaws.com/admin.vivge.adarasdwan.com/flags/Singapore.png',
    url: 'https://vivpnesi-164637013.adarasdwan.com',
    serverSubsLevel: 'Pro',
    serverType: ['Game', 'Stream'],
    UptoServers: null
  },
  {
    _id: '676adb153518bb9f61b08195',
    serverName: 'South Korea',
    serverFlag: 'https://s3.eu-west-2.amazonaws.com/admin.vivge.adarasdwan.com/flags/Seoul.png',
    url: 'https://vivpneseo-1599199232.adarasdwan.com',
    serverSubsLevel: 'Pro',
    serverType: ['Game', 'Global'],
    UptoServers: null
  },
  {
    _id: '676ae0573518bb9f61b081a2',
    serverName: 'Sweden',
    serverFlag: 'https://s3.eu-west-2.amazonaws.com/admin.vivge.adarasdwan.com/flags/Stockholm.png',
    url: 'https://vivpnesto-1898823992.adarasdwan.com',
    serverSubsLevel: 'Ad',
    serverType: ['Global'],
    UptoServers: null
  }
]

export function useServerLocations() {
  const [locations, setLocations] = useState<ServerLocation[]>([])
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    const getLocations = async () => {
      try {
        setIsLoading(true)
        // Simulate a small delay to mimic API call
        await new Promise(resolve => setTimeout(resolve, 500))
        setLocations(staticServerData)
      } catch (err) {
        if (err instanceof Error) {
          setError(err.message || 'An error occurred while fetching server locations')
        }
      } finally {
        setIsLoading(false)
      }
    }

    getLocations()
  }, [])

  return { locations, isLoading, error }
}
