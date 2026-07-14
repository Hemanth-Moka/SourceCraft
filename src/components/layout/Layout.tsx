import { Outlet } from 'react-router-dom';
import { Sidebar } from './Sidebar';
import { SupportCard } from '../ui/SupportCard';

export function Layout() {
  return (
    <div className="flex h-screen overflow-hidden bg-github-bg text-github-text font-sans">
      <Sidebar />
      <main className="flex-1 overflow-y-auto p-8 flex flex-col">
        <div className="mx-auto max-w-6xl w-full flex-1">
          <Outlet />
        </div>
        <footer className="mt-16 text-center text-sm text-github-muted border-t border-github-border pt-8 pb-4">
          Designed and developed by <a href="https://github.com/Hemanth-Moka" target="_blank" rel="noreferrer" className="font-semibold text-github-text hover:text-github-link transition-colors">Hemanth Moka</a>
        </footer>
      </main>
      <SupportCard />
    </div>
  );
}
