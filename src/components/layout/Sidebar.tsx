import { Link, useLocation } from 'react-router-dom';
import { LayoutDashboard, User, Activity, FileText, Award, Star, Search, BarChart3, MessageSquare, Edit3, LineChart, Code, Settings as SettingsIcon } from 'lucide-react';
import { motion } from 'framer-motion';

const navigation = [
  { name: 'Dashboard', href: '/', icon: LayoutDashboard },
  { name: 'Profile Analyzer', href: '/profile-analyzer', icon: User },
  { name: 'Repo Compare', href: '/compare', icon: Code },
  { name: 'Repo Health', href: '/repo-health', icon: Activity },
  { name: 'README Generator', href: '/readme-generator', icon: FileText },
  { name: 'Badge Generator', href: '/badge-generator', icon: Award },
  { name: 'Profile README', href: '/profile-readme', icon: Star },
  { name: 'Open Source Finder', href: '/open-source', icon: Search },
  { name: 'Repo SEO', href: '/seo', icon: LineChart },
  { name: 'Stats Dashboard', href: '/stats', icon: BarChart3 },
  { name: 'AI Commits', href: '/ai-commits', icon: MessageSquare },
  { name: 'Markdown Editor', href: '/markdown', icon: Edit3 },
  { name: 'Settings', href: '/settings', icon: SettingsIcon },
];

export function Sidebar() {
  const location = useLocation();

  return (
    <div className="flex h-full w-64 flex-col overflow-y-auto border-r border-github-border bg-[#010409] px-3 py-4 shrink-0">
      <div className="mb-8 flex items-center px-3">
        <svg className="mr-3 h-8 w-8 text-white" viewBox="0 0 16 16" fill="currentColor">
          <path d="M8 0c4.42 0 8 3.58 8 8a8.013 8.013 0 0 1-5.45 7.59c-.4.08-.55-.17-.55-.38 0-.27.01-1.13.01-2.2 0-.75-.25-1.23-.54-1.48 1.78-.2 3.65-.88 3.65-3.95 0-.88-.31-1.59-.82-2.15.08-.2.36-1.02-.08-2.12 0 0-.67-.22-2.2.82-.64-.18-1.32-.27-2-.27-.68 0-1.36.09-2 .27-1.53-1.03-2.2-.82-2.2-.82-.44 1.1-.16 1.92-.08 2.12-.51.56-.82 1.28-.82 2.15 0 3.06 1.86 3.75 3.64 3.95-.23.2-.44.55-.51 1.07-.46.21-1.61.55-2.33-.66-.15-.24-.6-.83-1.23-.82-.67.01-.27.38.01.53.34.19.73.9.82 1.13.16.45.68 1.31 2.69.94 0 .67.01 1.3.01 1.49 0 .21-.15.45-.55.38A7.995 7.995 0 0 1 0 8c0-4.42 3.58-8 8-8Z"></path>
        </svg>
        <span className="text-lg font-bold text-white">SourceCraft</span>
      </div>
      <nav className="space-y-1 relative">
        {navigation.map((item) => {
          const isActive = location.pathname === item.href;
          return (
            <Link
              key={item.name}
              to={item.href}
              className={`group flex items-center rounded-md px-3 py-2 text-sm font-medium transition-colors relative z-10 ${
                isActive
                  ? 'text-white'
                  : 'text-github-text hover:bg-github-border/50 hover:text-white'
              }`}
            >
              {isActive && (
                <motion.div
                  layoutId="sidebar-active-indicator"
                  className="absolute inset-0 rounded-md bg-github-border z-[-1]"
                  initial={false}
                  transition={{ type: "spring", stiffness: 300, damping: 30 }}
                />
              )}
              {isActive && (
                <motion.div
                  layoutId="sidebar-active-line"
                  className="absolute left-0 top-1 bottom-1 w-1 rounded-r-md bg-github-link z-10"
                  initial={false}
                  transition={{ type: "spring", stiffness: 300, damping: 30 }}
                />
              )}
              <item.icon
                className={`mr-3 h-5 w-5 flex-shrink-0 ${
                  isActive ? 'text-white' : 'text-github-muted group-hover:text-white'
                }`}
                aria-hidden="true"
              />
              {item.name}
            </Link>
          );
        })}
      </nav>
      <div className="mt-auto pt-8 pb-4">
        <a
          href="https://github.com/Hemanth-Moka/SourceCraft"
          target="_blank"
          rel="noreferrer"
          className="flex items-center justify-center gap-2 rounded-md bg-[#21262d] border border-github-border px-4 py-2 text-sm font-semibold text-white hover:bg-[#30363d] transition-colors"
        >
          <Star className="h-4 w-4 text-github-muted" />
          Star on GitHub
        </a>
      </div>
    </div>
  );
}
