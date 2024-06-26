/* eslint-disable no-param-reassign */
/* eslint-disable @typescript-eslint/lines-between-class-members */
/* eslint-disable unicorn/no-null */
/* eslint-disable @typescript-eslint/no-floating-promises */
import type { SupabaseClient } from '@supabase/supabase-js';
import type { ICrud } from './ICrud.interface';
import type { Database } from './database.interface';
import SupabaseService from './supabase.service';

export default class DatabaseService<T> implements ICrud<T> {
	protected table: string;
	protected tableId: string;

	private readonly getOptionsDefault: GetOptions = {
		pagination: {
			page: 0,
			size: 3,
		},
		sort: [],
		filters: [],
		search: undefined,
	};

	public client: SupabaseClient<Database, 'public', any>;

	public constructor(table: string, options: DatabaseServiceOptions = {}) {
		this.table = table;
		this.client = SupabaseService.getInstance().client;

		this.tableId = options.tableId ?? 'id';
	}

	private getPagination(page: number, size: number): Pagination {
		const limit = size ? Number(size) : 3;
		const from = page ? (page - 1) * limit : 0;
		const to = page ? from + size - 1 : size - 1;
		return { from, to };
	}

	private getFilter(query: any, filter: Filter): any {
		if (filter.value !== null) {
			switch (filter.operator) {
				case 'contains': {
					return query.ilike(filter.column, `%${filter.value}%`);
				}
				case 'startswith': {
					return query.ilike(filter.column, `${filter.value}%`);
				}
				case 'endswith': {
					return query.ilike(filter.column, `%${filter.value}`);
				}
				case 'empty': {
					return query.eq(filter.column, null);
				}
				case 'eq': {
					return query.eq(filter.column, filter.value);
				}
				default: {
					return query;
				}
			}
		}
		return query;
	}

	private getFilterString(filter: Filter): string {
		if (filter.value !== null) {
			switch (filter.operator) {
				case 'contains': {
					return `${filter.column}.ilike.%${filter.value}%`;
				}
				case 'startswith': {
					return `${filter.column}.ilike.${filter.value}%`;
				}
				case 'endswith': {
					return `${filter.column}.ilike.%${filter.value}`;
				}
				case 'empty': {
					return `${filter.column}.is.null`;
				}
				case 'eq': {
					return `${filter.column}.eq.${filter.value}`;
				}
				default: {
					return '';
				}
			}
		}
		return '';
	}

	private applyFilters(query: any, filters: FilterGroup[]): any {
		for (const group of filters) {
			if (group.type === 'and') {
				for (const filter of group.filters) {
					query = this.getFilter(query, filter);
				}
			} else if (group.type === 'or') {
				const orFilters = group.filters
					.map((filter) => this.getFilterString(filter))
					.filter((filterString) => filterString.length > 0)
					.join(',');
				if (orFilters) {
					query = query.or(orFilters);
				}
			}
		}
		return query;
	}

	public async get(id: string): Promise<T> {
		const { data, error } = await this.client.from(this.table).select().eq(this.tableId, id).single();
		if (error) throw new Error(error.message);

		return data;
	}

	public async getAll(options: GetOptions = this.getOptionsDefault): Promise<{
		data: T[];
		count: number;
	}> {
		const countQuery = this.client.from(this.table).select('*', { count: 'exact', head: true });

		let query = this.client.from(this.table).select('*', { count: 'estimated' });

		// Pagination
		if (options.pagination) {
			const { page, size } = options.pagination;
			const { from, to } = this.getPagination(page, size);
			query.range(from, to);
		}

		if (options.sort.length > 0) {
			for (const sort of options.sort) {
				query.order(sort.column, { ascending: sort.direction === 'asc' });
			}
		}

		if (options.filters.length > 0) {
			query = this.applyFilters(query, options.filters);
		  }

		if (options.search) {
			// TODO: Implement search
		}

		const { data, error } = await query;
		const { count } = await countQuery;
		if (error) throw new Error(error.message);
		return {
			data,
			count: count ?? 0,
		};
	}

	public async create(t: Partial<T>): Promise<Partial<T>> {
		const { data, error } = await this.client.from(this.table).insert(t);

		if (error) {
			throw new Error(error.message);
		}
		return t;
	}

	public async update(t: T): Promise<T | null> {
		const { data, error } = await this.client
			.from(this.table)
			.update(t as any)
			.eq(this.tableId, (t as any)[this.tableId])
			.select()
			.single();
		if (error) {
			throw new Error(error.message);
		}
		return data;
	}

	public async delete(t: T): Promise<null> {
		const { data, error } = await this.client
			.from(this.table)
			.delete()
			.eq(this.tableId, (t as any)[this.tableId]);
		if (error) {
			throw new Error(error.message);
		}
		return data;
	}
}

interface Pagination {
	from: number;
	to: number;
}

interface FilterGroup {
	type: 'and' | 'or';
	filters: Filter[];
}

interface Filter {
	column: string;
	operator: 'contains' | 'empty' | 'endswith' | 'eq' | 'gt' | 'gte' | 'ilike' | 'lt' | 'lte' | 'neq' | 'startswith';
	value: string | null;
	visible: boolean;
}

interface Sort {
	column: string;
	direction: 'asc' | 'desc';
}

interface SearchText {
	column: string;
	value: string;
}

export interface GetOptions {
	pagination?: {
		page: number;
		size: number;
	};
	sort: Sort[];
	filters: FilterGroup[];
	search?: SearchText;
}

interface DatabaseServiceOptions {
	tableId?: string;
}
