import { useEffect } from "react";
import { absoluteUrl } from "../data/seo";

function setMeta(selector, content) {
  const el = document.querySelector(selector);
  if (el && content) el.setAttribute("content", content);
}

function setLink(rel, href) {
  const el = document.querySelector(`link[rel="${rel}"]`);
  if (el && href) el.setAttribute("href", href);
}

export default function SeoHead({ title, description, path = "/" }) {
  useEffect(() => {
    document.title = title;
    const url = absoluteUrl(path);
    setMeta('meta[name="description"]', description);
    setMeta('meta[property="og:title"]', title);
    setMeta('meta[property="og:description"]', description);
    setMeta('meta[property="og:url"]', url);
    setMeta('meta[name="twitter:title"]', title);
    setMeta('meta[name="twitter:description"]', description);
    setLink("canonical", url);
  }, [title, description, path]);

  return null;
}
