import { useCallback, useEffect, useState } from "react";

const AUTH_KEY = "portfolio_views_auth";

function StatCard({ label, value, hint }) {
  return (
    <div className="card-glass p-5">
      <p className="font-mono text-[10px] tracking-[0.16em] uppercase text-mint mb-2">{label}</p>
      <p className="font-display font-bold text-3xl text-paper">{value}</p>
      {hint && <p className="text-fog text-xs mt-2">{hint}</p>}
    </div>
  );
}

function BarList({ title, items, maxBars = 8 }) {
  const top = items.slice(0, maxBars);
  const max = Math.max(...top.map((i) => i.count), 1);

  return (
    <div className="card-glass p-5 h-full">
      <h3 className="font-mono text-xs tracking-widest uppercase text-ember mb-4">{title}</h3>
      {top.length === 0 ? (
        <p className="text-fog text-sm">No data yet — share your portfolio link.</p>
      ) : (
        <ul className="space-y-3">
          {top.map(({ label, count }) => (
            <li key={label}>
              <div className="flex justify-between text-xs font-mono mb-1 gap-3">
                <span className="text-paper truncate">{label}</span>
                <span className="text-mint shrink-0">{count}</span>
              </div>
              <div className="h-1.5 rounded-full bg-white/[0.06] overflow-hidden">
                <div
                  className="h-full rounded-full bg-gradient-to-r from-iris to-mint"
                  style={{ width: `${(count / max) * 100}%` }}
                />
              </div>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

function DayChart({ days }) {
  const max = Math.max(...days.map((d) => d.views), 1);

  return (
    <div className="card-glass p-5">
      <h3 className="font-mono text-xs tracking-widest uppercase text-ember mb-4">Views — last 14 days</h3>
      <div className="flex items-end gap-1.5 h-36">
        {days.map((d) => (
          <div key={d.date} className="flex-1 flex flex-col items-center gap-2 min-w-0">
            <div
              className="w-full rounded-t bg-gradient-to-t from-iris/80 to-mint/60"
              style={{ height: `${Math.max(8, (d.views / max) * 100)}%` }}
              title={`${d.label}: ${d.views} views`}
            />
            <span className="text-[9px] font-mono text-fog truncate w-full text-center">{d.label}</span>
          </div>
        ))}
      </div>
    </div>
  );
}

export default function Views() {
  const [password, setPassword] = useState("");
  const [authed, setAuthed] = useState(false);
  const [stats, setStats] = useState(null);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const fetchStats = useCallback(async (token) => {
    setLoading(true);
    setError("");
    try {
      const res = await fetch("/api/stats", {
        headers: { Authorization: `Bearer ${token}` },
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || "Failed to load stats");
      setStats(data);
      setAuthed(true);
      sessionStorage.setItem(AUTH_KEY, token);
    } catch (err) {
      setError(err.message || "Failed to load stats");
      setAuthed(false);
      sessionStorage.removeItem(AUTH_KEY);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    const saved = sessionStorage.getItem(AUTH_KEY);
    if (saved) fetchStats(saved);
  }, [fetchStats]);

  useEffect(() => {
    if (!authed) return undefined;
    const interval = setInterval(() => fetchStats(sessionStorage.getItem(AUTH_KEY)), 30000);
    return () => clearInterval(interval);
  }, [authed, fetchStats]);

  const onLogin = (event) => {
    event.preventDefault();
    fetchStats(password.trim());
  };

  if (!authed) {
    return (
      <div className="min-h-screen bg-ink-0 text-paper font-body flex items-center justify-center px-4">
        <form onSubmit={onLogin} className="card-glass w-full max-w-sm p-6">
          <p className="font-mono text-xs tracking-widest uppercase text-mint mb-2">Private</p>
          <h1 className="font-display font-bold text-2xl mb-2">Portfolio analytics</h1>
          <p className="text-fog text-sm mb-6">Enter your views password to see who&apos;s engaging with your site.</p>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Password"
            className="w-full rounded-lg border border-white/[0.08] bg-ink-0/50 px-3 py-2.5 text-sm text-paper outline-none focus:border-mint/40 mb-4"
          />
          {error && <p className="text-red-400 text-xs mb-3">{error}</p>}
          <button
            type="submit"
            disabled={loading}
            className="w-full py-2.5 rounded-full bg-gradient-to-r from-iris to-mint text-ink-0 text-sm font-medium disabled:opacity-50"
          >
            {loading ? "Loading..." : "Unlock dashboard"}
          </button>
        </form>
      </div>
    );
  }

  const s = stats?.summary || {};

  return (
    <div className="min-h-screen bg-ink-0 text-paper font-body overflow-x-hidden">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 py-8 md:py-12">
        <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-4 mb-8">
          <div>
            <p className="font-mono text-xs tracking-widest uppercase text-mint mb-2">/views</p>
            <h1 className="font-display font-bold text-3xl md:text-4xl">Portfolio intelligence</h1>
            <p className="text-fog text-sm mt-2">
              Updated {stats ? new Date(stats.lastUpdated).toLocaleString("en-IN") : "—"} · refreshes every 30s
            </p>
          </div>
          <a href="/" className="font-mono text-xs text-fog hover:text-mint transition-colors">
            ← Back to portfolio
          </a>
        </div>

        {error && <p className="text-red-400 text-sm mb-4">{error}</p>}

        <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 md:gap-4 mb-6">
          <StatCard label="Total views" value={s.totalPageViews ?? 0} hint="All-time page loads" />
          <StatCard label="Unique visitors" value={s.uniqueVisitors ?? 0} hint="Return visitors counted separately" />
          <StatCard label="Today" value={s.viewsToday ?? 0} hint={`${s.uniqueToday ?? 0} unique today`} />
          <StatCard label="This week" value={s.viewsWeek ?? 0} hint={`${s.uniqueWeek ?? 0} unique this week`} />
        </div>

        <div className="grid md:grid-cols-3 gap-3 md:gap-4 mb-6">
          <StatCard label="Avg time on site" value={`${s.avgDurationSec ?? 0}s`} hint="Per recent session" />
          <StatCard label="Peak hour (IST)" value={`${String(s.peakHour ?? 0).padStart(2, "0")}:00`} hint="Most activity" />
          <StatCard label="Messages sent" value={s.formSubmits ?? 0} hint="Contact form success" />
        </div>

        <div className="grid lg:grid-cols-2 gap-4 mb-6">
          <DayChart days={stats?.last14Days || []} />
          <BarList title="Where traffic comes from" items={stats?.topReferrers || []} />
        </div>

        <div className="card-glass p-5 mb-6">
          <h3 className="font-mono text-xs tracking-widest uppercase text-ember mb-2">Personal link tracking (?ref=)</h3>
          <p className="text-fog text-xs mb-4 leading-relaxed">
            Send unique links to recruiters — e.g.{" "}
            <code className="text-mint">tejas-melkote.vercel.app/?ref=amazon_hr</code> or{" "}
            <code className="text-mint">?ref=priya_linkedin</code>. When they open it, you&apos;ll see the tag here
            (you label it yourself — it&apos;s not their real name unless you use their name in the tag).
          </p>
          {(stats?.topCampaignRefs || []).length === 0 ? (
            <p className="text-fog text-sm">No personal links opened yet. Try adding ?ref= to links you send on LinkedIn or email.</p>
          ) : (
            <ul className="space-y-3">
              {stats.topCampaignRefs.map(({ label, count, uniqueSessions }) => (
                <li key={label}>
                  <div className="flex justify-between text-xs font-mono mb-1 gap-3">
                    <span className="text-paper truncate">?ref={label}</span>
                    <span className="text-mint shrink-0">{count} views · {uniqueSessions} sessions</span>
                  </div>
                  <div className="h-1.5 rounded-full bg-white/[0.06] overflow-hidden">
                    <div
                      className="h-full rounded-full bg-gradient-to-r from-iris to-mint"
                      style={{
                        width: `${(count / Math.max(...stats.topCampaignRefs.map((r) => r.count), 1)) * 100}%`,
                      }}
                    />
                  </div>
                </li>
              ))}
            </ul>
          )}
        </div>

        <div className="grid lg:grid-cols-2 gap-4 mb-6">
          <BarList
            title="Most clicked links"
            items={(stats?.topClicks || []).map(({ label, count }) => ({
              label: label.replace("project:", "Project: "),
              count,
            }))}
          />
          <BarList title="Project interest" items={stats?.topProjects || []} />
        </div>

        <div className="grid lg:grid-cols-2 gap-4 mb-6">
          <BarList title="Sections reached" items={(stats?.sectionFunnel || []).map(({ label, count }) => ({ label, count }))} />
          <BarList title="Scroll depth" items={stats?.scrollDepth || []} />
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-3 mb-6">
          <StatCard label="Resume clicks" value={s.resumeClicks ?? 0} />
          <StatCard label="GitHub clicks" value={s.githubClicks ?? 0} />
          <StatCard label="LinkedIn clicks" value={s.linkedinClicks ?? 0} />
          <StatCard label="Get in touch clicks" value={s.contactClicks ?? 0} />
        </div>

        <div className="card-glass p-5 mb-6">
          <h3 className="font-mono text-xs tracking-widest uppercase text-ember mb-4">Device split</h3>
          <div className="flex gap-6 font-mono text-sm">
            <span className="text-paper">Mobile: <span className="text-mint">{stats?.devices?.mobile ?? 0}</span></span>
            <span className="text-paper">Desktop: <span className="text-mint">{stats?.devices?.desktop ?? 0}</span></span>
          </div>
        </div>

        <div className="card-glass p-5">
          <h3 className="font-mono text-xs tracking-widest uppercase text-ember mb-4">Recent visitor sessions</h3>
          <p className="text-fog text-xs mb-4">
            Anonymous sessions — you see what they clicked and which sections they viewed, not their name.
          </p>
          {(stats?.recentSessions || []).length === 0 ? (
            <p className="text-fog text-sm">No sessions yet. Send your portfolio link to recruiters.</p>
          ) : (
            <div className="space-y-4">
              {stats.recentSessions.map((session) => (
                <div key={session.sessionId + session.lastSeen} className="border border-white/[0.08] rounded-xl p-4">
                  <div className="flex flex-wrap gap-x-4 gap-y-1 font-mono text-[11px] text-fog mb-3">
                    <span>Session {session.sessionId}</span>
                    <span>Visitor {session.visitorId}</span>
                    {session.ref && (
                      <span className="text-mint">ref={session.ref}</span>
                    )}
                    <span>{session.device}</span>
                    <span>{session.referrer}</span>
                    <span>{session.durationSec}s on site</span>
                  </div>
                  <ul className="space-y-1">
                    {session.events.map((ev, idx) => (
                      <li key={`${ev.ts}-${idx}`} className="text-sm text-fog">
                        <span className="text-mint font-mono text-xs mr-2">{ev.time}</span>
                        {ev.event === "click" && `Clicked ${ev.label}`}
                        {ev.event === "section_view" && `Viewed ${ev.label} section`}
                        {ev.event === "page_view" && "Opened portfolio"}
                        {ev.event === "scroll_depth" && `Scrolled to ${ev.label}`}
                        {ev.event === "form_submit" && "Sent contact message"}
                        {!["click", "section_view", "page_view", "scroll_depth", "form_submit"].includes(ev.event) && `${ev.event}${ev.label ? `: ${ev.label}` : ""}`}
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
