import { useCallback, useEffect, useState } from "react";
import { FaGithub, FaStar, FaCodeBranch, FaClock, FaSync } from "react-icons/fa";
import ContributionGraph from "./ContributionGraph";
import { PRIVATE_REPO_COMMITS } from "../data/publications";

const ACCOUNTS = [
  { username: "Tejasdagr8", label: "personal", accent: "iris" },
  { username: "tejasm-tatvaops", label: "work", accent: "mint" },
];

const CACHE_KEY = "github_pulse_cache_v4";
const REFRESH_MS = 1000 * 60 * 15; // re-fetch every 15 min while page is open
const HIGHLIGHT_START = "2026-03-25";

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
  contributions: [],
  contributionTotal: 0,
  phaseTotal: 0,
  fetchedAt: null,
};

function phaseTotal(contributions) {
  return contributions
    .filter((d) => d.date >= HIGHLIGHT_START)
    .reduce((sum, d) => sum + d.count, 0);
}

function readCache() {
  try {
    const raw = sessionStorage.getItem(CACHE_KEY);
    if (!raw) return null;
    return JSON.parse(raw);
  } catch {
    return null;
  }
}

function writeCache(data) {
  sessionStorage.setItem(CACHE_KEY, JSON.stringify({ ts: Date.now(), data }));
}

const CONTRIB_API = "https://github-contributions-api.jogruber.de/v4";

async function fetchAccountClient({ username, label, accent }) {
  const [userRes, reposRes, contribRes] = await Promise.all([
    fetch(`https://api.github.com/users/${username}`),
    fetch(`https://api.github.com/users/${username}/repos?sort=pushed&per_page=8`),
    fetch(`${CONTRIB_API}/${username}?y=last`).catch(() => null),
  ]);

  if (!userRes.ok) throw new Error(`user: ${username}`);

  const user = await userRes.json();
  const repos = reposRes.ok ? await reposRes.json() : [];
  const contribData = contribRes?.ok ? await contribRes.json() : { contributions: [] };
  const latest = repos[0];

  const pushedAgo = latest?.pushed_at
    ? (() => {
        const days = Math.floor((Date.now() - new Date(latest.pushed_at).getTime()) / 86400000);
        if (days === 0) return "today";
        if (days === 1) return "1d ago";
        if (days < 30) return `${days}d ago`;
        const months = Math.floor(days / 30);
        return months === 1 ? "1mo ago" : `${months}mo ago`;
      })()
    : null;

  return {
    username,
    label,
    accent,
    publicRepos: user.public_repos,
    followers: user.followers,
    profileUrl: user.html_url,
    recentRepo: latest?.name || null,
    pushedAt: latest?.pushed_at || null,
    pushedAgo,
    contributions: contribData.contributions || [],
  };
}

async function fetchPulseDirect() {
  const raw = await Promise.all(ACCOUNTS.map(fetchAccountClient));
  const byDate = new Map();
  for (const account of raw) {
    for (const day of account.contributions) {
      byDate.set(day.date, (byDate.get(day.date) || 0) + day.count);
    }
  }
  const contributions = [...byDate.entries()]
    .sort(([a], [b]) => a.localeCompare(b))
    .map(([date, count]) => ({ date, count, level: Math.min(4, count <= 0 ? 0 : count <= 3 ? 1 : count <= 6 ? 2 : count <= 9 ? 3 : 4) }));

  const latest = raw.filter((a) => a.pushedAt).sort((a, b) => new Date(b.pushedAt) - new Date(a.pushedAt))[0];

  return {
    accounts: raw.map(({ contributions: _c, pushedAt: _p, ...rest }) => rest),
    totalRepos: raw.reduce((s, a) => s + a.publicRepos, 0),
    totalFollowers: raw.reduce((s, a) => s + a.followers, 0),
    topLang: "Python",
    recentRepo: latest?.recentRepo || null,
    recentAccount: latest?.username || null,
    pushedAgo: latest?.pushedAgo || null,
    contributions,
    contributionTotal: contributions.reduce((s, d) => s + d.count, 0),
    fetchedAt: new Date().toISOString(),
  };
}

async function fetchPulse() {
  try {
    const res = await fetch("/api/github-pulse");
    if (res.ok) {
      const data = await res.json();
      return { ...data, phaseTotal: phaseTotal(data.contributions || []) };
    }
  } catch {
    /* local dev or API unavailable — fall back to client fetch */
  }

  const data = await fetchPulseDirect();
  return { ...data, phaseTotal: phaseTotal(data.contributions || []) };
}

function StatChip({ icon: Icon, iconClass, children }) {
  return (
    <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full border border-white/[0.08] bg-white/[0.03] text-[11px] sm:text-xs">
      <Icon className={iconClass} size={10} />
      {children}
    </span>
  );
}

function formatFetchedAgo(iso) {
  if (!iso) return null;
  const mins = Math.floor((Date.now() - new Date(iso).getTime()) / 60000);
  if (mins < 1) return "just now";
  if (mins < 60) return `${mins}m ago`;
  const hrs = Math.floor(mins / 60);
  return `${hrs}h ago`;
}

export default function GitHubPulse() {
  const [stats, setStats] = useState(null);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);
  const [fetchedLabel, setFetchedLabel] = useState(null);

  const load = useCallback(async ({ background = false } = {}) => {
    if (background) setRefreshing(true);
    else setLoading(true);

    try {
      const data = await fetchPulse();
      writeCache(data);
      setStats(data);
      setFetchedLabel(formatFetchedAgo(data.fetchedAt));
      window.dispatchEvent(new CustomEvent("github-pulse-loaded", { detail: { contributionTotal: data.contributionTotal } }));
    } catch {
      if (!background) setStats((prev) => prev ?? FALLBACK);
    } finally {
      setLoading(false);
      setRefreshing(false);
    }
  }, []);

  useEffect(() => {
    const cached = readCache();
    if (cached?.data) {
      setStats({ ...cached.data, phaseTotal: phaseTotal(cached.data.contributions || []) });
      setFetchedLabel(formatFetchedAgo(cached.data.fetchedAt));
      setLoading(false);
      load({ background: true });
    } else {
      load();
    }

    const interval = setInterval(() => load({ background: true }), REFRESH_MS);

    const onVisible = () => {
      if (document.visibilityState === "visible") load({ background: true });
    };
    document.addEventListener("visibilitychange", onVisible);

    return () => {
      clearInterval(interval);
      document.removeEventListener("visibilitychange", onVisible);
    };
  }, [load]);

  useEffect(() => {
    if (!stats?.fetchedAt) return;
    const tick = setInterval(() => setFetchedLabel(formatFetchedAgo(stats.fetchedAt)), 60000);
    return () => clearInterval(tick);
  }, [stats?.fetchedAt]);

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
              {(loading || refreshing) && (
                <span className="text-fog/50 normal-case tracking-normal text-[10px] inline-flex items-center gap-1">
                  <FaSync size={9} className={refreshing ? "animate-spin" : ""} />
                  {loading ? "syncing…" : "refreshing…"}
                </span>
              )}
              {fetchedLabel && !loading && (
                <span className="text-fog/40 normal-case tracking-normal text-[10px]">· {fetchedLabel}</span>
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
            {!loading && display.contributionTotal > 0 && (
              <StatChip icon={FaGithub} iconClass="text-[#39d353]">
                <span className="text-paper tabular-nums">{display.contributionTotal.toLocaleString()}</span>
                <span className="text-fog/70">contrib</span>
              </StatChip>
            )}
          </div>

          <ContributionGraph
            contributions={display.contributions}
            total={display.contributionTotal}
            phaseTotal={display.phaseTotal}
            loading={loading && !display.contributions.length}
          />

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

          <p className="font-mono text-[10px] text-fog/50 text-center sm:text-left">
            + <span className="text-ember tabular-nums">{PRIVATE_REPO_COMMITS}+</span> commits on private work repos (@tejasm-tatvaops)
          </p>
        </div>
      </div>
    </section>
  );
}
