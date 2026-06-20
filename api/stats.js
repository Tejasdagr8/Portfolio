import { kv } from "@vercel/kv";
import { aggregate, checkPassword, readEvents } from "./_lib/store.js";

export default async function handler(req, res) {
  if (req.method !== "GET") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  if (!checkPassword(req)) {
    return res.status(401).json({ error: "Unauthorized" });
  }

  try {
    const events = await readEvents(kv);
    const stats = aggregate(events);
    return res.status(200).json(stats);
  } catch (error) {
    const message = error?.message || "Stats failed";
    const missingKv = message.toLowerCase().includes("kv") || message.toLowerCase().includes("redis");
    return res.status(missingKv ? 503 : 500).json({
      error: missingKv
        ? "Analytics storage not configured. Link Vercel KV or Upstash Redis to this project in the Vercel dashboard."
        : "Stats failed",
    });
  }
}
