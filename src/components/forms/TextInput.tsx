/* eslint-disable jsx-a11y/label-has-associated-control */
import type React from 'react';

export interface TextInputProperties {
	value: string;
	id: string;
	label?: string;
	onChange: (value: string) => void;
	// eslint-disable-next-line unicorn/prevent-abbreviations
	onBlur: (e: any) => void;
}

export default function TextInput({
	label,
	value,
	id,
	onChange,
	onBlur,
}: TextInputProperties): React.ReactElement {
	return (
		<div className='w-full my-2'>
			{label ? (
				<label
					htmlFor={id}
					className='block text-sm text-gray-800 dark:text-gray-200'
				>
					{label}
				</label>
			) : undefined}

			<input
				type='text'
				id={id}
				className='block w-full px-4 py-2 mt-2 text-gray-700 bg-white border rounded-lg dark:bg-gray-800 dark:text-gray-300 dark:border-gray-600 focus:border-blue-400 dark:focus:border-blue-300 focus:ring-blue-300 focus:outline-none focus:ring focus:ring-opacity-40'
				value={value}
				onChange={(event) => onChange(event.target.value)}
				onBlur={(_) => onBlur(_)}
			/>
		</div>
	);
}

TextInput.defaultProps = {
	label: '',
};
