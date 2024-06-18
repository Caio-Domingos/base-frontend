/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable unicorn/no-nested-ternary */
/* eslint-disable react/button-has-type */
import { useEffect, useState, type ReactElement } from 'react';
import type { Column } from '../DataTable.component';

export interface Sort {
	column: string;
	direction: 'asc' | 'desc' | 'none';
}

interface RowHeaderProps {
	column: Column;
	onSort?: (column: Column, sort: Sort) => void;
}
export default function RowHeaderComponent({ column, onSort }: RowHeaderProps): ReactElement {
	const [sort, setSort] = useState<Sort>({ column: column.id, direction: 'none' });
	const [changeSort, setChangeSort] = useState(false);

	const handleSort = (): void => {
		if (!column.canSorted || !onSort) return;

		setSort((state) => {
			const nextDirection = state.direction === 'asc' ? 'desc' : state.direction === 'desc' ? 'none' : 'asc';
			const newSort: Sort = { ...sort, direction: nextDirection };
			return newSort;
		});
	};

	useEffect(() => {
		if (onSort && column.canSorted) onSort(column, sort);
	}, [sort]);

	return (
		<th key={column.id} scope='col' className='px-6 py-3 text-start text-xs font-medium text-gray-500 uppercase dark:text-neutral-500'>
			{column.canSorted && onSort ? (
				<button
					className={`flex items-center justify-center gap-1 focus:outline-none cursor-pointer ${
						sort.direction === 'none' && sort.column === column.id ? 'group' : ''
					}`}
					onClick={handleSort}
					type='button'
				>
					{column.label}
					{sort.direction === 'none' && sort.column === column.id ? (
						<i className='fa-solid fa-arrow-up opacity-0 transition-opacity group-hover:opacity-100' />
					) : (
						''
					)}
					{sort.direction !== 'none' && sort.column === column.id ? (
						<i className={`fa-solid fa-arrow-${sort.direction === 'asc' ? 'up' : 'down'} `} />
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
