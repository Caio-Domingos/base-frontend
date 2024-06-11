/* eslint-disable react/no-array-index-key */
/* eslint-disable react-hooks/exhaustive-deps */
import { type Route, routeMappings } from 'app/portal-auth/routes/Routes';
import { useEffect, useState } from 'react';
import { matchPath, useLocation, useNavigate } from 'react-router-dom';

export default function HeaderComponent(): React.ReactElement {
	const location = useLocation();
	const navigate = useNavigate();
	const [activeRoute, setActiveRoute] = useState<Route | undefined>();
	const [breadcrumbs, setBreadcrumbs] = useState<Route[]>([]);

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

	const handleNavigate = (route: string): void => {
		navigate(route);
	};

	useEffect(() => {
		// Função a ser executada quando o componente for montado
		const createBreadcrumbs = (): void => {
			// Reorder breadcrumbs to show the first one as the home route
			const pastRoute = getPastRoute([])
				.reverse()
				.filter((route) => route.name !== 'Home');

			setBreadcrumbs(pastRoute);
		};

		// Chama a função createBreadcrumbs
		createBreadcrumbs();
	}, [location]);

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
