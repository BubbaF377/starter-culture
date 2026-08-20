<!-- devlore:onboarding -->
> **Do not move, rename, or edit this file.** Devlore generates and maintains this onboarding guide automatically at every release — manual edits will be overwritten at the next one. To change what's documented, update the underlying sources (`docs/PRODUCT.md`, decisions, master docs) instead.

# starter-culture — Onboarding Guide

## Where the important logic lives

Based strictly on what's visible here, there are two distinct layers to understand, and they don't fully agree with each other yet:

- **`.github/workflows/`** — this is the most concrete part of the repo. The `devlore-*` workflows (`devlore-analyze.yml`, `devlore-capture-baseline-draft.yml`, `devlore-capture-baseline-seed.yml`, `devlore-release.yml`, `devlore.yml`) appear to drive an automated documentation/analysis process ("Devlore") that reads `docs/PRODUCT.md` and generates baseline docs like the one this guide is built from. If you're touching CI at all, start by reading these files in full — their contents aren't shown in the source material, only their names, so don't assume behavior beyond what's evidenced.
- **`docs/PRODUCT.md`** — marked with `<!-- devlore:product-doc -->` and currently a template. This file is load-bearing for the Devlore tooling: it needs to exist at that exact path and eventually needs real product content, since Devlore apparently depends on it as the canonical source of truth.
- **A GitHub Pages site** — not visible in the file tree/README snapshot, but the recorded decisions reference `.github/workflows/pages-deploy.yml` and a build that publishes `index.html`, `assets/`, and `CNAME` from a release tag. This means there is (or was) actual site content and a deploy pipeline that the top-level baseline overview didn't capture. Treat the decisions as the more trustworthy signal here than the "no application code" framing in the README/PRODUCT.md summary — reconcile this discrepancy early rather than assuming one source is simply wrong.

There is no evidence of application source directories, package manifests, or a language/framework choice anywhere in the material. Don't assume one.

## Why past decisions were made

Two recorded decisions exist, and they both describe the same underlying change (likely recorded at different points/commits):

- **Pages deployment is gated behind published GitHub Releases, not `main` HEAD.** Previously, pushes to `main` deployed straight to GitHub Pages with no checkpoint between "merged" and "live," and no custom domain. The team moved to a model where `release: published` (via `.github/workflows/pages-deploy.yml`) checks out the release tag, builds/publishes `index.html`, `assets/`, and `CNAME`, and serves the result at the custom domain `starterculturestudio.com`.
- **Alternative rejected:** deploying from `main` HEAD on every push — rejected because it couples deploys to ordinary commits with no review/release checkpoint. Keeping the default `*.github.io` URL was also rejected in favor of the branded custom domain.
- **Consequence to internalize:** merging to `main` does **not** update the live site. Going live requires cutting a GitHub Release. If you're verifying "is my change live," check the latest published release and the custom domain — not `main`.

No other architectural or strategic decisions are recorded yet.

## Common gotchas

- **Merging ≠ deploying.** This is the single most important non-obvious fact here: normal commits to `main` have no effect on the live site. Only a published Release triggers the Pages deploy workflow (plus manual dispatch, per the decision record).
- **`docs/PRODUCT.md` isn't just documentation — it's an input to tooling.** It's tagged with a `devlore:product-doc` marker and, per the baseline notes, its exact path and existence matter to the Devlore workflows. Don't casually rename, move, or delete it, and be aware that editing it may be feeding an automated analysis/doc-generation pipeline, not just informing human readers.
- **The baseline snapshot and the decision log disagree on whether there's a real site.** The top-level overview describes an empty repo with no application code, while the decisions describe an `index.html`/`assets/`/`CNAME` build feeding GitHub Pages. Don't take either document as complete on its own — the file tree you're handed may be stale or partial relative to what the deploy pipeline actually publishes.
- **`CNAME` is committed at the repo root** for the custom domain (`starterculturestudio.com`) — if you're touching Pages config, know that domain binding is a deliberate, already-made decision, not something to casually change or drop.

## Where to start

1. Read the `devlore-*` workflow YAML files in `.github/workflows/` end-to-end — right now their names are all anyone (including this guide) can go on, and understanding what each actually does will resolve a lot of ambiguity about how this repo's tooling operates.
2. Read `.github/workflows/pages-deploy.yml` specifically, alongside the two recorded decisions above, to understand the release-gated deploy flow before touching anything Pages-related.
3. Open `docs/PRODUCT.md` and check whether it's still the placeholder template — if so, filling it in is likely both a genuine product-definition task and something the Devlore tooling is waiting on.
4. Try to locate the actual site source (`index.html`, `assets/`) referenced by the deploy decisions but absent from the baseline file tree — confirming where it lives (or confirming it doesn't exist yet) will clear up the biggest inconsistency in the material available.
