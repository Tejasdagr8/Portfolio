const EVENTS_KEY = "portfolio:events";
const MAX_EVENTS = 5000;

export async function appendEvent(kv, event) {
  await kv.lpush(EVENTS_KEY, JSON.stringify(event));
  await kv.ltrim(EVENTS_KEY, -MAX_EVENTS, -1);
}

export async function readEvents(kv) {
  const rows = await kv.lrange(EVENTS_KEY, 0, -1);
  if (!rows?.length) return [];
  return rows.map((row) => JSON.parse(row)).reverse();
}

function dayKey(ts) {
  return new Date(ts).toISOString().slice(0, 10);
}

function hourLabel(ts) {
  return new Date(ts).getHours();
}

function shortReferrer(referrer) {
  if (!referrer || referrer === "direct") return "Direct / none";
  try {
    const url = new URL(referrer);
    const host = url.hostname.replace(/^www\./, "");
    if (host.includes("linkedin")) return "LinkedIn";
    if (host.includes("google")) return "Google";
    if (host.includes("github")) return "GitHub";
    if (host.includes("twitter") || host.includes("x.com")) return "X / Twitter";
    return host;
  } catch {
    return referrer.slice(0, 48);
  }
}

function shortId(id) {
  if (!id) return "unknown";
  return id.slice(0, 8);
}

export function aggregate(events) {
  const now = Date.now();
  const dayMs = 86400000;
  const todayKey = dayKey(now);

  const sessions = new Set();
  const visitors = new Set();
  const viewsToday = { count: 0, sessions: new Set() };
  const viewsWeek = { count: 0, sessions: new Set() };

  const dailyMap = {};
  const clickMap = {};
  const referrerMap = {};
  const sectionMap = {};
  const deviceMap = { mobile: 0, desktop: 0 };
  const hourMap = Array.from({ length: 24 }, (_, h) => ({ hour: h, count: 0 }));
  const scrollMap = {};
  const projectMap = {};
  const refMap = {};
  const refSessions = {};
  const sessionTimeline = {};

  for (const e of events) {
    if (e.sessionId) sessions.add(e.sessionId);
    if (e.visitorId) visitors.add(e.visitorId);

    const dk = dayKey(e.ts);
    dailyMap[dk] = (dailyMap[dk] || 0) + (e.event === "page_view" ? 1 : 0);

    if (e.event === "page_view") {
      if (dk === todayKey) {
        viewsToday.count += 1;
        viewsToday.sessions.add(e.sessionId);
      }
      if (now - e.ts <= 7 * dayMs) {
        viewsWeek.count += 1;
        viewsWeek.sessions.add(e.sessionId);
      }
      referrerMap[shortReferrer(e.referrer)] = (referrerMap[shortReferrer(e.referrer)] || 0) + 1;

      if (e.ref) {
        refMap[e.ref] = (refMap[e.ref] || 0) + 1;
        if (!refSessions[e.ref]) refSessions[e.ref] = new Set();
        refSessions[e.ref].add(e.sessionId);
      }
    }

    if (e.event === "click" && e.label) {
      clickMap[e.label] = (clickMap[e.label] || 0) + 1;
      if (e.label.startsWith("project:")) {
        const name = e.label.replace("project:", "");
        projectMap[name] = (projectMap[name] || 0) + 1;
      }
    }

    if (e.event === "section_view" && e.label) {
      sectionMap[e.label] = (sectionMap[e.label] || 0) + 1;
    }

    if (e.event === "scroll_depth" && e.label) {
      scrollMap[e.label] = (scrollMap[e.label] || 0) + 1;
    }

    if (e.device) {
      deviceMap[e.device] = (deviceMap[e.device] || 0) + 1;
    }

    hourMap[hourLabel(e.ts)].count += 1;

    if (!sessionTimeline[e.sessionId]) {
      sessionTimeline[e.sessionId] = {
        sessionId: e.sessionId,
        visitorId: e.visitorId,
        device: e.device,
        referrer: shortReferrer(e.referrer),
        ref: e.ref || null,
        firstSeen: e.ts,
        lastSeen: e.ts,
        events: [],
      };
    }

    const session = sessionTimeline[e.sessionId];
    if (e.ref && !session.ref) session.ref = e.ref;
    session.lastSeen = Math.max(session.lastSeen, e.ts);
    session.events.push({
      event: e.event,
      label: e.label,
      ts: e.ts,
    });
  }

  const last14Days = [];
  for (let i = 13; i >= 0; i -= 1) {
    const d = new Date(now - i * dayMs);
    const key = dayKey(d.getTime());
    last14Days.push({
      date: key,
      label: d.toLocaleDateString("en-IN", { month: "short", day: "numeric" }),
      views: dailyMap[key] || 0,
    });
  }

  const recentSessions = Object.values(sessionTimeline)
    .sort((a, b) => b.lastSeen - a.lastSeen)
    .slice(0, 20)
    .map((s) => ({
      ...s,
      sessionId: shortId(s.sessionId),
      visitorId: shortId(s.visitorId),
      ref: s.ref || null,
      durationSec: Math.max(1, Math.round((s.lastSeen - s.firstSeen) / 1000)),
      events: s.events.slice(-8).map((ev) => ({
        ...ev,
        time: new Date(ev.ts).toLocaleTimeString("en-IN", { hour: "2-digit", minute: "2-digit" }),
      })),
    }));

  const avgDurationSec = recentSessions.length
    ? Math.round(recentSessions.reduce((sum, s) => sum + s.durationSec, 0) / recentSessions.length)
    : 0;

  const topClicks = Object.entries(clickMap)
    .sort((a, b) => b[1] - a[1])
    .slice(0, 12)
    .map(([label, count]) => ({ label, count }));

  const topReferrers = Object.entries(referrerMap)
    .sort((a, b) => b[1] - a[1])
    .slice(0, 8)
    .map(([label, count]) => ({ label, count }));

  const sectionFunnel = ["about", "experience", "education", "projects", "skills", "contact"].map((id) => ({
    label: id,
    count: sectionMap[id] || 0,
  }));

  const topProjects = Object.entries(projectMap)
    .sort((a, b) => b[1] - a[1])
    .slice(0, 8)
    .map(([label, count]) => ({ label, count }));

  const topCampaignRefs = Object.entries(refMap)
    .sort((a, b) => b[1] - a[1])
    .slice(0, 12)
    .map(([label, count]) => ({
      label,
      count,
      uniqueSessions: refSessions[label]?.size || 0,
    }));

  const scrollDepth = ["25%", "50%", "75%", "100%"].map((label) => ({
    label,
    count: scrollMap[label] || 0,
  }));

  const peakHour = hourMap.reduce((best, row) => (row.count > best.count ? row : best), hourMap[0]);

  return {
    summary: {
      totalEvents: events.length,
      totalPageViews: events.filter((e) => e.event === "page_view").length,
      uniqueSessions: sessions.size,
      uniqueVisitors: visitors.size,
      viewsToday: viewsToday.count,
      uniqueToday: viewsToday.sessions.size,
      viewsWeek: viewsWeek.count,
      uniqueWeek: viewsWeek.sessions.size,
      avgDurationSec,
      peakHour: peakHour.hour,
      contactClicks: clickMap["contact_cta"] || 0,
      resumeClicks: (clickMap["resume"] || 0) + (clickMap["resume_nav"] || 0),
      githubClicks: clickMap["github"] || 0,
      linkedinClicks: clickMap["linkedin"] || 0,
      formSubmits: clickMap["contact_form_success"] || 0,
      campaignRefs: topCampaignRefs.length,
    },
    last14Days,
    topClicks,
    topReferrers,
    topCampaignRefs,
    sectionFunnel,
    topProjects,
    scrollDepth,
    devices: deviceMap,
    hourlyActivity: hourMap,
    recentSessions,
    lastUpdated: now,
  };
}

export function checkPassword(req) {
  const expected = process.env.VIEWS_PASSWORD || "Tejas500";
  const auth = req.headers.authorization || "";
  const token = auth.startsWith("Bearer ") ? auth.slice(7) : "";
  return token === expected;
}
