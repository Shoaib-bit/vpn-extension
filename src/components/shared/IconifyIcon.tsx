import { Icon } from '@iconify/react'

interface IconifyIconProps {
  icon: string
  className?: string
}

export const IconifyIcon = ({ icon, className }: IconifyIconProps) => {
  return <Icon icon={icon} className={className} />
}
