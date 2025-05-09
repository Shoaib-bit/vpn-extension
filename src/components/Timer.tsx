import { useVpn } from '@/context/VpnContext'
import { useEffect, useState } from 'react'

export function Timer() {
  const { connectionTime } = useVpn()
  const [displayTime, setDisplayTime] = useState<string>('00:00:00')

  useEffect(() => {
    // Update the formatted time whenever connectionTime changes
    setDisplayTime(formatTime(connectionTime))
  }, [connectionTime])

  // Format seconds to HH:MM:SS or DD:HH:MM:SS for longer durations
  const formatTime = (seconds: number) => {
    if (seconds <= 0) return '00:00:00'

    const days = Math.floor(seconds / 86400)
    const hours = Math.floor((seconds % 86400) / 3600)
    const minutes = Math.floor((seconds % 3600) / 60)
    const secs = seconds % 60

    const pad = (num: number) => num.toString().padStart(2, '0')

    // Only show days if there are any
    if (days > 0) {
      return `${days}d ${pad(hours)}:${pad(minutes)}:${pad(secs)}`
    } else {
      return `${pad(hours)}:${pad(minutes)}:${pad(secs)}`
    }
  }

  return (
    <div className='text-center mt-5'>
      <span className='text-2xl font-bold font-mono'>{displayTime}</span>
    </div>
  )
}
