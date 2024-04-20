
export const Shadows = () => {
  return (
    <>
      <span data-shadowleft className='fr-absolute fr-top-0 fr-left-0 fr-bottom-0 fr-w-16 fr-bg-gradient-to-r fr-from-black fr-to-[transparent] fr-pointer-events-none fr-z-[1]' />
      <span data-shadowright className='fr-absolute fr-top-0 fr-right-0 fr-bottom-0 fr-w-16 fr-bg-gradient-to-l fr-from-black fr-to-[transparent] fr-pointer-events-none fr-z-[1]' />
    </>
  )
}

Shadows.displayName = 'Shadows'