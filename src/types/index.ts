export type ConnectionStatus = 'not_connected' | 'connecting' | 'connected'

export interface ServerLocation {
  _id: string
  serverName: string
  serverFlag: string
  url: string
  __v: number
}

export interface VpnContextType {
  status: ConnectionStatus
  currentLocation: Location | null
  connectionTime: number
  favoriteLocations: string[]
  connect: () => void
  disconnect: () => void
  setCurrentLocation: (location: Location) => void
  toggleFavorite: (locationId: string) => void
  isFavorite: (locationId: string) => boolean
}
