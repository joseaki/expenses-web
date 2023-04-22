import 'src/styles/globals.css';
import type { AppProps } from 'next/app';
import { ConfigProvider } from 'antd';
import { Hydrate, QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { AuthProvider } from 'src/hooks/useAuth';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 1000000,
      refetchOnWindowFocus: false,
      retry: false,
    },
  },
});

export default function App({ Component, pageProps }: AppProps) {
  return (
    <QueryClientProvider client={queryClient}>
      <Hydrate state={pageProps.dehydratedState}>
        <ConfigProvider theme={{ token: { colorPrimary: '#00b96b' } }}>
          <AuthProvider>
            <Component {...pageProps} />
          </AuthProvider>
        </ConfigProvider>
      </Hydrate>
      <ReactQueryDevtools />
    </QueryClientProvider>
  );
}
