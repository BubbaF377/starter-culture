<!-- devkeep:agents-md -->
# Working with starter-culture's docs/PRODUCT.md

This repo is linked to Devkeep, which reads `docs/PRODUCT.md` to draft log entries on every push, keep a User Manual/Test plan/Visualizer in sync, and answer chat questions about this project's own history and reasoning. The most useful thing an AI coding agent working in this repo can do is keep that file current — not as a separate chore, but as part of the same session where a decision actually gets made.

## Every session, before anything else

Read `docs/PRODUCT.md` fresh. Don't assume it's already current in this session's own context — the file can change between sessions (a different terminal, a teammate, a hand-edit), and none of those show up in this session's own history. Working from a stale memory of the doc is worse than working from nothing, since stale context still looks authoritative right up until it's confidently wrong.

## As decisions land, write them down

Work the way you normally would — talk through a bug, a feature, a design choice. As a decision actually lands, open `docs/PRODUCT.md` directly and write it down right there: a new requirement, a decision note, an open question, a "found this the hard way" note — before or alongside writing the code, not reconstructed later from a diff. Commit the doc edit in the same commit (or PR) as the change it explains; `docs/PRODUCT.md` isn't a separate deliverable, it's part of the change. From there Devkeep's own automation takes over on push — drafting what changed, keeping generated docs in sync — so this file only needs to carry the *why*, not a changelog.

**Before every commit, check this specifically — don't defer it or assume an earlier pass already covered it.** If the commit changes behavior, adds or supersedes a requirement, resolves an open question, or fixes a real bug, and `docs/PRODUCT.md` doesn't already reflect it, update that file and include the update in the same commit. A commit that changes what this project does without the doc reflecting it is exactly how this file quietly goes stale.

## If this repo is a monorepo

Check for `docs/MODULES.md` at the repo root first. If it exists, this repo tracks more than one documented sub-project, and *where* a decision belongs depends on its scope:

- A decision specific to one module's own behavior, UI, or requirements belongs in that module's own `docs/PRODUCT.md` (the path is listed in `docs/MODULES.md`, one per module).
- A decision about how the modules fit together, or the shell/root project itself, belongs in the root `docs/PRODUCT.md`.

Getting this wrong is an easy, recurring mistake even for an agent that already knows this file matters: a shell-level doc quietly absorbing a module's own implementation details (or vice versa) goes stale in a way that's hard to notice until someone reads it looking for something specific and it isn't where it should be. When genuinely unsure which one a decision belongs in, ask rather than guess.

If `docs/MODULES.md` doesn't exist, this is an ordinary single-project repo — everything above applies to the one root `docs/PRODUCT.md`.
