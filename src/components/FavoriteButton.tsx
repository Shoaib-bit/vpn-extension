import { useVpn } from '@/context/VpnContext'

interface FavoriteButtonProps {
  locationId: string
}

export function FavoriteButton({ locationId }: FavoriteButtonProps) {
  const { toggleFavorite, isFavorite } = useVpn()
  const favorite = isFavorite(locationId)

  const handleToggleFavorite = (e: React.MouseEvent) => {
    e.stopPropagation()
    toggleFavorite(locationId)
  }

  return (
    <button onClick={handleToggleFavorite} className='p-1 focus:outline-none'>
      {favorite ? (
        <svg width='16' height='16' viewBox='0 0 24 24' fill='none' xmlns='http://www.w3.org/2000/svg'>
          <path
            d='M12 2L15.09 8.26L22 9.27L17 14.14L18.18 21.02L12 17.77L5.82 21.02L7 14.14L2 9.27L8.91 8.26L12 2Z'
            fill='#FFC107'
            stroke='#FFC107'
            strokeWidth='2'
            strokeLinecap='round'
            strokeLinejoin='round'
          />
        </svg>
      ) : (
        <svg width='16' height='16' viewBox='0 0 24 24' fill='none' xmlns='http://www.w3.org/2000/svg'>
          <path
            d='M12 2L15.09 8.26L22 9.27L17 14.14L18.18 21.02L12 17.77L5.82 21.02L7 14.14L2 9.27L8.91 8.26L12 2Z'
            stroke='#8E9196'
            strokeWidth='2'
            strokeLinecap='round'
            strokeLinejoin='round'
          />
        </svg>
      )}
    </button>
  )
}
