import { useServerLocations } from '@/hooks/useServerLocations'
import { registerServer } from '@/services/api'
import { ServerLocation, ServerResponse } from '@/types'
import { getDeviceId } from '@/utils/deviceId'
import React, { createContext, useContext, useEffect, useRef, useState } from 'react'

interface VpnContextType {
  isConnected: 'not-connected' | 'connected' | 'connecting'
  connectVpn: (location?: ServerLocation) => void
  connectionTime: number
  disconnectVpn: () => void
  currentLocation: ServerLocation | null
  setCurrentLocation: (location: ServerLocation) => void
  switchServer: (location: ServerLocation) => void
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
  const { locations, isLoading, error } = useServerLocations()
  const [connectionTime, setConnectionTime] = useState<number>(0)
  const timerRef = useRef<NodeJS.Timeout | null>(null)
  const connectionStartTime = useRef<number>(0)
  const [ipAddress, setIpAddress] = useState<string>('')

  useEffect(() => {
    const currentLocationId = localStorage.getItem('currentLocationId')
    const connectedStatus = localStorage.getItem('isConnected')
    const connectionTime = localStorage.getItem('connectionTime')
    const ipAdd = localStorage.getItem('ipAddress')

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

  const connectVpn = async (location?: ServerLocation) => {
    const targetLocation = location || currentLocation
    if (!targetLocation) return

    setIsConnected('connecting')
    const deviceId = await getDeviceId()

    try {
      const registeredServer: ServerResponse = await registerServer(targetLocation?.url, deviceId)
      setIpAddress(registeredServer.host)
      localStorage.setItem('ipAddress', registeredServer.host)

      localStorage.setItem('currentLocationId', targetLocation._id)

      chrome.proxy.settings.set(
        {
          value: {
            mode: 'pac_script',
            pacScript: {
              data: `
                function FindProxyForURL(url, host) {
                  return "${registeredServer.type} ${registeredServer.host}:${registeredServer.port}";
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
    if (!currentLocation) return
    setIsConnected('not-connected')

    try {
      // const deviceId = await getDeviceId()

      // await stopServer(currentLocation?.url, deviceId)
      chrome.proxy.settings.clear({ scope: 'regular' }, () => {
        console.log('VPN Disconnected!')
      })

      localStorage.removeItem('currentLocationId')
      localStorage.removeItem('ipAddress')
    } catch (err) {
      console.error('Error disconnecting VPN:', err)
    }

    setConnectionTime(0)
  }

  const switchServer = async (newLocation: ServerLocation) => {
    // Always set the new location first
    setCurrentLocation(newLocation)

    // If currently connected, disconnect and reconnect to new server
    if (isConnected === 'connected') {
      setIsConnected('connecting')

      try {
        // Clear current proxy settings and connect to new server
        chrome.proxy.settings.clear({ scope: 'regular' }, () => {
          console.log('Previous server disconnected, connecting to new server...')
        })

        // Connect to new server
        await connectVpn(newLocation)
      } catch (err) {
        console.error('Error switching servers:', err)
        // Reset connection state on error
        setIsConnected('not-connected')
      }
    }
    // If not connected, just set the location (no need to connect automatically)
  }

  const value = {
    isConnected,
    connectVpn,
    disconnectVpn,
    currentLocation,
    setCurrentLocation,
    switchServer,
    locations,
    isLoading,
    connectionTime,
    error,
    ipAddress
  }

  return <VpnContext.Provider value={value}>{children}</VpnContext.Provider>
}
