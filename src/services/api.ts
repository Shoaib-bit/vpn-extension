import { APIError } from '@/http/api-errors'
import { http } from '@/http/http'
import { ServerLocation } from '@/types'
import axios from 'axios'

/**
 * Fetches server locations from the API
 */

interface RegisterServerResponse {
  message: string
  client_config: string
}

export async function fetchServerLocations(): Promise<ServerLocation[]> {
  try {
    const response = await http.get('/')

    return response.data
  } catch (error) {
    if (axios.isAxiosError(error)) {
      throw APIError.fromAxiosError(error, 'Failed to fetch server locations')
    }
    throw new APIError('An unexpected error occurred while fetching server locations')
  }
}

export async function registerServer(url: string, device_id: string): Promise<RegisterServerResponse> {
  if (!url || !device_id) {
    throw new APIError('URL and device ID are required')
  }
  try {
    const response = await axios.post(
      url + '/register',
      {
        device_id: device_id
      },
      {
        headers: {
          'Content-Type': 'application/json'
        },
        baseURL: ''
      }
    )

    return response.data
  } catch (error) {
    if (axios.isAxiosError(error)) {
      throw APIError.fromAxiosError(error, 'Failed to register server')
    }
    throw new APIError('An unexpected error occurred while registering the server')
  }
}
