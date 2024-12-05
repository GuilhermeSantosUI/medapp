import { Footer, Header } from '@/layouts/components';
import { Outlet } from 'react-router-dom';

export function Default() {
  return (
    <div className="max-w-screen h-full min-h-screen flex flex-col">
      <Header />

      <Outlet />

      <Footer />
    </div>
  );
}
