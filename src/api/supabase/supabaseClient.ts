/* eslint-disable import/prefer-default-export */
/* eslint-disable @typescript-eslint/no-unsafe-call */
import { createClient } from '@supabase/supabase-js';

const supabaseUrl = 'https://owtszxbqgantrgjnuvyu.supabase.co';
const supabaseAnonKey =
	'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im93dHN6eGJxZ2FudHJnam51dnl1Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3MTA4NTUzMDcsImV4cCI6MjAyNjQzMTMwN30.UCzZbEFJl9Gd5_qWqqKDpmGLJFMSlVYhKCDsGJcR4X0';

export const supabase = createClient(supabaseUrl, supabaseAnonKey);
