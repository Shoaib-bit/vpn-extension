import { createContext, ReactNode, useContext, useState } from 'react'

type Route = 'home' | 'location' | 'not-found'

interface RoutingContextType {
  currentRoute: Route
  navigate: (route: Route) => void
}

const RoutingContext = createContext<RoutingContextType | undefined>(undefined)

export function RoutingProvider({ children }: { children: ReactNode }) {
  const [currentRoute, setCurrentRoute] = useState<Route>('home')

  const navigate = (route: Route) => {
    setCurrentRoute(route)
  }

  return <RoutingContext.Provider value={{ currentRoute, navigate }}>{children}</RoutingContext.Provider>
}

export function useRouting() {
  const context = useContext(RoutingContext)
  if (context === undefined) {
    throw new Error('useRouting must be used within a RoutingProvider')
  }
  return context
}
