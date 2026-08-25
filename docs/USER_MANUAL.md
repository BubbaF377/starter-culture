<!-- devkeep:user-manual source-hash:1918d46f8716c86b81ce49d290186b9f607be0e9ec5e90321674667e50eecb63 -->
> **Do not move, rename, or edit this file.** Devkeep generates and maintains this user manual automatically from `docs/PRODUCT.md`'s requirements — manual edits will be overwritten the next time Devkeep detects the requirements have changed. To change what's documented, update `docs/PRODUCT.md` itself.
<!-- devkeep:user-manual requirement-hashes
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

StarterCulture is the brand and marketing website for StarterCulture, a small AI-native software development studio. It's the studio's public home on the web — a place for visitors to learn what the studio does, see the products it's building (starting with Devlore), and get in touch — and it also houses the sign-in flows used by the studio's clients to check on their projects and by the studio's own team members to reach their internal tools. This manual walks through what you can do on the site today, whether you're a visitor browsing the homepage, a client logging in to see your project, or a StarterCulture team member signing in.

## Table of Contents

- [Exploring the Homepage](#exploring-the-homepage)
- [Browsing the Studio's Products](#browsing-the-studios-products)
- [Getting in Touch](#getting-in-touch)
- [Using the Login Menu](#using-the-login-menu)
- [Logging In as a Client](#logging-in-as-a-client)
- [Logging In as a Team Member](#logging-in-as-a-team-member)

## Exploring the Homepage
<!-- requirements: #1, #2, #5 -->

The homepage is a single scrolling page — there's no separate "page load" for each section, you just scroll down through them in order: a header with navigation, a hero introduction, a short studio/about blurb, the products list, a contact area, and finally the footer.

At the top of the page, the large text you see first is the brand line, **"StarterCulture Software Studio"** — this is the dominant visual element of the hero. Beneath it, in smaller italic type, is a short tagline: "Small studio. Big ideas. AI-native." Keep scrolling and you'll hit a brief section introducing the studio itself, followed by the products section and a contact section, in that order.

The header (top of the page) and footer (bottom of the page) are both styled in a dark moss-green with cream-colored text and navigation links, which visually sets them apart from the light cream/terracotta body of the page. Use the header's nav links to jump to any section without scrolling manually, or scroll down through the page normally — both work.

[↑ Back to table of contents](#table-of-contents)

## Browsing the Studio's Products
<!-- requirements: #6 -->

Scroll to (or click through to) the Products section to see what StarterCulture is building. Each product is listed with a short description and a status pill that reflects how far along it is — currently either **"In development"** or **"Beta."**

Right now the section features **Devlore**, shown with a **Beta** pill, described as: "Devlore is an agentic knowledge base that automatically documents every push across your project repos, with human review only at release time." Click through on Devlore's listing to visit its npm package page at `https://www.npmjs.com/package/@starterculture/devlore`, where you can see release details and install it if you're evaluating or using it in your own project.

As the studio ships more products, they'll appear in this same list with their own status pills, so it's worth checking back here to see what's newly available or in progress.

[↑ Back to table of contents](#table-of-contents)

## Getting in Touch
<!-- requirements: #7 -->

Scroll to the Contact section (it sits just below Products, on a slightly different background so it's easy to spot as its own area) to find how to reach the studio directly. The studio's contact address is **dev@starterculturestudio.com** — use it for general inquiries, project questions, or anything else you'd want to reach StarterCulture about. The same contact information also appears in the footer at the bottom of every page.

[↑ Back to table of contents](#table-of-contents)

## Using the Login Menu
<!-- requirements: #10 -->

If you need to sign in — whether as a client checking on your project or as a StarterCulture team member — look for the **"Login"** entry. It appears in both the header navigation at the top of the page and again in the footer at the bottom, so it's reachable no matter where you are on the page.

Click (or tap) "Login" and a small dropdown opens with two choices: **"Client Login"** and **"Company Login."** Pick the one that applies to you. If you opened the dropdown from the footer, the menu opens upward instead of downward so it stays visible on screen. Clicking anywhere outside an open dropdown closes it.

[↑ Back to table of contents](#table-of-contents)

## Logging In as a Client
<!-- requirements: #10 -->

Client Login is for StarterCulture clients who want to see working models, documentation, and other materials for their project. Choose **"Client Login"** from the Login dropdown to get started.

You'll land on a page explaining that it's for StarterCulture clients. Enter the **Client ID** that StarterCulture gave you (this is a 6-character code the studio issues you — it's not your email address) and submit the form. If the ID is recognized, you'll be moved to a second step and a one-time passcode will be emailed to the address the studio has on file for you.

Check your email for that passcode, then enter it on the second step to complete sign-in. If something goes wrong — the code expired, you mistyped it, you've tried too many times, or there's a network hiccup — you'll see an inline error message explaining what happened so you can try again.

Once you're successfully verified, you're automatically taken to your **Client Portal**, where you'll see your project's name and whatever content StarterCulture has posted for you so far (early on, this may just be a placeholder note saying your project's information is coming). Your sign-in is remembered in your browser, so you won't need to re-enter your Client ID and passcode every time you come back — until you explicitly sign out. When you're done, click **"Log out"** on the portal page to clear your session; you'll need to go through the Client ID and passcode steps again next time.

[↑ Back to table of contents](#table-of-contents)

## Logging In as a Team Member
<!-- requirements: #10 -->

Company Login is for StarterCulture's own team members. Choose **"Company Login"** from the Login dropdown to reach it. The page explains: "StarterCulture team members: sign in with your email to reach the admin area."

Enter your team email address and submit the form. Regardless of whether your email is recognized, you'll see the same "check your email" confirmation — this is intentional, so no one can use the form to guess which emails belong to the team. If your account has been set up by the studio, a magic sign-in link will arrive in your inbox; click it to complete sign-in.

Clicking the link brings you back to the Company Login page already signed in, where you'll see a message confirming you're logged in as your email address. The admin area itself isn't built yet, so there's nothing further to do here at this stage beyond confirming you can sign in.

[↑ Back to table of contents](#table-of-contents)

