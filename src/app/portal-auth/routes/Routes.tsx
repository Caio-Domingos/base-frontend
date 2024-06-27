import NotificationComponent from '@components/Notifications/Notifications.component';
import type React from 'react';
import { lazy, useEffect, useState } from 'react';

import { RouterProvider, createBrowserRouter, useLocation } from 'react-router-dom';
import LayoutAuthenticated from './private/_Layout/Layout';
import type { IStaticMethods } from 'preline';
import useAuth from '../hooks/supabase/useAuth.hook';
import ProtectedRoute from './private/_Layout/components/ProtectRoute';

declare global {
	interface Window {
		HSStaticMethods: IStaticMethods;
	}
}

// Public routes
const Login = lazy(async () => import('./public/Login/Login'));
const Register = lazy(async () => import('./public/Register/Register'));

// Private routes
const Home = lazy(async () => import('./private/Home/Home'));
const Master = lazy(async () => import('./private/Master/Master'));
const MasterDetails = lazy(async () => import('./private/Master/Details/Details'));

export interface Route {
	icon: string;
	path: string;
	name?: string;
	fullPath: string;
	element: React.ReactElement;
	parent?: string;
	isPublic: boolean;
}

export type AppRoutesMap = Record<string, Route>;

export const routeMappings: AppRoutesMap = {
	// Public routes
	login: {
		icon: 'fa fa-user',
		path: '/login',
		fullPath: '/login',
		element: <Login />,
		isPublic: true,
	},
	register: {
		icon: 'fa fa-user-plus',
		path: '/register',
		fullPath: '/register',
		element: <Register />,
		isPublic: true,
	},

	// Private routes
	home: {
		icon: 'fa fa-home',
		name: 'Home',
		path: '/',
		fullPath: '/',
		element: <Home />,
		isPublic: false,
	},
	master: {
		icon: 'fa fa-users',
		name: 'Master',
		path: '/master',
		fullPath: '/master',
		element: <Master />,
		isPublic: false,
	},
	masterDetails: {
		icon: 'fa fa-edit',
		name: 'Master Details',
		path: ':id',
		fullPath: '/master/:id',
		parent: 'master',
		element: <MasterDetails />,
		isPublic: false,
	},
};

const unAuthenticatedRoutes = [
	{
		path: routeMappings.login.path,
		element: routeMappings.login.element,
	},
	{
		path: routeMappings.register.path,
		element: routeMappings.register.element,
	},
];
const authenticatedRoutes = [
	{
		path: '/',
		element: <ProtectedRoute element={<LayoutAuthenticated />} />,
		children: [
			{
				path: routeMappings.home.path,
				element: routeMappings.home.element,
			},
			{
				path: routeMappings.master.path,
				element: routeMappings.master.element,
				children: [
					{
						path: routeMappings.masterDetails.path,
						element: routeMappings.masterDetails.element,
					},
				],
			},
		],
	},
];

export default function Routes(): React.ReactElement {
	// TODO Auth logic
	// eslint-disable-next-line @typescript-eslint/no-unused-vars
	const [isAuthenticated, setIsAuthenticated] = useState(true);
	const { isAuthenticated: authed, check } = useAuth();

	useEffect(() => {
		console.log('Checking auth...');
	}, [authed]);

	return (
		<>
			<NotificationComponent />
			<RouterProvider router={createBrowserRouter([...unAuthenticatedRoutes, ...authenticatedRoutes])} />
		</>
	);
}
