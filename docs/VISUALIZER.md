<!-- devlore:visualizer source-hash:1918d46f8716c86b81ce49d290186b9f607be0e9ec5e90321674667e50eecb63 -->
> **Do not move, rename, or edit this file.** Devlore generates and maintains this diagram automatically from `docs/PRODUCT.md`'s requirements — manual edits will be overwritten the next time Devlore detects the requirements have changed. To change what's diagrammed, update `docs/PRODUCT.md` itself.

Missing pieces: I don't have the actual contents of the Astro pages/components beyond what's described in PRODUCT.md and the baseline snapshot, so the internal diagram below is built from the documented file list and stated relationships only (e.g. "Header takes a `links` prop," "site.css imported by each page," which functions call which tables).

Shows how the site's shared layout/components/styles tie together the routed and not-yet-routed pages, and how the client-facing auth pages relate to the Supabase config module and Edge Functions.

```mermaid
graph TD
    Layout["src/layouts/Layout.astro<br/>(shared wrapper, outside-click dropdown script)"]
    Header["src/components/Header.astro<br/>(nav + Login dropdown, takes links prop)"]
    Footer["src/components/Footer.astro<br/>(footer + Login dropdown)"]
    SiteCSS["src/styles/site.css<br/>(tokens, typography, header/footer, login-dropdown, auth-card)"]
    SupaConfig["src/lib/supabase-config.ts<br/>(project URL, publishable key, functions URL)"]

    Index["src/pages/index.astro<br/>(home: hero/studio/products/contact)"]
    About["src/pages/_about.astro<br/>(unrouted — Builders/Advisors wireframe)"]
    ClientLogin["src/pages/client-login.astro<br/>(Client ID + OTP form)"]
    ClientPortal["src/pages/client-portal.astro<br/>(reads sc_client_session, shows project content)"]
    CompanyLogin["src/pages/company-login.astro<br/>(Supabase magic-link email form)"]
    NotFound["src/pages/404.astro"]

    Index --> Layout
    About --> Layout
    ClientLogin --> Layout
    ClientPortal --> Layout
    CompanyLogin --> Layout
    NotFound --> Layout

    Layout --> Header
    Layout --> Footer
    Index -.imports.-> SiteCSS
    About -.imports.-> SiteCSS
    ClientLogin -.imports.-> SiteCSS
    ClientPortal -.imports.-> SiteCSS
    CompanyLogin -.imports.-> SiteCSS
    Header -.styled by.-> SiteCSS
    Footer -.styled by.-> SiteCSS

    ClientLogin --> SupaConfig
    ClientPortal --> SupaConfig
    CompanyLogin --> SupaConfig

    About -. "planned: render Builders/Advisors from personnel table" .-> SupaConfig
```

Shows the browser-side pages calling out to Supabase's Auth/Edge Function/Data API surfaces, the Edge Functions' direct Postgres access, email delivery via Resend, and the static-hosting/DNS chain.

```mermaid
graph TD
    subgraph Browser["Site pages (client-side)"]
        CL["client-login.astro"]
        CP["client-portal.astro"]
        CoL["company-login.astro"]
        AboutPg["about.astro (planned, request-time or build-time render)"]
    end

    subgraph Supabase["Supabase project: starter-culture"]
        Auth["Supabase Auth<br/>(/auth/v1/otp, /auth/v1/user — magic link)"]
        EF1["Edge Function: client-otp-request"]
        EF2["Edge Function: client-otp-verify"]
        EF3["Edge Function: client-portal-content"]
        PG[("Postgres tables<br/>clients, client_otp_codes,<br/>client_sessions, personnel")]
        DataAPI["Data API (PostgREST)<br/>exposed: clients, personnel"]
    end

    Resend["Resend API<br/>(otp@mail.starterculturestudio.com)"]
    GHPages["GitHub Pages hosting"]
    Porkbun["Porkbun DNS<br/>(A records + www CNAME)"]

    CL -->|"{client_id}"| EF1
    CL -->|"{client_id, code}"| EF2
    EF1 -->|"direct pg via SUPABASE_DB_URL"| PG
    EF2 -->|"direct pg via SUPABASE_DB_URL"| PG
    EF1 --> Resend

    CP -->|"x-client-session header"| EF3
    EF3 -->|"direct pg via SUPABASE_DB_URL"| PG

    CoL -->|"email, magic link"| Auth

    AboutPg -.->|"select personnel"| DataAPI
    DataAPI --> PG

    GHPages --> Porkbun
    Browser -. "static build served from" .-> GHPages
```

Shows the one documented external connection beyond hosted services: this repo also functions as the project home for the separately-shipped **Devlore** product, via its own workflows and its published npm package. (`heartland-fermenters-guild` is mentioned only as a same-stack sibling project for reference, not as an actual runtime or data connection, so it's omitted here.)

```mermaid
graph TD
    Repo["BubbaF377/starter-culture repo<br/>(site source + Devlore project docs/automation)"]
    Docs["docs/ (ONBOARDING.md, TEST_PLAN.md,<br/>USER_MANUAL.md, VISUALIZER.md, PRODUCT.md)"]
    Workflows["Devlore workflows:<br/>devlore.yml, devlore-analyze.yml,<br/>devlore-capture-baseline-*.yml, devlore-release.yml"]
    NPM["npm registry:<br/>@starterculture/devlore"]
    ProductsSection["Homepage Products section<br/>(Devlore listing, Beta pill)"]

    Repo --> Docs
    Repo --> Workflows
    Workflows -->|publishes releases of| NPM
    ProductsSection -->|links out to| NPM
```
