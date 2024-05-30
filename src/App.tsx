import type React from 'react';
import { Suspense, useEffect, useRef, useState } from 'react';
import { Provider } from 'react-redux';
import { BrowserRouter } from 'react-router-dom';
import { store } from '@store/store';

import './App.css';
import PortalAuthApp from 'app/portal-auth/App';
import SpaApp from 'app/spa/App';

enum AppType {
	PortalAuth = 'PortalAuth',
	Spa = 'Spa',
	Store = 'Store',
}

function App(): React.ReactElement {
	// eslint-disable-next-line @typescript-eslint/no-unused-vars
	const [isLoggedIn, setIsLoggedIn] = useState(false);
	const [appType, setAppType] = useState<AppType>(AppType.PortalAuth);

	const appComponent = useRef<React.ReactElement>(<h1>App não encontrado</h1>);
	useEffect(() => {
		switch (appType) {
			case AppType.PortalAuth: {
				console.log('PortalAuth');
				appComponent.current = <PortalAuthApp />;
				break;
			}
			case AppType.Spa: {
				console.log('Spa');
				appComponent.current = <SpaApp />;
				break;
			}
			default: {
				console.log('App não encontrado');
				appComponent.current = <h1>App não encontrado</h1>;
				break;
			}
		}
	}, [appType]);

	return (
		<Suspense fallback={<h1>Carregando...</h1>}>
			<Provider store={store}>{appComponent.current}</Provider>
		</Suspense>
	);
}

export default App;
