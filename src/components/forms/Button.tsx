import type React from 'react';

export interface ButtonProperties {
	label: string;
	disabled?: boolean;
	onClick: () => void;
}

export default function Button({
	label,
	disabled = false,
	onClick,
}: ButtonProperties): React.ReactElement {
	return (
		<button
			type='button'
			className='inline-flex items-center rounded-md border border-transparent bg-rose-600 px-4 py-2 text-base font-medium text-white shadow-sm hover:bg-rose-700 focus:outline-none focus:ring-2 focus:ring-rose-500 focus:ring-offset-2 disabled:bg-slate-50 disabled:text-slate-500 disabled:border-slate-200 disabled:shadow-none'
			onClick={onClick}
			disabled={disabled}
		>
			{label}
		</button>
	);
}
