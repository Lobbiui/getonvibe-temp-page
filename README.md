# ONVIBE Events / GetOnVibe Entertainment Hub

Production-ready temporary entertainment hub for ONVIBE Events and the GetOnVibe event-led launch strategy. The current homepage promotes real-world ONVIBE activations, including the Bikini Carwash event at Smokeville, while capturing attendee, model, food vendor, and brand activation leads.

## Stack

- Next.js App Router
- TypeScript
- Tailwind CSS
- Framer Motion
- Remotion Player
- Lucide React
- Zod
- Resend

## Local Development

```bash
npm install
npm run dev
```

Open the local URL printed by Next.js.

## Required Environment Variables

Create `.env.local` from `.env.example`:

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

`RESEND_API_KEY` is required for actual email sending. `RESEND_FROM_EMAIL` should be a verified Resend sender for attendee, vendor, and hotel partner confirmation emails. `RESEND_INTERNAL_FROM_EMAIL` is optional and should be a different verified sender, such as `ONVIBE Leads <leads@getonvibe.com>`, for internal lead notifications. Internal lead notifications are always sent to `support@getonvibe.com` and `office@lobbicore.com`. `LEADS_NOTIFY_EMAIL` is optional and can add comma-separated internal recipients, such as `office@lobbicore.com,support@getonvibe.com`. Audience IDs are optional; when blank, the API skips audience contact creation and still sends notification and confirmation emails.

## Logo Assets

The site references these files:

- `public/logos/GetOnVibe.png`
- `public/logos/OnVibeFestival.png`

The supplied logo files have been copied into `public/logos`. Before production deployment, confirm both files are present and preserve their original colors, glow, and aspect ratios.

## Event Flyer Assets

The temporary ONVIBE Events homepage references:

- `public/events/flyer1.jpeg`
- `public/events/flyer2.jpeg`

These flyers are used in the event hero, flyer gallery, and Remotion-powered cinematic reel.

## Forms and API

The event hub forms submit JSON to `POST /api/signup`:

- Attendee event updates
- Model activation signup
- Food vendor inquiry
- Brand activation inquiry
- Hotel partnership inquiry

Validation runs client-side and server-side with Zod. Attendee age is checked on both sides. Resend API keys are only used server-side.

## Build and Quality Checks

```bash
npm run lint
npm run build
```

## DigitalOcean App Platform Deployment

Use a GitHub-connected DigitalOcean App Platform app.

Recommended settings:

- Source: GitHub repository sync
- Build command: `npm run build`
- Run command: `npm run start`
- Environment: Node.js
- Static export: disabled

Set all production environment variables in DigitalOcean. Do not expose `RESEND_API_KEY` as a public variable.

## Resend Setup Reminder

Verify the sending domain or sender address in Resend before production. Set `RESEND_FROM_EMAIL` to that verified sender. Add audience IDs only after the audiences are created in Resend.
