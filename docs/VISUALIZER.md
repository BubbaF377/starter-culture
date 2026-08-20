<!-- devlore:visualizer source-hash:07e5c9192a4f0a385ad74ba525ef3484b01f0a0da8c0cd17bfeaa8bd7977abf5 -->
> **Do not move, rename, or edit this file.** Devlore generates and maintains this diagram automatically from `docs/PRODUCT.md`'s requirements — manual edits will be overwritten the next time Devlore detects the requirements have changed. To change what's diagrammed, update `docs/PRODUCT.md` itself.

No application source code exists yet in the codebase snapshot — only `docs/PRODUCT.md`, a placeholder `README.md`, and a set of `devlore-*.yml` GitHub Actions workflow files (contents unseen). The diagrams below are therefore best-effort reconstructions from the product doc's description of the intended site structure and deployment pipeline, plus the workflow filenames visible in the tree.

Shows the planned internal structure of the one-page site: the sections inside `index.html`, the logo assets it inlines/references, and the release-triggered workflow that assembles them into the published site.

```mermaid
flowchart TB
    subgraph SiteRepo["starter-culture repo (root)"]
        Index["index.html\n(single-page site)"]
        Assets["assets/\nstarter-culture-logo.svg\nstarter-culture-avatar.svg"]
        CNAME["CNAME\n(starterculturestudio.com)"]
        ProductDoc["docs/PRODUCT.md\n(source-of-truth doc)"]
    end

    subgraph Sections["index.html sections"]
        Header["Header / nav\n(inline wordmark)"]
        Hero["Hero\n'Small studio. Big ideas. AI-native.'\n(inline avatar/logo mark)"]
        About["Studio / about"]
        Products["Products\n(Devlore card + status pill)"]
        Contact["Contact\n(dev@starterculturestudio.com)"]
        Footer["Footer\n(inline logo mark, contact)"]
    end

    Index --> Header
    Index --> Hero
    Index --> About
    Index --> Products
    Index --> Contact
    Index --> Footer

    Header -.uses.-> Assets
    Hero -.uses.-> Assets
    Footer -.uses.-> Assets

    Deploy["pages-deploy.yml\n(on release: published)"]
    Deploy -->|checks out release tag,\ndeploys| Index
    Deploy -->|deploys| Assets
    Deploy -->|deploys| CNAME
```

Shows the outside services and destinations the project touches: GitHub Pages/Releases for publishing the site, DNS for the custom domain, and the npm registry link surfaced in the Products section.

```mermaid
flowchart LR
    Release["GitHub Release\n(tag published)"] --> Workflow["pages-deploy.yml"]
    Workflow --> Pages["GitHub Pages\n(BubbaF377/starter-culture)"]
    Pages --> Domain["starterculturestudio.com\n(custom domain via CNAME)"]
    DNS["DNS provider\n(A records / CNAME —\nopen question, not yet configured)"] -.resolves.-> Domain

    ProductsSection["Products section\n(Devlore entry)"] --> NPM["npmjs.com/package/@starterculture/devlore"]

    Visitor["Site visitor / browser"] --> Domain
    ContactSection["Contact section / footer"] --> Email["dev@starterculturestudio.com"]
```

Shows the real connection described in the docs: this single repository doubles as both the StarterCulture marketing site and the project repo that Devlore's automation targets, with a separate published npm package for Devlore itself.

```mermaid
flowchart TB
    subgraph Repo["BubbaF377/starter-culture (single repo, dual role)"]
        SiteFiles["Site files:\nindex.html, assets/, CNAME"]
        ProductDoc["docs/PRODUCT.md\n(devlore:product-doc)"]
        DevloreWorkflows["Devlore CI workflows:\ndevlore.yml\ndevlore-analyze.yml\ndevlore-capture-baseline-draft.yml\ndevlore-capture-baseline-seed.yml\ndevlore-release.yml"]
        PagesWorkflow["pages-deploy.yml"]
    end

    DevloreWorkflows -->|reads/analyzes| ProductDoc
    PagesWorkflow -->|publishes| SiteFiles

    NPMPackage["@starterculture/devlore\n(published npm package,\nlinked from site's Products section)"]

    SiteFiles -->|links to| NPMPackage
    DevloreWorkflows -.produces/relates to.-> NPMPackage
```
