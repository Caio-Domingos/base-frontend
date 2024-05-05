/* eslint-disable react/require-default-props */
/* eslint-disable react/jsx-no-leaked-render */
/* eslint-disable jsx-a11y/label-has-associated-control */
import type React from 'react';
import { useRef } from 'react';

export interface TextInputProperties {
	value: any;
	id: string;
	label?: string;
	type?: string;
	reference?: any;
	prefix?: React.ReactElement;
	onChange: (value: any) => void;
	onBlur: (event: any) => void;
}

export default function TextInput({
	label = '',
	value,
	id,
	type = 'text',
	reference = undefined,
	prefix = undefined,
	onChange,
	onBlur,
}: TextInputProperties): React.ReactElement {
	const internReference = useRef(null);

	return (
		<div className='w-full my-2'>
			{label && (
				<label
					htmlFor={id}
					className='block text-sm text-gray-800 dark:text-gray-200 mb-2'
				>
					{label}
				</label>
			)}

			{prefix ? (
				<div className='flex justify-center w-full'>
					<div className='h-11 w-14 flex justify-center items-center rounded-l-lg border dark:border-gray-600 dark:bg-rose-600 dark:text-gray-300'>
						{prefix}
					</div>
					<input
						id={id}
						ref={reference || internReference}
						type={type}
						className='block w-full px-4 py-2 text-gray-700 bg-white border rounded-r-lg dark:bg-gray-800 dark:text-gray-300 dark:border-gray-600 focus:border-blue-400 dark:focus:border-blue-300 focus:ring-blue-300 focus:outline-none focus:ring focus:ring-opacity-40'
						value={value}
						onChange={(event) => onChange(event.target.value)}
						onBlur={(_) => onBlur(_)}
					/>
				</div>
			) : (
				<input
					id={id}
					ref={reference || internReference}
					type={type}
					className='block w-full px-4 py-2 mt-2 text-gray-700 bg-white border rounded-lg dark:bg-gray-800 dark:text-gray-300 dark:border-gray-600 focus:border-blue-400 dark:focus:border-blue-300 focus:ring-blue-300 focus:outline-none focus:ring focus:ring-opacity-40'
					value={value}
					onChange={(event) => onChange(event.target.value)}
					onBlur={(_) => onBlur(_)}
				/>
			)}
		</div>
	);
}
