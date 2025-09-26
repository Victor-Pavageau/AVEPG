import { JSX } from 'react';
import { Route, Routes } from 'react-router-dom';
import HomePage from './pages/HomePage';
import { goTo } from './services';

function RoutingSystem(): JSX.Element {
  return (
    <Routes>
      <Route path={goTo('/')} element={<HomePage />} />
      <Route path={goTo('/page1')} element={<></>} />
      <Route path={goTo('/page2')} element={<></>} />
      <Route path={goTo('/page3')} element={<></>} />
      <Route path={goTo('/page4')} element={<></>} />
      <Route path={goTo('/page5')} element={<></>} />
      <Route path={'*'} element={<></>} />
    </Routes>
  );
}

export default RoutingSystem;
