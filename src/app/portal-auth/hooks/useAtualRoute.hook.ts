// src/hooks/useAtualRouteMap.ts
import { useState, useEffect } from 'react';
import { matchPath, useLocation } from 'react-router-dom';
import { type Route, routeMappings } from '../routes/Routes';

export default function useAtualRouteMap(): Route | undefined {
	const [activeRoute, setActiveRoute] = useState<Route | undefined>();
	const location = useLocation();

	useEffect(() => {
		const privateRoutes = Object.keys(routeMappings).filter((key) => !routeMappings[key].isPublic);

		let currentRoute: Route | undefined;

		// Verifique se a rota corresponde exatamente
		for (const key of privateRoutes) {
			if (matchPath(routeMappings[key].fullPath, location.pathname)) {
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

	return activeRoute;
}
