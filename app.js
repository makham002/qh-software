/* ---------------------------------------------------------------
   ADD OR EDIT PRODUCTS HERE.
   To add a new category (e.g. "Web tools" or "Templates"), add one
   object to CATEGORIES. It gets its own section and menu link.
   To add a product, add an entry to that category's "products".
---------------------------------------------------------------- */
const CATEGORIES = [
  {
    id: "windows", name: "Windows software", short: "Windows",
    blurb: "Desktop software for Windows 10 and 11. Pay once for lifetime access.",
    products: [
      { name: "Tailors", price: 10000, priceNote: "Lifetime access",
        review: "https://g.page/r/CXBnrS7RdWSeEBM/review",
        tags: ["Windows desktop", "Works fully offline", "Urdu interface"],
        desc: "Complete shop management for tailors, in Urdu. Keep every customer's measurements, track each order from booking to delivery, and see the day's earnings at a glance.",
        features: [
          "Customer management: add, search and track all customers",
          "Order tracking: order number, karegar, delivery date and status (pending, ready, delivered)",
          "Full suit measurements with tabs for Qameez/Shalwar, Coat and Waistcoat",
          "AI measurement scan: photograph a handwritten slip and the measurements fill in automatically",
          "WhatsApp notifications: tell customers their order is ready in one click",
          "Printable order receipt for every customer",
          "Dashboard with daily stats, pending orders and revenue",
          "Automatic weekly backup of all your data",
          "Syncs with the Tailors Android app, so your phone has the same customers and orders",
          "Offline license, locked to your computer"
        ],
        shots: [
          { src: "/img/tailors-dashboard.webp", caption: "Dashboard: customers, orders, ready and pending, earnings" },
          { src: "/img/tailors-orders.webp", caption: "All orders with karegar, dates, status and balance" },
          { src: "/img/tailors-measurements.webp", caption: "Measurements with Qameez/Shalwar, Coat and Waistcoat tabs, plus AI scan" },
          { src: "/img/tailors-customers.webp", caption: "Search customers by name or mobile number" },
          { src: "/img/tailors-backup.webp", caption: "Automatic weekly backup and Excel export" }
        ] }
    ]
  },
  {
    id: "mobile", name: "Mobile software", short: "Mobile",
    blurb: "Android apps. Download the app here; your license key arrives on WhatsApp after payment.",
    products: [
      { name: "Tailors for Android", price: 5000, priceNote: "Lifetime access",
        addon: { name: "AI photo-fill", price: 200, per: "month", note: "optional" },
        phone: true,
        // To release a new version: replace /downloads/tailors-android.apk (same file name)
        download: { href: "/downloads/tailors-android.apk", id: "tailors-android", label: "Download app (APK)" },
        tags: ["Android phone", "Urdu interface", "Syncs with Tailors for Windows"],
        desc: "The Tailors shop app on your phone, in Urdu. Take a customer's measurements at the counter, check an order from anywhere, and send the receipt on WhatsApp.",
        features: [
          "Customers with photos, search by name or mobile number",
          "Orders from booking to delivery: karegar, dates, status and balance",
          "Full suit measurements for Qameez/Shalwar, Coat and Waistcoat",
          "AI photo-fill: photograph a handwritten slip and the measurements fill in (Rs 200 a month, optional)",
          "Receipt sent as a picture on WhatsApp",
          "Links to your shop's Windows PC: customers and orders stay the same on both",
          "Use it on its own too, with a backup file you can keep on WhatsApp or Google Drive",
          "License locked to your phone"
        ],
        shots: [
          { src: "/img/tailors-android-dashboard.webp", caption: "Dashboard: customers, orders, ready and pending, earnings" },
          { src: "/img/tailors-android-measurements.webp", caption: "Measurements, with AI photo-fill from a slip" },
          { src: "/img/tailors-android-styles.webp", caption: "Collar, cuff, pockets, daman and other style choices" },
          { src: "/img/tailors-android-customer.webp", caption: "A customer's details and orders" },
          { src: "/img/tailors-android-orders.webp", caption: "All orders with karegar, dates and status" }
        ] }
    ]
  }
];

/* ---------------------------------------------------------------
   BOOKS. To add a book, put the PDF in /books and a cover
   image in /img, then add one entry here.
---------------------------------------------------------------- */
const BOOKS = [
  { title: "Agentic AI", subtitle: "A Complete Beginner's Guide",
    desc: "What AI and AI agents are and how to use them, from school to career. Written for Class 8 to 12 students.",
    cover: "/img/book-agentic-ai.webp", file: "/books/agentic-ai-beginners-guide.pdf",
    tags: ["English + Urdu", "42 pages", "PDF · 3.0 MB"] },
  { title: "AI Projects Lab", subtitle: "10 Hands-On Projects",
    desc: "Book 2: build ten real AI projects step by step, from a study assistant to your own chatbot, with free tools.",
    cover: "/img/book-ai-projects-lab.webp", file: "/books/ai-projects-lab.pdf",
    tags: ["English + Urdu", "54 pages", "PDF · 2.6 MB"] },
  { title: "Reading the Candles", subtitle: "Crypto technical analysis · Volume One",
    desc: "Learn to read a crypto price chart: candlesticks, patterns, support and resistance. Education only, not financial advice.",
    cover: "/img/book-reading-the-candles.webp", file: "/books/reading-the-candles.pdf",
    tags: ["English + Urdu", "184 pages", "PDF · 4.0 MB"] }
];

const CONTACT = { whatsapp: "0326 9195680", email: "makham002@gmail.com" };

const PAY = [
  { id:"jazzcash", name:"JazzCash", note:"Mobile wallet transfer", to:"JazzCash · 0326 9195680" },
  { id:"easypaisa", name:"Easypaisa", note:"Mobile wallet transfer", to:"Easypaisa · 0313 9228002" }
];

const GLOGO = `<svg class="g-logo" viewBox="0 0 48 48" width="20" height="20" aria-hidden="true"><path fill="#EA4335" d="M24 9.5c3.5 0 6.6 1.2 9.1 3.6l6.8-6.8C35.8 2.4 30.3 0 24 0 14.6 0 6.6 5.4 2.6 13.2l7.9 6.2C12.4 13.7 17.7 9.5 24 9.5z"/><path fill="#4285F4" d="M46.5 24.5c0-1.6-.1-3.1-.4-4.5H24v9h12.7c-.6 2.9-2.2 5.4-4.7 7.1l7.6 5.9c4.4-4.1 6.9-10.1 6.9-17.5z"/><path fill="#FBBC05" d="M10.5 28.6c-.5-1.4-.8-3-.8-4.6s.3-3.2.8-4.6l-7.9-6.2C.9 16.6 0 20.2 0 24s.9 7.4 2.6 10.8l7.9-6.2z"/><path fill="#34A853" d="M24 48c6.5 0 11.9-2.1 15.9-5.8l-7.6-5.9c-2.1 1.4-4.9 2.3-8.3 2.3-6.3 0-11.6-4.2-13.5-9.9l-7.9 6.2C6.6 42.6 14.6 48 24 48z"/></svg>`;
const rs = n => "Rs " + n.toLocaleString("en-PK");
const esc = s => String(s).replace(/[&<>"]/g, c => ({"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;"}[c]));

function render(){
  const main = document.getElementById("shelves");
  const nav = document.getElementById("navlinks");
  let total = 0;
  main.innerHTML = CATEGORIES.map((cat, ci) => {
    total += cat.products.length;
    const cards = cat.products.map((p, pi) => `
      <article class="card${p.shots ? " wide" : ""}">
        ${p.shots && p.phone ? `<div class="shots phone-shots">
          <div class="phone-row">${p.shots.map((s, si) => `<button type="button" data-shot="${ci}:${pi}:${si}" aria-label="${esc(s.caption)}"><img src="${esc(s.src)}" alt="${esc(s.caption)}" loading="lazy"></button>`).join("")}</div>
          <p class="tiny-muted">Tap a screenshot to enlarge.</p>
        </div>` : p.shots ? `<div class="shots">
          <button class="shot-main" type="button" data-shot="${ci}:${pi}:0" aria-label="View screenshots of ${esc(p.name)}"><img src="${esc(p.shots[0].src)}" alt="${esc(p.shots[0].caption)}"></button>
          <div class="thumbs">${p.shots.map((s, si) => `<button type="button" data-shot="${ci}:${pi}:${si}" aria-label="${esc(s.caption)}"><img src="${esc(s.src)}" alt="" loading="lazy"></button>`).join("")}</div>
          <p class="tiny-muted">Tap a screenshot to enlarge. Customer details are blurred.</p>
        </div>` : ""}
        <div class="card-info">
        <div class="card-top"><div class="icon">${esc(p.name[0])}</div><span class="price">${rs(p.price)}</span></div>${p.priceNote ? `<span class="label">${esc(p.priceNote)}</span>` : ""}${p.addon ? `<span class="addon">+ ${esc(p.addon.name)}: ${rs(p.addon.price)} a ${esc(p.addon.per)}${p.addon.note ? ` (${esc(p.addon.note)})` : ""}</span>` : ""}
        <div><h3>${esc(p.name)}</h3><p class="desc">${esc(p.desc)}</p></div>
        <ul class="feats">${p.features.map(f => `<li>${esc(f)}</li>`).join("")}</ul>
        <div class="meta">${[...(p.tags || []), p.platform, p.version, p.size].filter(Boolean).map(x => `<span class="chip">${esc(x)}</span>`).join("")}</div>
        <div class="actions">
          <button class="btn" type="button" data-buy="${ci}:${pi}">Buy now</button>
          ${p.download ? `<a class="btn ghost" href="${esc(p.download.href)}" download>${esc(p.download.label)}</a>` : ""}
          ${p.trial ? `<button class="btn ghost" type="button" data-trial="${esc(p.name)}">Free trial</button>` : ""}
          <a class="btn ghost" href="https://wa.me/92${CONTACT.whatsapp.replace(/\D/g, "").replace(/^0/, "")}" target="_blank" rel="noopener">Ask a question</a>
        </div>
        ${p.download ? `<p class="tiny-muted">Install the app, then enter the license key you receive after payment. Android may ask you to allow installing from your browser: tap Settings, allow it, and go back.</p>
        <p class="dl-count" data-book="${esc(p.download.id)}" data-label="app" hidden></p>` : ""}
        ${p.review ? `<a class="g-review" href="${esc(p.review)}" target="_blank" rel="noopener">${GLOGO}<span>Using ${esc(p.name)}? <b>Review us on Google</b></span></a>` : ""}
        </div>
      </article>`).join("");
    return `<section class="shelf" id="${esc(cat.id)}"><div class="wrap">
      <div class="shelf-head"><div><span class="label">${cat.products.length ? cat.products.length + (cat.products.length === 1 ? " app" : " apps") : "Coming soon"}</span><h2>${esc(cat.name)}</h2><p>${esc(cat.blurb)}</p></div></div>
      <div class="grid">${cards}
        <div class="card soon"><h3>${cat.products.length ? "More coming soon" : "First app coming soon"}</h3><p>New ${esc(cat.short.toLowerCase())} apps are added regularly. Have an idea? <a href="#contact">Tell me</a>.</p></div>
      </div></div></section>`;
  }).join("");
  main.insertAdjacentHTML("beforeend", `<section class="shelf" id="books"><div class="wrap">
    <div class="shelf-head"><div><span class="label">${BOOKS.length} books</span><h2>Books</h2><p>Books I've written in English and Urdu. Download the PDF, no sign-up needed.</p></div></div>
    <div class="grid">${BOOKS.map(b => `
      <article class="card book">
        <img class="cover" src="${esc(b.cover)}" width="440" height="625" alt="Cover of ${esc(b.title)}" loading="lazy">
        <div class="card-info">
          <div><h3>${esc(b.title)}</h3><span class="label">${esc(b.subtitle)}</span><p class="desc">${esc(b.desc)}</p></div>
          <div class="meta">${b.tags.map(x => `<span class="chip">${esc(x)}</span>`).join("")}</div>
          <div class="actions"><a class="btn" href="${esc(b.file)}" download>Download PDF</a></div>
          <p class="dl-count" data-book="${esc(b.file.split("/").pop().replace(/\.pdf$/, ""))}" hidden></p>
        </div>
      </article>`).join("")}
    </div></div></section>`);
  nav.insertAdjacentHTML("afterbegin", CATEGORIES.map(c => `<a href="#${esc(c.id)}">${esc(c.short)}</a>`).join("") + `<a href="#books">Books</a>`);
  const aboutLink = nav.querySelector('a[href="#about"]');
  if (aboutLink) nav.prepend(aboutLink);
  document.getElementById("count").textContent = total;
}
render();

/* download counts for the books (hidden if unavailable) */
fetch("/api/downloads", { cache: "no-store" }).then(r => r.ok ? r.json() : {}).then(counts => {
  document.querySelectorAll(".dl-count").forEach(el => {
    const n = Number(counts[el.dataset.book]) || 0;
    if (!Object.keys(counts).length) return;
    el.textContent = n ? n.toLocaleString("en-PK") + (n === 1 ? " download" : " downloads") : (el.dataset.label === "app" ? "New app" : "New book");
    el.hidden = false;
  });
}).catch(() => {});

/* checkout dialog */
const overlay = document.getElementById("overlay");
let current = null;
function openBuy(ci, pi){
  const cat = CATEGORIES[ci], p = cat.products[pi];
  current = p;
  document.getElementById("dlg-cat").textContent = cat.name;
  document.getElementById("dlg-title").textContent = p.name;
  document.getElementById("dlg-price").textContent = rs(p.price);
  document.getElementById("methods").innerHTML = PAY.map((m,i) => `
    <label class="method" for="pm-${m.id}"><input type="radio" name="pm" id="pm-${m.id}" value="${i}" ${i===0?"checked":""}>
    <span><b>${m.name}</b><small>${m.note}</small></span></label>`).join("");
  showPayTo(0);
  document.getElementById("dlg-msg").hidden = true;
  overlay.hidden = false;
  document.getElementById("dlg-close").focus();
}
function showPayTo(i){
  const m = PAY[i];
  const addon = current.addon ? `<span class="tiny-muted">Want ${esc(current.addon.name)} too? Add ${rs(current.addon.price)} for each ${esc(current.addon.per)} and say so on WhatsApp.</span>` : "";
  document.getElementById("payto").innerHTML = `<span class="label">Send ${rs(current.price)} to</span><span class="mono">${esc(m.to)}</span><span class="tiny-muted">Name on account: Qazi Hussain Shah</span>${addon}`;
}
document.addEventListener("click", e => {
  const b = e.target.closest("[data-buy]");
  if (b){ const [ci,pi] = b.dataset.buy.split(":").map(Number); openBuy(ci,pi); }
  const t = e.target.closest("[data-trial]");
  if (t){ t.textContent = "Trial link sent on request"; t.disabled = true; }
  const c = e.target.closest("[data-copy]");
  if (c){
    navigator.clipboard?.writeText(c.dataset.copy).then(() => { c.textContent = "Copied"; }, () => { c.textContent = "Select to copy"; });
  }
});
document.getElementById("methods").addEventListener("change", e => showPayTo(Number(e.target.value)));
function closeDlg(){ overlay.hidden = true; }
document.getElementById("dlg-close").addEventListener("click", closeDlg);
overlay.addEventListener("click", e => { if (e.target === overlay) closeDlg(); });
document.addEventListener("keydown", e => { if (e.key === "Escape" && !overlay.hidden) closeDlg(); });
document.getElementById("dlg-done").addEventListener("click", () => {
  const m = document.getElementById("dlg-msg");
  m.textContent = "Send your receipt for " + current.name + (CONTACT.whatsapp ? " on WhatsApp to " + CONTACT.whatsapp + " or" : "") + " by email to " + CONTACT.email + ".";
  m.hidden = false;
});

document.getElementById("contact-form").addEventListener("submit", e => {
  e.preventDefault();
  const v = id => document.getElementById(id).value.trim();
  const subject = v("c-topic") + " – " + v("c-name");
  const body = v("c-msg") + "\n\nName: " + v("c-name") + (v("c-phone") ? "\nWhatsApp: " + v("c-phone") : "");
  document.getElementById("formmsg").hidden = false;
  location.href = "mailto:" + CONTACT.email + "?subject=" + encodeURIComponent(subject) + "&body=" + encodeURIComponent(body);
});

/* screenshot lightbox */
const lb = document.getElementById("lightbox");
let lbShots = [], lbIdx = 0;
function showShot(){
  const s = lbShots[lbIdx];
  lens.hidden = true;
  setZoom(1);
  document.getElementById("lb-img").src = s.src;
  document.getElementById("lb-img").alt = s.caption;
  document.getElementById("lb-cap").textContent = s.caption + "  (" + (lbIdx + 1) + " of " + lbShots.length + ")";
}
document.addEventListener("click", e => {
  const t = e.target.closest("[data-shot]");
  if (!t) return;
  const [ci, pi, si] = t.dataset.shot.split(":").map(Number);
  lbShots = CATEGORIES[ci].products[pi].shots; lbIdx = si; showShot();
  lb.hidden = false; setZoom(1); document.getElementById("lb-close").focus();
});
/* zoom: + / − buttons, the % button fits the whole screenshot again,
   double-click (double-tap) zooms in on that spot, drag to move around */
const lbView = document.getElementById("lb-view"), lbImg = document.getElementById("lb-img");
const ZOOMS = [1, 1.5, 2, 3, 4];
let zoom = 1;
function setZoom(z, cx, cy){
  const prev = zoom;
  zoom = Math.min(4, Math.max(1, z));
  document.getElementById("lb-fit").textContent = Math.round(zoom * 100) + "%";
  document.getElementById("lb-out").disabled = zoom <= 1;
  document.getElementById("lb-in").disabled = zoom >= 4;
  lbView.classList.toggle("zoomed", zoom > 1);
  if (zoom > 1) lens.hidden = true;
  if (!lbImg.naturalWidth) return;
  // size the picture ourselves: "fit" = the whole screenshot inside the box
  const r = lbView.getBoundingClientRect();
  if (zoom === 1){
    const fit1 = Math.min(r.width / lbImg.naturalWidth, r.height / lbImg.naturalHeight);
    lbImg.style.width = Math.round(lbImg.naturalWidth * fit1) + "px";
    lbImg.style.height = Math.round(lbImg.naturalHeight * fit1) + "px";
    lbView.scrollTop = lbView.scrollLeft = 0;
    return;
  }
  // keep the point under (cx, cy) — or the middle — in place while zooming
  const px = cx == null ? r.width / 2 : cx - r.left, py = cy == null ? r.height / 2 : cy - r.top;
  const fx = (lbView.scrollLeft + px) / Math.max(1, lbView.scrollWidth), fy = (lbView.scrollTop + py) / Math.max(1, lbView.scrollHeight);
  const fit = Math.min(r.width / lbImg.naturalWidth, r.height / lbImg.naturalHeight);
  lbImg.style.width = Math.round(lbImg.naturalWidth * fit * zoom) + "px";
  lbImg.style.height = Math.round(lbImg.naturalHeight * fit * zoom) + "px";
  if (prev === 1){ lbView.scrollLeft = fx * lbView.scrollWidth - px; lbView.scrollTop = fy * lbView.scrollHeight - py; return; }
  lbView.scrollLeft = fx * lbView.scrollWidth - px;
  lbView.scrollTop = fy * lbView.scrollHeight - py;
}
const nextZoom = dir => dir > 0 ? (ZOOMS.find(z => z > zoom) || 4) : ([...ZOOMS].reverse().find(z => z < zoom) || 1);
document.getElementById("lb-in").addEventListener("click", () => setZoom(nextZoom(1)));
document.getElementById("lb-out").addEventListener("click", () => setZoom(nextZoom(-1)));
document.getElementById("lb-fit").addEventListener("click", () => setZoom(1));
lbView.addEventListener("dblclick", e => { e.preventDefault(); setZoom(zoom === 1 ? 2 : 1, e.clientX, e.clientY); });
lbImg.addEventListener("load", () => setZoom(zoom));
window.addEventListener("resize", () => { if (!lb.hidden) setZoom(zoom); });
/* magnifier: on a computer, a round lens follows the mouse and shows that
   part of the screenshot enlarged (only at 100%; phones use + / − instead) */
const lens = document.getElementById("lb-lens");
const canHover = window.matchMedia("(hover: hover) and (pointer: fine)").matches;
function moveLens(e){
  const ir = lbImg.getBoundingClientRect(), vr = lbView.getBoundingClientRect();
  const x = e.clientX - ir.left, y = e.clientY - ir.top;
  if (zoom !== 1 || drag || x < 0 || y < 0 || x > ir.width || y > ir.height){ lens.hidden = true; return; }
  const size = lens.offsetWidth || 240;
  // enlarge about to the screenshot's real sharpness (2× to 4×)
  const LENS_ZOOM = Math.min(4, Math.max(2, (lbImg.naturalWidth / ir.width) * 1.15));
  lens.hidden = false;
  lens.style.backgroundImage = `url("${lbImg.currentSrc || lbImg.src}")`;
  lens.style.backgroundSize = `${ir.width * LENS_ZOOM}px ${ir.height * LENS_ZOOM}px`;
  lens.style.backgroundPosition = `${-(x * LENS_ZOOM - size / 2)}px ${-(y * LENS_ZOOM - size / 2)}px`;
  lens.style.left = (e.clientX - vr.left + lbView.scrollLeft - size / 2) + "px";
  lens.style.top = (e.clientY - vr.top + lbView.scrollTop - size / 2) + "px";
}
if (canHover){
  lbView.addEventListener("mousemove", moveLens);
  lbView.addEventListener("mouseleave", () => { lens.hidden = true; });
}
let drag = null;
lbView.addEventListener("pointerdown", e => {
  if (zoom === 1 || e.pointerType !== "mouse") return;
  drag = { x: e.clientX, y: e.clientY, l: lbView.scrollLeft, t: lbView.scrollTop };
  lbView.setPointerCapture(e.pointerId); lbView.classList.add("dragging");
});
lbView.addEventListener("pointermove", e => {
  if (!drag) return;
  lbView.scrollLeft = drag.l - (e.clientX - drag.x); lbView.scrollTop = drag.t - (e.clientY - drag.y);
});
const endDrag = () => { drag = null; lbView.classList.remove("dragging"); };
lbView.addEventListener("pointerup", endDrag); lbView.addEventListener("pointercancel", endDrag);
document.getElementById("lb-prev").addEventListener("click", () => { lbIdx = (lbIdx + lbShots.length - 1) % lbShots.length; showShot(); });
document.getElementById("lb-next").addEventListener("click", () => { lbIdx = (lbIdx + 1) % lbShots.length; showShot(); });
document.getElementById("lb-close").addEventListener("click", () => { lb.hidden = true; });
lb.addEventListener("click", e => { if (e.target === lb) lb.hidden = true; });
document.addEventListener("keydown", e => {
  if (lb.hidden) return;
  if (e.key === "Escape") lb.hidden = true;
  if (e.key === "+" || e.key === "=") setZoom(nextZoom(1));
  if (e.key === "-") setZoom(nextZoom(-1));
  if (e.key === "0") setZoom(1);
  if (e.key === "ArrowLeft" && zoom === 1) document.getElementById("lb-prev").click();
  if (e.key === "ArrowRight" && zoom === 1) document.getElementById("lb-next").click();
});
