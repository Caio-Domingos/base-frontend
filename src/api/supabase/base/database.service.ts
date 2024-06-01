/* eslint-disable @typescript-eslint/lines-between-class-members */
/* eslint-disable unicorn/no-null */
/* eslint-disable @typescript-eslint/no-floating-promises */
import type { SupabaseClient } from '@supabase/supabase-js';
import type { ICrud } from './ICrud.interface';
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
	private readonly supabaseService = new SupabaseService();

	public client: SupabaseClient<any, any, any>;

	public constructor(table: string, options: DatabaseServiceOptions = {}) {
		this.table = table;
		this.client = this.supabaseService.client;

		this.tableId = options.tableId ?? 'id';
	}

	private getPagination(page: number, size: number): Pagination {
		const limit = size ? Number(size) : 3;
		const from = page ? page * limit : 0;
		const to = page ? from + size - 1 : size - 1;
		return { from, to };
	}

	private getFilter(query: any, filter: Filter): any {
		let returnValue = query;
		if (filter.value !== null) {
			switch (filter.operator) {
				case 'contains': {
					returnValue = query.ilike(filter.column, `%${filter.value}%`);
					break;
				}
				case 'startswith': {
					returnValue = query.ilike(filter.column, `${filter.value}%`);
					break;
				}
				case 'endswith': {
					returnValue = query.ilike(filter.column, `%${filter.value}`);
					break;
				}

				case 'empty': {
					returnValue = query.eq(filter.column, null);
					break;
				}

				case 'eq': {
					returnValue = query.eq(filter.column, filter.value);
					break;
				}

				default: {
					return returnValue;
				}
			}

			return returnValue;
		}
		return returnValue;
	}

	public async get(id: string): Promise<T> {
		const { data, error } = await this.client.from(this.table).select().eq(this.tableId, id).single();
		if (error) throw new Error(error.message);

		return data;
	}

	public async getAll(options: GetOptions = this.getOptionsDefault): Promise<T[]> {
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
			for (const filter of options.filters) {
				query = this.getFilter(query, filter);
			}
		}

		if (options.search) {
			query = query.textSearch(options.search.column ?? this.tableId, options.search.value ?? '');
		}

		const { data, error } = await query;
		if (error) throw new Error(error.message);
		return data;
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
	filters: Filter[];
	search?: SearchText;
}

interface DatabaseServiceOptions {
	tableId?: string;
}
