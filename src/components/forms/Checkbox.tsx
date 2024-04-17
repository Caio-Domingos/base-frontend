/* eslint-disable jsx-a11y/label-has-associated-control */
import type React from 'react'

interface CheckboxProperties {
	id: string
	label?: string
	size?: 'lg' | 'md' | 'sm'
	checked: boolean
	onChange: (checked: boolean) => void
}

export default function Checkbox({
	id,
	label,
	size,
	checked,
	onChange
}: CheckboxProperties): React.ReactElement {
	const createSizeClasses = (): string => {
		switch (size) {
			case 'sm': {
				return 'h-4 w-4'
			}
			case 'md': {
				return 'h-6 w-6'
			}
			case 'lg': {
				return 'h-8 w-8'
			}
			default: {
				return 'h-6 w-6'
			}
		}
	}

	return (
		<div className='relative flex gap-x-3'>
			<div className='flex h-6 items-center'>
				<input
					id={id}
					name={id}
					type='checkbox'
					className={`rounded border-gray-300 text-indigo-600 focus:ring-indigo-600 ${createSizeClasses()}`}
					checked={checked}
					onChange={event => onChange(event.target.checked)}
				/>
			</div>
			<div className='text-sm leading-6'>
				<label htmlFor={id} className='font-medium text-gray-100'>
					{label ?? ''}
				</label>
			</div>
		</div>
	)
}
Checkbox.defaultProps = {
	label: '', // Defina um valor padrão apropriado
	size: 'md' // Defina um valor padrão apropriado
}
