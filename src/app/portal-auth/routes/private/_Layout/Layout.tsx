import { Outlet } from 'react-router-dom';
import NavbarComponent from './components/Navbar';
import HeaderComponent from './components/Header';

export default function LayoutAuthenticated(): React.ReactElement {
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
