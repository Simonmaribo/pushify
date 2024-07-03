import Meta from '@/components/layouts/Meta'
import '@/styles/globals.css'
import NiceModal from '@ebay/nice-modal-react'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import type { AppProps } from 'next/app'
import { Toaster } from 'sonner'
import toolbird from '@toolbird/web'

const queryClient = new QueryClient({
	defaultOptions: {
		queries: {
			refetchOnWindowFocus: false,
		},
	},
})

toolbird.init({
	domain: 'pushify.net',
})

export default function App({ Component, pageProps }: AppProps) {
	return (
		<QueryClientProvider client={queryClient}>
			<NiceModal.Provider>
				<Meta />
				<Toaster position="bottom-right" />
				<Component {...pageProps} />
			</NiceModal.Provider>
		</QueryClientProvider>
	)
}
