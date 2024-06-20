// eslint-disable-next-line @typescript-eslint/no-import-type-side-effects
import { useEffect, useState } from 'react';
import type { RowAction } from '../DataTable.component';

interface RowActionButtonProps {
	action: RowAction;
	context: any;

	color?: 'danger' | 'dark' | 'info' | 'light' | 'primary' | 'secondary' | 'success' | 'tertiary' | 'warning';
}

export default function RowActionButton({ action, context, color = 'primary' }: RowActionButtonProps): React.ReactElement {
	const [colorState, setColorState] = useState(action.color ?? color);
	const [cssColor, setCssColor] = useState('');

	useEffect(() => {
		switch (colorState) {
			case 'danger': {
				setCssColor('text-danger-600 hover:text-danger-800 dark:text-danger-500 dark:hover:text-danger-400');
				break;
			}
			case 'dark': {
				setCssColor('text-neutral-950 hover:text-neutral-900 dark:text-neutral-950 dark:hover:text-neutral-900');
				break;
			}
			case 'info': {
				setCssColor('text-info-500 hover:text-info-400 dark:text-info-500 dark:hover:text-info-400');
				break;
			}
			case 'light': {
				setCssColor('text-neutral-50 hover:text-neutral-100 dark:text-neutral-50 dark:hover:text-neutral-100');
				break;
			}
			case 'primary': {
				setCssColor('text-primary hover:text-primary-400 dark:text-primary dark:hover:text-primary-400');
				break;
			}
			case 'secondary': {
				setCssColor('text-secondary hover:text-secondary-400 dark:text-secondary dark:hover:text-secondary-400');
				break;
			}
			case 'success': {
				setCssColor('text-success hover:text-success-400 dark:text-success dark:hover:text-success-400');
				break;
			}
			case 'tertiary': {
				setCssColor('text-tertiary hover:text-tertiary-400 dark:text-tertiary dark:hover:text-tertiary-400');
				break;
			}
			case 'warning': {
				setCssColor('text-warning hover:text-warning-400 dark:text-warning dark:hover:text-warning-400');
				break;
			}
			default: {
				setCssColor('text-primary hover:text-primary-400 dark:text-primary dark:hover:text-primary-400');
				break;
			}
		}
	}, [colorState]);

	return (
		<button
			key={action.id}
			type='button'
			className={`inline-flex items-center gap-x-2 text-sm font-semibold rounded-lg border border-transparent disabled:opacity-50 disabled:pointer-events-none ${cssColor}`}
			onClick={() => {
				action.action(action.id, context);
			}}
		>
			{action.isIcon ? <i className={action.name} /> : action.name}
		</button>
	);
}
