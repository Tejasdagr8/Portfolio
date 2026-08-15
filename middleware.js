import { patchHtmlOgTags } from "./ogMeta.js";

const BOT_UA =
  /bot|crawler|spider|facebookexternalhit|Facebot|Twitterbot|LinkedInBot|Slackbot|Discordbot|WhatsApp|TelegramBot/i;

export const config = {
  matcher: ["/"],
};

export default async function middleware(request) {
  const url = new URL(request.url);
  const ref = url.searchParams.get("ref");
  if (!ref) return;

  const ua = request.headers.get("user-agent") || "";
  if (!BOT_UA.test(ua)) return;

  const indexUrl = new URL("/index.html", request.url);
  const res = await fetch(indexUrl);
  if (!res.ok) return;

  const html = await res.text();
  const patched = patchHtmlOgTags(html, ref);

  return new Response(patched, {
    status: 200,
    headers: {
      "content-type": "text/html; charset=utf-8",
      "cache-control": "public, max-age=0, must-revalidate",
    },
  });
}
