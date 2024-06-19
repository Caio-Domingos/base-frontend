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
import usePagination from './hooks/usePagination';
import { UtilsHandler } from 'features/handlers/utils.handler';

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

interface DataTableBaseProps<T> {
	columns: Column[];
	data: T[];
	tableActions?: any[];
	rowActions?: any[];

	// Selection
	hasSelection?: true;
	changeSelection?: (selection: Selection) => void;

	// Sorting

	// Pagination
	paginationConfig: {
		totalItems?: number;
		pageSize?: number;
	};

	// Change State
	onChangeState?: (state: any) => void;
}

type DataTableComponentProps<T> = DataTableBaseProps<T>;

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
	changeSelection,
	onChangeState,
}: DataTableComponentProps<T>): ReactElement {
	const [displayedColumns, setDisplayedColumns] = useState<Column[]>([]);
	const { selection, onChangeItemSelection, onChangeBulkSelection, setSelection } = useSelection();
	const [sort, setSort] = useState<SortConfig>();
	const [search, setSearch] = useState<string>('');
	const { pagination, onPageChange, onPageSizeChange, onTotalItemsChange } = usePagination(
		paginationConfig.pageSize ?? 10,
		paginationConfig.totalItems ?? 0
	);

	const [dataTableState, setDataTableState] = useState({
		selection,
		pagination,
		sort,
		search,
	});

	const changeDataTableState = (newState: any): void => {
		setDataTableState(newState);
	};

	useEffect(() => {
		setDisplayedColumns(columns.filter((column) => column.visible));
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
			selection,
			pagination,
			sort,
			search,
		};

		const compareState = UtilsHandler.getDeepDifferences(dataTableState, newDataState);
		console.log('my compare', compareState);
		console.log('my compare', Object.keys(compareState).length > 0);

		if (Object.keys(compareState).length > 0) {
			console.log('my compare has changes', compareState);
			changeDataTableState(newDataState);
			if (onChangeState) onChangeState(newDataState);
		}
	}, [pagination, sort, selection, search]);

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
				<div className='w-full md:w-1/3 max-w-[350px] mb-4' id='search'>
					<TextField label='Search' prefix={{ icon: 'fa-solid fa-search' }} value={search} onChange={(e) => setSearch(e.target.value)} />
				</div>
				<div className='w-full md:w-auto' id='data-actions'>
					{tableActions.map((action) => (
						<Button className='w-full md:w-auto rounded-lg' onClick={action.action}>
							{action.name}
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
									<tbody className='divide-y divide-gray-200 dark:divide-neutral-700'>
										{data.map((d, index) => (
											<tr key={index}>
												{hasSelection ? <CellSelectionComponent data={d} onChange={handleChangeItemSelection} /> : ''}
												{displayedColumns.map((column, indexColumn) => (
													<td key={column.id} className='px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-800 dark:text-neutral-200'>
														{(d as any)[column.id]}
													</td>
												))}

												{rowActions.length > 0 ? (
													<td className='px-6 py-4 whitespace-nowrap text-end text-sm font-medium'>
														<button
															type='button'
															className='inline-flex items-center gap-x-2 text-sm font-semibold rounded-lg border border-transparent text-blue-600 hover:text-blue-800 disabled:opacity-50 disabled:pointer-events-none dark:text-blue-500 dark:hover:text-blue-400'
														>
															Delete
														</button>
													</td>
												) : (
													''
												)}
											</tr>
										))}
									</tbody>
								</table>
							</div>
							<div className='py-1 px-4'>
								{paginationConfig.totalItems &&
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
