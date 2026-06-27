import { useCallback, useEffect, useRef, useState } from "react";
import { track } from "../lib/analytics";
import { playSound, setSoundEnabled } from "../lib/sounds";

const PROMPT = "tejas@portfolio ~ % ";

const FILES = {
  "about.txt": `Full-stack curiosity, model-first thinking.
Most engineers pick a layer — I work at the seam where models meet users, latency, and edge cases.
Focus: ML systems end-to-end | Currently: LLM agents & RAG | Internship: SDE @ SuperAGI`,

  "superagi.txt": `Software Development Engineer Intern · Jan 2026 – Jun 2026
SuperAGI · Bangalore, India

Built marketing campaign features (Email & WhatsApp) in production.
Stack: Go, Ruby on Rails, Vue.js, Jenkins, ArgoCD, Sidekiq, Redis, Kafka.
Deployed 15+ PRs including email-campaign validation and WhatsApp test-send.`,

  "cirruslabs.txt": `AI / ML Intern · May 2025 – Jul 2025
CirrusLabs Pvt Ltd · Bengaluru

Built LLM chatbots, AI agents, and ML pipelines for internal tooling.
Packaged models behind Streamlit and FastAPI interfaces.`,

  "education.txt": `B.Tech CS (AI) · MIT Manipal · 2022–2026 · CGPA 8.46
12th · Narayana PU College · 2022 · 90.33%
10th · Frank Anthony Public School · 2020 · 95%`,

  "contact.txt": `Email:  coooltejasdagr@gmail.com
Phone:  +91 7019280175
GitHub:  github.com/Tejasdagr8
LinkedIn: linkedin.com/in/tejas-melkote-390545309`,

  "whoami.txt": `Tejas Melkote
AI/ML Engineer & Full-Stack Developer
B.Tech CS (AI) · MIT Manipal · CGPA 8.46
SDE Intern @ SuperAGI · Bengaluru, IN
Open to opportunities`,
};

function slugify(title) {
  return title
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-|-$/g, "");
}

export default function Terminal({ open, onClose, sections, projects, onNavigate }) {
  const [lines, setLines] = useState([]);
  const [input, setInput] = useState("");
  const [cmdHistory, setCmdHistory] = useState([]);
  const [historyIdx, setHistoryIdx] = useState(-1);
  const inputRef = useRef(null);
  const scrollRef = useRef(null);
  const booted = useRef(false);

  const writeln = useCallback((text, type = "output") => {
    setLines((prev) => [...prev, { text, type }]);
  }, []);

  const runCommand = useCallback(
    (raw) => {
      const trimmed = raw.trim();
      if (!trimmed) return;

      writeln(`${PROMPT}${trimmed}`, "input");
      playSound("terminal");
      setCmdHistory((prev) => [trimmed, ...prev.slice(0, 49)]);
      setHistoryIdx(-1);

      const [cmd, ...rest] = trimmed.split(/\s+/);
      const arg = rest.join(" ").toLowerCase();
      const argRaw = rest.join(" ");

      switch (cmd.toLowerCase()) {
        case "help":
          writeln(`Commands:
  help              show this message
  ls [projects]     list sections or projects
  cat <file>        read a file (try: about.txt, superagi.txt)
  cd <section>      jump to section (about, projects, contact…)
  open <target>     open link (resume, github, linkedin, or project slug)
  skills            print tech stack
  contact           show contact info
  whoami            about Tejas
  speedrun          recruiter tour (or press R)
  sound on|off      toggle UI sounds
  clear             clear terminal
  exit              close terminal

Tip: press ⌘K or Ctrl+K anytime to toggle.`);
          break;

        case "ls":
          if (arg === "projects") {
            projects.forEach((p, i) => {
              writeln(`  P-${String(i + 1).padStart(2, "0")}  ${slugify(p.title).padEnd(28)}  ${p.tags.join(", ")}`);
            });
          } else {
            sections.forEach((s) => writeln(`  ${s}/`));
            writeln("");
            writeln('  run "ls projects" for project slugs');
          }
          break;

        case "cat": {
          const file = argRaw.trim().toLowerCase();
          const content = FILES[file];
          if (content) {
            content.split("\n").forEach((line) => writeln(`  ${line}`));
          } else {
            writeln(`cat: ${argRaw || "(no file)"}: No such file. Try: about.txt, superagi.txt, contact.txt`);
          }
          break;
        }

        case "cd": {
          const target = arg.replace(/^\//, "").replace(/\/$/, "");
          if (sections.includes(target)) {
            onNavigate(target);
            writeln(`→ navigated to #${target}`);
            setTimeout(onClose, 400);
          } else {
            writeln(`cd: ${target || "(no section)"}: No such section. Available: ${sections.join(", ")}`);
          }
          break;
        }

        case "open": {
          const targets = {
            resume: "/resume.pdf",
            github: "https://github.com/Tejasdagr8",
            linkedin: "https://www.linkedin.com/in/tejas-melkote-390545309/",
            email: "mailto:coooltejasdagr@gmail.com",
          };
          const project = projects.find((p) => slugify(p.title).includes(arg) || arg.includes(slugify(p.title)));
          if (targets[arg]) {
            if (arg === "resume") {
              const a = document.createElement("a");
              a.href = targets[arg];
              a.download = "";
              a.click();
            } else {
              window.open(targets[arg], "_blank", "noopener,noreferrer");
            }
            writeln(`→ opened ${arg}`);
            track("click", { label: `terminal_open_${arg}` });
          } else if (project?.link) {
            window.open(project.link, "_blank", "noopener,noreferrer");
            writeln(`→ opened ${project.title}`);
            track("click", { label: `terminal_open_project:${project.title}` });
          } else {
            writeln(`open: unknown target "${argRaw}". Try: resume, github, linkedin, or a project slug`);
          }
          break;
        }

        case "skills":
          writeln("  // machine learning");
          writeln("  PyTorch · Transformers · RAG · LLM pipelines · Computer Vision");
          writeln("  // full stack");
          writeln("  React · Vue · TypeScript · Python · FastAPI · Go · Rails");
          writeln("  // infrastructure");
          writeln("  Docker · CI/CD · Jenkins · ArgoCD · Redis · Kafka · Vercel");
          break;

        case "contact":
          FILES["contact.txt"].split("\n").forEach((line) => writeln(`  ${line}`));
          break;

        case "whoami":
          FILES["whoami.txt"].split("\n").forEach((line) => writeln(`  ${line}`));
          break;

        case "speedrun":
          window.dispatchEvent(new CustomEvent("start-speedrun"));
          writeln("→ recruiter speed run started (press R anytime)");
          setTimeout(onClose, 300);
          break;

        case "sound":
          if (arg === "on") {
            setSoundEnabled(true);
            writeln("  UI sounds enabled");
          } else if (arg === "off") {
            setSoundEnabled(false);
            writeln("  UI sounds disabled");
          } else {
            writeln('  Usage: sound on | sound off');
          }
          break;

        case "clear":
          setLines([]);
          break;

        case "exit":
        case "quit":
        case "q":
          onClose();
          break;

        case "sudo":
          if (arg === "hire tejas" || arg === "hire-me tejas") {
            playSound("success");
            writeln("  Permission granted. Redirecting to contact…");
            onNavigate("contact");
            setTimeout(onClose, 600);
          } else if (arg === "legendary" || arg === "unlock") {
            sessionStorage.setItem("portfolio_legendary_mode", "1");
            document.body.dataset.legendary = "true";
            window.dispatchEvent(new CustomEvent("legendary-unlock"));
            writeln("  Legendary mode activated. Gradients intensified.");
          } else {
            writeln("  Nice try. Try: sudo hire tejas");
          }
          break;

        case "date":
          writeln(`  ${new Date().toLocaleString("en-IN", { timeZone: "Asia/Kolkata" })} IST`);
          break;

        case "echo":
          writeln(`  ${argRaw}`);
          break;

        default:
          playSound("error");
          writeln(`command not found: ${cmd}. Type "help" for available commands.`);
      }
    },
    [writeln, sections, projects, onNavigate, onClose]
  );

  useEffect(() => {
    if (!open) return;
    inputRef.current?.focus();
    if (!booted.current) {
      booted.current = true;
      setLines([
        { text: "TejasOS v1.0 — portfolio shell", type: "banner" },
        { text: 'Type "help" to explore. Press Esc to close.', type: "muted" },
        { text: "", type: "output" },
      ]);
      track("click", { label: "terminal_open" });
    }
  }, [open]);

  useEffect(() => {
    scrollRef.current?.scrollTo({ top: scrollRef.current.scrollHeight });
  }, [lines]);

  useEffect(() => {
    if (!open) return;
    const onKey = (e) => {
      if (e.key === "Escape") {
        e.preventDefault();
        onClose();
      }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open, onClose]);

  const onSubmit = (e) => {
    e.preventDefault();
    runCommand(input);
    setInput("");
  };

  const onInputKeyDown = (e) => {
    if (e.key === "ArrowUp") {
      e.preventDefault();
      if (cmdHistory.length === 0) return;
      const next = Math.min(historyIdx + 1, cmdHistory.length - 1);
      setHistoryIdx(next);
      setInput(cmdHistory[next]);
    } else if (e.key === "ArrowDown") {
      e.preventDefault();
      if (historyIdx <= 0) {
        setHistoryIdx(-1);
        setInput("");
        return;
      }
      const next = historyIdx - 1;
      setHistoryIdx(next);
      setInput(cmdHistory[next]);
    }
  };

  if (!open) return null;

  return (
    <div
      className="terminal-overlay fixed inset-0 z-[200] flex items-start justify-center p-3 sm:p-8 md:pt-[12vh]"
      role="dialog"
      aria-label="Portfolio terminal"
      onClick={onClose}
    >
      <div
        className="terminal-window w-full max-w-2xl rounded-xl border border-white/[0.12] bg-[#0a0d14]/95 backdrop-blur-md shadow-2xl overflow-hidden"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex items-center gap-2 px-4 py-3 border-b border-white/[0.08] bg-[#0B0E16]/80">
          <span className="w-3 h-3 rounded-full bg-red-500/80" />
          <span className="w-3 h-3 rounded-full bg-amber-400/80" />
          <span className="w-3 h-3 rounded-full bg-emerald-400/80" />
          <span className="ml-3 font-mono text-[10px] sm:text-xs text-fog tracking-wider">tejas@portfolio — zsh</span>
          <button
            type="button"
            onClick={onClose}
            className="ml-auto font-mono text-[10px] text-fog hover:text-mint transition-colors"
          >
            esc
          </button>
        </div>

        <div ref={scrollRef} className="terminal-body h-[min(60vh,420px)] overflow-y-auto p-4 font-mono text-xs sm:text-sm leading-relaxed">
          {lines.map((line, i) => (
            <div
              key={i}
              className={
                line.type === "input"
                  ? "text-mint"
                  : line.type === "banner"
                    ? "text-paper font-medium mb-1"
                    : line.type === "muted"
                      ? "text-fog/70 mb-3"
                      : "text-fog whitespace-pre-wrap"
              }
            >
              {line.text}
            </div>
          ))}
          <form onSubmit={onSubmit} className="flex items-center gap-0 mt-1">
            <span className="text-mint shrink-0 select-none">{PROMPT}</span>
            <input
              ref={inputRef}
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={onInputKeyDown}
              className="flex-1 bg-transparent outline-none text-paper caret-mint min-w-0"
              spellCheck={false}
              autoComplete="off"
              autoCorrect="off"
              autoCapitalize="off"
            />
          </form>
        </div>
      </div>
    </div>
  );
}
