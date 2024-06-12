import CustomImage from '@components/base/Image';
import Button from '@components/form-control/Button';
import { type Route, routeMappings } from 'app/portal-auth/routes/Routes';
import { useEffect, useState } from 'react';
import { Link, matchPath, useLocation } from 'react-router-dom';
import MenuItemComponent from './base/MenuItem';

export default function NavbarComponent(): React.ReactElement {
	const location = useLocation();
	const [menu, setMenu] = useState<Route[]>([]);
	const [showLargeMenu, setShowLargeMenu] = useState(false);
	const [activeRoute, setActiveRoute] = useState<Route | undefined>();

	useEffect(() => {
		const setMenuItems = (): void => {
			if (menu.length > 0) return;

			const menuItems = [routeMappings.home, routeMappings.master];
			setMenu(menuItems);
		};

		setMenuItems();
	}, [menu.length]);

	useEffect(() => {
		const privateRoutes = Object.keys(routeMappings).filter((key) => !routeMappings[key].isPublic);

		let currentRoute;

		// Verifique se a rota corresponde exatamente
		for (const key of privateRoutes) {
			if (matchPath(routeMappings[key].fullPath, location.pathname)) {
				// eslint-disable-next-line no-multi-assign
				currentRoute = routeMappings[key];
			}
		}

		// Se não encontrou uma correspondência exata, verifique se é uma sub-rota
		if (!currentRoute) {
			for (const key of privateRoutes.filter((routeKey: string) => routeKey !== 'home')) {
				if (matchPath(`${routeMappings[key].path}/*`, location.pathname)) {
					currentRoute = routeMappings[key];
				}
			}
		}

		setActiveRoute(currentRoute ?? undefined);
	}, [location]);

	const handleLogout = (): void => {
		// Implementar lógica de logout
	};

	return (
		// <nav className='shadow-lg flex items-center justify-start flex-col transition-all duration-500 ease-out w-40'>
		<nav
			className={`bg-bgLight-lighter dark:bg-bgDark-darker shadow-lg flex items-center justify-start flex-col transition-all duration-500 ease-out ${
				showLargeMenu ? 'w-40' : 'w-20'
			}`}
		>
			<div id='header' className='w-full h-20 box-border flex items-center justify-center bg-primary px-1'>
				<CustomImage src='/images/logo-white.png' alt='Logo' />
			</div>
			<div id='menu' className='w-full flex-auto flex flex-col justify-between py-4 items-center'>
				<div id='top' className='w-full'>
					<ul className='w-full'>
						{menu.map((item, index) => (
							// eslint-disable-next-line react/no-array-index-key
							<MenuItemComponent key={index} index={index} showLargeMenu={showLargeMenu} activeRoute={activeRoute} route={item} />
						))}
					</ul>
				</div>
				<div id='bottom' className='relative w-full'>
					<Button
						onClick={() => setShowLargeMenu((state) => !state)}
						color='primary'
						className='absolute top-[-60px] right-[-20px] w-10 h-10 rounded-full mt-0'
					>
						{showLargeMenu ? <i className='fa-solid fa-chevron-left' /> : <i className='fa-solid fa-chevron-right' />}
					</Button>
					<ul>
						<MenuItemComponent
							showLargeMenu={showLargeMenu}
							activeRoute={activeRoute}
							nonRoute={{
								icon: 'fa-solid fa-gears',
								name: 'Settings',
								path: '/configurations',
							}}
						/>
						<MenuItemComponent
							showLargeMenu={showLargeMenu}
							activeRoute={activeRoute}
							nonRoute={{
								icon: 'fa-solid fa-user-gear',
								name: 'Profile',
								path: '/profile',
							}}
						/>

						<li className='box-border block mx-3 py-2 rounded-md'>
							<div onClick={handleLogout} className={`w-full px-2 flex items-center justify-center  ${showLargeMenu ? 'gap-4' : 'gap-0'}`}>
								<i
									className={`fa-solid fa-solid fa-arrow-right-from-bracket  ${
										activeRoute?.path === '/profile' ? 'text-white' : 'text-primary'
									} text-xl`}
								/>
								<p
									className={`box-border overflow-hidden transition-all duration-500 ease-out text-wrap ${showLargeMenu ? 'max-w-20' : 'max-w-0'} ${
										activeRoute?.path === '/profile' ? 'font-semibold text-white' : ''
									}`}
								>
									Logout
								</p>
							</div>
						</li>
					</ul>
				</div>
			</div>
		</nav>
	);
}
