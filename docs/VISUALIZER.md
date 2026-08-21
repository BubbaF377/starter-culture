<!-- devlore:visualizer source-hash:ab7a06df95c9654d1e275570d9935b9744218b8e2537abbe2367276e546c9917 -->
> **Do not move, rename, or edit this file.** Devlore generates and maintains this diagram automatically from `docs/PRODUCT.md`'s requirements — manual edits will be overwritten the next time Devlore detects the requirements have changed. To change what's diagrammed, update `docs/PRODUCT.md` itself.

Since the baseline snapshot describes file names and the product doc describes required structure, but neither shows actual code contents beyond what's summarized, these diagrams are grounded in that inferred/declared structure only.

**1. Internal structure** — how pages, shared layout/components, and styles fit together per the site's Astro conventions.

```mermaid
graph TD
    Layout["src/layouts/Layout.astro"]
    Header["src/components/Header.astro<br/>(takes 'links' prop)"]
    Footer["src/components/Footer.astro"]
    SiteCSS["src/styles/site.css<br/>(shared tokens/typography/header/footer)"]

    Index["src/pages/index.astro<br/>(hero, studio/about, products, contact — scoped styles)"]
    About["src/pages/_about.astro<br/>(wireframe, unlinked/unrouted)"]
    Clients["src/pages/_clients.astro<br/>(wireframe login, unlinked/unrouted)"]
    Err["src/pages/404.astro"]

    LogoWordmark["public/assets/starter-culture-logo.svg"]
    LogoAvatar["public/assets/starter-culture-avatar.svg"]
    CNAME["public/CNAME"]
    Robots["public/robots.txt"]

    Index --> Layout
    About --> Layout
    Clients --> Layout
    Err --> Layout

    Layout --> Header
    Layout --> Footer
    Layout --> SiteCSS

    Header --> SiteCSS
    Footer --> SiteCSS

    Header -. "inlined wordmark <text>, sans-serif" .-> LogoWordmark
    Footer -. "inlined wordmark <text>, sans-serif" .-> LogoWordmark
    Index -. "references" .-> LogoAvatar

    Index --> Products["Products section:<br/>Devlore card (Beta pill)"]
    Products -- "external link" --> NpmLink["npmjs.com/package/@starterculture/devlore"]

    Footer -. "future link once ready" .-> About
    Footer -. "future link once ready" .-> Clients
```

**2. External dependencies** — the outside services the built/deployed site relies on (hosting, DNS, CI action, and the linked npm package).

```mermaid
graph LR
    Repo["BubbaF377/starter-culture (GitHub repo)"]
    Workflow[".github/workflows/pages-deploy.yml"]
    Action["withastro/action@v3"]
    Pages["GitHub Pages<br/>(env deploy branch policy allows v* tags + main)"]
    Domain["starterculturestudio.com<br/>(custom domain via CNAME)"]
    Porkbun["Porkbun DNS<br/>(4 apex A records → GH Pages IPs,<br/>www CNAME → bubbaf377.github.io)"]
    Cert["GitHub-issued HTTPS cert<br/>(apex + www)"]
    Npm["npm registry:<br/>@starterculture/devlore package page"]

    Repo -- "release: published (tag vX.Y.Z)" --> Workflow
    Workflow --> Action
    Action --> Pages
    Pages --> Domain
    Porkbun --> Domain
    Domain --> Cert
    Repo -- "Products section links out to" --> Npm
```

**3. Other linked repos/projects** — the product doc explicitly describes this repo doing double duty as Devlore's own dogfooding target and linking to Devlore's published package; it also names a sibling studio site sharing the same template, which is noted here as a documented reference point rather than a runtime dependency.

```mermaid
graph TD
    ThisRepo["starter-culture repo<br/>(StarterCulture site source)"]
    DevloreWorkflows["devlore-*.yml workflows<br/>(analyze, capture-baseline-draft/seed, release, devlore.yml)"]
    DevloreProduct["Devlore<br/>(agentic knowledge base product, showcased on site)"]
    DevloreDocs["docs/PRODUCT.md, ONBOARDING.md,<br/>TEST_PLAN.md, USER_MANUAL.md, VISUALIZER.md"]
    NpmPkg["npm: @starterculture/devlore"]
    Sibling["heartland-fermenters-guild<br/>(sibling studio site, same stack/shape — referenced, not integrated)"]

    ThisRepo -- "runs Devlore automation on itself (dogfooding)" --> DevloreWorkflows
    DevloreWorkflows -- "documents pushes into" --> DevloreDocs
    DevloreWorkflows -. "implements/exercises" .-> DevloreProduct
    ThisRepo -- "Products section links to" --> NpmPkg
    NpmPkg -. "published artifact of" .-> DevloreProduct
    ThisRepo -. "shares Astro/GH Pages template pattern with (no direct link)" .-> Sibling
```
