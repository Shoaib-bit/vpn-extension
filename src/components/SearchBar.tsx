import { Input } from '@/components/ui/input'
import { Search } from 'lucide-react'
import { useState } from 'react'

interface SearchBarProps {
  onSearch: (query: string) => void
}

export function SearchBar({ onSearch }: SearchBarProps) {
  const [query, setQuery] = useState('')

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value
    setQuery(value)
    onSearch(value)
  }

  return (
    <div className='w-full'>
      <div className='relative flex-1'>
        <Search className='absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400' size={16} />
        <Input
          className='pl-9 py-1 h-10 bg-black/20 border-none  placeholder:text-gray-400 rounded-lg w-full'
          placeholder='Search Location'
          value={query}
          onChange={handleChange}
        />
      </div>
    </div>
  )
}
