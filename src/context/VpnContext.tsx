import { useServerLocations } from '@/hooks/useServerLocations'
import { parseWireGuardConfig } from '@/lib/utils'
import { registerServer } from '@/services/api'
import { ServerLocation } from '@/types'
import { getDeviceId } from '@/utils/deviceId'
import axios from 'axios'
import React, { createContext, useContext, useEffect, useRef, useState } from 'react'

interface VpnContextType {
  isConnected: 'not-connected' | 'connected' | 'connecting'
  connectVpn: () => void
  connectionTime: number
  disconnectVpn: () => void
  currentLocation: ServerLocation | null
  setCurrentLocation: (location: ServerLocation) => void
  favoriteLocations: string[]
  toggleFavorite: (locationId: string) => void
  isFavorite: (locationId: string) => boolean
  locations: ServerLocation[]
  isLoading: boolean
  error: string | null
  ipAddress: string
}

const VpnContext = createContext<VpnContextType | undefined>(undefined)

export const useVpn = (): VpnContextType => {
  const context = useContext(VpnContext)
  if (!context) {
    throw new Error('useVpn must be used within a VpnProvider')
  }
  return context
}

export function getAvailableLocations(): ServerLocation[] {
  const { locations } = useVpn()
  return locations
}

export const VpnProvider = ({ children }: { children: React.ReactNode }) => {
  const [isConnected, setIsConnected] = useState<'not-connected' | 'connected' | 'connecting'>('not-connected')
  const [currentLocation, setCurrentLocation] = useState<ServerLocation | null>(null)
  const [favoriteLocations, setFavoriteLocations] = useState<string[]>([])
  const { locations, isLoading, error } = useServerLocations()
  const [connectionTime, setConnectionTime] = useState<number>(0)
  const timerRef = useRef<NodeJS.Timeout | null>(null)
  const connectionStartTime = useRef<number>(0)
  const [ipAddress, setIpAddress] = useState<string>('')

  useEffect(() => {
    const savedFavorites = localStorage.getItem('favoriteLocations')
    const currentLocationId = localStorage.getItem('currentLocationId')
    const connectedStatus = localStorage.getItem('isConnected')
    const connectionTime = localStorage.getItem('connectionTime')
    const ipAdd = localStorage.getItem('ipAddress')
    if (savedFavorites) {
      try {
        const parsedFavorites = JSON.parse(savedFavorites)
        if (Array.isArray(parsedFavorites)) {
          setFavoriteLocations(parsedFavorites)
        }
      } catch (e) {
        console.error('Error parsing favorites from localStorage', e)
      }
    }

    if (currentLocationId && locations && locations?.length > 0 && !currentLocation) {
      const location = locations.find(location => location._id === currentLocationId)
      if (location) {
        setCurrentLocation(location)
      }
    }

    if (connectedStatus && isConnected === 'not-connected') {
      setIsConnected(connectedStatus as 'not-connected' | 'connected' | 'connecting')
    }

    if (connectionTime) {
      const currentTime = new Date().toUTCString()
      const timeDiff = Math.floor((Date.parse(currentTime) - Date.parse(connectionTime)) / 1000)
      if (timeDiff > 0) {
        setConnectionTime(timeDiff)
      } else {
        setConnectionTime(0)
      }
    }

    if (ipAdd) {
      setIpAddress(ipAdd)
    }
  }, [locations])

  useEffect(() => {
    localStorage.setItem('favoriteLocations', JSON.stringify(favoriteLocations))
  }, [favoriteLocations])

  useEffect(() => {
    return () => {
      if (timerRef.current) {
        clearInterval(timerRef.current)
      }
    }
  }, [])

  useEffect(() => {
    if (isConnected === 'connected') {
      const startTime = localStorage.getItem('connectionTime')

      if (startTime) {
        connectionStartTime.current = Date.parse(startTime)
      } else {
        connectionStartTime.current = Date.now()
        const currentGlobalTime = new Date().toUTCString()
        localStorage.setItem('connectionTime', JSON.stringify(currentGlobalTime))
      }

      timerRef.current = setInterval(() => {
        const elapsed = Math.floor((Date.now() - connectionStartTime.current) / 1000)
        setConnectionTime(elapsed)
      }, 1000)

      localStorage.setItem('isConnected', 'connected')
    } else if (timerRef.current) {
      clearInterval(timerRef.current)
      timerRef.current = null
      localStorage.setItem('isConnected', 'not-connected')

      localStorage.removeItem('connectionTime')
    }

    return () => {
      if (timerRef.current) {
        clearInterval(timerRef.current)
      }
    }
  }, [isConnected])

  const connectVpn = async () => {
    if (!currentLocation) return

    setIsConnected('connecting')
    const deviceId = await getDeviceId() // Get unique device ID

    try {
      // Register the server and get config data
      const registeredServer = await registerServer(currentLocation?.url, deviceId)
      const data = parseWireGuardConfig(registeredServer.client_config)

      setIpAddress(data.Peer.Endpoint.split(':')[0])

      localStorage.setItem('ipAddress', data.Peer.Endpoint.split(':')[0])

      // Send the config to the vpn_app.exe to update and run the proxy
      const config = {
        wgConfig: data,
        deviceId: deviceId
      }

      const configMessage = JSON.stringify(config)
      console.log('Config message:', configMessage)

      const res = await axios.post('http://127.0.0.1:8000/register', {
        url: currentLocation?.url + '/register',
        device_id: deviceId
      })
      console.log('Response from server:', res.data)

      localStorage.setItem('currentLocationId', currentLocation._id)

      chrome.proxy.settings.set(
        {
          value: {
            mode: 'pac_script',
            pacScript: {
              data: `
                function FindProxyForURL(url, host) {
                  return "SOCKS5  192.168.18.44:1080";
                }
              `
            }
          },
          scope: 'regular'
        },
        () => {
          console.log('VPN Connected!')
        }
      )
    } catch (err) {
      console.error('Error connecting to VPN:', err)
    } finally {
      setIsConnected('connected')
    }

    setConnectionTime(0)
  }

  const disconnectVpn = async () => {
    setIsConnected('not-connected')
    await axios.post('http://127.0.0.1:8000/stop-proxy')

    chrome.proxy.settings.clear({ scope: 'regular' }, () => {
      console.log('VPN Disconnected!')
    })

    localStorage.removeItem('currentLocationId')
    localStorage.removeItem('ipAddress')

    setConnectionTime(0)
  }

  const toggleFavorite = (locationId: string) => {
    setFavoriteLocations(prev => {
      if (prev.includes(locationId)) {
        return prev.filter(id => id !== locationId)
      } else {
        return [...prev, locationId]
      }
    })
  }

  const isFavorite = (locationId: string) => {
    return favoriteLocations.includes(locationId)
  }

  const value = {
    isConnected,
    connectVpn,
    disconnectVpn,
    currentLocation,
    setCurrentLocation,
    favoriteLocations,
    toggleFavorite,
    isFavorite,
    locations,
    isLoading,
    connectionTime,
    error,
    ipAddress
  }

  return <VpnContext.Provider value={value}>{children}</VpnContext.Provider>
}
