import { writeFileSync } from "node:fs";
import { fileURLToPath } from "node:url";
import { dirname, join } from "node:path";

const __dirname = dirname(fileURLToPath(import.meta.url));
const root = join(__dirname, "..");

const SITE_URL = "https://tejas-melkote.vercel.app";
const ROUTES = [
  { path: "/", priority: "1.0", changefreq: "weekly" },
  { path: "/hire", priority: "0.9", changefreq: "monthly" },
  { path: "/compare", priority: "0.8", changefreq: "monthly" },
];

const lastmod = new Date().toISOString().split("T")[0];

const body = ROUTES.map(
  ({ path, priority, changefreq }) => `  <url>
    <loc>${SITE_URL}${path === "/" ? "/" : path}</loc>
    <lastmod>${lastmod}</lastmod>
    <changefreq>${changefreq}</changefreq>
    <priority>${priority}</priority>
  </url>`
).join("\n");

const xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${body}
</urlset>
`;

const outPath = join(root, "public", "sitemap.xml");
writeFileSync(outPath, xml, "utf8");
console.log(`Wrote ${outPath} (${ROUTES.length} URLs, lastmod ${lastmod})`);
