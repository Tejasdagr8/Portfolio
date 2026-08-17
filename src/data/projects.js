export const PROJECT_FILTERS = [
  { id: "all", label: "All" },
  { id: "production", label: "Production" },
  { id: "agents", label: "Agents" },
  { id: "ml", label: "ML" },
  { id: "fullstack", label: "Full stack" },
];

export const projects = [
  {
    title: "TatvaOps — Production AI & Construction Platform",
    description:
      "Built and shipped Vantage — a live CMS + community platform with SEO indexing, forums, analytics dashboards, and AI-assisted content for real construction-industry users.",
    tags: ["React", "CMS", "SEO", "AI"],
    categories: ["production", "fullstack"],
    featured: true,
    metric: "Live production · CMS + forums + analytics",
    link: "https://vantage.withtatva.ai/",
    livePreview: {
      screenshot: "/previews/vantage.png",
      note: "Live site blocks iframe embeds — screenshot preview. Click to open vantage.withtatva.ai.",
    },
    spotlight: {
      year: "2025–26",
      role: "Full-stack · AI content platform · TatvaOps",
      highlights: [
        "SEO-first CMS with blogs, forums, and community features",
        "Analytics layer for high-intent construction traffic",
        "Production deployment serving real users in construction vertical",
      ],
      stack: ["React", "TypeScript", "CMS", "Analytics", "Vercel", "AI content"],
      architecture: ["User", "React SPA", "CMS API", "Analytics", "SEO index"],
      flowKey: "tatvaops",
      caseStudy: {
        problem:
          "Construction buyers and contractors need a trustworthy, searchable knowledge hub — not static marketing pages. TatvaOps needed Vantage to capture high-intent SEO traffic and host community + AI content at production scale.",
        contribution:
          "Owned full-stack features on Vantage: CMS-driven SEO content, forums, vendor profiles, analytics dashboards, and Eva AI modules — shipped iteratively to production on React + Vercel.",
        challenges: [
          "Balancing SEO structure with fast editorial workflows in the CMS",
          "Shipping features to real users while keeping deploy cadence tight",
          "Integrating AI-assisted content without breaking page performance",
        ],
        result:
          "Live platform at vantage.withtatva.ai serving the construction vertical — blogs, forums, Radar/InSights modules, and production analytics in one stack.",
      },
    },
  },
  {
    title: "TasteIQ — Construction Intelligence Network",
    description:
      "Swipe-first taste platform for construction — learns Design DNA from real spaces (not forms), powers a living Taste Graph, and matches homeowners to vendors whose craft already fits their aesthetic.",
    tags: ["React", "AI", "Recommendations", "Vercel"],
    categories: ["production", "fullstack", "ml"],
    featured: true,
    metric: "Live · 3 surfaces · swipe-to-DNA engine",
    link: "https://tasteiq.vercel.app/",
    livePreview: {
      screenshot: "/previews/tasteiq.png",
      note: "Live site blocks iframe embeds — screenshot preview. Click to open tasteiq.vercel.app.",
    },
    spotlight: {
      year: "2025–26",
      role: "Full-stack · AI recommendation · construction vertical",
      highlights: [
        "Three product surfaces — Discover (consumer), Vendor OS, and Studio ops — on one Taste Graph",
        "Design DNA engine: taste vectors, luxury index, budget prediction, and real-time profile learning",
        "Swipe-based preference capture replaces long questionnaires — show, don't ask",
        "Master hashtag catalog + AI tagging so vendor portfolios match homeowner intent",
      ],
      stack: ["React", "TypeScript", "Vercel", "Recommendation engine", "AI tagging", "Taste Graph"],
      architecture: ["Swipe deck", "Taste Graph", "Design DNA", "Vendor OS", "Studio ops"],
      flowKey: "tasteiq",
      caseStudy: {
        problem:
          "Construction and interior decisions stall on vague briefs — homeowners say \"modern\" without actionable taste signals, and vendors can't tell who already responds to their material language before the first call.",
        contribution:
          "Built TasteIQ end-to-end: consumer swipe deck, Taste Graph that compounds every gesture, Design DNA profiles vendors can act on, Vendor OS for portfolio upload + governed style tags, and Studio for catalog moderation and recommendation experiments.",
        challenges: [
          "Learning multidimensional preference from sparse swipe data without cold-start questionnaires",
          "Keeping taste vectors, budget signals, and luxury index interpretable for vendors — not black-box scores",
          "Unifying three roles (homeowner, vendor, ops) on one intelligence layer without fragmenting the UX",
        ],
        result:
          "Live construction intelligence network at tasteiq.vercel.app — swipe curated spaces, unlock shareable Design DNA, and connect with taste-matched vendors from the first hello.",
      },
    },
  },
  {
    title: "TatvaOps Verified Vendor Profile",
    description:
      "Shipped a searchable vendor profile system with verified ratings and pricing insights — deployed on Vercel with production-grade UX for contractor discovery.",
    tags: ["Web App", "Full Stack", "Portfolio"],
    categories: ["production", "fullstack"],
    metric: "Vercel production · verified vendor listings",
    link: "https://vendor-profilepage.vercel.app/",
    livePreview: {
      embedUrl: "https://vendor-profilepage.vercel.app/",
    },
    spotlight: {
      year: "2025",
      role: "Full-stack web app · TatvaOps",
      highlights: [
        "Verified vendor ratings and searchable contractor listings",
        "Pricing insights for construction procurement decisions",
        "Deployed on Vercel with production-grade UX",
      ],
      stack: ["React", "Vercel", "Full Stack"],
      caseStudy: {
        problem:
          "Procurement teams needed a fast way to compare verified contractors with pricing signals — not unstructured PDFs or phone calls.",
        contribution:
          "Designed and built the vendor profile UI, search/filter flows, and rating surfaces; deployed as a standalone production app on Vercel.",
        challenges: [
          "Presenting dense vendor data without overwhelming mobile users",
          "Keeping list performance snappy as profile fields grew",
        ],
        result:
          "Live vendor profile app with verified ratings, pricing insights, and embeddable production deployment.",
      },
    },
  },
  {
    title: "AI Trip Planner",
    description:
      "Solo-built agentic planner orchestrating 7 external APIs through a LangGraph workflow — FastAPI backend, Dockerized deploy, multi-step itinerary reasoning.",
    tags: ["LangGraph", "FastAPI", "Docker", "Agents"],
    categories: ["agents", "fullstack"],
    metric: "7 API integrations · LangGraph agent",
    spotlight: {
      year: "2025",
      role: "Agentic systems · solo build",
      highlights: [
        "LangGraph workflow orchestrating 7 external APIs",
        "FastAPI backend with Dockerized deployment",
        "Multi-step agent reasoning for itinerary generation",
      ],
      stack: ["LangGraph", "FastAPI", "Groq", "Docker", "Tavily"],
      architecture: ["User", "FastAPI", "LangGraph agent", "7 APIs", "Itinerary"],
      caseStudy: {
        problem:
          "Single-shot LLM prompts fail for trip planning — weather, places, search, and routing need coordinated multi-step tool use with failure recovery.",
        contribution:
          "Architected the LangGraph state machine, wired 7 APIs (Weather, Tavily, Google Places, Groq, etc.), and containerized the FastAPI service.",
        challenges: [
          "Orchestrating heterogeneous APIs with different latency profiles",
          "Keeping agent traces debuggable when a tool call fails mid-itinerary",
        ],
        result:
          "End-to-end agentic pipeline from natural-language request → tool calls → structured itinerary, runnable via Docker.",
      },
    },
  },
  {
    title: "Medical Image Analyzer & PDF Summarizer",
    description:
      "Multimodal app combining medical image analysis, PDF summarization, auth, analytics, and RAG document Q&A — live on Streamlit Cloud.",
    tags: ["Python", "LLM", "RAG", "Streamlit"],
    categories: ["ml", "fullstack"],
    metric: "Live Streamlit · RAG + vision pipeline",
    link: "https://medimage.streamlit.app/",
    livePreview: {
      embedUrl: "https://medimage.streamlit.app/?embed=true",
      note: "Streamlit embed — interact inside the preview or open full app.",
    },
    spotlight: {
      year: "2025",
      role: "Multimodal ML · RAG",
      highlights: [
        "Medical image analysis + PDF summarization in one app",
        "RAG-powered document Q&A with auth and analytics",
        "Live on Streamlit Cloud",
      ],
      stack: ["Python", "Streamlit", "LLM", "RAG"],
      architecture: ["User", "Streamlit", "Auth", "RAG pipeline", "LLM + Vision"],
      caseStudy: {
        problem:
          "Clinicians and researchers need one surface for imaging insights and long PDF reports — not separate tools with no shared context.",
        contribution:
          "Built the multimodal pipeline: vision analysis path, PDF chunking + RAG Q&A, user auth, and analytics dashboard in Streamlit.",
        challenges: [
          "Combining vision and text RAG without ballooning response latency",
          "Handling upload edge cases and keeping sessions isolated per user",
        ],
        result:
          "Deployed multimodal app on Streamlit Cloud with live embed — image analysis, PDF summary, and document Q&A in one flow.",
      },
    },
  },
  {
    title: "Crop Yield Prediction",
    description:
      "Hybrid CNN-RNN-LSTM model for agricultural yield forecasting — end-to-end Colab pipeline across crop types and regions with training/eval metrics.",
    tags: ["TensorFlow", "CNN", "LSTM", "Python"],
    categories: ["ml"],
    metric: "Hybrid CNN-RNN-LSTM · Colab pipeline",
    link: "https://colab.research.google.com/drive/1c5BOmHjO4dQDWb-YuZ5j42uGF-bvkQKS?usp=sharing",
    spotlight: {
      year: "2024",
      role: "Deep learning · research pipeline",
      highlights: [
        "Hybrid CNN-RNN-LSTM architecture for yield forecasting",
        "End-to-end training, evaluation, and Colab notebook",
        "Multi-crop, multi-region agricultural dataset handling",
      ],
      stack: ["TensorFlow", "CNN", "LSTM", "Python"],
      architecture: ["Raw data", "Preprocess", "CNN-RNN-LSTM", "Train", "Forecast"],
    },
  },
  {
    title: "Car Price Prediction",
    description:
      "End-to-end sklearn pipeline on real automotive listings — feature engineering, model selection, and held-out evaluation with regression metrics.",
    tags: ["Scikit-learn", "Python", "ML"],
    categories: ["ml"],
    metric: "sklearn pipeline · feature engineering",
    spotlight: {
      year: "2024",
      role: "Classical ML pipeline",
      highlights: [
        "Feature engineering on real automotive listing data",
        "Model selection and rigorous evaluation metrics",
        "Full sklearn pipeline from raw data to predictions",
      ],
      stack: ["Scikit-learn", "Python", "Pandas"],
    },
  },
  {
    title: "Customer Churn & Segmentation",
    description:
      "Combined SVM/KNN churn prediction with DBSCAN cohort segmentation — surfaced at-risk user groups from real customer feature data.",
    tags: ["KNN", "DBSCAN", "SVM", "Python"],
    categories: ["ml"],
    metric: "SVM + DBSCAN · cohort segmentation",
    spotlight: {
      year: "2024",
      role: "Unsupervised + supervised ML",
      highlights: [
        "Churn prediction with SVM and KNN baselines",
        "DBSCAN clustering to surface at-risk cohorts",
        "Combined segmentation + classification workflow",
      ],
      stack: ["KNN", "DBSCAN", "SVM", "Python"],
    },
  },
  {
    title: "Speech-to-Text System",
    description:
      "Accessibility-focused Whisper pipeline for real-time transcription — NLP preprocessing and streaming-friendly inference in Python.",
    tags: ["Python", "NLP", "OpenAI", "Whisper"],
    categories: ["ml"],
    metric: "Whisper · real-time transcription",
    spotlight: {
      year: "2024",
      role: "NLP · accessibility",
      highlights: [
        "Real-time transcription with OpenAI Whisper",
        "Accessibility-first design for speech input",
        "NLP preprocessing pipeline for clean output",
      ],
      stack: ["Python", "Whisper", "NLP"],
    },
  },
];

export function projectMatchesFilter(project, filterId) {
  if (filterId === "all") return true;
  return (project.categories || []).includes(filterId);
}
