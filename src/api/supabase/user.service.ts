import type { User } from '@model/User.model';
import DatabaseService from './base/database.service';
import type { UserInsert, UserRow } from './base/database.interface';

export default class UserService extends DatabaseService<User> {
	public constructor() {
		super('users');
	}

	public async registerWithEmailPassword(name: string, email: string, password: string): Promise<User> {
		const { data, error } = await this.client.auth.signUp({ email, password });
		if (error) {
			throw new Error(error.message);
		}
		console.log('auth', data);

		const { data: dataCreated, error: errorCreated } = await this.client
			.from('user')
			.insert<UserInsert>([{ name, email }])
			.select<'*', UserRow>() // Tipagem no select
			.single();
		if (errorCreated) {
			throw new Error(errorCreated.message);
		}

		return dataCreated;
	}
}
