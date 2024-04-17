import { supabase } from './supabaseClient';

export default class CrudBaseService<T> {
	private readonly resource: string;

	public constructor(resource: string) {
		this.resource = resource || '/';
	}

	public async getAll(): Promise<T[]> {
		const database = supabase;
		const { data, error } = await database.from(this.resource).select('*');
		if (error) {
			throw new Error(error.message);
		}
		return data || [];
	}

	public async getOne(id: number): Promise<T> {
		const database = supabase;
		const { data, error } = await database
			.from(this.resource)
			.select('*')
			.eq('id', id);
		if (error) {
			throw new Error(error.message);
		}
		return data?.[0] || {};
	}

	public async getByFilter(filter: Partial<T>): Promise<T[]> {
		const database = supabase;
		let query = database.from(this.resource).select('*');

		for (const key of Object.keys(filter)) {
			query = query.eq(key.toString(), filter[key as keyof T]);
		}

		const { data, error } = await query;
		if (error) {
			throw new Error(error.message);
		}

		return data || [];
	}

	public async createOne(data: T): Promise<T> {
		const database = supabase;
		const { data: created, error } = await database
			.from(this.resource)
			.insert(data)
			.select()
			.single();
		if (error) {
			throw new Error(error.message);
		}

		console.log('created', created);
		return created as T;
	}

	public async updateOne(id: number, data: T): Promise<T> {
		const database = supabase;
		const { data: updated, error } = await database
			.from(this.resource)
			.update(data)
			.eq('id', id)
			.select()
			.single();
		if (error) {
			throw new Error(error.message);
		}
		return updated as T;
	}

	public async deleteOne(id: number): Promise<T> {
		const database = supabase;
		const { error } = await database.from(this.resource).delete().eq('id', id);
		if (error) {
			throw new Error(error.message);
		}
		return { id } as T;
	}
}
