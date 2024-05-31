/* eslint-disable unicorn/no-null */
import type React from 'react';
import { Suspense, useEffect, useState } from 'react';
import { Provider } from 'react-redux';
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
	const [appComponent, setAppComponent] = useState<React.ReactElement | null>(
		null
	);

	useEffect(() => {
		setAppType(AppType.PortalAuth);
	}, []);

	useEffect(() => {
		console.log('AppType:', appType);
		switch (appType) {
			case AppType.PortalAuth: {
				console.log('PortalAuth');
				setAppComponent(<PortalAuthApp />);
				break;
			}
			case AppType.Spa: {
				console.log('Spa');
				setAppComponent(<SpaApp />);
				break;
			}
			default: {
				console.log('App não encontrado');
				setAppComponent(<h1>App não encontrado</h1>);
				break;
			}
		}
	}, [appType]);

	return (
		<Suspense fallback={<h1>Carregando...</h1>}>
			<Provider store={store}>
				{appComponent ?? <h1>Carregando...</h1>}
			</Provider>
		</Suspense>
	);
}

export default App;
