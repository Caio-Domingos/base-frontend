import type React from 'react'

export interface ButtonProperties {
	children: React.ReactNode
	label?: string
	color?:
		| 'amber'
		| 'blue'
		| 'cyan'
		| 'emerald'
		| 'fuchsia'
		| 'gray'
		| 'green'
		| 'indigo'
		| 'lime'
		| 'neutral'
		| 'orange'
		| 'pink'
		| 'purple'
		| 'red'
		| 'rose'
		| 'sky'
		| 'slate'
		| 'stone'
		| 'teal'
		| 'violet'
		| 'yellow'
		| 'zinc'
	onClick: () => void
}

export default function IconButton({
	children,
	color = 'red', // Default color
	label,
	onClick
}: ButtonProperties): React.ReactElement {
	// eslint-disable-next-line @typescript-eslint/no-shadow, @typescript-eslint/explicit-function-return-type
	const colorClasses = (color: ButtonProperties['color']) => {
		const baseColor = {
			slate: 'bg-slate-600 hover:bg-slate-700 focus:ring-slate-500',
			gray: 'bg-gray-600 hover:bg-gray-700 focus:ring-gray-500',
			zinc: 'bg-zinc-600 hover:bg-zinc-700 focus:ring-zinc-500',
			neutral: 'bg-neutral-600 hover:bg-neutral-700 focus:ring-neutral-500',
			stone: 'bg-stone-600 hover:bg-stone-700 focus:ring-stone-500',
			red: 'bg-red-600 hover:bg-red-700 focus:ring-red-500',
			orange: 'bg-orange-600 hover:bg-orange-700 focus:ring-orange-500',
			amber: 'bg-amber-600 hover:bg-amber-700 focus:ring-amber-500',
			yellow: 'bg-yellow-600 hover:bg-yellow-700 focus:ring-yellow-500',
			lime: 'bg-lime-600 hover:bg-lime-700 focus:ring-lime-500',
			green: 'bg-green-600 hover:bg-green-700 focus:ring-green-500',
			emerald: 'bg-emerald-600 hover:bg-emerald-700 focus:ring-emerald-500',
			teal: 'bg-teal-600 hover:bg-teal-700 focus:ring-teal-500',
			cyan: 'bg-cyan-600 hover:bg-cyan-700 focus:ring-cyan-500',
			sky: 'bg-sky-600 hover:bg-sky-700 focus:ring-sky-500',
			blue: 'bg-blue-600 hover:bg-blue-700 focus:ring-blue-500',
			indigo: 'bg-indigo-600 hover:bg-indigo-700 focus:ring-indigo-500',
			violet: 'bg-violet-600 hover:bg-violet-700 focus:ring-violet-500',
			purple: 'bg-purple-600 hover:bg-purple-700 focus:ring-purple-500',
			fuchsia: 'bg-fuchsia-600 hover:bg-fuchsia-700 focus:ring-fuchsia-500',
			pink: 'bg-pink-600 hover:bg-pink-700 focus:ring-pink-500',
			rose: 'bg-rose-600 hover:bg-rose-700 focus:ring-rose-500'
		}
		return baseColor[color ?? 'red'] || baseColor.red // Fallback to red if color is undefined
	}

	return (
		<button
			type='button'
			className={`inline-flex items-center rounded-md border border-transparent px-4 py-2 text-base font-medium text-white shadow-sm focus:outline-none focus:ring-2 focus:ring-offset-2 ${colorClasses(
				color
			)}`}
			onClick={onClick}
		>
			{label} {children}
		</button>
	)
}

IconButton.defaultProps = {
	color: 'red',
	label: ''
}
