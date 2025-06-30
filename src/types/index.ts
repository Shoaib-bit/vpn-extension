export type ConnectionStatus = 'not_connected' | 'connecting' | 'connected'

export interface ServerLocation {
  _id: string
  serverName: string
  serverFlag: string
  url: string
  serverSubsLevel: string
  serverType: string[]
  UptoServers: string | null
}

export interface VpnContextType {
  status: ConnectionStatus
  currentLocation: Location | null
  connectionTime: number
  connect: () => void
  disconnect: () => void
  setCurrentLocation: (location: Location) => void
}

export interface ServerResponse {
  host: string
  port: number
  type: string
  status: string
}
