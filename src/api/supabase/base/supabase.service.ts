/* eslint-disable @typescript-eslint/lines-between-class-members */
import type { SupabaseClient } from '@supabase/supabase-js';
import type { Database } from './database.interface';
import { createClient } from '@supabase/supabase-js';

class SupabaseService {
	private static instance: SupabaseService;
	public readonly client: SupabaseClient<Database, 'public', any>;

	private constructor() {
		const url = import.meta.env.VITE_SUPABASE_URL;
		const key = import.meta.env.VITE_SUPABASE_KEY;

		this.client = createClient<Database>(url, key);
	}

	public static getInstance(): SupabaseService {
		if (!SupabaseService.instance) {
			SupabaseService.instance = new SupabaseService();
		}
		return SupabaseService.instance;
	}
}

export default SupabaseService;
