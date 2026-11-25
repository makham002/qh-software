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
      { name: "Tailoring Shop Manager", price: 10000, priceNote: "Lifetime access", platform: "Windows 10/11",
        desc: "Run your tailoring shop from one place: customer measurements, orders, payments and delivery dates.",
        features: ["Save measurements for every customer", "Track orders and delivery dates", "Record advances and balances", "Print order slips"] }
    ]
  },
  {
    id: "mobile", name: "Mobile software", short: "Mobile",
    blurb: "Android apps. Install link and license arrive on WhatsApp.",
    products: []
  }
];

const CONTACT = { whatsapp: "0326 9195680", email: "qazihussain0594@gmail.com" };

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
      <article class="card">
        <div class="card-top"><div class="icon">${esc(p.name[0])}</div><span class="price">${rs(p.price)}</span></div>${p.priceNote ? `<span class="label">${esc(p.priceNote)}</span>` : ""}
        <div><h3>${esc(p.name)}</h3><p class="desc">${esc(p.desc)}</p></div>
        <ul class="feats">${p.features.map(f => `<li>${esc(f)}</li>`).join("")}</ul>
        <div class="meta">${[p.platform, p.version, p.size].filter(Boolean).map(x => `<span class="chip">${esc(x)}</span>`).join("")}</div>
        <div class="actions">
          <button class="btn" type="button" data-buy="${ci}:${pi}">Buy now</button>
          ${p.trial ? `<button class="btn ghost" type="button" data-trial="${esc(p.name)}">Free trial</button>` : ""}
        </div>
      </article>`).join("");
    return `<section class="shelf" id="${esc(cat.id)}"><div class="wrap">
      <div class="shelf-head"><div><span class="label">${cat.products.length ? cat.products.length + (cat.products.length === 1 ? " app" : " apps") : "Coming soon"}</span><h2>${esc(cat.name)}</h2><p>${esc(cat.blurb)}</p></div></div>
      <div class="grid">${cards}
        <div class="card soon"><h3>${cat.products.length ? "More coming soon" : "First app coming soon"}</h3><p>New ${esc(cat.short.toLowerCase())} apps are added regularly. Have an idea? <a href="#contact">Tell me</a>.</p></div>
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
