import type { Loader } from "astro/loaders";

interface GitHubOptions {
  username: string;
}

export function githubLoader(opts: GitHubOptions): Loader {
  return {
    name: "github-loader",
    async load({ store, logger }) {
      logger.info(`Fetching repos for ${opts.username}...`);

      const headers: Record<string, string> = {
        Accept: "application/vnd.github.v3+json",
      };

      const token =
        import.meta.env.GITHUB_TOKEN ?? process.env.GITHUB_TOKEN;
      if (token) {
        headers.Authorization = `Bearer ${token}`;
      }

      const repos: GitHubRepo[] = [];
      let page = 1;

      while (true) {
        const res = await fetch(
          `https://api.github.com/users/${opts.username}/repos?sort=updated&per_page=100&page=${page}`,
          { headers }
        );

        if (!res.ok) {
          logger.error(`GitHub API error: ${res.status}`);
          break;
        }

        const batch: GitHubRepo[] = await res.json();
        if (batch.length === 0) break;
        repos.push(...batch);
        if (batch.length < 100) break;
        page++;
      }

      // Filter: only repos with descriptions, not forks
      const filtered = repos.filter(
        (r) => r.description && !r.fork
      );

      logger.info(
        `Loaded ${filtered.length} repos (${repos.length} total, filtered forks/empty)`
      );

      store.clear();
      for (const repo of filtered) {
        store.set({
          id: repo.name,
          data: {
            name: repo.name,
            description: repo.description || "",
            url: repo.html_url,
            stars: repo.stargazers_count,
            language: repo.language,
            updatedAt: new Date(repo.updated_at),
            topics: repo.topics || [],
          },
        });
      }
    },
  };
}

interface GitHubRepo {
  name: string;
  description: string | null;
  html_url: string;
  stargazers_count: number;
  language: string | null;
  updated_at: string;
  fork: boolean;
  topics: string[];
}