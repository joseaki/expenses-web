import 'src/styles/globals.css';
import type { AppProps } from 'next/app';
import { ConfigProvider } from 'antd';
import { Hydrate, QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { AuthProvider } from 'src/hooks/useAuth';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
import { useEffect, useState } from 'react';
import { Router } from 'next/router';
import Loading from 'src/components/organisms/loading/loading';

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
  const [isLoading, setIsLoading] = useState(false);
  useEffect(() => {
    Router.events.on('routeChangeStart', (url) => {
      setIsLoading(true);
    });

    Router.events.on('routeChangeComplete', (url) => {
      setIsLoading(false);
    });

    Router.events.on('routeChangeError', (url) => {
      setIsLoading(false);
    });
  }, [Router]);

  console.log('PAGE-----', isLoading);

  return (
    <QueryClientProvider client={queryClient}>
      {isLoading ? <Loading /> : null}
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
