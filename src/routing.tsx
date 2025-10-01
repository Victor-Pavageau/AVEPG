import type { JSX } from 'react';
import { Route, Routes } from 'react-router-dom';
import { AboutPage, ContactPage, EventsPage, HomePage, NotFoundPage, PhotosPage } from './pages';
import { goTo } from './services';

function RoutingSystem(): JSX.Element {
  return (
    <Routes>
      <Route
        path={goTo('/')}
        element={<HomePage />}
      />
      <Route
        path={goTo('/about')}
        element={<AboutPage />}
      />
      <Route
        path={goTo('/events')}
        element={<EventsPage />}
      />
      <Route
        path={goTo('/photos')}
        element={<PhotosPage />}
      />
      <Route
        path={goTo('/contact')}
        element={<ContactPage />}
      />
      <Route
        path={'*'}
        element={<NotFoundPage />}
      />
    </Routes>
  );
}

export default RoutingSystem;
