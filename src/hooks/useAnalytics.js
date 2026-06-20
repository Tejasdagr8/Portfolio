import { useEffect, useRef } from "react";
import { track } from "../lib/analytics";

const SECTIONS = ["about", "experience", "education", "projects", "skills", "contact"];
const SCROLL_MARKS = [25, 50, 75, 100];

export default function useAnalytics() {
  const seenSections = useRef(new Set());
  const scrollMarks = useRef(new Set());

  useEffect(() => {
    track("page_view");

    const onClick = (event) => {
      const el = event.target.closest("[data-track]");
      if (el?.dataset.track) {
        track("click", { label: el.dataset.track });
      }
    };

    document.addEventListener("click", onClick);

    const sectionObservers = SECTIONS.map((id) => {
      const el = document.getElementById(id);
      if (!el) return null;

      const observer = new IntersectionObserver(
        ([entry]) => {
          if (entry.isIntersecting && !seenSections.current.has(id)) {
            seenSections.current.add(id);
            track("section_view", { label: id });
          }
        },
        { threshold: 0.4 }
      );

      observer.observe(el);
      return observer;
    }).filter(Boolean);

    const onScroll = () => {
      const total = document.documentElement.scrollHeight - window.innerHeight;
      if (total <= 0) return;
      const pct = Math.round((window.scrollY / total) * 100);

      for (const mark of SCROLL_MARKS) {
        if (pct >= mark && !scrollMarks.current.has(mark)) {
          scrollMarks.current.add(mark);
          track("scroll_depth", { label: `${mark}%` });
        }
      }
    };

    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();

    return () => {
      document.removeEventListener("click", onClick);
      sectionObservers.forEach((observer) => observer.disconnect());
      window.removeEventListener("scroll", onScroll);
    };
  }, []);
}
