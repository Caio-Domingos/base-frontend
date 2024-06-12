import { Outlet, useLocation } from 'react-router-dom';
import NavbarComponent from './components/Navbar';
import HeaderComponent from './components/Header';
import { useEffect } from 'react';

export default function LayoutAuthenticated(): React.ReactElement {
	const location = useLocation();

	useEffect(() => {
		window.HSStaticMethods.autoInit();
		// console.log('window.HSStaticMethods', window.HSStaticMethods);
	}, [location.pathname]);

	return (
		<main className='h-screen w-screen flex'>
			<NavbarComponent />
			<section id='main' className='flex-auto h-screen flex flex-col'>
				<HeaderComponent />

				<div id='content' className='flex-auto'>
					<Outlet />
				</div>
			</section>
		</main>
	);
}
