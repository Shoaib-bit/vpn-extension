import { useTheme } from '@/context/ThemeContext'
import { useVpn } from '@/context/VpnContext'

export function StatusDisplay() {
  const { isConnected } = useVpn()
  const { theme } = useTheme()

  return (
    <div className='text-center mt-3'>
      <span className='text-sm mr-2'>Status:</span>
      {isConnected === 'not-connected' && (
        <span className={`text-sm font-medium ${theme === 'light' ? 'text-red-500' : 'text-vpn-red'}`}>
          Not Connected
        </span>
      )}
      {isConnected === 'connecting' && (
        <span className={`text-sm font-medium ${theme === 'light' ? 'text-yellow-500' : 'text-vpn-yellow'}`}>
          Connecting
        </span>
      )}
      {isConnected === 'connected' && (
        <span className={`text-sm font-medium ${theme === 'light' ? 'text-green-500' : 'text-vpn-green'}`}>
          Connected
        </span>
      )}
    </div>
  )
}
