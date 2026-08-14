import { useEffect, useState } from "react";
import { FaGithub, FaStar, FaCodeBranch, FaClock } from "react-icons/fa";

const ACCOUNTS = [
  { username: "Tejasdagr8", label: "personal" },
  { username: "tejasm-tatvaops", label: "work" },
];

const CACHE_KEY = "github_pulse_cache_v2";
const CACHE_TTL = 1000 * 60 * 30;

const FALLBACK = {
  accounts: ACCOUNTS.map(({ username, label }) => ({
    username,
    label,
    publicRepos: "—",
    followers: "—",
    profileUrl: `https://github.com/${username}`,
    recentRepo: null,
    pushedAgo: null,
  })),
  totalRepos: "—",
  totalFollowers: "—",
  topLang: "Python",
  recentRepo: null,
  recentAccount: null,
  pushedAgo: null,
};

function formatPushedAgo(iso) {
  if (!iso) return null;
  const diff = Date.now() - new Date(iso).getTime();
  const days = Math.floor(diff / 86400000);
  if (days === 0) return "today";
  if (days === 1) return "1d ago";
  if (days < 30) return `${days}d ago`;
  const months = Math.floor(days / 30);
  return months === 1 ? "1mo ago" : `${months}mo ago`;
}

function topLanguage(repos) {
  const langs = repos.flatMap((r) => r.language).filter(Boolean);
  if (!langs.length) return "Python";
  const counts = langs.reduce((acc, l) => {
    acc[l] = (acc[l] || 0) + 1;
    return acc;
  }, {});
  return Object.entries(counts).sort((a, b) => b[1] - a[1])[0][0];
}

async function fetchAccount(username, label) {
  const [userRes, reposRes] = await Promise.all([
    fetch(`https://api.github.com/users/${username}`),
    fetch(`https://api.github.com/users/${username}/repos?sort=pushed&per_page=8`),
  ]);

  if (!userRes.ok) throw new Error(`user fetch failed: ${username}`);

  const user = await userRes.json();
  const repos = reposRes.ok ? await reposRes.json() : [];
  const latest = repos[0];

  return {
    username,
    label,
    publicRepos: user.public_repos,
    followers: user.followers,
    profileUrl: user.html_url,
    recentRepo: latest?.name || null,
    pushedAt: latest?.pushed_at || null,
    pushedAgo: formatPushedAgo(latest?.pushed_at),
    repos,
  };
}

function mergeAccounts(accounts) {
  const allRepos = accounts.flatMap((a) => a.repos || []);
  const latest = accounts
    .filter((a) => a.pushedAt)
    .sort((a, b) => new Date(b.pushedAt) - new Date(a.pushedAt))[0];

  return {
    accounts: accounts.map(({ repos: _r, pushedAt: _p, ...rest }) => rest),
    totalRepos: accounts.reduce((sum, a) => sum + (a.publicRepos || 0), 0),
    totalFollowers: accounts.reduce((sum, a) => sum + (a.followers || 0), 0),
    topLang: topLanguage(allRepos),
    recentRepo: latest?.recentRepo || null,
    recentAccount: latest?.username || null,
    pushedAgo: latest ? formatPushedAgo(latest.pushedAt) : null,
  };
}

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

        const accounts = await Promise.all(
          ACCOUNTS.map(({ username, label }) => fetchAccount(username, label))
        );
        const data = mergeAccounts(accounts);

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
      <div className="w-full max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-4 space-y-3">
        <div className="flex flex-wrap items-center justify-center sm:justify-between gap-3">
          <div className="flex items-center gap-2 font-mono text-[10px] sm:text-xs tracking-[0.14em] uppercase text-fog">
            <FaGithub size={14} className="text-fog" />
            <span>github pulse</span>
            {loading && <span className="text-fog/50 normal-case tracking-normal">syncing…</span>}
          </div>

          <div className="flex flex-wrap items-center justify-center gap-2">
            {display.accounts.map((account) => (
              <a
                key={account.username}
                href={account.profileUrl}
                target="_blank"
                rel="noreferrer"
                data-track={`github_pulse:${account.username}`}
                className="font-mono text-[10px] sm:text-[11px] px-2.5 py-1 rounded-full border border-white/[0.12] text-fog hover:text-mint hover:border-mint/35 transition-colors"
              >
                @{account.username}
                <span className="text-fog/50 ml-1">· {account.label}</span>
              </a>
            ))}
          </div>
        </div>

        <div className="flex flex-wrap items-center justify-center sm:justify-between gap-4 sm:gap-7 font-mono text-[11px] sm:text-xs text-fog">
          <div className="flex flex-wrap items-center justify-center gap-4 sm:gap-7">
            <span className="flex items-center gap-1.5">
              <FaCodeBranch className="text-iris" size={11} />
              <span className="text-paper tabular-nums">{display.totalRepos}</span> public repos
            </span>
            <span className="flex items-center gap-1.5">
              <FaStar className="text-ember" size={11} />
              <span className="text-paper tabular-nums">{display.totalFollowers}</span> followers
            </span>
            <span>
              top lang <span className="text-mint">{display.topLang}</span>
            </span>
          </div>

          {display.recentRepo && (
            <span className="text-fog/70 text-center sm:text-right">
              last push ·{" "}
              <span className="text-paper">{display.recentRepo}</span>
              {display.recentAccount && (
                <span className="text-fog/50"> @{display.recentAccount}</span>
              )}
              {display.pushedAgo && (
                <span className="text-fog/50 ml-1 inline-flex items-center gap-1">
                  <FaClock size={9} /> {display.pushedAgo}
                </span>
              )}
            </span>
          )}
        </div>

        <div className="hidden sm:flex flex-wrap items-center justify-center sm:justify-start gap-4 font-mono text-[10px] text-fog/70">
          {display.accounts.map((account) => (
            <span key={account.username}>
              @{account.username}:{" "}
              <span className="text-paper tabular-nums">{account.publicRepos}</span> repos
              {account.recentRepo && (
                <span className="text-fog/50">
                  {" "}
                  · last <span className="text-fog">{account.recentRepo}</span>
                </span>
              )}
            </span>
          ))}
        </div>
      </div>
    </section>
  );
}
