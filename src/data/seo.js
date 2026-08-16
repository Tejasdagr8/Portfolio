/** Canonical site URL — keep in sync with Google Search Console property */
export const SITE_URL = "https://tejas-melkote.vercel.app";

export const SITE_NAME = "Tejas Melkote";

export const DEFAULT_TITLE = "Tejas Melkote | AI/ML Engineer & Full-Stack Developer Portfolio";

export const DEFAULT_DESCRIPTION =
  "Tejas Melkote — AI/ML engineer and full-stack developer in Bengaluru, India. Final-year B.Tech CS (AI) at MIT Manipal. 15+ production PRs at SuperAGI, TatvaOps Vantage, LLM agents, RAG, and COLM 2026 research.";

export const PERSON = {
  givenName: "Tejas",
  familyName: "Melkote",
  jobTitle: "AI/ML Engineer & Full-Stack Developer",
  email: "coooltejasdagr@gmail.com",
  image: `${SITE_URL}/profile.jpeg`,
  sameAs: [
    "https://github.com/Tejasdagr8",
    "https://www.linkedin.com/in/tejas-melkote-390545309/",
    "https://arxiv.org/abs/2602.21947",
  ],
  knowsAbout: [
    "Artificial Intelligence",
    "Machine Learning",
    "Large Language Models",
    "Retrieval-Augmented Generation",
    "Full Stack Development",
    "Python",
    "Go",
    "React",
  ],
};

/** Public routes included in sitemap.xml */
export const SITEMAP_ROUTES = [
  { path: "/", priority: "1.0", changefreq: "weekly" },
  { path: "/hire", priority: "0.9", changefreq: "monthly" },
  { path: "/compare", priority: "0.8", changefreq: "monthly" },
];

export const PAGE_SEO = {
  home: {
    title: DEFAULT_TITLE,
    description: DEFAULT_DESCRIPTION,
    path: "/",
  },
  hire: {
    title: "Hire Tejas Melkote | AI/ML & Full-Stack Engineer · Bengaluru",
    description:
      "Hire Tejas Melkote — AI/ML engineer with 15+ SuperAGI production PRs, TatvaOps shipping experience, COLM 2026 research, and full-stack LLM product work. Open to opportunities in Bengaluru, India.",
    path: "/hire",
  },
  compare: {
    title: "Tejas Melkote vs Typical New Grad | Portfolio Compare",
    description:
      "Compare Tejas Melkote's production PRs, live products, and COLM 2026 research against a typical new-grad portfolio — AI/ML and software engineering proof points.",
    path: "/compare",
  },
};

export function absoluteUrl(path = "/") {
  if (path.startsWith("http")) return path;
  return `${SITE_URL}${path.startsWith("/") ? path : `/${path}`}`;
}

export function buildPersonJsonLd() {
  return {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "WebSite",
        "@id": `${SITE_URL}/#website`,
        url: `${SITE_URL}/`,
        name: SITE_NAME,
        description: DEFAULT_DESCRIPTION,
        inLanguage: "en-IN",
        publisher: { "@id": `${SITE_URL}/#person` },
      },
      {
        "@type": "ProfilePage",
        "@id": `${SITE_URL}/#profilepage`,
        url: `${SITE_URL}/`,
        name: DEFAULT_TITLE,
        isPartOf: { "@id": `${SITE_URL}/#website` },
        about: { "@id": `${SITE_URL}/#person` },
        inLanguage: "en-IN",
      },
      {
        "@type": "Person",
        "@id": `${SITE_URL}/#person`,
        name: SITE_NAME,
        givenName: PERSON.givenName,
        familyName: PERSON.familyName,
        url: `${SITE_URL}/`,
        image: PERSON.image,
        email: `mailto:${PERSON.email}`,
        jobTitle: PERSON.jobTitle,
        knowsAbout: PERSON.knowsAbout,
        sameAs: PERSON.sameAs,
        worksFor: {
          "@type": "Organization",
          name: "TatvaOps",
          url: "https://vantage.withtatva.ai/",
        },
        alumniOf: {
          "@type": "CollegeOrUniversity",
          name: "Manipal Institute of Technology",
        },
        address: {
          "@type": "PostalAddress",
          addressLocality: "Bengaluru",
          addressRegion: "Karnataka",
          addressCountry: "IN",
        },
      },
    ],
  };
}
