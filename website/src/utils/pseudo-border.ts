type Opacity = 5 | 10 | 15 | 20 | 25
type Radius = 'none' | 'xs' | 'sm' | 'md' | 'lg' | 'xl' | '2xl' | '3xl' | 'base' | 'full'

type PseudoBorderOptions = {
	opacity?: Opacity
	radius?: Radius
}

const OPACITY_CLASSES: Record<Opacity, string> = {
	5: 'after:border-white/5',
	10: 'after:border-white/10',
	15: 'after:border-white/15',
	20: 'after:border-white/20',
	25: 'after:border-white/25'
}

const RADIUS_CLASSES: Record<Radius, string> = {
	none: 'after:rounded-none',
	xs: 'after:rounded-xs',
	sm: 'after:rounded-sm',
	md: 'after:rounded-md',
	lg: 'after:rounded-lg',
	xl: 'after:rounded-xl',
	'2xl': 'after:rounded-2xl',
	'3xl': 'after:rounded-3xl',
	base: 'after:rounded-(--base-radius)',
	full: 'after:rounded-full'
}

const BASE = 'after:content-[""] after:absolute after:inset-0 after:border after:z-1 after:pointer-events-none'

export function pseudoBorder({
	opacity = 5,
	radius = 'base'
}: PseudoBorderOptions = {}) {
	return `${BASE} ${OPACITY_CLASSES[opacity]} ${RADIUS_CLASSES[radius]}`
}
