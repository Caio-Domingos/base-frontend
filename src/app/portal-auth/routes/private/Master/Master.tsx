/* eslint-disable @typescript-eslint/no-floating-promises */
/* eslint-disable @typescript-eslint/no-confusing-void-expression */
import Button from '@components/form-control/Button';
import TextField from '@components/form-control/TextField';
import KpiCardComponent from '@components/simple/KpiCard/KpiCard.component';
import DataTableComponent from '@components/smart/DataTable/DataTable.component';
import useDebounce from 'app/portal-auth/hooks/useDebounce.hook';
import { useEffect, useState } from 'react';

export default function MasterScreen(): React.ReactElement {
	const [tableState, setTableState] = useState();
	const debouncedTableState = useDebounce(tableState, 300);

	const updateData = async (state: any): Promise<void> => {
		console.log('Fetching data with state:', state);
		// Chame a função getAll aqui com os parâmetros necessários
		// const data = await getAll(state);
		// Atualize o estado da tabela com os novos dados
	};
	useEffect(() => {
		if (debouncedTableState) {
			updateData(debouncedTableState);
		}
	}, [debouncedTableState]);

	return (
		<div className='w-full flex flex-col items-center justify-start p-4'>
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
					data={[
						{ id: 1, name: 'John Doe', email: 'email@email.com', updated_at: '2021-10-10' },
						{ id: 2, name: 'Jane Doe', email: 'email@email.com', updated_at: '2021-10-10' },
						{ id: 3, name: 'John Smith', email: 'email@email.com', updated_at: '2021-10-10' },
						{ id: 4, name: 'Jane Smith', email: 'email@email.com', updated_at: '2021-10-10' },
					]}
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
					paginationConfig={{
						pageSize: 10,
						totalItems: 100,
					}}
					onChangeState={(state) => {
						setTableState(state);
					}}
				/>
			</div>
		</div>
	);
}
