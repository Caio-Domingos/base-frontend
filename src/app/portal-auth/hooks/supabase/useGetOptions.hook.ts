import type { DataTableState } from '@components/smart/DataTable/DataTable.component';
import type { GetOptions } from 'api/supabase/base/database.service';
import { useMemo } from 'react';

export interface FilterConfig {
	type: 'and' | 'or';
	filters: {
		column: string;
		operator: 'contains' | 'empty' | 'endswith' | 'eq' | 'startswith';
	}[];
}

export default function useGetOptions(state: DataTableState, filterConfig?: FilterConfig): GetOptions {
	return useMemo(() => {
		const getOptions: GetOptions = {
			pagination: {
				page: 0,
				size: 10,
			},
			sort: [],
			filters: [],
			search: undefined,
		};

		if (!state) return getOptions;

		if (state.pagination) {
			getOptions.pagination = {
				page: state.pagination.currentPage,
				size: state.pagination.pageSize,
			};
		}

		if (state.sort && state.sort.atualSort.direction !== 'none') {
			getOptions.sort = [
				{
					column: state.sort.atualSort.column,
					direction: state.sort.atualSort.direction,
				},
			];
		}

		if (state.search && filterConfig) {
			const filters = filterConfig.filters.map((filter) => ({
				column: filter.column,
				value: state.search,
				operator: filter.operator,
				visible: false,
			}));

			getOptions.filters = [
				{
					type: filterConfig.type,
					filters,
				},
			];
		}

		return getOptions;
	}, [state, filterConfig]);
}
