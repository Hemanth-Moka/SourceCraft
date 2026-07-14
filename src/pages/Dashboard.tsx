import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { triggerSupportCard } from '../components/ui/SupportCard';
import { HistoryIcon, PulseIcon, ShieldIcon, CodeIcon, GearIcon } from '@primer/octicons-react';

export function Dashboard() {
  const [history, setHistory] = useState<string[]>([]);
  const token = localStorage.getItem('github_token');

  useEffect(() => {
    // Mock history load from localStorage
    const saved = localStorage.getItem('search_history');
    if (saved) {
      setHistory(JSON.parse(saved).slice(0, 5));
    } else {
      setHistory(['facebook/react', 'torvalds', 'vuejs/core']);
    }
  }, []);

  return (
    <div className="mx-auto max-w-5xl space-y-10">
      {/* Hero Section */}
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="space-y-4 border-b border-github-border pb-10">
        <h1 className="text-4xl font-bold tracking-tight text-white sm:text-5xl">SourceCraft Workspace</h1>
        <p className="text-lg text-github-muted max-w-2xl">
          Professional tools for analyzing, comparing, and improving GitHub repositories. Built for developers who demand clean interfaces and authentic data.
        </p>
      </motion.div>

      {/* Top Widgets */}
      <div className="grid gap-6 md:grid-cols-2">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }} className="rounded-xl border border-github-border bg-github-canvas p-6">
          <div className="flex justify-between items-start mb-4">
            <h2 className="text-lg font-semibold text-white flex items-center gap-2"><GearIcon className="h-5 w-5 text-github-muted"/> API Status</h2>
            <span className={`px-2 py-1 text-xs font-medium rounded-full border ${token ? 'border-github-success text-github-success bg-github-success/10' : 'border-yellow-500 text-yellow-500 bg-yellow-500/10'}`}>
              {token ? 'Authenticated' : 'Rate Limited (60/hr)'}
            </span>
          </div>
          <p className="text-sm text-github-muted mb-4">
            {token ? 'You are using a Personal Access Token. Rate limits are extended to 5,000 requests per hour.' : 'You are browsing unauthenticated. Add a token in Settings to bypass strict API limits.'}
          </p>
          {!token && (
            <Link to="/settings" className="text-sm text-github-link hover:underline">Configure API Key &rarr;</Link>
          )}
        </motion.div>

        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }} className="rounded-xl border border-github-border bg-github-canvas p-6">
          <h2 className="text-lg font-semibold text-white flex items-center gap-2 mb-4"><HistoryIcon className="h-5 w-5 text-github-muted"/> Recent PulseIcon</h2>
          {history.length > 0 ? (
            <ul className="space-y-3 text-sm">
              {history.map((h, i) => (
                <li key={i} className="flex items-center gap-2">
                  <span className="h-2 w-2 rounded-full bg-github-border"></span>
                  <span className="text-github-text font-mono">{h}</span>
                </li>
              ))}
            </ul>
          ) : (
            <p className="text-sm text-github-muted">No recent searches found.</p>
          )}
        </motion.div>
      </div>

      {/* Tool Grid */}
      <div>
        <h2 className="text-xl font-bold text-white mb-6">Popular Tools</h2>
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {[
            { title: 'Profile Analyzer', desc: 'Deep insights and graphs for any GitHub profile.', path: '/profile-analyzer', icon: PulseIcon },
            { title: 'Repo Compare', desc: 'Side-by-side technical comparison of repositories.', path: '/compare', icon: CodeIcon },
            { title: 'Health Checker', desc: 'Audit open-source standards and documentation.', path: '/repo-health', icon: ShieldIcon }
          ].map((tool, i) => (
            <Link key={i} to={tool.path}>
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 + (i * 0.1) }}
                className="group relative rounded-xl border border-github-border bg-[#0d1117] p-6 hover:border-github-link transition-colors cursor-pointer h-full flex flex-col"
                onClick={triggerSupportCard}
              >
                <tool.icon className="h-8 w-8 text-github-muted mb-4 group-hover:text-github-link transition-colors" />
                <h3 className="text-lg font-semibold text-white mb-2">{tool.title}</h3>
                <p className="text-sm text-github-muted mb-4 flex-1">{tool.desc}</p>
                <span className="text-sm font-medium text-github-link group-hover:underline">Launch Tool &rarr;</span>
              </motion.div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}
