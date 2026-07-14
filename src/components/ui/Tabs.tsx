import { useState } from 'react';
import { motion } from 'framer-motion';

export interface Tab {
  id: string;
  label: React.ReactNode;
  content: React.ReactNode;
}

export function Tabs({ tabs }: { tabs: Tab[] }) {
  const [activeTab, setActiveTab] = useState(tabs[0].id);

  return (
    <div>
      <div className="flex border-b border-github-border mb-6">
        {tabs.map((tab) => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id)}
            className={`relative px-4 py-3 text-sm font-medium transition-colors rounded-t-md ${
              activeTab === tab.id ? 'text-white' : 'text-github-text hover:text-white hover:bg-github-border/30'
            }`}
          >
            <div className="flex items-center gap-2">{tab.label}</div>
            {activeTab === tab.id && (
              <motion.div
                layoutId="active-tab"
                className="absolute bottom-[-1px] left-0 right-0 h-[2px] bg-[#f85149]"
                initial={false}
                transition={{ type: "spring", stiffness: 300, damping: 30 }}
              />
            )}
          </button>
        ))}
      </div>
      <div>
        {tabs.find((tab) => tab.id === activeTab)?.content}
      </div>
    </div>
  );
}
