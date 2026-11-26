// Download counter for the free books (Cloudflare Pages Functions + D1).
// Needs a D1 database bound to this Pages project with the variable name DB.
// Without it the site still works; counts are simply not recorded or shown.

export const BOOK = /^[a-z0-9-]{1,80}$/;

export async function ensureTables(db) {
  await db.batch([
    db.prepare("CREATE TABLE IF NOT EXISTS downloads (book TEXT PRIMARY KEY, count INTEGER NOT NULL DEFAULT 0)"),
    db.prepare("CREATE TABLE IF NOT EXISTS seen (book TEXT NOT NULL, visitor TEXT NOT NULL, day TEXT NOT NULL, PRIMARY KEY (book, visitor, day))")
  ]);
}

async function sha256(text) {
  const buf = await crypto.subtle.digest("SHA-256", new TextEncoder().encode(text));
  return [...new Uint8Array(buf)].map(b => b.toString(16).padStart(2, "0")).join("").slice(0, 32);
}

// Count one download per visitor (IP + browser), per book, per day.
// Only the hash is stored, never the IP address itself.
export async function recordDownload(db, book, request) {
  const day = new Date().toISOString().slice(0, 10);
  const ip = request.headers.get("CF-Connecting-IP") || "";
  const ua = request.headers.get("User-Agent") || "";
  const visitor = await sha256(day + "|" + ip + "|" + ua);
  await ensureTables(db);
  const res = await db.prepare("INSERT OR IGNORE INTO seen (book, visitor, day) VALUES (?, ?, ?)").bind(book, visitor, day).run();
  if (res.meta && res.meta.changes > 0) {
    await db.batch([
      db.prepare("INSERT INTO downloads (book, count) VALUES (?, 1) ON CONFLICT(book) DO UPDATE SET count = count + 1").bind(book),
      db.prepare("DELETE FROM seen WHERE day < ?").bind(day)
    ]);
  }
}
