<!-- devlore:user-manual source-hash:9fe948fbdf8a97973e0586a48295b3bd7420a00f35cfb684b0afa49045e04868 -->
> **Do not move, rename, or edit this file.** Devlore generates and maintains this user manual automatically from `docs/PRODUCT.md`'s requirements — manual edits will be overwritten the next time Devlore detects the requirements have changed. To change what's documented, update `docs/PRODUCT.md` itself.
<!-- devlore:user-manual requirement-hashes
1=6cb2b5fd6eac
2=05376947cb43
3=b477a2dda129
4=e1b94681af3d
5=9d6ef33981d4
6=f29646e9d9b3
7=f5bdd181dc64
8=4d6e6fc97e0b
9=a6047b28b63c
10=47bcbddb0bad
11=f5a4398069d8
12=73c935047264
-->

StarterCulture is the public website for StarterCulture, a small AI-native software development studio. If you're a visitor learning about the studio, a prospective or current client, or a member of the StarterCulture team, this is the site you'll use to learn what the studio does, see its products, get in touch, and (for clients and team members) reach a login area for project-specific or internal content. This manual walks through what's actually usable on the site today and how to use it.

## Table of Contents

- [Browsing the Homepage](#browsing-the-homepage)
- [Exploring the Products Section](#exploring-the-products-section)
- [Contacting the Studio](#contacting-the-studio)
- [Using the Login Menu](#using-the-login-menu)
- [Logging In as a Client](#logging-in-as-a-client)
- [Logging In as a Team Member](#logging-in-as-a-team-member)

## Browsing the Homepage
<!-- requirements: #1, #5 -->

The homepage is a single page you scroll through rather than a set of separate pages. From top to bottom you'll find:

- A header with the StarterCulture wordmark and navigation links.
- A hero section — the first thing you see — with a large "StarterCulture Software Studio" brand line, and a smaller italic tagline ("Small studio. Big ideas. AI-native.") underneath it.
- A short studio/about blurb introducing the team and its approach.
- A products section listing what the studio has built or is building.
- A contact section with a way to reach the studio.
- A footer with links and studio contact info.

You can jump to any section by scrolling normally, or by clicking the matching nav link in the header, which will scroll you straight to that section. Two additional pages — an "About" company page and a "Clients" page — are linked from the footer separately from this scrolling homepage, for when you want fuller detail rather than the homepage's short summaries.

[↑ Back to table of contents](#table-of-contents)

## Exploring the Products Section
<!-- requirements: #6 -->

Scroll to (or click) the Products section to see what StarterCulture is currently building. Each product is listed with a short description and a status pill telling you how far along it is — currently either "In development" or "Beta."

Right now the section features **Devlore**, the studio's agentic knowledge base tool, marked with a "Beta" pill. Its description explains that Devlore automatically documents every push across your project repositories, with a human only reviewing at release time. If you want to install or inspect the package itself, click through to its npm page, linked directly from the product listing at `https://www.npmjs.com/package/@starterculture/devlore`.

As the studio ships more products, they'll appear in this same section with their own description and status pill, so it's worth checking back here periodically to see what's new.

[↑ Back to table of contents](#table-of-contents)

## Contacting the Studio
<!-- requirements: #7 -->

The Contact section (visually set off with a light background so it stands apart from the Products section above it) is where you go to get in touch with StarterCulture directly. The studio's contact address, `dev@starterculturestudio.com`, is listed here — and again in the footer — so you always have a way to reach the team regardless of which part of the page you're on.

[↑ Back to table of contents](#table-of-contents)

## Using the Login Menu
<!-- requirements: #10 -->

Both the header and the footer include a **Login** entry. Clicking it opens a small dropdown with two options:

- **Client Login** — for StarterCulture clients.
- **Company Login** — for StarterCulture team members.

Pick whichever applies to you to go to the matching login page. If you click elsewhere on the page while the dropdown is open, it closes automatically. In the footer, the same menu opens upward instead of downward so it stays fully visible on screen.

[↑ Back to table of contents](#table-of-contents)

## Logging In as a Client
<!-- requirements: #10 -->

Choosing **Client Login** from the Login menu takes you to a page explaining that it's for StarterCulture clients to view working models, documentation, and other project materials.

On this page you'll enter the **Client ID** that StarterCulture issued to you (a short 6-character alphanumeric code — this is not your email address). Submitting the form currently advances you to a passcode-entry step. If you entered the wrong Client ID or just want to start over, use the "← Use a different Client ID" link to go back and re-enter it.

Note that this page currently carries a "🚧 Not yet connected — UI preview only" badge — the full sign-in flow (looking up your Client ID against StarterCulture's client records, emailing you a one-time passcode, and verifying it to unlock your actual project content) isn't live yet, so this page is a preview of how the flow will work rather than a working login. If you're an existing client waiting on project materials, continue to coordinate with the studio directly using the contact address above in the meantime.

[↑ Back to table of contents](#table-of-contents)

## Logging In as a Team Member
<!-- requirements: #10 -->

Choosing **Company Login** from the Login menu takes you to a page for StarterCulture team members, inviting you to sign in with your email to reach the admin area.

Entering your email and submitting the form currently advances you to a "check your email" confirmation step. As with Client Login, this page carries a "🚧 Not yet connected — UI preview only" badge — no real magic-link email is actually sent yet, so treat this as a preview of the sign-in flow rather than a working login for now.

[↑ Back to table of contents](#table-of-contents)

