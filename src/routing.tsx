import { lazy, Suspense, type ComponentType, type JSX, type LazyExoticComponent } from 'react';
import { Route, Routes } from 'react-router-dom';
import { LoadingCard } from './components';
import { goTo } from './helpers';

const HomePage: LazyExoticComponent<ComponentType> = lazy(() => import('./pages/HomePage'));
const AboutPage: LazyExoticComponent<ComponentType> = lazy(() => import('./pages/AboutPage'));
const EventsPage: LazyExoticComponent<ComponentType> = lazy(() => import('./pages/EventsPage'));
const PhotosPage: LazyExoticComponent<ComponentType> = lazy(() => import('./pages/PhotosPage'));
const ContactPage: LazyExoticComponent<ComponentType> = lazy(() => import('./pages/ContactPage'));
const NotFoundPage: LazyExoticComponent<ComponentType> = lazy(() => import('./pages/NotFoundPage'));

export default function RoutingSystem(): JSX.Element {
  return (
    <Suspense fallback={<LoadingCard />}>
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
    </Suspense>
  );
}
