import { useVpn } from '@/context/VpnContext'
import { Power } from 'lucide-react'

export function ConnectionButton() {
  const { isConnected, connectVpn, disconnectVpn } = useVpn()

  const handleClick = () => {
    if (isConnected === 'connected') {
      disconnectVpn()
    } else if (isConnected === 'not-connected') {
      connectVpn()
    }
    // Do nothing when connecting
  }

  return (
    <div className='flex flex-col items-center'>
      <button
        onClick={handleClick}
        disabled={isConnected === 'connecting'}
        className='relative w-28 h-28 rounded-full flex items-center hover:opacity-90 justify-center focus:outline-none'
      >
        <div
          className={`absolute inset-0 rounded-full ${isConnected === 'connecting' ? 'animate-wave-ring' : ''} ${
            isConnected === 'not-connected'
              ? 'bg-vpn-blue opacity-20'
              : isConnected === 'connecting'
                ? 'bg-vpn-yellow opacity-20'
                : 'bg-vpn-green opacity-20'
          }`}
        >
          {isConnected === 'connected' && (
            <div className='absolute inset-0 rounded-full bg-vpn-green opacity-20 animate-pulse-ring'></div>
          )}
        </div>

        <div
          className={`w-24 h-24 rounded-full flex items-center justify-center ${
            isConnected === 'not-connected'
              ? 'bg-vpn-blue'
              : isConnected === 'connecting'
                ? 'bg-vpn-blue'
                : 'bg-vpn-green'
          }`}
        >
          {isConnected === 'connecting' ? (
            <div className='flex space-x-1'>
              <div className='w-2 h-2 rounded-full bg-white animate-connecting-dot-1'></div>
              <div className='w-2 h-2 rounded-full bg-white animate-connecting-dot-2'></div>
              <div className='w-2 h-2 rounded-full bg-white animate-connecting-dot-3'></div>
            </div>
          ) : (
            <Power size={32} className='' />
          )}
        </div>
      </button>

      <div className='mt-4 text-center'>
        {isConnected === 'not-connected' && <span className='uppercase text-xs font-bold'>TAP CONNECT</span>}
        {isConnected === 'connecting' && <span className='uppercase text-xs font-bold'>Connecting...</span>}
        {isConnected === 'connected' && <span className='uppercase text-xs font-bold'>TAP DISCONNECT</span>}
      </div>
    </div>
  )
}
