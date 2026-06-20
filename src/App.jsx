import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { FaGithub, FaLinkedin, FaEnvelope, FaPhone, FaDownload, FaExternalLinkAlt, FaArrowUp, FaBars, FaTimes } from "react-icons/fa";
import profile from "./assets/profile.jpeg";
import GradientField from "./components/GradientField";

const fadeUp = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.55, ease: "easeOut" } },
};

const stagger = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.1 } },
};

function SectionHeading({ children }) {
  return (
    <div className="mb-8 md:mb-10">
      <h2 className="text-3xl md:text-4xl font-bold">{children}</h2>
      <div className="mt-2 h-1 w-14 rounded-full bg-gradient-to-r from-blue-500 to-violet-500" />
    </div>
  );
}

const skills = [
  "Python", "Go", "Java", "C/C++", "Ruby on Rails", "JavaScript", "TypeScript",
  "Machine Learning", "Deep Learning", "NLP", "Computer Vision", "LLMs", "RAG", "AI Agents",
  "LangChain", "FastAPI", "Streamlit", "React", "Vue.js", "PostgreSQL", "Redis", "Kafka",
  "Docker", "Jenkins", "ArgoCD", "PowerBI", "Git",
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
  const sectionIds = ["about", "experience", "education", "projects", "skills", "contact"];
  const [activeSection, setActiveSection] = useState("about");
  const [copiedField, setCopiedField] = useState("");
  const [showBackToTop, setShowBackToTop] = useState(false);
  const [scrollProgress, setScrollProgress] = useState(0);
  const [messageForm, setMessageForm] = useState({ name: "", email: "", message: "" });
  const [formError, setFormError] = useState("");
  const [localTime, setLocalTime] = useState("");
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

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

  const submitQuickMessage = (event) => {
    event.preventDefault();
    const name = messageForm.name.trim();
    const email = messageForm.email.trim();
    const message = messageForm.message.trim();

    if (!name || !email || !message) {
      setFormError("Please fill all fields.");
      return;
    }

    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailPattern.test(email)) {
      setFormError("Please enter a valid email address.");
      return;
    }

    setFormError("");
    window.localStorage.removeItem("portfolio-contact-draft");
    const subject = encodeURIComponent(`Portfolio message from ${name}`);
    const body = encodeURIComponent(
      `Hi Tejas,\n\n${message}\n\nFrom,\n${name}\n${email}`
    );
    window.location.href = `mailto:coooltejasdagr@gmail.com?subject=${subject}&body=${body}`;
  };

  return (
    <div className="bg-[#0B0E16] text-white font-sans min-h-screen">
      <div className="fixed top-0 left-0 z-[60] h-[2px] bg-gradient-to-r from-[#8C7BFF] to-[#5EE6D0]" style={{ width: `${scrollProgress}%` }} />

      {/* NAVBAR */}
      <nav className="fixed w-full top-0 z-[100] border-b border-transparent bg-gradient-to-b from-[#0B0E16]/85 to-transparent backdrop-blur-sm">
        <div className={`${sectionContainer} py-4 flex justify-between items-center`}>
          <a href="#" className="text-lg font-bold bg-gradient-to-r from-[#8C7BFF] to-[#5EE6D0] bg-clip-text text-transparent">
            Tejas
          </a>
          <div className="flex items-center gap-4">
            <div className="hidden md:flex gap-5 text-gray-400 text-sm">
              {sectionIds.map((id) => (
                <a
                  key={id}
                  href={`#${id}`}
                  className={`capitalize transition-colors relative group ${
                    activeSection === id ? "text-white" : "hover:text-white"
                  }`}
                >
                  {id}
                  <span
                    className={`absolute -bottom-0.5 left-0 h-px bg-[#5EE6D0] transition-all duration-300 ${
                      activeSection === id ? "w-full" : "w-0 group-hover:w-full"
                    }`}
                  />
                </a>
              ))}
            </div>
            <a
              href="/resume.pdf"
              download
              className="hidden sm:flex items-center gap-1.5 px-3 py-1.5 rounded-lg border border-[#8C7BFF]/40 text-[#8C7BFF] text-xs hover:bg-[#8C7BFF]/10 transition-colors"
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
          <div className="md:hidden fixed inset-0 top-[65px] z-[99] bg-[#0B0E16]/95 backdrop-blur-md">
            <div className="flex flex-col px-6 py-6 gap-1">
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
      <section className="min-h-screen flex flex-col justify-center items-center text-center relative overflow-hidden pt-20">
        <GradientField className="absolute inset-0 w-full h-full block pointer-events-none" />

        <motion.div
          className={`relative z-[2] flex flex-col items-center ${sectionContainer}`}
          initial="hidden"
          animate="visible"
          variants={stagger}
        >
          {/* Profile image with glow */}
          <motion.div variants={fadeUp} className="relative mb-8">
            <div className="absolute inset-0 rounded-full bg-gradient-to-r from-blue-500 to-violet-500 blur-xl opacity-40 scale-110" />
            <img
              src={profile}
              alt="Tejas Melkote — AI/ML Engineer"
              className="relative w-36 h-36 rounded-full object-cover border-2 border-white/10"
            />
          </motion.div>

          <motion.h1
            variants={fadeUp}
            className="text-5xl md:text-7xl font-bold mb-4 bg-gradient-to-br from-white via-blue-50 to-violet-200 bg-clip-text text-transparent leading-tight pb-1"
          >
            Tejas Melkote
          </motion.h1>

          <motion.p variants={fadeUp} className="text-[#5EE6D0] text-xs md:text-sm mb-2 tracking-widest uppercase font-medium">
            Software · AI/ML · Data Engineering
          </motion.p>

          <motion.p variants={fadeUp} className="text-gray-500 text-sm mb-2">
            SDE Intern @ SuperAGI · Bengaluru, India
          </motion.p>

          <motion.p variants={fadeUp} className="text-gray-400 max-w-lg text-sm leading-relaxed mt-2">
            Final-year B.Tech CS (AI) student shipping full-stack production features and building LLM applications, AI agents, and ML pipelines.
          </motion.p>

          <motion.div variants={fadeUp} className="flex gap-4 mt-8">
            <a
              href="#contact"
              className="px-6 py-2.5 rounded-lg bg-gradient-to-r from-blue-600 to-violet-600 text-white text-sm font-medium hover:opacity-90 transition-opacity"
            >
              Get in touch
            </a>
            <a
              href="/resume.pdf"
              download
              className="px-6 py-2.5 rounded-lg border border-white/15 text-gray-300 text-sm font-medium hover:bg-white/5 hover:border-white/25 transition-all"
            >
              Download CV
            </a>
          </motion.div>

          <motion.div variants={fadeUp} className="flex gap-5 mt-8 text-gray-600">
            <a href="https://github.com/Tejasdagr8" target="_blank" rel="noreferrer" className="hover:text-white transition-colors text-xl">
              <FaGithub />
            </a>
            <a href="https://www.linkedin.com/in/tejas-melkote-390545309/" target="_blank" rel="noreferrer" className="hover:text-blue-400 transition-colors text-xl">
              <FaLinkedin />
            </a>
            <a href="mailto:coooltejasdagr@gmail.com" className="hover:text-blue-400 transition-colors text-xl">
              <FaEnvelope />
            </a>
          </motion.div>
        </motion.div>

        {/* Scroll indicator */}
        <motion.div
          className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-1.5 text-gray-700"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.4, duration: 0.8 }}
        >
          <span className="tracking-widest uppercase text-[10px]">Scroll</span>
          <motion.div
            className="w-px h-10 bg-gradient-to-b from-gray-700 to-transparent"
            animate={{ scaleY: [0.4, 1, 0.4], opacity: [0.4, 1, 0.4] }}
            transition={{ repeat: Infinity, duration: 2.5, ease: "easeInOut" }}
          />
        </motion.div>
      </section>

      {/* ABOUT */}
      <motion.section
        id="about"
        className={`py-24 ${sectionContainer}`}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-80px" }}
        variants={fadeUp}
      >
        <SectionHeading>About Me</SectionHeading>
        <p className="text-gray-400 leading-8 max-w-4xl">
          Final-year B.Tech Computer Science (AI) student with hands-on experience deploying full-stack features in{" "}
          <span className="text-gray-200">Go, Ruby on Rails, and Vue.js</span>, and building LLM applications, AI agents, and ML pipelines.
          I work at the intersection of models and production — from training loops and agent orchestration to the APIs and interfaces users actually touch.
          Currently seeking roles in software engineering, AI/ML, or data engineering.
        </p>
      </motion.section>

      {/* EXPERIENCE */}
      <section id="experience" className={`py-24 ${sectionContainer}`}>
        <motion.div initial="hidden" whileInView="visible" viewport={{ once: true, margin: "-80px" }} variants={fadeUp}>
          <SectionHeading>Experience</SectionHeading>
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
              className="p-6 rounded-2xl border border-white/[0.08] bg-white/[0.02] hover:bg-white/[0.04] hover:border-blue-500/25 transition-all duration-300"
            >
              <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-1 mb-3">
                <div>
                  <h3 className="font-semibold text-white">{exp.company}</h3>
                  <p className="text-blue-400 text-sm">{exp.role}</p>
                </div>
                <div className="text-gray-600 text-sm sm:text-right shrink-0">
                  <p>{exp.period}</p>
                  <p>{exp.location}</p>
                </div>
              </div>
              <p className="text-gray-500 text-sm leading-7 mb-4">{exp.description}</p>
              <div className="flex flex-wrap gap-2">
                {exp.tags.map((tag) => (
                  <span key={tag} className="px-2.5 py-0.5 rounded-md text-xs bg-blue-500/10 text-blue-300 border border-blue-500/20">
                    {tag}
                  </span>
                ))}
              </div>
            </motion.div>
          ))}
        </motion.div>
      </section>

      {/* EDUCATION */}
      <section id="education" className={`py-24 ${sectionContainer}`}>
        <motion.div initial="hidden" whileInView="visible" viewport={{ once: true, margin: "-80px" }} variants={fadeUp}>
          <SectionHeading>Education</SectionHeading>
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
              className="flex items-center justify-between p-5 rounded-2xl border border-white/[0.08] bg-white/[0.02] hover:bg-white/[0.04] hover:border-violet-500/25 transition-all duration-300"
            >
              <div>
                <h3 className="font-semibold text-white text-sm">{edu.degree}</h3>
                <p className="text-gray-600 text-xs mt-0.5">
                  {edu.institution}
                  {edu.detail && ` • ${edu.detail}`}
                </p>
              </div>
              <span className="text-violet-400 font-semibold text-sm shrink-0 ml-4">{edu.grade}</span>
            </motion.div>
          ))}
        </motion.div>
      </section>

      {/* PROJECTS */}
      <section id="projects" className={`py-24 ${sectionContainer}`}>
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-80px" }}
          variants={fadeUp}
        >
          <SectionHeading>Projects</SectionHeading>
        </motion.div>
        <motion.div
          className="grid md:grid-cols-2 lg:grid-cols-3 gap-5"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-80px" }}
          variants={stagger}
        >
          {projects.map((project, i) => (
            <motion.div
              key={`${project.title}-${i}`}
              variants={fadeUp}
              className="group p-5 rounded-2xl border border-white/[0.08] bg-white/[0.02] hover:bg-white/[0.04] hover:border-blue-500/20 transition-all duration-300 flex flex-col gap-3"
            >
              <h3 className="font-semibold text-white text-base leading-snug group-hover:text-blue-300 transition-colors duration-200">
                {project.title}
              </h3>
              <p className="text-gray-400 text-sm leading-6 flex-1">{project.description}</p>
              <div className="flex flex-wrap gap-1.5">
                {project.tags.map((tag) => (
                  <span key={tag} className="px-2 py-0.5 rounded text-[11px] bg-white/5 text-gray-400 border border-white/[0.08]">
                    {tag}
                  </span>
                ))}
              </div>
              {project.link && (
                <a
                  href={project.link}
                  target="_blank"
                  rel="noreferrer"
                  className="flex items-center gap-1.5 text-[11px] text-blue-400 hover:text-blue-300 transition-colors mt-1 w-fit"
                >
                  <FaExternalLinkAlt size={10} /> View Project
                </a>
              )}
            </motion.div>
          ))}
        </motion.div>
      </section>

      {/* SKILLS */}
      <section id="skills" className={`py-24 ${sectionContainer}`}>
        <motion.div initial="hidden" whileInView="visible" viewport={{ once: true, margin: "-80px" }} variants={fadeUp}>
          <SectionHeading>Skills</SectionHeading>
        </motion.div>
        <motion.div
          className="flex flex-wrap gap-2.5"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-80px" }}
          variants={stagger}
        >
          {skills.map((skill) => (
            <motion.span
              key={skill}
              variants={fadeUp}
              className="px-4 py-2 rounded-full text-sm border border-white/[0.08] bg-white/[0.02] text-gray-400 hover:border-blue-500/40 hover:text-white hover:bg-blue-500/10 transition-all duration-200 cursor-default"
            >
              {skill}
            </motion.span>
          ))}
        </motion.div>
      </section>

      {/* LANGUAGES */}
      <section className={`py-16 ${sectionContainer}`}>
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-80px" }}
          variants={fadeUp}
        >
          <SectionHeading>Languages</SectionHeading>
          <div className="flex flex-wrap gap-4">
            {[
              { lang: "English", level: "Native" },
              { lang: "Hindi", level: "Proficient" },
              { lang: "Kannada", level: "Advanced" },
            ].map(({ lang, level }) => (
              <div key={lang} className="px-5 py-3 rounded-xl border border-white/[0.08] bg-white/[0.02]">
                <p className="text-white text-sm font-medium">{lang}</p>
                <p className="text-gray-600 text-xs mt-0.5">{level}</p>
              </div>
            ))}
          </div>
        </motion.div>
      </section>

      {/* CONTACT */}
      <section id="contact" className={`py-24 ${sectionContainer}`}>
        <motion.div
          className="flex flex-col items-center text-center"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-80px" }}
          variants={stagger}
        >
          <motion.div variants={fadeUp} className="flex flex-col items-center mb-8">
            <h2 className="text-3xl md:text-4xl font-bold">Get in Touch</h2>
            <div className="mt-2 h-1 w-14 rounded-full bg-gradient-to-r from-blue-500 to-violet-500" />
            <p className="text-gray-600 text-sm mt-4">
              Open to opportunities, collaborations, and conversations.
            </p>
            <p className="text-gray-500 text-xs mt-2">
              Local time (IST): {localTime}
            </p>
          </motion.div>

          <motion.div variants={fadeUp} className="flex flex-col sm:flex-row gap-3 mb-8 w-full max-w-2xl">
            <div className="flex items-center gap-3 px-5 py-3.5 rounded-xl border border-white/[0.08] bg-white/[0.02] hover:bg-white/[0.05] hover:border-blue-500/25 transition-all duration-200 group flex-1">
              <FaEnvelope className="text-blue-400 shrink-0" />
              <a href="mailto:coooltejasdagr@gmail.com" className="text-gray-400 text-sm group-hover:text-white transition-colors truncate flex-1">
                coooltejasdagr@gmail.com
              </a>
              <button
                type="button"
                onClick={() => copyToClipboard("coooltejasdagr@gmail.com", "email")}
                className="text-[11px] px-2 py-1 rounded border border-white/[0.12] text-gray-400 hover:text-white hover:border-white/[0.28] transition-colors"
              >
                {copiedField === "email" ? "Copied" : copiedField === "error-email" ? "Failed" : "Copy"}
              </button>
            </div>
            <div className="flex items-center gap-3 px-5 py-3.5 rounded-xl border border-white/[0.08] bg-white/[0.02] hover:bg-white/[0.05] hover:border-blue-500/25 transition-all duration-200 group flex-1">
              <FaPhone className="text-blue-400 shrink-0" />
              <a href="tel:+917019280175" className="text-gray-400 text-sm group-hover:text-white transition-colors flex-1">
                +91 7019280175
              </a>
              <button
                type="button"
                onClick={() => copyToClipboard("+917019280175", "phone")}
                className="text-[11px] px-2 py-1 rounded border border-white/[0.12] text-gray-400 hover:text-white hover:border-white/[0.28] transition-colors"
              >
                {copiedField === "phone" ? "Copied" : copiedField === "error-phone" ? "Failed" : "Copy"}
              </button>
            </div>
          </motion.div>

          <motion.form
            variants={fadeUp}
            onSubmit={submitQuickMessage}
            className="w-full max-w-2xl rounded-2xl border border-white/[0.08] bg-white/[0.02] p-4 mb-8 text-left"
          >
            <p className="text-sm text-gray-300 mb-3">Quick message</p>
            <div className="grid sm:grid-cols-2 gap-3 mb-3">
              <input
                type="text"
                value={messageForm.name}
                onChange={(e) => setMessageForm((prev) => ({ ...prev, name: e.target.value }))}
                placeholder="Your name"
                className="rounded-lg border border-white/[0.08] bg-white/[0.02] px-3 py-2 text-sm text-gray-200 placeholder:text-gray-600 outline-none focus:border-blue-500/40"
              />
              <input
                type="email"
                value={messageForm.email}
                onChange={(e) => setMessageForm((prev) => ({ ...prev, email: e.target.value }))}
                placeholder="Your email"
                className="rounded-lg border border-white/[0.08] bg-white/[0.02] px-3 py-2 text-sm text-gray-200 placeholder:text-gray-600 outline-none focus:border-blue-500/40"
              />
            </div>
            <textarea
              value={messageForm.message}
              onChange={(e) => setMessageForm((prev) => ({ ...prev, message: e.target.value }))}
              placeholder="Write your message..."
              rows={4}
              className="w-full rounded-lg border border-white/[0.08] bg-white/[0.02] px-3 py-2 text-sm text-gray-200 placeholder:text-gray-600 outline-none focus:border-blue-500/40"
            />
            <div className="mt-3 flex items-center justify-between gap-3">
              <p className="text-xs text-red-400 min-h-4">{formError}</p>
              <div className="flex items-center gap-2">
                <button
                  type="button"
                  onClick={() => {
                    const cleared = { name: "", email: "", message: "" };
                    setMessageForm(cleared);
                    setFormError("");
                    window.localStorage.removeItem("portfolio-contact-draft");
                  }}
                  className="px-3 py-2 rounded-lg border border-white/[0.15] text-gray-300 text-xs hover:text-white hover:border-white/[0.28] transition-colors"
                >
                  Clear
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 rounded-lg bg-gradient-to-r from-blue-600 to-violet-600 text-white text-xs font-medium hover:opacity-90 transition-opacity"
                >
                  Send via Email
                </button>
              </div>
            </div>
          </motion.form>

          <motion.div variants={fadeUp} className="flex gap-6">
            <a
              href="https://github.com/Tejasdagr8"
              target="_blank"
              rel="noreferrer"
              className="flex items-center gap-2 text-gray-600 hover:text-white transition-colors text-sm"
            >
              <FaGithub size={16} /> GitHub
            </a>
            <a
              href="https://www.linkedin.com/in/tejas-melkote-390545309/"
              target="_blank"
              rel="noreferrer"
              className="flex items-center gap-2 text-gray-600 hover:text-blue-400 transition-colors text-sm"
            >
              <FaLinkedin size={16} /> LinkedIn
            </a>
          </motion.div>
        </motion.div>
      </section>

      {/* FOOTER */}
      <footer className="py-6 text-center text-gray-700 text-xs border-t border-white/[0.05]">
        © {new Date().getFullYear()} Tejas Melkote. All rights reserved.
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
