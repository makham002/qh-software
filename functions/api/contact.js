// POST /api/contact  -> saves a contact-form message in D1 (binding DB).
// Read the messages at https://qazisoft.com/inbox (needs the INBOX_KEY secret).

export async function ensureMessages(db) {
  await db.batch([
    db.prepare("CREATE TABLE IF NOT EXISTS messages (id INTEGER PRIMARY KEY AUTOINCREMENT, created TEXT NOT NULL, name TEXT NOT NULL, phone TEXT, email TEXT, topic TEXT, message TEXT NOT NULL, visitor TEXT, read INTEGER NOT NULL DEFAULT 0)"),
    db.prepare("CREATE INDEX IF NOT EXISTS messages_visitor ON messages (visitor, created)")
  ]);
}

const json = (obj, status = 200) => new Response(JSON.stringify(obj), {
  status, headers: { "Content-Type": "application/json", "Cache-Control": "no-store" }
});
const clean = (v, max) => String(v ?? "").replace(/[\u0000-\u0008\u000B\u000C\u000E-\u001F\u007F]/g, "").trim().slice(0, max);

async function sha256(text) {
  const buf = await crypto.subtle.digest("SHA-256", new TextEncoder().encode(text));
  return [...new Uint8Array(buf)].map(b => b.toString(16).padStart(2, "0")).join("").slice(0, 32);
}

export async function onRequestPost({ request, env }) {
  if (!env.DB) return json({ ok: false, error: "Messages can't be received right now." }, 503);
  const origin = request.headers.get("Origin");
  if (origin && new URL(origin).host !== new URL(request.url).host) return json({ ok: false }, 403);
  if (Number(request.headers.get("Content-Length") || 0) > 20000) return json({ ok: false, error: "That message is too long." }, 413);

  let body;
  try { body = await request.json(); } catch { return json({ ok: false }, 400); }
  // hidden "website" field: people never fill it, spam bots do
  if (clean(body.website, 200)) return json({ ok: true });

  const name = clean(body.name, 100), phone = clean(body.phone, 30), email = clean(body.email, 120);
  const topic = clean(body.topic, 60), message = clean(body.message, 3000);
  if (!name || !message) return json({ ok: false, error: "Please add your name and a message." }, 400);
  if (!phone && !email) return json({ ok: false, error: "Please add your WhatsApp number or email so I can reply." }, 400);
  if (email && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) return json({ ok: false, error: "That email address doesn't look right." }, 400);

  try {
    await ensureMessages(env.DB);
    const now = new Date().toISOString();
    const visitor = await sha256(now.slice(0, 10) + "|" + (request.headers.get("CF-Connecting-IP") || ""));
    // at most 5 messages per visitor per day
    const { n } = await env.DB.prepare("SELECT COUNT(*) AS n FROM messages WHERE visitor = ? AND created >= ?")
      .bind(visitor, now.slice(0, 10)).first();
    if (n >= 5) return json({ ok: false, error: "You've sent several messages today." }, 429);
    await env.DB.prepare("INSERT INTO messages (created, name, phone, email, topic, message, visitor) VALUES (?, ?, ?, ?, ?, ?, ?)")
      .bind(now, name, phone, email, topic, message, visitor).run();
    return json({ ok: true });
  } catch {
    return json({ ok: false }, 500);
  }
}
