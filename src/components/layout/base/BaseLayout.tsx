import { Outlet } from 'react-router-dom';

const BaseLayout = () => {
  return (
    <div className="min-h-screen bg-background flex flex-col">
      <main>
        <Outlet />
      </main>
    </div>
  );
};

export default BaseLayout;
