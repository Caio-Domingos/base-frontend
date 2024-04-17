import App from 'App';
import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import {
	QueryClient,
	QueryClientConfig,
	QueryClientProvider,
} from '@tanstack/react-query';
import { registerSW } from 'virtual:pwa-register';
import './index.css';

registerSW();

const MAX_RETRIES = 1;

const config: QueryClientConfig = {
	defaultOptions: {
		queries: {
			staleTime: Number.POSITIVE_INFINITY,
			retry: MAX_RETRIES,
		},
	},
};

const queryClient: QueryClient = new QueryClient(config);

const container = document.querySelector('#root');
if (container) {
	const root = createRoot(container);
	root.render(
		<StrictMode>
			<QueryClientProvider client={queryClient}>
				<App />
			</QueryClientProvider>
		</StrictMode>
	);
}
