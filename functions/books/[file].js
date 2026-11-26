import { BOOK, recordDownload } from "../_counter.js";

// Runs for /books/<name>.pdf: serves the PDF as usual and counts the download.
export async function onRequestGet(context) {
  const { request, env, params, waitUntil } = context;
  const response = await context.next();
  const m = /^(.+)\.pdf$/.exec(params.file || "");
  const range = request.headers.get("Range");
  // PDF viewers may ask for the file in pieces; count only the first piece.
  const firstPiece = !range || /^bytes=0-/.test(range);
  if (env.DB && m && BOOK.test(m[1]) && response.ok && firstPiece) {
    waitUntil(recordDownload(env.DB, m[1], request).catch(() => {}));
  }
  return response;
}
