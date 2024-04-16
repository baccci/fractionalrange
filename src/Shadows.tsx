
export const Shadows = () => {
  return (
    <>
      <span className='absolute top-0 left-0 bottom-0 w-16 bg-gradient-to-r from-black to-[transparent] pointer-events-none z-[1]' />
      <span className='absolute top-0 right-0 bottom-0 w-16 bg-gradient-to-l from-black to-[transparent] pointer-events-none z-[1]' />
    </>
  )
}

Shadows.displayName = 'Shadows'