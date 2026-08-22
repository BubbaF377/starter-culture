<!-- devlore:user-manual source-hash:1918d46f8716c86b81ce49d290186b9f607be0e9ec5e90321674667e50eecb63 -->
> **Do not move, rename, or edit this file.** Devlore generates and maintains this user manual automatically from `docs/PRODUCT.md`'s requirements — manual edits will be overwritten the next time Devlore detects the requirements have changed. To change what's documented, update `docs/PRODUCT.md` itself.
<!-- devlore:user-manual requirement-hashes
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

StarterCulture is the public brand website for StarterCulture, a small AI-native software development studio. If you're a visitor, it's where you go to learn about the studio and see what it's building, starting with its first product, Devlore. If you're a StarterCulture client, it's also where you log in to see materials the studio has posted about your specific project. If you're a member of the StarterCulture team, it's where you sign in on your way to the studio's internal admin tools. This guide walks through what you can do on the site today, section by section.

## Table of Contents

- [Browsing the Homepage](#browsing-the-homepage)
- [Viewing Studio Products](#viewing-studio-products)
- [Getting in Touch](#getting-in-touch)
- [Using the Login Menu](#using-the-login-menu)
- [Logging In as a Client](#logging-in-as-a-client)
- [Viewing Your Project in the Client Portal](#viewing-your-project-in-the-client-portal)
- [Logging In as a StarterCulture Team Member](#logging-in-as-a-starterculture-team-member)

## Browsing the Homepage
<!-- requirements: #1, #2, #4, #5 -->

The homepage (starterculturestudio.com) is a single page you scroll through rather than a set of separate pages. From top to bottom you'll find: a header with the StarterCulture logo and navigation, a hero section, a section about the studio, a products section, a contact section, and a footer.

At the top of the hero, the large text you see is the studio's brand line, **"StarterCulture Software Studio"** — that's the dominant headline on the page. Just beneath it, in smaller italic type, is a short tagline: "Small studio. Big ideas. AI-native." Scrolling further down, the "Studio" section gives a short blurb about StarterCulture as an AI-native development studio, and its section heading is sized noticeably larger than the surrounding body text so it's easy to spot as you scroll.

The site uses a warm, minimal color palette — cream backgrounds, dark brown body text, terracotta accents, and a moss-green header and footer with light cream-colored nav text so those two bars stay readable against their darker background. You'll see the StarterCulture name written as one word ("StarterCulture," not "Starter Culture") consistently across the page, including in the browser tab title.

Two more pages, About and Clients, are linked from the footer rather than the homepage scroll — check the footer for those links as they become available.

[↑ Back to table of contents](#table-of-contents)

## Viewing Studio Products
<!-- requirements: #6 -->

Scroll to the "Products" section on the homepage to see what StarterCulture is building. Each product is listed with a name, a status pill, and a short description.

Right now the section features **Devlore**, marked with a **"Beta"** pill (as opposed to an "In development" pill, which is used for products that aren't as far along yet). Devlore's description reads: "Devlore is an agentic knowledge base that automatically documents every push across your project repos, with human review only at release time." Click through on Devlore to visit its npm package page (`https://www.npmjs.com/package/@starterculture/devlore`) if you want to install it or see its published releases.

As StarterCulture ships more products, expect this section to grow, with each new entry following the same name/status/description pattern.

[↑ Back to table of contents](#table-of-contents)

## Getting in Touch
<!-- requirements: #7 -->

The "Contact" section, near the bottom of the homepage, is how you reach the studio directly. It sits on the same light background used by the Studio section above it, which visually sets it apart from the Products section just before it. The email address listed there — and repeated in the footer — is `dev@starterculturestudio.com`. Send questions, project inquiries, or anything else studio-related to that address.

[↑ Back to table of contents](#table-of-contents)

## Using the Login Menu
<!-- requirements: #10 -->

Both the header and the footer include a **"Login"** entry. Clicking it opens a small dropdown with two choices: **"Client Login"** and **"Company Login"**. Use Client Login if you're a StarterCulture client checking on your project; use Company Login if you're a member of the StarterCulture team.

The dropdown works like a simple expandable menu — click "Login" to open it, click one of the two options to go to that login page, or click anywhere else on the page to close it without choosing anything. (The footer's version of the menu opens upward instead of downward, so it stays on-screen even though it's near the bottom of the page.)

[↑ Back to table of contents](#table-of-contents)

## Logging In as a Client
<!-- requirements: #10 -->

If you're a StarterCulture client, choose "Client Login" from the Login menu. You'll land on a page explaining that it's for clients to view working models, documentation, and other materials for their project.

To log in:

1. Enter your **Client ID** — a short code StarterCulture gives you when you become a client (this is not your email address).
2. Submit the form. If the ID is recognized, StarterCulture emails a one-time passcode to the email address on file for your account, and the page reveals a second step asking you to enter that passcode.
3. Check your email for the passcode and enter it on the page.
4. Once the correct passcode is entered, you're signed in and taken to your client portal.

If something goes wrong along the way — an unrecognized Client ID, an expired or incorrect passcode, too many incorrect attempts, or a network hiccup — the page will show an inline error message explaining what happened so you can try again.

[↑ Back to table of contents](#table-of-contents)

## Viewing Your Project in the Client Portal
<!-- requirements: #10 -->

After logging in successfully, you'll land on your client portal page. This page shows your project's name along with whatever content StarterCulture has posted for your project so far — for a brand-new client this may just be a placeholder note saying project information is on its way, and it will fill in over time as the studio adds working models, documentation, or other materials for you.

You stay logged in across visits (your session is remembered in your browser) until it expires or you log out. If your session has expired or isn't found, you'll be sent back to the Client Login page to sign in again. To end your session manually, use the **"Log out"** button on the portal page.

[↑ Back to table of contents](#table-of-contents)

## Logging In as a StarterCulture Team Member
<!-- requirements: #10 -->

If you're on the StarterCulture team, choose "Company Login" from the Login menu. The page explains: "StarterCulture team members: sign in with your email to reach the admin area."

To sign in:

1. Enter your email address and submit the form.
2. Regardless of whether your email is recognized, you'll see a generic "check your email" confirmation — this is expected and is a deliberate privacy measure, not an error.
3. If your account exists, you'll receive a magic-link email. Click the link in that email to complete sign-in; it will bring you back to the Company Login page.
4. Once signed in, the page will confirm you're logged in with your email address. The admin area itself isn't available yet, so this is currently the last step of the flow.

Only team members who already have an account set up by StarterCulture can complete this sign-in — there's no self-signup.

[↑ Back to table of contents](#table-of-contents)

