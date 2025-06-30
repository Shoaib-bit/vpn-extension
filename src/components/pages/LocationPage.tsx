import { LocationList } from '@/components/LocationList'
import { SearchBar } from '@/components/SearchBar'
import { ThemeToggle } from '@/components/ThemeToggle'
import { useRouting } from '@/context/RoutingContext'
import { ArrowLeft } from 'lucide-react'
import { useState } from 'react'

export function LocationPage() {
  const { navigate } = useRouting()
  const [searchQuery, setSearchQuery] = useState('')

  const handleSearch = (query: string) => {
    setSearchQuery(query)
  }

  return (
    <div className='min-h-[400px] bg-vpn-background  flex flex-col p-3 max-w-md '>
      <header className='flex justify-between items-center mb-2'>
        <button
          onClick={() => navigate('home')}
          className=' focus:outline-none hover:bg-black/20 p-1 rounded-full transition-colors'
        >
          <ArrowLeft size={20} />
        </button>
        <h1 className='text-lg font-medium'>Search Location</h1>
        <ThemeToggle />
      </header>

      <div className='mb-4 w-full'>
        <SearchBar onSearch={handleSearch} />
      </div>

      <div className='mt-2 bg-black/10 rounded-lg overflow-hidden flex-1'>
        <div className='p-4 bg-black/20 border-b border-gray-800'>
          <div className='flex items-center'>
            <svg
              width='20'
              height='20'
              viewBox='0 0 24 24'
              fill='none'
              xmlns='http://www.w3.org/2000/svg'
              className='mr-2'
            >
              <path
                d='M12 22C17.5228 22 22 17.5228 22 12C22 6.47715 17.5228 2 12 2C6.47715 2 2 6.47715 2 12C2 17.5228 6.47715 22 12 22Z'
                stroke='currentColor'
                strokeWidth='2'
                strokeLinecap='round'
                strokeLinejoin='round'
              />
              <path d='M2 12H22' stroke='currentColor' strokeWidth='2' strokeLinecap='round' strokeLinejoin='round' />
              <path
                d='M12 2C14.5013 4.73835 15.9228 8.29203 16 12C15.9228 15.708 14.5013 19.2616 12 22'
                stroke='currentColor'
                strokeWidth='2'
                strokeLinecap='round'
                strokeLinejoin='round'
              />
              <path
                d='M12 2C9.49872 4.73835 8.07725 8.29203 8 12C8.07725 15.708 9.49872 19.2616 12 22'
                stroke='currentColor'
                strokeWidth='2'
                strokeLinecap='round'
                strokeLinejoin='round'
              />
            </svg>
            <span className='text-sm'>Tap & Auto Connect Fastest Server</span>
          </div>
        </div>

        <LocationList searchQuery={searchQuery} />
      </div>

      <div className='h-24 mt-4 rounded-lg flex items-center justify-center text-gray-400 bg-black/10'>
        <span>Ad Placeholder</span>
      </div>
    </div>
  )
}

export default LocationPage
