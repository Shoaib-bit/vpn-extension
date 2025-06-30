import { useVpn } from '@/context/VpnContext'
import { useMemo } from 'react'
import { CountryItem } from './CountryItem'

interface LocationListProps {
  searchQuery: string
}

export function LocationList({ searchQuery }: LocationListProps) {
  const { locations, isLoading } = useVpn()

  const filteredLocations = useMemo(() => {
    // Filter by search query only
    if (searchQuery) {
      return locations.filter(location => location.serverName.toLowerCase().includes(searchQuery.toLowerCase()))
    }
    return locations
  }, [searchQuery, locations])

  if (isLoading) {
    return (
      <div className='overflow-y-auto max-h-[220px] flex items-center justify-center p-4'>
        <div className='animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-vpn-green'></div>
      </div>
    )
  }

  return (
    <div className='overflow-y-auto max-h-[300px]'>
      {filteredLocations.length === 0 ? (
        <div className='p-4 text-center text-gray-400'>
          {searchQuery ? 'No servers match your search' : 'No locations found'}
        </div>
      ) : (
        filteredLocations.map(location => <CountryItem key={location._id} location={location} />)
      )}
    </div>
  )
}
