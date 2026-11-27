import { BOOK, recordDownload } from "../_counter.js";

// Runs for /downloads/<name>.apk: serves the app file as usual and counts the download.
// Counts appear in /api/downloads next to the books (key = file name without .apk).
export async function onRequestGet(context) {
  const { request, env, params, waitUntil } = context;
  const response = await context.next();
  const m = /^(.+)\.apk$/.exec(params.file || "");
  const range = request.headers.get("Range");
  const firstPiece = !range || /^bytes=0-/.test(range);
  if (env.DB && m && BOOK.test(m[1]) && response.ok && firstPiece) {
    waitUntil(recordDownload(env.DB, m[1], request).catch(() => {}));
  }
  return response;
}
