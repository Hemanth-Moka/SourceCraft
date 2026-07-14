export interface GitHubUser {
  login: string;
  avatar_url: string;
  name: string;
  bio: string;
  public_repos: number;
  followers: number;
  following: number;
  created_at: string;
  html_url: string;
}

export interface GitHubRepo {
  id: number;
  name: string;
  description: string;
  html_url: string;
  stargazers_count: number;
  language: string;
  updated_at: string;
  forks_count: number;
}

export interface GitHubRepoDetails extends GitHubRepo {
  has_issues: boolean;
  has_projects: boolean;
  has_downloads: boolean;
  has_wiki: boolean;
  has_pages: boolean;
  open_issues_count: number;
  network_count: number;
  subscribers_count: number;
  license: {
    key: string;
    name: string;
  } | null;
  topics?: string[];
}

const API_URL = 'https://api.github.com';

export class GitHubService {
  static async getUser(username: string): Promise<GitHubUser> {
    const res = await fetch(`${API_URL}/users/${username}`);
    if (!res.ok) throw new Error('User not found');
    return res.json();
  }

  static async getUserRepos(username: string): Promise<GitHubRepo[]> {
    const res = await fetch(`${API_URL}/users/${username}/repos?sort=updated&per_page=10`);
    if (!res.ok) throw new Error('Could not fetch repos');
    return res.json();
  }

  static async getRepo(owner: string, repo: string): Promise<GitHubRepoDetails> {
    const res = await fetch(`${API_URL}/repos/${owner}/${repo}`);
    if (!res.ok) throw new Error('Repository not found');
    return res.json();
  }

  static async getReadme(owner: string, repo: string): Promise<string | null> {
    const res = await fetch(`${API_URL}/repos/${owner}/${repo}/readme`, {
      headers: { Accept: 'application/vnd.github.v3.raw' },
    });
    if (!res.ok) return null;
    return res.text();
  }
}
