import { getOgMeta, OG_DEFAULT } from "../../ogMeta.js";

export { getOgMeta, OG_DEFAULT as DEFAULT };

export function applyOgMeta(ref) {
  const meta = getOgMeta(ref);
  document.title = meta.title;
  const setMeta = (sel, content) => {
    const el = document.querySelector(sel);
    if (el) el.setAttribute("content", content);
  };
  setMeta('meta[property="og:title"]', meta.title);
  setMeta('meta[property="og:description"]', meta.description);
  setMeta('meta[name="twitter:title"]', meta.title);
  setMeta('meta[name="twitter:description"]', meta.description);
  setMeta('meta[name="description"]', meta.description);
}
