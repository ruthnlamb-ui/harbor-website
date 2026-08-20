# Harbor Life Quotes — Website

A full marketing website for Harbor Life Quotes, with the lead-capture quote app folded in as one of its pages. Everything deploys together as a single site.

## Pages

- `index.html` — Homepage (hero, value props, coverage preview, CTA)
- `about.html` — About / mission
- `services.html` — Coverage types (Term, Whole Life, Final Expense)
- `contact.html` — Contact details + CTA into the quote form
- `quote.html` — The 3-step lead capture form (same one built earlier) — submissions go straight to your Google Sheet
- `styles.css` — Master copy of the shared design system, kept for reference/editing. Each HTML page has this CSS inlined directly (in a `<style>` tag) so every page works as a standalone file — if you change something here, copy the change into each page's `<style>` block too, or ask me to resync them.
- `api/submit.js` — Serverless function that writes quote submissions to Google Sheets
- `og-image.png` — Social share preview image

## Before you deploy — placeholder content to update

- **Contact page** (`contact.html`): phone number, email, and hours are placeholders — replace with your real details.
- **Domain**: every page has `https://REPLACE-WITH-YOUR-DOMAIN.com` in the Open Graph tags — once deployed, replace with your real URL (e.g. `https://harborlifequotes.com`) across all 5 HTML files.
- **Meta Pixel**: every page has `REPLACE_WITH_YOUR_PIXEL_ID` — replace with your real Pixel ID once you've created one in Meta Events Manager (see below).

## 1. Set up Google Sheets + service account (for the quote form)

Same as before:
1. Create a Google Sheet, rename the first tab to `Leads`, add header row: `Timestamp | Name | Phone | Email | Age | Coverage | Health | Smoker`.
2. Create a Google Cloud project, enable the Sheets API, create a service account, download its JSON key.
3. Share the Sheet with the service account's email (Editor access).
4. Copy the Sheet ID from the URL.

## 2. Deploy to Vercel

1. Push this whole folder to a GitHub repo.
2. Import it in [Vercel](https://vercel.com) — no build config needed, it's static + one serverless function.
3. In **Environment Variables**, add:
   - `GOOGLE_CLIENT_EMAIL`
   - `GOOGLE_PRIVATE_KEY`
   - `SHEET_ID`
4. Redeploy after adding env vars.

## 3. Point your domain

Add your custom domain under Vercel's **Domains** tab, then update the placeholder domain across all HTML files (see above) and redeploy.

## 4. Set up the Meta Pixel

1. Create a Pixel in [Meta Events Manager](https://business.facebook.com/events_manager2).
2. Replace `REPLACE_WITH_YOUR_PIXEL_ID` across all 5 HTML pages with your real Pixel ID.
3. Redeploy. The quote page fires `PageView`, `InitiateCheckout` (after step 1), and `Lead` (on submission) — same as before.

## 5. Using this for ads vs. organic

- **Facebook ads**: point the ad's destination URL straight at `yourdomain.com/quote.html` so traffic lands directly on the form (skips the extra click through the homepage).
- **Organic posts / page shares**: share `yourdomain.com` (the homepage) — it tells the story first and funnels into the quote form via the "Get a Quote" button.

## Cost

Same as before — Vercel's free tier, Google Sheets, and the Sheets API are all free. Your only real ongoing cost is ad spend.
