/* eslint-disable jsx-a11y/anchor-is-valid */
/* eslint-disable jsx-a11y/label-has-associated-control */
import type React from 'react';
import { useState } from 'react';

import { FaEye, FaEyeSlash } from 'react-icons/fa';

export interface PasswordTextInputProperties {
	value: string;
	id: string;
	label: string;
	onChange: (value: string) => void;
	// eslint-disable-next-line unicorn/prevent-abbreviations
	onBlur: (e: any) => void;
}

export default function PasswordTextInput({
	label,
	value,
	id,
	onChange,
	onBlur,
}: PasswordTextInputProperties): React.ReactElement {
	const [showPassword, setShowPassword] = useState(false);

	return (
		<div className='w-full my-2'>
			<div className='flex items-center justify-between'>
				<label
					htmlFor={id}
					className='block text-sm text-gray-800 dark:text-gray-200'
				>
					{label}
				</label>
				<a
					href='#'
					className='text-xs text-gray-600 dark:text-gray-400 hover:underline'
				>
					Esqueceu a senha?
				</a>
			</div>

			<div className='w-full relative'>
				<input
					type={showPassword ? 'text' : 'password'}
					id={id}
					className='block w-full px-4 py-2 mt-2 text-gray-700 bg-white border rounded-lg dark:bg-gray-800 dark:text-gray-300 dark:border-gray-600 focus:border-blue-400 dark:focus:border-blue-300 focus:ring-blue-300 focus:outline-none focus:ring focus:ring-opacity-40'
					value={value}
					onChange={(event) => onChange(event.target.value)}
					onBlur={(_) => onBlur(_)}
				/>
				<div className='absolute inset-y-0 right-3 flex justify-center items-center'>
					<button
						type='button'
						// eslint-disable-next-line react/jsx-handler-names
						onClick={() => setShowPassword(!showPassword)}
					>
						{showPassword ? <FaEye /> : <FaEyeSlash />}
					</button>
				</div>
			</div>
		</div>
	);
}
