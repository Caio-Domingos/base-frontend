import type { User } from '@model/User.model';

export interface Database {
	public: {
		Tables: {
			user: {
				Row: User;
				Insert: Omit<User, 'created_at' | 'id'>; // Tipo para inserção, omitindo campos gerados automaticamente
				Update: Partial<Omit<User, 'created_at' | 'id'>>;
			};
		};
	};
}

export type UserRow = Database['public']['Tables']['user']['Row'];
export type UserInsert = Database['public']['Tables']['user']['Insert'];
export type UserUpdate = Database['public']['Tables']['user']['Update'];
