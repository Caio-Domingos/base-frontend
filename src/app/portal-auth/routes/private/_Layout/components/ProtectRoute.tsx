/* eslint-disable no-else-return */
/* eslint-disable @typescript-eslint/explicit-function-return-type */
import useAuth from 'app/portal-auth/hooks/supabase/useAuth.hook';
import type React from 'react';
import { Navigate } from 'react-router-dom';

export default function ProtectedRoute({ element }: { element: React.ReactElement }) {
	const { isAuthenticated, loading } = useAuth();

	console.log('ProtectedRoute', isAuthenticated);
	if (loading) {
		console.log('ProtectedRoute Loading');
		return <div>Loading...</div>;
	} else if (!isAuthenticated) {
		console.log('ProtectedRoute Navigate no allowed');
		return <Navigate to='/login' replace />;
	}

	console.log('ProtectedRoute Navigate allowed');
	return element;
}
