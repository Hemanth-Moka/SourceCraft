import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { Layout } from './components/layout/Layout';
import { Dashboard } from './pages/Dashboard';
import { ProfileAnalyzer } from './pages/ProfileAnalyzer';
import { RepoHealth } from './pages/RepoHealth';
import { ReadmeGenerator } from './pages/ReadmeGenerator';
import { BadgeGenerator } from './pages/BadgeGenerator';
import { ProfileReadme } from './pages/ProfileReadme';
import { OpenSource } from './pages/OpenSource';
import { RepoSeo } from './pages/RepoSeo';
import { Stats } from './pages/Stats';
import { AiCommits } from './pages/AiCommits';
import { MarkdownEditor } from './pages/MarkdownEditor';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Dashboard />} />
          <Route path="profile-analyzer" element={<ProfileAnalyzer />} />
          <Route path="repo-health" element={<RepoHealth />} />
          <Route path="readme-generator" element={<ReadmeGenerator />} />
          <Route path="badge-generator" element={<BadgeGenerator />} />
          <Route path="profile-readme" element={<ProfileReadme />} />
          <Route path="open-source" element={<OpenSource />} />
          <Route path="seo" element={<RepoSeo />} />
          <Route path="stats" element={<Stats />} />
          <Route path="ai-commits" element={<AiCommits />} />
          <Route path="markdown" element={<MarkdownEditor />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
