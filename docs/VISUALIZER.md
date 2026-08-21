<!-- devlore:visualizer source-hash:8877ed1275cec36568397d4a7e01c4df2a4feb2ba96fd30650af10f42f0b7aa5 -->
> **Do not move, rename, or edit this file.** Devlore generates and maintains this diagram automatically from `docs/PRODUCT.md`'s requirements — manual edits will be overwritten the next time Devlore detects the requirements have changed. To change what's diagrammed, update `docs/PRODUCT.md` itself.

Two things worth noting before the diagrams: the "internal structure" diagram covers Astro-level files (pages/components/layouts/styles) plus the planned admin/about pieces described in the product doc; data-layer and third-party calls are separated into the external-dependencies diagram to keep each readable. A third diagram is included because the product doc does describe a real connection — this repo doubling as the site repo and the Devlore project repo, with an outbound link to Devlore's npm package.

```mermaid
%% Internal structure: Astro pages, shared components/layout/styles, and planned admin pieces
graph TD
  Layout["src/layouts/Layout.astro"]
  Header["src/components/Header.astro\n(wordmark, nav links prop, Login dropdown)"]
  Footer["src/components/Footer.astro\n(wordmark, Login dropdown, contact)"]
  SiteCSS["src/styles/site.css\n(tokens, typography, header/footer, login-dropdown, auth-card)"]
  OutsideClick["shared <script> in Layout.astro\n(closes open dropdown on outside click)"]

  Index["src/pages/index.astro\n(hero, studio, products, contact sections)"]
  ClientLogin["src/pages/client-login.astro\n(Client ID -> passcode UI, not wired)"]
  CompanyLogin["src/pages/company-login.astro\n(email -> check-email UI, not wired)"]
  NotFound["src/pages/404.astro"]
  AboutDraft["src/pages/_about.astro\n(unrouted: leading underscore)\nBuilders + Advisors wireframe"]

  AdminArea["Company/admin area (planned, not built)\nnew-client form + client list + personnel form"]
  ClientPortalTpl["dynamic client-portal template (planned)\nkeyed by Client ID"]

  Layout --> Header
  Layout --> Footer
  Layout --> SiteCSS
  Layout --> OutsideClick
  Header --> SiteCSS
  Footer --> SiteCSS

  Index --> Layout
  ClientLogin --> Layout
  CompanyLogin --> Layout
  NotFound --> Layout
  AboutDraft -. "excluded from routing until ready" .-> Layout

  AdminArea -. "planned: reached via Company Login" .-> CompanyLogin
  ClientPortalTpl -. "planned: reached after Client Login flow" .-> ClientLogin
  AboutDraft -. "planned: renders from personnel records\ninstead of hand-coded content" .-> AdminArea
```

```mermaid
%% External dependencies: outside services the site's login/admin flows call
graph LR
  ClientLoginPage["client-login.astro"]
  CompanyLoginPage["company-login.astro"]
  AdminAreaPlanned["Company/admin area (planned)"]
  AboutDraftPlanned["_about.astro (planned, personnel-driven)"]
  Deploy["pages-deploy.yml\n(withastro/action@v3)"]

  SupabaseAuth["Supabase Auth\n(magic link / signInWithOtp)\nauth.users"]
  EdgeReq["Edge Function: client-otp-request"]
  EdgeVerify["Edge Function: client-otp-verify"]
  EdgePortal["Edge Function: client-portal-content\n(x-client-session header)"]
  Resend["Resend API\n(otp@mail.starterculturestudio.com)"]

  DBClients[("clients table\n(Data API exposed)")]
  DBPersonnel[("personnel table\n(Data API exposed)")]
  DBOtp[("client_otp_codes\n(no Data API, direct Postgres only)")]
  DBSessions[("client_sessions\n(no Data API, direct Postgres only)")]

  GhPages["GitHub Pages\n(starterculturestudio.com)"]
  Porkbun["Porkbun DNS\n(apex A records + www CNAME)"]

  ClientLoginPage -. "not yet wired, target flow:" .-> EdgeReq
  EdgeReq --> DBClients
  EdgeReq --> DBOtp
  EdgeReq --> Resend
  ClientLoginPage -. "target flow:" .-> EdgeVerify
  EdgeVerify --> DBOtp
  EdgeVerify --> DBSessions

  CompanyLoginPage -. "not yet wired, target flow:" .-> SupabaseAuth

  AdminAreaPlanned -. "planned" .-> DBClients
  AdminAreaPlanned -. "planned" .-> DBPersonnel
  AboutDraftPlanned -. "planned" .-> DBPersonnel

  ClientPortal["dynamic client-portal template (planned)"] -. "planned" .-> EdgePortal
  EdgePortal --> DBClients
  EdgePortal --> DBSessions

  Deploy --> GhPages
  GhPages --> Porkbun
```

```mermaid
%% Other linked project: this repo's dual role as the site repo and the Devlore project repo, plus the outbound npm link
graph TD
  Repo["BubbaF377/starter-culture (this repo)"]
  SiteCode["Site code: src/, public/, astro.config.mjs\n(StarterCulture marketing site)"]
  DevloreDocs["Devlore docs: docs/ONBOARDING.md, TEST_PLAN.md,\nUSER_MANUAL.md, VISUALIZER.md"]
  DevloreWorkflows[".github/workflows/devlore-*.yml\n(analyze, capture-baseline-draft/seed, release)"]
  ProductsSection["index.astro Products section\n(Devlore listing, 'Beta' pill)"]
  NpmPkg["npm registry:\nwww.npmjs.com/package/@starterculture/devlore"]

  Repo --> SiteCode
  Repo --> DevloreDocs
  Repo --> DevloreWorkflows
  SiteCode --> ProductsSection
  ProductsSection -- "links out to" --> NpmPkg
```
