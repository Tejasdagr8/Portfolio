export const OG_DEFAULT = {
  title: "Tejas Melkote | AI/ML Engineer & Full-Stack Developer",
  description:
    "Final-year B.Tech CS (AI) student and SDE Intern at SuperAGI. AI/ML engineer and full-stack developer building LLM apps, agents, and production features. Based in Bengaluru, India.",
};

export const OG_BY_REF = [
  {
    match: /google|goog/i,
    title: "Tejas Melkote — ML systems, production-ready",
    description:
      "Systems-minded AI/ML engineer. PyTorch to FastAPI — end-to-end ML products. SDE Intern @ SuperAGI.",
  },
  {
    match: /amazon|amzn/i,
    title: "Tejas Melkote — ships at scale",
    description:
      "Full-stack SDE intern — Go, Rails, Vue, CI/CD. 15+ PRs in production. Open to SDE / AI roles.",
  },
  {
    match: /microsoft|msft/i,
    title: "Tejas Melkote — enterprise-ready engineer",
    description: "Redis, Kafka, rigorous CI/CD. ML + full-stack. Final-year CS (AI) @ MIT Manipal.",
  },
  {
    match: /meta|facebook|fb/i,
    title: "Tejas Melkote — LLM agents & fast iteration",
    description: "RAG pipelines, LLM agents, 15+ PRs @ SuperAGI. Move fast, measure twice.",
  },
  {
    match: /recruiter|hr|talent|hiring/i,
    title: "Tejas Melkote — hire page ready",
    description:
      "CGPA 8.38 · SuperAGI intern · COLM 2026 poster · live products. Resume + /hire in one click.",
  },
  {
    match: /startup|founder|yc/i,
    title: "Tejas Melkote — zero-to-one engineer",
    description: "TatvaOps Vantage, agentic apps, medical AI. I ship entire products, not slides.",
  },
];

export function getOgMeta(ref) {
  if (!ref) return OG_DEFAULT;
  for (const row of OG_BY_REF) {
    if (row.match.test(ref)) return { title: row.title, description: row.description };
  }
  const pretty = ref.replace(/_/g, " ").replace(/-/g, " ");
  return {
    title: `Tejas Melkote — note for ${pretty}`,
    description: OG_DEFAULT.description,
  };
}

export function patchHtmlOgTags(html, ref) {
  const meta = getOgMeta(ref);
  const esc = (s) =>
    s.replace(/&/g, "&amp;").replace(/"/g, "&quot;").replace(/</g, "&lt;").replace(/>/g, "&gt;");

  return html
    .replace(/<title>[^<]*<\/title>/, `<title>${esc(meta.title)}</title>`)
    .replace(
      /<meta name="description" content="[^"]*"\s*\/?>/,
      `<meta name="description" content="${esc(meta.description)}" />`
    )
    .replace(
      /<meta property="og:title" content="[^"]*"\s*\/?>/,
      `<meta property="og:title" content="${esc(meta.title)}" />`
    )
    .replace(
      /<meta property="og:description" content="[^"]*"\s*\/?>/,
      `<meta property="og:description" content="${esc(meta.description)}" />`
    )
    .replace(
      /<meta name="twitter:title" content="[^"]*"\s*\/?>/,
      `<meta name="twitter:title" content="${esc(meta.title)}" />`
    )
    .replace(
      /<meta name="twitter:description" content="[^"]*"\s*\/?>/,
      `<meta name="twitter:description" content="${esc(meta.description)}" />`
    );
}
