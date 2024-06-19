/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable unicorn/new-for-builtins */
/* eslint-disable react/no-array-index-key */
/* eslint-disable import/export */
import type React from 'react';
import { useEffect, useState } from 'react';

interface PaginationProps {
	currentPage: number;
	totalPages: number;
	onPageChange: (page: number) => void;
	onPageSizeChange: (size: number) => void;
	pageSize: number;
}

export default function PaginationComponent({
	currentPage,
	totalPages,
	onPageChange,
	onPageSizeChange,
	pageSize,
}: PaginationProps): React.ReactElement {
	const [paginationConfig, setPaginationConfig] = useState<{
		maxButtons: number;
		sideButtons: number;
		buttons: number[];
	}>({
		maxButtons: 5,
		sideButtons: 2,
		buttons: [],
	});

	useEffect(() => {
		const maxButtons = paginationConfig.maxButtons ?? 5;
		const sideButtons = paginationConfig.sideButtons ?? 2;

		let buttons;
		if (currentPage === 1) {
			// Check if totalPages > 5
			// If true, show 5 buttons
			// If false, show totalPages buttons

			buttons = totalPages > maxButtons ? Array.from({ length: maxButtons }, (_, i) => i + 1) : Array.from({ length: totalPages }, (_, i) => i + 1);
		} else if (currentPage === totalPages) {
			// Check if totalPages > 5
			// If true, show 5 buttons
			// If false, show totalPages buttons

			buttons =
				totalPages > maxButtons
					? Array.from({ length: maxButtons }, (_, i) => totalPages - maxButtons + i + 1)
					: Array.from({ length: totalPages }, (_, i) => totalPages - totalPages + i + 1);
		} else {
			// Discover if the current page have 2 or more pages before it
			const hasTwoPagesBefore = currentPage - sideButtons > 1;
			// Discover if the current page have 2 or more pages after it
			const hasTwoPagesAfter = currentPage + sideButtons < totalPages;

			// If the current page have 2 or more pages before it add 2, else add 1
			const start = hasTwoPagesBefore ? currentPage - sideButtons : 1;
			// If the current page have 2 or more pages after it add 2, else add 1
			const end = hasTwoPagesAfter ? currentPage + sideButtons : totalPages;

			buttons = Array.from({ length: end - start + 1 }, (_, i) => start + i);
			if (currentPage === 2 && (buttons as any).at(-1) < totalPages) {
				buttons = [...buttons, (buttons as any).at(-1) + 1];
			} else if (currentPage === totalPages - 1 && (buttons as any).at(0) > 1) {
				buttons = [(buttons as any).at(0) - 1, ...buttons];
			}
		}
		setPaginationConfig((state: any) => ({ ...state, buttons }));
	}, [currentPage, totalPages, pageSize, paginationConfig.maxButtons, paginationConfig.sideButtons]);

	return (
		<div className='py-1 px-4 w-full flex justify-end gap-4'>
			<select
				className='py-3 px-4 pe-9 inline-block w-24 border-gray-200 rounded-lg text-sm focus:border-blue-500 focus:ring-blue-500 disabled:opacity-50 disabled:pointer-events-none dark:bg-neutral-900 dark:border-neutral-700 dark:text-neutral-400 dark:placeholder-neutral-500 dark:focus:ring-neutral-600'
				value={pageSize}
				onChange={(e) => onPageSizeChange(Number(e.target.value))}
			>
				<option value={5}>5</option>
				<option value={10}>10</option>
				<option value={20}>20</option>
				<option value={50}>50</option>
			</select>
			<nav className='flex items-center space-x-1'>
				<button
					type='button'
					className='p-2.5 min-w-[40px] inline-flex justify-center items-center gap-x-2 text-sm rounded-full text-gray-800 hover:bg-gray-100 disabled:opacity-50 disabled:pointer-events-none dark:text-white dark:hover:bg-white/10'
					onClick={() => onPageChange(1)}
					disabled={currentPage === 1}
				>
					<span aria-hidden='true'>
						<i className='fa-solid fa-angles-left' />
					</span>
					<span className='sr-only'>Previous</span>
				</button>
				<button
					type='button'
					className='p-2.5 min-w-[40px] inline-flex justify-center items-center gap-x-2 text-sm rounded-full text-gray-800 hover:bg-gray-100 disabled:opacity-50 disabled:pointer-events-none dark:text-white dark:hover:bg-white/10'
					onClick={() => onPageChange(currentPage - 1)}
					disabled={currentPage === 1}
				>
					<span aria-hidden='true'>
						<i className='fa-solid fa-angle-left' />
					</span>
					<span className='sr-only'>Previous</span>
				</button>
				{[...paginationConfig.buttons].map((_, pageIndex) => (
					<button
						key={_}
						type='button'
						className={`min-w-[40px] flex justify-center items-center text-gray-800 hover:bg-gray-100 py-2.5 text-sm rounded-full ${
							currentPage === _ ? 'bg-blue-500 text-white' : ''
						} dark:text-white dark:hover:bg-white/10`}
						aria-current={currentPage === _ ? 'page' : undefined}
						onClick={() => onPageChange(_)}
					>
						{_}
					</button>
				))}
				<button
					type='button'
					className='p-2.5 min-w-[40px] inline-flex justify-center items-center gap-x-2 text-sm rounded-full text-gray-800 hover:bg-gray-100 disabled:opacity-50 disabled:pointer-events-none dark:text-white dark:hover:bg-white/10'
					onClick={() => onPageChange(currentPage + 1)}
					disabled={currentPage === totalPages}
				>
					<span className='sr-only'>Next</span>
					<i className='fa-solid fa-angle-right' />
				</button>
				<button
					type='button'
					className='p-2.5 min-w-[40px] inline-flex justify-center items-center gap-x-2 text-sm rounded-full text-gray-800 hover:bg-gray-100 disabled:opacity-50 disabled:pointer-events-none dark:text-white dark:hover:bg-white/10'
					onClick={() => onPageChange(totalPages)}
					disabled={currentPage === totalPages}
				>
					<span className='sr-only'>Next</span>

					<i className='fa-solid fa-angles-right' />
				</button>
			</nav>
		</div>
	);
}
