import { useState } from 'react';
import { StarIcon, RepoForkedIcon, RepoIcon } from '@primer/octicons-react';
import { motion } from 'framer-motion';
import { GitHubService } from '../lib/GitHubService';
import { triggerSupportCard } from '../components/ui/SupportCard';

export function Stats() {
  const [username, setUsername] = useState('');
  const [stats, setStats] = useState<any>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const fetchStats = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    try {
      const repos = await GitHubService.getUserRepos(username);
      let totalStars = 0;
      let totalForks = 0;
      let languages: Record<string, number> = {};

      repos.forEach(repo => {
        totalStars += repo.stargazers_count;
        totalForks += repo.forks_count;
        if (repo.language) {
          languages[repo.language] = (languages[repo.language] || 0) + 1;
        }
      });

      setStats({
        totalRepos: repos.length,
        totalStars,
        totalForks,
        languages: Object.entries(languages).sort((a, b) => b[1] - a[1]).slice(0, 3)
      });
      triggerSupportCard();
    } catch (err: any) {
      setError(err.message || 'Error fetching stats');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="mx-auto max-w-4xl">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-white mb-2">GitHub Statistics</h1>
        <p className="text-github-text">Aggregate statistics across a user's repositories.</p>
      </div>

      <form onSubmit={fetchStats} className="mb-8 flex max-w-md gap-3">
        <input
          type="text"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          placeholder="GitHub Username"
          className="flex-1 rounded-md border border-github-border bg-github-canvas px-4 py-2 text-white focus:border-github-link focus:outline-none"
        />
        <button
          type="submit"
          disabled={loading}
          className="rounded-md bg-github-success px-4 py-2 font-medium text-white disabled:opacity-50 hover:bg-github-successHover"
        >
          {loading ? 'Calculating...' : 'Get Stats'}
        </button>
      </form>

      {error && <p className="text-github-danger mb-4">{error}</p>}

      {stats && (
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="grid gap-6 sm:grid-cols-3">
          <div className="rounded-xl border border-github-border bg-github-canvas p-6 text-center">
            <StarIcon className="mx-auto h-8 w-8 text-yellow-500 mb-2" />
            <div className="text-3xl font-bold text-white">{stats.totalStars}</div>
            <div className="text-sm text-github-muted">Total Stars</div>
          </div>
          <div className="rounded-xl border border-github-border bg-github-canvas p-6 text-center">
            <RepoForkedIcon className="mx-auto h-8 w-8 text-github-muted mb-2" />
            <div className="text-3xl font-bold text-white">{stats.totalForks}</div>
            <div className="text-sm text-github-muted">Total Forks</div>
          </div>
          <div className="rounded-xl border border-github-border bg-github-canvas p-6 text-center">
            <RepoIcon className="mx-auto h-8 w-8 text-github-muted mb-2" />
            <div className="text-3xl font-bold text-white">{stats.totalRepos}</div>
            <div className="text-sm text-github-muted">Recent Repos</div>
          </div>
          
          <div className="sm:col-span-3 rounded-xl border border-github-border bg-github-canvas p-6">
            <h3 className="text-lg font-semibold text-white mb-4">Top Languages (Recent Repos)</h3>
            <div className="flex gap-4">
              {stats.languages.map(([lang, count]: [string, number]) => (
                <div key={lang} className="flex-1 bg-github-bg rounded-lg p-4 border border-github-border text-center">
                  <div className="text-xl font-bold text-github-link">{lang}</div>
                  <div className="text-sm text-github-muted">{count} repos</div>
                </div>
              ))}
            </div>
          </div>
        </motion.div>
      )}
    </div>
  );
}
