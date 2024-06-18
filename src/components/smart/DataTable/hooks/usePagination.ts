import { useState } from 'react';

interface Pagination {
	currentPage: number;
	totalPages: number;
	pageSize: number;
}

const usePagination = (
	initialPageSize: number,
	totalItems: number
): {
	pagination: Pagination;
	onPageChange: (newPage: number) => void;
	onPageSizeChange: (newSize: number) => void;
} => {
	const totalPages = Math.ceil(totalItems / initialPageSize);
	const [pagination, setPagination] = useState<Pagination>({
		currentPage: 1,
		totalPages,
		pageSize: initialPageSize,
	});

	const onPageChange = (newPage: number): void => {
		setPagination((prev) => ({ ...prev, currentPage: newPage }));
	};

	const onPageSizeChange = (newSize: number): void => {
		const newTotalPages = Math.ceil(totalItems / newSize);
		setPagination((prev) => ({ ...prev, pageSize: newSize, totalPages: newTotalPages, currentPage: 1 }));
	};

	return {
		pagination,
		onPageChange,
		onPageSizeChange,
	};
};

export default usePagination;