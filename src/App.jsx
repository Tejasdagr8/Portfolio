import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { FaGithub, FaLinkedin, FaEnvelope, FaPhone, FaDownload, FaExternalLinkAlt, FaArrowUp, FaBars, FaTimes } from "react-icons/fa";
import profile from "./assets/profile.jpeg";
import GradientField from "./components/GradientField";
import SkillsMarquee from "./components/SkillsMarquee";
import useAnalytics from "./hooks/useAnalytics";
import { track } from "./lib/analytics";

const CONTACT_EMAILS = {
  primary: "coooltejasdagr@gmail.com",
  cc: "tejas2.mitblr2022@learner.manipal.edu",
};

const fadeUp = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.55, ease: "easeOut" } },
};

const stagger = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.1 } },
};

function SectionHeading({ eyebrow, children }) {
  return (
    <div className="mb-6 md:mb-12">
      {eyebrow && (
        <p className="font-mono text-[10px] sm:text-xs tracking-[0.16em] sm:tracking-[0.2em] uppercase text-mint flex items-center gap-2 sm:gap-3 mb-3 sm:mb-4">
          {eyebrow}
          <span className="flex-1 h-px bg-white/[0.13]" />
        </p>
      )}
      <h2 className="font-display text-2xl sm:text-3xl md:text-5xl font-bold tracking-tight leading-tight">{children}</h2>
    </div>
  );
}

const skillCategories = [
  {
    title: "// machine learning",
    items: ["PyTorch · scikit-learn", "Transformers · fine-tuning", "Computer Vision · NLP", "RAG & agentic systems", "LLM pipelines"],
  },
  {
    title: "// full stack",
    items: ["React · Vue.js · TypeScript", "Python · FastAPI · Go", "Ruby on Rails · Streamlit", "PostgreSQL · Redis · Kafka", "REST & streaming APIs"],
  },
  {
    title: "// infrastructure",
    items: ["Docker · CI/CD", "Jenkins · ArgoCD · Sidekiq", "Vercel · cloud deployment", "Git · Linux · the terminal", "PowerBI · analytics"],
  },
];

const leadership = [
  { role: "Class Representative", org: "AI-C, MIT Manipal" },
  { role: "PR Head", org: "E-Cell" },
  { role: "Operations Head", org: "College Fest" },
];

const projects = [
  {
    title: "TatvaOps Platform (Vantage)",
    description: "AI-powered construction content platform with blogs, forums, CMS, and analytics — built for high-intent SEO traffic and community engagement.",
    tags: ["React", "CMS", "SEO", "AI"],
    link: "https://vantage.withtatva.ai/",
  },
  {
    title: "TatvaOps Verified Vendor Profile",
    description: "Production vendor profile system with verified ratings, pricing insights, and searchable contractor listings for the construction industry.",
    tags: ["Web App", "Full Stack", "Portfolio"],
    link: "https://vendor-profilepage.vercel.app/",
  },
  {
    title: "AI Trip Planner",
    description: "Agentic trip planner orchestrating 7 APIs (Weather, Tavily, Google Places, Groq) via a LangGraph workflow with FastAPI backend and Docker deployment.",
    tags: ["LangGraph", "FastAPI", "Docker", "Agents"],
  },
  {
    title: "Medical Image Analyzer & PDF Summarizer",
    description: "Multimodal tool for medical image analysis and PDF summarization with user authentication, analytics dashboards, and RAG-powered document Q&A.",
    tags: ["Python", "LLM", "RAG", "Streamlit"],
    link: "https://medimage.streamlit.app/",
  },
  {
    title: "Crop Yield Prediction",
    description: "Hybrid CNN-RNN-LSTM model for agricultural yield forecasting across crop types and regions, with end-to-end training and evaluation pipeline.",
    tags: ["TensorFlow", "CNN", "LSTM", "Python"],
    link: "https://colab.research.google.com/drive/1c5BOmHjO4dQDWb-YuZ5j42uGF-bvkQKS?usp=sharing",
  },
  {
    title: "Car Price Prediction",
    description: "End-to-end ML pipeline with feature engineering, model selection, and evaluation for automotive price estimation on real-world listing data.",
    tags: ["Scikit-learn", "Python", "ML"],
  },
  {
    title: "Customer Churn & Segmentation",
    description: "Churn prediction and customer segmentation using KNN, DBSCAN, and SVM — with clustering analysis to identify at-risk user cohorts.",
    tags: ["KNN", "DBSCAN", "SVM", "Python"],
  },
  {
    title: "Speech-to-Text System",
    description: "Accessibility-focused speech recognition system built with NLP pipelines and OpenAI Whisper for real-time transcription.",
    tags: ["Python", "NLP", "OpenAI", "Whisper"],
  },
];

function App() {
  const sectionContainer = "w-full max-w-6xl mx-auto px-4 sm:px-6 lg:px-8";
  const sectionPad = "py-16 md:py-24";
  const sectionIds = ["about", "experience", "education", "projects", "skills", "contact"];
  const [activeSection, setActiveSection] = useState("about");
  const [copiedField, setCopiedField] = useState("");
  const [showBackToTop, setShowBackToTop] = useState(false);
  const [scrollProgress, setScrollProgress] = useState(0);
  const [messageForm, setMessageForm] = useState({ name: "", email: "", message: "" });
  const [formError, setFormError] = useState("");
  const [formSuccess, setFormSuccess] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [localTime, setLocalTime] = useState("");
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useAnalytics();

  useEffect(() => {
    const observers = sectionIds
      .map((id) => document.getElementById(id))
      .filter(Boolean)
      .map((element) => {
        const observer = new IntersectionObserver(
          ([entry]) => {
            if (entry.isIntersecting) {
              setActiveSection(entry.target.id);
            }
          },
          { threshold: 0.35, rootMargin: "-80px 0px -40% 0px" }
        );

        observer.observe(element);
        return observer;
      });

    return () => observers.forEach((observer) => observer.disconnect());
  }, []);

  useEffect(() => {
    const onScroll = () => setShowBackToTop(window.scrollY > 420);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    const updateProgress = () => {
      const total = document.documentElement.scrollHeight - window.innerHeight;
      if (total <= 0) {
        setScrollProgress(0);
        return;
      }
      setScrollProgress((window.scrollY / total) * 100);
    };
    updateProgress();
    window.addEventListener("scroll", updateProgress, { passive: true });
    window.addEventListener("resize", updateProgress);
    return () => {
      window.removeEventListener("scroll", updateProgress);
      window.removeEventListener("resize", updateProgress);
    };
  }, []);

  useEffect(() => {
    const savedDraft = window.localStorage.getItem("portfolio-contact-draft");
    if (!savedDraft) return;
    try {
      const parsed = JSON.parse(savedDraft);
      if (
        typeof parsed.name === "string" &&
        typeof parsed.email === "string" &&
        typeof parsed.message === "string"
      ) {
        setMessageForm(parsed);
      }
    } catch {
      // Ignore corrupted saved drafts.
    }
  }, []);

  useEffect(() => {
    window.localStorage.setItem("portfolio-contact-draft", JSON.stringify(messageForm));
  }, [messageForm]);

  useEffect(() => {
    document.body.style.overflow = mobileMenuOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [mobileMenuOpen]);

  const closeMobileMenu = () => setMobileMenuOpen(false);

  useEffect(() => {
    const updateTime = () => {
      const now = new Date();
      setLocalTime(
        now.toLocaleTimeString("en-IN", {
          hour: "2-digit",
          minute: "2-digit",
          second: "2-digit",
          hour12: true,
          timeZone: "Asia/Kolkata",
        })
      );
    };
    updateTime();
    const interval = setInterval(updateTime, 1000);
    return () => clearInterval(interval);
  }, []);

  const copyToClipboard = async (value, field) => {
    try {
      await navigator.clipboard.writeText(value);
      setCopiedField(field);
      setTimeout(() => setCopiedField(""), 1600);
    } catch (error) {
      setCopiedField(`error-${field}`);
      setTimeout(() => setCopiedField(""), 1600);
    }
  };

  const submitQuickMessage = async (event) => {
    event.preventDefault();
    const name = messageForm.name.trim();
    const email = messageForm.email.trim();
    const message = messageForm.message.trim();

    if (!name || !email || !message) {
      setFormError("Please fill all fields.");
      setFormSuccess("");
      return;
    }

    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailPattern.test(email)) {
      setFormError("Please enter a valid email address.");
      setFormSuccess("");
      return;
    }

    setFormError("");
    setFormSuccess("");
    setIsSubmitting(true);

    const formData = new FormData();
    formData.append("name", name);
    formData.append("email", email);
    formData.append("message", message);
    formData.append("_subject", `Portfolio message from ${name}`);
    formData.append("_replyto", email);
    formData.append("_cc", CONTACT_EMAILS.cc);
    formData.append("_template", "table");
    formData.append("_captcha", "false");

    try {
      const response = await fetch(`https://formsubmit.co/ajax/${CONTACT_EMAILS.primary}`, {
        method: "POST",
        body: formData,
        headers: { Accept: "application/json" },
      });

      const result = await response.json();

      if (response.ok && result.success) {
        setMessageForm({ name: "", email: "", message: "" });
        window.localStorage.removeItem("portfolio-contact-draft");
        setFormSuccess("Message sent! I'll get back to you soon.");
        track("click", { label: "contact_form_success" });
        return;
      }

      throw new Error(result.message || "Form submission failed");
    } catch {
      setFormError(
        "Could not send automatically. Please email coooltejasdagr@gmail.com directly."
      );
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="bg-ink-0 text-paper font-body font-light min-h-screen overflow-x-hidden">
      <div className="fixed top-0 left-0 z-[60] h-[2px] bg-gradient-to-r from-[#8C7BFF] to-[#5EE6D0]" style={{ width: `${scrollProgress}%` }} />

      {/* NAVBAR */}
      <nav className="fixed w-full top-0 z-[100] border-b border-transparent bg-gradient-to-b from-[#0B0E16]/85 to-transparent backdrop-blur-sm">
        <div className={`${sectionContainer} py-4 flex justify-between items-center`}>
          <a href="#" data-track="brand_name" className="font-mono text-xs sm:text-sm tracking-widest text-paper hover:text-mint transition-colors shrink-0">
            tejas<span className="text-mint">.</span>melkote
          </a>
          <div className="flex items-center gap-4">
            <div className="hidden md:flex gap-7 font-mono text-xs tracking-widest uppercase text-fog">
              {sectionIds.map((id) => (
                <a
                  key={id}
                  href={`#${id}`}
                  className={`transition-colors relative group ${
                    activeSection === id ? "text-paper" : "hover:text-paper"
                  }`}
                >
                  {id}
                  <span
                    className={`absolute -bottom-1 left-0 h-px bg-mint transition-all duration-300 ${
                      activeSection === id ? "w-full" : "w-0 group-hover:w-full"
                    }`}
                  />
                </a>
              ))}
            </div>
            <a
              href="/resume.pdf"
              download
              data-track="resume_nav"
              className="hidden sm:flex items-center gap-1.5 px-4 py-2 rounded-full border border-white/[0.13] text-paper text-xs font-mono tracking-wider hover:border-mint/50 hover:bg-mint/[0.06] transition-colors"
            >
              <FaDownload size={9} /> Resume
            </a>
            <button
              type="button"
              onClick={() => setMobileMenuOpen((open) => !open)}
              className="md:hidden p-2 rounded-lg border border-white/10 text-gray-300 hover:text-white hover:border-white/20 transition-colors"
              aria-label={mobileMenuOpen ? "Close menu" : "Open menu"}
              aria-expanded={mobileMenuOpen}
            >
              {mobileMenuOpen ? <FaTimes size={16} /> : <FaBars size={16} />}
            </button>
          </div>
        </div>

        {mobileMenuOpen && (
          <div className="md:hidden fixed inset-0 top-[60px] z-[99] bg-[#0B0E16]/98 backdrop-blur-md overflow-y-auto">
            <div className="flex flex-col px-4 py-5 gap-1 pb-10">
              {sectionIds.map((id) => (
                <a
                  key={id}
                  href={`#${id}`}
                  onClick={closeMobileMenu}
                  className={`capitalize py-3 px-4 rounded-xl text-base transition-colors ${
                    activeSection === id
                      ? "text-white bg-white/[0.06] border border-[#8C7BFF]/30"
                      : "text-gray-400 hover:text-white hover:bg-white/[0.04]"
                  }`}
                >
                  {id}
                </a>
              ))}
              <a
                href="/resume.pdf"
                download
                data-track="resume_nav"
                onClick={closeMobileMenu}
                className="mt-4 flex items-center justify-center gap-2 py-3 px-4 rounded-xl border border-[#8C7BFF]/40 text-[#8C7BFF] text-sm hover:bg-[#8C7BFF]/10 transition-colors"
              >
                <FaDownload size={12} /> Download Resume
              </a>
            </div>
          </div>
        )}
      </nav>

      {/* HERO */}
      <section className="min-h-[100dvh] flex flex-col justify-center relative overflow-hidden pt-20 pb-20 md:pt-24 md:pb-16">
        <GradientField className="absolute inset-0 w-full h-full block pointer-events-none" />

        <motion.div
          className={`relative z-[2] ${sectionContainer}`}
          initial="hidden"
          animate="visible"
          variants={stagger}
        >
          <motion.div variants={fadeUp} className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-8 md:gap-12">
            <motion.div variants={fadeUp} className="relative shrink-0 order-first mx-auto lg:order-last lg:mx-0">
              <div className="absolute inset-0 rounded-full bg-gradient-to-r from-iris to-mint blur-2xl opacity-30 scale-110" />
              <img
                src={profile}
                alt="Tejas Melkote — AI/ML Engineer"
                className="relative w-32 h-32 sm:w-40 sm:h-40 md:w-52 md:h-52 rounded-full object-cover border border-white/10"
              />
            </motion.div>

            <div className="flex-1 text-center lg:text-left min-w-0">
              <p className="font-mono text-[10px] sm:text-xs md:text-sm text-mint tracking-[0.12em] sm:tracking-[0.14em] uppercase mb-5 sm:mb-6 flex items-center justify-center lg:justify-start gap-2 sm:gap-3">
                <span className="w-6 sm:w-8 h-px bg-mint inline-block shrink-0" />
                <span className="text-left">gradient descent — shipping since 2022</span>
              </p>

              <h1 className="font-display font-extrabold uppercase leading-[0.95] tracking-tight break-words">
                <span className="block text-[2.75rem] sm:text-6xl md:text-8xl text-paper">Tejas</span>
                <span
                  className="block text-[2.75rem] sm:text-6xl md:text-8xl text-transparent"
                  style={{ WebkitTextStroke: "1.5px rgba(234,237,246,0.38)" }}
                >
                  Melkote
                </span>
                <span className="block text-[2rem] sm:text-5xl md:text-7xl mt-1">
                  builds <span className="gradient-text">minds</span>
                </span>
              </h1>

              <p className="text-fog text-sm sm:text-base md:text-lg max-w-xl mx-auto lg:mx-0 mt-6 sm:mt-8 leading-relaxed">
                <strong className="text-paper font-medium">AI/ML engineer & full-stack developer.</strong>{" "}
                Final-year B.Tech CS (AI) at MIT Manipal — shipping production features at SuperAGI and building LLM agents, RAG pipelines, and the products around them.
              </p>

              <div className="font-mono text-[11px] sm:text-xs text-fog tracking-wide flex flex-wrap justify-center lg:justify-start gap-x-4 sm:gap-x-6 gap-y-2 mt-6 sm:mt-8">
                <span><span className="text-mint">●</span> Bengaluru, IN</span>
                <span><span className="text-mint">●</span> Open to opportunities</span>
                <span className="hidden sm:inline"><span className="text-mint">●</span> Move cursor — field responds</span>
              </div>

              <div className="flex flex-wrap justify-center lg:justify-start gap-3 sm:gap-4 mt-8 sm:mt-10">
                <a
                  href="#contact"
                  data-track="contact_cta"
                  className="w-full sm:w-auto text-center px-6 sm:px-7 py-3 rounded-full bg-gradient-to-r from-iris to-mint text-ink-0 text-sm font-medium hover:opacity-90 transition-opacity"
                >
                  Get in touch
                </a>
                <a
                  href="/resume.pdf"
                  download
                  data-track="resume"
                  className="w-full sm:w-auto text-center px-6 sm:px-7 py-3 rounded-full border border-white/[0.15] text-fog text-sm hover:text-paper hover:border-mint/40 hover:bg-mint/[0.06] transition-all"
                >
                  Download CV
                </a>
              </div>

              <div className="flex justify-center lg:justify-start gap-5 mt-6 sm:mt-8 text-fog">
                <a href="https://github.com/Tejasdagr8" target="_blank" rel="noreferrer" data-track="github" className="hover:text-paper transition-colors text-xl" aria-label="GitHub">
                  <FaGithub />
                </a>
                <a href="https://www.linkedin.com/in/tejas-melkote-390545309/" target="_blank" rel="noreferrer" data-track="linkedin" className="hover:text-mint transition-colors text-xl" aria-label="LinkedIn">
                  <FaLinkedin />
                </a>
                <a href="mailto:coooltejasdagr@gmail.com" data-track="email" className="hover:text-mint transition-colors text-xl" aria-label="Email">
                  <FaEnvelope />
                </a>
              </div>
            </div>
          </motion.div>
        </motion.div>

        <div className="scroll-hint absolute bottom-6 md:bottom-8 left-1/2 font-mono text-[11px] tracking-[0.3em] uppercase text-fog z-[2]">
          scroll
        </div>
      </section>

      <SkillsMarquee />

      {/* ABOUT */}
      <motion.section
        id="about"
        className={`${sectionPad} ${sectionContainer}`}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-80px" }}
        variants={fadeUp}
      >
        <SectionHeading eyebrow="about">
          Full-stack curiosity, <span className="gradient-text">model-first</span> thinking.
        </SectionHeading>
        <div className="grid lg:grid-cols-[1.4fr_1fr] gap-8 lg:gap-12 items-start">
          <p className="text-fog text-base md:text-lg leading-8">
            Most engineers pick a layer of the stack and stay there. I work at the seam — where trained models meet real users, latency budgets, and edge cases.
            Equally at home writing a training loop in PyTorch and architecting the API, frontend, and infrastructure that serve it.{" "}
            <strong className="text-paper font-medium">A model that never ships is just a very expensive CSV.</strong>
          </p>
          <div className="space-y-3">
            {[
              { label: "focus", value: "ML systems, end to end" },
              { label: "currently", value: "LLM agents & RAG" },
              { label: "internship", value: "SDE @ SuperAGI" },
            ].map(({ label, value }) => (
              <div key={label} className="card-glass p-6">
                <p className="font-mono text-[11px] tracking-[0.16em] uppercase text-mint mb-2">{label}</p>
                <p className="font-display font-bold text-xl text-paper">{value}</p>
              </div>
            ))}
          </div>
        </div>
      </motion.section>

      {/* EXPERIENCE */}
      <section id="experience" className={`${sectionPad} ${sectionContainer}`}>
        <motion.div initial="hidden" whileInView="visible" viewport={{ once: true, margin: "-80px" }} variants={fadeUp}>
          <SectionHeading eyebrow="experience">
            Where I&apos;ve <span className="gradient-text">trained</span>.
          </SectionHeading>
        </motion.div>
        <motion.div
          className="space-y-5"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-80px" }}
          variants={stagger}
        >
          {[
            {
              company: "SuperAGI",
              role: "Software Development Engineer Intern",
              period: "Jan 2026 – Jun 2026",
              location: "Bangalore, India",
              description:
                "Built marketing campaign features (Email and WhatsApp) in a full-stack production codebase using Go, Ruby on Rails, and Vue.js. Deployed 15+ pull requests via Jenkins and ArgoCD CI/CD, including email-campaign validation and WhatsApp test-send features. Worked with Sidekiq, Redis, and Kafka for background jobs and event streaming; ran database migrations and integrated CRM platform workflows.",
              tags: ["Go", "Ruby on Rails", "Vue.js", "Jenkins", "ArgoCD", "Sidekiq", "Redis", "Kafka"],
            },
            {
              company: "CirrusLabs Pvt Ltd",
              role: "AI / ML Intern",
              period: "May 2025 – Jul 2025",
              location: "Bengaluru, India",
              description: "Built LLM chatbots, AI agents, and ML pipelines for internal project tooling. Packaged models behind Streamlit and FastAPI interfaces for team use.",
              tags: ["LLMs", "AI Agents", "FastAPI", "Streamlit", "Python"],
            },
          ].map((exp, i) => (
            <motion.div
              key={i}
              variants={fadeUp}
              className="grid grid-cols-1 md:grid-cols-[200px_1fr] gap-3 md:gap-14 py-6 md:py-8 border-t border-white/[0.13] first:border-t-0"
            >
              <div className="font-mono text-xs sm:text-sm text-mint tracking-wide md:pt-1">
                <p>{exp.period}</p>
                <p className="text-fog text-xs mt-1">{exp.location}</p>
              </div>
              <div>
                <h3 className="font-display font-bold text-lg sm:text-xl md:text-2xl text-paper">{exp.role}</h3>
                <p className="font-mono text-sm text-fog mt-1">{exp.company}</p>
                <p className="text-fog text-sm leading-7 mt-4 max-w-2xl">{exp.description}</p>
                <div className="flex flex-wrap gap-2 mt-5">
                  {exp.tags.map((tag) => (
                    <span key={tag} className="font-mono text-[11px] tracking-wide px-3 py-1 rounded-full border border-white/[0.13] text-fog">
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </section>

      {/* EDUCATION */}
      <section id="education" className={`${sectionPad} ${sectionContainer}`}>
        <motion.div initial="hidden" whileInView="visible" viewport={{ once: true, margin: "-80px" }} variants={fadeUp}>
          <SectionHeading eyebrow="education">Education</SectionHeading>
        </motion.div>
        <motion.div
          className="space-y-4"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-80px" }}
          variants={stagger}
        >
          {[
            {
              degree: "B.Tech Computer Science Engineering (AI)",
              institution: "Manipal Institute of Technology",
              detail: "2022 – 2026",
              grade: "CGPA 8.46",
            },
            {
              degree: "12th Grade",
              institution: "Narayana PU College",
              detail: "2022",
              grade: "90.33%",
            },
            {
              degree: "10th Grade",
              institution: "Frank Anthony Public School",
              detail: "2020",
              grade: "95%",
            },
          ].map((edu, i) => (
            <motion.div
              key={i}
              variants={fadeUp}
              className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 card-glass card-glass-hover p-5 sm:p-6"
            >
              <div className="min-w-0">
                <h3 className="font-display font-bold text-paper text-sm sm:text-base leading-snug">{edu.degree}</h3>
                <p className="text-fog text-xs mt-1 font-mono">
                  {edu.institution}
                  {edu.detail && ` · ${edu.detail}`}
                </p>
              </div>
              <span className="gradient-text font-display font-bold text-sm sm:ml-4 sm:shrink-0 self-start sm:self-auto">{edu.grade}</span>
            </motion.div>
          ))}
        </motion.div>
      </section>

      {/* PROJECTS */}
      <section id="projects" className={`${sectionPad} ${sectionContainer}`}>
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-80px" }}
          variants={fadeUp}
        >
          <SectionHeading eyebrow="selected work">
            Things I&apos;ve <span className="gradient-text">shipped</span>.
          </SectionHeading>
        </motion.div>
        <motion.div
          className="space-y-0"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-80px" }}
          variants={stagger}
        >
          {projects.map((project, i) => (
            <motion.div
              key={`${project.title}-${i}`}
              variants={fadeUp}
              className="group relative grid grid-cols-1 md:grid-cols-[80px_1fr_auto] gap-2 md:gap-10 py-6 md:py-10 border-t border-white/[0.13] md:hover:pl-3 transition-all duration-300"
            >
              <span className="font-mono text-xs sm:text-sm text-fog">P—{String(i + 1).padStart(2, "0")}</span>
              <div className="min-w-0">
                <h3 className="font-display font-bold text-lg sm:text-xl md:text-3xl text-paper group-hover:text-mint transition-colors leading-tight">
                  {project.title}
                </h3>
                <p className="text-fog text-sm md:text-base leading-7 mt-3 max-w-2xl">{project.description}</p>
                <div className="flex flex-wrap gap-2 mt-4">
                  {project.tags.map((tag) => (
                    <span key={tag} className="font-mono text-[11px] px-3 py-1 rounded-full border border-white/[0.13] text-fog">
                      {tag}
                    </span>
                  ))}
                </div>
                {project.link && (
                  <a
                    href={project.link}
                    target="_blank"
                    rel="noreferrer"
                    data-track={`project:${project.title}`}
                    className="inline-flex items-center gap-1.5 text-xs font-mono text-mint hover:text-paper transition-colors mt-4"
                  >
                    <FaExternalLinkAlt size={10} /> View live
                  </a>
                )}
              </div>
              <span className="hidden md:block font-display text-2xl text-fog group-hover:text-mint group-hover:translate-x-1 group-hover:-translate-y-1 transition-all">
                ↗
              </span>
            </motion.div>
          ))}
          <div className="border-t border-white/[0.13]" />
        </motion.div>
      </section>

      {/* SKILLS */}
      <section id="skills" className={`${sectionPad} ${sectionContainer}`}>
        <motion.div initial="hidden" whileInView="visible" viewport={{ once: true, margin: "-80px" }} variants={fadeUp}>
          <SectionHeading eyebrow="stack">
            Tools of the <span className="gradient-text">trade</span>.
          </SectionHeading>
        </motion.div>
        <motion.div
          className="grid md:grid-cols-3 gap-4"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-80px" }}
          variants={stagger}
        >
          {skillCategories.map((col) => (
            <motion.div key={col.title} variants={fadeUp} className="card-glass card-glass-hover p-7">
              <h3 className="font-mono text-xs tracking-[0.18em] uppercase text-ember mb-5">{col.title}</h3>
              <ul className="space-y-0">
                {col.items.map((item) => (
                  <li key={item} className="text-fog text-sm py-2.5 border-b border-dashed border-white/[0.1] last:border-0">
                    {item}
                  </li>
                ))}
              </ul>
            </motion.div>
          ))}
        </motion.div>
      </section>

      {/* LEADERSHIP & LANGUAGES */}
      <section className={`py-12 md:py-20 ${sectionContainer}`}>
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-80px" }}
          variants={fadeUp}
        >
          <SectionHeading eyebrow="beyond code">Leadership & languages</SectionHeading>
          <div className="grid md:grid-cols-2 gap-8">
            <div className="space-y-3">
              {leadership.map(({ role, org }) => (
                <div key={role} className="card-glass p-4 sm:p-5 flex flex-col sm:flex-row sm:justify-between sm:items-center gap-1 sm:gap-4">
                  <p className="font-display font-bold text-paper text-sm">{role}</p>
                  <p className="font-mono text-xs text-fog sm:text-right">{org}</p>
                </div>
              ))}
            </div>
            <div className="flex flex-wrap gap-3 content-start">
              {[
                { lang: "English", level: "Native" },
                { lang: "Hindi", level: "Proficient" },
                { lang: "Kannada", level: "Advanced" },
              ].map(({ lang, level }) => (
                <div key={lang} className="card-glass px-5 py-4 min-w-[140px]">
                  <p className="text-paper text-sm font-medium">{lang}</p>
                  <p className="text-fog text-xs mt-1 font-mono">{level}</p>
                </div>
              ))}
            </div>
          </div>
        </motion.div>
      </section>

      {/* CONTACT */}
      <section id="contact" className={`${sectionPad} ${sectionContainer}`}>
        <motion.div
          className="flex flex-col items-center text-center"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-80px" }}
          variants={stagger}
        >
          <motion.div variants={fadeUp} className="flex flex-col items-center mb-10">
            <p className="font-mono text-xs tracking-[0.2em] uppercase text-mint mb-4">contact</p>
            <h2 className="font-display text-2xl sm:text-3xl md:text-5xl font-bold text-center leading-tight px-2">
              Let&apos;s build something<br className="hidden sm:block" />
              <span className="sm:hidden"> </span>that <span className="gradient-text">learns</span>.
            </h2>
            <p className="text-fog text-sm mt-5 max-w-md">
              Whether it&apos;s a role, a collaboration, or a hard problem — my inbox converges fast.
            </p>
            <p className="text-fog text-xs mt-2 font-mono">Local time (IST): {localTime}</p>
          </motion.div>

          <motion.div variants={fadeUp} className="mb-8 sm:mb-10 w-full px-2">
            <a
              href="mailto:coooltejasdagr@gmail.com"
              data-track="email"
              className="font-display font-extrabold text-base sm:text-2xl md:text-4xl gradient-text hover:opacity-80 transition-opacity break-all leading-snug inline-block max-w-full"
            >
              coooltejasdagr@gmail.com
            </a>
          </motion.div>

          <motion.div variants={fadeUp} className="flex flex-col sm:flex-row gap-3 mb-8 w-full max-w-2xl">
            <div className="flex items-center gap-3 card-glass px-5 py-3.5 hover:border-mint/30 transition-all group flex-1">
              <FaEnvelope className="text-mint shrink-0" />
              <a href="mailto:coooltejasdagr@gmail.com" className="text-fog text-sm group-hover:text-paper transition-colors truncate flex-1">
                coooltejasdagr@gmail.com
              </a>
              <button
                type="button"
                onClick={() => copyToClipboard("coooltejasdagr@gmail.com", "email")}
                className="font-mono text-[11px] px-2 py-1 rounded border border-white/[0.12] text-fog hover:text-paper hover:border-white/[0.28] transition-colors"
              >
                {copiedField === "email" ? "Copied" : copiedField === "error-email" ? "Failed" : "Copy"}
              </button>
            </div>
            <div className="flex items-center gap-3 card-glass px-5 py-3.5 hover:border-mint/30 transition-all group flex-1">
              <FaPhone className="text-mint shrink-0" />
              <a href="tel:+917019280175" className="text-fog text-sm group-hover:text-paper transition-colors flex-1">
                +91 7019280175
              </a>
              <button
                type="button"
                onClick={() => copyToClipboard("+917019280175", "phone")}
                className="font-mono text-[11px] px-2 py-1 rounded border border-white/[0.12] text-fog hover:text-paper hover:border-white/[0.28] transition-colors"
              >
                {copiedField === "phone" ? "Copied" : copiedField === "error-phone" ? "Failed" : "Copy"}
              </button>
            </div>
          </motion.div>

          <motion.form
            variants={fadeUp}
            onSubmit={submitQuickMessage}
            className="w-full max-w-2xl card-glass p-5 mb-8 text-left"
          >
            <p className="font-mono text-xs tracking-widest uppercase text-fog mb-4">Quick message</p>
            <div className="grid sm:grid-cols-2 gap-3 mb-3">
              <input
                type="text"
                value={messageForm.name}
                onChange={(e) => setMessageForm((prev) => ({ ...prev, name: e.target.value }))}
                placeholder="Your name"
                className="rounded-lg border border-white/[0.08] bg-ink-0/50 px-3 py-2 text-sm text-paper placeholder:text-fog/60 outline-none focus:border-mint/40 font-body"
              />
              <input
                type="email"
                value={messageForm.email}
                onChange={(e) => setMessageForm((prev) => ({ ...prev, email: e.target.value }))}
                placeholder="Your email"
                className="rounded-lg border border-white/[0.08] bg-ink-0/50 px-3 py-2 text-sm text-paper placeholder:text-fog/60 outline-none focus:border-mint/40 font-body"
              />
            </div>
            <textarea
              value={messageForm.message}
              onChange={(e) => setMessageForm((prev) => ({ ...prev, message: e.target.value }))}
              placeholder="Write your message..."
              rows={4}
              className="w-full rounded-lg border border-white/[0.08] bg-ink-0/50 px-3 py-2 text-sm text-paper placeholder:text-fog/60 outline-none focus:border-mint/40 font-body"
            />
            <div className="mt-4 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
              <div className="min-h-4 order-2 sm:order-1">
                {formError && <p className="text-xs text-red-400">{formError}</p>}
                {formSuccess && <p className="text-xs text-mint">{formSuccess}</p>}
              </div>
              <div className="flex items-center gap-2 order-1 sm:order-2 self-end sm:self-auto w-full sm:w-auto">
                <button
                  type="button"
                  onClick={() => {
                    const cleared = { name: "", email: "", message: "" };
                    setMessageForm(cleared);
                    setFormError("");
                    setFormSuccess("");
                    window.localStorage.removeItem("portfolio-contact-draft");
                  }}
                  disabled={isSubmitting}
                  className="flex-1 sm:flex-none px-3 py-2.5 rounded-full border border-white/[0.15] text-fog text-xs font-mono hover:text-paper hover:border-white/[0.28] transition-colors disabled:opacity-50"
                >
                  Clear
                </button>
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="flex-1 sm:flex-none px-5 py-2.5 rounded-full bg-gradient-to-r from-iris to-mint text-ink-0 text-xs font-medium hover:opacity-90 transition-opacity disabled:opacity-50"
                >
                  {isSubmitting ? "Sending..." : "Send Message"}
                </button>
              </div>
            </div>
          </motion.form>

          <motion.div variants={fadeUp} className="flex gap-8 font-mono text-xs tracking-widest uppercase">
            <a
              href="https://github.com/Tejasdagr8"
              target="_blank"
              rel="noreferrer"
              data-track="github"
              className="flex items-center gap-2 text-fog hover:text-mint transition-colors"
            >
              <FaGithub size={14} /> GitHub
            </a>
            <a
              href="https://www.linkedin.com/in/tejas-melkote-390545309/"
              target="_blank"
              rel="noreferrer"
              data-track="linkedin"
              className="flex items-center gap-2 text-fog hover:text-mint transition-colors"
            >
              <FaLinkedin size={14} /> LinkedIn
            </a>
          </motion.div>
        </motion.div>
      </section>

      {/* FOOTER */}
      <footer className="py-6 md:py-8 px-4 border-t border-white/[0.13] flex flex-col sm:flex-row justify-between items-center gap-3 font-mono text-[10px] sm:text-[11px] tracking-widest text-fog uppercase text-center sm:text-left">
        <span className="max-w-xs sm:max-w-none leading-relaxed">© {new Date().getFullYear()} Tejas Melkote — built by hand</span>
        <button
          type="button"
          onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
          className="hover:text-mint transition-colors"
        >
          back to top ↑
        </button>
      </footer>

      {showBackToTop && (
        <button
          type="button"
          onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
          className="fixed bottom-6 right-6 z-[100] p-3 rounded-full border border-[#8C7BFF]/35 bg-[#0B0E16]/90 text-[#5EE6D0] hover:text-white hover:border-[#5EE6D0]/60 hover:bg-[#141929] transition-colors"
          aria-label="Back to top"
        >
          <FaArrowUp size={12} />
        </button>
      )}

    </div>
  );
}

export default App;
