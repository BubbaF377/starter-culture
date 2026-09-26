> **Do not move, rename, or edit this file.** Devkeep generates and maintains this onboarding guide automatically at each release — manual edits will be overwritten the next time a release is tagged.

# Starting on starter-culture

This is the marketing/brand site for StarterCulture (a small AI-native dev studio run by Christian), built with Astro and deployed to GitHub Pages at `starterculturestudio.com`. It also doubles as the project home for **Devlore**, a separate studio product — several workflows and `docs/PRODUCT.md` exist for Devlore's benefit, not the website's. Keep that dual purpose in mind: some things in this repo aren't "for the site" at all.

## Read these first

1. **`docs/PRODUCT.md`** — the living product/discovery doc. Treat it as authoritative for intent, not just background reading: an external tool (Devlore) parses it and depends on its exact path and structure. If you edit it, follow the format convention below.
2. **`src/pages/index.astro`**, **`src/components/Header.astro`/`Footer.astro`**, **`src/styles/site.css`** — this is the actual live site: a single-page scroll (hero/studio/products/contact) with shared header/footer markup and shared design tokens pulled out so they don't drift across pages.
3. **`astro.config.mjs`** and **`.github/workflows/pages-deploy.yml`** — how the site is built and (critically) how deploys are gated.
4. The `docs/ONBOARDING.md`, `TEST_PLAN.md`, `USER_MANUAL.md`, `VISUALIZER.md` files exist but their contents aren't summarized anywhere available to this guide — don't assume what they say, go read them before relying on them.

## Shape of the code

- Astro v5, static-generated, file-based routing under `src/pages/`. No frontend framework dependencies beyond Astro itself.
- Shared header/footer and site-wide tokens/typography live in `Header.astro`/`Footer.astro`/`site.css`; each page's own visual quirks stay in that page's scoped `<style>` block. This split exists specifically so `about`/`clients` pages didn't have to duplicate the header (including the inlined SVG wordmark) and could be added without drifting from the homepage. **Follow this pattern for any new page** — import `Header`/`Footer`/`site.css` rather than inlining copies.
- The site was rebuilt from a hand-rolled static `index.html` into Astro specifically to match the tooling already used by a sibling studio project (`heartland-fermenters-guild`). If you're wondering why there's a build step at all for what looks like a simple site, that's why.

## Pages that exist but aren't live

`src/pages/_about.astro` and `src/pages/_clients.astro` are prefixed with an underscore **on purpose** — Astro's router skips anything underscore-prefixed, so these don't build or deploy. They're wireframes-in-progress: an About/team page, and a client portal login page. Don't "fix" this by assuming the underscore is a typo. If the intent is to actually launch one of them, that means deliberately dropping the underscore, not just discovering it.

Note that the project's own history shows work moving *toward* treating About/Client-Portal as real footer-linked pages (breaking an earlier strict single-page-only rule), and shared Header/Footer components were built out assuming those pages would be real routes. The current file tree shows they've since been pulled back behind the underscore prefix — so the "real page" state described in earlier design decisions is not what's currently deployed. Don't restate that older state as current; the underscore prefix is what's true now.

## Deploy model — the thing most likely to surprise you

The site does **not** deploy on every push/merge to `main`. `.github/workflows/pages-deploy.yml` triggers only on `release: published` (tag pattern `v*`), builds the tagged release with `withastro/action@v3`, and publishes to GitHub Pages with a custom domain (`public/CNAME`, DNS at Porkbun). This replaced an earlier setup where pushes to `main` went live immediately with no custom domain — that direct-from-`main` behavior was deliberately abandoned because it gave no checkpoint between "merged" and "live." **If you merge a change and it isn't showing up on the live site, that's expected — you need to cut a GitHub Release.** Any future change to deploy behavior needs to preserve this release-gate, and the GitHub Pages branch/tag policy needs to keep permitting the `v*` pattern.

## Auth design for Client/Company login — designed, not yet built

This is architecture that's been decided in the product doc but is **not yet implemented or live** (no Supabase project has even been created for it yet, per the most recent decision on the subject). It's worth understanding before you touch the `_clients.astro` draft or any future auth work, because the reasoning is easy to accidentally undo:

- There are two separate, passwordless-style login flows, not one unified login: **Client Login** (Client ID → one-time passcode) and **Company Login** (email → magic link). This replaced an earlier single email/password design.
- **Client Login deliberately does not use Supabase Auth at all**, even though it easily could have (email-OTP is a built-in Supabase Auth feature). Instead, a server-side Edge Function verifies a hashed passcode with the service_role key and issues its own short-lived session token; `clients` and `client_otp_codes` have no RLS policy exposing them to `anon`/`authenticated` roles at all. This was chosen specifically so that **every future RLS policy in the project can treat `to authenticated` as meaning "is staff"** — if clients were real `auth.users` rows, that simplification would break and every staff-only policy would need an extra allowlist check instead.
- Because of that, the client session token travels in a custom `x-client-session` header, never `Authorization` — `Authorization` is reserved for Supabase's own platform-level JWT check, and reusing it caused a real collision when this was first tried.
- Auth for this site will live in its **own, dedicated Supabase project**, not the one already used by another studio product (`perfect-stranger`) — reusing that project was considered and rejected specifically to avoid mixing two products' `auth.users`, email templates, and redirect allowlists.

If you pick up the client-portal work, build toward this design; don't quietly reach for Supabase Auth's built-in OTP for clients because it looks simpler — that was tried in thinking and specifically rejected for the RLS reason above.

## `docs/PRODUCT.md` conventions

If you edit requirements in this doc, they must be numbered items under `## Requirements`, each a present-tense rule. Any historical context — why it used to be different, what bug forced the current shape — goes in a `**History.**` block *inside* that same item, not in a separate changelog section. This isn't stylistic preference: Devlore's tooling diffs requirements to regenerate derived docs (test plans, user manuals), and prose or buried history makes changes invisible to it. The same `**History.**` marker convention applies elsewhere in the docs too, attached to whatever heading it explains.

## Getting from a clean checkout to a working change

The available documents don't give exact `npm` script names or a confirmed local-dev command — treat `package.json` and `astro.config.mjs` as the source of truth for that rather than assuming standard Astro defaults are unmodified. In general:

- Install deps, run Astro's dev/build commands, edit under `src/pages`/`src/components`, keep shared styles in `site.css` and page-specific styles local.
- Don't expect to see your change live by merging to `main` — deploying to production requires cutting a tagged GitHub Release.
- If your change touches `_about.astro`/`_clients.astro`, remember they're intentionally unrouted; leave the underscore unless you're deliberately shipping the page.
- If your change touches `docs/PRODUCT.md`, keep to the numbered-requirement/`History` format so Devlore's tooling keeps working.

## What's genuinely unknown from here

The internals of the `devlore-*.yml` workflows, the contents of `docs/ONBOARDING.md`/`TEST_PLAN.md`/`USER_MANUAL.md`/`VISUALIZER.md`, and the exact markup inside the Astro pages/components haven't been characterized anywhere available — don't guess at their behavior, go read them directly before changing anything that touches them.
