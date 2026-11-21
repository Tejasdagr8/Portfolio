const ACCOUNTS = [
  { username: "Tejasdagr8", label: "personal", accent: "iris" },
  { username: "TejasMelkote", label: "work", accent: "mint" },
];

const CONTRIB_API = "https://github-contributions-api.jogruber.de/v4";
const GITHUB_GRAPHQL = "https://api.github.com/graphql";

function githubToken() {
  return process.env.GITHUB_TOKEN || process.env.GH_TOKEN || process.env.GITHUB_PAT || "";
}

function countToLevel(count) {
  if (count <= 0) return 0;
  if (count <= 3) return 1;
  if (count <= 6) return 2;
  if (count <= 9) return 3;
  return 4;
}

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

export function mergeContributions(sources) {
  const byDate = new Map();

  for (const { contributions = [] } of sources) {
    for (const day of contributions) {
      byDate.set(day.date, (byDate.get(day.date) || 0) + day.count);
    }
  }

  const contributions = [...byDate.entries()]
    .sort(([a], [b]) => a.localeCompare(b))
    .map(([date, count]) => ({ date, count, level: countToLevel(count) }));

  const total = contributions.reduce((sum, d) => sum + d.count, 0);

  return { contributions, total };
}

const CALENDAR_QUERY = `
  query($login: String!) {
    user(login: $login) {
      contributionsCollection {
        contributionCalendar {
          totalContributions
          weeks {
            contributionDays {
              date
              contributionCount
            }
          }
        }
      }
    }
  }
`;

async function fetchContributionsGraphql(username, token) {
  const res = await fetch(GITHUB_GRAPHQL, {
    method: "POST",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
      "User-Agent": "tejas-portfolio-pulse",
    },
    body: JSON.stringify({ query: CALENDAR_QUERY, variables: { login: username } }),
  });

  if (!res.ok) throw new Error(`graphql ${username}: ${res.status}`);
  const json = await res.json();
  if (json.errors?.length) throw new Error(json.errors[0].message);

  const calendar = json.data?.user?.contributionsCollection?.contributionCalendar;
  if (!calendar) throw new Error(`no calendar for ${username}`);

  const contributions = calendar.weeks.flatMap((week) =>
    week.contributionDays.map((day) => ({
      date: day.date,
      count: day.contributionCount,
      level: countToLevel(day.contributionCount),
    }))
  );

  return {
    contributions,
    total: calendar.totalContributions,
    source: "github-graphql",
  };
}

async function fetchContributionsPublic(username) {
  const res = await fetch(`${CONTRIB_API}/${username}?y=last`, {
    headers: { Accept: "application/json" },
  });
  if (!res.ok) throw new Error(`contributions: ${username}`);
  const data = await res.json();
  const contributions = (data.contributions || []).map((day) => ({
    date: day.date,
    count: day.count,
    level: countToLevel(day.count),
  }));
  const total = contributions.reduce((sum, d) => sum + d.count, 0);
  return { contributions, total, source: "public-api" };
}

async function fetchContributions(username, token) {
  if (token) {
    try {
      return await fetchContributionsGraphql(username, token);
    } catch {
      /* fall through to public calendar */
    }
  }
  return fetchContributionsPublic(username);
}

function restHeaders(token) {
  const headers = {
    Accept: "application/vnd.github+json",
    "User-Agent": "tejas-portfolio",
  };
  if (token) headers.Authorization = `Bearer ${token}`;
  return headers;
}

async function fetchAccount({ username, label, accent }, token) {
  const headers = restHeaders(token);
  const [userRes, reposRes, contribData] = await Promise.all([
    fetch(`https://api.github.com/users/${username}`, { headers }),
    fetch(`https://api.github.com/users/${username}/repos?sort=pushed&per_page=8`, { headers }),
    fetchContributions(username, token).catch(() => ({
      contributions: [],
      total: 0,
      source: "none",
    })),
  ]);

  if (!userRes.ok) throw new Error(`user: ${username}`);

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
    contributions: contribData.contributions || [],
    contributionTotal: contribData.total || 0,
    contributionSource: contribData.source || "none",
  };
}

export async function buildGitHubPulse() {
  const token = githubToken();
  const rawAccounts = await Promise.all(ACCOUNTS.map((account) => fetchAccount(account, token)));
  const allRepos = rawAccounts.flatMap((a) => a.repos || []);
  const latest = rawAccounts
    .filter((a) => a.pushedAt)
    .sort((a, b) => new Date(b.pushedAt) - new Date(a.pushedAt))[0];

  const { contributions, total } = mergeContributions(rawAccounts);
  const usesGraphql = rawAccounts.some((a) => a.contributionSource === "github-graphql");

  return {
    accounts: rawAccounts.map(
      ({ repos: _r, pushedAt: _p, contributions: _c, ...rest }) => rest
    ),
    totalRepos: rawAccounts.reduce((sum, a) => sum + (a.publicRepos || 0), 0),
    totalFollowers: rawAccounts.reduce((sum, a) => sum + (a.followers || 0), 0),
    topLang: topLanguage(allRepos),
    recentRepo: latest?.recentRepo || null,
    recentAccount: latest?.username || null,
    pushedAgo: latest ? formatPushedAgo(latest.pushedAt) : null,
    contributions,
    contributionTotal: total,
    contributionSource: usesGraphql ? "github-graphql" : "public-api",
    includesPrivate: usesGraphql,
    fetchedAt: new Date().toISOString(),
  };
}
