import type { ReactElement } from 'react';

interface CellSelectionProps {
	data: any;
	onChange: (el: React.ChangeEvent<HTMLInputElement>, item: any) => void;
}
export default function CellSelectionComponent({ data, onChange }: CellSelectionProps): ReactElement {
	return (
		<td className='py-3 ps-4'>
			<div className='flex items-center h-5'>
				<input
					id='hs-table-pagination-checkbox-1'
					type='checkbox'
					className='border-gray-200 rounded text-blue-600 focus:ring-blue-500 dark:bg-neutral-800 dark:border-neutral-700 dark:checked:bg-blue-500 dark:checked:border-blue-500 dark:focus:ring-offset-gray-800'
					value={data.id}
					onChange={(el) => onChange(el, data)}
				/>
				<label htmlFor='hs-table-pagination-checkbox-1' className='sr-only'>
					Checkbox
				</label>
			</div>
		</td>
	);
}
