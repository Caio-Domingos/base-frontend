/* eslint-disable no-extra-boolean-cast */
/* eslint-disable no-promise-executor-return */
/* eslint-disable react-hooks/rules-of-hooks */
/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable @typescript-eslint/no-floating-promises */
/* eslint-disable @typescript-eslint/no-confusing-void-expression */
import KpiCardComponent from '@components/simple/KpiCard/KpiCard.component';
import DataTableComponent, { type DataTableState } from '@components/smart/DataTable/DataTable.component';
import type { User } from '@model/User.model';
import type { GetOptions } from 'api/supabase/base/database.service';
import UserService from 'api/supabase/user.service';
import useGetOptions, { type FilterConfig } from 'app/portal-auth/hooks/supabase/useGetOptions.hook';
import useDebounce from 'app/portal-auth/hooks/useDebounce.hook';
import { UtilsHandler } from 'features/handlers/utils.handler';
import { useEffect, useMemo, useState } from 'react';

export default function MasterScreen(): React.ReactElement {
	const [tableState, setTableState] = useState<DataTableState>();
	const debouncedTableState: any = useDebounce(tableState, 300);
	const [data, setData] = useState<{
		data: User[];
		count: number;
	}>({
		data: [],
		count: 0,
	});
	const [loading, setLoading] = useState(false);
	const search = useMemo(() => 'email', []);

	const filterConfig: FilterConfig = {
		type: 'or',
		filters: [
			{ column: 'name', operator: 'contains' },
			{ column: 'email', operator: 'contains' },
		],
	};
	const getOptions = useGetOptions(debouncedTableState, filterConfig);

	// UserService class const
	const us = useMemo(() => new UserService(), []);

	const updateData = async (state: DataTableState): Promise<void> => {
		if (!state) return;

		console.log('Fetching data with state:', state);

		setLoading(true);
		try {
			// await UtilsHandler.promiseTimer(3_000_000);
			const res = await us.getAll(getOptions);

			console.log('Data:', res);
			setData(res);
		} catch (error) {
			console.error('Error fetching data:', error);
		} finally {
			setLoading(false);
		}
	};
	useEffect(() => {
		if (debouncedTableState) {
			updateData(debouncedTableState);
		}
	}, [debouncedTableState]);

	return (
		<div className='w-full flex flex-col items-center justify-start p-8'>
			<h1 className='text-2xl font-semibold w-full text-left mb-4'>Master</h1>
			<div className='w-full flex justify-start items-center mb-4 flex-wrap' id='kpis'>
				<KpiCardComponent size='small' />
				<KpiCardComponent size='small' />
			</div>
			<div className='w-full flex items-center flex-col justify-start gap-4' id='datatable'>
				{/* <DatatableComponent /> */}
				<DataTableComponent
					columns={[
						{ id: 'id', label: 'ID', visible: true, canSorted: true },
						{ id: 'name', label: 'Name', visible: true, canSorted: true },
						{ id: 'email', label: 'Email', visible: true },
						{ id: 'updated_at', label: 'Updated At', visible: true },
					]}
					data={data.data}
					loading={loading}
					rowActions={[
						{
							id: 'EDIT',
							name: 'fa-solid fa-pen',
							isIcon: true,
							color: 'warning',
							action: (id: string, context: any): void => {
								console.log('Delete', id, context);
							},
						},
						{
							id: 'DELETE',
							name: 'fa-solid fa-trash',
							isIcon: true,
							color: 'danger',
							action: (id: string, context: any): void => {
								console.log('Delete', id, context);
							},
						},
					]}
					tableActions={[
						{
							id: 'ADD',
							icon: 'fa-solid fa-add',
							name: 'Novo',
							color: 'warning',
							action: (): void => {
								console.log('Add');
							},
						},
					]}
					paginationConfig={{
						pageSize: 10,
						totalItems: data.count,
					}}
					onChangeState={(state) => {
						if (!tableState) {
							setTableState(state);
							return;
						}

						const diff = UtilsHandler.getDeepDifferences(tableState, state);
						delete diff['pagination.totalPages'];
						if (Object.keys(diff).length > 0) setTableState(state);
					}}
					onChangeSelection={(selection) => {
						console.log('Selection:', selection);
					}}
				/>
			</div>
		</div>
	);
}
