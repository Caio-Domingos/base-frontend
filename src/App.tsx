import type React from 'react';
import { Suspense, lazy, useState } from 'react';
import { Provider } from 'react-redux';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { store } from 'features/store';
import Header from 'components/core/Header';
import LoadingOrError from 'components/core/LoadingOrError';
import './App.css';

const Home = lazy(async () => import('pages/Home'));
const Login = lazy(async () => import('pages/Login'));

function UnAuthenticatedApp(): React.ReactElement {
	return (
		<Routes>
			<Route path='/' element={<Login />} />
		</Routes>
	);
}
function AuthenticatedApp(): React.ReactElement {
	return (
		<div className='w-100 min-h-screen'>
			<Header />
			<div className='p-4 '>
				<Routes>
					<Route path='/' element={<Home />} />
				</Routes>
			</div>
		</div>
	);
}

function App(): React.ReactElement {
	// eslint-disable-next-line @typescript-eslint/no-unused-vars
	const [isLoggedIn, setIsLoggedIn] = useState(false);

	return (
		<BrowserRouter>
			<Suspense fallback={<LoadingOrError />}>
				<Provider store={store}>
					{isLoggedIn ? <AuthenticatedApp /> : <UnAuthenticatedApp />}
				</Provider>
			</Suspense>
		</BrowserRouter>
	);
}

export default App;
