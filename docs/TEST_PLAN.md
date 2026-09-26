<!-- devlore:test-plan source-hash:ab7a06df95c9654d1e275570d9935b9744218b8e2537abbe2367276e546c9917 -->
> **Do not move, rename, or edit this file.** Devlore generates and maintains this test plan automatically from `docs/PRODUCT.md`'s requirements — manual edits will be overwritten the next time Devlore detects the requirements have changed. To change what's tested, update `docs/PRODUCT.md` itself.
<!-- devlore:test-plan requirement-hashes
1=6cb2b5fd6eac
2=05376947cb43
3=b477a2dda129
4=e1b94681af3d
5=9d6ef33981d4
6=f29646e9d9b3
7=f5bdd181dc64
8=97149d6e570a
9=a6047b28b63c
10=9991ee03c410
11=f5a4398069d8
12=73c935047264
-->

## Homepage Structure

### TC-HOME-01 — Homepage renders as single scrolling page with all sections in order
**Requirement(s):** #1
**Preconditions:** Browser open, navigate to starterculturestudio.com (or local build root).
**Steps:**
1. Load the homepage.
2. Scroll from top to bottom, noting each section as it appears.
**Expected Result:** Sections appear in this order: header/nav, hero, studio/about, products, contact, footer — all on one page, with no separate page navigation required.

## Branding & Visual Style

### TC-BRAND-01 — Header and footer use moss green background with cream text
**Requirement(s):** #2
**Preconditions:** Homepage loaded.
**Steps:**
1. Inspect the header background color.
2. Inspect the footer background color.
3. Check nav/text color on both.
**Expected Result:** Header and footer both use the moss green (`#3F4B3D`) background, with nav links/text rendered in a cream tone for legible contrast.

### TC-BRAND-02 — Cream, terracotta, and dark brown palette used elsewhere on page
**Requirement(s):** #2
**Steps:**
1. Inspect hero and section backgrounds for cream tones (`#F5EFE1`/`#FBF8F1`).
2. Inspect accent elements (buttons, pills, links) for terracotta (`#B5482B`).
3. Inspect body copy color for dark brown (`#2B2320`).
**Expected Result:** All three colors appear consistently as described; no unrelated colors used for these roles.

### TC-BRAND-03 — Logo asset files load correctly
**Requirement(s):** #3
**Preconditions:** Site deployed or served locally.
**Steps:**
1. Navigate directly to `/assets/starter-culture-logo.svg`.
2. Navigate directly to `/assets/starter-culture-avatar.svg`.
**Expected Result:** Both URLs return valid, renderable SVGs — the first a full wordmark, the second an icon-only mark.

### TC-BRAND-04 — Inline header/footer wordmark uses sans-serif font
**Requirement(s):** #3
**Steps:**
1. Open browser devtools on the homepage.
2. Inspect the `<text>` element inside the inlined logo SVG in the header.
3. Repeat for the footer.
**Expected Result:** The `font-family` on both is sans-serif, matching the logo asset — never serif.

### TC-BRAND-05 — Brand name styled "StarterCulture" consistently
**Requirement(s):** #4
**Steps:**
1. Check the browser tab title.
2. View page source for the meta description tag.
3. Check hero copy, section copy, and any `aria-label` attributes on logo links.
**Expected Result:** Every instance reads "StarterCulture" as one word with no space; never "Starter Culture."

## Hero Section

### TC-HERO-01 — Hero brand line is the dominant headline
**Requirement(s):** #5
**Preconditions:** Homepage loaded, hero section in view.
**Steps:**
1. Locate the "StarterCulture Software Studio" text (`.hero-brand span`).
2. Compare its font size/visual weight to the `<h1>` tagline below it.
**Expected Result:** The brand line renders as large, prominent sans-serif hero text — clearly the dominant visual element in the hero.

### TC-HERO-02 — H1 tagline renders as small italic subline
**Requirement(s):** #5
**Steps:**
1. Locate the `<h1>` text "Small studio. Big ideas. AI-native."
2. Inspect its font size and style relative to the hero brand line.
**Expected Result:** The `<h1>` is visually smaller and italicized, positioned beneath the hero brand line — not styled as the dominant headline.

### TC-HERO-03 — Section headings sized at increased scale
**Requirement(s):** #5
**Steps:**
1. Inspect the computed font size of each `<h2>` (Studio, Products, Contact) at desktop width.
2. Resize the browser to a narrow mobile width and re-check.
**Expected Result:** `<h2>` font size stays within `clamp(32px, 5vw, 44px)` across viewport widths tested.

### TC-CONTACT-01 — Contact section background matches Studio section
**Requirement(s):** #5
**Steps:**
1. Scroll to the Studio section and note its background color.
2. Scroll to the Products section and note its background color.
3. Scroll to the Contact section and note its background color.
**Expected Result:** Contact section background matches the Studio section's `--paper` background and is visually distinct from the Products section above it.

## Products Section

### TC-PROD-01 — Devlore shows "Beta" status pill
**Requirement(s):** #6
**Preconditions:** Homepage loaded, Products section in view.
**Steps:**
1. Locate the Devlore product entry.
2. Check the status pill next to its name.
**Expected Result:** Pill displays "Beta."

### TC-PROD-02 — Devlore description text matches source copy
**Requirement(s):** #6
**Steps:**
1. Read the full description text under the Devlore entry.
**Expected Result:** Text reads exactly: "Devlore is an agentic knowledge base that automatically documents every push across your project repos, with human review only at release time."

### TC-PROD-03 — Devlore npm link opens correct package page
**Requirement(s):** #6
**Steps:**
1. Click the Devlore npm link.
**Expected Result:** Browser navigates to `https://www.npmjs.com/package/@starterculture/devlore` and the npm package page loads successfully.

### TC-PROD-04 — Status pill only shows currently valid stage labels
**Requirement(s):** #6
**Steps:**
1. Review all product entries and their status pills currently on the page.
**Expected Result:** Every pill reads either "In development" or "Beta" — no other/undefined status text appears.

## Navigation & Footer Links

### TC-NAV-01 — Header nav links scroll to correct homepage sections
**Requirement(s):** #1, #8
**Preconditions:** Homepage loaded.
**Steps:**
1. Click each header nav item in turn (e.g. Studio, Products, Contact).
**Expected Result:** Each click scrolls the page to the corresponding section anchor smoothly, without a full page reload.

### TC-NAV-02 — Footer does not link to About page; Login dropdown links to Client Login and Company Login
**Requirement(s):** #9, #10
**Preconditions:** Site is running (locally or deployed) and the page footer is visible.
**Steps:**
1. Inspect all links present in the footer, including the Login dropdown menu.
**Expected Result:** No link to `/about` appears in the footer (page not yet published — leading-underscore `_about.astro` is excluded from routing). The footer's Login dropdown (a `<details>`/`<summary>` element styled via `.login-dropdown`/`.login-menu`, opening upward so it stays on-screen) contains "Client Login" and "Company Login" options linking to `/client-login` and `/company-login` respectively — both pages are live and routable. Client Login is fully wired up end-to-end against real Supabase Edge Functions (OTP request/verify) and has been tested with a real client record and a real delivered email. Company Login's UI calls real Supabase Auth (magic-link), though the admin area it leads to doesn't exist yet.

### TC-NAV-03 — Direct navigation to /about returns not-found; /client-login and /company-login are reachable
**Requirement(s):** #9, #10
**Preconditions:** Site is deployed and accessible at starterculturestudio.com (or equivalent local dev server).
**Steps:**
1. Manually enter `starterculturestudio.com/about` in the browser address bar.
2. Manually enter `starterculturestudio.com/client-login` and `starterculturestudio.com/company-login` in the browser address bar.
**Expected Result:** The `/about` request returns a 404/not-found page — the route is not built (excluded via leading underscore, no real names finalized). The `/client-login` and `/company-login` requests successfully load their respective live pages, not a 404. On `/client-login`, submitting a valid Client ID calls the real `client-otp-request` Edge Function and reveals a passcode-entry step (with a "← Use a different Client ID" link back); submitting the correct passcode (sent via a real Resend email) calls `client-otp-verify`, stores a session token, and redirects to `/client-portal`, while errors such as an incorrect or expired code render inline via `.form-error`. On `/company-login`, submitting the email form calls Supabase Auth's real `/auth/v1/otp` endpoint and shows a generic "check your email" confirmation step regardless of whether the email is a known team account; following a real magic link back to `/company-login` shows "Logged in as {email} — admin area isn't built yet," since no admin area exists yet.

## Deployment & Domain

### TC-DEPLOY-01 — Custom apex domain loads site over valid HTTPS
**Requirement(s):** #12
**Preconditions:** DNS propagated, certificate issued.
**Steps:**
1. Navigate to `https://starterculturestudio.com`.
**Expected Result:** Site loads with a valid TLS certificate and no browser security warnings.

### TC-DEPLOY-02 — www subdomain resolves and loads site
**Requirement(s):** #12
**Steps:**
1. Navigate to `https://www.starterculturestudio.com`.
**Expected Result:** Site loads correctly (resolved via CNAME to `bubbaf377.github.io`) with a valid certificate and no warnings.

### TC-DEPLOY-03 — Live site reflects latest published release, not unreleased main
**Requirement(s):** #12
**Preconditions:** A commit exists on `main` that is newer than the latest published GitHub Release tag.
**Steps:**
1. Compare visible content/version on the live site against the latest GitHub Release tag's content.
2. Compare it against the latest commit on `main` if that differs from the release tag.
**Expected Result:** Live site content matches the latest published release tag, not any newer unreleased commits on `main`.

## Out of scope

- **About page content (team cards, bios, narrative)** — page is a wireframe (`_about.astro`), intentionally unlinked and unbuilt (#9).
- **Client portal login form/dashboard** — wireframe only (`_clients.astro`), intentionally unlinked, no real auth exists (#10).
- **Client login auth approach** — open question, no implementation decided yet.
- **Team member roster/photos beyond Christian** — open question, content not yet collected.
- **`https_enforced` flag toggle** — currently `false` by design per open questions; not yet enabled.
- **Future products beyond Devlore** — open question, nothing to test yet.
- **Repo structure (single repo vs. split for site/Devlore)** — organizational open question, no user-facing behavior.
- **Shared component architecture (`links` prop on Header, `site.css` token sharing), Pages workflow YAML internals, and branch policy tag-pattern config** — architectural/CI concerns with no distinct click-path beyond what's already verified visually in the Branding and Deploy sections above.
