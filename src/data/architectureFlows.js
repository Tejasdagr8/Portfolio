export const architectureFlows = {
  tatvaops: {
    title: "TatvaOps Vantage pipeline",
    nodes: [
      { id: "user", label: "User / SEO traffic", detail: "Homeowners, contractors, and high-intent construction search traffic land on Vantage." },
      { id: "spa", label: "React SPA", detail: "Client-side app with InSights, Radar, Forums, Studio, and Eva AI modules." },
      { id: "cms", label: "CMS API", detail: "SEO-first content engine — blogs, city guides, and structured construction knowledge." },
      { id: "analytics", label: "Analytics", detail: "Traffic attribution, engagement metrics, and high-intent funnel tracking." },
      { id: "seo", label: "SEO index", detail: "Indexed pages optimized for construction, interior, solar, and real-estate queries in India." },
    ],
    edges: ["user", "spa", "cms", "analytics", "seo"],
  },
  superagi: {
    title: "SuperAGI campaign pipeline",
    nodes: [
      { id: "crm", label: "CRM / UI", detail: "Vue.js frontend for marketers configuring Email & WhatsApp campaigns." },
      { id: "api", label: "Rails + Go API", detail: "Campaign validation, test-send endpoints, and production business logic." },
      { id: "sidekiq", label: "Sidekiq + Redis", detail: "Background job queue for async campaign processing and retries." },
      { id: "kafka", label: "Kafka stream", detail: "Event streaming for campaign lifecycle and downstream integrations." },
      { id: "deploy", label: "Jenkins → ArgoCD", detail: "15+ PRs shipped through CI/CD to production." },
    ],
    edges: ["crm", "api", "sidekiq", "kafka", "deploy"],
  },
};
