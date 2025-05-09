import { useEffect } from 'react'
import HomePage from './components/pages/HomePage'
import LocationPage from './components/pages/LocationPage'
import NotFound from './components/pages/NotFound'
import { TooltipProvider } from './components/ui/tooltip'
import { RoutingProvider, useRouting } from './context/RoutingContext'
import { ThemeProvider } from './context/ThemeContext'
import { useVpn, VpnProvider } from './context/VpnContext'
import { useServerLocations } from './hooks/useServerLocations'
import RootProvider from './providers/root-provider'

const AppContent = () => {
  const { currentRoute } = useRouting()
  const { setCurrentLocation } = useVpn()
  const { locations } = useServerLocations()

  useEffect(() => {
    if (locations?.length > 0) {
      setCurrentLocation(locations[0])
    }
  }, [locations])

  return (
    <>
      {currentRoute === 'home' && <HomePage />}
      {currentRoute === 'location' && <LocationPage />}
      {currentRoute === 'not-found' && <NotFound />}
    </>
  )
}

export const App = () => {
  return (
    <RootProvider>
      <ThemeProvider>
        <RoutingProvider>
          <TooltipProvider>
            <VpnProvider>
              <AppContent />
            </VpnProvider>
          </TooltipProvider>
        </RoutingProvider>
      </ThemeProvider>
    </RootProvider>
  )
}
