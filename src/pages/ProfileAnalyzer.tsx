import { useState } from 'react';
import { Search, Users, Calendar, Star, GitFork } from 'lucide-react';
import { motion } from 'framer-motion';
import { GitHubService, type GitHubUser, type GitHubRepo } from '../lib/GitHubService';
import { triggerSupportCard } from '../components/ui/SupportCard';

export function ProfileAnalyzer() {
  const [username, setUsername] = useState('');
  const [user, setUser] = useState<GitHubUser | null>(null);
  const [repos, setRepos] = useState<GitHubRepo[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleSearch = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!username.trim()) return;

    setLoading(true);
    setError('');
    
    try {
      const [userData, userRepos] = await Promise.all([
        GitHubService.getUser(username),
        GitHubService.getUserRepos(username)
      ]);
      setUser(userData);
      setRepos(userRepos);
      // Trigger support card on successful usage of a feature
      triggerSupportCard();
    } catch (err: any) {
      setError(err.message || 'Failed to fetch user data');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="mx-auto max-w-5xl">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-white mb-2">Profile Analyzer</h1>
        <p className="text-github-text">Get deep insights into any GitHub profile.</p>
      </div>

      <form onSubmit={handleSearch} className="mb-8">
        <div className="flex max-w-md gap-3">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-github-muted" />
            <input
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              placeholder="Enter GitHub username..."
              className="w-full rounded-md border border-github-border bg-github-canvas py-2 pl-10 pr-4 text-white focus:border-github-link focus:outline-none focus:ring-1 focus:ring-github-link transition-colors"
            />
          </div>
          <button
            type="submit"
            disabled={loading}
            className="rounded-md bg-github-success px-4 py-2 font-medium text-white hover:bg-github-successHover transition-colors disabled:opacity-50"
          >
            {loading ? 'Analyzing...' : 'Analyze'}
          </button>
        </div>
        {error && <p className="mt-2 text-sm text-github-danger">{error}</p>}
      </form>

      {user && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="grid gap-6 md:grid-cols-3"
        >
          {/* User Profile Card */}
          <div className="col-span-1 rounded-xl border border-github-border bg-github-canvas p-6">
            <div className="text-center mb-6">
              <img
                src={user.avatar_url}
                alt={user.name || user.login}
                className="mx-auto h-32 w-32 rounded-full border-4 border-github-border shadow-lg"
              />
              <h2 className="mt-4 text-2xl font-bold text-white">{user.name || user.login}</h2>
              <a href={user.html_url} target="_blank" rel="noreferrer" className="text-github-muted hover:text-github-link hover:underline">
                @{user.login}
              </a>
            </div>

            {user.bio && (
              <p className="text-sm text-github-text text-center mb-6">{user.bio}</p>
            )}

            <div className="flex justify-center gap-6 text-sm text-github-text mb-6">
              <div className="flex items-center gap-1 hover:text-github-link cursor-pointer">
                <Users className="h-4 w-4" />
                <span className="font-semibold text-white">{user.followers}</span> followers
              </div>
              <div className="flex items-center gap-1 hover:text-github-link cursor-pointer">
                <span className="font-semibold text-white">{user.following}</span> following
              </div>
            </div>

            <div className="space-y-3 text-sm text-github-text pt-4 border-t border-github-border">
              <div className="flex items-center gap-2">
                <Calendar className="h-4 w-4 text-github-muted" />
                Joined {new Date(user.created_at).toLocaleDateString()}
              </div>
            </div>
          </div>

          {/* Repositories */}
          <div className="md:col-span-2 space-y-4">
            <div className="flex items-center justify-between border-b border-github-border pb-2">
              <h3 className="text-lg font-semibold text-white">Recent Repositories</h3>
              <span className="rounded-full bg-github-border px-2.5 py-0.5 text-xs font-medium text-github-text">
                {user.public_repos} total
              </span>
            </div>
            
            <div className="grid gap-4 sm:grid-cols-2">
              {repos.map((repo) => (
                <div key={repo.id} className="rounded-lg border border-github-border bg-github-canvas p-4 hover:border-github-link transition-colors flex flex-col justify-between">
                  <div>
                    <div className="flex items-start justify-between mb-2">
                      <a href={repo.html_url} target="_blank" rel="noreferrer" className="font-semibold text-github-link hover:underline truncate pr-4">
                        {repo.name}
                      </a>
                    </div>
                    <p className="text-sm text-github-muted mb-4 line-clamp-2 h-10">
                      {repo.description || 'No description provided.'}
                    </p>
                  </div>
                  <div className="flex items-center gap-4 text-xs text-github-muted">
                    {repo.language && (
                      <div className="flex items-center gap-1">
                        <span className="h-2.5 w-2.5 rounded-full bg-github-link"></span>
                        {repo.language}
                      </div>
                    )}
                    <div className="flex items-center gap-1 hover:text-github-link cursor-pointer">
                      <Star className="h-3.5 w-3.5" />
                      {repo.stargazers_count}
                    </div>
                    <div className="flex items-center gap-1 hover:text-github-link cursor-pointer">
                      <GitFork className="h-3.5 w-3.5" />
                      {repo.forks_count}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </motion.div>
      )}
    </div>
  );
}
