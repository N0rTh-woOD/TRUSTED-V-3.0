# TRUSTED-V — Rebuild Kit

Three documents. Give all three to any coding agent to rebuild the platform from zero.

| File | Purpose | Read order |
|---|---|---|
| `01_PHILOSOPHY_AND_STORY.md` | Why the platform exists, the core philosophy, the six blocks and the story woven around them, strengths/advantages/honest limits, voice & tone | **first** |
| `02_DESIGN_SYSTEM.md` | Exact colour and type tokens, layout rhythm, button and card CSS, `ui-kit` component contracts, recurring patterns, forbidden patterns | second |
| `00_MASTER_PROMPT.md` | The build instruction: stack, routes, data models, API contract, page-by-section specs with copy, `data-testid` map, phased build plan, acceptance tests | third, then execute |

## Suggested agent prompt

> You are rebuilding TRUSTED-V. Read `01_PHILOSOPHY_AND_STORY.md`, then `02_DESIGN_SYSTEM.md`, then
> `00_MASTER_PROMPT.md` in full before writing code. Follow the master prompt's phased build plan and
> run its acceptance tests at the end of each phase. The content-truth rules in §1.1 of the master
> prompt are hard constraints: no fabricated metrics, IP partners are SiFive and Akeana only, no MIPS
> reference of any kind, certifications are alignment targets not achievements.

## The three things that matter most

1. **Never state a number that cannot be substantiated.** The entire credibility of the product rests
   on this.
2. **IP partners are SiFive and Akeana. Nothing else.** This is a factual and legal constraint.
3. **When you are about to build another card grid, draw the real shape of the information instead.**
