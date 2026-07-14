import { useState } from 'react';
import ReactMarkdown from 'react-markdown';
import { Copy, Check } from 'lucide-react';
import { triggerSupportCard } from '../components/ui/SupportCard';

const DEFAULT_TEMPLATE = `# Project Title

A brief description of what this project does and who it's for.

## Features

- Feature 1
- Feature 2

## Installation

\`\`\`bash
npm install my-project
\`\`\`

## Usage

\`\`\`javascript
import { myProject } from 'my-project';

myProject();
\`\`\`

## License

[MIT](https://choosealicense.com/licenses/mit/)
`;

export function ReadmeGenerator() {
  const [markdown, setMarkdown] = useState(DEFAULT_TEMPLATE);
  const [copied, setCopied] = useState(false);

  const handleCopy = () => {
    navigator.clipboard.writeText(markdown);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
    triggerSupportCard();
  };

  return (
    <div className="mx-auto max-w-6xl h-[calc(100vh-8rem)] flex flex-col">
      <div className="mb-6 flex justify-between items-end shrink-0">
        <div>
          <h1 className="text-3xl font-bold text-white mb-2">README Generator</h1>
          <p className="text-github-text">Write and preview your README in real-time.</p>
        </div>
        <button
          onClick={handleCopy}
          className="flex items-center gap-2 rounded-md bg-github-border px-4 py-2 font-medium text-white hover:bg-github-border/80 transition-colors"
        >
          {copied ? <Check className="h-4 w-4 text-github-success" /> : <Copy className="h-4 w-4" />}
          {copied ? 'Copied!' : 'Copy Markdown'}
        </button>
      </div>

      <div className="flex-1 grid grid-cols-2 gap-6 min-h-0">
        <div className="flex flex-col h-full rounded-xl border border-github-border bg-github-canvas overflow-hidden">
          <div className="bg-github-border/50 px-4 py-2 border-b border-github-border text-sm font-medium text-white shrink-0">
            Editor
          </div>
          <textarea
            value={markdown}
            onChange={(e) => setMarkdown(e.target.value)}
            className="flex-1 w-full resize-none bg-transparent p-4 text-github-text font-mono text-sm focus:outline-none"
            spellCheck="false"
          />
        </div>

        <div className="flex flex-col h-full rounded-xl border border-github-border bg-github-canvas overflow-hidden">
          <div className="bg-github-border/50 px-4 py-2 border-b border-github-border text-sm font-medium text-white shrink-0">
            Preview
          </div>
          <div className="flex-1 p-6 overflow-y-auto prose prose-invert max-w-none prose-pre:bg-github-bg prose-pre:border prose-pre:border-github-border text-github-text">
            <ReactMarkdown>{markdown}</ReactMarkdown>
          </div>
        </div>
      </div>
    </div>
  );
}
