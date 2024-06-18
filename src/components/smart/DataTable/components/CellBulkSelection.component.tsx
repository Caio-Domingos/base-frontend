import type { ReactElement } from 'react';

interface CellBuckSelectionProps {
	onChange: (el: React.ChangeEvent<HTMLInputElement>) => void;
}
export default function CellBulkSelectionComponent({ onChange }: CellBuckSelectionProps): ReactElement {
	return (
		<th scope='col' className='py-3 px-4 pe-0'>
			<div className='flex items-center h-5'>
				<input
					id='hs-table-pagination-checkbox-all'
					type='checkbox'
					className='border-gray-200 rounded text-blue-600 focus:ring-blue-500 dark:bg-neutral-800 dark:border-neutral-700 dark:checked:bg-blue-500 dark:checked:border-blue-500 dark:focus:ring-offset-gray-800'
					onChange={onChange}
				/>
				<label htmlFor='hs-table-pagination-checkbox-all' className='sr-only'>
					Checkbox
				</label>
			</div>
		</th>
	);
}
