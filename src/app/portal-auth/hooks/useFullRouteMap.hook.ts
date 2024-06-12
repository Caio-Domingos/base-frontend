import { useEffect, useState } from 'react';
import { routeMappings, type Route } from '../routes/Routes';
import { matchPath, useLocation } from 'react-router-dom';

export default function useFullRouteMap(): Route[] {
	const [fullRouteMap, setFullRouteMap] = useState<Route[]>([]);
	const location = useLocation();

	const getPastRoute = (state: Route[]): Route[] => {
		// Filtra as rotas privadas (não públicas) do mapeamento de rotas
		const privateRoutes = Object.keys(routeMappings).filter((key) => !routeMappings[key].isPublic);

		// Faz uma cópia do estado atual do breadcrumb para evitar mutações diretas
		const stateBreadcrumb = [...state];

		// Verifica se já existe algum breadcrumb no estado
		if (stateBreadcrumb.length > 0) {
			// Pega o último breadcrumb adicionado ao estado
			const lastBreadcrumb = stateBreadcrumb.at(-1);

			// Se o último breadcrumb tiver um pai
			if (lastBreadcrumb?.parent) {
				// Busca a rota do pai no mapeamento de rotas
				const parent = routeMappings[lastBreadcrumb.parent];
				// Adiciona a rota do pai ao estado do breadcrumb
				stateBreadcrumb.push(parent);

				// Se o pai também tiver um pai, chama recursivamente a função para adicionar o próximo pai
				return parent.parent ? getPastRoute(stateBreadcrumb) : stateBreadcrumb;
			}
		} else {
			// Array temporário para armazenar breadcrumbs correspondentes à rota atual
			const currentBreadcrumbs: Route[] = [];

			// Itera sobre as rotas privadas
			for (const key of privateRoutes) {
				// Verifica se a rota corresponde exatamente à localização atual
				if (matchPath(routeMappings[key].fullPath, location.pathname)) {
					// Adiciona a rota correspondente ao array de breadcrumbs
					currentBreadcrumbs.push(routeMappings[key]);
				}
			}

			// Se não encontrou uma correspondência exata, verifica se é uma sub-rota
			if (currentBreadcrumbs.length === 0) {
				// Itera sobre as rotas privadas, exceto 'home'
				for (const key of privateRoutes.filter((routeKey: string) => routeKey !== 'home')) {
					// Verifica se a sub-rota corresponde à localização atual
					if (matchPath(`${routeMappings[key].path}/*`, location.pathname)) {
						// Adiciona a sub-rota correspondente ao array de breadcrumbs
						currentBreadcrumbs.push(routeMappings[key]);
					}
				}
			}

			// Se encontrou alguma correspondência (rota ou sub-rota)
			if (currentBreadcrumbs.length > 0) {
				// Adiciona os breadcrumbs correspondentes ao estado do breadcrumb
				stateBreadcrumb.push(...currentBreadcrumbs);
				// Pega o último breadcrumb adicionado ao array de breadcrumbs correspondentes
				const lastBreadcrumb = currentBreadcrumbs.at(-1);

				// Se o último breadcrumb tiver um pai, chama recursivamente a função para adicionar o próximo pai
				return lastBreadcrumb?.parent ? getPastRoute(stateBreadcrumb) : stateBreadcrumb;
			}
		}
		// Retorna o estado do breadcrumb (vazio ou preenchido)
		return stateBreadcrumb;
	};

	useEffect(() => {
		// Função a ser executada quando o componente for montado
		const createBreadcrumbs = (): void => {
			// Reorder breadcrumbs to show the first one as the home route
			const pastRoute = getPastRoute([])
				.reverse()
				.filter((route) => route.name !== 'Home');

			setFullRouteMap(pastRoute);
		};

		// Chama a função createBreadcrumbs
		createBreadcrumbs();
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [location]);

	return fullRouteMap;
}
