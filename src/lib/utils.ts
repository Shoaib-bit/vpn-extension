import { type ClassValue, clsx } from 'clsx'
import { twMerge } from 'tailwind-merge'

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

type WireGuardSection = {
  [key: string]: string
}

type WireGuardConfig = {
  [section: string]: WireGuardSection
}

export function parseWireGuardConfig(configString: string): WireGuardConfig {
  const sections = configString.trim().split(/\n\s*\n/)
  const result: WireGuardConfig = {}

  for (const section of sections) {
    const lines = section.trim().split('\n')
    const sectionHeader = lines[0].replace(/\[|\]/g, '')
    const sectionBody: WireGuardSection = {}

    for (let i = 1; i < lines.length; i++) {
      const [key, ...valueParts] = lines[i].split('=')
      const keyTrimmed = key.trim()
      const value = valueParts.join('=').trim() // Handles values with '=' in them
      sectionBody[keyTrimmed] = value
    }

    result[sectionHeader] = sectionBody
  }

  return result
}
