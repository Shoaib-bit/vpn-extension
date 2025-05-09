import { ConnectionButton } from '@/components/ConnectionButton'
import { StatusDisplay } from '@/components/StatusDisplay'
import { ThemeToggle } from '@/components/ThemeToggle'
import { Timer } from '@/components/Timer'
import { useRouting } from '@/context/RoutingContext'
import { useVpn } from '@/context/VpnContext'

export function HomePage() {
  const { currentLocation, ipAddress } = useVpn()
  const { navigate } = useRouting()

  return (
    <div className='min-h-[400px] bg-vpn-background flex flex-col p-3 max-w-md'>
      <header className='flex justify-between items-center mb-2'>
        {/* <Settings size={20} className='' /> */}
        <div></div>
        <div className='flex items-center gap-3'>
          {/* <span className='text-vpn-yellow mr-1'>★</span> */}
          <ThemeToggle />
        </div>
      </header>

      <div className='text-center mb-2'>
        <h1 className='text-sm text-gray-400 mb-1'>Welcome to</h1>
        <h2 className='text-xl font-bold'>
          <span className='text-vpn-blue'>Virtual 5G</span> - <span>VPN</span>
        </h2>
      </div>
      {currentLocation && (
        <div
          className='bg-black/20 hover:bg-black/30 transition-colors p-4 rounded-lg flex items-center justify-between mb-4 cursor-pointer'
          onClick={() => navigate('location')}
        >
          <div className='flex items-center gap-3'>
            <img src={currentLocation?.serverFlag} alt='flag' className='w-5' />
            <div className='flex flex-col'>
              <span className='font-medium text-left'>{currentLocation?.serverName}</span>
              {ipAddress && <span className='text-xs text-gray-400 text-left'>{ipAddress}</span>}
            </div>
          </div>
          <div>
            <svg width='20' height='20' viewBox='0 0 24 24' fill='none' xmlns='http://www.w3.org/2000/svg'>
              <path d='M9 18L15 12L9 6' stroke='white' strokeWidth='2' strokeLinecap='round' strokeLinejoin='round' />
            </svg>
          </div>
        </div>
      )}

      <div className='flex-1 flex flex-col items-center justify-center'>
        <ConnectionButton />
        <StatusDisplay />
        <Timer />
      </div>

      <div className='h-24 mt-4 rounded-lg flex items-center justify-center text-gray-400 bg-black/10'>
        <span>Ad Placeholder</span>
      </div>
    </div>
  )
}

export default HomePage
