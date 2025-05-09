import { useVpn } from '@/context/VpnContext'
import { useMemo } from 'react'
import { CountryItem } from './CountryItem'

interface LocationListProps {
  searchQuery: string
  showFavoritesOnly: boolean
}

export function LocationList({ searchQuery, showFavoritesOnly }: LocationListProps) {
  const { favoriteLocations, locations, isLoading } = useVpn()

  const filteredLocations = useMemo(() => {
    let filteredLocs = locations

    // Filter by search query
    if (searchQuery) {
      filteredLocs = filteredLocs.filter(location =>
        location.serverName.toLowerCase().includes(searchQuery.toLowerCase())
      )
    }

    // Filter by favorites
    if (showFavoritesOnly) {
      filteredLocs = filteredLocs.filter(location => favoriteLocations.includes(location._id))
    }

    return filteredLocs
  }, [searchQuery, showFavoritesOnly, favoriteLocations, locations])

  if (isLoading) {
    return (
      <div className='overflow-y-auto max-h-[220px] flex items-center justify-center p-4'>
        <div className='animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-vpn-green'></div>
      </div>
    )
  }

  return (
    <div className='overflow-y-auto max-h-[220px]'>
      {filteredLocations.length === 0 ? (
        <div className='p-4 text-center text-gray-400'>No locations found</div>
      ) : (
        filteredLocations.map(location => <CountryItem key={location._id} location={location} />)
      )}
    </div>
  )
}
