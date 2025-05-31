import { Outlet } from 'react-router-dom';
import Header from './Header';

const BaseLayout = () => {
  return (
    <div className="min-h-screen bg-background flex flex-col">
      <Header />
      <main>
        <Outlet />
      </main>
    </div>
  );
};

export default BaseLayout;
