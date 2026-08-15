import { useEffect, useState } from "react";
import { FaGithub, FaStar, FaCodeBranch, FaClock } from "react-icons/fa";

const ACCOUNTS = [
  { username: "Tejasdagr8", label: "personal", accent: "iris" },
  { username: "tejasm-tatvaops", label: "work", accent: "mint" },
];

const CACHE_KEY = "github_pulse_cache_v2";
const CACHE_TTL = 1000 * 60 * 30;

const FALLBACK = {
  accounts: ACCOUNTS.map(({ username, label, accent }) => ({
    username,
    label,
    accent,
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

async function fetchAccount(username, label, accent) {
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
    accent,
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

function StatChip({ icon: Icon, iconClass, children }) {
  return (
    <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full border border-white/[0.08] bg-white/[0.03] text-[11px] sm:text-xs">
      <Icon className={iconClass} size={10} />
      {children}
    </span>
  );
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
          ACCOUNTS.map(({ username, label, accent }) => fetchAccount(username, label, accent))
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
    <section className="border-y border-white/[0.08] bg-gradient-to-b from-[#0B0E16]/40 to-[#141929]/30">
      <div className="w-full max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-5 sm:py-6">
        <div className="card-glass px-4 sm:px-5 py-4 sm:py-5 space-y-4">
          <div className="flex flex-wrap items-center justify-between gap-3">
            <div className="flex items-center gap-2.5 font-mono text-[10px] sm:text-xs tracking-[0.14em] uppercase text-fog">
              <FaGithub size={13} className="text-paper/80" />
              <span>github pulse</span>
              {!loading && (
                <span className="inline-flex items-center gap-1.5 normal-case tracking-normal text-[10px] text-mint/80">
                  <span className="status-pulse w-1.5 h-1.5 rounded-full bg-mint inline-block" />
                  live
                </span>
              )}
              {loading && (
                <span className="text-fog/50 normal-case tracking-normal text-[10px]">syncing…</span>
              )}
            </div>

            <div className="flex flex-wrap items-center gap-2">
              {display.accounts.map((account) => (
                <a
                  key={account.username}
                  href={account.profileUrl}
                  target="_blank"
                  rel="noreferrer"
                  data-track={`github_pulse:${account.username}`}
                  className={`font-mono text-[10px] sm:text-[11px] px-2.5 py-1 rounded-full border transition-colors ${
                    account.accent === "mint"
                      ? "border-mint/25 text-fog hover:text-mint hover:border-mint/45 bg-mint/[0.04]"
                      : "border-iris/25 text-fog hover:text-iris hover:border-iris/45 bg-iris/[0.04]"
                  }`}
                >
                  @{account.username}
                  <span className="text-fog/45 ml-1">· {account.label}</span>
                </a>
              ))}
            </div>
          </div>

          <div className="flex flex-wrap items-center justify-center sm:justify-start gap-2 sm:gap-2.5 font-mono text-fog">
            <StatChip icon={FaCodeBranch} iconClass="text-iris">
              <span className="text-paper tabular-nums">{display.totalRepos}</span>
              <span className="text-fog/70">repos</span>
            </StatChip>
            <StatChip icon={FaStar} iconClass="text-ember">
              <span className="text-paper tabular-nums">{display.totalFollowers}</span>
              <span className="text-fog/70">followers</span>
            </StatChip>
            <StatChip icon={FaGithub} iconClass="text-mint">
              <span className="text-fog/70">top</span>
              <span className="text-mint">{display.topLang}</span>
            </StatChip>
          </div>

          <div className="grid sm:grid-cols-2 gap-2.5">
            {display.accounts.map((account) => (
              <a
                key={`card-${account.username}`}
                href={account.profileUrl}
                target="_blank"
                rel="noreferrer"
                data-track={`github_pulse_card:${account.username}`}
                className="group flex items-center justify-between gap-3 rounded-xl border border-white/[0.08] bg-ink-0/40 px-3.5 py-2.5 hover:border-white/[0.16] transition-colors"
              >
                <div className="min-w-0">
                  <p className="font-mono text-[11px] text-paper truncate">
                    @{account.username}
                    <span className="text-fog/50 ml-1.5">{account.label}</span>
                  </p>
                  <p className="font-mono text-[10px] text-fog/70 mt-0.5">
                    <span className="text-paper tabular-nums">{account.publicRepos}</span> public repos
                    {account.recentRepo && (
                      <>
                        {" "}
                        · last <span className="text-fog group-hover:text-mint transition-colors">{account.recentRepo}</span>
                      </>
                    )}
                  </p>
                </div>
                <span className="text-fog/40 group-hover:text-mint transition-colors shrink-0">↗</span>
              </a>
            ))}
          </div>

          {display.recentRepo && (
            <p className="font-mono text-[10px] sm:text-[11px] text-fog/60 text-center sm:text-left pt-0.5 border-t border-white/[0.06]">
              <FaClock className="inline mr-1.5 -mt-0.5" size={9} />
              latest push ·{" "}
              <span className="text-paper">{display.recentRepo}</span>
              {display.recentAccount && (
                <span className="text-fog/45"> @{display.recentAccount}</span>
              )}
              {display.pushedAgo && <span className="text-fog/45"> · {display.pushedAgo}</span>}
            </p>
          )}
        </div>
      </div>
    </section>
  );
}
