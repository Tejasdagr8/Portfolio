import { kv } from "@vercel/kv";
import { appendEvent } from "./_lib/store.js";

export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  try {
    const body = typeof req.body === "string" ? JSON.parse(req.body) : req.body;
    const { event, label, sessionId, visitorId, ref, path, referrer, device, ts } = body || {};

    if (!event || !sessionId) {
      return res.status(400).json({ error: "Invalid payload" });
    }

    await appendEvent(kv, {
      event,
      label: label || null,
      sessionId,
      visitorId: visitorId || null,
      ref: ref || null,
      path: path || "/",
      referrer: referrer || "direct",
      device: device || "desktop",
      ts: ts || Date.now(),
    });

    return res.status(200).json({ ok: true });
  } catch (error) {
    const message = error?.message || "Track failed";
    const missingKv = message.toLowerCase().includes("kv") || message.toLowerCase().includes("redis");
    return res.status(missingKv ? 503 : 500).json({
      error: missingKv
        ? "Analytics storage not configured. Add Vercel KV or Upstash Redis in your Vercel project."
        : "Track failed",
    });
  }
}
