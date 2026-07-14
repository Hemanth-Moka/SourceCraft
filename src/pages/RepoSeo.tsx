import { useState } from 'react';
import { GitHubService, type GitHubRepoDetails } from '../lib/GitHubService';

export function RepoSeo() {
  const [repoStr, setRepoStr] = useState('');
  const [repo, setRepo] = useState<GitHubRepoDetails | null>(null);
  const [loading, setLoading] = useState(false);

  const handleSearch = async (e: React.FormEvent) => {
    e.preventDefault();
    const parts = repoStr.split('/');
    if (parts.length !== 2) return;
    setLoading(true);
    try {
      const data = await GitHubService.getRepo(parts[0], parts[1]);
      setRepo(data);
    } catch {
      // ignore
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="mx-auto max-w-4xl">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-white mb-2">Repository SEO</h1>
        <p className="text-github-text">Check your repository discoverability.</p>
      </div>

      <form onSubmit={handleSearch} className="mb-8 flex max-w-md gap-3">
        <input
          type="text"
          value={repoStr}
          onChange={(e) => setRepoStr(e.target.value)}
          placeholder="owner/repo"
          className="flex-1 rounded-md border border-github-border bg-github-canvas px-4 py-2 text-white focus:outline-none"
        />
        <button
          type="submit"
          className="rounded-md bg-github-success px-4 py-2 text-white hover:bg-github-successHover"
        >
          {loading ? 'Checking' : 'Check'}
        </button>
      </form>
      
      {repo && (
        <div className="space-y-4">
          <div className="rounded-xl border border-github-border bg-github-canvas p-6">
            <h2 className="text-lg font-semibold text-white mb-4">SEO Analysis for {repo.name}</h2>
            <ul className="space-y-2 text-github-text">
              <li>Description: {repo.description ? <span className="text-github-success">Present</span> : <span className="text-github-danger">Missing</span>}</li>
              <li>Topics/Tags: {repo.topics?.length ? <span className="text-github-success">{repo.topics.length} tags found</span> : <span className="text-yellow-500">None found (Add topics to improve SEO)</span>}</li>
            </ul>
          </div>
        </div>
      )}
    </div>
  );
}
