import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import AntdApp from 'antd/es/app/App';
import { lazy, type ComponentType, type JSX, type LazyExoticComponent } from 'react';
import { Footer, Navbar } from './components';
import { OrganizationJsonLd } from './components/OrganizationJsonLd';
import './main.css';

const RoutingSystem: LazyExoticComponent<ComponentType> = lazy(() => import('./routing.tsx'));
const queryClient: QueryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 3 * 60 * 1000, // 3 mins to avoid spamming the Sanity API
    },
  },
});

export default function App(): JSX.Element {
  return (
    <AntdApp>
      <QueryClientProvider client={queryClient}>
        <OrganizationJsonLd />
        <div className='min-h-screen flex flex-col'>
          <Navbar />
          <main className='flex-1 pt-20'>
            <RoutingSystem />
          </main>
          <Footer />
        </div>
      </QueryClientProvider>
    </AntdApp>
  );
}
