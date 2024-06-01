import type { SupabaseClient } from '@supabase/supabase-js';
import { createClient } from '@supabase/supabase-js';

export default class SupabaseService {
	public readonly client: SupabaseClient<any, any, any>;

	public constructor() {
		const url = import.meta.env.VITE_SUPABASE_URL;
		const key = import.meta.env.VITE_SUPABASE_ANON_KEY;

		this.client = createClient(url, key);
	}
}
