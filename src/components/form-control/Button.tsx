import { set } from 'date-fns';
import { useEffect, useState } from 'react';

interface ButtonProperties {
	children: React.ReactNode;
	className?: string;
	onClick?: () => void;
	type?: 'button' | 'reset' | 'submit';
	disabled?: boolean;

	color?: 'danger' | 'dark' | 'info' | 'light' | 'primary' | 'secondary' | 'success' | 'tertiary' | 'warning';
}

export default function Button({ children, className, onClick, type, disabled, color }: ButtonProperties): React.ReactElement {
	const [bgColor, setBgColor] = useState('');
	const [textColor, setTextColor] = useState('');

	useEffect(() => {
		switch (color) {
			case 'danger': {
				setBgColor('bg-danger hover:bg-danger-400 focus:bg-danger-400');
				setTextColor('text-white');
				break;
			}
			case 'dark': {
				setBgColor('bg-neutral-950 hover:bg-neutral-900 focus:bg-neutral-900 border border-neutral-700');
				setTextColor('text-white');
				break;
			}
			case 'info': {
				setBgColor('bg-info-500 hover:bg-info-400 focus:bg-info-400');
				setTextColor('text-white');
				break;
			}
			case 'light': {
				setBgColor('bg-neutral-50 hover:bg-neutral-100 focus:bg-neutral-100 border border-neutral-300');
				setTextColor('text-black');
				break;
			}
			case 'primary': {
				setBgColor('bg-primary hover:bg-primary-400 focus:bg-primary-400');
				setTextColor('text-white');
				break;
			}
			case 'secondary': {
				setBgColor('bg-secondary hover:bg-secondary-400 focus:bg-secondary-400');
				setTextColor('text-white');
				break;
			}
			case 'success': {
				setBgColor('bg-success hover:bg-success-400 focus:bg-success-400');
				setTextColor('text-white');
				break;
			}
			case 'tertiary': {
				setBgColor('bg-tertiary hover:bg-tertiary-400 focus:bg-tertiary-400');
				setTextColor('text-white');
				break;
			}
			case 'warning': {
				setBgColor('bg-warning hover:bg-warning-400 focus:bg-warning-400');
				setTextColor('text-white');
				break;
			}
			default: {
				setBgColor('bg-primary hover:bg-primary-400 focus:bg-primary-400');
				setTextColor('text-white');
				break;
			}
		}

        console.log('color', color);
	}, [color]);

	return (
		<button
			className={`w-full block ${bgColor} ${textColor} font-semibold rounded-lg px-4 py-3 mt-6 ${
				className ?? ''
			} flex items-center justify-center gap-3`}
			onClick={onClick}
			// eslint-disable-next-line react/button-has-type
			type={type ?? 'button'}
			disabled={disabled}
		>
			{children}
		</button>
	);
}
