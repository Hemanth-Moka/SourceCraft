import { useState } from 'react';
import { SearchIcon, StarIcon, RepoForkedIcon, IssueOpenedIcon, CalendarIcon } from '@primer/octicons-react';
import { motion } from 'framer-motion';
import { GitHubService, type GitHubRepoDetails } from '../lib/GitHubService';
import { triggerSupportCard } from '../components/ui/SupportCard';

export function RepoCompare() {
  const [repo1Str, setRepo1Str] = useState('facebook/react');
  const [repo2Str, setRepo2Str] = useState('vuejs/core');
  
  const [repo1, setRepo1] = useState<GitHubRepoDetails | null>(null);
  const [repo2, setRepo2] = useState<GitHubRepoDetails | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleCompare = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    const r1 = repo1Str.split('/');
    const r2 = repo2Str.split('/');

    if (r1.length !== 2 || r2.length !== 2) {
      setError('Format must be owner/repo (e.g. facebook/react)');
      setLoading(false);
      return;
    }

    try {
      const [res1, res2] = await Promise.all([
        GitHubService.getRepo(r1[0], r1[1]),
        GitHubService.getRepo(r2[0], r2[1])
      ]);
      setRepo1(res1);
      setRepo2(res2);
      triggerSupportCard();
    } catch (err: any) {
      setError(err.message || 'Failed to fetch repositories');
    } finally {
      setLoading(false);
    }
  };

  const getWinner = (v1: number, v2: number) => {
    if (v1 > v2) return 1;
    if (v2 > v1) return 2;
    return 0;
  };

  return (
    <div className="mx-auto max-w-5xl">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-white mb-2">Repository Compare</h1>
        <p className="text-github-text">Side-by-side technical comparison of two open-source repositories.</p>
      </div>

      <form onSubmit={handleCompare} className="mb-8 flex flex-col md:flex-row gap-4 items-center">
        <div className="flex-1 w-full relative">
          <SearchIcon className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-github-muted" />
          <input
            type="text"
            value={repo1Str}
            onChange={(e) => setRepo1Str(e.target.value)}
            className="w-full rounded-md border border-github-border bg-github-canvas py-2 pl-10 pr-4 text-white focus:border-github-link focus:outline-none"
          />
        </div>
        <span className="text-github-muted font-bold px-2 text-sm">VS</span>
        <div className="flex-1 w-full relative">
          <SearchIcon className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-github-muted" />
          <input
            type="text"
            value={repo2Str}
            onChange={(e) => setRepo2Str(e.target.value)}
            className="w-full rounded-md border border-github-border bg-github-canvas py-2 pl-10 pr-4 text-white focus:border-github-link focus:outline-none"
          />
        </div>
        <button type="submit" disabled={loading} className="w-full md:w-auto rounded-md bg-github-success px-6 py-2 font-medium text-white hover:bg-github-successHover transition-colors disabled:opacity-50">
          {loading ? 'Comparing...' : 'Compare'}
        </button>
      </form>

      {error && <p className="text-github-danger mb-4">{error}</p>}

      {(repo1 && repo2) && (
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="rounded-xl border border-github-border bg-github-canvas overflow-hidden">
          <table className="w-full text-sm text-left text-github-text">
            <thead className="text-xs uppercase bg-github-border/20 text-github-muted border-b border-github-border">
              <tr>
                <th className="px-6 py-4 font-medium">Metric</th>
                <th className="px-6 py-4 font-bold text-white text-base text-center border-l border-github-border">
                  <a href={repo1.html_url} target="_blank" rel="noreferrer" className="hover:text-github-link hover:underline">{repo1.name}</a>
                </th>
                <th className="px-6 py-4 font-bold text-white text-base text-center border-l border-github-border">
                  <a href={repo2.html_url} target="_blank" rel="noreferrer" className="hover:text-github-link hover:underline">{repo2.name}</a>
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-github-border">
              {[
                { label: 'Stars', key: 'stargazers_count', icon: StarIcon, higherIsBetter: true },
                { label: 'Forks', key: 'forks_count', icon: RepoForkedIcon, higherIsBetter: true },
                { label: 'Open Issues', key: 'open_issues_count', icon: IssueOpenedIcon, higherIsBetter: false },
                { label: 'Network', key: 'network_count', icon: RepoForkedIcon, higherIsBetter: true },
                { label: 'Watchers', key: 'subscribers_count', icon: SearchIcon, higherIsBetter: true },
              ].map((metric) => {
                const v1 = repo1[metric.key as keyof GitHubRepoDetails] as number;
                const v2 = repo2[metric.key as keyof GitHubRepoDetails] as number;
                const winner = getWinner(v1, v2);
                const r1Wins = metric.higherIsBetter ? winner === 1 : winner === 2;
                const r2Wins = metric.higherIsBetter ? winner === 2 : winner === 1;

                return (
                  <tr key={metric.key} className="hover:bg-github-border/10 transition-colors">
                    <td className="px-6 py-4 font-medium flex items-center gap-2">
                      <metric.icon className="h-4 w-4 text-github-muted" /> {metric.label}
                    </td>
                    <td className={`px-6 py-4 text-center border-l border-github-border font-mono ${r1Wins ? 'text-github-success font-bold' : ''}`}>
                      {v1.toLocaleString()}
                    </td>
                    <td className={`px-6 py-4 text-center border-l border-github-border font-mono ${r2Wins ? 'text-github-success font-bold' : ''}`}>
                      {v2.toLocaleString()}
                    </td>
                  </tr>
                );
              })}
              <tr className="hover:bg-github-border/10 transition-colors">
                <td className="px-6 py-4 font-medium flex items-center gap-2">
                  <CalendarIcon className="h-4 w-4 text-github-muted" /> Created At
                </td>
                <td className="px-6 py-4 text-center border-l border-github-border">
                  {new Date(repo1.created_at).toLocaleDateString()}
                </td>
                <td className="px-6 py-4 text-center border-l border-github-border">
                  {new Date(repo2.created_at).toLocaleDateString()}
                </td>
              </tr>
              <tr className="hover:bg-github-border/10 transition-colors">
                <td className="px-6 py-4 font-medium">License</td>
                <td className="px-6 py-4 text-center border-l border-github-border">
                  {repo1.license?.spdx_id || 'None'}
                </td>
                <td className="px-6 py-4 text-center border-l border-github-border">
                  {repo2.license?.spdx_id || 'None'}
                </td>
              </tr>
            </tbody>
          </table>
        </motion.div>
      )}
    </div>
  );
}
