import { useState } from 'react';
import { Search, Users, Calendar, Star, GitFork, Book } from 'lucide-react';
import { motion } from 'framer-motion';
import { GitHubService, type GitHubUser, type GitHubRepo } from '../lib/GitHubService';
import { triggerSupportCard } from '../components/ui/SupportCard';
import { Tabs } from '../components/ui/Tabs';
import { Skeleton } from '../components/ui/Skeleton';

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
        GitHubService.getUserProfile(username),
        GitHubService.getUserRepos(username)
      ]);
      setUser(userData);
      setRepos(userRepos);
      triggerSupportCard();
    } catch (err: any) {
      setError(err.message || 'Failed to fetch user data');
    } finally {
      setLoading(false);
    }
  };

  const overviewTab = (
    <div className="grid gap-6 md:grid-cols-2">
      <div className="rounded-xl border border-github-border bg-github-canvas p-6 flex flex-col items-center text-center">
        {loading ? (
          <Skeleton className="h-32 w-32 rounded-full mb-4" />
        ) : user ? (
          <>
            <img src={user.avatar_url} alt={user.name} className="h-32 w-32 rounded-full border border-github-border shadow-lg mb-4" />
            <h2 className="text-2xl font-bold text-white">{user.name || user.login}</h2>
            <a href={user.html_url} target="_blank" rel="noreferrer" className="text-github-link hover:underline mb-4">@{user.login}</a>
            {user.bio && <p className="text-sm text-github-text mb-4">{user.bio}</p>}
          </>
        ) : null}
      </div>
      <div className="rounded-xl border border-github-border bg-github-canvas p-6">
        <h3 className="text-lg font-semibold text-white mb-4">Quick Stats</h3>
        {loading ? (
          <div className="space-y-4">
            <Skeleton className="h-6 w-full" />
            <Skeleton className="h-6 w-3/4" />
            <Skeleton className="h-6 w-1/2" />
          </div>
        ) : user ? (
          <div className="space-y-4 text-sm text-github-text">
            <div className="flex justify-between border-b border-github-border pb-2">
              <span className="flex items-center gap-2"><Users className="h-4 w-4"/> Followers</span>
              <span className="font-bold text-white">{user.followers}</span>
            </div>
            <div className="flex justify-between border-b border-github-border pb-2">
              <span className="flex items-center gap-2"><Users className="h-4 w-4"/> Following</span>
              <span className="font-bold text-white">{user.following}</span>
            </div>
            <div className="flex justify-between border-b border-github-border pb-2">
              <span className="flex items-center gap-2"><Book className="h-4 w-4"/> Public Repos</span>
              <span className="font-bold text-white">{user.public_repos}</span>
            </div>
            <div className="flex justify-between pt-2">
              <span className="flex items-center gap-2"><Calendar className="h-4 w-4"/> Joined</span>
              <span className="font-bold text-white">{new Date(user.created_at).toLocaleDateString()}</span>
            </div>
          </div>
        ) : null}
      </div>
    </div>
  );

  const reposTab = (
    <div className="grid gap-4 sm:grid-cols-2">
      {loading ? (
        Array(4).fill(0).map((_, i) => (
          <div key={i} className="rounded-lg border border-github-border bg-github-canvas p-4 h-32 flex flex-col justify-between">
            <Skeleton className="h-6 w-3/4" />
            <Skeleton className="h-4 w-full" />
            <Skeleton className="h-4 w-1/2" />
          </div>
        ))
      ) : repos.map((repo) => (
        <div key={repo.id} className="rounded-lg border border-github-border bg-github-canvas p-4 hover:border-github-link transition-colors flex flex-col justify-between">
          <div>
            <a href={repo.html_url} target="_blank" rel="noreferrer" className="font-semibold text-github-link hover:underline truncate block mb-2">{repo.name}</a>
            <p className="text-sm text-github-muted mb-4 line-clamp-2 h-10">{repo.description || 'No description provided.'}</p>
          </div>
          <div className="flex items-center gap-4 text-xs text-github-muted">
            {repo.language && <div className="flex items-center gap-1"><span className="h-2.5 w-2.5 rounded-full bg-github-link"></span>{repo.language}</div>}
            <div className="flex items-center gap-1"><Star className="h-3.5 w-3.5" />{repo.stargazers_count}</div>
            <div className="flex items-center gap-1"><GitFork className="h-3.5 w-3.5" />{repo.forks_count}</div>
          </div>
        </div>
      ))}
    </div>
  );

  return (
    <div className="mx-auto max-w-5xl">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-white mb-2">Profile Analyzer</h1>
        <p className="text-github-text">Get deep insights into any GitHub profile using advanced tabbed navigation.</p>
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
          <button type="submit" disabled={loading} className="rounded-md bg-github-btn hover:bg-github-btnHover border border-github-border px-4 py-2 font-medium text-white transition-colors disabled:opacity-50">
            {loading ? 'Analyzing...' : 'Analyze'}
          </button>
        </div>
        {error && <p className="mt-2 text-sm text-github-danger">{error}</p>}
      </form>

      {(user || loading) && (
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
          <Tabs tabs={[
            { id: 'overview', label: 'Overview', content: overviewTab },
            { id: 'repos', label: <span className="flex items-center gap-2">Repositories <span className="rounded-full bg-github-border px-2 py-0.5 text-xs">{user?.public_repos || 0}</span></span>, content: reposTab }
          ]} />
        </motion.div>
      )}
    </div>
  );
}
