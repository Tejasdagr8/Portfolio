const CAMPAIGNS = [
  {
    match: /amazon|amzn/i,
    eyebrow: "built for teams that ship at scale",
    blurb: "Full-stack SDE intern at SuperAGI — production Go, Rails, Vue, and CI/CD. I care about reliability, latency, and features that survive real traffic.",
  },
  {
    match: /google|goog/i,
    eyebrow: "systems-minded, product-obsessed",
    blurb: "From training loops in PyTorch to APIs in FastAPI — I build ML systems end-to-end and obsess over the details that make them production-ready.",
  },
  {
    match: /microsoft|msft/i,
    eyebrow: "enterprise-ready, user-first",
    blurb: "Experience shipping in full-stack codebases with Redis, Kafka, and rigorous CI/CD. I translate model capabilities into products people actually use.",
  },
  {
    match: /meta|facebook|fb/i,
    eyebrow: "move fast, measure twice",
    blurb: "LLM agents, RAG pipelines, and full-stack features — I iterate quickly but validate before merge. 15+ PRs shipped at SuperAGI alone.",
  },
  {
    match: /startup|founder|yc/i,
    eyebrow: "zero-to-one engineer",
    blurb: "I wear every hat — frontend, backend, ML, infra. TatvaOps platform, agentic trip planner, medical AI tools. I ship, not slide.",
  },
  {
    match: /recruiter|hr|talent|hiring/i,
    eyebrow: "thanks for stopping by",
    blurb: "Final-year B.Tech CS (AI), CGPA 8.46, SDE Intern @ SuperAGI. Open to full-time roles in AI/ML and full-stack engineering. Resume one click away.",
  },
  {
    match: /superagi|super_agi/i,
    eyebrow: "currently converging at SuperAGI",
    blurb: "SDE Intern — Go, Ruby on Rails, Vue.js, Jenkins, ArgoCD, Sidekiq, Redis, Kafka. Marketing campaign features in production.",
  },
  {
    match: /mit|manipal/i,
    eyebrow: "MIT Manipal · AI-C",
    blurb: "Class rep, E-Cell PR head, fest ops — I lead as much as I code. B.Tech CS (AI), graduating 8.46.",
  },
];

function prettifyRef(ref) {
  return ref
    .replace(/_/g, " ")
    .replace(/-/g, " ")
    .replace(/\b\w/g, (c) => c.toUpperCase());
}

export function getCampaignContent(ref) {
  if (!ref) return null;

  for (const campaign of CAMPAIGNS) {
    if (campaign.match.test(ref)) {
      return {
        ref,
        eyebrow: campaign.eyebrow,
        blurb: campaign.blurb,
        personalized: true,
      };
    }
  }

  return {
    ref,
    eyebrow: `welcome, ${prettifyRef(ref)}`,
    blurb: "AI/ML engineer & full-stack developer. Final-year B.Tech CS (AI) at MIT Manipal — shipping production features at SuperAGI and building LLM agents, RAG pipelines, and the products around them.",
    personalized: true,
  };
}
