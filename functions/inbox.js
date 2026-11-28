// /inbox : private page to read contact-form messages.
// Set a secret named INBOX_KEY in Cloudflare (Pages project > Settings >
// Variables and Secrets). Open /inbox and enter that key to see messages.
import { ensureMessages } from "./api/contact.js";

const esc = s => String(s ?? "").replace(/[&<>"']/g, c => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c]));
const page = (inner, status = 200) => new Response(`<!doctype html><html lang="en"><head><meta charset="utf-8">
<meta name="viewport" content="width=device-width,initial-scale=1"><meta name="robots" content="noindex,nofollow">
<title>Messages · QH Soft</title><link rel="icon" href="/favicon.svg" type="image/svg+xml"><link rel="stylesheet" href="/styles.css?v=18"></head>
<body class="inbox"><main class="wrap">${inner}</main></body></html>`, {
  status, headers: { "Content-Type": "text/html; charset=utf-8", "Cache-Control": "no-store", "X-Robots-Tag": "noindex" }
});
const loginForm = note => `<h1>Messages</h1>${note ? `<p class="formmsg bad">${esc(note)}</p>` : ""}
<form method="post" action="/inbox"><label for="key">Inbox key<input id="key" name="key" type="password" required autocomplete="current-password"></label><button class="btn" type="submit">Open</button></form>`;

async function same(a, b) {
  const enc = new TextEncoder();
  const [x, y] = await Promise.all([a, b].map(v => crypto.subtle.digest("SHA-256", enc.encode(v))));
  const p = new Uint8Array(x), q = new Uint8Array(y);
  let d = 0; for (let i = 0; i < p.length; i++) d |= p[i] ^ q[i];
  return d === 0;
}
const waLink = phone => {
  const d = String(phone || "").replace(/\D/g, "");
  if (d.length < 10) return "";
  return "https://wa.me/" + (d.startsWith("92") ? d : "92" + d.replace(/^0/, ""));
};

export async function onRequestGet() {
  return page(loginForm());
}

export async function onRequestPost({ request, env }) {
  if (!env.INBOX_KEY) return page(loginForm("The inbox key hasn't been set up yet in Cloudflare."), 503);
  const form = await request.formData();
  const key = String(form.get("key") || "");
  if (!(await same(key, env.INBOX_KEY))) return page(loginForm("Wrong key."), 401);
  if (!env.DB) return page("<h1>Messages</h1><p>The database isn't connected.</p>", 503);
  await ensureMessages(env.DB);
  const { results } = await env.DB.prepare("SELECT * FROM messages ORDER BY id DESC LIMIT 200").all();
  const items = results.map(m => {
    const wa = waLink(m.phone);
    const when = new Date(m.created).toLocaleString("en-GB", { timeZone: "Asia/Karachi", dateStyle: "medium", timeStyle: "short" });
    return `<article class="msg"><div class="msg-head"><b>${esc(m.name)}</b><span class="label">${esc(m.topic)}</span><span class="tiny-muted">${esc(when)}</span></div>
<p class="msg-body">${esc(m.message)}</p>
<div class="msg-reply">${m.phone ? (wa ? `<a class="copy-btn" href="${esc(wa)}" target="_blank" rel="noopener">WhatsApp ${esc(m.phone)}</a>` : `<span>${esc(m.phone)}</span>`) : ""}${m.email ? `<a class="copy-btn" href="mailto:${esc(m.email)}">Email ${esc(m.email)}</a>` : ""}</div></article>`;
  }).join("");
  return page(`<h1>Messages</h1><p class="tiny-muted">${results.length} message${results.length === 1 ? "" : "s"}, newest first.</p>${items || "<p>No messages yet.</p>"}`);
}
