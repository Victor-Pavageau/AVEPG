import { Analytics } from '@vercel/analytics/react';
import ConfigProvider from 'antd/es/config-provider/index';
import type { ComponentType, LazyExoticComponent } from 'react';
import React, { lazy } from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import './i18n.ts';

const App: LazyExoticComponent<ComponentType> = lazy(() => import('./App'));

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <BrowserRouter>
      <ConfigProvider theme={{ token: { colorPrimary: '#0164B5' } }}>
        <App />
        <Analytics />
      </ConfigProvider>
    </BrowserRouter>
  </React.StrictMode>,
);
