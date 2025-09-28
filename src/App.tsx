import { JSX } from 'react';
import { Footer, Navbar } from './components';
import './main.css';
import RoutingSystem from './routing';

function App(): JSX.Element {
  return (
    <div className='min-h-screen flex flex-col'>
      <Navbar />
      <main className='flex-1 pt-20'>
        <RoutingSystem />
      </main>
      <Footer />
    </div>
  );
}

export default App;
