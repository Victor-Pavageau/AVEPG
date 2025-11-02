import AntdApp from 'antd/es/app/App';
import { lazy, type ComponentType, type JSX, type LazyExoticComponent } from 'react';
import { Footer, Navbar } from './components';
import './main.css';

const RoutingSystem: LazyExoticComponent<ComponentType> = lazy(() => import('./routing.tsx'));

export default function App(): JSX.Element {
  return (
    <AntdApp>
      <div className='min-h-screen flex flex-col'>
        <Navbar />
        <main className='flex-1 pt-20'>
          <RoutingSystem />
        </main>
        <Footer />
      </div>
    </AntdApp>
  );
}
