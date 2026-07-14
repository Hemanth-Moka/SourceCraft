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
  static getToken() {
    return localStorage.getItem('github_token');
  }

  static async fetchWithAuth(url: string, options: RequestInit = {}) {
    const token = this.getToken();
    const headers: HeadersInit = {
      ...options.headers,
      ...(token ? { Authorization: `token ${token}` } : {})
    };
    const res = await fetch(url, { ...options, headers });
    if (!res.ok) {
      if (res.status === 403 || res.status === 401) {
        throw new Error('API Rate Limit Exceeded or Invalid Token. Add a Personal Access Token in Settings.');
      }
      throw new Error(`API Error: ${res.statusText}`);
    }
    return res;
  }

  static async getUserProfile(username: string): Promise<GitHubUser> {
    const res = await this.fetchWithAuth(`${API_URL}/users/${username}`);
    return res.json();
  }

  static async getUserRepos(username: string): Promise<GitHubRepo[]> {
    const res = await this.fetchWithAuth(`${API_URL}/users/${username}/repos?sort=updated&per_page=10`);
    return res.json();
  }

  static async getRepo(owner: string, repo: string): Promise<GitHubRepoDetails> {
    const res = await this.fetchWithAuth(`${API_URL}/repos/${owner}/${repo}`);
    return res.json();
  }

  static async getReadme(owner: string, repo: string): Promise<string | null> {
    try {
      const res = await this.fetchWithAuth(`${API_URL}/repos/${owner}/${repo}/readme`, {
        headers: { Accept: 'application/vnd.github.v3.raw' },
      });
      return res.text();
    } catch {
      return null;
    }
  }
}
