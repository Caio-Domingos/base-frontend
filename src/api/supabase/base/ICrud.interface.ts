import type { GetOptions } from './database.service';

export interface ICrud<T> {
	get: (id: string) => Promise<any>;
	getAll: (options: GetOptions) => Promise<T[]>;
	create: (t: T) => Promise<any>;
	update: (t: T) => Promise<any>;
	delete: (t: T) => Promise<any>;
}
