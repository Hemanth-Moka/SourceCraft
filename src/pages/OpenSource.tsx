import { useState } from 'react';
import { motion } from 'framer-motion';
import { triggerSupportCard } from '../components/ui/SupportCard';

export function OpenSource() {
  const [language, setLanguage] = useState('javascript');
  const [issues, setIssues] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);

  const fetchIssues = async () => {
    setLoading(true);
    try {
      const res = await fetch(`https://api.github.com/search/issues?q=state:open+label:"good first issue"+language:${language}&sort=created&order=desc`);
      const data = await res.json();
      setIssues(data.items || []);
      triggerSupportCard();
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="mx-auto max-w-5xl">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-white mb-2">Open Source Finder</h1>
        <p className="text-github-text">Discover beginner-friendly issues to start your open-source journey.</p>
      </div>

      <div className="flex gap-4 mb-8">
        <select
          value={language}
          onChange={(e) => setLanguage(e.target.value)}
          className="rounded-md border border-github-border bg-github-canvas px-4 py-2 text-white focus:border-github-link focus:outline-none"
        >
          <option value="javascript">JavaScript</option>
          <option value="typescript">TypeScript</option>
          <option value="python">Python</option>
          <option value="go">Go</option>
          <option value="rust">Rust</option>
          <option value="java">Java</option>
        </select>
        <button
          onClick={fetchIssues}
          disabled={loading}
          className="rounded-md bg-github-success px-4 py-2 font-medium text-white hover:bg-github-successHover transition-colors disabled:opacity-50"
        >
          {loading ? 'Searching...' : 'Find Issues'}
        </button>
      </div>

      <div className="space-y-4">
        {issues.map((issue) => (
          <motion.div
            key={issue.id}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="rounded-lg border border-github-border bg-github-canvas p-4 hover:border-github-link transition-colors"
          >
            <div className="flex items-start justify-between">
              <div>
                <a href={issue.html_url} target="_blank" rel="noreferrer" className="text-lg font-semibold text-github-link hover:underline">
                  {issue.title}
                </a>
                <p className="text-sm text-github-muted mt-1">
                  #{issue.number} opened by {issue.user.login} in <span className="text-github-text font-medium">{issue.repository_url.split('/').slice(-2).join('/')}</span>
                </p>
              </div>
              <div className="flex gap-2 flex-wrap max-w-[200px] justify-end">
                {issue.labels.map((label: any) => (
                  <span key={label.id} className="rounded-full border border-github-border bg-github-bg px-2 py-0.5 text-xs text-github-muted">
                    {label.name}
                  </span>
                ))}
              </div>
            </div>
          </motion.div>
        ))}
        {!loading && issues.length === 0 && (
          <p className="text-github-muted">SearchIcon for a language to find good first issues.</p>
        )}
      </div>
    </div>
  );
}
