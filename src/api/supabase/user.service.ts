/* eslint-disable unicorn/no-null */
import type { User } from '@model/User.model';
import DatabaseService from './base/database.service';
import type { UserInsert, UserRow } from './base/database.interface';
import type { Session, WeakPassword } from '@supabase/supabase-js';

export default class UserService extends DatabaseService<User> {
	public constructor() {
		super('users');
	}

	public async getAuthenticatedUser(): Promise<User | null> {
		const user = await this.client.auth.getUser();
		if (!user) {
			return null;
		}

		const { data, error } = await this.client
			.from('users')
			.select('*')
			.eq('email', user.data.user?.email)
			.single();
		if (error) {
			throw new Error(error.message);
		}

		return data;
	}

	public async registerWithEmailPassword(name: string, email: string, password: string): Promise<User> {
		const { data, error } = await this.client.auth.signUp({ email, password });
		if (error) {
			throw new Error(error.message);
		}
		console.log('auth', data);

		const { data: dataCreated, error: errorCreated } = await this.client
			.from('users')
			.insert<UserInsert>([{ name, email }])
			.select<'*', UserRow>() // Tipagem no select
			.single();
		if (errorCreated) {
			throw new Error(errorCreated.message);
		}

		return dataCreated;
	}

	public async loginWithEmailPassword(email: string, password: string): Promise<any> {
		try {
			const { data, error } = await this.client.auth.signInWithPassword({ email, password });
			if (error) {
				throw error;
			}

			console.log('res login', data);
			return data;
		} catch (error: any) {
			console.error('error login service 4', error);
			throw error;
		}
	}
}
