/* eslint-disable unicorn/no-nested-ternary */
/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable react/no-array-index-key */
/* eslint-disable react/jsx-key */
/* eslint-disable react/no-object-type-as-default-prop */
import Button from '@components/form-control/Button';
import TextField from '@components/form-control/TextField';
import { useEffect, useState, type ReactElement } from 'react';
import useSelection from './hooks/useSelection.hook';
import RowHeaderComponent, { type Sort } from './components/RowHeader.component';
import CellBulkSelectionComponent from './components/CellBulkSelection.component';
import CellSelectionComponent from './components/CellSelection.component';
import PaginationComponent from './components/Pagination.component';
import usePagination, { type Pagination } from './hooks/usePagination.hook';
import { UtilsHandler } from 'features/handlers/utils.handler';
import RowActionButton from './components/RowActionButton.component';

export interface Column {
	id: string;
	label: string;
	visible: boolean;
	canSorted?: boolean;
}
interface HasId {
	id: number;
}

interface Selection {
	type: 'all' | 'none' | 'some-all' | 'some-none';
	selected?: any[];
	unselected?: any[];
}

export interface SortConfig {
	atualSort: Sort;
	columnsSort: Record<string, Sort>;
}

export interface RowAction {
	id: string;
	name: string;
	isIcon?: boolean;
	color?: 'danger' | 'dark' | 'info' | 'light' | 'primary' | 'secondary' | 'success' | 'tertiary' | 'warning';
	action: (id: string, context: any) => void;
}

interface DataTableBaseProps<T> {
	columns: Column[];
	data: T[];
	tableActions?: any[];
	rowActions?: any[];

	// Selection
	hasSelection?: boolean;
	changeSelection?: (selection: Selection) => void;

	// Sorting

	// Pagination
	paginationConfig: {
		totalItems?: number;
		pageSize?: number;
	};

	loading?: boolean;

	// Change State
	onChangeState?: (state: any) => void;
	onChangeSelection?: (selection: Selection) => void;
}

type DataTableComponentProps<T> = DataTableBaseProps<T>;

export interface DataTableState {
	pagination: Pagination;
	sort: SortConfig | undefined;
	search: string;
}

export default function DataTableComponent<T extends HasId>({
	columns = [],
	data = [],
	hasSelection,
	paginationConfig = {
		totalItems: 0,
		pageSize: 10,
	},
	rowActions = [],
	tableActions = [],
	loading,
	changeSelection,
	onChangeState,
	onChangeSelection,
}: DataTableComponentProps<T>): ReactElement {
	const [displayedColumns, setDisplayedColumns] = useState<Column[]>([]);
	const { selection, onChangeItemSelection, onChangeBulkSelection, setSelection } = useSelection();
	const [sort, setSort] = useState<SortConfig>();
	const [search, setSearch] = useState<string>('');
	const { pagination, onPageChange, onPageSizeChange, onTotalItemsChange } = usePagination(
		paginationConfig.pageSize ?? 10,
		paginationConfig.totalItems ?? 0
	);

	const [dataTableState, setDataTableState] = useState<DataTableState>({
		pagination,
		sort,
		search,
	});

	const changeDataTableState = (newState: any): void => {
		setDataTableState(newState);
	};

	useEffect(() => {
		const compareState = UtilsHandler.getDeepDifferences(displayedColumns, columns);
		if (Object.keys(compareState).length > 0) setDisplayedColumns(columns.filter((column) => column.visible));
	}, [columns]);
	useEffect(() => {
		setSort({
			atualSort: { column: columns[0].id, direction: 'none' },
			columnsSort: Object.fromEntries(columns.map((column) => [column.id, { column: column.id, direction: 'none' }])),
		});
	}, [displayedColumns]);
	useEffect(() => {
		if (hasSelection && changeSelection) changeSelection(selection);
	}, [hasSelection, changeSelection, selection]);
	useEffect(() => {
		onPageSizeChange(paginationConfig.pageSize ?? 10);
	}, [paginationConfig.pageSize]);
	useEffect(() => {
		onTotalItemsChange(paginationConfig.totalItems ?? 100);
	}, [paginationConfig.totalItems]);

	useEffect(() => {
		const newDataState = {
			pagination,
			sort,
			search,
		};
		const compareState = UtilsHandler.getDeepDifferences(dataTableState, newDataState);

		if (Object.keys(compareState).length > 0) {
			changeDataTableState(newDataState);
			if (onChangeState) onChangeState(newDataState);
		}
	}, [pagination, sort, search]);

	useEffect(() => {
		if (onChangeSelection) onChangeSelection(selection);
	}, [selection]);

	const handleChangeBulkSelection = (el: React.ChangeEvent<HTMLInputElement>): void => {
		onChangeBulkSelection(el.target.checked);
	};
	const handleChangeItemSelection = (el: React.ChangeEvent<HTMLInputElement>, item: T): void => {
		onChangeItemSelection(item, el.target.checked);
	};

	const handleOnSort = (column: Column, newSort: Sort): void => {
		setSort((state: any) => ({
			atualSort: newSort,
			columnsSort: {
				...state.columnsSort,
				[column.id]: newSort,
			},
		}));
	};

	return (
		<>
			<div id='search-filters' className='flex items-end justify-between w-full flex-wrap'>
				<div className='w-full md:w-1/3 max-w-[350px]' id='search'>
					<TextField label='Search' prefix={{ icon: 'fa-solid fa-search' }} value={search} onChange={(e) => setSearch(e.target.value)} />
				</div>
				<div className='w-full md:w-auto flex items-center justify-end gap-4' id='data-actions'>
					{tableActions.map((action, bindex) => (
						<Button key={bindex} className='w-full md:w-auto rounded-lg flex items-center justify-center gap-4' onClick={action.action}>
							{action.name}
							{action.icon ? <i className={action.icon} /> : ''}
						</Button>
					))}
				</div>
			</div>
			<div className='flex flex-col w-full'>
				<div className='-m-1.5 overflow-x-auto'>
					<div className='p-1.5 min-w-full inline-block align-middle'>
						<div className='border rounded-lg divide-y divide-gray-200 dark:border-neutral-700 dark:divide-neutral-700'>
							<div className='overflow-hidden'>
								<table className='min-w-full divide-y divide-gray-200 dark:divide-neutral-700'>
									<thead className='bg-gray-50 dark:bg-neutral-700'>
										<tr>
											{hasSelection ? <CellBulkSelectionComponent onChange={handleChangeBulkSelection} /> : ''}
											{displayedColumns.map((column, index) => (
												<RowHeaderComponent key={index} column={column} onSort={handleOnSort} sort={sort} />
											))}
											{rowActions.length > 0 ? (
												<th scope='col' className='px-6 py-3 text-end text-xs font-medium text-gray-500 uppercase dark:text-neutral-500'>
													Action
												</th>
											) : (
												''
											)}
										</tr>
									</thead>
									<tbody className='relative divide-y divide-gray-200 dark:divide-neutral-700'>
										{loading ? (
											// TODO: Fix this loading state
											<tr className='px-6 py-4 h-52  whitespace-nowrap text-sm font-medium text-gray-800 dark:text-neutral-200'>
													<td>
														<p className='absolute top-0 bottom-0 left-0 right-0 flex items-center justify-center'>Loading...</p>
													</td>
												</tr>
										) : data.length > 0 ? (
											data.map((d, index) => (
												<tr key={index}>
													{hasSelection ? <CellSelectionComponent data={d} onChange={handleChangeItemSelection} /> : ''}
													{displayedColumns.map((column, indexColumn) => (
														<td key={column.id} className='px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-800 dark:text-neutral-200'>
															{(d as any)[column.id]}
														</td>
													))}

													{rowActions.length > 0 ? (
														<td className='px-6 py-4 whitespace-nowrap text-end text-sm font-medium flex items-center justify-end gap-6'>
															{rowActions.map((action, actionIndex) => (
																<RowActionButton key={actionIndex} action={action} context={d} />
															))}
														</td>
													) : (
														''
													)}
												</tr>
											))
										) : (
											<tr>
												<td
													colSpan={displayedColumns.length + 1}
													className='px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-800 dark:text-neutral-200'
												>
													No data found
												</td>
											</tr>
										)}
									</tbody>
								</table>
							</div>
							<div className={loading ? 'py-1 px-4' : ''}>
								{!loading &&
								paginationConfig.totalItems &&
								paginationConfig.pageSize &&
								paginationConfig.totalItems > 0 &&
								paginationConfig.totalItems > paginationConfig.pageSize ? (
									<PaginationComponent
										currentPage={pagination.currentPage}
										totalPages={pagination.totalPages}
										onPageChange={onPageChange}
										onPageSizeChange={onPageSizeChange}
										pageSize={pagination.pageSize}
									/>
								) : (
									''
								)}
							</div>
						</div>
					</div>
				</div>
			</div>
		</>
	);
}
