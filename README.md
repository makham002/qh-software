# Qazi Hussain Software

Static website, hosted on Cloudflare Pages. No server, no database, no build step.

## Files
- `index.html` – the page
- `styles.css` – design
- `app.js` – **your apps and payment details live here.** Edit the `CATEGORIES` list to add apps or a new category, and the `PAY` list for JazzCash / Easypaisa / bank details.
- `_headers` – security headers Cloudflare adds to every page
- `404.html`, `robots.txt`, `favicon.svg`

## Cloudflare Pages settings
- Framework preset: None
- Build command: (leave empty)
- Build output directory: `/`

Every change pushed to the `main` branch on GitHub goes live in about a minute.

## Book download counter
`functions/` holds a small Cloudflare Pages Function that counts book downloads
(one per visitor per book per day; only a hash is stored, never IP addresses)
and serves the totals at `/api/downloads`. It needs a free D1 database:
1. Cloudflare dashboard > Storage & Databases > D1 > Create, name it `qh-downloads`.
2. Workers & Pages > this Pages project > Settings > Bindings > Add > D1 database,
   variable name `DB`, database `qh-downloads`. Save, then redeploy.
Without the binding the site still works and the counts are simply hidden.

## Contact form messages
The contact form posts to `/api/contact` (`functions/api/contact.js`), which saves
each message in the same D1 database (`DB`), in a `messages` table. Spam guard:
a hidden field bots fill in, and at most 5 messages per visitor per day.
To read messages, open https://qazisoft.com/inbox and enter the inbox key.
Set the key once: Workers & Pages > this Pages project > Settings >
Variables and Secrets > Add, type Secret, name `INBOX_KEY`, any long password.
Then redeploy.
