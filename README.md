# ONVIBE Events / GetOnVibe Entertainment Hub

Production-ready temporary entertainment hub for ONVIBE Events and the GetOnVibe event-led launch strategy. The current homepage promotes the October 3, 2026 GetOnVibe Costume-Kini Halloween event in Old Hickory while capturing attendee, model, food vendor, and brand activation leads.

## Stack

- Next.js App Router
- TypeScript
- Tailwind CSS
- Framer Motion
- Remotion Player
- Lucide React
- Zod
- Resend
- Prisma
- PostgreSQL

## Local Development

```bash
npm install
npm run db:push
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
DATABASE_URL=
AUTH_SECRET=
ADMIN_EMAIL=
ADMIN_PASSWORD_HASH=
```

`RESEND_API_KEY` is required for actual email sending. `RESEND_FROM_EMAIL` should be a verified Resend sender for attendee, vendor, and hotel partner confirmation emails. `RESEND_INTERNAL_FROM_EMAIL` is optional and should be a different verified sender, such as `ONVIBE Leads <leads@getonvibe.com>`, for internal lead notifications. Internal lead notifications are always sent to `support@getonvibe.com` and `office@lobbicore.com`. `LEADS_NOTIFY_EMAIL` is optional and can add comma-separated internal recipients, such as `office@lobbicore.com,support@getonvibe.com`. Audience IDs are optional; when blank, the API skips audience contact creation and still sends notification and confirmation emails.

`DATABASE_URL` is required for the admin dashboard, user accounts, events, interest tracking, and message logs. Use a production PostgreSQL database on DigitalOcean or another managed provider. `AUTH_SECRET` signs admin and user login sessions and must be at least 32 characters. `ADMIN_EMAIL` and `ADMIN_PASSWORD_HASH` control the admin login at `/admin/login`; generate the password hash with:

```bash
npm run admin:hash
```

## Admin And Account Dashboard

The project includes a database-backed dashboard workflow:

- `/admin/login`: Admin login.
- `/admin`: Admin dashboard for account review, event posting, interest review, participant confirmation, and outbound messages.
- `/login`: Public account registration and login for bikini team applicants, vendors, and attendees.
- `/dashboard`: User dashboard for viewing posted events, showing interest, seeing confirmed status, signing the model release when applicable, and using the `Can't Make It` action.

Admin workflow:

1. Set `DATABASE_URL`, `AUTH_SECRET`, `ADMIN_EMAIL`, and `ADMIN_PASSWORD_HASH`.
2. Run `npm run db:migrate` after the production database is attached, or `npm run db:push` for local development.
3. Log in at `/admin/login`.
4. Post event dates from the admin dashboard.
5. Review auto-approved account registrations as needed.
6. Review event interest and confirm participants.
7. Message everyone, attendees, models, vendors, interested users, confirmed users, or a direct recipient.

Email workflow:

- New bikini team and vendor registrations notify `support@getonvibe.com`, `office@lobbicore.com`, and any email in `LEADS_NOTIFY_EMAIL`.
- Event interest submissions notify the internal team.
- Signed model releases notify the internal team and include a generated PDF copy.
- Confirmed participants receive an email and see confirmed status in their dashboard.
- If a confirmed participant clicks `Can't Make It`, the internal team is notified.
- Admin messages are delivered by Resend and logged in the database.

## Logo Assets

The site references these files:

- `public/logos/GetOnVibe.png`
- `public/logos/OnVibeFestival.png`

The supplied logo files have been copied into `public/logos`. Before production deployment, confirm both files are present and preserve their original colors, glow, and aspect ratios.

## Event Flyer Assets

The temporary ONVIBE Events homepage references:

- `public/events/flyer1.jpeg`
- `public/events/flyer2.jpeg`
- `public/event-assets/getonvibe-october-3-costume-kini.png`
- `public/event-assets/getonvibe-october-3-costume-kini.mp4`

The updated Costume-Kini flyer and six-second video are used prominently in the event hero, flyer spotlight, tour listing, and Remotion-powered cinematic reel.

## Forms and API

The event hub forms submit JSON to `POST /api/signup`:

- Attendee event updates
- Model activation signup
- Food vendor inquiry
- Brand activation inquiry
- Hotel partnership inquiry
- Store host inquiry
- Creator co-promotion inquiry

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

Set all production environment variables in DigitalOcean. Do not expose `RESEND_API_KEY` as a public variable. After attaching the production PostgreSQL database, run `npm run db:migrate` once from a trusted deployment console or update the App Platform build process to run migrations before release.

## Resend Setup Reminder

Verify the sending domain or sender address in Resend before production. Set `RESEND_FROM_EMAIL` to that verified sender. Add audience IDs only after the audiences are created in Resend.
