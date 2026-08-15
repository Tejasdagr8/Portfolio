export const paperLinks = {
  arxiv: "https://arxiv.org/abs/2602.21947",
  doi: "https://doi.org/10.48550/arxiv.2602.21947",
  code: "https://github.com/sohv/algorithmic-blindness",
  workshop: "https://science-ai-2026.github.io/",
  colm: "https://colmweb.org/",
};

export const PRIVATE_REPO_COMMITS = 500;

export const publications = [
  {
    venue: "Sci-FM 2026 @ COLM",
    title: "Algorithmic Blindness in Large Language Models: A Calibration Study of Performance Prediction",
    arxivTitle: "Large Language Models are Algorithmically Blind",
    status: "Accepted Poster",
    workshop: "Scientific Understanding of Foundation Models Workshop, COLM 2026",
    year: "2026",
    arxivId: "2602.21947",
    authors: "Sohan Venkatesh, Ashish Mahendran Kurapath, Tejas Melkote",
    description:
      "Calibration study on whether large language models can reliably predict their own task performance — probing limits of algorithmic self-assessment in foundation models.",
    tags: ["LLMs", "Calibration", "Foundation Models", "Research"],
    note: "Workshop paper at Sci-FM (COLM 2026). Non-archival; not a main-track COLM publication.",
    links: [
      { label: "Paper (arXiv)", href: paperLinks.arxiv, track: "paper_arxiv" },
      { label: "Code", href: paperLinks.code, track: "paper_code" },
      { label: "DOI", href: paperLinks.doi, track: "paper_doi" },
      { label: "Workshop", href: paperLinks.workshop, track: "paper_workshop" },
    ],
    spotlight: {
      abstract:
        "Large language models demonstrate broad declarative knowledge, yet their ability to form calibrated expectations about algorithmic performance remains poorly understood. Using causal discovery as a rigorous testbed spanning eight frontier models, thirteen datasets, and 5,200 algorithm runs, we evaluate whether LLM-predicted performance ranges contain true algorithmic means.",
      keyFindings: [
        "Frontier LLMs achieve only 15.9% calibrated coverage — seven of eight models perform worse than random guessing.",
        "Predicted ranges are 8–27× wider than true confidence intervals yet still fail to contain the true mean most of the time.",
        "We term this failure algorithmic blindness: a gap between declarative knowledge and calibrated procedural prediction.",
        "Marginal above-random performance aligns with benchmark memorization, not structure-conditioned generalization.",
      ],
    },
  },
];

/** Resume-style single-line entry */
export const publicationResumeLine =
  "Research Publication — Sci-FM 2026 @ COLM · Accepted Poster · Algorithmic Blindness in LLMs: A Calibration Study of Performance Prediction";
