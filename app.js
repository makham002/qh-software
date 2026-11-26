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
    blurb: "Android apps. Install link and license arrive on WhatsApp.",
    products: []
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
        ${p.shots ? `<div class="shots">
          <button class="shot-main" type="button" data-shot="${ci}:${pi}:0" aria-label="View screenshots of ${esc(p.name)}"><img src="${esc(p.shots[0].src)}" alt="${esc(p.shots[0].caption)}"></button>
          <div class="thumbs">${p.shots.map((s, si) => `<button type="button" data-shot="${ci}:${pi}:${si}" aria-label="${esc(s.caption)}"><img src="${esc(s.src)}" alt="" loading="lazy"></button>`).join("")}</div>
          <p class="tiny-muted">Tap a screenshot to enlarge. Customer details are blurred.</p>
        </div>` : ""}
        <div class="card-info">
        <div class="card-top"><div class="icon">${esc(p.name[0])}</div><span class="price">${rs(p.price)}</span></div>${p.priceNote ? `<span class="label">${esc(p.priceNote)}</span>` : ""}
        <div><h3>${esc(p.name)}</h3><p class="desc">${esc(p.desc)}</p></div>
        <ul class="feats">${p.features.map(f => `<li>${esc(f)}</li>`).join("")}</ul>
        <div class="meta">${[...(p.tags || []), p.platform, p.version, p.size].filter(Boolean).map(x => `<span class="chip">${esc(x)}</span>`).join("")}</div>
        <div class="actions">
          <button class="btn" type="button" data-buy="${ci}:${pi}">Buy now</button>
          ${p.trial ? `<button class="btn ghost" type="button" data-trial="${esc(p.name)}">Free trial</button>` : ""}
          <a class="btn ghost" href="https://wa.me/92${CONTACT.whatsapp.replace(/\D/g, "").replace(/^0/, "")}" target="_blank" rel="noopener">Ask a question</a>
        </div>
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
    el.textContent = n ? n.toLocaleString("en-PK") + (n === 1 ? " download" : " downloads") : "New book";
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
  document.getElementById("payto").innerHTML = `<span class="label">Send ${rs(current.price)} to</span><span class="mono">${esc(m.to)}</span><span class="tiny-muted">Name on account: Qazi Hussain Shah</span>`;
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
  document.getElementById("lb-img").src = s.src;
  document.getElementById("lb-img").alt = s.caption;
  document.getElementById("lb-cap").textContent = s.caption + "  (" + (lbIdx + 1) + " of " + lbShots.length + ")";
}
document.addEventListener("click", e => {
  const t = e.target.closest("[data-shot]");
  if (!t) return;
  const [ci, pi, si] = t.dataset.shot.split(":").map(Number);
  lbShots = CATEGORIES[ci].products[pi].shots; lbIdx = si; showShot();
  lb.hidden = false; document.getElementById("lb-close").focus();
});
document.getElementById("lb-prev").addEventListener("click", () => { lbIdx = (lbIdx + lbShots.length - 1) % lbShots.length; showShot(); });
document.getElementById("lb-next").addEventListener("click", () => { lbIdx = (lbIdx + 1) % lbShots.length; showShot(); });
document.getElementById("lb-close").addEventListener("click", () => { lb.hidden = true; });
lb.addEventListener("click", e => { if (e.target === lb) lb.hidden = true; });
document.addEventListener("keydown", e => {
  if (lb.hidden) return;
  if (e.key === "Escape") lb.hidden = true;
  if (e.key === "ArrowLeft") document.getElementById("lb-prev").click();
  if (e.key === "ArrowRight") document.getElementById("lb-next").click();
});
