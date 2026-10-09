# GetOnVibe Temporary Website Progress So Far

## October 2026 Immersive Public Gateway Art Direction

- Reworked the public GetOnVibe gateway below the hero into a continuous visual experience instead of a sequence of conventional landing-page cards.
- Replaced the former waveform/V badge with an original signal-portal brand mark designed around convergence, discovery, and amplified reach.
- Replaced the interim letter-and-arrow mark after visual review with the more expressive Portal Burst identity: layered neon paint forming an open doorway with creator energy moving outward.
- Replaced generic feature icons with a custom numbered geometric language.
- Added a crossfaded dual-video hero treatment so the cinematic motion transitions continuously instead of jolting at the loop boundary.
- Removed the Food / Gear / Culture positioning from the public gateway and made creator discovery the primary story.
- Reframed the four core benefits as a unified creative presence, active discoverability, original-work protections, and amplification through audiences, brands, events, collaborations, and advertising.
- Added a full-width signal ocean, an interactive creator-value stage, cinematic audience pathways, an oversized platform manifesto, and an unboxed originality statement.
- Extended the GetOnVibe cyan, electric blue, violet, and magenta palette through every section with deterministic ambient motion and reduced-motion support.
- Preserved the existing cinematic hero media while avoiding synthetic people, fabricated community activity, or false social proof.
- Refined the public copy to sound direct and human while reinforcing creator ownership, original sources, and GetOnVibe as the discovery layer.
- Verified the redesigned page at desktop and mobile widths with no horizontal document overflow.
- `npx tsc --noEmit` passed.
- `npm run build` passed.

## September 2026 October 3 Event Update

- Added the official October 3, 2026 GetOnVibe Costume-Kini Halloween flyer and six-second video as the primary homepage event artwork.
- Updated the hero, current-event strip, featured event, tour dates, metadata, and Event JSON-LD for 14665-D Lebanon Rd, Old Hickory, TN 37138.
- Updated the Remotion hero composition with the clean official flyer, cinematic camera drift, light sweeps, and bubbles. The supplied clip is not rendered because its generated frames contain duplicated vehicle artwork.
- Repaired the malformed white vehicle embedded in the Costume-Kini flyer and updated the homepage, metadata, and social previews to use the corrected flyer asset.
- Simplified the closing artwork overlay to a compact CTA and restored the artwork's full uncropped aspect ratio so its embedded headline remains readable.
- Kept the September 12 Hendersonville activation listed as a completed tour stop.
- Added the October 3 event to registered-user dashboards and sent the event announcement to all active registered accounts.

## August 2026 Entertainment Hub Redesign

The temporary `www.getonvibe.com` homepage has been redesigned as an ONVIBE Events entertainment hub for the GetOnVibe event-led launch strategy.

Current front-page direction:

- ONVIBE Events as the public-facing event brand
- Featured October 3 Costume-Kini Halloween event in Old Hickory
- Flyer-led event visuals using `public/events/flyer1.jpeg` and `public/events/flyer2.jpeg`
- Remotion Player cinematic homepage reel
- Simple navigation for Event, Attend, Models, Food Vendors, Brands, Creators, and Businesses
- Event-led launch strategy section explaining how real-world activations drive GetOnVibe traffic
- Flyer wall / event poster gallery
- Signup hub for attendees, models, food vendors, and brands

Files added or substantially updated:

- `app/page.tsx`
- `app/layout.tsx`
- `app/globals.css`
- `components/EventCinematic.tsx`
- `components/SignupForms.tsx`
- `lib/validation.ts`
- `lib/resend.ts`
- `public/events/flyer1.jpeg`
- `public/events/flyer2.jpeg`
- `README.md`

Verification for this redesign:

- `npm run lint` passed
- `npm run build` passed

TODOs:

- Review the event date/year and age requirements before final public promotion.
- Confirm Remotion licensing requirements for the intended business use.
- Rotate any DigitalOcean API token previously pasted into chat.

## Overview

This project is the temporary ONVIBE Festival and GetOnVibe launch landing page for the planned Nashville-area launch event.

The site is designed to generate early interest, collect attendee signups, capture vendor and hotel partnership inquiries, and promote the upcoming GetOnVibe platform launch. The page uses a premium dark neon festival style with glassmorphism, animated motion, competition callouts, and conversion-focused sections.

Current public positioning:

- ONVIBE Festival
- Nashville Area
- Target Date: October 17, 2026
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
- Attendee invitation section clarifying competitions are optional
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

## Competition-Optional Attendee Invitation

The `You Don't Need To Compete To Attend.` section has been moved higher in the homepage flow so visitors see it before reaching the detailed competition cards.

Current placement:

- After `Hero`
- After `CountdownTimer`
- After `MomentumBadges`
- Before platform discovery, ecosystem, and competition detail sections

Verification for this placement update:

- `npm run lint` passed
- `npm run build` passed

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

`Target Date: October 17, 2026`

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
- `a224513` Earlier ONVIBE Festival date update
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

### October 3 Event Artwork Update

- Added the second official October 3 Halloween event flyer to the homepage flyer spotlight.
- Kept the existing Costume-Kini flyer visible so both approved event designs are represented.
- Promoted the new orange Halloween flyer in the upcoming-event card and social sharing metadata.
- Verified the artwork uses its original aspect ratio without cropping or distortion.
- `npm run lint` passed.
- `npm run build` passed.

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

### Creator Spotlight Brand Mark

- Replaced the abstract Portal Burst symbol with the human-centered Creator Spotlight mark.
- The central creator is now the immediate focal point at both header and feature sizes.
- Cyan, violet, and magenta signal fields represent discovery, connection, and amplification across the wider web.
- Kept the mark open and asymmetrical so it communicates movement beyond a closed platform.
- Verified the production SVG in the live landing-page header at desktop and mobile viewport sizes.

### Public Preregistration And Creator Opportunities

- Added a durable GetOnVibe early-access interest list for creators, businesses, and fans/community members; visitors can preserve multiple interests in one submission.
- Added phased creator-opportunity interests for GetOnVibe promotional assignments, coordinated brand campaigns, direct brand collaborations, events/activations, general onboarding, and future membership updates.
- Added internal `/creators` and `/businesses` information routes so public education and signup no longer depend on unavailable subdomains.
- Restored `Find Your Vibe.` as the primary homepage message and retained `Find your people.` as supporting language.
- Added the homepage `Your creativity. More possibilities.` section, three paid-work paths, and an explicitly illustrative creator-profile example.
- Made preregistration the primary homepage closing action while keeping partnerships, press, sponsorships, and contact secondary.
- Added admin visibility for audience interests, opportunity interests, source, consent time, and confirmation status.
- Saves occur before confirmation email delivery; email failure does not remove a saved lead, and repeat submissions merge interests by normalized email.
- Added a visible ambient-motion pause/resume control and reduced-motion behavior.
- Added an obvious route from ONVIBE Events back to the GetOnVibe homepage, retained future dates as TBA, and labeled October 3 as a previous event.
- Verified `/`, `/platform`, `/creators`, `/businesses`, `/events`, `/contact`, and `/admin/login` return successfully in local development.
- Verified malformed preregistration requests return validation errors and bot-trap submissions do not create records.
- `npx tsc --noEmit`, `npm run lint`, and `npm run build` pass. This repo does not define an `npm run typecheck` script.
- Production database migration and true end-to-end lead/email verification remain release steps; no production deployment or DNS change was made in this work.

### Cinematic Public Pathway Heroes

- Added distinct cinematic hero experiences to `/platform`, `/creators`, `/businesses`, and `/contact` so the visual energy of the homepage continues through every primary public pathway.
- Created four purpose-built Higgsfield images grounded in real creative environments: a connected production table, a multidisciplinary creator studio, an independent culture storefront, and a backstage collaboration table.
- Added a shared cinematic hero system with media-first compositions, expressive type, moving cyan/violet/magenta light currents, subtle texture, clear calls to action, and page-specific positioning.
- Preserved the existing cinematic homepage and ONVIBE Events presentation rather than replacing their established visual systems.
- Fixed a broad layout rule that pulled the public header into document flow and created excess space above inner-page artwork; the public header now remains fixed as designed.
- Kept ambient motion controllable and compatible with reduced-motion preferences, with mobile controls positioned below expanded navigation.
- Confirmed the new hero imagery contains no generated text, logos, fake metrics, or claimed creator work.
- Desktop and mobile visual captures were reviewed for all four updated public pages with no horizontal overflow.

### Transitional Preregistration Database Recovery

- Provisioned a dedicated managed PostgreSQL database for the temporary public website and attached it only to the DigitalOcean App Platform service.
- Applied the existing Prisma migrations at service startup without changing the separate GetOnVibe platform or its Convex data.
- Verified preregistration persistence, repeat-submission deduplication, and merged Creator, Business, and Fan/Community interests with a controlled synthetic submission.
- Removed the synthetic verification record after testing and kept database credentials out of source control and public output.
- Reworded the remaining public creator-opportunity sentences so no em dashes appear in page verbiage.

### Events Page Timeline Update

- Reframed the Events hero around following GetOnVibe for the next event announcement rather than presenting the completed October 3 event as current.
- Moved the October 3 event details and official flyers into a clearly labeled Previous Events section.
- Preserved future-event signup actions so visitors can receive the next date, location, and participation announcement.

### Beta-Accurate Product Experience Previews

- Replaced the generic creator-profile illustration with product previews grounded in the current `getonvibe-app` design system.
- Added a media-first Pulse preview with the current content filters, creator metadata, action rail, and bottom navigation behavior.
- Added a stacked Swipe preview with the current discovery lanes, Back, Pass, Heart, and Share actions, and focused card presentation.
- Added a role-aware creator Profile preview covering identity, Creator Studio tools, content, Live Vibes, events, and official destinations without invented performance metrics.
- Added the product experience showcase to both the homepage and Platform page.
- Added `Launch begins December 1, 2026` to the homepage hero and shared public navigation.

### Pop-Up Events Return Navigation

- Replaced the subtle Events-page home label with a clear `Back to GetOnVibe` control.
- The control returns visitors directly to the main GetOnVibe homepage and remains visible in the fixed Events header on desktop and mobile.

### Business Page Layout Correction

- Rebalanced the four business benefit cards so wide screens use one complete row, medium screens use a deliberate two-by-two grid, and mobile uses one column.
- Widened the business early-access introduction and constrained its headline scale so the message uses intentional lines instead of a tall stack of isolated words.

### Business Discovery And Creator Intelligence Story

- Expanded the Business page to give businesses the same clear discovery and cross-platform amplification promise presented to creators.
- Added phased creator reports and creator-fit guidance based on relevant GetOnVibe engagement and connected creator information.
- Added planned hands-on campaign creation, creator briefing, and selected GetOnVibe advertising placement support.
- Clarified that creator profiles act as a complete social resume, helping brands discover creators inside GetOnVibe and reach the audiences those creators have built elsewhere.

### Cinematic Homepage Navigation Hub

- Evolved the homepage hero into the primary GetOnVibe navigation hub while preserving every existing public page and the full homepage story below it.
- Added a prominent GetOnVibe mark and wordmark lockup over the existing cinematic Higgsfield hero media.
- Added a `Find Your Vibe` destination dock for Platform, Creators, Businesses, Pop-Up Events, and Early Access.
- Added an explicit Home destination to the shared public header so every Platform, Creator, Business, and Contact page returns directly to the cinematic front door.
- Kept the Events page's dedicated `Back to GetOnVibe` control and retained reduced-motion support for the hero experience.

### Contact Form And Email Routing

- Removed the incorrect public `hello@getonvibe.com` address from the Contact page.
- Replaced the email link with a complete, accessible contact inquiry form for partnerships, creator opportunities, business campaigns, events, press, community connections, and general inquiries.
- Added server-side validation, bot-trap handling, and server-only Resend delivery with the visitor's email set as the reply address.
- Kept Resend credentials out of the browser and added clear submission success and failure states.

