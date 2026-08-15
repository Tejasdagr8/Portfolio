import { buildGitHubPulse } from "./_lib/githubPulse.js";

export default async function handler(_req, res) {
  try {
    const data = await buildGitHubPulse();
    res.setHeader("Cache-Control", "s-maxage=900, stale-while-revalidate=1800");
    return res.status(200).json(data);
  } catch (error) {
    return res.status(502).json({
      error: "GitHub pulse fetch failed",
      detail: error?.message || "unknown",
    });
  }
}
