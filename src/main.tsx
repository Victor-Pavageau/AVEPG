import { Analytics } from '@vercel/analytics/react';
import { ConfigProvider } from 'antd';
import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import { App } from './App.tsx';
import './i18n.ts';

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
