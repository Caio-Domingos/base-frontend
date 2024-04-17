import type React from 'react'

export interface ButtonProperties {
	label: string
	onClick: () => void
}

export default function Button({
	label,
	onClick
}: ButtonProperties): React.ReactElement {
	return (
		<button
			type='button'
			className='inline-flex items-center rounded-md border border-transparent bg-indigo-600 px-4 py-2 text-base font-medium text-white shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2'
			onClick={onClick}
		>
			{label}
		</button>
	)
}
