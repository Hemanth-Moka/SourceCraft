import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { triggerSupportCard } from '../components/ui/SupportCard';
import { 
  PulseIcon, CodeIcon, ShieldIcon, FileIcon, 
  MilestoneIcon, StarIcon, SearchIcon, GraphIcon, 
  CommentIcon, PencilIcon 
} from '@primer/octicons-react';

const tools = [
  { title: 'Profile Analyzer', desc: 'Deep insights for any GitHub profile.', path: '/profile-analyzer', icon: PulseIcon },
  { title: 'Repo Compare', desc: 'Side-by-side technical comparison.', path: '/compare', icon: CodeIcon },
  { title: 'Health Checker', desc: 'Audit open-source standards.', path: '/repo-health', icon: ShieldIcon },
  { title: 'README Generator', desc: 'Create stunning READMEs.', path: '/readme-generator', icon: FileIcon },
  { title: 'Badge Generator', desc: 'Shields.io badge creator.', path: '/badge-generator', icon: MilestoneIcon },
  { title: 'Profile README', desc: 'Generate animated profile READMEs.', path: '/profile-readme', icon: StarIcon },
  { title: 'Open Source Finder', desc: 'Discover projects to contribute to.', path: '/open-source', icon: SearchIcon },
  { title: 'Repo SEO', desc: 'Optimize repository discoverability.', path: '/seo', icon: GraphIcon },
  { title: 'Stats Dashboard', desc: 'Visual metrics and activity.', path: '/stats', icon: GraphIcon },
  { title: 'AI Commits', desc: 'Generate commit messages.', path: '/ai-commits', icon: CommentIcon },
  { title: 'Markdown Editor', desc: 'Live preview markdown editor.', path: '/markdown', icon: PencilIcon },
];

export function Dashboard() {
  return (
    <div className="mx-auto max-w-4xl pt-4">
      <div className="mb-6 border-b border-github-border pb-4">
        <h1 className="text-2xl font-normal text-white">Overview</h1>
      </div>

      <div className="grid gap-x-8 gap-y-2 md:grid-cols-2">
        {tools.map((tool, i) => (
          <Link key={i} to={tool.path}>
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.03 }}
              className="group flex items-start gap-4 rounded-md border border-transparent p-3 hover:border-github-border hover:bg-[#161b22] transition-all"
              onClick={triggerSupportCard}
            >
              <div className="mt-0.5 flex h-8 w-8 shrink-0 items-center justify-center rounded-md border border-github-border bg-[#0d1117] text-github-muted group-hover:text-white transition-colors">
                <tool.icon className="h-4 w-4" />
              </div>
              <div>
                <h3 className="font-semibold text-github-link group-hover:underline mb-1">{tool.title}</h3>
                <p className="text-sm text-github-muted">{tool.desc}</p>
              </div>
            </motion.div>
          </Link>
        ))}
      </div>
    </div>
  );
}
