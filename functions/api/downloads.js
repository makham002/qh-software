import { ensureTables } from "../_counter.js";

// GET /api/downloads -> {"book-name": 12, ...}
export async function onRequestGet({ env }) {
  const headers = { "Content-Type": "application/json", "Cache-Control": "public, max-age=60" };
  if (!env.DB) return new Response("{}", { headers });
  try {
    await ensureTables(env.DB);
    const { results } = await env.DB.prepare("SELECT book, count FROM downloads").all();
    return new Response(JSON.stringify(Object.fromEntries(results.map(r => [r.book, r.count]))), { headers });
  } catch {
    return new Response("{}", { headers });
  }
}
