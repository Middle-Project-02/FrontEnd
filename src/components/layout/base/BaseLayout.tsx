import { Outlet } from 'react-router-dom';

const BaseLayout = () => {
  return (
    <div className="w-full max-w-[360px] flex flex-col bg-white border-1 border-black">
      <main>
        <Outlet />
      </main>
    </div>
  );
};

export default BaseLayout;
