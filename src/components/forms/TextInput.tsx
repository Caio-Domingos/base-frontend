import type React from 'react'

export interface TextInputProperties {
	value: string
	label?: string
	onChange: (value: string) => void
}

export default function Textinput({
	label,
	value,
	onChange
}: TextInputProperties): React.ReactElement {
	return (
		<div className='w-full'>
			{label ? (
				<label
					htmlFor='first-name'
					className='block text-base font-medium leading-6 text-gray-100'
				>
					{label}
				</label>
			) : (
				''
			)}
			<div>
				<input
					type='text'
					name='first-name'
					id='first-name'
					autoComplete='given-name'
					className='block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6'
					value={value}
					onChange={event => onChange(event.target.value)}
				/>
			</div>
		</div>
	)
}

Textinput.defaultProps = {
	label: ''
}
