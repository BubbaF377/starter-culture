<!-- devlore:onboarding -->
> **Do not move, rename, or edit this file.** Devlore generates and maintains this onboarding guide automatically at every release — manual edits will be overwritten at the next one. To change what's documented, update the underlying sources (`docs/PRODUCT.md`, decisions, master docs) instead.

# starter-culture — Onboarding Guide

## Where the important logic lives

This is a small Astro site, so "logic" is mostly markup, shared components, and CI/CD config rather than application code. Start with these:

- **`src/pages/index.astro`** — the homepage, a single-page scroll experience covering hero, studio, products, and contact sections. This is the core of the site.
- **`src/pages/about.astro`** and **`src/pages/clients.astro`** — auxiliary standalone pages, reachable only from the footer, not from in-scroll navigation.
- **`src/components/Header.astro`** and **`src/components/Footer.astro`** — shared header/footer markup, including the inlined SVG wordmark. `Header.astro` takes a `links` prop so each page can customize its nav.
- **`src/styles/site.css`** — shared tokens, typography, and header/footer styles, imported by every page. Page-specific styles stay local in each page's own `<style>` block — don't put page-specific CSS here.
- **`src/layouts/Layout.astro`** — the base layout wrapping pages.
- **`.github/workflows/pages-deploy.yml`** — the deploy pipeline; this is where "how does a code change actually reach the live site" is answered, and it's non-standard (see below).
- **`docs/PRODUCT.md`** — treat this as the living product/discovery doc and source of truth for intent. It's explicitly protected from being moved/renamed/deleted, and appears to be read by Devlore itself.
- **The `devlore-*.yml` workflows** — these aren't part of the site's build/deploy; they're Devlore's own automation running against this repo (this repo doubles as a dogfooding project for the Devlore product being showcased on the site).

## Why past decisions were made

- **Deploys are release-gated, not `main`-gated.** The site used to deploy on every push to `main`; it now deploys only on `release: published` (tags matching `v*`), building via `withastro/action@v3` and publishing `index.html`, `assets/`, and `CNAME` from the release tag. This was a deliberate move away from continuous deployment so that "code merged" and "site live" are distinct checkpoints, and so the custom domain (`starterculturestudio.com`, via `public/CNAME`) has a controlled cutover point rather than reflecting raw commit history.
- **Astro was adopted (over hand-rolled static HTML)** specifically to match the stack already used by a sibling studio project, `heartland-fermenters-guild`, so the studio has one consistent tooling/deploy approach across its static sites rather than maintaining two different build styles.
- **The site is not strictly single-page anymore.** It began as a strict single-page scroll with no navigable-away links. That invariant was relaxed specifically to allow an About page and a Client Portal page, but only reachable via the footer — in-scroll nav must still not navigate away from the homepage. This is a real, load-bearing distinction, not just a style choice.
- **Header/Footer/site CSS were extracted into shared components** once three pages existed, specifically to avoid re-duplicating the inlined SVG wordmark and shared styling across pages. The convention going forward: shared chrome and tokens live in `Header.astro`/`Footer.astro`/`site.css`; page-specific styling stays scoped per-page.

There's no master architecture doc populated yet — the decisions above (drawn from commit-linked decision records) are the only recorded rationale; nothing else should be assumed beyond them.

## Common gotchas

- **Merging to `main` does not deploy anything.** If you're used to continuous deployment, this will surprise you — going live requires cutting a GitHub Release with a `v*` tag. Check the latest release/tag, not `main` HEAD, when verifying "what's actually live."
- **In-scroll nav vs. footer links are governed by different rules.** Links inside the homepage's scroll sections must not navigate away from the page; links in the footer are explicitly allowed to lead to separate routes (`about.astro`, `clients.astro`). Don't casually add a homepage nav item that jumps to a new page — that breaks an intentional invariant.
- **`docs/PRODUCT.md` is protected** — there's an explicit instruction not to move, rename, or delete it, since it's apparently used as a source of truth by Devlore's own tooling. Treat it as special, not just another doc file.
- **Don't duplicate header/footer/shared CSS.** New pages should import `Header`/`Footer` and `src/styles/site.css` rather than inlining their own copies or redefining shared tokens — that's the pattern the extraction decision established, and drifting from it reintroduces the duplication problem it was meant to solve.
- **The `devlore-*` workflows are not this site's CI/CD.** They're a separate concern (Devlore dogfooding itself on this repo) layered onto the same repo as the marketing site's source. Don't assume changes to `pages-deploy.yml` affect them, or vice versa — and be aware the repo intentionally serves two purposes at once (an open question in `PRODUCT.md` is whether to eventually split these into separate repos).
- **GitHub Pages branch/tag policy must stay in sync** with the release-tag pattern (`v*`) for deploys to actually succeed — this is a manual repo-settings dependency, not something enforced by the workflow file alone.

## Where to start

1. Read `docs/PRODUCT.md` first — it's the maintained source of truth for what this site/studio is and why, and will orient you faster than the code will.
2. Open `src/pages/index.astro` alongside `src/components/Header.astro` and `Footer.astro` to see how the homepage composes shared chrome, then skim `about.astro` and `clients.astro` to see the footer-linked page pattern in practice.
3. Read `src/styles/site.css` to understand the shared design tokens before touching any page-specific `<style>` block.
4. Read `.github/workflows/pages-deploy.yml` to understand the release-gated deploy flow — try tracing what happens from `release: published` to the live custom domain.
5. Skim the other `docs/*.md` files (`ONBOARDING.md`, `TEST_PLAN.md`, `USER_MANUAL.md`, `VISUALIZER.md`) for any additional project-specific conventions not captured in the decisions above.
