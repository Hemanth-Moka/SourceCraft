import { motion } from 'framer-motion';
import { triggerSupportCard } from '../components/ui/SupportCard';

export function Dashboard() {
  return (
    <div className="mx-auto max-w-4xl">
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="mb-8 space-y-4"
      >
        <h1 className="text-4xl font-bold tracking-tight text-white sm:text-5xl">
          SourceCraft
        </h1>
        <p className="text-lg text-github-text">
          Discover, organize, and improve your GitHub presence with our suite of powerful tools.
        </p>
      </motion.div>

      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {[
          { title: 'Profile Analyzer', desc: 'Get deep insights into any GitHub profile.' },
          { title: 'Repo Health', desc: 'Check if your repository meets open-source standards.' },
          { title: 'README Generator', desc: 'Create stunning READMEs in minutes.' }
        ].map((tool, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.1 }}
            className="group relative rounded-xl border border-github-border bg-github-canvas p-6 hover:border-github-link transition-colors cursor-pointer"
            onClick={triggerSupportCard}
          >
            <h3 className="text-lg font-semibold text-white mb-2">{tool.title}</h3>
            <p className="text-sm text-github-muted mb-4">{tool.desc}</p>
            <span className="text-sm font-medium text-github-link hover:underline">
              Try it out →
            </span>
          </motion.div>
        ))}
      </div>
    </div>
  );
}
