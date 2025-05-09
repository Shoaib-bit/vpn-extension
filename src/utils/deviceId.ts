import { v4 as uuidv4 } from 'uuid'

const isChromeStorage = typeof chrome !== 'undefined' && chrome.storage && chrome.storage.local

export const getDeviceId = async (): Promise<string> => {
  if (isChromeStorage) {
    const existingId = await chrome.storage.local.get('deviceId')

    if (existingId.deviceId) {
      return existingId.deviceId
    }

    const newId = uuidv4()

    await chrome.storage.local.set({ deviceId: newId })
    return newId
  }

  try {
    const existingId = localStorage.getItem('deviceId')
    if (existingId) {
      return existingId
    }

    const newId = uuidv4()
    localStorage.setItem('deviceId', newId)
    return newId
  } catch (e) {
    console.warn('Storage not available, using temporary device ID')
    return uuidv4()
  }
}
