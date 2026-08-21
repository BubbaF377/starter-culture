<!-- devlore:test-plan source-hash:f654157eb352e140bae4625c6f11242bd358407807d7c6b85b0d7be05ef2dbad -->
> **Do not move, rename, or edit this file.** Devlore generates and maintains this test plan automatically from `docs/PRODUCT.md`'s requirements — manual edits will be overwritten the next time Devlore detects the requirements have changed. To change what's tested, update `docs/PRODUCT.md` itself.
<!-- devlore:test-plan requirement-hashes
1=6cb2b5fd6eac
2=05376947cb43
3=b477a2dda129
4=e1b94681af3d
5=9d6ef33981d4
6=f29646e9d9b3
7=f5bdd181dc64
8=dcf3b7bd9f26
9=9387e647dcc4
10=9a862f622a21
11=877e90e0e17b
-->

## Page Structure & Navigation

### TC-NAV-01 — Site is a single scrolling page with no multi-page navigation
**Requirement(s):** #1
**Preconditions:** Site is loaded in a browser.
**Steps:**
1. Load the site's home URL.
2. Inspect the header/nav area for any links that would navigate to a different page or URL.
3. Click any nav links present (if any), excluding the footer's "About" and "Client Portal" links which intentionally lead to separate pages.
**Expected Result:** No header/nav links navigate away to a separate page; any header/nav links instead scroll to a section of the same page, and the URL path never changes to a new page. The footer's "About" and "Client Portal" links are the only links that intentionally navigate to separate pages (`about.astro` and `clients.astro`), consistent with those pages not being part of the homepage scroll.

### TC-NAV-02 — All required sections are present in order
**Requirement(s):** #1
**Preconditions:** Site is loaded in a browser.
**Steps:**
1. Scroll from the top of the page to the bottom.
2. Note each distinct section encountered.
**Expected Result:** The page contains, in a sensible top-to-bottom order, a header/nav, hero, studio/about, products, contact, and footer section — with no missing sections; the About and Client Portal content lives on separate pages (`about.astro`/`clients.astro`) linked from the footer, not within this scroll.

## Visual Style & Branding

### TC-BRAND-01 — Color palette matches brand spec
**Requirement(s):** #2
**Preconditions:** Site is loaded in a browser with a color-picker/dev tools available.
**Steps:**
1. Sample the background color(s) used across sections.
2. Sample the accent color used for highlights/buttons/pills.
3. Sample the text/dark color used for headings or dark backgrounds.
4. Sample the header and footer background color and their text/nav color.
**Expected Result:** Background colors match cream tones (`#F5EFE1` / `#FBF8F1`), accent color matches terracotta (`#B5482B`), dark text/background elements match dark brown (`#2B2320`), and the header/footer background matches moss green (`#3F4B3D`) with cream-toned text/nav for contrast. No other unrelated colors appear as primary theme colors.

### TC-BRAND-02 — Wordmark logo appears in header
**Requirement(s):** #3
**Preconditions:** Site is loaded in a browser.
**Steps:**
1. Look at the header/nav area.
2. Inspect the logo element.
**Expected Result:** The StarterCulture wordmark logo (matching `public/assets/starter-culture-logo.svg`), inlined directly in `src/components/Header.astro`, is visibly rendered in the header (not a broken image/missing asset), with its `<text>` fill and sans-serif `font-family` matching the uploaded logo asset (not serif).

### TC-BRAND-03 — Logo mark appears in hero
**Requirement(s):** #3
**Preconditions:** Site is loaded in a browser.
**Steps:**
1. Scroll to the hero section.
2. Inspect for a logo/icon mark.
**Expected Result:** A StarterCulture logo mark (wordmark from `public/assets/starter-culture-logo.svg` and/or avatar icon from `public/assets/starter-culture-avatar.svg`), inlined directly in `src/pages/index.astro`, renders correctly and inline within the hero section.

### TC-BRAND-04 — Logo mark appears in footer
**Requirement(s):** #3
**Preconditions:** Site is loaded in a browser.
**Steps:**
1. Scroll to the footer.
2. Inspect for a logo/icon mark.
**Expected Result:** A StarterCulture logo mark (from `public/assets/starter-culture-logo.svg` and/or `public/assets/starter-culture-avatar.svg`), inlined directly in `src/components/Footer.astro`, renders correctly and inline within the footer, with its `<text>` fill and sans-serif `font-family` matching the uploaded logo asset (not serif).

### TC-BRAND-05 — Brand name styled as "StarterCulture" throughout
**Requirement(s):** #4
**Preconditions:** Site is loaded in a browser with access to page source/dev tools.
**Steps:**
1. Read all visible on-page copy referencing the brand name (header, hero, about, footer).
2. Inspect the `<title>` tag and meta tags (e.g. `og:title`, `description`) via page source.
3. Inspect `aria-label` attributes on logo/nav elements via dev tools.
**Expected Result:** Every instance of the brand name outside the logo graphic itself reads "StarterCulture" — one word, capital S and C, no space — in visible copy, titles, meta tags, and aria-labels.

## Hero Section

### TC-HERO-01 — Hero tagline text is correct
**Requirement(s):** #5
**Preconditions:** Site is loaded in a browser.
**Steps:**
1. Scroll to the hero section.
2. Read the small italic tagline beneath the prominent "StarterCulture Software Studio" brand line.
**Expected Result:** The tagline reads exactly "Small studio. Big ideas. AI-native." and is displayed as a small italic line beneath the larger, prominent brand line, not as the dominant headline.

### TC-HERO-02 — Hero supporting line describes AI as a first-class collaborator
**Requirement(s):** #5
**Preconditions:** Site is loaded in a browser.
**Steps:**
1. Scroll to the hero section.
2. Read the supporting/subhead line beneath the small italic tagline.
**Expected Result:** The supporting line describes the studio building with AI as a first-class collaborator from the first line of code (wording may vary but this meaning must be present).

## Products Section

### TC-PROD-01 — Devlore is listed with a "Beta" status pill
**Requirement(s):** #6
**Preconditions:** Site is loaded in a browser.
**Steps:**
1. Scroll to the products section.
2. Locate the Devlore product entry.
3. Inspect its status pill.
**Expected Result:** Devlore's entry displays a status pill labeled "Beta".

### TC-PROD-02 — Devlore description text is correct
**Requirement(s):** #6
**Preconditions:** Site is loaded in a browser.
**Steps:**
1. Scroll to the Devlore entry in the products section.
2. Read the product description text.
**Expected Result:** The description reads: "Devlore is an agentic knowledge base that automatically documents every push across your project repos, with human review only at release time."

### TC-PROD-03 — Devlore links out to its npm package
**Requirement(s):** #6
**Preconditions:** Site is loaded in a browser.
**Steps:**
1. Scroll to the Devlore entry in the products section.
2. Locate and click the npm package link.
**Expected Result:** The link opens/navigates to `https://www.npmjs.com/package/@starterculture/devlore` and successfully loads the npm package page.

## Contact & Footer

### TC-CONTACT-01 — Contact section displays correct studio email
**Requirement(s):** #7
**Preconditions:** Site is loaded in a browser.
**Steps:**
1. Scroll to the contact section.
2. Read the displayed email address.
**Expected Result:** The email address shown is exactly `dev@starterculturestudio.com`.

### TC-CONTACT-02 — Footer displays correct studio email
**Requirement(s):** #7
**Preconditions:** Site is loaded in a browser.
**Steps:**
1. Scroll to the footer.
2. Read the displayed email address.
**Expected Result:** The email address shown is exactly `dev@starterculturestudio.com`.

### TC-CONTACT-03 — Contact email is a working mailto link (if styled as a link)
**Requirement(s):** #7
**Preconditions:** Site is loaded in a browser; default mail client configured or observable via browser prompt.
**Steps:**
1. Click the contact email address in the contact section or footer.
**Expected Result:** If the email is a clickable link, it triggers a `mailto:dev@starterculturestudio.com` action (opens mail client or browser mailto prompt) rather than navigating to a broken or unrelated URL.

## Deployment

### TC-DEPLOY-01 — Site is reachable via GitHub Pages
**Requirement(s):** #11
**Preconditions:** Repo `BubbaF377/starter-culture` has at least one published GitHub Release, and `.github/workflows/pages-deploy.yml` has run successfully for that release (triggered by `release: published`, building with `withastro/action@v3` after checking out that release's tag), deploying `index.html`, `assets/`, and `CNAME` from that release's tag to GitHub Pages.
**Steps:**
1. Navigate to the custom domain `starterculturestudio.com`.
2. Confirm the page loads and matches the content of the latest published GitHub Release (not necessarily raw `main` HEAD).
**Expected Result:** The StarterCulture site loads correctly at `starterculturestudio.com`, reflecting the latest published GitHub Release, matching the site seen in other test cases.

## Out of scope

- **Custom domain DNS setup (`starterculturestudio.com`)** — explicitly listed as an open question/not yet done; no live domain to test against.
- **Future products beyond Devlore** — explicitly described as not-yet-decided/future work, nothing to click through.
- **Repo structure decision (site repo vs. Devlore repo separation)** — open question with no user-facing behavior; architectural/organizational only.
- **Separate logo asset files (`assets/starter-culture-logo.svg`, `assets/starter-culture-avatar.svg`) existing on disk** — covered by the inlined-logo UI checks (TC-BRAND-02/03/04); raw file presence is a repo/build concern, not a clickable behavior.
