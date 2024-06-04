import NotificationComponent from '@components/Notifications/Notifications.component';
import { lazy, useState } from 'react';

import { RouterProvider, createBrowserRouter } from 'react-router-dom';

// Public routes
const Login = lazy(async () => import('./public/Login/Login'));
const Register = lazy(async () => import('./public/Register/Register'));

// Private routes
const Home = lazy(async () => import('./private/Home/Home'));

const unAuthenticatedRoutes = createBrowserRouter([
	{
		path: '/login',
		element: <Login />,
	},
	{
		path: '/register',
		element: <Register />,
	},
	{
		path: '/',
		element: <Login />,
	},
]);
const authenticatedRoutes = createBrowserRouter([
	{
		path: '/',
		element: <Home />,
	},
]);

export default function Routes(): React.ReactElement {
	// TODO Auth logic
	// eslint-disable-next-line @typescript-eslint/no-unused-vars
	const [isAuthenticated, setIsAuthenticated] = useState(false);

	return (
		<>
			<NotificationComponent />
			<RouterProvider router={isAuthenticated ? authenticatedRoutes : unAuthenticatedRoutes} />
		</>
	);
}
