import { useRouting } from '@/context/RoutingContext'
import { useVpn } from '@/context/VpnContext'
import { ServerLocation } from '@/types'
import { ChevronRight } from 'lucide-react'

interface CountryItemProps {
  location: ServerLocation
}

export function CountryItem({ location }: CountryItemProps) {
  const { currentLocation, switchServer } = useVpn()
  const isSelected = currentLocation?._id === location._id
  const { navigate } = useRouting()

  const handleSelectLocation = () => {
    switchServer(location)
    navigate('home')
  }

  const getServerTypeColor = (type: string) => {
    switch (type.toLowerCase()) {
      case 'game':
        return 'bg-blue-500/20 text-blue-400'
      case 'stream':
        return 'bg-purple-500/20 text-purple-400'
      case 'global':
        return 'bg-green-500/20 text-green-400'
      case 'telegram':
        return 'bg-cyan-500/20 text-cyan-400'
      default:
        return 'bg-gray-500/20 text-gray-400'
    }
  }

  const getSubscriptionLevelColor = (level: string) => {
    switch (level.toLowerCase()) {
      case 'pro':
        return 'bg-yellow-500/20 text-yellow-400 border-yellow-500/30'
      case 'ad':
        return 'bg-red-500/20 text-red-400 border-red-500/30'
      default:
        return 'bg-gray-500/20 text-gray-400 border-gray-500/30'
    }
  }

  return (
    <div
      className={`flex items-center justify-between p-4 cursor-pointer border-b border-gray-700/30 ${
        isSelected ? 'bg-black/20' : 'hover:bg-black/10'
      }`}
      onClick={handleSelectLocation}
    >
      <div className='flex items-center space-x-3 flex-1'>
        <img src={location.serverFlag} alt={location.serverName} className='w-6 h-4 object-cover rounded-sm' />
        <div className='flex flex-col space-y-2 flex-1'>
          <div className='flex items-center justify-between'>
            <span className='font-medium text-white'>{location.serverName}</span>
            <span
              className={`px-2 py-1 text-xs rounded-full border ${getSubscriptionLevelColor(location.serverSubsLevel)}`}
            >
              {location.serverSubsLevel}
            </span>
          </div>
          <div className='flex flex-wrap gap-1'>
            {location.serverType.map((type, index) => (
              <span key={index} className={`px-2 py-1 text-xs rounded-full ${getServerTypeColor(type)}`}>
                {type}
              </span>
            ))}
          </div>
        </div>
      </div>

      <div className='flex items-center space-x-2 ml-2'>
        <ChevronRight size={16} className='text-gray-500' />
      </div>
    </div>
  )
}
