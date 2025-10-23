import type { ComponentType, LazyExoticComponent } from 'react';
import { lazy, Suspense, type JSX } from 'react';
import { Route, Routes } from 'react-router-dom';
import { goTo } from './helpers';

const HomePage: LazyExoticComponent<ComponentType<Record<string, unknown>>> = lazy(() =>
  import('./pages/HomePage').then((m: { default: ComponentType<Record<string, unknown>> }) => ({
    default: m.default,
  })),
);

const AboutPage: LazyExoticComponent<ComponentType<Record<string, unknown>>> = lazy(() =>
  import('./pages/AboutPage').then((m: { default: ComponentType<Record<string, unknown>> }) => ({
    default: m.default,
  })),
);

const EventsPage: LazyExoticComponent<ComponentType<Record<string, unknown>>> = lazy(() =>
  import('./pages/EventsPage').then((m: { default: ComponentType<Record<string, unknown>> }) => ({
    default: m.default,
  })),
);

const PhotosPage: LazyExoticComponent<ComponentType<Record<string, unknown>>> = lazy(() =>
  import('./pages/PhotosPage').then((m: { default: ComponentType<Record<string, unknown>> }) => ({
    default: m.default,
  })),
);

const ContactPage: LazyExoticComponent<ComponentType<Record<string, unknown>>> = lazy(() =>
  import('./pages/ContactPage').then((m: { default: ComponentType<Record<string, unknown>> }) => ({
    default: m.default,
  })),
);

const NotFoundPage: LazyExoticComponent<ComponentType<Record<string, unknown>>> = lazy(() =>
  import('./pages/NotFoundPage').then((m: { default: ComponentType<Record<string, unknown>> }) => ({
    default: m.default,
  })),
);

export function RoutingSystem(): JSX.Element {
  return (
    <Suspense fallback={<div>Chargement...</div>}>
      {/* TODO: Add a loading spinner */}
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
