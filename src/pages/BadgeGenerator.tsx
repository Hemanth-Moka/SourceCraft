import { useState } from 'react';
import { CopyIcon, CheckIcon } from '@primer/octicons-react';
import { triggerSupportCard } from '../components/ui/SupportCard';

export function BadgeGenerator() {
  const [label, setLabel] = useState('build');
  const [message, setMessage] = useState('passing');
  const [color, setColor] = useState('success');
  const [style, setStyle] = useState('flat');
  const [logo, setLogo] = useState('');
  const [copied, setCopied] = useState(false);

  // Generate URL
  const badgeUrl = `https://img.shields.io/badge/${encodeURIComponent(label)}-${encodeURIComponent(message)}-${color}?style=${style}${logo ? `&logo=${encodeURIComponent(logo)}` : ''}`;
  const markdown = `![${label}](${badgeUrl})`;

  const handleCopy = () => {
    navigator.clipboard.writeText(markdown);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
    triggerSupportCard();
  };

  return (
    <div className="mx-auto max-w-4xl">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-white mb-2">Badge Generator</h1>
        <p className="text-github-text">Create beautiful Shields.io badges for your repository.</p>
      </div>

      <div className="grid gap-8 md:grid-cols-2">
        <div className="space-y-6 rounded-xl border border-github-border bg-github-canvas p-6">
          <h2 className="text-lg font-semibold text-white">Customize</h2>
          
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="mb-1 block text-sm font-medium text-github-text">Label</label>
              <input
                type="text"
                value={label}
                onChange={(e) => setLabel(e.target.value)}
                className="w-full rounded-md border border-github-border bg-github-bg px-3 py-2 text-white focus:border-github-link focus:outline-none"
              />
            </div>
            <div>
              <label className="mb-1 block text-sm font-medium text-github-text">Message</label>
              <input
                type="text"
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                className="w-full rounded-md border border-github-border bg-github-bg px-3 py-2 text-white focus:border-github-link focus:outline-none"
              />
            </div>
          </div>

          <div>
            <label className="mb-1 block text-sm font-medium text-github-text">Color</label>
            <div className="flex flex-wrap gap-2">
              {['success', 'important', 'critical', 'informational', 'blueviolet', 'ff69b4'].map((c) => (
                <button
                  key={c}
                  onClick={() => setColor(c)}
                  className={`px-3 py-1 text-xs rounded-full border ${color === c ? 'border-white text-white' : 'border-github-border text-github-muted hover:border-github-muted'}`}
                >
                  {c}
                </button>
              ))}
            </div>
          </div>

          <div>
            <label className="mb-1 block text-sm font-medium text-github-text">Style</label>
            <select
              value={style}
              onChange={(e) => setStyle(e.target.value)}
              className="w-full rounded-md border border-github-border bg-github-bg px-3 py-2 text-white focus:border-github-link focus:outline-none"
            >
              <option value="flat">Flat</option>
              <option value="flat-square">Flat Square</option>
              <option value="plastic">Plastic</option>
              <option value="for-the-badge">For the Badge</option>
              <option value="social">Social</option>
            </select>
          </div>

          <div>
            <label className="mb-1 block text-sm font-medium text-github-text">Logo (SimpleIcons name)</label>
            <input
              type="text"
              value={logo}
              onChange={(e) => setLogo(e.target.value)}
              placeholder="e.g. github, react, node.js"
              className="w-full rounded-md border border-github-border bg-github-bg px-3 py-2 text-white focus:border-github-link focus:outline-none"
            />
          </div>
        </div>

        <div className="space-y-6">
          <div className="rounded-xl border border-github-border bg-github-canvas p-6 flex flex-col items-center justify-center min-h-[200px]">
            <h2 className="text-sm font-semibold text-github-muted mb-4 self-start">Preview</h2>
            <img src={badgeUrl} alt="Generated Badge" className="scale-125 origin-center" />
          </div>

          <div className="rounded-xl border border-github-border bg-github-canvas p-6">
            <h2 className="text-sm font-semibold text-github-muted mb-4">Markdown</h2>
            <div className="flex gap-2">
              <input
                type="text"
                readOnly
                value={markdown}
                className="flex-1 rounded-md border border-github-border bg-github-bg px-3 py-2 text-sm text-github-text font-mono focus:outline-none"
              />
              <button
                onClick={handleCopy}
                className="flex items-center justify-center rounded-md bg-github-border w-10 hover:bg-github-border/80 transition-colors"
              >
                {copied ? <CheckIcon className="h-4 w-4 text-github-success" /> : <CopyIcon className="h-4 w-4 text-white" />}
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
