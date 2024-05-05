import type React from 'react';

export interface ButtonProperties {
	children: React.ReactNode;
	label?: string;
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
		| 'zinc';
	onClick: () => void;
	mode?: 'normal' | 'outline';
}

export default function IconButton({
	children,
	color = 'red', // Default color
	mode = 'normal',
	label = '',
	onClick,
}: ButtonProperties): React.ReactElement {
	// eslint-disable-next-line @typescript-eslint/no-shadow, @typescript-eslint/explicit-function-return-type
	const colorClasses = (color: ButtonProperties['color']) => {
		const baseColor =
			mode === 'normal'
				? {
						slate:
							'bg-slate-600 hover:bg-slate-700 focus:ring-slate-500 px-4 py-2 text-base font-medium',
						gray: 'bg-gray-600 hover:bg-gray-700 focus:ring-gray-500 px-4 py-2 text-base font-medium',
						zinc: 'bg-zinc-600 hover:bg-zinc-700 focus:ring-zinc-500 px-4 py-2 text-base font-medium',
						neutral:
							'bg-neutral-600 hover:bg-neutral-700 focus:ring-neutral-500 px-4 py-2 text-base font-medium',
						stone:
							'bg-stone-600 hover:bg-stone-700 focus:ring-stone-500 px-4 py-2 text-base font-medium',
						red: 'bg-red-600 hover:bg-red-700 focus:ring-red-500 px-4 py-2 text-base font-medium',
						orange:
							'bg-orange-600 hover:bg-orange-700 focus:ring-orange-500 px-4 py-2 text-base font-medium',
						amber:
							'bg-amber-600 hover:bg-amber-700 focus:ring-amber-500 px-4 py-2 text-base font-medium',
						yellow:
							'bg-yellow-600 hover:bg-yellow-700 focus:ring-yellow-500 px-4 py-2 text-base font-medium',
						lime: 'bg-lime-600 hover:bg-lime-700 focus:ring-lime-500 px-4 py-2 text-base font-medium',
						green:
							'bg-green-600 hover:bg-green-700 focus:ring-green-500 px-4 py-2 text-base font-medium',
						emerald:
							'bg-emerald-600 hover:bg-emerald-700 focus:ring-emerald-500 px-4 py-2 text-base font-medium',
						teal: 'bg-teal-600 hover:bg-teal-700 focus:ring-teal-500 px-4 py-2 text-base font-medium',
						cyan: 'bg-cyan-600 hover:bg-cyan-700 focus:ring-cyan-500 px-4 py-2 text-base font-medium',
						sky: 'bg-sky-600 hover:bg-sky-700 focus:ring-sky-500 px-4 py-2 text-base font-medium',
						blue: 'bg-blue-600 hover:bg-blue-700 focus:ring-blue-500 px-4 py-2 text-base font-medium',
						indigo:
							'bg-indigo-600 hover:bg-indigo-700 focus:ring-indigo-500 px-4 py-2 text-base font-medium',
						violet:
							'bg-violet-600 hover:bg-violet-700 focus:ring-violet-500 px-4 py-2 text-base font-medium',
						purple:
							'bg-purple-600 hover:bg-purple-700 focus:ring-purple-500 px-4 py-2 text-base font-medium',
						fuchsia:
							'bg-fuchsia-600 hover:bg-fuchsia-700 focus:ring-fuchsia-500 px-4 py-2 text-base font-medium',
						pink: 'bg-pink-600 hover:bg-pink-700 focus:ring-pink-500 px-4 py-2 text-base font-medium',
						rose: 'bg-rose-600 hover:bg-rose-700 focus:ring-rose-500 px-4 py-2 text-base font-medium',
					}
				: {
						slate:
							'ring-1 ring-inset ring-slate-600 hover:bg-slate-600 focus:ring-slate-500 text-xs font-light px-5 py-3',
						gray: 'ring-1 ring-inset ring-gray-600 hover:bg-gray-600 focus:ring-gray-500 text-xs font-light px-5 py-3',
						zinc: 'ring-1 ring-inset ring-zinc-600 hover:bg-zinc-600 focus:ring-zinc-500 text-xs font-light px-5 py-3',
						neutral:
							'ring-1 ring-inset ring-neutral-600 hover:bg-neutral-600 focus:ring-neutral-500 text-xs font-light px-5 py-3',
						stone:
							'ring-1 ring-inset ring-stone-600 hover:bg-stone-600 focus:ring-stone-500 text-xs font-light px-5 py-3',
						red: 'ring-1 ring-inset ring-red-600 hover:bg-red-600 focus:ring-red-500 text-xs font-light px-5 py-3',
						orange:
							'ring-1 ring-inset ring-orange-600 hover:bg-orange-600 focus:ring-orange-500 text-xs font-light px-5 py-3',
						amber:
							'ring-1 ring-inset ring-amber-600 hover:bg-amber-600 focus:ring-amber-500 text-xs font-light px-5 py-3',
						yellow:
							'ring-1 ring-inset ring-yellow-600 hover:bg-yellow-600 focus:ring-yellow-500 text-xs font-light px-5 py-3',
						lime: 'ring-1 ring-inset ring-lime-600 hover:bg-lime-600 focus:ring-lime-500 text-xs font-light px-5 py-3',
						green:
							'ring-1 ring-inset ring-green-600 hover:bg-green-600 focus:ring-green-500 text-xs font-light px-5 py-3',
						emerald:
							'ring-1 ring-inset ring-emerald-600 hover:bg-emerald-600 focus:ring-emerald-500 text-xs font-light px-5 py-3',
						teal: 'ring-1 ring-inset ring-teal-600 hover:bg-teal-600 focus:ring-teal-500 text-xs font-light px-5 py-3',
						cyan: 'ring-1 ring-inset ring-cyan-600 hover:bg-cyan-600 focus:ring-cyan-500 text-xs font-light px-5 py-3',
						sky: 'ring-1 ring-inset ring-sky-600 hover:bg-sky-600 focus:ring-sky-500 text-xs font-light px-5 py-3',
						blue: 'ring-1 ring-inset ring-blue-600 hover:bg-blue-600 focus:ring-blue-500 text-xs font-light px-5 py-3',
						indigo:
							'ring-1 ring-inset ring-indigo-600 hover:bg-indigo-600 focus:ring-indigo-500 text-xs font-light px-5 py-3',
						violet:
							'ring-1 ring-inset ring-violet-600 hover:bg-violet-600 focus:ring-violet-500 text-xs font-light px-5 py-3',
						purple:
							'ring-1 ring-inset ring-purple-600 hover:bg-purple-600 focus:ring-purple-500 text-xs font-light px-5 py-3',
						fuchsia:
							'ring-1 ring-inset ring-fuchsia-600 hover:bg-fuchsia-600 focus:ring-fuchsia-500 text-xs font-light px-5 py-3',
						pink: 'ring-1 ring-inset ring-pink-600 hover:bg-pink-600 focus:ring-pink-500 text-xs font-light px-5 py-3',
						rose: 'ring-1 ring-inset ring-rose-600 hover:bg-rose-600 focus:ring-rose-500 text-xs font-light px-5 py-3',
					};
		return baseColor[color ?? 'red'] || baseColor.red; // Fallback to red if color is undefined
	};

	return (
		<button
			type='button'
			className={`inline-flex items-center rounded-md border border-transparent text-white shadow-sm focus:outline-none focus:ring-2 focus:ring-offset-2 transition-colors ${colorClasses(
				color
			)}`}
			onClick={onClick}
		>
			{children} {label}
		</button>
	);
}
