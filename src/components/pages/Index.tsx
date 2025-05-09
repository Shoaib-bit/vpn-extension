import { useRouting } from '@/context/RoutingContext'
import HomePage from './HomePage'
import LocationPage from './LocationPage'

export function Index() {
  const { currentRoute } = useRouting()

  if (currentRoute === 'location') {
    return <LocationPage />
  }

  return <HomePage />
}

export default Index
