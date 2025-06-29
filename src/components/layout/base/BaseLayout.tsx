import { Outlet } from 'react-router-dom';
import NavigationBar from '@/components/common/NavigationBar';

const BaseLayout = () => {
  return (
    <div className="flex flex-col min-h-screen w-full">
      <main className="flex-1 w-full max-w-[360px] mx-auto overflow-hidden">
        <Outlet />
      </main>
      <NavigationBar />
    </div>
  );
};

export default BaseLayout;
