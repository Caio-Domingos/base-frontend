import type { Session, SupabaseClient, User } from '@supabase/supabase-js';
import { supabase } from './supabaseClient';

export interface AuthUser {
	user: User | null;
	session: Session | null;
}

export class AuthService {
	private readonly instance: SupabaseClient<any, 'public', any>;

	public constructor() {
		this.instance = supabase;
	}

	public async getUser(): Promise<AuthUser> {
		const {
			data: { session },
		} = await this.instance.auth.getSession();
		const {
			data: { user },
		} = await this.instance.auth.getUser();

		return {
			user,
			session,
		};
	}

	public async login(credentials: {
		email: string;
		password: string;
	}): Promise<AuthUser> {
		const { data, error } = await this.instance.auth.signInWithPassword({
			email: credentials.email,
			password: credentials.password,
		});

		if (error) {
			throw error;
		}

		return data as any as AuthUser;
	}

	public async register(credentials: {
		email: string;
		password: string;
	}): Promise<AuthUser> {
		const { data, error } = await this.instance.auth.signUp({
			email: credentials.email,
			password: credentials.password,
		});

		if (error) {
			throw error;
		}

		return data;
	}

	public async logout(): Promise<void> {
		const { error } = await this.instance.auth.signOut();

		if (error) {
			throw error;
		}
	}
}
