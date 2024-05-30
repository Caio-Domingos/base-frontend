import type React from 'react';
import { Suspense, useState } from 'react';
import { Provider } from 'react-redux';
import { BrowserRouter } from 'react-router-dom';
import { store } from 'features/store';

import './App.css';

function App(): React.ReactElement {
	// eslint-disable-next-line @typescript-eslint/no-unused-vars
	const [isLoggedIn, setIsLoggedIn] = useState(false);

	return (
		<BrowserRouter>
			<Suspense fallback={<h1>Carregando...</h1>}>
				<Provider store={store}>
					<div className='App'>
						<header className='App-header'>
							<h1>App</h1>
						</header>
					</div>
				</Provider>
			</Suspense>
		</BrowserRouter>
	);
}

export default App;
