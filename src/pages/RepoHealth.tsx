import { useState } from 'react';
import { SearchIcon, CheckCircleFillIcon, XCircleFillIcon, IssueOpenedIcon, FileIcon, ShieldIcon } from '@primer/octicons-react';
import { motion } from 'framer-motion';
import { GitHubService, type GitHubRepoDetails } from '../lib/GitHubService';
import { triggerSupportCard } from '../components/ui/SupportCard';
import { ProgressRing } from '../components/ui/ProgressRing';

export function RepoHealth() {
  const [repoStr, setRepoStr] = useState('');
  const [repo, setRepo] = useState<GitHubRepoDetails | null>(null);
  const [hasReadme, setHasReadme] = useState<boolean | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleSearch = async (e: React.FormEvent) => {
    e.preventDefault();
    const parts = repoStr.split('/');
    if (parts.length !== 2) {
      setError('Format must be owner/repo (e.g., facebook/react)');
      return;
    }

    setLoading(true);
    setError('');
    
    try {
      const [repoData, readmeText] = await Promise.all([
        GitHubService.getRepo(parts[0], parts[1]),
        GitHubService.getReadme(parts[0], parts[1])
      ]);
      setRepo(repoData);
      setHasReadme(!!readmeText);
      triggerSupportCard();
    } catch (err: any) {
      setError(err.message || 'Failed to fetch repository data');
    } finally {
      setLoading(false);
    }
  };

  const calculateScore = () => {
    if (!repo) return 0;
    let score = 0;
    if (hasReadme) score += 40;
    if (repo.license) score += 20;
    if (repo.description) score += 20;
    if (repo.has_issues) score += 10;
    if (repo.open_issues_count < 100) score += 10;
    return score;
  };

  const score = calculateScore();

  return (
    <div className="mx-auto max-w-4xl">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-white mb-2">Repository Health Checker</h1>
        <p className="text-github-text">Analyze open-source repositories for best practices.</p>
      </div>

      <form onSubmit={handleSearch} className="mb-8">
        <div className="flex max-w-md gap-3">
          <div className="relative flex-1">
            <SearchIcon className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-github-muted" />
            <input
              type="text"
              value={repoStr}
              onChange={(e) => setRepoStr(e.target.value)}
              placeholder="e.g. facebook/react"
              className="w-full rounded-md border border-github-border bg-github-canvas py-2 pl-10 pr-4 text-white focus:border-github-link focus:outline-none focus:ring-1 focus:ring-github-link transition-colors"
            />
          </div>
          <button
            type="submit"
            disabled={loading}
            className="rounded-md bg-github-success px-4 py-2 font-medium text-white hover:bg-github-successHover transition-colors disabled:opacity-50"
          >
            {loading ? 'Checking...' : 'Check'}
          </button>
        </div>
        {error && <p className="mt-2 text-sm text-github-danger">{error}</p>}
      </form>

      {repo && (
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="space-y-6">
          <div className="rounded-xl border border-github-border bg-github-canvas p-6 flex items-center justify-between">
            <div>
              <h2 className="text-2xl font-bold text-github-link hover:underline">
                <a href={repo.html_url} target="_blank" rel="noreferrer">{repo.name}</a>
              </h2>
              <p className="text-github-muted mt-1">{repo.description || 'No description'}</p>
            </div>
            <div className="text-center">
              <ProgressRing 
                radius={40} 
                stroke={6} 
                progress={score} 
                color={score >= 80 ? '#238636' : score >= 50 ? '#d29922' : '#f85149'} 
              />
            </div>
          </div>

          <div className="grid gap-4 sm:grid-cols-2">
            <div className="rounded-lg border border-github-border bg-github-canvas p-4 flex items-start gap-4">
              {hasReadme ? <CheckCircleFillIcon className="h-6 w-6 text-github-success" /> : <XCircleFillIcon className="h-6 w-6 text-github-danger" />}
              <div>
                <h3 className="font-semibold text-white flex items-center gap-2"><FileIcon className="h-4 w-4"/> README.md</h3>
                <p className="text-sm text-github-muted mt-1">
                  {hasReadme ? 'Repository has a README file.' : 'Missing a README. Essential for project documentation.'}
                </p>
              </div>
            </div>

            <div className="rounded-lg border border-github-border bg-github-canvas p-4 flex items-start gap-4">
              {repo.license ? <CheckCircleFillIcon className="h-6 w-6 text-github-success" /> : <XCircleFillIcon className="h-6 w-6 text-github-danger" />}
              <div>
                <h3 className="font-semibold text-white flex items-center gap-2"><ShieldIcon className="h-4 w-4"/> License</h3>
                <p className="text-sm text-github-muted mt-1">
                  {repo.license ? `Licensed under ${repo.license.name}.` : 'No license found. Users cannot legally use this code.'}
                </p>
              </div>
            </div>

            <div className="rounded-lg border border-github-border bg-github-canvas p-4 flex items-start gap-4">
              {repo.description ? <CheckCircleFillIcon className="h-6 w-6 text-github-success" /> : <XCircleFillIcon className="h-6 w-6 text-github-danger" />}
              <div>
                <h3 className="font-semibold text-white">Description</h3>
                <p className="text-sm text-github-muted mt-1">
                  {repo.description ? 'Repository has a description.' : 'Missing a description. Helps with SEO and discovery.'}
                </p>
              </div>
            </div>

            <div className="rounded-lg border border-github-border bg-github-canvas p-4 flex items-start gap-4">
              {repo.has_issues ? <CheckCircleFillIcon className="h-6 w-6 text-github-success" /> : <IssueOpenedIcon className="h-6 w-6 text-yellow-500" />}
              <div>
                <h3 className="font-semibold text-white">Issues Enabled</h3>
                <p className="text-sm text-github-muted mt-1">
                  {repo.has_issues ? `${repo.open_issues_count} open issues.` : 'Issues are disabled.'}
                </p>
              </div>
            </div>
          </div>
        </motion.div>
      )}
    </div>
  );
}
