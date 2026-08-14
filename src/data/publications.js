export const paperLinks = {
  arxiv: "https://arxiv.org/abs/2602.21947",
  doi: "https://doi.org/10.48550/arxiv.2602.21947",
  code: "https://github.com/sohv/algorithmic-blindness",
  workshop: "https://science-ai-2026.github.io/",
  colm: "https://colmweb.org/",
};

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
  },
];

/** Resume-style single-line entry */
export const publicationResumeLine =
  "Research Publication — Sci-FM 2026 @ COLM · Accepted Poster · Algorithmic Blindness in LLMs: A Calibration Study of Performance Prediction";
