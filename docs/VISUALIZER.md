<!-- devlore:visualizer source-hash:3b84c138c180f6207604925ae1092a1364e4ee8b83ae856b8c02687249fbd2d5 -->
> **Do not move, rename, or edit this file.** Devlore generates and maintains this diagram automatically from `docs/PRODUCT.md`'s requirements — manual edits will be overwritten the next time Devlore detects the requirements have changed. To change what's diagrammed, update `docs/PRODUCT.md` itself.

A note first: the baseline snapshot describes the repo's **current** actual state as a plain static site (`index.html`, `assets/`, root `CNAME`), while `docs/PRODUCT.md` describes a **target** Astro-based rebuild (`astro.config.mjs`, `src/layouts`, `src/pages`, `public/`) that hasn't landed yet per the file tree. The diagrams below show both, clearly separated, rather than blending them into one false "as-built" picture.

```mermaid
flowchart TB
    subgraph Current["Current repo state (per file tree)"]
        idx["index.html<br/>(single static page:<br/>header/nav, hero, about,<br/>products, contact, footer)"]
        assets["assets/<br/>starter-culture-logo.svg<br/>starter-culture-avatar.svg"]
        cname["CNAME<br/>(starterculturestudio.com)"]
        docs["docs/<br/>PRODUCT.md, TEST_PLAN.md,<br/>USER_MANUAL.md, VISUALIZER.md"]
        wf["/.github/workflows/<br/>pages-deploy.yml<br/>devlore-*.yml"]

        idx -->|inlines SVG marks from| assets
        wf -->|deploys| idx
        wf -->|copies| cname
        wf -->|reads/processes| docs
    end

    subgraph Target["Target architecture (per PRODUCT.md, not yet built)"]
        cfg["astro.config.mjs"]
        layout["src/layouts/Layout.astro"]
        indexPage["src/pages/index.astro<br/>(inlined logo marks in<br/>header/hero/footer)"]
        notFound["src/pages/404.astro"]
        pub["public/<br/>assets/starter-culture-logo.svg<br/>assets/starter-culture-avatar.svg<br/>CNAME, robots.txt"]

        cfg --> layout --> indexPage
        indexPage --> notFound
        indexPage -->|references| pub
    end

    docs -.->|specifies requirements for| Target
```

This second diagram shows the outside services the project actually touches: GitHub Pages hosting/build tooling, DNS for the custom domain, the npm registry (where Devlore is linked from the Products section), and the studio's contact email — all explicitly named in the docs.

```mermaid
flowchart LR
    site["starter-culture site<br/>(index.html today /<br/>Astro build target)"]

    ghpages["GitHub Pages<br/>(hosting)"]
    ghaction["withastro/action@v3<br/>(build action, per<br/>pages-deploy.yml, target state)"]
    ghrelease["GitHub Releases<br/>(release: published event<br/>triggers deploy)"]
    dns["DNS provider<br/>(A records / CNAME for<br/>starterculturestudio.com —<br/>open/unresolved per docs)"]
    npm["npm registry<br/>@starterculture/devlore<br/>(linked from Products section)"]
    email["dev@starterculturestudio.com<br/>(contact address)"]

    site -->|deployed to| ghpages
    ghrelease -->|triggers build via| ghaction
    ghaction -->|produces build for| ghpages
    ghpages -->|served at custom domain via| dns
    site -->|links out to| npm
    site -->|displays contact| email
```

This third diagram reflects the docs' explicit statement that this single repo doubles as both the StarterCulture marketing site and the "Devlore-linked" project repo — i.e., it's wired into Devlore's own automation and it's the canonical place Devlore's product page/npm link points back to. No separate Devlore source repo is described in the material, so it isn't drawn as a distinct node beyond what's evidenced.

```mermaid
flowchart TB
    repo["BubbaF377/starter-culture<br/>(this repo — public)"]
    site["StarterCulture marketing site<br/>(index.html / target Astro app)"]
    devloreDocs["docs/PRODUCT.md, TEST_PLAN.md,<br/>USER_MANUAL.md, VISUALIZER.md<br/>(Devlore project docs, dogfooded)"]
    devloreCI[".github/workflows/devlore-*.yml<br/>(analyze, capture-baseline-draft,<br/>capture-baseline-seed, release)"]
    devlorePkg["@starterculture/devlore<br/>on npm"]

    repo --> site
    repo --> devloreDocs
    repo --> devloreCI
    devloreCI -->|analyzes/documents| devloreDocs
    site -->|Products section links to| devlorePkg
```
