/* ---------------------------------------------------------------
   ADD OR EDIT PRODUCTS HERE.
   To add a new category (e.g. "Web tools" or "Templates"), add one
   object to CATEGORIES. It gets its own section and menu link.
   To add a product, add an entry to that category's "products".
---------------------------------------------------------------- */
const CATEGORIES = [
  {
    id: "windows", name: "Windows software", short: "Windows",
    blurb: "Desktop apps for Windows 10 and 11. Runs offline, installs in a minute.",
    products: [
      { name: "BillBook Lite", price: 2500, version: "v1.4", size: "18 MB", platform: "Windows 10/11 · 64-bit",
        desc: "Billing and stock for small shops. Prints receipts in Urdu or English.",
        features: ["Daily sales and profit report", "Low-stock alerts", "Thermal printer support"], trial: true },
      { name: "PC Tune-Up Kit", price: 2000, version: "v2.1", size: "9 MB", platform: "Windows 10/11",
        desc: "Cleans junk files, manages startup apps and speeds up older PCs.",
        features: ["One-click cleanup", "Startup manager", "Duplicate file finder"], trial: true },
      { name: "Student Record Manager", price: 3000, version: "v1.0", size: "24 MB", platform: "Windows 10/11 · 64-bit",
        desc: "Attendance, fees and results for schools and tuition centres.",
        features: ["Fee reminders", "Printable result cards", "Excel export"], trial: false }
    ]
  },
  {
    id: "mobile", name: "Mobile software", short: "Mobile",
    blurb: "Apps for Android phones. Install link and key arrive on WhatsApp.",
    products: [
      { name: "Kharcha: Expense Tracker", price: 2000, version: "v1.2", size: "12 MB", platform: "Android 8+",
        desc: "Track daily spending in rupees, set budgets and see where money goes.",
        features: ["Monthly budget limits", "Urdu interface option", "Backup to Google Drive"], trial: true },
      { name: "Dukaan Orders", price: 2500, version: "v1.0", size: "15 MB", platform: "Android 8+",
        desc: "Take customer orders on your phone and share invoices on WhatsApp.",
        features: ["Customer list with balances", "PDF invoices", "Works offline"], trial: false }
    ]
  }
];

const PAY = [
  { id:"jazzcash", name:"JazzCash", note:"Mobile wallet transfer", to:"JazzCash · 0300 0000000 · Account title: Qazi Hussain" },
  { id:"easypaisa", name:"Easypaisa", note:"Mobile wallet transfer", to:"Easypaisa · 0345 0000000 · Account title: Qazi Hussain" },
  { id:"bank", name:"Bank transfer / Raast", note:"From any bank app", to:"Bank: Example Bank · IBAN PK00 XXXX 0000 0000 0000 0000" }
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
      <article class="card">
        <div class="card-top"><div class="icon">${esc(p.name[0])}</div><span class="price">${rs(p.price)}</span></div>
        <div><h3>${esc(p.name)}</h3><p class="desc">${esc(p.desc)}</p></div>
        <ul class="feats">${p.features.map(f => `<li>${esc(f)}</li>`).join("")}</ul>
        <div class="meta"><span class="chip">${esc(p.version)}</span><span class="chip">${esc(p.platform)}</span><span class="chip">${esc(p.size)}</span></div>
        <div class="actions">
          <button class="btn" type="button" data-buy="${ci}:${pi}">Buy now</button>
          ${p.trial ? `<button class="btn ghost" type="button" data-trial="${esc(p.name)}">Free trial</button>` : ""}
        </div>
      </article>`).join("");
    return `<section class="shelf" id="${esc(cat.id)}"><div class="wrap">
      <div class="shelf-head"><div><span class="label">${cat.products.length} apps</span><h2>${esc(cat.name)}</h2><p>${esc(cat.blurb)}</p></div></div>
      <div class="grid">${cards}
        <div class="card soon"><h3>More coming soon</h3><p>New ${esc(cat.short.toLowerCase())} apps are added regularly. Have an idea? <a href="#contact">Tell me</a>.</p></div>
      </div></div></section>`;
  }).join("");
  nav.insertAdjacentHTML("afterbegin", CATEGORIES.map(c => `<a href="#${esc(c.id)}">${esc(c.short)}</a>`).join(""));
  document.getElementById("count").textContent = total;
}
render();

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
  document.getElementById("payto").innerHTML = `<span class="label">Send ${rs(current.price)} to</span><span class="mono">${esc(m.to)}</span><span class="tiny-muted">Placeholder account details</span>`;
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
  m.textContent = "Send your receipt for " + current.name + " on WhatsApp to +92 300 0000000 (placeholder).";
  m.hidden = false;
});

document.getElementById("contact-form").addEventListener("submit", e => {
  e.preventDefault();
  document.getElementById("formmsg").hidden = false;
});
