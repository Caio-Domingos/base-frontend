/* eslint-disable @typescript-eslint/no-floating-promises */
import type { User } from '@model/User.model';
import type { Session } from '@supabase/supabase-js';
import UserService from 'api/supabase/user.service';
import { UtilsHandler } from 'features/handlers/utils.handler';
import { useState, useEffect, useCallback, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';

const useAuth = (): {
	isAuthenticated: boolean;
	loading: boolean;
	check: () => Promise<void>;
} => {
	const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);
	const [loading, setLoading] = useState<boolean>(true);

	const us = useMemo(() => new UserService(), []);

	const check = async (): Promise<void> => {
		let user;
		try {
			user = await us.getAuthenticatedUser();
		} finally {
			setLoading(false);
		}
		console.log('check user', user);

		if (user) {
			setIsAuthenticated(true);
		} else {
			setIsAuthenticated(false);
		}
	};
	useEffect(() => {
		console.log('useEffect isAuthenticated', isAuthenticated);
	}, [isAuthenticated]);

	useEffect(() => {
		const { data: authListener } = us.client.auth.onAuthStateChange((event, session) => {
			setLoading(false);
			if (session) {
				console.log(' has session', session);
				setIsAuthenticated(true);
			} else {
				console.log('no session');
				setIsAuthenticated(false);
			}
		});

		return (): void => {
			authListener.subscription.unsubscribe();
		};
	}, [us]);

	return { isAuthenticated, check, loading };
};

export default useAuth;
