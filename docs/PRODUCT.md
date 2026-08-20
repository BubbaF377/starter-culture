<!-- devlore:product-doc -->
> **Do not move, rename, or delete this file.** Devlore depends on finding it at exactly `docs/PRODUCT.md` to build your project's documentation and answer questions about it. Its content is yours — use it as your living discovery/product doc, and as source-of-truth context when brainstorming or planning with an AI agent.

# StarterCulture

Working name: **StarterCulture** (styled as one word, no space). Brand/marketing website for StarterCulture, Christian's small AI-native software development studio, hosted at starterculturestudio.com.

## Vision

A simple, single-page brand site that introduces StarterCulture as a small software development studio doing AI-first, AI-native development, and showcases the studio's products — starting with Devlore. The site should feel light, clean, and minimal, and give the studio a real home on the web that can grow to list future products.

## Requirements

1. Single scrolling one-page site (no multi-page nav) with sections: header/nav, hero, studio/about, products, contact, footer.
2. Visual style: light, clean, minimal aesthetic built around the studio's existing logo palette — cream (`#F5EFE1`/`#FBF8F1`), terracotta (`#B5482B`), dark brown (`#2B2320`).
3. Logo assets live in `assets/starter-culture-logo.svg` (wordmark) and `assets/starter-culture-avatar.svg` (icon-only mark), and are also inlined directly in `index.html` for the header, hero, and footer marks.
4. Brand name is styled **StarterCulture** — one word, no space — in all page copy, titles, meta tags, and aria-labels. (The logo's wordmark graphic itself uses a lowercase stylized "StarterCulture" per the logo file.)
5. Hero tagline: "Small studio. Big ideas. AI-native." with supporting line describing the studio as building with AI as a first-class collaborator from the first line of code.
6. Products section lists each product with a status pill reflecting its actual progress — "In development" or "Beta" (more stages may be added later as needed). Devlore currently uses a "Beta" pill, with this description: "Devlore is an agentic knowledge base that automatically documents every push across your project repos, with human review only at release time." Devlore also links out to its npm package: `https://www.npmjs.com/package/@starterculture/devlore`.
7. Contact section/footer uses `dev@starterculturestudio.com` as the studio contact address.
8. Deployment target: GitHub Pages from this repo (`BubbaF377/starter-culture`), with `starterculturestudio.com` as the custom domain (via the `CNAME` file at repo root). The live site tracks the latest published GitHub Release, not raw `main` HEAD — `.github/workflows/pages-deploy.yml` deploys `index.html`, `assets/`, and `CNAME` on each `release: published` event (checking out that release's tag), so publishing a new version of the site means cutting a new release/tag.

## Open questions

- DNS/custom domain setup for starterculturestudio.com still needs to be done (A records or CNAME depending on apex vs. `www`).
- This repo doubles as the StarterCulture site repo and the Devlore-linked project repo (docs/, `.github/workflows/devlore-*.yml`) — worth deciding later whether the site should eventually move to its own repo or subfolder if that ever becomes confusing.
- Future products beyond Devlore to add to the Products section, as they're ready to announce publicly.
