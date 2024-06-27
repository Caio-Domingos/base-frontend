import { Outlet, useLocation } from 'react-router-dom';
import NavbarComponent from './components/Navbar';
import HeaderComponent from './components/Header';
import { useEffect } from 'react';
import useAuth from 'app/portal-auth/hooks/supabase/useAuth.hook';

export default function LayoutAuthenticated(): React.ReactElement {
	const location = useLocation();
	// const { isAuthenticated, check } = useAuth();

	useEffect(() => {
		window.HSStaticMethods.autoInit();
		// console.log('window.HSStaticMethods', window.HSStaticMethods);
	}, [location.pathname]);


	// useEffect(() => {
	// 	console.log('Checking auth...', isAuthenticated);
	// }, [isAuthenticated]);

	return (
		<main className='min-h-screen w-screen flex'>
			<NavbarComponent />
			<section id='main' className='flex-auto min-h-screen flex flex-col'>
				<HeaderComponent />

				<div id='content' className='flex-auto'>
					<Outlet />
				</div>
			</section>
		</main>
	);
}
