import { useState } from 'react';
import { CopyIcon, CheckIcon } from '@primer/octicons-react';
import { triggerSupportCard } from '../components/ui/SupportCard';

export function ProfileReadme() {
  const [username, setUsername] = useState('');
  const [theme, setTheme] = useState('radical');
  const [copied, setCopied] = useState(false);

  const statsUrl = `https://github-readme-stats.vercel.app/api?username=${username || 'username'}&show_icons=true&theme=${theme}`;
  const streakUrl = `https://github-readme-streak-stats.herokuapp.com/?user=${username || 'username'}&theme=${theme}`;
  
  const markdown = `# Hi there 👋, I'm ${username || 'username'}

![GitHub stats](${statsUrl})
![GitHub streak](${streakUrl})
`;

  const handleCopy = () => {
    navigator.clipboard.writeText(markdown);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
    triggerSupportCard();
  };

  return (
    <div className="mx-auto max-w-4xl">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-white mb-2">Profile README Builder</h1>
        <p className="text-github-text">Generate dynamic stats cards for your GitHub profile.</p>
      </div>

      <div className="grid gap-8 md:grid-cols-2">
        <div className="space-y-6 rounded-xl border border-github-border bg-github-canvas p-6">
          <div>
            <label className="mb-1 block text-sm font-medium text-github-text">GitHub Username</label>
            <input
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              placeholder="torvalds"
              className="w-full rounded-md border border-github-border bg-github-bg px-3 py-2 text-white focus:border-github-link focus:outline-none"
            />
          </div>

          <div>
            <label className="mb-1 block text-sm font-medium text-github-text">Theme</label>
            <select
              value={theme}
              onChange={(e) => setTheme(e.target.value)}
              className="w-full rounded-md border border-github-border bg-github-bg px-3 py-2 text-white focus:border-github-link focus:outline-none"
            >
              <option value="radical">Radical</option>
              <option value="tokyonight">Tokyo Night</option>
              <option value="dracula">Dracula</option>
              <option value="github_dark">GitHub Dark</option>
              <option value="onedark">One Dark</option>
            </select>
          </div>
          
          <button
            onClick={handleCopy}
            className="w-full flex items-center justify-center gap-2 rounded-md bg-github-success px-4 py-2 font-medium text-white hover:bg-github-successHover transition-colors"
          >
            {copied ? <CheckIcon className="h-4 w-4" /> : <CopyIcon className="h-4 w-4" />}
            {copied ? 'Copied Markdown!' : 'CopyIcon Markdown'}
          </button>
        </div>

        <div className="space-y-4">
          <div className="rounded-xl border border-github-border bg-github-canvas p-6 flex flex-col items-center">
            <h2 className="text-sm font-semibold text-github-muted mb-4 self-start">Preview</h2>
            <img src={statsUrl} alt="Stats" className="mb-4 max-w-full" />
            <img src={streakUrl} alt="Streak" className="max-w-full" />
          </div>
        </div>
      </div>
    </div>
  );
}
