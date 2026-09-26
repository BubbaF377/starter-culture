> **Do not move, rename, or edit this file.** Devkeep generates and maintains this onboarding guide automatically at each release — manual edits will be overwritten the next time a release is tagged.

# Orientation: starter-culture

## What you're looking at

This repo is the marketing/brand site for StarterCulture, an AI-native dev studio, built with Astro and deployed to GitHub Pages at `starterculturestudio.com`. It also doubles as the project home for a separate product, **Devlore** (an "agentic knowledge base," published as `@starterculture/devlore`) — hence the `devlore-*.yml` workflows and several `docs/*.md` files that aren't about this website at all. Don't assume everything in `docs/` or `.github/workflows/` is about the site; check which system a file actually belongs to before touching it.

## Read these first

1. `docs/PRODUCT.md` — the living product/discovery doc. Treat it as closer to a spec than to documentation-as-afterthought: an external tool (Devlore) depends on its exact path and on a specific structural convention (below), so don't move or restructure it casually.
2. `src/layouts/Layout.astro`, `src/components/Header.astro`, `src/components/Footer.astro`, `src/styles/site.css` — this is where shared markup/styling lives. Any change to nav, the wordmark, or design tokens belongs here, not duplicated into individual pages.
3. `src/pages/index.astro` — the actual live homepage: a single scrolling page (hero/studio/products/contact).
4. `.github/workflows/pages-deploy.yml` — the only workflow that deploys *this* site. Everything else with `devlore-` in the name is unrelated automation for the other product.

## Decisions you need to know about (and why)

**The site is Astro, not flat HTML, because a sibling studio project already used Astro.** It was rebuilt from a single static `index.html` specifically to keep tooling/deploy workflows consistent across the studio's properties. If you're tempted to "simplify" by dropping the build step, that consistency is the reason not to.

**Deploys happen on published GitHub Releases (`release: published`, tag pattern `v*`), never on push to `main`.** This was deliberately changed from deploying straight off `main` HEAD, so that "code merged" and "site live" are separate checkpoints. Practical upshot: if you merge something and the site doesn't change, that's *expected* — you (or someone) still needs to cut a release. Don't "fix" this by wiring deploy back to `main` push; that was the previous, rejected behavior.

**Header/Footer and shared CSS were extracted into components (`Header.astro`, `Footer.astro`, `site.css`) once a second and third page were added**, specifically to avoid three copies of the nav/wordmark markup drifting out of sync. Any new page should import these rather than inline its own header/footer. Page-specific styling stays local to that page's `<style>` block — only tokens/typography/header/footer belong in `site.css`.

**The homepage's "single scroll page, no navigating away" rule is not absolute anymore.** It still holds for the in-page nav (hero/studio/products/contact must stay in-scroll), but the *footer* is explicitly permitted to link out to standalone pages (About, Client Portal). If you're adding a footer link, that's sanctioned; if you're adding a top-nav link that leaves the page, that isn't.

**Login is split into two distinct, passwordless flows, not one shared form:** Client Login (Client ID → one-time passcode) and Company/Team Login (email → magic link). This replaced an earlier single email/password placeholder — don't reintroduce a unified password login, that was superseded.

**Client Login does not use Supabase Auth at all**, despite Company Login using real Supabase Auth magic links. This was a deliberate correction to an earlier plan that would have made clients into `auth.users` rows via Supabase's email-OTP. Clients instead authenticate via Client ID + OTP verified by a server-side Edge Function (hashing the code with the service_role key), which issues its own short-lived session token; reads go through a `SECURITY DEFINER` function, never a direct RLS-governed table. `clients` and `client_otp_codes` intentionally have **no** RLS policy for `anon`/`authenticated` — that's not a bug, that's the point: it keeps `to authenticated` synonymous with "is staff" everywhere else in the schema, so don't add a policy "fixing" client access to those tables via the Data API.

**Client session tokens travel in a custom `x-client-session` header, not `Authorization`.** `Authorization` is already consumed by Supabase's platform-level key verification before an Edge Function body even runs, so overloading it for the client-session token collides with that check. Any new Edge Function needing to check a client session should follow this same header convention.

**Auth (both flows) targets a dedicated, new Supabase project for starter-culture**, not the existing `perfect-stranger` project — kept separate on purpose so the two products' `auth.users`, email templates, and redirect allowlists don't mix.

## Gotchas — things that look like mistakes but aren't

- **`src/pages/_about.astro` and `_clients.astro` (underscore prefix).** Astro's router excludes underscore-prefixed files from the build entirely. This is intentional: they're wireframes-in-progress (About/team page, and a Client Portal login UI preview) that are deliberately *not* live yet. If you need them routed, you rename them — don't assume they're dead code to delete, and don't assume they're accidentally broken.
- **All the client-portal Supabase/Edge Function design (Client ID+OTP, `x-client-session`, dedicated Supabase project) describes a backend for a page that isn't currently routed.** The portal UI is a documented preview "ahead of backend connection." Don't be surprised that the auth architecture is fairly detailed while the page itself isn't live — that's the current state, not an inconsistency.
- **The site doesn't deploy when you merge to `main`.** This is a deliberate, twice-reinforced decision (it shows up as its own decision more than once in the project's history), not a broken CI pipeline. Check whether a release was cut before assuming a deploy failed.
- **Docs under `docs/` are not all about this site.** `ONBOARDING.md`, `TEST_PLAN.md`, `USER_MANUAL.md`, `VISUALIZER.md` exist but their contents weren't characterized anywhere available to this guide — given the Devlore connection, treat their scope as unconfirmed until you actually open them, rather than assuming they document the marketing site.
- **`docs/PRODUCT.md` requirements have a specific required shape** (Devkeep, the tool that reads this repo, depends on it): each requirement is a numbered item under `## Requirements`, stated as a present-tense rule, with any dated context/history in a `**History.**`-marked block *inside* that same item — not collected into a separate changelog section. If you edit PRODUCT.md, keep rule-changes and understanding-only changes visibly distinct, or Devlore's derived docs (test plans, user manuals) may silently stop updating or regenerate incorrectly.

## What isn't covered here

The internals of the `devlore-*.yml` workflows, and the actual contents of `ONBOARDING.md`/`TEST_PLAN.md`/`USER_MANUAL.md`/`VISUALIZER.md`, are not established by anything available to this guide. Don't assume behavior for those — read the files themselves before relying on them.

## Clean checkout to a working change

1. Clone, install per `package.json` (Astro + no other frontend framework — expect plain `.astro` components, no React/Vue).
2. Run the Astro dev server to preview `index.astro` (and, if you rename `_about.astro`/`_clients.astro` to drop the underscore, they'll appear in local routing too — remember to revert that rename before committing unless you actually mean to ship them).
3. For any page-level change: reuse `Header`/`Footer`/`site.css` rather than inlining; put page-specific styling in that page's own `<style>` block.
4. For anything touching nav structure: confirm whether it's in-scroll (must not navigate away) or a footer link (may lead to a separate page) — these follow different rules now.
5. Commit and merge to `main` as normal — this alone does **not** publish the site.
6. To actually publish, cut a GitHub Release with a `v*` tag; `pages-deploy.yml` builds from that tag and publishes `index.html`/`assets/`/`CNAME` to GitHub Pages under the custom domain. Confirm the GitHub Pages branch/tag policy still permits `v*` if you're troubleshooting a failed deploy.
7. If your change touches auth/backend design for the client portal or company login, check it against the Supabase-project-isolation, RLS, and header-naming decisions above before implementing — those aren't stylistic preferences, they're structural constraints later parts of the schema/policies rely on.
