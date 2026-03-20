import { MOBILE_WIDTH_BREAKPOINT, TABLET_WIDTH_BREAKPOINT } from '@/constants/screen.const'

/**
 * Retrieves information about the device screen.
 * @returns An object containing the width, height, and device type of the screen.
 * @throws {Error} If the function is executed outside of a browser environment.
 */
export function getDeviceScreen() {
  if (typeof window === 'undefined') throw new Error('This function must be executed in the browser')

  const { innerWidth, innerHeight } = window
  return {
    width: innerWidth,
    height: innerHeight,
    isMobile: innerWidth < MOBILE_WIDTH_BREAKPOINT,
    isTablet: innerWidth >= MOBILE_WIDTH_BREAKPOINT && innerWidth < TABLET_WIDTH_BREAKPOINT,
    isDesktop: innerWidth >= TABLET_WIDTH_BREAKPOINT,
    isSmallerThanTablet: innerWidth < TABLET_WIDTH_BREAKPOINT,
    isSmallerThanDesktop: innerWidth < TABLET_WIDTH_BREAKPOINT,
    isSmallerOrEqualToTablet: innerWidth <= TABLET_WIDTH_BREAKPOINT,
    isSmallerOrEqualToDesktop: innerWidth <= TABLET_WIDTH_BREAKPOINT
  }
}