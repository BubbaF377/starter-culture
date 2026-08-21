<!-- devlore:visualizer source-hash:f048fb8589402c3161543c4735788488f328ed83eb0752606959c8b43062b58c -->
> **Do not move, rename, or edit this file.** Devlore generates and maintains this diagram automatically from `docs/PRODUCT.md`'s requirements — manual edits will be overwritten the next time Devlore detects the requirements have changed. To change what's diagrammed, update `docs/PRODUCT.md` itself.

Since the codebase snapshot is present (structure inferred from file tree, filenames, and PRODUCT.md), the diagrams below are grounded in that plus the product doc.

**1. Internal structure** — how the Astro site's own pages, layout, shared components, and static assets fit together.

```mermaid
graph TD
    Layout["src/layouts/Layout.astro"]
    Index["src/pages/index.astro (homepage: header/nav, hero, studio, products, contact, footer)"]
    About["src/pages/about.astro (company narrative + team cards)"]
    Clients["src/pages/clients.astro (login-gated wireframe)"]
    NotFound["src/pages/404.astro"]
    Header["src/components/Header.astro (props: links)"]
    Footer["src/components/Footer.astro"]
    SiteCSS["src/styles/site.css (tokens, typography, header/footer CSS)"]
    LogoWordmark["public/assets/starter-culture-logo.svg"]
    LogoAvatar["public/assets/starter-culture-avatar.svg"]
    CNAME["public/CNAME"]
    Robots["public/robots.txt"]

    Index --> Layout
    About --> Layout
    Clients --> Layout
    NotFound --> Layout

    Index --> Header
    Index --> Footer
    About --> Header
    About --> Footer
    Clients --> Header
    Clients --> Footer

    Header --> SiteCSS
    Footer --> SiteCSS
    Index --> SiteCSS
    About --> SiteCSS
    Clients --> SiteCSS

    Header -. inlined wordmark text .-> LogoWordmark
    Footer -. inlined wordmark text .-> LogoWordmark
    Index -.-> LogoAvatar

    Footer --> About
    Footer --> Clients
```

**2. External dependencies** — the outside services/APIs the built and deployed site actually relies on.

```mermaid
graph LR
    Repo["starter-culture repo (BubbaF377/starter-culture)"]
    Action["withastro/action@v3 (GitHub Actions build)"]
    Workflow[".github/workflows/pages-deploy.yml (triggers on release: published)"]
    Pages["GitHub Pages hosting"]
    DNS["Porkbun DNS\n(4 apex A records + www CNAME)"]
    Domain["starterculturestudio.com"]
    Cert["GitHub-issued HTTPS certificate"]
    NPM["npmjs.com/package/@starterculture/devlore"]
    User["Site visitor / browser"]

    Repo --> Workflow --> Action --> Pages
    Pages --> Cert
    DNS --> Domain
    Domain --> Pages
    User --> Domain
    Index2["Products section (index.astro)"] -. links out to .-> NPM
```

**3. Linked repos/projects** — the product doc explicitly describes this same repo also being used by Devlore's own automation (dogfooding), and names a sibling studio site sharing the same stack, so both are included as real, documented connections.

```mermaid
graph TD
    Repo["starter-culture repo"]
    Docs["docs/ (PRODUCT.md, ONBOARDING.md, TEST_PLAN.md, USER_MANUAL.md, VISUALIZER.md)"]
    WF1["devlore.yml"]
    WF2["devlore-analyze.yml"]
    WF3["devlore-capture-baseline-draft.yml"]
    WF4["devlore-capture-baseline-seed.yml"]
    WF5["devlore-release.yml"]
    DevloreProduct["Devlore (agentic knowledge-base product, showcased on the site)"]
    HFG["heartland-fermenters-guild (sibling studio site repo)"]

    Repo --> WF1
    Repo --> WF2
    Repo --> WF3
    Repo --> WF4
    Repo --> WF5
    WF1 --> DevloreProduct
    WF2 --> DevloreProduct
    WF3 --> DevloreProduct
    WF4 --> DevloreProduct
    WF5 --> DevloreProduct
    DevloreProduct -. reads/writes .-> Docs
    Docs -. source of truth for .-> Repo

    Repo -. "same stack/repo shape (no direct integration)" .-> HFG
```
