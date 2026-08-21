<!-- devlore:visualizer source-hash:93dc1f67fb5327d146601f6762be70fc148b59a6b0eb9650d4275e86529a3475 -->
> **Do not move, rename, or edit this file.** Devlore generates and maintains this diagram automatically from `docs/PRODUCT.md`'s requirements — manual edits will be overwritten the next time Devlore detects the requirements have changed. To change what's diagrammed, update `docs/PRODUCT.md` itself.

Since no live source files were provided beyond the file tree and prose descriptions, these diagrams are built from the product doc's explicit structural claims (components, tables, workflows) rather than from inspected code.

**Internal structure** — how the Astro pages, shared components/layout, and styling pieces fit together on the site itself.

```mermaid
graph TD
    Layout["src/layouts/Layout.astro<br/>(wraps all pages; outside-click script<br/>for closing login dropdown)"]

    subgraph Pages["src/pages/*.astro"]
        Index["index.astro<br/>(home: header/hero/studio/products/contact/footer)"]
        ClientLogin["client-login.astro<br/>(UI only, not wired to auth)"]
        CompanyLogin["company-login.astro<br/>(UI only, not wired to auth)"]
        About["_about.astro<br/>(underscore-prefixed = unrouted wireframe)"]
        NotFound["404.astro"]
        AboutPageFuture["about.astro (planned)<br/>renders Builders/Advisors from personnel table"]
    end

    Header["src/components/Header.astro<br/>(nav + inlined wordmark SVG + login dropdown)"]
    Footer["src/components/Footer.astro<br/>(footer nav + inlined wordmark + login dropdown, opens upward)"]
    SiteCSS["src/styles/site.css<br/>(tokens, typography, header/footer,<br/>login-dropdown, auth-card styles)"]
    Assets["public/assets/<br/>starter-culture-logo.svg<br/>starter-culture-avatar.svg"]

    Layout --> Index
    Layout --> ClientLogin
    Layout --> CompanyLogin
    Layout --> NotFound
    Layout -.excluded from build.-> About
    About -.rename, drop underscore.-> AboutPageFuture

    Index --> Header
    Index --> Footer
    ClientLogin --> Header
    ClientLogin --> Footer
    CompanyLogin --> Header
    CompanyLogin --> Footer

    Header --> SiteCSS
    Footer --> SiteCSS
    Index --> SiteCSS
    Header -. references .-> Assets
    Footer -. references .-> Assets
```

**External dependencies** — the outside services the site (and its planned auth/admin flows) call or deploy through.

```mermaid
graph LR
    Site["StarterCulture Astro site<br/>(static output)"]

    subgraph Supabase["Supabase project: starter-culture<br/>(wklchodmfgmtsateuryy.supabase.co, Canada Central)"]
        Auth["Supabase Auth<br/>(magic link — Company Login only;<br/>staff = rows in auth.users)"]
        DBClients["Postgres: clients table<br/>(exposed via Data API, RLS: staff only)"]
        DBOtp["Postgres: client_otp_codes table<br/>(RLS: no policies; not exposed via Data API;<br/>reached only by future direct Postgres connection)"]
        DBPersonnel["Postgres: personnel table<br/>(exposed via Data API,<br/>public select, staff write)"]
        EdgeFn["Edge Function (not yet built)<br/>Client ID→email lookup,<br/>OTP issue/verify, session token"]
    end

    GH["GitHub repo: BubbaF377/starter-culture"]
    Actions["GitHub Actions<br/>pages-deploy.yml (withastro/action@v3)<br/>triggered on release: published"]
    Pages["GitHub Pages hosting"]
    Porkbun["Porkbun DNS<br/>(4 apex A records + www CNAME)"]
    NPM["npm registry<br/>@starterculture/devlore package"]

    Site -->|Company Login: request magic link| Auth
    Site -->|client-facing pages, future admin forms| DBClients
    Site -->|About page team section| DBPersonnel
    EdgeFn -->|verify/issue OTP| DBOtp
    Site -.planned Client Login flow.-> EdgeFn

    GH --> Actions
    Actions -->|builds & deploys tagged release| Pages
    Porkbun -->|A records / CNAME| Pages
    Pages -->|serves| Site

    Site -->|Devlore product link in Products section| NPM
```

**Repo's dual purpose (Devlore connection)** — this repo isn't only the marketing site; per the baseline snapshot it also hosts Devlore's own project docs and automation, and the site links out to Devlore's published package.

```mermaid
graph TD
    Repo["starter-culture repo (BubbaF377/starter-culture)"]

    subgraph SiteConcern["Marketing site concern"]
        SitePages["src/pages, src/components, src/styles"]
        SiteWorkflow["pages-deploy.yml"]
        ProductDoc["docs/PRODUCT.md<br/>(devlore:product-doc — read by Devlore tooling)"]
    end

    subgraph DevloreConcern["Devlore project concern (same repo)"]
        DevloreDocs["docs/ONBOARDING.md, TEST_PLAN.md,<br/>USER_MANUAL.md, VISUALIZER.md"]
        DevloreWorkflows["devlore-analyze.yml<br/>devlore-capture-baseline-draft.yml<br/>devlore-capture-baseline-seed.yml<br/>devlore-release.yml<br/>devlore.yml"]
    end

    Repo --> SiteConcern
    Repo --> DevloreConcern

    ProductPage["Homepage Products section"] -->|links to| NPMPkg["npm: @starterculture/devlore"]
    SitePages --> ProductPage
    DevloreWorkflows -.produces/relates to.-> NPMPkg
```
