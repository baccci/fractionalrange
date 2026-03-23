import { MOBILE_WIDTH_BREAKPOINT, TABLET_WIDTH_BREAKPOINT } from '@/constants/screen'

export function getDeviceScreen() {
  if (typeof window === 'undefined') throw new Error('This function must be executed in the browser')

  const { innerWidth, innerHeight } = window
  return {
    width: innerWidth,
    height: innerHeight,
    isMobile: innerWidth < MOBILE_WIDTH_BREAKPOINT,
    isSmallerOrEqualToTablet: innerWidth <= TABLET_WIDTH_BREAKPOINT,
  }
}
