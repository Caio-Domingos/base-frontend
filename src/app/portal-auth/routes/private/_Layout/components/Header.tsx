/* eslint-disable react/no-array-index-key */
/* eslint-disable react-hooks/exhaustive-deps */
import useAtualRouteMap from 'app/portal-auth/hooks/useAtualRoute.hook';
import useFullRouteMap from 'app/portal-auth/hooks/useFullRouteMap.hook';
import { type Route, routeMappings } from 'app/portal-auth/routes/Routes';
import { useEffect, useState } from 'react';
import { matchPath, useLocation, useNavigate } from 'react-router-dom';

export default function HeaderComponent(): React.ReactElement {
	const location = useLocation();
	const navigate = useNavigate();
	const activeRoute = useAtualRouteMap();
	const breadcrumbs = useFullRouteMap();

	const handleNavigate = (route: string): void => {
		navigate(route);
	};

	return (
		<header className='h-14'>
			<div className='flex items-center justify-between px-4 py-4'>
				<div className=' flex items-center justify-start gap-2'>
					<i className='fa fa-home text-xs cursor-pointer hover:underline hover:decoration-1' onClick={() => handleNavigate('/')} />
					{breadcrumbs.map((item, index) => (
						<div
							key={index}
							className='text-sm cursor-pointer group'
							onClick={() => (breadcrumbs.length - 1 === index ? undefined : handleNavigate(item.path))}
						>
							{' / '}
							<span className='mr-2 ' /> <i className={`${item.icon} text-xs mr-2`} />{' '}
							<span className='group-hover:underline group-hover:decoration-1'> {item.name}</span>
						</div>
					))}
				</div>
				<div className='flex items-center justify-end gap-2'>
					<i className='fa fa-bell text-base cursor-pointer' onClick={() => console.log('Notifications')} />
				</div>
			</div>
		</header>
	);
}
