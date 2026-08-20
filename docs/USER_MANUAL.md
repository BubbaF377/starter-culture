<!-- devlore:user-manual source-hash:3b84c138c180f6207604925ae1092a1364e4ee8b83ae856b8c02687249fbd2d5 -->
> **Do not move, rename, or edit this file.** Devlore generates and maintains this user manual automatically from `docs/PRODUCT.md`'s requirements — manual edits will be overwritten the next time Devlore detects the requirements have changed. To change what's documented, update `docs/PRODUCT.md` itself.
<!-- devlore:user-manual requirement-hashes
1=bb94fd11ce40
2=fdba47cc6e6f
3=8471884f470f
4=e1b94681af3d
5=5c11ec3c8084
6=f29646e9d9b3
7=f5bdd181dc64
8=e62ee6891dee
9=fdd54aa66c81
-->

StarterCulture is the marketing website for StarterCulture, a small AI-native software development studio founded by Christian, live at starterculturestudio.com. It's a single scrolling page that introduces the studio, explains its AI-first approach to building software, and showcases its products — currently Devlore. This manual is for two kinds of people: visitors who want to learn about the studio and find its products, and whoever maintains the site (adding products, updating copy, publishing new versions) day to day.

## Table of Contents

- [Navigating the Site](#navigating-the-site)
- [Understanding the Brand and Visual Style](#understanding-the-brand-and-visual-style)
- [Using the Logo Assets](#using-the-logo-assets)
- [Referring to StarterCulture by Name](#referring-to-starterculture-by-name)
- [Reading the Hero Tagline](#reading-the-hero-tagline)
- [Browsing the Products Section](#browsing-the-products-section)
- [Getting in Touch](#getting-in-touch)
- [Publishing a New Version of the Site](#publishing-a-new-version-of-the-site)

## Navigating the Site
<!-- requirements: #1 -->

The whole site lives on one page — there's no multi-page navigation to click through. Scrolling from top to bottom, you'll move through the same sequence every time:

1. **Header/nav** — the StarterCulture wordmark and any in-page navigation links, pinned at the top.
2. **Hero** — the studio's headline pitch and tagline.
3. **Studio/about** — a short section describing what StarterCulture is and how it works.
4. **Products** — a list of the studio's products, currently featuring Devlore.
5. **Contact** — how to reach the studio.
6. **Footer** — repeated branding and contact details, plus any closing links.

If the header includes anchor links, clicking one will smoothly scroll you down to the corresponding section rather than loading a new page — that's the extent of "navigation" on this site.

[↑ Back to table of contents](#table-of-contents)

## Understanding the Brand and Visual Style
<!-- requirements: #2 -->

The site is intentionally light, clean, and minimal, built around StarterCulture's existing logo palette:

- **Cream** (`#F5EFE1` / `#FBF8F1`) — used for backgrounds and light surfaces.
- **Terracotta** (`#B5482B`) — the primary accent color, used for emphasis (links, buttons, highlights).
- **Dark brown** (`#2B2320`) — used for body text and strong contrast elements.

As you scroll the page, you should notice this same small set of colors used consistently across every section — there's no separate color scheme per section. If you're evaluating whether a design change "fits" the site, checking it against these three colors and a minimal, uncluttered layout is the test.

[↑ Back to table of contents](#table-of-contents)

## Using the Logo Assets
<!-- requirements: #3 -->

StarterCulture has two logo marks:

- **Wordmark** — `public/assets/starter-culture-logo.svg`, the full logo with text.
- **Avatar/icon mark** — `public/assets/starter-culture-avatar.svg`, an icon-only version without text.

Both files are available as standalone static assets (useful if you need the logo for something outside the page itself, like a social share image or a favicon). On the page itself, the marks aren't loaded from these files as `<img>` tags — they're inlined directly as SVG markup in the header, hero, and footer sections of `src/pages/index.astro`. If you ever need to update the logo's appearance, update the SVG in both places: the standalone asset file (for anyone linking to it directly) and the inlined copy in the page source (for what actually renders in the header, hero, and footer).

[↑ Back to table of contents](#table-of-contents)

## Referring to StarterCulture by Name
<!-- requirements: #4 -->

Everywhere the studio's name appears in page copy, titles, meta tags, and aria-labels, it's written as **StarterCulture** — one word, capital S, capital C, no space. This applies consistently across headings, body text, the page `<title>`, meta descriptions, and any `aria-label` attributes used for accessibility.

The one exception is the logo graphic itself: the wordmark image uses a lowercase, stylized rendering of "starterculture" as part of its design. That's purely a visual treatment of the logo mark — it doesn't change how the name should be typed anywhere else on the page.

[↑ Back to table of contents](#table-of-contents)

## Reading the Hero Tagline
<!-- requirements: #5 -->

The hero section's main line is: **"Small studio. Big ideas. AI-native."** Below it sits a supporting line explaining that StarterCulture builds with AI as a first-class collaborator from the first line of code — not a bolted-on tool, but part of how the studio works from the start of every project. Together these two lines are the first thing a visitor reads and are meant to summarize the studio's positioning at a glance before they scroll further into the about and products sections.

[↑ Back to table of contents](#table-of-contents)

## Browsing the Products Section
<!-- requirements: #6 -->

The products section lists each product StarterCulture has built, along with a status pill showing how far along it is — currently either **"In development"** or **"Beta"** (more stages may be added later as the studio needs them).

Right now the section features one product:

- **Devlore** — shown with a **Beta** pill. Its description reads: "Devlore is an agentic knowledge base that automatically documents every push across your project repos, with human review only at release time." Clicking through on Devlore takes you to its npm package page at `https://www.npmjs.com/package/@starterculture/devlore`, where you can view or install it.

As the studio ships more products, expect this section to grow with additional entries, each carrying its own status pill and description.

[↑ Back to table of contents](#table-of-contents)

## Getting in Touch
<!-- requirements: #7 -->

To reach the studio, use the contact address listed in the contact section and repeated in the footer: **dev@starterculturestudio.com**. This is the single point of contact for questions, inquiries, or anything else related to StarterCulture or its products — there's no contact form on the page, just the email address itself.

[↑ Back to table of contents](#table-of-contents)

## Publishing a New Version of the Site
<!-- requirements: #9 -->

The live site at starterculturestudio.com does **not** update automatically when changes are merged to `main`. Instead, it tracks the latest published GitHub Release. To push a new version of the site live:

1. Make and merge your changes to the repository (`BubbaF377/starter-culture`) as usual.
2. Cut a new GitHub Release with a tag matching the `v*` pattern (for example, `v1.2.0`).
3. Publishing that release triggers the deploy workflow, which checks out the release's tag, builds the site, and deploys it to GitHub Pages.

A couple of things to keep in mind:

- Simply pushing to `main` is not enough — the site won't reflect your changes until you publish a release.
- The GitHub Pages environment's deployment branch policy needs to allow the tag pattern you're releasing under (currently `v*`) in addition to `main`, or the deploy will be blocked. If releases stop deploying, check this policy first.
- The custom domain (`starterculturestudio.com`) is wired up via the `CNAME` file in `public/`, which gets carried into the build output automatically — you shouldn't need to touch it as part of a normal release.

[↑ Back to table of contents](#table-of-contents)

