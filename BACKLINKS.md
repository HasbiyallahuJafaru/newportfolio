# Backlink kit for hasbiyallahu.xyz

Written 9 November 2026 from the OpenSEO audit and live Google results for
Nigeria. This file lives in the repo only; it is not published on the site.

## Where things stand

- 6 backlinks from 6 domains, domain rank 0, and a backlink spam score of 57:
  the few links that exist are mostly low quality. The site itself is clean
  (4 pages crawled, all indexable, one minor heading issue, now fixed).
- The gap is authority. Each item below adds a real, relevant link.
- Google Business Profile is verified, claimed, category "Website designer",
  and its website link points to https://hasbiyallahu.xyz/. It has 1 review.

## Done already

- [x] GitHub profile README links to the site (github.com/HasbiyallahuJafaru)
- [x] `newportfolio` repo homepage now points to https://hasbiyallahu.xyz
      (it pointed at the old hasbiyallahuportfolio.vercel.app)
- [x] GitHub profile added to the site's Person structured data (`sameAs`)
- [x] New linkable page: https://hasbiyallahu.xyz/website-design-price-nigeria
- [x] IndexNow submitted for every page

## Needs you (5 minutes each)

### 1. Bliss Urban footer credit (change is ready, not pushed)

In `Build Projects/Blissurban`, the footer credit now reads
"Website by Hasbiyallahu Jafaru, web designer in Kaduna" (was "Site by
Hasbiyallahu"). It is staged. Commit and push:

    git commit -m "Name the site's designer in the footer credit"
    git push origin main

### 2. GitHub profile website field

The token Claude uses lacks the `user` scope, so set it by hand:
GitHub → Settings → Public profile → Website: `https://hasbiyallahu.xyz`,
Location: `Kaduna, Nigeria`.

### 3. Credits on your own products

These are your sites, so the credit is yours to add. Paste into each footer:

- ZoomGuru (`apps/landing/components/site-footer.tsx`, next to the © line, on `main`):

      <a href="https://hasbiyallahu.xyz" className="label hover:text-overlay">Built by Hasbiyallahu Jafaru</a>

- YT Clipper (`AiContentStudio/apps/site/index.html` footer, on `main`):

      <a href="https://hasbiyallahu.xyz">Built by Hasbiyallahu Jafaru</a>

- PDFGee (`pdfgee-new` repo footer): same line.

### 4. Ask clients for a footer credit

Send to Credible Hope Foundation, InBookings Online, Iklima Babangida and
Hulul Media (skip the In Loving Memory family page):

> Hi [name], hope [project] is going well. A small request: would you be
> happy for me to add a "Website by Hasbiyallahu Jafaru" link in the site
> footer, pointing to hasbiyallahu.xyz? It is a one-line change I can make
> myself, it does not affect your design, and it helps people who like your
> site find me. Completely fine if you would rather not.

### 5. Ask for Google reviews

One review today. Reviews move the map results for "web designer in
Kaduna" more than anything else on this list. Send every past client:

> Hi [name], thank you again for working with me on [project]. If you have
> two minutes, a short Google review would help me a lot:
> https://search.google.com/local/writereview?placeid=ChIJs4k5ZGwYmiUR_zlpHIyvieg

## Directories, in priority order

Use the same details everywhere (consistency matters to Google):

- **Name:** Hasbiyallahu Jafaru
- **Category:** Website designer / Web design
- **City:** Kaduna, Kaduna State, Nigeria
- **Phone / WhatsApp:** +234 815 719 3900
- **Email:** jhasbiyallahu@gmail.com
- **Website:** https://hasbiyallahu.xyz
- **Short description (under 160 chars):** Website designer in Kaduna, Nigeria. Business websites, booking systems and Telegram bots with Paystack. Fixed quotes from $500.
- **Long description:** I design and build websites, booking systems and Telegram bots for businesses in Kaduna and across Nigeria, and for clients in the United States and Canada. Every site is built to be found on Google, load fast on a phone and turn visitors into enquiries. Recent work includes Bliss Urban Hotels in Kaduna, Credible Hope Foundation and InBookings Online. Fixed quotes, no hourly billing.

Each of these showed up in live Google results for Nigerian business or web
design searches on 9 Nov 2026:

| Priority | Site | Why | Where to list |
| --- | --- | --- | --- |
| 1 | Behance | Its "Web Designers in Kaduna" page ranks #5 for "web design companies in kaduna" | behance.net, set location to Kaduna, add 3 projects with the site link |
| 1 | BusinessList.com.ng | Ranks #1 for "nigeria business directory add your business" | businesslist.com.ng |
| 1 | Finelib | Long-running Nigerian directory, ranks top 3 | finelib.com |
| 1 | ConnectNigeria | Ranks for directory searches, has a 10-step listing guide | connectnigeria.com |
| 2 | business-yellowpages.com | Its Kaduna web design list ranks #8 for the Kaduna search | business-yellowpages.com |
| 2 | TopSEOs | Kaduna web development ranking page ranks #5 | topseos.com |
| 2 | NgEX | Free listing | ngex.com |
| 2 | NaijaDirectory | Free listing | naijadirectory.org |
| 2 | MyNigeriaBusiness | Category and city search | mynigeriabusiness.ng |
| 2 | LinkNearBiz | Free listing with gallery | linknearbiz.com.ng |
| 3 | VConnect, NigeriaGalleria, Joliba | Older directories, still indexed | vconnect.com, nigeriagalleria.com, directory.joliba.com.ng |
| 3 | Clutch, GoodFirms, TechBehemoths | International agency directories; free profiles | clutch.co, goodfirms.co, techbehemoths.com |
| 3 | LinkedIn, Contra, Dribbble | Profile links; put the site in the website field | |

## Outreach to list articles

- **xplicitmode.com**, "Top website design companies in Nigeria" (ranks #5).
  An Abuja agency that lists itself first, so treat it as a long shot.
  Contact: hello@xplicitmode.com (from their homepage).

  > Hello, I came across your list of top website design companies in
  > Nigeria. I am a website designer based in Kaduna, and there is no one
  > from the North on the list yet. If you update it, I would be glad to be
  > considered: hasbiyallahu.xyz, with live work for Bliss Urban Hotels
  > (Kaduna) and Credible Hope Foundation. Thank you either way.

- **aamax.co**, "Top 10 best web design & development companies in Kaduna"
  (ranks #4). A Pakistan-based agency writing local SEO lists, so inclusion
  may be paid. Contact form at aamax.co/contact, WhatsApp +92 308 4281241
  (both from their homepage). Use the same message, and walk away if they
  ask for payment.

## The page to point people at

https://hasbiyallahu.xyz/website-design-price-nigeria answers "how much is a
website in Nigeria" with real price ranges and a checklist of questions to
ask any designer. It is the page to share in Nairaland threads, Facebook
business groups, and replies to anyone asking about website prices, because
it is useful even to people who never hire you.
