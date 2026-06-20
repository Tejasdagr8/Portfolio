const SESSION_KEY = "portfolio_session_id";
const VISITOR_KEY = "portfolio_visitor_id";
const REF_KEY = "portfolio_campaign_ref";

function getOrCreate(storage, key) {
  let id = storage.getItem(key);
  if (!id) {
    id = crypto.randomUUID();
    storage.setItem(key, id);
  }
  return id;
}

export function getSessionId() {
  return getOrCreate(sessionStorage, SESSION_KEY);
}

export function getVisitorId() {
  return getOrCreate(localStorage, VISITOR_KEY);
}

/** Capture ?ref= from URL once per session (e.g. ?ref=amazon_recruiter) */
export function getCampaignRef() {
  const fromUrl = new URLSearchParams(window.location.search).get("ref");
  if (fromUrl) {
    const clean = fromUrl.trim().slice(0, 64).replace(/[^a-zA-Z0-9_-]/g, "_");
    if (clean) {
      sessionStorage.setItem(REF_KEY, clean);
      return clean;
    }
  }
  return sessionStorage.getItem(REF_KEY) || null;
}

export function track(event, data = {}) {
  if (import.meta.env.DEV) return;

  const payload = {
    event,
    label: data.label || null,
    sessionId: getSessionId(),
    visitorId: getVisitorId(),
    ref: getCampaignRef(),
    path: window.location.pathname,
    referrer: document.referrer || "direct",
    device: window.innerWidth < 768 ? "mobile" : "desktop",
    ts: Date.now(),
  };

  fetch("/api/track", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(payload),
    keepalive: true,
  }).catch(() => {});
}
