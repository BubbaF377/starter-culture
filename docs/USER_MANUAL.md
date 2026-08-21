<!-- devlore:user-manual source-hash:f048fb8589402c3161543c4735788488f328ed83eb0752606959c8b43062b58c -->
> **Do not move, rename, or edit this file.** Devlore generates and maintains this user manual automatically from `docs/PRODUCT.md`'s requirements — manual edits will be overwritten the next time Devlore detects the requirements have changed. To change what's documented, update `docs/PRODUCT.md` itself.
<!-- devlore:user-manual requirement-hashes
1=6cb2b5fd6eac
2=05376947cb43
3=b477a2dda129
4=e1b94681af3d
5=9d6ef33981d4
6=f29646e9d9b3
7=f5bdd181dc64
8=dcf3b7bd9f26
9=32aa2c19d88b
10=80ce0f0ef2ce
11=877e90e0e17b
-->

StarterCulture is the brand and marketing website for StarterCulture, a small AI-native software development studio founded by Christian. The site lives at starterculturestudio.com and serves as the studio's home on the web — introducing what the studio does, showcasing its products (starting with Devlore), and giving visitors a way to get in touch. This manual walks through the site from a visitor's point of view: what's on each part of the page, how to find information about the studio and its team, how to check out its products, and how to reach out or check the client portal.

## Table of Contents

- [Navigating the Homepage](#navigating-the-homepage)
- [Exploring the Studio's Products](#exploring-the-studios-products)
- [Getting in Touch](#getting-in-touch)
- [Meeting the Team](#meeting-the-team)
- [Checking the Client Portal](#checking-the-client-portal)

## Navigating the Homepage
<!-- requirements: #1, #5 -->

The homepage is a single page you scroll through, rather than a series of separate pages. As you scroll down from the top, you'll move through: the header/navigation bar, a hero section, a short section about the studio, a section listing the studio's products, and a contact section, followed by the footer.

The hero section is the first thing you see. The large, bold text reading "StarterCulture Software Studio" is the main visual anchor of the page. Just below it, in smaller italic type, is the tagline "Small studio. Big ideas. AI-native." — this is a supporting line, not the headline, so don't expect it to be the biggest text on the page.

As you continue scrolling, each major section (like "Studio" or "Products") is introduced with a large section title so it's easy to tell where one part of the page ends and the next begins, even on a quick skim. The "About" and "Client Portal" pages are not part of this scrolling homepage — you'll find links to them in the footer at the very bottom of the page.

[↑ Back to table of contents](#table-of-contents)

## Exploring the Studio's Products
<!-- requirements: #6 -->

Scrolling to the Products section shows you what StarterCulture is currently building. Each product is listed with a short description and a status pill next to its name telling you how far along it is — currently either "In development" or "Beta."

Right now, the section features **Devlore**, the studio's first product, marked with a "Beta" pill. Devlore is described as "an agentic knowledge base that automatically documents every push across your project repos, with human review only at release time." If you want to try it or see it in more detail, click through to its npm package page at `https://www.npmjs.com/package/@starterculture/devlore` — the Devlore listing in this section links directly there.

As the studio ships more products, they'll appear in this same section with their own descriptions and status pills.

[↑ Back to table of contents](#table-of-contents)

## Getting in Touch
<!-- requirements: #7 -->

If you want to reach the studio, scroll to the Contact section, which sits just below Products and is set on its own light background so it stands out visually from the section above it. The Contact section (and the footer at the bottom of every page) lists the studio's email address: `dev@starterculturestudio.com`. Use this address to reach out about a project, ask a question, or get in touch for any other reason — there's no contact form to fill out, just the email address to write to directly.

[↑ Back to table of contents](#table-of-contents)

## Meeting the Team
<!-- requirements: #9 -->

The About page is being built out to give a fuller picture of the studio than the short blurb on the homepage, along with a team section introducing the people behind StarterCulture.

Right now, this page is still a work in progress, and it's labeled with a "Page in progress" badge so that's clear. You'll see a card for Christian, the studio's founder, along with placeholder card slots reserved for future teammates. Some of these cards currently show placeholder avatars and "bio coming soon" text where a real photo and bio will eventually go.

The page file currently lives at `src/pages/_about.astro` — note the leading underscore, which excludes it from Astro's file-based routing. That means the page isn't built or reachable at any URL yet, and there's no footer link to it. Once the content is filled out and ready to publish, the file will be renamed to `about.astro` and a footer link will be added so it's easy to find from anywhere on the site. Check back as the team grows and this page goes live.

[↑ Back to table of contents](#table-of-contents)

## Checking the Client Portal
<!-- requirements: #10 -->

The Client Portal is where StarterCulture clients will eventually be able to log in and check on the status of their work.

At this stage, the portal is a preview only, clearly labeled "Coming soon." You'll see a login form with email and password fields, but the fields are disabled and there's no way to submit the form — logging in isn't possible yet, and there's no dashboard behind it.

The page file currently lives at `src/pages/_clients.astro` — note the leading underscore, which excludes it from Astro's file-based routing, so the page isn't built or reachable at any URL yet, and it isn't linked from the footer. Once real authentication and dashboard content are in place, the file will be renamed to `clients.astro` and a footer link will be added. If you're a prospective or current client curious about this feature, know that it's on its way but not yet functional; for status updates in the meantime, reach out directly via the email address in the Contact section.

[↑ Back to table of contents](#table-of-contents)

