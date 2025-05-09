import { useRouting } from '@/context/RoutingContext'
import { useVpn } from '@/context/VpnContext'
import { ServerLocation } from '@/types'
import { ChevronRight } from 'lucide-react'
import { FavoriteButton } from './FavoriteButton'

interface CountryItemProps {
  location: ServerLocation
}

export function CountryItem({ location }: CountryItemProps) {
  const { currentLocation, setCurrentLocation } = useVpn()
  const isSelected = currentLocation?._id === location._id
  const { navigate } = useRouting()

  const handleSelectLocation = () => {
    setCurrentLocation(location)
    navigate('home')
  }

  return (
    <div
      className={`flex items-center justify-between p-4 cursor-pointer ${
        isSelected ? 'bg-black/20' : 'hover:bg-black/10'
      }`}
      onClick={handleSelectLocation}
    >
      <div className='flex items-center space-x-3'>
        <img src={location.serverFlag} alt='img' className='w-5' />
        <div className='flex flex-col'>
          <div className='flex items-center'>
            <span className='font-medium '>{location.serverName}</span>
          </div>
        </div>
      </div>

      <div className='flex items-center space-x-2'>
        <FavoriteButton locationId={location._id} />
        <ChevronRight size={16} className='text-gray-500' />
      </div>
    </div>
  )
}
