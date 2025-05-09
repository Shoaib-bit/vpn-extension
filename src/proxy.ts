import { TPacExtProtocol } from './server'

const getPacScript = (protocol?: TPacExtProtocol, address?: string, port?: number) => {
  return `function FindProxyForURL(url, host) {
      return "${protocol && address && port ? `${protocol} ${address}:${port}` : 'DIRECT'}"
    }`
}

export const updateChromeProxy = async (
  protocol?: TPacExtProtocol,
  address?: string,
  port?: number,
  mode = 'pac_script',
  scope: 'regular' | 'regular_only' | 'incognito_persistent' | 'incognito_session_only' = 'regular'
): Promise<void> =>
  await chrome.proxy.settings.set({
    value: {
      mode,
      pacScript: {
        data: getPacScript(protocol, address, port)
      }
    },
    scope
  })
