import { App as AntdApp } from 'antd';
import type { JSX } from 'react';
import { Footer, Navbar } from './components';
import './main.css';
import { RoutingSystem } from './routing';

export function App(): JSX.Element {
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
