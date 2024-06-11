/* eslint-disable @typescript-eslint/no-non-null-asserted-optional-chain */
/* eslint-disable @typescript-eslint/no-non-null-assertion */
/* eslint-disable react/jsx-no-useless-fragment */
import type { Route } from 'app/portal-auth/routes/Routes';
import type React from 'react';
import { Link } from 'react-router-dom';

interface MenuItemProps {
	index?: number;
	route?: Route;
	nonRoute?: {
		name: string;
		icon: string;
		path: string;
	};
	activeRoute?: Route;
	showLargeMenu: boolean;
}

export default function MenuItemComponent({ index, route: item, activeRoute, showLargeMenu, nonRoute }: MenuItemProps): React.ReactElement {
	return (
		<>
			{item ? (
				<li key={index} className={`box-border block mx-3 py-2 rounded-md ${item.path === activeRoute?.path ? 'bg-primary' : ''}`}>
					<Link to={item.fullPath} className={`w-full px-2 flex items-center justify-center  ${showLargeMenu ? 'gap-4' : 'gap-0'}`}>
						<i className={`${item.icon}  ${item.path === activeRoute?.path ? 'text-white' : 'text-primary'} text-xl`} />
						<p
							className={`box-border overflow-hidden transition-all duration-500 ease-out text-wrap ${showLargeMenu ? 'max-w-20' : 'max-w-0'} ${
								item.path === activeRoute?.path ? 'font-semibold text-white' : ''
							}`}
						>
							{item.name}
						</p>
					</Link>
				</li>
			) : (
				<>
					<li className={`box-border block mx-3 py-2 rounded-md ${activeRoute?.path === nonRoute?.path ? 'bg-primary' : ''}`}>
						<Link to={nonRoute?.path!} className={`w-full px-2 flex items-center justify-center  ${showLargeMenu ? 'gap-4' : 'gap-0'}`}>
							<i className={`${nonRoute?.icon}  ${activeRoute?.path === nonRoute?.path ? 'text-white' : 'text-primary'} text-xl`} />
							<p
								className={`box-border overflow-hidden transition-all duration-500 ease-out text-wrap ${showLargeMenu ? 'max-w-20' : 'max-w-0'} ${
									activeRoute?.path === nonRoute?.path ? 'font-semibold text-white' : ''
								}`}
							>
								{nonRoute?.name}
							</p>
						</Link>
					</li>
				</>
			)}
		</>
	);
}
