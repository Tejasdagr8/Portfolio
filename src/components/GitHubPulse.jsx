import { useEffect, useState } from "react";
import { FaGithub, FaStar, FaCodeBranch } from "react-icons/fa";

const USERNAME = "Tejasdagr8";
const CACHE_KEY = "github_pulse_cache";
const CACHE_TTL = 1000 * 60 * 30;

const FALLBACK = {
  publicRepos: "—",
  followers: "—",
  topLang: "Python",
};

export default function GitHubPulse() {
  const [stats, setStats] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let cancelled = false;

    async function load() {
      try {
        const cached = sessionStorage.getItem(CACHE_KEY);
        if (cached) {
          const parsed = JSON.parse(cached);
          if (Date.now() - parsed.ts < CACHE_TTL) {
            if (!cancelled) {
              setStats(parsed.data);
              setLoading(false);
            }
            return;
          }
        }

        const [userRes, reposRes] = await Promise.all([
          fetch(`https://api.github.com/users/${USERNAME}`),
          fetch(`https://api.github.com/users/${USERNAME}/repos?sort=updated&per_page=6`),
        ]);

        if (!userRes.ok) throw new Error("user fetch failed");

        const user = await userRes.json();
        let topLang = FALLBACK.topLang;
        let recentRepo = null;

        if (reposRes.ok) {
          const repos = await reposRes.json();
          recentRepo = repos[0]?.name || null;
          const langs = repos.flatMap((r) => r.language).filter(Boolean);
          if (langs.length) {
            const counts = langs.reduce((acc, l) => {
              acc[l] = (acc[l] || 0) + 1;
              return acc;
            }, {});
            topLang = Object.entries(counts).sort((a, b) => b[1] - a[1])[0][0];
          }
        }

        const data = {
          publicRepos: user.public_repos,
          followers: user.followers,
          topLang,
          recentRepo,
          profileUrl: user.html_url,
        };

        sessionStorage.setItem(CACHE_KEY, JSON.stringify({ ts: Date.now(), data }));
        if (!cancelled) setStats(data);
      } catch {
        if (!cancelled) setStats(FALLBACK);
      } finally {
        if (!cancelled) setLoading(false);
      }
    }

    load();
    return () => {
      cancelled = true;
    };
  }, []);

  const display = stats || FALLBACK;

  return (
    <section className="border-y border-white/[0.08] bg-[#0B0E16]/60">
      <div className="w-full max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
        <a
          href={`https://github.com/${USERNAME}`}
          target="_blank"
          rel="noreferrer"
          data-track="github_pulse"
          className="flex flex-wrap items-center justify-center sm:justify-between gap-4 sm:gap-6 group"
        >
          <div className="flex items-center gap-2 font-mono text-[10px] sm:text-xs tracking-[0.14em] uppercase text-fog group-hover:text-mint transition-colors">
            <FaGithub size={14} />
            <span>github pulse</span>
            {loading && <span className="text-fog/50 normal-case tracking-normal">syncing…</span>}
          </div>

          <div className="flex flex-wrap items-center justify-center gap-5 sm:gap-8 font-mono text-[11px] sm:text-xs text-fog">
            <span className="flex items-center gap-1.5">
              <FaCodeBranch className="text-iris" size={11} />
              <span className="text-paper tabular-nums">{display.publicRepos}</span> repos
            </span>
            <span className="flex items-center gap-1.5">
              <FaStar className="text-ember" size={11} />
              <span className="text-paper tabular-nums">{display.followers}</span> followers
            </span>
            <span>
              top lang <span className="text-mint">{display.topLang}</span>
            </span>
            {display.recentRepo && (
              <span className="hidden md:inline text-fog/70">
                last push · <span className="text-paper">{display.recentRepo}</span>
              </span>
            )}
          </div>
        </a>
      </div>
    </section>
  );
}
