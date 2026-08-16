export const PROJECT_FILTERS = [
  { id: "all", label: "All" },
  { id: "production", label: "Production" },
  { id: "agents", label: "Agents" },
  { id: "ml", label: "ML" },
  { id: "fullstack", label: "Full stack" },
];

export const projects = [
  {
    title: "TatvaOps Platform (Vantage)",
    description: "AI-powered construction content platform with blogs, forums, CMS, and analytics — built for high-intent SEO traffic and community engagement.",
    tags: ["React", "CMS", "SEO", "AI"],
    categories: ["production", "fullstack"],
    metric: "SEO CMS · production users",
    link: "https://vantage.withtatva.ai/",
    livePreview: {
      screenshot: "/previews/vantage.png",
      note: "Live site blocks iframe embeds — screenshot preview. Click to open vantage.withtatva.ai.",
    },
    spotlight: {
      year: "2025",
      role: "Full-stack · AI content platform",
      highlights: [
        "SEO-first CMS with blogs, forums, and community features",
        "Analytics layer for high-intent construction traffic",
        "Production deployment serving real users in construction vertical",
      ],
      stack: ["React", "CMS", "Analytics", "AI-assisted content"],
      architecture: ["User", "React SPA", "CMS API", "Analytics", "SEO index"],
      flowKey: "tatvaops",
    },
  },
  {
    title: "TatvaOps Verified Vendor Profile",
    description: "Production vendor profile system with verified ratings, pricing insights, and searchable contractor listings for the construction industry.",
    tags: ["Web App", "Full Stack", "Portfolio"],
    categories: ["production", "fullstack"],
    metric: "Live on Vercel · verified ratings",
    link: "https://vendor-profilepage.vercel.app/",
    livePreview: {
      embedUrl: "https://vendor-profilepage.vercel.app/",
    },
    spotlight: {
      year: "2025",
      role: "Full-stack web app",
      highlights: [
        "Verified vendor ratings and searchable contractor listings",
        "Pricing insights for construction procurement decisions",
        "Deployed on Vercel with production-grade UX",
      ],
      stack: ["React", "Vercel", "Full Stack"],
    },
  },
  {
    title: "AI Trip Planner",
    description: "Agentic trip planner orchestrating 7 APIs (Weather, Tavily, Google Places, Groq) via a LangGraph workflow with FastAPI backend and Docker deployment.",
    tags: ["LangGraph", "FastAPI", "Docker", "Agents"],
    categories: ["agents", "fullstack"],
    metric: "7 APIs · LangGraph",
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
    },
  },
  {
    title: "Medical Image Analyzer & PDF Summarizer",
    description: "Multimodal tool for medical image analysis and PDF summarization with user authentication, analytics dashboards, and RAG-powered document Q&A.",
    tags: ["Python", "LLM", "RAG", "Streamlit"],
    categories: ["ml", "fullstack"],
    metric: "Live embed · Streamlit · RAG",
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
    },
  },
  {
    title: "Crop Yield Prediction",
    description: "Hybrid CNN-RNN-LSTM model for agricultural yield forecasting across crop types and regions, with end-to-end training and evaluation pipeline.",
    tags: ["TensorFlow", "CNN", "LSTM", "Python"],
    categories: ["ml"],
    metric: "CNN-RNN-LSTM · Colab pipeline",
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
    description: "End-to-end ML pipeline with feature engineering, model selection, and evaluation for automotive price estimation on real-world listing data.",
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
    description: "Churn prediction and customer segmentation using KNN, DBSCAN, and SVM — with clustering analysis to identify at-risk user cohorts.",
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
    description: "Accessibility-focused speech recognition system built with NLP pipelines and OpenAI Whisper for real-time transcription.",
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
