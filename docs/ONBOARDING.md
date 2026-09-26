> **Do not move, rename, or edit this file.** Devkeep generates and maintains this onboarding guide automatically at each release — manual edits will be overwritten the next time a release is tagged.

# starter-culture — orientation for new contributors

## What you're looking at

This repo is the marketing/brand site for **StarterCulture**, an AI-native dev studio, deployed at `starterculturestudio.com`. It also does double duty as the project hub for a *separate* studio product called **Devlore** (an agentic knowledge base, currently in Beta) — hence the `devlore-*.yml` workflows and several of the `docs/` files that don't describe this website at all. Keep these two concerns mentally separate as you read: some of what's in this repo is "build/deploy the site," and some of it is "Devlore's own tooling happens to live here too." If you're here to work on the site, the Devlore workflows are mostly noise; if you're here for Devlore, the Astro site is the noise.

## Read first

1. **`docs/PRODUCT.md`** — the living product/discovery doc. Treat it as the source of truth for intent, not just background reading: it's explicitly load-bearing for Devlore's tooling, which depends on its exact path and on requirements being written a specific way (see "Devkeep format" below). If you change product behavior, this doc is where the decision should end up recorded, not just in a commit message.
2. **`src/layouts/Layout.astro`**, **`src/components/Header.astro`** / **`Footer.astro`**, **`src/styles/site.css`** — this is the shared skeleton every page builds on. Site-wide tokens, typography, and header/footer styling live in `site.css`; page-specific styling stays in that page's own `<style>` block. This split was deliberate (see below) — don't start duplicating header/footer markup into a new page instead of importing the components.
3. **`src/pages/index.astro`** — the actual live homepage: a single scrolling page (hero/studio/products/contact/footer).
4. **`.github/workflows/pages-deploy.yml`** — the only workflow that touches the public website's deploy. Everything else with `devlore-` in the name is unrelated to shipping the site.

## Architecture, in brief

- Astro v5, static site generation, file-based routing under `src/pages/`. No frontend framework (no React/Vue) — it's Astro components only.
- Static assets (logos, favicon-ish SVGs, `robots.txt`, `CNAME`) live in `public/`.
- The wordmark logo is inlined as SVG/text directly in the header/footer components (not just referenced as an image file) specifically so its fill and font-family can be controlled from CSS. If you see raw SVG markup where you expected an `<img>` tag, that's intentional, not someone forgetting to extract an asset.

## Why things are shaped this way (decisions a newcomer could accidentally undo)

- **Deploys are gated on GitHub Releases, not commits to `main`.** The site was originally deployed straight from `main` HEAD; that was deliberately abandoned. Now `pages-deploy.yml` fires on `release: published` (tags matching `v*`) and builds from that tag. **Merging to `main` does not update the live site.** If you're trying to "ship" something, you need to cut a release. This was decided more than once in this project's history — it's not an accident, don't route around it by re-adding a push-triggered deploy.
- **Astro replaced a hand-rolled static `index.html`.** This happened to bring the site in line with tooling used on another studio property (`heartland-fermenters-guild`). If you find yourself wanting to hand-edit a flat HTML file "for simplicity," that's the pre-Astro model — don't reintroduce it.
- **The site is no longer strictly single-page.** It used to be a hard rule that no nav link could navigate away from the homepage scroll. That rule was loosened: the homepage scroll (hero/studio/products/contact) still must not link out, but the **footer** is now allowed to link to standalone pages (`about`, `clients`). If you're adding a new standalone page, follow the footer-link pattern rather than either (a) cramming it into the scroll, or (b) reasoning from the old "single page only" rule as if it still applied everywhere.
- **`_about.astro` and `_clients.astro` are intentionally unrouted.** The leading underscore excludes them from Astro's build. They exist as wireframes-in-progress (an About/team page, and a client login portal), not because someone forgot to finish wiring them up. Do not "fix" this by dropping the underscore without checking whether the page is actually ready to go live — that's the whole point of the naming.
- **Login is two distinct, passwordless flows, not one form.** The site's login menu was originally a single "coming soon" email/password form. That was replaced: **Client Login** (Client ID → one-time passcode) and **Company Login** (email → magic link), each reachable from a shared Login menu, are the current design. If you see references to a unified password login anywhere, that's the superseded plan — build against the two-flow split instead.
- **Client Login does not use Supabase Auth at all**, even though Company Login does. This was a considered reversal: an earlier plan had Client Login riding on Supabase's built-in email-OTP (with a custom Client ID→email lookup in front of it), which was dropped because it would have broken a simplifying assumption the project wants to keep — that in Supabase Row Level Security policies, `to authenticated` can always mean "is staff," with no separate allowlist table. Instead: clients hit a server-side Edge Function that verifies a hashed one-time passcode using the service_role key and issues its own short-lived session token; client data reads go through a `SECURITY DEFINER` function, never a direct RLS policy. The tables `clients` and `client_otp_codes` intentionally have **no** RLS policy granting anon/authenticated access — `client_otp_codes` specifically is meant to be reachable only via a direct Postgres connection from an Edge Function, never through the Data API/PostgREST. If a future policy grants either table `to anon` or `to authenticated`, that's very likely a mistake reintroducing the thing this decision avoided.
- **Client session tokens travel in a custom `x-client-session` header, not `Authorization`.** This isn't stylistic — `Authorization` is already consumed by Supabase's own platform-level JWT check (against the publishable/anon key) before your function body even runs, so putting a client session token there collides with that check. Any new Edge Function that needs to authenticate a client session (as opposed to a real Supabase Auth user) should follow the same `x-client-session` convention.
- **This project has its own dedicated Supabase project, deliberately separate from the studio's other product (`perfect-stranger`).** Reusing that project was considered and rejected specifically to avoid mixing two products' `auth.users`, email templates, and redirect-URL allowlists. If you're setting up local/dev auth, make sure you're pointed at starter-culture's own project, not another studio property's.
- **`docs/PRODUCT.md` requirements have a required shape.** Because an external tool (Devkeep) diffs requirements to regenerate derived docs (test plans, user manuals), each requirement must be a numbered item under `## Requirements`, stated as a present-tense rule, with any dates/history/past-approaches/bugs-that-forced-the-current-shape moved into a `**History.**`-marked block attached to that same item (or to whatever heading it explains) — never collected into one end-of-file changelog, and never blended into the rule's prose. If you edit `PRODUCT.md`, follow this format or you'll silently break Devkeep's doc generation.

## Gotchas — things that look wrong but aren't

- Underscore-prefixed pages (`_about.astro`, `_clients.astro`) failing to appear in a build or a route list is correct behavior, not a bug.
- The site not updating after you merge to `main` is expected — check whether a release was actually cut.
- Finding client-related tables with seemingly no read access from the API is intentional lockdown, not a missing policy someone forgot to write.
- A client-session token that doesn't work when sent as a Bearer token in `Authorization` is expected — it belongs in `x-client-session`.
- The Login UI (Client ID/passcode, email/magic-link) may exist as a design/UI preview without a working backend yet — the decisions above describe the *intended* backend architecture, which is not confirmed here to be fully built. Don't assume the Edge Functions, tables, or Supabase project described exist and are wired up until you've checked.

## Known dead ends this project already tried and moved past

Worth knowing so you don't retread them, but not something to imitate:
- A single email/password login form ("coming soon") — replaced by the two-flow passwordless design.
- Client Login via Supabase's built-in email-OTP with a lookup step in front — replaced by the custom Edge-Function-verified passcode + session-token design, to preserve the "authenticated = staff" RLS simplification.
- Deploying straight from `main` HEAD — replaced by release-gated deploys.
- A flat, hand-rolled `index.html` with no build step — replaced by Astro.
- Duplicating header/footer/CSS across pages — replaced by shared `Header.astro`/`Footer.astro`/`site.css` once a second and third page (`about`, `clients`) were added.

## From clean checkout to a working change

The docs available don't spell out install/dev/test commands explicitly, so treat the following as the shape of the workflow, confirmed against `package.json`/config files rather than invented:
- It's a standard Astro project (`astro.config.mjs`, `tsconfig.json`, `package.json` with no framework dependencies beyond Astro) — expect the usual `npm install`, `npm run dev`, `npm run build` Astro commands to apply.
- To change the live homepage: edit `src/pages/index.astro`, using `Header`/`Footer` and `site.css` rather than inlining new copies.
- To bring `_about.astro` or `_clients.astro` closer to live, you'll eventually drop the underscore and add them to header/footer nav — but confirm first whether the backend they depend on (auth, Supabase) is actually ready; these were built as wireframes ahead of that work.
- To actually publish a change to the live site: merge to `main`, then cut a GitHub Release (tag matching `v*`) — that release-published event is what triggers `pages-deploy.yml`.
- If your change touches `docs/PRODUCT.md`, follow the numbered-requirement + `**History.**` convention so Devkeep's derived docs stay in sync.

## What's not covered here

There's no confirmed information in the source material about local test tooling/CI checks beyond the deploy and Devlore workflows, no confirmed contents of `docs/ONBOARDING.md`, `TEST_PLAN.md`, `USER_MANUAL.md`, or `VISUALIZER.md` (names only, contents unseen), and no confirmation of whether the Client/Company Login backend (Edge Functions, Supabase tables) has actually been implemented versus only designed. Check those directly before assuming behavior either way.
