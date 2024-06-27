/* eslint-disable @typescript-eslint/no-floating-promises */
import UserService from 'api/supabase/user.service';
import { useState, useEffect, useCallback, useMemo } from 'react';

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

		if (user) {
			setIsAuthenticated(true);
		} else {
			setIsAuthenticated(false);
		}
	};

	useEffect(() => {
		const { data: authListener } = us.client.auth.onAuthStateChange((event, session) => {
			setLoading(false);
			if (session) {
				setIsAuthenticated(true);
			} else {
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
