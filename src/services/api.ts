import { APIError } from '@/http/api-errors'
import { http } from '@/http/http'
import { ServerLocation, ServerResponse } from '@/types'
import axios from 'axios'

export async function fetchServerLocations(): Promise<ServerLocation[]> {
  try {
    const response = await http.get<ServerLocation[]>('/')

    return response.data
  } catch (error) {
    if (axios.isAxiosError(error)) {
      throw APIError.fromAxiosError(error, 'Failed to fetch server locations')
    }
    throw new APIError('An unexpected error occurred while fetching server locations')
  }
}

export async function registerServer(url: string, device_id: string): Promise<ServerResponse> {
  if (!url || !device_id) {
    throw new APIError('URL and device ID are required')
  }
  try {
    const response = await axios.post<ServerResponse>(
      url + '/start' + '/' + device_id,
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

export async function stopServer(url: string, device_id: string) {
  if (!url || !device_id) {
    throw new APIError('URL and device ID are required')
  }
  try {
    await axios.delete(url + '/stop' + '/' + device_id)
  } catch (error) {
    if (axios.isAxiosError(error)) {
      throw APIError.fromAxiosError(error, 'Failed to register server')
    }
    throw new APIError('An unexpected error occurred while registering the server')
  }
}
