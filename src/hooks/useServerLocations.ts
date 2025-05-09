import { fetchServerLocations } from '@/services/api'
import { ServerLocation } from '@/types'
import { useEffect, useState } from 'react'

export function useServerLocations() {
  const [locations, setLocations] = useState<ServerLocation[]>([])

  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    const getLocations = async () => {
      try {
        setIsLoading(true)
        const serverLocations = await fetchServerLocations()
        setLocations(serverLocations)
      } catch (err) {
        if (err instanceof Error) {
          setError(err.message || 'An error occurred while fetching server locations')
        }
      } finally {
        setIsLoading(false)
      }
    }

    getLocations()
  }, [])

  return { locations, isLoading, error }
}
