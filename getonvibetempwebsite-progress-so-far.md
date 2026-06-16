# GetOnVibe Temporary Website Progress So Far

## Overview

This project is the temporary ONVIBE Festival and GetOnVibe launch landing page for the planned Nashville-area launch event.

The site is designed to generate early interest, collect attendee signups, capture vendor and hotel partnership inquiries, and promote the upcoming GetOnVibe platform launch. The page uses a premium dark neon festival style with glassmorphism, animated motion, competition callouts, and conversion-focused sections.

Current public positioning:

- ONVIBE Festival
- Nashville Area
- Target Date: October 10, 2026
- Venue announcement coming soon
- 21+ event with valid government-issued ID required
- Official GetOnVibe platform launch experience
- Food. Gear. Culture.
- Find Your Vibe.

## Technology Stack

The site is built with:

- Next.js App Router
- React
- TypeScript
- Tailwind CSS
- Framer Motion
- Lucide React
- Zod validation
- Resend email SDK
- Native client fetch for form submissions

The app is intended for DigitalOcean App Platform deployment through GitHub sync.

## Current Website Structure

The homepage currently includes:

- Hero section with GetOnVibe and ONVIBE Festival logos
- Age notice and compliance messaging
- Festival hype treatment with neon background effects
- Countdown timer for the target date
- Momentum/status badges
- What To Expect section
- GetOnVibe platform launch section
- GetOnVibe ecosystem links section for creator and business education
- Food. Gear. Culture. ecosystem section
- Have You Vibed? brand moment
- Competition spotlight section
- DJ lineup teaser
- Festival atmosphere section
- Hotel partner teaser
- Hotel Partnerships section
- Legal and compliance section
- Four-tab signup/inquiry form area
- FAQ
- Final CTA
- Footer

## Visual and Brand Direction

The page uses a dark luxury nightlife style:

- Obsidian and near-black backgrounds
- Electric teal, electric purple, and magenta accents
- Neon gradients and glow borders
- Glassmorphism panels
- Animated equalizer bars
- CSS-only stage lighting and hero atmosphere
- Motion-enhanced card reveals and countdown elements
- Brand-forward Food, Gear, and Culture language throughout the page
- Premium festival and app launch messaging without relying on random stock imagery

No external random images are used. The main visual assets are the supplied logo files:

- `public/logos/GetOnVibe.png`
- `public/logos/OnVibeFestival.png`

## Conversion Goals

The site is built to push visitors toward:

- Attendee pre-registration
- GetOnVibe launch list signup
- Brand vendor applications
- Food vendor inquiries
- Hotel partnership inquiries
- Competition updates
- DJ lineup updates
- Hotel partner updates
- Platform education for creators and businesses

The current copy emphasizes that subscribers receive venue announcements, ticket details, hotel partner updates, competition rules, DJ lineup updates, and GetOnVibe launch updates first.

The attendee experience is positioned as broader than competitions alone. Visitors are told they can come for music, vendors, food, creators, culture, and the official GetOnVibe launch even if they do not plan to compete.

## Platform Education Links

A new section called `Learn More About The GetOnVibe Ecosystem` has been added after the `What Is GetOnVibe?` platform discovery section.

The section uses the existing dark neon glassmorphism style and includes two outbound education cards:

- For Creators: `https://creators.getonvibe.com`
- For Businesses: `https://business.getonvibe.com`

These links help visitors learn more about the broader GetOnVibe platform without changing the festival-focused structure of the landing page.

## Cross-Site Navigation

A minimal ecosystem navigation area has been added near the top of the ONVIBE Festival / GetOnVibe temporary landing page.

Links added:

- Creators: `https://creators.getonvibe.com`
- Businesses: `https://business.getonvibe.com`

Files changed:

- `components/Hero.tsx`

Verification for this navigation update:

- `npm run lint` passed
- `npm run build` passed

## Forms Built So Far

All forms submit to:

`POST /api/signup`

Current supported form types:

- `attendee`
- `brand-vendor`
- `food-vendor`
- `hotel-partner`

### Attendee Pre-Registration

Captures:

- Full name
- Email
- Phone number
- Date of birth
- Consent

Validation includes client-side and server-side age checks requiring users to be 21 or older.

### Brand Vendor Inquiry

Captures legal hemp / alternative product brand vendor interest.

Includes:

- Brand name
- Contact name
- Email
- Phone number
- Website or Instagram
- Product category
- Message
- Legal hemp and COA confirmation
- Consent

### Food Vendor Inquiry

Captures:

- Business name
- Contact name
- Email
- Phone number
- Cuisine type
- Website or Instagram
- Message
- Consent

### Hotel Partnership Inquiry

Captures hotel interest in:

- Room blocks
- Discounted attendee rates
- Preferred hotel visibility
- Shuttle or transportation coordination
- Hospitality packages
- Sponsorship opportunities

Fields include:

- Hotel / Property Name
- Contact Name
- Email
- Phone Number
- Property Address
- Website
- Partnership Interest
- Available rooms or estimated capacity
- Message
- Consent

## Backend and Email Handling

The API route lives at:

`app/api/signup/route.ts`

Validation lives in:

`lib/validation.ts`

Email handling lives in:

`lib/resend.ts`

Server-side validation uses Zod. The API validates every submission type and returns clean JSON responses.

Resend is used for:

- Internal lead notification emails
- Submitter confirmation emails
- Optional audience/contact syncing when audience IDs are configured

Internal notifications always include required recipients and also support comma-separated additional recipients through:

`LEADS_NOTIFY_EMAIL`

Example:

`LEADS_NOTIFY_EMAIL=office@lobbicore.com,support@getonvibe.com`

Optional audience/contact sync is intentionally non-blocking so a Resend contact list issue does not prevent form success.

## Required Environment Variables

Documented in `.env.example`:

```bash
RESEND_API_KEY=
RESEND_FROM_EMAIL=
RESEND_INTERNAL_FROM_EMAIL=
LEADS_NOTIFY_EMAIL=
RESEND_ATTENDEE_AUDIENCE_ID=
RESEND_BRAND_VENDOR_AUDIENCE_ID=
RESEND_FOOD_VENDOR_AUDIENCE_ID=
NEXT_PUBLIC_SITE_URL=
```

Important notes:

- `RESEND_API_KEY` is required for actual email sending.
- `RESEND_FROM_EMAIL` should be a verified Resend sender.
- `RESEND_INTERNAL_FROM_EMAIL` can be used as a dedicated internal notification sender.
- `LEADS_NOTIFY_EMAIL` supports comma-separated recipients.
- Audience IDs are optional.

## SEO and Verification

The site includes:

- Metadata title and description
- Open Graph metadata
- Twitter card metadata
- Theme color
- Event JSON-LD structured data
- Google Search Console verification metadata

Google verification is configured in:

`app/layout.tsx`

Safari and browser reputation warnings have also been investigated separately from the codebase. The deployed site has been checked for HTTPS availability, expected DNS routing, unexpected redirects, and obvious injected scripts. The current working assumption is that any Safari phishing or malware warning is a safe-browsing reputation issue that must be reviewed through Google Search Console, Google Safe Browsing tools, and related browser reporting channels.

## Compliance Work Completed

The page includes compliance-focused language:

- 21+ event
- Valid government-issued ID required
- No entry without valid ID
- Legal hemp space brand partners only
- Current COAs required for applicable products
- No medical claims
- No illegal product, illegal sale, or unlawful consumption implications

Recent copy changes also avoid claiming a confirmed venue or fully finalized event date.

## Date and Venue Positioning

The event is currently framed as:

`Target Date: October 10, 2026`

Venue language is:

`Venue announcement coming soon.`

The date and related labels are centralized in:

`lib/event.ts`

This makes future date updates easier.

## Current FAQ Positioning

The FAQ has been refined to answer visitor concerns more clearly and to reduce confusion around the event format. Current FAQ themes include:

- When and where ONVIBE Festival is planned
- 21+ entry and valid government-issued ID requirements
- What GetOnVibe is
- What ONVIBE Festival is
- Whether this is a music festival
- Vendor and food vendor applications
- Featured competition concepts
- Whether attendees need to compete
- Why ONVIBE Festival is different
- Whether a GetOnVibe account is required
- Discounted attendee lodging plans

The most recent FAQ addition clarifies that attendees do not need to compete to attend. Competitions are optional, and the festival is positioned as a full attendee experience with music, brands, food vendors, creators, community, and the official GetOnVibe launch.

## Deployment and Domain Work

The project is connected to GitHub:

`https://github.com/Lobbiui/getonvibe-temp-page.git`

Main branch:

`main`

DigitalOcean App Platform is configured to deploy from GitHub.

Domain work completed:

- `getonvibe.com` works over HTTPS
- `www.getonvibe.com` was added as a DigitalOcean app alias
- SSL certificate for `www.getonvibe.com` was provisioned and verified

## Major Commits So Far

Recent commit history includes:

- `0e666d7` Build ONVIBE Festival landing page
- `9ad3439` Ensure lead notifications go to support email
- `9f9dcb0` Make internal lead notifications explicit
- `eb607ce` Harden Resend lead notification delivery
- `e922cb0` Support dedicated internal lead sender
- `7f8821c` Add office lead notification recipient
- `a224513` Update ONVIBE Festival date to October 10
- `f172fea` Highlight ONVIBE Festival competitions
- `1128cb7` Add Google Search Console verification
- `154641a` Add hotel partnership inquiry form
- `7bb2ea2` Add festival hype sections
- `d4aab15` Refine ONVIBE messaging and ecosystem positioning
- `3755a55` Refine ONVIBE FAQ messaging
- `4c4df1e` Add FAQ for competition participation

## Current Quality Checks

The project has repeatedly passed:

```bash
npm run lint
npm run build
```

Additional content checks have been run for:

- No emojis
- No placeholder filler copy
- No retired event date references after the date update
- No invented venue names
- No invented DJ names

Latest verification for the ecosystem links update:

- `npm run lint` passed
- `npm run build` passed

TODOs:

- Monitor the creator and business education pages after launch to ensure the outbound learning paths remain active.

## Current Status

The site is a functioning production-oriented landing page with:

- Festival hype content
- Conversion-focused signup paths
- Four working form types
- Resend-backed emails
- Google verification
- DigitalOcean deployment structure
- HTTPS custom domains
- Mobile-responsive neon festival design
- Refined Food, Gear, and Culture ecosystem messaging
- Creator and business education links for the broader GetOnVibe ecosystem
- Updated FAQ content that clarifies optional competition participation

The next likely areas to refine are browser reputation review follow-up, live email deliverability monitoring, final event date and venue updates once contracted, ticketing integration if needed, and any official DJ/hotel/vendor announcements once approved.

