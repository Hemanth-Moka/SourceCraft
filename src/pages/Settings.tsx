import { useState, useEffect } from 'react';
import toast from 'react-hot-toast';
import { Key } from 'lucide-react';

export function Settings() {
  const [token, setToken] = useState('');

  useEffect(() => {
    setToken(localStorage.getItem('github_token') || '');
  }, []);

  const saveToken = () => {
    localStorage.setItem('github_token', token);
    toast.success('Token saved successfully');
  };

  const removeToken = () => {
    localStorage.removeItem('github_token');
    setToken('');
    toast.success('Token removed');
  };

  return (
    <div className="mx-auto max-w-2xl">
      <div className="mb-8 border-b border-github-border pb-4">
        <h1 className="text-3xl font-bold text-white mb-2 flex items-center gap-3">
          <Key className="h-8 w-8 text-github-link" /> Settings
        </h1>
        <p className="text-github-text">Manage your application configuration and API keys.</p>
      </div>
      
      <div className="rounded-xl border border-github-border bg-github-canvas p-6">
        <h2 className="text-xl font-semibold text-white mb-4">GitHub API Configuration</h2>
        <p className="text-sm text-github-muted mb-6 leading-relaxed">
          To bypass the strict unauthenticated rate limits (60 requests/hour), please provide a Personal Access Token. 
          Your token is stored safely in your browser's local storage and is <strong className="text-white">never</strong> sent anywhere except directly to the GitHub API.
        </p>
        
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-github-text mb-1">Personal Access Token</label>
            <input
              type="password"
              value={token}
              onChange={(e) => setToken(e.target.value)}
              placeholder="ghp_xxxxxxxxxxxxxxxxxxxx"
              className="w-full rounded-md border border-github-border bg-github-bg px-3 py-2 text-white focus:border-github-link focus:outline-none focus:ring-1 focus:ring-github-link"
            />
          </div>
          <div className="flex gap-3">
            <button
              onClick={saveToken}
              className="rounded-md bg-github-success hover:bg-github-successHover px-4 py-2 text-sm font-medium text-white transition-colors"
            >
              Save Configuration
            </button>
            {token && (
              <button
                onClick={removeToken}
                className="rounded-md border border-github-border bg-github-btn hover:bg-github-btnHover px-4 py-2 text-sm font-medium text-github-danger transition-colors"
              >
                Remove Token
              </button>
            )}
          </div>
        </div>

        <div className="mt-6 pt-6 border-t border-github-border text-sm text-github-muted">
          <p>Don't have a token? <a href="https://github.com/settings/tokens/new?description=SourceCraft+App" target="_blank" rel="noreferrer" className="text-github-link hover:underline">Generate one here</a>. You do not need to grant it any scopes for public data.</p>
        </div>
      </div>
    </div>
  );
}
