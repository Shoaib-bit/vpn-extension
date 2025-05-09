import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover'
import { useTheme } from '@/context/ThemeContext'
import { Moon, Sun } from 'lucide-react'

export function ThemeToggle() {
  const { theme, toggleTheme } = useTheme()

  return (
    <Popover>
      <PopoverTrigger asChild>
        <button className='p-2 rounded-full hover:bg-black/20 transition-colors'>
          {theme === 'dark' ? (
            <Sun size={18} className='text-vpn-yellow' />
          ) : (
            <Moon size={18} className='text-vpn-blue' />
          )}
        </button>
      </PopoverTrigger>
      <PopoverContent className='w-52 p-0 text-black'>
        <div className='p-2 bg-popover border-b'>
          <h4 className='text-sm font-medium'>Appearance</h4>
          <p className='text-xs text-muted-foreground'>Change the theme of the application</p>
        </div>
        <div className='p-2 text-black'>
          <button
            className={`w-full flex items-center gap-2 px-3 py-2 rounded-md ${theme === 'light' ? 'bg-accent' : 'hover:bg-accent/50'}`}
            onClick={toggleTheme}
          >
            <Sun size={16} className='text-black' />
            <span className='text-sm text-black'>Light</span>
          </button>
          <button
            className={`w-full flex items-center gap-2 px-3 py-2 rounded-md ${theme === 'dark' ? 'bg-accent' : 'hover:bg-accent/50'}`}
            onClick={toggleTheme}
          >
            <Moon size={16} className='text-black' />
            <span className='text-sm text-black'>Dark</span>
          </button>
        </div>
      </PopoverContent>
    </Popover>
  )
}
