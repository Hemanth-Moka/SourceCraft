import { useState, useEffect } from 'react';
import { X, Star } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

// Global event bus for triggering the support card
export const triggerSupportCard = () => {
  window.dispatchEvent(new Event('show-support-card'));
};

export function SupportCard() {
  const [isVisible, setIsVisible] = useState(false);
  const [hasDismissed, setHasDismissed] = useState(false);

  useEffect(() => {
    // If they already dismissed it this session, don't show it again
    if (hasDismissed) return;

    const handleShow = () => {
      if (!hasDismissed) {
        setIsVisible(true);
      }
    };

    window.addEventListener('show-support-card', handleShow);
    return () => window.removeEventListener('show-support-card', handleShow);
  }, [hasDismissed]);

  const handleDismiss = () => {
    setIsVisible(false);
    setHasDismissed(true);
  };

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          initial={{ opacity: 0, y: 50, scale: 0.95 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: 20, scale: 0.95 }}
          className="fixed bottom-6 right-6 z-50 max-w-sm rounded-lg border border-github-border bg-github-canvas p-4 shadow-xl shadow-black/50"
        >
          <button
            onClick={handleDismiss}
            className="absolute right-2 top-2 rounded-md p-1 text-github-muted hover:bg-github-border hover:text-white transition-colors"
          >
            <X className="h-4 w-4" />
          </button>
          
          <div className="flex items-start gap-4 pr-6">
            <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-github-success/20 text-github-success">
              <Star className="h-5 w-5 fill-github-success" />
            </div>
            <div>
              <h3 className="font-semibold text-white mb-1">Support the project</h3>
              <p className="text-sm text-github-text mb-3">
                If this tool saved you time, consider giving the project a ⭐ on GitHub. It helps the project grow and motivates continued development.
              </p>
              <a
                href="https://github.com"
                target="_blank"
                rel="noreferrer"
                onClick={handleDismiss}
                className="inline-flex items-center gap-2 rounded-md bg-github-border px-3 py-1.5 text-sm font-medium text-white hover:bg-github-border/80 transition-colors"
              >
                <Star className="h-4 w-4" />
                Star on GitHub
              </a>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
