/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable unicorn/no-nested-ternary */
/* eslint-disable react/button-has-type */
import { useEffect, useState, type ReactElement } from 'react';
import type { Column, SortConfig } from '../DataTable.component';

export interface Sort {
	column: string;
	direction: 'asc' | 'desc' | 'none';
}

interface SortWIthStatus extends Sort {
	status: boolean;
}

interface RowHeaderProps {
	column: Column;
	onSort?: (column: Column, sort: Sort) => void;
	sort: SortConfig | undefined;
}
export default function RowHeaderComponent({ column, onSort, sort }: RowHeaderProps): ReactElement {
	const [internSort, setInternSort] = useState<SortWIthStatus>({
		column: column.id,
		direction: 'none',
		status: false,
	});

	const handleSort = (): void => {
		if (!column.canSorted || !onSort) return;
		const newDirectionDefault: 'asc' | 'desc' | 'none' = internSort.direction === 'asc' ? 'desc' : internSort.direction === 'desc' ? 'none' : 'asc';

		const newDirection = internSort.status ? newDirectionDefault : 'asc';

		const newSort = { ...(sort?.columnsSort[column.id] ?? internSort), direction: newDirection };
		if (onSort && column.canSorted) onSort(column, newSort);
	};

	useEffect(() => {
		// check if active sort is this column
		if (sort?.atualSort.column === column.id && sort?.atualSort.direction !== 'none') {
			setInternSort({ ...sort.columnsSort[column.id], status: true });
		} else if (sort) {
			setInternSort({ ...(sort.columnsSort[column.id] ?? { column: column.id, direction: 'none' }), status: false });
		}
	}, [sort]);
	useEffect(() => {
		console.log(`intern sort => ${column.label}`, internSort);
	}, [internSort]);

	if (!sort) {
		return (
			<th key={column.id} scope='col' className='px-6 py-3 text-start text-xs font-medium text-gray-500 uppercase dark:text-neutral-500'>
				{column.label}
			</th>
		);
	}

	return (
		<th key={column.id} scope='col' className='px-6 py-3 text-start text-xs font-medium text-gray-500 uppercase dark:text-neutral-500'>
			{column.canSorted && onSort ? (
				<button
					className={`flex items-center justify-center gap-1 focus:outline-none cursor-pointer ${
						sort && internSort.direction === 'none' && internSort.column === column.id ? 'group' : ''
					}`}
					onClick={handleSort}
					type='button'
				>
					{column.label}
					{internSort && (internSort.direction === 'none' || !internSort.status) ? (
						<i className='fa-solid fa-arrow-up opacity-0 transition-opacity group-hover:opacity-100' />
					) : (
						''
					)}
					{internSort && internSort.status && (internSort.direction === 'asc' || internSort.direction === 'desc') ? (
						<i className={`fa-solid fa-arrow-${(internSort.direction as any) === 'asc' ? 'up' : 'down'} `} />
					) : (
						''
					)}
					<span className='flex flex-col'>
						<span className='border border-gray-300 dark:border-neutral-700 rounded-sm w-1 h-2' />
						<span className='border border-gray-300 dark:border-neutral-700 rounded-sm w-1 h-2' />
					</span>
				</button>
			) : (
				column.label
			)}
		</th>
	);
}
