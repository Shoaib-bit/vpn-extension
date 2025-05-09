chrome.runtime.onInstalled.addListener(async details => {
  if (details.reason === 'install') {
    console.log('Extension installed, registering device...')

    try {
      const { deviceId } = await chrome.storage.local.get('deviceId')
      let finalDeviceId = deviceId

      if (!finalDeviceId) {
        const newId = self.crypto.randomUUID()
        await chrome.storage.local.set({ deviceId: newId })
        finalDeviceId = newId
      }

      console.log('Device registered with ID:', finalDeviceId)
    } catch (error) {
      console.error('Error registering device:', error)
    }
  }
})

self.addEventListener('install', event => {
  console.log('Service Worker installing...')
  self.skipWaiting()
})

self.addEventListener('activate', event => {
  console.log('Service Worker activating...')
})
