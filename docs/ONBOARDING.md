> **Do not move, rename, or edit this file.** Devkeep generates and maintains this onboarding guide automatically at each release — manual edits will be overwritten the next time a release is tagged.

# Starting on starter-culture: an orientation

## What you're looking at

This repo is the marketing/brand site for **StarterCulture**, a small AI-native dev studio, served at `starterculturestudio.com` via GitHub Pages. It also doubles as the project home for a *different* studio product, **Devlore** (an agentic knowledge base, currently in Beta) — hence the `devlore-*.yml` workflows and several `docs/*.md` files sitting alongside the site code. Don't assume everything in this repo is "the website"; some of it is Devlore's project infrastructure riding along in the same place.

Read `docs/PRODUCT.md` first. It's not incidental documentation — it's explicitly load-bearing: an external tool (Devlore) depends on it living at that exact path, and it's written in a specific format on purpose (see "Requirement format" below). After that, read `astro.config.mjs`, `src/layouts/Layout.astro`, `src/components/Header.astro`/`Footer.astro`, and `src/styles/site.css` — in that order you'll have the whole shared skeleton the pages hang off of.

The other docs in `docs/` — `ONBOARDING.md`, `TEST_PLAN.md`, `USER_MANUAL.md`, `VISUALIZER.md` — exist but their contents aren't summarized anywhere I can confirm. Don't assume what's in them; open them.

## Where the actual logic lives

- **Routing** is Astro's file-based router over `src/pages/`. `index.astro` is the real, live homepage — a single scrolling page (hero/studio/products/contact).
- `src/pages/_about.astro` and `src/pages/_clients.astro` (note the leading underscore) are **deliberately excluded from the build**. Astro's router ignores underscore-prefixed files entirely. These are wireframes-in-progress — an About/team page and a client-portal login page — that are not live and would need to be renamed (underscore dropped) before they'd ever be routed or deployed. If you're asked to "finish the client portal," the first real step is almost certainly dropping that underscore, not writing new routing.
- **Shared chrome** (header, footer, the inlined-SVG wordmark, design tokens/typography) lives in `src/components/Header.astro`, `Footer.astro`, and `src/styles/site.css`. Page-specific styling stays local in each page's own `<style>` block — that split is intentional, not an oversight; don't move page-specific CSS into `site.css` "for consistency," and don't duplicate header/footer markup into a new page instead of importing the components.
- **Deploy** is `.github/workflows/pages-deploy.yml`. **Static assets** (logos, `CNAME`, `robots.txt`) are in `public/`.
- **Devlore automation** (`devlore-analyze.yml`, `devlore-capture-baseline-draft.yml`, `devlore-capture-baseline-seed.yml`, `devlore-release.yml`, `devlore.yml`) is separate from the site's own deploy pipeline. Treat these as another product's CI living in this repo — I don't have their internal logic confirmed, only the filenames and the general Devlore connection, so don't assume you understand what they do without reading them.

## Decisions you need to know about before you change things

**Deploys are release-gated, not push-gated.** `pages-deploy.yml` fires on `release: published` (tags matching `v*`), not on every push/merge to `main`. This was a deliberate move away from continuous deployment, specifically so the live custom-domain site reflects intentional, versioned publishes rather than every commit. **Consequence for you:** merging to `main` does nothing to the live site. If you need something live, you cut a release. If you're told "the site is broken," check the latest *release* content, not `main` HEAD.

**Astro is the standing convention for studio sites**, adopted specifically to unify tooling with another studio project (`heartland-fermenters-guild`) that already used it. There's no other frontend framework in this project (per `package.json`) — don't introduce React/Vue/etc. for a single component; that goes against why Astro was chosen here.

**The single-page-scroll model was relaxed, on purpose, to allow footer-linked auxiliary pages.** The site used to be a strict single-scroll page with no page-to-page navigation. That invariant was deliberately loosened: the homepage's in-scroll nav still must not navigate away, but the *footer* is now allowed to link to standalone pages (About, Client Portal). If you see footer links to separate `.astro` files, that's sanctioned, not scope creep — but don't add in-scroll nav links that leave the page; that distinction still holds.

**Client login and Company login are two different, deliberately non-symmetric flows** — not an accident of half-finished work:
- **Client Login:** Client ID → one-time passcode, verified by a server-side Edge Function (hashing the code, using the service_role key), issuing its own short-lived session token. **It does not use Supabase Auth at all.** An earlier plan had leaned toward Supabase's built-in email-OTP for this — that was explicitly abandoned. The reason matters: keeping clients out of `auth.users` lets every RLS policy elsewhere in the project treat `to authenticated` as a synonym for "is staff," with no separate allowlist table needed. If you ever "simplify" Client Login back onto Supabase Auth, you break that assumption everywhere else.
- **Company Login:** real Supabase Auth, email + magic link, for staff.
- Client session tokens are passed in a custom `x-client-session` header, never `Authorization` — `Authorization` is already claimed by Supabase's own platform-level JWT check and will collide with a custom token if you put it there. Any new Edge Function needing client-session auth should follow the same `x-client-session` pattern.
- `clients` and `client_otp_codes` tables have no RLS grant to `anon`/`authenticated`; `client_otp_codes` specifically is meant to be reached only via a direct Postgres connection from an Edge Function, never through the Data API/PostgREST. Don't "fix" a missing RLS policy on these — the absence is the design.
- Auth for this site runs on its **own, separate Supabase project**, deliberately not the one used by the studio's other product (`perfect-stranger`), to keep `auth.users`, email templates, and redirect-URL allowlists from mixing across products.

**Both login flows are, per the docs, UI previews ahead of backend connection** — and given that `_clients.astro` isn't even routed yet, treat the auth architecture above as the *designed* target, not confirmed-working code. Check current file state before assuming the OTP/magic-link machinery is actually wired up anywhere live.

**Requirements in `docs/PRODUCT.md` follow a specific, tool-readable format**: numbered items under `## Requirements`, each a present-tense rule; any dated context, past approaches, or bugs that shaped the rule go in a `**History.**` block *inside that same item*, not collected into a separate changelog section. Devlore diffs these to regenerate derived docs (test plans, user manuals). If you edit PRODUCT.md, keep rule changes and history-only changes distinguishable, and put history under the heading it explains — not at the end of the file.

## Gotchas — things that look like bugs or omissions but aren't

- `_about.astro` / `_clients.astro` not appearing in the built site: intentional, underscore-excluded, not a routing bug.
- The site not updating after you merge to `main`: intentional, deploy is release-triggered.
- Client login having no visible password field: intentional — passwordless by design, on both flows, just via different mechanisms (OTP vs. magic link).
- `client_otp_codes` seemingly unreachable via the API: intentional, Edge-Function-only by design.
- Auth session token showing up under a nonstandard header (`x-client-session`) instead of `Authorization`: intentional, to avoid colliding with Supabase's platform-level JWT check.
- Two Supabase projects existing for what looks like one studio: intentional, to keep this site's auth isolated from the other product's.

## From clean checkout to a working change

The docs available don't spell out exact npm scripts or a step-by-step dev workflow, so take this as the general Astro shape rather than confirmed commands: install dependencies, then use Astro's standard dev/build commands (`astro dev`, `astro build`) — `package.json` confirms Astro v5 as the only framework dependency, so there's no separate bundler/framework config to reconcile. Check `docs/ONBOARDING.md` before trusting my phrasing here — it may already say this precisely and supersede this paragraph.

For a typical content/markup change:
1. Read `docs/PRODUCT.md` for the current requirements and any relevant `**History.**` note before touching related code — the reasoning behind current shape usually lives there.
2. Edit the relevant page under `src/pages/`; use `Header`/`Footer` and `site.css` rather than inlining chrome, keeping page-specific styles in that page's own `<style>` block.
3. If you're working on About or the Client Portal, remember they're parked behind an underscore — decide explicitly whether your change is meant to make them live (drop the underscore) or keep them as in-progress wireframes.
4. Nothing you merge to `main` goes live by itself. To publish, cut a GitHub Release (tag matching `v*`); `pages-deploy.yml` builds and deploys from that tag, not from `main` HEAD.
5. If your change touches auth, re-check which side you're on (Client vs. Company) before reusing patterns — they are intentionally not interchangeable, and the RLS/session-header conventions above are load-bearing for the rest of the schema, not local hacks.
