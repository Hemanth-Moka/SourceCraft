import { Outlet } from 'react-router-dom';
import { Sidebar } from './Sidebar';
import { SupportCard } from '../ui/SupportCard';

export function Layout() {
  return (
    <div className="flex h-screen overflow-hidden bg-github-bg text-github-text font-sans">
      <Sidebar />
      <main className="flex-1 overflow-y-auto p-8">
        <div className="mx-auto max-w-6xl">
          <Outlet />
        </div>
      </main>
      <SupportCard />
    </div>
  );
}
