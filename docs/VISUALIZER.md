<!-- devlore:visualizer source-hash:9fe948fbdf8a97973e0586a48295b3bd7420a00f35cfb684b0afa49045e04868 -->
> **Do not move, rename, or edit this file.** Devlore generates and maintains this diagram automatically from `docs/PRODUCT.md`'s requirements — manual edits will be overwritten the next time Devlore detects the requirements have changed. To change what's diagrammed, update `docs/PRODUCT.md` itself.

**Internal structure** — this shows how the Astro site's own pages, shared components, styles, and static assets fit together, based on the file/page layout described in the product doc and baseline snapshot.

```mermaid
graph TD
    Config[astro.config.mjs] --> Layout[src/layouts/Layout.astro]

    Layout --> Header[src/components/Header.astro]
    Layout --> Footer[src/components/Footer.astro]
    Layout --> SiteCSS[src/styles/site.css]
    Layout --> DropdownScript[shared outside-click script<br/>closes login dropdown]

    Header --> LoginDropdown[Login dropdown: details/summary<br/>Client Login / Company Login]
    Footer --> LoginDropdown
    Header -. inlined wordmark SVG/text .-> LogoAssets
    Footer -. inlined wordmark SVG/text .-> LogoAssets

    Layout --> Index[src/pages/index.astro<br/>header/hero/studio/products/contact/footer]
    Layout --> ClientLogin[src/pages/client-login.astro<br/>UI only, not wired to auth]
    Layout --> CompanyLogin[src/pages/company-login.astro<br/>UI only, not wired to auth]
    Layout --> NotFound[src/pages/404.astro]
    Layout -. excluded from routing .-> AboutDraft[src/pages/_about.astro<br/>wireframe, unpublished]

    ClientLogin --> ClientIDForm[Client ID form]
    ClientIDForm --> PasscodeStep[passcode-entry step<br/>client-side only]

    CompanyLogin --> EmailForm[email form]
    EmailForm --> CheckEmailStep[check-your-email step<br/>client-side only]

    Index --> ProductsSection[Products section]
    ProductsSection --> DevloreLink[Devlore listing<br/>Beta pill + npm link]

    PublicDir[public/] --> LogoAssets[starter-culture-logo.svg<br/>starter-culture-avatar.svg]
    PublicDir --> CNAME[CNAME]
    PublicDir --> Robots[robots.txt]
    Layout --> PublicDir
```

**External dependencies** — this shows the outside services the site relies on or is planned to rely on: GitHub Pages/Actions for hosting and deploys, Porkbun for DNS, the npm registry for the Devlore product link, and the not-yet-created Supabase project for auth/data once login and the admin area are built.

```mermaid
graph LR
    Repo[starter-culture repo] -->|release: published triggers| Workflow[.github/workflows/pages-deploy.yml<br/>withastro/action@v3]
    Workflow --> GHPages[GitHub Pages hosting]
    GHPages -->|custom domain via CNAME| Domain[starterculturestudio.com]
    Porkbun[Porkbun DNS<br/>apex A records + www CNAME] --> Domain
    GHPages -->|HTTPS cert issued| Domain

    IndexPage[index.astro Products section] -->|external link| NPM[npm registry<br/>@starterculture/devlore package]

    ClientLoginPage[client-login.astro] -.planned.-> Supabase[(Supabase project<br/>dedicated instance, not yet created)]
    CompanyLoginPage[company-login.astro] -.planned.-> Supabase
    Supabase -.planned.-> SupabaseAuth[Supabase Auth<br/>email OTP for clients,<br/>magic link for company]
    Supabase -.planned.-> SupabaseDB[(Supabase tables<br/>clients, personnel)]
    ClientLoginPage -.planned, ID lookup.-> EdgeFn[Supabase Edge Function<br/>candidate for Client ID → email lookup]
    EdgeFn -.planned.-> SupabaseDB
```

**Linked repos/projects** — the docs describe this single repo as doing double duty: it hosts the marketing site *and* Devlore-specific docs/automation, and separately the site links out to Devlore's published npm package. No other external repo connection is described, so no separate repo-to-repo diagram beyond this is included.

```mermaid
graph TD
    Repo[BubbaF377/starter-culture<br/>single repo] --> SiteCode[Site code<br/>src/, public/, astro.config.mjs]
    Repo --> DevloreDocs[docs/<br/>PRODUCT.md, ONBOARDING.md,<br/>TEST_PLAN.md, USER_MANUAL.md, VISUALIZER.md]
    Repo --> DevloreWorkflows[.github/workflows/devlore-*.yml<br/>analyze, capture-baseline-draft,<br/>capture-baseline-seed, release]

    SiteCode --> ProductsSection[Products section links out]
    ProductsSection -->|npm package link| DevloreNPM[npm: @starterculture/devlore<br/>Beta]

    DevloreWorkflows -. automation for .-> DevloreProduct[Devlore product itself]
    DevloreDocs -. documents .-> DevloreProduct
    DevloreProduct -. published as .-> DevloreNPM
```
