<!-- devlore:onboarding -->
> **Do not move, rename, or edit this file.** Devlore generates and maintains this onboarding guide automatically at every release — manual edits will be overwritten at the next one. To change what's documented, update the underlying sources (`docs/PRODUCT.md`, decisions, master docs) instead.

# starter-culture — Onboarding Guide

## Where the important logic lives

This is a small, dual-purpose repo, so "important logic" splits into two tracks rather than one deep module hierarchy:

- **`index.html`** — the entire marketing site. There's no build system, no `src/`, no framework — just a static HTML page with inlined SVGs and (per `docs/PRODUCT.md`) presumably inline/`<style>` CSS built around a defined brand palette (cream, terracotta, dark brown). If you're touching the visible site, this file and the `assets/` folder (the two logo SVGs) are essentially the whole surface area.
- **`docs/PRODUCT.md`** — not just documentation but a load-bearing file: it explicitly warns not to move, rename, or delete it, since Devlore's tooling depends on its exact path. Read this first regardless of what you're working on.
- **`.github/workflows/pages-deploy.yml`** — the deploy pipeline for the live site. It's the piece of "logic" most likely to surprise you (see Gotchas below): it triggers on `release: published`, not on pushes to `main`, checks out the release tag, and publishes `index.html`, `assets/`, and `CNAME` to GitHub Pages at the custom domain `starterculturestudio.com`.
- **The `devlore-*.yml` workflows** (`analyze`, `capture-baseline-draft`, `capture-baseline-seed`, `release`) — these wire the repo into Devlore's own automation. Their exact mechanics aren't detailed in the material available, but their presence means this repo doubles as a working example/host for Devlore itself, dogfooding its own docs pipeline.
- **`docs/TEST_PLAN.md`, `docs/USER_MANUAL.md`, `docs/VISUALIZER.md`** — exist alongside `PRODUCT.md` but their contents haven't been reviewed yet in what's available here; don't assume you know what's in them until you've actually opened them.

## Why past decisions were made

Two recorded decisions exist, and they both describe the same underlying change (recorded twice, likely at different points), so treat them as one decision with reinforced rationale:

- **GitHub Pages deploys from published Releases, not `main` HEAD.** The site used to go live on every push to `main`, with no checkpoint between "merged" and "live" and no custom domain. The team deliberately moved to a model where `.github/workflows/pages-deploy.yml` only fires on `release: published` (plus manual dispatch), publishing the release tag's `index.html`, `assets/`, and `CNAME` to the custom domain `starterculturestudio.com`. The explicit tradeoff accepted: going live now requires cutting a GitHub Release — merging to `main` alone does nothing to production anymore.

There's no other recorded decision history beyond this at present — don't infer additional rationale for things like the choice of static HTML over a framework, or the specific docs layout; those aren't documented as deliberate decisions here, just as the current state of things.

## Common gotchas

- **Merging to `main` does not update the live site.** This is the single most likely thing to trip someone up, and it's a deliberate, recorded change from the previous behavior. If you push a fix and check `starterculturestudio.com` expecting to see it, you won't — you (or someone) needs to cut a release first. Any test/verification of "is the site live" must check against the latest release's content, not raw `main`.
- **`docs/PRODUCT.md` must not move, rename, or be deleted.** It says so itself, because Devlore's automation depends on its exact path. Treat this as a hard constraint, not a suggestion.
- **This repo has two identities at once.** It's simultaneously the StarterCulture marketing site and a Devlore-linked project repo used to dogfood Devlore's automation. Per `PRODUCT.md`, whether these should eventually split into separate repos is an open, unresolved question — so don't assume today's structure is final, and be aware that changes you make for "the site" may have side effects on Devlore's own tooling, or vice versa.
- **DNS for the custom domain is flagged as still pending** in the docs — if something looks unfinished or inconsistent around the `CNAME`/domain setup, that's likely why, not a bug you introduced.
- **No build step to fall back on.** Since there's no `package.json`, bundler, or `src/` directory evident, everything in `index.html` (including inlined SVG markup) is hand-maintained directly — there's no generation step you're missing.

## Where to start

1. Read `docs/PRODUCT.md` in full — it's explicitly the anchor document for both the site's intent and Devlore's tooling, and it's the one file you're forbidden from restructuring casually.
2. Open `index.html` and the two SVGs in `assets/` to see the actual current site — it's small enough to read end-to-end in one sitting.
3. Read `.github/workflows/pages-deploy.yml` closely so the release-gated deploy model (see Decisions above) is concrete in your head before you make any change you expect to see live.
4. Skim the remaining three docs (`TEST_PLAN.md`, `USER_MANUAL.md`, `VISUALIZER.md`) and the `devlore-*.yml` workflow filenames to get oriented on the Devlore-dogfooding side of the repo, even though their exact contents/mechanics aren't detailed here — you'll want to know they exist before you touch anything docs-adjacent.
